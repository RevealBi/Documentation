# Known Issues

### Exporting on Linux ARM64 for Node

- [Chromium can't be installed automatically when running on Linux ARM64](https://github.com/puppeteer/puppeteer/issues/7740) when using Node.js, so it must be installed using your package manager or a manual install before attempting to export a dashboard. Reveal searches from the Chromium binary under `/usr/bin/chromium`.

### Grid Row Paging

- Paging is supported in the following providers: SQL Server, MySQL, BigQuery, PostgreSQL, SyBase, Redshift, Databricks, Cube.dev, Athena, and Oracle. 
- Providers that support stored procedures will have grid paging disabled when a stored procedure is selected as these can't be queried like tables to return a range of rows. 
- Paging is not available when processing data on server is false, as well as when using blended data.
- When sorting a grid with paging enabled in regular view mode the column sorts will be applied from left to right. This means if you sort the last column and then sort the first column, they won't be applied in that order, but rather from left to right.

### Headless Export

- Headless export in Node.js SDK is not available for Linux/MacOSX
- Headless export fails if ```DocumentExportOptions``` is used. Please use the format-specific classes instead (e.g. ```PdfExportOptions```).

### Headless Export - Global Filters

- XMLA filters are not currently supported in ASP.NET
- Global filters for Node.js are not currently supported

### Licensing

- When using the NuGet package, the watermark is still displayed after licensing the Reveal SDK (entering a valid key in the SDK installer). As a workaround, you can uninstall the NuGet package from the project, clear the NuGet’s cache, and install the package again. In the case that you don’t want to clear all NuGet’s cache, you can lookup the location of that cache and clear only the Infragistics Reveal items. The location depends on the NuGet version and whether packages.config or PackageReference is used.

### MacOS ARM64 Support (Beta)

- There may be locale issues depending on the machine's configuration (e.g. 9,5 vs 9.5)

### MongoDB Connector

- Blending by a calculated field using the `currentTimeZone` function fails
- Blending by a calculated field referencing the `_id` column fails
- The `concatenate` function does not implicitly cast to string the parameters, which might produce errors when evaluating non-string column references / functions
- A pivot with no fields in row, but one or more dimensions in columns will not produce any rows in the pivot
- [Embeddings](https://www.mongodb.com/basics/embedded-mongodb) are not supported; however, single-valued embeddings are
- MongoDB version greater than or equal to v5.0 is supported
- Fields with a dot (".") or a dollar sign ("$") in their names are ignored. Most cases require special treatment: [Dot & Dollar Considerations](https://www.mongodb.com/docs/manual/core/dot-dollar-considerations/)
- Filtering by a field of type ObjectId
- When performing a sum that includes null in MongoDB, the result is 0, not null as in SQL server
