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

**Released.** The new data grid is now the default grid visualization in the Reveal SDK, so this flag no longer needs to be enabled. Existing Grid visualizations render with the new data grid without any dashboard changes.

See [Grid Chart](../user/chart-types/grid-chart.md) for a full walkthrough of the column options menu, filtering, summaries, grouping and paging, along with what can be configured from code and the current limitations.

#### Using the Legacy Grid

The flag is still honored, so you can go back to the legacy grid by **disabling** it before creating a `RevealView`:

```javascript
RevealSdkSettings.betaFeatures.disable("newDataGrid");
```

This is intended as a temporary escape hatch while you migrate; the legacy grid will be removed in a future release.

:::caution
Conditional formatting behaves differently between the two grids. When several rules match the same cell, the new data grid applies all matching rules in list order, with later rules winning for any properties they share. Dashboards that rely on overlapping rules may look different after upgrading.
:::

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
