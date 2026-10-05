#!/usr/bin/env node
// Validates workflow inputs and emits the generation matrix, so a bad product, platform, or
// preview version fails before any toolchain is installed.
//
//   node plan.mjs --product reveal-server --platform all --version 2.2.2
import {appendFile} from 'node:fs/promises';
import {assertRtmVersion, loadConfig, parseArgs, platformConfig, requireArg} from './lib/util.mjs';

const args = parseArgs(process.argv.slice(2));
const config = await loadConfig();
const productKey = requireArg(args, 'product');
const version = requireArg(args, 'version');
assertRtmVersion(version);

const product = config.products[productKey];
if (!product) throw new Error(`Unknown product '${productKey}'. Known: ${Object.keys(config.products).join(', ')}.`);
const requested = (args.platform ?? 'all') === 'all' ? Object.keys(product.platforms) : args.platform.split(',');
const include = requested.map((platformKey) => {
  const {platform} = platformConfig(config, productKey, platformKey);
  const embedded = platform.documents.some((document) => document.embedded);
  return {product: productKey, platform: platformKey, version, ecosystem: platform.ecosystem, embedded};
});

const matrix = JSON.stringify({include});
console.log(matrix);
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `matrix=${matrix}\n`);
