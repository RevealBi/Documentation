## RevealView オブジェクトの設定

### 概要

**$.ig.RevealView** コンポーネントは、**\$.ig.RevealSettings** オブジェクトをパラメーターとして渡している間にインスタンス化できます。

**$.ig.RevealSettings** オブジェクトを使用して、エンドユーザーに対するさまざまな機能を有効または無効にすることができます。

  - **UI 要素の表示/非表示** - ShowFilters プロパティは初期化時に **$.ig.RevealView** によって読み込まれ、その値に基づいてグローバル フィルター UI をユーザーに表示または非表示にします。その他の同様のプロパティには、howExportButton、canEdit、showChangeDataSource、maximizedVisualization があります。
  - **ダッシュボードの指定** - どのダッシュボードをレンダリングするかを指定するには、dashboard プロパティを使用します。[**Web クライアント SDK のインスタンスを作成**](~/jp/developer/general/setup-configuration-web.html#instantiate-web-client-sdk) のとおり、ダッシュボードは、$.ig.RevealUtility.loadDashboard　メソッドを使用して取得する必要があります。このメソッドは、dashboardId　と、ダッシュボードのロード時に呼び出される成功コールバックを受け取ります。
  - **グローバル フィルター値の選択** - ダッシュボードのロード時に既存のグローバル
    フィルターに対して最初に選択される値を指定できます。Reveal アプリでは、ダッシュボードフィルターを使用して、ダッシュボードのすべての接続された視覚化に動的フィルタリングを適用できます。選択が変更されると、すべての視覚化が一度に更新します。詳細については、_Reveal のユーザー ガイド_ にある [**Reveal フィルター**](https://www.revealbi.io/help/filters) を参照してください。

### コード

次のコードスニペットは、ダッシュボード「AppsStats」を読み込む方法を示しています。「application\_name」グローバル　フィルターの選択値を「App2」に設定すると、ダッシュボードには「App2」でフィルター処理されたデータが表示されます。

``` js
var dashboardId = "AppsStats";
var revealSettings = new $.ig.RevealSettings(dashboardId);

$.ig.RevealUtility.loadDashboard(dashboardId, function (dashboard) {
    revealSettings.dashboard = dashboard;

    var applicationNameFilter = dashboard.getFilterByTitle("application_name");
    revealSettings.setFilterSelectedValues(applicationNameFilter, ["App2"]);

    window.revealView = new $.ig.RevealView("#revealView", revealSettings);
}, function (error) {
});
```

### タイミングについて

**\$.ig.RevealView** は、初期化時に $.ig.RevealSettings を適用します。ダッシュボードが画面に表示される前の特定の時間です。これによるいくつかの影響があります。

  - ダッシュボードのレンダリング後に設定オブジェクトを変更しても、すでにロードされているダッシュボードには影響しません。
  - ただし、ビューの作成後にダッシュボード フィルターの選択値の変更ができます。これを行うには、**$.ig.RevealView** オブジェクトの **setFilterSelectedValues** メソッドを使用する必要があります。
  - **$.ig.RevealSettings** オブジェクトのプロパティ (CanEdit、CanSaveAs など)
    を変更した場合、**\$.ig.RevealView** の新しいインスタンスを作成する必要があります。
