import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Release Notes

## 1.7.5 (July 8th, 2025)

### New Features

#### All Platforms

- Databricks now supports the following authentication types; personal access token, OAuth token pass-through, OAuth client credentials, and Microsoft Entra ID client credentials.
- Reveal no longer extends native JS prototypes (e.g. Array).
- Added support for multiple dashboard date filters.
- An opt-in week date aggregation added to fields through `onFieldsInitializing` by setting the `weekLevelEnabled` to `true`.

```js
revealView.onFieldsInitializing = function (args) {
  var editedFields = args.fields;
  var fieldToChange = editedFields.find(f => f.name == "Date");
  if(fieldToChange)
   fieldToChange.weekLevelEnabled = true;
};
```
- Highlighting filters are now removed when entering edit mode.
- The ANTLR dependency was updated to v4.13.1.
- Redshift connector now supports cross database blending for databases contained in the same AWS cluster.

#### Java

- The ANTLR dependency was updated to v4.13.2.
- The okhttp dependency was updated to v4.12.0.

#### Node

- Filters and date filters are now support for headless Excel export.

### Bugs

#### All Platforms

- Headless export console error from missing JS.
- Description in duplicated Text Box disappears.
- Headless export fails if a dashboard contains a Text Box visualization.
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
- Japanese characters in filter labels are garbled in a pdf file created via headless export.
- New pie is not being exporting correctly to PDF.
- Grid paging loads data twice.
- Long graph legends are not correctly shown.
- Wrong data shown when expanding a pivot using '... to Date' filter.
- Date Range filter "Trailing 12 months" is including current month data.
- Filter opacity is darker on mobile than regular screen sizes.
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

#### All Platforms

- New data source: Databricks.
- The field editor has been improved and contains tabs for different option categories.
- Added a beta features API.

```js
// Enable beta feature
$.ig.RevealSdkSettings.betaFeatures.enable("newDonutChart", "newPieChart");

// Disable beta feature
$.ig.RevealSdkSettings.betaFeatures.disable("newDonutChart", "newPieChart");
```

- The chart toolbar is now generally available. It can be enabled or disabled through the `showToolbar` property on the RevealView. The default value of this property `false`.
- Interactive filtering is now generally available. To enable this feature set `interactiveFilteringEnabled` to `true` on the RevealView. By clicking "Filter By" in the tooltip, this feature will highlight the data in the rest of the charts.
- A new property was added in the visualization editor for slice charts to configure fraction digits of the shown percentages.
- In data sources that contain a `database` property, data source items derived from it no longer have the `database` property set by default. While this makes setting the RVDataSourceItem's `database` property not a requirement, it is strongly recommended to do so even to set it to null, for security reasons.
- Support for an optional `sessionToken` parameter was added to the RVAmazonWebServicesCredentials.

#### Node

- The `dashboardProvider` & `dashboardStorageProvider` now use a `Readable` type definition for the stream. This allows for support for more locations than files.

### Bugs

#### All Platforms

- Using single visualization mode showed misaligned UI elements.
- Visualization filters are not working when changed in the editor.
- Some number conversions resulted in crash.
- Setting `PREVIOUS_YEAR` filter is not working with headless export.
- Excel export fails when dashboard has visualization with error.
- Wrong date range calculated in dashboard linking for year and quarter hierarchy.
- Wrong data when expanding or drilling down and a filter on a date field with fiscal year is applied.
- KPI vs Time % increase incorrect sign when previous number is negative.
- Headless export missing global & visualization filters on each visualization when targeting PDF.
- SSAS performance degraded for some visualizations.
- `NotEquals` and `NotContains` filters do not work in SSAS.
- The date filter is showing as "Unnamed" in headless export.
- Interface `IRVDateFilterMenuItem` isn't part of the RevealApi namespace in the "infragistics.reveal.d.ts" file.
- PowerPoint Exports Showing Token and Luis' Name.
- Highlighting not working for Dates using Google Analytics and similar data sources.
- Show totals on tooltip flag ignored.
- Google Analytics datasource selection crashes if required props are not set.
- "value.toFixed is not a function" error when placing a calculated field where some result is "Infinity" as a value in a Bar visualization or any of the slice chart visualizations.
- Visualization description is overlapped by the title.
- Excel exports with cells with a numeric value of 0 show as empty.

