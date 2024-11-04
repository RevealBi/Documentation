---
title: How to Create a Text View Visualization in Reveal 
_description: A quick tutorial on creating a Text View visualization using a sample spreadsheet.
---

# Creating a Text View

In this tutorial you will learn how to create a *Text View* visualization
using a sample spreadsheet.

![Visualization sample using text view](images/text-view-sample.png)

## Key Concepts

Text views display information in a key-value pattern, but **they only
display the first row of data paired with a column's label**. You can,
however, add filters to make sure Slingshot displays the row you need.

## Sample Data Source

For this tutorial, you will use the *Simple Series Charts* sheet in the <a href="/data/Reveal_Visualization_Tutorials.xlsx" download>Reveal Visualization Tutorials</a>.

<a name='creating-text-view'></a>
## Creating a Text View

 1. Choose **Edit** in overflow menu.
   
   ![Edit button in overflow menu](images/overflow-edit-option.png)

2. Select the **+ Visualization** button in the top right-hand corner.

   ![Add new visualization button](images/add-visualization-button.png)                                      

3. Select your data source from the list of data sources.

   ![Selecting the data source from the list of data sources](images/visualization-tutorials-sample.png)

4. Choose the **Simple Series Charts** sheet.
  
   ![Simple Series Charts Spreadsheed in the data source ](images/tutorials-simple-series-charts-spreadsheet.png)

5. Open the *Visualization Picker* and select the **Text View** visualization. By default, the visualization type will be set to *Column*. 

   ![Text View in the chart types list](images/text-view-chart-types.png)

6. The above text view, for example, displays the Population, Life expectancy and Fertility rate for a specific country. Drag and drop *Country Name*, *Population*, *Life Expectancy* and *Fertility Rate* into **Columns**.

     ![Organizing data in the data filter for text view](images/organizing-data-text-view.png) 

<a name='changing-selected-row'></a>
## Changing the Selected Row

Text View displays the first row of the sheet by default. You can add a
filter to your data in order to change this. For example, let's make the
text view display row 9 (Bosnia and Herzegovina).

1. Drag and drop the *Country Name* field into **Data Filters**.  
 
    ![Selecting an example for data filter for the text view](images/select-data-filter-text-view.png)                                                      
2. Select *Filter Type* to enable the dropdown menu and then choose **Select Values**. 
 
     ![Select Value option from the list of filter types](images/data-filter-dialog-select-value-text-view.png)                                                      
3. By default, all values will be selected. Uncheck the *All* box and select only **Bosnia and Herzegovina**. Then, select **Create Filter**. 

    ![Choosing country from the list of selected values](images/data-filter-select-value-example.png) 
