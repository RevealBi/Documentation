import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrading to 2.0.0

This guide covers the breaking changes introduced in Reveal SDK 2.0 and the steps required to upgrade an existing 1.x application to 2.0.

:::note Coming from a version older than 1.8.4?
First follow the [1.x upgrade guides in the 1.8.4 documentation](/1.8.4/web/upgrade-guide-v1.6.0/) to bring your project up to 1.8.4, then return to this page to complete the move to 2.0.
:::

## Overview of Breaking Changes

- **jQuery and Day.js removed** — the SDK no longer depends on jQuery or Day.js.
- **NPM delivery** — the client SDK is now delivered as an npm package; legacy script-tag delivery is no longer the recommended approach.
- **Renamed and removed APIs** 
    - `DateFilter` - _removed_ deprecated property from `RevealView`, `RVDashboard` and `ExportOptionsBase`
    - `Reveal.Sdk.Dashboard.ToJsonStringAsync` - _renamed_ to `ToJsonString`.
- **Deprecated types** — `RVDashboardThumbnailView` has been deprecated, in favor of `RVThumbnail`.

## Step-by-Step Upgrade

### 1. Remove jQuery

The Reveal SDK no longer requires jQuery. Remove the jQuery script tag that was loaded for the SDK:

```html
<!-- Remove this line -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```

:::info
If your own application code depends on jQuery you can keep it — the Reveal SDK simply no longer requires it.
:::

Also remove **Day.js**, **Quill.js** and **Spectrum.js** if they are still present from older versions:

```html
<!-- Remove these if present -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css" rel="stylesheet" type="text/css" >
<script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css" >
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

### 2. Switch client SDK to NPM

Replace the legacy script-tag installation with the npm package.

<Tabs groupId="delivery">
  <TabItem value="before" label="1.x (script tags)">

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
<script src="https://dl.revealbi.io/reveal/libs/1.8.4/infragistics.reveal.js"></script>
```

  </TabItem>
  <TabItem value="after" label="2.0 (npm)">

```bash
npm install reveal-sdk
```

```typescript
import "reveal-sdk";
```

  </TabItem>
</Tabs>

:::tip Still need script tags?
The SDK distribution zip is still available for non-bundler setups — jQuery and Day.js are no longer needed:

```html
<script src="./assets/reveal/reveal-sdk.js"></script>
```
:::

:::info Full installation guides
For a deeper dive into all client SDK installation options — including CDN with ES modules, npm with Angular, and npm with React — see the [Installation Guide](installation/installation.md).
:::

### 3. Update server SDK packages

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Update the `Reveal.Sdk.*` NuGet packages to version **2.0.0** or later.

```xml
<PackageReference Include="Reveal.Sdk.AspNetCore" Version="2.0.0" />
```

  </TabItem>
  <TabItem value="java" label="Java">

Update your Maven/Gradle dependency to version **2.0.0** or later.

```xml
<dependency>
    <groupId>com.infragistics.reveal.sdk</groupId>
    <artifactId>reveal-sdk</artifactId>
    <version>2.0.0</version>
</dependency>
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```bash
npm install reveal-sdk-node@2.0.0
```

  </TabItem>
</Tabs>

### 4. Update API usage

#### `DateFilter` → `filters` + `RVDateRule`

The deprecated `DateFilter` property has been removed. Use the `filters` collection instead.  DateFilter was eliminated from `RevealView`, `RVDashboard`, `RVDateDashboardFilter`, `IExportOptions`, `RevealSettings`, `ExportOptionsBase` and child classes.

<Tabs groupId="api-datefilter">
  <TabItem value="before" label="1.x">

```javascript
var myRule = new Reveal.RVDateRule(Reveal.RVPeriodRelation.Last, 3, Reveal.RVPeriodType.Month);
dashboard.dateFilter = new Reveal.RVDateDashboardFilter(myRule);
```

  </TabItem>
  <TabItem value="after" label="2.0">

```javascript
var myRule = new Reveal.RVDateRule(Reveal.RVPeriodRelation.Last, 3, Reveal.RVPeriodType.Month);
var myDateFilter = dashboard.filters.findByTitle("My Date Filter");
myDateFilter.rule = myRule;
```

  </TabItem>
</Tabs>

#### `RVDashboardThumbnailView` → `RVThumbnail`

<Tabs groupId="api-thumbnail">
  <TabItem value="before" label="1.x">

```javascript
const thumbnailView = new RVDashboardThumbnailView();
```

  </TabItem>
  <TabItem value="after" label="2.0">

```javascript
RevealApi.RVThumbnail.fromDashboard("#thumbnail", "Sales");
```

  </TabItem>
</Tabs>

The new `RVThumbnail` API also supports runtime theme changes.

## Removed APIs

| API | Replacement |
|---|---|
| `DateFilter` property | `filters` collection |
| `RVDashboardThumbnailView` | `RVThumbnail` |
| `Reveal.Sdk.Dashboard.ToJsonStringAsync` | `ToJsonString` |
| Legacy chart types (previously deprecated) | Use current [Chart Types](/web/chart-types) |
| Legacy Java engine | Java SDK (Spring Boot) |

## Summary Checklist

- [ ] Remove jQuery `<script>` tag
- [ ] Remove Quill.js and Spectrum.js references if still present
- [ ] Switch client SDK to npm package (or remove jQuery from script-tag setup)
- [ ] Update server SDK packages to 2.0.0
- [ ] Replace `DateFilter` usage with `filters` and `RVDateRule`
- [ ] Replace `RVDashboardThumbnailView` with `RVThumbnail`
- [ ] Replace `Reveal.Sdk.Dashboard.ToJsonStringAsync` with `ToJsonString`
- [ ] Verify no dashboards use removed legacy chart types
- [ ] If using the legacy Java engine, migrate to a supported server SDK

## Need help?

If you run into issues during the upgrade, [open an issue](https://github.com/RevealBi/Reveal.Sdk/issues) or reach out via the in-app chat.