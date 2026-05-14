import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Release Notes

## 2.0.0 (14th of May, 2026)

### Breaking Changes

#### All Platforms
- The `$.ig` and `RevealApi` global namespaces have been removed. Use `Reveal` as the only namespace (e.g. `Reveal.RevealView`, `Reveal.RevealSdkSettings`).
- The legacy Java backend have been removed.
- Legacy chart types have been removed.
- The deprecated `DateFilter` property has been removed.
- `SupportedLocales` was replaced by `BuiltInLocales` in the `RevealSdkSettings.overrideLocale` method.
- `RVDashboardThumbnailView` has been deprecated in favor of the new `RVThumbnail` class.

#### Node
- The previously deprecated `dateFilter` property has been removed in several places in our SDK. Use the corresponding `filters` array instead.

### New Features

#### All Platforms
- New data source: Azure CosmosDB.
- New data source: ClickHouse.
- Conditional formatting can now be applied based on field values for Grid, Pivot, Bar, Column, and Text visualizations. In addition to comparing against a fixed (static) value, conditional formatting rules support comparing a field's value against **another field** in the same visualization. The formatting is then evaluated independently for each row based on that row's actual data. [Read more.](https://help.revealbi.io/user/fields/conditional-formatting/).
- New `RVThumbnail` class for programmatically generating thumbnails of dashboards and individual visualizations.
- The DataGrid visualization now supports cell selection, multi-cell drag selection, and copying cell values to the clipboard via Ctrl+C, along with an updated column header, alternate row, and cell border design.
- `RevealView` is now available as a standalone npm package.
- New API to set the cells limit in the frontend: `RevealSdkSettings.maxCellsRestriction`.
- We no longer support NTLM in Linux.
- Keyboard navigation is now enabled by default. Widget titles and interactive elements include improved ARIA attributes for screen readers.
- A draggable splitter has been added to the visualization editor between the chart and data areas.
- Integrated authentication for SQL Server connections has been improved.
- SqlServer client library now on 6.1.4 version.

#### Java
We're releasing a new version of our Java SDK backend, as part of an ongoing effort to bring Java up to feature parity with our ASP.NET SDK.

- The Java SDK now supports Redis caching via `RVRedisOptions`.
- `DefaultDashboardTheme` is now supported.
- Headless export now supports CSV format.

```java
CsvExportOptions options = new CsvExportOptions();
options.setUseFormattedValues(true);
byte[] result = dashboardExporter.exportToCsv("dashboardId", options);
```

- `IRVDataModelProvider` is now available as a beta API, enabling users to customize the data sources' data model — matching the existing .NET implementation.

```java
public class MyDataModelProvider implements IRVDataModelProvider {
    @Override
    public void editSchema(IRVUserContext userContext, RVDashboardDataSet dataSet, RVDataSchema schema) {
        // customize field schema, inject calculated fields, add custom measures
    }
}
```

- Cache settings previously only available in .NET — including `maxDownloadSize` and `maxInMemoryCells` — are now exposed in the Java SDK.
- `RVDateRule` is now available for date filters during headless export. The `dateFilter` property is deprecated — use `filters` instead.

```java
ExportOptions exportOptions = new ExportOptions();
exportOptions.setFilters(List.of(new RVDateRule(RVPeriodType.YEAR, RVPeriodRelation.TO_DATE)));
```

#### Node
Several features have been implemented in our Node.js SDK, in an effort to bring it up to feature parity with our ASP.NET SDK.

- `IRVDataModelProvider` is now available as a beta API, enabling users to customize the data sources' data model — matching the existing .NET implementation.

```ts
class MyDataModelProvider implements IRVDataModelProvider {
  async editSchema(userContext, dataSourceItem, schema) {
    // Modifies existing fields in the schema (e.g. changing defaultAggregation, label, or description). Return the modified array to apply changes, or null to keep the original.
    schema.find(f => f.name === "Discount").defaultAggregation = RVDashboardAggregationType.CountDistinct;
    schema.find(f => f.name === "UnitPrice").label = "Price per Unit";
    return schema;
  }
  async getCalculatedFields(userContext, dataSourceItem) {
    // Injects new computed fields using expressions that reference existing field names (e.g. [UnitPrice] * [Quantity]). These show up as additional fields in the visualization editor.
    return [{ name: "LineTotal", type: RVDashboardDataType.Number, expression: "[UnitPrice] * [Quantity] * (1 - [Discount])" }];
  }
  async getMeasures(userContext, dataSourceItem) {
    // Injects custom aggregate measures using expressions like sum(...), sumif(...), or PREVIOUS(...). These appear as available measures when building visualizations.
    return [{ name: "Total Revenue", expression: "sum([UnitPrice] * [Quantity])", description: "Revenue before discount" }];
  }
}
```

- Cache settings previously only available in .NET — including `maxDownloadSize` and `maxInMemoryCells` — are now exposed in the Node SDK.

```ts
const revealOptions: RevealOptions = {
    maxDownloadSize: 200 * 1024 * 1024,
    maxInMemoryCells: 10_000_000,
};
```

- `RVDateRule` is now available for date filters during headless export. The `dateFilter` property is deprecated — use `filters` instead.

```ts
const exportOptions = new ExportOptions();
exportOptions.filters = [new RVDateRule(RVPeriodType.Year, RVPeriodRelation.ToDate)];
```

### Bugs

#### All Platforms
- Not all chart series were rendered, and hovering on a combo stacked series caused a crash.
- Keyboard focus was lost when a dashboard finished loading.
- Gauge visualization did not clamp to its maximum value when the data value exceeded it.
- Concurrent calls to `overrideLocale` could produce incorrect behavior.
- `parseISODate` was not available in the TypeScript-only build.
- Thumbnail generation failed for certain chart types.
- Localization did not work correctly when using module bundlers.
- The `RevealView` constructor did not correctly accept a CSS selector string — only DOM elements worked.
- Date fields were assigned an incorrect column type in `RVJsonSchemaConfigBuilder`.
- A null reference crash occurred in the pivot field editor when `Data` was not set.
- Opening conditional formatting rules with null or empty color properties caused a crash.
- Mismatched filters caused headless export to fail.
- An error occurred when navigating back after following a dashboard link.
- MongoDB `VerifyConnection` was failing unexpectedly.
- A regression caused `filterValueChangedEvent` to not fire correctly.
- The "titles in first row" parameter for Excel data source items was being incorrectly set.
- Missing title in the datasource selector dialog.

