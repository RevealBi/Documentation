## List of Breaking Changes in Java v1.1.0

### Classes Removed

- **RVBaseUserContextProvider** - Classes extending from it should instead implement the `IRVUserContextProvider` interface or `RVContainerRequestAwareUserContextProvider`

- **RVBaseAuthenticationProvider** - Classes extending from it should instead implement the `IRVAuthenticationProvider` interface.

- **RVBaseDashboardAuthorizationProvider** - Classes extending from it should instead implement the `IRVDashboardAuthorizationProvider` interface.
s
- **RVBaseDataSourceProvider** - Classes extending from it should instead implement the `IRVDataSourceProvider` interface.

- **RVBaseDashboardProvider** - Classes extending from it should instead implement the `IRVDashboardProvider` interface.

- **RVBaseDataProvider** - Classes extending from it should instead implement the `IRVDataProvider` interface.


### Methods Removed

- **RVContainerRequestAwareUserContextProvider#getUserId(ContainerRequestContext requestContext)** - Extensions should instead implement `getUserContext(ContainerRequestContext requestContext)`

- **RevealEngineInitializer#Initialize(IRVAuthenticationProvider authProvider, IRVUserContextProvider userContextProvider, IRVDashboardProvider dashboardProvider, IRVDataSourceProvider dataSourceProvider, IRVDataProvider dataProvider)** - Use `initialize(InitializeParameter parameterObject)` instead.


### Interfaces with Changes

- `IRVAuthenticationProvider`, `IRVDashboardAuthorizationProvider`, `IRVDataSourceProvider`, `IRVDashboardProvider`, `IRVDataProvider`, `IRVAuthenticationResolver`.
All those interfaces changed the method signatures, they used to receive a user ID of type String parameter, but now they receive instead a `IRVUserContext` 'userContext' parameter.

- **IRVDataSourceProvider** - Previously,  `changeVisualizationDataSourceItem`  and  `changeDashboardFilterDataSourceItem`  had to be implemented. Those two were replaced by just one method, `changeDataSourceItem` (no distinction is made between datasource items used by dashboard filter vs used by visualizations).

### Reveal initialization changes

.`RevealEngineInitializer#Initialize(IRVAuthenticationProvider authProvider, IRVUserContextProvider userContextProvider, IRVDashboardProvider dashboardProvider, IRVDataSourceProvider dataSourceProvider, IRVDataProvider dataProvider)` was removed. You now need to use use `initialize(InitializeParameter parameterObject)` instead.

### Behavior changes

- All log categories emitted by RevealBi are now under "io.revealbi"

- RevealBi no longer returns java exception details in HTTP responses. Instead, a generic error message is shown, along with a correlation id that can be used to identify the exception details in the server log.

- **[JS Client]** the onVisualizationLinkingDashboard event was removed from the RevealView class in favor of `onLinkedDashboardProviderAsync` which serves the same purpose and is used when creating the dashboard link in the editor.