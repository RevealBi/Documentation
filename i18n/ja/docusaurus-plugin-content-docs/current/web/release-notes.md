import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# リリース ノート

## 1.7.6 (2025 年 7 月 22 日)

重大なバグを修正した緊急パッチ リリース。

### バグ修正
- データが存在しない状態で「並べ替え条件」ラベルでフィールドを選択すると、「Index was outside the bounds of the array. (インデックスが配列の範囲外です。)」というエラーが発生する問題を修正しました。
- `ERROR TypeError: $.ig.SdkDashboardDocument.fromJson is not a function` というエラーにより サムネイルが正しく表示されない不具合を修正しました。

## 1.7.5 (2025 年 7 月 8 日)

### 新機能

#### すべてのプラットフォーム

- Databricks は現在、個人アクセス トークン、OAuth トークン パススルー、OAuth クライアント資格情報、Microsoft Entra ID クライアント資格情報などの認証タイプをサポートするようになりました。
- Reveal はネイティブ JS プロトタイプ (Array など) を拡張しなくなりました。
- 日付フィルターがダッシュボードの `filters` コレクションに含まれるようになりました。
- `weekLevelEnabled` を `true` に設定することにより、`onFieldsInitializing` を通じてフィールドにオプトインの週の日付集計が追加されました。

```js
revealView.onFieldsInitializing = function (args) {
    args.fields.forEach(f => {
    if (f.type == $.ig.RVDashboardDataType.Date || f.type == $.ig.RVDashboardDataType.DateTime) {
        f.weekLevelEnabled = true;
    }});
};
```
- 編集モードに入ると、強調表示フィルターが削除されるようになりました。
- 依存関係 ANTLR が v4.13.1 に更新されました。
- Redshift コネクターは、同じ AWS クラスターに含まれるデータベースのクロス データベース ブレンディングをサポートするようになりました。
- 既存の日付ダッシュボード フィルターのルールと範囲のプロパティを API 経由で設定できるようになりました。

```js
revealView.dashboard.filters[0].rule = new $.ig.RVDateRule($.ig.RVPeriodRelation.Last, 2, $.ig.RVPeriodType.Day);
//-or-
revealView.dashboard.filters[0].range = new $.ig.RVDateRange(new Date(2023, 0, 1), new Date(2023, 11, 31));
```

- 複数の日付ダッシュボード フィルターのサポートがベータ機能として追加されました。
- `RVDashboard.dateFilter` は非推奨です。互換性のため当面は残されていますが、存在する場合は最初の `DateDashboardFilter` を参照します。

#### Java

- 依存関係 ANTLR が v4.13.2 に更新されました。
- 依存関係 okhttp が v4.12.0 に更新されました。

#### Node

- ヘッドレス Excel エクスポートでフィルターと日付フィルターがサポートされるようになりました。
- Puppeteer が Chrome を別の場所に展開するようになったため、nodemon を使用している場合は該当ディレクトリを除外するよう設定を更新してください。

```json
"nodemonConfig": {
  "ignore": ["chrome-headless*/*"]
}
```

### バグ修正

#### すべてのプラットフォーム

- ヘッドレス エクスポート時に JS ファイルが不足していることによるコンソール エラー。
- 複製されたテキスト ボックスで説明文が消えます。
- ダッシュボードにテキスト ボックスの表示形式が含まれていると、ヘッドレス エクスポートが失敗します。
- ドリルダウンを解除すると強調表示が失われる問題 (フィルターは維持されている)。
- 強調表示のフィルター設定により、他のチャートに 1 日余分に表示される問題。
- 強調表示がエクスポート時に正しく表示されない問題。
- 表示形式エディターに強調表示フィルターが表示される問題。
- 「次の」期間関係を持つ DateRules では、2日以上の場合に正しい日数を表示しない問題。
- 棒と柱状チャートの表示形式では、最初の読み込み時にプロット領域が適切に使用されない問題。
- 日時フィルターのメニューに AllTime をカスタム項目として追加すると、メニュー項目が重複して表示される問題。
- 散布図の表示形式を使用すると、マップの中心が移動する問題。
- 複数のグリッドの表示形式を含む Excel エクスポート時にダイアログが重複表示される問題。
- 階級区分図では、「アメリカ合衆国の州」マップを使用する時、州の扱いが正しくない問題。
- ピボット表示形式にてツールチップ フィルターを適用後に null 参照例外が発生する問題。
- グリッド表示形式で表示形式タイプを変更すると、表示形式が消えコンソール エラーが発生する問題。
- カテゴリー フィールドでのダッシュボード リンク パラメーターが機能しない問題。
- 範囲が設定されていない CustomRange フィルターを含むダッシュボードを開くと null 参照エラーが発生する問題。
- 階層が定義されていない単一の日付フィールドでもドリルダウンが可能になる問題。
- ドリルアップ/ドリルダウン時に日付形式が失われる問題。
- ツールチップのフィールド項目がフィールド ラベルを使用しない問題。
- フィルター ラベルに含まれる日本語がヘッドレス エクスポートによる PDF ファイルで文字化けする問題。
- 新規作成した円チャートが PDF に正しくエクスポートされない問題。
- グリッド ページングではデータが 2 回読み込まれる問題。
- 長い凡例が正しく表示されない問題。
- 「現在までの …」フィルターを使用してピボットを展開すると、間違ったデータが表示される問題。
- 日付範囲フィルター「過去 12 か月」には現在の月のデータが含まれる問題。
- モバイル表示でフィルターの不透明度が通常サイズよりも濃く表示される問題。
- 他のピボット行が存在する場合、展開機能が正常に動作しない問題。
- 項目が重複している場合、アドホック ピボット展開機能が正しく動作しない問題。
- 空の要素でドリルダウンを実行するとクラッシュが発生する問題。
- 展開済みのピボット行に対するドリルダウンが正しく動作しない問題。
- API を使用して日付グローバル フィルターの範囲を設定しても、UI が更新されない問題。
- 日付フィルターを変更した後、視覚化を更新するには更新が必要です。
- Excel データ ソースで日付列が数値として検出される問題。
- 生データ画像のエクスポート時にクラッシュが発生する問題。
- API を使用して作成直後の日付グローバル フィルターを変更しても UI が更新されない問題。

## 1.7.4 (2025 年 5 月 6 日)

### 新機能

#### すべてのプラットフォーム

- 新しいデータ ソース: Databricks。
- フィールド エディターが改善され、オプション カテゴリごとのタブが追加されました。
- ベータ機能 API が追加されました。

