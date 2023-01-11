# Release Notes

## 1.3.1 (Jan-2023)

### BREAKING CHANGES
- The `Reveal.Sdk.Wpf.Trial` nuget package has been **deprecated** and is **no longer updated**. 
- The new `Reveal.Sdk.Wpf` nuget package is now available on [nuget.org](https://www.nuget.org/packages/Reveal.Sdk.Wpf), and will work as both a Trial and Licensed version. To unlock the Trial, set the license key in the SDK.
- The license key is now set in the `RevealSdkSettings` of the Reveal SDK (previously, this was done in the installer). Here's how to set it:

```cs
RevealSdkSettings.License = "XYZ123";
```

### BUG FIXES
- Fixed issue: when creating a REST datasource using parameters. If the back button was pressed, values were already populated but they were not really applied.
- Fixed issue: Dashboard filter list of available values was always refreshed when opening a dashboard, no matter what expiration setting was set.
- Fixed issue: Dashboard filter expiration value was not saved.
- Fixed issue: Dashboard horizontal filter lost when maximizing and then restoring.
- Fixed issue: the kebab menu in the dashboard view was not reachable using the keyboard (tab).
- Fixed issue: Dashboard linking stops working after selecting a dashboard filter in the linked visualization.
- Fixed issue: Wrong value shown for Scatter Map mouseover tooltip.
- Fixed issue: Cancelling the MenuOpening event didn't really cancel.

## 1.3.0 (Nov-2022)

### New Features
- New Data Source: Google Analytics 4.
- Interactive Dashboard Filtering: Filter all visualizations using the same data source by clicking on a chart or pivot table data point. Enable with: `revealView.interactiveFilteringEnabled = true`.
- New function 'DateDiff' for calculated fields.
- Customization of the export path can now be achieved by using the `DefaultExportPath` property found in `RevealSdkSettings`

### Bug Fixes
- Fix error when filtering boolean values in Postgres & Redshift ("operator does not exist")
- Removed new http header 'XRID' that was accidentally added in v1.2.3 and was causing issues with CORS.             
