# Installing the Client SDK

The Reveal SDK client is available as an npm package and as browser-ready JavaScript files. Use npm for applications built with a JavaScript toolchain, use an npm CDN provider for quick browser-based setup, or download the JavaScript files when you want to host the SDK from your own application.

## Install from npm

Install the `reveal-sdk` package when your application is built with a bundler or framework such as Vite, Webpack, Angular, React, or Vue.

```bash npm2yarn
npm install reveal-sdk
```

Import the SDK members you need from `reveal-sdk`:

```ts
import { RevealView, RevealSdkSettings, RVDashboard } from "reveal-sdk";

RevealSdkSettings.setBaseUrl("http://localhost:5111/");

RVDashboard.loadDashboard("Sales").then(dashboard => {
    const revealView = new RevealView("#revealView");
    revealView.dashboard = dashboard;
});
```

Add a host element for the Reveal view in your page or component template:

```html
<div id="revealView" style="height: 600px;"></div>
```

## Use the CDN

Because the Reveal SDK client is published to npm, you can load the browser-ready bundles from npm CDN providers such as jsDelivr, unpkg, esm.sh, or JSPM. The examples in this topic use jsDelivr, but the same package can be loaded from another provider if you prefer its URL format or caching behavior.

:::tip Versioned URLs

The following examples load the latest published `reveal-sdk` package from jsDelivr. For production applications, pin the package to a specific version, such as `https://cdn.jsdelivr.net/npm/reveal-sdk@2.0.0/dist/reveal-sdk.esm.js`, use an equivalent versioned URL from your preferred npm CDN provider, or host the files yourself.

:::

### IIFE

Use the IIFE bundle when your page uses standard script tags instead of JavaScript modules.

```html
<div id="revealView" style="height: 600px;"></div>

<script src="https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.js"></script>
<script>
    Reveal.RevealSdkSettings.setBaseUrl("http://localhost:5111/");

    Reveal.RVDashboard.loadDashboard("Sales").then(dashboard => {
        const revealView = new Reveal.RevealView("#revealView");
        revealView.dashboard = dashboard;
    });
</script>
```

The IIFE bundle exposes the SDK from the global `Reveal` object.

### ESM

Use the ESM bundle when your page uses native browser modules and you want explicit imports.

```html
<div id="revealView" style="height: 600px;"></div>

<script type="module">
    import { RevealView, RevealSdkSettings, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";

    RevealSdkSettings.setBaseUrl("http://localhost:5111/");

    RVDashboard.loadDashboard("Sales").then(dashboard => {
        const revealView = new RevealView("#revealView");
        revealView.dashboard = dashboard;
    });
</script>
```

## Host the JavaScript Files Yourself

If you cannot use npm or a CDN, download the Reveal SDK JavaScript distribution and serve the files from your own application.

https://dl.revealbi.io/reveal/libs/[var:sdkVersion]/reveal-sdk-distribution-js.zip

1. In your client application, create a folder for the Reveal assets. For example, create `assets/reveal`.

2. Copy the JavaScript files from the downloaded distribution into the `assets/reveal` folder.

3. Add the SDK script to your page before the code that creates the `RevealView`.

```html
<script src="./assets/reveal/reveal-sdk.js"></script>
```

If you self-host the ESM build, import it from the path where you copied the file:

```html
<script type="module">
    import { RevealView, RevealSdkSettings, RVDashboard } from "./assets/reveal/reveal-sdk.esm.js";

    RevealSdkSettings.setBaseUrl("http://localhost:5111/");

    RVDashboard.loadDashboard("Sales").then(dashboard => {
        const revealView = new RevealView("#revealView");
        revealView.dashboard = dashboard;
    });
</script>
```

## Configure the Server URL

Call `RevealSdkSettings.setBaseUrl` when the Reveal SDK server is hosted at a different URL than the client application. This only needs to be configured once, before loading dashboards or creating SDK resources that make server requests.

```ts
RevealSdkSettings.setBaseUrl("http://localhost:5111/");
```

## Complete HTML Example Using ESM

The following example shows a complete HTML page that loads the Reveal SDK client from jsDelivr, configures the Reveal SDK server URL, and displays the `Sales` dashboard.

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal SDK - HTML/JavaScript</title>
    <style>
        html,
        body,
        #revealView {
            width: 100%;
            height: 100%;
            margin: 0;
        }
    </style>
</head>
<body>
    <div id="revealView"></div>

    <script type="module">
        import { RevealView, RevealSdkSettings, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";

        RevealSdkSettings.setBaseUrl("http://localhost:5111/");

        RVDashboard.loadDashboard("Sales").then(dashboard => {
            const revealView = new RevealView("#revealView");
            revealView.dashboard = dashboard;
        });
    </script>
</body>
</html>
```
