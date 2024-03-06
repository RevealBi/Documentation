---
title: How to Create Simple-Series Charts Visualization in Slingshot
_description: A quick tutorial on creating a Simple-Series visualization using a sample spreadsheet.
---

# Creating Simple-Series Charts

In this tutorial, you will learn how to create *Simple-Series* charts
visualizations using a sample spreadsheet.

![Visualizations made by using simple series charts](images/simple-series-charts-example.png)

![Visualizations made by using another set of simple series charts](images/simple-series-charts-example2.png)

![Another set of visualizations made with different chart](images/simple-series-charts-example3.png)

Access the links below for the Simple chart view walkthroughs:

  - [How to create an Area chart](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/simple-charts#creating-your-chart)

  - [How to add a trendline to your chart](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/simple-charts#adding-a-trendline-to-your-chart)

  - [How to change your axis configuration](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/simple-charts#changing-your-axis-configuration)

  - [How to set your axis configuration to logarithmic](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/simple-charts#setting-your-axis-configuration-as-logarithmic)

  - [How to change the start position for Doughnut and Pie charts](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/simple-charts#changing-the-start-position-for-doughnut-and-pie-charts)

  - [How to change the slice labels for Funnel, Pie and Doughnut charts](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/simple-charts#changing-the-slice-labels-for-doughnut-funnel-and-pie-charts)

## Key Concepts

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

      - *Logarithmic Axis Configuration*: if you check the *Logarithmic*
        checkbox, the scale for your values will be calculated with a
        non-linear scale which takes magnitude into account instead of
        the usual linear scale.

  - **Start Position**: for Doughnut and Pie charts, you can configure
    the start position for the chart to rotate the slices and change the
    order in which your data is presented.

  - **Slice Labels**: for Doughnut, Funnel and Pie Charts, you can
    change the slice labels to display values, percentages or both at
    the same time.

## Sample Data Source

For this tutorial, you will use the *Simple Series Charts* sheet in the [Slingshot Visualization Tutorials](https://download.infragistics.com/slingshot/samples/Slingshot_Visualization_Tutorials.xlsx).

<a name='create-basic-chart'></a>
## Creating your Chart

1. Select the **+ Dashboard** button in the top right-hand corner of **My Analytics**.

   ![Tutorials-Create-New-Dashboard](images/dashboard-button-my-analytics.png)                                      

2. Select your data source(**Slingshot Tutorials Spreadsheet**) from the list of data sources. If the data source is new, you will need to first add it from the **+ Data Source** button in the top-right corner.

   ![Selecting a data source from the list of data sources](images/visualization-tutorials-sample.png)                                          

3. Choose the **Simple Series Charts** sheet.     

   ![Selecting Simple Series Chart sheet](images/simple-series-charts-spreadsheet.png)

4. Open the *Visualization Picker* and select any of the **chart** visualizations. By default, the visualization type will be set to *Column*. 

   ![List of chart types](images/chart-types-simple-series-charts.png) 
 
5. The charts in the table above, for example, display the population for a select list of countries. Drag and drop the *Country Name* field to **Label** and the *Population* field into **Values**.                                                        
   ![Organizing the data from the Simple Series Charts sheet](images/simple-series-charts-organizing-data.png)                                   

<a name='add-trendline-chart'></a>
## Adding a Trendline to your Chart

You can add a chart trendline to display the relationship between your
chart variables or to display the overall direction of your
information. In order to do this:

|                                     |                                                                        |                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1\. **Change Settings**             | ![Tutorials-Navigate-Settings](images/settings-tutorials.png) | Go to the **Settings** section of the Visualization Editor.      |
| 2\. **Access the Chart Trendlines** | ![Chart Trendlines option in the settings](images/chart-trendline-simple-series-charts.png) | Expand the Chart Trendline dropdown by selecting the down arrow to select one of Slingshot's predefined trendlines. |

<a name='change-axis-configuration'></a>
## Changing your Axis Configuration

Similarly to the [Gauge bounds](tutorials-gauge#adding-bounds-to-your-gauge), the
chart axis configuration allows you to set the lowest and highest values
in your chart. You can use this feature to include or exclude specific
data.

|                                        |                                                                                      |                                                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Change Settings**                | ![Tutorials-Navigate-Settings](images/settings-tutorials.png)               | Go to the **Settings** section of the Visualization Editor.                                                                           |
| 2\. **Access the Axis Bounds section** | ![Axis bounds in the settings options](images/axis-bounds-section.png)                           | Navigate to *Axis Bounds*. Depending on whether you want to set the minimum or maximum value (or both), enter the value you want the chart to start or end with. |


<a name='set-logarithmic-axis'></a>
## Setting your Axis Configuration as Logarithmic

|                                           |                                                                          |                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1\. **Change Settings**                   | ![Tutorials-Navigate-Settings](images/settings-tutorials.png)   | Go to the **Settings** section of the Visualization Editor. |
| 2\. **Access the Axis option**            | ![Tutorials-Axis-Bounds](images/axis-logarithmic.png)               | Expand the Axis dropdown by selecting the down arrow and select *Logarithmic*.      |       

<a name='change-start-position'></a>
## Changing the Start Position for Doughnut and Pie Charts

|                                                   |                                                                                |                                                                                           |
| ------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| 1\. **Change Settings**                           | ![Tutorials-Navigate-Settings](images/settings-tutorials.png)         | Go to the **Settings** section of the Visualization Editor.                               |
| 2\. **Access the Start Position section**         | ![Start position settings](images/start-position-settings.png)               | Expand the *Start Position* dropdown by selecting the down arrow. Select one of Slingshot's predefined start positions for your chart (0°, 90°, 180° or 270°).                          |

<a name='change-slice-labels'></a>
## Changing the Slice Labels for Doughnut, Funnel and Pie Charts

|                                                |                                                                          |                                                                                                        |
| ---------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| 1\. **Change Settings**                        | ![Tutorials-Navigate-Settings](images/settings-tutorials.png)   | Go to the **Settings** section of the Visualization Editor.                                            |
| 2\. **Access the Slice Label section**         | ![Tutorials-Slice-Label](images/slice-label-settings.png)               | Expand the Slice Labels dropdown by selecting the down arrow. Select one of Slingshot's predefined labeling options (*Percentage*, *Value* or *Value and Percentage*).                                       |