```js
// Enable beta feature
$.ig.RevealSdkSettings.betaFeatures.enable("newDonutChart", "newPieChart");

// Disable beta feature
$.ig.RevealSdkSettings.betaFeatures.disable("newDonutChart", "newPieChart");
```

- チャート ツールバーが正式リリースされました。RevealView の `showToolbar` プロパティを通じて有効または無効にできます。このプロパティのデフォルト値は `false` です。
- インタラクティブなフィルタリングが正式リリースされました。この機能を有効にするには、RevealView で `interactiveFilteringEnabled` を `true` に設定します。ツールチップの 「Filter By」 をクリックすると、この機能によって他のチャートのデータが強調表示されます。
- 表示されるパーセンテージの小数桁を構成するための新しいプロパティがスライス チャートの表示形式エディターに追加されました。
- `database` プロパティを含むデータ ソースでは、そこから派生したデータ ソース項目には、デフォルトで `database` プロパティが設定されなくなりました。これにより、RVDataSourceItem の `database` プロパティを設定することが必須ではなくなりますが、セキュリティ上の理由から、null に設定する場合でも明示的に設定することを強くお勧めします。
- RVAmazonWebServicesCredentials にオプションの `sessionToken` パラメーターのサポートが追加されました。

#### Node

- `dashboardProvider` と `dashboardStorageProvider` は、ストリームに `Readable` 型定義のストリームを使用するようになりました。これにより、ファイルよりも多くの場所をサポートできるようになります。

### バグ修正

#### すべてのプラットフォーム

- 単一の表示形式モードを使用すると、UI 要素の位置がずれて表示されます。
- エディターで可視化フィルターを変更しても反映されません。
- いくつかの数値変換によりクラッシュが発生します。
- ヘッドレス エクスポートでは、`PREVIOUS_YEAR` フィルターの設定は機能しません。
- ダッシュボードにエラーのある表示形式がある場合、Excel エクスポートは失敗します。
- 年と四半期の階層のダッシュボード リンクで計算された日付範囲が間違っています。
- 展開またはドリルダウンし、会計年度の日付フィールドにフィルターを適用すると、誤ったデータが表示されます。
- 前の数値が負の場合、KPI vs Time の % の増加の符号が正しくありません。
- ヘッドレス エクスポートでは、PDF をターゲットにする場合、各表示形式のグローバル フィルターと表示形式フィルターが欠落します。
- 一部の表示形式では SSAS のパフォーマンスが低下します。
- `NotEquals` および `NotContains` フィルターは SSAS では機能しません。
- ヘッドレス エクスポートでは日付フィルターが「 Unnamed 」として表示されます。
- インターフェイス `IRVDateFilterMenuItem` は、「infragistics.reveal.d.ts」 ファイルの RevealApi 名前空間の一部ではありません。
- PowerPoint エクスポートではトークンと Luis の名前が表示されています。
- Google Analytics や同様のデータ ソースを使用した日付の強調表示が機能しません。
- ツールチップに合計を表示するフラグは無視されます。
- 必要なプロパティが設定されていない場合、Google Analytics のデータ ソース選択がクラッシュします。
- 棒チャート またはスライス チャートの表示形式で、計算フィールドの値に Infinity が含まれると 「value.toFixed is not a function (value.toFixed は関数ではありません)」 というエラーが発生します。
- 表示形式の説明がタイトルと重複しています。
- 数値 0 のセルを含む Excel エクスポートは空として表示されます。

#### Java

- マップビ表示形式を使用して表示形式をエクスポートするときに、黄色の 「configure」 バナーが表示されます。

## 1.7.3 (2025 年 3 月 4 日)

### 新機能

#### すべてのプラットフォーム

- 軸タイトルは現在一般提供されており、エディターの表示形式フィールドをクリックして専用のテキスト ボックスからカスタマイズできます。
- 固定線が一般利用可能になりました。
- 数値軸を含むチャートの表示形式が強化され、ラベルの重複の可能性が減りました。
- チャートの凡例を表示形式の上部または下部に配置できるようになり、さらに左、右、または中央にカスタマイズできるようになりました。これらのオプションは、表示形式エディターの [設定] タブにあります。
- グリッド ページングでは、列ヘッダーにある並べ替えアイコンを使用した並べ替えがサポートされるようになりました。
- 列の表示形式ではラベルが列の上に表示されるようになり、棒の表示形式ではラベルが棒の右側に表示されるようになります。
- 表示形式におけるラベルの非表示と表示がさらに強化されました。
- `revealView.onDateFilterMenuOpening` の `args.items` プロパティは、`IRVDateFilterMenuItem` オブジェクトの配列を使用するようになりました。

```js
revealView.onDateFilterMenuOpening = function(args)
{
    var list = args.items; //List of IRVDateFilterMenuItem objects
    var pos, newItem;

    //Add "Last 2 months" to the months section
    pos = list.findIndex(obj => obj.title === "Month to date"); //Last item in the months section
    var lastTwoMonthsRule = new $.ig.RVDateRule($.ig.RVPeriodRelation.Last, 2, $.ig.RVPeriodType.Month);
    newItem = new $.ig.RVDateFilterMenuOption(lastTwoMonthsRule);
    list.splice(pos + 1, 0, newItem);

    //Remove the "Today" option
    pos = list.findIndex(obj => obj.title === "Today");
    list.splice(pos, 1);

    //Add "First week of 2024" to a new section at the end of the menu
    list.push(new $.ig.RVDateFilterMenuSeparator()); //Add section separator
    var firstWeek24Range = new $.ig.RVDateRange(new Date("2024-01-01"), new Date("2024-01-31"));
    newItem = new $.ig.RVDateFilterMenuOption(firstWeek24Range, "First week of 2024")
    list.push(newItem);
};
```

#### Node

- 依存関係 `puppeteer-core` が `14.1.2` から `24.1.1` に更新されました。

### バグ修正

#### すべてのプラットフォーム

