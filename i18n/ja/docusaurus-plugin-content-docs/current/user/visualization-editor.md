---
title: 表示形式エディターの使用方法
_description: 表示形式を作成および編集し、さまざまなオプションを使用する方法をご覧ください。
_language: ja
---

# 表示形式エディター

**表示形式エディター**は、Reveal で表示形式を作成および編集する場所です。ここでは、データセットからのデータが集約されて使用できるように準備されているほか、それを使用して構築するためのさまざまな表示形式が表示されます。

## 表示形式の作成方法

表示形式は、ダッシュボードの基本要素です。したがって、表示形式の作成を開始するときに、開始点には ２ つの選択肢があります。

* **新しいダッシュボードを作成する**ことから始めます。このダッシュボードでは、新しい表示形式が最初または唯一の表示形式になります。これを行うには、青い **[+ 表示形式]** ボタンをクリックまたはタップします。

* 既存のダッシュボードに**新しい表示形式を追加する**ことから始めます。これを行うには、右上隅のオーバーフロー ボタンを選択し、**[編集]** をクリックまたはタップして、**[+ 表示形式]** の青いボタンをクリックまたはタップします。

その後、新しいデータ ソースを追加するか、既存のデータ ソースを選択するように求められます。

![Dialog with a list of data sources](images/new-visualization-screen.png)

データ ソースを選択して構成すると、[表示形式エディター](visualization-editor.md)に移動し、表示形式の作成を開始できます。

表示形式エディターは、データを使用して最も望ましいビューを作成するのに役立ちます。

## 表示形式エディターにアクセスする

表示形式エディターには、次の 2 つの方法でアクセスできます。

**1. 表示形式作成プロセス**

データ ソースを選択して設定すると、**表示形式エディター**が自動的に開きます。

**2. ダッシュボード編集プロセス**

選択したダッシュボードを開き、**ダッシュボード編集**モードに入ると、表示形式のオーバーフロー ボタンから **[編集]** を選択して、**表示形式エディターにアクセス**できます。または、オーバーフロー メニューの横にある鉛筆アイコンをクリックまたはタップすることもできます。

## 表示形式エディターの概要

以下は、**エディター**のすべてのセクションとその機能のリストです。

![Sections of the Visualization editor](images/visualizations-editor-sections.png)

1. **[データ] セクション** - このセクションには 2 つのパネルがあります。
    1. **[フィールド]** - データ ソース内で使用可能なすべてのフィールドが左側のパネルに表示されます。各フィールドには、フィールド タイプ (**日付**、**値**、**テキスト**) をユーザーに通知するインジケーターがあります。使用可能なフィールドが 10 を超えると、検索バーが表示されます。このパネルの **[+]** アイコンを使用すると、データ ソースをブレンドするか、フィールドを計算することができます。**脳**アイコンを使用すると、BigQuery または Azure の**機械学習モデル**のフィールドを表示形式に使用できます。BigQuery 機械学習モデルは、BigQuery データ ソースでのみ機能することにご注意ください。
    2. **表示形式フィールド** - ここでフィールドをドラッグアンドドロップするか、**[+]** マークをクリックして使用可能なフィールドから作成する表示形式に使用するフィールドを選択します。

2. **[設定] セクション** - このセクションでは、表示する内容をカスタマイズできます。各表示形式には独自の設定があります。 **[設定]** セクションの下部に、リンクのオプションが表示されます。これは、ドリル ダウンを全く新しいレベルに到達させる強力な機能です。詳細については、[ダッシュボード リンク](dashboard-linking.md) トピックをご覧ください。

3. **表示形式ピッカー** - ここで目的の表示形式を選択して、最終結果をプレビューできます。ドロップダウン メニューでさまざまなチャート タイプを切り替えると、表示形式フィールドのセクションが変更されます。各表示形式のフィールドは異なりますが、入力するだけで自動的に変更されます。

4. **表示形式のワークスペース** - フィールドをドラッグアンドドロップしながら作成または編集している表示形式を確認できます。そのチャート タイプを作成するために必要なすべてのフィールドが揃うまで、表示形式は入力されません。

5. **データ ソース** - 現在使用しているデータ ソースがここに表示されます。クリックによってデータ ソース内のシート、テーブル、またはビューを変更し、またエディターを離れることなく、接続を新しいデータ ソースへ完全に変更できます。

特に、次のことが可能になります。
- データの**並べ替え**と**フィルター**
- データ エディターの**集計データ**。
- データの**検索**、**視覚化**、および**書式設定**。

表示形式の作成を完了したら、**チェック** アイコンを選択して**ダッシュボード エディター**に戻ります。ダッシュボード エディターでは、表示形式をドラッグしてレイアウト、サイズ、配置を操作できます。ダッシュボードの書式設定とスタイル設定の準備ができたら、**チェック** アイコンをもう一度クリックまたはタップしてダッシュボードを保存します。