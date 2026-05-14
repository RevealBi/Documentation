---
title: 検索/行列計算フィールドを使用する方法
_description: 検索/行列計算フィールドを使用してダッシュボードの詳細情報を取得する方法を説明します。
_language: ja
---

# 検索/行列計算フィールド


検索/行列フィールドは、現在のスプレッドシートとダッシュボードで動作し、セル、行、ダッシュボード変数へのテキスト参照を返します。

:::note
以下の表のすべてのサンプルは **<a href="/data/HR%20Dataset_2016.xlsx" download>HR Dataset 2016 スプレッドシート</a>で作成されました。**
:::

## 検索/行列関数

| **関数名** | **構文とサンプル**                                                                   |
|-------------------|-----------------------------------------------------------------------------------------|
| [**previous**](#previous): `previous` は、`expression` として選択したフィールドの値で結果を取得できます。 | **構文**: `previous({expression},{first value})`<br/>**サンプル**: `previous([Wage],1)` |
| **row**: `row` は、データ ソース内のすべての行の現在の行の番号を返します。 | **構文**: `row()`<br/>**サンプル**: `row()`                                                  |



## Previous

前の計算フィールドでは、`expression` で選択したフィールドの値で結果を取得できます。引数を 2 つ設定します。

  - `expression`:  データ ソースのフィールドの 1 つ。

  - `first value`:  デフォルトで空の最初の行の値。

### サンプル

以下は、<a href="/data/HR%20Dataset_2016.xlsx" download>HR Dataset 2016</a> の「Employees」シートを抽出したものです。

| EMPLOYEEID | FULLNAME          | DEPARTMENT  | OFFICE                    | WAGE     |
| ---------- | ----------------- | ----------- | ------------------------- | -------- |
| 1.00       | Joan Baez         | Development | Montevideo, Uruguay       | 36542.00 |
| 2.00       | Zurbuch Thompson  | Development | Cranbury, New Jersey, USA | 76865.00 |
| 3.00       | Zimmermann Miller | Development | Cranbury, New Jersey, USA | 73768.00 |
| 4.00       | Zurcher Reid      | Development | Sofia, Bulgaria           | 36018.00 |

以下の計算フィールドを追加します。

`previous([Wage],1)`

以下は計算フィールドの結果です。

| EMPLOYEEID | FULLNAME          | DEPARTMENT  | OFFICE                    | WAGE         | previous Field |
| ---------- | ----------------- | ----------- | ------------------------- | ------------ | -------------- |
| 1.00       | Joan Baez         | Development | Montevideo, Uruguay       | **36542.00** | **1.00**       |
| 2.00       | Zurbuch Thompson  | Development | Cranbury, New Jersey, USA | **76865.00** | **36542.00**   |
| 3.00       | Zimmermann Miller | Development | Cranbury, New Jersey, USA | **73768.00** | **76865.00**   |
| 4.00       | Zurcher Reid      | Development | Sofia, Bulgaria           | 36018.00     | **73768.00**   |

表に示すように、2 つ目の行は 2 つ目の行に `[WAGE]` 値を返します。関数で設定したとおり列の最初のセルを `1` で埋めます。
