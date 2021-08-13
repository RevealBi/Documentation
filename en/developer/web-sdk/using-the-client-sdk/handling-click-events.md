# Handling User Click Events

## Overview

The SDK allows you to handle when the user clicks a cell with data within a visualization. This is very useful, for example, to provide your own navigation, to change existing selections in your app, among others.

## Code

You can handle user click events by registering to the
__onVisualizationDataPointClicked__ event:

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
