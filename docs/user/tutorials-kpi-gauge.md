---
title: How to Create KPI Gauges Charts in Slingshot
_description: A quick tutorial on creating an a KPI gauge visualization using a sample spreadsheet.
---

# Creating KPI Gauges

In this tutorial, you will learn how to a KPI gauge visualization using
a sample spreadsheet.

| ![KPIGaugeSimple All](images/KPIGaugeSimple_All.png) [KPI Gauge](#creating-a-kpi-gauge) | ![TutorialMultipleKPIGauges All](images/TutorialMultipleKPIGauges_All.png) [Multiple KPI Gauges](#creating-multiple-kpi-gauges-in-one-visualization) |
|---|---|
| ![KPIGaugePreviousMonth All](images/KPIGaugePreviousMonth_All.png) [Month-over-Month KPI Gauge](#changing-the-date-comparison-type) | ![KPIGaugeValuePercentage All](images/KPIGaugeValuePercentage_All.png) [KPI Gauge with Value and Percentage differences](#changing-the-difference-labels-for-the-kpi-gauge) |
| ![KPIGaugeDifferenceColor All](images/KPIGaugeDifferenceColor_All.png) [KPI Gauge with a green marker when the value decreased](#changing-the-color-of-the-difference-marker) | |


Access the links below for the KPI gauge view walkthroughs:

- [Creating KPI Gauges](#creating-kpi-gauges)
  - [Key Concepts](#key-concepts)
  - [Sample Data Source](#sample-data-source)
  - [Creating a KPI Gauge](#creating-a-kpi-gauge)
  - [Creating Multiple KPI Gauges in one Visualization](#creating-multiple-kpi-gauges-in-one-visualization)
  - [Changing the Date Comparison Type](#changing-the-date-comparison-type)
  - [Changing the Difference Labels for the KPI Gauge](#changing-the-difference-labels-for-the-kpi-gauge)
  - [Changing the Color of the Difference Marker](#changing-the-color-of-the-difference-marker)

## Key Concepts

KPI gauges are meant to display performances and their variation within
a given time period. To create them, you will need:

  - **One field** to be dropped into the **Date** placeholder of the
    data editor.

  - **One field** to be dropped into **Value**.

## Sample Data Source

For this tutorial, you will use the "KPI View" sheet in the [Analytics Tutorials Spreadsheet](https://download.infragistics.com/slingshot/samples/Slingshot_Visualization_Tutorials.xlsx).

<a name='creating-kpi-gauge'></a>
## Creating a KPI Gauge

|                                          |                                                                                              |                                                                                                                                                      |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Create a Dashboard**               | ![Create a new dashboard](images/Tutorials-Create-New-Dashboard.png) | In the dashboard viewer, select the + button in the top right-hand corner of the "My Dashboards" screen. Then, select "Dashboard" from the dropdown. |
| 2\. **Configure your Data Source**       | ![Selecting a data source](images/Tutorials-Select-Data-Source.png) | In the *New Visualization* window, select the + button in the bottom right corner and select your data source.                                       |
| 3\. **Select the Tutorials Spreadsheet** |![Selecting a KPI Gauge](images/Tutorials-Select-KPI-Gauge-Spreadsheet.png) | Once the data source is configured, select the **Analytics Tutorials Spreadsheet**. Then, choose the "KPI Gauge" sheet.                                 |
| 4\. **Open the Visualizations Menu**     | ![Select Change Visualization option](images/Tutorials-Select-Change-Visualization.png) | Select the **grid icon** in the top bar of the Visualizations Editor.                                                                                |
| 5\. **Select your Visualization**        | ![Select KPI Gauge](images/Tutorials-Select-KPI-Gauge.png) | By default, the visualization type will be set to "Grid". Select the **Sparkline** chart.                                                            |
| 6\. **Organize your Data**               | ![Select KPI Gauge](images/Tutorials-KPIGauge-Organizing-Data.png) | Drag and drop the "Date" field into "Date" and the "Sales" field into "Value".                                                                       |

<a name='adding-category-kpi'></a>
## Creating Multiple KPI Gauges in one Visualization

In order to create more than one KPI in one visualization, you will need
to add a field to the **category** placeholder of the data editor.

|                                          |                                                                                                      |                                                                                                                                                      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Create a Dashboard**               | ![Tutorials-Create-New-Dashboard](images/Tutorials-Create-New-Dashboard.png)                         | In the dashboard viewer, select the + button in the top right-hand corner of the "My Dashboards" screen. Then, select "Dashboard" from the dropdown. |
| 2\. **Configure your Data Source**       | ![Tutorials-Select-Data-Source](images/Tutorials-Select-Data-Source.png)                             | In the *New Visualization* window, select the + button in the bottom right corner and select your data source.                                       |
| 3\. **Select the Tutorials Spreadsheet** | ![Tutorials-Select-KPI-Gauge-Spreadsheet](images/Tutorials-Select-KPI-Gauge-Spreadsheet.png)         | Once the data source is configured, select the **Analytics Tutorials Spreadsheet**. Then, choose the "KPI Gauge" sheet.                                 |
| 4\. **Open the Visualizations Menu**     | ![Tutorials-Select-Change-Visualization](images/Tutorials-Select-Change-Visualization.png)           | Select the **grid icon** in the top bar of the Visualizations Editor.                                                                                |
| 5\. **Select your Visualization**        | ![Tutorials-Select-KPI-Gauge](images/Tutorials-Select-KPI-Gauge.png)                                 | By default, the visualization type will be set to "Grid". Select the **Sparkline** chart.                                                            |
| 6\. **Organize your Data**               | ![Tutorials-MultipleKPIGauge-Organizing-Data](images/Tutorials-MultipleKPIGauge-Organizing-Data.png) | Drag and drop the "Date" field into "Date", the "Sales" field into "Value" and the "State" field into "Category".                                    |

<a name='changing-date-comparison-type'></a>
## Changing the Date Comparison Type

By default, the date type for your KPI Gauge will be Year-over-Year. You
can change this by modifying the "Type" field. In order to do so:

|                                  |                                                                        |                                                                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png) | Go to the **Settings** section of the Visualization Editor.                                                                                    |
| 2\. **Change the Type**          | ![Tutorial-Change-Date-Type](images/tutorial-Change-Date-Type.png)     | By default, the date type will be set to Year-to-Year. Select the dropdown next to **Type**, and change the selection to **Month-over-Month**. |

<a name='changing-difference-label-kpi'></a>
## Changing the Difference Labels for the KPI Gauge

|                                  |                                                                                            |                                                                                                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)                     | Go to the **Settings** section of the Visualization Editor.                                                                                                             |
| 2\. **Change the Type**          | ![Tutorial-Change-Date-Difference-Label](images/tutorial-Change-Date-Difference-Label.png) | By default, the difference label will be set to "Percentage". Select the dropdown next to **Show difference as**, and change the selection to **Value and Percentage**. |

<a name='changing-color-difference-marker'></a>
## Changing the Color of the Difference Marker

The color for the marker in the KPI gauge will be set to green for
positive values and red for negative values by default. There might be
some cases, however, when you want to represent a decrease as a positive
occurrence. In order to change this:

|                                  |                                                                                                          |                                                                                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)                                   | Go to the **Settings** section of the Visualization Editor.                                                                                                 |
| 2\. **Change the Type**          | ![Tutorial-Change-Date-Difference-Marker-Color](images/tutorial-Change-Date-Difference-Marker-Color.png) | By default, the color of the marker will be set to green. Select the dropdown next to **When difference is positive**, and change the selection to **red**. |
