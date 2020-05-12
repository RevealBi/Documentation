## Creating Simple-Series Charts

In this tutorial, you will learn how to create a simple-series chart
visualization using a sample spreadsheet.

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><img src="images/areachart_all.png" alt="areachart all" /><br />
</p>
<p><a href="#create-basic-chart">Area Chart</a><br />
</p></td>
<td><p><img src="images/barchart_all.png" alt="barchart all" /><br />
</p>
<p><a href="#create-basic-chart">Bar Chart</a><br />
</p></td>
<td><p><img src="images/circularradialchart_all.png" alt="circularradialchart all" /><br />
</p>
<p><a href="#create-basic-chart">Circular/Radial Chart</a><br />
</p></td>
</tr>
<tr class="even">
<td><p><img src="images/columnchart_all.png" alt="columnchart all" /><br />
</p>
<p><a href="#create-basic-chart">Column Chart</a><br />
</p></td>
<td><p><img src="images/doughnutchart_all.png" alt="doughnutchart all" /><br />
</p>
<p><a href="#create-basic-chart">Doughnut Chart</a><br />
</p></td>
<td><p><img src="images/funnelchart_all.png" alt="funnelchart all" /><br />
</p>
<p><a href="#create-basic-chart">Funnel Chart</a><br />
</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/linechart_all.png" alt="linechart all" /><br />
</p>
<p><a href="#create-basic-chart">Line Chart</a><br />
</p></td>
<td><p><img src="images/piechart_all.png" alt="piechart all" /><br />
</p>
<p><a href="#create-basic-chart">Pie Chart</a><br />
</p></td>
<td><p><img src="images/splineareachart_all.png" alt="splineareachart all" /><br />
</p>
<p><a href="#create-basic-chart">Spline with Area Chart</a><br />
</p></td>
</tr>
<tr class="even">
<td><p><img src="images/splinechart_all.png" alt="splinechart all" /><br />
</p>
<p><a href="#create-basic-chart">Spline Chart</a><br />
</p></td>
<td><p><img src="images/stepareachart_all.png" alt="stepareachart all" /><br />
</p>
<p><a href="#create-basic-chart">Step Area Chart</a><br />
</p></td>
<td><p><img src="images/steplinechart_all.png" alt="steplinechart all" /><br />
</p>
<p><a href="#create-basic-chart">Step Line Chart</a><br />
</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/chartquarticfit_all.png" alt="chartquarticfit all" /><br />
</p>
<p><a href="#add-trendline-chart">Chart with Quartic Fit Trendline</a><br />
</p></td>
<td><p><img src="images/chartbounds_all.png" alt="chartbounds all" /><br />
</p>
<p><a href="#change-axis-configuration">Chart with Bounds</a><br />
</p></td>
<td><p><img src="images/chartlogarithmicaxis_all.png" alt="chartlogarithmicaxis all" /><br />
</p>
<p><a href="#set-logarithmic-axis">Chart with Logarithmic Axis Configuration</a><br />
</p></td>
</tr>
<tr class="even">
<td><p><img src="images/chartstartposition270_all.png" alt="chartstartposition270 all" /><br />
</p>
<p><a href="#change-start-position">Doughnut Chart with 270° Start Position</a><br />
</p></td>
<td><p><img src="images/chartslicelabels_all.png" alt="chartslicelabels all" /><br />
</p>
<p><a href="#change-slice-labels">Doughnut Chart with <em>Value and Percentage</em> slice labels</a><br />
</p></td>
<td></td>
</tr>
</tbody>
</table>

