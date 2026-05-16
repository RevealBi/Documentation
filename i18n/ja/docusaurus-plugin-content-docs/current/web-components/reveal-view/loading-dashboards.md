import CodePreview from '@site/src/components/CodePreview'
import BetaWarning from '../_beta-message.md'

<style type="text/css">{`.container {max-width: unset}`}</style>

# ダッシュボードの読み込み

<BetaWarning />

## ダッシュボード名で読み込む

<CodePreview previewHeight="800" sourceOpen="true">

```html
<rv-reveal-view dashboard="Sales"></rv-reveal-view>
```

```tsx
import { RvRevealView } from "https://esm.sh/reveal-sdk-wrappers-react";

const App = () => {
    return (
        <RvRevealView dashboard="Sales"></RvRevealView>
    );
};
```

</CodePreview>

## RVDashboard で読み込む

<CodePreview previewHeight="800" sourceOpen="true">

```html
<rv-reveal-view id="viewer"></rv-reveal-view>
```

```js
RVDashboard.loadDashboard("Campaigns").then(dashboard => {
    const revealView = document.getElementById("viewer");
    revealView.dashboard = dashboard;
});
```

```tsx
import { RvRevealView } from "https://esm.sh/reveal-sdk-wrappers-react";
import { RVDashboard } from "reveal-sdk";

const App = () => {
    const [dashboard, setDashboard] = useState<any>();

    useEffect(() => {
        RVDashboard.loadDashboard("Campaigns").then((dashboard: any) => {
            setDashboard(dashboard);
        });
    }, [])

    return (
        <RvRevealView dashboard={dashboard}></RvRevealView>
    );
};
```

</CodePreview>