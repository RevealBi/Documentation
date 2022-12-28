# エクスポート

Reveal SDK を使用すると、ダッシュボードと表示形式の両方をエクスポートして、新しいドキュメント タイプまたは画像を生成できます。

サポートされているダッシュボードのエクスポート形式:
- Excel
- 画像
- JSON
- PDF
- PowerPoint

サポートされている視覚化エクスポート形式:
- Excel
- 画像

すべてのエクスポート オプションは、ダッシュボードを開いたとき、または視覚化を最大化したときに、`RevealView` オーバー フロー メニューの **[エクスポート]** メニュー項目にあります。

![](images/export-menu-item.jpg)

ユーザーが **[エクスポート]** ボタンをクリックすると、有効なエクスポート オプションの 1 つを選択できます。

## Excel へエクスポート
エンドユーザーが **[エクスポート]** オーバーフロー メニューから **[Excel]** メニュー項目をクリックすると、Excel のエクスポートが実行されます。

![](images/export-excel.jpg)

**[Excel]** メニュー項目は、`RevealView.showExportToExcel` プロパティを設定することで表示/非表示にできます。

```javascript
revealView.showExportToExcel = false;
```

**[Excel]** メニュー項目をクリックすると、エンドユーザーは、ワークブックのタイトル、ワークシートのタイトル、作成するワークシート、および表示形式を含めるかどうかを変更できるさまざまなオプションを求められます。

![](images/export-excel-options.jpg)


## 画像へのエクスポート
Reveal SDK では、ダッシュボードまたは表示形式を画像にエクスポートする方法が 2 つあります:
- エンドユーザーによるエクスポート
- プログラムでエクスポート

### エンドユーザーによる画像エクスポート
エンドユーザーの画像のエクスポートは、エンドユーザーが **[エクスポート]** オーバーフロー メニューから **[画像]** メニュー項目をクリックすると実行されます。

![](images/export-image.jpg)

**[画像]** メニュー項目は、`RevealView.showExportImage` プロパティを設定することで表示/非表示にできます。

```javascript
revealView.showExportImage = false;
```

**[画像]** メニュー項目をクリックすると、エンドユーザーにダイアログが表示され、画像をクリップボードにコピーするか、組み込みの画像エディターを使用して画像を編集するか、画像を PNG としてディスクに保存するかを選択できます。

![](images/export-image-options.jpg)

#### カスタム画像のエクスポート
デフォルトでは、エンドユーザーが **[画像をエクスポート] ダイアログ**の **[画像をエクスポート]** ボタンをクリックすると、画像がエクスポートされ、エンドユーザーが画像ファイルを保存する場所を選択できるようにブラウザーのダウンロードに追加されます。ただし、この動作を傍受することができ、代わりにカスタム画像エクスポート ロジックを使用できます。

カスタム画像エクスポートを使用するには、`RevealView.onImageExported` イベントにイベント ハンドラーを追加する必要があります。

```javascript
revealView.onImageExported = (image) => {

};
```

`RevealView.onImageExported` イベントは、画像のエクスポートを保存するのに役立つ次のパラメーターを提供します:
- **image** - 撮影されたダッシュボードのスクリーンショット

#### 例: カスタム画像のエクスポート

```javascript
revealView.onImageExported = (image) => {
    var body = window.open("about:blank").document.body;
    body.appendChild(image);
};
```

### プログラムで画像のエクスポート
エンドユーザーの操作なしでダッシュボードの画像をプログラムでエクスポートするには、`RevealView.toImage` メソッドを呼び出す必要があります。`RevealView.toImage` メソッドを呼び出すと、画面に表示されている RevealView コンポーネントのスクリーンショットが作成されます。``RevealView.toImage`` メソッドは、[画像をエクスポート] ダイアログでユーザーにプロンプトを**表示しません**。

```cs
revealView.toImage( image => {
    //handle image
});
```

#### 例: プログラムで画像のエクスポート

```html
<button onclick="exportToImage()">Export to Image</button>
```

```javascript
function exportToImage() {
    revealView.toImage(image => {
        console.log(image);
        var body = window.open("about:blank").document.body;
        body.appendChild(image);
    });
}
```

:::info Get the Code

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/master/Exporting-Image) にあります。

:::

## PDF へのエクスポート
PDF エクスポートは、エンドユーザーが **[エクスポート]** オーバーフロー メニューから **[PDF]** メニュー項目をクリックすると実行されます。

![](images/export-pdf.jpg)

**[PDF]** メニュー項目は、`RevealView.ShowExportToPDF` プロパティを設定することで表示/非表示にできます。

```javascript
revealView.showExportToPDF = false;
```

**[PDF]** メニュー項目をクリックすると、エンドユーザーにさまざまなオプションの入力を求められます。これにより、ユーザーは PDF ドキュメントのタイトルを変更したり、ドキュメントに含める表示形式、各表示形式のタイトルと説明、ブランド、ページの向き、言語を選択ができます。

