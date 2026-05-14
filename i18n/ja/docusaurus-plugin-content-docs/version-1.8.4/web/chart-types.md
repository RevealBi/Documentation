# チャート タイプ

**チャート タイプ**は、ダッシュボードの視覚化として使用できるさまざまなタイプのチャートを表します。可視化を作成または編集する場合、チャート タイプは [チャート タイプ] ドロップダウン メニューから選択します。

![](images/chart-types.jpg)

Reveal SDK は、さまざまなグループに配置された 37 タイプのチャートを提供します。グループは次のとおりです。

- 最も人気
- グリッド
- カテゴリ
- ゲージ
- マップ
- 散布
- 財務
- 時間
- その他

## チャート タイプのカスタマイズ
カスタム可視化を変更、削除、またはチャート タイプ ドロップダウンに追加するには、`revealView.chartTypes` 配列内の項目を変更するだけです。

### チャート タイプの更新
既存のチャート タイプを更新するには、`revealView.chartTypes` プロパティでチャート タイプを見つけます。チャート タイプのさまざまなプロパティを変更して、チャート タイプ項目の名前変更、アイコンの変更、または再グループ化を行います。

```js
var barConfig = revealView.chartTypes.find(x => x.chartType == 'BarChart');
barConfig.title = 'My Cool Bar';
barConfig.icon = 'https://help.revealbi.io/img/logo.png';
barConfig.groups = ["Enterprise Visualizations", "HR", "Some Other Category"];
```

### チャート タイプの削除
削除するチャート タイプ項目のインデックスを見つけて、それを `chartTypes` 配列から削除することで、チャート タイプを削除します。

```js
var gridConfig = revealView.chartTypes.find(x => x.chartType == 'Grid');
revealView.chartTypes.splice(revealView.chartTypes.indexOf(gridConfig), 1);
```

### カスタム チャート タイプの追加
既存のチャート タイプ項目を更新および削除するだけでなく、カスタム可視化を新しいチャート タイプとして [チャート タイプ] ドロップダウンに追加することもできます。

```js
revealView.chartTypes.push({
    title: "Custom Viz",
    url: "https://host/customViz.html", //provide the url to your custom vizualization
    icon: "https://help.revealbi.io/img/logo.png",
    groups: ["Custom Vizualizations"]
});
```

## デフォルトのチャート タイプを設定する
デフォルトでは、Reveal SDK はデフォルトのチャート タイプとして `ColumnChart` チャートを設定します。デフォルトのチャート タイプを変更するには、`revealView.defaultChartType` プロパティを [RVChartType](https://help.revealbi.io/api/javascript/latest/enums/rvcharttype.html) 列挙メンバーの 1 つに設定します。

```js
revealView.defaultChartType = "StackedColumnChart";
```

デフォルトのチャート タイプをカスタム可視化に設定する場合は、`revealView.defaultCustomChartType` プロパティをカスタム可視化のタイトルに設定する必要があります。

```js
revealView.defaultChartType = "My Custom Viz";
```

:::info コードの取得

チャート タイプを示すサンプルは、[GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/ChartTypes) で見つけることができます。

:::
