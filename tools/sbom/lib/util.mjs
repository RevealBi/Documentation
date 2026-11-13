import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {createReadStream} from 'node:fs';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const TOOL_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const REPO_ROOT = path.resolve(TOOL_DIR, '..', '..');

// Numeric RTM versions only: 2.2.1, 1.5.213, 2.2.1.4. Anything with a prerelease
// label or build metadata (2.2.1-preview.3, 2.2.1+sha) is rejected.
export const RTM_VERSION_PATTERN = /^[0-9]+(?:\.[0-9]+){1,3}$/;

export function parseArgs(argv, {boolean = [], multiple = []} = {}) {
  const args = {_: []};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith('--')) {
      args._.push(token);
      continue;
    }
    const [rawKey, inlineValue] = token.slice(2).split(/=(.*)/s, 2);
    const key = rawKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    let value;
    if (boolean.includes(key)) {
      value = inlineValue === undefined ? true : inlineValue !== 'false';
    } else {
      value = inlineValue ?? argv[++i];
      if (value === undefined) throw new Error(`Missing value for --${rawKey}.`);
    }
    if (multiple.includes(key)) (args[key] ??= []).push(value);
    else args[key] = value;
  }
  return args;
}

export function requireArg(args, key) {
  const value = args[key];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`--${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)} is required.`);
  }
  return value.trim();
}

export function assertRtmVersion(version, label = 'version') {
  if (!RTM_VERSION_PATTERN.test(version)) {
    throw new Error(
      `${label} '${version}' is not a numeric RTM version. Preview and CI builds must not be published to the Trust Center.`,
    );
  }
}

export function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (!(key in values)) throw new Error(`Unknown placeholder ${match} in '${template}'.`);
    return String(values[key]);
  });
}

export async function loadConfig() {
  return readJson(path.join(TOOL_DIR, 'sbom.config.json'));
}

export function platformConfig(config, productKey, platformKey) {
  const product = config.products[productKey];
  if (!product) {
    throw new Error(`Unknown product '${productKey}'. Known: ${Object.keys(config.products).join(', ')}.`);
  }
  const platform = product.platforms[platformKey];
  if (!platform) {
    throw new Error(
      `Product '${productKey}' has no '${platformKey}' platform. Known: ${Object.keys(product.platforms).join(', ')}.`,
    );
  }
  return {product, platform};
}

export async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

export async function writeJson(file, value) {
  await mkdir(path.dirname(file), {recursive: true});
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

export async function hashFile(file, algorithm = 'sha256') {
  const hash = createHash(algorithm);
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest('hex');
}

export function run(command, args, {cwd, env, quiet = false} = {}) {
  return new Promise((resolve, reject) => {
    const display = [command, ...args].join(' ');
    if (!quiet) console.log(`  $ ${display}`);
    // .cmd/.bat shims (npm, mvn on Windows) need a shell; everything else runs directly.
    const shell = process.platform === 'win32' && !/\.exe$/i.test(command);
    const child = spawn(command, args, {cwd, env: {...process.env, ...env}, shell, stdio: ['ignore', 'pipe', 'pipe']});
    let output = '';
    child.stdout.on('data', (data) => (output += data));
    child.stderr.on('data', (data) => (output += data));
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`'${display}' exited with code ${code}.\n${output.slice(-4000)}`));
    });
  });
}

export async function download(url, destination) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`GET ${url} returned HTTP ${response.status}.`);
  await mkdir(path.dirname(destination), {recursive: true});
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(destination, buffer);
  return buffer;
}

export function compareVersions(left, right) {
  const a = left.split('.').map(Number);
  const b = right.split('.').map(Number);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] ?? 0) - (b[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

export function toPosix(value) {
  return value.split(path.sep).join('/');
}
