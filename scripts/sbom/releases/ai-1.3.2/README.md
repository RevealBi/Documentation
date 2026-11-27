# Reveal AI 1.3.2 SBOM and VEX assessment

Generated on November 26, 2026 from the published Java and Node packages.

The assessment contains **2 CycloneDX 1.7 SBOMs** with **29 embedded VEX statements**: **26 not affected, 0 exploitable and 3 in triage**. The folder uses the `ai-` prefix because Reveal AI is versioned independently of the Reveal SDK.

## Artifacts

| Package | Published | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `io.revealbi:reveal-sdk-ai:1.3.2` JAR | 2026-11-19 | 7958644 | `c20c730ab1fd6e5fa4cc56d8816e0c84af0a22a4140a1971330a8bef1b9304eb` |
| `io.revealbi:reveal-sdk-ai:1.3.2` POM | 2026-11-19 | 3984 | `c106c4e7ab169f91c3a53b437f16a4583a9a30257378c3fca5e35192a6616ae4` |
| `reveal-sdk-node-ai-1.3.2.tgz` | 2026-11-19 | 8035984 | `aa271918941784402158c2ec5a54765ba3cf56e439e2895fa38b6b81b9e97a9d` |

The JAR and POM matched the repository `.sha1` files, and the tarball matched the registry `dist.integrity`. 1.3.2 supersedes 1.3.0 and 1.3.1, which have no separate SBOM.

## Coverage

| Document | Components | VEX statements |
| --- | ---: | ---: |
| `reveal-ai/java/1.3.2/reveal-sdk-ai-java-1.3.2.cdx.json` | 54 | 23 |
| `reveal-ai/node/1.3.2/reveal-sdk-ai-node-1.3.2.cdx.json` | 123 | 6 |

- **Java**: the AI JAR plus the Maven runtime dependencies its POM declares: `reveal-sdk-servlet` 2.3.0, `reveal-sdk-core` 2.3.0, Jetty 12.0.12, org.json 20231013, SLF4J API 2.0.13 and Jackson 2.17.2. When an application uses a newer Reveal Java SDK, the Reveal SDK, Jetty and related entries follow that SDK's dependencies, but `jackson-databind` still resolves to 2.17.2 because `reveal-sdk-ai` declares it directly, unless the application declares `jackson-databind` itself.
- **Node**: the AI tarball plus the npm production dependencies of a clean install on 2026-11-26 (82 packages). The declared range `reveal-sdk-node >=2.3.0` resolved to 2.3.2. A later install can select different versions.
- **Both**: the 43 .NET files bundled under `native/` are identical in the JAR and the tarball. They are inventoried as 41 components (39 NuGet packages and 2 generic first-party components), with the references between them recorded as `dependsOn` relationships.
- Neither package contains OS- or architecture-specific binaries, so each platform has one platform-independent SBOM, as for 1.2.0.

## VEX statements

| Status | Component | Advisory | Recommendation |
| --- | --- | --- | --- |
| In triage | basic-ftp 5.3.1, Node graph (via reveal-sdk-node 2.3.2) | [GHSA-5pm8-86m8-9m6r](https://github.com/advisories/GHSA-5pm8-86m8-9m6r), [GHSA-c475-qrg2-pj4r](https://github.com/advisories/GHSA-c475-qrg2-pj4r), [GHSA-r4jh-29pc-gfqr](https://github.com/advisories/GHSA-r4jh-29pc-gfqr) | Do not set FTP-based proxy auto-configuration (PAC) URLs in the proxy environment variables of the Reveal server process. |

The other 26 statements are `not_affected`. Each decision, with its justification, is recorded in [vex-assessments.json](./vex-assessments.json) and embedded in the SBOMs. A not-affected decision applies to Reveal's use of the component in the stated configuration; it does not mean the upstream component is fixed. Application code that uses the same components directly needs its own assessment. This is a static assessment of the released packages.

## Tools

| Tool | Version | Used for |
| --- | --- | --- |
| Apache Maven | 3.9.16 | Dependency resolution |
| cyclonedx-maven-plugin | 2.9.3 | Java Maven graph (`makeBom`) |
| syft | 1.57.2 | npm package catalog and .NET assembly discovery |
| npm | 11.4.2 | Clean production install (`--ignore-scripts --omit=dev`); dependency edges from `package-lock.json` |
| OSV-Scanner | 2.7.1 | Offline scan |
| ajv | 8.17.1 | CycloneDX 1.7 and repository schema validation |

## Scan and verification

OSV-Scanner 2.7.1 used complete NuGet, npm and Maven `all.zip` databases downloaded on November 26, 2026, with `--offline --no-resolve --no-ignore --all-packages`. No package inventory was sent to an advisory service. [scan-summary.json](./scan-summary.json) records coverage and the database SHA-256 hashes.

Both SBOMs were validated against the official CycloneDX 1.7 JSON schema, and their dependency and VEX references were checked. The catalog SHA-256 values were recomputed.

## Not included

- The Java SBOM does not include the `reveal-sdk-engine-<os>-<arch>` 2.3.0 JAR that reveal-sdk-core 2.3.0 selects through OS-activated Maven profiles.
- The Node SBOM does not include the engine that the reveal-sdk-node install script downloads; the Reveal Server Node 2.3.2 SBOMs cover it. The headless browser that reveal-sdk-node downloads at runtime is not included.
- The bundled .NET assemblies also load assemblies provided by the host Reveal engine at runtime (for example `Newtonsoft.Json`, `NLog`, `Azure.Core`, `Microsoft.Extensions.*`). Those host assemblies are not inventoried here.
- `native/.playwright/package/` in both packages contains only `playwright-core` 1.55.0-beta metadata files (`package.json`, `api.json`, `browsers.json`, `deviceDescriptorsSource.json`) and no executable code. It is not inventoried as a package.
- The scan covers package identities supported by OSV. Generic first-party components, host OS libraries and host application code need separate assessment.

## Reapplying the decisions

Scan the two SBOMs with OSV-Scanner using the options above, then run the repository's `apply-vex.mjs` with `--scan <osv-results.json> --assessments vex-assessments.json --sbom-root <directory containing the SBOMs>`. The script fails when a finding has no decision, so run a new assessment when package versions or database snapshots change.
