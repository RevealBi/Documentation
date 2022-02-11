# Loading Dashboards

If you want to display an existing Reveal Dashboard in the `RevealView` control embedded within your application, you have four options to choose from.
- Load the dashboard from a file path
- Load the dashboard from a file stream
- Load the dashboard from an embedded resource
- Load the dashboard from json

Dashboards are located on the server. The client application will make a call to the `$.ig.RVDashboard.loadDashboard` method passing in the name of the dashboard to load. The request for the dashboard is sent to the server and the server will respond to the client with the requested dashboard. The client will take the dashboard provided in the server response, and set the `RevealView.dashboard` property.

You can create **.rdash** dashboard files the following ways:
- Export the dashboard as a .rdash file from the [Reveal BI website](https://app.revealbi.io/)
- Export the dashboard as a .rdash file from one of the native Reveal applications
- Save, or Export, a dashboard that was created in an application using the Reveal SDK.
- Download these [sample dashboards](https://github.com/RevealBi/sdk-samples-wpf/raw/master/SampleDashboards.zip)

## Load from File Path

By default, the Reveal SDK uses a convention to load dashboards from a file path. Specifically, the Reveal SDK will look for dashboards in a **Dashboards** folder on the server. You can learn how to create this folder in the [Setting Up the Server](getting-started-server.md#step-3---create-the-dashboards-folder) topic.

1 - In the ASP.NET Core Web Api server application, create a folder named **Dashboards** and place a dashboard file within the folder.

![](images/loading-dashboards-default-directory.jpg)

2 - In the client application, call the `$.ig.RevealSdkSettings.setBaseUrl` method and pass in your server URL. When debugging, the server URL will be `https://localhost` followed by a port number. For example:

```javascript
$.ig.RevealSdkSettings.setBaseUrl("https://localhost:/7111");   
```

> [!IMPORTANT]
> Calling the `$.ig.RevealSdkSettings.setBaseUrl` is required when the server is running on a different URL than the client application. If both the server application and the client application are running on the same URL, this method is not required. This method only needs to be called once.

3 - Make a call to the `$.ig.RVDashboard.loadDashboard` method and pass the name of the dashboard file without the .rdash extension. This method has a callback which will provide the dashboard being requested from the server. Once you have received the dashboard from the callback, get an instance of the `$.ig.RevealView` and set the `RevealView.dashboard` property to the dashboard in the response.

```javascript
$.ig.RVDashboard.loadDashboard("Sales", (dashboard) => {
    var revealView = new $.ig.RevealView("#revealView");
    revealView.dashboard = dashboard;
});
```

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/LoadingDashboards).

## Load from Custom File Path

If the default **Dashboards** file directory is not an option for your application, you can provide a custom file path in which to load the dashboards instead.

1 - In the ASP.NET Core Web API server application, create a new class that implements the `IRVDashboardProvider` interface. Add the logic to load dashboards from your custom file directory in the `GetDashboardAsync` method. In this example, the ASP.NET Core Web API server application uses a folder named **MyDashboardsFolder** to store all dashboards.

```cs
public class DashboardProvider : IRVDashboardProvider
{
    public Task<Dashboard> GetDashboardAsync(IRVUserContext userContext, string dashboardId)
    {
        var filePath = Path.Combine(Environment.CurrentDirectory, $"MyDashboardsFolder/{dashboardId}.rdash");
        var dashboard = new Dashboard(filePath);
        return Task.FromResult(dashboard);
    }

    public Task SaveDashboardAsync(IRVUserContext userContext, string dashboardId, Dashboard dashboard)
    {
        throw new NotImplementedException();
    }
}
```

2 - Update the `AddReveal` method in the `Program.cs` file to add the `IRVDashboardProvider` you just created to the `RevealSetupBuilder` using the `RevealSetupBuilder.AddDashboardProvider` method.

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddDashboardProvider<DashboardProvider>();
});
```

3 - In the client application, call the `$.ig.RevealSdkSettings.setBaseUrl` method and pass in your server URL. When debugging, the server URL will be `https://localhost` followed by a port number. For example:

```javascript
$.ig.RevealSdkSettings.setBaseUrl("https://localhost:/7111");   
```

> [!IMPORTANT]
> Calling the `$.ig.RevealSdkSettings.setBaseUrl` is required when the server is running on a different URL than the client application. If both the server application and the client application are running on the same URL, this method is not required. This method only needs to be called once.