- `RevealView` の `serialize` プロパティは、実際にはバイト配列を返す問題。
- ヘッダー、タイトル、フィルターを非表示にした場合、単一の表示形式モードでチャートの上部に空白スペースが表示される問題。
- `RVIntegratedAuthenticationCredential` を使用するとエラーが発生する問題。
- `showHeaders` が `false` に設定されている場合、最大化後に表示形式フィルターが非表示になる問題。
- Analysis Services は、一部のロケール/カルチャでは間違った値を返す問題。
- ダッシュボード フィルターの 「値の選択」 を選択するとクラッシュする問題。
- パーセンテージと列を使用した条件付き書式が機能しない問題。
- `ChangeDataSourceItemAsync` のデータ ソース ID が正しくない問題。
- ヘッドレス エクスポートで作成された PDF ファイルで日本語が文字化けする問題。
- エクスポートされた PDF ファイルでは日本語の日付形式が正しくない問題。
- ヘッドレス エクスポートで作成された PDF ファイルのダッシュボードタイトルに、不要な番号 「(1)」 が表示される問題。
- ダッシュボード/表示形式フィルターの日付形式が日本語では正しくない問題。
- ダッシュボード フィルターは、接続されていない場合でも、最大化されるとすべての表示形式に表示される問題。
- 表示形式を最大化するとフィルターは消える問題。
- 積層型棒チャートではカテゴリ ラベルが逆の順序で表示される問題。
- API 経由でダッシュボードの日付フィルターに `DateRule` を設定するときにエラーが発生する問題。
- XMLA 表示形式のメニューから表示形式フィルターに `DateRule` を設定するときにエラーが発生する問題。
- 複合の表示形式を作成または読み込むときにクラッシュします。
- グリッドからダッシュボードの日付フィルターへのダッシュボードのリンクが機能しない問題。
- エクスポート関連のエンドポイントのコンテンツ タイプ応答ヘッダーがない問題。
- インタラクティブ エクスポートの例外がユーザーに通知されない問題。
- データ切り捨てインジケーターの配置が間違っている問題。
- ダッシュボード フィルターを使用した Analysis Services では、Excel へのエクスポートが失敗する問題。
- (ベータ版) ツールバーのアイコンの位置がずれている問題。
- (ベータ版) ツールバーのボタンでは、アクションを実行するためにダブルクリックする必要がある問題。

#### Java

- 午後の時間帯に REST データ ソースから日付フィールドをクエリすると、時間コンポーネントには正午が表示される問題。

## 1.7.2 (2025 年 1 月 20 日)

### 新機能

#### すべてのプラットフォーム

- (ベータ版) `onMenuOpening` を使用してツールバーのカスタム メニュー項目のサポートが追加されました。
- (ベータ版) 同じ表示形式内でフィルタリングされたデータを比較できます。インタラクティブ フィルタリングが強化され、XMLA データ ソースがサポートされるようになりました。複数の表示形式がある場合に、「フィルター条件」オプションが表示されるようになりました。さらに、階級区分図では選択した国が強調表示されます。フィルターが追加されると、変更を防ぐために読み取り専用になります。日付によるフィルタリングも可能になりましたが、選択できる日付値は 1 つに制限されています。
- (ベータ版) 表示形式エディターの設定ペインで、軸タイトルを「なし」、「X 軸」、「Y 軸」、または「両方」のオプションで制御できるようになりました。この機能を有効にするには、`$.ig.RevealSdkSettings.enableBetaFeatures` を `true` に設定します。
- PostgreSQL データ プロバイダーは、マテリアライズド ビューをサポートするようになりました。
- BigQuery データ プロバイダーはデータ ブレンディングをサポートするようになりました。
- ドーナツ型チャートの表示形式では、ラベルなし、ラベルのみ、値のみ、ラベルと値の両方、といった中央ラベル モードがサポートされるようになりました。
- Snowflake データ ソースの依存関係 Snowflake.Data が v2.0.18 に更新されました。
- 日付フィルター プリセット ドロップダウンでは、使用可能な日付フィルターの編集、および `onDateFilterMenuOpening` イベントによる独自のフィルターの追加がサポートされるようになりました。半期ベースの日付ルールのサポートも追加されました。

```js
revealView.onDateFilterMenuOpening = customizeDateFilterMenu;
//revealView.ShowDateFilterDropdown = false; //Hides the button that shows the dropdown altogether

function customizeDateFilterMenu(args)
{
  //if(![my_access_check]) { //Perform access check to the filter menu
  //  args.Cancel = true; //Cancel opening of filter items list
  //  return;
  //}

    var list = args.Items; //List of RVDateFilterMenuItem objects
    var pos;

    //Add "Last 2 months" to the "months" section
    pos = list.getItemIndex("Month to date"); //Obtain the beginning of the "years" section
    var lastTwoMonthsRule = new $.ig.RVDateRule($.ig.RVPeriodRelation.Last, 2, $.ig.RVPeriodType.Month);
    list.insert(pos + 1, lastTwoMonthsRule); //Insert using helper

    //Add "Last 2 weeks" to a new section after the "days" section
    pos = list.getItemIndex("Last 7 days");
    list.insertSeparator(pos + 3);
    var lastTwoWeeksOpt = new $.ig.RVDateFilterMenuOption(new $.ig.RVDateRule($.ig.RVPeriodRelation.Last, 2, $.ig.RVPeriodType.Week));  //Instantiate RVDateFilterMenuOption directly
    list.insert(pos + 4, lastTwoWeeksOpt);

    //Remove "Today" option
    var todayItem = list.getByTitle("Today");
    list.remove(todayItem);

    //Add "First week of 2024" to a new section at the end of the menu
    list.addSeparator();
    var firstWeekOf2024Range = new $.ig.RVDateRange(new Date("2024-01-01"), new Date("2024-01-07")); //Customized description
    list.add(firstWeekOf2024Range, "First week of 2024");
}

//The new rules also integrate with the existing filters API
revealView.dashboard.dateFilter = new $.ig.RVDateDashboardFilter(new $.ig.RVDateRule($.ig.RVPeriodRelation.Last, 3, $.ig.RVPeriodType.Day));
```

- ダッシュボード フィルターは表示形式に自動的に接続を試行するようになりました。接続できない場合は、以前と同じように手動接続を使用できます。
- ダッシュボード ヘッダーとは独立してダッシュボード タイトルの表示・非表示を切り替える `showTitle` プロパティが `RevealView` に追加されました。デフォルト値は `true` です。
- `RevealView` に `ShowSave` プロパティが追加されました。このプロパティは、保存ボタンが表示されるかどうかを決定します。デフォルト値は `true` です。
- 軸グリッド線は、表示形式エディターの設定ペインで、なし、水平、垂直、または両方のオプションを使用して制御できるようになりました。
- `RevealView` に、最大化時に表示形式フィルターの表示を切り替える `showVisualizationFilters` プロパティが追加されました。デフォルト値は `true` です。

#### ASP.NET & Node

