# Beta Features API

The Reveal SDK provides a centralized way to enable and manage **beta features**. This allows you to test new or experimental functionality before it's officially released.

## Enabling a Beta Feature
You can enable a beta feature using:

```javascript
$.ig.RevealSdkSettings.betaFeatures.enable("newPieChart");
```

## Disabling a Beta Feature
To disable a previously enabled beta feature:

```javascript
$.ig.RevealSdkSettings.betaFeatures.disable("newPieChart");
```

## Getting All Enabled Beta Features

```javascript
const betafeatures = $.ig.RevealSdkSettings.betaFeatures.getEnabledFeatures();
```

## Available Beta Flags
As of April 1, 2025, the following beta feature flags are available:

### `newDonutChart`
Enables the redesigned donut chart visualization in the Reveal SDK.

The new donut chart offers:
- **Improved rendering performance**
- **Enhanced responsiveness and accessibility**
- **Smoother animations and transitions**
- **Support for interactive filtering**

This feature replaces the legacy donut chart with a more polished and user-friendly version. It is ideal for users looking for a modern, cleaner look and improved data visualization experience.

> ✅ **Recommended** for testing updated visual quality and layout behavior in dashboards using donut charts.

### `newPieChart`
Enables the redesigned pie chart visualization in the Reveal SDK.

The new pie chart offers:
- **Improved rendering performance**
- **Better support for small slices with automatic label placement**
- **Enhanced responsiveness and accessibility**
- **Smoother animations and transitions**
- **Support for interactive filtering**

This feature replaces the legacy pie chart with a more polished and user-friendly version. It is ideal for users looking for a modern, cleaner look and improved data visualization experience.

> ✅ **Recommended** for testing updated visual quality and layout behavior in dashboards using pie charts.

### `newGauges`
Enables the new gauge visualizations in the Reveal SDK.

This includes early access to:

- **Linear Gauge**
- **Radial Gauge**
- **Bullet Graph**

These visualizations are being completely redesigned to offer more flexibility, improved visuals, and better support for displaying KPIs and target-based metrics.

> ⚠️ **Note**: These components are still **in active development** and are **not production-ready**. Expect limited functionality, incomplete styling, and potential issues.

> 🚫 **Not recommended** for general use at this time. This flag is intended for internal testing and preview only.

### `newTooltips`
Enables the new hover-based tooltip experience in the Reveal SDK.

With this feature enabled:

- Tooltips appear **on hover** rather than on click.
- **Tooltip actions** (such as drilldown, filtering, etc.) are readily available without requiring a click.
- Improves discoverability and usability of interactive options within visualizations.
- Offers a more modern and intuitive experience aligned with common data visualization practices.

This behavior is a significant change from the default tooltip, which only appears after the user **clicks** a data point. The `newTooltips` flag simplifies the interaction flow, allowing users to explore data faster and with fewer steps.

> ✅ **Recommended** for testing faster, more interactive data exploration via hover tooltips.
