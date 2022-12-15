# リリース ノート


## 1.3.0 (11 月 2022 年)

### 新機能
- バックエンドからダッシュボードをエクスポートできるようににりました:
```csharp
var pdfStream = await dashboardExporter.ExportToPdf(dashboardId);
```
- 新しいデータ ソース: Google アナリティクス 4
- インタラクティブなダッシュボードのフィルタリング。チャートまたはピボット テーブルのデータ ポイントをクリックして、同じデータ ソースを使用してすべての表示形式をフィルター処理します。`revealView.interactiveFilteringEnabled = true` で有効にします。
- コールバックを含むメソッドには、promise メソッドの処理を可能にする追加の署名が含まれるようになりました。
```javascript
$.ig.RevealUtility.loadDashboard(dashboardId).then(dashboard => {
  revealView.dashboard = dashboard;
});
```
- `$.ig.revealSdkSettings` から `ensureFontsLoadedAsync` メソッドを使用してデフォルトのフォントを手動でロードする必要はなくなりました。
- 計算フィールドに新しい 'DateDiff' 関数を追加しました。

### バグ修正
- Postgres & Redshift でブール値をフィルタリングする際のエラー (「演算子が存在しません」) を修正しました。
- ロケールにハイフンが含まれている場合にローカリゼーションが機能しない問題を修正しました。
- REST データ ソースから新しい表示形式を作成するときに、`IRVDataSourceProvider.ChangeDataSourceItem` が呼び出されない問題を修正しました。
- v1.2.3 で誤って追加され、CORS で問題を引き起こしていた新しい http ヘッダー 'XRID' を削除しました。

## 1.2.3 (10 月 2022 年)

### 新機能
- 計算フィールドに新しい 'EndOfMonth' 関数を追加しました。

### バグ修正
- 表示形式のデータ ソースを変更するとエラー レポートが表示されない問題を修正しました。
- 合計の表示中にすべての行をフィルターする際のエラーを修正しました。

## 1.2.1 (9 月 2022 年)

### バグ修正
- Npgsql ライブラリ (Postgres ドライバー) をバージョン _6.0.6_ に更新しました。
**注**: アプリケーションで Npgsql も使用しているが古いバージョンを使用している場合は、6.0.6 以降に更新する必要があります。

## 1.2.0 (8 月 2022 年)

### 新機能
- **メイン Javascript ファイルのサイズを縮小しました。** メインの Javascript ファイルが最適化され、サイズが 30% 縮小されました。

- **カスタム メニュー項目のサポートを追加しました。** 以下のスニペットは、カスタムの「マイ メニュー項目」の作成を示しています。
```javascript
revealView.onMenuOpening = function(visualization, args) {
	if (args.isInEditMode && visualization == null) { //dashboard edit mode
		args.menuItems.push(new RevealApi.RVMenuItem(
			"My Menu Item",
			new RevealApi.RVImage("/images/save-24.png", "My Save"),
			function() {
				alert('my action');
			}
		));
	}
};
```

- **ダッシュボードのカスタムの空の状態の画像のサポートを追加しました。**
新規ダッシュボードの作成時に、表示されるプレースホルダー画像を変更する機能を追加しました。	
```javascript
revealView.assets.dashboardEmptyState = new RevealApi.RVImageAsset(
    new RevealApi.RVImage("/images/dashboard_empty.png", "Empty Dashboard State Image"), 
    "Add your First Visualization", 
    "Visualize all your data in perfect harmony");	
```

- **デフォルトの表示形式を変更する方法を追加しました。**
以下のスニペットでは、既定の表示形式をピボット グリッドに変更します。
```javascript
revealView.defaultChartType = RevealApi.RVChartType.PivotGrid;	
```

