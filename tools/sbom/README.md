# Reveal SBOM tools

Generates, validates, and publishes the CycloneDX SBOMs listed on the Trust Center
([`/trust/sbom`](../../src/pages/trust/sbom/index.tsx)) for Reveal RTM releases.

Every SBOM is generated from the **exact packages already published** to NuGet, Maven
(`maven.revealbi.io`), npm, and `dl.infragistics.com`. No local build output is involved,
so an SBOM describes what customers actually install.

The directory is self-contained (its own `package.json`, no dependency on the docs site),
so it can move into a release or Trust Center repository unchanged.

## Release process

1. **Publish the RTM packages.** NuGet, Maven, and npm packages must be final.
2. **Run [Publish SBOM Catalog](../../.github/workflows/publish-sbom-catalog.yml)**,
   either manually or from the product's release pipeline (see below). It:
   1. validates the inputs (a preview or CI version is rejected before anything runs);
   2. generates the SBOMs for each platform in parallel;
   3. bundles them into ZIPs with a `manifest.json` where the platform uses bundles;
   4. merges the new entries into the current `catalog.json`;
   5. validates everything (see [Validation](#validation));
   6. waits for approval on the `sbom-production` environment;
   7. publishes to the chosen target.
3. **Targets**
   - `dry-run`: generate and validate only. The result is the run's `sbom-release` artifact.
   - `docs-pr`: opens a pull request that adds the files to `static/sbom`. This is the
     interim target until public storage exists.
   - `storage`: uploads to public storage. SBOM files are uploaded first and checked for
     public reachability and SHA-256; the current catalog is backed up to `catalog-history/`;
     `catalog.json` is replaced **last**. The Trust Center never lists a file that cannot be
     downloaded yet.
4. **Rollback.** For storage, run
   [Restore SBOM Catalog](../../.github/workflows/restore-sbom-catalog.yml). Run it with no
   input to list the saved catalogs, or with a file name to validate that catalog and restore
   it. SBOM files are never deleted, so no rebuild is needed. For `docs-pr`, revert the pull
   request.

### Triggering from a release pipeline

```bash
gh api repos/RevealBi/Documentation/dispatches \
  -f event_type=rtm-packages-published \
  -F 'client_payload[product]=reveal-server' \
  -F 'client_payload[version]=2.2.2' \
  -F 'client_payload[platform]=all' \
  -F 'client_payload[target]=docs-pr'
```

The token needs `contents: write` on this repository. `platform` defaults to `all` and
`target` to `docs-pr`. The approval gate still applies.

### One-time repository setup

| Setting | Kind | Purpose |
| --- | --- | --- |
| `sbom-production` | Environment | Add required reviewers. Every publication and restore waits for approval. |
| `SBOM_PR_TOKEN` | Secret (optional) | Token for `docs-pr`. Pull requests opened with `GITHUB_TOKEN` do not trigger other workflows, including their own validation. |
| `SBOM_CATALOG_URL` | Variable | Public `catalog.json` URL. Also read by the docs build (`docs.yml`) and the weekly validation. |
| `SBOM_STORAGE_BUCKET`, `SBOM_STORAGE_PREFIX` (default `sbom`), `SBOM_STORAGE_REGION` | Variables | Storage location, for the `storage` target. |
| `SBOM_CLOUDFRONT_DISTRIBUTION_ID` | Variable (optional) | Invalidates `catalog.json` after publishing or restoring. |
| `SBOM_AWS_ACCESS_KEY_ID`, `SBOM_AWS_SECRET_ACCESS_KEY` | Secrets | Write access to the storage prefix only. |

The storage steps assume an S3 bucket behind a CDN (the same stack as the docs site). If
the final location is something else, replace only the upload, backup, and restore steps.
Before the first `storage` run, seed the location with the SBOM files and a `catalog.json`
built with `--layout storage`.

### Storage layout

```text
sbom/catalog.json
sbom/catalog-history/catalog-20260925T120000Z.json
sbom/reveal-server/dotnet/2.2.1/reveal-server-dotnet-2.2.1-sbom.zip
sbom/reveal-server/java/2.2.1/reveal-server-java-2.2.1-sbom.zip
sbom/reveal-server/node/2.2.1/reveal-server-node-2.2.1-sbom.zip
sbom/reveal-ai/dotnet/1.5.213/reveal-ai-dotnet-1.5.213-sbom.zip
sbom/reveal-ai/java/1.2.0/reveal-sdk-ai-java-1.2.0.cdx.json
sbom/reveal-client/javascript/2.2.1/reveal-sdk-client-2.2.1.cdx.json
```

Download URLs in the catalog are relative, so the catalog and its files move together
between prefixes. The `docs` layout used for `static/sbom` adds a `bundles/` or `files/`
segment in front.

## How SBOMs are generated

| Platform | Dependency graph | Embedded .NET payload |
| --- | --- | --- |
| .NET (NuGet) | A wrapper `.csproj` references the packages, restored only from nuget.org; `CycloneDX` for .NET. | none |
| Java (Maven) | A wrapper `pom.xml` references the artifacts; `cyclonedx-maven-plugin`. The OS-activated engine profiles are excluded and the target OS engine is added explicitly, so one Linux runner produces both Windows and Linux SBOMs. | syft scans the engine JAR's `RevealEnginePrg` |
| Node (npm) | A wrapper `package.json` installed with `--os`/`--cpu` for the target and `--ignore-scripts`; `cyclonedx-npm`. | syft scans the engine that the package's install script would download from `dl.infragistics.com` |
| JavaScript (npm) | As for Node. | none |

The generator then:

- replaces the wrapper project with the real root: the published package itself, or a
  synthetic aggregate or runtime root with `arch`/`os` purl qualifiers;
- records supplier, website, documentation, and distribution URL, adds `io.revealbi.sbom.*`
  properties, and hashes the published archive when the tool did not;
- for additive packages (Reveal AI Java/Node), stops at the Reveal Server SDK dependency
  (`boundaries`), because customers pair it with the matching server SBOM;
- drops components that are not reachable from the root, then orders the output so reruns
  produce reviewable diffs.

Regenerating the 2.2.1 Reveal Server documents and the 1.5.213 Reveal AI .NET documents
reproduces the published component sets exactly.

## Configuration

[`sbom.config.json`](sbom.config.json) describes every product platform: the packages, how
documents are grouped into a bundle, labels, and the embedded payloads. Common changes:

- **New connector or AI provider package:** add its package id to the `forEach` list.
  Aggregates that reference `@connector` or `@package` pick it up automatically.
- **New platform or runtime:** add a document with its `root`, `npmTarget` or
  `mavenExclusions`, and `embedded` source.
- **Tool versions:** `tools` pins CycloneDX for .NET and the Maven plugin.
  `package.json` pins `cyclonedx-npm`, and the workflow pins syft.

## Validation

`validate.mjs` blocks publication when:

- `catalog.json` fails `static/sbom/catalog.schema.json`, or has duplicate ids or download URLs;
- a catalog entry, or the root component of any SBOM, has a non-numeric (preview or CI) version;
- a download is unreachable, or its SHA-256 does not match the catalog;
- a bundle's `manifest.json` fails `static/sbom/bundle-manifest.schema.json`, disagrees with
  its catalog entry, lists a missing file or a file with a different SHA-256, or the ZIP
  contains an SBOM that `manifest.json` does not list;
- an SBOM is not valid CycloneDX (strict JSON schema validation), is a different spec
  version from the catalog, reuses a `bom-ref`, or has a dependency on a missing component.

It warns, without failing unless `--strict` is passed, when a Reveal-owned component has a
prerelease version or looks like a debug build.

`merge-catalog.mjs` treats published entries as immutable. An existing id with a different
artifact is rejected unless `--allow-replace` / `allow_replace` is set.

## Running locally

Requirements: Node 20+, and for the platforms you generate: .NET SDK 8+ with
`dotnet tool install -g CycloneDX --version 6.2.0`, JDK 17 with Maven, and syft. Set
`CYCLONEDX_DOTNET`, `MVN`, or `SYFT` if the tools are not on `PATH`.

```bash
cd tools/sbom
npm ci
npm run validate:docs                                   # validate static/sbom
node generate.mjs --product reveal-server --platform node --version 2.2.1 --out out
node merge-catalog.mjs --catalog ../../static/sbom/catalog.json --entries out/entries \
  --output out/site/catalog.json --changed-ids-file out/changed-ids.txt
node validate.mjs --catalog out/site/catalog.json --ids "$(cat out/changed-ids.txt)"
```

Use `--keep-work` to keep the wrapper projects and downloads under `out/.work`.

## Known limitations

- **Reveal AI Java and Node** embed .NET assemblies without a `*.deps.json`. syft can then
  identify them only from assembly metadata (for example
  `Microsoft.Extensions.AI.Abstractions@10.800.326.37702` instead of `10.8.3`), and the
  generator warns about it. The fix belongs in the AI plugin build: ship
  `AIPlugin.deps.json` in the JAR and npm package. Until then, review these two SBOMs by
  hand.
- **Version ranges** are resolved at generation time. For example, the published
  `reveal-sdk-core` POM declares `jackson-databind [2.13,3.0)`, and `reveal-sdk-node-ai`
  declares `reveal-sdk-node >=2.2.0`. The SBOM records the version resolved on the day it
  was generated.
- `cyclonedx-maven-plugin` 2.9.x writes CycloneDX 1.6. The output is labelled 1.7, which
  is a strict superset, and validated against the 1.7 schema.
