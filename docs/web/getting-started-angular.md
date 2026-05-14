# Getting Started with Reveal SDK for Angular

This walkthrough shows how to display a Reveal dashboard in an Angular application. Angular already uses a build pipeline, so the recommended approach is to install the Reveal SDK client from npm and import the SDK members directly in your component.

## Prerequisites

Before you start, make sure you have:

- Node.js and npm installed.
- The Angular CLI installed.
- A Reveal SDK server running with a dashboard named `Sales`.

The examples in this topic use `http://localhost:5111/` as the Reveal SDK server URL. Change this value to match your application.

## Step 1 - Create the Angular App

Create a new Angular application with the Angular CLI.

```bash
ng new getting-started --routing=false --style=css
```

Change into the new application folder.

```bash
cd getting-started
```

If you are adding Reveal SDK to an existing Angular application, you can skip this step.

## Step 2 - Install the Reveal SDK Client

Install the `reveal-sdk` package.

```bash npm2yarn
npm install reveal-sdk
```

You do not need to add any Reveal SDK script tags to `index.html`, and you do not need jQuery, Day.js, or Spectrum.

## Step 3 - Add the RevealView Host Element

Open `src/app/app.component.html`, remove the generated placeholder markup, and add an element for the Reveal view.

```html title="src/app/app.component.html"
<div #revealView class="reveal-view"></div>
```

The `#revealView` template reference gives the Angular component access to the DOM element where the dashboard will be rendered.

Next, open `src/app/app.component.css` and give the host element a visible size.

```css title="src/app/app.component.css"
:host {
    display: block;
    height: 100vh;
}

.reveal-view {
    width: 100%;
    height: 100%;
}
```

Reveal dashboards need a container with a height. In this example, the component fills the browser viewport.

## Step 4 - Create the RevealView

Open `src/app/app.component.ts` and import the Angular lifecycle members and the Reveal SDK members.

Use `ViewChild` to get the host element after Angular creates the view. Then, in `ngAfterViewInit`, configure the Reveal SDK server URL, load the `Sales` dashboard, create the `RevealView`, and assign the dashboard.

```ts title="src/app/app.component.ts"
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RevealSdkSettings, RevealView, RVDashboard } from 'reveal-sdk';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('revealView') revealViewElement!: ElementRef<HTMLElement>;

    private revealView?: RevealView;

    async ngAfterViewInit(): Promise<void> {
        RevealSdkSettings.setBaseUrl("http://localhost:5111/");

        const dashboard = await RVDashboard.loadDashboard("Sales");
        this.revealView = new RevealView(this.revealViewElement.nativeElement);
        this.revealView.dashboard = dashboard;
    }
}
```

Depending on your Angular version, the generated component may use `styleUrl` instead of `styleUrls`. You can keep the style metadata your project generated; the important parts are the Reveal SDK imports, the `ViewChild`, and the `ngAfterViewInit` code.

Call `RevealSdkSettings.setBaseUrl` when the Reveal SDK server is hosted at a different URL than the Angular application. If the client and server are hosted from the same origin, you can omit this call.

## Step 5 - Run the Application

Start the Angular development server.

```bash npm2yarn
npm start
```

Open `http://localhost:4200` in your browser. When the application loads, the Angular component creates a `RevealView`, loads the `Sales` dashboard from the Reveal SDK server, and renders it in the host element.

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/client/angular).

:::
