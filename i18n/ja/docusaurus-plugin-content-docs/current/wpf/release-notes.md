# リリース ノート

## 1.6.0 (2023 年 8 月 28 日)

### 重大な変更

* ライセンス キーの変更: 試用モードでもライセンス キーが必要になりました。ライセンス キーが見つからないか無効な場合、SDK は初期化に失敗します。さらに、ライセンス形式が変更され、新しい形式がサポートされる唯一の形式になります。新しいライセンス キーを営業担当者にリクエストしてください。 試用版ライセンス キーは、[こちら](https://www.revealbi.io/ja/download-sdk)に登録することで入手できます。
* `AvailableChartTypes` プロパティは削除されました。これに代わるのは、以下の「新機能」セクションで説明する 'ChartTypes' プロパティです。
* ほとんどのデータ ソースはコア パッケージから削除されました。これらは個別のパッケージとして利用できるようになりました。Data Source packages are **REQUIRED** to be [registered](/wpf/datasources#installing-data-sources).サポートされているデータ ソースと対応するアドイン nuget パッケージに関する情報は、[こちら](wpf/datasources#サポートされているデータ-ソース)にあります。
* Data related objects have been moved into the `Reveal.Sdk.Data` namespace
* Data Source objects (ex: RVSqlServerDataSource) have been moved into their respective namespaces (ex: `Reveal.Sdk.Data.Microsoft.SqlServer`)
 
### 新機能

* 可視化エディターでカスタム可視化をチャート タイプとして追加する機能。新しい `chartTypes' プロパティを使用すると、これが可能になるだけでなく、既存のチャート タイプのアイコン、タイトル、グループ化を変更したり、それらを使用できなくしたりすることもできます。
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
* 文字 「y」、「m」、「d」、または「h」のいずれかを含むカスタム形式の Excel セルからデータが取得される場合、そのデータは常に日付型として解釈される問題。
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
