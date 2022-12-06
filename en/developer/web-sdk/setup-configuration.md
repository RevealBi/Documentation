# Setup and Configuration

## Prerequisites

The Reveal Server SDK requires .NET Core 3.1 or newer.

## Setup and Configuration (Server)

To set up the Reveal Web Server SDK you need to:

1.  [**Install the Reveal SDK.**](#installing-reveal-sdk)

2.  [**Define a DashboardProvider.**](#defining-dashboardprovider)

3.  [**Initialize the Server SDK.**](#initializing-server-sdk)

4.  [**Set up server-side screenshot generation**](#server-side-image-export).

5.  [**Enable reveal logging**](#enable-reveal-logging)

<a name='installing-reveal-sdk'></a>

### 1\. Installing the Reveal SDK

- install the **Reveal.Sdk.AspNetCore** NuGet package to your application project.
- add a NuGet package reference to System.Data.SQLite version 1.0.111+

> [!NOTE] >
    > The nuget package is available on nuget.org: [**Reveal.Sdk.AspNetCore**](https://www.nuget.org/packages/Reveal.Sdk.AspNetCore/).


If you are having issues with the build, follow this [**link**](#sqlite-fix).

<a name='defining-dashboardprovider'></a>

### 2\. Defining а DashboardProvider

After installing the nuget package, you need to create a class that implements the **IRVDashboardProvider** interface. The class handles loading and saving dashboards.

```csharp
    using Reveal.Sdk;
    public class DashboardProvider : IRVDashboardProvider
    {
        private string _ext = ".rdash";
        readonly string _dashboardsDirectoryPath;

        public DashboardProvider(string dashboardsDirectoryPath = "Dashboards")
        {
            _dashboardsDirectoryPath = dashboardsDirectoryPath;
        }
        public Task<Dashboard> GetDashboardAsync(IRVUserContext userContext, string dashboardId)
        {
            var fileToLoad = Directory.EnumerateFiles(_dashboardsDirectoryPath)
                                        .Where(f => f == dashboardId || f == dashboardId + _ext)
                                        .FirstOrDefault(f => f.EndsWith(_ext));
            if (fileToLoad != null)
            {
                return Task.FromResult(new Dashboard(fileToLoad));
            }
            throw new ArgumentException($"No rdash file with name \"{dashboardId}\" was found in the dashboards folder:{_dashboardsDirectoryPath}.");
        }

        public Task SaveDashboardAsync(IRVUserContext userContext, string dashboardId, Dashboard dashboard)
        {
            string dashboardFileName = dashboardId.Contains(_ext) ? dashboardId : dashboardId + _ext;

            return dashboard.SaveToFileAsync(Path.Combine(_dashboardsDirectoryPath, dashboardFileName));
        }
    }
```

The code above implements a simple file system based provider. Basically, it accepts an argument in its constructor that specifies a directory in which dashboards are loaded from/saved to. The code is also forgiving in case you forgot or don't want to specify the file extension.

<a name='initializing-server-sdk'></a>

### 3\. Initializing the Server SDK

In **Startup.cs**, in the **ConfigureServices** method of the application, you need to add one or more AspNetCore services that return an IMvcBuilder interface.
The most used services are AddMvc, AddControllersWithViews and Add Controllers. After you add one of these, you need to call *.AddReveal* on top of it. **AddReveal** is an extension method used to extend IMvcBuilder.


> [!NOTE] >
    > AddReveal extension method is located in the Reveal.Sdk namespace so must add a using for it in your Startup.cs.

With **AddReveal** you can register reveal server component and also provide settings. In the code snippet below you can see a basic call registering the DashboardProvider class that was defined in the previous step:

```csharp
services
    .AddMvc()
        .AddReveal(builder =>
        {
            builder
              .AddDashboardProvider<AddDashboardProvider>()
              .AddSettings(settings =>
              {
                  settings.LocalFileStoragePath = "Data";
                  settings.DataCachePath = settings.CachePath = @"C:\Temp\Reveal\Cache";
              });
        });
```

Besides registering the DashboardProvider class, the LocalFileStoragePath was also specified.
This is the path where static data source files like Excel or CSV will be located, and the default setting for caching locations to be used.

Please note that you need to register the type and not a particular instance. That's because the type will be registered in the AspNetCore Di container.
This approach gives you the flexibility to inject any other services you might be using into the implementation of the DashboardProvider and in other Reveal provider.
You are free to register the instance if you prefer so, just use the other overload AddDashboardProvider method. As shown below:
```csharp
builder.AddDashboardProvider(new DashboardProvider())
```

<a name='server-side-image-export'></a>

### 4\. Set up server-side screenshot generation

In order to use the export to **image**, **PDF** or **PowerPoint** functionality (either
programmatically or through user interaction) dotnet server SDK uses [**Playwright**](https://playwright.dev/dotnet/) internally.

By default, the first time an user tries to export a dashboard to image, PDF or PowerPoint,
Playwright would try to download Chromium browser to it's default location for the current platform.
For windows the default path is **%userprofile%\AppData\Local\ms-playwright\**. The Chromium executables it downloads size ~220 Megabytes.

This download could take some time and cause delay for the first user that tries to export a dashboard. This is ok during development time but not so much when you deploy to staging or a production environment. For these scenarios you could use some of the settings below to see how you could fine tune your deployment.

These settings are exposed through the <a href="/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html" target="_blank" rel="noopener\">RevealEmbedSettings Export</a> property.
- <a href="/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_ExportConfiguration_CreateChromiumInstancesOnDemand" target="_blank" rel="noopener\">CreateChromiumInstancesOnDemand</a> - set this to false to force Playwright initialization to happen on app startup
- <a href="/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_ChromiumDownloadFolder" target="_blank" rel="noopener\">ChromiumDownloadFolder</a> - provide the location where the Chromium executables would get downloaded
- <a href="/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_ChromiumExecutablePath" target="_blank" rel="noopener\">ChromiumExecutablePath</a> ChromiumExecutablePath - you might want to manually deploy the Chromium executables for your server platform. Set this path to the location where you've deployed Chromium executables.
- <a href="/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_MaxConcurrentExportingThreads" target="_blank" rel="noopener\">MaxConcurrentExportingThreads</a> - you could specify how many concurrent threads supporting export functionality should be used
- <a href="/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_ExportingTimeout" target="_blank" rel="noopener\">ExportingTimeout</a> - defines the timeout period in milliseconds for an export operation. Default value is 30000 ms. When an end user tries to export a dashboard this if does no finish in the specified time period the export operation would fail. Increasing the number of concurrent threads might help in such a case.

In case you want to use the ChromiumExecutablePath and set up the browsers manually on your environment you will need get the Chromium executables using the [**Playwright Cli**](https://playwright.dev/dotnet/docs/cli) like:
```cmd
dotnet tool install --global Microsoft.Playwright.CLI
playwright install chromium
```

**Note:** Prior to version <b>1.1.2</b> the SDK used puppeteer & nodejs for the export functionality.
You had to add package.json & screenshoteer.js files to the root of your project and for the export to work.
With version 1.1.2 release this is no longer necessary as well as you don't need to have nodejs installed on your dev/prod environments.

<a name='enable-reveal-logging'></a>

### 5\. Enable Reveal logging

You could enable reveal logging by adding a "Reveal.Sdk" key in you're appsettings.json and set its log level like
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information",
      "Reveal.Sdk": "Debug"
    }
  },
  "AllowedHosts": "*"
}
```

<a name='sqlite-fix'></a>

### Build Issues using NuGet

To handle a deployment issue related to **SQLite.Interop.dll**, custom
.targets file are used in the NuGet package.

If you are having build issues, you can disable this behavior by adding
the following property to your project:

```xml
<DisableSQLiteInteropFix>true</DisableSQLiteInteropFix>
```

## Setup and Configuration (Client)

To set up the Reveal Web Client SDK you need to:

1.  [**Check Dependencies**](#check-dependencies).

2.  [**Reference the Web Client SDK**](#reference-web-client-sdk).

3.  [**Instantiate the Web Client SDK**](#instantiate-web-client-sdk).


<a name='check-dependencies'></a>

### 1\. Checking Dependencies

The Reveal Web Client SDK has the following 3rd party references:

- [jQuery](https://jquery.com) 2.2 or greater
- [Day.js](https://day.js.org) 1.8.15 or greater
- [Quill RTE](https://quilljs.com/) 1.3.6 or greater
- *(Optional)* [Spectrum](https://github.com/bgrins/spectrum) v 1.8.0 or newer - this is only needed if you enable the UI for the end user to set the background color for a particular visualization.
Check [canChangeVisualizationBackgroundColor](~/en/developer/web-sdk/using-the-client-sdk/showing-hiding-elements.html#canChangeVisualizationBackgroundColor)  


<a name='reference-web-client-sdk'></a>

### 2\. Referencing the Web Client SDK

Enabling **RevealView** component in a web page requires several scripts to be included. These
scripts will be provided as part of Reveal Web Client SDK.

```html
<script src="~/Reveal/infragistics.reveal.js"></script>
```

JavaScript files can be found in
"\<InstallationDirectory\>\\SDK\\Web\\JS\\Client".
Default installation directory is:
```cmd
"%public%\\Documents\\Infragistics"
```

> [!NOTE] **Referencing Reveal JS classes**
> You could reference the JS classes through **$.ig.** or **RevealApi.**.
> Through out the docs we're using "$.ig." prefix to reference classes.
> You could use the RevealApi prefix instead of the "$.ig." one, if you want. Using **RevealApi** prefix could be better if you're using typescript since you should be able to drop the type definitions(beta) infragistics.reveal.d.ts in your project.


<a name='instantiate-web-client-sdk'></a>

### 3\. Instantiating the Web Client SDK

Reveal’s Dashboard presentation is handled natively through the Web
Client SDK.

To get started follow these steps:

1.  Define a \<div /\> element with “id” and invoke the
    **\$.ig.RevealView** constructor.

    > [!NOTE] > **Hosting Client-Side and Server-Side Parts Separately**
    > If you want to host client-side and server-side parts on different servers, please read [here](~/en/developer/web-sdk/overview.html#host-client-server-separate) **before** you continue to next step.

2.  Call
    **\$.ig.RVDashboard.loadDashboard**
    providing the _dashboardId_ and success and error handlers.

3.  In the success handler instantiate the
    **\$.ig.RevealView** component
    by passing a selector for the DOM element
    where the dashboard should be rendered into. Finally
    you should use the retrieved dashboard and set it to the dashboard property of the
    **\$.ig.RevealView**

### Sample Code

```html
<!DOCTYPE html>
<html>
  <head>
    ⋮
    <script type="text/javascript">
      var dashboardId = "dashboardId";

      $.ig.RVDashboard.loadDashboard(
        dashboardId,
        function (dashboard) {
          var revealView = new $.ig.RevealView("#revealView");
          revealView.dashboard = dashboard;
        },
        function (error) {
          //Process any error that might occur here
        }
      );
    </script>
  </head>
  <body>
    <div id="revealView" style="height:500px;" />
  </body>
</html>
```
