## Calculated Fields

Reveal allows you to define new fields in the data set, named calculated
fields. These fields are created by using expressions (formulas). An
expression can be a combination of existing field(s), constant values
and:

  - [predefined functions](#predefined-functions), and/or

  - [simple math calculations and other functions that are not predefined](#without-predefined-functions).

There are two types of calculated fields:

  - [pre-calculated](#precalculated-fields) (also called "calculated"),
    and

  - [post-calculated](#postcalculated-fields).

<a name='precalculated-fields'></a>
### Pre-Calculated Fields

Pre-calculated fields are evaluated before executing data editor
aggregations. This means in order to apply a certain formula, Reveal will go through every record in your field's dataset once or several times. Because of this, pre-calculation is likely to be underperforming in terms of speed when working with large datasets.

To add a new pre-calculated field, click/tap the *+ button* in the
*Fields* panel:

![Pre-calculated field button](images/pre-calculated-field-button_all.png)

The *New Calculated Field* screen will open:

![New calculated field screen](images/new-calculated-field-screen_all.png)

Here you will need to:

1.  assign a name to your new pre-calculated field;

2.  enter a *formula* (expression). In the *fields* section you will
    find a list of all the existing fields to choose from. You can use
    one or more fields to create the formula by clicking on the selected
    field or typing its name in square brackets. Choose one of the
    predefined functions listed in the *Functions* section or use a
    simple math calculation (as shown above).

The new pre-calculated field will show up at the bottom of your *Fields*
list:

![New calculated field at the bottom of fields list](images/new-calculated-field-bottom-list_all.png)

In the example above, the new calculated field is used with a grid
visualization where no aggregation is being applied on the data fields.
Pre-calculated fields can also be used with *Pivot grids*. In this case,
aggregation (e.g. summarization) will be applied to the already
calculated records in the pre-calculated field.

<a name='postcalculated-fields'></a>
### Post-Calculated Fields

Post-calculated fields can be created when working with *Pivot tables*
and other visualizations, which execute an aggregation on the data
fields in the *Data editor*. Post-calculated fields are always built by
applying a formula on already summarized values.

To create a post calculated field you will need to:

1.  Create a visualization (or a *Pivot table*) by adding fields from
    your data source in the *Data editor*.

    ![Post calculated fields in the Data editor](images/post-calculated-fields-data-editor_all.png)

2.  Click/tap the *F(x)* button next to *Values* to open the *New
    Calculated Field* screen:

    ![Post calculated field new calculated field screen](images/post-calculated-field-new-calculated-field-screen_all.png)

3.  Give a name to your new calculated field and apply a formula to the
    summarized value(s). Pay attention that the list of *Values*
    includes the data fields you used in your visualization after they
    have been aggregated (*Sum of Spend*, *Sum of Budget*, not: *Spend*,
    *Budget*).

If you need to use other fields from your data source that are not
included in the *Data editor*, you can add them by clicking/tapping on
the *+* button next to *Values*. Since post-calculated fields are
created only by using aggregated values, you will first need to select
an aggregation from the dropdown list to be executed on the data field.

![Adding fields in the calculated field screen](images/post-calculated-field-new-calculated-field-screen-adding-fields_all.png)

You can also skip *step 1*, create your post-calculated fields first or
use only post-calculated fields in your visualization.

Post-calculation tends to perform better than pre-calculation when
working with large datasets

<a name='predefined-functions'></a>
### Using the Predefined Reveal Functions

For both pre-calculated and post-calculated fields, you can use one of
the available functions within Reveal:

  - [**Aggregation**](aggregation-calculated-fields.md):
    [AVERAGE](aggregation-calculated-fields.html#average),
    [AVERAGEIF](aggregation-calculated-fields.html#averageif),
    [COUNT](aggregation-calculated-fields.html#count),
    [COUNTIF](aggregation-calculated-fields.html#countif),
    [MAX](aggregation-calculated-fields.html#max),
    [MAXIF](aggregation-calculated-fields.html#maxif),
    [MIN](aggregation-calculated-fields.html#min),
    [MINIF](aggregation-calculated-fields.html#minif).

  - [**Date**](date-calculated-fields.md):
    [DATE](date-calculated-fields.html#date-date),
    [DATEVALUE](date-calculated-fields.html#datevalue),
    [DAY](date-calculated-fields.html#day),
    [FORMATDATE](date-calculated-fields#formatdate),
    [FQUARTER](date-calculated-fields#fquarter),
    [FYEAR](date-calculated-fields.html#fyear),
    [HOUR](date-calculated-fields.html#hour),
    [MILLISECOND](date-calculated-fields.html#millisecond),
    [MINUTE](date-calculated-fields.html#minute),
    [MONTH](date-calculated-fields.html#month),
    [MONTHNAME](date-calculated-fields.html#monthname),
    [MONTHSHORTNAME](date-calculated-fields.html#monthshortname),
    [NOW](date-calculated-fields.html#now),
    [QUARTER](date-calculated-fields.html#quarter),
    [SECOND](date-calculated-fields.html#second),
    [TIME](date-calculated-fields.html#date-time),
    [TODAY](date-calculated-fields.html#today),
    [WEEKDAY](date-calculated-fields.html#weekday),
    [WEEKNUM](date-calculated-fields.html#weeknum),
    [YEAR](date-calculated-fields.html#year).

  - [**Information**](information-calculated-fields.md):
    [EMPTY](information-calculated-fields#empty),
    [ISEMPTY](information-calculated-fields.html#isempty).

  - [**Logic**](logic-calculated-fields.md):
    [AND](logic-calculated-fields.html#and),
    [FALSE](logic-calculated-fields.html#false),
    [IF](logic-calculated-fields.html#if),
    [NOT](logic-calculated-fields.html#not),
    [OR](logic-calculated-fields.html#or),
    [TRUE](logic-calculated-fields.html#true).

  - [**Lookup & Reference**](lookup-reference-calculated-fields.md):
    [PREVIOUS](lookup-reference-calculated-fields.html#previous),
    [ROW](lookup-reference-calculated-fields.html#row).

  - [**Math**](math-calculated-fields.md):
    [ABS](math-calculated-fields.html#abs),
    [EXP](math-calculated-fields.html#exp),
    [LOG](math-calculated-fields.html#log),
    [LOG10](math-calculated-fields.html#log10),
    [MOD](math-calculated-fields.html#mod),
    [RAND](math-calculated-fields.html#rand),
    [RANDBETWEEN](math-calculated-fields.html#randbetween),
    [SIGN](math-calculated-fields.html#sign),
    [SQRT](math-calculated-fields.html#sqrt),
    [TRUNC](math-calculated-fields.html#trunc).

  - [**String**](string-calculated-fields.md):
    [CONCATENATE](string-calculated-fields.html#concatenate),
    [FIND](string-calculated-fields.html#find),
    [LEN](string-calculated-fields.html#len),
    [LOWER](string-calculated-fields.html#lower),
    [MID](string-calculated-fields.html#mid),
    [REPLACE](string-calculated-fields.html#replace),
    [SORTINTERVAL](string-calculated-fields.html#sortinterval),
    [TRIM](string-calculated-fields.html#trim),
    [UPPER](string-calculated-fields.html#upper).

>[!NOTE] **Limitations to IF Conditions**.
>IF conditions have known limitations when included in aggregation functions in pre-calculated fields. The need to go through every record that many times, trying to check an IF condition within an aggregation formula causes underperformance issues, hence it's not supported.

<a name='without-predefined-functions'></a>
### Creating Calculated Fields without using the predefined functions

You can also create Calculated Fields without using any of the
predefined functions; for instance, for simple math calculations like
subtractions, divisions, additions or multiplications. In [this table](sample-calculated-fields.md), you will find some examples that do
not use the predefined functions.

### What to consider when using the Reveal functions

  - **Text strings should be included between quotation marks**.
    Examples include locale ("en") and date formats ("dd/mm/yyyy").

  - **Fields included in your formula should be included between square brackets**. Examples include [Wage], [BirthDate] and [EmployeeID] for the HR Dataset.
