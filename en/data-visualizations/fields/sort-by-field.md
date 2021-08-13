# Sort by Field

Reveal allows you to change how the data in a visualization is displayed by sorting the data in ascending or descending order. In addition, it is
also possible to further control how a visualization looks with sorting by selected fields in your original data source. 

<img src="images/sort-visualization-by-field.png" alt="Sort Visualization by setting dialog" class="responsive-img"/>

## Enabling Sort by Field 

The *Sort by field* option is part of the fields settings, but is hidden by default. To enable it: 

1. Select a field under the _Label_ placeholder. 
2. In *Field Settings*, choose _Ascending_ or _Descending_ for _Sorting_. 
3. _Sort by field_ shows under the _Sorting_ setting. You can choose a field from the dropdown on the right (as shown above).
 
For more practical information, take a look at the following examples
that showcase this functionality:

  - [Ordering Support Cases by Priority](#by-priority)

  - [Ordering String Dates in Chronological Order](#string-date-chr-order)

<a name='by-priority'></a>
## Ordering Support Cases by Priority

There are scenarios where you would like to order a field by using business logic instead of ordering it alphabetically. 
For example, the following is a visualization, which displays new support cases during the week, in ascending order.

<img src="images/RevenueCompanyFilterSample_All.png" alt="Welcome image for Reveal" class="responsive-img"/>

The _Priority_ field is a text field so it's ordered A-Z by default. However, if we use business logic, _Priority_ values should be ordered as follows: _Low_ - _Normal_ - _High_. To achieve this, you should have a _Priority Level_ column in your data set showing the numeric representation of the priority status (see below). 

<img src="images/RevenueCompanyPriority_All.png" alt="Welcome image for Reveal" class="responsive-img"/>

Organize the information in your chart by priority level without actually
dragging and dropping *Priority Level* field into the data editor by using the
*Sort By* field option.

<img src="images/ForecastPriorityLevel_All.png" alt="Welcome image for Reveal" class="responsive-img"/>

Your resulting widget, therefore, will place new cases with *Low*
priority first, ordered A-Z, *Normal* priority cases after those, and, lastly, *High* priority ones.

<img src="images/ForecastSortByFieldFinal_All.png" alt="Welcome image for Reveal" class="responsive-img"/>

<a name='string-date-chr-order'></a>
## Ordering String Dates in Chronological Order

Let's take a look at the following visualization, where we have plotted
the cash and accounts receivable influxes for a company in a [stacked column chart](~/en/visualization-tutorials/stacked-charts.html#create-stacked-chart).

<img src="images/SortByFieldSalesInformation_All.png" alt="SortByFieldSalesInformation\_All" class="responsive-img"/>

The values have been ordered by **Month Name** (a string field).
However, the months have been sorted in alphabetical order by default,
so the resulting visualization is not particularly useful for analysis.

You can, however, change how the **Month Name** is displayed by changing
its formatting and choosing to order the information by **Month of
Year**. You might not necessarily want to display the 1-12 numbers in
the Y axis (**Month of Year**), but you still want that order to
prevail. Select the **Month Name** field in the label placeholder of the
data editor, and select your desired sorting.

<img src="images/FieldSettingsSortBy_All.png" alt="FieldSettingsSortBy\_All" class="responsive-img"/>

Once done, select **Update Field**. Your information will now be ordered
in chronological order.

<img src="images/FinalSortingFinancialSample_All.png" alt="FinalSortingFinancialSample\_All" class="responsive-img"/>