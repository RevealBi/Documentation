import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installing Reveal SDK in React

## Step 1: Install the Package

<Tabs groupId="package-manager">
  <TabItem value="npm" label="npm" default>

```bash
npm install reveal-sdk
```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

```bash
yarn add reveal-sdk
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add reveal-sdk
```

  </TabItem>
  <TabItem value="bun" label="Bun">

```bash
bun add reveal-sdk
```

  </TabItem>
</Tabs>

## Step 2: Using the Reveal View

Import the Reveal SDK, configure the server URL, and create a `RevealView` instance inside a `useEffect` hook:

```tsx title="src/App.tsx"
import React, { useEffect } from 'react';
import { RevealView, RevealSdkSettings } from 'reveal-sdk';

RevealSdkSettings.setBaseUrl("http://localhost:5111/");

function App() {

  useEffect(() => {
    new RevealView("#revealView");
  }, [])

  return (
    <div id="revealView" style={{height: "100vh", width: "100%"}}></div>
  );
}

export default App;
```

:::tip

The `RevealView` is initialized inside `useEffect` with an empty dependency array to ensure it runs once after the component mounts and the DOM element is available. The `RevealView` constructor accepts a CSS selector string or a native DOM element.

:::
