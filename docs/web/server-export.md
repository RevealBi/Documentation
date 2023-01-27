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
Sometimes dashboards have data sources that require the Reveal SDK [User Context](user-context.md). In this case, you must provide the Reveal SDK `IRVUserContext` as an argument to the export method to ensure a successful dashboard export.

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