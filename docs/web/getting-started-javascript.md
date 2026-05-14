# Getting Started with Reveal SDK for HTML/JavaScript

This walkthrough shows how to create a simple HTML page that displays a Reveal dashboard. It uses the Reveal SDK ESM bundle from an npm CDN provider, so you do not need a build step, bundler, or framework.

## Prerequisites

Before you start, make sure you have a Reveal SDK server running and a dashboard named `Sales` available on that server. The examples in this topic use `http://localhost:5111/` as the server URL. Change this value to match your application.

## Step 1 - Create an HTML Page

Create a file named `index.html` and add the following HTML. The `revealView` element is the container where the Reveal dashboard will be rendered.

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
</body>
</html>
```

The `RevealView` needs a visible height. In this example, the page and the `#revealView` element are set to fill the browser window.

## Step 2 - Import the Reveal SDK

Add a `<script type="module">` block before the closing `</body>` tag and import the SDK members you need from the ESM bundle.

```html
<script type="module">
    import { RevealView, RevealSdkSettings, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";
</script>
```

This example uses jsDelivr, but you can use another npm CDN provider or host the SDK files yourself.

## Step 3 - Configure the Server URL

Inside the module script, call `RevealSdkSettings.setBaseUrl` before loading dashboards. This tells the client where to send Reveal SDK server requests.

```js
RevealSdkSettings.setBaseUrl("http://localhost:5111/");
```

If your client application and Reveal SDK server are hosted from the same origin, you do not need to call `setBaseUrl`.

## Step 4 - Create the RevealView

Load the dashboard from the server, create a `RevealView`, and assign the dashboard to it.

```js
RVDashboard.loadDashboard("Sales").then(dashboard => {
    const revealView = new RevealView("#revealView");
    revealView.dashboard = dashboard;
});
```

The selector passed to `RevealView` must match the host element you added to the page.

## Complete Example

Your finished `index.html` should look like this:

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

## Step 5 - Run the Application

Serve the folder that contains `index.html` with any local static web server, and then open the page in your browser. Running the page from `localhost` is more predictable than opening the file directly because the browser is loading an ES module and making requests to the Reveal SDK server.

When the page loads, the Reveal SDK client requests the `Sales` dashboard from the Reveal SDK server and renders it inside the `RevealView`.

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/client/html).

:::
