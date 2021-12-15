## List of Breaking Changes in Java 1.1.0

### Classes Removed

- **RVBaseUserContextProvider** - Classes extending from it should instead implement the `IRVUserContextProvider` interface or `RVContainerRequestAwareUserContextProvider`

- **RVBaseAuthenticationProvider** - Classes extending from it should instead implement the `IRVAuthenticationProvider` interface.

- **RVBaseDashboardAuthorizationProvider** - Classes extending from it should instead implement the `IRVDashboardAuthorizationProvider` interface.

- **RVBaseDataSourceProvider** - Classes extending from it should instead implement the `IRVDataSourceProvider` interface.

- **RVBaseDashboardProvider** - Classes extending from it should instead implement the `IRVDashboardProvider` interface.

- **RVBaseDataProvider** - Classes extending from it should instead implement the `IRVDataProvider` interface.


### Method Removed

- **RVContainerRequestAwareUserContextProvider#getUserId(ContainerRequestContext requestContext)** - Extensions should instead implement `getUserContext(ContainerRequestContext requestContext)`


### Interfaces with Changes

- `IRVAuthenticationProvider`, `IRVDashboardAuthorizationProvider`, `IRVDataSourceProvider`, `IRVDashboardProvider`, `IRVDataProvider`, `IRVAuthenticationResolver`.
All those interfaces changed the method signatures, they used to receive a user ID of type String parameter, but now they receive instead a `IRVUserContext` 'userContext' parameter.

- **IRVDataSourceProvider** - Previously,  `changeVisualizationDataSourceItem`  and  `changeDashboardFilterDataSourceItem`  had to be implemented. Those two were replaced by just one method, `changeDataSourceItem` (no distinction is made between datasource items used by dashboard filter vs used by visualizations).

### Reveal initialization changes

.`RevealEngineInitializer#Initialize(IRVAuthenticationProvider authProvider, IRVUserContextProvider userContextProvider, IRVDashboardProvider dashboardProvider, IRVDataSourceProvider dataSourceProvider, IRVDataProvider dataProvider)` was removed. You now need to use use `initialize(InitializeParameter parameterObject)` instead.

### Behavior changes

- All log categories emitted by RevealBi are now under "io.revealbi"

- RevealBi no longer returns java exception details in http responses. Instead, a generic error message is shown, along with a correlation id that can be used to identify the exception details in the server log.






## How to upgrade your projects (TO BE REPLACED)

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
   return $.ig.RVDashboard.loadDashboardAsync(dashboardId);
})
```
