---
title: How to Create Sparkline Charts Visualization in Reveal
_description: A quick tutorial on creating Sparkline Charts visualization using a sample spreadsheet.
---

# Creating Sparkline Charts

In this tutorial, you will learn how to create *Sparkline* charts visualizations
using a sample spreadsheet.

![Simple Sparkline Chart example](images/simple-sparkline-chart.png)
![Sparkline Area Chart example](images/sparkline-area-chart.png)
![Sparkline with Day Aggregation example](images/sparkline-with-day-aggregation.png)
![Sparkline with less columns and area chart example](images/sparkline-with-less-columns-and-area-chart.png)

## Key Concepts

Sparkline charts are meant to display trends and their progression in a
given date range. They are particular useful, like OHLC and Candlestick
charts, for financial scenarios and stock movement analysis. Sparklines
display line charts within a grid cell and require:

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

For this tutorial, you will use the *Sparkline Charts* sheet
in the <a href="/data/Reveal_Visualization_Tutorials.xlsx" download>Reveal Visualization Tutorials</a>.

## Creating a Sparkline Chart


1. Choose **Edit** in overflow menu.

   ![Edit button in overflow menu](images/overflow-edit-option.png)                                      

2. Select the **+ Visualization** button in the top right-hand corner.

   ![Add new visualization button](images/add-visualization-button.png)                                      

3. Select your data source from the list of data sources.

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)                                          

4. Select the **Sparkline Charts** sheet.

   ![Tutorials-Select-Sparkline-Charts-Spreadsheet.png](images/sparkline-charts-spreadsheet.png)   
   
5. Open the *Visualization Picker* and select the **Sparkline Chart**. By default, the visualization type will be set to **Column**.                                                                             
  ![Tutorials-Charts-Select-Sparkline-Chart](images/chart-types-sparkline.png)                                                     
  
6. Drag and drop the *Date* field into **Date**, *Offer* into **Value** and *Stocks* into **Category**.

   ![Tutorials-SparklineChart-Organizing-Data](images/sparkline-charts-organizing-data.png)                                                                      

## Changing the Chart Type for the Sparkline

You may want to change the type of chart you want to use for your
sparkline chart. In order to do this:

|                                  |                                                                                        |                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Setting options for sparkline charts](images/sparkline-charts-settings.png)                 | Go to the **Settings** section of the Visualization Editor.         |
| 2\. **Change the Chart Type**    | ![Different chart types for Sparkline](images/area-sparkline-chart.png) | By default, the chart type will be set to line. Set it to **Area**. |

## Changing the Date Aggregation

By default, the aggregation for your information will be **12 months**.
You can change this by modifying the *Show Last* settings. In order to
do so:

|                                  |                                                                                                      |                                                                                                                                                      |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/sparkline-charts-settings.png)                               | Go to the **Settings** section of the Visualization Editor.                                                                                          |
| 2\. **Change the Aggregation**   | ![Tutorial-Change-Date-Aggregation-Sparkline](images/sparkline-chart-date-aggregation.png) | By default, the *Show Last* setting will be set to **Months**. Select the dropdown next to *Months* and change the selection to either *Years* or *Days*. |

You can also choose to display more or less data by changing the number
next to the date's aggregation.

## Modifying the amount of columns in the Sparkline

In Reveal, the amount of columns in the visualization is defined by
whether or not you want to display the last two months and the
difference between them. By default, these will be enabled. In order to
remove them:

|                                      |                                                                                    |                                                                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu**     | ![Tutorials-Navigate-Settings](images/sparkline-charts-settings.png)             | Go to the **Settings** section of the Visualization Editor.                                                                                              |
| 2\. **Change the Displayed Columns** | ![Different options for the columns in the sparkline chart](images/sparkline-chart-columns-options.png) | **Uncheck the "Show columns for last two values" or "Show column with difference" boxes** if you do not want to display either of them in the Sparkline. |