#### Java

- Yellow "configure" banner showing when exporting a visualization using a map visualization.

## 1.7.3 (Mar 4th, 2025)

### New Features

#### All Platforms

- Axis titles are now generally available and can be customized through a dedicated text box by clicking on the visualization field in the editor.
- Fixed lines are now generally available.
- Chart visualizations containing a numeric axis have been enhanced to reduce any potential label repetition.
- A chart's legend can now be positioned at the top or bottom of the visualization, and the alignment can be customized to left, right, or center. These options exist in the Settings tab in the visualization editor.
- Grid paging now supports sorting through the sort icon found on the column header.
- Column visualizations will now favor their labels to appear above the column, and bar visualizations will favor their labels to appear to the right of the bar.
- Further enhancements were made to the hiding and showing of labels on visualizations.
- The `args.items` property on the `revealView.onDateFilterMenuOpening` is now using and array of `IRVDateFilterMenuItem` objects.

```js
revealView.onDateFilterMenuOpening = function(args)
{
    var list = args.items; //List of IRVDateFilterMenuItem objects
    var pos, newItem;

    //Add "Last 2 months" to the months section
    pos = list.findIndex(obj => obj.title === "Month to date"); //Last item in the months section
    var lastTwoMonthsRule = new $.ig.RVDateRule($.ig.RVPeriodRelation.Last, 2, $.ig.RVPeriodType.Month);
    newItem = new $.ig.RVDateFilterMenuOption(lastTwoMonthsRule);
    list.splice(pos + 1, 0, newItem);

    //Remove the "Today" option
    pos = list.findIndex(obj => obj.title === "Today");
    list.splice(pos, 1);

    //Add "First week of 2024" to a new section at the end of the menu
    list.push(new $.ig.RVDateFilterMenuSeparator()); //Add section separator
    var firstWeek24Range = new $.ig.RVDateRange(new Date("2024-01-01"), new Date("2024-01-31"));
    newItem = new $.ig.RVDateFilterMenuOption(firstWeek24Range, "First week of 2024")
    list.push(newItem);
};
```

#### Node

- The `puppeteer-core` dependency was updated from `14.1.2` to `24.1.1`.

### Bugs

#### All Platforms

- The property `serialize` on the `RevealView` actually returns a byte array.
- Blank space above chart in single visualization mode when hiding header, title, and filters.
- Using `RVIntegratedAuthenticationCredential` results in an error.
- Visualization filters are hidden after maximizing when `showHeaders` is set to `false`.
- Analysis Services returns wrong values with some locales/cultures.
- Crash when selecting "Select values" for a dashboard filter.
- Conditional formatting with percentage and columns is not working.
- Incorrect data source ID in `ChangeDataSourceItemAsync`.
- Japanese characters are garbled in a PDF file created via headless export.
- Japanese date format is not correct in an exported PDF file.
- Unwanted numbering "(1)" appears in a dashboard title in a PDF file created via headless export.
- Date format of the dashboard/visualization filters are not correct in Japanese.
- Dashboard filters appear on all visualizations when maximized, even if they are not connected.
- Filters disappears after maximizing visualization.
- Category labels are in reverse order for stacked bar chart.
- Error when setting a `DateRule` to a dashboard date filter via API.
- Error when setting a `DateRule` to a visualization filter via menu in a XMLA visualization.
- Crash when creating or loading a combo visualization.
- Dashboard linking from grid to dashboard date filter not working.
- Missing content-type response header for export-related endpoints.
- Exceptions in interactive export are not being notified to the user.
- Data truncation indicator alignment is wrong.
- Export to Excel fails for Analysis Services with dashboard filter.
- (Beta) Toolbar icons are misaligned.
- (Beta) Toolbar buttons require double click to perform an action.

#### Java

- When querying a Date field from a REST datasource during PM hours, the time component will show noon.

## 1.7.2 (Jan 20th, 2025)

### New Features

#### All Platforms

