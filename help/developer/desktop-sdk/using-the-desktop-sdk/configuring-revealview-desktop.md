## Configuring the RevealView Object

### Overview

The __RevealView__ component can
be instantiated while passing the __RevealSettings__ object as
a parameter.

The __RevealSettings__
object can be used to enable or disable different features towards the
end user, including:
  - **Showing/Hiding UI Elements** - The *ShowFilters* property is read
    by __RevealView__ during
    initialization time and based on its value either shows or hides the
    Global Filters UI to the user. Other similar properties are
    *ShowExportButton*, *CanEdit*, *ShowChangeDataSource*,and
    *MaximizedVisualization*.

  - **Specifying a Dashboard** - The *Dashboard* property is used to
    specify which dashboard should be rendered. As shown in [**Loading Dashboard Files**](loading-dashboards-desktop.md), the dashboard must
    be retrieved by using the
    __RevealUtility.LoadDashboard__
    method, which receives a Stream and returns the dashboard object
    (instance of the **RVDashboard** class).

  - **Selecting Global Filter values** - You can specify which values
    are initially selected for existing Global Filters when loading a
    dashboard.

### Code

The following code snippet shows how to load a dashboard and sets the
“Territory” selected value to be “Americas”, thus the dashboard will
be showing data filtered by “Americas”

``` csharp
var revealView = new RevealView();
using (var fileStream = File.OpenRead(path))
{
    var dashboard = await RevealUtility.LoadDashboard(fileStream);
    var territoryFilter = dashboard.GetFilterByTitle("Territory");
    var settings = new RevealSettings(dashboard);
    settings.SetFilterSelectedValues(territoryFilter, new List<object>() { "Americas" });
    revealView.Settings = settings;
}
```

#### About Initialization

RevealView applies RevealSettings during **initialization time**, which
is a particular time before the dashboard is displayed on screen. This
has several implications:

  - If you change the settings object after the dashboard is rendered,
    it will not affect the already loaded dashboard.
  - You can, however, change the selected values for dashboard filters
    after the view was created. To do that you need to use the
    *SetFilterSelectedValues* method in the RevealView object.
  - Any change for properties in the
    __RevealSettings__
    object (like CanEdit, CanSaveAs, etc) requires the creation of a new
    instance of __RevealView__.

### Related content

  - [Loading Dashboards Files](loading-dashboards-desktop.md)
  - [Configuring the RevealView Object (Web)](../../web-sdk/using-the-client-sdk/configuring-revealview-client-web.md)
  - [Editing and Saving Dashboards](editing-saving-dashboards-desktop.md)
  - [Working with the Localization Service](localization-service-desktop.md)
  - [Working with the Formatting Service](formatting-service-desktop.md)
  - [Exporting a Dashboard or a Visualization](exporting-dashboard-visualization-desktop.md)
  - [Replacing Data Sources](replacing-data-sources-desktop.md)
  - [In-Memory Data Support](in-memory-data-desktop.md)
  - [Providing Credentials to Data Sources](providing-credentials-datasources-desktop.md)
  - [Setting Up Initial Filter Selections](setting-initial-filters-desktop.md)
  - [Maximizing Visualizations and Single Visualization Mode](maximizing-visualizations-desktop.md)
  - [Setting Up Dynamic Filter Selections](setting-dynamic-filters-desktop.md)
  - [Dashboard Linking](dashboard-linking-desktop.md)
  - [Handling User Click Events](handling-click-events-desktop.md)
  - [Creating New Visualizations and Dashboards](creating-visualizations-dashboards-desktop.md)
