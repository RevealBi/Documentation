---
title: How to Create a Text View Visualization in Slingshot 
_description: A quick tutorial on creating a Text View visualization using a sample spreadsheet.
---

# Creating a Text View

In this tutorial, you will learn how to create a text view visualization
using a sample spreadsheet.

<img src="images/text-view-sample.png" alt="Visualization sample using text view" class="responsive-img" width="85%"/>

Access the links below for the Text view walkthroughs.

  - [How to create a basic Text View](#creating-text-view)

  - [How to change the selected row](#changing-selected-row)

## Key Concepts

Text views display information in a key-value pattern, but **they only
display the first row of data paired with a column's label**. You can,
however, add filters to make sure Reveal displays the row you need.

## Sample Data Source

For this tutorial, you will use the "Simple Series Charts" sheet in the
[Reveal Tutorials Spreadsheet](https://download.infragistics.com/reportplus/help/samples/Reveal_Visualization_Tutorials.xlsx).

>[!NOTE]
>Excel files as local files are not supported in this release. In order to follow these tutorials, make sure you upload the file to one of the supported *cloud services* or add it as a [Web Resource](datasources/supported-data-sources/web-resource.md).

<a name='creating-text-view'></a>
## Creating a Text View

 1. Click/tap on the **+ Dashboard** button in the top right-hand corner in *My Analytics*.

    <img src="images/my-analytics-dashboard-button.png" alt="Dashboard button in the my analytics board" class="responsive-img" width="85%"/>                                                         
 2. You can choose the data source you want to work with from the list of data sources. If the data source is new, you will need to add it from the **+ Data Source** button.

     <img src="images/tutorials-select-data-source-list.png" alt="A dialog with a list of data sources" class="responsive-img" width="85%"/>                                                         
 3. Once the data source is configured, select the **Reveal Tutorials Spreadsheet**. Then, choose the "Simple Series Charts" sheet.  

     <img src="images/tutorials-simple-series-charts-spreadsheet.png" alt="Simple Series Charts Spreadsheed in the data source " class="responsive-img" width="60%"/>                                                                                      
 4.  Open the *Visualization Picker* and select **Text View**. By default, the visualization type will be set to **Column**.   
 
      <img src="images/text-view-chart-types.png" alt="Text View in the chart types list" class="responsive-img" width="70%"/>                                                                                                
 5. The above text view, for example, displays the population, life expectancy, and fertility rate for a specific country. Drag and drop "Country Name", "Population", "Life Expectancy" and "Fertility Rate" into Columns.

     <img src="images/organizing-data-text-view.png" alt="Organizing data in the data filter for text view" class="responsive-img" width="40%"/>        

<a name='changing-selected-row'></a>
## Changing the Selected Row

Text View displays the first row of the sheet by default. You can add a
filter to your data in order to change this. For example, let's make the
text view display row 9 (Bosnia and Herzegovina).

1. Drag and drop the "Country Name" field into Data Filters.  
 
    <img src="images/select-data-filter-text-view.png" alt="Selecting an example for data filter for the text view" class="responsive-img" width="37%"/>                                                      
2. Select "Filter Type" to enable the dropdown menu, and then choose **Select Values**. 
 
     <img src="images/data-filter-dialog-select-value-text-view.png" alt="Select Value option from the list of filter types" class="responsive-img" width="40%"/>                                                      
3. By default, all values will be selected. Uncheck the "All" box, and select only **Bosnia and Herzegovina**. Then, select **Create Filter** 

    <img src="images/data-filter-select-value-example.png" alt="Choosing country from the list of selected values" class="responsive-img" width="40%"/> 
