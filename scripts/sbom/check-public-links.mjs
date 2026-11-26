// Fails when published SBOM material links to a Reveal GitHub repository outside the public RevealBi
// organization. Scans static/sbom and scripts/sbom/releases, including entries inside zip archives
// (nested archives too). Package metadata such as NuGet repository URLs can carry these links into
// generated SBOMs, so run this after generating or editing SBOM files.
//
// Usage: node scripts/sbom/check-public-links.mjs [path ...]
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, '..', '..');
const DEFAULT_ROOTS = [
  path.join(REPOSITORY_ROOT, 'static', 'sbom'),
  path.join(REPOSITORY_ROOT, 'scripts', 'sbom', 'releases'),
];
// A github.com link to a repository named Reveal* whose owner is not RevealBi.
const NON_PUBLIC_LINK = /github\.com\/(?!RevealBi\/)[A-Za-z0-9-]+\/Reveal[\w.-]*/g;

function listFiles(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];
  return fs.readdirSync(target, { withFileTypes: true })
    .flatMap(entry => listFiles(path.join(target, entry.name)));
}

function readZipEntries(buffer, label) {
  const EOCD = 0x06054b50;
  let eocd = -1;
  for (let offset = buffer.length - 22; offset >= Math.max(0, buffer.length - 65557); offset -= 1) {
    if (buffer.readUInt32LE(offset) === EOCD) { eocd = offset; break; }
  }
  if (eocd < 0) throw new Error(`${label}: not a zip archive.`);

  const count = buffer.readUInt16LE(eocd + 10);
  let pointer = buffer.readUInt32LE(eocd + 16);
  if (count === 0xffff || pointer === 0xffffffff) throw new Error(`${label}: ZIP64 archives are not supported.`);

  const entries = [];
  for (let index = 0; index < count; index += 1) {
    if (buffer.readUInt32LE(pointer) !== 0x02014b50) throw new Error(`${label}: corrupt central directory.`);
    const method = buffer.readUInt16LE(pointer + 10);
    const compressedSize = buffer.readUInt32LE(pointer + 20);
    const nameLength = buffer.readUInt16LE(pointer + 28);
    const extraLength = buffer.readUInt16LE(pointer + 30);
    const commentLength = buffer.readUInt16LE(pointer + 32);
    const localHeader = buffer.readUInt32LE(pointer + 42);
    const name = buffer.toString('utf8', pointer + 46, pointer + 46 + nameLength);
    pointer += 46 + nameLength + extraLength + commentLength;
    if (name.endsWith('/')) continue;

    const dataStart = localHeader + 30 + buffer.readUInt16LE(localHeader + 26) + buffer.readUInt16LE(localHeader + 28);
    const data = buffer.subarray(dataStart, dataStart + compressedSize);
    if (method !== 0 && method !== 8) throw new Error(`${label}!${name}: unsupported compression method ${method}.`);
    entries.push({ name, content: method === 8 ? zlib.inflateRawSync(data) : data });
  }
  return entries;
}

let scanned = 0;
function scan(content, label, findings) {
  if (label.toLowerCase().endsWith('.zip')) {
    for (const entry of readZipEntries(content, label)) scan(entry.content, `${label}!${entry.name}`, findings);
    return;
  }
  scanned += 1;
  for (const match of content.toString('utf8').matchAll(NON_PUBLIC_LINK)) findings.push(`${label}: ${match[0]}`);
}

const roots = process.argv.length > 2 ? process.argv.slice(2).map(target => path.resolve(target)) : DEFAULT_ROOTS;
const findings = [];
for (const root of roots) {
  for (const file of listFiles(root)) {
    scan(fs.readFileSync(file), path.relative(REPOSITORY_ROOT, file).replaceAll('\\', '/'), findings);
  }
}

if (findings.length > 0) {
  console.error(`Found ${findings.length} link(s) to non-public Reveal repositories:`);
  for (const finding of [...new Set(findings)]) console.error(`  ${finding}`);
  process.exit(1);
}
console.log(`Checked ${scanned} files and zip entries for non-public Reveal repository links: none found.`);
