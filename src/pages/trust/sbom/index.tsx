import React, {useEffect, useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TrustCenterLayout from '@site/src/components/TrustCenterLayout';
import styles from './styles.module.css';

type SbomScope = 'client' | 'server';

type SbomEntry = {
  architecture: 'browser' | 'independent' | 'linux-x64' | 'win-x64';
  architectureLabel: string;
  downloadUrl: string | null;
  id: string;
  packageVersion: string;
  platform: 'dotnet' | 'java' | 'javascript' | 'node';
  platformLabel: string;
  product: string;
  scope: SbomScope;
  sha256: string | null;
};

type SbomCatalog = {
  entries: SbomEntry[];
  format: {
    mediaType: string;
    name: 'CycloneDX';
    version: string;
  };
  schemaVersion: 1;
};

type LoadState =
  | {status: 'loading'}
  | {message: string; status: 'error'}
  | {catalog: SbomCatalog; status: 'ready'};

const SHA_256_PATTERN = /^[a-fA-F0-9]{64}$/;
const RTM_VERSION_PATTERN = /^[0-9]+(?:\.[0-9]+){1,3}$/;
const SERVER_ARCHITECTURES = new Set(['independent', 'win-x64', 'linux-x64']);
const SERVER_PLATFORMS = new Set(['dotnet', 'java', 'node']);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Catalog field '${field}' must be a non-empty string.`);
  }
  return value;
}

function optionalString(value: unknown, field: string): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  return requireString(value, field);
}

function parseEntry(value: unknown, index: number): SbomEntry {
  if (!isObject(value)) {
    throw new Error(`Catalog entry ${index + 1} is not an object.`);
  }

  const scope = requireString(value.scope, 'scope') as SbomScope;
  const platform = requireString(value.platform, 'platform') as SbomEntry['platform'];
  const architecture = requireString(
    value.architecture,
    'architecture',
  ) as SbomEntry['architecture'];
  const packageVersion = requireString(value.packageVersion, 'packageVersion');
  const downloadUrl = optionalString(value.downloadUrl, 'downloadUrl');
  const sha256 = optionalString(value.sha256, 'sha256');

  if (scope !== 'server' && scope !== 'client') {
    throw new Error(`Catalog entry ${index + 1} has an unsupported scope.`);
  }
  if (!RTM_VERSION_PATTERN.test(packageVersion)) {
    throw new Error(
      `Catalog entry ${index + 1} must use a numeric RTM package version without a prerelease label.`,
    );
  }

  if (scope === 'server') {
    if (!SERVER_PLATFORMS.has(platform)) {
      throw new Error(`Catalog entry ${index + 1} has an unsupported server platform.`);
    }
    if (!SERVER_ARCHITECTURES.has(architecture)) {
      throw new Error(
        `Catalog entry ${index + 1} targets '${architecture}'. Server SBOMs may only be platform-independent or target win-x64 or linux-x64.`,
      );
    }
  } else if (platform !== 'javascript' || architecture !== 'browser') {
    throw new Error(
      `Catalog entry ${index + 1} must use the javascript/browser target for a client SBOM.`,
    );
  }

  if ((downloadUrl === null) !== (sha256 === null)) {
    throw new Error(
      `Catalog entry ${index + 1} must provide both a download URL and SHA-256 checksum, or neither.`,
    );
  }

  if (sha256 && !SHA_256_PATTERN.test(sha256)) {
    throw new Error(`Catalog entry ${index + 1} has an invalid SHA-256 checksum.`);
  }

  return {
    architecture,
    architectureLabel: requireString(value.architectureLabel, 'architectureLabel'),
    downloadUrl,
    id: requireString(value.id, 'id'),
    packageVersion,
    platform,
    platformLabel: requireString(value.platformLabel, 'platformLabel'),
    product: requireString(value.product, 'product'),
    scope,
    sha256,
  };
}

function parseCatalog(value: unknown): SbomCatalog {
  if (!isObject(value)) {
    throw new Error('The SBOM catalog is not a JSON object.');
  }
  if (value.schemaVersion !== 1) {
    throw new Error('The SBOM catalog uses an unsupported schema version.');
  }
  if (!isObject(value.format) || value.format.name !== 'CycloneDX') {
    throw new Error('The SBOM catalog must describe the CycloneDX format.');
  }
  if (!Array.isArray(value.entries)) {
    throw new Error("Catalog field 'entries' must be an array.");
  }

  const entries = value.entries.map(parseEntry);
  const entryIds = new Set<string>();
  const downloadUrls = new Set<string>();
  for (const entry of entries) {
    if (entryIds.has(entry.id)) {
      throw new Error(`Catalog entry id '${entry.id}' is duplicated.`);
    }
    entryIds.add(entry.id);
    if (entry.downloadUrl) {
      if (downloadUrls.has(entry.downloadUrl)) {
        throw new Error(
          `Catalog download URL '${entry.downloadUrl}' is duplicated. Use one platform-independent entry for a shared SBOM.`,
        );
      }
      downloadUrls.add(entry.downloadUrl);
    }
  }

  return {
    entries,
    format: {
      mediaType: requireString(value.format.mediaType, 'format.mediaType'),
      name: 'CycloneDX',
      version: requireString(value.format.version, 'format.version'),
    },
    schemaVersion: 1,
  };
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((left, right) =>
    left.localeCompare(right, undefined, {numeric: true}),
  );
}

function resolveDownloadUrl(downloadUrl: string, catalogUrl: string): string | null {
  try {
    const catalogBase = new URL(catalogUrl, window.location.origin);
    const resolved = new URL(downloadUrl, catalogBase);
    return resolved.protocol === 'https:' || resolved.protocol === 'http:' ? resolved.toString() : null;
  } catch {
    return null;
  }
}

function ProductMark({product}: {product: string}): React.JSX.Element {
  const label = product === 'Reveal AI' ? 'AI' : product === 'Reveal Client' ? 'C' : 'R';
  return <span className={styles.productMark}>{label}</span>;
}

export default function SbomPage(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const configuredCatalogUrl = siteConfig.customFields?.sbomCatalogUrl;
  const catalogUrl =
    typeof configuredCatalogUrl === 'string' && configuredCatalogUrl.trim().length > 0
      ? configuredCatalogUrl
      : '/sbom/catalog.json';

  const [loadState, setLoadState] = useState<LoadState>({status: 'loading'});
  const [reloadKey, setReloadKey] = useState(0);
  const [product, setProduct] = useState('all');
  const [packageVersion, setPackageVersion] = useState('all');
  const [platform, setPlatform] = useState('all');
  const [architecture, setArchitecture] = useState('all');

  useEffect(() => {
    const controller = new AbortController();
    setLoadState({status: 'loading'});

    fetch(catalogUrl, {
      cache: 'no-store',
      headers: {Accept: 'application/json'},
      signal: controller.signal,
    })
      .then(async response => {
        if (!response.ok) {
          throw new Error(`The catalog request returned HTTP ${response.status}.`);
        }
        return response.json() as Promise<unknown>;
      })
      .then(value => setLoadState({catalog: parseCatalog(value), status: 'ready'}))
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }
        const message = error instanceof Error ? error.message : 'The catalog could not be loaded.';
        setLoadState({message, status: 'error'});
      });

    return () => controller.abort();
  }, [catalogUrl, reloadKey]);

  const catalog = loadState.status === 'ready' ? loadState.catalog : null;
  const products = useMemo(
    () => uniqueSorted(catalog?.entries.map(entry => entry.product) ?? []),
    [catalog],
  );
  const packageVersions = useMemo(
    () => uniqueSorted(catalog?.entries.map(entry => entry.packageVersion) ?? []).reverse(),
    [catalog],
  );
  const platforms = useMemo(
    () => uniqueSorted(catalog?.entries.map(entry => entry.platformLabel) ?? []),
    [catalog],
  );
  const architectures = useMemo(
    () => uniqueSorted(catalog?.entries.map(entry => entry.architectureLabel) ?? []),
    [catalog],
  );

  const filteredEntries = useMemo(() => {
    if (!catalog) {
      return [];
    }
    return catalog.entries
      .filter(entry => product === 'all' || entry.product === product)
      .filter(entry => packageVersion === 'all' || entry.packageVersion === packageVersion)
      .filter(entry => platform === 'all' || entry.platformLabel === platform)
      .filter(entry => architecture === 'all' || entry.architectureLabel === architecture)
      .sort((left, right) => {
        const productComparison = left.product.localeCompare(right.product);
        if (productComparison !== 0) return productComparison;
        const versionComparison = right.packageVersion.localeCompare(left.packageVersion, undefined, {
          numeric: true,
        });
        if (versionComparison !== 0) return versionComparison;
        const platformComparison = left.platformLabel.localeCompare(right.platformLabel);
        if (platformComparison !== 0) return platformComparison;
        return left.architectureLabel.localeCompare(right.architectureLabel);
      });
  }, [architecture, catalog, packageVersion, platform, product]);

  function clearFilters(): void {
    setProduct('all');
    setPackageVersion('all');
    setPlatform('all');
    setArchitecture('all');
  }

  return (
    <TrustCenterLayout
      activePage="sbom"
      title="Software Bill of Materials"
      description="Download CycloneDX software bills of materials for Reveal server and browser client releases.">
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <span>Trust Center</span>
        <span aria-hidden="true">/</span>
        <span>SBOMs</span>
      </nav>

      <header className={styles.header}>
        <div>
          <h1>Software Bill of Materials</h1>
          <p>
            Download a CycloneDX SBOM for the exact Reveal package version and runtime
            you deploy.
          </p>
        </div>
        <span className={styles.formatBadge}>
          <span aria-hidden="true">✓</span>
          CycloneDX {catalog?.format.version ?? 'JSON'}
        </span>
      </header>

      <section className={styles.help} aria-labelledby="choose-heading">
        <h2 id="choose-heading">Choosing the correct SBOM</h2>
        <div className={styles.helpGrid}>
          <article>
            <span>1</span>
            <div><h3>Match the package version</h3><p>Use the exact version shown by your installed Reveal package.</p></div>
          </article>
          <article>
            <span>2</span>
            <div><h3>Match the runtime</h3><p>Select .NET, Java, Node, or JavaScript. Match the operating-system architecture when one is listed.</p></div>
          </article>
          <article>
            <span>3</span>
            <div><h3>Download the SBOM</h3><p>Download the CycloneDX JSON document that matches your deployment.</p></div>
          </article>
        </div>
      </section>

      {loadState.status === 'error' && (
        <div className={styles.errorState} role="alert">
          <div>
            <strong>The SBOM catalog is unavailable.</strong>
            <p>{loadState.message}</p>
          </div>
          <button type="button" onClick={() => setReloadKey(value => value + 1)}>
            Try again
          </button>
        </div>
      )}

      <section className={styles.catalog} aria-label="SBOM catalog">

        <div className={styles.filters} aria-label="Filter SBOM catalog">
          <label>
            <span>Product</span>
            <select value={product} onChange={event => setProduct(event.target.value)}>
              <option value="all">All products</option>
              {products.map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>Package version</span>
            <select
              value={packageVersion}
              onChange={event => setPackageVersion(event.target.value)}>
              <option value="all">All package versions</option>
              {packageVersions.map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>Platform</span>
            <select value={platform} onChange={event => setPlatform(event.target.value)}>
              <option value="all">All platforms</option>
              {platforms.map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>Architecture</span>
            <select value={architecture} onChange={event => setArchitecture(event.target.value)}>
              <option value="all">All architectures</option>
              {architectures.map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <button type="button" className={styles.clearButton} onClick={clearFilters}>
            Clear
          </button>
        </div>

        {loadState.status === 'loading' && (
          <div className={styles.loadingState} aria-label="Loading SBOM catalog">
            <span />
            Loading the release catalog…
          </div>
        )}

        {catalog && filteredEntries.length > 0 && (
          <div
            className={styles.tableWrapper}
            role="region"
            aria-label="SBOM catalog results"
            tabIndex={0}>
            <table className={styles.table}>
              <caption>Reveal software bill of materials catalog</caption>
              <colgroup>
                <col className={styles.productColumn} />
                <col className={styles.packageVersionColumn} />
                <col className={styles.platformColumn} />
                <col className={styles.architectureColumn} />
                <col className={styles.sbomColumn} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Package version</th>
                  <th scope="col">Platform</th>
                  <th scope="col">Architecture</th>
                  <th scope="col">SBOM</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map(entry => {
                  const resolvedUrl =
                    entry.downloadUrl && typeof window !== 'undefined'
                      ? resolveDownloadUrl(entry.downloadUrl, catalogUrl)
                      : null;
                  const canDownload = resolvedUrl !== null;
                  return (
                    <tr key={entry.id}>
                      <td>
                        <div className={styles.productCell}>
                          <ProductMark product={entry.product} />
                          <div>
                            <strong>{entry.product}</strong>
                          </div>
                        </div>
                      </td>
                      <td className={styles.packageVersionCell}>{entry.packageVersion}</td>
                      <td>{entry.platformLabel}</td>
                      <td>{entry.architectureLabel}</td>
                      <td className={styles.downloadCell}>
                        {canDownload ? (
                          <a
                            className={styles.downloadButton}
                            href={resolvedUrl}
                            aria-label={`Download ${entry.product} ${entry.packageVersion} ${entry.platformLabel} ${entry.architectureLabel} SBOM`}>
                            <span aria-hidden="true">↓</span>
                            Download JSON
                          </a>
                        ) : (
                          <span className={styles.unavailableBadge}>Coming soon</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {catalog && filteredEntries.length === 0 && (
          <div className={styles.emptyState}>
            <strong>No matching SBOMs</strong>
            <span>Try changing or clearing the filters.</span>
          </div>
        )}
      </section>

    </TrustCenterLayout>
  );
}

