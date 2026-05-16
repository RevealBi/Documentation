# Editor Events

The Visualization Editor exposes four lifecycle events you can hook into to run code before or after the editor opens or closes. Each event is paired below with a realistic example beyond the basic signature.

For property-level customization (`canX` / `showX` toggles for menu items and buttons), see [Common Patterns](scenarios/index.md). For the full property surface, see the [`RevealView` API reference](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html).

## onVisualizationEditorOpening

Fires **before** the editor opens. Set `args.cancel = true` to prevent it.

Use this to enforce permission rules, gate editing behind a confirmation, or block edits to specific visualizations.

```js
revealView.onVisualizationEditorOpening = (args) => {
    // Block edits to visualizations marked as "locked" by title convention.
    if (!args.isNewVisualization && args.visualization.title.startsWith("[Locked]")) {
        alert("This visualization is locked and cannot be edited.");
        args.cancel = true;
    }
};
```

`VisualizationEditorOpeningArgs`:
- **cancel** — set to `true` to abort the open.
- **isNewVisualization** — `true` if the user is creating a new visualization, `false` if editing an existing one.
- **visualization** — the visualization being opened (only meaningful when `isNewVisualization` is `false`).

## onVisualizationEditorOpened

Fires **after** the editor has opened. Use it for analytics, onboarding hints, or any side-effect that should run once the editor is on screen.

```js
let editorOpenedAt;

revealView.onVisualizationEditorOpened = (args) => {
    editorOpenedAt = Date.now();
    analytics.track("editor_opened", {
        isNew: args.isNewVisualization,
        visualizationTitle: args.visualization?.title,
    });
};
```

`VisualizationEditorOpenedEventArgs`:
- **isNewVisualization** — `true` for a newly added visualization, `false` for an existing one.
- **visualization** — the visualization being edited.

## onVisualizationEditorClosing

Fires **before** the editor closes. Set `args.cancel = true` to keep it open. Set `args.resetVisualization = true` to revert any unsaved edits.

Use this to confirm unsaved changes, run client-side validation, or auto-revert when the user cancels.

```js
revealView.onVisualizationEditorClosing = (args) => {
    // If the user cancelled (closed with the X), revert in-progress changes.
    if (args.isCancelled) {
        args.resetVisualization = true;
        return;
    }

    // If the visualization has no title, prompt for one before allowing close.
    if (!args.visualization.title?.trim()) {
        alert("Please give this visualization a title before saving.");
        args.cancel = true;
    }
};
```

`VisualizationEditorClosingArgs`:
- **cancel** — set to `true` to keep the editor open.
- **isNewVisualization** — `true` for a newly added visualization, `false` for an existing one.
- **resetVisualization** — set to `true` to revert the visualization to its pre-edit state.
- **visualization** — the visualization being edited.

:::info

`isCancelled` is also available here in some SDK builds; check the [API reference](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html#onVisualizationEditorClosing) for your version.

:::

## onVisualizationEditorClosed

Fires **after** the editor has closed. Pairs naturally with `onVisualizationEditorOpened` for timing, analytics, or post-edit processing.

```js
revealView.onVisualizationEditorClosed = (args) => {
    if (editorOpenedAt) {
        const durationMs = Date.now() - editorOpenedAt;
        analytics.track("editor_closed", {
            isNew: args.isNewVisualization,
            cancelled: args.isCancelled,
            durationMs,
        });
        editorOpenedAt = null;
    }
};
```

`VisualizationEditorClosedEventArgs`:
- **isCancelled** — `false` if the user confirmed the edit (✓ button), `true` if they cancelled (✗ button).
- **isNewVisualization** — `true` for a newly added visualization, `false` for an existing one.
- **visualization** — the visualization that was edited or added.
