## Aggregation Calculated Fields


Aggregation formulas are useful for you to work with your original data
source in order to dissect its values, often re-organizing, or simply
summarizing the information contained in it. You can also use them to
calculate different values you are focused on (`average`, for example),
find top and bottom values (`max` and `min`), etc. **All formulas are**,
therefore, **meant to be used with numerical fields only**.

In Reveal, aggregation calculated fields include:

  - **Standard functions**: for information on each one, click the corresponding hyperlink under "Function Name."

  - **Standard functions with if conditions**: [this section](#aggregation-if-condition) contains a detailed explanation of what an *if condition* is (including [nested if conditions](#nested-if-conditions)) and how you need to structure
    it.

**Note:** *All samples included in the table below were created with the
[HR Dataset 2016](http://download.infragistics.com/reportplus/help/samples/HR%20Dataset_2016.xlsx)
spreadsheet.*

The functions included in the aggregation category are:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
.tg .tg-0lax{text-align:left;vertical-align:top}
.gray-snippet-cstm{color: #666;background-color: #ddd;}
</style>
<table class="tg" style="undefined;table-layout: fixed">
  <tr>
    <th class="tg-cly1"><span style="font-weight:bold">Function Name and Description</span></th>
    <th class="tg-cly1"><span style="font-weight:bold">Function Syntax and Sample</span></th>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">average</span>: The <span class="gray-snippet-cstm">average</span> aggregation will return a number, which will be calculated from the average value of all rows in your selected <span class="gray-snippet-cstm">expression</span>.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">average({expression})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">average([Wage])</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">averageif</span>: Using a regular function with an <a href="#aggregation-if-condition">if-condition</a> means that the results you get need to meet certain criteria, which will be defined within your condition.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">averageif({expression},{if-condition})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">averageif([Wage],[OfficeId]=1)</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">count</span>: The <span class="gray-snippet-cstm">count</span> aggregation will return a number, which is the <span style="font-weight:bold">number</span> of rows in your data source. There are no additional arguments required.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">count()</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">count()</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">countif</span>: Using a regular function with an <a href="#aggregation-if-condition">if-condition</a> means that the results you get need to meet certain criteria, which will be defined within your condition.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm"> <span class="gray-snippet-cstm">countif({if-condition})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">countif([OfficeId]=1)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">max</span>: The <span class="gray-snippet-cstm">max</span> aggregation will return a number, which is the highest <span style="font-weight:bold">number</span> in your selected <span class="gray-snippet-cstm">expression</span>.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm"> max({expression})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm"> max([Wage])</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">maxif</span>: Using a regular function with an <a href="#aggregation-if-condition">if-condition</a> means that the results you get need to meet certain criteria, which will be defined within your condition.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">maxif({expression},{if-condition})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">maxif([Wage],[OfficeId]=1)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">min</span>: The <span class="gray-snippet-cstm">min</span> aggregation will return a number, which is the lowest <span style="font-weight:bold">number</span> in your selected <span class="gray-snippet-cstm">expression</span>.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm"> min({expression})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm"> min([Wage])</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">minif</span>: Using a regular function with an <a href="#aggregation-if-condition">if-condition</a> means that the results you get need to meet certain criteria, which will be defined within your condition.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm"> minif({expression},{if-condition})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm"> minif([Wage],[OfficeId]=1)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">sum</span>: The <span class="gray-snippet-cstm">sum</span> aggregation will return a <span style="font-weight:bold">number</span>, which is calculated as the sum of all rows in your selected <span class="gray-snippet-cstm">expression</span>.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm"> sum({expression})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm"> sum([Wage])</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">sumif</span>: Using a regular function with an if-condition means that the results you get need to meet certain criteria, which will be defined within your condition.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm"> sumif({expression},{if-condition})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm"> sumif([Wage],[OfficeId]=1)</span></td>
  </tr>
</table>


<a name='aggregation-if-condition'></a>
### Calculated Fields with IF Conditions

Using a regular function (which needs an `expression`) with an
`if-condition` means that the results you get need to meet a certain
criteria, which will be defined within your condition.

#### Syntax

By default, you will see the following structure when you select any of
the functions with the "IF" suffix.

`XXXXXXIF({expression},{if-condition})`

There are two arguments that you will need to configure:

  - `expression`: choose one of the fields in your data source.

  - `if-condition`: the if condition will require that you perform a
    logical test. The `if-condition` requires a `logical test`, which is
    the condition your expression needs to meet for the aggregation to
    be calculated.

#### Basic Samples

For example, let's take a look at the example in the table above:

`averageif([Wage],[OfficeId]=1)`

For clarification purposes, we will separate the function according to
the terms we defined above:

| Function Name  | Expression | IF Condition  |
| -------------- | ---------- | ------------- |
| averageif (…​)  | [Wage]     | [OfficeId]=1) |

A non-numerical example could be the following:

`sumif([Wage],[Department]="Development")`

Where:

| Function Name | Expression | IF Condition               |
| ------------- | ---------- | -------------------------- |
| sumif (…​)    | [Wage]      | [Department]="Development" |

<a name='nested-if-conditions'></a>
#### Sample with Nested IF conditions

You can use nested if conditions by preceding them with a logical
operator (AND, OR).

The following is one example with only two if conditions, but you can
include as many as necessary:

`maxif([Wage], and([OfficeId]=1, [Department]="Development"))`

Where:

| Function Name | Expression | Logical Operator |
| ------------- | ---------- | ---------------- |
| maxif (…​)     | [Wage]     | and              |

And the `if-condition` statements are:

| First Logical Test | Value if true | Value if false |
| ------------------ | ------------- | -------------- |
| [OfficeId]=1       | 1             | 0              |

| Second Logical Test        | Value if true | Value if false |
| -------------------------- | ------------- | -------------- |
| [Department]="Development" | 1             | 0              |

Because the logical operator is `and`, both conditions need to be true
for the `maxif` aggregation to be carried out.
