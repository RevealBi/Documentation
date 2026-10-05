#!/usr/bin/env node
// Validates an SBOM catalog and every artifact it points to. Publishing is blocked when:
//   - catalog.json fails static/sbom/catalog.schema.json, or has duplicate ids/download URLs
//   - a version is not a numeric RTM version (catalog entries and SBOM root components)
//   - a downloaded artifact does not match the catalog's SHA-256
//   - a ZIP bundle's manifest.json fails static/sbom/bundle-manifest.schema.json, lists a file
//     that is missing or has a different SHA-256, or the ZIP contains SBOMs it does not list
//   - an SBOM is not valid CycloneDX, or its dependency graph references missing components
//
//   node validate.mjs --catalog ../../static/sbom/catalog.json
//   node validate.mjs --catalog out/site/catalog.json --ids reveal-server-2.2.2-node
//   node validate.mjs --catalog https://cdn.example.com/sbom/catalog.json
//   node validate.mjs --catalog out/site/catalog.json --base-url https://cdn.example.com/sbom/
import {appendFile, readFile} from 'node:fs/promises';
import path from 'node:path';
import {strFromU8, unzipSync} from 'fflate';
import {checkCatalogSemantics} from './lib/catalog.mjs';
import {checkSbom, formatAjvErrors, loadSchemaValidators} from './lib/checks.mjs';
import {REPO_ROOT, loadConfig, parseArgs, sha256} from './lib/util.mjs';

const isUrl = (value) => /^https?:\/\//i.test(value);

async function readSource(location) {
  if (isUrl(location)) {
    const response = await fetch(location, {cache: 'no-store'});
    if (!response.ok) throw new Error(`GET ${location} returned HTTP ${response.status}.`);
    return Buffer.from(await response.arrayBuffer());
  }
  return readFile(location);
}

function resolveDownload(downloadUrl, base) {
  if (isUrl(downloadUrl)) return downloadUrl;
  if (isUrl(base)) return new URL(downloadUrl, base).toString();
  return path.resolve(path.dirname(base), downloadUrl);
}

async function validateBundle(entry, bytes, context) {
  const {errors, warnings, validators, catalog, config} = context;
  const label = entry.id;
  let files;
  try {
    files = unzipSync(new Uint8Array(bytes));
  } catch (error) {
    errors.push(`${label}: the bundle is not a readable ZIP archive (${error.message}).`);
    return 0;
  }
  if (!files['manifest.json']) {
    errors.push(`${label}: the bundle has no manifest.json.`);
    return 0;
  }
  const manifest = JSON.parse(strFromU8(files['manifest.json']));
  if (!validators.manifest(manifest)) {
    errors.push(`${label}: manifest.json fails bundle-manifest.schema.json: ${formatAjvErrors(validators.manifest.errors)}`);
    return 0;
  }
  const {bundle} = manifest;
  if (bundle.id !== entry.id) errors.push(`${label}: manifest bundle id is '${bundle.id}'.`);
  if (bundle.packageVersion !== entry.packageVersion) {
    errors.push(`${label}: manifest packageVersion '${bundle.packageVersion}' differs from the catalog.`);
  }
  if (bundle.platform !== entry.platform) errors.push(`${label}: manifest platform '${bundle.platform}' differs from the catalog.`);
  if (bundle.product !== entry.product) errors.push(`${label}: manifest product '${bundle.product}' differs from the catalog.`);
  if (manifest.format.version !== catalog.format.version) {
    errors.push(`${label}: manifest declares CycloneDX ${manifest.format.version}, the catalog ${catalog.format.version}.`);
  }

  const listed = new Set();
  for (const file of manifest.files) {
    const where = `${label}/${file.archivePath}`;
    if (listed.has(file.archivePath)) errors.push(`${where}: listed more than once in manifest.json.`);
    listed.add(file.archivePath);
    const data = files[file.archivePath];
    if (!data) {
      errors.push(`${where}: listed in manifest.json but missing from the ZIP.`);
      continue;
    }
    if (sha256(data) !== file.sha256.toLowerCase()) errors.push(`${where}: SHA-256 does not match manifest.json.`);
    const result = await checkSbom(strFromU8(data), {
      label: where,
      formatVersion: catalog.format.version,
      expectedVersion: entry.packageVersion,
      revealPatterns: config.revealComponentPatterns,
    });
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }
  for (const name of Object.keys(files)) {
    if (name.endsWith('.cdx.json') && !listed.has(name)) errors.push(`${label}/${name}: in the ZIP but not in manifest.json.`);
  }
  return manifest.files.length;
}

