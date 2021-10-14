## List of breaking changes in 1.1.0 and onwards

1. **[Dotnet Server]** Removed the RevealSdkContext(RevealSdkContextBase class and IRevealSdkContext interface) - the main purpose this was serving was only bundling a few services/providers needed by Reveal.
2. **[Dotnet Server]** Updated the registration and configuration of Reveal services in the Startup.cs class of your application.
   1. Previously you we're forced to register a concrete instance of the RevealSdkProvider - that meant you couldn't easily plug any existing ApsNetCore services you might have using the default Dependency Injection framework. Now after getting rid of the RevealSdkContext we provide a simple, fluent way to register your implementations of Reveal required services and register them as a type.
   2. Before version 1.1 you had to do two calls - AddRevealServices & AddReveal - now we make it only a single call
3. **[Dotnet Server]** Changed a little bit the Reveal.Sdk.Dashboard class constructor's overloads to make them more consistent. Now it has three constructor overloads that loads a dashboard in rdash format from stream, filepath or byte array. Loading from Json is available through a static method called FromJsonString. And now in 1.1 serialization methods of the Dashboard class are ToStreamAsync, ToByteArrayAsync, SaveToFileAsync for the rdash format and ToJsonStringAsync to save as Json string.
4. **[Dotnet Server, Wpf]** Changed the IRVDataSourceProvider interface so it won't be used only in the initial dashboard request from the customer as it was in previous version. Now it will be called any time a request for data is sent to the server. We also left a single ChangeDataSourceItemAsync to be implemented in the interface.
5. **[Dotnet Server]** Reveal.Sdk.Web.AspNetCore(.Trial) package does not support net462 & netcoreapp2.2 now and only netcoreapp3.1 and newer.
6. **[JS Client]** On the client side - onVisualizationLinkingDashboard event is removed, from RevealView class, in favor of onLinkedDashboardProviderAsync which serves the same purpose and is used during creating the dashboard link in the editor.

## How to upgrade your projects

1. Create a class implementing the Reveal.Sdk.IRVDashboardProvider - lets call it MyDashboardProvider. This new provider houses the GetDashboardAsync & SaveDashboardAsync. So you'll need to move the implementation of these methods here. Another change in these methods API is that both are using IRVUserContext interface instead of string userId and GetDashboardAsync now also gets userContext.
You could get more control of what gets passed as user context by creating an implementation of IRVUserContextProvider.

2. Go to your Startup.cs file and remove the services.AddRevealServices() call in ConfigureServices.
Change the .AddReveal call like the one bellow:
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
Now you should have your dashboard provider registered and also some settings.

3. Fix your IRVDataSourceProvider implementation.  Hopefully your project wasn't making much use of the two previous methods about visualization or filter since this distinction is not available in 1.1. Now you get the data source item that needs to be replaced - so you'll most probably need to move and adjust your ChangeDashboardFilterDataSourceItemAsync to become ChangeDataSourceItemAsync.
4. Fix your implementation of IRVAuthenticationProvider so it accepts IRVUserContext instead of string dashboardId.
5. In case you were using RVBaseUserContextProvider implementation you'll be getting an error that this base class is no longer available. So you need to implement the IRVUserContextProvider interface instead of the base class. This is responsible for creating an IRVUserContext implementation. We're providing a default implementation of the user context interface you could use - Reveal.Sdk.RVUserContext class.

6. Fix any usages of onVisualizationLinkingDashboard and replace them using onLinkedDashboardProviderAsync event on the reveal view. 
So you need to change:
```javascript
revealView.onVisualizationLinkingDashboard = function (title, url, callback) {
      callback(url);
};
```
to this:
```javascript
revealView.onLinkedDashboardProvider = (dashboardId => {
      return dashboardId;
})
```
