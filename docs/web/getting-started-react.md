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

1 - Install the Reveal SDK npm package:

```bash
npm install reveal-sdk
```

2 - Open the `src/app.tsx` file and add the following import at the top:

```ts
import { RevealView, RevealSdkSettings } from "reveal-sdk";
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

2 - Within the `App()` function component, initialize the `revealView`.

```ts
useEffect(() => {
  //highlight-next-line
  var revealView = new RevealView("#revealView");
}, [])
```

This JavaScript code uses the `useEffect` hook to ensure our code is only called once. Next, we instantiate a new instance of the `RevealView` by creating a new `RevealView` and passing in the `#revealView` selector.

The final `app.tsx` file should look like this:

```ts title="src/app.tsx"
import { useEffect } from 'react';
import './App.css';
//highlight-next-line
import { RevealView, RevealSdkSettings } from "reveal-sdk";

function App() {
  
  useEffect(() => {
    //highlight-next-line
    var revealView = new RevealView("#revealView");
  }, [])

  return (
    //highlight-next-line
    <div id="revealView" style={{height: "100vh", width: "100%"}}></div>
  );
}

export default App;
```

:::caution

Clients apps must set the `RevealSdkSettings.setBaseUrl("url-to-server");` to the server address hosting the dashboards if the client is being hosting on a different URL.

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
