# Known Issues

## Chrome/Edge DevTools Freeze When Using reveal-sdk in Angular

### Issue

Opening Chrome or Edge DevTools for an Angular application that imports `reveal-sdk` can make the DevTools frontend unresponsive.

Angular's Vite-based development server generates a `reveal-sdk.js.map` file from the monolithic Reveal ESM bundle. DevTools discovers and processes this source map, but because it is very large, the processing causes the freeze.

### Workarounds

**Option 1 – Redirect the Angular cache into `node_modules` (recommended)**

Customize the Angular CLI cache path in `angular.json` so that the dependency URL matches DevTools' built-in ignore rule:

```json
"cli": {
  "cache": {
    "path": "node_modules/.cache/angular"
  }
}
```

**Option 2 – Add a custom DevTools ignore rule**

Add the following custom exclusion rule in **DevTools → Settings → Ignore List → Custom exclusion rules**:

```
.*\/\.angular\/cache\/.*\/vite\/deps\/reveal-sdk\.js.*
```

> **Note:** This option works but must be configured individually for each developer and each browser profile.

## Export Not Supported on Windows Azure App Service

### Issue

When hosting on **Azure App Service (Windows)**, exporting is **not supported**. This is because **Playwright**, required for browser-based exporting, is **not supported on Windows distributions** within Azure App Service.

### Workarounds

There are two options to resolve this:

1. **Use a Linux App Service Plan**
   Host your app on **Azure App Service (Linux)** instead of Windows.
   In your ASP.NET Core startup, call the Playwright installer during application startup—typically in `Program.cs`, **before** running the web application:

   ```csharp
   var builder = WebApplication.CreateBuilder(args);
   //...
   
   Microsoft.Playwright.Program.Main(new string[] { "install", "chromium", "--with-deps" });

   app.UseAuthorization();
   app.MapControllers();
   app.Run();
   ```

   This ensures Chromium and all required dependencies are available at runtime.

2. **Use a Windows Container**
   If you must remain on Windows, host the application inside a **Windows Container**.
   This allows installing and configuring Playwright within the container image, bypassing the Windows App Service limitation.

## Create React App 5 Production Builds

### Issue

Existing Create React App 5 applications using `react-scripts@5.0.1` may experience very long production build times or appear to stall when consuming Reveal SDK from npm.

### Cause and Context

This occurs when the Create React App/Webpack production pipeline processes the Reveal ESM bundle. Create React App has been deprecated by the React team. For new applications, or migrations where practical, use a maintained React framework or a modern build tool such as Vite.

### Workaround

For an existing Create React App application that cannot migrate yet, configure Webpack to resolve `reveal-sdk` to the browser (IIFE) bundle at runtime. **Both the Webpack external and the IIFE bundle are required**: the external alone leaves the import without a runtime implementation, and the IIFE alone still leaves the ESM package in Webpack's production pipeline.

