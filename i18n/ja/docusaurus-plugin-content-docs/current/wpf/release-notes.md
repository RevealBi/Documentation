# リリース ノート

## 1.7.1 (Nov 5th, 2024)

### New Features

- Chart visualizations will automatically hide 0 value data labels.
- Custom menu items can now be added to visualization tooltips.

```csharp
//Point to this handler: revealView.TooltipShowing += RevealView_TooltipShowing;
private void RevealView_TooltipShowing(object sender, TooltipShowingEventArgs e)
{
    Action<RVTooltipItem, TooltipItemClickEventArgs> clickHandler = (tooltipItem, args) =>
    {
        Console.WriteLine($"Critical action clicked by sender: {tooltipItem}, with event args: {args}");
    };

    if (e.Cell.FormattedValue == "Digital Security Center")
    {
        e.CustomItems.Add(new RVTooltipItem("Critical", "Escalate Incident", null, clickHandler));
        e.CustomItems.Add(new RVTooltipItem("Critical", "Open Incident Report", null, clickHandler));

        e.CustomItems.Add(new RVTooltipItem("High", "Send Reminder", null, clickHandler));
        e.CustomItems.Add(new RVTooltipItem("High", "Assign Lead Investigator", null, clickHandler));
    }
}
```

- The dependency Npgsql v6.0.9 was updated to v7.0.7.
- The dependency Microsoft.Data.SqlClient v5.1.2 was updated to v5.1.3.
- For the Sybase connector, the dependency System.Data.SqlClient v4.7.0 was updated to v4.8.6.
- Positioning improvements made for tooltips showing actions on hover.
- Grid paging is now enabled by default for supported data sources when a new visualization is created or an existing visualization is edited and switched to grid.
- Performance improvements for request execution and credential resolution under high load.

### Bugs

- Treemap tooltip showing incorrect information.
- Custom visualization bridge name incorrect.
- InMemory data source opens editor directly when there is more than one data source available.
- Date range calendar is not responsive.
- Assigning a calculated field as a data filter doesn't work correctly for Postgres.
- Unable to do 'sort by' with calculated fields.
- Error sorting by a calculated field on sql based providers with "Process Data on Server" setting.
- `trunc` function is not working fine inside concatenate.
- Large number formatting wasn't being applied when configured to a field using the Grid visualization.
- Wrong date formatting shown in UI when setting selected value for date visualization filter.
- Date values reporting incorrectly on click/hover events.
- Combo visualization doesn't calculate lowest axis minimum per axis.
- Stacked Bar visualization displays duplicate y-axis markers when the decimal is set to 0.
- Analysis Services dimension structure is not updated from server with Refresh.
- When using Serilog as logger, message parameters are not properly replaced.
- Interactive filtering is not working for Label Gauge.
- Switching to raw data and then to another visualization causes crash.
- Scrolling a paged row grid into view produces a crash.
- Text visualization shows "There is no data to display".
- Large numbers in Donut Chart are overflowing rather than shrinking.
- The `ShowFilters` property on the RevealView, when set to `false`, does not function as intended.
- Dragging field from hierarchy to Category crashes application.

## 1.7.0 (2024 年 9 月 10 日)

### 新機能

- カテゴリ チャートに固定線を追加できるようになりました。このベータ機能にアクセスするには、`RevealSdkSettings` の `EnabledBetaFeatures` プロパティを有効にします。エディターの固定行セクションでは、データ フィールド、または最高値、最低値、平均値、または固定値の集計特殊フィールドのいずれかを使用できます。
- 表示形式フィルター API に日付のサポートが追加されました。たとえば、「過去 7 日間」などの日付ベースの表示形式フィルターがある場合、次のコードを使用して、返される `RVDateRange` オブジェクトの `From` プロパティと `To` プロパティをチェックすることで、フィルターが評価した日付範囲を確認できます。

```cs
var dateRange = revealView.Dashboard.Visualizations[0].Filters[0].DateRange;
```

