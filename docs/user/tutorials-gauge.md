---
title: How to Create Gauge Visualizations in Slingshot 
_description: A quick tutorial on creating all types of Gauge visualizations using a sample spreadsheet.
---

# Creating Gauge Visualizations

In this tutorial, you will learn how to create *Gauge* visualizations
using a sample spreadsheet.

![Different Gauge Visualizations](images/different-gauge-visualizations.png)

Access the links below for the gauge view walkthroughs:

  - [How to create a Linear Gauge](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/gauge-charts#creating-a-linear-gauge)

  - [How to create a Circular Gauge](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/gauge-charts#creating-a-circular-gauge)

  - [How to create a Text Gauge](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/gauge-charts#creating-a-text-gauge)

  - [How to create a Bullet Graph](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/gauge-charts#creating-a-bullet-graph)

  - [How to add bounds to your gauge visualizations](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/gauge-charts#adding-bounds-to-your-gauge)

  - [How to change band colors](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/gauge-charts#changing-band-colors)

<a name='key-concepts'></a>
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

For this tutorial, you will use the *Gauge Views* sheet in the [Slingshot Visualization Tutorials](https://download.infragistics.com/slingshot/samples/Slingshot_Visualization_Tutorials.xlsx).

<a name='create-linear-gauge'></a>
## Creating a Linear Gauge


1. Select the **+ Dashboard** button in the top right-hand corner in the **My Analytics** section.

   ![Tutorials-Create-New-Dashboard](images/dashboard-button-my-analytics.png)                                      

2. Select your data source(**Slingshot Tutorials Spreadsheet**) from the list of data sources. If the data source is new, you will need to first add it from the **+ Data Source** button in the top-right corner.

   ![Selecting a data source from the list of data sources](images/visualization-tutorials-sample.png)                                          

3. Choose the **Gauge Views** sheet.
  
   ![Selecting Gauge Views spreadsheet](images/gauge-views.png)
         
4. Open the *Visualization Picker* and select any of the **Gauges** visualizations. By default, the visualization type will be set to *Column*. 

   ![List of chart types](images/gauges-chart-types.png)

5. This linear gauge, for example, will display *Life expectancy* per *Country*. Drag and drop the *Country Name* field to **Label** and one of the *Year* fields into **Values**.
  
   ![Tutorials-LinearGauge-Data](images/organizing-data-gauge-visualization.png)                         

<a name='create-circular-gauge'></a>
## Creating a Circular Gauge

1. Select the **+ Dashboard** button in the top right-hand corner of **My Analytics**.

   ![Tutorials-Create-New-Dashboard](images/dashboard-button-my-analytics.png)                                      

2. Select your data source(**Slingshot Tutorials Spreadsheet**) from the list of data sources. If the data source is new, you will need to first add it from the **+ Data Source** button in the top-right corner.

   ![Selecting a data source from the list of data sources](images/visualization-tutorials-sample.png)                                          

3. Choose the **Gauge Views** sheet.
  
   ![Selecting Gauge Views spreadsheet](images/gauge-views.png)
         
4. Open the *Visualization Picker* and select any of the **Gauges** visualizations. By default, the visualization type will be set to *Column*. 

   ![List of chart types](images/gauges-chart-types.png)

5. This linear gauge, for example, will display *Life expectancy* per *Country*. Drag and drop the *Country Name* field to **Label** and one of the *Year* fields into **Values**.
  
   ![Tutorials-LinearGauge-Data](images/organizing-data-gauge-visualization.png) 

<a name='aggregation-instructions'></a>

Circular Gauges are particularly useful to show average values as well
as sum of values. In order to change the aggregation for the field
displayed in Values:

|                                              |                                                                            |                                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1\. **Access Field Settings for your Value** | ![Add-Data-Filter-CircularGauge](images/value-circular-gauge.png) | Select the field in **Value** to access                                                  |
| 2\. **Choose a different Aggregation**       | ![CircularGauge-Aggregation](images/field-settings-aggregation-options.png)         | Expand the **Aggregation** dropdown and select a different option (for example, Average). |


<a name='create-text-gauge'></a>
## Creating a Text Gauge

1. Select the **+ Dashboard** button in the top right-hand corner of **My Analytics**.

   ![Tutorials-Create-New-Dashboard](images/dashboard-button-my-analytics.png)                                      

2. Select your data source(**Slingshot Tutorials Spreadsheet**) from the list of data sources. If the data source is new, you will need to first add it from the **+ Data Source** button in the top-right corner.

   ![Selecting a data source from the list of data sources](images/visualization-tutorials-sample.png)                                          

3. Choose the **Gauge Views** sheet.
  
   ![Selecting Gauge Views spreadsheet](images/gauge-views.png)
         
4. Open the *Visualization Picker* and select the *Text Gauge*. By default, the visualization type will be set to *Column*. 

   ![List of chart types](images/gauges-chart-types.png)

5. This text gauge, for example, will display life expectancy per Country. Drag and drop one of the year fields into **Values**, and then the *Country Name* field into **Data Filters**. Then, select the specific country you want by selecting the field. 

   ![Organizing the data while using text gauge visualizaiton](images/text-gauge-organizing-data.png)

The text gauge sample above utilizes the average aggregation.

<a name='create-bullet-graph-gauge'></a>
## Creating a Bullet Graph

1. Select the **+ Dashboard** button in the top right-hand corner of **My Analytics**.

   ![Tutorials-Create-New-Dashboard](images/dashboard-button-my-analytics.png)                                      

2. Select your data source(**Slingshot Tutorials Spreadsheet**) from the list of data sources. If the data source is new, you will need to first add it from the **+ Data Source** button in the top-right corner.

   ![Selecting a data source from the list of data sources](images/visualization-tutorials-sample.png)                                          

3. Choose the **Gauge Views** sheet.
  
   ![Selecting Gauge Views spreadsheet](images/gauge-views.png)
         
4. Open the *Visualization Picker* and select any of the *Bullet Graph* visualizations. By default, the visualization type will be set to *Column*. 

   ![List of chart types](images/gauges-chart-types.png)

5. This bullet graph, for example, will display life expectancy per Country. Drag and drop the *Country Name* field to **Label**, one of the years into **Values** and another *Year* into **Target**.

   ![Organizing data while using a bullet graph](images/bullet-graph-organizing-data.png)

<a name='adding-bounds-gauge'></a>
## Adding Bounds to your Gauge

Bounds allow you to set the lowest and highest values in your gauges. As
mentioned in [Key Concepts](https://www.slingshotapp.io/en/help/docs/analytics/visualization-tutorials/gauge-charts#key-concepts), you can change it to exclude
specific data. In order to do this:

|                                                |                                                                        |                                                                                                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Change Settings**                        | ![Tutorials-Navigate-Settings](images/tutorials-settings.png) | Go to the **Settings** section of the Visualization Editor.                                                                           |
| 2\. **Change the Default selection in Limits** | ![Tutorials-Limits-Bounds](images/limit-options.png)         | Depending on whether you want to set the minimum or maximum value (or both), enter the value you want the chart to start or end with. |

<a name='modify-bands'></a>
## Changing Band Colors

The colors for the three different ranges (Higher than, Lower than and
Between) can be changed between the predefined colors. In order to do
so:

|                                    |                                                                        |                                                                          |
| ---------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1\. **Change Settings**            | ![Tutorials-Navigate-Settings](images/tutorials-settings.png) | Go to the **Settings** section of the Visualization Editor.              |
| 2\. **Access the Colors dropdown** | ![Tutorials-Colors-Dropdown](images/band-color-options.png)     | Expand the dropdown of the range for which you want to change the color. Select one of Slingshot's three predefined colors for your band color.|

