import CodePreview from '@site/src/components/CodePreview'
import ApiDocs from "../_api-docs.md";

<style type="text/css">{`.container {max-width: unset}`}</style>

# Visualization Viewer

<CodePreview previewHeight="600" sourceOpen="true">

```html
<rv-visualization-viewer dashboard="Sales" visualization="Leads by Year"></rv-visualization-viewer>
```

```tsx
import { RvVisualizationViewer } from "https://esm.sh/@revealbi/ui-react";

const App = () => {
    return (
        <RvVisualizationViewer dashboard="Sales" visualization="Leads by Year"></RvVisualizationViewer>
    );
};
```

</CodePreview>

<ApiDocs path="visualization-viewer/visualization-viewer.component.ts" />