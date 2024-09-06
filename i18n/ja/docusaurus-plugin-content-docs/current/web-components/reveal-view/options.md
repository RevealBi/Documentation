import CodePreview from '@site/src/components/CodePreview'

# オプション

`RvRevealView` Web コンポーネントは、既存の jQuery コンポーネントをラップして、その使用を簡素化します。これを容易にするために、UI のさまざまな部分を Web に適した方法で制御できる `options` の概念を導入しました。

# Reveal View (Reveal ビュー)

<CodePreview previewHeight="600" sourceOpen="true">

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
import { RvRevealView } from "https://esm.sh/@revealbi/ui-react";

const App = () => {
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

    return (
        <RvRevealView dashboard="Sales" options={options}></RvRevealView>
    );
};
```

</CodePreview>

## RevealView オプション

`RvRevealView` には以下のオプションを設定できます:

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

## DataSourceDialog オプション

以下のオプションを使用して、データ ソース ダイアログの動作を構成します:

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

## エディター オプション

以下のオプションを使用してチャート エディターの動作を変更します:

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

## フィルター オプション

以下の設定を使用して、ダッシュボードのフィルター オプションを構成します:

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

## ヘッダー オプション

以下のオプションを使用してダッシュボードのヘッダー セクションを構成します:

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

## 表示形式オプション

以下のオプションを使用して表示形式の設定を調整します:

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

これらのオプションを構成することで、`RvRevealView` コンポーネントの動作と外観を特定のニーズに合わせて調整し、よりカスタマイズされたユーザーフレンドリーなエクスペリエンスを提供できます。