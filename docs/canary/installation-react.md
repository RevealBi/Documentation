# Installing Reveal SDK Web Components in React

Reveal SDK provides a React-friendly version of each component, ensuring an idiomatic experience for React developers. You can easily switch between HTML and React examples throughout the documentation.

## Installation

To add the Reveal SDK Web Components to your React app, install the necessary packages from npm:

```bash npm2yarn
npm install @revealbi/ui @revealbi/ui-react
```

## Configuration

Set the `RevealSdkSettings.serverUrl` property to point to your Reveal API server. A common place for this configuration is in the `index.tsx` file:

```tsx
import { RevealSdkSettings } from '@revealbi/ui';

RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
```

## Styling

Import the Reveal SDK theme in your application's main stylesheet. This ensures that your web components have the appropriate styling:

```css
@import "@revealbi/ui/themes/light.css";

html, body, #root {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
```

## Using Reveal SDK Web Components

Now you're ready to use Reveal SDK Web Components in your React application. Here's an example of how to integrate a dialog component:

### Importing and Using Components

Every Reveal SDK Web Component is available as a React component. Here's an example of using the `RvDialog` component:

```tsx
import React from 'react';
import { RvDialog } from '@revealbi/ui-react';

function App() {
  return (
    <div>
      <RvDialog title="My Dialog" open={true}>
        <p>Hello!</p>
      </RvDialog>
    </div>
  );
}

export default App;
```

With these steps, you've successfully integrated Reveal SDK Web Components into your React application. You can now leverage Reveal's powerful data visualization capabilities to enhance your projects. Explore more components and features to create a rich and interactive user experience.