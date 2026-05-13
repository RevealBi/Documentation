import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installing the Reveal SDK

There are multiple ways to add the Reveal SDK to your project. Choose the approach that best fits your setup.

## CDN (Script Tag)

The simplest way to get started is to include the Reveal SDK directly in your HTML using a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.js"></script>
```

## CDN (ESM)

If you prefer ESM (ES module) syntax without a bundler, you can import the SDK as a module directly in the browser:

```html
<script type="module">
    import { RevealView, RevealSdkSettings, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";

    RevealSdkSettings.setBaseUrl("http://localhost:5111/");

    RVDashboard.loadDashboard("Sales").then(dashboard => {
        const revealView = new RevealView("#revealView");
        revealView.dashboard = dashboard;
    });
</script>
```

This approach gives you tree-shakeable named imports and avoids polluting the global namespace.

## NPM

For production applications with a build pipeline, install the Reveal SDK as an npm package:

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

Then import the classes you need:

```js
import { RevealView, RevealSdkSettings, RVDashboard } from "reveal-sdk";
```

### Framework Guides

For framework-specific setup instructions, see:

- [Angular](installation-angular.md)
- [React](installation-react.md)

## Quick Example (HTML)

Here is a complete HTML page using the Reveal SDK with the CDN:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal SDK</title>
</head>

<body>
    <div id="revealView" style="height: 100vh; width: 100%;"></div>

    <script src="https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.js"></script>

    <script type="text/javascript">
        RevealApi.RevealSdkSettings.setBaseUrl("http://localhost:5111/");

        RevealApi.RVDashboard.loadDashboard("Sales").then(dashboard => {
            const revealView = new RevealApi.RevealView("#revealView");
            revealView.dashboard = dashboard;
        });
    </script>
</body>

</html>
```
