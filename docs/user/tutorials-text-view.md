---
title: How to Create a Text View Visualization in Slingshot 
_description: A quick tutorial on creating a Text View visualization using a sample spreadsheet.
---

# Creating a Text View

In this tutorial you will learn how to create a *Text View* visualization
using a sample spreadsheet.

![Visualization sample using text view](images/text-view-sample.png)

Access the links below for the Text view walkthroughs.

  - [How to create a basic Text View](#creating-a-text-view-1)

  - [How to change the selected row](#changing-the-selected-row)

## Key Concepts

Text views display information in a key-value pattern, but **they only
display the first row of data paired with a column's label**. You can,
however, add filters to make sure Slingshot displays the row you need.

## Sample Data Source

For this tutorial, you will use the *Simple Series Charts* sheet in the [Slingshot Visualization Tutorials](https://download.infragistics.com/slingshot/samples/Slingshot_Visualization_Tutorials.xlsx).

>[!NOTE]
>Excel files as local files are not supported in this release. In order to follow these tutorials, make sure you upload the file to one of the supported *cloud services* or add it as a **Web Resource**.

<a name='creating-text-view'></a>
## Creating a Text View

 1. Click/tap on the **+ Dashboard** button in the top right-hand corner in *My Analytics*.

    ![Dashboard button in the my analytics board](images/my-analytics-dashboard-button.png)                                                         
 2. You can choose the data source you want to work with from the list of data sources. If the data source is new, you will need to add it from the **+ Data Source** button.

     ![A dialog with a list of data sources](images/visualization-tutorials-sample.png)                                                         
 3. Once the data source is configured, select the **Slingshot Tutorials Spreadsheet**. Then, choose the *Simple Series Charts* sheet.  

     ![Simple Series Charts Spreadsheed in the data source ](images/tutorials-simple-series-charts-spreadsheet.png)                                                                                      
 4.  Open the *Visualization Picker* and select **Text View**. By default, the visualization type will be set to **Column**.   
 
      ![Text View in the chart types list](images/text-view-chart-types.png)                                                                                                
 5. The above text view, for example, displays the Population, Life expectancy and Fertility rate for a specific country. Drag and drop *Country Name*, *Population*, *Life Expectancy* and *Fertility Rate* into **Columns**.

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
