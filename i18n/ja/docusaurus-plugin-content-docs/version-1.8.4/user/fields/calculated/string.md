---
title: 文字列計算フィールドを使用する方法
_description: 文字列計算フィールドを使用して、より正確なデータ可視化を作成する方法を説明します。
_language: ja
---

# 文字列計算フィールド

文字列計算フィールド (`sortinterval` 以外) はテキストを編集でき、さまざまな結果を取得することができます。

:::note
**文字列の間に引用符 (" ") を常に含めてください。**
:::

## 文字列関数

| **関数名** | **構文とサンプル**                                                                                                                                                     |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **concatenate**: `concatenate` は、複数の文字列 `text` を結合して句を構成できます。スペースは自動的には含まれません。必要な場合は、テキスト引数に含む必要があります。 | **構文**: `concatenate()`<br/>**サンプル**: `concatenate("Getting started", " with", " the", " Reveal", " application")`                                                  |
| **find**: `find` は、引数で指定した `text` の場合、2 つ目の文字列内の `text` の 1 つ目 の文字列の開始位置 (`number`) を返します。 | **構文**: `find({find text},{within text},{start number})`<br/>**サンプル**: `find("with","Getting Started with Reveal visualizations",3)`                                     |
| **len**: `len` は入力した `text` 文字列のすべて大文字を小文字へ変換します。 | **構文**: `len({text})`<br/>**サンプル**: `len("Getting Started with Reveal")`                                                                                                 |
| **lower**: `lower` は指定した `text` 文字列のすべて大文字を小文字へ変換します。 | **構文**: `lower({text})`<br/>**サンプル**: `lower("Getting Started with Reveal")`                                                                                             |
| **mid**: `mid` は引数で指定したことに基づいて指定した文字列 `text` の部分文字列 `length` を返します。 | **構文**: `mid({text},{start},{length})`<br/>**サンプル**: `mid("Getting Started with Reveal",9,12)`                                                                           |
| **replace**: `replace` は、指定した文字列 `text` を、引数で指定した別の `text` に置き換えます。 | **構文**: `replace({text},{old text},{new text})`<br/>**サンプル**: `replace("Getting Started with Reveal","Getting Started","Creating Visualizations with")`                  |
| **sortinterval**: `sortinterval` は、関数で設定された間隔で値を返します。`NN [from,to]` の書式として文字列が返されます。| **構文**: `sortinterval()`<br/>**サンプル 1**: `sortinterval(33,140)`**サンプル 2**: `sortinterval([Wage],150000)`**サンプル 3**: `sortinterval([Wage],50000,80000,110000,140000)` |
| **trim**: `trim` は、入力した `text` と同じ文字列を返しますが、先行または後続の空白を削除し、単語間の空白のみ保持します。 | **構文**: `trim({text})`<br/>**サンプル**: `trim(" Getting Started with Reveal ")`                                                                                             |
| **upper**: `upper` は指定した `text` 文字列のすべて大文字を小文字へ変換します。 | **構文**: `upper({text})`<br/>**サンプル**: `upper("Caution: Hot. Do not touch")`                                                                                              |



## Find

find 関数は、引数で指定した 1 つ目と 2 つ目の文字列の開始位置を返します。

### 構文

引数を 3 つ設定する必要があります。

  - `find text`: 検索するテキスト。

  - `within text`: 検索を実行するテキスト。

  - `start number`: 検索を開始する文字。

### サンプル

以下は上記の表のサンプルです。

| 関数名 | Find Text | Within Text                                    | Start Number | 出力 |
| :-----------: | :-------: | :--------------------------------------------: | :----------: | :----: |
| find(…​)      | `"with"`  | `"Getting Started with Reveal visualizations"` | `3`          | 15     |

検索は `Getting` の 最初の `t` で開始します。結果の 15 は `with` の `w` が位置する文字番号です。

| C. 1  | C. 2 | C. 3 | C. 4 | C. 5 | C. 6 | C. 7 | C. 8 | C. 9 | C. 10 | C. 11 | C. 12 | C. 13 | C. 14 | C. 15 |
| :---: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :---: | :---: | :---: | :---: | :---: | :---: |
| **t** | t    | i    | n    | g    |      | S    | t    | a    | r     | t     | e     | d     |       | **w** |

`with` が句で複数回繰り返される場合、計算フィールドは**単語の最初の発生**の文字を返します。


## Mid

mid 計算フィールドは関数の構成に基づいて指定した文字列の一部を返します。

### 構文

3 つのパラメーターを構成します。

  - `text`: 文字列を選択するテキスト。

  - `start`: 新しい部分文字列を開始する文字。

  - `length`: 部分文字列の長さ。

### サンプル

以下は上記の表のサンプルです。

| 関数名 | Text                            | Start | Length | 出力       |
| :-----------: | :-----------------------------: | :---: | :----: | :----------: |
| mid(…​)       | `"Getting Started with Reveal"` | `9`   | `12`   | Started with |

テキスト文字列の開始が文字 9 で始まり、12 文字であるため、出力は `Started with` です。

| C. 9  | C. 10 | C. 11 | C. 12 | C. 13 | C. 14 | C. 15 | C. 16 | C. 17 | C. 18 | C. 19 | C. 20 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **S** | **t** | **a** | **r** | **t** | **e** | **d** |       | **w** | **i** | **t** | **h** |


## Replace

Replace 関数は文字列を関数で指定した他の文字列と置き換えます。

### 構文

3 つの引数で構文されます。

  - `text`: 元の完全な文字列テキスト。

  - `old text`: 置き換えられるテキスト。

  - `new text`: 古いテキストを置き換えるテキスト。

### サンプル

以下はサンプルです。

<table style={{ width: '100%' }}>
    <tr>
        <th style={{ width: '15%' }}>関数名</th>
        <th style={{ width: '32%' }}>Text</th>
        <th style={{ width: '10%' }}>Old Text</th>
        <th style={{ width: '13%' }}>New Text</th>
        <th style={{ width: '30%' }}>出力</th>
    </tr>
    <tr>
        <td><code>replace(…​)</code></td>
        <td><code>"Using Reveal for iOS can be fast and easy. First, open the AppStore and look for Reveal. Then, install it. You're ready!"</code></td>
        <td><code>"Reveal"</code></td>
        <td><code>"our BI tool"</code></td>
        <td>Using <strong><code>our BI tool</code></strong> for iOS can be fast and easy. First, open the AppStore and look for <strong><code>our BI tool</code></strong>. Then, install it. You're ready!</td>
    </tr>
</table>


古いテキストはいずれの場合も置き換えられます。**変更する前に用語が表示されるたびに変更されることを考慮してください**。


## Sortinterval

sortinterval 関数は、関数で設定された間隔で値を返します。

### 構文

返却文字列の書式は `NN [from, to]` です。

### サンプル

以下は上記の表のサンプルです。

| 関数名    | 数値   | 間隔 |
| :--------------: | :------: | :------: |
| sortinterval(…​)  | `[Wage]` | `150000` |

この場合、`Wage` を 1 つの値に対して比較し、2 つのカテゴリ (150K より大きい、150K 未満) に分類します。
150K.

以下の例は、`Wage` が 4 つの異なる値に対して比較し、5 つのカテゴリ (50000 未満、50000 から 80000、80000 から 110000、110000 から 140000、140000 より大きい) に分類します。

| 関数名    | 数値   | 間隔 1 | 間隔 2 | 間隔 3 | 間隔 4 |
| :--------------: | :------: | :--------: | :--------: | :--------: | :--------: |
| sortinterval(…​)  | `[Wage]` | `50000`    | `80000`    | `110000`   | `140000`   |
