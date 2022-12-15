---
title: How to Create Sparkline Charts Visualization in Slingshot
_description: A quick tutorial on creating Sparkline Charts visualization using a sample spreadsheet.
---

# Creating Sparkline Charts

In this tutorial, you will learn how to a Sparkline chart visualization
using a sample spreadsheet.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><img src="images/simple-sparkline-chart.png" alt="SparklineChartSimple All" class="responsive-img"/><br />
</p>
<p><a href="#create-sparkline">Simple Sparkline</a><br />
</p></td>
<td><p><img src="images/sparkline-area-chart.png" alt="SparklineChartArea All" class="responsive-img" /><br />
</p>
<p><a href="#change-chart-type-sparkline">Sparkline with Area Chart</a><br />
</p></td>
</tr>
<tr class="even">
<td><p><img src="images/sparkline-with-day-aggregation.png" alt="SparklineDateAggregation All" class="responsive-img" /><br />
</p>
<p><a href="#change-date-aggregation">Sparkline with Day Aggregation</a><br />
</p></td>
<td><p><img src="images/sparkline-with-less-columns-and-area-chart.png" alt="SparklineLessColumns All" class="responsive-img" /><br />
</p>
<p><a href="#modify-columns">Sparkline with less Columns and Area Chart</a><br />
</p></td>
</tr>
</tbody>
</table>

Access the links below for the Sparkline chart view walkthroughs:

  - [How to create a Sparkline chart](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/sparkline-charts#creating-a-sparkline-chart)

  - [How to change the chart type for the Sparkline](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/sparkline-charts#changing-the-chart-type-for-the-sparkline)

  - [How to change the date aggregation](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/sparkline-charts#changing-the-date-aggregation)

  - [How to modify the amount of columns in the Sparkline](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/sparkline-charts#modifying-the-amount-of-columns-in-the-sparkline)

## Key Concepts

Sparkline charts are meant to display trends and their progression in a
given date range. They are particular useful, like OHLC and Candlestick
charts, for financial scenarios and stock movement analysis. Sparklines
display line charts within a grid cell, and require:

  - **One field** to be dropped in the **Date** placeholder of the
    data editor.

  - **One field** to be dropped in **Value**.

  - **One field** to be dropped into **Category**.

When working with Sparkline charts, you can add, modify, or remove
information on top of the data you want to display. This comes in the
form of:

  - The **chart type** for your sparkline, which can either be a
    **Line** or **Area** chart.

  - The **aggregation** for the dates in your chart.

  - The **number of values** displayed within that same chart.

  - The explicit information you want to include in your sparkline's
    grid, including whether or not you want to include the **last two
    months in your data and the difference between them**.

## Sample Data Source

For this tutorial, you will use the "Sparkline Charts" sheet in the
[Reveal Tutorials Spreadsheet](https://download.infragistics.com/reportplus/help/samples/Reveal_Visualization_Tutorials.xlsx).

>[!NOTE]
>Excel files as local files are not supported in this release. In order to follow these tutorials, make sure you upload the file to one of the supported _cloud services_ or add it as a [Web Resource](~/en/datasources/supported-data-sources/web-resource.md).

<a name='create-sparkline'></a>
## Creating a Sparkline Chart


1. Select the **+ Dashboard** button in the top right-hand corner of **My Analytics**.

   <img src="images/dashboard-button-my-analytics.png" alt="Tutorials-Create-New-Dashboard" class="responsive-img" width="55%"/>  

2. Select your data source(**Reveal Tutorials Spreadsheet**) from the list of data sources. If the data source is new, you will need to first add it from the **+ Data Source** button in the top-right corner.

   <img src="images/visualization-tutorials-data-source.png" alt="Tutorials-Select-Data-Source" class="responsive-img" width="55%"/>                                         

3. Select the *Sparkline Charts* sheet.

   <img src="images/sparkline-charts-spreadsheet.png" alt="Tutorials-Select-Sparkline-Charts-Spreadsheet.png" class="responsive-img" width="55%"/>                         

4. Open the *Visualization Picker* and select the **Sparkline Chart**. By default, the visualization type will be set to **Column**.                                                                             
  <img src="images/chart-types-sparkline.png" alt="Tutorials-Charts-Select-Sparkline-Chart" class="responsive-img" width="55%"/>                                                                              
5. Drag and drop the *Date* field into **Date**, *Offer* into **Value** and *Stocks* into **Category**.

   <img src="images/sparkline-charts-organizing-data.png" alt="Tutorials-SparklineChart-Organizing-Data" class="responsive-img" width="35%"/>                                                                      
<a name='change-chart-type-sparkline'></a>
## Changing the Chart Type for the Sparkline

You may want to change the type of chart you want to use for your
sparkline chart. In order to do this:

|                                  |                                                                                        |                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | <img src="images/sparkline-charts-settings.png" alt="Setting options for sparkline charts" class="responsive-img"/>                 | Go to the **Settings** section of the Visualization Editor.         |
| 2\. **Change the Chart Type**    | <img src="images/area-sparkline-chart.png" alt="Different chart types for Sparkline" class="responsive-img"/> | By default, the chart type will be set to line. Set it to **Area**. |

<a name='change-date-aggregation'></a>
## Changing the Date Aggregation

By default, the aggregation for your information will be **12 months**.
You can change this by modifying the "Show Last" settings. In order to
do so:

|                                  |                                                                                                      |                                                                                                                                                      |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | <img src="images/sparkline-charts-settings.png" alt="Tutorials-Navigate-Settings" class="responsive-img"/>                               | Go to the **Settings** section of the Visualization Editor.                                                                                          |
| 2\. **Change the Aggregation**   | <img src="images/sparkline-chart-date-aggregation.png" alt="Tutorial-Change-Date-Aggregation-Sparkline" class="responsive-img"/> | By default, the "Show Last" setting will be set to **Months**. Select the dropdown next to Months, and change the selection to either Years or Days. |

You can also choose to display more or less data by changing the number
next to the date's aggregation.

<a name='modify-columns'></a>
## Modifying the amount of columns in the Sparkline

In Reveal, the amount of columns in the visualization is defined by
whether or not you want to display the last two months and the
difference between them. By default, these will be enabled. In order to
remove them:

|                                      |                                                                                    |                                                                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu**     | <img src="images/sparkline-charts-settings.png" alt="Tutorials-Navigate-Settings" class="responsive-img" width="100%"/>             | Go to the **Settings** section of the Visualization Editor.                                                                                              |
| 2\. **Change the Displayed Columns** | <img src="images/sparkline-chart-columns-options.png" alt="Different options for the columns in the sparkline chart" class="responsive-img" width="100%"/> | **Uncheck the "Show columns for last two values" or "Show column with difference" boxes** if you do not want to display either of them in the Sparkline. |
