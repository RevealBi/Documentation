## Lookup & Reference Calculated Fields


Lookup and reference fields will allow you to work with your current
spreadsheet and dashboard, returning text references to cells, rows and
dashboard variables.

>[!NOTE] *All samples included in the table below were created with the **HR Dataset 2016.xlsx** spreadsheet.*

The functions included in the aggregation category are:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
.tg .tg-yla0{font-weight:bold;text-align:left;vertical-align:middle}
.gray-snippet-cstm{color: #666;background-color: #ddd;}
</style>
<table class="tg">
  <tr>
    <th class="tg-yla0">Function Name</th>
    <th class="tg-cly1"><span style="font-weight:bold">Syntax and Sample</span></th>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><a href="#calc-fields-previous">previous</a>: <span class="gray-snippet-cstm">previous</span> allows you to get a result with the value of the field you choose as your <span class="gray-snippet-cstm">expression</span>.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">previous({expression},{first value})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>:<span class="gray-snippet-cstm"> previous([Wage],1)</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">row</span>: <span class="gray-snippet-cstm">row</span> returns the number of the current row for every row in your data source.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>:<span class="gray-snippet-cstm"> row()</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>:<span class="gray-snippet-cstm"> row()</span></td>
  </tr>
</table>

<a name='calc-fields-previous'></a>
### Previous

The previous calculated field allows you to get a result with the value
of the field you choose as your `expression`. There are two arguments
for you to configure:

  - `expression`: one of the fields in your data source.

  - `first value`: the value for your first row, which will be empty by
    default.

#### Sample

The following is an extract of the HR Dataset 2016.xlsx "Employees"
sheet.

| EMPLOYEEID | FULLNAME          | DEPARTMENT  | OFFICE                    | WAGE     |
| ---------- | ----------------- | ----------- | ------------------------- | -------- |
| 1.00       | Joan Baez         | Development | Montevideo, Uruguay       | 36542.00 |
| 2.00       | Zurbuch Thompson  | Development | Cranbury, New Jersey, USA | 76865.00 |
| 3.00       | Zimmermann Miller | Development | Cranbury, New Jersey, USA | 73768.00 |
| 4.00       | Zurcher Reid      | Development | Sofia, Bulgaria           | 36018.00 |

Let's add the following calculated field:

`previous([Wage],1)`

The results of the calculated field will be:

| EMPLOYEEID | FULLNAME          | DEPARTMENT  | OFFICE                    | WAGE         | previous Field |
| ---------- | ----------------- | ----------- | ------------------------- | ------------ | -------------- |
| 1.00       | Joan Baez         | Development | Montevideo, Uruguay       | **36542.00** | **1.00**       |
| 2.00       | Zurbuch Thompson  | Development | Cranbury, New Jersey, USA | **76865.00** | **36542.00**   |
| 3.00       | Zimmermann Miller | Development | Cranbury, New Jersey, USA | **73768.00** | **76865.00**   |
| 4.00       | Zurcher Reid      | Development | Sofia, Bulgaria           | 36018.00     | **73768.00**   |

As seen in the table, the second row returns the `[WAGE]` value for the
second row, and fills the first cell of the column with `1`, as set in
your formula.
