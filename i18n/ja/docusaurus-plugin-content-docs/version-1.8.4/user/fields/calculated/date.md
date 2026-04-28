---
title: Reveal で日付計算フィールドを使用する方法
_description: 日付計算フィールドを使用してさまざまな日時情報を出力する方法を説明します。
_language: ja
---

# 日付計算フィールド

日付数式は、ウィジェットでさまざまな日付と時刻の情報を出力するために使用できます。

:::note
計算フィールドに数式に含まれる情報が表示されます。日付と時刻に設定した書式をオーバーライトします。
:::

## 日付関数

| 関数名 | 構文とサンプル |
|---------------|-------------------|
| date | **構文**: `date({year},{month},{day},{hour},{minute},{second})`<br />**サンプル**: `date(1971,11,08,12,59,08)` |
| datediff | **構文**: `datediff({date1}, {date2}, {lapse})`<br />**サンプル**: `datediff("23/05/2015", "23/05/2016", "d")` |
| datevalue | **構文**: `datevalue({date},{format},{locale})`<br />**サンプル**: `datevalue("23/05/2015","dd/mm/yyyy","en")` |
| day | **構文**: `day({date})`<br />**サンプル**: `day(date(1971,11,08,01,22,44))` |
| formatdate | **構文**: `formatdate({date},{format},{locale})`<br />**サンプル**: `formatdate(date(1971,11,08,01,22,44),"dd/mm/yyyy","en")` |
| fquarter | **構文**: `fquarter({date},{number})`<br />**サンプル**: `fquarter(date(2017,12,1,12,33,48),4)` |
| fyear | **構文**: `fyear({date},{number})`<br />**サンプル**: `fyear(date(2017,12,1,12,33,48),2)` |
| hour | **構文**: `hour({date})`<br />**サンプル**: `hour(date(2017,12,1,12,33,48))` |
| millisecond | **構文**: `millisecond({time})`<br />**サンプル**: `millisecond(time(11,29,48,799))` |
| minute | **構文**: `minute({date})`<br />**サンプル**: `minute(date(2017,12,1,12,33,48))` |
| month | **構文**: `month({date})`<br />**サンプル**: `month(date(2017,12,1,12,33,48))` |
| monthname | **構文**: `monthname({date},{locale})`<br />**サンプル**: `monthname(date(2017,12,1,12,33,48),"en")` |
| monthshortname | **構文**: `monthshortname({date},{locale})`<br />**サンプル**: `monthshortname(date(2017,12,1,12,33,48),"en")` |
| now | **構文**: `now()`<br />**サンプル**: `now()` |
| quarter | **構文**: `quarter({date})`<br />**サンプル**: `quarter(date(2017,12,1,12,33,48))` |
| second | **構文**: `second({date})`<br />**サンプル**: `second(date(2017,12,1,12,33,48))` |
| time | **構文**: `time({hour},{minute},{second},{millisecond})`<br />**サンプル**: `time(11,08,08,11)` |
| today | **構文**: `today()`<br />**サンプル**: `today()` |
| weekday | **構文**: `weekday({date})`<br />**サンプル**: `weekday(date(2017,12,1,12,33,48))` |
| weeknum | **構文**: `weeknum({date})`<br />**サンプル**: `weeknum(date(2017,12,1,12,33,48))` |
| year | **構文**: `year({date})`<br />**サンプル**: `year(date(2017,12,1,12,33,48))` |
| semester | **構文**: `semester({datetime})`<br />**サンプル**: `semester(datetime(1))` |
| fsemester | **構文**: `fsemester({date}, {number})`<br />**サンプル**: `fsemester(date(2015,11,1,11,33,48),1)` |
| applytimezone | **構文**: `applytimezone({date}, {timezone})`<br />**サンプル**: `applytimezone(date(2015,12,1,10,33,38), ([Timezone]/24))` |
| currenttimezone | **構文**: `currenttimezone()`<br />**サンプル**: `currenttimezone()` |
| datetimefromunixts | **構文**: `datetimefromunixts ({miliseconds})`<br />**サンプル**: `datetimefromunixts(0.001)` |



## Date

`date` を使用する場合、Reveal は日付セットを数式に含まれる値へ返します。

### 構文

デフォルトで、date を選択した際に以下の構成が表示されます。

`date({year},{month},{day},{hour},{minute},{second})`

すべての値 (`month` を含む) は、数値で表す必要があります。

### サンプル

次の構造の数式は 08-Nov-1971 12:59 を返します。

| 関数名 | Year | Month | Day | Hour | Minute | Second |
| :-----------: | :--: | :---: | :-: | :--: | :----: | :----: |
| date (…​)      | 1971 | 11    | 08  | 12   | 59     | 08     |

次の構造の数式は、「hour」 の値が 24 時を超えているため 「09-Nov-1971 03:59」 を返します。数式の要素の順序は変更しないでください。

| 関数名 | Year | Month | Day | Hour   | Minute | Second |
| :-----------: | :--: | :---: | :-: | :----: | :----: | :----: |
| date (…​)      | 1971 | 11    | 08  | **27** | 59     | 08     |


## Time

time を使用する場合、Reveal は数式に含まれる値に設定した時刻を返します。

### 構文

デフォルトで、time を選択した際に以下の構成が表示されます。

`time({hour},{minute},{second},{millisecond})`

### サンプル

次の構造の数式は 11:08:08 を返します。

| 関数名 | Hour | Minute | Second | Millisecond |
| :-----------: | :--: | :----: | :----: | :---------: |
| time (…​)      | 11   | 08     | 08     | 11          |

ミリ秒パラメーターは、計算フィールドに含まれません。ただし、異なる数式 (millisecond) 内の time に含まれる、値のみを表示することができます。
