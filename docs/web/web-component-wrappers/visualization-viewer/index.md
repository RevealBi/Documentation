import CodePreview from '@site/src/components/CodePreview'
import BetaWarning from '../_beta-message.md'

# Visualization Viewer

<BetaWarning />

<CodePreview previewHeight="600" sourceOpen="true">

```html
<rv-visualization-viewer dashboard="Sales" visualization="Leads by Year"></rv-visualization-viewer>
```

```tsx
import { RvVisualizationViewer } from "https://esm.sh/reveal-sdk-wrappers-react";

const App = () => {
    return (
        <RvVisualizationViewer dashboard="Sales" visualization="Leads by Year"></RvVisualizationViewer>
    );
};
```

</CodePreview>

::github-api-docs(
    owner: revealbi,
    repo: reveal-sdk-wrappers,
    path: packages/wrappers/src/components/visualization-viewer/visualization-viewer.component.ts
)
