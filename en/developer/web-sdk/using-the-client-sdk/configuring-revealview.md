## Configuring the RevealView Object

### Overview

The __$.ig.RevealView__ component can be instantiated while passing the selector pointing to the DOM element where the reveal view should be rendered. This component can be used to enable or disable different features towards the end user, including:

  - **Showing/Hiding UI Elements** - The *showFilters* property is read by __$.ig.RevealView__
    during initialization time and based on its value either shows or
    hides the Global Filters UI to the user. Other similar properties
    are *showExportImage*, *canEdit*, *showChangeDataSource*, and *maximizedVisualization*.
  - **Specifying a Dashboard** - The *dashboard* property is used to
    specify which dashboard should be rendered. As shown in
    [**Instantiating the Web Client SDK**](~/en/developer/setup-configuration/setup-configuration-web.html#instantiate-web-client-sdk),
    the dashboard must be retrieved by using the
    *$.ig.RVDashboard.loadDashboard* method, which receives a
    dashboardId and a success callback called when the dashboard is
    loaded.
  - **Selecting Dashboard Filter values** - You can specify which values are initially selected for existing Dashboard Filters when loading a dashboard. In the Reveal app, by using Dashboard Filters you can apply dynamic filtering to all connected visualizations of your dashboard. When the selection changes, all the visualizations change at once. For further details, please refer to [**Reveal Filters**](https://www.revealbi.io/help/filters) within _Reveal's User Guide_.

### Code

The following code snippet illustrates how to load a dashboard
“AppsStats”. By setting the “application\_name” global filter’s
selected value to be “App2”, the dashboard will be showing data filtered
by “App2”.

``` js
var dashboardId = "AppsStats";

$.ig.RVDashboard.loadDashboard(dashboardId, function (dashboard) {
    dashboard.filters.getByTitle("application_name").selectedValues = ["App2"];

    var revealView = new $.ig.RevealView("#revealView");
    revealView.dashboard = dashboard;
}, function (error) {
});
```
