# Installing Reveal SDK Web Components in Angular

Integrating Reveal SDK Web Components into your Angular application is straightforward and seamless. Follow these steps to get started:

## Installation

To add the Reveal SDK Web Components to your Angular app, install the required package from npm:

```bash npm2yarn
npm install @revealbi/ui
```

## Configuration

Set the `RevealSdkSettings.serverUrl` property to point to your Reveal API server. A common place for this configuration is in the `main.ts` file:

```ts
import { RevealSdkSettings } from '@revealbi/ui';

RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
```

## Styling

Import the Reveal SDK theme in your application's main stylesheet. This ensures that your web components have the appropriate styling:

```css
@import "@revealbi/ui/themes/light.css";

html, body, #root {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
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

Now you're ready to use Reveal SDK Web Components in your Angular application. Here's an example of how to integrate a dialog component:

### HTML

Add the Reveal SDK web component to your template:

```html
<rv-dialog title="Example Dialog" [open]="isOpen">
  <h1>Dialog Content</h1>
</rv-dialog>
```

### TypeScript

Control the dialog's state from your component class:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpen: boolean = true;
}
```

With these steps, you've successfully integrated Reveal SDK Web Components into your Angular application. You can now take full advantage of Reveal's powerful data visualization capabilities in your projects. Explore more components and features to create a rich and interactive user experience.