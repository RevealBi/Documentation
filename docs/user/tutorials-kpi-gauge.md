---
title: How to Create KPI Gauges Charts in Reveal
_description: A quick tutorial on creating an a KPI gauge visualization using a sample spreadsheet.
---

# Creating KPI Gauges

In this tutorial, you will learn how to a KPI gauge visualization using
a sample spreadsheet.
| | |
|:---:|:---:|
| ![KPIGaugeSimple All](images/KPIGaugeSimple_All.png) <br/> [KPI Gauge](#creating-a-kpi-gauge) | ![TutorialMultipleKPIGauges All](images/TutorialMultipleKPIGauges_All.png) <br/> [Multiple KPI Gauges](#creating-multiple-kpi-gauges-in-one-visualization) |
| ![KPIGaugePreviousMonth All](images/KPIGaugePreviousMonth_All.png) <br/> [Month-over-Month KPI Gauge](#changing-the-date-comparison-type) | ![KPIGaugeValuePercentage All](images/KPIGaugeValuePercentage_All.png) <br/> [KPI Gauge with Value and Percentage differences](#changing-the-difference-labels-for-the-kpi-gauge) |
| ![KPIGaugeDifferenceColor All](images/KPIGaugeDifferenceColor_All.png) <br/> [KPI Gauge with a green marker when the value decreased](#changing-the-color-of-the-difference-marker) | |

## Key Concepts

KPI gauges are meant to display performances and their variation within
a given time period. To create them, you will need:

  - **One field** to be dropped into the **Date** placeholder of the
    data editor.

  - **One field** to be dropped into **Value**.

## Sample Data Source

For this tutorial, you will use the "KPI View" sheet in the <a href="/data/Reveal_Visualization_Tutorials.xlsx" download>Reveal Visualization Tutorials</a>.

## Creating a KPI Gauge

1. Choose **Edit** in overflow menu.

   ![Edit button in overflow menu](images/overflow-edit-option.png)                                      

2. Select the **+ Visualization** button in the top right-hand corner.

   ![Add new visualization button](images/add-visualization-button.png)                                      

3. Select your data source from the list of data sources.

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)                                          

4. Choose the **KPI View** sheet. 
  
   ![Selecting a KPI Gauge](images/Tutorials-Select-KPI-Gauge-Spreadsheet.png)
         
5. Open the *Visualization Picker* and select the **KPI vs Time** visualization. By default, the visualization type will be set to *Column*. 

   ![Select Change Visualization option](images/gauge-kpi-chart-type.png)

6.  Drag and drop the *Date* field into *Date* and the *Sales* field into *Value*.                
  ![Select KPI Gauge](images/Tutorials-KPIGauge-Organizing-Data.png)

## Creating Multiple KPI Gauges in one Visualization

In order to create more than one KPI in one visualization, you will need
to add a field to the **category** placeholder of the data editor.

1. Choose **Edit** in overflow menu.

   ![Edit button in overflow menu](images/overflow-edit-option.png)                                      

2. Select the **+ Visualization** button in the top right-hand corner.

   ![Add new visualization button](images/add-visualization-button.png)                                      

3. Select your data source from the list of data sources.

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)                                          

4. Choose the **KPI View** sheet. 
  
   ![Selecting a KPI Gauge](images/Tutorials-Select-KPI-Gauge-Spreadsheet.png)
         
5. Open the *Visualization Picker* and select the **KPI vs Time** visualization. By default, the visualization type will be set to *Column*. 

   ![Select Change Visualization option](images/gauge-kpi-chart-type.png)

6.  Drag and drop the *Date* field into *Date*, the *Sales* field into *Value* and the *State* field into *Category*.          
  ![Tutorials-MultipleKPIGauge-Organizing-Data](images/Tutorials-MultipleKPIGauge-Organizing-Data.png)

## Changing the Date Comparison Type

By default, the date type for your KPI Gauge will be Year-over-Year. You
can change this by modifying the "Type" field. In order to do so:

|                                  |                                                                        |                                                                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png) | Go to the **Settings** section of the Visualization Editor.                                                                                    |
| 2\. **Change the Type**          | ![Tutorial-Change-Date-Type](images/Tutorial-Change-Date-Type.png)     | By default, the date type will be set to **Year vs previous Year**. Select the dropdown next to **Time Period**, and change the selection to **Month vs previous Month**. |

## Changing the Difference Labels for the KPI Gauge

|                                  |                                                                                            |                                                                                                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)                     | Go to the **Settings** section of the Visualization Editor.                                                                                                             |
| 2\. **Change the Type**          | ![Tutorial-Change-Date-Difference-Label](images/Tutorial-Change-Date-Difference-Label.png) | By default, the difference label will be set to **Percentage**. Select the dropdown next to **Show difference as**, and change the selection to **Value and Percentage**. |

## Changing the Color of the Difference Marker

The color for the marker in the KPI gauge will be set to green for
positive values and red for negative values by default. There might be
some cases, however, when you want to represent a decrease as a positive
occurrence. In order to change this:

|                                  |                                                                                                          |                                                                                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Access the Settings Menu** | ![Tutorials-Navigate-Settings](images/Tutorials-Navigate-Settings.png)                                   | Go to the **Settings** section of the Visualization Editor.                                                                                                 |
| 2\. **Change the Type**          | ![Tutorial-Change-Date-Difference-Marker-Color](images/tutorial-Change-Date-Difference-Marker-Color.png) | By default, the color of the marker will be set to **green**. Select the dropdown next to **When value increases**, and change the selection to **red**. |
