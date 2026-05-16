# Custom Save Workflow

## Goal

Route dashboard saves through your **own REST endpoint** — not the built-in `IRVDashboardProvider`. Use this when you need custom storage (a service you don't want to expose to the Reveal server), custom auth headers per save, audit logging, or to integrate saves with an existing workflow engine.

## Properties used

- [`serverSideSave`](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html#serverSideSave) — set to `false` to tell the SDK that saves are handled on the client. The SDK will not call `IRVDashboardProvider.SaveDashboardAsync` on the server.
- [`canSaveAs`](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html#canSaveAs) — optionally set to `false` if your custom storage doesn't support "Save As" (creating a new dashboard with a new name).

## Events used

- [`onSave`](https://help.revealbi.io/api/javascript/latest/classes/RevealView.html#onSave) — fires when the user clicks the save button. Your handler is responsible for serializing the dashboard, sending it to your endpoint, and calling `args.saveFinished()` to exit edit mode.

## Code

```js
const revealView = new RevealView("#revealView");
revealView.serverSideSave = false;

revealView.onSave = (rv, args) => {
    args.serialize(bytes => {
        fetch(`https://api.example.com/dashboards/${args.name}`, {
            method: args.saveAs ? "POST" : "PUT",
            body: bytes,
        }).then(() => {
            if (args.saveAs) {
                args.dashboardId = args.name;
            }
            args.saveFinished();
        });
    });
};
```

The `args.serialize` callback gives you the dashboard as a `byte[]` ready to ship. For the **Save As** branch, set `args.dashboardId` so the in-memory dashboard matches the saved file.

## Variations

- **Use `serializeWithNewName` for Save As** — preserves the title-vs-id distinction. See [Saving Dashboards → Implementing Save As](../saving-dashboards.md#implementing-save-as).
- **Block Save As entirely** — add `revealView.canSaveAs = false` and only handle the regular save branch.
- **Add custom headers** (auth tokens, tenant IDs) — pass them via `fetch` options in the handler.

## See also

- [Saving Dashboards](../saving-dashboards.md) — full save lifecycle, including the server-side `IRVDashboardProvider` alternative.
