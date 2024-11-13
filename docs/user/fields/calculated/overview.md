---
title: How to use Calculated Fields
_description: Learn how to use Calculated fields and all their types to create a more precise data visualization.
---

# Calculated Fields

Reveal allows you to define new fields in the data set, named calculated
fields. These fields are created by using expressions (formulas). An
expression can be a combination of existing field(s), constant values
and:

  - [predefined functions](#using-the-predefined-reveal-functions) and/or

  - [simple math calculations and other functions that are not predefined](#creating-calculated-fields-without-using-the-predefined-functions).

There are two types of calculated fields:

  - [pre-calculated](#pre-calculated-fields) (also called "calculated")

  - [post-calculated](#post-calculated-fields)


## Pre-Calculated Fields

Pre-calculated fields are evaluated before executing data editor
aggregations. This means in order to apply a certain formula, Reveal will go through every record in your field's dataset once or several times. Because of this, pre-calculation is likely to be underperforming in terms of speed when working with large datasets.

To add a new pre-calculated field, click/tap the **+ button** in the
*Fields* panel and choose **Calculated Field**:

![Pre-calculated field option](images/calculated-field-option.png)

The *New Calculated Field* screen will open:

![New calculated field dialog](images/new-calculated-field-dialog.png)

Here you will need to:

1.  Assign a name to your new pre-calculated field.

2.  Enter a *Formula* (expression). In the *Fields* section you will
    find a list of all the existing fields to choose from. You can use
    one or more fields to create the formula by clicking on the selected
    field or typing its name in square brackets. Choose one of the
    predefined functions listed in the *Functions* section or use a
    simple math calculation (as shown above).

The new pre-calculated field will show up at the bottom of your *Fields*
list:

![New calculated field shown in the column placeholder and in the visualization](images/new-calculated-field-visualization-example.png)
In the example above, the new calculated field is used with a grid
visualization where no aggregation is being applied on the data fields.
Pre-calculated fields can also be used with *Pivot Grids*. In this case,
aggregation (e.g. summarization) will be applied to the already
calculated records in the pre-calculated field.


## Post-Calculated Fields

Post-calculated fields can be created when working with *Pivot tables*
and other visualizations, which execute an aggregation on the data
fields in the *Data Editor*. Post-calculated fields are always built by
applying a formula on already summarized values.

To create a post calculated field you will need to:

1.  Create a visualization (or a *Pivot table*) by adding fields from
    your data source in the *Data editor*.

  ![Post calculated fields in the Data editor](images/post-calculated-field-example.png)
2.  Click/tap the *F(x)* button next to *Values* to open the *New
    Calculated Field* screen:

  ![Post calculated field new calculated field screen](images/post-calculated-field-new-calculated-field-dialog.png)
3.  Give a name to your new calculated field and apply a formula to the
    summarized value(s). Pay attention that the list of *Values*
    includes the data fields you used in your visualization after they
    have been aggregated (*Sum of Spend*, *Sum of Budget*, not: *Spend*,
    *Budget*).

If you need to use other fields from your data source, that are not
included in the *Data Editor*, you can add them by clicking/tapping on
the *+* button next to *Values*. Since post-calculated fields are
created only by using aggregated values, you will first need to select
an aggregation from the dropdown list to be executed on the data field.

![Adding fields in the calculated field screen](images/post-calculated-field-new-calculated-field-dialog-adding-fields.png)
You can also skip *step 1*, create your post-calculated fields first or
use only post-calculated fields in your visualization.

Post-calculation tends to perform better than pre-calculation when
working with large datasets.


## Using the Predefined Reveal Functions

For both pre-calculated and post-calculated fields, you can use one of
the available functions within Reveal:

  - [**Aggregation**](aggregation.md):
    [average](aggregation.md#aggregation-functions),
    [averageif](aggregation.md#aggregation-functions),
    [count](aggregation.md#aggregation-functions),
    [countif](aggregation.md#aggregation-functions),
    [max](aggregation.md#aggregation-functions),
    [maxif](aggregation.md#aggregation-functions),
    [min](aggregation.md#aggregation-functions),
    [minif](aggregation.md#aggregation-functions).

  - [**Date**](date.md):
    [date](date.md#date-functions),
    [datevalue](date.md#date-functions),
    [day](date.md#date-functions),
    [formatdate](date.md#date-functions),
    [fquarter](date.md#date-functions),
    [semester](date.md#date-functions),
    [fsemester](date.md#date-functions),
    [fyear](date.md#date-functions),
    [hour](date.md#date-functions),
    [millisecond](date.md#date-functions),
    [minute](date.md#date-functions),
    [month](date.md#date-functions),
    [monthname](date.md#date-functions),
    [monthshortname](date.md#date-functions),
    [applytimezone](date.md#date-functions),
    [currenttimezone](date.md#date-functions),
    [datetimefromunixts](date.md#date-functions),
    [now](date.md#date-functions),
    [quarter](date.md#date-functions),
    [second](date.md#date-functions),
    [time](date.md#date-functions),
    [today](date.md#date-functions),
    [weekday](date.md#date-functions),
    [weeknum](date.md#date-functions),
    [year](date.md#date-functions).

  - [**Information**](information.md):
    [empty](information.md#information-functions),
    [isempty](information.md#information-functions).

  - [**Logic**](logic.md):
    [and](logic.md#logic-functions),
    [false](logic.md#logic-functions),
    [if](logic.md#logic-functions),
    [not](logic.md#logic-functions),
    [or](logic.md#logic-functions),
    [true](logic.md#logic-functions).

  - [**Lookup & Reference**](lookup-reference.md):
    [previous](lookup-reference.md#lookup-and-reference-functions),
    [row](lookup-reference.md#lookup-and-reference-functions).

  - [**Math**](math.md):
    [abs](math.md#math-functions),
    [exp](math.md#math-functions),
    [log](math.md#math-functions),
    [log10](math.md#math-functions),
    [mod](math.md#math-functions),
    [rand](math.md#math-functions),
    [randbetween](math.md#math-functions),
    [sign](math.md#math-functions),
    [sqrt](math.md#math-functions),
    [trunc](math.md#math-functions).

  - [**String**](string.md):
    [concatenate](string.md#string-functions),
    [find](string.md#string-functions),
    [len](string.md#string-functions),
    [lower](string.md#string-functions),
    [mid](string.md#string-functions),
    [replace](string.md#string-functions),
    [sortinterval](string.md#string-functions),
    [trim](string.md#string-functions),
    [upper](string.md#string-functions).

:::note
**Limitations to IF Conditions**. IF conditions have known limitations when included in aggregation functions in pre-calculated fields. The need to go through every record that many times, trying to check an IF condition within an aggregation formula causes underperformance issues, hence it's not supported.
:::

## Creating Calculated Fields without using the predefined functions

You can also create Calculated Fields without using any of the
predefined functions; for instance, for simple math calculations like
subtractions, divisions, additions or multiplications. In [this table](samples.md), you will find some examples that do
not use the predefined functions.

## What to consider when using the Reveal functions

  - **Text strings should be included between quotation marks**.
    Examples include locale ("en") and date formats ("dd/mm/yyyy").

  - **Fields included in your formula should be included between square brackets**. Examples include [Wage], [BirthDate] and [EmployeeID] for the HR Dataset.
