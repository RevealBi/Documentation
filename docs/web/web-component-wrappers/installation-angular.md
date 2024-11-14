import BetaWarning from './_beta-message.md'

# Installing Reveal SDK Web Component Wrappers in Angular

<BetaWarning />

Integrating the Reveal SDK Web Component Wrappers into your Angular application is straightforward and seamless. Follow these steps to get started:

## Installation

To add the Reveal SDK Web Components to your Angular app, install the required package from npm:

```bash npm2yarn
npm install reveal-sdk-wrappers reveal-sdk-wrappers-angular
```

## Module Setup

Import the `RevealViewComponent` to use it as a standalone component in your application. Add this import to your application's module:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
//highlight-next-line
import { RevealViewComponent } from 'reveal-sdk-wrappers-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    //highlight-next-line
    RevealViewComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Using Reveal SDK Web Components

Now you're ready to use the Reveal SDK Web Component Wrappers in your Angular application.

:::note
All components in the Reveal SDK Angular web component wrappers use the `rva` prefix. Ensure you use this prefix when adding components to your templates.
:::

### HTML

Add the Reveal SDK web component to your template:

```html
<rva-reveal-view [dashboard]="dashboard"></<rva-reveal-view>
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

With these steps, you've successfully integrated the Reveal SDK Web Component Wrappers into your Angular application. You can now take full advantage of Reveal's powerful data visualization capabilities in your projects. Explore more components and features to create a rich and interactive user experience.