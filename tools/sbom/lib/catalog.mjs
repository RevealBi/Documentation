import {RTM_VERSION_PATTERN, compareVersions} from './util.mjs';

export const LAYOUTS = ['docs', 'storage'];

/**
 * Catalog-relative path of a published artifact. Download URLs stay relative, so the catalog
 * and its files can move together between staging and production prefixes.
 *   storage: reveal-server/dotnet/2.2.1/reveal-server-dotnet-2.2.1-sbom.zip
 *   docs:    bundles/reveal-server/dotnet/2.2.1/...  (the static/sbom fallback in this repo)
 */
export function artifactPath(layout, {productKey, platformKey, version, artifactType, fileName}) {
  const tail = `${productKey}/${platformKey}/${version}/${fileName}`;
  if (layout === 'storage') return tail;
  if (layout === 'docs') return `${artifactType === 'bundle' ? 'bundles' : 'files'}/${tail}`;
  throw new Error(`Unknown layout '${layout}'. Use one of: ${LAYOUTS.join(', ')}.`);
}

export function entryId(productKey, version, platformKey) {
  return `${productKey}-${version}-${platformKey}`;
}

/** Orders entries by configured product and platform order, newest version first. */
export function sortEntries(config, entries) {
  const productOrder = Object.values(config.products).map((product) => product.name);
  const platformOrder = ['dotnet', 'java', 'node', 'javascript'];
  const rank = (list, value) => (list.includes(value) ? list.indexOf(value) : list.length);
  return [...entries].sort(
    (left, right) =>
      rank(productOrder, left.product) - rank(productOrder, right.product) ||
      rank(platformOrder, left.platform) - rank(platformOrder, right.platform) ||
      compareVersions(right.packageVersion, left.packageVersion),
  );
}

/** Checks the rules JSON Schema cannot express; mirrors the Trust Center page's own parser. */
export function checkCatalogSemantics(catalog) {
  const errors = [];
  const ids = new Set();
  const urls = new Set();
  for (const entry of catalog.entries ?? []) {
    if (ids.has(entry.id)) errors.push(`Catalog entry id '${entry.id}' is duplicated.`);
    ids.add(entry.id);
    if (urls.has(entry.downloadUrl)) errors.push(`Catalog download URL '${entry.downloadUrl}' is duplicated.`);
    urls.add(entry.downloadUrl);
    if (!RTM_VERSION_PATTERN.test(entry.packageVersion ?? '')) {
      errors.push(`Catalog entry '${entry.id}' uses non-RTM version '${entry.packageVersion}'.`);
    }
    if (typeof entry.downloadUrl === 'string' && /^http:\/\//i.test(entry.downloadUrl)) {
      errors.push(`Catalog entry '${entry.id}' must not use a plain HTTP download URL.`);
    }
  }
  return errors;
}