Create React App does not expose its Webpack configuration, so this requires an override tool. The following steps use [react-app-rewired](https://github.com/timarney/react-app-rewired). If your application already uses [CRACO](https://craco.js.org/), apply the same `externals` change in `craco.config.js` instead.

1. Install `react-app-rewired` and use it to build the application.

   ```bash npm2yarn
   npm install react-app-rewired --save-dev
   ```

   ```json title="package.json"
   "scripts": {
       "start": "react-app-rewired start",
       "build": "react-app-rewired build"
   }
   ```

2. Create `config-overrides.js` in the project root and configure the Webpack external.

   ```js title="config-overrides.js"
   module.exports = function override(config) {
       config.externals = {
           ...(config.externals || {}),
           "reveal-sdk": "Reveal",
       };

       return config;
   };
   ```

3. Copy `node_modules/reveal-sdk/dist/reveal-sdk.js` and `node_modules/reveal-sdk/dist/locales/` to `public/reveal/`, keeping the published layout. The SDK resolves its locale files relative to `reveal-sdk.js`, so no additional locale configuration is required.

4. Add the IIFE bundle to `public/index.html`:

   ```html
   <script src="%PUBLIC_URL%/reveal/reveal-sdk.js"></script>
   ```

5. Continue to import Reveal from npm in your application:

   ```ts
   import * as Reveal from "reveal-sdk";
   ```

## Custom Visualizations Not Supported on Export

### Issue

**Custom visualizations** (user-defined visualizations that extend the standard Reveal chart types) appear blank when exporting dashboards in any format (PDF, Excel, PowerPoint, or Image). This is a known limitation across all platforms.

### Root Cause

The Reveal SDK doesn't fully control the rendering of custom visualizations. Due to render timing issues during the export process, custom visualizations may not be fully displayed or rendered in time before the export operation captures the visualization content, resulting in blank placeholders in the exported file.

### Workarounds

Unfortunately, there is **no programmatic workaround** for this limitation. However, you can:
- **Capture screenshots manually** and place them in your desired format (Word document, PDF, PowerPoint presentation, etc.) as an alternative to using the export feature.

## `<Pre>` Tag Appended to `<body>`

### Issue
The RevealView component appends a hidden `<pre>` tag to the end of the `<body>` element. This tag is used internally by the viewer to measure font sizes for layout calculations. If the your application includes CSS rules targeting `<pre>` elements (e.g., global typography or spacing styles), these rules may inadvertently apply to the RevealView measurement element. This can lead to unexpected visual artifacts or layout shifts in the UI.

### Workarounds
To prevent these unwanted styles from affecting the measurement element, add the following CSS rule to your global stylesheet:
```css
body > pre.rv-multiline-editor {
    height: 0px !important;
}
```

## Grid Row Paging

- Paging is supported in the following providers: SQL Server, MySQL, MariaDB, BigQuery, MongoDB, PostgreSQL, Snowflake, SyBase, Redshift, Databricks, Cube.dev, Athena, Oracle, and SQLite.
- Providers that support stored procedures will have grid paging disabled when a stored procedure is selected as these can't be queried like tables to return a range of rows. 
- Paging is not available when processing data on server is false
- When sorting a grid with paging enabled in regular view mode the column sorts will be applied from left to right. This means if you sort the last column and then sort the first column, they won't be applied in that order, but rather from left to right.

## Exporting on Linux ARM64 for Node

- [Chromium can't be installed automatically when running on Linux ARM64](https://github.com/puppeteer/puppeteer/issues/7740) when using Node.js, so it must be installed using your package manager or a manual install before attempting to export a dashboard. Reveal searches from the Chromium binary under `/usr/bin/chromium`.

## Intermittent Request Timeouts in Node.js

- An intermittent timeout issue has been observed in Node.js environments during request execution. The issue is difficult to reproduce and its root cause is still under investigation. Early evidence suggests software firewalls provided by the operating system or antivirus software may interfere with the server connection, especially on developer machines. As a result, some requests may occasionally fail and succeed when retried.

## Headless Export

- Headless export in Node.js SDK is not available for Linux/MacOSX
- Headless export fails if ```DocumentExportOptions``` is used. Please use the format-specific classes instead (e.g. ```PdfExportOptions```).

## Headless Export - Global Filters

- XMLA filters are not currently supported in ASP.NET
- Global filters for Node.js are not currently supported

## Licensing

- When using the NuGet package, the watermark is still displayed after licensing the Reveal SDK (entering a valid key in the SDK installer). As a workaround, you can uninstall the NuGet package from the project, clear the NuGet’s cache, and install the package again. In the case that you don’t want to clear all NuGet’s cache, you can lookup the location of that cache and clear only the Infragistics Reveal items. The location depends on the NuGet version and whether packages.config or PackageReference is used.

## MacOS ARM64 Support (Beta)

- There may be locale issues depending on the machine's configuration (e.g. 9,5 vs 9.5)

## MongoDB Connector

- Blending by a calculated field using the `currentTimeZone` function fails
- Blending by a calculated field referencing the `_id` column fails
- The `concatenate` function does not implicitly cast to string the parameters, which might produce errors when evaluating non-string column references / functions
- A pivot with no fields in row, but one or more dimensions in columns will not produce any rows in the pivot
- [Embeddings](https://www.mongodb.com/basics/embedded-mongodb) are not supported; however, single-valued embeddings are
- MongoDB version greater than or equal to v5.0 is supported
- Fields with a dot (".") or a dollar sign ("$") in their names are ignored. Most cases require special treatment: [Dot & Dollar Considerations](https://www.mongodb.com/docs/manual/core/dot-dollar-considerations/)
- Filtering by a field of type ObjectId
- When performing a sum that includes null in MongoDB, the result is 0, not null as in SQL server
