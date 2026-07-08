---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cube Data Source

## Introduction

Cube is a semantic layer for analytics APIs and data applications that helps teams define metrics once and serve them consistently across dashboards and applications. This topic explains how to connect Cube data sources in your Reveal application to visualize and analyze your data.

:::important Prerequisites
Before configuring the Cube data source in Reveal, make sure you have the following:
- A reachable Cube REST API endpoint, such as `https://your-cube-host/cubejs-api/v1`
- At least one published cube model that Reveal users can query
- A bearer token strategy, such as JWT, if your Cube deployment requires authentication
:::

## Server Configuration

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

**Step 1** - Install the Reveal Cube connector package.

For ASP.NET applications, you need to install a separate NuGet package to enable Cube support:

```bash
dotnet add package Reveal.Sdk.Data.Cube
```

**Step 2** - Register the Cube data source in your application.

```csharp
builder.Services.AddControllers().AddReveal(builder =>
{
    builder.DataSources.RegisterCube();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the Cube data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

For Node.js TypeScript applications, the Cube data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="java" label="Java">

For Java applications, the Cube data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
</Tabs>

### Connection Configuration

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
// Create a data source provider
public class DataSourceProvider : IRVDataSourceProvider
{
    public async Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
        // Required: Update the underlying data source
        await ChangeDataSourceAsync(userContext, dataSourceItem.DataSource);

        if (dataSourceItem is RVCubeDataSourceItem cubeItem)
        {            
            // Configure specific item properties if needed
            if (cubeItem.Id == "cube_orders")
            {
                cubeItem.Cube = "orders";
            }
        }

        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVCubeDataSource cubeDataSource)
        {
            // Configure connection properties
            cubeDataSource.Url = "https://your-cube-host/cubejs-api/v1";
        }

        return Task.FromResult(dataSource);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
// Create data source providers
const dataSourceItemProvider = async (userContext, dataSourceItem) => {
    // Required: Update the underlying data source
    await dataSourceProvider(userContext, dataSourceItem.dataSource);

    if (dataSourceItem instanceof reveal.RVCubeDataSourceItem) {
        // Configure specific item properties if needed
        if (dataSourceItem.id === "cube_orders") {
            dataSourceItem.cube = "orders";
        }
    }

    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVCubeDataSource) {
        // Configure connection properties
        dataSource.url = "https://your-cube-host/cubejs-api/v1";
    }

    return dataSource;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```typescript
// Create data source providers
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    // Required: Update the underlying data source
    await dataSourceProvider(userContext, dataSourceItem.dataSource);

    if (dataSourceItem instanceof RVCubeDataSourceItem) {
        // Configure specific item properties if needed
        if (dataSourceItem.id === "cube_orders") {
            dataSourceItem.cube = "orders";
        }
    }

    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVCubeDataSource) {
        // Configure connection properties
        dataSource.url = "https://your-cube-host/cubejs-api/v1";
    }

    return dataSource;
}
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
// Create a data source provider
public class DataSourceProvider implements IRVDataSourceProvider {

    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardId, RVDataSourceItem dataSourceItem) {
        // Required: Update the underlying data source
        changeDataSource(userContext, dataSourceItem.getDataSource());

        if (dataSourceItem instanceof RVCubeDataSourceItem cubeItem) {            
            // Configure specific item properties if needed
            if ("cube_orders".equals(cubeItem.getId())) {
                cubeItem.setCube("orders");
            }
        }

        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVCubeDataSource cubeDataSource) {
            // Configure connection properties
            cubeDataSource.setUrl("https://your-cube-host/cubejs-api/v1");
        }

        return dataSource;
    }
}
```

  </TabItem>
</Tabs>

:::danger Important
Any changes made to the data source in the `ChangeDataSourceAsync` method are not carried over into the `ChangeDataSourceItemAsync` method. You **must** update the data source properties in both methods. We recommend calling the `ChangeDataSourceAsync` method within the `ChangeDataSourceItemAsync` method passing the data source item's underlying data source as the parameter as shown in the examples above.
:::

### Authentication

Cube authentication is typically handled with a bearer token, such as a JWT issued for the Cube API. For more information, see the [Authentication](../authentication.md#bearer-token-authentication) topic.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider : IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;

        if (dataSource is RVCubeDataSource)
        {
            // Use Bearer Token
            userCredential = new RVBearerTokenDataSourceCredential("your_jwt_token", "your_userid");
        }

        return Task.FromResult(userCredential);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVCubeDataSource) {
        // Use Bearer Token
        return new reveal.RVBearerTokenDataSourceCredential("your_jwt_token", "your_userid");
    }

    return null;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```typescript
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVCubeDataSource) {
        // Use Bearer Token
        return new RVBearerTokenDataSourceCredential("your_jwt_token", "your_userid");
    }

    return null;
}
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
public class AuthenticationProvider implements IRVAuthenticationProvider {
    @Override
    public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVCubeDataSource) {
            // Use Bearer Token
            return new RVBearerTokenDataSourceCredential("your_jwt_token", "your_userid");
        }

        return null;
    }
}
```

  </TabItem>
</Tabs>

## Client-Side Implementation

On the client side, you only need to specify basic properties like ID, title, and subtitle for the data source. The actual connection configuration happens on the server.

### Creating Data Sources

**Step 1** - Add an event handler for the `RevealView.onDataSourcesRequested` event.

```js
const revealView = new RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    // Add data source here
    callback(new RevealDataSources([], [], false));
};
```

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVCubeDataSource` object. Set the `title` and `subtitle` properties. After you have created the `RVCubeDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const cubeDS = new RVCubeDataSource();
    cubeDS.title = "Cube";
    cubeDS.subtitle = "Data Source";

    callback(new RevealDataSources([cubeDS], [], false));
};
```

### Creating Data Source Items

Data source items represent specific Cube models within your Cube data source that users can select for visualization. On the client side, you only need to specify ID, title, and subtitle.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const cubeDS = new RVCubeDataSource();
    cubeDS.title = "My Cube Datasource";
    cubeDS.subtitle = "Cube";

    // Create a data source item
    const cubeDSI = new RVCubeDataSourceItem(cubeDS);
    cubeDSI.id = "cube_orders";
    cubeDSI.title = "My Cube Datasource Item";
    cubeDSI.subtitle = "Cube";

    callback(new RevealDataSources([cubeDS], [cubeDSI], false));
};
```

## Additional Resources

- [Cube Documentation](https://cube.dev/docs)
- [Cube REST API Reference](https://cube.dev/docs/reference/rest-api)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVCubeDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Cube.RVCubeDataSource.html) - Represents a Cube data source
* [RVCubeDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Cube.RVCubeDataSourceItem.html) - Represents a Cube data source item

</TabItem>
<TabItem value="node" label="Node.js">

* [RVCubeDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvcubedatasource.html) - Represents a Cube data source
* [RVCubeDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvcubedatasourceitem.html) - Represents a Cube data source item

</TabItem>
</Tabs>
