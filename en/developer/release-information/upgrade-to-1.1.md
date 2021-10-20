## List of breaking changes in 1.1.0 and onwards

1. **[Dotnet Server]** Removed the RevealSdkContext(RevealSdkContextBase class and IRevealSdkContext interface) - the main purpose this was serving was only bundling a few services/providers needed by Reveal.
2. **[Dotnet Server]** Updated the registration and configuration of Reveal services in the Startup.cs class of your application.
   1. Previously you we're forced to register a concrete instance of the RevealSdkProvider. That meant you couldn't easily plug any existing ApsNetCore services you might have, using the default Dependency Injection framework. Now, after getting rid of the RevealSdkContext, we provide a simple and more fluent way to register your implementations of Reveal required services and register them as a type.
   2. Before version 1.1 you had to do two calls - AddRevealServices & AddReveal - now we make it only a single AddReveal() call.
3. **[Dotnet Server]** Introduced small changes to the Reveal.Sdk.Dashboard class constructor's overloads to make them more consistent. Now there are three constructor overloads that load a dashboard in rdash format from stream, filepath or byte array. Loading from Json is available through a static method called FromJsonString. And now serialization methods of the Dashboard class are ToStreamAsync, ToByteArrayAsync, SaveToFileAsync for the rdash format and ToJsonStringAsync to save as Json string.
4. **[Dotnet Server, Wpf]** Changed the IRVDataSourceProvider interface, so it won't be used only in the initial dashboard request from the customer as it was in previous version. Now it will be called every time a request for data is sent to the server. There is also a single ChangeDataSourceItemAsync to be implemented in the interface.
5. **[Dotnet Server]** Reveal.Sdk.Web.AspNetCore(.Trial) package does not support .NET 4.6.2 & NET Core 2.2 any more, only NET Core 3.1 and newer.
6. **[JS Client]** On the client side - the onVisualizationLinkingDashboard event is removed from RevealView class, in favor of onLinkedDashboardProviderAsync which serves the same purpose and is used when creating the dashboard link in the editor.

## How to upgrade your projects

1. Create a class implementing the Reveal.Sdk.IRVDashboardProvider - in the code snippet below it's called MyDashboardProvider. This new provider houses the GetDashboardAsync & SaveDashboardAsync. So you'll need to move the implementation of these methods here. Another important changes in these API methods are that both are using IRVUserContext interface instead of string userId and GetDashboardAsync now also gets userContext.
In addition, you could get more control of what gets passed as user context by creating an implementation of IRVUserContextProvider.

2. Go to your Startup.cs file and remove the services.AddRevealServices() call in ConfigureServices.
Change the .AddReveal call as shown below:
```csharp
services
      .AddMvc()
      .AddReveal(builder => 
      {
         builder
            .AddDashboardProvider<MyDashboardProvider>()
            .AddSettings(s =>
            {
                  s.CachePath = s.DataCachePath = cacheFilePath;
                  s.LocalFileStoragePath = GetLocalFileStoragePath();
            });
      });
```
Now you should have your dashboard provider registered and also some settings included.

3. Fix your IRVDataSourceProvider implementation.  Hopefully your project wasn't making much use of the two previous methods about visualization or filtering since this distinction is not available in 1.1. Now you get the data source item that needs to be replaced - so you'll most likely need to move and adjust ChangeDashboardFilterDataSourceItemAsync to become ChangeDataSourceItemAsync.
4. Fix your implementation of IRVAuthenticationProvider so it accepts IRVUserContext instead of a string dashboardId.
5. In case you were using RVBaseUserContextProvider implementation you'll be getting an error that this base class is no longer available. So you need to implement the IRVUserContextProvider interface instead of the base class. This is responsible for creating an IRVUserContext implementation. There is a default implementation of the user context interface that you could use - Reveal.Sdk.RVUserContext class.

6. Replace any usage of onVisualizationLinkingDashboard by using onLinkedDashboardProviderAsync event on the reveal view. 
As an example, you need to change:
```javascript
revealView.onVisualizationLinkingDashboard = function (title, url, callback) {
      callback(url);
};
```
to:
```javascript
revealView.onLinkedDashboardProviderAsync = (dashboardId => {
      return dashboardId;
})
```
