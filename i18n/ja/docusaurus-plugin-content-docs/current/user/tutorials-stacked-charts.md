---
title: Reveal で積層型チャートの表示形式を作成する方法
_description: サンプルス プレッドシートを使用して積層型チャートの表示形式を作成する方法を説明します。
_language: ja
---

# 積層型チャートを作成する方法

このチュートリアルはサンプル スプレッドシートを使用し**積層型**チャートを作成する方法を説明します。

![Tutorials-Create-New-Dashboard](images/different-stacked-charts-example.png)  

## 重要なコンセプト

積層型チャートは、3 つのレイアウトから選択できます - [エリア](#積層型チャートの作成)、[柱状](#積層型チャートの作成)および[棒](#積層型チャートの作成)。

以下の項目も設定できます。

  - **軸の構成**: 軸の構成でチャートの最大値と最小値を構成できます。デフォルトで最小値は 0 に設定され、最大値は使用されるデータによって設定されます。

      - **対数軸構成**: [対数] ボックスをチェックする場合、値のスケールは通常のリニア スケールを使用する代わりに大きさを使用するリニア スケール以外で計算されます。

## サンプル データ ソース

このチュートリアルでは、<a href="/data/Reveal_Visualization_Tutorials.xlsx" download>Reveal Visualization Tutorials</a> の *Stacked Charts* シートを使用します。


## 積層型チャートの作成

1. オーバーフロー メニューで **[編集]** を選択します。

   ![Edit button in overflow menu](images/overflow-edit-option.png)                                      

2. 右上隅にある **[+ 表示形式]** ボタンを選択します。

   ![Add new visualization button](images/add-visualization-button.png)                                      

3. データ ソースのリストからデータ ソースを選択します。

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)                                          

4. **Stacked Charts** シートを選択します。 

   ![Stacked Charts Spreadsheet in the tutorial data source](images/stacked-chart-spreadsheet-data-source-details-dialog.png)

5. **表示形式ピッカー**を開き、**積層型**表示形式のいずれかを選択します。デフォルトで、表示形式のタイプは**柱状**に設定されています。 

   ![List of stacked chart types](images/stacked-chart-types.png) 
 
6. 積層型チャートでは、データ エディターの **[値]** プレースホルダーに 2 つ以上のフィールドをドラッグ アンド ドロップする必要があります。今の例で、*1960*、*2003*、*2008* と *2010* を **[値]** へ、*Country Name* を **[ラベル]** へドラッグアンドドロップします。

   ![Organizing the data from the stacked charts spreadsheet](images/stacked-charts-organizing-data.png)                           

## 軸の構成の変更

[ゲージの範囲](tutorials-gauge.md#ゲージ表示形式に範囲を追加する方法)と同様に、チャート軸構成でチャートの最小と最大値を設定できます。この機能を使用して、特定のデータ含有や除外ができます。

|                                        |                                                                                      |                                                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **設定を変更する**                | ![Settings section](images/tutorials-settings.png)               | 表示形式エディターの **[設定]** セクションに移動します。                                                                           |
| 2\. **範囲の設定にアクセスする** | ![Tutorials-Axis-Bounds](images/axis-bounds.png)                           | [軸範囲] に移動します。最大値または最小値 (または両方) 値を設定するかどうかに基づいて、チャートの開始値または終了値を入力します。  |                                                                                                          

## 軸を対数軸として設定

|                                           |                                                                          |                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1\. **設定を変更する**                   | ![Tutorials-Navigate-Settings](images/tutorials-settings.png)   | 表示形式エディターの **[設定]** セクションに移動します。 |
| 2\. **軸のオプションにアクセスする**            | ![Tutorials-Axis-Bounds](images/axis-bounds-logarithmic.png)               | 下矢印を選択して、軸ドロップダウンを展開します。次に、[対数] を選択します。|      

## パーセンテージの配分を有効します。

積層型チャートにパーセンテージの配分も構成できます。このタイプのチャートに値とパーセンテージの配分スケールを切り替えます。以下は作業手順です。

|                                        |                                                                                    |                                                                                           |
| -------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1\. **設定を変更する**                | ![Tutorials-Navigate-Settings](images/tutorials-settings.png)             | 表示形式エディターの **[設定]** セクションに移動します。                               |
| 2\. **パーセンテージの配分を有効にする** | ![Tutorials-Percentage-Distribution](images/percentage-distribution.png) | [パーセンテージの配分] ボックスをチェックして、パーセンテージの配分設定を有効にします。 |
