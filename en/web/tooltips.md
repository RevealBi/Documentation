# Working with Tooltips

A tooltip is a message which appears when the end-user hovers over or clicks on the series in a dashboard visualization.

![](images/tooltips.jpg)

When a tooltip is showing in a dashboard visualization, the `RevealView.onTooltipShowing` event is invoked. Handling this event will allow you to read tooltip data, or prevent the tooltip from showing

```javascript
revealView.onTooltipShowing = (args) => {

};
```

The `TooltipShowingEventArgs` contains the following properties:
- **cell** - gets the data point that is associated with the tooltip
- **row** - gets a collection of cell data that is provided in the tooltip
- **visualization** - gets the Visualization displaying the tooltip

> [!NOTE]
> The `RevealView.onTooltipShowing` event will not be triggered for visualizations that do not support tooltips, such as grids and gauges.

## Reading Tooltip Data

By using the properties exposed by the event `TooltipShowingEventArgs` object, such as the `TooltipShowingEventArgs.cell` and `TooltipShowingEventArgs.row` properties, you can read data that is used for display in the tooltip.

It's important to understand that the `TooltipShowingEventArgs.row` property provides a collection of `RVDataCell` objects that represent each data point in the tooltip.

The `RVDataCell` class has the following properties:
- **columnLabel** - the label, or custom name, of the column belonging to the data point
- **columnName** - the name of the column belonging to the data point
- **formattedValue** - the formatted value of the data point
- **value** - the original value of the data point

The following image illustrates how the properties of a `RVCell` maps to the data being displayed in the tooltip.

![](images/tooltips-row-property.jpg)

## Prevent Tooltips from Showing
To prevent tooltips from showing for all visualizations, or a specific visualization, simply set the `TooltipShowingEventArgs.cancel` property to `true`.

In this example, we are checking if the `TooltipShowingEventArgs.visualization.title` property is **Sales** and preventing the tooltip from showing by setting the `TooltipShowingEventArgs.cancel` property to `true`.

```javascript
revealView.onTooltipShowing = (args) => {
    if (args.visualization.title == "Sales") {
             args.cancel = true;
    }
};
```

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/Tooltips)

