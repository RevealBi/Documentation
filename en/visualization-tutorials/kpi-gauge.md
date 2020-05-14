## Creating KPI Gauges

In this tutorial, you will learn how to a KPI gauge visualization using
a sample spreadsheet.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><img src="images/KPIGaugeSimple_All.png" alt="KPIGaugeSimple All" /><br />
</p>
<p><a href="#create-kpi-gauge">KPI Gauge</a><br />
</p></td>
<td><p><img src="images/TutorialMultipleKPIGauges_All.png" alt="TutorialMultipleKPIGauges All" /><br />
</p>
<p><a href="#adding-category-kpi">Multiple KPI Gauges</a><br />
</p></td>
</tr>
<tr class="even">
<td><p><img src="images/KPIGaugePreviousMonth_All.png" alt="KPIGaugePreviousMonth All" /><br />
</p>
<p><a href="#changing-date-comparison-type">Month-over-Month KPI Gauge</a><br />
</p></td>
<td><p><img src="images/KPIGaugeValuePercentage_All.png" alt="KPIGaugeValuePercentage All" /><br />
</p>
<p><a href="#changing-difference-label-kpi">KPI Gauge with Value and Percentage differences</a><br />
</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/KPIGaugeDifferenceColor_All.png" alt="KPIGaugeDifferenceColor All" /><br />
</p>
<p><a href="#changing-color-difference-marker">KPI Gauge with a green marker when the value decreased</a><br />
</p></td>
<td></td>
</tr>
</tbody>
</table>

