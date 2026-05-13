import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Release Notes

## 2.0.0 (May 14th, 2026)

### Breaking Changes

#### All Platforms
- The legacy Java and WPF engine backends have been removed.
- Legacy chart types have been removed.
- The deprecated `DateFilter` property has been removed.
- `RVDashboardThumbnailView` has been deprecated in favor of the new `RVThumbnail` class.
- `NumberOfItemsInGrid`, `FilterRangeText`, and `UpdateFilterRangeText` have been renamed to `FilterCount`, `FilterSelectionText`, and `UpdateFilterSelectionText`.

#### Node
- The `dateFilter` property on headless export options is deprecated. Use the `filters` array with `RVDateRule` instead.

### New Features

#### All Platforms
- New data source: Azure Cosmos DB.
- New data source: ClickHouse.
- New data source: Elasticsearch.
- Conditional formatting can now be applied based on field values for Grid, Pivot, Bar, Column, and Text visualizations. In addition to comparing against a fixed (static) value, conditional formatting rules support comparing a field's value against **another field** in the same visualization. The formatting is then evaluated independently for each row based on that row's actual data. [Read more.](/user/fields/conditional-formatting/).
- New `RVThumbnail` class for programmatically generating thumbnails of dashboards and individual visualizations.
- The DataGrid visualization now supports cell selection, multi-cell drag selection, and copying cell values to the clipboard via Ctrl+C, along with an updated column header, alternate row, and cell border design.
- `RevealView` is now available as a standalone npm package.
- `MaxCellsRestriction` now exposes get and set accessors.
- Keyboard navigation is now enabled by default. Widget titles and interactive elements include improved ARIA attributes for screen readers.
- A draggable splitter has been added to the visualization editor between the chart and data areas.
- Integrated authentication for SQL Server connections has been improved.
- The official Microsoft SQL Server client library now replaces the previous internal implementation.
- Snowflake now supports OAuth account type via `AllowsOAuthAccountType`.
- Data agent connection recovery has been improved to handle network interruptions more reliably.

#### Java
- The Java SDK now supports Redis caching via `RVRedisOptions`.
- `DefaultDashboardTheme` is now supported.
- Headless export now supports CSV format.

```java
CsvExportOptions options = new CsvExportOptions();
options.setUseFormattedValues(true);
byte[] result = dashboardExporter.exportToCsv("dashboardId", options);
```

- `IRVDataModelProvider` is now available as a beta API, enabling custom field schemas, calculated fields, and custom measures — matching the existing .NET implementation.

```java
public class MyDataModelProvider implements IRVDataModelProvider {
    @Override
    public void editSchema(IRVUserContext userContext, RVDashboardDataSet dataSet, RVDataSchema schema) {
        // customize field schema, inject calculated fields, add custom measures
    }
}
```

- Cache settings previously only available in .NET — including `maxDownloadSize` and `maxInMemoryCells` — are now exposed in the Java SDK.
- `RVDateRule` is now available for headless export date filters. The `dateFilter` property is deprecated — use `filters` instead.

```java
ExportOptions exportOptions = new ExportOptions();
exportOptions.setFilters(List.of(new RVDateRule(RVPeriodType.YEAR, RVPeriodRelation.TO_DATE)));
```

#### Node
- `IRVDataModelProvider` is now available as a beta API, enabling custom field schemas, calculated fields, and custom measures — matching the existing .NET implementation.

```ts
class MyDataModelProvider implements IRVDataModelProvider {
  async editSchema(userContext, dataSourceItem, schema) {
    schema.find(f => f.name === "Discount").defaultAggregation = RVDashboardAggregationType.CountDistinct;
    schema.find(f => f.name === "UnitPrice").label = "Price per Unit";
    return schema;
  }
  async getCalculatedFields(userContext, dataSourceItem) {
    return [{ name: "LineTotal", type: RVDashboardDataType.Number, expression: "[UnitPrice] * [Quantity] * (1 - [Discount])" }];
  }
  async getMeasures(userContext, dataSourceItem) {
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

- `RVDateRule` is now available for headless export date filters. The `dateFilter` property is deprecated — use `filters` instead.

```ts
const exportOptions = new ExportOptions();
exportOptions.filters = [new RVDateRule(RVPeriodType.Year, RVPeriodRelation.ToDate)];
```

### Bug Fixes

#### All Platforms
- Azure Cosmos DB failed to read hierarchical data.
- Not all chart series were rendered, and hovering on a combo stacked series caused a crash.
- Keyboard focus was lost when a dashboard finished loading.
- Gauge visualization did not clamp to its maximum value when the data value exceeded it.
- Concurrent calls to `overrideLocale` could produce incorrect behavior.
- `parseISODate` was not available in the TypeScript-only build.
- Thumbnail generation failed for certain chart types.
- Localization did not work correctly when using module bundlers.
- Date filters were not applied correctly in the YouTube Analytics connector.
- The `RevealView` constructor did not correctly accept a CSS selector string — only DOM elements worked.
- Date fields were assigned an incorrect column type in `RVJsonSchemaConfigBuilder`.
- A null reference crash occurred in the pivot field editor when `Data` was not set.
- Opening conditional formatting rules with null or empty color properties caused a crash.
- Mismatched filters caused headless export to fail.
- An error occurred when navigating back after following a dashboard link.
- MongoDB `VerifyConnection` was failing unexpectedly.
- A regression caused `filterValueChangedEvent` to not fire correctly.
- A required configuration entry for YouTube OAuth was missing.
- A deprecated metric caused failures in the LinkedIn connector.
- The "titles in first row" parameter for Excel data source items was being incorrectly set.
- Missing title in the datasource selector dialog.