- (Beta) Added support for custom menu items in toolbar using `onMenuOpening`.
- (Beta) Compare filtered data within the same visualization. Interactive filtering was enhanced to support XMLA data sources. Now, the showing "Filter By" option appears when there are multiple visualizations. Additionally, the choropleth map will highlight the selected country. When a filter is added, it is now read-only to prevent changes. Filtering is also now allowed by date, with the restriction that only one date value can be selected.
- (Beta) Axis titles can now be controlled in the visualization editor settings pane, with the following options; none, x-axis, y-axis, or both. To enable this functionality set `$.ig.RevealSdkSettings.enableBetaFeatures` to `true`.
- The PostgreSQL data provider now supports materialized views.
- The BigQuery data provider now supports data blending.
- The donut chart visualization now support different center label modes; none, label only, value only, or both label and value.
- The Snowflake data source dependency Snowflake.Data was updated to v2.0.18.
- The date filter presets dropdown now supports editing the available date filters and including your own filters through the `onDateFilterMenuOpening` event. Support was also added for semester-based date rules.

```js
revealView.onDateFilterMenuOpening = customizeDateFilterMenu;
//revealView.ShowDateFilterDropdown = false; //Hides the button that shows the dropdown altogether

function customizeDateFilterMenu(args)
{
  //if(![my_access_check]) { //Perform access check to the filter menu
  //  args.Cancel = true; //Cancel opening of filter items list
  //  return;
  //}

    var list = args.Items; //List of RVDateFilterMenuItem objects
    var pos;

    //Add "Last 2 months" to the "months" section
    pos = list.getItemIndex("Month to date"); //Obtain the beginning of the "years" section
    var lastTwoMonthsRule = new $.ig.RVDateRule($.ig.RVPeriodRelation.Last, 2, $.ig.RVPeriodType.Month);
    list.insert(pos + 1, lastTwoMonthsRule); //Insert using helper

    //Add "Last 2 weeks" to a new section after the "days" section
    pos = list.getItemIndex("Last 7 days");
    list.insertSeparator(pos + 3);
    var lastTwoWeeksOpt = new $.ig.RVDateFilterMenuOption(new $.ig.RVDateRule($.ig.RVPeriodRelation.Last, 2, $.ig.RVPeriodType.Week));  //Instantiate RVDateFilterMenuOption directly
    list.insert(pos + 4, lastTwoWeeksOpt);

    //Remove "Today" option
    var todayItem = list.getByTitle("Today");
    list.remove(todayItem);

    //Add "First week of 2024" to a new section at the end of the menu
    list.addSeparator();
    var firstWeekOf2024Range = new $.ig.RVDateRange(new Date("2024-01-01"), new Date("2024-01-07")); //Customized description
    list.add(firstWeekOf2024Range, "First week of 2024");
}

//The new rules also integrate with the existing filters API
revealView.dashboard.dateFilter = new $.ig.RVDateDashboardFilter(new $.ig.RVDateRule($.ig.RVPeriodRelation.Last, 3, $.ig.RVPeriodType.Day));
```

- Dashboard filters now try to automatically connect to the visualization, in cases where not possible, the manual connection can be used as before.
- The `RevealView` now has a `showTitle` property that toggles the visibility of the dashboard title independently of the dashboard header. The default value is `true`.
- The property `ShowSave` has been added to the `RevealView`. This property determines whether or not the save button is shown. The default value is `true`.
- Axis grid lines can now be controlled in the visualization editor settings pane, with the following options; none, horizontal, vertical, or both.
- The `RevealView` now has a `showVisualizationFilters` property that toggles the visibility of the visualization filters when maximized. The default value is `true`.

#### ASP.NET & Node

- Added support for Microsoft’s SQLite implementation on Web, introducing optional encryption. To enable encryption, developers must call `RevealEmbedSettings.EnableEncryption("yourpassword")` with a secure, non-empty password. By default, the legacy SQLite implementation without encryption remains enabled (`RevealEmbedSettings.IsLegacyCacheEnabled = true`). Switching to Microsoft’s implementation without encryption is possible by setting this flag to `false`. Note: `EnableEncryption` automatically disables the legacy implementation. This change marks the start of a transition to deprecate the original SQLite library; feedback during this period is encouraged.

