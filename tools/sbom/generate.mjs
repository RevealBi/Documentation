#!/usr/bin/env node
// Generates the SBOM documents, ZIP bundle, and catalog entry for one RTM release of one
// product platform, from the packages already published to NuGet, Maven, or npm.
//
//   node generate.mjs --product reveal-server --platform node --version 2.2.1 --out out
//
// Output:
//   <out>/site/<catalog-relative path>   files to publish next to catalog.json
//   <out>/entries/<entry id>.json        catalog entries for merge-catalog.mjs
import {createHash} from 'node:crypto';
import {mkdir, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {strToU8, zipSync} from 'fflate';
import {artifactPath, entryId} from './lib/catalog.mjs';
import {checkSbom} from './lib/checks.mjs';
import {
  allComponents,
  applyBoundaries,
  finalize,
  mergeEmbedded,
  mergeExternalReferences,
  mergeProperties,
  promoteDirectDependency,
  prune,
  rewriteRefs,
  synthesizeRoot,
} from './lib/cyclonedx.mjs';
import {distributionUrl, engineComponent, packagePurl, resolvePackages, scanEmbedded} from './lib/ecosystems.mjs';
import {assertRtmVersion, fill, loadConfig, parseArgs, platformConfig, requireArg, sha256, writeJson} from './lib/util.mjs';

const CDX_MEDIA_TYPE = 'application/vnd.cyclonedx+json';
const MANIFEST_SCHEMA_URL = 'https://help.revealbi.io/sbom/bundle-manifest.schema.json';

/** Expands `forEach` templates and `@kind` package references into concrete documents. */
function expandDocuments(platform, version) {
  const documents = platform.documents.flatMap((document) =>
    document.forEach
      ? document.forEach.map((name) => ({...document, forEach: undefined, packages: [name], package: name}))
      : [{...document, package: document.packages?.length === 1 ? document.packages[0] : undefined}],
  );
  return documents.map((document) => {
    const packages = document.packages.flatMap((name) =>
      name.startsWith('@')
        ? documents.filter((other) => other.kind === name.slice(1)).flatMap((other) => other.packages)
        : [name],
    );
    const values = {version, package: document.package ?? ''};
    return {
      ...document,
      packages: [...new Set(packages)],
      fileName: fill(document.fileName, values),
      displayName: document.displayName ?? document.package,
    };
  });
}

function syntheticRoot({config, platform, document, version}) {
  const root = document.root;
  const purl = fill(root.purl, {version});
  return {
    type: root.type ?? 'application',
    supplier: {name: config.supplier},
    ...(root.group ? {group: root.group} : {}),
    name: root.name,
    version,
    ...(root.description ? {description: fill(root.description, {version})} : {}),
    purl,
    'bom-ref': purl,
    externalReferences: mergeExternalReferences([
      {type: 'website', url: config.website},
      document.documentation && {type: 'documentation', url: document.documentation},
      root.distributionUrl && {type: 'distribution', url: fill(root.distributionUrl, {version})},
    ]),
    properties: mergeProperties(platform.properties, root.properties),
  };
}

async function enrichPromotedRoot(bom, root, {config, platform, document, version}) {
  const distribution = distributionUrl(config, platform.ecosystem, document.packages[0], version);
  if (document.componentType) root.type = document.componentType;
  root.supplier = {name: config.supplier};
  root.externalReferences = mergeExternalReferences(root.externalReferences, [
    {type: 'website', url: config.website},
    document.documentation && {type: 'documentation', url: document.documentation},
    {type: 'distribution', url: distribution},
  ]);
  // Paths such as node_modules/<name> describe the wrapper project, not the package.
  root.properties = mergeProperties(
    (root.properties ?? []).filter((property) => property.name !== 'cdx:npm:package:path'),
    platform.properties,
  );
  if (!root.hashes?.length) {
    // cyclonedx-npm does not hash the package it was asked about, so hash the published archive.
    const response = await fetch(distribution);
    if (!response.ok) throw new Error(`GET ${distribution} returned HTTP ${response.status}.`);
    const archive = Buffer.from(await response.arrayBuffer());
    root.hashes = ['sha256', 'sha512'].map((algorithm) => ({
      alg: algorithm.replace('sha', 'SHA-'),
      content: createHash(algorithm).update(archive).digest('hex'),
    }));
  }
  if (root.purl && !allComponents(bom).some((component) => component['bom-ref'] === root.purl)) {
    rewriteRefs(bom, (ref) => (ref === root['bom-ref'] ? root.purl : ref));
  }
}

async function generateDocument(context, document) {
  const {config, platform, productKey, platformKey, version, workRoot} = context;
  const workDir = path.join(workRoot, productKey, platformKey, document.fileName.replace(/\.cdx\.json$/, ''));
  console.log(`\n[${document.fileName}] resolving ${document.packages.join(', ')} ${version}`);

  let bom = await resolvePackages({config, platform, packages: document.packages, version, workDir, document});
  if (document.root) {
    synthesizeRoot(bom, syntheticRoot({config, platform, document, version}));
  } else {
    if (document.packages.length !== 1) throw new Error(`${document.fileName}: a document without 'root' must list one package.`);
    const root = promoteDirectDependency(bom, packagePurl(platform.ecosystem, document.packages[0], version));
    await enrichPromotedRoot(bom, root, {config, platform, document, version});
  }
  applyBoundaries(bom, document.boundaries);

  if (document.embedded) {
    const {scan, binary} = await scanEmbedded({
      config,
      platform,
      embedded: document.embedded,
      rootPackage: document.packages[0],
      version,
      workDir,
    });
    const engine = binary
      ? await engineComponent({config, platform, document, embedded: document.embedded, binary, version})
      : undefined;
    mergeEmbedded(bom, scan, {engineComponent: engine});
  }

  const removed = prune(bom);
  if (removed > 0) console.log(`  pruned ${removed} components not reachable from the root`);
  bom = finalize(bom, {specVersion: config.format.version});

  const text = `${JSON.stringify(bom, null, 2)}\n`;
  const {errors, warnings} = await checkSbom(text, {
    label: document.fileName,
    formatVersion: config.format.version,
    expectedVersion: version,
    revealPatterns: config.revealComponentPatterns,
  });
  warnings.forEach((warning) => console.warn(`  warning: ${warning}`));
  if (errors.length > 0) throw new Error(errors.join('\n'));
  console.log(`  ${bom.components.length} components, ${bom.dependencies.length} dependency entries`);
  if (!context.keepWork) await rm(workDir, {recursive: true, force: true});
  return {document, bytes: Buffer.from(text), sha256: sha256(text)};
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  const lanes = Array.from({length: Math.min(limit, items.length)}, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index]);
    }
  });
  await Promise.all(lanes);
  return results;
}

