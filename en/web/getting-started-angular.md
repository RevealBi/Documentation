# Getting Started with Reveal SDK for Angular

## Step 1 - Create the Angular App

1 - Open your favorite terminal

![](images/getting-started-angular-terminal.jpg)

2 - Create a new Angular application using the Angular CLI

<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> ng new getting-started
</pre>

3 - Change directories into the newly created app directory and open the project in your favorite Editor. In this example, we are using Visual Studio Code.

<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> cd getting-started
> code .
</pre>

## Step 2 - Add Reveal JavaScript API

1 - Create a new folder called `reveal` under the `assets` folder.

![](images/angular-create-reveal-folder.jpg)

2 - Copy all the JavaScript files located at `%public%/Documents/Infragistics/Reveal/SDK/Web/JS/Client` into the `assets/reveal` folder you created previously.

![](images/angular-copy-reveal-files.jpg)

3 - Open and modify the `index.html` file to include the `infragistics.reveal.js` script at the bottom of the page just before the closing `</body>` tag.

```html
<script src="assets/reveal/infragistics.reveal.js"></script>
```

4 - Install the remaining Reveal JavaScript API dependencies:

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

- Spectrum v 1.8.0 or newer (Optional) - this is only needed if you enable the UI for the end user to set the background color for a particular visualization.

``` html
<link href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css" rel="stylesheet" type="text/css" >
<script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>
```

The final `index.html` files should look similar to this:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>GettingStarted</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">    
</head>
<body>
  <app-root></app-root>

  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
  <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
  <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
  <script src="assets/reveal/infragistics.reveal.js"></script>
</body>
</html>
```

## Step 3 - Initialize the Reveal view

1 - Open and modify the `src/app/app.component.html` file. Delete all the contents of the file and add a new `<div>` tag and set the reference to `revealView`.

```html
<div #revealView style="height: 100vh; width: 100%; position:relative;"></div>
```

2 - Open and modify the `src/app/app.component.ts` file.  First, we need to make sure that we can use jQuery by declaring a new variable named `$`, of type `any`, at the top of the file just under the import statements. This will make sure TypeScript will compile our JavaScript.

```ts
declare let $: any;
```

Next, we need access to the `revalView` that we defined in HTML as a `ViewChild`. Add a property to hold this reference.

```ts
export class AppComponent {
  
  @ViewChild('revealView') el!: ElementRef;
  
}
```

Now, we need to implement the `AfterViewInit` interface on our component.

```ts
export class AppComponent implements AfterViewInit {
  
  @ViewChild('revealView') el!: ElementRef;

  ngAfterViewInit(): void {

  }
  
}
```

Once that is complete, we can now initialize the `RevealView`.

```ts
export class AppComponent implements AfterViewInit {
  
  @ViewChild('revealView') el!: ElementRef;

  ngAfterViewInit(): void {
    $.ig.RevealSdkSettings.ensureFontsLoadedAsync().then(() => {
      var revealView = new $.ig.RevealView(this.el.nativeElement);
    }); 
  }
  
}
```

This code first calls the `$.ig.RevealSdkSettings.ensureFontsLoadedAsync` to ensure that all fonts have been properly loaded. Next, we instantiate a new instance of the `RevealView` by creating a new `$.ig.RevealView` and passing in the `revealView` element that has been stored in the `ViewChild` property.

The final `app.component.ts` file should look like this:

```ts
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  @ViewChild('revealView') el!: ElementRef;

  ngAfterViewInit(): void {
    $.ig.RevealSdkSettings.ensureFontsLoadedAsync().then(() => {
      var revealView = new $.ig.RevealView(this.el.nativeElement);
    }); 
  }
  
}
```

> [!IMPORTANT]
> Clients apps must set the `$.ig.RevealSdkSettings.setBaseUrl("url-to-server");` to the server address hosting the dashboards if the client is being hosting on a different URL.

## Step 4 - Run the Application

In the Visual Studio Code terminal, type the `npm start` command

<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> npm start
</pre>

![](images/angular-app-running.jpg)

**Congratulations!** You have written your first Reveal SDK Angular application.

Next Steps:
- [Create New Dashboards](creating-dashboards.md)
- [Load Existing Dashboards](loading-dashboards.md)

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-angular/tree/main/01-GettingStarted).
