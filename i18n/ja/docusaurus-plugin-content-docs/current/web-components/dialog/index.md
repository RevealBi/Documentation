import CodePreview from '@site/src/components/CodePreview'

# Dialog (ダイアログ)

ダイアログはページの上に表示され、ユーザーの即時の対応が必要です。重要な情報についてユーザーに通知したり、ユーザーに意思決定を要求したり、複数のタスクに関与したりします。

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

::github-api-docs(path=dialog/dialog.component.ts)
