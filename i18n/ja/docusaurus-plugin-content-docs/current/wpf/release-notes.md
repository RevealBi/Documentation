# リリース ノート

## 1.3.0 (11 月 2022 年)

### 新機能
- 新しいデータ ソース: Google アナリティクス 4
- インタラクティブなダッシュボードのフィルタリング。チャートまたはピボット テーブルのデータ ポイントをクリックして、同じデータ ソースを使用してすべての表示形式をフィルター処理します。`revealView.interactiveFilteringEnabled = true` で有効にします。
- 計算フィールドに新しい 'DateDiff' 関数を追加しました。
- `RevealSdkSettings` にある `DefaultExportPath` プロパティを使用して、**エクスポート パスをカスタマイズできるようになりました**。

### バグ修正
- Postgres & Redshift でブール値をフィルタリングする際の「演算子が存在しません」というエラーを修正しました。
- v1.2.3 で誤って追加され、CORS で問題を引き起こしていた新しい http ヘッダー 'XRID' を削除しました。

## 1.2.3 (10 月 2022 年)

### 新機能
- 計算フィールドに新しい 'EndOfMonth' 関数を追加しました。

### バグ修正
- 表示形式のデータ ソースを変更するとエラー レポートが表示されない問題を修正しました。
- 合計の表示中にすべての行をフィルターする際のエラーを修正しました。

## 1.2.2 (9 月 2022 年)
### バグ修正
- カスタム カラー ピッカーを修正しました。_System.IO.FileNotFoundException_ エラー: CanChangeVisualizationBackgroundColor が true に設定されていると、「'Reveal.UI.Controls.Editors.XamColorPicker...' ファイルまたはアセンブリを読み込めませんでした...」がスローされました。

## 1.2.0 (8 月 2022 年)
### 新機能

- **カスタム メニュー項目のサポートを追加しました。**
以下のスニペットは、カスタムの「マイ メニュー項目」の作成を示しています。
```csharp
revealView.MenuOpening += RevealView_MenuOpening;
private void RevealView_MenuOpening(RVVisualization visualization, MenuOpeningEventArgs args)
{
	if (args.IsInEditMode && visualization == null) //dashboard edit mode
	{
		args.MenuItems.Add(new RVMenuItem()
		{
			Icon = new RVImage(new BitmapImage(new Uri("pack://application:,,,/Images/save-24.png"))),
			Title = "My Menu Item",
			Action = () =>
			{
				MyCustomAction();
			}
		});
	}
}
```

- **ダッシュボードのカスタムの空の状態の画像のサポートを追加しました。**
新規ダッシュボードの作成時に、表示されるプレースホルダー画像を変更する機能を追加しました。
```csharp
revealView.Assets.DashboardEmptyState = new RVImageAsset()
{
  Image = new RVImage(new BitmapImage(new Uri("pack://application:,,,/Images/dashboard_empty.png"))),
  Title = "Add your First Visualization",
  Subtitle = "Visualize all your data in perfect harmony"
};	
```

- **デフォルトの表示形式を変更する方法を追加しました。**
以下のスニペットでは、既定の表示形式をピボット グリッドに変更します。
```csharp
revealView.DefaultChartType = RVChartType.PivotGrid;
```

- **RVInMemoryDataSourceItem にパラメーターのサポートを追加しました。**
パラメーターをインメモリ データ ソースの項目に設定して、追加情報を渡すことができるようになりました。
```csharp
public Task<RVDataSourceItem> ChangeDataSourceItemAsync(RVDataSourceItem dataSourceItem)
{
    if (dataSourceItem is RVInMemoryDataSourceItem item)
    {
        item.Parameters = new Dictionary<string, object>()
        {
            { "CurrentUser", GetCurrentUserName() }
        };
        return Task.FromResult<RVDataSourceItem>(item);
    }
    return Task.FromResult<RVDataSourceItem>(null);
}
```

- **スキーマ属性を SQL Server データ ソースに追加しました。**
データ ソースのスキーマ プロパティにより、SDK ユーザーは表示されるリスト テーブル / ビュー / プロシージャを提供されたスキーマに制限できます。
```csharp
var msSqlAdventureDS = new RVSqlServerDataSource()
{
	Id = "msSqlAdventureId",
	Title = "SQLServer Adventure DS",
	Host = "server.domain",
	Database = "AdventureWorks",
	Schema = "HumanResources",
	Port = 1433
};
datasources.Add(msSqlAdventureDS);
```

