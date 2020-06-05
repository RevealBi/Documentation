## Logic Calculated Fields


Logic calculated fields can be used to compare two or more values in
your data source. They always return "0" or "1", depending on the
logical test you submit your values to.

In Reveal, logic calculated fields include:

  - **Functions with no arguments**: `true()` and `false()`, which
    return 1 and 0 respectively.

  - **Complex functions with logical tests**. For detailed information
    on each function, click the corresponding link in the table below.

**Note:** *All samples included in the table below were created with the
[HR Dataset 2016](http://download.infragistics.com/reportplus/help/samples/HR%20Dataset_2016.xlsx)
spreadsheet.*

The functions included in the logic category are:
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
.tg .tg-0lax{text-align:left;vertical-align:top}
.gray-snippet-cstm{color: #666;background-color: #ddd;}
</style>
<table class="tg">
  <tr>
    <th class="tg-cly1"><span style="font-weight:bold">Function Name</span></th>
    <th class="tg-cly1"><span style="font-weight:bold">Syntax and Sample</span></th>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><a href="https://www.revealbi.io/help/logic.html#calc-fields-and-or">and</a>: <span class="gray-snippet-cstm">and</span> runs two logical tests. If <span style="font-weight:bold">the logical test is true, it returns 1. If one or both are false, it returns 0.</span></td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>:  <span class="gray-snippet-cstm">and({logical1},{logical2})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>:  <span class="gray-snippet-cstm">and([BirthDate]&gt;date(1983, 07, 15, 04, 06, 55),[Department]="CPA")</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><a href="https://www.revealbi.io/help/logic.html#true-false"><span style="font-weight:bold">false</span></a>: <span class="gray-snippet-cstm">false</span> returns 0, the logical value of <span style="font-weight:bold">false</span>.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>:  <span class="gray-snippet-cstm">false()</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>:  <span class="gray-snippet-cstm">false()</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><a href="https://www.revealbi.io/help/logic.html#calc-fields-if"><span style="font-weight:bold">if</span></a>: <span class="gray-snippet-cstm">if</span> runs a logical test. If the <span style="font-weight:bold">logical test is true, it returns 1.</span> If the <span style="font-weight:bold">logical test is false, it returns 0.</span></td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>:  <span class="gray-snippet-cstm">if({logical test},{value if true},{value if false})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>:  <span class="gray-snippet-cstm">if([BirthDate]&lt;(1971,04,15,4,06,55),1,0)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><a href="https://www.revealbi.io/help/logic.html#calc-fields-not">not</a>: <span class="gray-snippet-cstm">not</span> runs a logical test. If the <span style="font-weight:bold">logical test is false, it returns 1. If the logical test is true, it returns 0.</span></td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>:  <span class="gray-snippet-cstm">not({logical})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>:  <span class="gray-snippet-cstm">not([OfficeId]&gt;=3)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><a href="https://www.revealbi.io/help/logic.html#calc-fields-and-or"><span style="font-weight:bold">or</span></a>: <span class="gray-snippet-cstm">or</span> runs two logical tests (if statements). If <span style="font-weight:bold">either one of the logical tests is true, it returns 1. If both are false, it returns 0.</span></td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>:  <span class="gray-snippet-cstm">or({logical1},{logical2})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>:  <span class="gray-snippet-cstm">or(if([Office]="London,UK",1,0),if([BirthDate]&lt;date(1992,09,15,4,06,55),1,0))</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><a href="https://www.revealbi.io/help/logic.html#true-false">true</a>: <span class="gray-snippet-cstm">true</span> returns 1, the logical value of <span style="font-weight:bold">true</span>.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>:  <span class="gray-snippet-cstm">true()</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>:  <span class="gray-snippet-cstm">true()</span></td>
  </tr>
</table>


<a name='calc-fields-if'></a>
### If

With the if function, you can find results that meet certain criteria
defined in a logical test. There are three arguments for you to
configure:

  - A `logical test`: the condition your expression needs to meet for
    the average to be calculated.

  - A `value if true`: a value the function will output if the logical
    test is true.

  - A `value if false`: a value the function will output if the logical
    test is false.

#### Basic Samples

Let's take a look at the example in the table above:

`if([BirthDate]<date(1971,04,15,4,06,55),1,0)`

For clarification purposes, we will separate the function according to
the terms we defined above:

| Function Name | Logical Test                           | Value if true | Value if false |
| ------------- | -------------------------------------- | ------------- | -------------- |
| **if** (…​)   | `[BirthDate]<date(1971,04,15,4,06,55)` | `1`           | `0`            |

Where your logical test combines an `expression` in your data source
with a logical test.

| Expression    | Operator | Criteria Argument          |
| ------------- | -------- | -------------------------- |
| `[BirthDate]` | `<`      | `date(1971,04,15,4,06,55)` |

Where the date argument follows the syntax described in
[date](date.html#date-date).

| Function Name | Year   | Month | Day  | Hour | Minute | Second |
| ------------- | ------ | ----- | ---- | ---- | ------ | ------ |
| `date(…​)`    | `1971` | `04`  | `15` | `4`  | `06`   | `55`   |

Let's look at a non-numerical example:

`if([Department]="Development",1,0)`

Where:

| Function Name | Logical Test                 | Value if true | Value if false |
| ------------- | ---------------------------- | ------------- | -------------- |
| **if** (…​)   | `[Department]="Development"` | `1`           | `0`            |

#### Sample with Nested if conditions

You can use nested if conditions by preceding them with a logical
operator (`and`, `or`).

The following is one example with only two if conditions, but you can
include as many as necessary:

`maxif([Wage], and([OfficeId]=1, [Department]="Development"))`

Where:

| Function Name | Expression | Logical Operator |
| ------------- | ---------- | ---------------- |
| maxif (…​)    | [Wage]     | and              |

And the `if-condition` statements are:

  - `[BirthDate]>date(1992,09,15,4,06,55)`

  - `[Department]="Development"`

Because the logical operator is `and`, both conditions need to be true
for the `maxif` aggregation to be carried out.

<a name='calc-fields-and-or'></a>
### And and Or

The `and` and `or` functions allow you to build nested if conditions by
declaring two logical tests that must be applied. Both and and or have
the same syntax:

| Function Name | Logical Test 1 | Logical Test 2 | Output                                                                                                                    |
| ------------- | -------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **and** (…​)  | `logical1`     | `logical2`     | **If both conditions are met, returns 1**. **If only one or none** of the conditions are met, **returns 0**.              |
| **or** (…​)   | `logical1`     | `logical2`     | If **either both or only one of the conditions is met, returns 1**. **If none** of the conditions are met, **returns 0**. |

#### Samples

Let's take a look at the following and and or samples:

  - `and([BirthDate]>date(1983,07,15,04,06,55), [Department]="CPA")`

  - `or([Office]="London,UK",[BirthDate]<date(1992,09,15,4,06,55))`

The syntax they have is the same:

| Function Name | Logical Test 1                          | Logical Test 2                         | Output                         |
| ------------- | --------------------------------------- | -------------------------------------- | ------------------------------ |
| `and (…​)`    | `[BirthDate]>date(1983,07,15,04,06,55)` | `[Department]="CPA"`                   | 1 and 0, depending on the row. |
| `or (…​)`     | `[Office]="London,UK"`                  | `[BirthDate]<date(1992,09,15,4,06,55)` | 1 and 0, depending on the row. |

The `and` calculated field returns only four "TRUE" rows:

  - Row 7 (employee "Zolleis Walker").

  - Row 57 (employee "Yancy Martinez").

  - Row 94 (employee "Nicolas Favarelli")

  - Row 96 (employee "Jorge Stanatto").

You can look at these two rows only if you apply [filter by rule](~/en/fields/field-filters-rules.html#rules-numeric-fields) or [select value](~/en/fields/field-filters-rules.html#select-values) "1.00".

If you want to refine your and condition so you only find "Zolleis
Walker", you can introduce any one of the following third logical tests:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
.tg .tg-ycr8{background-color:#ffffff;text-align:left;vertical-align:top}
.tg .tg-yla0{font-weight:bold;text-align:left;vertical-align:middle}
.tg .tg-0lax{text-align:left;vertical-align:top}
.gray-snippet-cstm{color: #666;background-color: #DDDDDD;}
</style>

<table class="tg">
  <tr>
    <th class="tg-yla0">Function Name</th>
    <th class="tg-cly1"><span style="font-weight:bold">Logical Test 1</span></th>
    <th class="tg-0lax"><span style="font-weight:bold">Logical Test 2</span></th>
    <th class="tg-0lax"><span style="font-weight:bold">Logical Test 3</span></th>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span class="gray-snippet-cstm">and (…)</span></td>
    <td class="tg-0lax" rowspan="2"><span class="gray-snippet-cstm">[BirthDate]&gt;date(1981,07,15,4,06,05)</span></td>
    <td class="tg-0lax" rowspan="2"><span class="gray-snippet-cstm">[Department]="CPA"</span></td>
    <td class="tg-0lax"><span class="gray-snippet-cstm">[Wage]&gt;150000</span></td>
  </tr>
  <tr>
    <td class="tg-ycr8"><span class="gray-snippet-cstm">[Office]="Tokyo,Japan"</span></td>
  </tr>
</table>

You can also combine the and/or functions with the
[isempty](information.html#isempty)
calculated fields to get the same results:

| Function Name | Logical Test 1 | Logical Test 2 | Logical Test 3  | Logical Test 4            |
| ------------- | -------------- | -------------- | --------------- | ------------------------- |
| `and (…​)`    | Same as above  | Same as above  | `[OfficeId]>=3` | `ISEMPTY([ResignedDate])` |

Because the syntax can be hard to follow with additional arguments, you
can nest additional conditions to group your logical tests. The result
will not be affected, but make sure that the second and is clearly
defined.

`and([BirthDate]>date(1981,07,15,4,06,05),[Department]="CPA",[OfficeId]>=3,ISEMPTY([ResignedDate]))`

  - Logical Test 1: `[BirthDate]>date(1983,07,15,4,06,55)`

  - Logical Test 2: `[Department]="CPA"`

  - Logical Test 3: `[OfficeId]>=3`

  - Logical Test 4: `ISEMPTY([ResignedDate])`

#### Simplifying Complex Calculated Fields

While formulas like the one in the sample above can be useful if you
need to get results based on multiple if conditions, their syntax can be
hard to follow. You can create separate calculated fields and combine
them in a single one to simplify them. For example, let's take a look at
the mentioned calculated field:

`and([BirthDate]>date(1981,07,15,4,06,05),[Department]="CPA",[OfficeId]>=3,ISEMPTY([ResignedDate]))`

There are four IF conditions:

  - `[BirthDate]>date(1983,07,15,4,06,55)`

  - `[Department]="CPA"`

  - `[OfficeId]>=3`

  - `ISEMPTY([ResignedDate])`

We can create a calculated field for each if condition with a clear
enough name:

| IF Statements  | New Calculated Field Name          | Calculated Formula                     |
| -------------- | ---------------------------------- | -------------------------------------- |
| IF Statement 1 | Employees Born after July 15, 1981 | `[BirthDate]>date(1981,07,15,4,06,05)` |
| IF Statement 2 | CPA Employees                      | `[Department]="CPA"`                   |
| IF Statement 3 | JP, UY and BG Employees            | `[OfficeId]>=3`                        |
| IF Statement 4 | Current Employees                  | `ISEMPTY([ResignedDate])`              |

If we combine these new statements in a new calculated field:

`and([Employees Born after 1981],[CPA Employees],[JP, UY and BG
Employees],[Current Employees])`

<a name='calc-fields-not'></a>
### Not

Using the not function, you can verify whether a logical test is true or
not. By default, you will see the following structure when you tap not:

`not(logical)`

#### Samples

| Function Name | Logical Test     |
| ------------- | ---------------- |
| `not (…​)`     | `[OfficeId]>=3)` |

Where

| Expression   | Operator 1 | Operator 2 | Criteria Argument |
| ------------ | ---------- | ---------- | ----------------- |
| `[OfficeId]` | `>`        | `=`        | `3`               |

#### Combining not with and/or

You can also use not to get the opposite result of `and`/`or` calculated
fields.

The following and calculated field will return "1" only for EmployeeId
66 ("Zerbe Johansen"), because only in his case are both if statements
true at the same time. All other rows return "0".

| Function Name | Logical Test 1       | Logical Test 2                         |
| ------------- | -------------------- | -------------------------------------- |
| `and (…​)`     | `[Department]="CPA"` | `[BirthDate]>date(1992,09,15,4,06,55)` |

By adding a `not` before the calculated field, you can get the opposite
results:

| not        | and        | Logical Test 1       | Logical Test 2                         |
| ---------- | ---------- | -------------------- | -------------------------------------- |
| `not (…​)`  | `and (…​)`  | `[Department]="CPA"` | `[BirthDate]>date(1992,09,15,4,06,55)` |

All rows that previously returned "0" will now do "1", and all "1" will
be "0".

<a name='true-false'></a>
### True and False

The `true` and false functions are used without arguments, which means
that there is no logical test applied; that is, **there is no expression
or particular statement you are running the logical test against**.

They are particularly useful to be used in combination with other
logical calculated fields; for example, if. Let's take a look at the
general if syntax:

| Function Name | Argument 1     | Argument 2      | Argument 3       |
| ------------- | -------------- | --------------- | ---------------- |
| **if** (…​)    | `logical test` | `value if true` | `value if false` |

Let's replace this formula with if example at the start of this section
(`if([BirthDate]<date(1971,04,15,4,06,55),1,0)`). Also, let's change the
values of the "Value if true" and "value if false" arguments to 3 and 4.

| Function Name | Logical Test                           | Value if true | Value if false |
| ------------- | -------------------------------------- | ------------- | -------------- |
| if (…​)        | `[BirthDate]<date(1971,04,15,4,06,55)` | `3`           | `4`            |

The output of this if statement will be 3 if the logical test is true,
and 4 if the logical test is false. If you want to use the standard 1,0
boolean results, you can include `true()` and `false()` in their place.

| Function Name | Logical Test                           | Value if true | Value if false |
| ------------- | -------------------------------------- | ------------- | -------------- |
| if (…​)        | `[BirthDate]<date(1971,04,15,4,06,55)` | `true()`      | `false()`      |

This will force your if formula to output 1 and 0 depending on your
logical test.
