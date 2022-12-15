# クリック イベント

エンドユーザーが表示形式内のデータ ポイントをクリックすると、`onVisualizationDataPointClicked` イベントが呼び出されます。`onVisualizationDataPointClicked` イベントにイベント ハンドラーを追加することで、このイベントに応答できます。

```javascript
revealView.onVisualizationDataPointClicked = (visualization, cell, row) => {
    
};
```

イベント ハンドラーには、次のパラメーターがあります:
- **cell** - クリックされたデータ ポイントを取得します。
- **row** - セルに関連付けられているセル データのコレクションを取得します。
- **visualization** - クリックされた視覚化を取得します。

`cell` や`row` のパラメーターなど、イベントによって公開されたパラメーターを使用することで、クリックされたデータ ポイントに関連付けられているデータを読み取ることができます。

`row` プロパティは、クリックされたセルに関連付けられた各データ ポイントを表すすべての `RVDataCell` オブジェクトのコレクションを提供することを理解することが重要です。

`RVDataCell` には次のプロパティがあります:
- **columnLabel** - データ ポイントに属する列のラベルまたはカスタム名称
- **columnName** - データ ポイントに属する列の名前
- **formattedValue** - データ ポイントの書式設定された値
- **value** - データ ポイントの元の値