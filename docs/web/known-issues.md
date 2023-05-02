# Known Issues

## v1.5.0
_Nothing specific for this version_

## v1.4.0
- Headless export in Node.js SDK is not available for Linux/MacOSX

## v1.3.1
- Headless export fails if ```DocumentExportOptions``` is used. Please use the format-specific classes instead (e.g. ```PdfExportOptions```).

## v1.3.0
- Scatter Map / Choropleth visualizations do not show up in programmatically exported dashboards.
- When using the NuGet package, the watermark is still displayed after licensing the Reveal SDK (entering a valid key in the SDK installer). As a workaround, you can uninstall the NuGet package from the project, clear the NuGet’s cache, and install the package again. In the case that you don’t want to clear all NuGet’s cache, you can lookup the location of that cache and clear only the Infragistics Reveal items. The location depends on the NuGet version and whether packages.config or PackageReference is used.
