import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Server Export

Dashboards can be exported to Excel, PDF, or PowerPoint on the server without the need of a UI. Also known as a "headless export". Exporting dashboards on the server is accomplished by using the `IDashboardExporter`.

The `IDashboardExporter` can be obtained by injecting it into your ASP.NET controller or minimal API function as follows:

```cs
app.MapGet("/dashboards/export/{name}", async (string name, IDashboardExporter dashboardExporter) =>
{

}
```

## How to Export Dashboards
The `IDashboardExporter` provides APIs to export a dashboard as a file stream, or to a file path on disk. Each supported export format has an API to help simplify the export process.

**Excel**
```cs 
//export to stream
var stream = await dashboardExporter.ExportToExcel(dashboardName);

//export to file
await dashboardExporter.ExportToExcel(dashboardName, filePath);
```

**PDF**
```cs 
//export to stream
var stream = await dashboardExporter.ExportToPdf(dashboardName);

//export to file
await dashboardExporter.ExportToPdf(dashboardName, filePath);
```

**PowerPoint**
```cs 
//export to stream
var stream = await dashboardExporter.ExportToPowerPoint(dashboardName);

//export to file
await dashboardExporter.ExportToPowerPoint(dashboardName, filePath);
```

:::info

Exporting to the PDF or PowerPoint formats can be time consuming. If invoking a server side export from the UI, be sure to provide a visual indicator to your user that the export is processing.

:::

## Provide User Context
Sometimes dashboards have data sources that require the Reveal SDK [User Context](user-context.md). In this case, you must provide the Reveal SDK `IRVUserContext` as an argument to the export method to ensure a successful dashboard export. This includes dashboards whose data source items use [row-level security](row-level-security.md): the export contains the rows of the user whose context you pass.

The first step to obtain the `IRVUserContext` is to inject the `IRVUserContextProvider` and `IHttpContextAccessor` into the ASP.NET controller or minimal API function. Next, make a call to the `IRVUserContextProvider.GetUserContext` passing the `IHttpContextAccessor.HttpContext` as an argument.

```cs
app.MapGet("/dashboards/export/{name}", async (string name, IDashboardExporter dashboardExporter, 
    IRVUserContextProvider userContextProvider, IHttpContextAccessor httpContextAccessor) =>
{
    var userContext = userContextProvider.GetUserContext(httpContextAccessor.HttpContext);
}
```

Once you have the `IRVUserContext` instance you can pass it as an argument to the export method.

```cs
//export to stream
var stream = await dashboardExporter.ExportToExcel(dashboardName, userContext);

//export to file
await dashboardExporter.ExportToExcel(dashboardName, filePath, userContext);
```

## Export Options
Each export format supports various options when exporting a dashboard. For example, you can add the author's name to the header of each page, or add the comapny's name to each page footer.

Each export format has a specific options object:
- Excel: use the `ExcelExportOptions` object
- PDF: use the `PdfExportOptions` object
- PowerPoint: use the `PowerPointExportOptions` object

To set options for a dashboard export, create an instance of the export format options class and provide it as an argument to the export method.

```cs
//create Pdf options
var pdfOptions = new PdfExportOptions()
{
    Landscape = true
};

//export Pdf to stream
var stream = await dashboardExporter.ExportToPdf(dashboardName, options: pdfOptions);
```

