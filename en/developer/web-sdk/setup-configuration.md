# Setup and Configuration

## Prerequisites

The Reveal Server SDK requires .NET Core 3.1 or newer.

## Setup and Configuration (Server)

To set up the Reveal Web Server SDK you need to:

1.  [**Install the Reveal SDK.**](#installing-reveal-sdk)

2.  [**Define a DashboardProvider.**](#defining-dashboardprovider)

3.  [**Initialize the Server SDK.**](#initializing-server-sdk)

4.  [**Enable server-side screenshot generation**](#server-side-image-export).

<a name='installing-reveal-sdk'></a>

### 1\. Installing the Reveal SDK

Run the Reveal Sdk installer on your machine to get assemblies and dependency packages ready.

Once the installation is completed, you can find a new NuGet package source added to your **nuget.config** called _Infragistics (Local)_ that points to “%public%\\Documents\\Infragistics\\NuGet”.

<img src="images/addingNugetPackage_web.png" alt="addingNugetPackage_web" class="responsive-img"/>

After ensuring you have the Infragistics (Local) feed properly configured by the installer, you need to:

- install the **Reveal.Sdk.Web.AspNetCore(.Trial)** NuGet package to your application project.
- add a NuGet package reference to System.Data.SQLite version 1.0.111+

> [!NOTE] >
    > The TRIAL nuget package is available on nuget.org: [**Reveal.Sdk.Web.AspNetCore.Trial**](https://www.nuget.org/packages/Reveal.Sdk.Web.AspNetCore.Trial/).


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
This approach gives you the flexibility to inject any other services you might be using into the implementation of the DashboarProvider and in other Reveal provider.
You are free to register the instance if you prefer so, just use the other overload AddDashboardProvider method. As shown below:
```csharp
builder.AddDashboardProvider(new DashboardProvider())
```

<a name='server-side-image-export'></a>

### 4\. Enabling server-side screenshot generation

In order to use the **export to image** functionality (either
programmatically or through user interaction), you need to perform the
steps below:

1.  Get the following three files from
    **\<InstallationDirectory\>\\SDK\\Web\\JS\\Server**:

    - package.json
    - packages-lock.json
    - screenshoteer.js

2.  Copy the files to the root level of your project (parent folder of
    "wwwroot").

3.  Make sure you have **npm** (the package manager for Node.js)
    installed.

If **you don’t need the export to image** functionality, you don’t need
to copy the files to your projects. However, when trying to build the
project, it will fail complaining that it cannot find **npm**.

To solve this error, add the following property to your project:

```xml
<PropertyGroup>
  <DisableRevealExportToImage>true</DisableRevealExportToImage>
</PropertyGroup>
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
- [Marker Clusterer](https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js) v3 or greater
- [Google Maps](https://maps.googleapis.com/maps/api/js?key=AIzaSyBpcuViSxzlScwOBZy5ln5iIvRl9TYn4y0&libraries=drawing,visualization) v3 or greater
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
> You could use the RevealApi prefix instead of the "$.ig." one, if you want.


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
