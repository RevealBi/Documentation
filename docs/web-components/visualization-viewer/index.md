import CodePreview from '@site/src/components/CodePreview'

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

::github-api-docs(path=visualization-viewer/visualization-viewer.component.ts)
