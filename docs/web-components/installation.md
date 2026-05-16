import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BetaWarning from './_beta-message.md'

# Installation

<BetaWarning />

Integrating Reveal SDK Web Component Wrappers into your project is quick and easy. Whether you prefer using a CDN for a simple setup or installing locally via npm, we’ve got you covered. If you are working with specific frameworks like React, Vue, or Angular, be sure to check out our dedicated guides for seamless integration.

## Prerequisites

The Reveal SDK Web Component Wrappers declare `reveal-sdk` as a peer dependency, so the Reveal SDK client must be installed alongside the wrappers. See [Installing the Client SDK](../web/install-client-sdk.md) for the available installation options.

## CDN Installation

If you're looking for the simplest way to integrate, using a CDN is a great option. Load the Reveal SDK client first, then the wrappers.

```html
<script src="https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal-sdk-wrappers/index.umd.min.js"></script>
<script>
    // Change to your Reveal SDK server URL
    Reveal.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
</script>
```

## NPM Installation

For those who prefer local installation and version control, both packages can be installed via npm. Because `reveal-sdk` is a peer dependency of the wrappers, it must be installed explicitly.

### Step 1: Install the Packages
Run the following command in your project directory to install the Reveal SDK client and the Web Component Wrappers:
```bash npm2yarn
npm install reveal-sdk reveal-sdk-wrappers
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
<rv-reveal-view></rv-reveal-view>
```

By following these simple steps, you’ll have the Reveal SDK Web Component Wrappers fully integrated into your project, ready to unlock powerful data visualizations and interactive dashboarding features. Continue exploring the SDK’s rich components and customization options to create a seamless and engaging user experience for your applications.
