# Applying Formatting to the First Visualization

The raw data that you drag and drop into the data editor placeholders
will not be formatted by default; you will need to modify each field you
have dragged individually. This particular widget displays the average
2018 stock value for the stock with the highest value (in this case, it
will be **Globex**). You will need to introduce additional filters to
select the specific data.

## Changing the Aggregation and Formatting for Actual Values

In order for your visualization to display the **average** actual values
for Soylent Corp, you will need to modify the field in the data editor.
Select **Actual Values** in the **Value** placeholder. Then, change the
**Aggregation** to **Average** in the *General* menu.


<img src="images/GlobexValueAggregation_All.png" alt="GlobexValueAggregation\_All" class="responsive-img"/>

Then, change **Type** to **Currency** under *Formatting*.

<img src="images/GlobexValueCurrency_All.png" alt="GlobexValueCurrency\_All" class="responsive-img"/>

Then, select **Update Field**.

## Adding a Custom Date Range

For this widget, you want to filter the dates to only display 2018 and
not the complete data range in the original spreadsheet. In order to do
so, drag and drop the **Date** field into **Data Filters** and, under
Filter Type, select **Filter by Rule**.

<img src="images/GlobexFilterbyRule_All.png" alt="GlobexFilterbyRule\_All" class="responsive-img"/>

In the new *Rule* menu, select **Custom Date Range**.

<img src="images/GlobexFilterCustomDateRange_All.png" alt="GlobexFilterCustomDateRange\_All" class="responsive-img"/>

Then, enter January 1st through December 31st and select **Create
Filter**.

<img src="images/GlobexFilteringSpecificCustomDateRange_All.png" alt="GlobexFilteringSpecificCustomDateRange\_All" class="responsive-img"/>

By now, your visualization should look like the following one:

<img src="images/GlobexResultingVisualizationPartial_All.png" alt="GlobexResultingVisualizationPartial\_All" class="responsive-img"/>

## Selecting the Highest Value

Text Gauges only display the value in the first row of your data, but
you can still filter the data behind it to show the specific row you
want. Let's take a look at the data behind this visualization. Select
the **View Data** button in the top right corner of your visualization.

<img src="images/SelectingViewDataGlobex_All.png" alt="SelectingViewDataGlobex\_All" class="responsive-img"/>

You will see the following table:

<img src="images/GlobexViewTableBehindGauge_All.png" alt="GlobexViewTableBehindGauge\_All" class="responsive-img"/>

In this case, Globex is the stock with the highest average value. In
order to display it, you will need to introduce an additional filter.
Drag and drop **Stocks** into **Data Filters** and, in the *Filter Type*
menu, choose **Select Values**.

<img src="images/GlobexFilterSelectValues_All.png" alt="GlobexFilterSelectValues\_All" class="responsive-img"/>

Select **Globex** and then **Create Filter**.

<img src="images/GlobexFilterSelectOption_All.png" alt="GlobexFilterSelectOption\_All" class="responsive-img"/>

Your visualization will now look like the following one.

<img src="images/GlobexAverageStockValue_All.png" alt="GlobexAverageStockValue\_All" class="responsive-img"/>

If you want to verify that the visualization is displaying the correct
data, you can once again select **View Data** in the top right-hand
corner.

<div class="note">

Had the list of stocks been longer, you might not have been able to
identify the highest value that easily. You can sort your values in
ascending/descending order to help you out with bigger tables. The
[Labor](~/en/dashboard-tutorials/manufacturing-dashboard/adding-other-visualizations.html#labor-cost)
visualization of the [Manufacturing Dashboard Tutorial](~/en/dashboard-tutorials/manufacturing-dashboard/getting-started.md) has instructions on how to
apply it.

## Adding Conditional Formatting

You can add additional information to the visualization in the form of a
colored indicator, which will indicate where the value of your stock
stands in a three-value data range you can define yourself.

Go to the **Settings** section of the Visualizations Editor. You will
see a **Conditional Formatting** section, which will, by default, have
the following three ranges configured:

<img src="images/GlobexConditionalFormatting_All.png" alt="GlobexConditionalFormatting\_All" class="responsive-img"/>

Open any of the dropdowns in order to add indicators and colors to your
visualization. In this case, we will add a green up arrow for the
highest range, a yellow line for the mid-range, and a red down arrow for
the lower range. The visualization will be updated to display the
corresponding indicator.

<img src="images/GlobexConditionalFormattingApplied_All.png" alt="GlobexConditionalFormattingApplied\_All" class="responsive-img"/>

Once you have finished editing the visualization, select the **tick
button** in the top right-hand corner to return to the dashboard editor.

<img src="images/FinanceWidgetInDashboardEditor_All.png" alt="FinanceWidgetInDashboardEditor\_All" class="responsive-img"/>

>[!NOTE]
>You can resize any of your visualizations by selecting the visualization and then dragging its corners downwards or to the side.

<style>
.previous {
    text-align: left
}

.next {
    float: right
}

</style>

<a href="selecting-data-visualization.md" class="previous">&laquo; Previous Step</a>
<a href="applying-theme.md" class="next">Next Step &raquo;</a>