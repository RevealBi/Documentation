# Editor Events

The Visualization Editor exposes four lifecycle events you can hook into to run code before or after the editor opens and closes — useful for enforcing permissions, validating input, or running custom logic when end-users edit visualizations.

For the static properties that show/hide editor UI elements (the `canX` / `showX` toggles), see [Customizing the Reveal View](customizing-reveal-view.md).

## onVisualizationEditorOpening

There may be times when you want to execute some application logic **before** the visualization editor has opened, and you may want to even prevent the editor from opening until a condition is met. To do this, you can add an event handler to the `RevealView.onVisualizationEditorOpening` event.

```js
revealView.onVisualizationEditorOpening = function (args) {
    if(args.isNewVisualization == false){ //the user is trying to edit an existing visualization
        args.cancel = true; //prevent it
    }
};
```

The `VisualizationEditorOpeningArgs` contains the following properties:
- **cancel** - gets or sets a value indicating whether the event should be canceled. `true` if the event should be canceled; otherwise `false`
- **isNewVisualization** - if `true`, the visualization is a newly added visualization. If `false`, it is an existing visualization
- **visualization** - the visualization that was edited and/or added

:::info

If you set `VisualizationEditorOpeningArgs.cancel` to `true`, then the Visualization Editor will not open.

:::

## onVisualizationEditorOpened

If you would like to be notified **after** the Visualization Editor has been opened, either when editing an existing visualization or creating a new one, you can add an event handler to the `RevealView.onVisualizationEditorOpened` event.

```js
revealView.onVisualizationEditorOpened = function (args) {
    if(args.isNewVisualization == false) { 
        //the user is editing an existing visualization
    }
};
```

The `VisualizationEditorOpenedEventArgs` contains the following properties:
- **isNewVisualization** - if `true`, the visualization is a newly added visualization. If `false`, it is an existing visualization
- **visualization** - the visualization that was edited and/or added

## onVisualizationEditorClosing

There may be times when you want to execute some application logic **before** the visualization editor has closed, and you may want to even prevent the editor from closing until a condition is met. To do this, you can add an event handler to the `RevealView.onVisualizationEditorClosing` event.

```js
revealView.onVisualizationEditorClosing = function (args) {
    if(args.isNewVisualization == false) {  //the user is editing
         args.resetVisualization = true; //puts the widget to the state when it was when the user started editing it
    }
};
```

The `VisualizationEditorClosingArgs` contains the following properties:
- **cancel** - gets or sets a value indicating whether the event should be canceled. `true` if the event should be canceled; otherwise `false`
- **isNewVisualization** - if `true`, the visualization is a newly added visualization. If `false`, it is an existing visualization
- **resetVisualization** - if `true`, resets the visualization back to the state prior to being edited.
- **visualization** - the visualization that was edited and/or added

:::info

If you set `VisualizationEditorClosingArgs.cancel` to `true`, then the Visualization Editor will not close.

:::

## onVisualizationEditorClosed

Anytime an end-user edits a single visualization in the `RevealView`, the `RevealView.onVisualizationEditorClosed` event is fired **after** the editor is closed. This can be in response to editing an existing visualization, or adding a new visualization. You can respond to this event by adding an event handler to the `RevealView.onVisualizationEditorClosed` event.

```js
revealView.onVisualizationEditorClosed = function (args) {
    if(args.isNewVisualization == false) { 
    }
};
```

The `VisualizationEditorClosedEventArgs` contains the following properties:
- **isCancelled** - determines if the visualization editor was closed via the **X button** (`false`) or the **Check Button** (`true`)
- **isNewVisualization** - if `true`, the visualization is a newly added visualization. If `false`, it is an existing visualization
- **visualization** - the visualization that was edited and/or added