- **チャート の表示形式の凡例で使用されるカテゴリ グループ区切り記号を変更する方法を追加しました。**
以下のスニペットでは、セパレーターをデフォルト値 (スラッシュ) からハイフンに変更しています。
```csharp
revealView.CategoryGroupingSeparator = "-";
```

- **SQL Server データ ソースの TrustServerCertificate 設定のサポートを追加しました。**
この機能を RVSqlServerDataSource に実装するために、2 つの新しいブール プロパティを追加しました。
	- Encrypt
	- TrustServerCertificate。
	
どちらも、接続文字列でまったく同じ名前のフラグを設定するために使用されます。		
```csharp
var msSqlAdventureDS = new RVSqlServerDataSource()
{
	Id = "msSqlAdventureId",
	Title = "SQLServer Adventure DS",
	Host = "server.domain",
	Database = "AdventureWorks",
	Schema = "HumanResources",
	Port = 1433,
	Encrypt = true,
	TrustServerCertificate = true
};
datasources.Add(msSqlAdventureDS);
```

### バグ修正
- Postgres/Redshift でデータ ソースを結合するときの ApplyTimeZone エラーを修正しました。
- ダッシュボードが更新されたときにダッシュボード フィルターが更新されない問題を修正しました。
- ツールチップのリンク名の数値形式を修正しました。
- Postgres/Redshift で会計年度が機能しない問題を修正しました。
- currentTimeZone のキャッシュの問題を修正しました。
- Google ドライブのポップアップにGoogle スプレッドシートが表示されない問題を修正しました。
すべての適格なデータ ソース (スプレッドシート、Excel、CSV、および JSON) がコネクタ内で正しく表示されるよう修正しました。			
- 時系列チャートにおいて、負の値に対し最小値が適切に設定されない問題を修正しました。
時系列チャートの Y 軸の最小値と最大値が、自動的に調整されるよう修正しました。		

## 1.1.7 (6 月 2022 年)

### 新機能
- _チャートの新しい初期ズーム レベル機能 (RevealSdkSettings.EnableNewCharts = true で有効にされた新しいチャートの場合のみ)。_
初期ズーム レベルは、視覚化のための設定パネルでエンドユーザーが制御できます。
- _RevealView.VisualizationSeriesColorAssigning イベントを介してプログラムでチャートの色を割り当てる方法が追加されました。_
次のコード スニペットは、すべての円チャートについて、高の場合は赤色、低の場合は緑色を返します:
```csharp
revealView.VisualizationSeriesColorAssigning += RevealView_VisualizationSeriesColorAssigning;
private Color RevealView_VisualizationSeriesColorAssigning(RVVisualization visualization, Color defaultColor, string fieldName, string categoryName)
{
    if (visualization.ChartType == RVChartType.PieChart)
    {
        if (categoryName == "High")
        {
            return Color.FromRgb(255, 0, 0);
        }
        else if (categoryName == "Low")
        {
            return Color.FromRgb(0, 255, 0);
        }
    }
    return defaultColor;
}
```

- _エンドユーザーは、円とドーナツの視覚化の「その他」のスライスを制御できるようになりました。_ 
視覚化の [設定] パネルで、エンドユーザーはしきい値を選択するか (その値より下のすべてのスライスが単一の 「その他」 のスライスにマージされます)、機能を完全に無効にすることができます。

### バグ修正
- 初期構成後に、必要な単一選択を含むダッシュボード フィルターがどのように機能するかを修正しました。
以前は、フィルターを作成した後の初期状態では、選択されたすべての要素が表示されていましたが、必要な単一選択が有効になっている場合は有効な状態ではありません。
- 数値フィールドのブレッドクラム (ドリルダウンが使用されている場合に表示される) で使用される書式を修正しました。これまで、フィールドの書式は無視されていました。
- 「データなし」 メッセージの代わりにデータがない場合に NaN を表示するテキスト視覚化の問題を修正しました。
- インストールの準備ができたときにインストーラーによって表示されるヘルプ ページへのリンクを修正しました。

## 1.1.6 (6 月 2022 年)

### バグ修正
- Windows 7 で WPF SDK を実行するとクラッシュする問題を修正しました。

## 1.1.5 (5 月 2022 年)

