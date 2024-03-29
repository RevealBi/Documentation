# ツールチップの作業

ツールチップは、ダッシュボードの表示形式でエンドユーザーがシリーズ上をホバーまたはクリックしたときに表示されるメッセージです。

![](images/tooltips.jpg)

ダッシュボードの表示形式にツールチップが表示されるとき、`RevealView.onTooltipShowing` イベントが呼び出されます。このイベントを処理すると、ツールチップ データの読み取りやツールチップの表示防止が可能になります。

```js
revealView.onTooltipShowing = (args) => {

};
```

`TooltipShowingEventArgs` には、次のプロパティが含まれています:
- **cell** - ツールチップに関連付けられたデータ ポイントを取得します。
- **row** - ツールチップで提供されるセルデータのコレクションを取得します。
- **visualization** - ツールチップを表示する表示形式を取得します。

:::info

`RevealView.onTooltipShowing` イベントは、グリッドやゲージなどの、ツールチップをサポートしない表示形式ではトリガーされません。

:::

## ツールチップ データの読み取り

`TooltipShowingEventArgs.cell` および `TooltipShowingEventArgs.row` プロパティなど、`TooltipShowingEventArgs` イベントオブジェクトによって公開されるプロパティを使用することによって、ツールチップの表示に使用されるデータを読み取ることができます。

`TooltipShowingEventArgs.row` プロパティは、ツールチップの各データ ポイントを表す `RVDataCell` オブジェクトのコレクションを提供することを理解することが重要です。

`RVDataCell` クラスには次のプロパティがあります:
- **columnLabel** - データ ポイントに属する列のラベルまたはカスタム名称
- **columnName** - データ ポイントに属する列の名前
- **formattedValue** - データ ポイントの書式設定された値
- **value** - データ ポイントの元の値

以下の画像は、`RVCell` のプロパティがツールチップに表示されるデータにマップする方法を示しています。

![](images/tooltips-row-property.jpg)

## ツールチップを表示しないようにする
すべての表示形式または特定の表示形式でツールチップが表示されないようにするには、`TooltipShowingEventArgs.cancel` プロパティを `true` に設定します。

この例では、`TooltipShowingEventArgs.visualization.title` プロパティが **Sales** であるかどうかを確認し、もしそうならば `TooltipShowingEventArgs.cancel` プロパティを `true` に設定してツールチップを表示しないようにします。

```js
revealView.onTooltipShowing = (args) => {
    if (args.visualization.title == "Sales") {
             args.cancel = true;
    }
};
```

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/Tooltips) にあります。

:::

