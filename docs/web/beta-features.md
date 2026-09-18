# Beta Features API

The Reveal SDK provides a centralized way to enable and manage **beta features**. This allows you to test new or experimental functionality before it's officially released.

## Enabling a Beta Feature
You can enable a beta feature using:

```javascript
//enable one feature
RevealSdkSettings.betaFeatures.enable("newPieChart");

//enable multiple features
RevealSdkSettings.betaFeatures.enable("newPieChart", "newDonutChart");

//alternatively use an array
RevealSdkSettings.betaFeatures.enable(...[
    "newPieChart",
    "newDonutChart"
]);
```

## Disabling a Beta Feature
To disable a previously enabled beta feature:

```javascript
RevealSdkSettings.betaFeatures.disable("newPieChart");
```

## Getting All Enabled Beta Features

```javascript
const betafeatures = RevealSdkSettings.betaFeatures.getEnabledFeatures();
```

## Available Beta Flags
The following beta feature flags are available:

### `newDataGrid`
Enables the new data grid visualization in the Reveal SDK.

The new data grid offers:
- Improved rendering performance
- Enhanced sorting and filtering capabilities
- Column summaries support
- Column pinning functionality
- Responsive layout for better mobile and tablet experiences
- Sorting, grouping, and filtering when the grid is bound to a **paged** data source
- And more improvements for a modern grid experience

This feature introduces a significant upgrade to the grid visualization, providing users with a more powerful and flexible data grid component. It is ideal for users who need advanced grid functionality and better performance when working with tabular data.

> **Recent update:** Paged grids previously disabled grouping and filtering (and paged sorting was limited). Sorting, grouping, and filtering are now applied server-side and kept in sync with paging, so multi-column sort precedence, grouping, and column filters work the same way whether or not paging is enabled.

> ✅ **Recommended** for testing improved grid performance and new grid capabilities in your dashboards.

### `newTooltip`

**Released.** Hover tooltips are now the default tooltip experience in the Reveal SDK and this beta flag has been removed. Enabling it no longer has any effect and the call can be deleted.

Tooltips now appear on hover for every visualization type that supports them, and tooltip actions such as drill down and filtering are available directly from the tooltip. Use the `RevealView.showTooltips` property to turn tooltips on or off. See [Working with Tooltips](tooltips.md) for details.

## Beta Server APIs

### `IRVDataModelProvider`
Lets you customize the data model of a data source item on the server, without changing the underlying data source:
- **`EditSchemaAsync`**: modify existing fields (label, description, default aggregation, week level). Return the modified list to apply the changes, or `null` to keep the original schema.
- **`GetCalculatedFieldsAsync`**: add calculated fields based on expressions that reference existing fields (e.g. `[UnitPrice] * [Quantity]`).
- **`GetMeasuresAsync`**: add custom measures based on aggregate expressions (e.g. `sum(...)`, `sumif(...)`, `PREVIOUS(...)`).

Calculated fields and measures show up in the visualization editor like any other field.

```csharp
public class MyDataModelProvider : IRVDataModelProvider
{
    public Task<List<RVDataModelField>> EditSchemaAsync(IRequestContext requestContext, RVDataSourceItem dataSourceItem, List<RVDataModelField> schema)
    {
        schema.First(f => f.Name == "UnitPrice").Label = "Price per Unit";
        return Task.FromResult(schema);
    }

    public Task<List<RVDataModelCalculatedField>> GetCalculatedFieldsAsync(IRequestContext userContext, RVDataSourceItem dataSourceItem)
    {
        return Task.FromResult(new List<RVDataModelCalculatedField> {
            new RVDataModelCalculatedField("LineTotal", RVDashboardDataType.Number, "[UnitPrice] * [Quantity] * (1 - [Discount])")
        });
    }

    public Task<List<RVDataModelMeasure>> GetMeasuresAsync(IRequestContext userContext, RVDataSourceItem dataSourceItem)
    {
        return Task.FromResult(new List<RVDataModelMeasure> {
            new RVDataModelMeasure("Total Revenue", "sum([UnitPrice] * [Quantity])") { Description = "Revenue before discount" }
        });
    }
}
```

Register the provider with `AddDataModelProvider<MyDataModelProvider>()` in ASP.NET, `setDataModelProvider(...)` on the `RevealServerBuilder` in Java, or the `dataModelProvider` option in Node.js.
