## Configuring the RevealView Object

### Overview

The __$.ig.RevealView__
component can be instantiated while passing the
__$.ig.RevealSettings__
object as a parameter.

The __$.ig.RevealSettings__
object can be used to enable or disable different features towards the
end user, including:

  - **Showing/Hiding UI Elements** - The *showFilters* property is read
    by
    __$.ig.RevealView__
    during initialization time and based on its value either shows or
    hides the Global Filters UI to the user. Other similar properties
    are *showExportImage*, *canEdit*, *showChangeDataSource*, and *maximizedVisualization*.
  - **Specifying a Dashboard** - The *dashboard* property is used to
    specify which dashboard should be rendered. As shown in
    [**Instantiating the Web Client SDK**](~/en/developer/general/setup-configuration-web.html#instantiate-web-client-sdk),
    the dashboard must be retrieved by using the
    *$.ig.RevealUtility.loadDashboard* method, which receives a
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
var revealSettings = new $.ig.RevealSettings(dashboardId);

$.ig.RevealUtility.loadDashboard(dashboardId, function (dashboard) {
    revealSettings.dashboard = dashboard;

    var applicationNameFilter = dashboard.getFilterByTitle("application_name");
    revealSettings.setFilterSelectedValues(applicationNameFilter, ["App2"]);

    window.revealView = new $.ig.RevealView("#revealView", revealSettings);
}, function (error) {
});
```

### About Initialization

$.ig.RevealView applies $.ig.RevealSettings during **initialization
time**, which is a particular time before the dashboard is displayed on
screen. This has several implications:

  - If you change the settings object after the dashboard is rendered,
    it will not affect the already loaded dashboard.
  - You can, however, change the selected values for dashboard filters
    after the view was created. To do that you need to use the
    __setFilterSelectedValues__
    method in the $.ig.RevealView object.
  - Any change for properties in the
    __$.ig.RevealSettings__
    object (like canEdit, canSaveAs, etc) requires the creation of a new
    instance of
    __$.ig.RevealView__.