ASP.NET:
```csharp
builder.Services.AddControllers().AddReveal(revealSetupBuilder =>
{
    revealSetupBuilder.AddSettings(
    settings => 
    {
        settings.IsLegacyCacheEnabled = true;  
        //settings.EnableEncryption("optional-password"); //this method isn't called by default
    });
});
```

Node:
```js
const revealOptions = {
    //...
    isLegacyCacheEnabled: true,
    //enableCacheEncryption: true,
    //cacheEncryptionPassword: "optional-password",
}
app.use('/', reveal(revealOptions));
```

### Bugs

#### All Platforms

- `onVisualizationDataPointClicked` not invoked on slice-based (pie, donut, and funnel) and scatter map visualizations.
- Data may be wrong when using `TODAY`/`NOW` calculated field functions.
- Error setting maximum axis value.
- Error in highlighting a widget from an XMLA data source when other widgets are from different XMLA data sources.
- Filters from XMLA data sources allow auto-connection to widgets using other data sources, which then breaks the visualization.
- XMLA global filters are not working at all.
- In some loading scenarios the dashboard's identifier was being set to null.
- Google Analytics 4 error loading filters and global filter values.
- The last fixed chart line field can't be removed.
- SSAS 'FillTotalsInRow' error for a visualization with grand totals.
- SSAS no data displayed while using some of the chart types.
- Uncaught TypeError: String.isNullOrEmpty is not a function when adding a filter.
- Labels sometimes don't hide when there's not enough space.
- Exception occurs after switching to another chart type after viewing raw data.

## 1.7.1 (Nov 5th, 2024)

### Breaking Changes

#### All Platforms

- `ChartInteractionEventArgs` has been renamed to `TooltipShowingEventArgs`.

### New Features

#### All Platforms

- Chart visualizations will automatically hide 0 value data labels.
- Custom menu items can now be added to visualization tooltips by adding an `RVTooltipItem` to the `customItems` property on the args pass to the `onTooltipShowing` function.

```js
revealView.onTooltipShowing = function (args) {
    //A string pointing to the image may be used or an RVImage, such as:
    //var caseIcon = new $.ig.RVImage("https://svgsilh.com/png-512/306879.png", "Case Icon"); 
    var caseIcon = "https://svgsilh.com/png-512/306879.png";
    var openIcon = "https://svgsilh.com/png-512/41335.png";

    if (args.cell.formattedValue == "Digital Security Center")
    {
        args.customItems.push(new $.ig.RVTooltipItem("Critical", "Escalate Incident", caseIcon, (sender, clickArgs) => { console.log("Clicked"); }));
        args.customItems.push(new $.ig.RVTooltipItem("Critical", "Open Incident Report", openIcon, (sender, clickArgs) => { console.log("Clicked"); }));

        args.customItems.push(new $.ig.RVTooltipItem("High", "Send Reminder", null, (sender, clickArgs) => { console.log("Clicked"); }));
        args.customItems.push(new $.ig.RVTooltipItem("High", "Assign Lead Investigator", null, (sender, clickArgs) => { console.log("Clicked"); }));
    }
}
```

- Positioning improvements made for tooltips showing actions on hover.
- URL linking now works out of the box without needing to implement `onDashboardSelectorRequested`.
- Target setting added to the linking dialog for URLs. The target may be specified through `onUrlLinkRequested` by using the `target` property off of the args parameter.

```js
revealView.onUrlLinkRequested = (args) => {
        args.target = "_blank";
        return "https://www.google.com/";
};
```

- Grid paging is now enabled by default for supported data sources when a new visualization is created or an existing visualization is edited and switched to grid.
- Improvements made to mouse wheel events to better support web component frameworks that make use of the Shadow DOM.
- Performance improvements for request execution and credential resolution under high load.
- Simplified the MongoDb match stage to improve the performance of query execution.

#### ASP.NET

- Added support for .NET 8.0.
- The dependency Npgsql v6.0.9 was updated to v7.0.7.
- The dependency Snowflake.Data v1.1.4 was updated to v2.0.18.
- For the Sybase connector, the dependency System.Data.SqlClient v4.7.0 was updated to v4.8.6.

#### Java

- A new method `public InitializeParameterBuilder setCachePath(String path)` was added to `InitializeParameterBuilder` to allow customization of the cache files location.

