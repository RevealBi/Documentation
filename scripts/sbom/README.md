# SBOM VEX maintenance

Release SBOMs contain CycloneDX VEX statements in `vulnerabilities[].analysis`. The assessment configuration in `vex-assessments.json` is the source-controlled record of each package/advisory decision and its rationale.

Release-specific assessments and evidence are retained under `releases/<version>/` so a new release does not overwrite historical decisions. The [2.3.2 assessment](releases/2.3.2/README.md) includes the complete download, scan coverage, artifact hashes, and findings awaiting investigation. Its decisions are drafts pending release-owner approval.

When applying a release-specific assessment, pass `--assessments releases/<version>/vex-assessments.json` (with the appropriate path from the working directory) and `--sbom-root <release-staging-directory>`. The scan must cover that same staging directory; do not mix historical SBOMs with a release-specific decision file. OSV-Scanner 2.7 uses qualified Maven `group:artifact` names, which the application script matches to CycloneDX component groups and package URLs.

For a release:

1. Generate the package SBOMs from the released artifacts.
2. Scan all SBOMs with OSV-Scanner using current complete offline databases and dependency resolution disabled. This avoids sending private package coordinates to an external service.
3. Review every scanner match and add or update the corresponding decision in `vex-assessments.json`.
4. Apply the decisions:

   ```powershell
   node scripts/sbom/apply-vex.mjs --scan <osv-results.json>
   ```

   The command fails when a finding has no decision or a configured decision does not appear in the scan.

5. Rebuild the customer download bundles and catalog hashes:

   ```powershell
   ./scripts/sbom/rebuild-bundles.ps1
   ```

6. Validate every JSON file against the official CycloneDX schema, validate the catalog and bundle manifests, and verify the hashes stored in each manifest and the catalog.

The release owner must approve the assessment decisions before publication. A scanner match alone is not sufficient for a `not_affected` decision; the rationale must be supported by the released runtime, source, configuration, or another reproducible form of evidence.
