# Reveal AI 1.3.2 SBOM and VEX assessment

Generated on November 26, 2026 from the published Java and Node packages. **Draft: release-owner approval is required before publication** under [the SBOM maintenance process](../../README.md).

The assessment contains **2 CycloneDX 1.7 SBOMs**, **29 embedded VEX statements** and **29 distinct package/version/advisory decisions**: **26 not affected, 0 exploitable and 3 in triage**. The folder uses the `ai-` prefix because Reveal AI is versioned independently of the Reveal SDK.

## Artifacts

| Package | Published | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `io.revealbi:reveal-sdk-ai:1.3.2` JAR | 2026-11-19 | 7958644 | `c20c730ab1fd6e5fa4cc56d8816e0c84af0a22a4140a1971330a8bef1b9304eb` |
| `io.revealbi:reveal-sdk-ai:1.3.2` POM | 2026-11-19 | 3984 | `c106c4e7ab169f91c3a53b437f16a4583a9a30257378c3fca5e35192a6616ae4` |
| `reveal-sdk-node-ai-1.3.2.tgz` | 2026-11-19 | 8035984 | `aa271918941784402158c2ec5a54765ba3cf56e439e2895fa38b6b81b9e97a9d` |

The JAR and POM matched the repository `.sha1` files, and the tarball matched the registry `dist.integrity`. [provenance.json](./provenance.json) lists every downloaded runtime dependency, the NuGet packages used for assembly identification, and the tool archives with their SHA-256 values. 1.3.0 and 1.3.1 (published November 6 and 17) were not assessed; 1.3.2 supersedes them.

## Coverage

| Document | Components | VEX statements |
| --- | ---: | ---: |
| `reveal-ai/java/1.3.2/reveal-sdk-ai-java-1.3.2.cdx.json` | 54 | 23 |
| `reveal-ai/node/1.3.2/reveal-sdk-ai-node-1.3.2.cdx.json` | 123 | 6 |

- **Java**: the AI JAR plus the Maven runtime graph its POM declares: `reveal-sdk-servlet` 2.3.0, `reveal-sdk-core` 2.3.0, Jetty 12.0.12, org.json 20231013, SLF4J API 2.0.13 and Jackson 2.17.2. The AI POM pins `jackson-databind` 2.17.2, which overrides the core `[2.13,3.0)` range, so reveal-sdk-core 2.3.0 also runs on Jackson 2.17.2.
- **Node**: the AI tarball plus the npm production graph of a clean install on 2026-11-26 (82 packages). The declared range `reveal-sdk-node >=2.3.0` resolved to 2.3.2. A later install can select different versions.
- **Both**: the 42 .NET files bundled under `native/` are byte-identical in the JAR and the tarball, and are inventoried as 39 NuGet components and 2 generic first-party components (`AIPlugin` 2.3.0.0, `Reveal.Sdk.AI.Abstractions.Debug`). Each third-party assembly and `Reveal.Sdk.Dom` 0.1.689-beta matched the SHA-256 of the same file in the published NuGet package. The six `Reveal.Sdk.AI*` assemblies report version `1.7.21-preview+5ada28193e`, the same version and commit as the NuGet packages, but are a separate plugin build, so they are not byte-identical. Each component records this in `infragistics:nuget-binary-match` and `infragistics:build-variant`.
- Neither package contains OS- or architecture-specific binaries, so each platform has one platform-independent SBOM, as for 1.2.0.

## Findings requiring action

