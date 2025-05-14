---
title: Reveal で KPI ゲージ チャートを作成する方法
_description: サンプルス プレッドシートを使用して KPI ゲージの表示形式を作成する方法を説明します。
_language: ja
---

# KPI ゲージを作成

このチュートリアルでは、サンプル スプレッドシートを使用して KPI ゲージの表示形式を作成する方法を説明します。

| | |
|:---:|:---:|
| ![KPIGaugeSimple All](images/KPIGaugeSimple_All.png) <br/> [KPI ゲージ](#kpi-ゲージの作成) | ![TutorialMultipleKPIGauges All](images/TutorialMultipleKPIGauges_All.png) <br/> [複数の KPI ゲージ](#1-つの表示形式で複数の-kpi-ゲージを作成する方法) |
| ![KPIGaugePreviousMonth All](images/KPIGaugePreviousMonth_All.png) <br/> [月ごとの KPI ゲージ](#日付比較タイプの変更) | ![KPIGaugeValuePercentage All](images/KPIGaugeValuePercentage_All.png) <br/> [値とパーセンテージの違いがある KPI ゲージ](#kpi-ゲージの差分ラベルの変更) |
| ![KPIGaugeDifferenceColor All](images/KPIGaugeDifferenceColor_All.png) <br/> [値が減少したときに緑色のマーカーが付いた KPI ゲージ](#差分マーカーの色の変更) | |

## 重要なコンセプト

KPI ゲージは、特定の期間内のパフォーマンスとその変動を表示するためのものです。作成するには、次のものが必要です:

  - データエディターの **[日付]** プレースホルダーにドロップする **1 つのフィールド**。

  - **[値]** にドロップする **1 つのフィールド**。

## サンプル データ ソース

このチュートリアルでは、<a href="/data/Reveal_Visualization_Tutorials.xlsx" download>Reveal Visualization Tutorials</a> の「KPI View」シートを使用します。

## KPI ゲージの作成

1. オーバーフロー メニューで **[編集]** を選択します。

   ![Edit button in overflow menu](images/overflow-edit-option.png)                                      

2. 右上隅にある **[+ 表示形式]** ボタンを選択します。

   ![Add new visualization button](images/add-visualization-button.png)                                      

3. データ ソースのリストからデータ ソースを選択します。

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)                                          

4. **KPI View** シートを選択します。 

   ![Selecting a KPI Gauge](images/Tutorials-Select-KPI-Gauge-Spreadsheet.png)

5. **表示形式ピッカー**を開き、**KPI vs Time** を選択します。デフォルトで、表示形式のタイプは**柱状**に設定されています。 

   ![Select Change Visualization option](images/gauge-kpi-chart-type.png)

6. *Date* フィールドを [日付] に、*Sales* フィールドを [値] に、*State* フィールドを [カテゴリ] にドラッグアンドドロップします。

   ![Select KPI Gauge](images/Tutorials-KPIGauge-Organizing-Data.png)

## 1 つの表示形式で複数の KPI ゲージを作成する方法

1 つの表示形式で複数の KPI を作成するには、データ エディターの**カテゴリ** プレースホルダーにフィールドを追加する必要があります。

1. オーバーフロー メニューで **[編集]** を選択します。

   ![Edit button in overflow menu](images/overflow-edit-option.png)

2. 右上隅にある **[+ 表示形式]** ボタンを選択します。

   ![Add new visualization button](images/add-visualization-button.png)

3. データ ソースのリストからデータ ソースを選択します。

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)

4. **KPI View** シートを選択します。 
  
   ![Selecting a KPI Gauge](images/Tutorials-Select-KPI-Gauge-Spreadsheet.png)
         
5. **表示形式ピッカー**を開き、**KPI vs Time** を選択します。デフォルトで、表示形式のタイプは**柱状**に設定されています。 

   ![Select Change Visualization option](images/gauge-kpi-chart-type.png)

6.  *Date* フィールドを [日付] に、*Sales* フィールドを [値] に、*State* フィールドを [カテゴリ] にドラッグアンドドロップします。          
  ![Tutorials-MultipleKPIGauge-Organizing-Data](images/Tutorials-MultipleKPIGauge-Organizing-Data.png)

## 日付比較タイプの変更

デフォルトでは、KPI ゲージの日付タイプは前年比になります。[タイプ] フィールドを変更することでこれを変更できます。以下は変更手順です。

|                                  |                                                                        |                                                                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **設定メニューにアクセスする** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png) | 表示形式エディターの **[設定]** セクションに移動します。                                                                                    |
| 2\. **タイプを変更する**          | ![Tutorial-Change-Date-Type](images/Tutorial-Change-Date-Type.png)     | デフォルトでは、日付のタイプは **[今年と前年]** に設定されます。**[期間]** の横にあるドロップダウンを選択し、選択を **[今月と先月]** に変更します。 |

## KPI ゲージの差分ラベルの変更

|                                  |                                                                                            |                                                                                                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **設定メニューにアクセスする** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)                     | 表示形式エディターの **[設定]** セクションに移動します。                                                                                                             |
| 2\. **タイプを変更する**          | ![Tutorial-Change-Date-Difference-Label](images/Tutorial-Change-Date-Difference-Label.png) | デフォルトで、差分ラベルは**パーセンテージ**に設定されています。 **[差異の表示]** の横のドロップダウンを選択し、選択を **[値とパーセンテージ]** に変更します。 |

## 差分マーカーの色の変更

デフォルトでは、KPI ゲージのマーカーの色は、正の値の場合は緑、負の値の場合は赤に設定されます。ただし、減少をプラスとして表現したい場合もあります。以下は設定方法です。

|                                  |                                                                                                          |                                                                                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **設定メニューにアクセスする** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)                                   | 表示形式エディターの **[設定]** セクションに移動します。                                                                                                 |
| 2\. **タイプを変更する**          | ![Tutorial-Change-Date-Difference-Marker-Color](images/Tutorial-Change-Date-Difference-Marker-Color.png) | デフォルトでは、マーカーの色は緑に設定されます。**[値の増加を表す色]** の横のドロップダウンを選択し、選択を **[赤色]** に変更します。 |
