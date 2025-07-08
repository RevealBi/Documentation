# Release Notes

## 1.7.5 (July 8th, 2025)

### New Features

- Databricks now supports the following authentication types; personal access token, OAuth token pass-through, OAuth client credentials, and Microsoft Entra ID client credentials.
- Added support for multiple dashboard date filters.
- An opt-in week date aggregation added to fields through `FieldsInitializing` by setting the `WeekLevelEnabled` to `true`.

```csharp
revealView.FieldsInitializing += RevealView_FieldsInitializing;
//...

private void RevealView_FieldsInitializing(FieldsInitializingEventArgs args)
{
    var editedFields = args.Fields;
    var fieldToChange = editedFields.FirstOrDefault(f => f.Name == "Date");
    if (fieldToChange != null)
    {
        fieldToChange.WeekLevelEnabled = true;
    }
}
```
- Highlighting filters are now removed when entering edit mode.
- The ANTLR dependency was updated to v4.13.1.
- Redshift connector now supports cross database blending for databases contained in the same AWS cluster.

### Bugs

- Funnel and pie show hover tooltip even if disabled.
- Funnel tooltip is shown in the top left corner of the visualization.
- Description in duplicated Text Box disappears.
- Highlighting lost after drill-down removal, despite filter still applied.
- Highlighting adds an extra day to other charts due to filter settings.
- Highlighting export is not displayed correctly for visualization.
- Highlighting filters are being shown in the visualization editor.
- DateRules with a "Next" period relation did not display the correct number of days when the amount was greater than one.
- Bar and column visualizations don't make appropriate use of the plot area on first load.
- Duplicate menu item shown if AllTime is added as a custom item in a date filter's menu.
- Scatter map visualization shifted the centering of the map.
- Duplicate dialogs during Excel export with multiple grid visualizations.
- Choropleth handles states wrong when using the "USA States" map.
- Unhandled null reference exception after applying Tooltip filter in a pivot visualization.
- Switching visualization type on a grid visualization results in the visualization disappearing and producing an error in the console.
- Dashboard link parameters broken for category field.
- Null reference error opening dashboard with CustomRange filter with range not set.
- Drill down is available even when there is a single date field with no hierarchy defined.
- Date format lost on drill up/down.
- Tooltip field items not using field labels.
- New pie is not being exporting correctly to PDF.
- Grid paging loads data twice.
- Long graph legends are not correctly shown.
- Wrong data shown when expanding a pivot using '... to Date' filter.
- Date Range filter "Trailing 12 months" is including current month data.
- Expansion not working when another pivot row is present.
- Ad-hoc pivot expansion misbehaves when items are duplicated.
- Drill down on empty element causes crash.
- Drill down on a expanded pivot row doesn't work well.
- UI not refreshing when Range is set for date global filter when using API.
- Refresh needed to update the visualization after changing date filter.
- Excel datasource detecting date column as numeric.
- Export of raw data image results in crash.
- UI doesn't update when using API to modify date global filter that has just been created.

## 1.7.4 (May 6th, 2025)

### New Features

- New data source: Databricks.
- The field editor has been improved and contains tabs for different option categories.
- Added a beta features API.

```csharp
// Enable beta feature
RevealSdkSettings.BetaFeatures.Enable("newDonutChart", "newPieChart");

// Disable beta feature
RevealSdkSettings.BetaFeatures.Disable("newDonutChart", "newPieChart");
```

- The chart toolbar is now generally available. It can be enabled or disabled through the `ShowToolbar` property on the RevealView. The default value of this property `false`.
- Interactive filtering is now generally available. To enable this feature set `InteractiveFilteringEnabled` to `true` on the RevealView. By clicking "Filter By" in the tooltip, this feature will highlight the data in the rest of the charts.
- A new property was added in the visualization editor for slice charts to configure fraction digits of the shown percentages.
- In data sources that contain a `Database` property, data source items derived from it no longer have the `Database` property set by default. While this makes setting the RVDataSourceItem's `Database` property not a requirement, it is strongly recommended to do so even to set it to null, for security reasons.
- Support for an optional `sessionToken` parameter was added to the RVAmazonWebServicesCredentials.

### Bugs

- Using single visualization mode showed misaligned UI elements.
- Visualization filters are not working when changed in the editor.
- Excel export fails when dashboard has visualization with error.
- Wrong date range calculated in dashboard linking for year and quarter hierarchy.
- Wrong data when expanding or drilling down and a filter on a date field with fiscal year is applied.
- KPI vs Time % increase incorrect sign when previous number is negative.
- SSAS performance degraded for some visualizations.
- `NotEquals` and `NotContains` filters do not work in SSAS.
- PowerPoint Exports Showing Token and Luis' Name.
- Highlighting not working for Dates using Google Analytics and similar data sources.
- Show totals on tooltip flag ignored.
- Google Analytics datasource selection crashes if required props are not set.
- Visualization description is overlapped by the title.
- Excel exports with cells with a numeric value of 0 show as empty.

