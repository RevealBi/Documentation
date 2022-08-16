# Release Notes

## 1.2.0 (Aug-2022)
### New Features

- _Added support for custom menu items._
This snippet shows the creation of a custom 'My Menu Item':
```csharp
revealView.MenuOpening += RevealView_MenuOpening;
private void RevealView_MenuOpening(RVVisualization visualization, MenuOpeningEventArgs args)
{
	if (args.IsInEditMode && visualization == null) //dashboard edit mode
	{
		args.MenuItems.Add(new RVMenuItem()
		{
			Icon = new RVImage(new BitmapImage(new Uri("pack://application:,,,/Images/save-24.png"))),
			Title = "My Menu Item",
			Action = () =>
			{
				MyCustomAction();
			}
		});
	}
}
```

- _Added support for custom empty state image for dashboards._
Added the possibility of changing the placeholder images present at new dashboard creation:	
```csharp
revealView.Assets.DashboardEmptyState = new RVImageAsset()
{
  Image = new RVImage(new BitmapImage(new Uri("pack://application:,,,/Images/dashboard_empty.png"))),
  Title = "Add your First Visualization",
  Subtitle = "Visualize all your data in perfect harmony"
};	
```

- _Added a way to change the default visualization._
In this snippet we change the Default Visualization to Pivot Grid:
```csharp
revealView.DefaultChartType = RVChartType.PivotGrid;
```

- _Added support for parameters to RVInMemoryDataSourceItem._
You can now set parameters to in-mem data source items to pass additional information:
```csharp
public Task<RVDataSourceItem> ChangeDataSourceItemAsync(RVDataSourceItem dataSourceItem)
{
    if (dataSourceItem is RVInMemoryDataSourceItem item)
    {
        item.Parameters = new Dictionary<string, object>()
        {
            { "CurrentUser", GetCurrentUserName() }
        };
        return Task.FromResult<RVDataSourceItem>(item);
    }
    return Task.FromResult<RVDataSourceItem>(null);
}
```

- _Add schema attribute to SQL Server data sources._
The schema property on the data source allows SDK users to restrict the displayed list tables/views/procedures to the provided schema:
```csharp
var msSqlAdventureDS = new RVSqlServerDataSource()
{
	Id = "msSqlAdventureId",
	Title = "SQLServer Adventure DS",
	Host = "server.domain",
	Database = "AdventureWorks",
	Schema = "HumanResources",
	Port = 1433
};
datasources.Add(msSqlAdventureDS);
```

- _Added a way to change the category grouping separator used in legends for a chart visualization._
In the following snippet we change the separator from the default value (slash) to hyphen:
```csharp
revealView.CategoryGroupingSeparator = "-";
```

- _Added support for TrustServerCertificate setting for SQL Server data sources._
Two new boolean properties were added to implement this feature to RVSqlServerDataSource:
	- Encrypt
	- TrustServerCertificate.
	