![](images/export-pdf-options.jpg)

## PowerPoint へエクスポート
エンドユーザーが **[エクスポート]** オーバーフロー メニューから **[PowerPoint]** メニュー項目をクリックすると、PowerPoint のエクスポートが実行されます。

![](images/export-powerpoint.jpg)

**PowerPoint** メニュー項目は、`RevealView.ShowExportToPowerpoint` プロパティを設定することで表示/非表示にできます。

```javascript
revealView.showExportToPowerPoint = false;
```

**PowerPoint** メニュー項目をクリックすると、エンドユーザーは、PowerPoint ドキュメントのタイトルを変更したり、ドキュメントに含める表示形式、各表示形式のタイトルと説明、およびブランディングを選択したりできるさまざまなオプションが表示されます。

![](images/export-powerpoint-options.jpg)

## サーバーのエクスポート

ダッシュボードは、UI を必要とせずに、サーバー上の Excel、PDF、または PowerPoint にエクスポートできます。「ヘッドレス エクスポート」とも呼ばれます。サーバー上のダッシュボードのエクスポートは、`IDashboardExporter` を使用して実行されます。

`IDashboardExporter` は、次のように ASP.NET コントローラーまたは最小限の API 関数に挿入することで取得できます。

```csharp
app.MapGet("/dashboards/export/{name}", async (string name, IDashboardExporter dashboardExporter) =>
{

}
```

### ダッシュボードをエクスポートする方法
`IDashboardExporter` は、ダッシュボードをファイル ストリームとして、またはディスク上のファイル パスにエクスポートするための API を提供します。サポートされている各エクスポート形式には、エクスポート プロセスを簡素化するための API があります。

**Excel**
```csharp 
//export to stream
var stream = await dashboardExporter.ExportToExcel(dashboardName);

//export to file
await dashboardExporter.ExportToExcel(dashboardName, filePath);
```

**PDF**
```csharp 
//export to stream
var stream = await dashboardExporter.ExportToPdf(dashboardName);

//export to file
await dashboardExporter.ExportToPdf(dashboardName, filePath);
```

**PowerPoint**
```csharp 
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

```csharp
app.MapGet("/dashboards/export/{name}", async (string name, IDashboardExporter dashboardExporter, 
    IRVUserContextProvider userContextProvider, IHttpContextAccessor httpContextAccessor) =>
{
    var userContext = userContextProvider.GetUserContext(httpContextAccessor.HttpContext);
}
```

`IRVUserContext` インスタンスを取得したら、それを引数として export メソッドに渡すことができます。

```csharp
//export to stream
var stream = await dashboardExporter.ExportToExcel(dashboardName, userContext);

//export to file
await dashboardExporter.ExportToExcel(dashboardName, filePath, userContext);
```

### エクスポート オプション
各エクスポート形式は、ダッシュボードをエクスポートする際のさまざまなオプションをサポートしています。たとえば、各ページのヘッダーに著者名を追加したり、各ページのフッターに会社名を追加したりできます。

各エクスポート形式には、特定のオプション オブジェクトがあります:
- Excel: `ExcelExportOptions` オブジェクトを使用
- PDF: `PdfExportOptions` オブジェクトを使用
- PowerPoint: `PowerPointExportOptions` オブジェクトを使用

ダッシュボード エクスポートのオプションを設定するには、エクスポート形式オプション クラスのインスタンスを作成し、それを引数として export メソッドに提供します。

```csharp
//create Pdf options
var pdfOptions = new PdfExportOptions()
{
    Landscape = true
};

//export Pdf to stream
var stream = await dashboardExporter.ExportToPdf(dashboardName, options: pdfOptions);
```

### 例: サーバーでのエクスポート
この例では、形式に基づいてダッシュボードをエクスポートするサービス エンドポイントを作成します。

ASP.NET の最小限の API プロジェクトで、ダッシュボード エクスポート用の新しいルートを作成します。ダッシュボード名とエクスポート形式をルート パラメーターとして定義します。また、エクスポートを実行するために `IDashboardExporter` を挿入する必要があります。次に、エクスポート形式のルート パラメーターに基づいて、正しいエクスポートを実行するためのロジックを作成します。エクスポートの結果を返すときは、必ず正しいコンテンツ タイプを指定してください。

```csharp
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

クライアント アプリケーションで、サービス エンドポイントを呼び出す関数を実行する一連のボタンを作成します。
```html
<button onclick="onExportButtonClicked('pdf')">Export as PDF</button>
<button onclick="onExportButtonClicked('xlsx')">Export as Excel</button>
<button onclick="onExportButtonClicked('pptx')">Export as Power Point</button>
```

この例では、**Sales** という名前のダッシュボードをエクスポートしています。これは、クリックされたボタンによって提供されたエクスポート形式を使用します。
```javascript
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

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/Exporting-Server) にあります。

:::