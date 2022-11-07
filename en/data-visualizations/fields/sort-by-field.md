---
title: How to Sort by Field in Slingshot 
_description: Learn how to change the display of data in a visualization to further precise how it looks.
---

# Sort by Field

Reveal allows you to change how the data in a visualization is displayed by sorting the data in ascending or descending order. In addition, it is
also possible to further control how a visualization looks with sorting by selected fields in your original data source. 

<img src="images/field-settings-dialog.png" alt="Sorting options in the field settings dialog" class="responsive-img" width="40%"/>

## Enabling Sort by Field 

The *Sort by field* option is part of the fields settings, but is hidden by default. To enable it: 

1. Select a field under the *Label* placeholder. 
2. In *Field Settings*, choose *Ascending* or *Descending* for *Sorting*. 
3. *Sort by field* shows under the *Sorting* setting. You can choose a field from the dropdown on the right (as shown above).
 
For more practical information, take a look at the following examples
that showcase this functionality:

  - [Ordering Support Cases by Priority](#by-priority)

  - [Ordering String Dates in Chronological Order](#string-date-chr-order)

<a name='by-priority'></a>
## Ordering Support Cases by Priority

There are scenarios where you would like to order a field by using business logic instead of ordering it alphabetically. 
For example, the following is a visualization, which displays new support cases an ascending order.

<img src="images/support-cases-sample.png" alt="Visualization displaying data in an ascending order" class="responsive-img" width="85%"/>

The *Priority* field is a text field so it's ordered A-Z by default. However, if we use business logic, *Priority* values should be ordered as follows: *Low* - *Normal* - *High*. To achieve this, you should have a *Priority Level* column in your data set showing the numeric representation of the priority status (see below). 

<img src="images/weekly-cases-priority.png" alt="Visualization showing weekly cases ordered by Priority level" class="responsive-img" width="85%"/>

Organize the information in your chart by priority level without actually
dragging and dropping *Priority Level* field into the data editor by using the
*Sort By* field option.

<img src="images/sorting-by-priority-sample.png" alt="Sorting the information by priority in the sort by field option" class="responsive-img" width="40%"/>

<a name='string-date-chr-order'></a>
## Ordering String Dates in Chronological Order

Let's take a look at the following visualization, where we have plotted
the cash and accounts receivable influxes for a company in a [stacked column chart](~/en/visualization-tutorials/stacked-charts.html#create-stacked-chart).

<img src="images/sort-by-field-sales-information-sample.png" alt="Sales Info visualization while using stacked column chart" class="responsive-img" width="85%"/>

The values have been ordered by **Month Name** (a string field).
However, the months have been sorted in alphabetical order by default,
so the resulting visualization is not particularly useful for analysis.

You can, however, change how the **Month Name** is displayed by changing
its formatting and choosing to order the information by **Month of
Year**. You might not necessarily want to display the 1-12 numbers in
the Y axis (**Month of Year**), but you still want that order to
prevail. Select the **Month Name** field in the label placeholder of the
data editor, and select your desired sorting.

<img src="images/field-settings-sort-by.png" alt="Sort by option with a list of different fields in the field settings dialog" class="responsive-img" width="85%"/>

Once done, select **Update Field**. Your information will now be ordered
in chronological order.

<img src="images/financial-metrics-sample.png" alt="Visualization of data sorted by chronological order" class="responsive-img" width="85%"/>