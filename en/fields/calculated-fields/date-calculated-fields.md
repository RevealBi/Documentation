## Date Calculated Fields

Date formulas can be used to output different date and time information
in your widget.

**Note:** *Your calculated field will show the information you include
in the formula, overwriting of the formatting you have set for Date and
Time.*

The functions included in the date category are:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
.tg .tg-0lax{text-align:left;vertical-align:top}
</style>
<table class="tg">
  <tr>
    <th class="tg-cly1"><span style="font-weight:bold">Function Name</span></th>
    <th class="tg-cly1"><span style="font-weight:bold">Syntax and Sample</span></th>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><a href="https://www.revealbi.io/help/date-calculated-fields#date-date">date</a>: date will return a date set to the values you include in your formula.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: date({year},{month},{day},{hour},{minute},{second})</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: date(1971,11,08,12,59,08)</td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">datevalue</span>: datevalue converts applies a specified format to a date with no initial format (date). It then returns a date in a speicified language (locale).</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: datevalue({date},{format},{locale})</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: datevalue("23/05/2015","dd/mm/yyyy","en")</td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">day</span>: day uses the date syntax, and returns the third value in the formula.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: day({date})</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: day(date(1971,11,08,01,22,44))</td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">formatdate</span>: formatdate uses the date syntax, and applies a specified format to the date. It then returns a text with a date in a specified language (locale).</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: formatdate({date},{format},{locale})</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: formatdate(date(1971,11,08,01,22,44),"dd/mm/yyyy","en")</td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">fquarter</span>: fquarter uses the date syntax and a second argument, number, and returns the quarter of the fiscal year for the specified date.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: fquarter({date},{number})</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: fquarter(date(2017,12,1,12,33,48),4)</td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">fyear</span>: fyear uses the date syntax and a second argument, number, and returns the fiscal year for the specified date.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: fyear({date},{number})</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: fyear(date(2017,12,1,12,33,48),2)</td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">hour</span>: hour uses the date syntax, and returns the fourth value in the formula.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: hour({date})</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: hour(date(2017,12,1,12,33,48))</td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">millisecond</span>: millisecond uses the time syntax and returns the fourth value in the formula.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: millisecond({time})</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: millisecond(time(11,29,48,799))</td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">minute</span>: minute uses the date syntax, and returns the fifth value in the formula.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: minute({date})</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: minute(date(2017,12,1,12,33,48))</td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">month</span>: month uses the date syntax, and returns the second value in the formula.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: month({date})</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: month(date(2017,12,1,12,33,48))</td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">monthname</span>: monthname uses the date syntax, and returns the month name for a date.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: monthname({date},{locale})</td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: monthname(date(2017,12,1,12,33,48),"en")</td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">monthshortname</span>: monthshortname uses the date syntax, and returns the month name in a short, three-letter, format for a date.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: monthshortname({date},{locale})</td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: monthshortname(date(2017,12,1,12,33,48),"en")</td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">now</span>: now returns the current date and time.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: now()</td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: now()</td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">quarter</span>: quarter uses the date syntax, and returns the <span style="font-weight:bold">quarter to which your date belongs</span>.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: quarter({date})</td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: quarter(date(2017,12,1,12,33,48))</td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">second</span>: second uses the date syntax, and returns the sixth value in the formula.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: second({date})</td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: second(date(2017,12,1,12,33,48))</td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><a href="https://www.revealbi.io/help/date-calculated-fields#date-time">time</a>: When you use time, Reveal will return a time set to the values you include in your formula.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: time({hour},{minute},{second},{millisecond})</td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: time(11,08,08,11)</td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">today</span>: today returns the current date.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: today()</td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: today()</td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">weekday</span>: weekday uses the date syntax, and returns the <span style="font-weight:bold">day of the week your date falls into.</span></td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: weekday({date})</td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: weekday(date(2017,12,1,12,33,48))</td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">weeknum</span>: weeknum uses the date syntax, and returns the <span style="font-weight:bold">number of the week your date falls into within the specified year.</span></td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: weeknum({date})</td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: weeknum(date(2017,12,1,12,33,48))</td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">year</span>: year uses the date syntax, and returns the first value in the formula.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: year({date})</td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: year(date(2017,12,1,12,33,48))</td>
  </tr>
</table>

<a name='date-date'></a>
### Date

When you use `date`, Reveal will return a date set to the values you
include in your formula.

#### Syntax

By default, you will see the following structure when you select date:

`date({year},{month},{day},{hour},{minute},{second})`

All values, including `month`, need to be expressed with numerical
values.

#### Samples

A formula with the following structure will return "08-Nov-1971 12:59":

| Function Name | Year | Month | Day | Hour | Minute | Second |
| ------------- | ---- | ----- | --- | ---- | ------ | ------ |
| date (…​)      | 1971 | 11    | 08  | 12   | 59     | 08     |

A formula with the following structure, however, will return
"09-Nov-1971 03:59", because the value in "hour" exceeds 24 hours. Make
sure you respect the order of the elements in the formula:

| Function Name | Year | Month | Day | Hour   | Minute | Second |
| ------------- | ---- | ----- | --- | ------ | ------ | ------ |
| date (…​)      | 1971 | 11    | 08  | **27** | 59     | 08     |

<a name='date-time'></a>
### Time

When you use time, Reveal will return a time set to the values you
include in your formula.

#### Syntax

By default, you will see the following structure when you select time:

`time({hour},{minute},{second},{millisecond})`

#### Samples

A formula with the following structure will return "11:08:08":

| Function Name | Hour | Minute | Second | Millisecond |
| ------------- | ---- | ------ | ------ | ----------- |
| time (…​)      | 11   | 08     | 08     | 11          |

The millisecond parameter will not be included in your calculated field.
However, you can include time within a different formula (millisecond)
to display only that value.
