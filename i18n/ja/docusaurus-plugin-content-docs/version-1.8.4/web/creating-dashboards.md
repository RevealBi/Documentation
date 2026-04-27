# ダッシュボードの作成

新しいダッシュボードの作成は本当に簡単です。`$.ig.RevealView.Dashboard` プロパティを `$.ig.RVDashboard` オブジェクトの新しいインスタンスに設定する必要があります。

まず、`id` を `revealView` に設定して `<div>` 要素を定義します。
```html
<div id="revealView" style="height: 800px; width: 100%;"></div>
```

次に、JavaScript で、`$.ig.RevealView.Dashboard` プロパティを `$.ig.RVDashboard` オブジェクトの新しいインスタンスに設定します。
```js
var revealView = new $.ig.RevealView("#revealView");
revealView.dashboard = new $.ig.RVDashboard();
```

アプリケーションを実行すると、新しい空のダッシュボードが表示されます。

![](images/creating-dashboards.jpg)

ご覧のとおり、これにより使用する新しいダッシュボード インスタンスが提供されますが、ダッシュボードで使用するデータ ソースを `$.ig.RevealView` に提供していない限り、エンドユーザーは新しいダッシュボードで表示形式を作成できません。

次の手順:
- [データ ソースの追加](adding-data-sources/in-memory-data.md)
- [ダッシュボードの読み込み](loading-dashboards.md)