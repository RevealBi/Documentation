## Adding the other Visualizations

All the remaining visualizations in the dashboards will use the same
[sample spreadsheet](http://download.infragistics.com/reportplus/help/samples/Reveal_Dashboard_Tutorials.xlsx)

>[!NOTE]
>If you want to [change your data source](~/en/datasources/changing-data-source-visualization.md), you will need to select the **overflow button** next to the data source name or [create a new data source](~/en/datasources/overview.md) instead. You can also [duplicate](~/en/data-visualizations/reusing-visualizations.md) visualizations to speed up the creation process.

This section will cover the following visualizations:

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><img src="images/ThumbnailManufacturingProduction_All.png" alt="ThumbnailManufacturingProduction All" /><br />
</p>
<p><a href="#production">Production</a><br />
</p></td>
<td><p><img src="images/ThumbnailManufacturingShipping_All.png" alt="ThumbnailManufacturingShipping All" /><br />
</p>
<p><a href="#shipping">Shipping</a><br />
</p></td>
<td><p><img src="images/ThumbnailAverageHours_All.png" alt="ThumbnailAverageHours All" /><br />
</p>
<p><a href="#average-hours">Average Hours</a><br />
</p></td>
</tr>
<tr class="even">
<td><p><img src="images/ThumbnailManufacturingHeadcount_All.png" alt="ThumbnailManufacturingHeadcount All" /><br />
</p>
<p><a href="#headcount">Headcount</a><br />
</p></td>
<td><p><img src="images/ThumbnailManufacturingLaborCost_All.png" alt="ThumbnailManufacturingLaborCost All" /><br />
</p>
<p><a href="#labor-cost">Labor Cost</a><br />
</p></td>
<td></td>
</tr>
</tbody>
</table>

<a name='production'></a>
### Production

The Production visualization displays the amount of manufactured goods
for a 12-month period arranged by worker type in a [line chart](~/en/visualization-tutorials/simple-charts.md). In order to create it:

1.  Select the + button in the right corner of your dashboard, and
    select the **Manufacturing Dashboard** sheet in the
    **Reveal\_Dashboard\_Tutorials** spreadsheet. Then, select *Load
    Data*.

    <img src="images/SelectingManufacturingSheet_All.png" alt="SelectingManufacturingSheet\_All.png" width="100%"/>



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Line" chart.

    <img src="images/SelectLineChart_All.png" alt="SelectLineChart\_All" width="100%"/>



3.  In the Data Editor, drag and drop the **Worker Type** field into
    Label, and the **Production** one into Values.

    <img src="images/DragDropManufacturingProduction_All.png" alt="DragDropManufacturingProduction\_All" width="100%"/>



4.  Because the **Production** field has information on goods that were
    manufactured, the fraction digits should be removed. Select
    **Production** in Values, and change **Fraction Digits** to **0**
    under **Formatting**.

    <img src="images/ManufacturingProductionFractionDigits_All.png" alt="ManufacturingProductionFractionDigits\_All" width="100%"/>

    Then, select **Update Field**.



5.  For the line chart to match the color in the sample visualization,
    change the **Start Color** to the fifth one within the **Settings**
    screen of the Visualizations Editor.

    <img src="images/ManufacturingProductionChangingStartColor_All.png" alt="ManufacturingProductionChangingStartColor\_All" width="100%"/>



6.  **Change the title of your visualization** to "Production" **by selecting the pencil icon** next to "Manufacturing Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<a name='shipping'></a>
### Shipping

The Shipping visualization displays the amount of shipped orders for a
12 month period in an [area chart](~/en/visualization-tutorials/simple-charts.md). In order to
create it:

1.  Select the + button in the right corner of your dashboard, and
    select the **Manufacturing Dashboard** sheet in the
    **Reveal\_Dashboard\_Tutorials** spreadsheet. Then, select *Load
    Data*.

    <img src="images/SelectingManufacturingSheet_All.png" alt="SelectingManufacturingSheet\_All.png" width="100%"/>



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Area" chart.

    <img src="images/SelectAreaChart_All.png" alt="SelectAreaChart\_All" width="100%"/>



3.  In the Data Editor, drag and drop the **Month** field into Label,
    and the **Shipping Orders** one into Values.

    <img src="images/DragDropManufacturingShipping_All.png" alt="DragDropManufacturingShipping\_All" width="100%"/>



4.  By default, the date aggregation for your information will be set to
    **Year**. To change this, select the **Month** field in the
    **Label** placeholder, and change the **Date Aggregation** to
    **Month**.

    <img src="images/ManufacturingShippingChangingDateAggregation_All.png" alt="ManufacturingShippingChangingDateAggregation\_All" width="100%"/>

    Then, select **Update Field**.


5.  Because the **Shipping Orders** field has information on goods that
    were shipped to clients, the fraction digits should be removed.
    Select **Shipping Orders** in Values, and change **Fraction Digits**
    to **0** under **Formatting**.

    <img src="images/ManufacturingShippingFractionDigits_All.png" alt="ManufacturingShippingFractionDigits\_All" width="100%"/>

    Then, select **Update Field**.


6.  **Change the title of your visualization** to "Shipping" **by
    selecting the pencil icon** next to "Manufacturing Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<a name='average-hours'></a>
### Average Hours

The Average Hours visualization displays hours logged by the company's
employees compared to the hours they spent on the company's machinery
broken down by month in a [spline chart](~/en/visualization-tutorials/simple-charts.md). In
order to create it:

1.  Select the + button in the right corner of your dashboard, and
    select the **Manufacturing Dashboard** sheet in the
    **Reveal\_Dashboard\_Tutorials** spreadsheet. Then, select *Load
    Data*.

    <img src="images/SelectingManufacturingSheet_All.png" alt="SelectingManufacturingSheet\_All.png" width="100%"/>


2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Area" chart.

    <img src="images/SelectSplineChart_All.png" alt="SelectSplineChart\_All" width="100%"/>



3.  In the Data Editor, drag and drop the **Month** field into Label,
    and both the **Machine Hours** and the **Employee Hours** fields
    into Values.

    <img src="images/DragDropManufacturingAverageHours_All.png" alt="DragDropManufacturingAverageHours\_All" width="100%"/>



4.  By default, the date aggregation for your information will be set to
    **Year**. To change this, select the **Month** field in the
    **Label** placeholder, and change the **Date Aggregation** to
    **Month**.

    <img src="images/ManufacturingShippingChangingDateAggregation_All.png" alt="ManufacturingShippingChangingDateAggregation\_All" width="100%"/>

    Then, select **Update Field**.



5.  To match the sample visualization, remove the fraction digits for
    hours by selecting *both* **Average Hours** and **Machine Hours**
    from the Values placeholder, and change **Fraction Digits** to **0**
    under **Formatting**.

    <img src="images/ManufacturingAverageHoursFractionDigits_All.png" alt="ManufacturingAverageHoursFractionDigits\_All" width="100%"/>

    Then, select **Update Field**.



6.  **Change the title of your visualization** to "Average Hours" **by
    selecting the pencil icon** next to "Manufacturing Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<a name='headcount'></a>
### Headcount

The Headcount visualization displays the amount of workers broken down
by category in a [bar chart](~/en/visualization-tutorials/simple-charts.md). In order to create
it:

1.  Select the + button in the right corner of your dashboard, and
    select the **Manufacturing Dashboard** sheet in the
    **Reveal\_Dashboard\_Tutorials** spreadsheet. Then, select *Load
    Data*.

    <img src="images/SelectingManufacturingSheet_All.png" alt="SelectingManufacturingSheet\_All.png" width="100%"/>



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Area" chart.

    <img src="images/SelectBarChart_All.png" alt="SelectBarChart\_All" width="100%"/>



3.  In the Data Editor, drag and drop the **Division** field into Label,
    and the **Number of Workers** one into Values.

    <img src="images/DragDropManufacturingHeadcount_All.png" alt="DragDropManufacturingHeadcount\_All" width="100%"/>



4.  The **Number of Workers** field should display no fraction digits
    because of the information it contains refers to people. Select it
    from the Values placeholder, and change **Fraction Digits** to **0**
    under **Formatting**.

    <img src="images/ManufacturingHeadcountFractionDigits_All.png" alt="ManufacturingHeadcountFractionDigits\_All" width="100%"/>

    Then, select **Update Field**.



5.  For the bar chart to match the color in the sample visualization,
    change the **Start Color** to the fourth one within the **Settings**
    screen of the Visualizations Editor.

    <img src="images/ManufacturingHeadcountChangingStartColor_All.png" alt="ManufacturingHeadcountChangingStartColor\_All" width="100%"/>


6.  **Change the title of your visualization** to "Headcount" **by
    selecting the pencil icon** next to "Manufacturing Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<a name='labor-cost'></a>
### Labor Cost

The Labor Cost visualization displays the wages for each employee from
highest to lowest in a [column chart](~/en/visualization-tutorials/simple-charts.md). In order
to create it:

1.  Select the + button in the right corner of your dashboard, and
    select the **Manufacturing Dashboard** sheet in the
    **Reveal\_Dashboard\_Tutorials** spreadsheet. Then, select *Load
    Data*.

    <img src="images/SelectingManufacturingSheet_All.png" alt="SelectingManufacturingSheet\_All.png" width="100%"/>



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Area" chart.

    <img src="images/SelectColumnChart_All.png" alt="SelectColumnChart\_All" width="100%"/>



3.  In the Data Editor, drag and drop the **Employee** field into Label,
    and the **Labor** one into Values.

    <img src="images/DragDropManufacturingHeadcount_All.png" alt="DragDropManufacturingHeadcount\_All" width="100%"/>



4.  The Labor figures should be formatted to be shown as currency and
    with no fraction digits. In order to do this, select the **Labor**
    field from the Values placeholder and apply the following changes:

    <img src="images/ManufacturingLaborCostFormatting_All.png" alt="ManufacturingLaborCostFormatting\_All" width="100%"/>

      - **Type**: Currency

      - **Fraction Digits**: 0

        In addition, the visualization displays the wages in descending
        order. In this same dialog, change the **Sorting** from None to
        **Descending**.

        <img src="images/ManufacturingLaborCostDescendingOrder_All.png" alt="ManufacturingLaborCostDescendingOrder\_All" width="100%"/>

        Then, select **Update Field**.



5.  For the column chart to match the color in the sample visualization,
    change the **Start Color** to the second one within the **Settings**
    screen of the Visualizations Editor.

    <img src="images/ManufacturingLaborCostChangingStartColor_All.png" alt="ManufacturingLaborCostChangingStartColor\_All" width="100%"/>



6.  **Change the title of your visualization** to "Labor Cost" **by
    selecting the pencil icon** next to "Manufacturing Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<style>
.previous {
    text-align: left
}

.next {
    float: right
}

</style>

<a href="applying-theme.md" class="previous">&laquo; Previous Step</a>
<a href="saving-dashboard.md" class="next">Next Step &raquo;</a>