Both are used to set flags with the same exact name in the connection string:
```csharp
var msSqlAdventureDS = new RVSqlServerDataSource()
{
	Id = "msSqlAdventureId",
	Title = "SQLServer Adventure DS",
	Host = "server.domain",
	Database = "AdventureWorks",
	Schema = "HumanResources",
	Port = 1433,
	Encrypt = true,
	TrustServerCertificate = true
};
datasources.Add(msSqlAdventureDS);
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
-  _New initial zoom level feature for charts (only for new charts enabled with RevealSdkSettings.EnableNewCharts = true)._
The initial zoom level can be controlled by the end-user in the Settings panel for the visualization.
-  _Added a way to assign chart colors programmatically through RevealView.VisualizationSeriesColorAssigning event._
The following code snippet returns red color for High and green for Low, for all Pie charts:
```csharp
revealView.VisualizationSeriesColorAssigning += RevealView_VisualizationSeriesColorAssigning;
private Color RevealView_VisualizationSeriesColorAssigning(RVVisualization visualization, Color defaultColor, string fieldName, string categoryName)
{
    if (visualization.ChartType == RVChartType.PieChart)
    {
        if (categoryName == "High")
        {
            return Color.FromRgb(255, 0, 0);
        }
        else if (categoryName == "Low")
        {
            return Color.FromRgb(0, 255, 0);
        }
    }
    return defaultColor;
}
```

-  _End user can now control the Others slice for Pie and Doughnut visualizations._ 
In the Settings panel for the visualization the end-user can select a threshold (all slices under that value will be merged in a single Others slice) or disable the feature completely.

### Bug Fixes
- Fixed how dashboard filters with required single selection work after the initial configuration.
In the past the initial state after creating the filter was showing all elements selected which is not a valid state if required single selection is enabled.
- Fixed formatting used in the breadcrumb (displayed when drill-down is used) for numeric fields, in the past the formatting for the field was ignored.
- Fixed issue with Text visualization displaying NaN when there's no data instead of the "No data" message.
- Fixed link to help page displayed by the installer when the installation is ready.

## 1.1.6 (Jun-2022)

### Bug Fixes
- Fixed crash running WPF SDK in Windows 7.

## 1.1.5 (May-2022)

### New Features
-  _RVDateDashboardFilter.Range property now returns the date range based on the selected filter type._
RVDateDashboardFilter.Range was previously returning a valid value only when filter was set to custom range.

### Bug Fixes
- Fixed cascading for dashboard filters not working when the data source for the filter was replaced using IRVDataSourceProvider API.
- Fixed issue with dashboard linking mapping an aggregated date in a chart to a date filter, in some timezones it was mapping to the wrong date range.
- Fixed onVisualizationDataPointClicked not called for Time Series Visualization.

## 1.1.4 (Mar-2022)

### Bug Fixes
- Internal bug fixes.

## 1.1.3 (Mar-2022)

### New Features
-  _New data source: Google Search Console!._
-  _Added a new event to cancel data loading for a visualization: onVisualizationDataLoading._

### Bug Fixes
- Reveal SDK dependency affected by a high severity vulnerability.
The CefSharp.Wpf dependency of Reveal SDK was updated from version 94.4.50 to 98.1.210 to avoid [potential exploits](https://github.com/advisories/GHSA-vv6j-ww6x-54gx).

## 1.1.1 (Dec-2021)

### New Features
-  _Added option to hide the dashboard header – including the title and the kebab menu._
[ShowHeadet](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_ShowHeader).
-  _Added an option to enable/disable the end user ability to maximize visualizations._
[CanMaximizeVisualizationProperty](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_CanMaximizeVisualizationProperty).
-  _Added a new option in the editor to enable/disable the end user ability to change the background color for a given visualization in the visualization editor._
[CanChangeVisualizationBackgroundColorProperty](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_CanChangeVisualizationBackgroundColorProperty).
-  _New way to change the background color for a visualization programmatically._
[SetVisualizationBackgroundColor](https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_SetVisualizationBackgroundColor_Reveal_Sdk_RVVisualization_System_Windows_Media_Color_).

### Bug Fixes
- Fixed export to Excel when there are null date values in the dataset.<br>
- Fixed issue exporting to PDF or PPT with custom branding logo.

## 1.1.0 (Oct-2021)

### New Features
-  _IRVDataSourceProvider interface changed._
The IRVDataSourceProvider interface now has a single ChangeDataSourceItem and it will be called whenever a dashboard need to use a data source item.
-  _Search fields in the Data Blending screen._
The Data Blending UI was improved by adding the ability to search for fields to be joined/added in the result.

## 1.0.2013 (Sep-2021)

### Bug Fixes
- [SDK] Small window sizes render Text chart unreadable.
In both Web and Desktop, the Text Chart font becomes unreadable when the window’s size is small.
- [SDK] Issues getting the list of date formats.
When getting a list of date formats for a field editor in the Desktop SDK, you can now use _RVBaseFormattingService_ with aggregated dates.

## 1.0.2008 (Aug-2021)

### Bug Fixes
- [SDK] Saving dashboard as a stream has issues.
When saving dashboards as a stream, in some specific cases _dashboard.Serialize.Async()_ was returning null.

## 1.0.2005 (Jun-2021)

### New Features
-  _Scatter Maps now support OpenStreetMap!._
You can now configure and use OpenStreet Map image tiles in Desktop (WPF) and Web-client (JS).
-  _New Thumbnail component!._
You can now render a thumbnail of a dashboard with _RevealDashboardThumbnailView_.

### Bug Fixes
- Calculated field filter not working with data process on server.
 When enabling server-side aggregation of the data, calculated fields used as filters were not filtering data as expected.
 - Google Analytics issues with dashboard filters.
 When getting data from Google Analytics data sources, you were unable to create dashboard filters.
 
## 1.0.1956 (May-2021)
 
### Bug Fixes
- [SDK] Full list of Data Sources displayed by mistake.
When using _DataSourcesRequested_ callback in the Desktop SDK, the whole list of data sources was being displayed instead of the ones explicitly added.
- [SDK] Desktop SDK export to Excel not working as expected.
When reloading a dashboard and then exporting a single visualization to Excel, the first visualization of the dashboard was always the one exported.
- [SDK] Dashboard with SQL data source using a dynamic port not loading.
When loading a dashboard with an SQL data source defined using a dynamic port (providing an instance in the host field), the data source connection was not working because of issues with the dynamic port configuration.
- Calculated field set as Visualization filter were throwing an error.
When configuring a Visualization filter based on a calculated field that depends on another calculated field, an error was being shown ("Invalid column name").
- Drill down scenario with different "sort by" configurations not working as expected.
When the fields in a hierarchy were configured with a combination of "sort by: <any field>" and a descending sorting, the result was the dashboard not loading.
 
## 1.0.1866 (Mar-2021)
 
### New Features
-  _New Properties for Desktop SDK:_
	- _ShowEditDataSource_ can be used to disable the Edit button normally available in the data source overflow menu.
	- _CanAddDashboardFilter_: this property can hide the "Add Dashboard Filter" option in the Add Filter menu. These options are available in Dashboard Edit Mode.
	- _CanAddDateFilter_: this property can hide the "Add Date Filter" option in the Add Filter menu. These options are available in Dashboard Edit Mode.

## 1.0.1821 (Mar-2021)

### Bug Fixes
- [SDK] SDK apps sometimes throw an NRE exception</i><br> When an SDK application was opened for more than 90 minutes without users interacting with it, performing an action was throwing an exception.

## 1.0.1772 (Feb-2021)

### Bug Fixes
- [SDK] Installation of WPF NuGet package failing with packages.config.
The installation of WPF NuGet package was failing when the host project used packages.config.

## 1.0.1763 (Feb-2021)

### Bug Fixes
- [SDK] HasPendingChanges property not working as expected.
In Desktop SDK, the HasPendingChanges property was not set to false after saving a dashboard with changes.
- [SDK] Custom filtering not working.
In Desktop SDK, custom queries were not filtering data as expected.
- [SDK] Hiding SQLServer tables also hides views.
When using RVDataSourceItemsFilter to hide all tables and show only views, the Views tab was also hidden.
- [SDK] AzureSQL Data Provider  throwing an error.
When adding an AzureSQL connection, an error message was displayed.
- Date filters not displayed if LocalizationProvider set.
LocalizationProvider was set, date filters from/to were not displayed in the visualizations editor.
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
In Dashboard View mode, Hover Tooltips and Crosshairs were not displayed until users enable them. Now they are enabled by default.

## 1.0.1422 (Sep-2020)

### New Features
-  _Amazon Athena connector in BETA._
You can now connect to Amazon's serverless, interactive query service Athena.
-  _NEW Pre-built Themes._
We added four pre-built app themes. Set one of them and use the customizable settings to additionally personalize the look and feel of the Visualization and Dashboard editor. You can choose from one of the following themes:
	- MountainLightTheme
    - MountainDarkTheme
    - OceanLightTheme
    - OceanDarkTheme
-  _Marketo provider is Now Available_.
You can now connect to the marketing platform Marketo and use your data in Reveal
-  _Amazon Redshift provider is Now Available._
You can now use and gain new insights from your data in the Amazon Redshift cloud data warehouse.
-  _New "Data Process on Server" feature._
You can now have server-side aggregation of the data coming from the MS SQL, MySQL and Postgres data sources.

## 1.0.1374 (Jul-2020)

### New Features
-  _New API to set axis bounds for charts._
You can now programmatically change the axis bounds in runtime for a particular visualization.
-  _Salesforce data source enhancements._
Now you can use your Salesforce reports in Reveal.
-  _New QuickBooks data source._
Connect to your Quickbooks account and use your entities to perform data analysis in Reveal.
-  _New Hubspot data source._
You can now connect to Hubspot.
-  _Sharepoint lists and document libraries support._
You can now use the metadata (name, type, etc.) collected for all files in a SharePoint library as a data source in Reveal.
-  _New Choropleth Map Visualization_.
The Choropleth map visualization allows you to create beautiful thematic maps. You can now present geospatial data in an incredibly digestible manner. Let color guide you and help you quickly discover patterns, trends and anomalies on the map.

## 1.0.1255 (May-2020)

### New Features
-  _New Azure Analysis Services data source._
With this new data source, you can create dashboards using your data models in Azure Analysis Services.
-  _New icon for Google Sheets files._
The look of the Google Sheets files icon was changed.

## 1.0.1222 (May-2020)

### New Features
-  _New Hover Events API._
This new event is called *revealView.TooltipShowing* is triggered whenever the end-user hovers over a series in a visualization or clicks on the series.
-  _New TreeMap visualization._
You can use this new visualization type to present large hierarchies with a set of nested rectangles. Rectangles’ size will show you part-to-whole relationships amongst a variety of metrics, helping you identify patterns and relations between similar data.
-  _Export to Excel enhancements._
You can include more visualization types in your spreadsheets upon export. Scatter, Bubble and Sparkline charts are now available.
-  _Various UI/UX improvements,._
Various minor changes were added to improve user experience in the Visualization, Dashboard, New Data Source dialog, etc.
-  _Added support for Shared Drives in Google Drive._
If you have a GSuite Business account, you can now access your Shared Drives data and use it to build visualizations in Reveal.

## 1.0.1136 (Apr-2020)

### New Features
-  _New Custom Theming._
Now you can create your own theme in Reveal by configuring some or all of the customizable settings in the new RevealTheme class.

## 1.0.981 (Feb-2020)

### New Features
-  _New Properties in RevealSettings._ 
We added multiple new properties to RevealSettings to control different features, including: ShowExportToPDF, ShowExportToPowerpoint, ShowExportToExcel, ShowStatisticalFunctions, ShowDataBlending, ShowMachineLearningModelsIntegration, StartWithNewVisualization, InitialThemeName.</td>
-  _Accent Color is Now Available._
You can now find the SetAccentColor method added to RevealView.
-  _A Trigger Property Added to DataSourceRequested Event._
We added a Trigger (of type DataSourcesRequestedTriggerType) property to the DataSourcesRequested event arguments. The users of this event will now gain more context about the DataSourcesRequested purposes.

## 1.0.825 (Nov-2019)

### New Features
-  _Export to Image Functionality is Now Working._
Exporting images server-side (both programmatically and through user interaction) was enabled again. For further details about the fix, please refer to: [Enabling server-side screenshot](https://help.revealbi.io/en/developer/setup-configuration/setup-configuration-web.html#server-side-image-export).

## 1.0.80x (Sep-2019)

### New Features
-  _Localization Service for Reveal Desktop SDK._
You can now localize titles and labels of a variety of dashboard elements. The Localization service also enables you to change the formatting settings of numeric and non-aggregated date fields.
-  _Formatting Service for Reveal Desktop SDK_
You can now format numeric data, aggregated and non-aggregated date fields to your own preferences. Ignore the default formatting and format your dashboard data the way you like it.
-  _Changes in Setup and Configuration (Server SDK).
Reveal Server SDK now supports .NET Core 2.2 as well as .NET Framework 4.6.1+ ASP MVC application projects. In addition, you will now use exclusively the NuGet package manager to reference assemblies and install dependency packages.
             
## 1.0.70x (Sep-2019)

### New Features
-  _Step by Step Guide._
With this detailed guide, you will start with prerequisites and go through every step needed to setup and configure Reveal’s SDK.
-  _Change the Widget’s Data Source._
You can now enable or disable the possibility to change a widget’s data source to end users. When opening the Visualization Data screen in edit mode, Reveal will either show or hide the change data source button in the UI.
-  _Formatting Service for Reveal Desktop SDK._
You can now enable or disable the possibility to change the dashboard’s theme to end users. When entering edit mode for a dashboard, Reveal will either show or hide the button used to display the available themes.                