### Bugs

#### All Platforms

- Treemap tooltip showing incorrect information.
- The message "There's no data to display" is displayed while data is being loaded for a preview.
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
- Interactive filtering is not working for Label Gauge.
- Switching to raw data and then to another visualization causes crash.
- Scrolling a paged row grid into view produces a crash.
- Text visualization shows "There is no data to display".
- Large numbers in Donut Chart are overflowing rather than shrinking.
- The `showFilters` property on the RevealView, when set to `false`, does not function as intended.
- Dragging field from hierarchy to Category crashes application.

#### ASP.NET

- When using Serilog as logger, message parameters are not properly replaced

## 1.7.0 (Sept 10th, 2024)

### Breaking Changes

#### Java

- Spring Boot 2.x is no longer supported. You'll need to use Spring Boot 3.x with JDK 17+ and Jakarta EE 9 complaint server to host your application.

### New Features

#### All Platforms

- (Beta) Fixed lines can now be added to category charts. This beta functionality can be accessed by enabling the `enableBetaFeatures` property on `$.ig.RevealSdkSettings`. The fixed lines section in the editor can use data fields, or one of the highest, lower, average, or fixed value aggregate specialty fields.
- Added support for dates in visualization filter API. For example, when you have a date-based visualization filter, such as "Last 7 days", you can use the following code to check the date range that the filter evaluated to by checking the `from` and `to` properties of the returning `RVDateRange` object.

```js
var dateRange = revealView.dashboard.visualizations[0].filters[0].dateRange;
```

