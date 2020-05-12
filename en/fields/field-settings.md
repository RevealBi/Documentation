## Field Settings

This section describes the different options for applying
transformations to datasets, such as sorting, filtering, and aggregating
data.

![data-filters-currency](images/data-filters-currency.png)

In order to apply formatting or filter to your data, you must select the
specific field you want to modify in the corresponding placeholder
(*Category*, *Columns*, *Label*, *Rows* and *Values*. There are three
types of fields, each of which has their own formatting and filter
options:

  - [Date Fields](#date-fields)

  - [Numeric Fields](#numeric-fields)

  - [String Fields](#abc-fields)


>[!NOTE] All fields dropped in the **Values** placeholder of the data editor will be formatted as numbers.

</div>

<a name='date-fields'></a>
### Date Fields

![Date-Field-Formatting](images/Date-Field-Formatting.png)

  - **Label renaming**: rename your fields for display purposes only.
    Fields are always referenced by their original name in calculated
    field expressions. Once renamed, erase the label completely to go
    back to the original value.

  - **Fiscal year initial month**: if your 12-month period is not the
    same as a calendar year, you can use Fiscal Years and select the
    initial month for your period.

  - **Date Aggregation**: configure the level of granularity for your
    data (year, month, or day).

  - **Sorting**: sort your dates in either ascending or descending
    order.

  - **Date Format**: select from a predefined list of date and time
    formats to display your date/time values.

<a name='numeric-fields'></a>
### Numeric Fields

![Numeric-Field-Formatting\_All.png](images/Numeric-Field-Formatting.png)

  - **Label renaming**: rename your fields for display purposes only.
    Fields are always referenced by their original name in calculated
    field expressions. Once renamed, erase the label completely to go
    back to the original value.

  - **Aggregation**: configure how you want your numbers to be processed
    by Reveal (sum, count, average, etc.).

  - **Sorting**: sort your numbers in either ascending or descending
    order.

  - **Is Visible**: choose whether the data in this field will be used
    in the current visualization.

  - **Type**: define whether your number should be formatted as
    percentage, currency, or a simple number. If you select
    **Currency**, you will have the option to choose the type of
    currency (dollar, euro, pounds, and yens).

  - **Fraction digits**: select the number of decimal places you want to
    display.

  - **Negative Numbers**: select between enclosing negative numbers in
    parenthesis or prefixing with the minus (-) sign.

  - **Large Numbers Formatting**: display M for millions and K for
    thousands within the visualization preview in the central pane.

  - **1000 Separator**: configure whether or not to display the
    thousands separator.

  - [**Conditional Formatting**](conditional-formatting.md): when enabled,
    this allows you to provide different formats to each of your cells
    depending on their values. For instance, values in the lower 50%
    range of a field can be colored with a red adorner to signal a
    problem. You can establish styling rules up to three ranges
    (typically used for upper, middle, and lower ranges), but you can
    customize your limits, type of comparison, colors, and indicator
    symbols.

<a name='abc-fields'></a>
### String Fields

![String-Field-Formatting](images/string-field-formatting.png)

  - **Label renaming**: rename your fields for display purposes only.
    Fields are always referenced by their original name in calculated
    field expressions. Once renamed, erase the label completely to go
    back to the original value.

  - **Sorting**: sort your dates in either ascending or descending
    order.
