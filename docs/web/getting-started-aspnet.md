# Getting Started with Reveal SDK for ASP.NET Core Web App

This walkthrough shows how to display a Reveal dashboard in an ASP.NET Core Razor Pages application. The ASP.NET Core app hosts the Reveal SDK server endpoints, and the Razor page loads the Reveal SDK client from an npm CDN provider using the ESM bundle.

## Prerequisites

Before you start, make sure you have:

- The .NET SDK installed.
- A Reveal dashboard file named `Sales.rdash`.

The examples in this topic use a single ASP.NET Core Web App for both the Razor page and the Reveal SDK server endpoints.

## Step 1 - Create the ASP.NET Core Web App

Create a new Razor Pages application.

```bash
dotnet new webapp -n GettingStarted
```

Change into the new application folder.

```bash
cd GettingStarted
```

If you are adding Reveal SDK to an existing ASP.NET Core Web App, you can skip this step.

## Step 2 - Add the Reveal SDK Server Package

Install the `Reveal.Sdk.AspNetCore` NuGet package.

```bash
dotnet add package Reveal.Sdk.AspNetCore
```

Open `Program.cs`, add the `Reveal.Sdk` namespace, and call `AddReveal` on the Razor Pages builder.

```cs title="Program.cs"
using Reveal.Sdk;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages().AddReveal();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapRazorPages();
app.Run();
```

`AddReveal` registers the Reveal SDK server functionality used by the client-side `RevealView`.

## Step 3 - Add a Dashboard

Create a folder named `Dashboards` in the project root and copy `Sales.rdash` into it.

```text
GettingStarted/
|-- Dashboards/
|   |-- Sales.rdash
|-- Pages/
|-- Program.cs
```

By default, the Reveal SDK loads dashboards from the `Dashboards` folder. The dashboard ID used by the client is the file name without the `.rdash` extension, so `Sales.rdash` is loaded as `Sales`.

## Step 4 - Add the RevealView to the Razor Page

Open `Pages/Index.cshtml` and replace the generated page content with the following markup.

```html title="Pages/Index.cshtml"
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<div id="revealView" style="height: 800px; width: 100%;"></div>

@section Scripts
{
    <script type="module">
        import { RevealView, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";

        RVDashboard.loadDashboard("Sales").then(dashboard => {
            const revealView = new RevealView("#revealView");
            revealView.dashboard = dashboard;
        });
    </script>
}
```

The `#revealView` element is the container where the dashboard is rendered. The module script imports the Reveal SDK client, loads the `Sales` dashboard from the ASP.NET Core app, creates a `RevealView`, and assigns the loaded dashboard to it.

Because the Razor page and Reveal SDK server endpoints are hosted by the same ASP.NET Core app, you do not need to call `RevealSdkSettings.setBaseUrl`.

If your Reveal SDK server is hosted by a different application or URL, import `RevealSdkSettings` and set the server URL before loading dashboards.

```js
import { RevealView, RevealSdkSettings, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";

RevealSdkSettings.setBaseUrl("http://localhost:5111/");
```

## Step 5 - Run the Application

Run the ASP.NET Core application.

```bash
dotnet run
```

Open the local URL shown in your terminal. When the page loads, the Reveal SDK client requests the `Sales` dashboard from the ASP.NET Core app and renders it inside the `RevealView`.

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/client/aspnet-webapp).

:::