- **スキーマ属性を SQL Server データ ソースに追加しました。**
データ ソースのスキーマ プロパティにより、SDK ユーザーは表示されるリスト テーブル/ビュー/プロシージャを提供されたスキーマに制限できます。
```javascript
var msSqlAdventureDS = new RevealApi.RVSqlServerDataSource();
msSqlAdventureDS.host = "server.domain";
msSqlAdventureDS.host = "msSqlAdventureId";
msSqlAdventureDS.database = "AdventureWorks";
msSqlAdventureDS.port = 1433;
msSqlAdventureDS.title = "SQLServer Adventure DS";
msSqlAdventureDS.schema = "HumanResources";
```

- **チャート の表示形式の凡例で使用されるカテゴリ グループ区切り記号を変更する方法を追加しました。**
以下のスニペットでは、セパレーターをデフォルトのセパレーター (スラッシュ) からハイフンに変更しています。
```javascript
revealView.categoryGroupingSeparator = "-";
```

- **SQL Server データ ソースの TrustServerCertificate 設定のサポートを追加しました。**
この機能を RVSqlServerDataSource に実装するために、2 つの新しいブール プロパティを追加しました。
	- Encrypt
	- TrustServerCertificate

どちらも、接続文字列でまったく同じ名前のフラグを設定するために使用されます。		
```javascript
var msSqlAdventureDS = new RevealApi.RVSqlServerDataSource();
msSqlAdventureDS.host = "server.domain";
msSqlAdventureDS.id = "msSqlAdventureId";
msSqlAdventureDS.database = "AdventureWorks";
msSqlAdventureDS.port = 1433;
msSqlAdventureDS.title = "SQLServer Adventure DS";
msSqlAdventureDS.schema = "HumanResources";
msSqlAdventureDS.encrypt = true;
msSqlAdventureDS.trustServerCertificate = true;
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
-  _チャートの新しい初期ズーム レベル機能 (RevealSdkSettings.EnableNewCharts = true で有効にされた新しいチャートの場合のみ)。_
 初期ズーム レベルは、視覚化のための設定パネルでエンドユーザーが制御できます。
 
-  _revealView.onVisualizationSeriesColorAssigning イベントを介してプログラムでチャートの色を割り当てる方法が追加されました。_
次のコード スニペットは、すべての円チャートについて、高の場合は赤色、低の場合は緑色を返します:
```javascript
revealView.onVisualizationSeriesColorAssigning = function(visualization, defaultColor, fieldName, categoryName) {
    if (visualization.chartType == "PieChart") {
	if (categoryName == "High") {
	    return "#ff0000";
	} else if (categoryName == "Low") {
	    return "#00ff00";
	}
    }
    return defaultColor;
};
```

-  _エンドユーザーは、円とドーナツの視覚化の「その他」のスライスを制御できるようになりました。_
視覚化の [設定] パネルで、エンドユーザーはしきい値を選択するか (その値より下のすべてのスライスが単一の 「その他」 のスライスにマージされます)、機能を完全に無効にすることができます。


### バグ修正
- 初期構成後に、必要な単一選択を含むダッシュボード フィルターがどのように機能するかを修正しました。
以前は、フィルターを作成した後の初期状態では、選択されたすべての要素が表示されていましたが、必要な単一選択が有効になっている場合は有効な状態ではありません。
- 数値フィールドのブレッドクラム (ドリルダウンが使用されている場合に表示される) で使用される書式を修正しました。これまで、フィールドの書式は無視されていました。
- 「データなし」メッセージの代わりにデータがない場合に NaN を表示するテキスト視覚化の問題を修正しました。
- インストールの準備ができたときにインストーラーによって表示されるヘルプ ページへのリンクを修正しました。

## 1.1.5 (5 月 2022 年)

### 新機能

-  _RVDateFilter.range プロパティは、選択したフィルター タイプに基づいて日付範囲を返すようになりました。_
RVDateFilter.range は、以前フィルターがカスタム範囲に設定されている場合のみ有効な値を返していました。

### バグ修正
- IRVDataSourceProvider API を使用してフィルターのデータ ソースを置き換えたときにダッシュボード フィルターのカスケードが機能しない問題を修正しました。
- チャートの集計日付を日付フィルターにマッピングするダッシュボードの問題を修正しました。(一部のタイムゾーンで間違った日付範囲にマッピングしていました)。
- onVisualizationDataPointClicked が時系列表示形式で呼び出されない問題を修正しました。

## 1.1.4 (5 月 2022 年)

### 新機能

-  _Reveal UI で文字列をローカライズするときにブラウザーのロケールを上書きするオプションを追加しました。_

```javascript
await RevealApi.RevealSdkSettings.overrideLocale(RevealApi.SupportedLocales.En);
```

### バグ修正
- フィルター パラメーターとのダッシュボードのリンク。
場合によっては、ソース ダッシュボードのフィルター値がターゲット ダッシュボードの値と適切に比較されませんでした。
- 日付フィルター範囲の選択。
場合によっては、「今月」などの日付フィルターの事前定義された範囲が期待値 (ターゲット月の開始と終了など) で適切に機能していませんでした。

## 1.1.3 (3 月 2022 年)

### 新機能
-  _新しいデータ ソース: Google Search Console!_

-  _JSON データ ソース項目を構成するための新しいヘルパー クラス RevealApi.RVJsonSchemaConfigBuilder を追加しました。_

-  _表示形式のデータ読み込みをキャンセルする新しいイベントを追加しました: onVisualizationDataLoading。_

### バグ修正 
- 名前が変更されたフィールドとのダッシュボードのリンクの問題
フィールドの名前を変更してから、ダッシュボード リンクのフィルターとして使用した場合、リンクされたダッシュボードは正しくフィルター処理されませんでした。

## 1.1.2 (1 月 2022 年)

### 新機能
-  _.NET Server SDK は、いくつかの変更を加えて拡張されました:_
	- .NET サーバー ログ
	これで、Reveal SDK の .NET サーバー ログを有効にできます。「Reveal.Sdk。*」:「Trace」のような upsetting.json LogLevel で管理されます。
	- Playwright ベースのエクスポート。
	画像、PDF、PPT へのエクスポートは、Puppeteer ではなく Playwright に基づいています。 詳細については、デプロイ手順を調整する方法についてお読みください。
   詳細については、[展開を調整する方法](https://help.revealbi.io/jp/web/configuring-server-aspnet.html)をお読みください。
         
### バグ修正
- [SDK] LocalizationProvider と DataSourceProvider の問題
DataSourceProvider も設定されているいくつかのケースでは、LocalizationProvider の設定が機能していませんでした。
- [SDK] 列名に null 値を指定して Excel にエクスポートの問題
列名に null 値を含む Excel にエクスポートすると、アプリが InvalidCastException でクラッシュしていました。
- [SDK] カスタム ロゴ付きの PDF/PPT にエクスポートの問題
PDF または PPT 形式へのエクスポート、およびカスタム ブランド ロゴの組み込みは、期待どおりに機能しませんでした。
- ダッシュボード フィルタリングの問題
ダッシュボードのリンクとフィルタリングを備えた大規模なデータ ソースを使用すると、アプリはフィルタリングされたデータを期待どおりに表示しませんでした。
- ダッシュボードのリンクとドリルダウンされたデータの問題
ダッシュボード リンクが表示形式から情報を渡すとき、過去のドリルダウンされた値は含まれていませんでした。

## 1.1.1 (12 月 2021 年)

### 新機能
-  _Web のローカリゼーション サポート。_
[$.ig.RevealSdkSettings.localizedStringsProvider](https://help.revealbi.io/api/javascript/latest/classes/revealsdksettings.html#localizedstringsprovider) 拡張ポイントを使用すると、ダッシュボード タイトル、ウィジェット タイトル、フィールド ラベル、ダッシュボード フィルター タイトルなどのいくつかのダッシュボード要素をローカライズできます。
-  _Web の書式設定。_
[$.ig.RevealSdkSettings.fieldFormattingSettingsProvider](https://help.revealbi.io/api/javascript/latest/classes/revealsdksettings.html#fieldformattingsettingsprovider) 拡張ポイントを使用すると、任意の日時または数値フィールドのカスタム書式を定義できます。
-  _タイトルやケバブ メニューなど、ダッシュボード ヘッダーを非表示にするオプションが追加されました。_
[ShowHeader](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_ShowHeader) (WPF) & [showHeader](https://help.revealbi.io/api/javascript/latest/classes/revealview.html#showheader) (JS)。
-  _エンド ユーザーが  を最大化する機能を有効/無効にするオプションを追加しました。_
[CanMaximizeVisualizationProperty](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_CanMaximizeVisualizationProperty) (WPF) & [canMaximizeVisualization](https://help.revealbi.io//api/javascript/latest/classes/revealview.html#canmaximizevisualization) (JS)。
-  _ブラウザーで描画する前にフォントが読み込まれているかどうかを簡単に確認できるようになりました。_
これで、ライブラリをスキップし、[$.ig.RevealSdkSettings.ensureFontsLoadedAsync()](https://help.revealbi.io/api/javascript/latest/classes/revealsdksettings.html#ensurefontsloadedasync) を使用して、すべてのフォントが読み込まれていることを確認できます。このメソッドによって返される promise が完了したら、RevealView をインスタンス化して、必要なフォントが読み込まれていることを確認します。
- _視覚化エディターで特定の視覚化の背景色を変更するエンド ユーザー機能を有効/無効にするための新しいオプションがエディターに追加されました。_
[CanChangeVisualizationBackgroundColorProperty](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_CanChangeVisualizationBackgroundColorProperty) (WPF) & [canChangeVisualizationBackgroundColor](https://help.revealbi.io/api/javascript/latest/classes/revealview.html#canchangevisualizationbackgroundcolor) (JS)。
-  _プログラムで視覚化の背景色を変更する新しい方法。_
[SetVisualizationBackgroundColor](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_SetVisualizationBackgroundColor_Reveal_Sdk_RVVisualization_System_Windows_Media_Color_) (WPF) & [setVisualizationBackgroundColor](https://help.revealbi.io/api/javascript/latest/classes/revealview.html#setvisualizationbackgroundcolor) (JS)。

### バグ修正
- データセットに null の日付値がある場合の Excel へのエクスポートを修正しました。
- カスタム ブランド ロゴを使用して PDF または PPT にエクスポートする際の問題を修正しました。

## 1.1.0 (10 月 2021 年)

### 新機能
-  _.NET Server SDK は、いくつかの変更を加えて拡張されました:_
	- _Reveal サービスの登録はより柔軟になりました。_
	これで、Reveal インターフェースの実装に他のサービスを注入できます。Reveal プロバイダー インターフェイスの実装のタイプのみを登録します。
	- _RevealSDKContext が削除されました。_
	RVUserContext は、Reveal プロバイダー全体で第一級市民になりました。UserContextProvider を登録する必要があります。これにより、そのクラスがインスタンス化され、IRVDashboardProvider などの他の Reveal サービスのメソッドに渡されます。
	- _.NET Core 3.1 以降が必要になりました。_
	.NET Framework v4.6.2 以降で実行されている .NETCore および .NETCore 2.2 のサポートが終了したため、サポートが終了したことを明らかにします。
	- _デフォルト実装のセットアップが改善されました。_
	デフォルト実装のセットアップが大幅に改善されました - ダッシュボードが 「Dashboards」 フォルダーにあり、ローカル データ ファイル (csv または excel) がプロジェクト ルート レベルの 「Data」 フォルダーにある場合、Reveal のセットアップは非常に簡単になりました。例:
		- services:
			-.AddMvc()
            -.AddReveal();
詳しくは [Reveal .NET SDK Upgrade to v1.1](https://help.revealbi.io/jp/developer/release-information/upgrade-to-1.1.html) をご確認ください。
- _IRVDataSourceProvider インターフェイスが変更されました (デスクトップ および .NET サーバー SDK)_
IRVDataSourceProvider インターフェイスには単一の ChangeDataSourceItem があり、ダッシュボードがデータ ソース アイテムを使用する必要があるときはいつでも呼び出されます。
-  _視覚化エディターのダッシュボード リンク (JavaScript クライアント SDK) JavaScript SDK は、視覚化エディターでのダッシュボード リンクの作成をサポートするようになりました。_
この機能を試すには、ASP UpMedia サンプルの視覚化の 1 つを編集してから、設定に移動して、[リンク] から右にプラス記号をクリックします。

### バグ修正
-  _[SDK] onDateFilterChangedJavaScript イベントがトリガーされない問題_
Web クライアント SDK では、フィルターを変更または削除するときに onDateFilterChanged イベント (RVDashboard プロパティ) がトリガーされませんでした。
-  _[SDK] availableChartTypesJavaScript アクセサーが期待どおりに機能しない問題_
Web クライアント SDK では、RevealView をインスタンス化して、エンド ユーザーが選択できる利用可能なチャート (availableChartTypes) をすぐに設定することができませんでした。
-  _データ ブレンディング画面の検索フィールド_
結果に結合/追加するフィールドを検索する機能を追加することにより、データ ブレンディング UI が改善されました。

## 1.0.2013 (9 月 2021 年)

### バグ修正
- 計算フィールドを Excel にエクスポートすると、セルが空になる問題
ゼロ除算を行う計算フィールドを Excel にエクスポートすると、結果には空のセルが含まれていました。
- カスタム クエリとサーバー側の処理のデータ ブレンディングの問題
Web .NET で [サーバーでデータを処理] をオンにしてカスタム クエリを実行すると、データ ブレンディングが期待どおりに機能しませんでした。

## 1.0.2012 (9 月 2021 年)

### バグ修正
- [SDK] スパークライン チャートが 100％ を超えると小数点が非表示になる問題
Web SDK では、ダッシュボードの設定後に変更された場合、canSaveAs プロパティが優先されませんでした。
- [SDK] ウィンドウ サイズが小さいと、テキスト チャートが判読できなくなる問題
Web とデスクトップの両方で、ウィンドウのサイズが小さいと、テキスト チャート フォントが読み取れなくなります。
- [SDK] 日付形式のリストの取得に関する問題
Desktop SDK でフィールド エディターの日付形式のリストを取得するときに、集計された日付で RVBaseFormattingService を使用できるようになりました。

## 1.0.2008 (8 月 2021 年)

### バグ修正 
- ダッシュボードをストリームとして保存する際に問題が発生する問題
ダッシュボードをストリームとして保存するときに、特定のケースで _dashboard.Serialize.Async()_ が null を返していました。

## 1.0.2005 (6 月 2021 年)

### 新機能
-  _散布図が OpenStreetMap をサポートするようになりました!_
デスクトップ (WPF) および Web クライアント (JS) で OpenStreetMap 画像タイルを構成して使用できるようになりました。
-  _新しいサムネイル コンポーネント!_
RevealDashboardThumbnailView を使用してダッシュボードのサムネイルを描画できるようになりました。
-  _Web クライアントからサーバー側のデータ ソースへの資格情報_
新しいタイプの資格情報 _RVHeadersDataSourceCredentials_ を使用すると、認証ヘッダーとクッキーを REST および Web リソースのデータ ソースに送信できます。詳細については、GitHub で次の[サンプル](https://github.com/RevealBi/sdk-samples-aspnetcore/tree/main/Cookies-Auth)をご覧ください。
- _SDK AspNetCore  サービス挿入_
_RevealSdkContext_ および _RevealUserContext_ の実装をタイプのみ (インスタンスを渡さない) として登録できるようになり、これらのクラスがコンストラクターを介して挿入された他の AspNetCore サービスを取得できるようになりました。 詳細については、GitHub で次の[サンプル](https://github.com/RevealBi/sdk-samples-aspnetcore/tree/main/Reveal.Sdk.Samples.Web.UpMedia.Backend)をご覧ください。

### バグ修正
- 計算フィールド フィルターがサーバー上のデータ プロセスで機能しない問題
データのサーバー側集計を有効にすると、フィルターとして使用される計算フィールドが期待どおりにデータをフィルタリングしていなかった問題
- ダッシュボード フィルターに関する Google アナリティクスの問題
Google アナリティクス データ ソースからデータを取得するときに、ダッシュボード フィルターを作成できなかった問題

## 1.0.1866 (3 月 2021 年)

### 新機能
-  _Web および Desktop SDK の新しいプロパティ:_
	- showEditDataSource - データ ソース オーバーフロー メニューで通常使用できる [編集] ボタンを無効にするために使用できます。
	- _canAddDashboardFilter_ - このプロパティは、[フィルターの追加] メニューの [ダッシュボード フィルターの追加] オプションを非表示にすることができます。これらのオプションは、ダッシュボード編集モードで使用できます。
	- _canAddDateFilter_ - このプロパティは、[フィルターの追加] メニューの [日付フィルターの追加] オプションを非表示にすることができます。これらのオプションは、ダッシュボード編集モードで使用できます。

### バグ修正
- [SDK] RevealView.canSaveAs プロパティが期待どおりに機能しない問題
Web SDK では、ダッシュボードの設定後に変更された場合、canSaveAs プロパティが優先されませんでした。
- [SDK] HttpContextAccessor.HttpContext プロパティが正しく動作しない問題
Web SDK では、ダッシュボードを保存する際に (SaveDashboardAsync メソッドからアクセスした場合)、HttpContextAccessor.HttpContext が null になる。

## 1.0.1821 (3 月 2021 年)

### バグ修正
-  [SDK] SDK アプリが NRE 例外をスローすることがある問題
ユーザーが操作せずに SDK アプリケーションを 90 分以上開いた場合、操作を実行すると例外がスローされていました。

## 1.0.1772 (2 月 2021 年)

### バグ修正
- [SDK] packages.config で WPF NuGet パッケージのインストールが失敗する問題
ホスト プロジェクトが packages.config を使用した場合、WPF NuGet パッケージのインストールが失敗していました。

## 1.0.1763 (2 月 2021 年)

### バグ修正
- [SDK] HasPendingChanges プロパティが正しく動作しない問題
ダッシュボードを変更して保存した後、HasPendingChanges プロパティが false に設定されていませんでした。
- [SDK] カスタム フィルタリングが機能しない問題
Desktop SDK では、カスタム クエリが期待どおりにデータをフィルタリングしていませんでした。
- [SDK] SQL Server テーブルを非表示にすると、ビューも非表示になる問題
RVDataSourceItemsFilter を使用してすべてのテーブルを非表示にし、ビューのみを表示すると、[ビュー] タブも非表示になりました。
- [SDK] AzureSQL データ プロバイダーがエラーをスローする問題
AzureSQL 接続を追加すると、エラー メッセージが表示されました。
- [SDK] LocalizationProvider が設定されている場合、日付フィルターは表示されない問題
LocalizationProvider が設定されている場合、表示形式エディターに日付フィルター開始 / 終了が表示されませんでした。
- 日本語にローカライズされていない単語の問題
「その他」という言葉は日本語にローカライズされていませんでした。

## 1.0.1712 (1 月 2021 年)

### バグ修正
- [SDK] サーバー コンポーネントは Newtonsoft.Json シリアライザー に依存しています。
Reveal サーバー コンポーネントは、mvc アプリケーションのデフォルトの JSON シリアル化設定に依存していました。これで、ホスティング アプリは必要に応じて JSON シリアル化設定を構成できます。
- [SDK] SQL Server フィルタリングが NVARCHAR 列で機能しない問題
フィルタリングされた値にマルチバイト文字が含まれている場合、Microsoft SQL Server のフィルタリングが NVARCHAR 列に対して機能しませんでした。

## 1.0.1669 (12 月 2020 年)

### バグ修正
- [SDK]  [サーバーでデータを処理] でピボット階層フィルタリングが機能しない問題
[サーバーでデータを処理] オプションがオンになっている場合、ピボット エディターでのドリルダウン階層はデータをフィルタリングしていなかった問題
- [SDK] [サーバーでデータを処理] でカスタム フィルタリングが機能しない問題
[サーバーでデータを処理] オプションがオンになっている場合、カスタム クエリは正しい行数を返しなかった問題

## 1.0.1629 (12 月 2020 年)

### 新機能
-  _JSON ファイルを使用してダッシュボードを保存/ロード_
Reveal SDK を使用して、JSON ファイルからダッシュボードを保存/ロードできるようになりました。

### バグ修正
- カテゴリ フィールド ラベルが表示されない問題
カテゴリ チャートでは、ツールチップにフィールド ラベルではなく、カテゴリの元のフィールド名が表示されていました。
-  ドリルダウン ブレッドクラムの日付が誤って表示される問題
日付フィールドをドリルダウンすると、ブレッドクラムに値が正しく表示されませんでした。これで、ブレッドクラムはドリルダウン レベルに関する明確な情報を提供することになりました。
-  ホバー ツールチップと十字線がデフォルトで表示されない問題
ユーザーが有効にするまで、ホバー ツールチップと十字線は表示されませんでした。現在、これらはデフォルトで有効になっています。

## 1.0.1422 (9 月 2020 年)

### 新機能
-  _NEW Pre-built Themes._
4 つのビルド済みアプリ テーマを追加しました。 いずれかを選択し、カスタマイズ可能な設定を使用して、表示形式およびダッシュボード エディターのルックアンドフィールをカスタマイズします。次のテーマから選択できます: 
	- MountainLightTheme (デスクトップ) / $.ig.MountainLightTheme (Web);
	- MountainDarkTheme (デスクトップ) / $.ig.MountainDarkTheme (Web);
	- OceanLightTheme (デスクトップ) / $.ig.OceanLightTheme (Web);
	- OceanDarkTheme (デスクトップ) / $.ig.OceanDarkTheme (Web)。
- _Marketo プロバイダーを利用できるようになりました。_
Marketo マーケティング プラットフォームに接続し、データを Reveal で使用します。
- _Amazon Redshift を利用できるようになりました。_
Amazon Redshift クラウド データ ウェアハウスのデータを使用して、新しいインサイトを得ることができます。
- _新しい「サーバーでデータを処理」機能_
MS SQL、MySQL、Postgres データ ソースからのデータをサーバー側で集計することが可能です。

## 1.0.1374 (7 月 2020 年)

### 新機能
-  _チャートの軸範囲を設定する新しい API_
特定の表示形式のためにランタイムで軸範囲をプログラム的に変更できるようになりました。
-  _Salesforce データ ソースの機能強化_
Reveal で Salesforce レポートを使用できます。
-  _新しい Quickbooks データ ソース_
Quickbooks アカウントに接続し、エンティティを使用して Reveal でデータ分析を実行します。
-  _新しい Hubspot データ ソース_
Hubspot に接続できます。
-  _Sharepoint リストとドキュメント ライブラリのサポート_
SharePoint ライブラリのすべてのファイルについて収集されたメタデータ (名前、タイプなど) を Reveal のデータ ソースとして使用できるようになりました。
-  _新しい階級区分図_
階級区分図の表示形式により、美しい主題図を作成できます。地理空間データを驚くほどわかりやすく表示できます。色によって、マップ上のパターン、トレンド、および異常をすばやく発見できます。

## 1.0.1255 (5 月 2020 年)

### 新機能
-  _新しい Azure Analysis Services データ ソース_
この新しいデータ ソースにより、Azure Analysis Services のデータ モデルを使用してダッシュボードを作成できます。
- _Google スプレッドシート ファイルの新しいアイコン_
Google スプレッドシート ファイルのアイコンが変更されました。

## 1.0.1222 (5 月 2020 年)

### 新機能
-  _新しいホバー イベント API_
この新しいイベントは、WPF では *revealView.TooltipShowing*、Web では .onTooltipShowing と呼ばれ、エンドユーザーが表示形式でシリーズをホバーするか、シリーズをクリックするたびに発生されます。
-  _新しい TreeMap の表示形式_
この新しい表示形式タイプを使用して、大きな階層をネストされた四角形の集合で表示できます。四角形のサイズは、さまざまなメトリック間の部分と全体の関係を示し、同様のデータ間のパターンと関係を識別します。
-  _Excel エクスポートの機能拡張_
エクスポートする際に複数の表示形式タイプをスプレッドシートに追加できます。散布図、バブル チャート、スパークライン チャートが利用できるようになりました。
-  _UI/UX の改善_
表示形式、ダッシュボード、新しいデータ ソース ダイアログなどのユーザーエクスペリエンスを向上するために、小さな変更が追加されました。
-  _Google ドライブで共有ドライブのサポートを追加_
G Suite Business アカウントをお持ちの場合、共有ドライブ データにアクセスし、それを使用して Reveal で表示形式を構築できます。

## 1.0.1136 (4 月 2020 年)

### 新機能
-  _新しいカスタム テーマ_
新しい RevealTheme（デスクトップ） / $.ig.RevealTheme (Web) クラスでカスタマイズ可能な設定の一部またはすべてを構成することにより、Reveal で独自のテーマを作成できるようになりました。

## 1.0.981 (2 月 2020 年)

### 新機能
-  _RevealSettings の新しいプロパティ_
$.ig.RevealSettings に複数の新しいプロパティを追加して、ShowExportToPDF、ShowExportToPowerpoint、ShowExportToExcel、ShowStatisticalFunctions、ShowDataBlending、ShowMachineLearningModelsIntegration、StartWithNewVisualization、InitialThemeName などのさまざまな機能を制御しました。
-  _アクセント色のサポート_
SetAccentColor メソッドが $.ig.RevealView に追加されました。
- _Trigger プロパティが DataSourceRequested イベントに追加されました。_
DataSourcesRequestedTriggerType_ 型の Trigger プロパティを DataSourcesRequested イベント引数に追加しました。このイベントのユーザーは、DataSourcesRequested の目的について詳細なコンテキストを取得できます。

## 1.0.825 (11 月 2019 年)

### 新機能
-  _画像エクスポート機能が利用できるようになりました。_
サーバー側の画像エクスポート (プログラム上およびユーザー操作の両方により) が再び有効になりました。修正の詳細については、以下のトピックを参照してください。
[サーバー側画像生成の有効化](https://help.revealbi.io/jp/developer/web-sdk/setup-configuration.html#4-set-up-server-side-screenshot-generation)

## 1.0.80x (9 月 2019 年)

### 新機能
-  _Reveal Desktop SDK のローカリゼーション サービス_
さまざまなダッシュボード要素のタイトルおよびラベルをローカライズすることができます。ローカライゼーション サービスでは、数値および非集計の日付フィールドの書式設定を変更することもできます。
- _Reveal Desktop SDK の書式設定サービス_
数値データ、集計および非集計の日付フィールドを好みに合わせて書式設定できます。デフォルトの書式設定を無視して、ダッシュボード データを書式設定します。

## 1.0.70x (9 月 2019 年)

### 新機能
-  _ステップ バイ ステップ ガイド_
このガイドは、Reveal の SDK の前提条件、セットアップや構成に必要なすべての手順について説明します。
-  _ウィジェットのデータ ソースを変更_
エンドユーザーがウィジェットのデータ ソースを変更する機能を有効または無効にできるようになりました。編集モードで [視覚化データ] 画面を開くと、Reveal は UI の [データ ソースの変更] ボタンを表示または非表示にします。
-  _Reveal Desktop SDK の書式設定サービス_
エンドユーザーがダッシュボードのテーマを変更する機能を有効または無効にできるようになりました。ダッシュボードの編集モードに入る際に、使用可能なテーマを表示するためのボタンを表示または非表示にします。
