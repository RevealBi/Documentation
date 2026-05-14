---
title: How to Create Gauge Visualizations in Reveal 
_description: A quick tutorial on creating all types of Gauge visualizations using a sample spreadsheet.
---

# Creating Gauge Visualizations

In this tutorial, you will learn how to create *Gauge* visualizations
using a sample spreadsheet.

![Different Gauge Visualizations](images/different-gauge-visualizations.png)

## Key Concepts

There are two different layouts to choose from when using gauge charts:

  - **Bounds Configuration**. The bounds configuration for gauges covers
    the lowest and highest possible values in your gauges. It is usually
    set to the lowest value in your data source by default, but you can
    change it to exclude specific data.

  - **Bands Configuration**. The bands configuration allows you to
    establish three different ranges for your information (Higher than,
    between, and Less than). You can override the default values with
    ranges tailored to your data source.

## Sample Data Source

For this tutorial, you will use the *Gauge Views* sheet in the <a href="/data/Reveal_Visualization_Tutorials.xlsx" download>Reveal Visualization Tutorials</a>.

## Creating a Linear Gauge

1. Choose **Edit** in overflow menu.
   
   ![Edit button in overflow menu](images/overflow-edit-option.png)

2. Select the **+ Visualization** button in the top right-hand corner.

   ![Add new visualization button](images/add-visualization-button.png)                                      

3. Select your data source from the list of data sources.

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)
         
4. Choose the **Gauge Views** sheet.
  
   ![Selecting Gauge Views spreadsheet](images/gauge-views.png)
         
5. Open the *Visualization Picker* and select the **Linear** visualization. By default, the visualization type will be set to *Column*. 

   ![List of chart types](images/gauges-linear-chart-types.png)

6. This linear gauge, for example, will display *Life expectancy* per *Country*. Drag and drop the *Country Name* field to **Label** and one of the *Year* fields into **Value**.
  
   ![Tutorials-LinearGauge-Data](images/organizing-data-gauge-visualization.png)                         

## Creating a Circular Gauge

1. Choose **Edit** in overflow menu.
   
   ![Edit button in overflow menu](images/overflow-edit-option.png)

2. Select the **+ Visualization** button in the top right-hand corner.

   ![Add new visualization button](images/add-visualization-button.png)                                      

3. Select your data source from the list of data sources.

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)                                       

4. Choose the **Gauge Views** sheet.
  
   ![Selecting Gauge Views spreadsheet](images/gauge-views.png)
         
5. Open the *Visualization Picker* and select the **Circular** visualization. By default, the visualization type will be set to *Column*. 

   ![List of chart types](images/gauges-circular-chart-types.png)

6. This linear gauge, for example, will display *Life expectancy* per *Country*. Drag and drop the *Country Name* field to **Label** and one of the *Year* fields into **Value**.
  
   ![Tutorials-LinearGauge-Data](images/organizing-data-circular-gauge-visualization.png) 


Circular Gauges are particularly useful to show average values as well
as sum of values. In order to change the aggregation for the field
displayed in Values:

|                                              |                                                                            |                                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1\. **Access Field Settings for your Value** | ![Add-Data-Filter-CircularGauge](images/value-circular-gauge.png) | Select the field in **Value** to access                                                  |
| 2\. **Choose a different Aggregation**       | ![CircularGauge-Aggregation](images/field-settings-aggregation-options.png)         | Expand the **Aggregation** dropdown and select a different option (for example, Average). |


## Creating a Text Gauge

1. Choose **Edit** in overflow menu.
   
   ![Edit button in overflow menu](images/overflow-edit-option.png)

2. Select the **+ Visualization** button in the top right-hand corner.

   ![Add new visualization button](images/add-visualization-button.png)                                      

3. Select your data source from the list of data sources.

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)                                       

4. Choose the **Gauge Views** sheet.
  
   ![Selecting Gauge Views spreadsheet](images/gauge-views.png)
         
5. Open the *Visualization Picker* and select the **Text** visualization. By default, the visualization type will be set to *Column*. 

   ![List of chart types](images/gauges-text-chart-types.png)

6. This text gauge, for example, will display life expectancy per Country. Drag and drop one of the year fields into **Values**, and then the *Country Name* field into **Data Filters**. Then, select the specific country you want by selecting the field. 

   ![Organizing the data while using text gauge visualizaiton](images/text-gauge-organizing-data.png)

The text gauge sample above utilizes the average aggregation.

## Creating a Bullet Graph

1. Choose **Edit** in overflow menu.
   
   ![Edit button in overflow menu](images/overflow-edit-option.png)

2. Select the **+ Visualization** button in the top right-hand corner.

   ![Add new visualization button](images/add-visualization-button.png)                                      

3. Select your data source from the list of data sources.

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)                                       

4. Choose the **Gauge Views** sheet.
  
   ![Selecting Gauge Views spreadsheet](images/gauge-views.png)
         
5. Open the *Visualization Picker* and select the **Bullet Graph** visualization. By default, the visualization type will be set to *Column*. 

   ![List of chart types](images/gauges-bullet-graph-chart-types.png)

6. This bullet graph, for example, will display life expectancy per Country. Drag and drop the *Country Name* field to **Label**, one of the years into **Values** and another *Year* into **Target**.

   ![Organizing data while using a bullet graph](images/bullet-graph-organizing-data.png)

## Adding Bounds to your Gauge

Bounds allow you to set the lowest and highest values in your gauges. As
mentioned in [Key Concepts](#key-concepts), you can change it to exclude
specific data. In order to do this:

|                                                |                                                                        |                                                                                                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Change Settings**                        | ![Tutorials-Navigate-Settings](images/tutorials-settings.png) | Go to the **Settings** section of the Visualization Editor.                                                                           |
| 2\. **Change the Default selection in Limits** | ![Tutorials-Limits-Bounds](images/limit-options.png)         | Depending on whether you want to set the minimum or maximum value (or both), enter the value you want the chart to start or end with. |

## Changing Band Colors

The colors for the three different ranges (Higher than, Lower than and
Between) can be changed between the predefined colors. In order to do
so:

|                                    |                                                                        |                                                                          |
| ---------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1\. **Change Settings**            | ![Tutorials-Navigate-Settings](images/tutorials-settings.png) | Go to the **Settings** section of the Visualization Editor.              |
| 2\. **Access the Colors dropdown** | ![Tutorials-Colors-Dropdown](images/band-color-options.png)     | Expand the dropdown of the range for which you want to change the color. Select one of Reveal's three predefined colors for your band color.|

