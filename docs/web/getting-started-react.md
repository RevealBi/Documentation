# Getting Started with Reveal SDK for React

This walkthrough shows how to display a Reveal dashboard in a React application. React applications already use a build pipeline, so the recommended approach is to install the Reveal SDK client from npm and import the SDK members directly in your component.

## Prerequisites

Before you start, make sure you have:

- Node.js and npm installed.
- A Reveal SDK server running with a dashboard named `Sales`.

The examples in this topic use `http://localhost:5111/` as the Reveal SDK server URL. Change this value to match your application.

## Step 1 - Create the React App

Create a new React application with Vite.

```bash
npm create vite@latest getting-started -- --template react-ts
```

Change into the new application folder and install the dependencies.

```bash
cd getting-started
npm install
```

If you are adding Reveal SDK to an existing React application, you can skip this step.

## Step 2 - Install the Reveal SDK Client

Install the `reveal-sdk` package.

```bash npm2yarn
npm install reveal-sdk
```

You do not need to add any Reveal SDK script tags to `index.html`, and you do not need jQuery, Day.js, or Spectrum.

## Step 3 - Add the RevealView Component

Open `src/App.tsx` and replace the generated code with the following component.

```tsx title="src/App.tsx"
import { useEffect, useRef } from "react";
import { RevealSdkSettings, RevealView, RVDashboard } from "reveal-sdk";
import "./App.css";

function App() {
    const revealViewElement = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (!revealViewElement.current || initialized.current) {
            return;
        }

        initialized.current = true;

        RevealSdkSettings.setBaseUrl("http://localhost:5111/");

        RVDashboard.loadDashboard("Sales").then(dashboard => {
            if (!revealViewElement.current) {
                return;
            }

            const revealView = new RevealView(revealViewElement.current);
            revealView.dashboard = dashboard;
        });
    }, []);

    return <div ref={revealViewElement} className="reveal-view" />;
}

export default App;
```

The `useRef` hook gives Reveal SDK access to the DOM element where the dashboard will be rendered. The `useEffect` hook runs after React renders the element, which is when it is safe to create the `RevealView`.

The `initialized` ref prevents the dashboard from being initialized more than once during React development rendering. This is useful when the application is running inside `React.StrictMode`.

Call `RevealSdkSettings.setBaseUrl` when the Reveal SDK server is hosted at a different URL than the React application. If the client and server are hosted from the same origin, you can omit this call.

## Step 4 - Size the RevealView

Open `src/App.css` and replace the generated styles with the following CSS.

```css title="src/App.css"
html,
body,
#root {
    width: 100%;
    height: 100%;
    margin: 0;
}

body {
    display: block;
}

.reveal-view {
    width: 100%;
    height: 100%;
}
```

Reveal dashboards need a container with a height. In this example, the React application and the Reveal view fill the browser window.

## Step 5 - Run the Application

Start the Vite development server.

```bash npm2yarn
npm run dev
```

Open the local URL shown in your terminal, usually `http://localhost:5173`. When the application loads, the React component creates a `RevealView`, loads the `Sales` dashboard from the Reveal SDK server, and renders it in the host element.

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/client/react).

:::
