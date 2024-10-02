# Installing Reveal SDK Web Components in Angular

Integrating Reveal SDK Web Components into your Angular application is straightforward and seamless. Follow these steps to get started:

## Installation

To add the Reveal SDK Web Components to your Angular app, install the required package from npm:

```bash npm2yarn
npm install @revealbi/ui
```

After installation, import the components into your project:
```js
import "@revealbi/ui";
```

## Configuration

Call the `RevealSdkSettings.setBaseUrl` function and provide your Reveal API server.

```ts
import "@revealbi/ui";
// Change to your Reveal SDK server URL
$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
```

## Module Setup

Angular requires the `CUSTOM_ELEMENTS_SCHEMA` to recognize custom elements. Add this schema to your application's module:

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

## Using Reveal SDK Web Components

Now you're ready to use Reveal SDK Web Components in your Angular application.

### HTML

Add the Reveal SDK web component to your template:

```html
<rv-reveal-view [dashboard]="dashboard"></<rv-reveal-view>
```

### TypeScript

Control the dashboard to load from your component class:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dashboard: string = "Sales";
}
```

With these steps, you've successfully integrated Reveal SDK Web Components into your Angular application. You can now take full advantage of Reveal's powerful data visualization capabilities in your projects. Explore more components and features to create a rich and interactive user experience.