- `RevealSdkSettings` の `EnableBetaFeatures` フラグを必要とせずに、サーバー側グリッド ページングが利用できるようになりました。ページングは​​次のプロバイダーでサポートされています: SQL Server、MySQL、BigQuery、PostgreSQL、SyBase、Athena、Oracle。ストアド プロシージャーをサポートするプロバイダーでは、テーブルのようにクエリを実行して行の範囲を返すことができないため、ストアド プロシージャーを選択するとグリッド ページングが無効になります。さらに、サーバー上でのデータ処理が false の場合、およびブレンドされたデータを使用する場合、ページングは​​使用できません。
- 表示形式レベルの説明が追加されました。表示形式を編集するときに、必要に応じて説明を入力できるようになりました。
- 表示形式ではダッシュボードのリンクが自動的にサポートされるようになりました。デフォルトの機能は、[「ダッシュボード リンク」](https://help.revealbi.io/ja/web/linking-dashboards/)トピックの手順を使用して上書きできます。
- 表示形式を最大化すると、オーバーフロー メニューから個別に PDF にエクスポートできるようになりました。
- `ExportOptions` オブジェクトの `IncludeFiltersSummaryPage` プロパティを設定することで、エクスポートでフィルター集計ページを非表示にできるようになりました。
- オーバーフロー メニューまたはフィルター検索ボックスをクリックしたときの背景オーバーレイが明るくなりました。
- グリッド表示形式で非表示フィールドを定義する機能が追加されました。これを使用して、URL またはダッシュボード リンクを定義できます。
- (ベータ版) 同じ表示形式内でフィルタリングされたデータを比較できます。シリーズのツールチップには、選択した値でフィルタリングするオプションが含まれます。表示形式の残りの部分には、フィルタリングされた値と元の値を簡単に比較できるように、両方の値が表示されます。このリリースでは、ファンネル、ツリーマップ、ゲージのサポートが追加されました。この機能は現在、次のグラフ タイプでサポートされています: 縦棒、棒、折れ線、時系列、エリア、ステップ エリア、スプライン、積層型縦棒、積層型エリア、積層型棒、ファンネル、ツリーマップ、ゲージ。この機能を有効にするには、RevealView で `HighlightedFilteringEnabled` を `true` に設定します。
- Windows 統合認証が、SQL Server Analysis Services データ ソースでサポートされます。これを有効にするには、'IRVAuthenticationProvider' 実装で `RVIntegratedAuthenticationCredential` の新しいインスタンスを返します。
- Sql Server Analysis Services データ ソースは `EffectiveUserName` プロパティをサポートするようになり、これにより特定のユーザーになりすますことが可能になりました。このプロパティは、たとえば、userContext に設定されている現在のユーザーの値を使用して `IRVDataSourceProvider` 実装のプロパティを設定することにより、シングル サインオンを実現するために活用できます。

### バグ修正

- キャッシュされたファイルは、Reveal キャッシュにエントリを追加した後、.tmp ファイルを削除していませんでした。
- 値またはラベル フィールドで構成された並べ替えが円チャートの表示形式に反映されません。
- TextBox のみを含むダッシュボードを編集するとクラッシュが発生する可能性があります。
- 「今日」と「昨日」の日付フィルターでは、異なるタイムゾーンで誤った値が表示されます。
- マウスが押されたときにクリック可能な要素の背景色が間違っています。
- 日付フィールドに null 値がある場合、Excel エクスポートで間違ったチャートが生成されます。
- カテゴリを使用すると積層型縦棒チャートの色が消えます。
- 散布図では、一部の状態が緑色で表示されます。
- `FieldsInitializing` を使用してラベルを変更しても、ダッシュボード フィルターのフィールド選択には反映されません。
- 表示形式タイプを変更して Excel にエクスポートすると、フィールドの書式設定が失われます。
- ダッシュボードのリンクは、null または空の文字列値では機能しません。
- Snowflake メタデータ ブラウザーはすべてのスキーマのテーブルを表示します。

## 1.6.7 (2024 年 6 月 26 日)

### 新機能

- 表示形式フィルター (クイック フィルターとも呼ばれます) にプログラムでアクセスし、選択した値を変更するための API が追加されました。

```cs
//Add a selected value, specified by index from the list of available values, to a field given its name.
async Task AddSelValueToFilter(string fieldName, int valueIdx)
{
	var flt = RevealView.Dashboard.Visualizations[0].Filters.GetByFieldName(fieldName);
	var filterSelValues = flt.SelectedValues.ToList();
	var filterValues = (await flt.GetFilterValuesAsync()).ToList(); //Retrieve the selectable values for the filter
	filterSelValues.Add(filterValues[valueIdx]); //Add the specified value to the selection
	flt.SelectedValues = filterSelValues;
}
```
- (ベータ版) 同じ表示形式内でフィルタリングされたデータを比較できます。シリーズのツールチップには、選択した値でフィルタリングするオプションが含まれます。表示形式の残りの部分には、フィルタリングされた値と元の値を簡単に比較できるように、両方の値が表示されます。現在、次のチャート タイプがサポートされています: 縦棒、棒、折れ線、時系列、エリア、ステップ エリア、スプライン、積層型縦棒、積層型エリア、積層型棒。この機能を有効にするには、RevealView で `HighlightedFilteringEnabled` を `true` に設定します。
- (ベータ版) トレンドライン、ラベル、ズームなどにすばやくアクセスするための表示形式ツールバーが追加されました。この機能を有効にするには、RevealSdkSettings で `EnableNewToolbar` を `true` に設定します。
- SQL ベースのデータ ソースに対しクライアント側でカスタム クエリを提供できる機能を削除しました。
- RVGoogleAnalyticsDataSource と RVGoogleAnalyticsDataSourceItem は、Google がこのコネクタの API を 2024 年 7 月 1 日に廃止する予定であるため、削除されました。
- RevealView に `DashboardChanged` イベントを追加しました。

```cs
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();

        revealView.DashboardChanged += RevealView_DashboardChanged;
    }

    private void RevealView_DashboardChanged(object sender, DashboardChangedEventArgs e)
    {
        // Access the old and new dashboard
        var oldDashboard = e.OldValue;
        var newDashboard = e.NewValue;

        // Implement your logic here
        Console.WriteLine($"Dashboard has changed from {oldDashboard.Title} to {newDashboard.Title}");
    }
}
```
- データ ソース ダイアログ内のテーブルがアルファベット順に並べ替えられるようになりました。この変更は次のコネクタに適用されます: SQL Server、MySql、Postgres、Redshift、Oracle、Snowflake。
- RVGoogleAnalytics4DataSource に `AccountId` および `PropertyId` プロパティが含まれるようになり、RVGoogleAnalytics4DataSourceItem の該当するプロパティは非推奨になりました。

### バグ修正

- ラベル セクションにフィールドが設定されていない XMLA ベースの表示形式をエクスポートすると、Excel エクスポートがクラッシュする問題。
- ChangeDataSourceItemAsync の DataSource ID が正しくない問題。
- ダッシュボードに Sparkline 表示形式が読み込まれたときに例外が発生する問題。
- 無効なキャストによって、グリッド表示形式で例外が発生する問題。
- ブレンディング UI で、ストアド プロシージャーが有効な追加データ ソースとして表示される問題。
- データベースから DateTime.MaxValue を読み取るときにエラーが発生する問題。
- タイトルのないウィジェットを含む Excel ファイルをエクスポートするとクラッシュする問題。
- ピボット表示形式の Excel エクスポートで、展開された行を含む場合に列が混在する問題。
- 折れ線チャートの表示形式をエクスポートするときに、行ヘッダーが null になる問題。
- Excel にエクスポートするときに、予約文字が正しくフィルタリングされない問題。
- Excel エクスポートで、日付の書式設定が適用されない問題。
- フィルター エディターのフィールド リストが、式エディターのフィールド リストに影響する問題。
- SharePoint O365 データ ソースが正しく機能しない問題。
- `datediff` 計算式が、一重引用符ではなく二重引用符で機能する問題。
- BigQuery の日付精密ハンドリングが間違っている問題。
- 数値フィールドに基づく表示形式フィルターで、選択した値が表示されない問題。
- 計算フィールドを追加した後、フィルターされたフィールド リストが正しくない問題。

## 1.6.6 (2024 年 4 月 19 日)

### 新機能

- `ShowDescription` プロパティによって制御されるオプションの説明テキスト ボックスを RevealView に追加しました。
- グリッドまたはピボットを PDF にエクスポートすると、ページの幅に収まらない列を含むオーバーフロー テーブルが生成されるようになりました。
- PDF エクスポート時にグリッド列の幅が優先されるようになりました。
- Excel へのエクスポートにおけるピボット グリッドの表示形式の外観が改善されました。
- (ベータ版) グリッド表示形式にサーバー側のページング サポートが追加されました。この機能を有効にして、表示形式エディターの設定ペインに表示するには、`RevealSdkSettings.EnableBetaFeatures` を `true` に設定します。ページングは​​次のプロバイダーでサポートされています: SQL Server、MySQL、BigQuery、PostgreSQL、SyBase、Athena、Oracle。ストアド プロシージャーをサポートするプロバイダーでは、テーブルのようにクエリを実行して行の範囲を返すことができないため、ストアド プロシージャーを選択するとグリッド ページングが無効になります。さらに、サーバー上でのデータ処理が false の場合、およびブレンドされたデータを使用する場合、ページングは​​使用できません。
- 表示形式エディターでデータ ツールチップをプレビューするかどうかを制御するフラグが RevealView に追加されました。クエリが最初の 5 行を取得するのを防ぐため、これらはデフォルトでオフになっています。このツールチップを有効にするには、`IsPreviewDataInVisualizationEditorEnabled` を `true` に設定します。
- サーバー上でプロセス データを使用する場合、MySql でブレンディングがサポートされるようになりました。
- ラジアル チャートの新しいルック & フィール。以前のルック & フィールは非推奨ですが、必要に応じて `RevealSdkSettings.EnableNewCharts = false` を実行することで復元できます。
- 棒チャートと柱状チャートには、表示形式エディターの設定ペインに重複とギャップの設定が含まれるようになりました。これにより、バー間の重なりの量とグループ間のスペースの量を制御できます。
- ツリーマップの表示形式では、マウスをホバーするとツールヒントが表示され、ノードが強調表示されるようになりました。

### バグ修正

- UI からエクスポートする場合、円チャートとドーナツ型チャートが表示されない問題。
- 計算フィールドが依存しているデータ ブレンドを削除しても、計算フィールドが削除されない問題。
- Redshift で関数を呼び出すとエラーが発生する問題。
- Postgres 関数が正しく動作しない問題。
- `CanAddDateFilter` を設定すると例外が発生する問題。
- ストアド プロシージャー パラメーター画面では、以前のデータが取得されたり、まったく取得されなかったりする場合があります。
- 検索バーを使用すると、ポップアップ要素でスクロールが機能しなくなる問題。
- 分数の数字は、階級区分図のツールチップには表示されない問題。
- 3000 を超えるフィルター値は保持されない問題。
- 事後計算フィールドの UI で名前が変更されたピボット フィールドに関するエラーが発生する問題。
- ストアド プロシージャーの入れ替えフィールドが正しく動作しない問題。
- 円チャートの凡例が、表示するのに十分なスペースがある場合に表示されなくなる問題。
- サーバー上のプロセス データをオフにした状態で MySql をブレンドするとエラーが発生する問題。
- スライス チャートでホバー イベントが意図したとおりに動作しない問題。
- ピボット グリッドの表示形式に総計が表示されない問題。
- Analysis Services データ プロバイダーを使用すると、誤った総計値が表示される問題。
- Analysis Services データ プロバイダーを使用すると、ダッシュボードと視覚化フィルターに誤った総計が表示される問題。
- ピボット グリッドで値を並べ替えた後、フィールド名の変更が失われる問題。
- 「...hierarchy already appears in the Axis1 axis. 」 エラーが Analysis Services で発生する問題。
- Analysis Services で 「上の N」 フィルターを適用すると、誤った結果が返される問題。
- リソースベースの表示形式では誤ったキャッシュ エントリが取得される問題。
- ブレンディングを使用すると、誤ったキャッシュ エントリがヒットされる問題。

## 1.6.4 (2024 年 2 月 14 日)

### 重大な変更

- プロパティ名 `ShowExportToPowerpoint` が `ShowExportToPowerPoint` に変更されました。
- 散布図とバブル チャートの新しいルック & フィール。古いルック アンド フィールは廃止されました。必要に応じて、`RevealSdkSettings.EnableNewCharts = false` を実行することで復元できます。

### 新機能

- `Antlr4.Runtime.Standard` の `Reveal.Sdk.Data` v4.7.2 依存関係を 4.8 に更新しました。
- `RVDashboard` の `Description` プロパティを公開しました。
- ダッシュボードのタイトルを個々の Excel シートに追加しました。
- Excel および PDF にエクスポートする際にダッシュボード フィルターが含まれるようになりました。
- PostgreSQL ストアド プロシージャは現在サポートされていないため、タブから削除しました。

### バグ修正

- データ ソース項目の設定が欠落している場合、Athena エラー メッセージが不十分である問題。
- ソース項目プロバイダーが実装されていない場合に、S3 DS 「Region has not been set (地域が設定されていません)」 エラーが発生する問題。
- ソース項目プロバイダーが実装されていない場合に、Redshift DS 「Host can't be null (ホストを null にすることはできません)」 エラーが発生する問題。
- ソース項目プロバイダーが実装されていない場合に、MySql 「unable to connect (接続できません)」 エラーが発生する問題。
- データ ソース項目プロバイダーが実装されていない場合に、テーブル選択時に Postgres エラーが発生する問題。
- 一部のグリッドのシナリオで大文字と小文字を区別しない並べ替えが正しくない問題。
- 「サーバーでデータを処理」フラグの初期化が誤っている問題。
- 別のデータ ソースからフィールドを追加する際の `CURRENTTIMEZONE()` が正しくない問題。
- KPI vs Time で今月の空の値が表示されるようになりました。
- グリッドまたはピボット タイプの表示形式における日付タイプの列の並べ替えが正しく動作しない問題。
- 表示形式の読み込み中にエクスポートを実行すると複数のポップアップが表示される問題。
- マップの場所名の比較では大文字と小文字が区別される問題。

## 1.6.2 (2024 年 1 月 5 日)

### 新機能

- `Reveal.Data.Microsoft.SqlServer` v1.1.4 の依存関係 `Microsoft.Data.SqlClient` を v5.1.2 に更新しました。
- キャッシュ ファイル `tabulardata.sqlite` の sqlite ストレージは、無制限に増大することを防ぐためにデフォルトで無効になりました。
- `RevealSdkSettings.EnableActionsOnHoverTooltip` が有効になっている場合、アクション ツールチップがピボット表示形式で利用できるようになりました。チャート表示形式上にマウスを置くと、データ ポイントから特定のピクセル数以内にツールチップが表示されるようになりました。
- 「サーバーでデータを処理」が有効になっている SQL Server データ ソースで次の関数を使用する計算フィールドのサポート:  `fyear`、`and`、`or`、`concatenate`、`replace`、`date`、`time`、`hour`、`minute`、`second`、`formatdate`、および `datevalue`。
- 実行時にダッシュボード内の URL リンクをインターセプトおよび変更できるようにするために、`UrlLinkRequested` という名前の新しいクライアント イベントが追加されました。

```cs
revealView.UrlLinkRequested = (args) => {
   return args.Url + "$changed=true";
};
```

- 編集モードを制御する機能を追加しました。
  - `EnterEditMode()`
  - `ExitEditMode(applyChanges: boolean)`
  - `EditModeEntered`
  - `EditModeExited`
  
```cs
public MainWindow()
{
	InitializeComponent();

	var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards/Sales.rdash");
	revealView.Dashboard = new RVDashboard(filePath);
	revealView.EditModeExited += RevealView_EditModeExited;
	revealView.SaveDashboard += RevealView_SaveDashboard;
}

private void RevealView_SaveDashboard(object sender, DashboardSaveEventArgs e)
{
	e.SaveFinished();
}

private void RevealView_EditModeExited(object sender, EditModeExitedArgs e){}

private void ExitEditMode_Click(object sender, RoutedEventArgs e)
{
	var save = saveChanges.IsChecked.HasValue ? saveChanges.IsChecked.Value : false;
	revealView.ExitEditMode(save);
}
```
- 異なる接続で異なるデータベースにアクセスできるようにするために、`RVSnowflakeDataSoure` に `Role` プロパティが追加されました。
- MySQL コネクターでのストアド プロシージャーのサポートが追加されました。
- ダッシュボード フィルターに表示される値の最大数を制御するために、`RevealSdkSettings` プロパティに `MaxFilterSize` が追加されました。

### バグ修正

- 選択した値の検索を使用すると、Redshift フィルターで 3k 制限を超える値が表示されない問題。
- SSAS コネクターを使用する場合、並べ替え時にピボット グリッドが行を混同する問題。
- KPI vs Time - データがある状態から表示するデータがない状態に変化したときにテキストが重なる問題。
- クリック イベントがないときに「最初の表示形式を追加」の上にマウスを置くとポインター カーソルが表示される問題。
- [新しい計算フィールド] ウィンドウのツールチップに空白のヒントが表示される問題。
- データ ソース項目はデータ ソースのサブタイトルを上書きしてはなりません。
- 大量のデータがある場合、グリッド表示形式の読み込みに時間がかかる問題。
- Snowflake ホストのスペイン語翻訳では 「Anfitrion」 と表示される問題。
- `ChartTypes` を構成するときに、`AreaChart` が変更に応答しない問題。

## 1.6.1 (2023 年 10 月 25 日)

### 重大な変更

- 単一視覚化モードを有効にすると、`RevealView`の次のプロパティが自動的に `false` に設定されるようになりました: `ShowChangeVisualization`、`CanEdit`、`ShowMenu`、`ShowStatisticalFunctions`、`ShowFilters`。
- スライス チャート (円チャート、ファンネル チャート、ドーナツ チャート) のルック アンド フィールが変わりました。古いルック アンド フィールは非推奨ですが、必要に応じて `RevealSdkSettings.enableNewCharts = false` を実行することで復元できます。

### 新機能

- 可視化間のマージンを変更するために、プロパティ `VisualizationMargin` が `RevealTheme` に追加されました。
- 単一の可視化の改善: 1) プロパティ `ShowBreadcrumb` および `ShowBreadcrumbDashboardTitle` を使用したダッシュボード タイトル、およびパンくずリスト コントロール、2) プロパティ `ShowTitle` が `RVVisualization` に追加、3) `RevealView` のプロパティ: `ShowChangeVisualization`、`CanEdit`、`ShowMenu`、`ShowStatisticalFunctions`、`ShowFilters` は、単一視覚化モードを有効にするときに自動的に `false` に設定されます。
- SQL ベースのストアド プロシージャはクエリをログに出力し、データ型の不一致を通知します。

