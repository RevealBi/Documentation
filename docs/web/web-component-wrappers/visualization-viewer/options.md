import CodePreview from '@site/src/components/CodePreview'

# Options

The `RvRevealView` web component wraps around the existing jQuery component to simplify its use. To facilitate this, we've introduced an `options` concept that allows you to control various parts of the UI in a web-friendly way.

# Reveal View

<CodePreview previewHeight="600" sourceOpen="true">

```html
<rv-visualization-viewer id="viewer" dashboard="Sales" visualization="Leads by Year"></rv-visualization-viewer>
```

```js
const options = {
  crosshairs: true,
  menu: {
    showMenu: true,
    copy: false,
    exportToExcel: false,
  },
};

const viewer = document.getElementById("viewer");
viewer.options = options;
```

```tsx
import { VisualizationViewerOptions } from "https://esm.sh/@revealbi/ui";
import { RvVisualizationViewer } from "https://esm.sh/@revealbi/ui-react";

const App = () => {
    const options: VisualizationViewerOptions = {
        crosshairs: true,
        menu: {
            showMenu: true,
            copy: false,
            exportToExcel: false,
        },
    };

    return (
        <RvVisualizationViewer dashboard="Sales" visualization="Leads by Year" options={options} ></RvVisualizationViewer>
    );
};
```

</CodePreview>

## Visualization Viewer Options

The following options can be configured for `RvVisualizationViewer`:

```ts
export interface VisualizationViewerOptions {
  showFilters?: boolean;
  categoryGroupingSeparator?: string;
  crosshairs?: boolean;
  hoverTooltips?: boolean;
  changeChartType?: boolean;
  statisticalFunctions?: boolean;
  menu?: {
    items?: MenuItem[];
    copy?: boolean;
    duplicate?: boolean;
    exportToExcel?: boolean;
    exportToImage?: boolean;
    showMenu?: boolean;
    refresh?: boolean;
  };
}
```

By configuring these options, you can tailor the behavior and appearance of the `RvVisualizationViewer` component to suit your specific needs, providing a more customized and user-friendly experience.
