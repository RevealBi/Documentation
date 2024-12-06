---
title: Reveal で集計計算フィールドを使用する方法
_description: 集計数式を使用するさまざまなヒントとコツを説明します。
_language: ja
---

# 集計計算フィールド


集計式は、値の分析、再編成、含まれる情報の要約など、元のデータ ソースを使用して作業する場合に便利です。異なる値 (`average` など) の計算や最大 (`max`) / 最小 (`min`) の検索に使用することも可能です。そのため、**すべての数式**は**数値フィールドのみで使用します**。

Reveal では、集計計算フィールドに以下が含まれます。

- **標準関数**: 各情報は、「関数名」の下の対応するハイパーリンクをクリックします。

- **if 文を含む標準関数**: [このセクション](#if-文のある計算フィールド)は、if 文 ([ネスト if 文](#ネスト-if-文のサンプル)を含む) の詳細および構成方法について説明します。

:::note
以下の表のすべてのサンプルは <a href="/data/HR%20Dataset_2016.xlsx" download>HR Dataset 2016</a> スプレッドシートで作成されました。
:::

## 集計関数

| 関数名と説明 | 関数の構文 | サンプル |
|-------------------------------|-----------------|--------|
| **average**: `average` 集計は、選択した `expression` のすべての行の平均値で計算される数値を返します。 |  `average({expression})` | `average([Wage])` |
| **averageif**: if-condition のある正則関数を使用する場合、結果が条件内で定義される特定の条件を満たす必要があります。 |  `averageif({expression},{if-condition})` | `averageif([Wage],[OfficeId]=1)` |
| **count**: `count` 集計は、データ ソースの行数である数値を返します。 |  `count()` | `count()` |
| **countif**: if-condition のある正則関数を使用する場合、結果が条件内で定義される特定の条件を満たす必要があります。 |  `countif({if-condition})` | `countif([OfficeId]=1)` |
| **max**: `max` 集計は、選択した `expression` の最大値となる数値を返します。 |  `max({expression})` | `max([Wage])` |
| **maxif**: if-condition のある正則関数を使用する場合、結果が条件内で定義される特定の条件を満たす必要があります。 |  `maxif({expression},{if-condition})` | `maxif([Wage],[OfficeId]=1)` |
| **min**: `min` 集計は、選択した `expression` の最小値となる数値を返します。 |  `min({expression})` | `min([Wage])` |
| **minif**: if-condition のある正則関数を使用する場合、結果が条件内で定義される特定の条件を満たす必要があります。 |  `minif({expression},{if-condition})` | `minif([Wage],[OfficeId]=1)` |
| **sum**: `sum` 集計は、選択した `expression` のすべての行の合計として算出された数値を返します。 |  `sum({expression})` | `sum([Wage])` |
| **sumif**: if-condition のある正則関数を使用する場合、結果が条件内で定義される特定の条件を満たす必要があります。 |  `sumif({expression},{if-condition})` | `sumif([Wage],[OfficeId]=1)` |


## IF 文のある計算フィールド

`if-condition` のある正則関数 (`expression` が必要) を使用する場合、結果が条件内で定義される特定の条件を満たす必要があります。

### 構文

デフォルトでは、IF サフィックスのある関数を選択した際に以下の構成が表示されます。

`XXXXXXIF({expression},{if-condition})`

2 つの引数を定義する必要があります。

- `expression`:  データ ソースのフィールドの 1 つを選択します。

- `if-condition`: if 条件は論理テストの実行が必要です。`if-condition` の `logical test` は、集計を計算するための式に必要な条件です。

### 基本サンプル

たとえば、上記の表の例です。

`averageif([Wage],[OfficeId]=1)`

より明確にするために関数を上記で定義した用語に基づいて区別します。

| 関数名  | 式 | IF 文  |
| :------------: | :--------: | :-----------: |
| averageif (…​)  | [Wage]     | [OfficeId]=1 |

以下は数値以外の場合の例です。

`sumif([Wage],[Department]="Development")`

説明:

| 関数名  | 式 | IF 文  |
| :------------: | :--------: | :-----------: |
| sumif (…​)      | [Wage]     | [OfficeId]=1 |

### ネスト IF 文のサンプル

論理演算子 (AND、OR) を前に使用してネスト IF 文を使用できます。

以下は if 文が 2 つある例ですが、if 文を使用する際の上限はありません。

`maxif([Wage], and([OfficeId]=1, [Department]="Development"))`

説明:

| 関数名 | 式 | 論理演算子 |
|:----------:| :--------: | :--------------: |
| maxif (…​) | [Wage]     | and              |

`if-condition` のステートメント:

| 最初の論理テスト | true の場合の値 | false の場合の値 |
| :----------------: | :-----------: | :------------: |
| [OfficeId]=1       | 1             | 0              |

| 2 番目の論理テスト        | true の場合の値 | false の場合の値 |
| :------------------------: | :-----------: | :------------: |
| [Department]="Development" | 1             | 0              |

論理演算子が `and` であるため、実行する `maxif` 集計の両方の条件が true である必要があります。