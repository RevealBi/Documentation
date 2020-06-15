## ユーザークリック イベントの処理

### 概要

SDK は、ユーザーが可視化内のデータを含むセルをクリックしたときに処理できます。たとえば独自のナビゲーションを提供したり、アプリの既存の選択を変更したりする場合などに非常に便利です。

### コード

__onVisualizationDataPointClicked__ イベントに登録することで、ユーザークリック イベントを処理できます。

``` js
window.revealView.onVisualizationDataPointClicked = function (visualization, cell, row) {
    alert('Visualization clicked: ' + visualization.title() + ", cell: " + cell.value);
};
```

コールバック関数では、クリックの場所に関する情報を受け取ります。

  - クリックされた可視化の名前。
  - クリックされたセルの値 (値、書式設定された値、列の名前を含む)
  - 同じセルの残りの値。

アプリケーションで選択したカスタマーを変更する場合は、カスタマー ID などの特定の属性を検索するためにセル内の残りの値を使用できます。カスタマーの売上高のように、ユーザーが別のセルをクリックした場合も必要な情報を取得できます。