- Microsoft の SQLite 実装に対応し、Web 上でのオプションとして暗号化のサポートが追加されました。暗号化を有効にするには、安全且つ空でないパスワードを使用して `RevealEmbedSettings.EnableEncryption("yourpassword")` を呼び出す必要があります。デフォルトでは、暗号化なしのレガシー SQLite 実装が引き続き有効になっています (`RevealEmbedSettings.IsLegacyCacheEnabled = true`)。このフラグを `false` に設定することで、暗号化なしの Microsoft 実装に切り替えることができます。注: `EnableEncryption` は、レガシー実装を自動的に無効にします。この変更は、元の SQLite ライブラリを廃止するための移行の開始を示しています。この期間中のフィードバックを歓迎します。

ASP.NET:
```csharp
builder.Services.AddControllers().AddReveal(revealSetupBuilder =>
{
    revealSetupBuilder.AddSettings(
    settings => 
    {
        settings.IsLegacyCacheEnabled = true;  
        //settings.EnableEncryption("optional-password"); //this method isn't called by default
    });
});
```

Node:
```js
const revealOptions = {
    //...
    isLegacyCacheEnabled: true,
    //enableCacheEncryption: true,
    //cacheEncryptionPassword: "optional-password",
}
app.use('/', reveal(revealOptions));
```

### バグ修正

#### すべてのプラットフォーム

- スライスベース (円チャート、ドーナツ型チャート、ファンネル チャート) および散布マップの表示形式では、`onVisualizationDataPointClicked` が呼び出されませんでした。
- `TODAY`/`NOW` 計算フィールド関数を使用すると、データが間違っている可能性があります。
- 最大軸値の設定時にエラーが発生します。
- 他のウィジェットが異なる XMLA データ ソースからのものである場合、XMLA データ ソースからのウィジェットを強調表示する際にエラーが発生します。
- XMLA データ ソースからのフィルターにより、他のデータ ソースを使用するウィジェットへの自動接続が可能になり、表示形式が壊れます。
- XMLA グローバル フィルターが機能しません。
- 一部の読み込みシナリオでは、ダッシュボードの識別子が null に設定されていました。
- Google アナリティクス 4 のフィルターとグローバル フィルター値の読み込みエラーが発生します。
- 最後の固定チャート線フィールドが削除できません。
- 総計を含む表示形式で SSAS 'FillTotalsInRow' エラーが発生します。
- SSAS では、一部のチャート タイプを使用しているときにデータが表示されません。
- フィルターを追加するときに「Uncaught TypeError: String.isNullOrEmpty は関数ではありません」というエラーが発生します。
- 十分なスペースがない場合、ラベルが非表示にならないことがあります。
- 生データを表示した後に別のチャート タイプに切り替えると例外が発生します。

## 1.7.1 (2024 年 11 月 5 日)

### 重大な変更

#### すべてのプラットフォーム

- `ChartInteractionEventArgs` は `TooltipShowingEventArgs` に名前が変更されました。

### 新機能

#### すべてのプラットフォーム

- チャートの表示形式では、値 0 のデータ ラベルは自動的に非表示になります。
- カスタム メニュー項目は、`onTooltipShowing` 関数に渡される引数の `customItems` プロパティに `RVTooltipItem` を追加することで、表示形式ツールチップに追加できるようになりました。

```js
revealView.onTooltipShowing = function (args) {
    //A string pointing to the image may be used or an RVImage, such as:
    //var caseIcon = new $.ig.RVImage("https://svgsilh.com/png-512/306879.png", "Case Icon"); 
    var caseIcon = "https://svgsilh.com/png-512/306879.png";
    var openIcon = "https://svgsilh.com/png-512/41335.png";

    if (args.cell.formattedValue == "Digital Security Center")
    {
        args.customItems.push(new $.ig.RVTooltipItem("Critical", "Escalate Incident", caseIcon, (sender, clickArgs) => { console.log("Clicked"); }));
        args.customItems.push(new $.ig.RVTooltipItem("Critical", "Open Incident Report", openIcon, (sender, clickArgs) => { console.log("Clicked"); }));

        args.customItems.push(new $.ig.RVTooltipItem("High", "Send Reminder", null, (sender, clickArgs) => { console.log("Clicked"); }));
        args.customItems.push(new $.ig.RVTooltipItem("High", "Assign Lead Investigator", null, (sender, clickArgs) => { console.log("Clicked"); }));
    }
}
```

- ホバー時にアクションを表示するツールチップの配置が改善されました。
- URL リンクは、`onDashboardSelectorRequested` を実装する必要なく、すぐに使用できるようになりました。
- URL のリンク ダイアログにターゲット設定が追加されました。ターゲットは、引数パラメーターの `target` プロパティを使用して `onUrlLinkRequested` を通じて指定できます。

```js
revealView.onUrlLinkRequested = (args) => {
        args.target = "_blank";
        return "https://www.google.com/";
};
```

- 新しい表示形式を作成するか、既存の表示形式を編集してグリッドに切り替えると、サポートされているデータ ソースでデフォルトでグリッドのページングが有効になっています。
- Shadow DOM を利用する Web コンポーネント フレームワークをより適切にサポートするために、マウスホイールイベントの改善が行われました。
- 高負荷時のリクエスト実行と資格情報解決のパフォーマンスが向上しました。
- クエリ実行のパフォーマンスを向上させるために、MongoDb の match ステージを簡素化しました。

#### ASP.NET

- .NET 8.0 のサポートが追加されました。
- 依存関係 Npgsql v6.0.9 が v7.0.7 に更新されました。
- 依存関係 Snowflake.Data v1.1.4 が v2.0.18 に更新されました。
- Sybase コネクターの場合、依存関係 System.Data.SqlClient v4.7.0 が v4.8.6 に更新されました。

#### Java

- キャッシュ ファイルの場所をカスタマイズできるように、新しい `public InitializeParameterBuilder setCachePath(String path)` メソッドが `InitializeParameterBuilder` に追加されました。

### バグ修正

#### すべてのプラットフォーム