Access the links below for the Simple chart view walkthroughs:

  - [How to create an Area chart](#create-basic-chart)

  - [How to change your chart type](#changing-chart-type)

  - [How to add a trendline to your chart](#add-trendline-chart)

  - [How to change your axis configuration](#change-axis-configuration)

  - [How to set your axis configuration to logarithmic](#set-logarithmic-axis)

  - [How to change the start position for Doughnut and Pie charts](#change-start-position)

  - [How to change the slice labels for Funnel,Pie and Doughnut harts](#change-slice-labels)

### Key Concepts

When working with charts, you can add extra information on top of the
data you want to display. This comes in the form of:

  - **Chart Trendlines**, which will display as lines across your chart.
    These are particularly useful when you want to display the
    relationship between your variables or the overall direction your
    information is taking. There are several algorithms, also known as
    regressions, which you can apply to your charts; you can select them
    within the *Chart Trendline* dropdown.

  - **Axis Configuration**: the axis configuration lets you configure
    the minimum and maximum values for your charts. The minimum value is
    set to 0 by default and the maximum calculated automatically
    depending on your values.

      - *Logarithmic Axis Configuration*: if you check the "Logarithmic"
        checkbox, the scale for your values will be calculated with a
        non-linear scale which takes magnitude into account instead of
        the usual linear scale.

  - **Start Position**: for Doughnut and Pie charts, you can configure
    the start position for the chart to rotate the slices and change the
    order in which your data is presented.

  - **Slice Labels**: for Doughnut, Funnel, and Pie Charts, you can
    change the slice labels to display values, percentages, or both at
    the same time.

### Sample Data Source

For this tutorial, you will use the "Simple Series Charts" sheet in the
[Reveal Tutorials Spreadsheet](http://download.infragistics.com/Reveal/help/samples/Reveal-Tutorials-Spreadsheet.xlsx).

>[!NOTE]
>Excel files as local files are not supported in this release. In order to follow these tutorials, make sure you upload the file to one of the supported [cloud services](data-sources.md) or add it as a [Web Resource](web-resource.md).

<a name='create-basic-chart'></a>
### Creating your Chart

|                                          |                                                                                                                   |                                                                                                                                                                                                |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Create a Dashboard**               | ![Tutorials-Create-New-Dashboard](images/Tutorials-Create-New-Dashboard.png)                                      | In the dashboard viewer, select the + button in the top right-hand corner of the "My Dashboards" screen. Then, select "Dashboard" from the dropdown.                                           |
| 2\. **Configure your Data Source**       | ![Tutorials-Select-Data-Source](images/Tutorials-Select-Data-Source.png)                                          | In the *New Visualization* window, select the + button in the bottom right corner and select your data source.                                                                                 |
| 3\. **Select the Tutorials Spreadsheet** | ![Tutorials-Select-Simple-Series-Charts-Spreadshee](images/Tutorials-Select-Simple-Series-Charts-Spreadsheet.png) | Once the data source is configured, select the **Reveal Tutorials Spreadsheet**. Then, choose the "Simple Series Charts" sheet.                                                                |
| 4\. **Open the Visualizations Menu**     | ![Tutorials-Select-Change-Visualization](images/Tutorials-Select-Change-Visualization.png)                        | Select the **grid icon** in the top bar of the Visualizations Editor.                                                                                                                          |
| 5\. **Select your Visualization**        | ![Tutorials-Charts-Select-Visualization](images/Tutorials-Charts-Select-Visualization.png)                        | By default, the visualization type will be set to "Grid". Select any of the **chart** visualizations.                                                                                          |
| 6\. **Organize your Data**               | ![Tutorials-Charts-Organizing-Data](images/Tutorials-Charts-Organizing-Data.png)                                  | The charts in the table above, for example, display the population for a select list of countries. Drag and drop the "Country Name" field to "Label" and the "Population" field into "Values". |

### Changing your Chart Type

The tutorial above outlines how to create any chart. If you need to
choose a different type, more fitted to your needs, go through the
following procedure:

|                                      |                                                                                            |                                                                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Open the Visualizations Menu** | ![Tutorials-Select-Change-Visualization](images/Tutorials-Select-Change-Visualization.png) | Select the **grid icon** in the top bar of the Visualizations Editor.                                                           |
| 2\. **Select your Visualization**    | ![Tutorials-Charts-Select-Visualization](images/Tutorials-Charts-Select-Visualization.png) | Select the type of chart you need. This section has a preview of every chart type at the top. |

<a name='add-trendline-chart'></a>
### Adding a Trendline to your Chart

You can add a chart trendline to display the relationship between your
chart variables, or to display the overall direction of your
information. In order to do this:

|                                     |                                                                        |                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1\. **Change Settings**             | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png) | Go to the **Settings** section of the Visualization Editor.      |
| 2\. **Access the Chart Trendlines** | ![Tutorials-Expand-Trendlines](images/Tutorials-Expand-Trendlines.png) | Expand the Chart Trendline dropdown by selecting the down arrow. |
| 3\. **Select a Chart trendline**    | ![Select-Predefined-Trendline](images/Select-Predefined-Trendline.png) | Select one of Reveal's predefined trendlines.                    |

<a name='change-axis-configuration'></a>
### Changing your Axis Configuration

Similarly to the [Gauge bands](~/en/data-visualizations/gauge-views.html#bands-configuration), the
chart axis configuration allows you to set the lowest and highest values
in your chart. You can use this feature to include or exclude specific
data.

|                                        |                                                                                      |                                                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Change Settings**                | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)               | Go to the **Settings** section of the Visualization Editor.                                                                           |
| 2\. **Access the Axis Bounds section** | ![Tutorials-Axis-Bounds](images/Tutorials-Axis-Bounds.png)                           | Navigate to Axis Bounds.                                                                                                              |
| 3\. **Change the Default selection**   | ![Tutorials-Change-Default-Selection](images/Tutorials-Change-Default-Selection.png) | Depending on whether you want to set the minimum or maximum value (or both), enter the value you want the chart to start or end with. |

<a name='set-logarithmic-axis'></a>
### Setting your Axis Configuration as Logarithmic

|                                           |                                                                          |                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1\. **Change Settings**                   | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)   | Go to the **Settings** section of the Visualization Editor. |
| 2\. **Access the Axis option**            | ![Tutorials-Axis-Bounds](images/Tutorials-Axis-Bounds.png)               | Expand the Axis dropdown by selecting the down arrow.       |
| 3\. **Select an Axis Configuration type** | ![Tutorials-Charts-Logarithmic](images/Tutorials-Charts-Logarithmic.png) | Select "Logarithmic".                                       |

<a name='change-start-position'></a>
### Changing the Start Position for Doughnut and Pie Charts

|                                                   |                                                                                |                                                                                           |
| ------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| 1\. **Change Settings**                           | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)         | Go to the **Settings** section of the Visualization Editor.                               |
| 2\. **Access the Start Position section**         | ![Tutorials-Start-Position](images/Tutorials-Start-Position.png)               | Expand the Start Position dropdown by selecting the down arrow.                           |
| 3\. **Select one of the Start Position options**. | ![Tutorials-Select-Start-Position](images/Tutorials-Select-Start-Position.png) | Select one of Reveal's predefined start positions for your chart (0°, 90°, 180° or 270°). |

<a name='change-slice-labels'></a>
### Changing the Slice Labels for Doughnut, Funnel, and Pie Charts

|                                                |                                                                          |                                                                                                        |
| ---------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| 1\. **Change Settings**                        | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)   | Go to the **Settings** section of the Visualization Editor.                                            |
| 2\. **Access the Slice Label section**         | ![Tutorials-Slice-Label](images/Tutorials-Slice-Label.png)               | Expand the Slice Labels dropdown by selecting the down arrow.                                          |
| 3\. **Select one of the Slice Label options**. | ![Tutorials-Select-Slice-Label](images/Tutorials-Select-Slice-Label.png) | Select one of Reveal's predefined labeling options ("Percentage", "Value", or "Value and Percentage"). |
