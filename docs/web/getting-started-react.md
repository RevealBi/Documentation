# Getting Started with Reveal SDK for React

## Step 1 - Create the React App

1 - Open your favorite terminal

![](images/getting-started-angular-terminal.jpg)

2 - Create a new React application using the "create-react-app" command

```bash
npx create-react-app getting-started --template typescript
```

3 - Change directories into the newly created app directory and open the project in your favorite Editor. In this example, we are using Visual Studio Code.

```bash
cd getting-started
code .
```

## Step 2 - Add Reveal JavaScript API

1 - Open and modify the `index.html` file to include the `infragistics.reveal.js` script at the bottom of the page just before the closing `</body>` tag.

```html
<script src="https://dl.revealbi.io/reveal/libs/1.3.1/infragistics.reveal.js"></script>
```

2 - Install the remaining Reveal JavaScript API dependencies:

- Jquery 2.2 or greater

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```
- Day.js 1.8.15 or greater

```html
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

- Quill RTE 1.3.6 or greater

```html
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">    
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
```

The final `index.html` files should look similar to this:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    //highlight-next-line
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">  
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
    //highlight-start
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
    <script src="https://dl.revealbi.io/reveal/libs/1.3.1/infragistics.reveal.js"></script>
    //highlight-end
  </body>
</html>
```

## Step 3 - Initialize the Reveal view

1 - Open and modify the `src/app.tsx` file. Delete all the contents within the `return` statement and add a new `<div>` tag and set the `id` to `revealView`.

```ts title="src/app.tsx"
function App() {
  return (
    //highlight-next-line
    <div id="revealView" style={{height: "100vh", width: "100%"}}></div>
  );
}
```

2 - First, we need to make sure that we can use jQuery by declaring a new variable named `$`, of type `any`, at the top of the file just under the import statements. This will make sure TypeScript will compile our JavaScript.

```ts
declare let $: any;
```

3 - Within the `App()` function component, initialize the `revealView`.

```ts
useEffect(() => {
  //highlight-next-line
  var revealView = new $.ig.RevealView("#revealView");
}, [])
```

This JavaScript code uses the `useEffect` hook to ensure our code is only called once. Next, we instantiate a new instance of the `RevealView` by creating a new `$.ig.RevealView` and passing in the `#revealView` selector.

The final `app.tsx` file should look like this:

```ts title="src/app.tsx"
import React, { useEffect } from 'react';
import './App.css';

//highlight-next-line
declare let $: any;

function App() {
  
  useEffect(() => {
    //highlight-next-line
    var revealView = new $.ig.RevealView("#revealView");
  }, [])

  return (
    //highlight-next-line
    <div id="revealView" style={{height: "100vh", width: "100%"}}></div>
  );
}

export default App;
```

:::caution

Clients apps must set the `$.ig.RevealSdkSettings.setBaseUrl("url-to-server");` to the server address hosting the dashboards if the client is being hosting on a different URL.

:::

## Step 4 - Run the Application

In the Visual Studio Code terminal, type the `npm start` command

```bash npm2yarn
npm start
```

![](images/angular-app-running.jpg)

**Congratulations!** You have written your first Reveal SDK React application.

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/client/react).

:::
