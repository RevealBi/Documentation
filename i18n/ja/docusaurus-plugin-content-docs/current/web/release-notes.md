import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# リリース ノート

## 1.6.0 (August 28th, 2023)

### Breaking Changes

#### All Platforms
* Changes in license keys: License key is now required, even for trial mode. The SDK will fail to initialize if the license key is missing or invalid. In addition, the license format has changed and the new format is the only one supported. Request your new license key to your sales rep. Trial license keys are available by registering [here](https://www.revealbi.io/download-sdk).
* `availableChartTypes` property has been removed. It's replacement is the 'chartTypes' property described in the 'New Features' section below.
*  The dependency to 'libgdiplus' has been removed to enhance our cross-platform performance. 
* The SDK no longer depends on Quill.js.

#### ASP.NET
* Most data sources have been removed from the core package. They're now available as separate packages. The information about the supported data sources and the corresponding add-in nuget packages can be found [here](/web/datasources#supported-data-sources).   
* Reveal now requires .net 6.0 or newer.
* Data related objects have been moved into the `Reveal.Sdk.Data` namespace
* Data Source objects (ex: RVSqlServerDataSource) have been moved into their respective namespaces (ex: `Reveal.Sdk.Data.Microsoft.SqlServer`)
 
### New Features

#### All Platforms

* Ability to add custom visualization as Chart Types in the visualization editor. The new `chartTypes' property allows this, as well as modifying the icon, title and grouping of existing chart types, or making them unavailable:
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
* (Beta) Chart actions available while hovering the mouse. Turn on using `$.ig.RevealSdkSettings.enableActionsOnHoverTooltip = true`.
* Calculated fields expression language now support decimals specified without a leading '0' (e.g. '.5' meaning '0.5').
* Added support in BigQuery data source for the following calculated-fields functions: YEAR, QUARTER, MONTH, DAY, HOUR, MINUTE, SECOND, REPLACE, WEEKDAY, MONTHNAME, MONTHSHORTNAME, EMPTY, RANDBETWEEN.
* Improved Copy & Paste. Now it works across browser tabs / pages refreshes.
* Make the RevealView resize itself when its container is resized.
* Add Stored procedure support to Oracle data source (not yet available in Java).
* Allow joining Athena datasources.

### Bug Fixes

#### All Platforms
* Pushing multiple menu items with menuItem action functions calls the last action function.
* Donut chart doesn't show legend for `<null>` values but shows a section for them.
* Export for Pdf is not taking the assigned Theme.
* Unable to click text "X Selected"/"Show All" on a filter.
* Cell background is not full wide on filters for text "X Selected"/"Show All".
* Using custom theme font doesn't affect the KPI visualization.
* "No providerid specified..." error in Oracle data source defined on javascript client.
* The position of the search bar in the data selection view is not reset, in a certain scenario.
* Search table on data source dialog causes error/crash after scrolling tables.
* DefaultRefreshRate of 0 prevents image/pdf web resource from loading.
* Number formatting is not applied in Sparkline.
* Tooltip for gauge does not display number formatting.
* The "NUMERIC" data type in BigQuery isn't properly supported and causes Error.
* BigQuery is missing Quarter aggregation.
* The "MOD" function in BigQuery does not allow you to use two different types of numeric data (e.g. float64 and int64).
* 'Function does not exist' error in postgres when schema is not set in the datasourceItem.
* Statistical functions are not displayed when viewing data as grid.
* Export xlsx for charts visualization is not correct when changing them in reveal sdk.
* Inconsistent checkbox state in when scrolling a large list of data sets in BigQuery add data source screen.
* BigQuery DataSourceItem doesn't work if the project id is set only on the DS.
* When data is obtained from an excel cell that has a custom format that includes any of the letters 'y', 'm', 'd' or 'h' it is always interpreted as date type.
* Treemap does not respect number formatting.
* Number formatting is not displayed in Financial chart tooltip.
* Number formatting is not displayed in the tooltip of the Radial chart.
* Athena and BigQuery don't show the 100k cell limit warning.
* Math function Log stopped working for Athena.

#### ASP.NET
* Export -both headless and interactive- doesn't work on linux.
* Fix issue when Microsoft.Data.SqlClient >= 5.0.0 is used by a Asp.net project.
* Verify Credentials error on Oracle data source.

#### Node
* Request headers do not work for RVRESTDataSource when using the NodeSDK.

#### Java
* Encoding issues in data read from BigQuery if the system's default charset is not UTF-8.
* Getting null IRVUserContext in IRVDataSourceProvider.changeDataSourceItem in createwidget API.

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
