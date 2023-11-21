# ツールチップの作業

ツールチップは、ダッシュボード表示形式でエンドユーザーがシリーズをホバーまたはクリックしたときに表示されるメッセージです。

![](images/tooltips.jpg)

ダッシュボード表示形式にツールチップが表示されている場合、`RevealView.TooltipShowing` イベントが呼び出されます。このイベントを処理すると、ツールチップ データの読み取りやツールチップの表示防止が可能になります。

```xml
<rv:RevealView x:Name="_revealView"
               TooltipShowing="RevealView_TooltipShowing"/>
```

```cs
private void RevealView_TooltipShowing(object sender, TooltipShowingEventArgs e)
{

}
```

`TooltipShowingEventArgs` クラスには次のプロパティがあります:
- **Cell** - ツールチップに関連付けられたデータ ポイントを取得します。
- **Row** - ツールチップで提供されるセルデータのコレクションを取得します。
- **Visualization** - ツールチップを表示する表示形式を取得します。

:::info

`RevealView.TooltipShowing` イベントは、グリッドやゲージなどのツールチップをサポートしない表示形式ではトリガーされません。

:::

## ツールチップ データの読み取り

`TooltipShowingEventArgs.Cell` および `TooltipShowingEventArgs.Row` プロパティなど、`TooltipShowingEventArgs` クラスによって公開されるプロパティを使用することによって、ツールチップの表示に使用されるデータを読み取ることができます。

`TooltipShowingEventArgs.Row` プロパティは、ツールチップの各データ ポイントを表す `RVDataCell` オブジェクトのコレクションを提供することを理解することが重要です。

`RVDataCell` クラスには次のプロパティがあります:
- **ColumnLabel** - データ ポイントに属する列のラベルまたはカスタム名称
- **ColumnName** - データ ポイントに属する列の名前
- **FormattedValue** - データ ポイントの書式設定された値
- **Value** - データ ポイントの元の値

以下の画像は、`RVCell` のプロパティがツールチップに表示されるデータにマップする方法を示しています。

![](images/tooltips-row-property.jpg)

## ツールチップを表示しないようにする
すべての表示形式または特定の表示形式でツールチップが表示されないようにするには、`TooltipShowingEventArgs.Cancel` プロパティを `true` に設定します。

この例では、`RVVisualization.Title` プロパティが Sales であるかどうかを確認し、`TooltipShowingEventArgs.Cancel` プロパティを `true` に設定してツールチップを表示しないようにします。

```cs
private void RevealView_TooltipShowing(object sender, TooltipShowingEventArgs e)
{
    if (e.Visualization.Title == "Sales")
    {
        e.Cancel = true;
    }
}
```

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-wpf/tree/master/Tooltips) にあります。

:::

