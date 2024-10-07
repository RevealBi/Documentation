import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BetaWarning from './_beta-message.md'

# Installation

<BetaWarning />

Integrating Reveal SDK Web Component Wrappers into your project is quick and easy. Whether you prefer using a CDN for a simple setup or installing locally via npm, we’ve got you covered. If you are working with specific frameworks like React, Vue, or Angular, be sure to check out our dedicated guides for seamless integration.

## Prerequisites

To ensure Reveal SDK Web Component Wrappers function properly, you’ll need to install the Reveal SDK client library. These dependencies are essential as the Reveal SDK Web Component Wrappers are built around the existing jQuery-based RevealView.

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1.8.21/dayjs.min.js"></script>
<script src="https://dl.revealbi.io/reveal/libs/[var:sdkVersion]/infragistics.reveal.js"></script>
<script>
    // Change to your Reveal SDK server URL
    $.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
</script>
```

For more details on setting up the Reveal SDK, see our [installation documentation.](../install-client-sdk.md).

## CDN Installation

If you're looking for the simplest way to integrate, using a CDN is a great option. Include the Reveal SDK Web Component Wrappers directly in your HTML.

```html
<script src="https://cdn.jsdelivr.net/npm/reveal-sdk-wrappers/index.umd.min.js"></script>
```

## NPM Installation

For those who prefer local installation and version control, Reveal SDK Web Component Wrappers can be installed via npm.

### Step 1: Install the Package
Run the following command in your project directory to install the Web Component Wrappers:
```bash npm2yarn
npm install reveal-sdk-wrappers
```

### Step 2: Register the Components
Once installed, you'll need to register the web components in your application. By default, all Reveal SDK Web Component Wrappers will be globally registered, enabling their usage without individual imports.
```js
import { defineRevealSdkWrappers } from "reveal-sdk-wrappers";
defineRevealSdkWrappers();
```

### Step 3: Optimize Bundle Size (Optional)
If you prefer to optimize your bundle size by importing only specific components, you can register individual components as needed:
```js
import { defineRevealSdkWrappers, RvRevealView } from "reveal-sdk-wrappers";
defineRevealSdkWrappers(RvRevealView);
```

## Adding the Component

To start using the `rv-reveal-view` component, include it in your HTML:
```html
<rv-reveal-view></<rv-reveal-view>
```

By following these simple steps, you’ll have the Reveal SDK Web Component Wrappers fully integrated into your project, ready to unlock powerful data visualizations and interactive dashboarding features. Continue exploring the SDK’s rich components and customization options to create a seamless and engaging user experience for your applications.