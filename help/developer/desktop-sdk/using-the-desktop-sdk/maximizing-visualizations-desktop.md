## Maximizing Visualizations and Single Visualization Mode

### Overview

When displaying a dashboard to the user, there are some cases in which
you’d like to display just one maximized visualization. In addition, you
might also want to lock the initial visualization and prevent the user
from accessing the whole dashboard. You can achieve both scenarios using
the Desktop SDK.

![Displaying a dashboard with a maximized visualization](images/three_divisions_dashboard_maximized.png)

#### Example Details

Let’s assume that you have a dashboard with three visualizations, where
each visualization is showing data for a different division of your
company, i.e., “Marketing”, “Sales” and “HR”.

![Displaying a dashboard with three visualizations](images/three_divisions_dashboard.png)

In this example, you’d like to showcase these visualizations in your
corporate application. You want to include them as part of the
information displayed on each division’s home page.

### Maximizing Visualizations

To open a dashboard with a maximized visualization, you need to use the
[**MaximizedVisualization**](rvui.wpf\<subscript\>infragistics.sdk.revealsettings\</subscript\>maximizedvisualization)
attribute of
[**RevealSettings**](rvui.wpf~infragistics.sdk.revealsettings). When you
don’t set a visualization in this attribute, the whole dashboard is
displayed.

As shown in [**Configuring the RevealViewobject**](configuring-revealview-desktop.md), you can display a specific dashboard in your page. This time, you also need to set the
[**MaximizedVisualization**](rvui.wpf\<subscript\>infragistics.sdk.revealsettings\</subscript\>maximizedvisualization)
attribute. As shown in the code snippet below with the visualization
"Sales".

``` csharp
var revealView = new RevealView();
using (var fileStream = File.OpenRead(path))
{
    var dashboard = await RevealUtility.LoadDashboard(fileStream);

    var settings = new RevealSettings(dashboard);
    settings.MaximizedVisualization = dashboard.GetVisualizationByTitle("Sales");
    revealView.Settings = settings;
}
```

Although the initial maximized visualization will be the one with title
‘Sales’, the end user can still return to the dashboard and see the
rest of the visualizations.

### Single Visualization Mode

You may also want to lock the initial visualization, making it the only
one displayed at all times. This way the dashboard works like a single
visualization dashboard. This is the concept behind “single
visualization mode”.

To turn on the “single visualization mode”, just set the
[**SingleVisualizationMode**](rvui.wpf\<subscript\>infragistics.sdk.revealsettings\</subscript\>singlevisualizationmode)
property to true, as shown below.

``` csharp
settings.SingleVisualizationMode = true;
```

After adding this single line, the dashboard will work as a single
visualization dashboard. You can do the same for each division’s home
page, just replace the title of the visualization in
[**GetVisualizationByTitle**](rvui.wpf\<subscript\>infragistics.sdk.rvdashboard\</subscript\>getvisualizationbytitle)
with the right one.

#### Dynamically changing a locked visualization

It is also possible for you to dynamically change the single
visualization being displayed, without reloading the page. From the
user’s perspective, your app would be a single page application with a
selector of divisions and a maximized visualization. After the user
chooses one division from the list, the maximized visualization is
updated.

You can achieve this scenario by using the
[**MaximizeVisualization**](rvui.wpf\<subscript\>infragistics.sdk.revealview\</subscript\>maximizevisualization)
method in [**RevealView**](rvui.wpf~infragistics.sdk.revealview), as
shown below:

``` csharp
private void MaximizeVisualization(string title)
        {
            revealView.MaximizeVisualization(revealView.Dashboard.GetVisualizationByTitle(title));
        }
```

Finally, you have to connect your custom control with the method above.
That way the visualization will be maximized when the selection in your
application changes.

To take into account:

  - You can generate the list of buttons dynamically by iterating the
    list of visualizations in the dashboard. For further details see
    [**RVDashboard.Visualizations**](rvui.wpf\<subscript\>infragistics.sdk.rvdashboard\</subscript\>visualizations).
  - There is a working example in the **Manufacturing.xaml.cs** view, in
    the *UpMedia* WPF application distributed with the SDK. That sample
    view shows all visualizations as a list of toggle buttons, at the bottom of the screen.

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
  - [Setting Up Initial Filter Selections](setting-initial-filters-desktop.md)
  - [Maximizing Visualizations and Single Visualization Mode (Web)](../../web-sdk/using-the-client-sdk/maximizing-visualizations-client-web.md)
  - [Setting Up Dynamic Filter Selections](setting-dynamic-filters-desktop.md)
  - [Dashboard Linking](dashboard-linking-desktop.md)
  - [Handling User Click Events](handling-click-events-desktop.md)
  - [Creating New Visualizations and Dashboards](creating-visualizations-dashboards-desktop.md)