## 1.7.3 (Mar 4th, 2025)

### New Features

- Axis titles are now generally available and can be customized through a dedicated text box by clicking on the visualization field in the editor.
- Fixed lines are now generally available.
- Chart visualizations containing a numeric axis have been enhanced to reduce any potential label repetition.
- A chart's legend can now be positioned at the top or bottom of the visualization, and the alignment can be customized to left, right, or center. These options exist in the Settings tab in the visualization editor.
- Grid paging now supports sorting through the sort icon found on the column header.
- Column visualizations will now favor their labels to appear above the column, and bar visualizations will favor their labels to appear to the right of the bar.
- Further enhancements were made to the hiding and showing of labels on visualizations.

### Bugs

- Blank space above chart in single visualization mode when hiding header, title, and filters.
- Using `RVIntegratedAuthenticationCredential` results in an error.
- Visualization filters are hidden after maximizing when `ShowHeaders` is set to `false`.
- Analysis Services returns wrong values with some locales/cultures.
- Crash when selecting "Select values" for a dashboard filter.
- Conditional formatting with percentage and columns is not working.
- Incorrect data source ID in `ChangeVisualizationDataSourceItemAsync`.
- Date format of the dashboard/visualization filters are not correct in Japanese.
- Dashboard filters appear on all visualizations when maximized, even if they are not connected.
- Filters disappears after maximizing visualization.
- Crash when creating or loading a combo visualization.
- Dashboard linking from grid to dashboard date filter not working.
- Exceptions in interactive export are not being notified to the user.
- Data truncation indicator alignment is wrong.
- Export to Excel fails for Analysis Services with dashboard filter.

## 1.7.2 (Jan 20th, 2025)

### New Features

- (Beta) Added support for custom menu items in toolbar using `MenuOpening`.
- (Beta) Compare filtered data within the same visualization. Interactive filtering was enhanced to support XMLA data sources. Now, the showing "Filter By" option appears when there are multiple visualizations. Additionally, the choropleth map will highlight the selected country. When a filter is added, it is now read-only to prevent changes. Filtering is also now allowed by date, with the restriction that only one date value can be selected.
- (Beta) Axis titles can now be controlled in the visualization editor settings pane, with the following options; none, x-axis, y-axis, or both. To enable this functionality set `RevealSdkSettings.EnableBetaFeatures` to `true`.
- The PostgreSQL data provider now supports materialized views.
- The BigQuery data provider now supports data blending.
- The donut chart visualization now support different center label modes; none, label only, value only, or both label and value.
- The Microsoft.Data.SqlClient dependency was updated to v5.1.3.
- The Snowflake data source dependency Snowflake.Data was updated to v4.0.0.
- The date filter presets dropdown now supports editing the available date filters and including your own filters through the `DateFilterMenuOpening` event. Support was also added for semester-based date rules.

```csharp
revealView.DateFilterMenuOpening += RevealView_DateFilterMenuOpening;
//revealView.ShowDateFilterDropdown = false; //Hides the button that shows the dropdown altogether

private void RevealView_DateFilterMenuOpening(object sender, DateFilterMenuOpeningEventArgs args)
{
    //if(![my_access_check_code]) {
    //    args.Cancel = true; //Cancel opening of filter items list
    //    return;
    //}

    var list = args.Items; //List of RVDateFilterMenuItem objects
    int pos;

    //Add "Last 2 months" to the "months" section
    pos = list.GetItemIndex("Month to date"); //Obtain the beginning of the "years" section
    var lastTwoMonthsRule = new RVDateRule(RVPeriodRelation.Last, 2, RVPeriodType.Month);
    list.Insert(pos + 1, lastTwoMonthsRule); //Insert using helper

    //Add "Last 2 weeks" to a new section after the "days" section
    pos = list.GetItemIndex("Last 7 days");
    list.InsertSeparator(pos + 3);
    var lastTwoWeeksOpt = new RVDateFilterMenuOption(new RVDateRule(RVPeriodRelation.Last, 2, RVPeriodType.Week));  //Instantiate RVDateFilterMenuOption directly
    list.Insert(pos + 4, lastTwoWeeksOpt);

    //Remove "Today" option
    var todayItem = list.GetByTitle("Today"); //This should take localization into account
    list.Remove(todayItem);

    //Add "First week of 2024" to a new section at the end of the menu            
    list.AddSeparator();
    var firstWeekOf2024Range = new RVDateRange(new DateTime(2024, 1, 1), new DateTime(2024, 1, 7)); //Customized description
    list.Add(firstWeekOf2024Range, "First week of 2024");
}

//The new rules also integrate with the existing filters API
revealView.Dashboard.DateFilter = new RVDateDashboardFilter(new RVDateRule(RVPeriodRelation.Last, 3, RVPeriodType.Day));
```

