import CodePreview from '@site/src/components/CodePreview'
import BetaWarning from '../_beta-message.md'

<style type="text/css">{`.container {max-width: unset}`}</style>

# Options

<BetaWarning />

The `RvRevealView` web component wraps around the existing jQuery component to simplify its use. To facilitate this, we've introduced an `options` concept that allows you to control various parts of the UI in a web-friendly way.

# Reveal View

<CodePreview previewHeight="800" sourceOpen="true">

```html
<rv-reveal-view id="viewer" dashboard="Sales"></rv-reveal-view>
```

```js
const options = {
    canEdit: false,
    filters: {
        showFilters: false,
    },
    header: {
        menu: {
            refresh: false,
            items: [
                { 
                    icon: "https://brianlagunas.com/wp-content/uploads/2019/08/cropped-brian-lagunas-512x512.png", 
                    title: "Brian's Blog", 
                    click: () => window.open("https://brianlagunas.com/", "_blank") 
                },
            ]}
    },
} 

const revealView = document.getElementById("viewer");
revealView.options = options;
```

```tsx
import { RevealViewOptions } from "https://esm.sh/reveal-sdk-wrappers";
import { RvRevealView } from "https://esm.sh/reveal-sdk-wrappers-react";

const App = () => {
    const options: RevealViewOptions = {
        canEdit: false,
        filters: {
            showFilters: false,
        },
        header: {
            menu: {
                refresh: false,
                items: [
                    { 
                        icon: "https://brianlagunas.com/wp-content/uploads/2019/08/cropped-brian-lagunas-512x512.png", 
                        title: "Brian's Blog", 
                        click: () => window.open("https://brianlagunas.com/", "_blank") 
                    },
                ]}
        },
    } 

    return (
        <RvRevealView dashboard="Sales" options={options}></RvRevealView>
    );
};
```

</CodePreview>

## RevealView Options

The following options can be configured for `RvRevealView`:

```ts
export interface RevealViewOptions {
    /**
     * Enables or disables edit mode for the dashboard.
     */
    canEdit?: boolean;
    /**
     * Allows the user to save the dashboard.
     */
    canSave?: boolean;
    /**
     * Allows the user to save the dashboard as a new dashboard.
     */
    canSaveAs?: boolean;
    /**
     * Configures the data sources available for creating dashboards.
     */
    dataSources?: DataSourcesConfig;
    /**
     * Enables saving the dashboard on the server.
     */
    saveOnServer?: boolean;
    /**
     * Starts the DashboardViewer in edit mode.
     */
    startInEditMode?: boolean;
    /**
     * Starts the DashboardViewer with a new visualization.
     */
    startWithNewVisualization?: boolean;
    header?: HeaderOptions;
    filters?: FilterOptions;
    dataSourceDialog?: DataSourceDialogOptions;
    visualizations?: VisualizationOptions;
    editor?: EditorOptions;
}
```

## DataSourceDialog Options

Configure the behavior of the data source dialog with the following options:

```ts
export interface DataSourceDialogOptions {
    /**
     * Displays data sources already defined in the dashboard.
     */
    showExistingDataSources?: boolean;
    /**
     * Shows the search input in the data source dialog.
     */
    showSearch?: boolean;
}
```

## Editor Options

Modify the chart editor behavior using these options:

```ts
export interface EditorOptions {
    /**
     * Customizes the list of chart types in the Chart Types selection dialog.
     * @param {ChartTypeItem[]} chartTypes - The array of default chart type items.
     * @returns {ChartTypeItem[]} - An array of processed chart type items.
     */
    chartTypes?: (chartTypes: ChartTypeItem[]) => ChartTypeItem[];
    /**
     * Removes specific chart types from the default list.
     */
    chartTypesToRemove?: ChartType[];
    /**
     * Adds custom chart types to the Chart Types selection dialog.
     */
    chartTypesToAdd?: ChartTypeCustomItem[];
    /**
     * Sets the default chart type for new visualizations.
     */
    defaultChartType?: ChartType | string;
    /**
     * Shows or hides the f(x) option in numeric values sections.
     */
    addPostCalculatedFields?: boolean;
    /**
     * Allows or disallows adding new calculated fields to the list.
     */
    addCalculatedFields?: boolean;
    /**
     * Enables or disables the "Add fields from another data source" button.
     */
    dataBlending?: boolean;
    /**
     * Shows or hides the edit button for a data source.
     */
    editDataSource?: boolean;
    /**
     * Enables or disables the "Add fields from a Machine Learning model" button.
     */
    machineLearning?: boolean;
}
```

## Filter Options

Configure the filter options for the dashboard with these settings:

```ts
export interface FilterOptions {
    /**
     * Enables or disables interactive filtering behavior.
     */
    interactiveFiltering?: boolean;
    /**
     * Shows or hides the filters.
     */
    showFilters?: boolean;
    /**
     * Allows the user to add a date filter.
     */
    addDateFilter?: boolean;
    /**
     * Allows the user to add a dashboard filter.
     */
    addDashboardFiter?: boolean;
}
```

## Header Options

Configure the header section of the dashboard with these options:

```ts
export interface HeaderOptions {
    /**
     * Allows the user to add a new visualization.
     */
    canAddVisualization?: boolean;
    /**
     * Shows or hides the header.
     */
    showHeader?: boolean;
    menu?: {
        /**
         * Shows or hides the menu.
         */
        showMenu?: boolean;
        /**
         * Shows or hides the "Export to Image" menu item.
         */
        exportToImage?: boolean;
        /**
         * Shows or hides the "Export to Excel" menu item.
         */
        exportToExcel?: boolean;
        /**
         * Shows or hides the "Export to PowerPoint" menu item.
         */
        exportToPowerPoint?: boolean;
        /**
         * Shows or hides the "Export to PDF" menu item.
         */
        exportToPdf?: boolean;
        /**
         * Shows or hides the "Refresh" menu item.
         */
        refresh?: boolean;
        /**
         * Adds custom menu items to the menu.
         */
        items?: MenuItem[];
    };
}
```

## Visualization Options

Adjust the visualization settings with these options:

```ts
export interface VisualizationOptions {
    /**
     * Allows the user to maximize a visualization.
     */
    canMaximize?: boolean;
    /**
     * Sets the grouping separator between the category and field name. The default is "/".
     */
    categoryGroupingSeparator?: string;
    /**
     * Shows or hides crosshairs when hovering over a visualization.
     */
    crosshairs?: boolean;
    /**
     * Shows or hides tooltips when hovering over a visualization.
     */
    hoverTooltips?: boolean;
    /**
     * Shows or hides the Change Chart Type dropdown.
     */
    changeChartType?: boolean;
    /**
     * Shows or hides the Statistical Functions dropdown.
     */
    statisticalFunctions?: boolean;
    menu?: {
        /**
         * Shows or hides the "Copy" menu item.
         */
        copy?: boolean;
        /**
         * Shows or hides the "Duplicate" menu item.
         */
        duplicate?: boolean;
        /**
         * Adds custom menu items to the menu.
         */
        items?: MenuItem[];
    };
}
```

By configuring these options, you can tailor the behavior and appearance of the `RvRevealView` component to suit your specific needs, providing a more customized and user-friendly experience.