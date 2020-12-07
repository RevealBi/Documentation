## Adding the other Visualizations

All the remaining visualizations in the dashboards will use the same
[sample spreadsheet](http://download.infragistics.com/reportplus/help/samples/Reveal_Dashboard_Tutorials.xlsx)

>[!NOTE]
>If you want to [change your data source](~/en/datasources/changing-data-source-visualization.md), you will need to select the **overflow button** next to the data source name or [create a new data source](~/en/datasources/overview.md) instead. You can also [duplicate](~/en/data-visualizations/reusing-visualizations.md) visualizations to speed up the creation process.

This section will cover the following visualizations:

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><img src="images/ThumbnailWinLostMonth_All.png" alt="ThumbnailWinLostMonth All" width="75%" /><br />
</p>
<p><a href="#win-lost-by-month">Win/Lost by Month</a><br />
</p></td>
<td><p><img src="images/ThumbnailForecasted_All.png" alt="ThumbnailForecasted All" width="75%" /><br />
</p>
<p><a href="#forecasted">Forecasted</a><br />
</p></td>
<td><p><img src="images/ThumbnailLostOpportunities_All.png" alt="ThumbnailLostOpportunities All" width="75%" /><br />
</p>
<p><a href="#lost-opportunities">Lost Opportunities</a><br />
</p></td>
<td><p><img src="images/ThumbnailPipelinebyTerritory_All.png" alt="ThumbnailPipelinebyTerritory All" width="75%" /><br />
</p>
<p><a href="#pipeline-by-territory">Pipeline by Territory</a><br />
</p></td>
</tr>
<tr class="even">
<td><p><img src="images/ThumbnailTotalOpportunities_All.png" alt="ThumbnailTotalOpportunities All" width="75%" /><br />
</p>
<p><a href="#total-opportunities">Total Opportunities</a><br />
</p></td>
<td><p><img src="images/ThumbnailRevenuebyTerritory_All.png" alt="ThumbnailRevenuebyTerritory All" width="75%" /><br />
</p>
<p><a href="#revenue-by-territory">Revenue by Territory</a><br />
</p></td>
<td><p><img src="images/ThumbnailPipelineEmployee_All.png" alt="ThumbnailPipelineEmployee All" width="75%" /><br />
</p>
<p><a href="#pipeline-per-employee">Pipeline per Employee</a><br />
</p></td>
<td><p><img src="images/ThumbnailSalesbyProduct_All.png" alt="ThumbnailSalesbyProduct All" width="75%" /><br />
</p>
<p><a href="#sales-by-product">Sales by Product</a><br />
</p></td>
</tr>
</tbody>
</table>

<a name='win-lost-by-month'></a>
### Win/Lost by Month

The Win/Lost by Month visualization displays the amount of won and lost
opportunities for a six-month period in a [column chart](~/en/visualization-tutorials/simple-charts.md). In order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Sales Dashboard** option is
    selected, and then press **Load Data**.

    <img src="images/SelectingSalesSheet_All.png" alt="SelectingSalesSheet\_All.png" width="100%" />



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Column" chart.

    <img src="images/SelectColumnChart_All.png" alt="SelectColumnChart\_All" width="100%" />



3.  In the Data Editor, drag and drop the **Date** field into Label, and
    the **Win** and **Loss** fields into Values.

    <img src="images/DragDropSalesWinLossMonth_All.png" alt="DragDropSalesWinLossMonth\_All" width="50%" />



4.  The data displayed in this visualization displays data by **month**.
    In order to match this format, select **Date** in the Label
    placeholder, and change the **Date Aggregation** to **Month**.

    <img src="images/SalesWinLostByMonthDateAggregation_All.png" alt="SalesWinLostByMonthDateAggregation\_All" width="50%" />

    Then, select **Update Field**.



5.  In order for the visualization to display a six-month period, you
    will need to add a filter. To do this, drop **Date** into Data
    Filters and select it to access the Visualization Filter menu.
    Within it, select **Filter by Rule** under **Filter Type**.

    <img src="images/FilterbyRuleSalesWinLost_All.png" alt="FilterbyRuleSalesWinLost\_All" width="50%" />

    Then, select **Custom Date Range** under **Rule**, and enter the
    following custom range:

    <img src="images/SalesCustomDateRange_All.png" alt="SalesCustomDateRange\_All" width="50%" />

    After this, select **Update Field**.



6.  **Change the title of your visualization** to "Win/Lost by Month"
    **by selecting the pencil icon** next to "Sales Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<a name='forecasted'></a>
### Forecasted

The Forecasted visualization displays the forecast for a six month
period in a [bar chart](~/en/visualization-tutorials/simple-charts.md). In order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Sales Dashboard** option is
    selected, and then press **Load Data**.

    <img src="images/SelectingSalesSheet_All.png" alt="SelectingSalesSheet\_All.png" width="100%" />



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Bar" chart.

    <img src="images/SelectBarChart_All.png" alt="SelectBarChart\_All" width="100%" />



3.  In the Data Editor, drag and drop the **Date** field into Label, and
    the **Forecasted** field into Values.

    <img src="images/DragDropSalesForecasted_All.png" alt="DragDropSalesForecasted\_All" width="50%" />



4.  The data displayed in this visualization displays data by **month**.
    In order to match this format, select **Date** in the Label
    placeholder, and change the **Date Aggregation** to **Month**. Also,
    change the **Sorting** to **Descending**.

    <img src="images/SalesWinLostByMonthDateAggregation_All.png" alt="SalesWinLostByMonthDateAggregation\_All" width="50%" />

    Then, select **Update Field**.



5.  Because the **Forecasted** field has sales information, it should be
    formatted as currency. Select the **Forecasted** field in Values,
    and apply the following changes:

    <img src="images/SalesForecastedFormatting_All.png" alt="SalesForecastedFormatting\_All" width="50%" />

    a.  Change the **Type** to **Currency**.

    b.  Change the **Fraction Digits** to **0**.
        Then, select **Update Field**.



6.  In order for the visualization to display a six-month period, you
    will need to add a filter. To do this, drop **Date** into Data
    Filters and select it to access the Visualization Filter menu.
    Within it, select **Filter by Rule** under **Filter Type**.

    <img src="images/FilterbyRuleSalesWinLost_All.png" alt="FilterbyRuleSalesWinLost\_All" width="50%" />

    Then, select **Custom Date Range** under **Rule**, and enter the
    following custom range:

    <img src="images/SalesCustomDateRange_All.png" alt="SalesCustomDateRange\_All" width="50%" />

    Then, select **Update Field**.



7.  To match the sample visualization's color, go to the **Settings**
    section and change the color to the third one.

    <img src="images/SalesForecastedStartColor_All.png" alt="SalesForecastedStartColor\_All" width="50%" />



8.  **Change the title of your visualization** to "Forecasted" **by
    selecting the pencil icon** next to "Sales Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<a name='lost-opportunities'></a>
### Lost Opportunities

The Lost Opportunities visualization simply displays the percentage of
opportunities which were missed in a [Text Gauge](~/en/visualization-tutorials/gauge-views.html#text-gauge). In order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Sales Dashboard** option is
    selected, and then press **Load Data**.

    <img src="images/SelectingSalesSheet_All.png" alt="SelectingSalesSheet\_All.png" width="100%" />



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Text" gauge.

    <img src="images/SelectTextGauge_All.png" alt="SelectTextGauge\_All" width="100%" />



3.  In the Data Editor, drag and drop **Lost Opportunities** field into
    Value.

    <img src="images/DragDropSalesLostOpportunities_All.png" alt="DragDropSalesLostOpportunities\_All" width="50%" />



4.  In the sample dashboard, the lost opportunities are represented as a
    percentage. In order to apply this formatting, select the **Lost
    Opportunities** field in the Value placeholder. In the formatting
    menu:

    <img src="images/SalesWonOpportFormatting_All.png" alt="SalesWonOpportFormatting\_All" width="50%" />

    a.  Change the **Type** to **Percent**.

    b.  Change the **Fraction Digits** to **0**. Then, select **Update Field**.

The yellow dash indicator in the sample is meant to represent that the
figure has remained stable in comparison with the last period. This
marker is created through the bands configurations in the gauge's
settings. In order to add it:

1.  Go to the **Settings** tab in the Visualization Editor.

    <img src="images/TutorialsSettingsMenu_All.png" alt="TutorialsSettingsMenu\_All" width="50%" />



2.  In the "Sales Dashboard" spreadsheet, "Lost Opportunities" equals
    0.56 as the value, even though the visualization is expressed as a
    percentage. Therefore, scroll down to **Value Comparison Type** and
    set it to "Number".

    <img src="images/TutorialsValueComparisonTypeNumber_All.png" alt="TutorialsValueComparisonTypeNumber\_All" width="50%" />



3.  **Set your bounds**. In this case, the bounds are within 0.7 and
    0.5.

    <img src="images/SalesChangingBandLostOpps_All.png" alt="SalesChangingBandLostOpps\_All" width="50%" />



4.  Select each band and **select both the color and the indicator**.

    <img src="images/SalesChangingBandColorIndicator_All.png" alt="SalesChangingBandColorIndicator\_All" width="50%" />



5.  **Change the title of your visualization** to "Lost Opportunities"
    **by selecting the pencil icon** next to "Sales Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<a name='pipeline-by-territory'></a>
### Pipeline by Territory

The Pipeline by Territory visualizations displays the average sales
prospects and where they are located in a [funnel chart](~/en/visualization-tutorials/simple-charts.md). In order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Sales Dashboard** option is
    selected, and then press **Load Data**.

    <img src="images/SelectingSalesSheet_All.png" alt="SelectingSalesSheet\_All.png" width="100%" />



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Funnel" chart.

    <img src="images/SelectFunnelChart_All.png" alt="SelectFunnelChart\_All" width="100%" />



3.  In the Data Editor, drag and drop **Territory** into Labels and
    **Pipeline** into Value.

    <img src="images/DragDropSalesPipelineTerritory_All.png" alt="DragDropSalesPipelineTerritory\_All" width="50%" />



4.  The **Territory** has many empty values because there are only 4
    territories, but more than 1000 values for the other columns in the
    original data source. In order to filter the values, drag and drop
    **Territory** into Data Filters.

    <img src="images/DragDropTerritoryDataFilter_All.png" alt="DragDropTerritoryDataFilter\_All" width="50%" />

    Then, select it to access the **Visualization Filter** dialog. Once
    there, change the **Filter Type** to **Filter Empty Values**, and
    select **Create Filter**.

    <img src="images/SalesPipelineTerritoryFilterEmptyValues_All.png" alt="SalesPipelineTerritoryFilterEmptyValues\_All" width="50%" />



5.  **Change the title of your visualization** to "Pipeline by
    Territory" **by selecting the pencil icon** next to "Sales
    Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<a name='opportunities'></a>
### Total Opportunities

The Total Opportunities visualization displays the revenue the
opportunities represented for the company for a 12 month period in a
[line chart](~/en/visualization-tutorials/simple-charts.md). In order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Sales Dashboard** option is
    selected, and then press **Load Data**.

    <img src="images/SelectingSalesSheet_All.png" alt="SelectingSalesSheet\_All.png" width="100%" />



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Line" chart.

    <img src="images/SelectLineChart_All.png" alt="SelectLineChart\_All" width="100%" />



3.  In the Data Editor, drag and drop the **Date** into Labels and
    **Total Opportunities** into Values.

    <img src="images/DragDropSalesTotalOpportunities_All.png" alt="DragDropSalesTotalOpportunities\_All" width="50%" />



4.  The data displayed in this visualization displays data by **month**.
    In order to match this format, select **Date** in the Label
    placeholder, and change the **Date Aggregation** to **Month**.

    <img src="images/SalesWinLostByMonthDateAggregation_All.png" alt="SalesWinLostByMonthDateAggregation\_All" width="50%" />

    Then, select **Update Field**.



5.  Because the **Total Opportunities** field has sales information, it
    should be formatted as currency. Select the **Total Opportunities**
    field in Values, and apply the following changes:

    <img src="images/SalesForecastedFormatting_All.png" alt="SalesForecastedFormatting\_All" width="50%" />

    1.  Change the **Type** to **Currency**.

    2.  Change the **Fraction Digits** to **0**

        Then, select **Update Field**.



6.  In order for the visualization to display a 12 month period, you
    will need to add a filter. To do this, drop **Date** into Data
    Filters and select it to access the Visualization Filter menu.
    Within it, select **Filter by Rule** under **Filter Type**.

    <img src="images/FilterbyRuleSalesWinLost_All.png" alt="FilterbyRuleSalesWinLost\_All" width="50%" />

    Then, select **Custom Date Range** under **Rule**, and enter the
    following custom range:

    <img src="images/SalesTotalOppsCustomDateRange_All.png" alt="SalesTotalOppsCustomDateRange\_All" width="50%" />

    Then, select **Update Filter**.



7.  To match the sample visualization's color, go to the **Settings**
    section and change the color to the seventh one.

    <img src="images/SalesTotalOpportunitiesStartColor_All.png" alt="SalesTotalOpportunitiesStartColor\_All" width="50%" />



8.  **Change the title of your visualization** to "Total Opportunities"
    **by selecting the pencil icon** next to "Sales Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<a name='revenue-by-territory'></a>
### Revenue by Territory

The Revenue by Territory displays the revenue represented by each region
for the company in a [pie chart](~/en/visualization-tutorials/simple-charts.md). In order to
create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Sales Dashboard** option is
    selected, and then press **Load Data**.

    <img src="images/SelectingSalesSheet_All.png" alt="SelectingSalesSheet\_All.png" width="100%" />



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Pie" chart.

    <img src="images/SelectPieChart_All.png" alt="SelectPieChart\_All" width="100%" />



3.  In the Data Editor, drag and drop **Territory** into Label and
    **Sales Territory** into Value.

    <img src="images/DragDropRevenueTerritory_All.png" alt="DragDropRevenueTerritory\_All" width="50%" />



4.  In the sample visualization, the pie chart has a different start
    position. In order to udpate it, go to the **Settings** tab of the
    Visualizations Editor and change the **Start Position** to **90°**.

    <img src="images/SalesRevenuebyTerritoryStartPosition_All.png" alt="SalesRevenuebyTerritoryStartPosition\_All" width="50%" />



5.  **Change the title of your visualization** to "Revenue by Territory"
    **by selecting the pencil icon** next to "Sales Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<a name='pipeline-per-employee'></a>
### Pipeline per Employee

The Pipeline per Employee visualization displays the top 10 sales
prospects per employee in a [column chart](~/en/visualization-tutorials/simple-charts.md). In
order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Sales Dashboard** option is
    selected, and then press **Load Data**.

    <img src="images/SelectingSalesSheet_All.png" alt="SelectingSalesSheet\_All.png" width="100%" />



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Column" chart.

    <img src="images/SelectColumnChart_All.png" alt="SelectTextGauge\_All" width="100%" />



3.  In the Data Editor, drag and drop **Employee** into Label and
    **Pipeline** into Values.

    <img src="images/DragDropPipelineEmployee_All.png" alt="DragDropPipelineEmployee\_All" width="50%" />



4.  The **Pipeline** values refer to sales prospects and should,
    therefore, be formatted as currency. Select the **Pipeline** field
    in Values, and apply the following changes:

    <img src="images/SalesForecastedFormatting_All.png" alt="SalesForecastedFormatting\_All" width="50%" />

    1.  Change the **Type** to **Currency**.

    2.  Change the **Fraction Digits** to **0**

        Then, select **Update Field**.



5.  This visualization displays the top 10 prospects, and therefore
    needs a filter. To do this, select the **Add Data Filters** and
    scroll down to the bottom of the list. You will see the aggregated
    **Pipeline** field; select it.

    <img src="images/SelectPipelineDataEditor_All.png" alt="SelectPipelineDataEditor\_All" width="50%" />

    Then, select **Top Items** under **Rule** and enter **10**.

    <img src="images/SalesPipelineEmployeeTop10_All.png" alt="SalesPipelineEmployeeTop10\_All" width="50%" />

    Select **Create Filter** to apply the changes.



6.  To match the sample visualization's color, go to the **Settings**
    section and change the color to the fifth one.

    <img src="images/SalesPipelineEmployeeStartColor_All.png" alt="SalesPipelineEmployeeStartColor\_All" width="50%" />



7.  **Change the title of your visualization** to "Pipeline by Employee"
    **by selecting the pencil icon** next to "Sales Dashboard".

Once you are done, go back to the Dashboard Editor by selecting the
**tick icon** in the top right-hand corner.

<a name='sales-by-product'></a>
### Sales by Product

The Sales by Product visualization displays the different company
products and the percentage of sales for each one in a [doughnut chart](~/en/visualization-tutorials/simple-charts.md). In order to create it:

1.  Select the + button in the right corner of your dashboard. In the
    New Visualization dialog, select the
    **Reveal\_Dashboard\_Tutorials** spreadsheet in the **Data in
    Dashboard** section. Make sure the **Sales Dashboard** option is
    selected, and then press **Load Data**.

    <img src="images/SelectingSalesSheet_All.png" alt="SelectingSalesSheet\_All.png" width="100%" />



2.  **Open the visualizations picker** by selecting the grid icon in the
    top bar, and select the "Doughnut" chart.

    <img src="images/SelectDoughnutChart_All.png" alt="SelectFunnelChart\_All" width="100%" />



3.  In the Data Editor, drag and drop **Product** into Label and **Sales
    Product** into Value.

    <img src="images/DragDropSalesProduct_All.png" alt="DragDropSalesProduct\_All" width="50%" />



4.  In the sample visualization, the pie chart has a different start
    position. In order to udpate it, go to the **Settings** tab of the
    Visualizations Editor and change the **Start Position** to **90°**.

    <img src="images/SalesRevenuebyTerritoryStartPosition_All.png" alt="SalesRevenuebyTerritoryStartPosition\_All" width="50%" />



5.  **Change the title of your visualization** to "Pipeline by Employee"
    **by selecting the pencil icon** next to "Sales Dashboard".

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
