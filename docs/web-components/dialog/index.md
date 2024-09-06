import CodePreview from '@site/src/components/CodePreview'
import ApiDocs from "../_api-docs.md";

<style type="text/css">{`.container {max-width: unset}`}</style>

# Dialog

Dialogs appear above the page and require the user's immediate attention. They inform users about critical information, require users to make decisions, or involve multiple tasks.

<CodePreview previewHeight="450" sourceOpen="true">

```html
<div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    <button onclick="dialog.open = true">Open Dialog</button>
</div>

<rv-dialog id="dialog" title="Dialog" open>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</rv-dialog>
```

```tsx
import { RvDialog, RvDialogRef } from "https://esm.sh/@revealbi/ui-react";

const App = () => {
    const ref = useRef<RvDialogRef>();

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <button onClick={() => ref.current.open = true}>Open Dialog</button>
            </div>
            <RvDialog ref={ref} title="Dialog" open={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </RvDialog>
        </>
    );
};
```

</CodePreview>

<ApiDocs path="dialog/dialog.component.ts" />