- Migrated to using Microsoft's SQLite implementation with encryption. You can set your own password with `RevealSdKSetting.Caching.EnableEncryption("yourpassword")`. By default, a password is autogenerated for you and is stored using secure storage.
- Dashboard filters now try to automatically connect to the visualization, in cases where not possible, the manual connection can be used as before.
- The `RevealView` now has a `ShowTitle` property that toggles the visibility of the dashboard title independently of the dashboard header. The default value is `true`.
- The property `ShowSave` has been added to the `RevealView`. This property determines whether or not the save button is shown. The default value is `true`.
- Axis grid lines can now be controlled in the visualization editor settings pane, with the following options; none, horizontal, vertical, or both.
- The `RevealView` now has a `ShowVisualizationFilters` property that toggles the visibility of the visualization filters when maximized. The default value is `true`.

### Bugs

- Snowflake authorization error when verifying credentials.
- `VisualizationDataPointClicked` not invoked on slice-based (pie, donut, and funnel) and scatter map visualizations.
- Data may be wrong when using `TODAY`/`NOW` calculated field functions.
- Error setting maximum axis value.
- Error in highlighting a widget from an XMLA data source when other widgets are from different XMLA data sources.
- Filters from XMLA data sources allow auto-connection to widgets using other data sources, which then breaks the visualization.
- XMLA global filters are not working at all.
- Google Analytics 4 error loading filters and global filter values.
- The last fixed chart line field can't be removed.
- SSAS 'FillTotalsInRow' error for a visualization with grand totals.
- SSAS no data displayed while using some of the chart types.
- Labels sometimes don't hide when there's not enough space.
- Exception occurs after switching to another chart type after viewing raw data.

## 1.7.1 (Nov 5th, 2024)

### New Features

- Chart visualizations will automatically hide 0 value data labels.
- Custom menu items can now be added to visualization tooltips.

```csharp
//Point to this handler: revealView.TooltipShowing += RevealView_TooltipShowing;
private void RevealView_TooltipShowing(object sender, TooltipShowingEventArgs e)
{
    Action<RVTooltipItem, TooltipItemClickEventArgs> clickHandler = (tooltipItem, args) =>
    {
        Console.WriteLine($"Critical action clicked by sender: {tooltipItem}, with event args: {args}");
    };

    if (e.Cell.FormattedValue == "Digital Security Center")
    {
        e.CustomItems.Add(new RVTooltipItem("Critical", "Escalate Incident", null, clickHandler));
        e.CustomItems.Add(new RVTooltipItem("Critical", "Open Incident Report", null, clickHandler));

        e.CustomItems.Add(new RVTooltipItem("High", "Send Reminder", null, clickHandler));
        e.CustomItems.Add(new RVTooltipItem("High", "Assign Lead Investigator", null, clickHandler));
    }
}
```

- The dependency Npgsql v6.0.9 was updated to v7.0.7.
- The dependency Microsoft.Data.SqlClient v5.1.2 was updated to v5.1.3.
- For the Sybase connector, the dependency System.Data.SqlClient v4.7.0 was updated to v4.8.6.
- Positioning improvements made for tooltips showing actions on hover.
- Grid paging is now enabled by default for supported data sources when a new visualization is created or an existing visualization is edited and switched to grid.
- Performance improvements for request execution and credential resolution under high load.
- Simplified the MongoDb match stage to improve the performance of query execution.

### Bugs

- Treemap tooltip showing incorrect information.
- Custom visualization bridge name incorrect.
- InMemory data source opens editor directly when there is more than one data source available.
- Date range calendar is not responsive.
- Assigning a calculated field as a data filter doesn't work correctly for Postgres.
- Unable to do 'sort by' with calculated fields.
- Error sorting by a calculated field on sql based providers with "Process Data on Server" setting.
- `trunc` function is not working fine inside concatenate.
- Large number formatting wasn't being applied when configured to a field using the Grid visualization.
- Wrong date formatting shown in UI when setting selected value for date visualization filter.
- Date values reporting incorrectly on click/hover events.
- Combo visualization doesn't calculate lowest axis minimum per axis.
- Stacked Bar visualization displays duplicate y-axis markers when the decimal is set to 0.
- Analysis Services dimension structure is not updated from server with Refresh.
- When using Serilog as logger, message parameters are not properly replaced.
- Interactive filtering is not working for Label Gauge.
- Switching to raw data and then to another visualization causes crash.
- Scrolling a paged row grid into view produces a crash.
- Text visualization shows "There is no data to display".
- Large numbers in Donut Chart are overflowing rather than shrinking.
- The `ShowFilters` property on the RevealView, when set to `false`, does not function as intended.
- Dragging field from hierarchy to Category crashes application.

## 1.7.0 (Sept 10th, 2024)

