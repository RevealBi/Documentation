## Creating Sparkline Charts

In this tutorial, you will learn how to a Sparkline chart visualization
using a sample spreadsheet.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><img src="images/SparklineChartSimple_All.png" alt="SparklineChartSimple All" /><br />
</p>
<p><a href="#create-sparkline">Simple Sparkline</a><br />
</p></td>
<td><p><img src="images/SparklineChartArea_All.png" alt="SparklineChartArea All" /><br />
</p>
<p><a href="#change-chart-type-sparkline">Sparkline with Area Chart</a><br />
</p></td>
</tr>
<tr class="even">
<td><p><img src="images/SparklineDateAggregation_All.png" alt="SparklineDateAggregation All" /><br />
</p>
<p><a href="#change-date-aggregation">Sparkline with Day Aggregation</a><br />
</p></td>
<td><p><img src="images/SparklineLessColumns_All.png" alt="SparklineLessColumns All" /><br />
</p>
<p><a href="#modify-columns">Sparkline with less Columns and Area Chart</a><br />
</p></td>
</tr>
</tbody>
</table>

Access the links below for the Sparkline chart view walkthroughs:

  - [How to create a Sparkline chart](#create-sparkline)

  - [How to change the chart type for the Sparkline](#change-chart-type-sparkline)

  - [How to change the date aggregation](#change-datea-ggregation)

  - [How to modify the amount of columns in the Sparkline](#modify-columns)

### Key Concepts

Sparkline charts are meant to display trends and their progression in a
given date range. They are particular useful, like OHLC and Candlestick
charts, for financial scenarios and stock movement analysis. Sparklines
display line charts within a grid cell, and require:

  - **One field** to be dropped in the **"Date"** placeholder of the
    data editor.

  - **One field** to be dropped in **"Value"**.

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

### Sample Data Source

For this tutorial, you will use the "Sparkline Charts" sheet in the
[Reveal Tutorials Spreadsheet](http://download.infragistics.com/reportplus/help/samples/Reveal_Visualization_Tutorials.xlsx).

>[!NOTE]
>Excel files as local files are not supported in this release. In order to follow these tutorials, make sure you upload the file to one of the supported [cloud services](data-sources.md) or add it as a [Web Resource](web-resource.md).

<a name='create-sparkline'></a>
### Creating a Sparkline Chart

|                                          |                                                                                                                |                                                                                                                                                      |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Create a Dashboard**               | ![Tutorials-Create-New-Dashboard](images/Tutorials-Create-New-Dashboard.png)                                   | In the dashboard viewer, select the + button in the top right-hand corner of the "My Dashboards" screen. Then, select "Dashboard" from the dropdown. |
| 2\. **Configure your Data Source**       | ![Tutorials-Select-Data-Source](images/Tutorials-Select-Data-Source.png)                                       | In the *New Visualization* window, select the + button in the bottom right corner and select your data source.                                       |
| 3\. **Select the Tutorials Spreadsheet** | ![Tutorials-Select-Sparkline-Charts-Spreadsheet.png](images/Tutorials-Select-Sparkline-Charts-Spreadsheet.png) | Once the data source is configured, select the **Reveal Tutorials Spreadsheet**. Then, choose the "Sparkline Charts" sheet.                          |
| 4\. **Open the Visualizations Menu**     | ![Tutorials-Select-Change-Visualization](images/Tutorials-Select-Change-Visualization.png)                     | Select the **grid icon** in the top bar of the Visualizations Editor.                                                                                |
| 5\. **Select your Visualization**        | ![Tutorials-Charts-Select-Sparkline-Chart](images/Tutorials-Charts-Select-Sparkline-Chart.png)                 | By default, the visualization type will be set to "Grid". Select the **Sparkline** chart.                                                            |
| 6\. **Organize your Data**               | ![Tutorials-SparklineChart-Organizing-Data](images/Tutorials-SparklineChart-Organizing-Data.png)               | Drag and drop the "Date" field into "Date", "Offer" into "Value" and "Stocks" into "Category".                                                       |

<a name='change-chart-type-sparkline'></a>
### Changing the Chart Type for the Sparkline

You may want to change the type of chart you want to use for your
sparkline chart. In order to do this:

|                                  |                                                                                        |                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)                 | Go to the **Settings** section of the Visualization Editor.         |
| 2\. **Change the Chart Type**    | ![Tutorial-Change-Chart-Configuration](images/Change-Chart-Configuration.png) | By default, the chart type will be set to line. Set it to **Area**. |

<a name='change-date-aggregation'></a>
### Changing the Date Aggregation

By default, the aggregation for your information will be **12 months**.
You can change this by modifying the "Show Last" settings. In order to
do so:

|                                  |                                                                                                      |                                                                                                                                                      |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)                               | Go to the **Settings** section of the Visualization Editor.                                                                                          |
| 2\. **Change the Aggregation**   | ![Tutorial-Change-Date-Aggregation-Sparkline](images/Change-Date-Aggregation-Sparkline.png) | By default, the "Show Last" setting will be set to **Months**. Select the dropdown next to Months, and change the selection to either Years or Days. |

You can also choose to display more or less data by changing the number
next to the date's aggregation.

<a name='modify-columns'></a>
### Modifying the amount of columns in the Sparkline

In Reveal, the amount of columns in the visualization is defined by
whether or not you want to display the last two months and the
difference between them. By default, these will be enabled. In order to
remove them:

|                                      |                                                                                    |                                                                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu**     | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)             | Go to the **Settings** section of the Visualization Editor.                                                                                              |
| 2\. **Change the Displayed Columns** | ![Tutorial-Remove-Columns-Sparkline](images/Remove-Columns-Sparkline.png) | **Uncheck the "Show columns for last two values" or "Show column with difference" boxes** if you do not want to display either of them in the Sparkline. |