| Status | Component | Advisory | Action |
| --- | --- | --- | --- |
| In triage | basic-ftp 5.3.1, Node graph (via reveal-sdk-node 2.3.2) | [GHSA-5pm8-86m8-9m6r](https://github.com/advisories/GHSA-5pm8-86m8-9m6r), [GHSA-c475-qrg2-pj4r](https://github.com/advisories/GHSA-c475-qrg2-pj4r), [GHSA-r4jh-29pc-gfqr](https://github.com/advisories/GHSA-r4jh-29pc-gfqr) | Same packages and decision as the Reveal 2.3.2 assessment. Review FTP-backed PAC proxy configuration. Fixed basic-ftp releases exist only in 6.x, and get-uri 6.0.5 requires `^5.0.2`, so the fix needs an upstream get-uri update or a tested application-level npm override. |

Other notes for the release owner:

- **The Jetty decisions were re-derived, not copied from 2.3.2.** In reveal-sdk-core 2.3.0, `CallbackServer.start()` does not call `ServerConnector.setHost`, so the callback listener binds the wildcard address on an ephemeral port. Core 2.3.2 binds it to `127.0.0.1`. Every callback route still requires the per-process `RevealBI-Auth` token (`UUID.randomUUID()`), and none of the six Jetty advisories applies to this configuration (see the decision details). Applications that use Reveal AI 1.3.2 with Reveal Java SDK 2.3.2 or later get the loopback binding.
- **16 of the 23 Java statements are Jackson 2.17.2 advisories**, all not affected for Reveal's code paths, which use only default `ObjectMapper` instances, `readTree(String)` and untyped tree/map conversion. The pin comes from the AI POM. Host application code that uses the same Jackson JAR needs its own assessment. Declaring a current Jackson 2.x release in the application, or raising the pin in a later AI release, removes these matches.

All 29 decisions, their scope, rationale and affected documents are recorded in [vex-assessments.json](./vex-assessments.json). A not-affected decision is conditional on the stated runtime, code path or configuration; it does not mean the upstream component is fixed. This is a static artifact/configuration assessment, not an exploit test or penetration test.

## Decision reuse

| Packages | Source | Basis for reuse |
| --- | --- | --- |
| Jackson 2.17.2 (16) | New; 13 were also matched for 1.2.0 | Re-derived from bytecode of reveal-sdk-ai 1.3.2 and reveal-sdk-core/servlet 2.3.0. Jackson resolved to 2.23.0 in the 2.3.2 assessment, so core's own Jackson use had not been assessed against 2.17.2. |
| Jetty 12.0.12 (6) | Re-derived | `CallbackServer` differs between core 2.3.0 and 2.3.2 (see above). |
| org.json 20231013 (1) | Same conclusion as 2.3.2 | Re-checked: no class in any JAR of the 1.3.2 graph references `org/json`. |
| basic-ftp, extract-zip, zod (6) | 2.3.2 | reveal-sdk-node 2.3.2 has the SHA-256 recorded in the 2.3.2 provenance, and every package on these chains has identical version and integrity. `reveal-sdk-node-ai` adds no caller: `index.js` requires only `fs` and `path`. |

## Tools

| Tool | Version | Used for |
| --- | --- | --- |
| Apache Maven | 3.9.16 | Dependency resolution, `dependency:tree`, `dependency:copy-dependencies` |
| cyclonedx-maven-plugin | 2.9.3 | Java Maven graph (`makeBom`) |
| syft | 1.57.2 | npm package catalog and .NET assembly discovery |
| npm | 11.4.2 | `npm pack`, clean production install (`--ignore-scripts --omit=dev`); dependency edges from `package-lock.json` |
| OSV-Scanner | 2.7.1 | Offline scan |
| javap (JDK) | 21.0.12.1 | Bytecode review |
| ilspycmd | 9.1.0.7988 | First-party assembly comparison |
| ajv | 8.17.1 | CycloneDX 1.7 and repository schema validation |

1.2.0 used cyclonedx-maven-plugin 2.9.1 and syft 1.52.0.

## Scan and verification

OSV-Scanner 2.7.1 used complete NuGet, npm and Maven `all.zip` databases downloaded on November 26, 2026, with `--offline --no-resolve --no-ignore --all-packages`. No package inventory was sent to an advisory service. Both documents were extracted (54 and 123 packages); OSV filtered 4 generic components. There were no NuGet matches. [scan-summary.json](./scan-summary.json) records coverage and database SHA-256 hashes.

Both SBOMs were validated against the official CycloneDX 1.7 JSON schema (specification tag 1.7.2, the same schema hashes as the 2.3.2 assessment), and their dependency and VEX references were checked. The catalog and all bundle manifests were validated against the repository schemas, and every stored SHA-256 was recomputed. `apply-vex.test.mjs` passed, and the site build lists both new entries.

## Limits

- The Java SBOM excludes the `reveal-sdk-engine-<os>-<arch>` 2.3.0 JAR that reveal-sdk-core 2.3.0 selects through OS-activated Maven profiles. The SBOM catalog has no Reveal Server 2.3.0 SBOM, so that engine is not covered by any published SBOM.
- The Node SBOM excludes the engine that the reveal-sdk-node install script downloads; the Reveal Server Node 2.3.2 SBOMs cover it. Chrome Headless Shell (132.0.6834.110), downloaded at runtime, is outside scan coverage.
- The bundled .NET assemblies bind to assemblies provided by the host Reveal engine at runtime (for example `Newtonsoft.Json`, `NLog`, `Azure.Core`, `Microsoft.Extensions.*`). They are listed in `evidence/native-assembly-references.json` and are not inventoried here.
- `native/.playwright/package/` in both packages contains only `playwright-core` 1.55.0-beta metadata files (`package.json`, `api.json`, `browsers.json`, `deviceDescriptorsSource.json`) and no executable code. It is not inventoried as a package.
- The scan covers package identities supported by OSV. Generic first-party components, host OS libraries and host application code need separate assessment.

## Reproduction and evidence

[provenance.json](./provenance.json) records release identity and artifact hashes. `assessment-evidence.zip` contains the scan output and log, the Maven wrapper project and host-activated dependency tree, the npm lockfile, the published POMs, the assembly-to-NuGet map, the static bytecode review, the first-party build comparison, the npm chain comparison, and the generation and validation scripts. Downloaded binaries, databases, tool installations and decompiled proprietary code stay in the local generation cache and are not included.

`reveal-ai-1.3.2-sbom-vex.zip` contains both SBOMs, the assessment records and the evidence archive. Its `osv-results.json` uses portable `files/...` paths. To reapply the decisions after extracting it, run the repository's `apply-vex.mjs` with `--scan osv-results.json --assessments vex-assessments.json --sbom-root files` from the extracted directory. Run a fresh scan when package versions, code paths or database snapshots change.
