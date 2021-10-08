# Setup and Configuration

## Prerequisites

The Reveal Server SDK requires .NET Core 3.1 or newer.

## Setup and Configuration (Server)

To set up the Reveal Web Server SDK you need to:

1.  [**Installing Reveal Sdk.**](#installing-reveal-sdk')

2.  [**Define the Server Context.**](#defining-server-context)

3.  [**Initialize the Server SDK.**](#initializing-server-sdk)

4.  [**Enable server-side screenshot generation**](#server-side-image-export).

<a name='installing-reveal-sdk'></a>

### 1\. Getting Assemblies and Dependency Packages ready

You need to run the Reveal Sdk installer on you r machine.


After that, you should be able to find a new NuGet
package source added to your **nuget.config** called _Infragistics
(Local)_ that points to “%public%\\Documents\\Infragistics\\NuGet”.

<img src="images/addingNugetPackage_web.png" alt="addingNugetPackage_web" class="responsive-img"/>

After ensuring you have the Infragistics (Local) feed properly
configured by the installer, you need to:

- install the **Reveal.Sdk.Web.AspNetCore(.Trial)** NuGet package
  to your application project.
- add a NuGet package reference to System.Data.SQLite version 1.0.111+

Trial nuget package is available on nuget.org - [**Reveal.Sdk.Web.AspNetCore.Trial**](https://www.nuget.org/packages/Reveal.Sdk.Web.AspNetCore.Trial/)

If you are having issues with the build, follow this
[**link**](#sqlite-fix).

<a name='defining-server-context'></a>

<a name='defining-server-context'></a>

### 2\. Defining а DashboardProvider

After installing hte nuget package, you need to create a class that
implements
**IRVDashboardProvider** interface. The class handles loading and saving dashboards.

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

The code above implements a simple file system based provider.
It accepts an argument in its constructor that should specify the directory that dashboards would get loaded/saved from/to.
Also it's forgiving in case you miss or don't want to specify file extension.

<a name='initializing-server-sdk'></a>

### 3\. Initializing the Server SDK

In the **Startup.cs**, in the **ConfigureServices** method of the
application you'll need to add to the services some of the AspNetCore services that returns an IMvcBuilder interface.
The most used ones are AddMvc, AddControllersWithViews and Add Controllers. So after you add one of these services
you need to call .AddReveal on top of it. AddReveal is an extension method extending IMvcBuilder.

AddReveal extension method is located in the Reveal.Sdk namespace so make sure you add a using for it in your Startup.cs.

AddReveal is your way to register reveal server component and provide settings to. Look at the snippet bellow
to see a basic call registering the DashboardProvider we defined in the previous step:

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

In the snippet above we're registering the DashboardProvider class.\
Also we specify LocalFileStoragePath - path for static data source files like Excel or CSV will be located and setting default caching locations to be used.

As you might have noted we're registering the type and not a particular instance. That's because the type will be registered in the AspNetCore Di container.
Which gives you the flexibility to inject any other services you might be using into the implementation of the DashboarProvider and in other Reveal provider.
You are free to register the instance if you prefer so - just us the other overload AddDashboardProvider method like:
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


<a name='reference-web-client-sdk'></a>

### 2\. Referencing the Web Client SDK

Enabling **\$.ig.RevealView** component in a web page requires several scripts to be included. These
scripts will be provided as part of Reveal Web Client SDK.

```html
<script src="~/Reveal/infragistics.reveal.js"></script>
```

JavaScript files can be found in
"\<InstallationDirectory\>\\SDK\\Web\\JS\\Client".

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
