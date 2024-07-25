# Installation

Easily integrate Reveal SDK Web Components into your project, whether you prefer using a CDN or installing them locally. For specific guidance on integrating with frameworks like React, Vue, and Angular, refer to our dedicated pages.

## Dependencies

Reveal SDK Web Components are built as wrappers around existing jQuery-based components. To function correctly, you need to include the following dependencies:

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1.8.21/dayjs.min.js"></script>
<script src="https://dl.revealbi.io/reveal/libs/[var:sdkVersion]/infragistics.reveal.js"></script>
```

For more detailed information on installing the Reveal SDK, refer to the [official documentation](../web/install-client-sdk.md).

## CDN Installation

To quickly get started with Reveal SDK Web Components using a CDN, follow these steps:

### Add the Stylesheet

Include the stylesheet for the Reveal SDK theme in your HTML file:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@revealbi/ui/themes/light.css">
```

### Configuration

Configure the Reveal SDK settings by setting the `serverUrl` property. You can do this in a script block:

```html
<script type="module">
    import { RevealSdkSettings } from "https://cdn.jsdelivr.net/npm/@revealbi/ui";

    // Change to your Reveal SDK server URL
    RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
</script>
```

## NPM Installation

If you prefer local installation, you can install Reveal SDK Web Components via npm:

```bash npm2yarn
npm install @revealbi/ui
```

### Configuration

After installing, configure the `RevealSdkSettings.serverUrl` property in your JavaScript or TypeScript file:

```ts
import { RevealSdkSettings } from "@revealbi/ui";

// Change to your Reveal SDK server URL
RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
```

### Styling

Import the CSS for the Reveal SDK theme into your main stylesheet:

```css
@import "@revealbi/ui/themes/light.css";

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
```

By following these steps, you will have successfully integrated Reveal SDK Web Components into your project. Leverage the powerful data visualization capabilities of Reveal SDK to enhance your application. Explore more components and features to create a rich and interactive user experience.