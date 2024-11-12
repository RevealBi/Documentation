---
title: How to Create Stacked Chart Visualization in Reveal
_description: A quick tutorial on creating Stacked Chart visualization using a sample spreadsheet.
---

# Creating Stacked Chart Visualizations

In this tutorial, you will learn how to create *Stacked* chart
visualizations using a sample spreadsheet.

![Tutorials-Create-New-Dashboard](images/different-stacked-charts-example.png)  

## Key Concepts

There are three different layouts to choose from when using stacked
charts: [Area](#creating-a-stacked-chart),
[Column](#creating-a-stacked-chart) and [Bar](#creating-a-stacked-chart).

You can also configure the following settings:

  - **Axis Configuration**: the axis configuration lets you configure
    the minimum and maximum values for your charts. The minimum value is
    set to 0 by default and the maximum calculated automatically
    depending on your values.

   - **Logarithmic Axis Configuration**: if you check the
        *Logarithmic* checkbox, the scale for your values will be
        calculated with a non-linear scale which takes magnitude into
        account instead of the usual linear scale.

## Sample Data Source

For this tutorial, you will use the *Stacked Charts* sheet in the
<a href="/data/Reveal_Visualization_Tutorials.xlsx" download>Reveal Visualization Tutorials</a>.


## Creating a Stacked Chart

1. Choose **Edit** in overflow menu.

   ![Edit button in overflow menu](images/overflow-edit-option.png)                                      

2. Select the **+ Visualization** button in the top right-hand corner.

   ![Add new visualization button](images/add-visualization-button.png)                                      

3. Select your data source from the list of data sources.

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)                                          

4. Choose the **Stacked Charts** sheet. 

   ![Stacked Charts Spreadsheet in the tutorial data source](images/stacked-chart-spreadsheet-data-source-details-dialog.png)

5. Open the *Visualization Picker* and select any of the **stacked** visualizations. By default, the visualization type will be set to *Column*. 

   ![List of stacked chart types](images/stacked-chart-types.png) 
 
6. Stacked charts require two or more fields to be dragged and dropped into the **Values** placeholder of the data editor. In this case, the *1960*, *2003*, *2008* and *2010* fields have been dropped into **Values** and *Country Name* in **Label**.
                                        
   ![Organizing the data from the stacked charts spreadsheet](images/stacked-charts-organizing-data.png)                           

## Changing your Axis Configuration

Similarly to the [Gauge bounds](tutorials-gauge#adding-bounds-to-your-gauge), the
chart axis configuration allows you to set the lowest and highest values
in your chart. You can use this feature to include or exclude specific
data.

|                                        |                                                                                      |                                                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Change Settings**                | ![Settings section](images/tutorials-settings.png)               | Go to the **Settings** section of the Visualization Editor.                                                                           |
| 2\. **Access the Axis Bounds section** | ![Tutorials-Axis-Bounds](images/axis-bounds.png)                           | Navigate to Axis Bounds. Depending on whether you want to set the minimum or maximum value (or both), enter the value you want the chart to start or end with.  |                                                                                                          

## Setting your Axis Configuration as Logarithmic

|                                           |                                                                          |                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1\. **Change Settings**                   | ![Tutorials-Navigate-Settings](images/tutorials-settings.png)   | Go to the **Settings** section of the Visualization Editor. |
| 2\. **Access the Axis option**            | ![Tutorials-Axis-Bounds](images/axis-bounds-logarithmic.png)               | Expand the Axis dropdown by selecting the down arrow. Then select *Logarithmic*.|      

## Enabling Percentage Distribution

For stacked charts, you can configure the Percentage Distribution. It
allows you to switch between values and percentage distribution scales
for those types of charts. In order to do this:

|                                        |                                                                                    |                                                                                           |
| -------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1\. **Change Settings**                | ![Tutorials-Navigate-Settings](images/tutorials-settings.png)             | Go to the **Settings** section of the Visualization Editor.                               |
| 2\. **Enable Percentage Distribution** | ![Tutorials-Percentage-Distribution](images/percentage-distribution.png) | Enable the percentage distribution setting by checking the *Percentage Distribution* box. |
