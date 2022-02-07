# Getting Started with Reveal SDK for HTML/JavaScript

## Step 1 - Create an HTML File

1 - Open your favorite code editor and create a new HTML file and save the file with the name `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal Sdk - HTML/JavaScript</title>  
</head>
<body>

</body>
</html>
```

## Step 2 - Add Reveal JavaScript API

1 - Create a new folder called `assets` and then create another folder called `reveal` within the `assets` folder.

![](images/javascript-create-reveal-folder.jpg)

2 - Copy all the JavaScript files located at `%public%/Documents/Infragistics/Reveal/SDK/Web/JS/Client` into the `assets/reveal` folder you created previously.

![](images/javascript-copy-reveal-files.jpg)

3 - Modify the `index.html` file to include the `infragistics.reveal.js` script at the bottom of the page just before the closing `</body>` tag.

```html
<script src="./assets/reveal/infragistics.reveal.js"></script>
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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal Sdk - HTML/JavaScript</title> 
    
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">  

</head>
<body>

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>    
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>    
    <script src="./assets/reveal/infragistics.reveal.js"></script>   
</body>
</html>
```

## Step 3 - Initialize the Reveal view

1 - Modify the `index.html` file and add a new `<div>` tag after the opening `<body>` tag, and set the `id` to `revealView`.

```html
<div id="revealView" style="height: 920px; width: 100%;"></div>
```

2 - Add a JavaScript `Script` tag at the bottom of the `index.html` file and initialize the `revealView`.

```html
<script type="text/javascript">
    $.ig.RevealSdkSettings.ensureFontsLoadedAsync().then(() => {
        var revealView = new $.ig.RevealView("#revealView");
    });        
</script>
}
```

This JavaScript code first calls the `$.ig.RevealSdkSettings.ensureFontsLoadedAsync` to ensure that all fonts have been properly loaded. Next, we instantiate a new instance of the `RevealView` by creating a new `$.ig.RevealView` and passing in the `#revealView` selector.

The final `index.html` file should look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal Sdk - HTML/JavaScript</title> 
    
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">  

</head>
<body>
    <div id="revealView" style="height: 920px; width: 100%;"></div>

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>    
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>    
    <script src="./assets/reveal/infragistics.reveal.js"></script>   

    <script type="text/javascript">
        $.ig.RevealSdkSettings.ensureFontsLoadedAsync().then(() => {
            var revealView = new $.ig.RevealView("#revealView");
        });
    </script>
</body>
</html>
```

> [!IMPORTANT]
> Clients apps must set the `$.ig.RevealSdkSettings.setBaseUrl("url-to-server");` to the server address hosting the dashboards if the client is being hosting on a different URL.

## Step 4 - Run the Application

Double-click on the `index.html` file to launch the webpage in your default browser.

![](images/angular-app-running.jpg)

**Congratulations!** You have written your first Reveal SDK application.

Next Steps:
- [Create New Dashboards](creating-dashboards.md)
- [Load Existing Dashboards](loading-dashboards.md)

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted).
