---
title: How to Create a Text View Visualization in Slingshot 
_description: A quick tutorial on creating a Text View visualization using a sample spreadsheet.
---

# Creating a Text View

In this tutorial, you will learn how to create a text view visualization
using a sample spreadsheet.

<img src="images/TextViewSample_All.png" alt="TextViewSample\_All" class="responsive-img"/>

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
>Excel files as local files are not supported in this release. In order to follow these tutorials, make sure you upload the file to one of the supported _cloud services_ or add it as a [Web Resource](datasources/supported-data-sources/web-resource.md).

<a name='creating-text-view'></a>
## Creating a Text View

|                                          |                                                                                                                   |                                                                                                                                                                                                                         |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Create a Dashboard**               | <img src="images/Tutorials-Create-New-Dashboard.png" alt="Tutorials-Create-New-Dashboard" class="responsive-img"/>                                      | In the dashboard viewer, select the + button in the top right-hand corner of the "My Dashboards" screen. Then, select "Dashboard" from the dropdown.                                                                    |
| 2\. **Configure your Data Source**       | <img src="images/Tutorials-Select-Data-Source.png" alt="Tutorials-Select-Data-Source" class="responsive-img"/>                                          | In the *New Visualization* window, select the + button in the bottom right corner and select your data source.                                                                                                          |
| 3\. **Select the Tutorials Spreadsheet** | <img src="images/Tutorials-Select-Simple-Series-Charts-Spreadsheet.png" alt="Tutorials-Select-Simple-Series-Charts-Spreadshee" class="responsive-img"/> | Once the data source is configured, select the **Reveal Tutorials Spreadsheet**. Then, choose the "Simple Series Charts" sheet.                                                                                         |
| 4\. **Open the Visualizations Menu**     | <img src="images/Tutorials-Select-Change-Visualization.png" alt="Tutorials-Select-Change-Visualization" class="responsive-img"/>                        | Select the **grid icon** in the top bar of the Visualizations Editor.                                                                                                                                                   |
| 5\. **Select your Visualization**        | <img src="images/Tutorials-Charts-Select-Text-View.png" alt="Tutorials-Charts-Select-Text-View" class="responsive-img"/>                                | By default, the visualization type will be set to "Grid". Select the **Text View**.                                                                                                                                     |
| 6\. **Organize your Data**               | <img src="images/Tutorials-TextView-Organizing-Data.png" alt="Tutorials-TextView-Organizing-Data" class="responsive-img"/>                              | The above text view, for example, displays the population, life expectancy, and fertility rate for a specific country. Drag and drop "Country Name", "Population", "Life Expectancy" and "Fertility Rate" into Columns. |

<a name='changing-selected-row'></a>
## Changing the Selected Row

Text View display the first row of the sheet by default. You can add a
filter to your data in order to change this. For example, let's make the
text view display row 9 (Bosnia and Herzegovina).

|                           |                                                                       |                                                                                                                                            |
| ------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1\. **Add a Data Filter** | <img src="images/SelectFieldTextView_All.png" alt="SelectFieldTextView\_All" class="responsive-img"/>       | Drag and drop the "Country Name" field into Data Filters.                                                                                  |
| 2\. **Set your Filter**   | <img src="images/SelectedValuesTextView_All.png" alt="SelectedValuesTextView\_All" class="responsive-img"/> | Select "Filter Type" to enable the dropdown menu, and then choose **Select Values**.                                                       |
| 3\. **Select your Value** | <img src="images/SelectValueTextView2_All.png" alt="SelectValueTextView2\_All" class="responsive-img"/>     | By default, all values will be selected. Uncheck the "All" box, and select only **Bosnia and Herzegovina**. Then, select **Create Filter** |
