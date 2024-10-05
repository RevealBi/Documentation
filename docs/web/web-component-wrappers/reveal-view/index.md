import CodePreview from '@site/src/components/CodePreview'
import BetaWarning from '../_beta-message.md'

<style type="text/css">{`.container {max-width: 2000px}`}</style>

# Reveal View

<BetaWarning />

<CodePreview previewHeight="800" sourceOpen="true">

```html
<rv-reveal-view dashboard="Sales"></rv-reveal-view>
```

```tsx
import { RvRevealView } from "https://esm.sh/reveal-sdk-wc-wrappers-react";

const App = () => {
    return (
        <RvRevealView dashboard="Sales"></RvRevealView>
    );
};
```

</CodePreview>

::github-api-docs(path=reveal-view/reveal-view.component.ts)
