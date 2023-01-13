import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Release Notes

## 1.3.1 (Jan-2023)

### BREAKING CHANGES

#### ASP.NET
- The `Reveal.Sdk.Web.AspNetCore.Trial` nuget package has been **deprecated** and is **no longer updated**. 
- The new `Reveal.Sdk.AspNetCore` nuget package is now available on [nuget.org](https://www.nuget.org/packages/Reveal.Sdk.AspNetCore), and will work as both a Trial and Licensed version. To unlock the Trial, set the license key in the SDK.
- The license key is now set in the initialization parameters of the Reveal SDK (previously, this was done in the installer). Here's how to set it:

```cs
services
    .AddMvc()
        .AddReveal(builder =>
        {
            builder
              .AddSettings(settings =>
              {
                  settings.License = "XYZ123";
              });
        });	
```

### Bug Fixes

#### All Platforms
- Several improvements to headless export: 
	- Improved API.
	- Visualization using Maps now show correctly.
	- Decreased memory footprint when running.
	- Fixed issue where a missing title in the dashboard would make the export fail.
- Fixed issue: when creating a REST datasource using parameters. If the back button was pressed, values were already populated but they were not really applied.
- Fixed issue: Dashboard filter list of available values was always refreshed when opening a dashboard, no matter what expiration setting was set.
- Fixed issue: Dashboard filter expiration value was not saved.
- Fixed issue: Dashboard horizontal filter lost when maximizing and then restoring.
- Fixed issue: the kebab menu in the dashboard view was not reachable using the keyboard (tab).
- Fixed issue: Dashboard linking stops working after selecting a dashboard filter in the linked visualization.
- Fixed issue: Wrong value shown for Scatter Map mouseover tooltip.
- Fixed issue: Cancelling the MenuOpening event didn't really cancel.
- Fixed issue: In ChangeDataSourceItemAsync method, the userContext parameter was coming with null value.

#### Java
- Fixed issue: "Login failed due to client TLS version..." error when connecting to mssql in Azure.
- Fixed issue: Could not add Google Analytics 4 interactively.

## 1.3.0 (Nov-2022)

### New Features
- Export dashboards from the backend:

<Tabs groupId="code">
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
var pdfStream = await dashboardExporter.ExportToPdf(dashboardId);
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
RevealEngineLocator.dashboardExporter.exportToPdf(dashboardId, new ExportStreamCallback() {
	@Override
	public void onSuccess(InputStream stream) {
		// result PDF to be read from the stream parameter
	}
	@Override
	public void onFailure(Exception e) {
		// the export failed :(
	}
});
```

  </TabItem>

</Tabs>


- New Data Source: Google Analytics 4.
- Interactive Dashboard Filtering: Filter all visualizations using the same data source by clicking on a chart or pivot table data point. Enable with: `revealView.interactiveFilteringEnabled = true`.
- Methods containing a callback now include an additional signature allowing for promise method handling:

```javascript
$.ig.RevealUtility.loadDashboard(dashboardId).then(dashboard => {
  revealView.dashboard = dashboard;
});
```

If using async/await:

```javascript
let dashboard = await $.ig.RevealUtility.loadDashboard(dashboardId);
revealView.dashboard = dashboard;
```

- Manually loading of default fonts using the `ensureFontsLoadedAsync` method from `$.ig.revealSdkSettings` is no longer required.
- New function 'DateDiff' for calculated fields.

### Bug Fixes

#### All Platforms
- Fix error when filtering boolean values in Postgres & Redshift ("operator does not exist")
- Fix localization not working when the locale contains an hyphen
- Fix for `IRVDataSourceProvider.ChangeDataSourceItem` not invoked when creating a new visualization from a REST data source.
- Removed new http header 'XRID' that was accidentally added in v1.2.3 and was causing issues with CORS.

#### Java
- sdk-ext: updated commons-text library.
- Fix for very slow response times when processing some Excel files.