4 - Make a call to the `$.ig.RVDashboard.loadDashboard` method and pass the name of the dashboard file without the .rdash extension. This method has a callback which will provide the dashboard being requested from the server. Once you have received the dashboard from the callback, get an instance of the `$.ig.RevealView` and set the `RevealView.dashboard` property to the dashboard in the response.

```javascript
$.ig.RVDashboard.loadDashboard("Sales", (dashboard) => {
    var revealView = new $.ig.RevealView("#revealView");
    revealView.dashboard = dashboard;
});
```

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/LoadingDashboards-File).

## Load from File Stream

Loading Reveal dashboards from a file stream is very similar to loading dashboards from a file path. In this case, once you have the file path of the dashboard file, you load it into a `FileStream` before creating the `Dashboard` object instance.

1 - In the ASP.NET Core Web API server application, create a new class that implements the `IRVDashboardProvider` interface. Add the logic to load dashboards from your custom file directory in the `GetDashboardAsync` method. In this example, we are using the `File.OpenRead` method to load the dashboard files into a file stream. We then create a new `Dashboard` object by passing the file stream as a constructor argument and return the newly created `Dashboard` instance.

```cs
public class DashboardProvider : IRVDashboardProvider
{
    public Task<Dashboard> GetDashboardAsync(IRVUserContext userContext, string dashboardId)
    {
        var filePath = Path.Combine(Environment.CurrentDirectory, $"Dashboards/{dashboardId}.rdash");
        using (var stream = File.OpenRead(filePath))
        {
            var dashboard = new Dashboard(stream);
            return Task.FromResult(dashboard);
        }
    }

    public Task SaveDashboardAsync(IRVUserContext userContext, string dashboardId, Dashboard dashboard)
    {
        throw new NotImplementedException();
    }
}
```

2 - Update the `AddReveal` method in the `Program.cs` file to add the `IRVDashboardProvider` you just created to the `RevealSetupBuilder` using the `RevealSetupBuilder.AddDashboardProvider` method.

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddDashboardProvider<DashboardProvider>();
});
```

3 - In the client application, call the `$.ig.RevealSdkSettings.setBaseUrl` method and pass in your server URL. When debugging, the server URL will be `https://localhost` followed by a port number. For example:

```javascript
$.ig.RevealSdkSettings.setBaseUrl("https://localhost:/7111");   
```

> [!IMPORTANT]
> Calling the `$.ig.RevealSdkSettings.setBaseUrl` is required when the server is running on a different URL than the client application. If both the server application and the client application are running on the same URL, this method is not required. This method only needs to be called once.

4 - Make a call to the `$.ig.RVDashboard.loadDashboard` method and pass the name of the dashboard file without the .rdash extension. This method has a callback which will provide the dashboard being requested from the server. Once you have received the dashboard from the callback, get an instance of the `$.ig.RevealView` and set the `RevealView.dashboard` property to the dashboard in the response.

```javascript
$.ig.RVDashboard.loadDashboard("Sales", (dashboard) => {
    var revealView = new $.ig.RevealView("#revealView");
    revealView.dashboard = dashboard;
});
```

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/LoadingDashboards-FileStream).

## Load from Resource

Another option for distributing files in an application is to embed them into your server application as a resource.

1 - To embed a Reveal dashboard **.rdash** file as a resource in your server application, open the Properties for the dashboard file in Visual Studio, and set the **Build Action** of the .rdash file to **EmbeddedResource**.

![](images/loading-dashboard-as-resource.jpg)

Once your dashboards have been defined as an **EmbeddedResource**, you can load the dashboard by using the `Assembly.GetManifestResourceStream` method. This method will return a `Stream` object that you can then use to create the `Dashboard` object. It's important to note, that the `name` of the resource you will provide in the `Assembly.GetManifestResourceStream` method must include the `namespace` and file name of the .rdash file.

2 - In the ASP.NET Core Web API server application, create a new class that implements the `IRVDashboardProvider` interface. Add the logic to load dashboards from the embedded resources in the `GetDashboardAsync` method. In this example, the name of the resource starts with the application root namespace **RevealSdk.Server**, plus **Dashboards** which is the directory that contains the dashboard files, followed by the name of the .rdash file which is built using the `dashboardId` parameter.

```cs
public class DashboardProvider : IRVDashboardProvider
{
    public Task<Dashboard> GetDashboardAsync(IRVUserContext userContext, string dashboardId)
    {
        var resource = Assembly.GetExecutingAssembly().GetManifestResourceStream($"RevealSdk.Server.Dashboards.{dashboardId}.rdash");
        using (resource)
        {
            var dashboard = new Dashboard(resource);
            return Task.FromResult(dashboard);
        }
    }

    public Task SaveDashboardAsync(IRVUserContext userContext, string dashboardId, Dashboard dashboard)
    {
        throw new NotImplementedException();
    }
}
```

