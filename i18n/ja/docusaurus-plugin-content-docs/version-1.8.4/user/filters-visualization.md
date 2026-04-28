---
title: 表示形式のクイック フィルターを適用する方法
_description: 表示形式のクイック フィルターを適用して表示形式コンテンツを動的にフィルターする方法を説明します。
_language: ja
---

# 表示形式のクイック フィルター

表示形式レベルでは、「クイック」フィルターを適用することもできます。これにより、クイック フィルターの選択が変更されたときに表示形式コンテンツを動的にフィルターできます。これらは、ダッシュボード定義の一部となり、ダッシュボードのユーザーが変更することはできません。

クイック フィルターを定義するには、表示形式エディターで表示形式の上にある **[表示形式フィルターの追加]** ボタンを選択します。

![Visualization Quick Filter button in the Visualization Editor](images/visualization-quick-filter-example.png)

フィルター オプションは、フィールドのデータ タイプに応じて表示形式フィルター エリアで表示されます。テキスト、数値、日付の 3 つのフィルター ダイアログがあります。作成されたクイック フィルターは、表示形式エディターの表示形式の上に表示されます。

![List of fields in the visualization editor](images/visualization-filter-visualization-editor.png)

ダッシュボード ビュー モードで表示形式を最大化すると、表示形式のタイトルの下に表示されます。

![The location of the visualization filter in dashboard view maximized](images/location-visualization-filter.png)

[ダッシュボード フィルター](filters-dashboard.md)同様に、簡易フィルター セクションが変更されると表示形式コンテンツの動的なフィルターが有効になります。

## フィルターのカスケード

クイック フィルターで表示される選択可能な値のリストは、以前のクイック フィルター選択に基づいてフィルターされます。左側のフィールドが優先され、右側のフィルターに表示される選択可能な値のリストを決定します。

たとえば、以下の例では、*Office* フィルターが最初に作成され、*Fullname* フィルターがその後に作成されました。すべての Office を選択すると、*County* のリストは次のようになります。

![Cascading Filter for the State Population Dashboard showing counties in Colorado](images/cascading-filter.png)

ただし、**Cranbury, New Jersey, USA** と **Montevideo, Uruguay** のオフィスを選択した場合は、*County* のリストは異なります。

![Cascading Filter for the State Population Dashboard showing counties in Arkansas](images/cascading-filter-second-filter.png)

