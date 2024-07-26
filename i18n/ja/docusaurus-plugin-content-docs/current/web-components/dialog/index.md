import CodePreview from '@site/src/components/CodePreview'
import ApiDocs from "../_api-docs.md";

# Dialog

Dialogs appear above the page and require the user's immediate attention. They inform users about critical information, require users to make decisions, or involve multiple tasks.

<CodePreview previewHeight="450" sourceOpen="true">

```html
<button onclick="dialog.open = true">Open Dialog</button>

<rv-dialog id="dialog" title="Dialog" open>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</rv-dialog>
```

```tsx
import { RvDialog } from "https://esm.sh/@revealbi/ui-react";

const App = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>Open Dialog</button>
            <RvDialog title="Dialog" open={isOpen}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </RvDialog>
        </div>
    );
};
```

</CodePreview>

<ApiDocs path="dialog/dialog.component.ts" />
