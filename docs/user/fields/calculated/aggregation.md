---
title: How to Use Aggregation Calculated Fields in Reveal
_description: Learn how to use Aggregation formulas with different variants and tricks.
---

# Aggregation Calculated Fields


Aggregation formulas are useful for you to work with your original data
source in order to dissect its values, often re-organizing, or simply
summarizing the information contained in it. You can also use them to
calculate different values you are focused on (`average`, for example),
find top and bottom values (`max` and `min`), etc. **All formulas are**,
therefore, **meant to be used with numerical fields only**.

In Reveal, aggregation calculated fields include:

- **Standard functions**: for information on each one, click the corresponding hyperlink under "Function Name."

- **Standard functions with if conditions**: [this section](#calculated-fields-with-if-conditions) contains a detailed explanation of what an *if condition* is (including [nested if conditions](#sample-with-nested-if-conditions)) and how you need to structure
  it.

:::note
*All samples included in the table below were created with the
[HR Dataset 2016](../../../../static/data/HR%20Dataset_2016.xlsx)
spreadsheet.*
:::

## Aggregation functions

| Function Name and Description | Function Syntax | Sample |
|-------------------------------|-----------------|--------|
| **average**: The `average` aggregation will return a number, which will be calculated from the average value of all rows in your selected `expression`. |  `average({expression})` | `average([Wage])` |
| **averageif**: Using a regular function with an if-condition means that the results you get need to meet certain criteria, which will be defined within your condition. |  `averageif({expression},{if-condition})` | `averageif([Wage],[OfficeId]=1)` |
| **count**: The `count` aggregation will return a number, which is the number of rows in your data source. There are no additional arguments required. |  `count()` | `count()` |
| **countif**: Using a regular function with an if-condition means that the results you get need to meet certain criteria, which will be defined within your condition. |  `countif({if-condition})` | `countif([OfficeId]=1)` |
| **max**: The `max` aggregation will return a number, which is the highest number in your selected `expression`. |  `max({expression})` | `max([Wage])` |
| **maxif**: Using a regular function with an if-condition means that the results you get need to meet certain criteria, which will be defined within your condition. |  `maxif({expression},{if-condition})` | `maxif([Wage],[OfficeId]=1)` |
| **min**: The `min` aggregation will return a number, which is the lowest number in your selected `expression`. |  `min({expression})` | `min([Wage])` |
| **minif**: Using a regular function with an if-condition means that the results you get need to meet certain criteria, which will be defined within your condition. |  `minif({expression},{if-condition})` | `minif([Wage],[OfficeId]=1)` |
| **sum**: The `sum` aggregation will return a number, which is calculated as the sum of all rows in your selected `expression`. |  `sum({expression})` | `sum([Wage])` |
| **sumif**: Using a regular function with an if-condition means that the results you get need to meet certain criteria, which will be defined within your condition. |  `sumif({expression},{if-condition})` | `sumif([Wage],[OfficeId]=1)` |


## Calculated Fields with IF Conditions

Using a regular function (which needs an `expression`) with an
`if-condition` means that the results you get need to meet  certain
criteria, which will be defined within your condition.

### Syntax

By default, you will see the following structure when you select any of
the functions with the "IF" suffix.

`XXXXXXIF({expression},{if-condition})`

There are two arguments that you will need to configure:

- `expression`: choose one of the fields in your data source.

- `if-condition`: the if condition will require that you perform a
  logical test. The `if-condition` requires a `logical test`, which is
  the condition your expression needs to meet for the aggregation to
  be calculated.

### Basic Samples

For example, let's take a look at the example in the table above:

`averageif([Wage],[OfficeId]=1)`

For clarification purposes, we will separate the function according to
the terms we defined above:

| Function Name  | Expression | IF Condition  |
| :------------: | :--------: | :-----------: |
| averageif (…​)  | [Wage]     | [OfficeId]=1 |

A non-numerical example could be the following:

`sumif([Wage],[Department]="Development")`

Where:

| Function Name  | Expression | IF Condition  |
| :------------: | :--------: | :-----------: |
| sumif (…​)      | [Wage]     | [OfficeId]=1 |

### Sample with Nested IF conditions

You can use nested if conditions by preceding them with a logical
operator (AND, OR).

The following is one example with only two if conditions, but you can
include as many as necessary:

`maxif([Wage], and([OfficeId]=1, [Department]="Development"))`

Where:

| Function Name | Expression | Logical Operator |
|:----------:| :--------: | :--------------: |
| maxif (…​) | [Wage]     | and              |

And the `if-condition` statements are:

| First Logical Test | Value if true | Value if false |
| :----------------: | :-----------: | :------------: |
| [OfficeId]=1       | 1             | 0              |

| Second Logical Test        | Value if true | Value if false |
| :------------------------: | :-----------: | :------------: |
| [Department]="Development" | 1             | 0              |

Because the logical operator is `and`, both conditions need to be true
for the `maxif` aggregation to be carried out.