3 - Update the `AddReveal` method in the `Program.cs` file to add the `IRVDashboardProvider` you just created to the `RevealSetupBuilder` using the `RevealSetupBuilder.AddDashboardProvider` method.

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddDashboardProvider<DashboardProvider>();
});
```

4 - In the client application, call the `$.ig.RevealSdkSettings.setBaseUrl` method and pass in your server URL. When debugging, the server URL will be `https://localhost` followed by a port number. For example:

```javascript
$.ig.RevealSdkSettings.setBaseUrl("https://localhost:/7111");   
```

> [!IMPORTANT]
> Calling the `$.ig.RevealSdkSettings.setBaseUrl` is required when the server is running on a different URL than the client application. If both the server application and the client application are running on the same URL, this method is not required. This method only needs to be called once.

5 - Make a call to the `$.ig.RVDashboard.loadDashboard` method and pass the name of the dashboard file without the .rdash extension. This method has a callback which will provide the dashboard being requested from the server. Once you have received the dashboard from the callback, get an instance of the `$.ig.RevealView` and set the `RevealView.dashboard` property to the dashboard in the response.

```javascript
$.ig.RVDashboard.loadDashboard("Sales", (dashboard) => {
    var revealView = new $.ig.RevealView("#revealView");
    revealView.dashboard = dashboard;
});
```

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/LoadingDashboards-Resource).

## Load From JSON

For advanced users, or users that serialize Reveal dashboards into .json files instead of .rdash files, you can load these JSON based files using the `Dashboard.LoadFromJsonAsync` method on the server application.

1 - In the ASP.NET Core Web API server application, create a new class that implements the `IRVDashboardProvider` interface. Add the logic to load dashboards from your json dashboard files in the `GetDashboardAsync` method. In this example, we are using the `File.ReadAllText` method to load the dashboard files into a JSON string. We then create a new `Dashboard` object by passing the JSON string as an argument to the `Dashboard.FromJsonString` method and return the newly created `Dashboard` instance.

```cs
public class DashboardProvider : IRVDashboardProvider
{
    public Task<Dashboard> GetDashboardAsync(IRVUserContext userContext, string dashboardId)
    {
        var filePath = Path.Combine(Environment.CurrentDirectory, $"Dashboards/{dashboardId}.json");
        var json = File.ReadAllText(filePath);
        var dashboard = Dashboard.FromJsonString(json);
        return Task.FromResult(dashboard);
    }

    public Task SaveDashboardAsync(IRVUserContext userContext, string dashboardId, Dashboard dashboard)
    {
        throw new NotImplementedException();
    }
}
```

> [!WARNING]
> Manipulating or changing the contents of a Reveal dashboard after it has been serialized to JSON can break the integrity of the dashboard and cause irreversible damage to the contents of the dashboard. This could result in runtime exceptions being thrown in your application due to errors and/or a failure to load the dashboard.

2 - Update the `AddReveal` method in the `Program.cs` file to add the `IRVDashboardProvider` you just created to the `RevealSetupBuilder` using the `RevealSetupBuilder.AddDashboardProvider` method.

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddDashboardProvider<DashboardProvider>();
});
```

3 - In the client application, call the `$.ig.RevealSdkSettings.setBaseUrl` method and pass in your server URL. When debugging, the server URL will be `https://localhost` followed by a port number. For example:

```javascript
$.ig.RevealSdkSettings.setBaseUrl("https://localhost:/7111");   
```

> [!IMPORTANT]
> Calling the `$.ig.RevealSdkSettings.setBaseUrl` is required when the server is running on a different URL than the client application. If both the server application and the client application are running on the same URL, this method is not required. This method only needs to be called once.

4 - Make a call to the `$.ig.RVDashboard.loadDashboard` method and pass the name of the dashboard file without the .rdash extension. This method has a callback which will provide the dashboard being requested from the server. Once you have received the dashboard from the callback, get an instance of the `$.ig.RevealView` and set the `RevealView.dashboard` property to the dashboard in the response.

```javascript
$.ig.RVDashboard.loadDashboard("Sales", (dashboard) => {
    var revealView = new $.ig.RevealView("#revealView");
    revealView.dashboard = dashboard;
});
```

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/LoadingDashboards-Json).
