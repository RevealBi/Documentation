## Setting Up Initial Filter Selections

### Overview

Sometimes, you want to display a dashboard with filters already applied.
Dashboard filters are very useful to slice the contents of all the
widgets at once. Because of this, you can use the SDK to set up initial
dashboard filter selections that remain in context for all the
dashboard’s widgets.

#### Example Details

In this example, you have a dashboard showing Sales data with the
following filters:
  - A given period of time (last 365 days, Year to Date, etc.);
  - Territory (Americas, Europe, Asia, etc.).

![sales-data\_example](images/sales-data_example.png)

### Code Example

In this case, you want to set the initial filters selection to:
  - “Year to Date” (instead of “Last 365 days”, the default setting for
    this dashboard);
  - Sales associated to the Territory of the current user.

As part of the initialization process and once the dashboard is loaded,
you can retrieve the list of filters in the dashboard and use these
filters to set the initially selected values in
__$.ig.RevealSettings__:

``` html
<script type="text/javascript">
    var dashboardId = 'Sales';
    var revealSettings = new $.ig.RevealSettings(dashboardId);

    $.ig.RevealUtility.loadDashboard(dashboardId, function (dashboard) {
        revealSettings.dashboard = dashboard;

        revealSettings.setDateFilter(new $.ig.RVDateDashboardFilter($.ig.RVDateFilterType.YearToDate));
        revealSettings.setFilterSelectedValues(
            dashboard.getFilterByTitle("Territory"),
            [getCurrentUser().territory]
        );

        new $.ig.RevealView("#revealView", revealSettings);
    }, function (error) {
        console.log(error);
    });
</script>

<div id="revealView" style="height:500px;" />
```

> [!NOTE]
> The code above assumes that **getCurrentUser().territory** returns the territory for the current user.

#### Hiding filters

It is possible that you might not want users to access data from
territories different than their own. In that case, you can restrict the
access to filters by configuring the
__$.ig.RevealView__ object to
hide the panel containing the dashboard filters:

``` js
$.ig.revealSettings.showFilters = false;
```

That setting will restrict users to see data only for their associated
territory.

Finally, in the case that you still want users to change the date filter
selection, take a look at [**Setting up Dynamic Filter Selections**](setting-dynamic-filters-client-web.md). There you’ll find information about how to create your own UI that, allowing the user to change the date filter.

### Related content

  - [Configuring the RevealView Object](configuring-revealview-client-web.md)
  - [Editing and Saving Dashboards](editing-saving-dashboards-client-web.md)
  - [Exporting a Dashboard or a Visualization](exporting-dashboard-visualization-web.md)
  - [Maximizing Visualizations and Single Visualization Mode](maximizing-visualizations-client-web.md)
  - [Setting Up Dynamic Filter Selections](setting-dynamic-filters-client-web.md)
  - [Dashboard Linking](dashboard-linking-client-web.md)
  - [Handling User Click Events](handling-click-events-client-web.md)
  - [Creating New Visualizations and Dashboards](creating-visualizations-dashboards-client-web.md)
  - [Exporting a Dashboard or a Visualization (Desktop)](../../desktop-sdk/using-the-desktop-sdk/exporting-dashboard-visualization-desktop.md)
  - [Setting Up Initial Filter Selections (Desktop)](../../desktop-sdk/using-the-desktop-sdk/setting-initial-filters-desktop.md)
