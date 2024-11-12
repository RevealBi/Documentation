---
title: How to Use Date Calculated Fields in Reveal
_description: Learn how to use Date Calculated Fields to output different date and time information.
---

# Date Calculated Fields

Date formulas can be used to output different date and time information
in your widget.

:::note
*Your calculated field will show the information you include
in the formula, overwriting of the formatting you have set for Date and
Time.*
:::

## Date functions:

| Function Name | Syntax and Sample |
|---------------|-------------------|
| date | **Syntax**: `date({year},{month},{day},{hour},{minute},{second})`<br />**Sample**: `date(1971,11,08,12,59,08)` |
| datevalue | **Syntax**: `datevalue({date},{format},{locale})`<br />**Sample**: `datevalue("23/05/2015","dd/mm/yyyy","en")` |
| day | **Syntax**: `day({date})`<br />**Sample**: `day(date(1971,11,08,01,22,44))` |
| formatdate | **Syntax**: `formatdate({date},{format},{locale})`<br />**Sample**: `formatdate(date(1971,11,08,01,22,44),"dd/mm/yyyy","en")` |
| fquarter | **Syntax**: `fquarter({date},{number})`<br />**Sample**: `fquarter(date(2017,12,1,12,33,48),4)` |
| fyear | **Syntax**: `fyear({date},{number})`<br />**Sample**: `fyear(date(2017,12,1,12,33,48),2)` |
| hour | **Syntax**: `hour({date})`<br />**Sample**: `hour(date(2017,12,1,12,33,48))` |
| millisecond | **Syntax**: `millisecond({time})`<br />**Sample**: `millisecond(time(11,29,48,799))` |
| minute | **Syntax**: `minute({date})`<br />**Sample**: `minute(date(2017,12,1,12,33,48))` |
| month | **Syntax**: `month({date})`<br />**Sample**: `month(date(2017,12,1,12,33,48))` |
| monthname | **Syntax**: `monthname({date},{locale})`<br />**Sample**: `monthname(date(2017,12,1,12,33,48),"en")` |
| monthshortname | **Syntax**: `monthshortname({date},{locale})`<br />**Sample**: `monthshortname(date(2017,12,1,12,33,48),"en")` |
| now | **Syntax**: `now()`<br />**Sample**: `now()` |
| quarter | **Syntax**: `quarter({date})`<br />**Sample**: `quarter(date(2017,12,1,12,33,48))` |
| second | **Syntax**: `second({date})`<br />**Sample**: `second(date(2017,12,1,12,33,48))` |
| time | **Syntax**: `time({hour},{minute},{second},{millisecond})`<br />**Sample**: `time(11,08,08,11)` |
| today | **Syntax**: `today()`<br />**Sample**: `today()` |
| weekday | **Syntax**: `weekday({date})`<br />**Sample**: `weekday(date(2017,12,1,12,33,48))` |
| weeknum | **Syntax**: `weeknum({date})`<br />**Sample**: `weeknum(date(2017,12,1,12,33,48))` |
| year | **Syntax**: `year({date})`<br />**Sample**: `year(date(2017,12,1,12,33,48))` |
| semester | **Syntax**: `semester({datetime})`<br />**Sample**: `semester(datetime(1))` |
| fsemester | **Syntax**: `fsemester({date}, {number})`<br />**Sample**: `fsemester(date(2015,11,1,11,33,48),1)` |
| applytimezone | **Syntax**: `applytimezone({date}, {timezone})`<br />**Sample**: `applytimezone(date(2015,12,1,10,33,38), ([Timezone]/24))` |
| currenttimezone | **Syntax**: `currenttimezone()`<br />**Sample**: `currenttimezone()` |
| datetimefromunixts | **Syntax**: `datetimefromunixts ({miliseconds})`<br />**Sample**: `datetimefromunixts(0.001)` |



## Date

When you use `date`, Reveal will return a date set to the values you
include in your formula.

### Syntax

By default, you will see the following structure when you select date:

`date({year},{month},{day},{hour},{minute},{second})`

All values, including `month`, need to be expressed with numerical
values.

### Samples

A formula with the following structure will return "08-Nov-1971 12:59":

| Function Name | Year | Month | Day | Hour | Minute | Second |
| :-----------: | :--: | :---: | :-: | :--: | :----: | :----: |
| date (…​)      | 1971 | 11    | 08  | 12   | 59     | 08     |

A formula with the following structure, however, will return
"09-Nov-1971 03:59", because the value in "hour" exceeds 24 hours. Make
sure you respect the order of the elements in the formula:

| Function Name | Year | Month | Day | Hour   | Minute | Second |
| :-----------: | :--: | :---: | :-: | :----: | :----: | :----: |
| date (…​)      | 1971 | 11    | 08  | **27** | 59     | 08     |


## Time

When you use time, Reveal will return a time set to the values you
include in your formula.

### Syntax

By default, you will see the following structure when you select time:

`time({hour},{minute},{second},{millisecond})`

### Samples

A formula with the following structure will return "11:08:08":

| Function Name | Hour | Minute | Second | Millisecond |
| :-----------: | :--: | :----: | :----: | :---------: |
| time (…​)      | 11   | 08     | 08     | 11          |

The millisecond parameter will not be included in your calculated field.
However, you can include time within a different formula (millisecond)
to display only that value.