function manifestFile({document, sha256: hash}) {
  const file = {
    displayName: document.displayName,
    kind: document.kind,
    archivePath: `sboms/${document.folder ? `${document.folder}/` : ''}${document.fileName}`,
    mediaType: CDX_MEDIA_TYPE,
    sha256: hash,
  };
  if (['base', 'package', 'connector'].includes(document.kind)) file.packageName = document.packages[0];
  if (document.kind === 'runtime') {
    file.architecture = document.architecture;
    file.architectureLabel = document.architectureLabel;
  }
  return file;
}

function buildBundle({config, product, platform, platformKey, version, id, results}) {
  const manifest = {
    $schema: MANIFEST_SCHEMA_URL,
    schemaVersion: 1,
    bundle: {
      id,
      product: product.name,
      packageVersion: version,
      platform: platformKey,
      platformLabel: platform.label,
      description: platform.bundle.description,
    },
    format: config.format,
    files: results.map(manifestFile),
  };
  // A fixed timestamp keeps the ZIP byte-identical when the same documents are rebuilt.
  const mtime = new Date(`${new Date().toISOString().slice(0, 10)}T00:00:00Z`);
  const entries = {
    'manifest.json': strToU8(`${JSON.stringify(manifest, null, 2)}\n`),
    'README.txt': strToU8(`${platform.bundle.readme.map((line) => fill(line, {version})).join('\n')}\n`),
  };
  results.forEach((result, index) => {
    entries[manifest.files[index].archivePath] = new Uint8Array(result.bytes);
  });
  return Buffer.from(zipSync(entries, {level: 9, mtime}));
}

async function generatePlatform(options, config, productKey, platformKey) {
  const {product, platform} = platformConfig(config, productKey, platformKey);
  const {version, out, layout} = options;
  const id = entryId(productKey, version, platformKey);
  const documents = expandDocuments(platform, version);
  console.log(`\n=== ${id}: ${documents.length} SBOM document(s) ===`);

  const context = {config, platform, productKey, platformKey, version, workRoot: path.join(out, '.work'), keepWork: options.keepWork};
  const results = await mapWithConcurrency(documents, options.concurrency, (document) => generateDocument(context, document));

  let fileName;
  let bytes;
  if (platform.artifactType === 'bundle') {
    fileName = fill(platform.bundle.fileName, {version});
    bytes = buildBundle({config, product, platform, platformKey, version, id, results});
  } else {
    if (results.length !== 1) throw new Error(`${id}: a 'file' artifact must contain exactly one document.`);
    fileName = results[0].document.fileName;
    bytes = results[0].bytes;
  }

  const relativePath = artifactPath(layout, {productKey, platformKey, version, artifactType: platform.artifactType, fileName});
  const target = path.join(out, 'site', ...relativePath.split('/'));
  await mkdir(path.dirname(target), {recursive: true});
  await writeFile(target, bytes);

  const counts = {
    version,
    connectorCount: documents.filter((document) => document.kind === 'connector').length,
    packageCount: documents.filter((document) => document.kind === 'package').length,
  };
  const entry = {
    id,
    product: product.name,
    packageVersion: version,
    scope: product.scope,
    platform: platformKey,
    platformLabel: platform.label,
    contentsLabel: fill(platform.contentsLabel, counts),
    artifactType: platform.artifactType,
    downloadUrl: `./${relativePath}`,
    mediaType: platform.artifactType === 'bundle' ? 'application/zip' : CDX_MEDIA_TYPE,
    sha256: sha256(bytes),
  };
  await writeJson(path.join(out, 'entries', `${id}.json`), entry);
  console.log(`\n${id} -> ${relativePath} (${bytes.length} bytes, sha256 ${entry.sha256})`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2), {boolean: ['keepWork']});
  const config = await loadConfig();
  const productKey = requireArg(args, 'product');
  const version = requireArg(args, 'version');
  assertRtmVersion(version);
  const platformArg = args.platform ?? 'all';
  const platformKeys = platformArg === 'all' ? Object.keys(config.products[productKey]?.platforms ?? {}) : platformArg.split(',');
  const options = {
    version,
    out: path.resolve(args.out ?? 'out'),
    layout: args.layout ?? 'docs',
    concurrency: Number(args.concurrency ?? 3),
    keepWork: Boolean(args.keepWork),
  };
  for (const platformKey of platformKeys) {
    await generatePlatform(options, config, productKey, platformKey);
  }
}

main().catch((error) => {
  console.error(`\nSBOM generation failed:\n${error.stack ?? error.message}`);
  process.exit(1);
});
