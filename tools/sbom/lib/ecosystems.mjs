// Resolves the dependency graph of published packages by referencing them from a throwaway
// wrapper project and running the ecosystem's CycloneDX tool against it. Nothing here reads
// local build output: every package, JAR, tarball, and engine binary comes from its public
// registry or download site, so the SBOM describes exactly what customers install.
import {cp, mkdir, readdir, rename, rm, writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {gunzipSync} from 'node:zlib';
import {unzipSync} from 'fflate';
import {rewriteRefs} from './cyclonedx.mjs';
import {TOOL_DIR, download, hashFile, readJson, run} from './util.mjs';

const executables = {
  cyclonedxDotnet: process.env.CYCLONEDX_DOTNET || 'dotnet-CycloneDX',
  mvn: process.env.MVN || 'mvn',
  npm: process.env.NPM || 'npm',
  syft: process.env.SYFT || 'syft',
};

function xmlEscape(value) {
  return value.replace(/[<>&"']/g, (c) => ({'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;'})[c]);
}

function splitMaven(coordinate) {
  const [groupId, artifactId] = coordinate.split(':');
  if (!groupId || !artifactId) throw new Error(`Maven package '${coordinate}' must be groupId:artifactId.`);
  return {groupId, artifactId};
}

export function packagePurl(ecosystem, name, version) {
  switch (ecosystem) {
    case 'nuget':
      return `pkg:nuget/${name}@${version}`;
    case 'maven': {
      const {groupId, artifactId} = splitMaven(name);
      return `pkg:maven/${groupId}/${artifactId}@${version}`;
    }
    case 'npm':
      return `pkg:npm/${name.replace(/^@/, '%40')}@${version}`;
    default:
      throw new Error(`Unsupported ecosystem '${ecosystem}'.`);
  }
}

export function distributionUrl(config, ecosystem, name, version) {
  switch (ecosystem) {
    case 'nuget':
      return `https://www.nuget.org/packages/${name}/${version}`;
    case 'maven': {
      const {groupId, artifactId} = splitMaven(name);
      return `${config.registries.maven}/${groupId.replace(/\./g, '/')}/${artifactId}/${version}/${artifactId}-${version}.jar`;
    }
    case 'npm': {
      const bare = name.split('/').pop();
      return `${config.registries.npm}/${name}/-/${bare}-${version}.tgz`;
    }
    default:
      throw new Error(`Unsupported ecosystem '${ecosystem}'.`);
  }
}

async function resolveNuget({config, platform, packages, version, workDir}) {
  const packageReferences = packages
    .map((id) => `    <PackageReference Include="${xmlEscape(id)}" Version="[${xmlEscape(version)}]" />`)
    .join('\n');
  await writeFile(
    path.join(workDir, 'sbom-wrapper.csproj'),
    `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>${platform.targetFramework}</TargetFramework>
  </PropertyGroup>
  <ItemGroup>
${packageReferences}
  </ItemGroup>
</Project>
`,
  );
  // Restore only from the public feed so machine-level or internal feeds cannot substitute packages.
  await writeFile(
    path.join(workDir, 'nuget.config'),
    `<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="nuget.org" value="${config.registries.nuget}" />
  </packageSources>
</configuration>
`,
  );
  await run(executables.cyclonedxDotnet, [
    path.join(workDir, 'sbom-wrapper.csproj'),
    '--output', workDir,
    '--filename', 'bom.json',
    '--output-format', 'Json',
    '--spec-version', config.format.version,
    '--framework', platform.targetFramework,
  ]);
  return readJson(path.join(workDir, 'bom.json'));
}

async function resolveMaven({config, packages, version, workDir, document}) {
  const exclusions = (document.mavenExclusions ?? []).map(splitMaven);
  const dependencies = packages
    .map((coordinate) => {
      const {groupId, artifactId} = splitMaven(coordinate);
      // Exclusions only apply to transitive paths, so a directly requested engine JAR is kept
      // while the engine selected by the build machine's OS profile is removed.
      const excluded = exclusions
        .filter((exclusion) => !(exclusion.groupId === groupId && exclusion.artifactId === artifactId))
        .map(
          (exclusion) =>
            `        <exclusion><groupId>${exclusion.groupId}</groupId><artifactId>${exclusion.artifactId}</artifactId></exclusion>`,
        )
        .join('\n');
      return `    <dependency>
      <groupId>${groupId}</groupId>
      <artifactId>${artifactId}</artifactId>
      <version>${xmlEscape(version)}</version>${excluded ? `\n      <exclusions>\n${excluded}\n      </exclusions>` : ''}
    </dependency>`;
    })
    .join('\n');
  await writeFile(
    path.join(workDir, 'pom.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>io.revealbi.sbom</groupId>
  <artifactId>sbom-wrapper</artifactId>
  <version>0.0.0</version>
  <packaging>pom</packaging>
  <repositories>
    <repository>
      <id>reveal-public</id>
      <url>${config.registries.maven}</url>
      <snapshots><enabled>false</enabled></snapshots>
    </repository>
  </repositories>
  <dependencies>
${dependencies}
  </dependencies>
</project>
`,
  );
  // Concurrent Maven processes race on the shared local repository, so Maven runs one at a time.
  const previous = mavenQueue;
  let release;
  mavenQueue = new Promise((resolve) => (release = resolve));
  await previous;
  try {
    await runMaven(workDir, config);
  } finally {
    release();
  }
  return readJson(path.join(workDir, 'target', 'bom.json'));
}

let mavenQueue = Promise.resolve();

function runMaven(workDir, config) {
  return run(
    executables.mvn,
    [
      '--batch-mode',
      '--no-transfer-progress',
      '-f', path.join(workDir, 'pom.xml'),
      `org.cyclonedx:cyclonedx-maven-plugin:${config.tools['cyclonedx-maven-plugin']}:makeBom`,
      '-DoutputFormat=json',
      '-DoutputName=bom',
      '-DschemaVersion=1.6',
      '-DincludeTestScope=false',
    ],
    {cwd: workDir},
  );
}

async function resolveNpm({config, packages, version, workDir, document}) {
  const dependencies = Object.fromEntries(packages.map((name) => [name, version]));
  await writeFile(
    path.join(workDir, 'package.json'),
    `${JSON.stringify({name: 'sbom-wrapper', version: '0.0.0', private: true, dependencies}, null, 2)}\n`,
  );
  await writeFile(path.join(workDir, '.npmrc'), `registry=${config.registries.npm}/\n`);
  const target = document.npmTarget ? ['--os', document.npmTarget.os, '--cpu', document.npmTarget.cpu] : [];
  // Install scripts are skipped: reveal-sdk-node's script downloads the engine for the build
  // machine's OS. The engine for the SBOM's target runtime is downloaded explicitly instead.
  await run(executables.npm, ['install', '--ignore-scripts', '--no-audit', '--no-fund', ...target], {cwd: workDir});
  const cli = path.join(TOOL_DIR, 'node_modules', '@cyclonedx', 'cyclonedx-npm', 'bin', 'cyclonedx-npm-cli.js');
  await run(
    process.execPath,
    [cli, '--spec-version', config.format.version, '--output-format', 'JSON', '--omit', 'dev', '--output-file', 'bom.json'],
    {cwd: workDir},
  );
  const bom = await readJson(path.join(workDir, 'bom.json'));
  // cyclonedx-npm prefixes refs with the project name; drop the wrapper's name from them.
  const wrapperPrefix = `${bom.metadata.component['bom-ref']}|`;
  rewriteRefs(bom, (ref) => (ref.startsWith(wrapperPrefix) ? ref.slice(wrapperPrefix.length) : ref));
  return bom;
}

export async function resolvePackages(options) {
  await rm(options.workDir, {recursive: true, force: true});
  await mkdir(options.workDir, {recursive: true});
  switch (options.platform.ecosystem) {
    case 'nuget':
      return resolveNuget(options);
    case 'maven':
      return resolveMaven(options);
    case 'npm':
      return resolveNpm(options);
    default:
      throw new Error(`Unsupported ecosystem '${options.platform.ecosystem}'.`);
  }
}

function extractZip(buffer, destination) {
  const entries = unzipSync(new Uint8Array(buffer));
  return Promise.all(
    Object.entries(entries)
      .filter(([name]) => !name.endsWith('/'))
      .map(async ([name, data]) => {
        const target = path.resolve(destination, name);
        if (!target.startsWith(path.resolve(destination) + path.sep)) {
          throw new Error(`Archive entry '${name}' escapes the extraction directory.`);
        }
        await mkdir(path.dirname(target), {recursive: true});
        await writeFile(target, data);
      }),
  );
}

async function findFile(directory, fileName) {
  for (const entry of await readdir(directory, {withFileTypes: true, recursive: true})) {
    if (entry.isFile() && entry.name === fileName) return path.join(entry.parentPath ?? entry.path, entry.name);
  }
  return null;
}

/**
 * Downloads the published payload that carries embedded .NET assemblies and scans it with
 * syft's .NET catalogers. Returns the scan plus the engine binary path when there is one.
 */
export async function scanEmbedded({config, platform, embedded, rootPackage, version, workDir}) {
  const payloadDir = path.join(workDir, 'embedded');
  await mkdir(payloadDir, {recursive: true});
  if (embedded.source === 'url') {
    const url = embedded.url.replace(/\{version\}/g, version);
    console.log(`  downloading ${url}`);
    const archive = await download(url, path.join(workDir, 'embedded.download'));
    await writeFile(path.join(payloadDir, embedded.binary), url.endsWith('.gz') ? gunzipSync(archive) : archive);
  } else if (embedded.source === 'maven' || (embedded.source === 'package' && platform.ecosystem === 'maven')) {
    const coordinate = embedded.source === 'maven' ? embedded.artifact : rootPackage;
    const url = distributionUrl(config, 'maven', coordinate, version);
    console.log(`  downloading ${url}`);
    await extractZip(await download(url, path.join(workDir, 'embedded.jar')), payloadDir);
  } else if (embedded.source === 'package' && platform.ecosystem === 'npm') {
    // The wrapper install already extracted the exact registry tarball.
    const installed = path.join(workDir, 'node_modules', ...rootPackage.split('/'));
    if (!existsSync(installed)) throw new Error(`Expected ${installed} after npm install.`);
    await cp(installed, payloadDir, {recursive: true});
  } else {
    throw new Error(`Unsupported embedded source '${embedded.source}' for ${platform.ecosystem}.`);
  }

  let binary = null;
  if (embedded.binary) {
    binary = await findFile(payloadDir, embedded.binary);
    if (!binary) throw new Error(`Engine binary '${embedded.binary}' was not found in the downloaded payload.`);
    if (embedded.scanAs) {
      // syft only reads .NET single-file bundles from PE files named *.exe or *.dll; the
      // Windows engine JAR stores the executable without an extension.
      const renamed = path.join(path.dirname(binary), embedded.scanAs);
      await rename(binary, renamed);
      binary = renamed;
    }
  }

  // Single-file engine binaries carry their deps.json inside the bundle. Loose assemblies
  // without one can only be identified from PE version resources, which yields names such as
  // 'Azure.AI.OpenAI Client Library@2.800.25.61201' instead of NuGet ids and versions.
  if (!binary) {
    const files = await readdir(payloadDir, {recursive: true});
    if (!files.some((file) => String(file).endsWith('.deps.json'))) {
      console.warn(
        `  warning: ${rootPackage} ${version} ships .NET assemblies without a *.deps.json; embedded components are identified from assembly metadata, not NuGet package ids. Include the deps.json in the published package to fix this.`,
      );
    }
  }

  const scanFile = path.join(workDir, 'embedded.cdx.json');
  await run(executables.syft, [
    'scan', `dir:${payloadDir}`,
    '--select-catalogers', 'dotnet',
    '--output', `cyclonedx-json@1.6=${scanFile}`,
    '--quiet',
  ]);
  return {scan: await readJson(scanFile), binary};
}

export async function engineComponent({config, platform, document, embedded, binary, version}) {
  const purl = embedded.purl.replace(/\{version\}/g, version);
  const [sha256, sha512] = await Promise.all([hashFile(binary, 'sha256'), hashFile(binary, 'sha512')]);
  return {
    type: 'application',
    supplier: {name: config.supplier},
    name: embedded.engineName,
    version,
    hashes: [
      {alg: 'SHA-256', content: sha256.toUpperCase()},
      {alg: 'SHA-512', content: sha512.toUpperCase()},
    ],
    purl,
    'bom-ref': purl,
    properties: [
      ...(platform.properties ?? []).filter((property) => property.name === 'io.revealbi.sbom.distribution'),
      ...(document.root?.properties ?? []),
    ],
  };
}
