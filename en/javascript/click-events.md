# Click Events

When an end-user clicks on a data point within a visualization, the `onVisualizationDataPointClicked` event is invoked. You can respond to this event by adding an event handler to the `onVisualizationDataPointClicked` event.

```javascript
revealView.onVisualizationDataPointClicked = (visualization, cell, row) => {
    
};
```

The event handler has the following parameters:
- **cell** - gets the data point that was clicked
- **row** - gets a collection of cell data that is associated with the **cell**
- **visualization** - gets the Visualization that was clicked

By using the parameters exposed by the event, such as the `cell` and `row` parameters, you can read data that is associated with the clicked data point.

It's important to understand that the `row` property provides a collection of all `RVDataCell` objects that represent each data point associated with the clicked cell.

The `RVDataCell` has the following properties:
- **columnLabel** - the label, or custom name, of the column belonging to the data point
- **columnName** - the name of the column belonging to the data point
- **formattedValue** - the formatted value of the data point
- **value** - the original value of the data point