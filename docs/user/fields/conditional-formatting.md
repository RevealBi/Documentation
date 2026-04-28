---
title: How to use Conditional Formatting
_description: Learn how to use Conditional Formatting in Reveal to achieve more precise data visualizations, including dynamic field-based comparisons.
---

# Conditional Formatting

Conditional formatting allows you to provide different formatting of a
cell (or rows for [Text Views](../chart-types/text-view.md)) depending on the values found
in a numeric column. For instance, values in the lower 50% range of a
grid can be colored with a red adorner to signal very low values.

![Pivot table view conditional formatting in the Visualization editor](images/conditional-formatting-pivot-table-view.png)
The conditional formatting configuration allows you to establish styling
rules per ranges of data up to three ranges (typically used for styling,
upper, middle, and lower ranges). Depending on the nature of the
information, low values might be a good or bad signal, so you have the
flexibility to configure the styling in the way that makes the most
sense in your situation.

![Text view conditional formatting showing Marketing Metrics Visualization](images/text-view-conditional-formatting-example.png)
## Enabling Conditional Formatting

To enable conditional formatting on a numeric column, select field in
the Data Editor to prompt the **Field Settings** dialog. The conditional
formatting configuration is the last option in the settings, and is
disabled by default.

![Conditional formatting configuration in Field settings menu](images/conditional-formatting-configuration-fields-settings-dialog.png)
  - **Limits**: these values are automatically set as the lowest and
    highest values in the dataset for the specified column, but can also
    be overridden manually with constant values.

  - **Data Ranges**: the three ranges you will use to style your data.
    For all ranges, you can select one of the pre-defined indicators and
    colors in the dropdown.

      - **Value comparison type**: whether you want the ranges to be
        percentages or numbers.

      - **When value is ≥**: the formatting for values greater than the
        number you enter.

      - **When value is ≥ and \<**: this is a fixed range that depends
        on the values you enter in the first and third range.

      - **When value is \<**: the formatting for values less than the
        number you enter.

## Field-Based Comparisons

In addition to comparing against a fixed (static) value, conditional formatting rules support comparing a field's value against **another field** in the same visualization. The formatting is then evaluated independently for each row based on that row's actual data.

**Example:** Highlight all rows where *Revenue* exceeds *Budget* — because the comparison uses the *Budget* field, each row is evaluated against its own Budget value rather than a single fixed number.

### Supported Rule Types

Field-based comparison is available for all three rule types:

| Rule Type  | Example Use Case |
|---|---|
| **Number** | Highlight *Actual Sales* when it is greater than *Projected Sales* |
| **String** | Highlight *Shipping Country* when it equals *Billing Country* |
| **Date**   | Highlight *Ship Date* when it falls after *Order Date* |

:::note
Date and DateTime fields are considered compatible with each other for the purposes of field-based comparison.
:::

### How to Set a Field Reference

1. **Open the field settings** for the field you want to format.
2. **Add or edit a conditional formatting rule** as usual (e.g., "Greater Than", "Equals", "Between").
3. Next to the value input, click the **field chooser icon** (grid/table icon) that appears.
4. A popup displays all compatible fields currently in your visualization. Select the field you want to compare against.
5. The value input is replaced by a **field chip** showing the selected field name.
6. To remove the field reference and return to manual value entry, click the **✕** button on the chip (appears on hover on desktop, always visible on touch devices).

For **Between / Not Between** numeric rules, you can independently set a field reference for both the "from" and "to" bounds. You can also mix static values and field references (e.g., "Between *Min Threshold* field and 1000").

### Eligible Fields

Only fields that meet **all** of the following criteria appear in the field chooser:

- Present in the current visualization.
- The same data type as the field being formatted (Date and DateTime are interchangeable).
- Not the field being formatted itself.

### Orphaned Field References

If you modify a visualization and remove a field that was being used as a comparison reference in a conditional formatting rule, the reference is **automatically cleared** the next time you open the field settings. An informational message will notify you that the reference was removed so you can reconfigure the rule.

### Validation

- When a field reference is set, the static value input is **not required** — the comparison value comes from the referenced field.
- When no field reference is set, standard validation rules still apply (e.g., numeric rules require a value, Between rules require both bounds, and the "from" value must be ≤ the "to" value).
- Rules referencing fields that contain null or incompatible values in a given row are **skipped** for that row (no formatting is applied).
- For numeric Between/Not Between rules, the from ≤ to validation is only enforced when both bounds are static values. When one or both bounds reference fields, the evaluation is performed per row without upfront validation.

## Supported Visualizations

Conditional formatting can be applied to the following visualizations:

  - [Grid Chart](../chart-types/grid-chart.md)

  - [Pivot Chart](../chart-types/pivot-table.md)

  - [Text View](../chart-types/text-view.md)

:::note
[KPI](../chart-types/kpi-gauge.md), [Linear](../chart-types/gauge-charts.md#linear-gauge), [Circular](../chart-types/gauge-charts.md#circular-gauge), [Text](../chart-types/gauge-charts.md#text-gauge), and [Bullet Graph](../chart-types/gauge-charts.md#bullet-graph) gauges also support conditional formatting natively as part of their band configuration.

Field-based comparisons are available for **Grid Chart** and **Text View** visualizations with tabular data sources only.
:::