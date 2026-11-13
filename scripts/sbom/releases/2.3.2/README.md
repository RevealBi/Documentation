# Reveal 2.3.2 SBOM and VEX assessment

Generated on November 13, 2026 from published release artifacts. **Draft: release-owner approval is required before publication** under [the SBOM maintenance process](../../README.md).

The assessment contains **42 CycloneDX 1.7 SBOMs**, **187 embedded VEX statements**, and **29 distinct package/version/advisory decisions**: **23 not affected, 1 exploitable, and 5 in triage**. These are package-version decisions; the five triage decisions cover four distinct advisories. Findings are repeated in the SBOMs where their components occur.

## Coverage

| Distribution | Documents |
| --- | ---: |
| .NET: ASP.NET, Data, 33 connectors, Redis cache, all-connectors aggregate | 37 |
| Java: Windows x64 and Linux x64 | 2 |
| Node: Windows x64 and Linux x64 | 2 |
| JavaScript browser npm package | 1 |

The NuGet graphs target net8.0. npm and Maven ranges were resolved on the assessment date, so a later install can select different dependencies. Jackson resolved to 2.23.0 (annotations 2.23). The four downloaded engines embed .NET 8.0.34. The Java Linux graph explicitly selects the Linux engine in place of Maven's host-activated Windows engine.

## Findings requiring action

| Status | Component | Advisory | Action |
| --- | --- | --- | --- |
| Exploitable (conservative assessment) | Microsoft.Identity.Client 4.56.0, standalone Analysis Services connector | [GHSA-m5vv-6r4h-3vj9](https://github.com/advisories/GHSA-m5vv-6r4h-3vj9) | Update the connector dependency chain to a supported patched MSAL release. The all-connectors graph and packaged engines select 4.80.0. |
| In triage | System.Security.Cryptography.Pkcs 8.0.0 and 8.0.1 | [GHSA-846f-f764-76mx](https://github.com/advisories/GHSA-846f-f764-76mx) | Upgrade to 8.0.2 or a supported patched release, or establish whether SQL Client signature verification can process attacker-controlled data in supported configurations. |
| In triage | basic-ftp 5.3.1, Node runtime graph | [GHSA-5pm8-86m8-9m6r](https://github.com/advisories/GHSA-5pm8-86m8-9m6r), [GHSA-c475-qrg2-pj4r](https://github.com/advisories/GHSA-c475-qrg2-pj4r), [GHSA-r4jh-29pc-gfqr](https://github.com/advisories/GHSA-r4jh-29pc-gfqr) | Review FTP-backed PAC proxy configuration and update the transitive dependency when patched. The downloader honors deployment proxy settings, so FTP reachability cannot be ruled out universally. |

All 29 decisions, their scope, rationale, and affected documents are recorded in [vex-assessments.json](./vex-assessments.json). A not-affected decision is conditional on the stated runtime, code path, or configuration; it does not mean the upstream component is fixed. This is a static artifact/configuration assessment, not an exploit test or penetration test.

## Scan and verification

OSV-Scanner 2.7.1 used complete NuGet, npm, and Maven all.zip databases downloaded on November 13, 2026, with --offline --no-resolve --no-ignore --all-packages. No package inventory was sent to an advisory service. The scan log records 42 successful extractions; 41 documents have package results and the browser manifest has zero dependency components. OSV filtered 320 local/unscannable component occurrences. [scan-summary.json](./scan-summary.json) records coverage and database SHA-256 hashes.

All 42 new SBOMs were validated against the official CycloneDX 1.7 JSON schema, and their dependency and VEX references were checked. Bundle manifests and the catalog were validated against the repository schemas, and every stored SHA-256 was recomputed. Historical SBOMs and their decisions were preserved. The VEX application tool was corrected to match Maven group:artifact names from OSV 2.7.1; regression checks cover namespace isolation and legacy names.

## Limits

- The browser SBOM inventories its published npm runtime manifest, which declares no dependencies. Prebundled JavaScript subcomponents/build inputs were not independently identified. Its no-match result is **not a full security assessment of bundled browser code**.
- The scan covers package identities supported by OSV. Generic first-party assemblies, host OS libraries, separately downloaded Chrome Headless Shell (the Node exporter selects 132.0.6834.110), and software supplied by the host application need separate assessment.
- Windows/Linux x64 follow the existing catalog coverage. ARM64 and macOS distributions are not included. Reveal AI is independently versioned and is outside this release.
- NuGet decisions assume a serviced .NET 8 host. Custom providers, host logging layouts, proxy settings, and browser protocol choices can change exposure.

## Reproduction and evidence

[provenance.json](./provenance.json) records release identity and artifact hashes. assessment-evidence.zip retains the scan output/log, package lockfiles, embedded engine dependency manifests, static API-reference summaries, and generation/validation scripts. Large binaries, databases, tool installations, and full decompiled proprietary source remain in the local generation cache and are not included.

The complete reveal-2.3.2-sbom-vex.zip contains all 42 SBOMs, the three platform bundles, assessment records, and evidence. Its osv-results.json uses portable files/... paths. To reapply decisions after extracting it, run the repository's apply-vex.mjs with --scan osv-results.json --assessments vex-assessments.json --sbom-root files from the extracted directory. Use a fresh scan when package versions, code paths, or database snapshots change; do not reuse an old clean result.
