## Configuring the RevealView Object

### Overview

The __RevealView__ component can be used to enable or disable different features towards the
end user, including:
  - **Showing/Hiding UI Elements** - The *ShowFilters* property is read
    by __RevealView__ during
    initialization time and based on its value either shows or hides the
    Global Filters UI to the user. Other similar properties are
    *ShowExportButton*, *CanEdit*, *ShowChangeDataSource*,and
    *MaximizedVisualization*.

  - **Specifying a Dashboard** - The *Dashboard* property is used to
    specify which dashboard should be rendered. As shown in [**Loading Dashboard Files**](loading-dashboards.md), the dashboard must
    be instantiated by using the __RVDashboard__ constructor, which receives either a Stream or a path string pointing to the location of the rdash file on the local file system.

  - **Selecting Global Filter values** - You can specify which values
    are initially selected for existing Global Filters when loading a
    dashboard.

### Code

The following code snippet shows how to load a dashboard and sets the
“Territory” selected value to be “Americas”, thus the dashboard will
be showing data filtered by “Americas”

``` csharp
var revealView = new RevealView();
var dashboard = new RVDashboard(path);
dashboard.filters.GetByTitle("Territory").selectedValues = new List<object>() { "Americas" };
revealView.Dashboard = dashboard;
```
