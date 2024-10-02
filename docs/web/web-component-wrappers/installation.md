import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

Integrating Reveal SDK Web Component Wrappers into your project is quick and easy. Whether you prefer using a CDN for a simple setup or installing locally via npm, we’ve got you covered. If you are working with specific frameworks like React, Vue, or Angular, be sure to check out our dedicated guides for seamless integration.

## Prerequisites

To ensure Reveal SDK Web Components function properly, you’ll need to include a few dependencies. These dependencies are essential as Reveal SDK Web Components are built around the jQuery-based RevealView:

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1.8.21/dayjs.min.js"></script>
<script src="https://dl.revealbi.io/reveal/libs/[var:sdkVersion]/infragistics.reveal.js"></script>
```

For more details on setting up the Reveal SDK, see our [installation documentation.](../install-client-sdk.md).

## CDN Installation

If you're looking for the simplest way to integrate, using a CDN is a great option. Follow these examples to include Reveal SDK Web Components directly in your HTML or JavaScript.

<Tabs>
<TabItem value="html" label="HTML" default>

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@revealbi/ui"></script>
```

</TabItem>

<TabItem value="js" label="JavaScript">

```html
<script type="module">
    import "https://cdn.jsdelivr.net/npm/@revealbi/ui";
</script>
```

</TabItem>
</Tabs>

## NPM Installation

For those who prefer local installation and version control, Reveal SDK Web Components can be installed via npm.
```bash npm2yarn
npm install @revealbi/ui
```

After installation, import the components into your project:
```js
import "@revealbi/ui";
```

## Configure Reveal SDK

Once you’ve included the Reveal SDK Web Component Wrappers, you need to configure the Reveal SDK by setting the base URL to your Reveal SDK server. This step ensures that the components know where to retrieve and send data.

<Tabs>
<TabItem value="html" label="CDN-HTML" default>

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@revealbi/ui"></script>
<script>
    // Change to your Reveal SDK server URL
    $.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
</script>
```

</TabItem>

<TabItem value="js" label="CDN-JavaScript" default>

```html
<script type="module">
    import "https://cdn.jsdelivr.net/npm/@revealbi/ui";
    // Change to your Reveal SDK server URL
    $.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
</script>
```

</TabItem>

<TabItem value="npm" label="NPM">

```js
import "@revealbi/ui";
// Change to your Reveal SDK server URL
$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
```

</TabItem>
</Tabs>

## Adding the Component

To start using the `rv-reveal-view` component, include it in your HTML:
```html
<rv-reveal-view></<rv-reveal-view>
```

By following these simple steps, you’ll have Reveal SDK Web Component Wrappers fully integrated into your project, ready to unlock powerful data visualizations and interactive dashboarding features. Continue exploring the SDK’s rich components and customization options to create a seamless and engaging user experience for your applications.