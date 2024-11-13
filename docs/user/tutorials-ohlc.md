---
title: How to Create OHLC Visualizations in Reveal 
_description: A quick tutorial on creating OHLC visualizations using a sample spreadsheet.
---

# Creating OHLC Visualizations

In this tutorial, you will learn how to create a OHLC chart visualization using
a sample spreadsheet.

![Tutorials-Select-OHLC-tutorials-candlesticks-Spreadsheet](images/ohlc-charts-example.png)


## Key Concepts

Like Candlestick Charts, OHLC charts are meant to show the opening,
high, low and closing prices for any financial data. They are
particularly useful for financial scenarios and stock movement analysis.
This chart displays numerical values in vertical axes with the two
horizontal lines in each vertical axis representing the *Open* and
*Close* values.

OHLC charts, therefore, require:

  - One field to be dropped into the **Label** placeholder of the data
    editor, generally related to dates.

  - Four different fields in the *Open*, *High*, *Low* and *Close*
    categories of the data editor.

![OHLCChartVisualizationSettings\_All](images/ohlc-visualization-editor.png)

There are also different options to add further information to your
chart:

  - **Axis Configuration**: the axis configuration lets you configure
    the minimum and maximum values for your charts. The minimum value is
    set to 0 by default and the maximum calculated automatically
    depending on your values.

  - **Logarithmic Axis Configuration**: if you check the *Logarithmic*
    checkbox, the scale for your values will be calculated with a
    non-linear scale which takes magnitude into account instead of the
    usual linear scale.

## Sample Data Source

For this tutorial, you will use the *OHLC and Candlestick* sheet in the <a href="/data/Reveal_Visualization_Tutorials.xlsx" download>Reveal Visualization Tutorials</a>.

## Creating a OHLC Chart

1. Choose **Edit** in overflow menu.
   
    ![Edit button in overflow menu](images/overflow-edit-option.png)

 2. Select the **+ Visualization** button in the top right-hand corner.

    ![Add new visualization button](images/add-visualization-button.png) 

 3. Select your data source from the list of data sources.
   
    ![Tutorials-Select-Data-Source](images/visualization-tutorials-sample.png)                     

 4. Once the data source is configured, select the **OHLC and Candlestick** sheet.  

    ![Tutorials-Select-OHLC-tutorials-candlesticks-Spreadsheet](images/ohlc-candlestick-spreadsheet.png)  

 5. Open the *Visualization Picker* and select **OHLC**. By default, the visualization type will be set to **Column**.  

    ![Tutorials-Select-Change-Visualization](images/ohlc-chart-types.png)                                

 6. Drag and drop the *Day* field into **Label** and the *Open*, *High*, *Low* and *Close* fields in their corresponding placeholder.

    ![Organizing the data from the data source](images/ohlc-organizing-data.png)                              

## Changing your Axis Configuration

Like [Gauge bounds](tutorials-gauge.md#adding-bounds-to-your-gauge), chart axis
configuration allows you to set the lowest and highest values in your
chart. You can use this feature to include or exclude specific data.

In order to access the axis configuration menu:

|                                             |                                                                                      |                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1\. **Access the Settings Menu**            | ![Tutorials-Navigate-Settings](images/tutorials-settings.png)               | Go to the **Settings** section of the Visualization Editor. |
| 2\. **Navigate to the Axis Bounds section** | ![Tutorial-Access-Axis-Configuration](images/bounds-axis.png) | The settings you will change will be the **Axis Bounds**.   |

Depending on whether you want to set the minimum or maximum value (or
both), you will need to access one of the following options:

### Changing the Minimum Bound

The default value is set to *0*. In order to set a different bound,
enter the value you want the chart to start with.

### Changing the Maximum Bound

For Maximum bounds, the default will be set to *Automatic* so that
Reveal uses your original data. In order to set a different one, enter
the value you want for the chart's top limit.

## Setting your Axis Configuration as Logarithmic

|                                        |                                                                                                       |                                                             |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 1\. **Access the Settings Menu**       | ![Tutorials-Navigate-Settings](images/tutorials-settings.png)                                | Go to the **Settings** section of the Visualization Editor. |
| 2\. **Change the Axis to Logarithmic** | ![Tutorial-Access-OHLC-Axis-Configuration](images/ohlc-candlestick-logarithmic-axis.png) | Open the **Axis** dropdown and select **Logarithmic**.      |
