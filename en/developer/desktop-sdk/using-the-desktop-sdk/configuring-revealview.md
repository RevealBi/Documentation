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
    specify which dashboard should be rendered. As shown in [**Loading Dashboard Files**](loading-dashboards.md), the dashboard must
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
var dashboard = new RVdashboard(path);
dashboard.filters.GetByTitle("Territory").selectedValues = new List<object>() { "Americas" };
revealView.Dashboard = dashboard;
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
