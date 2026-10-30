// Graph operations on CycloneDX JSON documents. The ecosystem tools (cyclonedx-dotnet,
// cyclonedx-maven-plugin, cyclonedx-npm) always describe a throwaway wrapper project that
// references the published packages; these helpers replace that wrapper with the real
// product root, attach embedded binaries found by syft, and drop anything unreachable.
import {randomUUID} from 'node:crypto';

function* walkComponents(components = []) {
  for (const component of components) {
    yield component;
    yield* walkComponents(component.components);
  }
}

export function allComponents(bom) {
  return [...walkComponents(bom.components)];
}

/** Renames bom-refs everywhere they appear (components, metadata, dependency graph). */
export function rewriteRefs(bom, rewrite) {
  const renamed = new Map();
  const roots = [bom.metadata?.component, ...(bom.components ?? [])].filter(Boolean);
  for (const component of walkComponents(roots)) {
    const ref = component['bom-ref'];
    if (!ref) continue;
    const next = rewrite(ref, component);
    if (next !== ref) {
      renamed.set(ref, next);
      component['bom-ref'] = next;
    }
  }
  const map = (ref) => renamed.get(ref) ?? ref;
  for (const entry of bom.dependencies ?? []) {
    entry.ref = map(entry.ref);
    entry.dependsOn = (entry.dependsOn ?? []).map(map);
  }
}

function dependencyMap(bom) {
  bom.dependencies ??= [];
  return new Map(bom.dependencies.map((entry) => [entry.ref, entry]));
}

function dependsOnOf(bom, ref) {
  return dependencyMap(bom).get(ref)?.dependsOn ?? [];
}

function setDependsOn(bom, ref, dependsOn) {
  const existing = dependencyMap(bom).get(ref);
  const unique = [...new Set(dependsOn)];
  if (existing) existing.dependsOn = unique;
  else bom.dependencies.push({ref, dependsOn: unique});
}

function removeDependencyEntry(bom, ref) {
  bom.dependencies = (bom.dependencies ?? []).filter((entry) => entry.ref !== ref);
}

function wrapperDirectDependencies(bom) {
  const wrapperRef = bom.metadata?.component?.['bom-ref'];
  if (!wrapperRef) throw new Error('The generated BOM has no metadata.component to replace.');
  return {wrapperRef, direct: dependsOnOf(bom, wrapperRef)};
}

/**
 * Makes one of the wrapper project's direct dependencies the document root, which is how a
 * single-package SBOM is expressed: metadata.component is the published package itself.
 */
export function promoteDirectDependency(bom, purl) {
  const {wrapperRef, direct} = wrapperDirectDependencies(bom);
  const byRef = new Map(bom.components.map((component) => [component['bom-ref'], component]));
  // Tools add qualifiers (?type=jar), so compare the purl without them.
  const matches = direct.filter((ref) => (byRef.get(ref)?.purl ?? '').split('?')[0] === purl);
  if (matches.length !== 1) {
    throw new Error(
      `Expected exactly one direct dependency with purl '${purl}', found ${matches.length}. Direct dependencies: ${direct.join(', ')}`,
    );
  }
  const [rootRef] = matches;
  const root = byRef.get(rootRef);
  // The wrapper references only this package, so every other direct dependency would be an
  // artifact of the wrapper itself; keep them reachable anyway rather than silently drop them.
  const others = direct.filter((ref) => ref !== rootRef);
  bom.components = bom.components.filter((component) => component['bom-ref'] !== rootRef);
  removeDependencyEntry(bom, wrapperRef);
  setDependsOn(bom, rootRef, [...dependsOnOf(bom, rootRef), ...others]);
  delete root.scope;
  bom.metadata.component = root;
  return root;
}

/**
 * Replaces the wrapper project with a synthetic root (an aggregate, or a runtime-specific
 * distribution) that depends on everything the wrapper referenced directly.
 */
export function synthesizeRoot(bom, root) {
  const {wrapperRef, direct} = wrapperDirectDependencies(bom);
  removeDependencyEntry(bom, wrapperRef);
  bom.components = bom.components.filter((component) => component['bom-ref'] !== root['bom-ref']);
  bom.metadata.component = root;
  setDependsOn(bom, root['bom-ref'], direct);
  return root;
}

/**
 * Keeps matching components as leaves. Used for additive packages (Reveal AI) whose SBOM
 * references the Reveal Server SDK but must not repeat its whole dependency tree.
 */
export function applyBoundaries(bom, patterns = []) {
  const expressions = patterns.map((pattern) => new RegExp(pattern));
  for (const component of allComponents(bom)) {
    if (expressions.some((expression) => expression.test(component.purl ?? ''))) {
      setDependsOn(bom, component['bom-ref'], []);
    }
  }
}

/**
 * Merges a syft scan of an embedded .NET payload (the Reveal engine inside a JAR or the
 * engine binary downloaded by the npm install script) into the document.
 */
