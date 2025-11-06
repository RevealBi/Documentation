# Beta Features API

The Reveal SDK provides a centralized way to enable and manage **beta features**. This allows you to test new or experimental functionality before it's officially released.

## Enabling a Beta Feature
You can enable a beta feature using:

```javascript
//enable one feature
$.ig.RevealSdkSettings.betaFeatures.enable("newPieChart");

//enable multiple features
$.ig.RevealSdkSettings.betaFeatures.enable("newPieChart", "newDonutChart");

//alternatively use an array
$.ig.RevealSdkSettings.betaFeatures.enable(...[
    "newPieChart",
    "newDonutChart"
]);
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
The following beta feature flags are available:

### `newBulletGraph`
Enables the experimental bullet graph visualization.

> 🚫 **Not recommended** for general use at this time. This component is still **in active development** and is **not production-ready**. Expect limited functionality, incomplete styling, and potential issues.

### `newCircularGauge`
Enables the experimental radial (circular) gauge visualization.

> 🚫 **Not recommended** for general use at this time. This component is still **in active development** and is **not production-ready**. Expect limited functionality, incomplete styling, and potential issues.

### `newDonutChart`
Enables the redesigned donut chart visualization in the Reveal SDK.

The new donut chart offers:
- Improved rendering performance
- Enhanced responsiveness and accessibility
- Smoother animations and transitions
- Support for interactive filtering

This feature replaces the legacy donut chart with a more polished and user-friendly version. It is ideal for users looking for a modern, cleaner look and improved data visualization experience.

> ✅ **Recommended** for testing updated visual quality and layout behavior in dashboards using donut charts.

### `newLinearGauge`
Enables the experimental linear gauge visualization.

> 🚫 **Not recommended** for general use at this time. This component is still **in active development** and is **not production-ready**. Expect limited functionality, incomplete styling, and potential issues.

### `newPieChart`
Enables the redesigned pie chart visualization in the Reveal SDK.

The new pie chart offers:
- Improved rendering performance
- Better support for small slices with automatic label placement
- Enhanced responsiveness and accessibility
- Smoother animations and transitions
- Support for interactive filtering

This feature replaces the legacy pie chart with a more polished and user-friendly version. It is ideal for users looking for a modern, cleaner look and improved data visualization experience.

> ✅ **Recommended** for testing updated visual quality and layout behavior in dashboards using pie charts.

### `newDataGrid`
Enables the new data grid visualization in the Reveal SDK.

The new data grid offers:
- Improved rendering performance
- Enhanced sorting and filtering capabilities
- Column summaries support
- Column pinning functionality
- Responsive layout for better mobile and tablet experiences
- And more improvements for a modern grid experience

This feature introduces a significant upgrade to the grid visualization, providing users with a more powerful and flexible data grid component. It is ideal for users who need advanced grid functionality and better performance when working with tabular data.

> ✅ **Recommended** for testing improved grid performance and new grid capabilities in your dashboards.

### `newTooltip`
Enables the new hover-based tooltip experience in the Reveal SDK.

With this feature enabled:

- Tooltips appear **on hover** rather than on click.
- **Tooltip actions** (such as drilldown, filtering, etc.) are readily available without requiring a click.
- Improves discoverability and usability of interactive options within visualizations.
- Offers a more modern and intuitive experience aligned with common data visualization practices.

This behavior is a significant change from the default tooltip, which only appears after the user **clicks** a data point. The `newTooltip` flag simplifies the interaction flow, allowing users to explore data faster and with fewer steps.

> ✅ **Recommended** for testing faster, more interactive data exploration via hover tooltips.

### `multipleDateFilters`
Enables the creation of multiple date dashboard filters.

These additional filters can be used in all the same scenarios where dashboard filters:
- Dashboard linking
- URL linking
- Stored procedure parameter binding
- REST parameter binding
- Filters API
- etc.

> ✅ **NOTE** When multiple date filters are defined, RVDashboard.dateFilter will reference the first date dashboard filter. Likewise, RevealView.setDateFilter() will also override the first date filter in the dashboard.