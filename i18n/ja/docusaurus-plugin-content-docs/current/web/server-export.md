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
ダッシュボードには、Reveal SDK [ユーザー コンテキスト](user-context.md)を必要とするデータ ソースがある場合があります。この場合、エクスポート メソッドの引数として Reveal SDK の `IRVUserContext` を指定して、ダッシュボードのエクスポートを確実に成功させる必要があります。これは、データ ソース項目で[行レベル セキュリティ](row-level-security.md)を使用するダッシュボードにも当てはまります。エクスポートには、渡したユーザー コンテキストのユーザーの行が含まれます。

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

特定のタイムゾーンでエクスポートするには、`TimeZone` オプションに IANA タイムゾーン名を設定します。設定すると DateTime 値はそのタイムゾーンに変換され、設定しない場合、エクスポートは UTC を使用します。[タイムゾーン](time-zones.md#exports)を参照してください。

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

エクスポートが失敗すると、エクスポート メソッドが返す Future が `ExportException` で完了します。これはファイルを書き込むメソッドとストリームを返すメソッドの両方に該当します。サーバーがエラーを返した場合は、`Export failed with status 500` のように、メッセージに HTTP ステータスが含まれます。サーバーやその他のリクエストには影響しません。Reveal サーバーが[失敗](java-health-check.md)した後は、すべてのエクスポートがステータス 503 で失敗します。

```java
exporter.exportToPdf(dashboardId, filePath)
    .thenAccept(path -> send(path))
    .exceptionally(t -> { log.error("Export failed", t.getCause()); return null; });
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

## エクスポートでの画像列 {#image-columns-in-exports}

データ グリッドのテキスト列では、値を画像として表示できます ([画像列](../user/chart-types/grid-chart.md#画像列)を参照)。サーバーのエクスポートを描画するブラウザーはネットワークにアクセスできないため、PDF、PowerPoint、画像のエクスポートでは、サーバーがダッシュボードの画像列にある個別の画像 URL をそれぞれダウンロードし、列の画像サイズに縮小してエクスポートに埋め込みます。

- **画像**のエクスポートと、PDF および PowerPoint のエクスポートの先頭に含めることができるダッシュボード画像では、グリッドに画像が表示されます。
- **PDF** のエクスポートでは、グリッドのデータ テーブルのセルにも画像が描画されます。
- **PowerPoint** のデータ テーブル、および **Excel** と **CSV** のエクスポートには、セルの値がテキスト (URL、または `data:` のテキスト全体) として書き込まれます。

値がすでに `data:` 画像 URL の場合はダウンロードが不要で、画像としてエクスポートされます。画像として扱われるのは、絶対 URL の `http`、`https`、および `data:` のみです。相対 URL やその他のスキームはテキストとしてエクスポートされます。SVG 画像はダッシュボード画像に表示されますが、PDF のデータ テーブルには URL が出力されます。

画像をエクスポートできない場合 (拒否された場合、ダウンロードに失敗した場合、または[制限](#image-download-limits)のいずれかを超えた場合)、ダッシュボード画像にはその画像の代わりに、画像を利用できないことを示すプレースホルダーが表示され、PDF のデータ テーブルには URL が出力されます。エクスポートのその他の部分には影響しません。

:::note

エンドユーザーがダッシュボードの **[エクスポート]** メニューから開始するエクスポート、および `RevealView.toImage` は、ページのスナップショットからレンダリングされ、スナップショットにはリモートの画像が含まれません。これらのエクスポートでは、画像セルに URL がテキストとして表示されますが、`data:` 画像は画像のまま表示されます。データ テーブルには、`data:` 画像を含むすべての画像セルがテキストとして出力されます。

:::

### 画像 URL の検証 {#validating-image-urls}

各画像は、Web リソースと同じ方法で、[データ ソース プロバイダー](replacing-datasources.md)と[認証プロバイダー](authentication.md)を通じてダウンロードされます。エクスポート内の個別の画像 URL ごとに、データ ソース プロバイダーは `RVWebResourceDataSourceItem` を受け取ります。そのデータ ソースは次のとおりです。

- `Id` は `__RevealExportImage:` の後に画像 URL が続く値です。
- `Url` には画像 URL が設定されます (項目の `Url` にも同じ値が設定されます)。
- `RefuseRedirects` は `true` に設定されます ([リダイレクト](#redirects)を参照)。

ASP.NET と Java では、プロバイダーはエクスポートされるダッシュボードの ID も受け取ります。画像の扱いはプロバイダーが決定します。

- `null` または変更していない項目を返すと、URL がそのままダウンロードされます。
- 変更した項目を返します。たとえば、別の `Url` や `DefaultRefreshRate` を設定できます ([画像のキャッシュ](#caching-images)を参照)。
- 例外をスローすると、その画像は拒否されます。エクスポートはその画像なしで続行されます。Java と Node.js では、拒否はプロバイダー エラーとしてもログに記録されます。

認証プロバイダーも、画像のデータ ソースごとに呼び出されます。`null` を返すと、画像は資格情報なしでダウンロードされます。

:::danger

データ ソース プロバイダーがない場合、データ内のすべての画像 URL がダウンロードされます。サーバーが接続するホストをチェックするのはデータ ソース プロバイダーだけです。データに管理外の URL が含まれる可能性がある場合は、信頼する画像ホストのみを許可し、それ以外では例外をスローしてください。同様に、認証プロバイダーから資格情報を返すのは、それを必要とする画像ホストに対してのみにしてください。

:::

[行レベル セキュリティ](row-level-security.md)で推奨しているように、データ ソース プロバイダーが認識しない項目に対して例外をスローする場合は、画像の項目を最初に処理してください。そうしないと、すべての画像が拒否されます。

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

プロバイダーは、[データ ソースの置き換え](replacing-datasources.md)の説明に従って登録します。

### 画像のキャッシュ {#caching-images}

デフォルトでは、画像はエクスポートのたびに再度ダウンロードされます。ダウンロードを再利用するには、上記のサンプルのように、データ ソース プロバイダーで項目の `DefaultRefreshRate` を設定します。同じ URL のダウンロードが指定した分数より新しい場合、そのダウンロードが再利用されます。データ ソースに設定した `DefaultRefreshRate` は画像には適用されません。

### リダイレクト {#redirects}

リダイレクトは、リダイレクト先のホストにかかわらず、資格情報を含むリクエストのヘッダーを受け取るため、画像のダウンロードではリダイレクトをたどりません。`3xx` の応答はすべて画像の失敗になります。信頼するホストでリダイレクトをたどるには、データ ソース プロバイダーで項目のデータ ソースの `RefuseRedirects` を `false` に設定します。

`RefuseRedirects` はすべての Web リソース データ ソース (`RVWebResourceDataSource`) のプロパティです。独自の Web リソース データ ソースでこれを `true` に設定すると、そのダウンロードはリダイレクトをたどらずに失敗します。ASP.NET では `RefuseRedirects`、Java では `getRefuseRedirects`/`setRefuseRedirects`、JavaScript と Node.js では `refuseRedirects` です。クライアントからも設定できるため、重要な場合はデータ ソース プロバイダーで設定してください。

### 画像のダウンロードの制限 {#image-download-limits}

エクスポートの画像のダウンロードには、エクスポートを遅らせたりメモリを使いすぎたりしないように制限があります。画像は行の順序 (各グリッドの 1 行目、次に 2 行目、以降同様) でダウンロードされるため、各グリッドの上部の行から先に画像が取得されます。

| 制限 | 値 |
|---|---|
| サーバー上のすべてのエクスポートでの同時ダウンロード数 | デフォルトは 4。`MaxConcurrentImageDownloads` で設定 |
| エクスポートのダウンロードが開始されるまでの時間 | 15 秒。それまでに開始されなかった画像はスキップされます |
| 1 つの画像にかかる時間 (リクエストから最後のバイトまで) | 5 秒 |
| 1 つの画像のサイズ (`data:` 画像を含む) | 5 MB。ダウンロードには [`MaxDownloadSize`](caching.md) 設定も適用されます |
| 1 つの SVG 画像のサイズ | 256 KB |
| 1 つのエクスポートで保持される画像 (縮小後) | 50 MB |

応答が画像でない場合 (コンテンツ タイプが `image/` で始まらない場合。HTML のエラー ページなど) も、ダウンロードは失敗します。JPEG と WebP 以外の PNG、GIF などの画像は、25 メガピクセルを超えると失敗します。JPEG と WebP の画像は縮小したサイズでデコードされます。エクスポートの一部の画像が埋め込まれなかった場合、サーバーは件数を含む警告をログに記録します。

同時ダウンロード数を変更するには、`MaxConcurrentImageDownloads` を設定します。1 以上の値を指定する必要があります。

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