export function mergeEmbedded(bom, embeddedBom, {engineComponent} = {}) {
  const existingRefs = new Set(allComponents(bom).map((component) => component['bom-ref']));
  const scanned = (embeddedBom.components ?? []).filter((component) => component.type !== 'file');
  const scannedRefs = new Set(scanned.map((component) => component['bom-ref']));
  for (const component of scanned) {
    if (!existingRefs.has(component['bom-ref'])) bom.components.push(component);
  }
  const referenced = new Set();
  for (const entry of embeddedBom.dependencies ?? []) {
    if (!scannedRefs.has(entry.ref)) continue;
    const dependsOn = (entry.dependsOn ?? []).filter((ref) => scannedRefs.has(ref));
    dependsOn.forEach((ref) => referenced.add(ref));
    setDependsOn(bom, entry.ref, [...dependsOnOf(bom, entry.ref), ...dependsOn]);
  }
  const scanRoots = [...scannedRefs].filter((ref) => !referenced.has(ref));
  if (scanRoots.length === 0) throw new Error('The embedded payload scan found no packages.');

  const rootRef = bom.metadata.component['bom-ref'];
  if (engineComponent) {
    bom.components.push(engineComponent);
    setDependsOn(bom, engineComponent['bom-ref'], scanRoots);
    setDependsOn(bom, rootRef, [engineComponent['bom-ref'], ...dependsOnOf(bom, rootRef)]);
  } else {
    setDependsOn(bom, rootRef, [...dependsOnOf(bom, rootRef), ...scanRoots]);
  }
  addTools(bom, embeddedBom.metadata?.tools);
}

export function addTools(bom, tools) {
  const incoming = Array.isArray(tools) ? tools : tools?.components ?? [];
  if (incoming.length === 0) return;
  bom.metadata.tools ??= {components: []};
  if (Array.isArray(bom.metadata.tools)) bom.metadata.tools = {components: bom.metadata.tools};
  bom.metadata.tools.components ??= [];
  const known = new Set(bom.metadata.tools.components.map((tool) => `${tool.name}@${tool.version}`));
  for (const tool of incoming) {
    const key = `${tool.name}@${tool.version}`;
    if (!known.has(key)) {
      bom.metadata.tools.components.push({type: tool.type ?? 'application', ...tool});
      known.add(key);
    }
  }
}

/** Drops components and dependency entries that are not reachable from the root. */
export function prune(bom) {
  const rootRef = bom.metadata.component['bom-ref'];
  const deps = dependencyMap(bom);
  const reachable = new Set([rootRef]);
  const queue = [rootRef];
  while (queue.length > 0) {
    for (const ref of deps.get(queue.shift())?.dependsOn ?? []) {
      if (!reachable.has(ref)) {
        reachable.add(ref);
        queue.push(ref);
      }
    }
  }
  const keep = (component) =>
    [...walkComponents([component])].some((nested) => reachable.has(nested['bom-ref']));
  const before = allComponents(bom).length;
  bom.components = bom.components.filter(keep);
  const knownRefs = new Set([rootRef, ...allComponents(bom).map((component) => component['bom-ref'])]);
  bom.dependencies = bom.dependencies
    .filter((entry) => knownRefs.has(entry.ref))
    .map((entry) => ({...entry, dependsOn: (entry.dependsOn ?? []).filter((ref) => knownRefs.has(ref))}));
  return before - allComponents(bom).length;
}

export function mergeProperties(...lists) {
  const seen = new Map();
  for (const property of lists.flat().filter(Boolean)) seen.set(`${property.name}\u0000${property.value}`, property);
  return [...seen.values()];
}

export function mergeExternalReferences(...lists) {
  const seen = new Map();
  for (const reference of lists.flat().filter(Boolean)) seen.set(reference.type, reference);
  return [...seen.values()];
}

/** Stamps the document identity and orders arrays so reruns produce reviewable diffs. */
export function finalize(bom, {specVersion}) {
  const key = (component) => component.purl ?? component['bom-ref'] ?? component.name;
  bom.$schema = `http://cyclonedx.org/schema/bom-${specVersion}.schema.json`;
  bom.bomFormat = 'CycloneDX';
  // cyclonedx-maven-plugin 2.9.x emits at most 1.6. Every 1.6 document is a valid 1.7
  // document, so the version label is raised to the catalog's format version; validate.mjs
  // then checks the result against the 1.7 schema.
  bom.specVersion = specVersion;
  bom.serialNumber = `urn:uuid:${randomUUID()}`;
  bom.version = 1;
  bom.metadata.timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  bom.components.sort((left, right) => key(left).localeCompare(key(right)));
  bom.dependencies.sort((left, right) => left.ref.localeCompare(right.ref));
  for (const entry of bom.dependencies) entry.dependsOn.sort();
  const {$schema, bomFormat, specVersion: spec, serialNumber, version, metadata, components, dependencies, ...rest} = bom;
  return {$schema, bomFormat, specVersion: spec, serialNumber, version, metadata, components, dependencies, ...rest};
}
