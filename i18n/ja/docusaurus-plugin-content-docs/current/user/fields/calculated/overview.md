---
title: 計算フィールドを使用する方法
_description: 計算フィールドとそのすべてのタイプを使用して、より正確なデータ可視化を作成する方法を説明します。
_language: ja
---

# 計算フィールド

Reveal では、計算フィールドというフィールドをデータセットに定義することができます。フィールドは、式 (数式) を使用して作成されます。式は、既存のフィールド、定数値、および以下の組み合わせにすることができます。

  - [定義済み関数](#reveal-定義済み関数の使用)

  - [単純な数学関数および定義されていない他の関数](#定義済み関数を使用せず計算フィールドを作成)。

以下の 2 種類の計算フィールドがあります。

  - [事前計算](#事前計算フィールド) (計算済み)

  - [事後計算](#事後計算フィールド)。


## 事前計算フィールド

事前計算フィールドは、データ エディターの集計を実行する前に評価されます。つまり、特定の数式を適用するために、Reveal はフィールドのデータセット内のすべてのレコードを 1 回または複数回調べます。そのため、大規模なデータセットを使用する場合、事前計算のパフォーマンスが低下する可能性があります。

新しい計算フィールドを追加するには、**[フィールド]** パネルの **[+]** ボタンをクリックまたはタップし、**[計算フィールド]** を選択します。

![Pre-calculated field option](images/calculated-field-option.png)

[計算フィールドの作成] 画面が開きます。

![New calculated field dialog](images/new-calculated-field-dialog.png)

以下の手順を実行します。

1.  新しい計算フィールドに名前を割り当てます。

2.  数式 (式) を入力します。[フィールド] セクションで、すべての既存のフィールドのリストがら選択できます。1 つ以上のフィールドを使用して (選択したフィールドをクリックまたは角括弧で名前を入力) 数式を作成できます。[関数] セクションにリストされている定義済み関数のいずれかを選択して、または単純な数学計算を使用します (上記に表示)。

新しい計算フィールドは、フィールド リストの下部に表示されます。

![New calculated field shown in the column placeholder and in the visualization](images/new-calculated-field-visualization-example.png)

上記の例では、集計がデータ フィールドに適用されていないグリッドの可視化で新しい計算フィールドが使用されます。事前計算フィールドは、**ピボット グリッド**でも使用できます。この場合、計算は事前計算フィールドで集計されたレコードに適用されます。


## 事後計算フィールド

**データ エディター**でデータ フィールドの集計を実行する**ピボット テーブル**やその他の表示形式を使用する場合、事後計算フィールドを作成できます。事後計算フィールドは、すでに集計された値に数式を適用することによって常に作成されます。

事後計算フィールドを作成する手順:

1.  **データ エディター**でデータ ソースからフィールドを追加して、表示形式 (または**ピボット テーブル**) を作成します。

  ![Post calculated fields in the Data editor](images/post-calculated-field-example.png)

2.  **[値]** の横にある **[F(x)]** ボタンをクリック/タップして、**[計算フィールドの作成]** 画面を開きます。

  ![Post calculated field new calculated field screen](images/post-calculated-field-new-calculated-field-dialog.png)

3.  計算フィールドに名前を付け、集計値に数式を適用します。注: **値**のリストには、集計後に表示形式で使用したデータ フィールドが含まれています (*Spend*、*Budget* ではなく、*Sum of Spend*、*Sum of Budget*)。

**データ エディター**に含まれていないデータ ソースの他のフィールドを使用する場合は、**[値]** の横の **[+]** ボタンをクリックまたはタップして追加できます。事後計算フィールドは集計値のみで作成されるため、最初にデータ フィールドで実行する集計をドロップダウン リストから選択する必要があります。

![Adding fields in the calculated field screen](images/post-calculated-field-new-calculated-field-dialog-adding-fields.png)

**手順 1** をスキップして、最初に事後計算フィールドを作成するか、表示形式で事後計算フィールドのみを使用することもできます。

大規模なデータセットを使用する場合、事後計算は事前計算よりパフォーマンスが向上します。


## Reveal 定義済み関数の使用

事前計算フィールドと事後計算フィールドの両方で、Reveal で使用可能な機能のいずれかを使用できます。

  - [**集計**](aggregation.md):
    [average](aggregation.md#集計関数)、
    [averageif](aggregation.md#集計関数)、
    [count](aggregation.md#集計関数)、
    [countif](aggregation.md#集計関数)、
    [max](aggregation.md#集計関数)、
    [maxif](aggregation.md#集計関数)、
    [min](aggregation.md#集計関数)、
    [minif](aggregation.md#集計関数)。

  - [**日付**](date.md):
    [date](date.md#日付関数)、
    [datevalue](date.md#日付関数)、
    [day](date.md#日付関数)、
    [formatdate](date.md#日付関数)、
    [fquarter](date.md#日付関数)、
    [semester](date.md#日付関数)、
    [fsemester](date.md#日付関数)、
    [fyear](date.md#日付関数)、
    [hour](date.md#日付関数)、
    [millisecond](date.md#日付関数)、
    [minute](date.md#日付関数)、
    [month](date.md#日付関数)、
    [monthname](date.md#日付関数)、
    [monthshortname](date.md#日付関数)、
    [applytimezone](date.md#日付関数)、
    [currenttimezone](date.md#日付関数)、
    [datetimefromunixts](date.md#日付関数)、
    [now](date.md#日付関数)、
    [quarter](date.md#日付関数)、
    [second](date.md#日付関数)、
    [time](date.md#日付関数)、
    [today](date.md#日付関数)、
    [weekday](date.md#日付関数)、
    [weeknum](date.md#日付関数)、
    [year](date.md#日付関数)。

  - [**情報**](information.md):
    [empty](information.md#情報関数)、
    [isempty](information.md#情報関数).

  - [**論理**](logic.md):
    [and](logic.md#論理関数)、
    [false](logic.md#論理関数)、
    [if](logic.md#論理関数)、
    [not](logic.md#論理関数)、
    [or](logic.md#論理関数)、
    [true](logic.md#論理関数)。

  - [**検索/行列**](lookup-reference.md):
    [previous](lookup-reference.md#検索行列関数)、
    [row](lookup-reference.md#検索行列関数).

  - [**数学**](math.md):
    [abs](math.md#数学関数)、
    [exp](math.md#数学関数)、
    [log](math.md#数学関数)、
    [log10](math.md#数学関数)、
    [mod](math.md#数学関数)、
    [rand](math.md#数学関数)、
    [randbetween](math.md#数学関数)、
    [sign](math.md#数学関数)、
    [sqrt](math.md#数学関数)、
    [trunc](math.md#数学関数)。

  - [**文字列**](string.md):
    [concatenate](string.md#文字列関数)、
    [find](string.md#文字列関数)、
    [len](string.md#文字列関数)、
    [lower](string.md#文字列関数)、
    [mid](string.md#文字列関数)、
    [replace](string.md#文字列関数)、
    [sortinterval](string.md#文字列関数)、
    [trim](string.md#文字列関数)、
    [upper](string.md#文字列関数)。

:::note
**IF 条件の制限**。事前計算のフィールドの集計関数に含まれる場合、IF 条件には既知の制限があります。計算式内の IF 条件を確認するためにすべてのレコードを複数回調べる必要があり、パフォーマンスが低下する問題が発生するため、サポートされていません。:::

## 定義済み関数を使用せず計算フィールドを作成

定義済み関数を使用せずに計算フィールドを作成することもできます。たとえば、減算、除算、加算、乗算などの単純な数学計算用。[こちらの表](samples.md)には、定義済み関数を使用しない例があります。

## Reveal の関数を使用する際に注意すること

  - テキスト文字列は引用符で囲む必要があります。例えば、ロケール ("en") および日付書式 ("dd/mm/yyyy")。

  - 数式に含まれるフィールドは角括弧で囲む必要があります。たとえば、HR データセットの [Wage]、[BirthDate]、[EmployeeID] などです。
