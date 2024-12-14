---
title: ピボット テーブルの表示形式を作成する方法
_description: Reveal でピボット テーブルの表示形式を作成して使用する方法を説明します。
_language: ja
---

# ピボット テーブル


ピボット テーブルの表示形式により、ユーザーは、**データ** セクションの対応するプレースホルダーにフィールドをドロップすることで情報を集約できます。

![Pivot Table Visualization](images/pivot-table.png)

行、列、または値のデータ エディターのプレースホルダーにフィールドが追加されているときに、フィールドを選択すると、そのフィールドの要約された設定が表示されます。

  - **[値]** プレースホルダー内のフィールドでは、使用される要約関数 (average、count、sum など) を構成できます。

  - **[行]** のプレースホルダーに日付フィールドをドロップすると、要約の詳細レベル (年、月、日) を選択できます。

## ピボット テーブルの概要

ピボット テーブルは、データ集計ツールです。このツールは、通常値によってグループ化された、表のような形式で保存されたデータを自動的に集計し、平均し、合計することを可能にします。たとえば、以下のテーブルがあるとします。


| Salesman | Region    | Product  | OrderID | OrderTotal |
| -------- | --------- | -------- | ------- | ---------- |
| JOHN A.  | Americas  | ProductX | 1001    | 10         |
| ERICK B. | Americas  | ProductY | 1002    | 20         |
| PETE C.  | EMEA      | ProductX | 1003    | 30         |
| DAVID D. | China     | ProductZ | 1004    | 10         |
| JORGE E. | Australia | ProductY | 1005    | 5          |

以下の解析のタイプを実行します。

|          | Americas | EMEA | China | Australia | Total |
| -------- | -------- | ---- | ----- | --------- | ----- |
| PRODUCTX | 10       | 30   |       |           | 40    |
| PRODUCTY | 20       |      |       | 5         | 25    |
| PRODUCTZ |          |      | 10    |           | 10    |

ピボット テーブルを使用して実行できます。

  - *Product* フィールドを **[行]** プレースホルダーにドラッグアンドドロップし、すべての製品を行として表示します。

  - *Region* フィールドを **[列]** プレースホルダーにドラッグアンドドロップし、*Region* フィールドの各値に動的なテーブルの列を作成します。