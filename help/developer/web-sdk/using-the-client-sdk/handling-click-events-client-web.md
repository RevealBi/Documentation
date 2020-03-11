## Handling User Click Events

### Overview

The SDK allows you to handle when the user clicks a cell with data within a visualization. This is very useful, for example, to provide your own navigation, to change existing selections in your app, among others.

### Code

You can handle user click events by registering to the
[**onVisualizationDataPointClicked**](api-reference-client-web.html#RevealView+onVisualizationDataPointClicked) event:

``` js
window.revealView.onVisualizationDataPointClicked = function (visualization, cell, row) {
    alert('Visualization clicked: ' + visualization.title() + ", cell: " + cell.value);
};
```

In the callback function you receive information about the location of the click:

  - the name of the visualization clicked;
  - the values for the cell clicked (including value, formatted value, and the column’s name);
  - the rest of the values in the same cell.

You can use the rest of the values in the cell to search a specific attribute, like customer ID if you want to change the selected customer in your application. Doesn’t matter that the user clicked another cell, like the sales amount for that customer, you’ll still get the information you need.

### Related content

  - [Configuring the RevealView Object](configuring-revealview-client-web.md)
  - [Editing and Saving Dashboards](editing-saving-dashboards-client-web.md)
  - [Exporting a Dashboard or a Visualization](exporting-dashboard-visualization-web.md)
  - [Setting Up Initial Filter Selections](setting-initial-filters-client-web.md)
  - [Maximizing Visualizations and Single Visualization Mode](maximizing-visualizations-client-web.md)
  - [Setting Up Dynamic Filter Selections](setting-dynamic-filters-client-web.md)
  - [Dashboard Linking](dashboard-linking-client-web.md)
  - [Handling User Click Events (Desktop)](../../desktop-sdk/using-the-desktop-sdk/handling-click-events-desktop.md)
  - [Creating New Visualizations and Dashboards](creating-visualizations-dashboards-client-web.md)