### New Features

- Fixed lines can now be added to category charts. This beta functionality can be accessed by enabling the `EnabledBetaFeatures` property on `RevealSdkSettings`. The fixed lines section in the editor can use data fields, or one of the highest, lower, average, or fixed value aggregate specialty fields.
- Added support for dates in visualization filter API. For example, when you have a date-based visualization filter, such as "Last 7 days", you can use the following code to check the date range that the filter evaluated to by checking the `From` and `To` properties of the returning `RVDateRange` object.

```cs
var dateRange = revealView.Dashboard.Visualizations[0].Filters[0].DateRange;
```

- Server side grid paging is now available without requiring the `EnableBetaFeatures` flag in `RevealSdkSettings`. Paging is supported in the following providers: SQL Server, MySQL, BigQuery, PostgreSQL, SyBase, Athena, and Oracle. The providers that support stored procedures will have grid paging disabled when a stored procedure is selected as these can't be queried like tables to return a range of rows. Additionally, paging is not available when processing data on server is false, as well as when using blended data.
- Added visualization-level descriptions. When editing a visualization, you can now enter a description if desired.
- Visualizations now automatically support dashboard linking. The default functionality can still be overridden using the instructions from the [Linking Dashboards](https://help.revealbi.io/web/linking-dashboards/) topic.
- Visualizations can now individually be exported to PDF through their overflow menu when maximized.
- The filter summary page can now be hidden in exports by setting the `IncludeFiltersSummaryPage` property on the `ExportOptions` object. 
- The background overlay when clicking overflow menus or filter search boxes is now lighter.
- Added the ability to define hidden fields in Grid visualization, which can be used to define a URL or dashboard link.
- (Beta) Compare filtered data within the same visualization. The series tooltip includes an option to filter by the selected value. The rest of the visualization will display both the filtered values and the original ones for easy comparison. In this release support was added for funnel, treemap, and gauges. This functionality is currently supported in the following chart types: Column, Bar, Line, Time Series, Area, Step Area, Spline, Stacked Column, Stacked Area, Stacked Bar, Funnel, Treemap, and Gauges. To enable this functionality, set `HighlightedFilteringEnabled` to `true` on the RevealView.
- Windows Integrated Authentication is now supported in the Sql Server Analysis Services data source. To enable it, return a new instance of `RVIntegratedAuthenticationCredential` in your 'IRVAuthenticationProvider' implementation.
- Sql Server Analysis Services data sources now support the `EffectiveUserName` property, which makes it possible to impersonate the given user. The property can be leveraged to achieve single sign on, e.g. by setting the property in the `IRVDataSourceProvider` implementation with the value of the current user, as set in the userContext.

### Bugs

- Cached files were not removing .tmp file after adding an entry to the Reveal cache.
- Configured sorting in the value or label field not reflected in Pie visualization.
- Editing a dashboard that includes only a TextBox may lead to a crash.
- The date filters for "Today" and "Yesterday" show incorrect values in different time zones.
- Wrong background color on clickable elements when the mouse is down.
- Excel export generates wrong chart when there are null values for date fields.
- Stacked column chart colors disappear when using a category.
- Choropleth charts show some states green.
- Changing labels using `FieldsInitializing` is not reflected in the field selection of the dashboard filter.
- Field formatting loss when changing visualization types and exporting to Excel.
- Dashboard linking doesn't work for null or empty string values.
- Snowflake metadata browser showing tables from all schemas.

## 1.6.7 (June 26th, 2024)

### New Features

- Added API to programmatically access visualization filters (aka Quick Filters) and modify their selected values.

```cs
//Add a selected value, specified by index from the list of available values, to a field given its name.
async Task AddSelValueToFilter(string fieldName, int valueIdx)
{
	var flt = RevealView.Dashboard.Visualizations[0].Filters.GetByFieldName(fieldName);
	var filterSelValues = flt.SelectedValues.ToList();
	var filterValues = (await flt.GetFilterValuesAsync()).ToList(); //Retrieve the selectable values for the filter
	filterSelValues.Add(filterValues[valueIdx]); //Add the specified value to the selection
	flt.SelectedValues = filterSelValues;
}
```
- (Beta) Compare filtered data within the same visualization. The series tooltip includes an option to filter by the selected value. The rest of the visualization will display both the filtered values and the original ones for easy comparison. Currently supported in the following chart types: Column, Bar, Line, Time Series, Area, Step Area, Spline, Stacked Column, Stacked Area, Stacked Bar. To enable this functionality, set `HighlightedFilteringEnabled` to `true` on the RevealView.
- (Beta) Visualization toolbar was added to quickly access trend-lines, labels, zooming, etc. To enable this functionality, set `EnableNewToolbar` to `true` on RevealSdkSettings.
- Removed the ability to provide a custom query client-side on SQL-based data sources.
- Removed RVGoogleAnalyticsDataSource and RVGoogleAnalyticsDataSourceItem as Google will sunset the API for that connector on July 1st, 2024.
- Added `DashboardChanged` event to RevealView.

```cs
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();

        revealView.DashboardChanged += RevealView_DashboardChanged;
    }

    private void RevealView_DashboardChanged(object sender, DashboardChangedEventArgs e)
    {
        // Access the old and new dashboard
        var oldDashboard = e.OldValue;
        var newDashboard = e.NewValue;

        // Implement your logic here
        Console.WriteLine($"Dashboard has changed from {oldDashboard.Title} to {newDashboard.Title}");
    }
}
```
- Tables in the data source dialog are now sorted alphabetically. This change applies to connectors for: SQL Server, MySql, Postgres, Redshift, Oracle, and Snowflake.
- RVGoogleAnalytics4DataSource now includes `AccountId` & `PropertyId` properties, and deprecating the corresponding properties in RVGoogleAnalytics4DataSourceItem.

### Bug Fixes

- Excel export crash when exporting a XMLA-based visualization that has no field set in the Label section.
- Incorrect DataSource ID in ChangeDataSourceItemAsync.
- Exception caused when a Sparkline visualization was loaded with the dashboard.
- Exception caused by invalid cast in the Grid visualization.
- Stored procedures are shown as a valid additional data source in the blending UI.
- Error reading DateTime.MaxValue from database.
- Exporting an Excel file with a widget with no title crashes.
- Excel export containing expanded rows in the Pivot visualization mixes up columns.
- Null row header when exporting Line chart visualization.
- Reserved characters aren't filtered correctly when exporting to Excel.
- Date formatting is not applied on Excel export.
- Filter editor fields list affects the expression editor fields list.
- SharePoint O365 datasource doesn't work.
- Calculated expression `datediff` works with double quotes not single quotes.
- Wrong BigQuery date precision handling.
- Selected values are not shown for visualization filter based on numeric field.
- Filtered field list is incorrect after adding a calculated field.

## 1.6.6 (April 19th, 2024)

### New Features

- Added an optional description text box, controlled by the property `ShowDescription`, to the RevealView.
- Exporting a grid or pivot to PDF will now generate "overflow" tables containing the columns that would otherwise not fit the width of the page.
- Grid column width is now respected on PDF export.
- Improved pivot grid visualization appearance in exports to Excel.
- (Beta) Added server side paging support to the grid visualization. To enable this functionality and have it appear in the visualization editor Settings pane, set `RevealSdkSettings.EnableBetaFeatures` to `true`. Paging is supported in the following providers: SQL Server, MySQL, BigQuery, PostgreSQL, SyBase, Athena, and Oracle. The providers that support stored procedures will have grid paging disabled when a stored procedure is selected as these can't be queried like tables to return a range of rows. Additionally, paging is not available when processing data on server is false, as well as when using blended data.
- A flag was added to the RevealView to control whether or not data tooltip previews in the visualization editor. They are turned off by default to prevent a query getting the first 5 rows. To enable this tooltip, set `IsPreviewDataInVisualizationEditorEnabled` to `true`.
- Blending is now supported in MySql when using process data on server.
- Radial charts have a new look & feel. The old L&F are deprecated but if needed, they can be restored by setting `RevealSdkSettings.EnableNewCharts = false`.
- Bar and column charts now include an overlap and gap setting in the visualization editor Settings pane. This allows you to control the amount of overlap between the bars and the amount of space between the groups.
- The Treemap visualization now shows a tooltip on hover and highlights the node. 

### Bug Fixes

- Pie & Doughnut charts are not displayed when exporting from UI.
- Deleting a data blend while a calculated field depends on it won't delete the calculated field.
- Calling a function in Redshift produces an error.
- Postgres functions not working.
- Setting `CanAddDateFilter` causes exception.
- Stored procedures parameter screen will sometimes pull previous data or nothing at all.
- Scroll stops working on pop-up element when using search bar.
- Fraction digits are not shown in Choropleth Map tooltip.
- Filter value above 3000+ is not preserved.
- Errors with renamed pivot fields in post-calculated field UI.
- Transposed fields from stored procedure not working.
- Pie chart legend disappears when there is enough space to show it.
- MySql blending with Process Data on Server off produces error.
- Hover event not behaving as intended on slice charts.
- Grand Totals are not shown in the Pivot Grid visualizations.
- Incorrect grand totals values shown when using Analysis Services data provider.
- Dashboard and visualization filters with wrong grand totals when using Analysis Services data provider.
- Field name modifications lost after reordering values on Pivot Grid.
- Error "...hierarchy already appears in the Axis1 axis." in Analysis Services.
- Wrong results when applying 'Top N' filter in Analysis Services.
- Resource based visualization fetches wrong cache entry.
- Wrong cache entry is hit when using blending.

## 1.6.4 (February 14th, 2024)

### Breaking Changes

- Property name `ShowExportToPowerpoint` changed to `ShowExportToPowerPoint`
- Scatter and Bubble Charts have a new look & feel. The old look & feel are deprecated, if needed they can be restored by doing `RevealSdkSettings.EnableNewCharts = false`

### New Features

- Updated the `Reveal.Sdk.Data` v4.7.2 dependency of `Antlr4.Runtime.Standard` to 4.8
- Exposed `Description` property on `RVDashboard`
- Added dashboard title to individual Excel sheets
- Include dashboard filters when exporting to Excel and PDF
- Removed PostgreSQL stored procedures from tab as they're not currently supported

### Bug Fixes

- Athena error message not helpful when missing data source item setting
- S3 DS "Region has not been set" error when source item provider is not implemented
- Redshift DS "Host can't be null" error when source item provider is not implemented
- MySql "unable to connect" error when source item provider is not implemented
- Postgres error selecting table when data source item provider is not implemented
- Wrong case-insensitive grid sorting in some scenarios
- Wrong initialization of "Process Data On Server" flag
- Incorrect `CURRENTTIMEZONE()` when adding fields from another data source
- KPI vs Time Now Showing Empty Values in Current Month
- Malfunction of date type column sorting in grid or pivot type visualizations
- Multiple popups displayed when exporting while visualizations are being loaded
- Map location name comparison is case sensitive

## 1.6.2 (January 5th, 2024)

### New Features

- Updated the `Reveal.Data.Microsoft.SqlServer` v1.1.4 dependency of `Microsoft.Data.SqlClient` to v5.1.2
- The sqlite storage for cache file `tabulardata.sqlite` is now disabled by default to prevent growing without limit
- When `RevealSdkSettings.EnableActionsOnHoverTooltip` is enabled, the actions tooltip is now available on the Pivot visualization. Hovering on a chart visualization will now show the tooltip when within a certain number of pixels from the data point.
- Support for calculated fields using the following functions on a SQL Server data source with "Process Data on Server" enabled; `fyear`, `and`, `or`, `concatenate`, `replace`, `date`, `time`, `hour`, `minute`, `second`, `formatdate`, and `datevalue`.
- New client event named `UrlLinkRequested` added to allow for intercepting and modifying URL links in dashboards at runtime

```cs
revealView.UrlLinkRequested = (args) => {
   return args.Url + "$changed=true";
};
```

- Added the ability to control edit mode
  - `EnterEditMode()`
  - `ExitEditMode(applyChanges: boolean)`
  - `EditModeEntered`
  - `EditModeExited`
  
```cs
public MainWindow()
{
	InitializeComponent();

	var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards/Sales.rdash");
	revealView.Dashboard = new RVDashboard(filePath);
	revealView.EditModeExited += RevealView_EditModeExited;
	revealView.SaveDashboard += RevealView_SaveDashboard;
}

private void RevealView_SaveDashboard(object sender, DashboardSaveEventArgs e)
{
	e.SaveFinished();
}

private void RevealView_EditModeExited(object sender, EditModeExitedArgs e){}

private void ExitEditMode_Click(object sender, RoutedEventArgs e)
{
	var save = saveChanges.IsChecked.HasValue ? saveChanges.IsChecked.Value : false;
	revealView.ExitEditMode(save);
}
```
- Added a `Role` property to `RVSnowflakeDataSoure` to allow for accessing different databases for different connections
- Added support for stored procedures in the MySQL connector
- Added a `MaxFilterSize` property to `RevealSdkSettings` for controlling the maximum number of values displayed in a dashboard filter

### Bug Fixes

- Redshift filters don't show values besides the 3k limit when using search on select values
- Pivot grid when using the SSAS connector mixed up rows when sorting
- KPI vs Time - overlapping text when state changes from having data to having no data to display
- Pointer cursor shows when hovering over "add your first visualization" when there is no click event
- Tooltip showing blank hint in the New Calculated Field window
- Data source items should not copy over the data source subtitle
- Grid visualization takes forever to load when there's a lot of data
- Spanish translation for Snowflake host shows "Anfitrion" and it shouldn't
- When configuring `ChartTypes` the `AreaChart` doesn't seem to respond to any changes

## 1.6.1 (October 25th, 2023)

### Breaking Changes

- Enabling single visualization mode now automatically sets these properties to `false` on the `RevealView`: `ShowChangeVisualization`, `CanEdit`, `ShowMenu`, `ShowStatisticalFunctions`, `ShowFilters`.
- Slice Charts (pie, funnel, and donut) have a new look & feel. The old L&F are deprecated but if needed, they can be restored by doing `RevealSdkSettings.EnableNewCharts = false`.

### New Features

- The property `VisualizationMargin` was added to `RevealTheme` for changing the margin between visualizations
- Improvements to the single visualization; 1) Dashboard title, and breadcrumb control using the properties `ShowBreadcrumb` & `ShowBreadcrumbDashboardTitle`, 2) the property `ShowTitle` was added to `RVVisualization`, and 3) the properties `RevealView`: `ShowChangeVisualization`, `CanEdit`, `ShowMenu`, `ShowStatisticalFunctions`, `ShowFilters` are automatically set to `false` when enabling single visualization mode
- SQL-based stored procedure output their query to the log and inform of data type mismatches

