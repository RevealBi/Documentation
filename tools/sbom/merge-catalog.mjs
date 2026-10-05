#!/usr/bin/env node
// Adds generated entries to an existing catalog.json. Published RTM SBOMs are treated as
// immutable: an entry whose id already exists with a different SHA-256 is rejected unless
// --allow-replace is passed (for example to correct a broken SBOM after review).
//
//   node merge-catalog.mjs --catalog ../../static/sbom/catalog.json --entries out/entries --output out/site/catalog.json
//   node merge-catalog.mjs --catalog https://cdn.example.com/sbom/catalog.json --entries out/entries --output out/site/catalog.json
//   node merge-catalog.mjs --catalog none ...    (start an empty catalog)
import {appendFile, readFile, readdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {sortEntries} from './lib/catalog.mjs';
import {loadConfig, parseArgs, requireArg, writeJson} from './lib/util.mjs';

async function loadCatalog(location, config) {
  if (location === 'none') {
    return {$schema: './catalog.schema.json', schemaVersion: 2, format: config.format, entries: []};
  }
  if (/^https?:\/\//i.test(location)) {
    const response = await fetch(location, {cache: 'no-store'});
    if (!response.ok) throw new Error(`GET ${location} returned HTTP ${response.status}.`);
    return response.json();
  }
  return JSON.parse(await readFile(location, 'utf8'));
}

async function main() {
  const args = parseArgs(process.argv.slice(2), {boolean: ['allowReplace']});
  const config = await loadConfig();
  const catalogLocation = requireArg(args, 'catalog');
  const entriesDir = path.resolve(requireArg(args, 'entries'));
  const output = path.resolve(requireArg(args, 'output'));

  const catalog = await loadCatalog(catalogLocation, config);
  if (catalog.format?.version !== config.format.version) {
    throw new Error(
      `The catalog declares CycloneDX ${catalog.format?.version}, but SBOMs are generated as ${config.format.version}. Migrate the catalog format first.`,
    );
  }

  const files = (await readdir(entriesDir)).filter((name) => name.endsWith('.json')).sort();
  if (files.length === 0) throw new Error(`No entries found in ${entriesDir}.`);
  const byId = new Map(catalog.entries.map((entry) => [entry.id, entry]));
  const changes = {added: [], replaced: [], unchanged: []};

  for (const file of files) {
    const entry = JSON.parse(await readFile(path.join(entriesDir, file), 'utf8'));
    const existing = byId.get(entry.id);
    if (!existing) {
      changes.added.push(entry.id);
    } else if (existing.sha256 === entry.sha256 && existing.downloadUrl === entry.downloadUrl) {
      changes.unchanged.push(entry.id);
      continue;
    } else if (!args.allowReplace) {
      throw new Error(
        `Catalog entry '${entry.id}' is already published with a different artifact. RTM SBOMs are immutable; rerun with --allow-replace only to correct a published SBOM on purpose.`,
      );
    } else {
      changes.replaced.push(entry.id);
    }
    byId.set(entry.id, entry);
  }

  catalog.entries = sortEntries(config, [...byId.values()]);
  await writeJson(output, catalog);
  if (args.changedIdsFile) {
    await writeFile(path.resolve(args.changedIdsFile), [...changes.added, ...changes.replaced].join(','));
  }

  const summary = Object.entries(changes)
    .map(([kind, ids]) => `${kind}: ${ids.length ? ids.join(', ') : '-'}`)
    .join('\n');
  console.log(`Wrote ${output} (${catalog.entries.length} entries)\n${summary}`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(
      process.env.GITHUB_STEP_SUMMARY,
      `### SBOM catalog changes\n\n${Object.entries(changes)
        .map(([kind, ids]) => `- **${kind}**: ${ids.length ? ids.map((id) => `\`${id}\``).join(', ') : '-'}`)
        .join('\n')}\n\n`,
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
