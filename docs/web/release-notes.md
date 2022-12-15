# Release Notes

## 1.3.0 (Nov-2022)

### New Features
- _Export dashboards from the backend:_
```csharp
var pdfStream = await dashboardExporter.ExportToPdf(dashboardId);
```
- _New Data Source: Google Analytics 4._
- _Interactive Dashboard Filtering._ Filter all visualizations using the same data source by clicking on a chart or pivot table data point. Enable with: `revealView.interactiveFilteringEnabled = true`.
- _Methods containing a callback now include an additional signature allowing for promise method handling:_
```javascript
$.ig.RevealUtility.loadDashboard(dashboardId).then(dashboard => {
  revealView.dashboard = dashboard;
});
```
- _Manually loading of default fonts using the `ensureFontsLoadedAsync` method from `$.ig.revealSdkSettings` is no longer required._
- _New function 'DateDiff' for calculated fields._

### Bug Fixes
- Fix error when filtering boolean values in Postgres & Redshift ("operator does not exist")
- Fix localization not working when the locale contains an hyphen
- Fix for `IRVDataSourceProvider.ChangeDataSourceItem` not invoked when creating a new visualization from a REST data source.
- Removed new http header 'XRID' that was accidentally added in v1.2.3 and was causing issues with CORS.

## 1.2.3 (Oct-2022)

### New Features
- New function 'EndOfMonth' for calculated fields.

### Bug Fixes
- Fixed missing error report when changing the data source for a visualization.
- Fix error when filtering all rows while showing totals.

## 1.2.1 (Sep-2022)

### Bug Fixed
- _Updated Npgsql library (Postgres driver) to version 6.0.6._
**NOTE**: if in your application you're using also Npgsql but an older version, you'll need to update to 6.0.6 or later.

## 1.2.0 (Aug-2022)

### New Features
- _Reduced the size of the main Javascript file._
  The main Javascript file was optimized and reduced in size by 30%.

- _Added support for custom menu items._
This snippet shows the creation of a custom "My Menu Item":
```javascript
revealView.onMenuOpening = function(visualization, args) {
	if (args.isInEditMode && visualization == null) { //dashboard edit mode
		args.menuItems.push(new RevealApi.RVMenuItem(
			"My Menu Item",
			new RevealApi.RVImage("/images/save-24.png", "My Save"),
			function() {
				alert('my action');
			}
		));
	}
};
```

- _Added support for custom empty state image for dashboards._
Added the possibility of changing the placeholder images present at new dashboard creation.	
```javascript
revealView.assets.dashboardEmptyState = new RevealApi.RVImageAsset(
    new RevealApi.RVImage("/images/dashboard_empty.png", "Empty Dashboard State Image"), 
    "Add your First Visualization", 
    "Visualize all your data in perfect harmony");	
```

- _Added a way to change the default visualization._
In this snippet we change the Default Visualization to Pivot Grid:
```javascript
revealView.defaultChartType = RevealApi.RVChartType.PivotGrid;	
```

- _Add schema attribute to SQL Server data sources._
The schema property on the data source allows SDK users to restrict the displayed list tables/views/procedures to the provided schema.
```javascript
var msSqlAdventureDS = new RevealApi.RVSqlServerDataSource();
msSqlAdventureDS.host = "server.domain";
msSqlAdventureDS.host = "msSqlAdventureId";
msSqlAdventureDS.database = "AdventureWorks";
msSqlAdventureDS.port = 1433;
msSqlAdventureDS.title = "SQLServer Adventure DS";
msSqlAdventureDS.schema = "HumanResources";
```

- _Added a way to change the category grouping separator used in legends for a chart visualization._
In the following snippet we change the separator from the default separator (slash) to hyphen.
```javascript
revealView.categoryGroupingSeparator = "-";
```

- _Added support for TrustServerCertificate setting for SQL Server data sources._
Two new boolean properties were added to implement this feature to RVSqlServerDataSource:
	- Encrypt
	- TrustServerCertificate

Both are used to set flags with the same exact name in the connection string.		
```javascript
var msSqlAdventureDS = new RevealApi.RVSqlServerDataSource();
msSqlAdventureDS.host = "server.domain";
msSqlAdventureDS.id = "msSqlAdventureId";
msSqlAdventureDS.database = "AdventureWorks";
msSqlAdventureDS.port = 1433;
msSqlAdventureDS.title = "SQLServer Adventure DS";
msSqlAdventureDS.schema = "HumanResources";
msSqlAdventureDS.encrypt = true;
msSqlAdventureDS.trustServerCertificate = true;
```


