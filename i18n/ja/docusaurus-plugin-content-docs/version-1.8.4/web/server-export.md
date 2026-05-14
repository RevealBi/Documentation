import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# サーバーのエクスポート

ダッシュボードは、UI を必要とせずに、サーバー上の Excel、PDF、または PowerPoint にエクスポートできます。「ヘッドレス エクスポート」とも呼ばれます。サーバー上のダッシュボードのエクスポートは、`IDashboardExporter` を使用して実行されます。

`IDashboardExporter` は、次のように ASP.NET コントローラーまたは最小限の API 関数に挿入することで取得できます。

```cs
app.MapGet("/dashboards/export/{name}", async (string name, IDashboardExporter dashboardExporter) =>
{

}
```

## ダッシュボードをエクスポートする方法
`IDashboardExporter` は、ダッシュボードをファイル ストリームとして、またはディスク上のファイル パスにエクスポートするための API を提供します。サポートされている各エクスポート形式には、エクスポート プロセスを簡素化するための API があります。

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

PDF または PowerPoint 形式へのエクスポートには、時間がかかる場合があります。UI からサーバー側のエクスポートを呼び出す場合は、エクスポートが処理中であることを視覚的に示すインジケーターをユーザーに提供してください。

:::

### ユーザー コンテキストの提供
ダッシュボードには、Reveal SDK [ユーザー コンテキスト](user-context.md)を必要とするデータ ソースがある場合があります。この場合、エクスポート メソッドの引数として Reveal SDK の `IRVUserContext` を指定して、ダッシュボードのエクスポートを確実に成功させる必要があります。

`IRVUserContext` を取得する最初の手順は、`IRVUserContextProvider` と `IHttpContextAccessor` を ASP.NET コントローラーまたは最小限の API 関数に挿入することです。次に、引数として `IHttpContextAccessor.HttpContext` を渡して `IRVUserContextProvider.GetUserContext` を呼び出します。

```cs
app.MapGet("/dashboards/export/{name}", async (string name, IDashboardExporter dashboardExporter, 
    IRVUserContextProvider userContextProvider, IHttpContextAccessor httpContextAccessor) =>
{
    var userContext = userContextProvider.GetUserContext(httpContextAccessor.HttpContext);
}
```

`IRVUserContext` インスタンスを取得したら、それを引数として export メソッドに渡すことができます。

```cs
//export to stream
var stream = await dashboardExporter.ExportToExcel(dashboardName, userContext);

//export to file
await dashboardExporter.ExportToExcel(dashboardName, filePath, userContext);
```

## エクスポート オプション
各エクスポート形式は、ダッシュボードをエクスポートする際のさまざまなオプションをサポートしています。たとえば、各ページのヘッダーに著者名を追加したり、各ページのフッターに会社名を追加したりできます。

各エクスポート形式には、特定のオプション オブジェクトがあります:
- Excel: `ExcelExportOptions` オブジェクトを使用
- PDF: `PdfExportOptions` オブジェクトを使用
- PowerPoint: `PowerPointExportOptions` オブジェクトを使用

ダッシュボード エクスポートのオプションを設定するには、エクスポート形式オプション クラスのインスタンスを作成し、それを引数として export メソッドに提供します。

```cs
//create Pdf options
var pdfOptions = new PdfExportOptions()
{
    Landscape = true
};

//export Pdf to stream
var stream = await dashboardExporter.ExportToPdf(dashboardName, options: pdfOptions);
```

## 例: サーバーでのエクスポート
この例では、形式に基づいてダッシュボードをエクスポートするサービス エンドポイントを作成します。

サーバー プロジェクト内、ダッシュボード エクスポート用の新しいルートを作成します。ダッシュボード名とエクスポート形式をルート パラメーターとして定義します。また、エクスポートを実行するために `IDashboardExporter` を挿入する必要があります。次に、エクスポート形式のルート パラメーターに基づいて、正しいエクスポートを実行するためのロジックを作成します。エクスポートの結果を返すときは、必ず正しいコンテンツ タイプを指定してください。

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

クライアント アプリケーションで、サービス エンドポイントを呼び出す関数を実行する一連のボタンを作成します。
```html
<button onclick="onExportButtonClicked('pdf')">Export as PDF</button>
<button onclick="onExportButtonClicked('xlsx')">Export as Excel</button>
<button onclick="onExportButtonClicked('pptx')">Export as Power Point</button>
```

この例では、**Sales** という名前のダッシュボードをエクスポートしています。これは、クリックされたボタンによって提供されたエクスポート形式を使用します。
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

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/Exporting-Server) にあります。

:::