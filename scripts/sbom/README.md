# SBOM VEX maintenance

Release SBOMs contain CycloneDX VEX statements in `vulnerabilities[].analysis`. The assessment configuration in `vex-assessments.json` is the source-controlled record of each package/advisory decision and its rationale.

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