### Bug Fixes
- Fixed ApplyTimeZone error when joining Data sources in Postgres/Redshift.
- Fixed Dashboard filters not refreshing when dashboard is refreshed.
- Fixed number formatting in link name in tooltips.
- Fixed Fiscal Year not working in Postgres/Redshift.
- Fixed currentTimeZone caching issues.
- Fixed Google Sheets not visible in Google Drive popup.
All eligible datasources (spreadsheets, excel, csv and json) are displayed within the connector correctly.			
- Fixed Time Series not setting min value properly for negative values.
The minimum and maximum values of the y-axis in the time series charts adjust themselves automatically.		
	


## 1.1.7 (Jun-2022)

### New Features
-  _New initial zoom level feature for charts (only for new charts enabled with RevealSdkSettings.EnableNewCharts = true_
 The initial zoom level can be controlled by the end-user in the Settings panel for the visualization.
 
-  _Added a way to assign chart colors programmatically through revealView.onVisualizationSeriesColorAssigning event._
The following code snippet returns red color for High and green for Low, for all Pie charts:
```javascript
revealView.onVisualizationSeriesColorAssigning = function(visualization, defaultColor, fieldName, categoryName) {
    if (visualization.chartType == "PieChart") {
	if (categoryName == "High") {
	    return "#ff0000";
	} else if (categoryName == "Low") {
	    return "#00ff00";
	}
    }
    return defaultColor;
};
```

-  _End user can now control the Others slice for Pie and Doughnut visualizations._
In the Settings panel for the visualization the end-user can select a threshold (all slices under that value will be merged in a single Others slice) or disable the feature completely.


### Bug Fixes
- Fixed how dashboard filters with required single selection work after the initial configuration.
In the past the initial state after creating the filter was showing all elements selected which is not a valid state if required single selection is enabled.
- Fixed formatting used in the breadcrumb (displayed when drill-down is used) for numeric fields, in the past the formatting for the field was ignored.
- Fixed issue with Text visualization displaying NaN when there's no data instead of the "No data" message.
- Fixed link to help page displayed by the installer when the installation is ready.

## 1.1.5 (May-2022)

### New Features

-  _RVDateFilter.range property now returns the date range based on the selected filter type._
RVDateFilter.range was previously returning a valid value only when filter was set to custom range.

### Bug Fixes
- Fixed cascading for dashboard filters not working when the data source for the filter was replaced using IRVDataSourceProvider API.
- Fixed issue with dashboard linking mapping an aggregated date in a chart to a date filter, in some timezones it was mapping to the wrong date range.
- Fixed onVisualizationDataPointClicked not called for Time Series Visualization.

## 1.1.4 (May-2022)

### New Features

-  _Added an option to override, the browser locale when localizing strings in Reveal UI_

```javascript
await RevealApi.RevealSdkSettings.overrideLocale(RevealApi.SupportedLocales.En);
```

### Bug Fixes
- Dashboard linking with filter parameters.
In some cases the filter value from the source dashboard wasn't compared properly against the values in the target dashboard.
- Date filter range selection.
In some cases, date filter's predefined ranges (e.g., "this month") were not properly working with the expected values (e.g., start and end of the target month).

## 1.1.3 (Mar-2022)

### New Features
-  _New data source: Google Search Console!_

-  _Added a new helper class to configure a JSON Data Source Item: RevealApi.RVJsonSchemaConfigBuilder._

-  _Added a new event to cancel data loading for a visualization: onVisualizationDataLoading._

### Bug Fixes 
- Dashboard linking with renamed fields issue.
If you renamed a field and then used it as a filter in a dashboard link, the linked dashboard was not filtering properly.

## 1.1.2 (Jan-2022)

### New Features
-  _The .NET Server SDK was enhanced with several changes:_
	- .NET server logging.
	You can now enable .NET server logging for Reveal SDK. It’s managed with upsetting.json LogLevel like "Reveal.Sdk.*": "Trace”.
	- Playwright-based Export.
	Export to image, PDF and PPT are now based on Playwright instead of Puppeteer. For further details, read about how can to adjust your deployment procedures.
   For further details, please read about [how to adjust your deployment](https://help.revealbi.io/en/web/configuring-server-aspnet.html)
         
### Bug Fixes
- [SDK] LocalizationProvider and DataSourceProvider issue.
Setting up a LocalizationProvider was not working in a few cases in which a DataSourceProvider was also set up.
- [SDK] Export to Excel with null values in column names issue.
When exporting to excel having a null value in a column name, the app was crashing with InvalidCastException.
- [SDK] Export to PDF/PPT with custom logo issue.
Exporting to PDF or PPT formats and including a custom branding logo was not working as expected.
- Dashboard filtering issue.
When using a large data source with dashboard linking and filtering, the app was not showing filtered data as expected.
- Dashboard linking and drilled down data issue.
When dashboard linking passes information from a visualization, previously drilled down to values were not being included.

## 1.1.1 (Dec-2021)

### New Features
-  _Localization support for web._
[$.ig.RevealSdkSettings.localizedStringsProvider](https://help.revealbi.io/api/javascript/latest/classes/revealsdksettings.html#localizedstringsprovider), extension point enables localization of several dashboard elements: Dashboard title, Widget title, Field labels, Dashboard Filter titles.
-  _Formatting support for web._
[$.ig.RevealSdkSettings.fieldFormattingSettingsProvider](https://help.revealbi.io/api/javascript/latest/classes/revealsdksettings.html#fieldformattingsettingsprovider), extension point allows defining custom formatting for any date time or numeric field.
-  _Added option to hide the dashboard header – including the title and the kebab menu._
[ShowHeader](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_ShowHeader) (WPF) & [showHeader](https://help.revealbi.io/api/javascript/latest/classes/revealview.html#showheader) (JS).
-  _Added an option to enable/disable the end user ability to maximize visualizations._
[CanMaximizeVisualizationProperty](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_CanMaximizeVisualizationProperty) (WPF) & [canMaximizeVisualization](https://help.revealbi.io//api/javascript/latest/classes/revealview.html#canmaximizevisualization) (JS)
-  _Made easier to check if fonts are loaded before rendering in the browser_
Now you can you can skip the WebFontLoader library and use [$.ig.RevealSdkSettings.ensureFontsLoadedAsync()](https://help.revealbi.io/api/javascript/latest/classes/revealsdksettings.html#ensurefontsloadedasync) to make sure all fonts have been loaded. Instantiate RevealView once the promise returned by this method completes to make sure the fonts needed are loaded.
- _Added a new option in the editor to enable/disable the end user ability to change the background color for a given visualization in the visualization editor._
[CanChangeVisualizationBackgroundColorProperty](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_CanChangeVisualizationBackgroundColorProperty) (WPF) & [canChangeVisualizationBackgroundColor](https://help.revealbi.io/api/javascript/latest/classes/revealview.html#canchangevisualizationbackgroundcolor) (JS).
-  _New way to change the background color for a visualization programmatically._
[SetVisualizationBackgroundColor](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_SetVisualizationBackgroundColor_Reveal_Sdk_RVVisualization_System_Windows_Media_Color_) (WPF) & [setVisualizationBackgroundColor](https://help.revealbi.io/api/javascript/latest/classes/revealview.html#setvisualizationbackgroundcolor) (JS).

### Bug Fixes
- Fixed export to Excel when there are null date values in the dataset.
- Fixed issue exporting to PDF or PPT with custom branding logo.

## 1.1.0 (Oct-2021)

### New Features
-  _The .NET Server SDK was enhanced with several changes:_
	- _Registering Reveal services is more flexible_
	You now can inject other services in your implementations of Reveal interfaces. You only register the type of your implementations of your Reveal providers interfaces.
	- _RevealSDKContext removed_
	RVUserContext is now first class citizen across reveal providers. You need to register a UserContextProvider, which will be instantiating that class and it would be passed to the methods of other Reveal services like IRVDashboardProvider.
	- _.NET Core 3.1 or newer is now required._
	Reveal dropped support for .NET Core running on top of .NET Framework v4.6.2 or higher and .NET core 2.2 as it is out of support.
	- _Improved setup for default implementations._
	Greatly improved setup for default implementations - Now it's pretty simple to setup Reveal if you have your dashboards in a "Dashboards" folder and your local data files (csv or excel) are located in your "Data" folder on the project root level. Example:
		- services:
			-.AddMvc()
            -.AddReveal();
For further details, please refer to [Reveal .NET SDK Upgrade to v1.1](https://help.revealbi.io/en/developer/release-information/upgrade-to-1.1.html).
- _IRVDataSourceProvider interface changed (Desktop and .NET Server SDK)_
The IRVDataSourceProvider interface now has a single ChangeDataSourceItem and it will be called whenever a dashboard need to use a data source item.
-  _Dashboard links in the visualization editor (JavaScript Client SDK). The JavaScript SDK now supports the creation of dashboard links in the visualization editor._
To try this feature, edit one of the ASP UpMedia sample's visualizations and then go to settings to click the plus sign right from Links.

### Bug Fixes
-  _[SDK] onDateFilterChanged JavaScript event not being triggered._
In the Web Client SDK, the onDateFilterChanged event (RVDashboard property) was not being triggered when changing or removing a filter.
-  _[SDK] availableChartTypes JavaScript accessor not working as expected._
In the Web Client SDK, you were not able to instantiate RevealView and immediately set the available charts for end users to pick from (availableChartTypes).
-  _Search fields in the Data Blending screen._
The Data Blending UI was improved by adding the ability to search for fields to be joined/added in the result.

## 1.0.2013 (Sep-2021)

### Bug Fixes
- Calculated field export to excel resulting in empty cells.
When exporting to excel a calculated field doing division by zero, the result included empty cells.
- Data blending with custom queries and server-side processing issues.
When turning on “Process Data On Server” in Web .NET and performing a custom query, data blending was not working as expected.

## 1.0.2012 (Sep 2021)

### Bug Fixes
- [SDK] Decimal point hidden when Sparkline chart exceeds 100%.
In the Web SDK, the property canSaveAs was not being honored if it was changed after a dashboard is set.
- [SDK] Small window sizes render Text chart unreadable.
In both Web and Desktop, the Text Chart font becomes unreadable when the window’s size is small.
- [SDK] Issues getting the list of date formats.
When getting a list of date formats for a field editor in the Desktop SDK, you can now use _RVBaseFormattingService_ with aggregated dates.

## 1.0.2008 (Aug-2021)

### Bug Fixes 
- Saving dashboard as a stream has issues.
When saving dashboards as a stream, in some specific cases _dashboard.Serialize.Async()_ was returning null.

## 1.0.2005 (Jun-2021)

### New Features
-  _Scatter Maps now support OpenStreetMap!_
You can now configure and use OpenStreet Map image tiles in Desktop (WPF) and Web-client (JS).
-  _New Thumbnail component!_
You can now render a thumbnail of a dashboard with RevealDashboardThumbnailView.
-  _Credentials from Web client to server-side data source._
A new type of credentials _RVHeadersDataSourceCredentials_ allow you to send authentication headers and cookies to REST and Web Resource data sources. For further details, check the following [sample](https://github.com/RevealBi/sdk-samples-aspnetcore/tree/main/Cookies-Auth) in GitHub.
- _SDK AspNetCore services injection_
You can now register the _RevealSdkContext_ and _RevealUserContext_ implementations as a type only (not passing an instance), allowing these classes to get any other AspNetCore services injected through the constructor. For further details check the following [sample](https://github.com/RevealBi/sdk-samples-aspnetcore/tree/main/Reveal.Sdk.Samples.Web.UpMedia.Backend) in GitHub.

### Bug Fixes
- Calculated field filter not working with data process on server.
When enabling server-side aggregation of the data, calculated fields used as filters were not filtering data as expected.
- Google Analytics issues with dashboard filters.
When getting data from Google Analytics data sources, you were unable to create dashboard filters.

## 1.0.1866 (Mar-2021)

### New Features
-  _New Properties for Web and Desktop SDK:_
	- _showEditDataSource_ can be used to disable the Edit button normally available in the data source overflow menu.
	- _canAddDashboardFilter_ this property can hide the "Add Dashboard Filter" option in the Add Filter menu. These options are available in Dashboard Edit Mode.
	- _canAddDateFilter_ this property can hide the "Add Date Filter" option in the Add Filter menu. These options are available in Dashboard Edit Mode.

### Bug Fixes
- [SDK] revealView.canSaveAs property not working as expected.
In the Web SDK, the property canSaveAs was not being honored if it was changed after a dashboard is set.
- [SDK] HttpContextAccessor.HttpContext property not working as expected.
In the Web SDK, HttpContextAccessor.HttpContext was null when saving a dashboard (accessing it from SaveDashboardAsync method).

## 1.0.1821 (Mar-2021)

### Bug Fixes
-  [SDK] SDK apps sometimes throw an NRE exception.
When an SDK application was opened for more than 90 minutes without users interacting with it, performing an action was throwing an exception.

## 1.0.1772 (Feb-2021)

### Bug Fixes
- [SDK] Installation of WPF NuGet package failing with packages.config.
The installation of WPF NuGet package was failing when the host project used packages.config.

## 1.0.1763 (Feb-2021)

### Bug Fixes
- [SDK] HasPendingChanges property not working as expected.
HasPendingChanges property was not set to false after saving a dashboard with changes.
- [SDK] Custom filtering not working.
In Desktop SDK, custom queries were not filtering data as expected.
- [SDK] Hiding SQLServer tables also hides views.
When using RVDataSourceItemsFilter to hide all tables and show only views, the Views tab was also hidden.
- [SDK] AzureSQL Data Provider  throwing an error.
When adding an AzureSQL connection, an error message was displayed.
- [SDK] Date filters not displayed if LocalizationProvider set.
When a LocalizationProvider was set, date filters from/to were not displayed in the visualizations editor.
- Word not localized to Japanese.
The word "Others" was not localized to "その他" in Japanese.

## 1.0.1712 (Jan-2021)

### Bug Fixes
- [SDK] The server component relies on Newtonsoft.Json serializer.
The Reveal server component was relying on the default JSON serialization settings of the MVC application. Now the hosting app can configure JSON serialization settings as needed.
- [SDK] SQL Server filtering not working for NVARCHAR columns.
Filtering for Microsoft SQL Server was not working for NVARCHAR columns when the filtered value contained multibyte characters.

## 1.0.1669 (Dec-2020)

### Bug Fixes
- [SDK] Pivot hierarchies filtering not working with "Processing Data on Server".
If the option "Processing Data on Server" was checked, drill down hierarchies in the Pivot Editor were not filtering data.
- [SDK] Custom filtering not working with "Processing Data on Server.
If the option "Processing Data on Server" was checked, custom queries were not returning the correct number of rows.

## 1.0.1629 (Dec-2020)

### New Features
-  _Save/Load Dashboards using JSON._
You can now use Reveal SDK to save/load dashboards to/from JSON files.

### Bug Fixes
- Category field label not being shown.
In Category Charts, tooltips were not displaying the field label but the original field name of a category instead.
- Dates in drill down breadcrumbs wrongly displayed.
When drilling down on a date field, breadcrumbs did not display values properly. Now breadcrumbs give clear information about your drill down level.
- Hover Tooltips and Crosshairs not shown by default.
Hover Tooltips and Crosshairs were not displayed until users enable them. Now they are enabled by default.

## 1.0.1422 (Sep-2020)

### New Features
-  _NEW Pre-built Themes._
We added four pre-built app themes. Set one of them and use the
customizable settings to additionally personalize the look and feel of the Visualization and Dashboard editor. You can choose from one of the following themes:
	- MountainLightTheme (Desktop) / $.ig.MountainLightTheme (Web)
	- MountainDarkTheme (Desktop) / $.ig.MountainDarkTheme (Web);
	- OceanLightTheme (Desktop) / $.ig.OceanLightTheme (Web);
	- OceanDarkTheme (Desktop) / $.ig.OceanDarkTheme (Web).
- _Marketo provider is Now Available_
You can now connect to the marketing platform Marketo and use your data in Reveal.
- _Amazon Redshift provider is Now Available._
You can now use and gain new insights from your data in the Amazon Redshift cloud data warehouse.
- _New "Data Process on Server" feature._
You can now have server-side aggregation of the data coming from the MS SQL, MySQL and Postgres data sources.

## 1.0.1374 (Jul-2020)

### New Features
-  _New API to set axis bounds for charts._
You can now programmatically change the axis bounds in runtime for a particular visualization.
-  _Salesforce data source enhancements_
Now you can use your Salesforce reports in Reveal.
-  _New QuickBooks data source._
Connect to your Quickbooks account and use your entities to perform data analysis in Reveal.
-  _New Hubspot data source._
You can now connect to Hubspot.
-  _Sharepoint lists and document libraries support._
You can now use the metadata (name, type,etc.) collected for all files in a SharePoint library as a data source in Reveal.
-  _New Choropleth Map Visualization._
The Choropleth map visualization allows you to creat beautiful thematic maps. You can now present geospatial data in an incredibly digestible manner. Let color guide you and help you quickly discover patterns, trends and anomalies on the map.

## 1.0.1255 (May-2020)

### New Features
-  _New Azure Analysis Services data source._
With this new data source, you can create dashboards using your data models in Azure Analysis Services.
- _New icon for Google Sheets files._
The look of the Google Sheets files icon was changed.

## 1.0.1222 (May-2020)

### New Features
-  _New Hover Events API._
This new event is called *revealView.TooltipShowing* in WPF and .onTooltipShowing in Web and is triggered whenever the end-user hovers over a series in a visualization or clicks on the series.
-  _New TreeMap visualization_
You can use this new visualization type to present large hierarchie with a set of nested rectangles. Rectangles’ size will show you part-to-whole relationships amongst a variety of metrics, helping you identify patterns and relations between similar data.
-  _Export to Excel enhancements._
You can include more visualization types in your spreadsheets upon export. Scatter, Bubble and Sparkline charts are now available.
-  _Various UI/UX improvements._
Various minor changes were added to improve user experience in the Visualization, Dashboard, New Data Source dialog, etc.
-  _Added support for Shared Drives in Google Drive._
If you have a GSuite Business account, you can now access your Shared Drives data and use it to build visualizations in Reveal.

## 1.0.1136 (Apr-2020)

### New Features
-  _New Custom Theming._
Now you can create your own theme in Reveal by configuring some or all of the customizable settings in  the new RevealTheme (Desktop) / $.ig.RevealTheme (Web) class.

## 1.0.981 (Feb-2020)

### New Features
-  _New Properties in RevealSettings._
We added multiple new properties to $.ig.RevealSettings to control different features, including: ShowExportToPDF, ShowExportToPowerpoint, ShowExportToExcel, ShowStatisticalFunctions, ShowDataBlending, ShowMachineLearningModelsIntegration, StartWithNewVisualization, InitialThemeName.
-  _Accent Color is Now Available._
You can now find the SetAccentColor method added to $.ig.RevealView.
- _A Trigger Property Added to DataSourceRequested Event._
We added a Trigger (of type DataSourcesRequestedTriggerType) property to the DataSourcesRequested event arguments. The users of this  event will now gain more context about the DataSourcesRequested purposes.

## 1.0.825 (Nov-2019)

### New Features
-  _Export to Image Functionality is Now Working._
Exporting images server-side (both programmatically and through user interaction) was enabled again. For further details about the fix, please refer to:
[Enabling server-side screenshot generation](https://help.revealbi.io/en/developer/web-sdk/setup-configuration.html#4-set-up-server-side-screenshot-generation).

## 1.0.80x (Sep-2019)

### New Features
-  _Localization Service for Reveal Desktop SDK._
You can now localize titles and labels of a variety of dashboard elements. The Localization service also enables you to change the formatting settings of numeric and non-aggregated date fields.
- _Formatting Service for Reveal Desktop SDK._
You can now format numeric data, aggregated and non-aggregated date fields to your own preferences. Ignore the default formatting and format your dashboard data the way you like it.

## 1.0.70x (Sep-2019)

### New Features
-  _Step by Step Guide._
With this detailed guide, you will start with prerequisites and go through every step needed to setup and configure Reveal’s SDK.
-  _Change the Widget’s Data Source._
You can now enable or disable the possibility to change a widget’s data source to end users. When opening the Visualization Data screen in edit mode, Reveal will either show or hide the change data source button in the UI.
-  _Formatting Service for Reveal Desktop SDK._
You can now enable or disable the possibility to change the dashboard’s theme to end users. When entering edit mode for a dashboard, Reveal will either show or hide the button used to display the available themes.
