# リリース ノート

## 1.6.0 (August 28th, 2023)

### Breaking Changes

* Changes in license keys: License key is now required, even for trial mode. The SDK will fail to initialize if the license key is missing or invalid. In addition, the license format has changed and the new format is the only one supported. Request your new license key to your sales rep. Trial license keys are available by registering [here](https://www.revealbi.io/download-sdk).
* `AvailableChartTypes` property has been removed. It's replacement is the 'ChartTypes' property described in the 'New Features' section below.
* Most data sources have been removed from the core package. They're now available as separate packages. The information about the supported data sources and the corresponding add-in nuget packages can be found [here](datasources#supported-data-sources).   
 
### New Features

* Ability to add custom visualization as Chart Types in the visualization editor. The new `ChartTypes' property allows this, as well as modifying the icon, title and grouping of existing chart types, or making them unavailable:
```
//Update existing configuration
var barConfig = revealView.ChartTypes.First(x => x.ChartType == RVChartType.BarChart);
barConfig.Icon = @"C:\images\bar-chart.png";
barConfig.Groups = new string[] {"Enterprise Visualizations", "HR",  "Category" });

//Add pre-configured custom visualization		
revealView.ChartTypes.Add(new RVChartTypeCustomItem("Custom Visualization", "https://host:port/customViz.html", @"C:\images\icon.png", new string[] { "HR" }));

