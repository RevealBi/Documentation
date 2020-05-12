## Dashboard Filters and Their Properties

### Accessing Dashboard Filter Properties

In order to add a new dashboard filter:

1.  Go to the *Dashboard editor* and select *Add Filter* ⇒ *Add
    Dashboard Filter*.

2.  The *Dashboard Filter* menu will open. By default, the selected data
    source will be the data source used in your first visualization. You
    can configure or change it using the overflow menu next to the data
    source's name.

    ![Selecting Dashboard Filter data source menu](images/select-dashboard-filter-data-source-menu.png)

3.  Choose which dataset to use as a dashboard filter and click/tap
    *Select Data*.

### Filter Settings Overview

You will be able to change the following settings for the filter:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
</style>
<table class="tg">
  <tr>
    <th class="tg-cly1" rowspan="5"><img src="images/dashboard-filter-settings.png" alt="Dashboard Filter settings menu" width="400" height="300"></th>
    <th class="tg-cly1">Title. The title for the dashboard filter, which will be displayed right under the dashboard title. By default, this is the name of the field that will be used as a filter.</th>
  </tr>
  <tr>
    <td class="tg-cly1"><a href="#displayed-field">Displayed Field</a>. The field in your dataset, which will be used as a dashboard filter.</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Selection</span>. This setting allows you to configure: <a href="#multiple-selection">Multiple Selection</a> (more than one value can be selected at a time) and/or <a href="#required-selection">Required Selection</a> (at least one value must always be selected).</td>
  </tr>
  <tr>
    <td class="tg-cly1"><a href="#data-filters">Data Filters</a>. This setting allows you to apply any <a href="#~/en/fields/field-filters-rules.md">field filters and rules</a> to the data source used for the dashboard filter.</td>
  </tr>
  <tr>
    <td class="tg-cly1"><a href="connecting-dashboard-filters-visualization.md">Connected Visualizations</a>. Whether your dashboard will be connected to any visualization or not.</td>
  </tr>
</table>

<a name='displayed-field'></a>
### Displayed Field

This setting specifies the dataset field that will be used to display
the values in the Dashboard Filters. Listed values will not be repeated,
even if they appear multiple times in the original dataset.

You can change the displayed column in *Edit* mode by selecting the
*Edit* button in the overflow menu next to the dashboard filter name.

![Accessing dashboard filter edit mode](images/edit-displayed-field-filter-setting.png)

<a name='multiple-selection'></a>
### Multiple Selection

Reveal supports the selection of multiple dashboard filter values
simultaneously. This is meant to enable side by side comparison between
different elements in a collection. For instance, in the *HR Dashboard*
dashboard you can compare the hires and absences over time of different
offices by enabling multiple selection.

![Filters multiple selection applied to a dashboard](images/dashboard-filters-multiple-selection.png)

In order to **enable "Multiple Selection"**, you must switch the
dashboard to *Edit* mode ⇒ choose *Edit* from the overflow menu of a
dashboard filter ⇒ *Selection* ⇒ tick *Multiple Selection* checkbox.

![Enabling dashboard filters multiple selection](images/dashboard-filters-enable-multiple-selection.png)

<a name='required-selection'></a>
### Required Selection

Dashboard filters can be configured to require a selected option or not.
By default, selections are not required. Making selections optional
allows the user to uncheck all dashboard filter values, which removes
the filter from the performed query. The query retrieves all data from
the data source, and *No Selection* is displayed in the dashboard
filters row.

In order to **enable "Required Selection"**, you must switch the
dashboard to *Edit* mode ⇒ choose *Edit* from the overflow menu of a
dashboard filter ⇒ *Selection* ⇒ tick *Required Selection* checkbox.

![Enabling dashboard filters required selection](images/dashboard-filter-enable-required-selection.png)

<a name='data-filters'></a>
### Data Filters

You can also apply filters to the fields in the dataset displayed in the
Dashboard Filter. This allows you to filter out null or empty values on
a specific field ([empty values filter](field-filters-rules.html#empty-values)). You can also [select specific values](field-filters-rules.html#select-values), or add
[rules](field-filters-rules.html#rules) to your field in order to change the
options depending on the field type. For more information, visit the
[field filters and rules](field-filters-rules.md) section.

For example, if you use the *Employee Name* field to filter the data in
your *HR Dashboard*, the *Dashboard filter* will show a list of all
employees in all offices of the company:

![Employee name dashboard filter applied to HR Dashboard](images/data-filters-dashboard-filters-hr-dashboard-example.png)

In this case, you can apply the *Data Filter* property, if you want to
use as a filter only employees working in a particular office, e.g.
*London, UK*. This way your dashboard filter will show a list of the
employees working in the London office to choose from.

#### Applying a data filter to your dashboard filter

To apply field filters and rules to the data source used as a dashboard
filter and have the dashboard filter show only the employees in the
*London, UK* office (as in the example above), follow these steps:

1.  Go to *Data Filters* in Dashboard Filter settings.

2.  Select *Employee name* for the *Displayed Field* property.

3.  Click/tap *Select a Field* and choose *Office* from the list.

    ![Selecting a field for a data filter in the dashboard filter settings menu](images/dashboard-filters-select-data-filter-field.png)

4.  In the following dialog, select the filter type you want to apply
    (choose *Select Values* for the purposes of this example):

    ![Dashboard Filters Filter type option](images/dashboard-filter-field.png)

5.  Choose *London, UK* from the list and click/tap the *Create Filter*
    button.

Now that you have already created your dashboard filter, you will need
to **connect it to the visualizations** you want to apply filtering to.
To learn more about this, please read [Connecting Dashboard Filters to a Visualization](connecting-dashboard-filters-visualization.md).