### バグ修正

- PostgreSQL で何百ものスキーマがある場合に、テーブルのリストの読み込みが非常に遅くなる問題を修正しました。パフォーマンスを向上させるために、サーバー上でスキーマがフィルタリングされるようになりました。
- チャート セレクターを繰り返し使用すると、アプリが応答しなくなることがある問題を修正しました。
- null 値をフィルタリングできない問題を修正しました。
- ダーク テーマを使用するとテーブルとビューのタブが表示されない問題を修正しました。
- 言語が英語に設定されていない場合、Choropleth チャートでデータのない領域が緑色で表示される問題を修正しました。
- KPI 可視化で使用される計算フィールドを変更した後にエディターを終了すると例外が発生する問題を修正しました。
- PowerPoint および PDF エクスポートでツリーマップが表示されない問題を修正しました。
- `RVWebResourceDataItem` で画像または PDF を使用する場合のエラー ダイアログが表示される問題を修正しました。
- オプションを選択してもエクスポート オプションのポップオーバーが閉じない問題を修正しました。
- `RVODataDataSource` の `Url` プロパティが `RVODataDataSourceItem` にコピーされる問題を修正しました。
- 「その他」カテゴリが表示されている場合にシリーズのオフセット色に色を割り当てる問題を修正しました。
- Money 型の Sybase 列が文字列として扱われる問題を修正しました。