//Delete Grid configuration
revealView.ChartTypes.Remove(revealView.ChartTypes.FirstOrDefault(x => x.ChartType == RVChartType.Grid));
```
* Calculated fields expression language now support decimals specified without a leading '0' (e.g. '.5' meaning '0.5').
* Added support in BigQuery data source for the following calculated-fields functions: YEAR, QUARTER, MONTH, DAY, HOUR, MINUTE, SECOND, REPLACE, WEEKDAY, MONTHNAME, MONTHSHORTNAME, EMPTY, RANDBETWEEN.
* Add Stored procedure support to Oracle data source.
* Allow joining Athena datasources.

### Bug Fixes

* Donut chart doesn't show legend for `<null>` values but shows a section for them.
* Unable to click text "X Selected"/"Show All" on a filter.
* Cell background is not full wide on filters for text "X Selected"/"Show All".
* The position of the search bar in the data selection view is not reset, in a certain scenario.
* Search table on data source dialog causes error/crash after scrolling tables.
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

## 1.5.0 (2023 年 5 月 4 日)

### 重大な変更
* インストーラーはリリースされなくなりました。nuget パッケージは https://www.nuget.org/packages/Reveal.Sdk.Wpf で見つけることができ、サンプルは https://github.com/RevealBi/sdk-samples-wpf で見つけることができます。

### 新機能
* (ベータ版) マウスをホバーしているときにチャート アクションを使用できます。`RevealSdkSettings.EnableActionsOnHoverTooltip = true` を使用してオンにします。

### バグ修正
* 新しいカテゴリ チャートの修正とパフォーマンスの向上。
* クライアントではなく IRVDataSourceProvider の MsSql プロバイダーで Host プロパティを設定するとエラーが発生する問題。
* Schema プロパティが dataSourceItem で設定されていない場合、Redshift クエリは失敗します (デフォルトの 'public' スキーマを使用する必要があります)。
* すべてのデータベース データ ソースでは、DataSourceItem で Database プロパティを設定する必要がありました (DataSource で設定されている場合でも)。現在、プロパティは DataSourceItem で非推奨になり、Database で設定するだけで機能します。
* リンクされたダッシュボードを開くとクラッシュする問題。
* Redshift/Postgres データを示すツリーマップが失敗した問題。
* Redshift または Postgres で標準偏差集計を使用すると、エラーが発生する問題。
* IRVDataSourceProvider を使用して Excel データ ソースに別のシートを設定しても機能しませんでした。
* 表示形式エディター モードで、タイトルと統計アイコンの間の空白スペースをクリックするとエラーが発生する問題。
* 新しい表示形式 (空白のタイトルとして初期化されている場合) のタイトルを変更できない問題。
* localhost への PostgresSQL 接続が機能しない問題。
* JSON 属性名が数字で始まる場合、抽出される値は常に空である問題。
* データ ブレンド フィールド パネルがマウス ホイールまたはトラックパッドでスクロールしない問題。
* 編集モードでフィルターが 10 個以上ある場合、フィルターを移動できない問題。
* 複数の表示形式が同じデータに同時にアクセスした場合の同時実行の問題が修正されました。
* カスタム クエリ プロパティが構成された Sybase ds 項目ラッパーがすべてのデータを返す問題。
* Analysis Services データ ソースの置き換えが機能しない問題。
* Dynamics CRM - データ ソース項目を使用してデータを取得しようとすると、NRE がスローされる問題。
* DashboardEmptyState に画像が設定されていない場合に例外がスローされる問題。
* RVReportingServicesDataSourceItem には、パラメーターを設定するためのプロパティが表示されない問題。
* RVReportingServicesDataSourceItem を使用して PDF レポートをレンダリングすることはできない問題。
* DataSource WebResource URL の代わりに 「No Url specified for web resource」エラーが発生する問題。 
* IRVDataSourceProvider.ChangeDataSourceItemAsync への呼び出しは、dashboardId 引数に対して常に null を持つ問題。
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

## 1.4.1 (2023 年 4 月)
_これは nuget.org のみの更新です。_

### バグ修正
* NuGet パッケージマネージャーを使用して Reveal WPF SDK を参照した場合の「'libigsslic32' への参照を追加できませんでした」エラーを修正しました。

## 1.4.0 (2023 年 2 月)

### 重大な変更
* カテゴリ チャートの新しいルック & フィール。以前のルック & フィールは非推奨ですが、何らかの理由で必要な場合は、`revealSdkSettings.enableNewCharts = false` を実行することで復元できます。
* データ ソース項目のサブタイトルは自動生成されなくなりました。Subtitle プロパティのみが考慮されます。

### 新機能
* フィールドの削除、名前の変更、または並べ替えによって、表示形式エディターに表示されるフィールドのリストをカスタマイズできるようにする新しい API - `onFieldsInitializing` - を追加しました。使用例: 
```
revealView.onFieldsInitializing = function (args) {
	args.fields = args.fields.filter(f => !["Avg.CPC", "Avg. CPC"].some(e => e == f.name));
};
```
* BigQuery、Snowflake、Athena が `CustomQuery` プロパティをサポートするようになりました。
* Snowflake - SDK からの `Warehouse` プロパティの設定を許可できるようになりました。

### バグ修正

* 3 番目のデータセットに結合しようとすると、アプリがフリーズする問題。
* `onDateFilterChanged` の range パラメーターで送信された日付の時間部分に一貫性がない問題。
* グローバル フィルター範囲セレクターに一貫性のない日が表示される問題。「今日」または「昨日」を使用すると、2 つの異なる日が表示されました。
* フィールドが以前のデータ ブレンドからのものである場合、結合に使用されたフィールドがデータ ブレンド エディターに表示されない問題。
* RVSnowflakeDataSourceItem が正しく機能しない問題。

## 1.3.1 (2023 年 1 月)

### 重大な変更
- `Reveal.Sdk.Wpf.Trial` nuget パッケージは、**非推奨**になり、**更新されなくなりました**。
- 新しい `Reveal.Sdk.Wpf` nuget パッケージが [nuget.org](https://www.nuget.org/packages/Reveal.Sdk.Wpf) で利用できるようになり、試用版とライセンス版の両方として機能します。試用版のロックを解除するには、SDK でライセンス キーを設定します。
- ライセンス キーは、Reveal SDK の `RevealSdkSettings` で設定されるようになりました (以前は、これはインストーラーで行われていました)。設定方法は次のとおりです。

```cs
RevealSdkSettings.License = "XYZ123";
```

### バグ修正
- 修正された問題: パラメータを使用した REST データ ソースを作成するときに発生する問題。[戻る] ボタンが押された場合、値はすでに入力されていますが、実際には適用されませんでした。
- 修正された問題: 有効期限の設定に関係なく、ダッシュボードを開くと、使用可能な値のダッシュボード フィルタ リストが常に更新されていました。
- 修正された問題: ダッシュボード フィルタの有効期限の値が保存されませんでした。
- 修正された問題: 最大化してから復元すると、ダッシュボードの水平フィルターが失われます。
- 修正された問題: キーボード (タブ) を使用して、ダッシュボード ビューのケバブ メニューにアクセスできませんでした。
- 修正された問題: リンクされた表示形式でダッシュボード フィルターを選択すると、ダッシュボードのリンクが機能しなくなります。
- 修正された問題: 散布図のマウスオーバー ツールチップに間違った値が表示されます。
- 修正された問題: MenuOpening イベントをキャンセルしても、実際にはキャンセルされませんでした。
- 修正された問題: ChangeDataSourceItemAsync メソッドで、userContext パラメーターに null 値が含まれていました。

## 1.3.0 (2022 年 11 月)

### 新機能
- 新しいデータ ソース: Google アナリティクス 4。
- インタラクティブなダッシュボードのフィルタリング。チャートまたはピボット テーブルのデータ ポイントをクリックして、同じデータ ソースを使用してすべての表示形式をフィルター処理します。`revealView.interactiveFilteringEnabled = true` で有効にします。
- 計算フィールドに新しい 'DateDiff' 関数を追加しました。
- `RevealSdkSettings` にある `DefaultExportPath` プロパティを使用して、**エクスポート パスをカスタマイズできるようになりました**。

### バグ修正
- Postgres & Redshift でブール値をフィルタリングする際の「演算子が存在しません」というエラーを修正しました。
- v1.2.3 で誤って追加され、CORS で問題を引き起こしていた新しい http ヘッダー 'XRID' を削除しました。
