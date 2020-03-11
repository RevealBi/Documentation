## Dashboard Linking

### Overview

The Reveal application supports dashboard linking, which allows users to navigate through dashboards. By moving from dashboard to dashboard, you can go from a high level overview of the business' reality to a more detailed view with the specifics.

### Common Use Cases

You can have, for example, a "Company 360" dashboard showing key
performance indicators for each division (HR, Sales, Marketing). Once the user maximizes one of the visualizations, the navigation is
triggered and the user is taken to another dashboard with more detailed information about that division.

Alternatively, you can also use dashboard linking to navigate to a more specific dashboard. For example, in a dashboard with a visualization showing the Top 25 Customers, by selecting one of the customers the user will navigate to a new dashboard. This new dashboard will display detailed information about the selected customer, like recent purchases, contact information, top selling products, etc.

For further details about the Dashboard Linking functionality, refer to [**Dashboard Linking**](https://www.revealbi.io/help/dashboard-linking) from Reveal’s User Guide.

### Code Example

You can use dashboard linking with the SDK, but the containing
application needs to be involved when the navigation is being triggered.
As the SDK does not handle where dashboards are stored, it needs the
containing application to provide a dashboard file for the target
dashboard.

As a practical example, you can use the **Marketing.cshtml** page in the *UpMedia* sample distributed with the SDK.

Basically, you just have to do two things and the SDK will take care of the rest:

1.  Handle the [**onVisualizationLinkingDashboard**](api-reference-client-web.html#RevealView+onVisualizationLinkingDashboard) event.

2.  Invoke the callback with the ID of the target dashboard.

<!-- end list -->

``` js
revealView.onVisualizationLinkingDashboard = function (title, url, callback) {
    //provide the dashboard id of the target of the link
    callback("Campaigns");
};
```
### Related content

  - [Configuring the RevealView Object](configuring-revealview-client-web.md)
  - [Editing and Saving Dashboards](editing-saving-dashboards-client-web.md)
  - [Exporting a Dashboard or a Visualization](exporting-dashboard-visualization-web.md)
  - [Setting Up Initial Filter Selections](setting-initial-filters-client-web.md)
  - [Maximizing Visualizations and Single Visualization Mode](maximizing-visualizations-client-web.md)
  - [Setting Up Dynamic Filter Selections](setting-dynamic-filters-client-web.md)
  - [Dashboard Linking (Desktop)](../../desktop-sdk/using-the-desktop-sdk/dashboard-linking-desktop.md)
  - [Handling User Click Events](handling-click-events-client-web.md)
  - [Creating New Visualizations and Dashboards](creating-visualizations-dashboards-client-web.md)
