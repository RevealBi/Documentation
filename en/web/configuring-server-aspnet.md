# Configuring an ASP.NET Core Server

## Install

The steps below describe how to install the Reveal SDK into an existing ASP.NET Core project.

1 - Right click the Solution, or Project, and select **Manage NuGet Packages** for Solution.

![](images/getting-started-nuget-packages-manage.jpg)

2 - In the package manager dialog, open the **Browse** tab, select the **Infragistics (Local)** package source, and install the **Reveal.Sdk.Web.AspNetCore** NuGet package into the project.

![](images/getting-started-nuget-packages-install.jpg)

> [!NOTE]
> If you are a trial user, you can install the **Reveal.Sdk.Web.AspNetCore.Trial** NuGet package found on [NuGet.org](https://www.nuget.org/packages/Reveal.Sdk.Web.AspNetCore.Trial/).

3 - Open and modify the `Program.cs` file to add the namespace `using Reveal.Sdk;`. Then, add the call to `IMcvBuilder.AddReveal()` to the existing `builder.Services.AddControllers()` method as follows:

```
using Reveal.Sdk;

builder.Services.AddControllers().AddReveal();
```

4 - Right-click the project and select **Add -> New Folder**. The folder MUST be named **Dashboards** .

![](images/setting-up-server-create-dashboards-folder.jpg)

By default, the Reveal SDK uses a convention that will load all dashboards from the **Dashboards** folder. You can change this convention by creating a custom `IRVDashboardProvider`. You can learn more about this in the [Loading Dashboards](loading-dashboards.md) topic.

## Export

In order to export dashboards to **Image**, **PDF** or **PowerPoint** (either programmatically or through user interaction) the Reveal SDK uses [Playwright](https://playwright.dev/dotnet/) internally.

By default, the first time an end-user tries to export a dashboard to an image, PDF or PowerPoint, Playwright will try to download the Chromium browser to the server in the default location for the current platform. For Windows, the default path is **%userprofile%/AppData/Local/ms-playwright**.

This download may take some time to complete and cause a delay for the first end-user that tries to export a dashboard. This is ok during development, but may not be desirable in a production environment. For these scenarios you can use the settings below to fine tune the Export behavior.

These settings are exposed through the `RevealEmbedSettings.Export` property.
- <a href="/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_ExportConfiguration_CreateChromiumInstancesOnDemand" target="_blank" rel="noopener\">CreateChromiumInstancesOnDemand</a> - set this to false to force Playwright initialization to happen on app startup
- <a href="/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_ChromiumDownloadFolder" target="_blank" rel="noopener\">ChromiumDownloadFolder</a> - the path where the Chromium executables will be downloaded
- <a href="/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_ChromiumExecutablePath" target="_blank" rel="noopener\">ChromiumExecutablePath</a> - the path where the Chromium executables have been preinstalled on the server.
- <a href="/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_MaxConcurrentExportingThreads" target="_blank" rel="noopener\">MaxConcurrentExportingThreads</a> - the number of max concurrent threads used for exporting
- <a href="/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_ExportingTimeout" target="_blank" rel="noopener\">ExportingTimeout</a> - the timeout period, in milliseconds, for an export operation. Default value is 30000 ms. If an export operation does not finish within the specified timeout period, the export operation will fail.

To manually install Playwright and Chromium on the server, use the [Playwright CLI](https://playwright.dev/dotnet/docs/cli):

<pre style="background:#141414;color:white;display:inline-block;padding:16x;margin-top:10px;font-family:'Consolas';border-radius:5px;width:100%">
> dotnet tool install --global Microsoft.Playwright.CLI
> playwright install chromium
</pre>

## Logging
To enable logging for the Reveal SDK, add a `"Reveal.Sdk": "Debug"` entry into the appsettings.json file.
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
  ...
}
```
