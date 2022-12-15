# Click Events

When an end-user clicks on a data point within a visualization, the `VisualizationDataPointClicked` event is invoked. You can respond to this event by adding an event handler to the `VisualizationDataPointClicked` event.

```xml
<rv:RevealView x:Name="_revealView"
               VisualizationDataPointClicked="RevealView_VisualizationDataPointClicked"/>
```

```cs
private void RevealView_VisualizationDataPointClicked(object sender, VisualizationClickedEventArgs e)
{

}
```

The `VisualizationClickedEventArgs` class has the following properties:
- **Cell** - gets the data point that was clicked
- **Row** - gets a collection of cell data that is associated with the **Cell**
- **Visualization** - gets the Visualization that was clicked

By using the properties exposed by the `VisualizationClickedEventArgs` class, such as the `VisualizationClickedEventArgs.Cell` and `VisualizationClickedEventArgs.Row` properties, you can read data that is associated with the clicked data point.

It's important to understand that the `VisualizationClickedEventArgs.Row` property provides a collection of all `RVDataCell` objects that represent each data point associated with the clicked cell.

The `RVDataCell` class has the following properties:
- **ColumnLabel** - the label, or custom name, of the column belonging to the data point
- **ColumnName** - the name of the column belonging to the data point
- **FormattedValue** - the formatted value of the data point
- **Value** - the original value of the data point