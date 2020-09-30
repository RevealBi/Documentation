## Setup and Configuration (Web)

### Prerequisites

The Reveal Server SDK requires .NET Core 2.2+ or .NET Framework 4.6.2
ASP MVC application projects.

In case you are targeting .NET Framework 4.6.2+, the Reveal Server SDK
supports a win7-x64 runtime environment. To debug your web project you
need to add a win7-x64 compatible _RuntimeIdentifier_ platform:

```xml
<PropertyGroup>

   <TargetFramework>net462</TargetFramework>

   <RuntimeIdentifier>win7-x64</RuntimeIdentifier>

</PropertyGroup>
```

### Setup and Configuration (Server)

To set up the Reveal Web Server SDK you need to:

1.  [**Add references to assemblies and install dependency packages.**](#getting-assemblies-dependencies)

2.  [**Define the Server Context.**](#defining-server-context)

3.  [**Initialize the Server SDK.**](#initializing-server-sdk)

4.  [**Enable server-side screenshot generation**](#server-side-image-export).

<a name='getting-assemblies-dependencies'></a>

#### 1\. Getting Assemblies and Dependency Packages ready

To add references to assemblies and install dependency packages we
recommend using **NuGet** package manager.
The easiest way to setup your project is installing
**Reveal.Sdk.Web.AspNetCore** (Trial) NuGet package.

After installing the Reveal SDK, you should be able to find a new NuGet
package source added to your **nuget.config** called _Infragistics
(Local)_ that points to “%public%\\Documents\\Infragistics\\NuGet”.

![addingNugetPackage_web](images/addingNugetPackage_web.png)

After ensuring you have the Infragistics (Local) feed properly
configured by the installer, you need to:

- install the **Reveal.Sdk.Web.AspNetCore** NuGet package
  to your application project.
- add a NuGet package reference to System.Data.SQLite version 1.0.111+

If you are having issues with the build, follow this
[**link**](#sqlite-fix).

<a name='defining-server-context'></a>

<a name='defining-server-context'></a>

#### 2\. Defining the Server Context

After referencing the required DLLs, you need to create a class that
implements the
**IRevealSdkContext**
interface. This interface allows the Reveal SDK to run inside of your
host application and provides callbacks for working with the SDK.

```csharp
using Infragistics.Sdk;
public class RevealSdkContext : IRevealSdkContext
{
    public IRVDataSourceProvider DataSourceProvider => null;

    public IRVDataProvider DataProvider => null;

    public IRVAuthenticationProvider AuthenticationProvider => null;

    public async Task<Stream> GetDashboardAsync(string dashboardId)
    {
        return await Task.Run(() =>
        {
            //load a .rdash file as a stream and return it
            var fileName = $"C:\\Temp\\{dashboardId}.rdash";
            return new FileStream(fileName, FileMode.Open, FileAccess.Read);
        });
    }

    //This callback is used only when “onSave” event is not installed on the
    //RevealView object client side. For more information see the web client SDK documentation
    public async Task SaveDashboardAsync(string userId, string dashboardId, Stream dashboardStream)
    {
        //Save edited dashboard here
        await Task.Run(() => { });
    }
}
```

The implementation above will load dashboards from “C:\\Temp” folder,
looking for a .rdash file that depends on the _dashboardId_ variable. In
your application, you may want to change this to load dashboards from
another directory, from the database, or even from an embedded resource.

> [!NOTE] > **Properties returning null:** The first three properties, _DataSourceProvider_, _DataProvider_, and _AuthenticationProvider_, are all implemented to return null. In this guide you can find information about how to implement each of the interfaces for these properties, so they will no longer be implemented to return null.

<a name='initializing-server-sdk'></a>

#### 3\. Initializing the Server SDK

In the **Startup.cs**, in the **ConfigureServices** method of the
application, call the services extension method _AddRevealServices_, passing in the
\_RevealEmbedSettings\_\_ class.

The _AddRevealServices_ extension method is defined in the
**Infragistics.Sdk**
namespace, so you will need to add a using directive. In addition, you
also need to set the **CachePath** property as shown below.

```csharp
services.AddRevealServices(new RevealEmbedSettings
{
    LocalFileStoragePath = @"C:\Temp\Reveal\DataSources",
    CachePath = @"C:\Temp"
}, new RevealSdkContext());
```

> [!NOTE] > **LocalFileStoragePath** is only required if you are using local Excel or CSV files as dashboard data source, and the
> _RevealSdkContext_ class implements _IRevealSdkContext_ as described before.

Finally, you need to add Reveal endpoints by calling the **AddReveal**
extension method when adding MVC service. Similar to the following code
snippet:

```csharp
services.AddMvc().AddReveal();
```

Like _AddRevealServices_, the _AddReveal_ method is defined in the
_Infragistics.Sdk_ namespace, so you need a using directive too.

<a name='server-side-image-export'></a>

#### 4\. Enabling server-side screenshot generation

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

#### Build Issues using NuGet

To handle a deployment issue related to **SQLite.Interop.dll**, custom
.targets file are used in the NuGet package.

If you are having build issues, you can disable this behavior by adding
the following property to your project:

```xml
<DisableSQLiteInteropFix>true</DisableSQLiteInteropFix>
```

### Setup and Configuration (Client)

To set up the Reveal Web Client SDK you need to:

1.  [**Check Dependencies**](#check-dependencies).

2.  [**Reference the Web Client SDK**](#reference-web-client-sdk).

3.  [**Instantiate the Web Client SDK**](#instantiate-web-client-sdk).

4.  _(Optional)_ [**Configure Support for React / Angular**](#web-component-support).

<a name='check-dependencies'></a>

#### 1\. Checking Dependencies

The Reveal Web Client SDK has the following 3rd party references:

- [jQuery](https://jquery.com) 2.2 or greater
- [Day.js](https://day.js.org) 1.8.15 or greater
- [Quill RTE](https://quilljs.com/) 1.3.6 or greater

<a name='reference-web-client-sdk'></a>

#### 2\. Referencing the Web Client SDK

Enabling **\$.ig.RevealView** component in a web page requires several scripts to be included. These
scripts will be provided as part of Reveal Web Client SDK.

```html
<script src="~/Reveal/infragistics.reveal.js"></script>
```

JavaScript files can be found in
"\<InstallationDirectory\>\\SDK\\Web\\JS\\Client".

<a name='instantiate-web-client-sdk'></a>

#### 3\. Instantiating the Web Client SDK

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

#### Sample Code

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

<a name='web-component-support'></a>

#### 4\. _(Optional)_ Configuring Support for React / Angular

On the front end, Reveal provides a Web Component that provides
compatibility with Angular and React.

The following snippet shows what you need to add on the client side:

```html
<script src="~/Reveal/reveal-webComponent.js"></script>
<section>
    <reveal-view dashboard-name="Sales" can-edit="" editing="" show-menu="" can-add-visualization=""</reveal-view>
</section>
```

Please note that the Web Component also requires other dependencies to be included (jQuery 2.2+ and Infragistics.reveal.js).

You can find the following two JS files at "\<InstallationDirectory\>\\Web\\JS":

- **reveal-webComponent.js**
- **reveal-WebComponent-ie11.js**
