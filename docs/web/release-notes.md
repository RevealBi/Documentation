import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Release Notes

## 2.1.0 (July 7th, 2026)

### Breaking Changes

- Removed the legacy `$.ig` and `RevealApi` global objects.

### New Features

- New data source: SQLite, with support for custom queries.
- New data source: Cube.
- New data source: DuckDB, with support for file and MotherDuck databases, custom queries, and stored procedures (DuckDB macros).
- Most database connectors have been migrated to a new (v2) connector architecture, which adds built-in SQL injection protection.
- The [new DataGrid visualization](https://help.revealbi.io/web/beta-features/#newdatagrid) (`newDataGrid` beta feature) now supports sorting, grouping, and filtering when attached to a paged data source, bringing it closer to parity with the classic grid's paging experience.
- Linear gauge, radial gauge, and bullet graph visualizations have an updated UI and are no longer in beta.
- Additional keyboard navigation and accessibility improvements for Pivot, Grid, and Sparkline visualizations, plus full keyboard navigation support in Edit Mode.
- SQL Server data source: added support for the `ApplicationIntent=ReadOnly` and `MultiSubnetFailover` connection options.
- Updated date filter UI. "Add Filter" is now hidden when all fields are already filtered.
- `additionalHeadersProvider` now supports an async implementation:

```typescript
RevealSdkSettings.setAdditionalHeadersProvider(async (url: string) => {
  const token = await refreshTokenIfNeeded();
  return { Authorization: `Bearer ${token}` };
});
```

- Excel export now supports number formatting.
- MongoDB connector: added support for `allowDiskUse`.
- Improvements to custom visualization templates.
- Added `empty-data` text to the DataGrid visualization, and updated the empty-state icon shown for the first visualization added to a dashboard.

#### AI
- Introduced the first iteration of metadata enrichment, enabling automatic completion of the metadata catalog using AI. Disabled by default.
- Added support for connecting multiple custom AI providers (Node and Java, C# already had it)
- Migrated the Anthropic provider to the official Anthropic SDK.
- Metadata layer improvements, including hot reload / partial regeneration, per-user context support, and a new pluggable metadata storage provider.
- Exposed a `networkTimeout` option for built-in connectors.
- Fixed date range handling for specific named quarters and months in dashboard generation.

### Bugs

#### All Platforms
- Fixed a crash in the TreeMap visualization caused by stale interaction data.
- Fixed a missing tooltip in the Pivot visualization.
- Fixed field-based conditional formatting for hidden and calculated fields.
- Fixed the Grid visualization not showing its "no data" message.
- Fixed hierarchy expansion when consecutive levels contain identical values.
- Custom visualizations are no longer hidden when the context menu is open.
- Fixed `RevealView` reverting a dashboard to its pre-edit state.
- Fixed negative percentage formatting.
- Fixed selected date values not propagating correctly during XMLA-to-tabular conversion.
- The "Filter By" context menu option is now hidden when already filtered by that field.
- Fixed incorrect query results when filtering by a hidden value field.
- Fixed several issues with filter value selection.
- Fixed data ranges in bubble chart Excel exports.
- Fixed image export incorrectly restoring a stray dashboard close button.
- Fixed loading XLSX files that use prefixed namespaces or absolute relationship targets.
- Fixed filter and maximize issues in Embedded Dashboard.
- Improved maximize reliability.

#### Java
- Fixed an issue that would cause an error when defining BigQuery data source items in Java.

## 2.0.0 (May 14th, 2026)

### Breaking Changes

#### All Platforms
- The legacy Java and WPF engine backends have been removed.
- Legacy chart types have been removed.
- The deprecated `DateFilter` property has been removed from `RevealView`, `RVDashboard`, `RVDateDashboardFilter`, `RevealSettings`, `IExportOptions`, and related classes.
- `RVDashboardThumbnailView` has been deprecated in favor of the new `RVThumbnail` class.
- SQL Server-based connectors now use the official Microsoft SQL Server client library, which requires trusted TLS certificates by default. If your SQL Server, Azure SQL, or Azure Synapse connection uses an untrusted or self-signed certificate, set `TrustServerCertificate` during the data source setup.

#### Node
- The `dateFilter` property has been removed from the headless export options. Use the `filters` array with `RVDateDashboardFilter` and `RVDateRule` instead.

#### Java
- The Java SDK now requires Java 17 or higher.
- The Java SDK now uses the `io.revealbi:reveal-sdk-servlet` Maven artifact and a servlet-based setup with `RevealEngineServlet`.
- The Java SDK supports Linux, Windows, and macOS, with both x64 and arm64 architectures.
- If you use Jetty as your server, its version might conflict with the Jetty version used internally by Reveal SDK, which is currently 12.0.12.

### New Features

#### All Platforms
- New data source: Azure CosmosDB.
- New data source: ClickHouse.
- Conditional formatting can now be applied based on field values for Grid, Pivot, Bar, Column, and Text visualizations. In addition to comparing against a fixed (static) value, conditional formatting rules support comparing a field's value against **another field** in the same visualization. The formatting is then evaluated independently for each row based on that row's actual data. [Read more.](https://help.revealbi.io/user/fields/conditional-formatting/).
- New `RVThumbnail` class for programmatically generating thumbnails of dashboards and individual visualizations. It replaces the deprecated `RVDashboardThumbnailView` API and supports runtime theme changes.

```typescript
import { RVThumbnail } from "reveal-sdk";

async function renderThumbnail() {
  await RVThumbnail.fromDashboard("#thumbnail", "Sales");
}

renderThumbnail();
```

- The DataGrid visualization now supports cell selection, multi-cell drag selection, and copying cell values to the clipboard via Ctrl+C, along with an updated column header, alternate row, and cell border design.
- `RevealView` is now available as a standalone npm package.
- The cell limit setting has moved from `$.ig.RVUtility.prototype.maxCellsRestriction` to `RevealSdkSettings.maxCellsRestriction`.
- Keyboard navigation is now enabled by default. Widget titles and interactive elements include improved ARIA attributes for screen readers.
- A draggable splitter has been added to the visualization editor between the chart and data areas.
- Integrated authentication for SQL Server connections has been improved.
- Data agent connection recovery has been improved to handle network interruptions more reliably.

#### Java
- The Java SDK now has feature parity with the .NET SDK for connectors and extension points, with the exception of `InMemoryDataProvider`, which will be ported to Java in a future release.
- The Java SDK now supports Redis caching via `RVRedisOptions`.
- `DefaultDashboardTheme` is now supported.
- Headless export now supports CSV format.

```java
CsvExportOptions options = new CsvExportOptions();
options.setUseFormattedValues(true);
CompletableFuture<InputStream> result = dashboardExporter.exportToCsv("dashboardId", null, options);
```

- `IRVDataModelProvider` is now available as a beta API, enabling custom field schemas, calculated fields, and custom measures — matching the existing .NET implementation.

```java
public class MyDataModelProvider implements IRVDataModelProvider {
    @Override
    public CompletableFuture<List<RVDataModelField>> editSchema(RVDataSourceItem dataSourceItem, List<RVDataModelField> schema, IRequestContext requestContext) {
        // customize field schema
        return CompletableFuture.completedFuture(schema);
    }

    @Override
    public CompletableFuture<List<RVDataModelCalculatedField>> getCalculatedFields(RVDataSourceItem dataSourceItem, IRequestContext requestContext) {
        // inject calculated fields
        return CompletableFuture.completedFuture(null);
    }

    @Override
    public CompletableFuture<List<RVDataModelMeasure>> getMeasures(RVDataSourceItem dataSourceItem, IRequestContext requestContext) {
        // inject custom measures
        return CompletableFuture.completedFuture(null);
    }
}
```

- Cache settings previously only available in .NET — including `maxDownloadSize` and `maxInMemoryCells` — are now exposed in the Java SDK.
- `RVDateRule` is now available for headless export date filters.

```java
ExportOptions exportOptions = new ExportOptions();
exportOptions.getFilters().add(new RVDateDashboardFilter(new RVDateRule(RVPeriodRelation.TO_DATE, RVPeriodType.YEAR)));
```

#### Node
- `IRVDataModelProvider` is now available as a beta API, enabling custom field schemas, calculated fields, and custom measures — matching the existing .NET implementation.

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

- `RVDateRule` is now available for headless export date filters. The `dateFilter` property has been removed — use `filters` instead.

```ts
const exportOptions = new ExportOptions();
exportOptions.filters = [new RVDateDashboardFilter(new RVDateRule(RVPeriodRelation.ToDate, RVPeriodType.Year))];
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
