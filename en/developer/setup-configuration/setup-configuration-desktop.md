## Setup and Configuration

To set up the Reveal Desktop SDK you can choose between:

  - Using **NuGet** package manager.
  - Setting up the project **manually**.

### Using NuGet (Recommended)

The easiest way to setup your WPF or WinForms application project is to
install the **Reveal.Sdk.Wpf** NuGet package.

After installing the Reveal SDK, you should be able to find a new NuGet
package source added to your **nuget.config** called *Infragistics
(Local)* that points to “%public%\\Documents\\Infragistics\\NuGet”.

![addingNugetPackage\_desktop](images/addingNugetPackage_desktop.png)

After ensuring you have the Infragistics (Local) feed properly
configured by the installer, you can install the
**Reveal.Sdk.Wpf** NuGet package to your application
project.

By installing the NuGet package, you will also install the following
dependency packages:

  - CefSharp.Wpf (83.4.20+)
  - SkiaSharp (1.68.0+)
  - System.Data.SQLite.Core (1.0.108+)

To handle the **CefSharp.Wpf** known issue, follow this
[**link**](#cefsharp-fix).

> [!NOTE]
You will need to install Microsoft.Data.SqlClient (1.1.3) package to 
your project manually to be able to visualize Microsoft Sql Server data.

### Using Manual Setup

To setup your project manually you need to:

1.  Add references to the assemblies dropped by the installer at
    "\<InstallationDirectory\>\\SDK\\WPF\\Binaries".

2.  Install the following NuGet packages, which *RevealView* control
    depends on:
      - CefSharp.Wpf (83.4.20+)
      - SkiaSharp (1.68.0+)
      - System.Data.SQLite.Core (1.0.108+)
      - Microsoft.Data.SqlClient (1.1.3+)

To handle the CefSharp.Wpf known issue, please continue reading below.

<a name='cefsharp-fix'></a>
### Handling CefSharp Dependency Package

Your build (if targeting *AnyCPU*) **will be failing** after the
installation of the CefSharp dependency package.

> [!NOTE]
> **About the Error:** The error description will be: *“error :
CefSharp.Common will work out of the box if you specify platform (x86 /
x64).* For AnyCPU Support please follow this
[**link**](https://github.com/cefsharp/CefSharp/issues/1714).

**To fix this error**, you need to add the *CefSharpAnyCpuSupport*
property to your project file as explained in the error’s URL. Just add
the following property group to your application’s **.csproj** file:

``` xml
<PropertyGroup>

  <CefSharpAnyCpuSupport>true</CefSharpAnyCpuSupport>

</PropertyGroup>
```

This is all you need to do to fix the error. You don’t need to apply the other instructions pointed out in the CefSharp’s GitHub issue. Reveal component will make sure to initialize the *CefBrowser* class when needed.

At this point your project should be set up to display Reveal
dashboards.