async function main() {
  const args = parseArgs(process.argv.slice(2), {boolean: ['strict', 'skipDownloads']});
  const config = await loadConfig();
  const catalogLocation = args.catalog ?? path.join(REPO_ROOT, 'static', 'sbom', 'catalog.json');
  const base = args.baseUrl ?? (isUrl(catalogLocation) ? catalogLocation : path.resolve(catalogLocation));
  const onlyIds = args.ids ? new Set(args.ids.split(',').map((id) => id.trim()).filter(Boolean)) : null;

  const errors = [];
  const warnings = [];
  const validators = await loadSchemaValidators();
  const catalog = JSON.parse((await readSource(catalogLocation)).toString('utf8'));
  console.log(`Catalog: ${catalogLocation} (${catalog.entries?.length ?? 0} entries)`);

  if (!validators.catalog(catalog)) {
    errors.push(`catalog.json fails catalog.schema.json: ${formatAjvErrors(validators.catalog.errors)}`);
  } else {
    errors.push(...checkCatalogSemantics(catalog));
  }
  if (onlyIds) {
    const known = new Set(catalog.entries.map((entry) => entry.id));
    for (const id of onlyIds) if (!known.has(id)) errors.push(`--ids names '${id}', which is not in the catalog.`);
  }

  const context = {errors, warnings, validators, catalog, config};
  const rows = [];
  if (errors.length === 0 && !args.skipDownloads) {
    for (const entry of catalog.entries) {
      if (onlyIds && !onlyIds.has(entry.id)) continue;
      const location = resolveDownload(entry.downloadUrl, base);
      let bytes;
      try {
        bytes = await readSource(location);
      } catch (error) {
        errors.push(`${entry.id}: download ${location} failed (${error.message}).`);
        continue;
      }
      if (sha256(bytes) !== entry.sha256.toLowerCase()) {
        errors.push(`${entry.id}: SHA-256 of ${location} does not match the catalog.`);
        continue;
      }
      const documents =
        entry.artifactType === 'bundle'
          ? await validateBundle(entry, bytes, context)
          : await checkSbom(bytes.toString('utf8'), {
              label: entry.id,
              formatVersion: catalog.format.version,
              expectedVersion: entry.packageVersion,
              revealPatterns: config.revealComponentPatterns,
            }).then((result) => {
              errors.push(...result.errors);
              warnings.push(...result.warnings);
              return 1;
            });
      rows.push({id: entry.id, documents, bytes: bytes.length});
      console.log(`  checked ${entry.id}: ${documents} SBOM document(s), ${bytes.length} bytes`);
    }
  }

  const uniqueWarnings = [...new Set(warnings)];
  uniqueWarnings.forEach((warning) => console.warn(`warning: ${warning}`));
  errors.forEach((error) => console.error(`error: ${error}`));
  const failed = errors.length > 0 || (args.strict && uniqueWarnings.length > 0);

  if (process.env.GITHUB_STEP_SUMMARY) {
    const lines = [
      `### SBOM catalog validation ${failed ? 'failed' : 'passed'}`,
      '',
      `Catalog: \`${catalogLocation}\``,
      '',
      '| Entry | SBOM documents | Bytes |',
      '| --- | ---: | ---: |',
      ...rows.map((row) => `| ${row.id} | ${row.documents} | ${row.bytes} |`),
      '',
      ...errors.map((error) => `- :x: ${error}`),
      ...uniqueWarnings.map((warning) => `- :warning: ${warning}`),
      '',
    ];
    await appendFile(process.env.GITHUB_STEP_SUMMARY, `${lines.join('\n')}\n`);
  }

  console.log(`\n${failed ? 'FAILED' : 'OK'}: ${errors.length} error(s), ${uniqueWarnings.length} warning(s).`);
  process.exit(failed ? 1 : 0);
}

main().catch((error) => {
  console.error(error.stack ?? error.message);
  process.exit(1);
});
