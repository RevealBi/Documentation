# Loading Dashboard Files

## Overview

There are two ways to open/save dashboards with the SDK:

  - **Server-side**: First, you specify a dashboard ID in the client page. Second, on the server, using a callback method detailed below, you return the stream with the contents of the dashboard with the specified ID.

    Please note that this is the easiest approach and the one
    recommended when you are first evaluating the SDK.

  - **Client-side**: Here you have full control and more flexibility. You provide the stream with the contents of the dashboard on the client page, getting the contents from your own server.

    Using this approach you can, for example, check user permissions, display your own user interface to select the dashboard, or allow users to upload the ".rdash" file to use. For further details about the client-side approach, follow this [**Setup and Configuration(Client)**](~/en/developer/web-sdk/setup-configuration.html#setup-and-configuration-client).

## The Server-Side Approach

In order to visualize a dashboard, you can provide the SDK with an instance of a Dashboard class, which you could instantiate passing a stream to a rdash or json string representation of a rdash.

The code snippet below shows how to load a .rdash file that is added to the project as an embedded resource. Please note that this method is the implementation for __RevealSdkContextBase.GetDashboardAsync__.

## Code

``` csharp
public override Task<Dashboard> GetDashboardAsync(string dashboardId)
{
    var dashboardFileName = dashboardId + ".rdash";
    var resourceName = $"Demo1.Dashboards.{dashboardFileName}";
    var assembly = Assembly.GetExecutingAssembly();
    var rdashStream = assembly.GetManifestResourceStream(resourceName)
    var dashboard = new Dashboard(rdashStream);

    return Task.FromResult(dashboard);
}
```

This code for
__RevealSdkContextBase.GetDashboardAsync__
will be invoked on the server when you use **RVDashboard.loadDashboard** function on the client. And you will get the *dashboardId* that was specified client-side as the first parameter.
