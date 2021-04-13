## Loading Dashboard Files

### Overview

There are two ways to open/save dashboards with the SDK:

  - **Server-side**: The client-side component of Reveal will use the server-side component to get the definition of a dashboard and also to get the data for each of the visualizations and filters defined.

    Please note that this is the easiest approach and the one
    recommended when you are first evaluating the SDK.

  - **Client-side**: Here you have full control and more flexibility. You provide the stream with the contents of the dashboard on the client page, getting the contents from your own server.

    Using this approach you can, for example, check user permissions, display your own user interface to select the dashboard, or allow users to upload the ".rdash" file to use. For further details about the client-side approach, follow this [**Setup and Configuration(Client)**](~/en/developer/developer/web-sdk/setup-configuration.html#setup-and-configuration-client).

### The Server-Side Approach

First, you get from the client-side both the dashboard ID and also the ID of the user requesting the dashboard. Second, on the server, you get the definition of the dashboard and get the data for each of the visualization and filters defined.

How dashboards are stored (file system, database, etc.) and who can access them is not part of the SDK and you need to handle that yourself.


You need your own dashboard provider, implementing the interface IRVDashboardProvider:

```java
public interface IRVDashboardProvider {
    InputStream getDashboard(String userId, String dashboardId) throws IOException;
    void saveDashboard(String userId, String dashboardId, InputStream dashboardStream) throws IOException;
}
```

If you won't allow dashboards to be saved, you can leave the implementation for *saveDashboard* empty.

For further details about how implement your own Dashboard providers, please check our UpMedia samples in GitHub.


For further details, you can refer to the UpMedia Samples implementation for UpMedia samples
(UpmediaDashboardProvider in upmedia, upmedia-backend-tomcat and upmedia-backendspring).


In order to visualize a dashboard, you can provide the SDK with an instance of a Dashboard class, which you could instantiate passing a stream to a rdash or json string representation of a rdash.

The code snippet below shows how to load a .rdash file that is added to the project as an embedded resource. Please note that this method is the implementation for __RevealSdkContextBase.GetDashboardAsync__.

### Code

``` csharp
public override Task<Dashboard> GetDashboardAsync(string dashboardId)
{
    var dashboardFileName = dashboardId + ".rdash";
    var resourceName = $"Demo1.Dashboards.{dashboardFileName}";
    var assembly = Assembly.GetExecutingAssembly();
    var rdashStream = assembly.GetManifestResourceStream(resourceName)
    var dashboard = new Dashboard(assembly.GetManifestResourceStream(rdashStream));

    return Task.FromResult(dashboard);
}
```

This code for
__RevealSdkContextBase.GetDashboardAsync__
will be invoked on the server when you use **RVDashboard.loadDashboard** function on the client. And you will get the *dashboardId* that was specified client-side as the first parameter.
