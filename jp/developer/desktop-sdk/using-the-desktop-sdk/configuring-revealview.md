## RevealView オブジェクトの設定

### 概要

The __RevealView__ コンポーネントは、 __RevealSettings__ オブジェクトをパラメーターとして渡している間にインスタンス化できます。

 __RevealSettings__ オブジェクトを使用して、エンドユーザーに対するさまざまな機能を有効または無効にすることができます。
  - **UI 要素の表示/非表示** - ShowFilters プロパティは初期化時に __RevealView__ によって読み込まれ、その値に基づいてグローバル フィルター UI をユーザーに表示または非表示にします。その他の同様のプロパティには、ShowExportButton、CanEdit、showChangeDataSource、MaximizedVisualization があります。

  - **ダッシュボードの指定** - どのダッシュボードをレンダリングするかを指定するには、dashboard プロパティを使用します。[**ダッシュボード ファイルの読み込み**](loading-dashboards.md) に示すように、ダッシュボードは、Stream を受信して​​ダッシュボード オブジェクト __RevealUtility.LoadDashboard__ を返す **RVDashboard** メソッドを使用して取得する必要があります。

  - **グローバル フィルター値の選択** - ダッシュボードのロード時に既存のグローバル フィルターに対して最初に選択される値を指定できます。

### コード

次のコードスニペットは、ダッシュボードを読み込む方法を示し、選択された「Territory」値を「Americas」に設定します。したがって、ダッシュボードには「Americas」でフィルタリングされたデータが表示されます。

``` csharp
var revealView = new RevealView();
using (var fileStream = File.OpenRead(path))
{
    var dashboard = await RevealUtility.LoadDashboard(fileStream);
    var territoryFilter = dashboard.GetFilterByTitle("Territory");
    var settings = new RevealSettings(dashboard);
    settings.SetFilterSelectedValues(territoryFilter, new List<object>() { "Americas" });
    revealView.Settings = settings;
}
```

#### タイミングについて

RevealView は、ダッシュボードが画面に表示される前の特定の時間である **初期化時** に RevealSettings を適用します。これによるいくつかの影響があります。

  - ダッシュボードのレンダリング後に設定オブジェクトを変更しても、すでにロードされているダッシュボードには影響しません。
  - ただし、ビューの作成後にダッシュボード フィルターの選択値を変更することはできます。これを行うには、RevealView オブジェクトの SetFilterSelectedValues メソッドを使用する必要があります。
  - __RevealSettings__ オブジェクトのプロパティを変更した場合 (CanEdit、CanSaveAs など)、__RevealView__ の新しいインスタンスを作成する必要があります。

