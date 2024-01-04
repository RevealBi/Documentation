import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Release Notes

## 1.6.2 (January 5th, 2024)

### Enhancements

#### All Platforms

- The visualization background color picker was updated to use [Coloris](https://github.com/mdbassit/Coloris). With this enhancement the property `canChangeVisualizationBackgroundColor` has been marked as obsolete because we are now enabling the visibility of background color setting by default.
- The sqlite storage for cache file `tabulardata.sqlite` is now disabled by default to prevent growing without limit
- When `$.ig.RevealSdkSettings.enableActionsOnHoverTooltip` is enabled, the actions tooltip is now available on the Pivot visualization. Hovering on a chart visualization will now show the tooltip when within a certain number of pixels from the data point.

### New Features

#### All Platforms

- Support added for custom colors on client & server export

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
PdfExportOptions options = new PdfExportOptions();

options.InitScript = @"
	function init(revealView){
		$.ig.RevealSdkSettings.theme = new $.ig.MountainDarkTheme();                   

		revealView.refreshTheme();                

		revealView.onVisualizationSeriesColorAssigning = function (visualization, defaultColor, fieldName, categoryName) {
			if (categoryName === ""Critical"") {
					return ""rgb(0,0,0)"";
			}
			return defaultColor;
		}
	}";

await _exporter.ExportToPdf(dashboardId, path, options);
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
PdfExportOptions options = new PdfExportOptions();	
			
options.setInitScript("function init(revealView){\r\n"
		+ "		$.ig.RevealSdkSettings.theme = new $.ig.MountainDarkTheme();                   \r\n"
		+ "\r\n"
		+ "		revealView.refreshTheme();                \r\n"
		+ "\r\n"
		+ "		revealView.onVisualizationSeriesColorAssigning = function (visualization, defaultColor, fieldName, categoryName) {\r\n"
		+ "			if (categoryName === \"Critical\") {\r\n"
		+ "					return \"rgb(0,0,0)\";\r\n"
		+ "			}\r\n"
		+ "			return defaultColor;\r\n"
		+ "		}\r\n"
		+ "	}");

String filePath = rootFileName + dashboardId + "_stream.pdf";

RevealEngineLocator.dashboardExporter.exportToPdf(dashboardId, null, options ,new ExportStreamCallback() {

	@Override
	public void onSuccess(InputStream stream) {
		//Do something
	}

	@Override
	public void onFailure(Exception e) {
		asyncResponse.resume(e);							
	}
	
});
```

  </TabItem>
  
  <TabItem value="node" label="Node.js">    

```javascript
var options = new PdfExportOptions();
options.initScript = `
function init(revealView){
	$.ig.RevealSdkSettings.theme = new $.ig.MountainDarkTheme();                   

	revealView.refreshTheme();                

	revealView.onVisualizationSeriesColorAssigning = function (visualization, defaultColor, fieldName, categoryName) {
		if (categoryName === "Critical") {
				return "rgb(0,0,0)";
		}
		return defaultColor;
	}
}`;
	
revealServer.exporter.exportPdf("Cybersecurity_Sample_ManyFilters_Values", "c:\\Temp\\Exports\\export_node.pdf", options, new RVUserContext("someone"));
```

  </TabItem>

</Tabs>
- Added the ability to control edit mode
  - `enterEditMode()`
  - `exitEditMode(applyChanges: boolean)`
  - `onEditModeEntered`
  - `onEditModeExited`
  
```javascript
<button onclick="revealView.enterEditMode()">Start editing</button>
<button onclick="revealView.exitEditMode(false)">Stop editing (discard)</button>
<button onclick="revealView.exitEditMode(true)">Stop editing (save)</button>

<div id="revealView" style="height: 920px; width: 100%;"></div>

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js" ></script>
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js" ></script>    
<script src="https://dl.revealbi.io/reveal/libs/1.6.2/infragistics.reveal.js"></script>
<script type="text/javascript">
        
        //set this to your server url
        $.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");   
        var revealView = new $.ig.RevealView("#revealView");
		
        $.ig.RVDashboard.loadDashboard("Sales", (dashboard) => {
            revealView.dashboard = dashboard;
        });
        
</script>
```
- Added a `role` property to `RVSnowflakeDataSoure` to allow for accessing different databases for different connections
- Added support for stored procedures in the MySQL connector
- Added a `maxFilterSize` property to `RevealSdkSettings` for controlling the maximum number of values displayed in a dashboard filter

#### ASP.NET

- Added support for setting global filters for headless exports

```cs
PdfExportOptions options = new PdfExportOptions();
options.DateFilter = new RVDateDashboardFilter(RVDateFilterType.CustomRange,
                                        new RVDateRange(new DateTime(2022,4,1), DateTime.Now)
                                );

options.Filters.Add(new RVDashboardFilter("incident_severity", new List<object> { "Medium", "Critical" }));
options.Filters.Add(new RVDashboardFilter("team", new List<object> { "Digital Security Center"}));

await _exporter.ExportToPdf(dashboardId, path, options);
```

#### ASP.NET & Node

- New client event named `onUrlLinkRequested` added to allow for intercepting and modifying URL links in dashboards at runtime

```javascript
revealView.onUrlLinkRequested = (args) => {
    return args.url + "&webUpdated=true&cellValue=" + args.cell.value();                
};
```
- Added custom query support for the MongoDB connector
- Added support for data blending (joining) on server for the MongoDB connector
- Added support for ARM64 for ASP.NET and Node on MacOS and Linux

#### Java

- Added support for setting global filters for headless exports

```java
PdfExportOptions options = new PdfExportOptions();	

RVDateDashboardFilter dateFilter = new RVDateDashboardFilter(RVDateFilterType.CUSTOM_RANGE,
			new RVDateRange( new GregorianCalendar(2022,4,1), new GregorianCalendar())
                        );
						
options.setDateFilter(dateFilter);
					
options.getFilters().add(new RVDashboardFilter("incident_severity", new ArrayList<Object>(Arrays.asList("Medium", "Critical"))));
```

### Bug Fixes

#### All Platforms

- Support for calculated fields using the following functions on a SQL Server data source with "Process Data on Server" enabled; `fyear`, `and`, `or`, `concatenate`, `replace`, `date`, `time`, `hour`, `minute`, `second`, `formatdate`, and `datevalue`.
- Setting `canAddDateFilter` caused an exception
- Redshift filters don't show values besides the 3k limit when using search on select values
- The text "Show Data Labels" is not translated when viewing field settings in the visualization editor
- Pivot grid when using the SSAS connector mixed up rows when sorting
- KPI vs Time - overlapping text when state changes from having data to having no data to display
- Pointer cursor shows when hovering over "add your first visualization" when there is no click event
- Localization issue on server side when client is using another language
- REST connector crashes when no url is provided in client
- Tooltip showing blank hint in the New Calculated Field window
- Data source items should not copy over the data source subtitle
- Grid visualization takes forever to load when there's a lot of data
- Spanish translation for Snowflake host shows "Anfitrion" and it shouldn't
- When configuring `chartTypes` the `AreaChart` doesn't seem to respond to any changes
- Server-side dashboard export problem due to build number appending to version

#### ASP.NET & Node

- The MongoDB connector wasn't filtering documents without a field set when filtering by empty fields.

## 1.6.1 (October 25th, 2023)

### Breaking Changes

#### All Platforms

- Enabling single visualization mode now automatically sets these properties to `false` on the `RevealView`: `showChangeVisualization`, `canEdit`, `showMenu`, `showStatisticalFunctions`, `showFilters`.
- The `window.revealDisableKeyboardManagement` property is now set to `true` by default. When set to `true` tab focus does not stop on the RevealView.
- Slice Charts (pie, funnel, and donut) have a new look & feel. The old L&F is deprecated but if needed, they can be restored by doing `RevealSdkSettings.enableNewCharts = false`.

### New Features

#### All Platforms

- Headless export of a individual visualization
- The `noopener` attribute added to external dashboard links
- The property `VisualizationMargin` was added to `RevealTheme` for changing the margin between visualizations
- Improvements to the single visualization; 1) Dashboard title, and breadcrumb control using the properties `showBreadcrumb` & `showBreadcrumbDashboardTitle`, 2) the property `showTitle` was added to `RVVisualization`, and 3) the properties `RevealView`: `showChangeVisualization`, `canEdit`, `showMenu`, `showStatisticalFunctions`, `showFilters` are automatically set to `false` when enabling single visualization mode
- SQL-based stored procedure output their query to the log and inform of data type mismatches

#### ASP.NET & Node

- New Data Source: MongoDB

### Bug Fixes

#### All Platforms

- Postgres extremely slow when loading list of tables when having hundreds of schemas. Schemas are now filtered on the server to improve performance
- The `window.revealDisableKeyboardManagement` property is now set to `true` by default. When set to `true` tab focus does not stop on the RevealView.
- Repeated uses of the chart chooser would cause the app to become non-responsive
- Scatter map not correctly showing values that use decimal places
- Can't filter null values
- RevealView not supporting backup fonts specified in font-family
- Tables and views tabs not visible when using a dark theme
- Choropleth chart displays green color on areas with no data when language is not set to English
- Exception when exiting editor after changing calculated field used with the KPI visualization
- Treemap not visible in PowerPoint and PDF export
- Error dialog when using an image or PDF with an `RVWebResourceDataItem`
- Export options popover doesn't close once an option is selected
- `RVODataDataSource`'s `url` property was being copied over to the `RVODataDataSourceItem`
- Assigning color to series offset colors when "Others" category was visible 

#### Java

- Headless export not working on Linux

## 1.6.0 (August 28th, 2023)

### Breaking Changes

#### All Platforms
* Changes in license keys: License key is now required, even for trial mode. The SDK will fail to initialize if the license key is missing or invalid. In addition, the license format has changed and the new format is the only one supported. Request your new license key to your sales rep. Trial license keys are available by registering [here](https://www.revealbi.io/download-sdk).
* `availableChartTypes` property has been removed. It's replacement is the 'chartTypes' property described in the 'New Features' section below.
*  The dependency to 'libgdiplus' has been removed to enhance our cross-platform performance. 
* The SDK no longer depends on Quill.js.

#### ASP.NET
* Most data sources have been removed from the core package. They're now available as separate packages. Data Source packages are **REQUIRED** to be [registered](/web/datasources#installing-data-sources). The information about the supported data sources and the corresponding add-in nuget packages can be found [here](/web/datasources#supported-data-sources).   
* Reveal now requires .net 6.0 or newer.
* Data related objects have been moved into the `Reveal.Sdk.Data` namespace
* Data Source objects (ex: RVSqlServerDataSource) have been moved into their respective namespaces (ex: `Reveal.Sdk.Data.Microsoft.SqlServer`)
 
### New Features

#### All Platforms

* Ability to add custom visualization as Chart Types in the visualization editor. The new `chartTypes' property allows this, as well as modifying the icon, title and grouping of existing chart types, or making them unavailable:

```
//Update existing configuration
var barConfig = revealView.chartTypes.find(x => x.chartType == 'BarChart');
barConfig.icon = 'https://host:port/images/bar-chart.png';
barConfig.groups = ["Enterprise Visualizations", "HR", "Category"];

//Add pre-configured custom visualization
revealView.chartTypes.push({
            title: "Custom Visualization",
            url: "https://host:port/customViz.html",
            icon: "https://host:port/icon.png",
            groups: ["HR"]
        });

//Delete Grid configuration
var gridConfig = revealView.chartTypes.find(x => x.chartType == 'Grid');
revealView.chartTypes.splice(revealView.chartTypes.indexOf(gridConfig), 1);
```

* (Beta) Chart actions available while hovering the mouse. Turn on using `$.ig.RevealSdkSettings.enableActionsOnHoverTooltip = true`.
* Calculated fields expression language now support decimals specified without a leading '0' (e.g. '.5' meaning '0.5').
* Added support in BigQuery data source for the following calculated-fields functions: YEAR, QUARTER, MONTH, DAY, HOUR, MINUTE, SECOND, REPLACE, WEEKDAY, MONTHNAME, MONTHSHORTNAME, EMPTY, RANDBETWEEN.
* Improved Copy & Paste. Now it works across browser tabs / pages refreshes.
* Make the RevealView resize itself when its container is resized.
* Add Stored procedure support to Oracle data source (not yet available in Java).
* Allow joining Athena datasources.

### Bug Fixes

#### All Platforms
* Pushing multiple menu items with menuItem action functions calls the last action function.
* Donut chart doesn't show legend for `<null>` values but shows a section for them.
* Export for Pdf is not taking the assigned Theme.
* Unable to click text "X Selected"/"Show All" on a filter.
* Cell background is not full wide on filters for text "X Selected"/"Show All".
* Using custom theme font doesn't affect the KPI visualization.
* "No providerid specified..." error in Oracle data source defined on javascript client.
* The position of the search bar in the data selection view is not reset, in a certain scenario.
* Search table on data source dialog causes error/crash after scrolling tables.
* DefaultRefreshRate of 0 prevents image/pdf web resource from loading.
* Number formatting is not applied in Sparkline.
* Tooltip for gauge does not display number formatting.
* The "NUMERIC" data type in BigQuery isn't properly supported and causes Error.
* BigQuery is missing Quarter aggregation.
* The "MOD" function in BigQuery does not allow you to use two different types of numeric data (e.g. float64 and int64).
* 'Function does not exist' error in postgres when schema is not set in the datasourceItem.
* Statistical functions are not displayed when viewing data as grid.
* Export xlsx for charts visualization is not correct when changing them in reveal sdk.
* Inconsistent checkbox state in when scrolling a large list of data sets in BigQuery add data source screen.
* BigQuery DataSourceItem doesn't work if the project id is set only on the DS.
* When data is obtained from an excel cell that has a custom format that includes any of the letters 'y', 'm', 'd' or 'h' it is always interpreted as date type.
* Treemap does not respect number formatting.
* Number formatting is not displayed in Financial chart tooltip.
* Number formatting is not displayed in the tooltip of the Radial chart.
* Athena and BigQuery don't show the 100k cell limit warning.
* Math function Log stopped working for Athena.

#### ASP.NET
* Export -both headless and interactive- doesn't work on linux.
* Fix issue when Microsoft.Data.SqlClient >= 5.0.0 is used by a Asp.net project.
* Verify Credentials error on Oracle data source.

#### Node
* Request headers do not work for RVRESTDataSource when using the NodeSDK.

#### Java
* Encoding issues in data read from BigQuery if the system's default charset is not UTF-8.
* Getting null IRVUserContext in IRVDataSourceProvider.changeDataSourceItem in createwidget API.
 
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
