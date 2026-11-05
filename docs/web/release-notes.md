import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Release Notes

## 2.3.0 (November 5, 2026)

### New Features

- Dashboards can now be shown in a [time zone](https://help.revealbi.io/web/time-zones/) other than the browser's. Set `RevealSdkSettings.timeZone` to an `RVTimeZone` member or to any IANA time zone name: relative date filters and `currentTimeZone()` use it, and every DateTime field read from the data source is converted to it on the server, with no changes to dashboards or data sources. Setting it on an open dashboard reloads the data in place, keeping filter selections and the maximized visualization. Server-side exports take the time zone from the `TimeZone` export option, and use UTC when it isn't set. Dashboards that convert dates with `applyTimeZone()` should drop that formula when a time zone is set, or the values are converted twice.
- [Row-level security](https://help.revealbi.io/web/row-level-security/) is now available in the ASP.NET, Java and Node.js server SDKs. Set a row filter on a data source item in your data source provider, and Reveal applies it to every query that reads the item: visualizations, totals, filter value lists, blended data and exports. User context values are sent as query parameters, the filter never reaches the client, and when a filter can't be applied the request fails instead of returning unfiltered rows. Row filters work with the data sources listed in [Feature Support by Data Source](https://help.revealbi.io/web/datasources/#feature-support-by-data-source).
```csharp
sqlItem.RowFilter = RowFilter.FieldEqualsContext("TenantId", "tenant_id");
```
- Excel and CSV exports no longer send the visualization data from the browser back to the server, so large grids no longer fail at the server's request size limit. The client sends only the dashboard, with its filters and sorting, and the server runs the queries itself. Paged grids are read page by page (`DataSourceQueryPageSize` in the export configuration, 1,000 rows by default) and written through temporary files on the server, so grids export completely, up to Excel's limit of 1,048,576 rows per sheet. On ASP.NET and Node.js, cancelling the export stops the server work. A visualization whose data can't be read gets a sheet with the error instead of failing the whole export.
- Grid PDF exports now apply conditional formatting as the dashboard shows it: background and text colors, bold, italic and strikethrough text, and icons.
- Excel exports now keep the chart legend at the bottom when the dashboard shows it there. Excel always centers a legend above or below a chart, so a left- or right-aligned legend exports centered.
- Excel exports now keep large-number formatting: a value shown as `1.23M` exports with the number format `0.00,,"M"`, and the cell keeps the exact value.
- **Next N days** date rules can now include today: `new RVDateRule(RVPeriodRelation.Next, 7, RVPeriodType.Day, true)` covers today and the next six days. Without the last argument, the period starts tomorrow, as before. Available in the web client, ASP.NET, Java and Node.js.
- In the `onUrlLinkRequested` callback, `args.url` now holds the resolved URL of the clicked row, and the new `args.urlTemplate` holds the URL template configured in the dashboard. This applies to Grid, Pivot and Sparkline hyperlink columns. Returning a template from the callback still works: Reveal resolves it before navigating.
- The Oracle connector now uses the v2 connector architecture, so aggregations run in Oracle instead of in Reveal. It also supports parameterized custom queries and PL/SQL `BOOLEAN` stored procedure arguments, and the Java `RVOracleDataSourceItem` now has `procedure` and `procedureParameters`.
- `RVPostgresDataSource` has two new TLS settings: `SslMode` (`Disable`, `Allow`, `Prefer`, `Require`, `VerifyCA` or `VerifyFull`, with the same meaning as PostgreSQL's `sslmode`) and `SslRootCertificate`, the path to a PEM CA certificate on the server. They're server-side only: set them in your data source provider. When they aren't set, connections behave as before.
- SQL data sources have two new server-side settings, in seconds: `CommandTimeout`, how long a query may run, and `ConnectionTimeout`, how long to wait for a connection. They're available on PostgreSQL, Amazon Redshift, MySQL, MariaDB, SQL Server (including Azure SQL and Azure Synapse), Oracle, Snowflake and Sybase. Set them in your data source provider. When they aren't set, each connector keeps its current timeout.
- A blend of two Amazon Redshift data sources on the same cluster now runs as one cross-database query in Redshift, instead of reading each side and joining them in Reveal.
- The Node.js and Java SDKs now support in-memory data sources. Supply the data with the `dataProvider` option in Node.js, or with `RevealServerBuilder.setDataProvider` in Java.
- The web SDK now applies the `italicFont` and `boldItalicFont` theme settings, and one font family can be assigned to several style slots, with Reveal picking the matching weight and style for each. If you already set `italicFont` or `boldItalicFont`, grid cells with an italic conditional formatting style change appearance after upgrading. See [Theme Fonts](https://help.revealbi.io/web/theming-fonts/).
- When the [Redis cache](https://help.revealbi.io/web/caching/#redis-cache) is enabled, it now also stores XMLA and Cube metadata and the value lists of dashboard and quick filters.
- Charts now render every series in the data. Previously, standard charts showed at most 30 series and stacked bar and column charts at most 100, and the rest were dropped without a warning.
- Tooltips now open to the bottom right of the mouse pointer, and flip to stay on the page near its edges.
- The DataGrid now has a 1-pixel border on all four sides. Previously, it showed only a bottom border, and only when the grid had summaries.
- [AI Agent Skills](https://help.revealbi.io/web/ai-agent-skills/) are available for AI coding assistants such as Claude Code, GitHub Copilot and Cursor: `reveal-embed` helps embed Reveal in your application, and `reveal-dashboard-authoring` creates and edits `.rdash` files with the Reveal DOM.

#### AI
- A [profile authorizer](https://help.revealbi.io/ai/profile-selection/) (`IAIProfileAuthorizer`) decides which AI profiles each user may request, typically from the user's plan, so each of your customer plans can get its own models.
- The [quota gate](https://help.revealbi.io/ai/quota-gate/) (`IAIQuotaGate`, or the `quotaGate` and `quotaSettle` callbacks in Node.js and Java) checks every AI call before tokens are spent and settles the actual token usage after it. A denied call never reaches the provider, and the client gets a `RevealAIError` with a stable code, such as `ai.quota_exceeded`, that your app can turn into an upgrade prompt.
- [Usage tracking](https://help.revealbi.io/ai/usage-tracking/) sends a record of every AI call, with its token counts, user, intent, profile and model, to your own store through an `IAIUsageSink` or the `usageSink` callback. Records never contain prompt or response text.
- [Observability](https://help.revealbi.io/ai/observability/) works without setup: the ASP.NET server logs every AI call and counts it in OpenTelemetry metrics, and each response reports its profile and token usage.
- [Dynamic profiles](https://help.revealbi.io/ai/byok/) (preview) let each user bring their own key (BYOK) and model. Declare them with `AddDynamicProfile` (`addDynamicProfile` in Node.js and Java). Reveal doesn't store the keys.

### Breaking Changes

#### All Platforms
- The Snowflake connector no longer supports username and password authentication. Return an [`RVKeyPairDataSourceCredential`](https://help.revealbi.io/web/authentication/#key-pair-authentication) from your authentication provider instead.

#### Java and Node.js
- When your code behind an extension point throws, for example in a data source provider, an authentication provider or a dashboard provider, the request now fails, as it does in ASP.NET. For data requests, the error shown to the user includes a correlation id, which the server also logs with the exception. Previously, the Node.js SDK logged the exception and went on with the data source item as the client sent it.

#### Node.js
- `advancedSettings` must now be a `Map`, its declared type. Before this release, a `Map` was serialized as an empty object and never reached the engine, so a plain object was the only form that worked. A plain object now fails at startup with `object is not iterable`.

### Improvements

- The new data engine is now the default on both the client and the server. It pushes aggregation, filters, joins and paging down to the data source wherever the connector supports them, and [time zone conversion](https://help.revealbi.io/web/time-zones/) and [row-level security](https://help.revealbi.io/web/row-level-security/) run on it. A few results can differ from earlier versions: calculated fields that use `ROW`, `PREVIOUS` or the deprecated aggregation functions are rejected with an error, strings sort in the data source's collation, and an average over integer values on SQL Server and Redshift keeps its decimals. To keep the previous engine, turn the new one off on both sides: call `RevealSdkSettings.betaFeatures.disable("engine2Enabled")` on the client, and turn off `Engine2Enabled` in ASP.NET, `setEngine2Enabled` in Java or the `engine2Enabled` option in Node.js.

### Bugs

The list below covers the main fixes. For the full list, see the [public bugs closed on GitHub between September 1 and November 5, 2026](https://github.com/RevealBi/Reveal.Sdk/issues?q=state%3Aclosed+closed%3A2026-09-01..2026-11-05+type%3ABug+reason%3Acompleted).

#### All Platforms
- Grid and Pivot PDF exports no longer cut text at 200 characters. They now follow the [`MaxStringCellSize`](https://help.revealbi.io/web/data-size-limits/#maxstringcellsize-and-long-text-values) setting (256 characters by default), as the dashboard does.
- PDF exports now match the dashboard's layout, and charts with no data show the "no data" message.
- Fixed maps that were blank in server-side exports or captured before they finished loading.
- Fixed Excel exports that failed on a chart title with an apostrophe, or needed repair when a currency symbol contained letters, such as `USD`.
- A DataGrid with truncated data now sorts, groups and filters on the server. Column summaries are hidden while a grid is processed on the server, because they would show wrong totals.
- Setting `canAddDashboardFilter` or `canAddDateFilter` before `RevealView.dashboard` no longer throws.
- Tab and Shift+Tab follow the host page's focus order again.
- `RevealView` now releases its listeners when it's removed, so switching dashboards no longer slows down over a session.
- Fixed PostgreSQL `uuid` filters, Redshift `DATEDIFF` on `date` columns, Oracle `TIMESTAMP WITH TIME ZONE` values and unmatched rows in ClickHouse blends.
- Fixed a SQLite cache key collision that made paged grids show the first page on every page.
- Fixed the server's default time zone on Linux and macOS, which could fail with "Unknown time zone".
- A data source item whose data source isn't in the request is now refused with "The data source was not found."
- Hardened the server-side export endpoint, which now returns 400 for a request body that isn't JSON.

#### ASP.NET
- `Reveal.Sdk.Data.Sybase` now declares its dependency on `System.Data.SqlClient`, so Sybase requests no longer fail in apps that don't reference it.

#### Java and Node.js
- The server SDK no longer forwards client-sent `RevealBI-` headers to the engine, and the engine's internal endpoints accept only requests from the server SDK.

#### Node.js
- Headless PDF and image exports now use the user's language.

## 2.2.0 (September 3rd, 2026)

### Breaking Changes

- The `newTooltip` beta feature flag has been removed. Hover tooltips are now the default, so any call that enables the flag can be deleted.
- The new DataGrid is now the default grid visualization for the Reveal SDK. Existing Grid visualizations render with the new DataGrid without any dashboard changes. To continue using the legacy Grid, disable the `newDataGrid` feature flag. When conditional-formatting rules overlap on the same cell, the new DataGrid applies all matching rules in list order, with later rules taking precedence for overlapping formatting properties. This behavior differs from the legacy Grid and may affect dashboards that rely on overlapping rules after upgrading.

### New Features

- Charts now support user-authored [annotations](https://help.revealbi.io/user/chart-annotations/), with a dedicated editor and styling options. Point, slice, and strip annotation types are available on the category chart family, and annotations are saved with the dashboard so every viewer sees the same note in the same place.
- The Grid, Pivot, Sparkline, and new DataGrid visualizations now support [hyperlink columns](https://help.revealbi.io/web/hyperlink-columns/), with URL and dashboard linking and field-token substitution. Cell and row context is passed to the dashboard-linking callback.
- The redesigned [tooltip](https://help.revealbi.io/web/tooltips/) is no longer in beta and is now the default. Tooltips appear on hover for every visualization type that supports them, and tooltip actions such as drill down and filtering are available directly from the tooltip. Use `RevealView.showTooltips` to turn them on or off. In addition, we’ve resolved the remaining known issues with tooltip behavior, providing a more consistent experience across all visualization types.
- Visualization column hyperlinks and row-level actions now support relative URLs, which are normalized automatically when the URL field loses focus.
- The [new DataGrid visualization](https://help.revealbi.io/web/beta-features/#newdatagrid) is now the default grid for the Reveal SDK, and it also supports interactive filtering through a "Filter By" action on eligible cells.
- `RVDashboard` now exposes methods for loading a dashboard from JSON and serializing it back:
```typescript
const dashboard = RVDashboard.loadFromJson(json);
revealView.dashboard = dashboard;

const asObject = revealView.dashboard.toJson();
const asString = revealView.dashboard.toJsonString();
```
- When selecting a SQL-based data source, the metadata screen now displays the data source title instead of the database name.
- The SQLite and DuckDB connectors now support parameterized custom queries.
- The PostgreSQL connector now supports stored procedures.
- Snowflake now supports `applyTimeZone` function.
- MongoDB connector: fields missed by schema inference can now be used explicitly.
- MongoDB query performance and join handling have been improved.
- Tables, views, and stored procedures are now sorted alphabetically for SQL data sources.
- Error messages for invalid data source URLs are now clearer.
- General Japanese resource strings have been reviewed and corrected for consistency.

### Bugs

#### All Platforms
- Fixed a crash when sorting an XMLA data source by caption.
- Fixed stale data in paged Grid Excel and CSV exports.
- Fixed a crash when repeatedly closing the data filter dialog.
- Fixed `SortInterval` in the SQLite connector to match the engine implementation.
- Fixed MSSQL pagination failing when the query has no `ORDER BY` clause.
- Fixed Excel data labels for calculated fields using default formatting.
- Fixed several issues in SSRS.
- Tooltips now follow the field's thousands-separator setting.
- Fixed handling of subqueries without join nodes.
- Refreshing a data filter's value list now re-fetches the values.
- Fixed section fields when data blending is used.
- Fixed a blank radial chart.
- Fixed incorrect results returned by the `Find` function.
- Fixed an issue in the KPI visualization.
- Fixed a bug in grid paging.
- Fixed bold conditional formatting in the DataGrid, which previously applied only italic styling.
- Fixed DataGrid date and time cells falling back to an unformatted value when the column had no explicit date format.
- Column summaries that are configured but hidden are no longer displayed in the DataGrid.

#### ASP.NET
- Fixed an `Unexpected UserContext instance type` error when auto-loading date filter parameters.

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
