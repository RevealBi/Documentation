import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# リリース ノート

## 1.6.2 (January 5th, 2024)

### New Features

#### All Platforms

- The visualization background color picker was updated to use [Coloris](https://github.com/mdbassit/Coloris). With this enhancement the property `canChangeVisualizationBackgroundColor` has been marked as obsolete because we are now enabling the visibility of background color setting by default. Additionally, the [Spectrum](https://bgrins.github.io/spectrum/) dependency is no longer required.
- The sqlite storage for cache file `tabulardata.sqlite` is now disabled by default to prevent growing without limit
- When `$.ig.RevealSdkSettings.enableActionsOnHoverTooltip` is enabled, the actions tooltip is now available on the Pivot visualization. Hovering on a chart visualization will now show the tooltip when within a certain number of pixels from the data point.
- Support for calculated fields using the following functions on a SQL Server data source with "Process Data on Server" enabled; `fyear`, `and`, `or`, `concatenate`, `replace`, `date`, `time`, `hour`, `minute`, `second`, `formatdate`, and `datevalue`.
- New client event named `onUrlLinkRequested` added to allow for intercepting and modifying URL links in dashboards at runtime

```javascript
revealView.onUrlLinkRequested = (args) => {
    return args.url + "&webUpdated=true&cellValue=" + args.cell.value();                
};
```

- Support added for custom colors on client & server export

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
PdfExportOptions options = new PdfExportOptions();

options.InitScript = @"
	function init(revealView){
		$.ig.RevealSdkSettings.theme = new $.ig.MountainDarkTheme();                   

		revealView.refreshTheme();                

		revealView.onVisualizationSeriesColorAssigning = function (visualization, defaultColor, fieldName, categoryName) {
			if (categoryName === ""Critical"") {
					return ""rgb(0,0,0)"";
			}
			return defaultColor;
		}
	}";

await _exporter.ExportToPdf(dashboardId, path, options);
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
PdfExportOptions options = new PdfExportOptions();	
			
options.setInitScript("function init(revealView){\r\n"
		+ "		$.ig.RevealSdkSettings.theme = new $.ig.MountainDarkTheme();                   \r\n"
		+ "\r\n"
		+ "		revealView.refreshTheme();                \r\n"
		+ "\r\n"
		+ "		revealView.onVisualizationSeriesColorAssigning = function (visualization, defaultColor, fieldName, categoryName) {\r\n"
		+ "			if (categoryName === \"Critical\") {\r\n"
		+ "					return \"rgb(0,0,0)\";\r\n"
		+ "			}\r\n"
		+ "			return defaultColor;\r\n"
		+ "		}\r\n"
		+ "	}");

String filePath = rootFileName + dashboardId + "_stream.pdf";

RevealEngineLocator.dashboardExporter.exportToPdf(dashboardId, null, options ,new ExportStreamCallback() {

	@Override
	public void onSuccess(InputStream stream) {
		//Do something
	}

	@Override
	public void onFailure(Exception e) {
		asyncResponse.resume(e);							
	}
	
});
```

  </TabItem>
  
  <TabItem value="node" label="Node.js">    

```javascript
var options = new PdfExportOptions();
options.initScript = `
function init(revealView){
	$.ig.RevealSdkSettings.theme = new $.ig.MountainDarkTheme();                   

	revealView.refreshTheme();                

	revealView.onVisualizationSeriesColorAssigning = function (visualization, defaultColor, fieldName, categoryName) {
		if (categoryName === "Critical") {
				return "rgb(0,0,0)";
		}
		return defaultColor;
	}
}`;
	
revealServer.exporter.exportPdf("Cybersecurity_Sample_ManyFilters_Values", "c:\\Temp\\Exports\\export_node.pdf", options, new RVUserContext("someone"));
```

  </TabItem>

</Tabs>

- Added the ability to control edit mode
  - `enterEditMode()`
  - `exitEditMode(applyChanges: boolean)`
  - `onEditModeEntered`
  - `onEditModeExited`
  
```javascript
<button onclick="revealView.enterEditMode()">Start editing</button>
<button onclick="revealView.exitEditMode(false)">Stop editing (discard)</button>
<button onclick="revealView.exitEditMode(true)">Stop editing (save)</button>

<div id="revealView" style="height: 920px; width: 100%;"></div>

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js" ></script>
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js" ></script>    
<script src="https://dl.revealbi.io/reveal/libs/1.6.2/infragistics.reveal.js"></script>
<script type="text/javascript">
        
        //set this to your server url
        $.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");   
        var revealView = new $.ig.RevealView("#revealView");
		
        $.ig.RVDashboard.loadDashboard("Sales", (dashboard) => {
            revealView.dashboard = dashboard;
        });
        
</script>
```
- Added a `role` property to `RVSnowflakeDataSoure` to allow for accessing different databases for different connections
- Added support for stored procedures in the MySQL connector
- Added a `maxFilterSize` property to `RevealSdkSettings` for controlling the maximum number of values displayed in a dashboard filter

#### ASP.NET

- Added support for setting global filters for headless exports

```cs
PdfExportOptions options = new PdfExportOptions();
options.DateFilter = new RVDateDashboardFilter(RVDateFilterType.CustomRange,
                                        new RVDateRange(new DateTime(2022,4,1), DateTime.Now)
                                );

options.Filters.Add(new RVDashboardFilter("incident_severity", new List<object> { "Medium", "Critical" }));
options.Filters.Add(new RVDashboardFilter("team", new List<object> { "Digital Security Center"}));

await _exporter.ExportToPdf(dashboardId, path, options);
```

#### ASP.NET & Node

- Added custom query support for the MongoDB connector
- Added support for data blending (joining) on server for the MongoDB connector
- Added support for ARM64 for ASP.NET and Node on MacOS and Linux

#### Java

- JavaScript SDK distributions will no longer be available at https://maven.revealbi.io/repository/public/com/infragistics/reveal/sdk/reveal-sdk-distribution/x.y.z/reveal-sdk-distribution-x.y.z-js.zip. Instead, the location will be https://dl.infragistics.com/reveal/libs/x.y.z/reveal-sdk-distribution-js.zip.
- Added support for setting global filters for headless exports

```java
PdfExportOptions options = new PdfExportOptions();	

RVDateDashboardFilter dateFilter = new RVDateDashboardFilter(RVDateFilterType.CUSTOM_RANGE,
			new RVDateRange( new GregorianCalendar(2022,4,1), new GregorianCalendar())
                        );
						
options.setDateFilter(dateFilter);
					
options.getFilters().add(new RVDashboardFilter("incident_severity", new ArrayList<Object>(Arrays.asList("Medium", "Critical"))));
```

### Bug Fixes

#### All Platforms

- Setting `canAddDateFilter` caused an exception
- Redshift filters don't show values besides the 3k limit when using search on select values
- The text "Show Data Labels" is not translated when viewing field settings in the visualization editor
- Pivot grid when using the SSAS connector mixed up rows when sorting
- KPI vs Time - overlapping text when state changes from having data to having no data to display
- Pointer cursor shows when hovering over "add your first visualization" when there is no click event
- Localization issue on server side when client is using another language
- REST connector crashes when no url is provided in client
- Tooltip showing blank hint in the New Calculated Field window
- Data source items should not copy over the data source subtitle
- Grid visualization takes forever to load when there's a lot of data
- Spanish translation for Snowflake host shows "Anfitrion" and it shouldn't
- When configuring `chartTypes` the `AreaChart` doesn't seem to respond to any changes
- Server-side dashboard export problem due to build number appending to version

#### ASP.NET & Node

- The MongoDB connector wasn't filtering documents without a field set when filtering by empty fields.

## 1.6.1 (2023 年 10 月 25 日)

### 重大な変更

#### すべてのプラットフォーム

- 単一視覚化モードを有効にすると、`RevealView` の次のプロパティが自動的に `false` に設定されます: `showChangeVisualization`、`canEdit`、`showMenu`、`showStatisticalFunctions`、`showFilters`。
- `window.revealDisableKeyboardManagement` プロパティはデフォルトで `true` に設定されるようになりました。`true` に設定すると、タブのフォーカスは RevealView で停止しません。
- スライス チャート (円チャート、ファンネル チャート、ドーナツ チャート) のルック アンド フィールが変わりました。古いルック アンド フィールは非推奨ですが、必要に応じて `RevealSdkSettings.enableNewCharts = false` を実行することで復元できます。

### 新機能

#### すべてのプラットフォーム

- 個々の可視化のヘッドレス エクスポート。
- 外部ダッシュボード リンクに `noopener` 属性が追加されました
- 可視化間のマージンを変更するために、プロパティ `VisualizationMargin` が `RevealTheme` に追加されました
- 単一の可視化の改善: 1) プロパティ `showBreadcrumb` および `showBreadcrumbDashboardTitle` を使用したダッシュボード タイトルとブレッドクラム コントロール、2) プロパティ `showTitle` が `RVVisualization` に追加、3) `RevealView` のプロパティ : `showChangeVisualization`、`canEdit`、`showMenu`、`showStatisticalFunctions`、`showFilters` は、単一視覚化モードを有効にするときに自動的に `false` に設定されます。
- SQL ベースのストアド プロシージャはクエリをログに出力し、データ型の不一致を通知します。

#### ASP.NET & Node

- 新しいデータ ソース: MongoDB

### バグ修正

#### すべてのプラットフォーム

- PostgreSQL で何百ものスキーマがある場合に、テーブルのリストの読み込みが非常に遅くなる問題を修正しました。パフォーマンスを向上させるために、サーバー上でスキーマがフィルタリングされるようになりました。
- `window.revealDisableKeyboardManagement` プロパティはデフォルトで `true` に設定されるようになりました。`true` に設定すると、タブのフォーカスは RevealView で停止しません。
- チャート セレクターを繰り返し使用すると、アプリが応答しなくなることがある問題を修正しました。
- 散布図で小数点以下の桁を使用する値が正しく表示されない問題を修正しました。
- null 値をフィルタリングできない問題を修正しました。
- RevealView は font-family で指定されたバックアップ フォントをサポートしていない問題を修正しました。
- ダーク テーマを使用するとテーブルとビューのタブが表示されない問題を修正しました。
- 言語が英語に設定されていない場合、Choropleth チャートでデータのない領域が緑色で表示される問題を修正しました。
- KPI 可視化で使用される計算フィールドを変更した後にエディターを終了すると例外が発生する問題を修正しました。
- PowerPoint および PDF エクスポートでツリーマップが表示されない問題を修正しました。
- `RVWebResourceDataItem` で画像または PDF を使用する場合のエラー ダイアログが表示される問題を修正しました。
- オプションを選択してもエクスポート オプションのポップオーバーが閉じない問題を修正しました。
- `RVODataDataSource` の `url` プロパティが `RVODataDataSourceItem` にコピーされる問題を修正しました。
-「その他」カテゴリが表示されている場合にシリーズのオフセット色に色を割り当てる問題を修正しました。

#### Java

- ヘッドレス エクスポートが Linux で機能しない問題を修正しました。

## 1.6.0 (2023 年 8 月 28 日)

### 重大な変更

#### すべてのプラットフォーム 
* ライセンス キーの変更: 試用モードでもライセンス キーが必要になりました。ライセンス キーが見つからないか無効な場合、SDK は初期化に失敗します。さらに、ライセンス形式が変更され、新しい形式がサポートされる唯一の形式になります。新しいライセンス キーを営業担当者にリクエストしてください。試用版ライセンス キーは、[こちら](https://www.revealbi.io/ja/download-sdk)に登録することで入手できます。
* `availableChartTypes` プロパティは削除されました。これに代わるのは、以下の「新機能」セクションで説明する `chartTypes` プロパティです。
* クロスプラットフォームのパフォーマンスを向上させるために、'libgdiplus' への依存関係が削除されました。
* SDK は Quill.js に依存しなくなりました。

#### ASP.NET
* ほとんどのデータ ソースはコア パッケージから削除されました。これらは個別のパッケージとして利用できるようになりました。データ ソース パッケージは[登録](/web/datasources#データ-ソースのインストール)することが**必須**です。サポートされているデータ ソースと対応するアドイン nuget パッケージに関する情報は、[こちら](/web/datasources#サポートされているデータ-ソース)にあります。
* Reveal には .net 6.0 以降が必要になりました。
* データ関連のオブジェクトは `Reveal.Sdk.Data` 名前空間に移動されました。
* データ ソース オブジェクト (例: RVSqlServerDataSource) は、それぞれの名前空間 (例: `Reveal.Sdk.Data.Microsoft.SqlServer`) に移動されました。
 
### 新機能

#### すべてのプラットフォーム 

* 可視化エディターでカスタム可視化をチャート タイプとして追加する機能。新しい `chartTypes` プロパティを使用すると、これが可能になるだけでなく、既存のチャート タイプのアイコン、タイトル、グループ化を変更したり、それらを使用できなくしたりすることもできます。
```
//Update existing configuration
var barConfig = revealView.chartTypes.find(x => x.chartType == 'BarChart');
barConfig.icon = 'https://host:port/images/bar-chart.png';
barConfig.groups = ["Enterprise Visualizations", "HR", "Category"];

//Add pre-configured custom visualization
revealView.chartTypes.push({
            title: "Custom Visualization",
            url: "https://host:port/customViz.html",
            icon: "https://host:port/icon.png",
            groups: ["HR"]
        });

//Delete Grid configuration
var gridConfig = revealView.chartTypes.find(x => x.chartType == 'Grid');
revealView.chartTypes.splice(revealView.chartTypes.indexOf(gridConfig), 1);
```

* (ベータ版) マウスをホバーしているときにチャート アクションを使用できます。`$.ig.RevealSdkSettings.enableActionsOnHoverTooltip = true` を使用してオンにします。
* 計算フィールドの式言語は、先頭に '0' を付けずに指定された小数をサポートするようになりました (例: '0.5' を意味する '.5')。
* 次の計算フィールド関数に対する BigQuery データ ソースのサポートが追加されました: YEAR、QUARTER、MONTH、DAY、HOUR、MINUTE、SECOND、REPLACE、WEEKDAY、MONTHNAME、MONTHSHORTNAME、EMPTY、RANDBETWEEN。
* コピーと貼り付けが改善されました。ブラウザーのタブやページを更新しても機能するようになりました。
* コンテナーのサイズが変更されると、RevealView 自体のサイズも変更されます。
* ストアド プロシージャのサポートを Oracle データ ソースに追加しました (Java ではまだ利用できません)。
* Athena データ ソースへの参加を許可しました。

### バグ修正

#### すべてのプラットフォーム 
* menuItem アクション関数を使用して複数のメニュー項目をプッシュすると、最後のアクション関数が呼び出される問題。
* ドーナツ チャートには `<null>` 値の凡例は表示されませんが、それらのセクションが表示される問題。
* PDF へのエクスポートでは、割り当てられたテーマが使用されない問題。
* フィルター上のテキスト [X Selected/Show All] (X 選択 / すべて表示) をクリックできない問題。
* テキスト [X Selected/Show All] (X 選択 / すべて表示) のフィルターでは、セルの背景が全幅に表示されない問題。
* カスタム テーマ フォントの使用は、KPI の視覚化には影響しない問題。
* JavaScript クライアントで定義された Oracle データ ソースで [No providerid specified...] (プロバイダー ID が指定されていません...) エラーが発生する問題。
* 特定のシナリオでは、データ選択ビューの検索バーの位置がリセットされない問題。
* データ ソース ダイアログでテーブルを検索すると、テーブルをスクロールした後にエラー / クラッシュが発生する問題。
* DefaultRefreshRate が 0 の場合、画像 / PDF Web リソースは読み込まれない問題。
* スパークラインでは数値の書式設定は適用されない問題。
* ゲージのツールチップには数値の書式設定が表示されない問題。
* BigQuery の「NUMERIC」データ型は適切にサポートされていないため、エラーが発生する問題。
* BigQuery には四半期集計がない問題。
* BigQuery の「MOD」関数では、2 つの異なるタイプの数値データ（float64 と int64 など）を使用することはできない問題。
* datasourceItem にスキーマが設定されていない場合、postgres で [Function does not exist] (関数が存在しません) エラーが発生する問題。
* データをグリッドとして表示する場合、統計関数は表示されない問題。
* チャート視覚化用のエクスポート xlsx は、Reveal SDK で変更すると正しくない問題。
* BigQuery のデータ ソースの追加画面でデータセットの大きなリストをスクロールすると、チェックボックスの状態が一貫性がなくなる問題。
* プロジェクト ID が DS 上でのみ設定されている場合、BigQuery DataSourceItem は機能しない問題。
* 文字「y」、「m」、「d」、または「h」のいずれかを含むカスタム形式の Excel セルからデータが取得される場合、そのデータは常に日付型として解釈される問題。
* ツリーマップは数値の書式設定を準拠しない問題。
* 数値の書式設定は財務チャートのツールチップには表示されない問題。
* ラジアル チャートのツールチップには数値の書式設定は表示されない問題。
* Athena と BigQuery では、100k セル制限の警告が表示されない問題。
* 数学関数ログが Athena で動作しなくなった問題。

#### ASP.NET
* ヘッドレス エクスポートとインタラクティブ エクスポートの両方が Linux では機能しない問題。
* Microsoft.Data.SqlClient >= 5.0.0 が Asp.net プロジェクトで使用されている場合の問題を修正しました。
* Oracle データ ソースで資格情報エラーを確認しました。

#### Node
* NodeSDK を使用する場合、リクエスト ヘッダーは RVRESTDataSource に対して機能しない問題。

#### Java
* システムのデフォルトの文字セットが UTF-8 でない場合、BigQuery から読み取られたデータのエンコーディングの問題。
* createwidget API の IRVDataSourceProvider.changeDataSourceItem で null IRVUserContext を取得する問題。

## 1.5.0 (2023 年 5 月 4 日)

### 重大な変更
* 一部のシナリオでは、IRVDataSourceProvider で設定された情報がクライアントに表示され、ダッシュボード ファイルにも格納されていました。これは望ましい動作ではありませんでした。またダッシュボードの編集時に再現が困難な問題の発生原因でもありました。1.5.0 以降、IRVDataSourceProvider で設定されたデータ ソース情報はクライアントに送信されません。IRVDataSourceProvider の特定の実装によっては、これが大きな影響を与える可能性があります。一般的に言えば、実装が正しいことを確認するには、ChangeDataSource の重要な実装がある場合は、ChangeDataSourceItem も実装し、この ChangeDataSourceItem が dataSourceItem.dataSource オブジェクトで ChangeDataSource を呼び出すようにします。さらに、S3、Rest などのデータ ソースからの CSV、Json、Excel ファイルを操作する場合は、csv/json/excel データ ソース項目で ChangeDataSourceItem への呼び出しを受け取る可能性があることを考慮してください。その場合、dataSourceItem.resourceItem が適切に変更されていることを確認する必要があります。これは、dataSourceItem.resourceItem.dataSource に対して ChangeDataSource を呼び出すことも意味します。
* IRVDataSourceProvider には、ChangeDataSourceAsync の実装が必要になりました。
* ASP.NET SDK のインストーラーはリリースされなくなりました。開始するには、https://help.revealbi.io/web/getting-started-server でドキュメントを確認してください。

### バグ修正

#### すべてのプラットフォーム
* ヘッドレス エクスポート: 横向きがデフォルトの向きになりました。
* 新しいカテゴリ チャートの修正とパフォーマンスの向上。
* クライアントではなく IRVDataSourceProvider の MsSql プロバイダーで Host プロパティを設定するとエラーが発生する問題。
* Schema プロパティが dataSourceItem で設定されていない場合、Redshift クエリは失敗します (デフォルトの 'public' スキーマを使用する必要があります)。
* 財務チャートが正しく機能していませんでした。 
* host プロパティは、RVSqlServerDataSource の IRVAuthenticationProvider で常に null の値を持っていました。
* すべてのデータベース データ ソースでは、DataSourceItem で Database プロパティを設定する必要がありました (DataSource で設定されている場合でも)。現在、プロパティは DataSourceItem で非推奨になり、Database で設定するだけで機能します。
* リンクされたダッシュボードを開くとクラッシュする問題。
* Redshift/Postgres データを示すツリーマップが失敗した問題。
* Redshift または Postgres で標準偏差集計を使用すると、エラーが発生する問題。
* IRVDataSourceProvider を使用して Excel データ ソースに別のシートを設定しても機能しませんでした。
* 表示形式エディター モードで、タイトルと統計アイコンの間の空白スペースをクリックするとエラーが発生する問題。
* 新しい表示形式 (空白のタイトルとして初期化されている場合) のタイトルを変更できない問題。
* JSON 属性名が数字で始まる場合、抽出される値は常に空である問題。
* データ ブレンド フィールド パネルがマウス ホイールまたはトラックパッドでスクロールしない問題。
* 編集モードでフィルターが 10 個以上ある場合、フィルターを移動できない問題。
* カスタム クエリ プロパティが構成された Sybase ds 項目ラッパーがすべてのデータを返す問題。
* Analysis Services データ ソースの置き換えが機能しない問題。
* Dynamics CRM - データ ソース項目を使用してデータを取得しようとすると、NRE がスローされる問題。
* DashboardEmptyState に画像が設定されていない場合に例外がスローされる問題。
* RVReportingServicesDataSourceItem には、パラメーターを設定するためのプロパティが表示されない問題。
* RVReportingServicesDataSourceItem を使用して PDF レポートをレンダリングすることはできない問題。
* DataSource WebResource URL の代わりに 「No Url specified for web resource」エラーが発生する問題。
* `IRVDataSourceProvider.ChangeDataSourceItemAsync` への呼び出しは、dashboardId 引数に対して常に null を持つ問題。
* KPI インジケーター - 「表示するデータがありません。」のスタイルが間違っている問題。
* オプションの選択を開始すると、一部のグローバル フィルターがリセットされる問題。
* カスタム スタイルを含む特定の Excel シートを使用すると、Null 参照例外がスローされる問題。
* MySQL タイムスタンプ列は、実際にセッションのタイムゾーンにある場合、UTC 日時として読み取られる問題。
* nuget ファイルには、必要以上の依存関係が含まれている問題。
* RVRedshiftDataSourceItem を使用すると、Redshift ブレンディングのパフォーマンスが低下する問題。
* SDK で InMemory データ ソースを使用する際にエラーが発生する問題。
* Lead の ConvertedDate をフィルターとして使用すると、Salesforce 表示形式でエラーが発生する問題。
* DS/DSI シナリオの置換後に S3 Excel リソース項目が機能しない問題 (ウィジェットの作成時にシートを選択した後、アプリがロードされたままになる)。
* Rest API URL はエラーに表示されるべきではありません。
* d.ts の RVDashboard.visualizations タイプを VisualizationsArray に変更しました。

#### Node
* Node.js SDK のヘッドレス エクスポートに関するいくつかの改善。Linux/MacOS で利用できるようになりました。

#### Java
* Snowflake DataSource の 'Schema' プロパティが無視されていた問題。
* Java SDK の使用時にアセットの表示形式が機能しない問題。
* タイプ 'timestamptz' の列を使用するテーブルの Redshift クエリは、null 値が含まれている場合に失敗した問題。
* Java SDK で MaxDownloadSize 制限が無視されている問題。

## 1.4.0 (2023 年 2 月)

### 重大な変更
* カテゴリ チャートの新しいルック & フィール。以前のルック & フィールは非推奨ですが、何らかの理由で必要な場合は、`revealSdkSettings.enableNewCharts = false` を実行することで復元できます。
* データ ソース項目のサブタイトルは自動生成されなくなりました。Subtitle プロパティのみが考慮されます。

### 新機能

#### すべてのプラットフォーム
* フィールドの削除、名前の変更、または並べ替えによって、表示形式エディターに表示されるフィールドのリストをカスタマイズできるようにする新しい API - `onFieldsInitializing` - を追加しました。使用例: 
```
revealView.onFieldsInitializing = function (args) {
	args.fields = args.fields.filter(f => !["Avg.CPC", "Avg. CPC"].some(e => e == f.name));
};
```
* BigQuery、Snowflake、Athena が `CustomQuery` プロパティをサポートするようになりました。
* Snowflake - SDK からの `Warehouse` プロパティの設定を許可できるようになりました。

#### Node
* (ベータ版) node.js SDK のヘッドレス エクスポート。現在、Windows プラットフォームでのみ機能します。
* Node.js SDK で `RVHeadersDataSourceCredentials` が利用可能になりました。

### バグ修正

#### すべてのプラットフォーム
* 3 番目のデータセットに結合しようとすると、アプリがフリーズする問題。
* Id プロパティが設定されていない場合に、RVDashboardDataSource を使用するとクラッシュする 問題。(Web のみ)
* onDateFilterChanged の range パラメーターで送信された日付の時間部分に一貫性がない問題。
* グローバル フィルター範囲セレクターに一貫性のない日が表示される問題。「今日」または「昨日」を使用すると、2 つの異なる日が表示されました。
* フィールドが以前のデータ ブレンドからのものである場合、結合に使用されたフィールドがデータ ブレンド エディターに表示されない問題。
* クライアントで Database プロパティを指定しない限り、Athena DataSourceItem はエラーを発生する問題。(Web のみ)。
* RVSnowflakeDataSourceItem が正しく機能しない問題。

#### ASP.NET
* DocumentExportOptions が使用されている場合、ヘッドレス エクスポートは失敗します。

#### Java
* Snowflake で 「Fail to retrieve row count for first arrow chunk」 というエラーが発生する問題。(Java のみ)

## 1.3.1 (2023 年 1 月)

### 重大な変更

#### ASP.NET
- `Reveal.Sdk.Web.AspNetCore.Trial` nuget パッケージは、**非推奨**になり、**更新されなくなりました**。 
- 新しい `Reveal.Sdk.AspNetCore` nuget パッケージが [nuget.org](https://www.nuget.org/packages/Reveal.Sdk.AspNetCore) で利用できるようになり、試用版とライセンス版の両方として機能します。試用版のロックを解除するには、SDK でライセンス キーを設定します。ライセンス キーは、Reveal SDK の初期化パラメーターで設定されるようになりました (以前は、これはインストーラーで行われていました)。設定方法は次のとおりです。

```cs
services
    .AddMvc()
        .AddReveal(builder =>
        {
            builder
              .AddSettings(settings =>
              {
                  settings.License = "XYZ123";
              });
        });	
```

#### Node
- `RVUserNamePasswordDataSourceCredential` の名前を `RVUsernamePasswordDataSourceCredential` に変更しました。大文字の「N」を小文字の「n」に変更しました。

### バグ修正

#### すべてのプラットフォーム
- ヘッドレス エクスポートのいくつかの改善点: 
	- API を改善しました。
	- マップを使用した表示形式が正しく表示されるようになりました。
	- 実行時のメモリ フットプリントが減少しました。
	- ダッシュボードにタイトルがないとエクスポートが失敗する問題を修正しました。
- 修正された問題: パラメータを使用した REST データ ソースを作成するときに発生する問題。[戻る] ボタンが押された場合、値はすでに入力されていますが、実際には適用されませんでした。
- 修正された問題: 有効期限の設定に関係なく、ダッシュボードを開くと、使用可能な値のダッシュボード フィルタ リストが常に更新されていました。
- 修正された問題: ダッシュボード フィルタの有効期限の値が保存されませんでした。
- 修正された問題: 最大化してから復元すると、ダッシュボードの水平フィルターが失われます。
- 修正された問題: キーボード (タブ) を使用して、ダッシュボード ビューのケバブ メニューにアクセスできませんでした。
- 修正された問題: リンクされた表示形式でダッシュボード フィルターを選択すると、ダッシュボードのリンクが機能しなくなります。
- 修正された問題: 散布図のマウスオーバー ツールチップに間違った値が表示されます。
- 修正された問題: MenuOpening イベントをキャンセルしても、実際にはキャンセルされませんでした。
- 修正された問題: ChangeDataSourceItemAsync メソッドで、userContext パラメーターに null 値が含まれていました。

#### Java
- 修正された問題: Azure で mssql に接続すると、「Login failed due to client TLS version...」エラーが発生します。
- 修正された問題: Google アナリティクス 4 を対話的にに追加できませんでした。

## 1.3.0 (2022 年 11 月)

### 新機能
- バックエンドからダッシュボードをエクスポートできるようににりました:

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
var pdfStream = await dashboardExporter.ExportToPdf(dashboardId);
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
RevealEngineLocator.dashboardExporter.exportToPdf(dashboardId, new ExportStreamCallback() {
	@Override
	public void onSuccess(InputStream stream) {
		// result PDF to be read from the stream parameter
	}
	@Override
	public void onFailure(Exception e) {
		// the export failed :(
	}
});
```

  </TabItem>

</Tabs>


- 新しいデータ ソース: Google アナリティクス 4。
- インタラクティブなダッシュボードのフィルタリング。チャートまたはピボット テーブルのデータ ポイントをクリックして、同じデータ ソースを使用してすべての表示形式をフィルター処理します。`revealView.interactiveFilteringEnabled = true` で有効にします。
- コールバックを含むメソッドには、promise メソッドの処理を可能にする追加の署名が含まれるようになりました。

```javascript
$.ig.RevealUtility.loadDashboard(dashboardId).then(dashboard => {
  revealView.dashboard = dashboard;
});
```

async/await を使用する場合:

```javascript
let dashboard = await $.ig.RevealUtility.loadDashboard(dashboardId);
revealView.dashboard = dashboard;
```

- `$.ig.revealSdkSettings` から `ensureFontsLoadedAsync` メソッドを使用してデフォルトのフォントを手動でロードする必要はなくなりました。
- 計算フィールドに新しい 'DateDiff' 関数を追加しました。

### バグ修正

#### すべてのプラットフォーム
- Postgres & Redshift でブール値をフィルタリングする際のエラー (「演算子が存在しません」) を修正しました。
- ロケールにハイフンが含まれている場合にローカリゼーションが機能しない問題を修正しました。
- REST データ ソースから新しい表示形式を作成するときに、`IRVDataSourceProvider.ChangeDataSourceItem` が呼び出されない問題を修正しました。
- v1.2.3 で誤って追加され、CORS で問題を引き起こしていた新しい http ヘッダー 'XRID' を削除しました。

#### Java
- sdk-ext: commons-text ライブラリを更新しました。
- 一部の Excel ファイルを処理するときの応答時間が非常に遅い問題を修正しました。
