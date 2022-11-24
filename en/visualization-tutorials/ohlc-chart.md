---
title: How to Create OHLC Visualizations in Slingshot 
_description: A quick tutorial on creating OHLC visualizations using a sample spreadsheet.
---

# Creating OHLC Visualizations

In this tutorial, you will learn how to a OHLC chart visualization using
a sample spreadsheet.

<img src="images/ohlc-charts-example.png" alt="Tutorials-Select-OHLC-Candlestick-Charts-Spreadsheet" class="responsive-img" width="85%"/>


Access the links below for the OHLC chart view walkthroughs:

  - [How to create an OHLC chart](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/ohlc-chart#creating-a-ohlc-chart)

  - [How to change your axis configuration](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/ohlc-chart#changing-your-axis-configuration)

  - [How to set your axis configuration to logarithmic](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/ohlc-chart#setting-your-axis-configuration-as-logarithmic)

## Key Concepts

Like Candlestick Charts, OHLC charts are meant to show the opening,
high, low and closing prices for any financial data. They are
particularly useful for financial scenarios and stock movement analysis.
This chart displays numerical values in vertical axes, with the two
horizontal lines in each vertical axis representing the "Open" and
"Close" values.

OHLC charts, therefore, require:

  - **One field to be dropped into the "Label"** placeholder of the data
    editor, generally related to dates.

  - **Four different fields** in the "Open", "High", "Low", and "Close"
    categories of the data editor.

<img src="images/ohlc-visualization-editor.png" alt="OHLCChartVisualizationSettings\_All" class="responsive-img" width="85%"/>

There are also different options to add further information to your
chart:

  - **Axis Configuration**: the axis configuration lets you configure
    the minimum and maximum values for your charts. The minimum value is
    set to 0 by default and the maximum calculated automatically
    depending on your values.

  - **Logarithmic Axis Configuration**: if you check the "Logarithmic"
    checkbox, the scale for your values will be calculated with a
    non-linear scale which takes magnitude into account instead of the
    usual linear scale.

## Sample Data Source

For this tutorial, you will use the "OHLC and Candlestick" sheet in the
[Reveal Tutorials Spreadsheet](https://download.infragistics.com/reportplus/help/samples/Reveal_Visualization_Tutorials.xlsx).

>[!NOTE]
>Excel files as local files are not supported in this release. In order to follow these tutorials, make sure you upload the file to one of the supported cloud services or add it as a [Web Resource](~/en/datasources/supported-data-sources/web-resource.md).

<a name='creating-ohlc-chart'></a>
## Creating a OHLC Chart

1. Select the **+ Dashboard** button in the top right-hand corner of **My Analytics**.

   <img src="images/dashboard-button-my-analytics.png" alt="Tutorials-Create-New-Dashboard" class="responsive-img" width="55%"/>

2. Select your data source(**Reveal Tutorials Spreadsheet**) from the list of data sources. If the data source is new, you will need to first add it from the **+ Data Source** button in the top-right corner.

   <img src="images/visualization-tutorials-data-source.png" alt="Tutorials-Select-Data-Source" class="responsive-img" width="55%"/>                                         

 3. Choose the **OHLC and Candlestick** sheet. 

    <img src="images/ohlc-candlestick-spreadsheet.png" alt="Tutorials-Select-OHLC-Candlestick-Charts-Spreadsheet" class="responsive-img" width="55%"/>                       

 4. Open the *Visualization Picker* and select **OHLC**. By default, the visualization type will be set to **Column**.  

    <img src="images/ohlc-chart-types.png" alt="Tutorials-Select-Change-Visualization" class="responsive-img" width="55%"/>                                

 5. Drag and drop the **Date** field into **Label** and the **Open**, **High**, **Low** and **Close** fields in their corresponding placeholder.

    <img src="images/ohlc-organizing-data.png" alt="Organizing the data from the data source" class="responsive-img" width="35%"/>                              

<a name='changing-axis-configuration'></a>
## Changing your Axis Configuration

Like [gauge bounds](gauge-views.html#adding-bounds-gauge), chart axis
configuration allows you to set the lowest and highest values in your
chart. You can use this feature to include or exclude specific data.

In order to access the axis configuration menu:

|                                             |                                                                                      |                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1\. **Access the Settings Menu**            | <img src="images/tutorials-settings.png" alt="Tutorials-Navigate-Settings" class="responsive-img"/>               | Go to the **Settings** section of the Visualization Editor. |
| 2\. **Navigate to the Axis Bounds section** | <img src="images/bounds-axis.png" alt="Tutorial-Access-Axis-Configuration" class="responsive-img"/> | The settings you will change will be the **Axis Bounds**.   |

Depending on whether you want to set the minimum or maximum value (or
both), you will need to access one of the following options:

### Changing the Minimum Bound

The default value is set to "0". In order to set a different bound,
enter the value you want the chart to start with.

### Changing the Maximum Bound

For Maximum bounds, the default will be set to "Automatic" so that
Reveal uses your original data. In order to set a different one, enter
the value you want for the chart's top limit.

<a name='setting-logarithmic-axis'></a>
## Setting your Axis Configuration as Logarithmic

|                                        |                                                                                                       |                                                             |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 1\. **Access the Settings Menu**       | <img src="images/tutorials-settings.png" alt="Tutorials-Navigate-Settings" class="responsive-img"/>                                | Go to the **Settings** section of the Visualization Editor. |
| 2\. **Change the Axis to Logarithmic** | <img src="images/ohlc-candlestick-logarithmic-axis.png" alt="Tutorial-Access-OHLC-Axis-Configuration" class="responsive-img"/> | Open the **Axis** dropdown and select **Logarithmic**.      |
