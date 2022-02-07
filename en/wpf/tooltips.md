# Working with Tooltips

A tooltip is a message which appears when the end-user hovers over or clicks on the series in a dashboard visualization.

![](images/tooltips.jpg)

When a tooltip is showing in a dashboard visualization, the `RevealView.TooltipShowing` event is invoked. Handling this event will allow you to read tooltip data, or prevent the tooltip from showing

```xml
<rv:RevealView x:Name="_revealView"
               TooltipShowing="RevealView_TooltipShowing"/>
```

```cs
private void RevealView_TooltipShowing(object sender, TooltipShowingEventArgs e)
{

}
```

The `TooltipShowingEventArgs` class has the following properties:
- **Cell** - gets the data point that is associated with the tooltip
- **Row** - gets a collection of cell data that is provided in the tooltip
- **Visualization** - gets the Visualization displaying the tooltip

> [!NOTE]
> The `RevealView.TooltipShowing` event will not be triggered for visualizations that do not support tooltips, such as grids and gauges.

## Reading Tooltip Data

By using the properties exposed by the `TooltipShowingEventArgs` class, such as the `TooltipShowingEventArgs.Cell` and `TooltipShowingEventArgs.Row` properties, you can read data that is used for display in the tooltip.

It's important to understand that the `TooltipShowingEventArgs.Row` property provides a collection of `RVDataCell` objects that represent each data point in the tooltip.

The `RVDataCell` class has the following properties:
- **ColumnLabel** - the label, or custom name, of the column belonging to the data point
- **ColumnName** - the name of the column belonging to the data point
- **FormattedValue** - the formatted value of the data point
- **Value** - the original value of the data point

The following image illustrates how the properties of a `RVCell` maps to the data being displayed in the tooltip.

![](images/tooltips-row-property.jpg)

## Prevent Tooltips from Showing
To prevent tooltips from showing for all visualizations, or a specific visualization, simply set the `TooltipShowingEventArgs.Cancel` property to `true`.

In this example, we are checking if the `RVVisualization.Title` property is "Sales" and preventing the tooltip from showing by setting the `TooltipShowingEventArgs.Cancel` property to `true`.

```cs
private void RevealView_TooltipShowing(object sender, TooltipShowingEventArgs e)
{
    if (e.Visualization.Title == "Sales")
    {
        e.Cancel = true;
    }
}
```

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-wpf/tree/master/Tooltips)

