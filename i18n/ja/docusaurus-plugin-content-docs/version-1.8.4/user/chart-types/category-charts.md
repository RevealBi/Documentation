---
title: 表示形式にカテゴリ チャートを使用する方法
_description: カテゴリ チャートを使用して表示形式を向上させる方法を説明します。
_language: ja
---

# カテゴリ チャート

これらのチャートを使用して、カテゴリを定量的情報に関連付けます。

![Category charts variations](images/category-charts-list.png)

データに適している限り、表示形式オプション メニューに表示されたチャート アイコンをどれでも選択できます。Reveal はデータセットの最初の数字の列を選択し、選択したチャート タイプのデータ系列の要件と一致させようと試みます。

![Various charts visualizations in a dashboard](../images/various-charts-example.png)

たとえば、柱状チャートでは、すべての数値列がチャートに追加されます。Reveal の列の自動選択は、チャートの設定の構成で変更できます。

## チャートの近似曲線

チャートの設定で近似曲線の表示を有効にできます。このラインはアルゴリズムに基づいてチャートにラインを表示します。近似曲線でデータセットの傾向を把握し、意思決定のためのしきい値を定義できます。サポートされるトレンド ラインは、二次フィット、キュービック フィット、四次フィット、対数フィット、指数フィト、べき乗フィット、単純平均、指数平均、修正平均、累加平均、加重平均です。

![Chart trendline options](images/chart-trendline-option.png)

## パーセンテージの配分

積層型シリーズ チャートにもこの機能を構成できます。0-100 のデフォルト スケールを上書きして、チャートで値のパーセンテージ配分を表示形式できます。

![Pivot editor view stacked percentage distribution setting](images/percentage-distribution-option-stacked-series-charts.png)

## 開始位置とスライス ラベル

**円チャート**および**ドーナツ型チャート**でチャートのスライスを回転する開始位置を構成し、データの表示順序を変更できます。

![Start position setting while using a doughnut chart](images/start-position-setting-doughnut-chart-example.png)

**ファンネル**、**円チャート**、および**ドーナツ型**チャート、値やパーセンテージ、またはその両方を同時に表示するスライス ラベルを構成できます。

![Pivot editor slice labels setting](images/slice-label-setting-doughnut-chart-example.png)

## 値 0 の要素を表示するために円チャートおよびドーナツ チャートの凡例を有効化

円およびドーナツ チャートの表示形式の凡例には、**[ラベル]** に選択されたフィールドのすべてのデータ (値 0 の要素を含む) を表示するオプションがあります。

この設定を有効にするには、以下の画像のように、表示形式エディターの **[設定]** に移動し、**[0 (ゼロ) 値を凡例に表示]** を選択します。

![Enabling the legend setting in the visualization editor](images/pie-chart-example-legends-value-zero-setting.png)

