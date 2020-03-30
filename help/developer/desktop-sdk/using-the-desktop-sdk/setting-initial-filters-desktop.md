## Setting Up Initial Filter Selections

### Overview

Sometimes, you want to display a dashboard with filters already applied.
Dashboard filters are very useful to slice the contents of all the widgets at once. Because of this, you can use the SDK to set up initial dashboard filter selections that remain in context for all the dashboard’s widgets.

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
__RevealSettings__:

``` csharp
var revealView = new RevealView();

using (var fileStream = File.OpenRead(path))
{
    var dashboard = await RevealUtility.LoadDashboard(fileStream);

    var settings = new RevealSettings(dashboard);
    settings.DateFilter = new RVDateDashboardFilter(RVDateFilterType.YearToDate);
    settings.SetFilterSelectedValues(
        dashboard.GetFilterByTitle("Territory"),
        new List<object>() { CurrentUser.Territory }
    );
    revealView.Settings = settings;
}
```

> [!NOTE]
> The code above assumes that **CurrentUser.Territory** returns the name of the territory for the current user.


#### Hiding filters

It is possible that you might not want users to access data from
territories different than their own. In that case, you can restrict the
access to filters by configuring the
__RevealView__ object to hide
the panel containing the dashboard filters:

``` csharp
settings.ShowFilters = false;
```

That setting will restrict users to see data only for their associated
territory.

Finally, in the case that you still want users to change the date filter
selection, take a look to [**Setting up Dynamic Filter Selections**](setting-dynamic-filters-desktop.md). There you’ll find
information about how to create your own UI that, allowing the user to
change the date filter.

### Related content

  - [Loading Dashboards Files](loading-dashboards-desktop.md)
  - [Configuring the RevealView Object](configuring-revealview-desktop.md)
  - [Editing and Saving Dashboards](editing-saving-dashboards-desktop.md)
  - [Working with the Localization Service](localization-service-desktop.md)
  - [Working with the Formatting Service](formatting-service-desktop.md)
  - [Exporting a Dashboard or a Visualization](exporting-dashboard-visualization-desktop.md)
  - [Replacing Data Sources](replacing-data-sources-desktop.md)
  - [In-Memory Data Support](in-memory-data-desktop.md)
  - [Providing Credentials to Data Sources](providing-credentials-datasources-desktop.md)
  - [Setting Up Initial Filter Selections (Web)](../../web-sdk/using-the-client-sdk/setting-initial-filters-client-web.md)
  - [Maximizing Visualizations and Single Visualization Mode](maximizing-visualizations-desktop.md)
  - [Setting Up Dynamic Filter Selections](setting-dynamic-filters-desktop.md)
  - [Dashboard Linking](dashboard-linking-desktop.md)
  - [Handling User Click Events](handling-click-events-desktop.md)
  - [Creating New Visualizations and Dashboards](creating-visualizations-dashboards-desktop.md)
