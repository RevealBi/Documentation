import CodePreview from '@site/src/components/CodePreview'

# Reveal View (Reveal ビュー)

<CodePreview previewHeight="600" sourceOpen="true">

```html
<rv-reveal-view dashboard="Sales"></rv-reveal-view>
```

```tsx
import { RvRevealView } from "https://esm.sh/@revealbi/ui-react";

const App = () => {
    return (
        <RvRevealView dashboard="Sales"></RvRevealView>
    );
};
```

</CodePreview>

::github-api-docs(path=reveal-view/reveal-view.component.ts)