- ツリーマップのツールチップに誤った情報が表示されています。
- プレビュー用にデータが読み込まれている間、「表示するデータがありません」というメッセージが表示されます。
- 複数のデータ ソースが利用可能な場合、InMemory データ ソースではエディターが直接開きます。
- 日付範囲カレンダーが動作しません。
- 計算フィールドをデータ フィルターとして割り当てることは、Postgres では正しく機能しません。
- 計算フィールドでは「並べ替え」を行うことができません。
- 「サーバーでデータを処理」設定で、SQL ベースのプロバイダーの計算フィールドによる並べ替えでエラーが発生します。
- `trunc` 関数は連結内で正しく動作しません。
- グリッドの表示形式を使用してフィールドに構成した場合、大きな数値の書式設定が適用されませんでした。
- 日付表示形式フィルターの選択値を設定するときに、UI に間違った日付書式が表示されます。
- クリック/ホバー イベントで日付の値が正しく報告されません。
- コンボの表示形式では、軸ごとの最低軸の最小値は計算されません。
- 積層型棒の表示形式では、小数を 0 に設定すると、Y軸のマーカーが重複して表示されます。
- Analysis Services ディメンション構造は、更新によってサーバーから更新されません。
- インタラクティブ フィルタリングはラベル ゲージでは機能しません。
- 生データに切り替えてから別の表示形式に切り替えるとクラッシュが発生します。
- ページングされた行グリッドをスクロールして表示するとクラッシュが発生します。
- テキストの表示形式には、「表示するデータはありません」 と表示されます。
- ドーナツ チャートで大きな数値が縮小されずにオーバーフローしています。
- RevealView の `showFilters` プロパティを `false` に設定すると、意図したとおりに機能しません。
- 階層からカテゴリにフィールドをドラッグすると、アプリケーションがクラッシュします。

#### ASP.NET

- Serilog をロガーとして使用すると、メッセージ パラメーターが適切に置き換えられません。

## 1.7.0 (2024 年 9 月 10 日)

### 重大な変更

#### Java

- Spring Boot 2.x はサポートされなくなりました。アプリケーションをホストするには、JDK 17 以降 と Jakarta EE 9 準拠サーバーを備えた Spring Boot 3.x を使用する必要があります。

### 新機能

#### すべてのプラットフォーム

- (ベータ版) カテゴリ チャートに固定線を追加できるようになりました。このベータ機能にアクセスするには、`$.ig.RevealSdkSettings` の `enableBetaFeatures` プロパティを有効にします。エディターの固定行セクションでは、データ フィールド、または最高値、最低値、平均値、または固定値の集計特殊フィールドのいずれかを使用できます。
- 表示形式フィルター API に日付のサポートが追加されました。たとえば、「過去 7 日間」などの日付ベースの表示形式フィルターがある場合、次のコードを使用して、返される `RVDateRange` オブジェクトの `from` プロパティと `to` プロパティをチェックすることで、フィルターが評価した日付範囲を確認できます。

```js
var dateRange = revealView.dashboard.visualizations[0].filters[0].dateRange;
```