### 新機能
- _RVDateDashboardFilter.Range プロパティは、選択したフィルター タイプに基づいて日付範囲を返すようになりました。_
RVDateDashboardFilter.Range は、以前フィルターがカスタム範囲に設定されている場合のみ有効な値を返していました。

### バグ修正
- IRVDataSourceProvider API を使用してフィルターのデータ ソースを置き換えたときにダッシュボード フィルターのカスケードが機能しない問題を修正しました。
- チャートの集計日付を日付フィルターにマッピングするダッシュボードの問題を修正しました。(一部のタイムゾーンで間違った日付範囲にマッピングしていました)。
- onVisualizationDataPointClicked が時系列表示形式で呼び出されない問題を修正しました。

## 1.1.4 (3 月 2022 年)

### バグ修正
- 内部バグ修正。

## 1.1.3 (3 月 2022 年)

### 新機能
- _新しいデータ ソース: Google Search コンソール_
- _表示形式のデータ読み込みをキャンセルする新しいイベントを追加しました: onVisualizationDataLoading。_

### バグ修正
- 重大度の高い脆弱性の影響を受ける Reveal SDK の依存関係の問題
Reveal SDK の CefSharp.Wpf 依存関係は、[潜在的な悪用](https://github.com/advisories/GHSA-vv6j-ww6x-54gx)を回避するためにバージョン 94.4.50 から 98.1.210 に更新されました。

## 1.1.1 (12 月 2021 年)

### 新機能
- _タイトルやケバブ メニューなど、ダッシュボード ヘッダーを非表示にするオプションが追加されました。_
[ShowHeadet](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_ShowHeader)。
- _エンド ユーザーが  を最大化する機能を有効/無効にするオプションを追加しました。_
[CanMaximizeVisualizationProperty](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_CanMaximizeVisualizationProperty)。
- _視覚化エディターで特定の視覚化の背景色を変更するエンド ユーザー機能を有効/無効にするための新しいオプションがエディターに追加されました。_
[CanChangeVisualizationBackgroundColorProperty](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_CanChangeVisualizationBackgroundColorProperty)。
- _プログラムで視覚化の背景色を変更する新しい方法。_
[SetVisualizationBackgroundColor](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_SetVisualizationBackgroundColor_Reveal_Sdk_RVVisualization_System_Windows_Media_Color_)。

### バグ修正
- データセットに null の日付値がある場合の Excel へのエクスポートを修正しました。
- カスタム ブランド ロゴを使用して PDF または PPT にエクスポートする際の問題を修正しました。

## 1.1.0 (10 月 2021 年)

### 新機能
- _IRVDataSourceProvider インターフェイスが変更されました。_
IRVDataSourceProvider インターフェイスには単一の ChangeDataSourceItem があり、ダッシュボードがデータ ソース アイテムを使用する必要があるときはいつでも呼び出されます。
- _データ ブレンディング画面の検索フィールド_
結果に結合 / 追加するフィールドを検索する機能を追加することにより、データ ブレンディング UI が改善されました。

## 1.0.2013 (9 月 2021 年)

### バグ修正
- [SDK] ウィンドウ サイズが小さいと、テキスト チャートが判読できなくなる問題
Web とデスクトップの両方で、ウィンドウのサイズが小さいと、テキスト チャート フォントが読み取れなくなります。
- [SDK] 日付形式のリストの取得に関する問題
Desktop SDK でフィールド エディターの日付形式のリストを取得するときに、集計された日付で _RVBaseFormattingService_ を使用できるようになりました。

## 1.0.2008 (8 月 2021 年)

### バグ修正
- [SDK] ダッシュボードをストリームとして保存する際に問題が発生する問題
ダッシュボードをストリームとして保存するときに、特定のケースで _dashboard.Serialize.Async()_ が null を返していました。

## 1.0.2005 (6 月 2021 年)

### 新機能
- _散布図が OpenStreetMap をサポートするようになりました。_
デスクトップ (WPF) および Web クライアント (JS) で OpenStreetMap 画像タイルを構成して使用できるようになりました。
- _新しいサムネイル コンポーネント_
_RevealDashboardThumbnailView_ を使用してダッシュボードのサムネイルを描画できるようになりました。

### バグ修正
- 計算フィールド フィルターがサーバー上のデータ プロセスで機能しない問題
 データのサーバー側集計を有効にすると、フィルターとして使用される計算フィールドが期待どおりにデータをフィルタリングしていなかった問題
 - ダッシュボード フィルターに関する Google アナリティクスの問題
 Google アナリティクス データ ソースからデータを取得するときに、ダッシュボード フィルターを作成できなかった問題
 
## 1.0.1956 (5 月 2021 年)
 
### バグ修正
- [SDK] 誤って表示されたデータ ソースの完全なリストの問題
Desktop SDK で _DataSourcesRequested_ コールバックを使用すると、明示的に追加されたデータ ソースの代わりに、データ ソースのリスト全体が表示されていました。
- [SDK] デスクトップ SDK の Excel へのエクスポートが期待どおりに機能しない問題
ダッシュボードを歳読み込んでから単一の視覚化を Excel にエクスポートすると、ダッシュボードの最初の視覚化は常にエクスポートされたものでした。
- [SDK] 動的ポートを使用する SQL データ ソースを含むダッシュボードが読み込まれていない問題
動的ポート （ホスト フィールドにインスタンスを提供） を使用して定義された SQL データ ソースを使用してダッシュボードを読み込むと、動的ポート構成の問題が原因でデータ ソース接続が機能しませんでした。
- 視覚化フィルターとして設定された計算フィールドがエラーをスローしていた問題
別の計算フィールドに依存する計算フィールドに基づいて視覚化フィルターを構成すると、「無効な列名」 というエラーが表示されていました。
- 「並べ替え」構成が異なるドリルダウン シナリオが期待どおりに機能しない問題
階層内のフィールドが「並べ替え: `<any field>`」と降順の並べ替えの組み合わせで構成されている場合、結果としてダッシュボードが読み込まれませんでした。
 
## 1.0.1866 (3 月 2021 年)
 
### 新機能
- _Desktop SDK の新しいプロパティ:_
	- _ShowEditDataSource_ - データ ソース オーバーフロー メニューで通常使用できる [編集] ボタンを無効にするために使用できます。
	- _CanAddDashboardFilter_: このプロパティは、[フィルターの追加] メニューの [ダッシュボード フィルターの追加] オプションを非表示にすることができます。これらのオプションは、ダッシュボード編集モードで使用できます。
	- _CanAddDateFilter_: このプロパティは、[フィルターの追加] メニューの [日付フィルターの追加] オプションを非表示にすることができます。これらのオプションは、ダッシュボード編集モードで使用できます。

## 1.0.1821 (3 月 2021 年)

### バグ修正
- [SDK] SDK アプリが NRE 例外をスローすることがある問題。ユーザーが操作せずに SDK アプリケーションを 90 分以上開いた場合、操作を実行すると例外がスローされていました。

## 1.0.1772 (2 月 2021 年)

### バグ修正
- [SDK] packages.config で WPF NuGet パッケージのインストールが失敗する問題
ホスト プロジェクトが packages.config を使用した場合、WPF NuGet パッケージのインストールが失敗していました。

## 1.0.1763 (2 月 2021 年)

### バグ修正
- [公開バグ修正] [SDK] HasPendingChanges プロパティが正しく動作しない問題
Desktop SDK では、ダッシュボードを変更して保存した後、HasPendingChanges プロパティが false に設定されていませんでした。
- カスタム フィルタリングが機能しない問題
Desktop SDK では、カスタム クエリが期待どおりにデータをフィルタリングしていませんでした。
- [SDK] SQL Server テーブルを非表示にすると、ビューも非表示になる問題
RVDataSourceItemsFilter を使用してすべてのテーブルを非表示にし、ビューのみを表示すると、[ビュー] タブも非表示になりました。
- [SDK] AzureSQL データ プロバイダーがエラーをスローする問題
AzureSQL 接続を追加すると、エラー メッセージが表示されました。
- LocalizationProvider が設定されている場合、日付フィルターは表示されない問題
LocalizationProvider が設定されて、表示形式エディターに日付フィルター開始 / 終了が表示されませんでした。
- 日本語にローカライズされていない単語の問題
「その他」 という言葉は日本語にローカライズされていませんでした。

## 1.0.1712 (1 月 2021 年)

### バグ修正
- [SDK] サーバー コンポーネントは Newtonsoft.Json シリアライザー に依存しています。
Reveal サーバー コンポーネントは、MVC アプリケーションのデフォルトの JSON シリアル化設定に依存していました。これで、ホスティング アプリは必要に応じて JSON シリアル化設定を構成できます。
- [SDK] SQL Server フィルタリングが NVARCHAR 列で機能しない問題
フィルタリングされた値にマルチバイト文字が含まれている場合、Microsoft SQL Server のフィルタリングが NVARCHAR 列に対して機能しませんでした。

## 1.0.1669 (12 月 2020 年)

### バグ修正
- [SDK] [サーバーでデータを処理] でピボット階層フィルタリングが機能しない問題
[サーバーでデータを処理] オプションがオンになっている場合、ピボット エディターでのドリルダウン階層はデータをフィルタリングしていなかった問題
- [サーバーでデータを処理] で [SDK] カスタム フィルタリングが機能しない問題
[サーバーでデータを処理] オプションがオンになっている場合、カスタム クエリは正しい行数を返しなかった問題

## 1.0.1629 (12 月 2020 年)

### 新機能
- _JSON ファイルを使用してダッシュボードを保存 / ロード_
Reveal SDK を使用して、JSON ファイルからダッシュボードを保存/ロードできるようになりました。

### バグ修正
- カテゴリ フィールド ラベルが表示されない問題
カテゴリ チャートでは、ツールチップにフィールド ラベルではなく、カテゴリの元のフィールド名が表示されていました。
- ドリルダウン ブレッドクラムの日付が誤って表示される問題
日付フィールドをドリルダウンすると、ブレッドクラムに値が正しく表示されませんでした。これで、ブレッドクラムはドリルダウン レベルに関する明確な情報を提供することになりました。
- ホバー ツールチップと十字線がデフォルトで表示されない問題
ダッシュボード ビュー モードでは、ユーザーが有効にするまで、ホバー ツールチップと十字線は表示されませんでした。現在、これらはデフォルトで有効になっています。

## 1.0.1422 (9 月 2020 年)

### 新機能
- _Amazon Athena コネクター (ベータ版)_
Amazon のサーバーレス インタラクティブな Athena クエリ サービスに接続できるようになりました。
- _新しいビルド済みテーマ_
4 つのビルド済みアプリ テーマを追加しました。いずれかを選択し、カスタマイズ可能な設定を使用して、表示形式およびダッシュボード エディターのルックアンドフィールをカスタマイズします。以下のテーマを選択できます:
	- MountainLightTheme
    - MountainDarkTheme
    - OceanLightTheme
    - OceanDarkTheme
- _Marketo プロバイダーを使用可能できるようになりました。_
Marketo マーケティング プラットフォームに接続し、データを Reveal で使用します。
- _Amazon Redshift を使用可能できるようになりました。_
Amazon Redshift クラウド データ ウェアハウスのデータを使用して、新しいインサイトを得ることができます。
- _新しい「サーバーでデータを処理」機能_
MS SQL、MySQL、Postgres データ ソースからのデータをサーバー側で集計することが可能です。

## 1.0.1374 (7 月 2020 年)

### 新機能
- _チャートの軸範囲を設定する新しい API。_
特定の表示形式のためにランタイムで軸範囲をプログラム的に変更できるようになりました。
- _Salesforce データ ソースの機能機能拡張_
Reveal で Salesforce レポートを使用できます。
- _新しい Quickbooks データ ソース_
Quickbooks アカウントに接続し、エンティティを使用して Reveal でデータ分析を実行します。
- _新しい Hubspot データ ソース_
Hubspot に接続できます。
- _Sharepoint リストとドキュメント ライブラリのサポート_
SharePoint ライブラリのすべてのファイルについて収集されたメタデータ (名前、タイプなど) を Reveal のデータ ソースとして使用できるようになりました。
- _新しい階級区分図_
階級区分図の表示形式により、美しい主題図を作成できます。地理空間データを驚くほどわかりやすく表示できます。色によって、マップ上のパターン、トレンド、および異常をすばやく発見できます。

## 1.0.1255 (5 月 2020 年)

### 新機能
- _新しい Azure Analysis Services データ ソース。_
この新しいデータ ソースにより、Azure Analysis Services のデータ モデルを使用してダッシュボードを作成できます。
- _Google スプレッドシート ファイルの新しいアイコン_
Google スプレッドシート ファイルのアイコンが変更されました。

## 1.0.1222 (5 月 2020 年)

### 新機能
- _新しいホバー イベント API_
この新しいイベントは、*revealView.TooltipShowing* と呼ばれ、エンドユーザーが表示形式でシリーズをホバーするか、シリーズをクリックするたびに発生されます。
- _新しい TreeMap の表示形式_
この新しい表示形式タイプを使用して、大きな階層をネストされた四角形の集合で表示できます。四角形のサイズは、さまざまなメトリック間の部分と全体の関係を示し、同様のデータ間のパターンと関係を識別します。
- _Excel へエクスポート機能機能拡張_
エクスポートする際に複数の表示形式タイプをスプレッドシートに追加できます。散布図、バブル チャート、スパークライン チャートが利用できるようになりました。
- _UI/UX の改善_
表示形式、ダッシュボード、新しいデータ ソース ダイアログなどのユーザーエクスペリエンスを向上するために、小さな変更が追加されました。
- _Google ドライブで共有ドライブのサポートを追加_
G Suite Business アカウントをお持ちの場合、共有ドライブ データにアクセスし、それを使用して Reveal で表示形式を構築できます。

## 1.0.1136 (4 月 2020 年)

### 新機能
- _新しいカスタム テーマ_
新しい RevealTheme クラスでカスタマイズ可能な設定の一部またはすべてを構成することにより、Reveal で独自のテーマを作成できるようになりました。

## 1.0.981 (2 月 2020 年)

### 新機能
- _RevealSettings の新しいプロパティ_
$.ig.RevealSettings に複数の新しいプロパティを追加して、ShowExportToPDF、ShowExportToPowerpoint、ShowExportToExcel、ShowStatisticalFunctions、ShowDataBlending、ShowMachineLearningModelsIntegration、StartWithNewVisualization、InitialThemeName などのさまざまな機能を制御しました。
- _アクセント色のサポート_
SetAccentColor メソッドが RevealView に追加されました。
- _Trigger プロパティが DataSourceRequested イベントに追加されました。_
_DataSourcesRequestedTriggerType_ 型の Trigger プロパティを DataSourcesRequested イベント引数に追加しました。このイベントのユーザーは、DataSourcesRequested の目的について詳細なコンテキストを取得できます。

## 1.0.825 (11 月 2019 年)

### 新機能
- _画像エクスポート機能が利用できるようになりました。_
サーバー側の画像エクスポート (プログラム上およびユーザー操作の両方により) が再び有効になりました。修正の詳細については、以下のトピックを参照してください: 
[サーバー側画像生成の有効化](https://help.revealbi.io/jp/developer/setup-configuration/setup-configuration-web.html#server-side-image-export).

## 1.0.80x (9 月 2019 年)

### 新機能
- _Reveal Desktop SDK のローカリゼーション サービス_
さまざまなダッシュボード要素のタイトルおよびラベルをローカライズすることができます。ローカライゼーション サービスでは、数値および非集計の日付フィールドの書式設定を変更することもできます。
- _Reveal Desktop SDK の書式設定サービス_
数値データ、集計および非集計の日付フィールドを好みに合わせて書式設定できます。デフォルトの書式設定を無視して、ダッシュボード データを書式設定します。
- セットアップと構成の変更 (Server SDK)。
Reveal Server SDK には、.NET Core 2.2 および .NET Framework 4.6.1+ ASP MVC アプリケーション プロジェクトがサポートされます。また、NuGet パッケージ マネージャーのみを使用すると、アセンブリを参照し、依存関係パッケージをインストールします。
             
## 1.0.70x (9 月 2019 年)

### 新機能
- _ステップバイステップ ガイド_ 
このガイドは、、Reveal の SDK の前提条件、セットアップや構成に必要なすべての手順について説明します。
- _ウィジェットのデータ ソースを変更する_ 
エンドユーザーがウィジェットのデータ ソースを変更する機能を有効または無効にできるようになりました。編集モードで [視覚化データ] 画面を開くと、Reveal は UI の [データ ソースの変更] ボタンを表示または非表示にします。
- _Reveal Desktop SDK の書式設定サービス_
エンドユーザーがダッシュボードのテーマを変更する機能を有効または無効にできるようになりました。ダッシュボードの編集モードに入る際に、使用可能なテーマを表示するためのボタンを表示または非表示にします。