Access the links below for the KPI gauge view walkthroughs:

  - [How to create a KPI Gauge](#create-kpi-gauge)

  - [How to create multiple KPI Gauges in one visualization](#adding-category-kpi)

  - [How to change the date type for the KPI](#changing-date-comparison-type)

  - [How to change the difference labels for the KPI](#changing-difference-label-kpi)

  - [How to change the color for the difference marker in the KPI](#changing-color-difference-marker)

### Key Concepts

KPI gauges are meant to display performances and their variation within
a given time period. To create them, you will need:

  - **One field** to be dropped into the **Date** placeholder of the
    data editor.

  - **One field** to be dropped into **Value**.

### Sample Data Source

For this tutorial, you will use the "KPI View" sheet in the [Reveal Tutorials Spreadsheet](http://download.infragistics.com/reportplus/help/samples/Reveal_Visualization_Tutorials.xlsx).

>[!NOTE]
>Excel files as local files are not supported in this release. In order to follow these tutorials, make sure you upload the file to one of the supported [cloud services](data-sources.md) or add it as a [Web Resource](web-resource.md).

<a name='creating-kpi-gauge'></a>
### Creating a KPI Gauge

|                                          |                                                                                              |                                                                                                                                                      |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Create a Dashboard**               | ![Tutorials-Create-New-Dashboard](images/Tutorials-Create-New-Dashboard.png)                 | In the dashboard viewer, select the + button in the top right-hand corner of the "My Dashboards" screen. Then, select "Dashboard" from the dropdown. |
| 2\. **Configure your Data Source**       | ![Tutorials-Select-Data-Source](images/Tutorials-Select-Data-Source.png)                     | In the *New Visualization* window, select the + button in the bottom right corner and select your data source.                                       |
| 3\. **Select the Tutorials Spreadsheet** | ![Tutorials-Select-KPI-Gauge-Spreadsheet](images/Tutorials-Select-KPI-Gauge-Spreadsheet.png) | Once the data source is configured, select the **Reveal Tutorials Spreadsheet**. Then, choose the "KPI Gauge" sheet.                                 |
| 4\. **Open the Visualizations Menu**     | ![Tutorials-Select-Change-Visualization](images/Tutorials-Select-Change-Visualization.png)   | Select the **grid icon** in the top bar of the Visualizations Editor.                                                                                |
| 5\. **Select your Visualization**        | ![Tutorials-Select-KPI-Gauge](images/Tutorials-Select-KPI-Gauge.png)                         | By default, the visualization type will be set to "Grid". Select the **Sparkline** chart.                                                            |
| 6\. **Organize your Data**               | ![Tutorials-KPIGauge-Organizing-Data](images/Tutorials-KPIGauge-Organizing-Data.png)         | Drag and drop the "Date" field into "Date" and the "Sales" field into "Value".                                                                       |

<a name='adding-category-kpi'></a>
### Creating Multiple KPI Gauges in one Visualization

In order to create more than one KPI in one visualization, you will need
to add a field to the **category** placeholder of the data editor.

|                                          |                                                                                                      |                                                                                                                                                      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Create a Dashboard**               | ![Tutorials-Create-New-Dashboard](images/Tutorials-Create-New-Dashboard.png)                         | In the dashboard viewer, select the + button in the top right-hand corner of the "My Dashboards" screen. Then, select "Dashboard" from the dropdown. |
| 2\. **Configure your Data Source**       | ![Tutorials-Select-Data-Source](images/Tutorials-Select-Data-Source.png)                             | In the *New Visualization* window, select the + button in the bottom right corner and select your data source.                                       |
| 3\. **Select the Tutorials Spreadsheet** | ![Tutorials-Select-KPI-Gauge-Spreadsheet](images/Tutorials-Select-KPI-Gauge-Spreadsheet.png)         | Once the data source is configured, select the **Reveal Tutorials Spreadsheet**. Then, choose the "KPI Gauge" sheet.                                 |
| 4\. **Open the Visualizations Menu**     | ![Tutorials-Select-Change-Visualization](images/Tutorials-Select-Change-Visualization.png)           | Select the **grid icon** in the top bar of the Visualizations Editor.                                                                                |
| 5\. **Select your Visualization**        | ![Tutorials-Select-KPI-Gauge](images/Tutorials-Select-KPI-Gauge.png)                                 | By default, the visualization type will be set to "Grid". Select the **Sparkline** chart.                                                            |
| 6\. **Organize your Data**               | ![Tutorials-MultipleKPIGauge-Organizing-Data](images/Tutorials-MultipleKPIGauge-Organizing-Data.png) | Drag and drop the "Date" field into "Date", the "Sales" field into "Value" and the "State" field into "Category".                                    |

<a name='changing-date-comparison-type'></a>
### Changing the Date Comparison Type

By default, the date type for your KPI Gauge will be Year-over-Year. You
can change this by modifying the "Type" field. In order to do so:

|                                  |                                                                        |                                                                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png) | Go to the **Settings** section of the Visualization Editor.                                                                                    |
| 2\. **Change the Type**          | ![Tutorial-Change-Date-Type](images/Change-Date-Type.png)     | By default, the date type will be set to Year-to-Year. Select the dropdown next to **Type**, and change the selection to **Month-over-Month**. |

<a name='changingdifferencelabelkpi'></a>
### Changing the Difference Labels for the KPI Gauge

|                                  |                                                                                            |                                                                                                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)                     | Go to the **Settings** section of the Visualization Editor.                                                                                                             |
| 2\. **Change the Type**          | ![Tutorial-Change-Date-Difference-Label](images/Change-Date-Difference-Label.png) | By default, the difference label will be set to "Percentage". Select the dropdown next to **Show difference as**, and change the selection to **Value and Percentage**. |

<a name='changing-color-difference-marker'></a>
### Changing the Color of the Difference Marker

The color for the marker in the KPI gauge will be set to green for
positive values and red for negative values by default. There might be
some cases, however, when you want to represent a decrease as a positive
occurrence. In order to change this:

|                                  |                                                                                                          |                                                                                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)                                   | Go to the **Settings** section of the Visualization Editor.                                                                                                 |
| 2\. **Change the Type**          | ![Tutorial-Change-Date-Difference-Marker-Color](images/Change-Date-Difference-Marker-Color.png) | By default, the color of the marker will be set to green. Select the dropdown next to **When difference is positive**, and change the selection to **red**. |
