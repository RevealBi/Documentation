## Loading Dashboard Files

### Overview

There are two ways to open/save dashboards with the SDK:

  - **Server-side**: First, you specify a dashboard ID in the client page. Second, on the server, using a callback method detailed below, you return the stream with the contents of the dashboard with the specified ID.

    Please note that this is the easiest approach and the one
    recommended when you are first evaluating the SDK.

  - **Client-side**: Here you have full control and more flexibility. You provide the stream with the contents of the dashboard on the client page, getting the contents from your own server.

    Using this approach you can, for example, check user permissions, display your own user interface to select the dashboard, or allow users to upload the ".rdash" file to use. For further details about the client-side approach, follow this [**Configuring the RevealView
    Object**](~/en/developer/web-sdk/using-the-client-sdk/configuring-revealview-client-web.md).

### The Server-Side Approach

In order to visualize a dashboard, you must provide the SDK with its .rdash file as a stream.

The code snippet below shows how to load a .rdash file that is added to the project as an embedded resource. Please note that this method is the implementation for __IRevealSdkContext.GetDashboardAsync__.

### Code

``` csharp
public Task<Stream> GetDashboardAsync(string dashboardId)
{
    var resourceName = $"Reveal.Sdk.Samples.Web.UpMedia.Dashboards.{dashboardId}";
    var assembly = Assembly.GetExecutingAssembly();
    return Task.FromResult(assembly.GetManifestResourceStream(resourceName));
 }
```

This code for
__IRevealSdkContext.GetDashboardAsync__
will be invoked on the server when you use **RevealUtility.loadDashboard** function on the client. And you will get the *dashboardId* that was specified client-side as the first parameter.
