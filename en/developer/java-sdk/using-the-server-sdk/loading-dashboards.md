## Loading Dashboard Files

### Overview

There are two ways to open/save dashboards with the SDK:

  - **Server-side**: The client-side component of Reveal will use the server-side component to get the definition of a dashboard and also to get the data for each of the visualizations and filters defined.

    Please note that this is the easiest approach and the one recommended when you are first evaluating the SDK.

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

The *getDashboard* method receives the user and dashboard IDs, then you need to locate the dashboard (file system, database, etc.) where you choose to store them.
Finally, it is expected that you return an InputStream with the dashboard contents, in ".rdash" format (which is basically a ZIP file containing a JSON document).


For further details, you can refer to the UpMedia Samples implementation in [GitHub](https://github.com/RevealBi/sdk-samples-java) (*UpmediaDashboardProvider* in upmedia, upmedia-backend-tomcat and upmedia-backendspring)