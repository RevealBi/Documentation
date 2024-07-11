import CodePreview from '@site/src/components/CodePreview'

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

# Examples

TBD

# Properties

| Name  | Type        | Default | Description                                                                       |
| ----- | ----------- | ------- | --------------------------------------------------------------------------------- |
| title | `string`    | `' '`   | The dialog's title as displayed in the header. |
| open  | `boolean`   | `false` | Indicates whether or not the dialog is open. You can toggle this attribute to show and hide the dialog, or you can use the `show()` and `close()` methods and this attribute will reflect the dialog's open state. | 

# Methods

| Name  | Description        | Arguments                                                                                                         | Returns |
| ----- | ------------------ | ----------------------------------------------------------------------------------------------------------------- | ------ |
| show  | Shows the dialog.  | `none` | `Promise` that resolves when the dialog is closed. The resolved value is the source of the close action. |
| close | Hides the dialog.  | `source`: The source of the close action. This can be a string or an object. The resolved value of the promise returned by `show()` will be this value. | `void` |

# Slots

# Parts

# Custom Properties
