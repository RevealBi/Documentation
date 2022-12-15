# クリック イベント

エンドユーザーが表示形式内のデータ ポイントをクリックすると、`VisualizationDataPointClicked` イベントが呼び出されます。`VisualizationDataPointClicked` イベントにイベント ハンドラーを追加することで、このイベントに応答できます。

```xml
<rv:RevealView x:Name="_revealView"
               VisualizationDataPointClicked="RevealView_VisualizationDataPointClicked"/>
```

```cs
private void RevealView_VisualizationDataPointClicked(object sender, VisualizationClickedEventArgs e)
{

}
```

`VisualizationClickedEventArgs` クラスには、次のプロパティがあります:
- **Cell** - クリックされたデータ ポイントを取得します。
- **Row** - **Cell** に関連付けられているセル データのコレクションを取得します。
- **Visualization** - クリックされた視覚化を取得します。

`VisualizationClickedEventArgs.Cell` プロパティや `VisualizationClickedEventArgs.Row` プロパティなど、`VisualizationClickedEventArgs` クラスによって公開されるプロパティを使用することで、クリックされたデータ ポイントに関連付けられているデータを読み取ることができます。

`VisualizationClickedEventArgs.Row` プロパティは、クリックされたセルに関連付けられた各データ ポイントを表すすべての `RVDataCell` オブジェクトのコレクションを提供することを理解することが重要です。

`RVDataCell` クラスには、次のプロパティがあります:
- **ColumnLabel** - データ ポイントに属する列のラベルまたはカスタム名
- **ColumnName** - データ ポイントに属する列の名前
- **FormattedValue** - データ ポイントの書式設定された値
- **Value** - データ ポイントの元の値