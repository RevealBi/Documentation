import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Release Notes

## 1.5.0 (May 4th, 2023)

### Breaking Changes
* In some scenarios, the information set in IRVDataSourceProvider was visible to the client and also stored in the dashboard file. That was not a desirable behavior, but it also produced some hard to reproduce issues when editing dashboards. Starting on 1.5.0, the datasource information set in IRVDataSourceProvider does not leave the server. Depending on the specific implementation of IRVDataSourceProvider, this might have a big impact. To make sure your implementation is right, generally speaking, make sure that if you have a non-trivial implementation of ChangeDataSource, then you also implement ChangeDataSourceItem, and that this ChangeDataSourceItem invokes ChangeDataSource on the dataSourceItem.dataSource object. In addition, when working with CSV, Json, Excel files coming from datasources like S3, Rest, etc., please take into account that you might receive a call to ChangeDataSourceItem with the csv/json/excel datasource item, and in that case you must make sure that the dataSourceItem.resourceItem is properly 'changed', which also means invoking ChangeDataSource for dataSourceItem.resourceItem.dataSource.
* IRVDataSourceProvider now requires the implementation of ChangeDataSourceAsync.
* We're no longer releasing an installer for the asp.net SDK. To get started, check the documentation at https://help.revealbi.io/web/getting-started-server

### Bug Fixes

#### All Platforms
* Headless export: landscape is now the default orientation.
* Fixes and performance improvements for the new category charts
* Setting the Host property in MsSql provider in the IRVDataSourceProvider but not in the client causes error
* Redshift queries fail if the Schema property is not set in the dataSourceItem (should use the default, 'public', schema)
* Financial charts were not working properly  
* host property had always a value of null in IRVAuthenticationProvider for RVSqlServerDataSource.
* All database datasources required the Database property to be set in the DataSourceItem (even if it was set in the DataSource). Now the property has been deprecated in the DataSourceItem, and setting it in the Database just works.
* Opening a linked dashboard caused a crash
* Treemap showing Redshift/Postgres data failed
* Error using Standard Deviation aggregation with Redshift or Postgres
* Setting a different Sheet for an Excel datasource using IRVDataSourceProvider didn't work
* Error if clicking in blank space between the title and statistics icon while in Visualization Editor mode.
* Cannot change the title of a new visualization (when it is initialized as a blank title)
* If a JSON attribute name begins with a number the extracted value is always empty
* Data Blending field panels don't scroll with mouse wheel or trackpad
* Unable to move filter when there are 10+ of them in edit mode
* Sybase ds item wrapper with configured custom query property still returns all data
* Replacing Analysis Services data source doesn't work
* Dynamics CRM - NRE is thrown when you try to get data using a data source item
* An exception is thrown when no image is set in DashboardEmptyState
* RVReportingServicesDataSourceItem seems to be missing properties for configuring parameters
* It is not possible to render a pdf report using RVReportingServicesDataSourceItem
* "No Url specified for web resource" error replacing DataSource WebResource URL 
* Calls to `IRVDataSourceProvider.ChangeDataSourceItemAsync` always has null for dashboardId argument
* KPI Indicators - "There's no data to display" has wrong style
* Some global filters are being reset when start selecting their options
* Null Reference Exception thrown when using a specific Excel sheet with custom styles.
* MySQL timestamp columns are read as UTC datetimes when they're actually in the session timezone.
* The nuget files contains more dependencies than it should
* Very bad performance on Redshift blending when using a RVRedshiftDataSourceItem
* Error when using InMemory datasource in SDK
* Error in Salesforce visualization when using Lead's ConvertedDate as a filter
* S3 Excel resource item not working after replace DS/DSI scenario (app kept in loading after sheet selection when creating widget)
* The Rest API URL should not be shown in errors
* Change RVDashboard.visualizations type in d.ts to VisualizationsArray

#### Node
* Several improvements on headless export for the Node.js SDK. Now it is available for Linux/MacOS.

#### Java
* 'Schema' property for the Snowflake DataSource was being ignored.
* Asset visualization not working when using the java SDK.
* Redshift queries for tables using column of type 'timestamptz' failed if it contained null values.
* MaxDownloadSize limit is being ignored in Java SDK

## 1.4.0 (Feb-2023)

### Breaking Changes
* Category Charts have a new look & feel. The old L&F is deprecated but if needed for whatever reason, they're can be restored by doing `revealSdkSettings.enableNewCharts = false`.
* Subtitles for Data Source Items are no longer autogenerated. Only the Subtitle property is considered.

### New Features

#### All Platforms
* New API `onFieldsInitializing` that makes it possible to customize the list of fields shown in the visualization editor, by removing, renaming or reordering fields. Usage example: 
```
revealView.onFieldsInitializing = function (args) {
	args.fields = args.fields.filter(f => !["Avg.CPC", "Avg. CPC"].some(e => e == f.name));
};
```
* BigQuery, Snowflake and Athena now support the `CustomQuery` property
* Snowflake - Allow setting `Warehouse` property from sdk

#### Node
* (Beta) Headless Export for node.js SDK. Currently, it only works on the Windows platform.
* `RVHeadersDataSourceCredentials` now available for Node.js SDK.

### Bug Fixes

#### All Platforms
* When trying to join a third dataset the app freezes
* Using a RVDashboardDataSource causes a crash when the Id property is not set (Web only)
* Inconsistent time part for dates sent in the range parameter of onDateFilterChanged
* Inconsistent day shown in the global filter range selector, when using 'Today' or 'Yesterday' two different days were displayed.
* Data blending editor doesn't show the field used for joining when that field comes from a previous data blending.
* The Athena DataSourceItem errors out unless you specify the Database property on the Client (Web only)
* RVSnowflakeDataSourceItem Does Not Work

#### ASP.NET
* Headless export fails if DocumentExportOptions is used.

#### Java
* "Fail to retrieve row count for first arrow chunk" error in Snowflake (Java only)

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

#### Node
- Renamed `RVUserNamePasswordDataSourceCredential` to `RVUsernamePasswordDataSourceCredential`. Changed the uppercase "N" to lowercase "n".

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

<Tabs groupId="code" queryString>
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
