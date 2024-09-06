import CodePreview from '@site/src/components/CodePreview'

# ダッシュボードの読み込み

## ダッシュボード名で読み込む

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

## RVDashboard で読み込む

<CodePreview previewHeight="600" sourceOpen="true">

```html
<rv-reveal-view id="viewer"></rv-reveal-view>
```

```js
$.ig.RVDashboard.loadDashboard("Campaigns", (dashboard) => {
    const revealView = document.getElementById("viewer");
    revealView.dashboard = dashboard;
});
```

```tsx
import { RvRevealView } from "https://esm.sh/@revealbi/ui-react";

declare const $: any;

const App = () => {
    const [dashboard, setDashboard] = useState<any>();

    useEffect(() => {
        $.ig.RVDashboard.loadDashboard("Campaigns", (dashboard: any) => {
            setDashboard(dashboard);
        });
    }, [])
    
    return (
        <RvRevealView dashboard={dashboard}></RvRevealView>
    );
};
```

</CodePreview>