- Server side grid paging is now available without requiring the `enableBetaFeatures` flag in `$.ig.RevealSdkSettings`. Paging is supported in the following providers: SQL Server, MySQL, BigQuery, PostgreSQL, SyBase, Athena, and Oracle. The providers that support stored procedures will have grid paging disabled when a stored procedure is selected as these can't be queried like tables to return a range of rows. Additionally, paging is not available when processing data on server is false, as well as when using blended data.
- Added visualization-level descriptions. When editing a visualization, you can now enter a description if desired.
- Visualizations now automatically support dashboard linking. The default functionality can still be overridden using the instructions from the [Linking Dashboards](https://help.revealbi.io/web/linking-dashboards/) topic.
- Visualizations can now individually be exported to PDF through their overflow menu when maximized.
- The filter summary page can now be hidden in exports by setting the `includeFiltersSummaryPage` property on the `ExportOptions` object. The exception to this is NodeJS, on that platform the filters summary page is not included regardless of the setting.
- The background overlay when clicking overflow menus or filter search boxes is now lighter.
- Added the ability to define hidden fields in Grid visualization, which can be used to define a URL or dashboard link.
- (Beta) Compare filtered data within the same visualization. The series tooltip includes an option to filter by the selected value. The rest of the visualization will display both the filtered values and the original ones for easy comparison. In this release support was added for funnel, treemap, and gauges. This functionality is currently supported in the following chart types: Column, Bar, Line, Time Series, Area, Step Area, Spline, Stacked Column, Stacked Area, Stacked Bar, Funnel, Treemap, and Gauges. To enable this functionality, set `interactiveFilteringEnabled` to `true` on the RevealView.
- Image export is now supported in headless export.
- Sql Server Analysis Services data sources now support the `EffectiveUserName` property, which makes it possible to impersonate the given user. The property can be leveraged to achieve single sign on, e.g. by setting the property in the `IRVDataSourceProvider` implementation with the value of the current user, as set in the userContext.

#### ASP.NET & Node

- Windows Integrated Authentication is now supported in the Sql Server Analysis Services data source. To enable it, return a new instance of `RVIntegratedAuthenticationCredential` in your 'IRVAuthenticationProvider' implementation.

#### Java

- Added support for Spring Boot v3. With this support comes the news that Spring Boot v2.x isn't supported anymore. To use Spring Boot v3 you'll need to use JDK 17+ and will need a Jakarta EE 9 compliant server to host your application.
- Added ARM64 support for ExportTool

### Bugs

#### All Platforms

- Cached files were not removing .tmp file after adding an entry to the Reveal cache.
- Misaligned placeholder on textarea fields after changing font-size.
- Configured sorting in the value or label field not reflected in Pie visualization.
- Editing a dashboard that includes only a TextBox may lead to a crash.
- The date filters for "Today" and "Yesterday" show incorrect values in different time zones.
- Wrong background color on clickable elements when the mouse is down.
- Excel export generates wrong chart when there are null values for date fields.
- Stacked column chart colors disappear when using a category.
- Choropleth charts show some states green.
- Changing labels using `onFieldsInitializing` is not reflected in the field selection of the dashboard filter.
- Field formatting loss when changing visualization types and exporting to Excel.
- Headless export `InitScript` not working for Visualizations.
- Map shapes loaded from http not https.
- Dashboard description is added as child of body tag.
- Dashboard linking doesn't work for null or empty string values.
- Changing the title or description of a dashboard when using web components causes those fields to revert to defaults.
- Snowflake metadata browser showing tables from all schemas.

## 1.6.7 (June 26th, 2024)

### New Features

#### All Platforms

- Added API to programmatically access visualization filters (aka Quick Filters) and modify their selected values.

```js
//Add a selected value, specified by index from the list of available values, to a field given its name.
function addSelValueToFilter(fieldName, valueIdx) {
	var flt = revealView.dashboard.visualizations[0].filters.getByFieldName(fieldName);
	var valuesPromise = flt.getFilterValues(); //Retrieve the selectable values for the filter
	valuesPromise.then(function (values) {              
		var selValues = flt.selectedValues;
		selValues.push(values[valueIdx]); //Add the specified value to the selection
		flt.selectedValues = selValues;
	});
}
```
- (Beta) Compare filtered data within the same visualization. The series tooltip includes an option to filter by the selected value. The rest of the visualization will display both the filtered values and the original ones for easy comparison. Currently supported in the following chart types: Column, Bar, Line, Time Series, Area, Step Area, Spline, Stacked Column, Stacked Area, Stacked Bar. To enable this functionality, set `highlightedFilteringEnabled` to `true` on the RevealView.
- (Beta) Visualization toolbar was added to quickly access trend-lines, labels, zooming, etc. To enable this functionality, set `enableNewToolbar` to `true` on `$.ig.RevealSdkSettings`.
- Removed the ability to provide a custom query client-side on SQL-based data sources.
- Removed RVGoogleAnalyticsDataSource and RVGoogleAnalyticsDataSourceItem as Google will sunset the API for that connector on July 1st, 2024.
- Added `onDashboardChanged` event to RevealView.

```js
revealView.onDashboardChanged = function (args: DashboardChangedEventArgs) {
  console.log('Dashboard has changed.');
  console.log('Old Dashboard:', args.oldValue);
  console.log('New Dashboard:', args.newValue);

  // Accessing filters for the old and new dashboard
  if(args.oldValue) {
    console.log('Old Dashboard Filters:', args.oldValue.filters);
  }
  if(args.newValue) {
    console.log('New Dashboard Filters:', args.newValue.filters);
  }
};
```
- Tables in the data source dialog are now sorted alphabetically. This change applies to connectors for: SQL Server, MySql, Postgres, Redshift, Oracle, and Snowflake.
- Headless export now includes grid data.
- RVGoogleAnalytics4DataSource now includes `accountId` & `propertyId` properties, and deprecating the corresponding properties in RVGoogleAnalytics4DataSourceItem.

#### Java

- Added a default RVDashboardProvider to enable the saving of dashboards to the server without needing to implement a provider.

### Bug Fixes

#### All Platforms

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
- Editor search bar rendered multiple times.
- Filtered field list is incorrect after adding a calculated field.

#### ASP.NET & Java

- RDASH properties take precedence over what is set on the server.

#### Java

- ExportTool is created in wrong path.

## 1.6.6 (April 19th, 2024)

### New Features

#### All Platforms

- Added an optional description text box, controlled by the property `showDescription`, to the RevealView.
- Exporting a grid or pivot to PDF will now generate "overflow" tables containing the columns that would otherwise not fit the width of the page.
- Grid column width is now respected on PDF export.
- Improved pivot grid visualization appearance in exports to Excel.
- (Beta) Added server side paging support to the grid visualization. To enable this functionality and have it appear in the visualization editor Settings pane, set `$.ig.RevealSdkSettings.enableBetaFeatures` to `true`. Paging is supported in the following providers: SQL Server, MySQL, BigQuery, PostgreSQL, SyBase, Athena, and Oracle. The providers that support stored procedures will have grid paging disabled when a stored procedure is selected as these can't be queried like tables to return a range of rows. Additionally, paging is not available when processing data on server is false, as well as when using blended data.
- `SkiaSharp`, `SkiaSharp.HarfBuzz`, and `SkiaSharp.NativeAssets.Linux` v2.88.3 dependency updated to v2.88.7. 
- A flag was added to the RevealView to control whether or not data tooltip previews in the visualization editor. They are turned off by default to prevent a query getting the first 5 rows. To enable this tooltip, set `isPreviewDataInVisualizationEditorEnabled` to `true`.
- Blending is now supported in MySql when using process data on server.
- Radial charts have a new look & feel. The old L&F are deprecated but if needed, they can be restored by setting `RevealSdkSettings.EnableNewCharts = false`.
- Bar and column charts now include an overlap and gap setting in the visualization editor Settings pane. This allows you to control the amount of overlap between the bars and the amount of space between the groups.
- The Treemap visualization now shows a tooltip on hover and highlights the node.
- `Playwright` v1.27.2 dependency updated to v1.42.0.

#### Node
- Added `dataSourceItemFilter` property to the RevealOptions that allows the filtering of data sources items in the data source dialog
```ts
dataSourceItemFilter?: (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => Promise<boolean>
```

### Bug Fixes

#### All Platforms

- Pie & Doughnut charts are not displayed when exporting from UI.
- Deleting a data blend while a calculated field depends on it won't delete the calculated field.
- Calling a function in Redshift produces an error.
- Postgres functions not working.
- RevealView positioning and sizing when using transform:scale style on the container or any ancestor element.
- Setting `canAddDateFilter` causes exception.
- Save event `args.isNew` is `false` if dashboard property is set to null or undefined.
- Stored procedures parameter screen will sometimes pull previous data or nothing at all.
- Scroll stops working on pop-up element when using search bar.
- Scatter Map indicators hover region shifts with zoom.
- Fraction digits are not shown in Choropleth Map tooltip.
- Filter value above 3000+ is not preserved.
- Errors with renamed pivot fields in post-calculated field UI.
- Preview data cell is not being reused causing it to be rendered multiple times.
- Grids crash on MacOS ARM64.
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
- Can't set focus to search box after the browser goes to background.

## 1.6.4 (February 14th, 2024)

### Breaking Changes

- Property name `showExportToPowerpoint` changed to `showExportToPowerPoint`
- Scatter and Bubble Charts have a new look & feel. The old look & feel are deprecated, if needed they can be restored by doing `RevealSdkSettings.enableNewCharts = false`

### New Features

#### All Platforms

- Exposed `description` property on `RVDashboard`
- Added dashboard title to individual Excel sheets
- Include dashboard filters when exporting to Excel and PDF
- Removed PostgreSQL stored procedures from tab as they're not currently supported

### Bug Fixes

#### All Platforms

- Athena error message not helpful when missing data source item setting
- S3 DS "Region has not been set" error when source item provider is not implemented
- Redshift DS "Host can't be null" error when source item provider is not implemented
- MySql "unable to connect" error when source item provider is not implemented
- Postgres error selecting table when data source item provider is not implemented
- Wrong case-insensitive grid sorting in some scenarios
- FilterChanged event does not fire when changes are made to selected items
- Wrong initialization of "Process Data On Server" flag
- Error on formatting uncaught "TypeError: t.mkFormat is not a function"
- SQLite exceptions cause crash on M1 Mac/ARM64
- Incorrect `CURRENTTIMEZONE()` when adding fields from another data source
- KPI vs Time Now Showing Empty Values in Current Month
- Malfunction of date type column sorting in grid or pivot type visualizations
- Multiple popups displayed when exporting while visualizations are being loaded
- When exporting an 413 error is thrown
- Multiple instances of RevealView not supported
- Map location name comparison is case sensitive

#### Java

- Number rounding is not working for SSRS or CSV data
- MySql setting custom query doesn't work
- Export timing out and producing error

#### Node

- Current Chromium version not working in Node + MAC M1

## 1.6.3 (January 15th, 2024)

- Patch release to fix dependency conflict for projects targeting **ASP.NET 7.0**. Updated `System.Security.Cryptography.Pkcs` 6.0.3 => 7.0.0

## 1.6.2 (January 5th, 2024)

### New Features

#### All Platforms

- The visualization background color picker was updated to use [Coloris](https://github.com/mdbassit/Coloris). With this enhancement the property `canChangeVisualizationBackgroundColor` has been marked as obsolete because we are now enabling the visibility of background color setting by default. Additionally, the [Spectrum](https://bgrins.github.io/spectrum/) dependency is no longer required.
- The sqlite storage for cache file `tabulardata.sqlite` is now disabled by default to prevent growing without limit
- When `$.ig.RevealSdkSettings.enableActionsOnHoverTooltip` is enabled, the actions tooltip is now available on the Pivot visualization. Hovering on a chart visualization will now show the tooltip when within a certain number of pixels from the data point.
- Support for calculated fields using the following functions on a SQL Server data source with "Process Data on Server" enabled; `fyear`, `and`, `or`, `concatenate`, `replace`, `date`, `time`, `hour`, `minute`, `second`, `formatdate`, and `datevalue`.
- New client event named `onUrlLinkRequested` added to allow for intercepting and modifying URL links in dashboards at runtime

```javascript
revealView.onUrlLinkRequested = (args) => {
    return args.url + "&webUpdated=true&cellValue=" + args.cell.value();                
};
```

- Added ability to export a single visualization using server export.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
var pdfOptions = new PdfExportOptions();

pdfOptions.Visualizations.Add(new VisualizationExport() {Title = "Sales by Product" });
pdfOptions.Visualizations.Add(new VisualizationExport("9ea0b74d-8944-474c-5e8c-78ce2b30d16c"));

//or
pdfOptions.Visualizations.AddByTitle("Sales by Product");
pdfOptions.Visualizations.AddById("9ea0b74d-8944-474c-5e8c-78ce2b30d16c");


await _exporter.ExportToPdf(dashboardId,  path + ".pdf", pdfOptions);
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
ArrayList<VisualizationExport> viz = new ArrayList<VisualizationExport>();

viz.add(new VisualizationExport("9ea0b74d-8944-474c-5e8c-78ce2b30d16c"));

VisualizationExport ve = new VisualizationExport();
ve.setTitle("Sales by Product");
viz.add(ve);

PdfExportOptions options = new PdfExportOptions();
options.setVisualizations(viz);	

RevealEngineLocator.dashboardExporter.exportToPdf(dashboardId, null, options ,new ExportStreamCallback() {
	@Override
	public void onSuccess(InputStream stream) {
		try {								
			Files.copy(stream, Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
			asyncResponse.resume(filePath);
		}
		catch(Exception e) {
			asyncResponse.resume(e);
		}
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
import reveal, { ExportFormat, IDashboardExporter, PdfExportOptions, VisualizationExport } from 'reveal-sdk-node';

var options = new PdfExportOptions();
var ve = new VisualizationExport();
ve.title = "Spend vs Budget";

options.visualizations.push(ve);    

revealServer.exporter.exportPdf("Marketing", fileName, options, null);
```

  </TabItem>

</Tabs>

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

- Added custom query support for the MongoDB connector
- Added support for data blending (joining) on server for the MongoDB connector
- Added support for ARM64 for ASP.NET and Node on MacOS and Linux

#### Java

- JavaScript SDK distributions will no longer be available at https://maven.revealbi.io/repository/public/com/infragistics/reveal/sdk/reveal-sdk-distribution/x.y.z/reveal-sdk-distribution-x.y.z-js.zip. Instead, the location will be https://dl.infragistics.com/reveal/libs/x.y.z/reveal-sdk-distribution-js.zip.
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
* We're no longer releasing an installer for the asp.net SDK. To get started, check the documentation at https://help.revealbi.io/web/getting-started-server/

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
