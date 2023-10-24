# Known Issues

## v1.6.1

### MongoDB Connector

- [Embeddings](https://www.mongodb.com/basics/embedded-mongodb) are not supported; however, single-valued embeddings are
- Server-side blending is not supported
- Custom queries are not supported
- MongoDB version greater than or equal to v5.0 is supported
- Fields with a dot (".") or a dollar sign ("$") in their names are ignored. Most cases require special treatment: [Dot & Dollar Considerations](https://www.mongodb.com/docs/manual/core/dot-dollar-considerations/)
- Not filtering documents without a field set when filtering by empty fields (in MongoDB, a missing field isn't the same as a field with a null value)
- Filtering by a field of type ObjectId
- When performing a sum that includes null in MongoDB, the result is 0, not null as in SQL server

## v1.4.0
- Headless export in Node.js SDK is not available for Linux/MacOSX

## v1.3.1
- Headless export fails if ```DocumentExportOptions``` is used. Please use the format-specific classes instead (e.g. ```PdfExportOptions```).

## v1.3.0
- Scatter Map / Choropleth visualizations do not show up in programmatically exported dashboards.
- When using the NuGet package, the watermark is still displayed after licensing the Reveal SDK (entering a valid key in the SDK installer). As a workaround, you can uninstall the NuGet package from the project, clear the NuGet’s cache, and install the package again. In the case that you don’t want to clear all NuGet’s cache, you can lookup the location of that cache and clear only the Infragistics Reveal items. The location depends on the NuGet version and whether packages.config or PackageReference is used.