### Bug Fixes

- Postgres extremely slow when loading list of tables when having hundreds of schemas. Schemas are now filtered on the server to improve performance
- Repeated uses of the chart chooser would cause the app to become non-responsive
- Can't filter null values
- Tables and views tabs not visible when using a dark theme
- Choropleth chart displays green color on areas with no data when language is not set to English
- Exception when exiting editor after changing calculated field used with the KPI visualization
- Treemap not visible in PowerPoint and PDF export
- Error dialog when using an image or PDF with an `RVWebResourceDataItem`
- Export options popover doesn't close once an option is selected
- `RVODataDataSource`'s `Url` property was being copied over to the `RVODataDataSourceItem`
- Assigning color to series offset colors when "Others" category was visible
- Sybase column of type Money is taken as String 

## 1.6.0 (August 28th, 2023)

### Breaking Changes

* Changes in license keys: License key is now required, even for trial mode. The SDK will fail to initialize if the license key is missing or invalid. In addition, the license format has changed and the new format is the only one supported. Request your new license key to your sales rep. Trial license keys are available by registering [here](https://www.revealbi.io/download-sdk).
* `AvailableChartTypes` property has been removed. It's replacement is the 'ChartTypes' property described in the 'New Features' section below.
* Most data sources have been removed from the core package. They're now available as separate packages. Data Source packages are **REQUIRED** to be [registered](/wpf/datasources#installing-data-sources). The information about the supported data sources and the corresponding add-in nuget packages can be found [here](/wpf/datasources#supported-data-sources).
* Data related objects have been moved into the `Reveal.Sdk.Data` namespace
* Data Source objects (ex: RVSqlServerDataSource) have been moved into their respective namespaces (ex: `Reveal.Sdk.Data.Microsoft.SqlServer`) 
 
### New Features

* Ability to add custom visualization as Chart Types in the visualization editor. The new `ChartTypes' property allows this, as well as modifying the icon, title and grouping of existing chart types, or making them unavailable:

```
//Update existing configuration
var barConfig = revealView.ChartTypes.First(x => x.ChartType == RVChartType.BarChart);
barConfig.Icon = @"C:\images\bar-chart.png";
barConfig.Groups = new string[] {"Enterprise Visualizations", "HR",  "Category" });

