# Thumbnail Generation

The `RVThumbnail` class lets you render dashboard and visualization thumbnails in your application. Thumbnails are useful when building custom dashboard selectors, gallery views, or previews outside of a `RevealView`.

## Render a Dashboard Thumbnail

Create an HTML element for the thumbnail and pass its selector to `RVThumbnail.fromDashboard` with the dashboard ID.

```html
<div id="thumbnail" style="width: 240px; height: 160px;"></div>
```

Set an explicit width and height on the container so the thumbnail has a visible rendering area.

```typescript
import { RVThumbnail } from "reveal-sdk";

async function renderThumbnail() {
  await RVThumbnail.fromDashboard("#thumbnail", "Sales");
}

renderThumbnail();
```

When the second argument is a string, Reveal SDK loads the dashboard information from the server using that dashboard ID. You can also pass an existing `RVDashboard` instance.

```typescript
import { RVDashboard, RVThumbnail } from "reveal-sdk";

async function renderThumbnail() {
  const dashboard = await RVDashboard.loadDashboard("Sales");
  await RVThumbnail.fromDashboard("#thumbnail", dashboard);
}

renderThumbnail();
```

## Render a Visualization Thumbnail

To render a thumbnail for a specific visualization in a dashboard, pass the visualization as the third argument. The visualization can be identified by zero-based index, title, or an `RVVisualization` instance.

```typescript
import { RVThumbnail } from "reveal-sdk";

async function renderThumbnail() {
  await RVThumbnail.fromDashboard("#thumbnail", "Sales", "Sales by Territory");
}

renderThumbnail();
```

```typescript
import { RVThumbnail } from "reveal-sdk";

async function renderThumbnail() {
  await RVThumbnail.fromDashboard("#thumbnail", "Sales", 0);
}

renderThumbnail();
```

## Render a Chart Type Thumbnail

Use `RVThumbnail.fromChartType` when you need a thumbnail for a chart type without loading a dashboard.

```typescript
import { RVChartType, RVThumbnail } from "reveal-sdk";

RVThumbnail.fromChartType("#thumbnail", RVChartType.ColumnChart);
```

## Render from Dashboard JSON

If you already have a dashboard JSON string, use `RVThumbnail.fromDashboardJson`.

```typescript
import { RVThumbnail } from "reveal-sdk";

RVThumbnail.fromDashboardJson("#thumbnail", dashboardJson);
```

## Runtime Theme Changes

`RVThumbnail` uses the current `RevealSdkSettings.theme`. When the theme changes at runtime, active thumbnails refresh automatically.

```typescript
import { MountainDarkTheme, RevealSdkSettings } from "reveal-sdk";

RevealSdkSettings.theme = new MountainDarkTheme();
```

## Dispose a Thumbnail

Thumbnail resources are released automatically when the container element is removed from the DOM. You can also dispose of a thumbnail explicitly from a framework lifecycle hook.

```typescript
async function renderThumbnail() {
  const thumbnail = await RVThumbnail.fromDashboard("#thumbnail", "Sales");
  thumbnail?.dispose();
}

renderThumbnail();
```