To export in a specific time zone, set the `TimeZone` option to an IANA time zone name. DateTime values are then converted to it; without it, the export uses UTC. See [Time Zones](time-zones.md#exports).

## Example: Exporting on the Server
In this example, we will create a service endpoint that will export a dashboard based on the format.

In server project, create a new route for the dashboard export. Define the dashboard name and the export format as the route parameters. You'll also need to inject the `IDashboardExporter` to perform the export. Next, create the logic to perform the correct export based on the export format route parameter. Be sure to provide the correct content type when returning the results of the export.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
app.MapGet("/dashboards/export/{name}", async (string name, string format, IDashboardExporter dashboardExporter) =>
{
    Stream stream;
    string contentType = "application/pdf";
    if (format=="xlsx")
    {
        stream = await dashboardExporter.ExportToExcel(name);
        contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
    else if (format == "pptx")
    {
        stream = await dashboardExporter.ExportToPowerPoint(name);
        contentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    }
    else
    {
        stream = await dashboardExporter.ExportToPdf(name);
    }
    
    return Results.File(stream, contentType);
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
@Component
@Path("dashboards/export/")
public class RevealExportController {

    @GET
    @Path("{name}")
    public void getDashboardExport(@Suspended final AsyncResponse response, @PathParam("name") String name, @QueryParam("format") String format) throws IOException {
        IDashboardExporter exporter = RevealEngineLocator.dashboardExporter;

        if (format.equalsIgnoreCase("xlsx")) {
            exporter.exportToExcel(name, new ExportStreamCallback() {
                @Override
                public void onFailure(Exception e) {
                    response.resume(e);
                }
    
                @Override
                public void onSuccess(InputStream stream) {
                    ResponseBuilder resp = Response.ok(stream).type("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                    response.resume(resp.build());
                } 
            });
        }
        else if (format.equalsIgnoreCase("pptx")) {
            exporter.exportToPowerPoint(name, new ExportStreamCallback() {
                @Override
                public void onFailure(Exception e) {
                    response.resume(e);
                }
    
                @Override
                public void onSuccess(InputStream stream) {
                    ResponseBuilder resp = Response.ok(stream).type("application/vnd.openxmlformats-officedocument.presentationml.presentation");
                    response.resume(resp.build());
                } 
            });            
        }
        else {
            exporter.exportToPdf(name, new ExportStreamCallback() {
                @Override
                public void onFailure(Exception e) {
                    response.resume(e);
                }
    
                @Override
                public void onSuccess(InputStream stream) {
                    ResponseBuilder resp = Response.ok(stream).type("application/pdf");
                    response.resume(resp.build());
                } 
            });
        }
    }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```ts
app.get("/dashboards/export/:name", async (req, resp) => {
	const name = req.params.name;
	const format = req.query.format;
	let stream: ReadStream | void;
	let contentType = "application/pdf";

	if (format === "xlsx"){
		contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";	
		stream = await revealServer.exporter.exportExcel(name, null, null, null);
	}
	else if (format === "pptx") {
		contentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
		stream = await revealServer.exporter.exportPowerPoint(name, null, null, null);
	}
	else {
		stream = await revealServer.exporter.exportPdf(name, null, null, null);
	}

	if (stream) {
		resp.setHeader("Content-Type", contentType);
		stream.pipe(resp);
	}
	else {
		resp.send(404);
	}
});
```

  </TabItem>

</Tabs>

In the client application. Create a set of buttons that will invoke a function that will make a call to our service endpoint. 
```html
<button onclick="onExportButtonClicked('pdf')">Export as PDF</button>
<button onclick="onExportButtonClicked('xlsx')">Export as Excel</button>
<button onclick="onExportButtonClicked('pptx')">Export as Power Point</button>
```

In this example we are exporting a dashboard named **Sales**, and it will use the export format that was provided by the button being clicked.
```js
function onExportButtonClicked(format) {
    fetch(`http://localhost:5111/dashboards/export/Sales?format=${format}`)
    .then(resp => resp.blob())
    .then(blob => 
    {
        downloadFile(blob, format);
    });
}

function downloadFile(blob, format) {
    var a = document.createElement("a");
    a.download = `Sales.${format}`;
    a.href = window.URL.createObjectURL(blob);
    a.click();
}
```

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/Exporting-Server).

:::

## Image Columns in Exports

A text column in the Data Grid can show its values as images (see [Image Columns](../user/chart-types/grid-chart.md#image-columns)). The browser that renders a server export has no network access, so for PDF, PowerPoint and Image exports the server downloads each distinct image URL in the dashboard's image columns, scales it down to the column's image size, and embeds it in the export:

- **Image** exports, and the dashboard image that PDF and PowerPoint exports can start with, show the images in the grid.
- **PDF** exports also draw the images in the cells of the grid's data table.
- **PowerPoint** data tables, and **Excel** and **CSV** exports, write the cell value as text: the URL, or the full `data:` text.

Values that are already `data:` image URLs need no download and are exported as images. Only absolute `http`, `https` and `data:` URLs are treated as images; relative URLs and other schemes are exported as text. An SVG image appears in the dashboard image, but the PDF data table prints its URL.

When an image can't be exported (it is rejected, fails to download, or goes past one of the [limits](#image-download-limits)), the dashboard image shows the "image not available" placeholder for it and the PDF data table prints its URL. The rest of the export is not affected.

:::note

Exports the end-user starts from the dashboard's **Export** menu, and `RevealView.toImage`, are captured from the page in the browser, which doesn't load remote images. In these exports image cells show their URL as text, while `data:` images still show as images. Their data tables print every image cell as text, `data:` images included.

:::

### Validating Image URLs

Each image is downloaded the same way as a Web Resource, through your [data source provider](replacing-datasources.md) and [authentication provider](authentication.md). For every distinct image URL in an export, the data source provider receives an `RVWebResourceDataSourceItem` whose data source has:

- an `Id` of `__RevealExportImage:` followed by the image URL,
- a `Url` set to the image URL (the item's `Url` holds it too),
- `RefuseRedirects` set to `true` (see [Redirects](#redirects)).

In ASP.NET and Java, the provider also receives the id of the dashboard being exported. The provider decides what happens to the image:

- Return `null`, or the item unchanged, to download the URL as it is.
- Return the item changed, for example with a different `Url` or a `DefaultRefreshRate` (see [Caching Images](#caching-images)).
- Throw an exception to reject the image. The export goes on without it. In Java and Node.js the rejection is also logged as a provider error.

The authentication provider is called for each image data source as well. Returning `null` downloads the image without credentials.

:::danger

Without a data source provider, every image URL in the data is downloaded. The data source provider is the only check on which hosts the server contacts, so if your data can hold URLs you don't control, allow only the image hosts you trust and throw for the rest. In the same way, return credentials from your authentication provider only for the image hosts that need them.

:::

If your data source provider throws for items it doesn't recognize, as recommended in [Row-Level Security](row-level-security.md), handle the image items before anything else, or every image is rejected.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class DataSourceProvider : IRVDataSourceProvider
{
    private const string ExportImagePrefix = "__RevealExportImage:";
    private static readonly string[] ImageHosts = { "images.example.com", "cdn.example.com" };

    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
        if (dataSourceItem is RVWebResourceDataSourceItem imageItem &&
            dataSourceItem.DataSource?.Id?.StartsWith(ExportImagePrefix, StringComparison.Ordinal) == true)
        {
            var url = new Uri(imageItem.Url);
            if (url.Scheme != Uri.UriSchemeHttps || !ImageHosts.Contains(url.Host, StringComparer.OrdinalIgnoreCase))
            {
                // Rejects this image; the export goes on without it
                throw new InvalidOperationException($"Images from '{url.Host}' are not exported.");
            }

            // Reuses a download of this image for up to an hour
            imageItem.DefaultRefreshRate = 60;
            return Task.FromResult<RVDataSourceItem>(imageItem);
        }

        // The rest of your provider
        return Task.FromResult<RVDataSourceItem>(null);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        return Task.FromResult<RVDashboardDataSource>(null);
    }
}
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
public class DataSourceProvider implements IRVDataSourceProvider {
    private static final String EXPORT_IMAGE_PREFIX = "__RevealExportImage:";
    private static final Set<String> IMAGE_HOSTS = Set.of("images.example.com", "cdn.example.com");

    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardId, RVDataSourceItem dataSourceItem) {
        RVDashboardDataSource dataSource = dataSourceItem.getDataSource();
        if (dataSourceItem instanceof RVWebResourceDataSourceItem imageItem &&
                dataSource != null && dataSource.getId() != null && dataSource.getId().startsWith(EXPORT_IMAGE_PREFIX)) {
            URI url = URI.create(imageItem.getUrl());
            String host = url.getHost() == null ? "" : url.getHost().toLowerCase(Locale.ROOT);
            if (!"https".equalsIgnoreCase(url.getScheme()) || !IMAGE_HOSTS.contains(host)) {
                // Rejects this image; the export goes on without it
                throw new IllegalArgumentException("Images from '" + host + "' are not exported.");
            }

            // Reuses a download of this image for up to an hour
            imageItem.setDefaultRefreshRate(60);
            return imageItem;
        }

        // The rest of your provider
        return null;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        return null;
    }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```js
const EXPORT_IMAGE_PREFIX = "__RevealExportImage:";
const IMAGE_HOSTS = ["images.example.com", "cdn.example.com"];

const dataSourceItemProvider = async (userContext, dataSourceItem) => {
  if (dataSourceItem instanceof reveal.RVWebResourceDataSourceItem &&
      dataSourceItem.dataSource?.id?.startsWith(EXPORT_IMAGE_PREFIX)) {
    const url = new URL(dataSourceItem.url);
    if (url.protocol !== "https:" || !IMAGE_HOSTS.includes(url.hostname)) {
      // Rejects this image; the export goes on without it
      throw new Error(`Images from '${url.hostname}' are not exported.`);
    }

    // Reuses a download of this image for up to an hour
    dataSourceItem.defaultRefreshRate = 60;
    return dataSourceItem;
  }

  // The rest of your provider
  return null;
};
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">

```ts
const EXPORT_IMAGE_PREFIX = "__RevealExportImage:";
const IMAGE_HOSTS = ["images.example.com", "cdn.example.com"];

const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem): Promise<RVDataSourceItem | null> => {
  if (dataSourceItem instanceof RVWebResourceDataSourceItem &&
      dataSourceItem.dataSource?.id?.startsWith(EXPORT_IMAGE_PREFIX)) {
    const url = new URL(dataSourceItem.url ?? "");
    if (url.protocol !== "https:" || !IMAGE_HOSTS.includes(url.hostname)) {
      // Rejects this image; the export goes on without it
      throw new Error(`Images from '${url.hostname}' are not exported.`);
    }

    // Reuses a download of this image for up to an hour
    dataSourceItem.defaultRefreshRate = 60;
    return dataSourceItem;
  }

  // The rest of your provider
  return null;
};
```

  </TabItem>

</Tabs>

Register the provider as shown in [Replacing Data Sources](replacing-datasources.md).

### Caching Images

By default an image is downloaded again for every export. To reuse a download, set the item's `DefaultRefreshRate` in your data source provider, as in the sample above: a download of the same URL that is no older than that many minutes is reused. A `DefaultRefreshRate` set on the data source doesn't apply to images.

### Redirects

Image downloads don't follow redirects, because a redirect receives the request's headers, credentials included, whatever host it points to. Any `3xx` response fails the image. To follow redirects for a host you trust, set `RefuseRedirects` to `false` on the item's data source in your data source provider.

`RefuseRedirects` is a property of every Web Resource data source (`RVWebResourceDataSource`), so you can also set it to `true` on your own Web Resource data sources to make their downloads fail on a redirect instead of following it. It is `RefuseRedirects` in ASP.NET, `getRefuseRedirects`/`setRefuseRedirects` in Java, and `refuseRedirects` in JavaScript and Node.js. Because the client can set it too, set it in your data source provider when it matters.

### Image Download Limits

The image downloads of an export are bounded so that they can't hold up the export or use too much memory. Images are downloaded in row order (the first row of every grid, then the second, and so on), so the rows at the top of each grid get their images first.

| Limit | Value |
|---|---|
| Downloads at the same time, across all exports on the server | 4 by default, set with `MaxConcurrentImageDownloads` |
| Time for the downloads of an export to start | 15 seconds; images not started by then are skipped |
| Time for one image, from the request to the last byte | 5 seconds |
| Size of one image, `data:` images included | 5 MB; a download is also bound by the [`MaxDownloadSize`](caching.md) setting |
| Size of one SVG image | 256 KB |
| Images kept by one export, after scaling | 50 MB |

A download also fails when the response isn't an image (its content type doesn't start with `image/`), for example an HTML error page. PNG, GIF and other images that aren't JPEG or WebP fail when they are larger than 25 megapixels; JPEG and WebP images are decoded at a reduced size. When some images of an export aren't embedded, the server logs a warning with the counts.

To change the number of downloads at the same time, set `MaxConcurrentImageDownloads`. It must be at least 1.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
builder.Services.AddControllers().AddReveal(builder =>
{
    builder.AddSettings(settings =>
    {
        settings.Export.MaxConcurrentImageDownloads = 8;
    });
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
new RevealServerBuilder()
    .addSettings(settings -> settings.getExportConfiguration().setMaxConcurrentImageDownloads(8))
    .build();
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```js
const revealOptions = {
	exportConfiguration: {
		maxConcurrentImageDownloads: 8
	}
};
app.use('/', reveal(revealOptions));
```

  </TabItem>

</Tabs>
