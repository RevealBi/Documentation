import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import {Spec, Validation} from '@cyclonedx/cyclonedx-library';
import {REPO_ROOT, RTM_VERSION_PATTERN, readJson} from './util.mjs';

const SCHEMA_DIR = path.join(REPO_ROOT, 'static', 'sbom');
const validators = new Map();
let schemaValidators;

export async function loadSchemaValidators() {
  if (!schemaValidators) {
    const ajv = new Ajv2020({allErrors: true, strict: false});
    schemaValidators = {
      catalog: ajv.compile(await readJson(path.join(SCHEMA_DIR, 'catalog.schema.json'))),
      manifest: ajv.compile(await readJson(path.join(SCHEMA_DIR, 'bundle-manifest.schema.json'))),
    };
  }
  return schemaValidators;
}

export function formatAjvErrors(errors = []) {
  return errors.map((error) => `${error.instancePath || '/'} ${error.message}`).join('; ');
}

function cyclonedxValidator(specVersion) {
  if (!Object.values(Spec.Version).includes(specVersion)) {
    throw new Error(`CycloneDX spec version '${specVersion}' is not supported by the validator.`);
  }
  if (!validators.has(specVersion)) validators.set(specVersion, new Validation.JsonStrictValidator(specVersion));
  return validators.get(specVersion);
}

function* walk(components = []) {
  for (const component of components) {
    yield component;
    yield* walk(component.components);
  }
}

/**
 * Validates one CycloneDX JSON document: schema validity, the declared format version, the
 * root component version, bom-ref uniqueness, and that every dependency edge resolves.
 */
export async function checkSbom(text, {label, formatVersion, expectedVersion, revealPatterns = []}) {
  const errors = [];
  const warnings = [];
  const fail = (message) => errors.push(`${label}: ${message}`);
  const warn = (message) => warnings.push(`${label}: ${message}`);

  let bom;
  try {
    bom = JSON.parse(text);
  } catch (error) {
    fail(`is not valid JSON (${error.message}).`);
    return {errors, warnings};
  }
  if (bom.bomFormat !== 'CycloneDX') fail(`bomFormat is '${bom.bomFormat}', expected 'CycloneDX'.`);
  if (formatVersion && bom.specVersion !== formatVersion) {
    fail(`specVersion is '${bom.specVersion}', but the catalog declares CycloneDX ${formatVersion}.`);
  }
  try {
    const schemaErrors = await cyclonedxValidator(bom.specVersion).validate(text);
    if (schemaErrors) fail(`is not valid CycloneDX ${bom.specVersion}: ${formatAjvErrors(schemaErrors).slice(0, 1500)}`);
  } catch (error) {
    fail(error.message);
  }

  const root = bom.metadata?.component;
  if (!root?.['bom-ref']) {
    fail('has no metadata.component with a bom-ref.');
    return {errors, warnings};
  }
  if (!RTM_VERSION_PATTERN.test(root.version ?? '')) {
    fail(`root component version '${root.version}' is not a numeric RTM version.`);
  }
  if (expectedVersion && root.version !== expectedVersion) {
    fail(`root component version '${root.version}' does not match package version '${expectedVersion}'.`);
  }

  const refs = new Set([root['bom-ref']]);
  for (const component of walk(bom.components)) {
    const ref = component['bom-ref'];
    if (!ref) continue;
    if (refs.has(ref)) fail(`bom-ref '${ref}' is used by more than one component.`);
    refs.add(ref);
  }

  const seenEntries = new Set();
  for (const entry of bom.dependencies ?? []) {
    if (seenEntries.has(entry.ref)) fail(`dependency entry '${entry.ref}' appears more than once.`);
    seenEntries.add(entry.ref);
    if (!refs.has(entry.ref)) fail(`dependency entry '${entry.ref}' does not reference a component.`);
    for (const target of entry.dependsOn ?? []) {
      if (!refs.has(target)) fail(`'${entry.ref}' depends on missing component '${target}'.`);
    }
  }
  if (!seenEntries.has(root['bom-ref'])) fail('the root component has no dependency entry.');

  // Third-party prerelease dependencies are legitimate. A prerelease Reveal-owned component
  // usually means a preview build leaked into an RTM package, so it is surfaced for review.
  const expressions = revealPatterns.map((pattern) => new RegExp(pattern));
  for (const component of walk(bom.components)) {
    const purl = component.purl ?? '';
    if (!expressions.some((expression) => expression.test(purl))) continue;
    if (/[-+]/.test(component.version ?? '')) {
      warn(`Reveal component '${purl}' has prerelease version '${component.version}'.`);
    }
    if (/\.Debug\b/i.test(component.name ?? '')) {
      warn(`Reveal component '${purl}' looks like a debug build.`);
    }
  }
  return {errors, warnings, bom};
}