## 1.6.0 (2023 年 8 月 28 日)

### 重大な変更

* ライセンス キーの変更: 試用モードでもライセンス キーが必要になりました。ライセンス キーが見つからないか無効な場合、SDK は初期化に失敗します。さらに、ライセンス形式が変更され、新しい形式がサポートされる唯一の形式になります。新しいライセンス キーを営業担当者にリクエストしてください。試用版ライセンス キーは、[こちら](https://www.revealbi.io/ja/download-sdk)に登録することで入手できます。
* `AvailableChartTypes` プロパティは削除されました。これに代わるのは、以下の「新機能」セクションで説明する `ChartTypes` プロパティです。
* ほとんどのデータ ソースはコア パッケージから削除されました。これらは個別のパッケージとして利用できるようになりました。データ ソース パッケージは[登録](/wpf/datasources.md#データ-ソースのインストール)することが**必須**です。サポートされているデータ ソースと対応するアドイン nuget パッケージに関する情報は、[こちら](/wpf/datasources.md#サポートされるデータ-ソース)にあります。
* データ関連のオブジェクトは `Reveal.Sdk.Data` 名前空間に移動されました。
* データ ソース オブジェクト (例: RVSqlServerDataSource) は、それぞれの名前空間 (例: `Reveal.Sdk.Data.Microsoft.SqlServer`) に移動されました。
 
### 新機能

* 可視化エディターでカスタム可視化をチャート タイプとして追加する機能。新しい `ChartTypes` プロパティを使用すると、これが可能になるだけでなく、既存のチャート タイプのアイコン、タイトル、グループ化を変更したり、それらを使用できなくしたりすることもできます。

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

* 計算フィールドの式言語は、先頭に '0' を付けずに指定された小数をサポートするようになりました (例: '0.5' を意味する '.5')。
* 次の計算フィールド関数に対する BigQuery データ ソースのサポートが追加されました: YEAR、QUARTER、MONTH、DAY、HOUR、MINUTE、SECOND、REPLACE、WEEKDAY、MONTHNAME、MONTHSHORTNAME、EMPTY、RANDBETWEEN。
* ストアド プロシージャのサポートを Oracle データ ソースに追加しました。
* Athena データ ソースへの参加を許可しました。

### バグ修正

* ドーナツ チャートには `<null>` 値の凡例は表示されませんが、それらのセクションが表示される問題。
* フィルター上のテキスト [X Selected/Show All] (X 選択 / すべて表示) をクリックできない問題。
* テキスト [X Selected/Show All] (X 選択 / すべて表示) のフィルターでは、セルの背景が全幅に表示されない問題。
* 特定のシナリオでは、データ選択ビューの検索バーの位置がリセットされない問題。
* データ ソース ダイアログでテーブルを検索すると、テーブルをスクロールした後にエラー / クラッシュが発生する問題。
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
* DataSource WebResource URL の代わりに 「No Url specified for web resource」 エラーが発生する問題。
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

## 1.4.1 (2023 年 4 月 4 日)
_これは nuget.org のみの更新です。_

### バグ修正
* NuGet パッケージマネージャーを使用して Reveal WPF SDK を参照した場合の 「'libigsslic32' への参照を追加できませんでした」 エラーを修正しました。

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
