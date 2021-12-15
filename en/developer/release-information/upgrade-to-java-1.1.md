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






## How to upgrade your projects (TO BE UPDATED WITH THE REAL EXAMPLE)

You no longer initialize Reveal using **RevealEngineInitializer.initialize**, now you use **initialize(InitializeParameter parameterObject)**.

The available parameters remain the same and can be used as shown in the example below:

``` java
RevealEngineInitializer.initialize(
    new InitializeParameterBuilder()
        .setAuthProvider(new RevealAuthenticationProvider())
        .setUserContextProvider(new RevealUserContextProvider())
        .setDashboardProvider(new RevealDashboardProvider())
        .setDataSourceProvider(new UpMediaDataSourceProvider())
        .setDataProvider(new UpMediaInMemoryDataProvider())
        .setMaxConcurrentImageRenderThreads(2)
        .setLicense("SERIAL_KEY_TO_BE_USED")
        .build());
```
Those parameters, are the **providers** used to customize Reveal, you’ll need to create your own providers when integrating Reveal into your application.

The available parameters are:
- *setAuthProvider*. Here you should include a custom class that resolves authentication, implementing IRVAuthenticationProvider.
- *setUserContextProvider*. Custom class that provides information about the user, implementing IRVUserContextProvider.
- *setDashboardProvider*. Custom class that replaces or modifies a dashboard, implementing IRVDashboardProvider.
- *setDataSourceProvider*. Custom class that replaces or modifies a data source, implementing IRVDataSourceProvider.
- *setDataProvider*. Custom class that returns in-memory data for dashboards, implementing IRVDataProvider.
- *setLicense*. Here you can configure the SDK license, by including the Serial Key.

For further details about how implement your own Dashboard providers, please check our [UpMedia samples](https://github.com/RevealBi/sdk-samples-java) in GitHub.