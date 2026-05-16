import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Embed a Dashboard

The most common Reveal embed: drop a full dashboard into your app, with all of its visualizations, filters, and interactions. Three lines of client-side code plus a `.rdash` file on your server.

## Before you start

- The Reveal **Server SDK** must be installed and running. See [Install Server SDK](../install-server-sdk.md).
- The Reveal **Client SDK** must be installed in your web app. See [Install Client SDK](../install-client-sdk.md).
- A `.rdash` file must be available to the server. By default, the server looks for it in a folder named `Dashboards` in the working directory.

If any of those is unfamiliar, read [Concepts](../concepts.md) first — it explains the client/server split and where dashboards live.

## Minimum code

In your HTML, add a `<div>` to host the `RevealView`:

```html
<div id="revealView" style="height: 800px; width: 100%;"></div>
```

In JavaScript, point the SDK at your server, load the dashboard by name, and assign it to a new `RevealView`:

```js
RevealSdkSettings.setBaseUrl("https://localhost:5111/");

RVDashboard.loadDashboard("Sales").then(dashboard => {
    const revealView = new RevealView("#revealView");
    revealView.dashboard = dashboard;
});
```

That's the entire embed. The dashboard renders with full editing, filtering, and export enabled by default.

`RevealSdkSettings.setBaseUrl` only needs to be called once per page. Skip it if your client and server are served from the same origin.

## Variations

### Start with a new, empty dashboard

When you want users to author from scratch instead of opening an existing file, instantiate `RVDashboard` directly:

```js
const revealView = new RevealView("#revealView");
revealView.dashboard = new RVDashboard();
```

The user gets an empty canvas with the **+ Visualization** button ready. For a kiosk-style flow that opens directly into the new-visualization picker, see [Editor on Load (Kiosk)](../scenarios/editor-on-load-kiosk.md).

### Load from a JSON-serialized dashboard

If your server stores dashboards as JSON (`.json`) instead of binary (`.rdash`), use `Dashboard.FromJsonString` (or the equivalent in your server stack) inside your `IRVDashboardProvider`. The client-side code is the same — `loadDashboard("Sales")` either way.

:::caution

Manipulating dashboard JSON directly can break the file's integrity. Treat the JSON as opaque unless you have a specific reason to inspect or modify it.

:::

### Load from an embedded resource

Your server's `IRVDashboardProvider` can return a `.rdash` stream from anywhere — a file path, an embedded resource in your assembly, blob storage, a database. The client-side `loadDashboard` call doesn't change.

For the full set of provider patterns (custom file paths, embedded resources, JSON, custom storage), see [Loading Dashboards](../loading-dashboards.md). *(Will move to a dedicated **Dashboard Provider** topic under Connect Data in an upcoming docs change.)*

## What's next

Most embeds need more than the default behavior. Pick the scenario closest to your goal:

- [Read-only Embed](../scenarios/view-only-embed.md) — disable editing for view-only users.
- [Custom Save Destination](../scenarios/custom-save-workflow.md) — route saves to your own REST endpoint instead of the server SDK's default.
- [Locked-down Export Menu](../scenarios/locked-down-export.md) — hide specific export formats for compliance.
- [Editor on Load (Kiosk)](../scenarios/editor-on-load-kiosk.md) — start in edit mode with the new-visualization picker open.

Need to show just one chart instead of a full dashboard? See [Embed a Single Visualization](single-visualization.md).
