## ユーザークリック イベントの処理

### 概要

SDK は、ユーザーが可視化内のデータを含むセルをクリックしたときに処理できます。たとえば独自のナビゲーションを提供したり、アプリの既存の選択を変更したりする場合などに非常に便利です。

### コード

__VisualizationDataPointClicked__ イベントに登録することで、ユーザー クリック イベントを処理できます。

``` csharp
//attach to VisualizationDataPointClicked event
revealView.VisualizationDataPointClicked += RevealView_VisualizationDataPointClicked;
```

コールバック関数では、クリックの場所に関する情報を受け取ります。
  - クリックされた可視化の名前
  - クリックされたセルの値 (値、書式設定された値、列の名前を含む)
  - 同じセルの残りの値

<!-- end list -->

``` csharp
private void RevealView_VisualizationDataPointClicked(object sender,
                   VisualizationClickedEventArgs e)
{
    var vizTitle = e.Visualization.Title;
    var column = e.Cell.ColumnName;
    var formattedValue = e.Cell.FormattedValue;
    var value = e.Cell.Value;
    foreach (var c in e.Row)
    {
        var cValue = c.Value;
        //TODO: use value from column c.ColumnName
    }
}
```

アプリケーションで選択したカスタマーを変更する場合は、カスタマー ID などの特定の属性を検索するためにセル内の残りの値を使用できます。カスタマーの売上高のように、ユーザーが別のセルをクリックした場合も必要な情報を取得できます。
