import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installing Reveal SDK in Angular

## Step 1: Install the Package

<Tabs groupId="package-manager">
  <TabItem value="npm" label="npm" default>

```bash
npm install reveal-sdk
```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

```bash
yarn add reveal-sdk
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add reveal-sdk
```

  </TabItem>
  <TabItem value="bun" label="Bun">

```bash
bun add reveal-sdk
```

  </TabItem>
</Tabs>

## Step 2: Module Setup

No special Angular module is required. Simply import the Reveal SDK classes directly in your component.

If you are using Angular's strict template checking, you may want to add `CUSTOM_ELEMENTS_SCHEMA` to your module:

```ts title="src/app/app.module.ts"
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Step 3: Using the Reveal View

### HTML

Add a container element for the Reveal View in your component template:

```html title="src/app/app.component.html"
<div #revealView style="height: 100vh; width: 100%; position:relative;"></div>
```

### TypeScript

Import the Reveal SDK, set the server URL, and create a `RevealView` instance in the `ngAfterViewInit` lifecycle hook:

```ts title="src/app/app.component.ts"
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RevealView, RevealSdkSettings } from 'reveal-sdk';

RevealSdkSettings.setBaseUrl('http://localhost:5111');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('revealView') el!: ElementRef;

  ngAfterViewInit(): void {
    new RevealView(this.el.nativeElement);
  }

}
```

:::tip

The `RevealView` constructor accepts either a native DOM element or a CSS selector string. In Angular, using `@ViewChild` with `ElementRef` is the recommended approach to get a reference to the container element.

:::

## Step 4: Localization (Optional)

The Reveal SDK supports built-in locale bundles. To override the UI language, register a locale bundle and call `overrideLocale` before creating the `RevealView`.

The example below uses the standalone component approach to load the Japanese locale:

```ts title="src/app/app.component.ts"
import { AfterViewInit, Component } from '@angular/core';
import { BuiltInLocales, RevealSdkSettings, RevealView } from 'reveal-sdk';
import jaLocale from 'reveal-sdk/locales/RevealResourcesJa.json';

RevealSdkSettings.setBaseUrl('http://localhost:5111');

RevealSdkSettings.registerLocaleBundle(
  BuiltInLocales.Ja,
  () => Promise.resolve(jaLocale as any),
);

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<div id="revealView" style="height: 100vh; width: 100%; position: relative;"></div>`,
})
export class AppComponent implements AfterViewInit {
  async ngAfterViewInit(): Promise<void> {
    await RevealSdkSettings.overrideLocale(BuiltInLocales.Ja);
    new RevealView('#revealView');
  }
}
```

:::note

`registerLocaleBundle` must be called **before** `overrideLocale`. Call it at module level (outside the class) so it runs before the component is initialized.

:::