- `$.ig.RevealSdkSettings` の `enableBetaFeatures` フラグを必要とせずに、サーバー側グリッド ページングが利用できるようになりました。ページングは​​次のプロバイダーでサポートされています: SQL Server、MySQL、BigQuery、PostgreSQL、SyBase、Athena、Oracle。ストアド プロシージャーをサポートするプロバイダーでは、テーブルのようにクエリを実行して行の範囲を返すことができないため、ストアド プロシージャーを選択するとグリッド ページングが無効になります。さらに、サーバー上でのデータ処理が false の場合、およびブレンドされたデータを使用する場合、ページングは​​使用できません。
- 表示形式レベルの説明が追加されました。表示形式を編集するときに、必要に応じて説明を入力できるようになりました。
- 表示形式ではダッシュボードのリンクが自動的にサポートされるようになりました。デフォルトの機能は、[「ダッシュボードのリンク」](https://help.revealbi.io/ja/web/linking-dashboards/)トピックの手順を使用して上書きできます。
- 表示形式を最大化すると、オーバーフロー メニューから個別に PDF にエクスポートできるようになりました。
- `ExportOptions` オブジェクトの `includeFiltersSummaryPage` プロパティを設定することで、エクスポートでフィルター集計ページを非表示にできるようになりました。例外は NodeJS です。このプラットフォームでは、設定に関係なくフィルターの集計ページは含まれません。
- オーバーフロー メニューまたはフィルター検索ボックスをクリックしたときの背景オーバーレイが明るくなりました。
- グリッド表示形式で非表示フィールドを定義する機能が追加されました。これを使用して、URL またはダッシュボード リンクを定義できます。
- (ベータ版) 同じ表示形式内でフィルタリングされたデータを比較できます。シリーズのツールチップには、選択した値でフィルタリングするオプションが含まれます。表示形式の残りの部分には、フィルタリングされた値と元の値を簡単に比較できるように、両方の値が表示されます。このリリースでは、ファンネル、ツリーマップ、ゲージのサポートが追加されました。この機能は現在、次のグラフ タイプでサポートされています: 縦棒、棒、折れ線、時系列、エリア、ステップ エリア、スプライン、積層型縦棒、積層型エリア、積層型棒、ファンネル、ツリーマップ、ゲージ。この機能を有効にするには、RevealView で `interactiveFilteringEnabled` を `true` に設定します。
- ヘッドレス エクスポートで画像のエクスポートがサポートされます。
- Sql Server Analysis Services データ ソースは `EffectiveUserName` プロパティをサポートするようになり、これにより特定のユーザーになりすますことが可能になりました。このプロパティは、たとえば、userContext に設定されている現在のユーザーの値を使用して `IRVDataSourceProvider` 実装のプロパティを設定することにより、シングル サインオンを実現するために活用できます。

#### ASP.NET & Node

- Windows 統合認証が、SQL Server Analysis Services データ ソースでサポートされます。これを有効にするには、'IRVAuthenticationProvider' 実装で `RVIntegratedAuthenticationCredential` の新しいインスタンスを返します。

#### Java

- Spring Boot v3 のサポートが追加されました。Spring Boot v2.x はサポートされなくなりました。Spring Boot v3 を使用するには、JDK 17 以上を使用し、アプリケーションをホストするための Jakarta EE 9 準拠のサーバーが必要になります。
- ExportTool に ARM64 サポートが追加されました。

### バグ修正

#### すべてのプラットフォーム

- キャッシュされたファイルは、Reveal キャッシュにエントリを追加した後、.tmp ファイルを削除していませんでした。
- フォント サイズを変更した後、テキストエリアフィールドのプレースホルダーの位置がずれます。
- 値またはラベル フィールドで構成された並べ替えが円チャートの表示形式に反映されません。
- TextBox のみを含むダッシュボードを編集するとクラッシュが発生する可能性があります。
- 「今日」と「昨日」の日付フィルターでは、異なるタイムゾーンで誤った値が表示されます。
- マウスが押されたときにクリック可能な要素の背景色が間違っています。
- 日付フィールドに null 値がある場合、Excel エクスポートで間違ったチャートが生成されます。
- カテゴリを使用すると積層型縦棒チャートの色が消えます。
- 散布図では、一部の状態が緑色で表示されます。
- `onFieldsInitializing` を使用してラベルを変更しても、ダッシュボード フィルターのフィールド選択には反映されません。
- 表示形式タイプを変更して Excel にエクスポートすると、フィールドの書式設定が失われます。
- ヘッドレス エクスポート `InitScript` が表示形式で機能しません。
- マップ の形状は https ではなく http から読み込まれます。
- ダッシュボードの説明が body タグの子として追加されます。
- ダッシュボードのリンクは、null または空の文字列値では機能しません。
- Web コンポーネントを使用しているときにダッシュボードのタイトルまたは説明を変更すると、それらのフィールドはデフォルトに戻ります。
- Snowflake メタデータ ブラウザーはすべてのスキーマのテーブルを表示します。

## 1.6.7 (2024 年 6 月 26 日)

### 新機能

#### すべてのプラットフォーム

- 表示形式フィルター (クイック フィルターとも呼ばれます) にプログラムでアクセスし、選択した値を変更するための API が追加されました。

```js
//Add a selected value, specified by index from the list of available values, to a field given its name.
function addSelValueToFilter(fieldName, valueIdx) {
	var flt = revealView.dashboard.visualizations[0].filters.getByFieldName(fieldName);
	var valuesPromise = flt.getFilterValues(); //Retrieve the selectable values for the filter
	valuesPromise.then(function (values) {              
		var selValues = flt.selectedValues;
		selValues.push(values[valueIdx]); //Add the specified value to the selection
		flt.selectedValues = selValues;
	});
}
```
- (ベータ版) 同じ表示形式内でフィルタリングされたデータを比較できます。シリーズのツールチップには、選択した値でフィルタリングするオプションが含まれます。表示形式の残りの部分には、フィルタリングされた値と元の値を簡単に比較できるように、両方の値が表示されます。現在、次のチャート タイプがサポートされています: 縦棒、棒、折れ線、時系列、エリア、ステップ エリア、スプライン、積層型縦棒、積層型エリア、積層型棒。この機能を有効にするには、RevealView で `highlightedFilteringEnabled` を `true` に設定します。
- (ベータ版) 近似曲線、ラベル、ズームなどにすばやくアクセスするための表示形式ツールバーが追加されました。この機能を有効にするには、`$.ig.RevealSdkSettings` で `enableNewToolbar` を `true` に設定します。
- SQL ベースのデータ ソースに対しクライアント側でカスタム クエリを提供できる機能を削除しました。
- RVGoogleAnalyticsDataSource と RVGoogleAnalyticsDataSourceItem は、Google がこのコネクタの API を 2024 年 7 月 1 日に廃止する予定であるため、削除されました。
- RevealView に `onDashboardChanged` イベントを追加しました。

```js
revealView.onDashboardChanged = function (args: DashboardChangedEventArgs) {
  console.log('Dashboard has changed.');
  console.log('Old Dashboard:', args.oldValue);
  console.log('New Dashboard:', args.newValue);

  // Accessing filters for the old and new dashboard
  if(args.oldValue) {
    console.log('Old Dashboard Filters:', args.oldValue.filters);
  }
  if(args.newValue) {
    console.log('New Dashboard Filters:', args.newValue.filters);
  }
};
```
- データ ソース ダイアログ内のテーブルがアルファベット順に並べ替えられるようになりました。この変更は次のコネクタに適用されます: SQL Server、MySql、Postgres、Redshift、Oracle、Snowflake。
- ヘッドレス エクスポートにグリッド データが含まれるようになりました。
- RVGoogleAnalytics4DataSource に `accountId` および `propertyId` プロパティが含まれるようになり、RVGoogleAnalytics4DataSourceItem の該当するプロパティは非推奨になりました。

#### Java

- プロバイダーを実装しなくてもダッシュボードをサーバーに保存できるように、デフォルトの RVDashboardProvider を追加しました。

### バグ修正

#### すべてのプラットフォーム

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
- エディターの検索バーが複数回レンダリングされる問題。
- 計算フィールドを追加した後、フィルターされたフィールド リストが正しくない問題。

#### ASP.NET & Java

- RDASH プロパティが、サーバー上で設定されたものよりも優先される問題。

#### Java

- ExportTool が間違ったパスに作成される問題。

## 1.6.6 (2024 年 4 月 19 日)

### 新機能

#### すべてのプラットフォーム

- `showDescription` プロパティによって制御されるオプションの説明テキスト ボックスを RevealView に追加しました。
- グリッドまたはピボットを PDF にエクスポートすると、ページの幅に収まらない列を含むオーバーフロー テーブルが生成されるようになりました。
- PDF エクスポート時にグリッド列の幅が優先されるようになりました。
- Excel へのエクスポートにおけるピボット グリッドの表示形式の外観が改善されました。
- (ベータ版) グリッド表示形式にサーバー側のページング サポートが追加されました。この機能を有効にして、表示形式エディターの設定ペインに表示するには、`$.ig.RevealSdkSettings.enableBetaFeatures` を `true` に設定します。ページングは​​次のプロバイダーでサポートされています: SQL Server、MySQL、BigQuery、PostgreSQL、SyBase、Athena、Oracle。ストアド プロシージャーをサポートするプロバイダーでは、テーブルのようにクエリを実行して行の範囲を返すことができないため、ストアド プロシージャーを選択するとグリッド ページングが無効になります。さらに、サーバー上でのデータ処理が false の場合、およびブレンドされたデータを使用する場合、ページングは​​使用できません。
- `SkiaSharp`、`SkiaSharp.HarfBuzz`、および `SkiaSharp.NativeAssets.Linux` v2.88.3 依存関係が v2.88.7 に更新されました。
表示形式エディターでデータ ツールチップをプレビューするかどうかを制御するフラグが RevealView に追加されました。クエリが最初の 5 行を取得するのを防ぐため、これらはデフォルトでオフになっています。このツールチップを有効にするには、`isPreviewDataInVisualizationEditorEnabled` を `true` に設定します。
- サーバー上でプロセス データを使用する場合、MySql でブレンディングがサポートされるようになりました。
- ラジアル チャートの新しいルック & フィール。以前のルック & フィールは非推奨ですが、必要に応じて `RevealSdkSettings.EnableNewCharts = false` を実行することで復元できます。
- 棒チャートと柱状チャートには、表示形式エディターの設定ペインに重複とギャップの設定が含まれるようになりました。これにより、バー間の重なりの量とグループ間のスペースの量を制御できます。
- ツリーマップの表示形式では、マウスをホバーするとツールヒントが表示され、ノードが強調表示されるようになりました。
- `Playwright` v1.27.2 の依存関係が v1.42.0 に更新されました。

#### Node
- データ ソース ダイアログでデータ ソース項目をフィルター処理できるようにする `dataSourceItemFilter` プロパティが RevealOptions に追加されました。
```ts
dataSourceItemFilter?: (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => Promise<boolean>
```

### バグ修正

#### すべてのプラットフォーム

- UI からエクスポートする場合、円チャートとドーナツ型チャートが表示されない問題。
- 計算フィールドが依存しているデータ ブレンドを削除しても、計算フィールドが削除されない問題。
- Redshift で関数を呼び出すとエラーが発生する問題。
- Postgres 関数が正しく動作しない問題。
- コンテナーまたは任意の祖先要素で transform:scale スタイルを使用する場合の RevealView の配置とサイズ設定で発生する問題。
- `canAddDateFilter` を設定すると例外が発生する問題。
- ダッシュボード プロパティが null または undefined に設定されている場合、保存イベント `args.isNew` は `false` になる問題。
- ストアド プロシージャー パラメーター画面では、以前のデータが取得されたり、まったく取得されなかったりする場合があります。
- 検索バーを使用すると、ポップアップ要素でスクロールが機能しなくなる問題。
- 散布マップ インジケーターのホバー領域がズームに応じて移動する問題。
- 分数の数字は、階級区分図のツールチップには表示されない問題。
- 3000 を超えるフィルター値は保持されない問題。
- 事後計算フィールドの UI で名前が変更されたピボット フィールドに関するエラーが発生する問題。
- プレビュー データ セルが再利用されないため、複数回レンダリングされる問題。
- MacOS ARM64 でグリッドがクラッシュする問題。
- 円チャートの凡例が、表示するのに十分なスペースがある場合に表示されなくなる問題。
- サーバー上のプロセス データをオフにした状態で MySql をブレンドするとエラーが発生する問題。
- スライス チャートでホバー イベントが意図したとおりに動作しない問題。
- ピボット グリッドの表示形式に総計が表示されない問題。
- Analysis Services データ プロバイダーを使用すると、誤った総計値が表示される問題。
- Analysis Services データ プロバイダーを使用すると、ダッシュボードと視覚化フィルターに誤った総計が表示される問題。
- ピボット グリッドで値を並べ替えた後、フィールド名の変更が失われる問題。
- 「...hierarchy already appears in the Axis1 axis.」 エラーが Analysis Services で発生する問題。
- Analysis Services で 「上の N」 フィルターを適用すると、誤った結果が返される問題。
- リソースベースの表示形式では誤ったキャッシュ エントリが取得される問題。
- ブレンディングを使用すると、誤ったキャッシュ エントリがヒットされる問題。
- ブラウザーがバックグラウンドに移動した後、検索ボックスにフォーカスを設定できない問題。

## 1.6.4 (2024 年 2 月 14 日)

### 重大な変更

- プロパティ名 `showExportToPowerpoint` が `showExportToPowerPoint` に変更されました。
- 散布図とバブル チャートの新しいルック & フィール。古いルック アンド フィールは廃止されました。必要に応じて、`RevealSdkSettings.enableNewCharts = false` を実行することで復元できます。

### 新機能

#### すべてのプラットフォーム

- `RVDashboard` の `description` プロパティを公開しました。
- ダッシュボードのタイトルを個々の Excel シートに追加しました。
- Excel および PDF にエクスポートする際にダッシュボード フィルターが含まれるようになりました。
- PostgreSQL ストアド プロシージャは現在サポートされていないため、タブから削除しました。

### バグ修正

#### すべてのプラットフォーム

- データ ソース項目の設定が欠落している場合、Athena エラー メッセージが不十分である問題。
- ソース項目プロバイダーが実装されていない場合に、S3 DS 「Region has not been set (地域が設定されていません)」 エラーが発生する問題。
- ソース項目プロバイダーが実装されていない場合に、Redshift DS 「Host can't be null (ホストを null にすることはできません)」 エラーが発生する問題。
- ソース項目プロバイダーが実装されていない場合に、MySql 「unable to connect (接続できません)」 エラーが発生する問題。
- データ ソース項目プロバイダーが実装されていない場合に、テーブル選択時に Postgres エラーが発生する問題。
- 一部のグリッドのシナリオで大文字と小文字を区別しない並べ替えが正しくない問題。
- 選択した項目に変更が加えられた際に FilterChanged イベントが発生しない問題。
- 「サーバーでデータを処理」フラグの初期化が誤っている問題。
- フィールドのフォーマットを構成時に 「Uncaught TypeError: t.mkFormat is not a function (キャッチされない TypeError: t.mkFormat は関数ではありません)」 のエラーが発生する問題。
- M1 Mac/ARM64 で SQLite の例外がクラッシュを引き起こす問題。
- 別のデータ ソースからフィールドを追加する際の `CURRENTTIMEZONE()` が正しくない問題。
- KPI vs Time で今月の空の値が表示されるようになりました。
- グリッドまたはピボット タイプの表示形式における日付タイプの列の並べ替えが正しく動作しない問題。
- 表示形式の読み込み中にエクスポートを実行すると複数のポップアップが表示される問題。
- エクスポートする際に 413 エラーが発生する問題。
- RevealView の複数のインスタンスがサポートされない問題。
- マップの場所名の比較では大文字と小文字が区別される問題。

#### Java

- SSRS または CSV データに対して数値の丸めが機能しない問題。
- MySql - カスタム クエリの設定が機能しない問題。
- エクスポートがタイムアウトしてエラーが発生する問題。

#### Node

- 現在の Chromium バージョンが Node + MAC M1 で動作しない問題。

## 1.6.3 (2024 年 1 月 15 日)

- **ASP.NET 7.0** をターゲットとするプロジェクトの依存関係の競合を修正するパッチ リリース。`System.Security.Cryptography.Pkcs` を更新しました (6.0.3 => 7.0.0)。

## 1.6.2 (2024 年 1 月 5 日)

### 新機能

#### すべてのプラットフォーム

- 表示形式の背景色ピッカーが [Coloris](https://github.com/mdbassit/Coloris) を使用するように更新されました。この機能強化により、デフォルトで背景色設定の可視性が有効になったため、プロパティ `canChangeVisualizationBackgroundColor` は廃止対象とされています。さらに、[Spectrum](https://bgrins.github.io/spectrum/) の依存関係は必要なくなりました。
- キャッシュ ファイル `tabulardata.sqlite` の sqlite ストレージは、無制限に増大することを防ぐためにデフォルトで無効になりました。
- `$.ig.RevealSdkSettings.enableActionsOnHoverTooltip` が有効になっている場合、アクション ツールチップがピボット表示形式で利用できるようになりました。チャート表示形式上にマウスを置くと、データ ポイントから特定のピクセル数以内にツールチップが表示されるようになりました。
- 「サーバーでデータを処理」が有効になっている SQL Server データ ソースで次の関数を使用する計算フィールドのサポート: `fyear`、`and`、`or`、`concatenate`、`replace`、`date`、`time`、`hour`、`minute`、`second`、`formatdate`、および `datevalue`。
- 実行時にダッシュボード内の URL リンクをインターセプトおよび変更できるようにするために、`onUrlLinkRequested` という名前の新しいクライアント イベントが追加されました。

```javascript
revealView.onUrlLinkRequested = (args) => {
    return args.url + "&webUpdated=true&cellValue=" + args.cell.value();                
};
```

- サーバー エクスポートを使用して単一の表示形式をエクスポートする機能が追加されました。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
var pdfOptions = new PdfExportOptions();

pdfOptions.Visualizations.Add(new VisualizationExport() {Title = "Sales by Product" });
pdfOptions.Visualizations.Add(new VisualizationExport("9ea0b74d-8944-474c-5e8c-78ce2b30d16c"));

//or
pdfOptions.Visualizations.AddByTitle("Sales by Product");
pdfOptions.Visualizations.AddById("9ea0b74d-8944-474c-5e8c-78ce2b30d16c");


await _exporter.ExportToPdf(dashboardId,  path + ".pdf", pdfOptions);
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
ArrayList<VisualizationExport> viz = new ArrayList<VisualizationExport>();

viz.add(new VisualizationExport("9ea0b74d-8944-474c-5e8c-78ce2b30d16c"));

VisualizationExport ve = new VisualizationExport();
ve.setTitle("Sales by Product");
viz.add(ve);

PdfExportOptions options = new PdfExportOptions();
options.setVisualizations(viz);	

RevealEngineLocator.dashboardExporter.exportToPdf(dashboardId, null, options ,new ExportStreamCallback() {
	@Override
	public void onSuccess(InputStream stream) {
		try {								
			Files.copy(stream, Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
			asyncResponse.resume(filePath);
		}
		catch(Exception e) {
			asyncResponse.resume(e);
		}
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
import reveal, { ExportFormat, IDashboardExporter, PdfExportOptions, VisualizationExport } from 'reveal-sdk-node';

var options = new PdfExportOptions();
var ve = new VisualizationExport();
ve.title = "Spend vs Budget";

options.visualizations.push(ve);    

revealServer.exporter.exportPdf("Marketing", fileName, options, null);
```

  </TabItem>

</Tabs>

- クライアントおよびサーバーのエクスポートでのカスタム カラーのサポートが追加されました。

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

- 編集モードを制御する機能を追加しました。
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
- 異なる接続で異なるデータベースにアクセスできるようにするために、`RVSnowflakeDataSoure` に `role` プロパティが追加されました。
- MySQL コネクターでのストアド プロシージャーのサポートが追加されました。
- ダッシュボード フィルターに表示される値の最大数を制御するために、`RevealSdkSettings` プロパティに `maxFilterSize` が追加されました。

#### ASP.NET

- ヘッドレス エクスポートのグローバル フィルター設定のサポートが追加されました。

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

- MongoDB コネクターのカスタム クエリのサポートが追加されました。
- MongoDB コネクターのサーバー上でのデータ ブレンディング (結合) のサポートが追加されました。
- MacOS および Linux 上の ASP.NET および Node 用の ARM64 のサポートが追加されました。

#### Java

- JavaScript SDK ディストリビューションは https://maven.revealbi.io/repository/public/com/infragistics/reveal/sdk/reveal-sdk-distribution/x.y.z/reveal-sdk-distribution-x.y.z-js.zip で利用できなくなります。代わりに、場所は https://dl.infragistics.com/reveal/libs/x.y.z/reveal-sdk-distribution-js.zip になります。
- ヘッドレス エクスポートのグローバル フィルター設定のサポートが追加されました。

```java
PdfExportOptions options = new PdfExportOptions();	

RVDateDashboardFilter dateFilter = new RVDateDashboardFilter(RVDateFilterType.CUSTOM_RANGE,
			new RVDateRange( new GregorianCalendar(2022,4,1), new GregorianCalendar())
                        );
						
options.setDateFilter(dateFilter);
					
options.getFilters().add(new RVDashboardFilter("incident_severity", new ArrayList<Object>(Arrays.asList("Medium", "Critical"))));
```

### バグ修正

#### すべてのプラットフォーム

- `canAddDateFilter` を設定すると例外が発生する問題。
- 選択した値の検索を使用すると、Redshift フィルターで 3k 制限を超える値が表示されない問題。
- 表示形式エディターでフィールド設定を表示するときに「データ ラベルを表示」というテキストが翻訳されない問題。
- SSAS コネクターを使用する場合、並べ替え時にピボット グリッドが行を混同する問題。
- KPI vs Time - データがある状態から表示するデータがない状態に変化したときにテキストが重なる問題。
- クリック イベントがないときに「最初の表示形式を追加」の上にマウスを置くとポインター カーソルが表示される問題。
- クライアントが別の言語を使用している場合のサーバー側のローカリゼーションの問題。
- クライアントが別の言語を使用している場合のサーバー側のローカリゼーションの問題。
- [新しい計算フィールド] ウィンドウのツールチップに空白のヒントが表示される問題。
- データ ソース項目はデータ ソースのサブタイトルを上書きしてはなりません。
- 大量のデータがある場合、グリッド表示形式の読み込みに時間がかかる問題。
- Snowflake ホストのスペイン語翻訳では 「Anfitrion」 と表示される問題。
- `chartTypes` を構成するときに、`AreaChart` が変更に応答しない問題。
- バージョンにビルド番号が付加されることによるサーバー側のダッシュボードのエクスポートの問題。

#### ASP.NET & Node

- MongoDB コネクターで、空のフィールドでフィルタリングするときに、フィールドが設定されていないドキュメントをフィルタリングしない問題。

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
* ほとんどのデータ ソースはコア パッケージから削除されました。これらは個別のパッケージとして利用できるようになりました。データ ソース パッケージは[登録](/web/datasources.md#データ-ソースのインストール)することが**必須**です。サポートされているデータ ソースと対応するアドイン nuget パッケージに関する情報は、[こちら](/web/datasources.md#サポートされるデータ-ソース)にあります。
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
* ASP.NET SDK のインストーラーはリリースされなくなりました。開始するには、https://help.revealbi.io/web/getting-started-server/ でドキュメントを確認してください。

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