//Add pre-configured custom visualization		
revealView.ChartTypes.Add(new RVChartTypeCustomItem("Custom Visualization", "https://host:port/customViz.html", @"C:\images\icon.png", new string[] { "HR" }));

//Delete Grid configuration
revealView.ChartTypes.Remove(revealView.ChartTypes.FirstOrDefault(x => x.ChartType == RVChartType.Grid));
```

* Calculated fields expression language now support decimals specified without a leading '0' (e.g. '.5' meaning '0.5').
* Added support in BigQuery data source for the following calculated-fields functions: YEAR, QUARTER, MONTH, DAY, HOUR, MINUTE, SECOND, REPLACE, WEEKDAY, MONTHNAME, MONTHSHORTNAME, EMPTY, RANDBETWEEN.
* Add Stored procedure support to Oracle data source.
* Allow joining Athena datasources.

### Bug Fixes

* Donut chart doesn't show legend for `<null>` values but shows a section for them.
* Unable to click text "X Selected"/"Show All" on a filter.
* Cell background is not full wide on filters for text "X Selected"/"Show All".
* The position of the search bar in the data selection view is not reset, in a certain scenario.
* Search table on data source dialog causes error/crash after scrolling tables.
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

## 1.5.0 (May 4th, 2023)

### Breaking Changes
* We're no longer releasing an installer. The nuget package can be found at https://www.nuget.org/packages/Reveal.Sdk.Wpf, samples can be found at https://github.com/RevealBi/sdk-samples-wpf.

### New Features
* (Beta) Chart actions available while hovering the mouse. Turn on using `RevealSdkSettings.EnableActionsOnHoverTooltip = true`.

### Bug Fixes
* Fixes and performance improvements for the new category charts
* Setting the Host property in MsSql provider in the IRVDataSourceProvider but not in the client causes error
* Redshift queries fail if the Schema property is not set in the dataSourceItem (should use the default, 'public', schema)
* All database datasources required the Database property to be set in the DataSourceItem (even if it was set in the DataSource). Now the property has been deprecated in the DataSourceItem, and setting it in the Database just works.
* Opening a linked dashboard caused a crash
* Treemap showing Redshift/Postgres data failed
* Error using Standard Deviation aggregation with Redshift or Postgres
* Setting a different Sheet for an Excel datasource using IRVDataSourceProvider didn't work
* Error if clicking in blank space between the title and statistics icon while in Visualization Editor mode.
* Cannot change the title of a new visualization (when it is initialized as a blank title)
* PostgresSQL connection to localhost doesn't work
* If a JSON attribute name begins with a number the extracted value is always empty
* Data Blending field panels don't scroll with mouse wheel or trackpad
* Unable to move filter when there are 10+ of them in edit mode
* Fixed a concurrency issue if several visualizations accessed the same data at the same time.
* Sybase ds item wrapper with configured custom query property still returns all data
* Replacing Analysis Services data source doesn't work
* Dynamics CRM - NRE is thrown when you try to get data using a data source item
* An exception is thrown when no image is set in DashboardEmptyState
* RVReportingServicesDataSourceItem seems to be missing properties for configuring parameters
* It is not possible to render a pdf report using RVReportingServicesDataSourceItem
* "No Url specified for web resource" error replacing DataSource WebResource URL 
* Calls to IRVDataSourceProvider.ChangeDataSourceItemAsync always has null for dashboardId argument
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

## 1.4.1 (April 4th, 2023)
_This is a nuget.org only update._

### Bug Fixes
* Fixes error `Failed to add reference to 'libigsslic32'.` when referencing the Reveal WPF SDK using the Nuget Package Manager.

## 1.4.0 (Feb-2023)

### Breaking Changes
* Category Charts have a new look & feel. The old L&F is deprecated but if needed for whatever reason, they're can be restored by doing `revealSdkSettings.enableNewCharts = false`.
* Subtitles for Data Source Items are no longer autogenerated. Only the Subtitle property is considered.

### New Features
* New API `onFieldsInitializing` that makes it possible to customize the list of fields shown in the visualization editor, by removing, renaming or reordering fields. Usage example: 
```
revealView.onFieldsInitializing = function (args) {
	args.fields = args.fields.filter(f => !["Avg.CPC", "Avg. CPC"].some(e => e == f.name));
};
```
* BigQuery, Snowflake and Athena now support the `CustomQuery` property
* Snowflake - Allow setting `Warehouse` property from sdk

### Bug Fixes

* When trying to join a third dataset the app freezes
* Inconsistent time part for dates sent in the range parameter of `onDateFilterChanged`
* Inconsistent day shown in the global filter range selector, when using 'Today' or 'Yesterday' two different days were displayed.
* Data blending editor doesn't show the field used for joining when that field comes from a previous data blending.
* RVSnowflakeDataSourceItem Does Not Work

## 1.3.1 (Jan-2023)

### BREAKING CHANGES
- The `Reveal.Sdk.Wpf.Trial` nuget package has been **deprecated** and is **no longer updated**. 
- The new `Reveal.Sdk.Wpf` nuget package is now available on [nuget.org](https://www.nuget.org/packages/Reveal.Sdk.Wpf), and will work as both a Trial and Licensed version. To unlock the Trial, set the license key in the SDK.
- The license key is now set in the `RevealSdkSettings` of the Reveal SDK (previously, this was done in the installer). Here's how to set it:

```cs
RevealSdkSettings.License = "XYZ123";
```

### Bug Fixes
- Fixed issue: when creating a REST datasource using parameters. If the back button was pressed, values were already populated but they were not really applied.
- Fixed issue: Dashboard filter list of available values was always refreshed when opening a dashboard, no matter what expiration setting was set.
- Fixed issue: Dashboard filter expiration value was not saved.
- Fixed issue: Dashboard horizontal filter lost when maximizing and then restoring.
- Fixed issue: the kebab menu in the dashboard view was not reachable using the keyboard (tab).
- Fixed issue: Dashboard linking stops working after selecting a dashboard filter in the linked visualization.
- Fixed issue: Wrong value shown for Scatter Map mouseover tooltip.
- Fixed issue: Cancelling the MenuOpening event didn't really cancel.
- Fixed issue: In ChangeDataSourceItemAsync method, the userContext parameter was coming with null value.

## 1.3.0 (Nov-2022)

### New Features
- New Data Source: Google Analytics 4.
- Interactive Dashboard Filtering: Filter all visualizations using the same data source by clicking on a chart or pivot table data point. Enable with: `revealView.interactiveFilteringEnabled = true`.
- New function 'DateDiff' for calculated fields.
- Customization of the export path can now be achieved by using the `DefaultExportPath` property found in `RevealSdkSettings`

### Bug Fixes
- Fix error when filtering boolean values in Postgres & Redshift ("operator does not exist")
- Removed new http header 'XRID' that was accidentally added in v1.2.3 and was causing issues with CORS.             
