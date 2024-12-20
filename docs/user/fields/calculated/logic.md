# Logic Calculated Fields


Logic calculated fields can be used to compare two or more values in
your data source. They always return "0" or "1", depending on the
logical test you submit your values to.

In Reveal, logic calculated fields include:

  - **Functions with no arguments**: `true()` and `false()`, which
    return 1 and 0 respectively.

  - **Complex functions with logical tests**. For detailed information
    on each function, click the corresponding link in the table below.

:::note
*All samples included in the table below were created with the
<a href="/data/HR%20Dataset_2016.xlsx" download>HR Dataset 2016</a>
spreadsheet.*
:::

## Logic functions:

| **Function Name**                                                                                                                                              | **Syntax and Sample** |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| [**and**](#and-and-or): `and` runs two logical tests. If the logical test is true, it returns 1. If one or both are false, it returns 0.                       | **Syntax**: `and({logical1},{logical2})`<br />**Sample**: `and([BirthDate]>date(1983, 07, 15, 04, 06, 55),[Department]="CPA")` |
| [**false**](#true-and-false): `false` returns 0, the logical value of false.                                                                                                 | **Syntax**: `false()`<br />**Sample**: `false()` |
| [**if**](#if): `if` runs a logical test. If the logical test is true, it returns 1. If the logical test is false, it returns 0.                                | **Syntax**: `if({logical test},{value if true},{value if false})`<br />**Sample**: `if([BirthDate]<(1971,04,15,4,06,55),1,0)` |
| [**not**](#not): `not` runs a logical test. If the logical test is false, it returns 1. If the logical test is true, it returns 0.                             | **Syntax**: `not({logical})`<br />**Sample**: `not([OfficeId]>=3)` |
| [**or**](#and-and-or): `or` runs two logical tests (if statements). If either one of the logical tests is true, it returns 1. If both are false, it returns 0. | **Syntax**: `or({logical1},{logical2})`<br />**Sample**: `or(if([Office]="London,UK",1,0),if([BirthDate]<date(1992,09,15,4,06,55),1,0))` |
| [**true**](#true-and-false): `true` returns 1, the logical value of true.                                                                                      | **Syntax**: `true()`<br />**Sample**: `true()` |



## If

With the if function, you can find results that meet certain criteria
defined in a logical test. There are three arguments for you to
configure:

  - A `logical test`: the condition your expression needs to meet for
    the average to be calculated.

  - A `value if true`: a value the function will output if the logical
    test is true.

  - A `value if false`: a value the function will output if the logical
    test is false.

### Basic Samples

Let's take a look at the example in the table above:

`if([BirthDate]<date(1971,04,15,4,06,55),1,0)`

For clarification purposes, we will separate the function according to
the terms we defined above:

| Function Name | Logical Test                           | Value if true | Value if false |
| :-----------: | :------------------------------------: | :-----------: | :------------: |
| **if** (…​)   | `[BirthDate]<date(1971,04,15,4,06,55)` | `1`           | `0`            |

Where your logical test combines an `expression` in your data source
with a logical test.

| Expression    | Operator | Criteria Argument          |
| :-----------: | :------: | :------------------------: |
| `[BirthDate]` | `<`      | `date(1971,04,15,4,06,55)` |

Where the date argument follows the syntax described in
[date](date.md#date).

| Function Name | Year   | Month | Day  | Hour | Minute | Second |
| :-----------: | :----: | :---: | :--: | :--: | :----: | :----: |
| `date(…​)`    | `1971` | `04`  | `15` | `4`  | `06`   | `55`   |

Let's look at a non-numerical example:

`if([Department]="Development",1,0)`

Where:

| Function Name | Logical Test                 | Value if true | Value if false |
| :-----------: | :--------------------------: | :-----------: | :------------: |
| **if** (…​)   | `[Department]="Development"` | `1`           | `0`            |

### Sample with Nested if conditions

You can use nested if conditions by preceding them with a logical
operator (`and`, `or`).

The following is one example with only two if conditions, but you can
include as many as necessary:

`maxif([Wage], and([OfficeId]=1, [Department]="Development"))`

Where:

| Function Name | Expression | Logical Operator |
| :-----------: | :--------: | :--------------: |
| maxif (…​)    | [Wage]     | and              |

And the `if-condition` statements are:

  - `[BirthDate]>date(1992,09,15,4,06,55)`

  - `[Department]="Development"`

Because the logical operator is `and`, both conditions need to be true
for the `maxif` aggregation to be carried out.


## And and Or

The `and` and `or` functions allow you to build nested if conditions by
declaring two logical tests that must be applied. Both and and or have
the same syntax:

| Function Name | Logical Test 1 | Logical Test 2 | Output                                                                                                                    |
| :-----------: | :------------: | :------------: | :-----------------------------------------------------------------------------------------------------------------------: |
| **and** (…​)  | `logical1`     | `logical2`     | **If both conditions are met, returns 1**. **If only one or none** of the conditions are met, **returns 0**.              |
| **or** (…​)   | `logical1`     | `logical2`     | If **either both or only one of the conditions is met, returns 1**. **If none** of the conditions are met, **returns 0**. |

### Samples

Let's take a look at the following *and* and *or* samples:

  - `and([BirthDate]>date(1983,07,15,04,06,55), [Department]="CPA")`

  - `or([Office]="London,UK",[BirthDate]<date(1992,09,15,4,06,55))`

The syntax they have is the same:

| Function Name | Logical Test 1                          | Logical Test 2                         | Output                         |
| :-----------: | :-------------------------------------: | :------------------------------------: | :----------------------------: |
| `and (…​)`    | `[BirthDate]>date(1983,07,15,04,06,55)` | `[Department]="CPA"`                   | 1 and 0, depending on the row. |
| `or (…​)`     | `[Office]="London,UK"`                  | `[BirthDate]<date(1992,09,15,4,06,55)` | 1 and 0, depending on the row. |

The `and` calculated field returns only four "TRUE" rows:

  - Row 7 (employee "Zolleis Walker").

  - Row 57 (employee "Yancy Martinez").

  - Row 94 (employee "Nicolas Favarelli")

  - Row 96 (employee "Jorge Stanatto").

You can look at these two rows only if you apply [filter by rule](../field-filters-rules.md#filter-by-rule) or [select value](../field-filters-rules.md#select-values) "1.00".

If you want to refine your and condition so you only find "Zolleis
Walker", you can introduce any one of the following third logical tests:

| Function Name | Logical Test 1                                          | Logical Test 2             | Logical Test 3              |
| :-----------: | :-----------------------------------------------------: | :------------------------: | :-------------------------: |
| and (…)       | [BirthDate]>date(1981,07,15,4,06,05)                     | [Department]="CPA"         | [Wage]>150000               |
|               |                                                          |                            | [Office]="Tokyo,Japan"      |

You can also combine the and/or functions with the
[isempty](information.md#isempty)
calculated fields to get the same results:

| Function Name | Logical Test 1 | Logical Test 2 | Logical Test 3  | Logical Test 4            |
| :-----------: | :------------: | :------------: | :-------------: | :-----------------------: |
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

### Simplifying Complex Calculated Fields

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
| :------------: | :--------------------------------: | :------------------------------------: |
| IF Statement 1 | Employees Born after July 15, 1981 | `[BirthDate]>date(1981,07,15,4,06,05)` |
| IF Statement 2 | CPA Employees                      | `[Department]="CPA"`                   |
| IF Statement 3 | JP, UY and BG Employees            | `[OfficeId]>=3`                        |
| IF Statement 4 | Current Employees                  | `ISEMPTY([ResignedDate])`              |

If we combine these new statements in a new calculated field:

`and([Employees Born after 1981],[CPA Employees],[JP, UY and BG
Employees],[Current Employees])`


## Not

Using the not function, you can verify whether a logical test is true or
not. By default, you will see the following structure when you tap not:

`not(logical)`

### Samples

| Function Name | Logical Test     |
| :-----------: | :--------------: |
| `not (…​)`     | `[OfficeId]>=3)` |

Where

| Expression   | Operator 1 | Operator 2 | Criteria Argument |
| :----------: | :--------: | :--------: | :---------------: |
| `[OfficeId]` | `>`        | `=`        | `3`               |

### Combining not with and/or

You can also use not to get the opposite result of `and`/`or` calculated
fields.

The following and calculated field will return "1" only for EmployeeId
66 ("Zerbe Johansen"), because only in his case are both if statements
true at the same time. All other rows return "0".

| Function Name | Logical Test 1       | Logical Test 2                         |
| :-----------: | :------------------: | :------------------------------------: |
| `and (…​)`     | `[Department]="CPA"` | `[BirthDate]>date(1992,09,15,4,06,55)` |

By adding a `not` before the calculated field, you can get the opposite
results:

| not        | and        | Logical Test 1       | Logical Test 2                         |
| :--------: | :--------: | :------------------: | :------------------------------------: |
| `not (…​)`  | `and (…​)`  | `[Department]="CPA"` | `[BirthDate]>date(1992,09,15,4,06,55)` |

All rows that previously returned "0" will now do "1", and all "1" will
be "0".


## True and False

The `true` and false functions are used without arguments, which means
that there is no logical test applied; that is, **there is no expression
or particular statement you are running the logical test against**.

They are particularly useful to be used in combination with other
logical calculated fields; for example, if. Let's take a look at the
general if syntax:

| Function Name | Argument 1     | Argument 2      | Argument 3       |
| :-----------: | :------------: | :-------------: | :--------------: |
| **if** (…​)    | `logical test` | `value if true` | `value if false` |

Let's replace this formula with if example at the start of this section
(`if([BirthDate]<date(1971,04,15,4,06,55),1,0)`). Also, let's change the
values of the "Value if true" and "value if false" arguments to 3 and 4.

| Function Name | Logical Test                           | Value if true | Value if false |
| :-----------: | :------------------------------------: | :-----------: | :------------: |
| if (…​)        | `[BirthDate]<date(1971,04,15,4,06,55)` | `3`           | `4`            |

The output of this if statement will be 3 if the logical test is true,
and 4 if the logical test is false. If you want to use the standard 1,0
boolean results, you can include `true()` and `false()` in their place.

| Function Name | Logical Test                           | Value if true | Value if false |
| :-----------: | :------------------------------------: | :-----------: | :------------: |
| if (…​)        | `[BirthDate]<date(1971,04,15,4,06,55)` | `true()`      | `false()`      |

This will force your if formula to output 1 and 0 depending on your
logical test.
