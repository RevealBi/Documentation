---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Azure Cosmos DB Data Source

## Introduction

Azure Cosmos DB is a fully managed database service on Azure that provides low-latency access to globally distributed data. This topic explains how to connect Azure Cosmos DB data sources in your Reveal application to visualize and analyze your data.

## Server Configuration

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

**Step 1** - Install the Reveal Azure Cosmos DB connector package.

For ASP.NET applications, you need to install a separate NuGet package to enable Azure Cosmos DB support:

```bash
dotnet add package Reveal.Sdk.Data.AzureCosmosDB
```

**Step 2** - Register the Azure Cosmos DB data source in your application.

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterAzureCosmosDB();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the Azure Cosmos DB data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

For Node.js TypeScript applications, the Azure Cosmos DB data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="java" label="Java">

For Java applications, the Azure Cosmos DB data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
</Tabs>

### Connection Configuration

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
// Create a data source provider
public class DataSourceProvider : IRVDataSourceProvider
{
    public async Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
        RVDataSourceItem dataSourceItem)
    {
        // Required: Update the underlying data source
        await ChangeDataSourceAsync(userContext, dataSourceItem.DataSource);

        if (dataSourceItem is RVAzureCosmosDBDataSourceItem cosmosItem)
        {
            // Configure specific item properties if needed
            if (cosmosItem.Id == "azure_cosmos_orders")
            {
                cosmosItem.Container = "orders";
            }
        }

        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
        RVDashboardDataSource dataSource)
    {
        if (dataSource is RVAzureCosmosDBDataSource cosmosDataSource)
        {
            // Configure connection properties
            cosmosDataSource.AccountEndpoint = "https://your-account.documents.azure.com:443/";
            cosmosDataSource.Database = "Sales";
            cosmosDataSource.ApplicationRegion = "East US";
            cosmosDataSource.ConnectionMode = "Gateway";
            cosmosDataSource.AcceptAnyServerCertificate = false;
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

    if (dataSourceItem instanceof reveal.RVAzureCosmosDBDataSourceItem) {
        // Configure specific item properties if needed
        if (dataSourceItem.id === "azure_cosmos_orders") {
            dataSourceItem.container = "orders";
        }
    }

    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVAzureCosmosDBDataSource) {
        // Configure connection properties
        dataSource.accountEndpoint = "https://your-account.documents.azure.com:443/";
        dataSource.database = "Sales";
        dataSource.applicationRegion = "East US";
        dataSource.connectionMode = "Gateway";
        dataSource.acceptAnyServerCertificate = false;
    }

    return dataSource;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```ts
// Create data source providers
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    // Required: Update the underlying data source
    await dataSourceProvider(userContext, dataSourceItem.dataSource);

    if (dataSourceItem instanceof RVAzureCosmosDBDataSourceItem) {
        // Configure specific item properties if needed
        if (dataSourceItem.id === "azure_cosmos_orders") {
            dataSourceItem.container = "orders";
        }
    }

    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVAzureCosmosDBDataSource) {
        // Configure connection properties
        dataSource.accountEndpoint = "https://your-account.documents.azure.com:443/";
        dataSource.database = "Sales";
        dataSource.applicationRegion = "East US";
        dataSource.connectionMode = "Gateway";
        dataSource.acceptAnyServerCertificate = false;
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

        if (dataSourceItem instanceof RVAzureCosmosDBDataSourceItem cosmosItem) {
            // Configure specific item properties if needed
            if ("azure_cosmos_orders".equals(cosmosItem.getId())) {
                cosmosItem.setContainer("orders");
            }
        }

        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVAzureCosmosDBDataSource cosmosDataSource) {
            // Configure connection properties
            cosmosDataSource.setAccountEndpoint("https://your-account.documents.azure.com:443/");
            cosmosDataSource.setDatabase("Sales");
            cosmosDataSource.setApplicationRegion("East US");
            cosmosDataSource.setConnectionMode("Gateway");
            cosmosDataSource.setAcceptAnyServerCertificate(false);
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

Authentication for Azure Cosmos DB is handled on the server side using `RVKeyPairDataSourceCredential`. For Azure Cosmos DB, the credential key maps to your account key. For detailed information on authentication options, see the [Authentication](../authentication.md) topic.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVAzureCosmosDBDataSource)
        {
            // Use account key
            userCredential = new RVKeyPairDataSourceCredential(null, "your_account_key");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVAzureCosmosDBDataSource) {
        // Use account key
        return new reveal.RVKeyPairDataSourceCredential(null, "your_account_key");
    }
    return null;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```ts
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVAzureCosmosDBDataSource) {
        // Use account key
        return new RVKeyPairDataSourceCredential(null, "your_account_key");
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
        if (dataSource instanceof RVAzureCosmosDBDataSource) {
            // Use account key
            return new RVKeyPairDataSourceCredential(null, "your_account_key");
        }
        return null;
    }
}
```

  </TabItem>
</Tabs>

## Client-Side Implementation

On the client side, create the data source and data source item with only the `id`, `title`, and `subtitle` properties. Keep the endpoint, database selection, container, and credentials on the server.

### Creating Data Sources

**Step 1** - Add an event handler for the `RevealView.onDataSourcesRequested` event.

```js
const revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    // Add data source here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVAzureCosmosDBDataSource` object. Set only the `id`, `title`, and `subtitle` properties, and then add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const cosmosDS = new $.ig.RVAzureCosmosDBDataSource();
    cosmosDS.id = "azure_cosmos";
    cosmosDS.title = "Azure Cosmos DB";
    cosmosDS.subtitle = "Sales";

    callback(new $.ig.RevealDataSources([cosmosDS], [], false));
};
```

### Creating Data Source Items

Data source items represent specific datasets within your Azure Cosmos DB data source that users can select for visualization. On the client side, only set the `id`, `title`, and `subtitle` properties for the container.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const cosmosDS = new $.ig.RVAzureCosmosDBDataSource();
    cosmosDS.id = "azure_cosmos";
    cosmosDS.title = "Azure Cosmos DB";
    cosmosDS.subtitle = "Sales";

    // Create a data source item
    const cosmosDSI = new $.ig.RVAzureCosmosDBDataSourceItem(cosmosDS);
    cosmosDSI.id = "azure_cosmos_orders";
    cosmosDSI.title = "Orders";
    cosmosDSI.subtitle = "Container";

    callback(new $.ig.RevealDataSources([cosmosDS], [cosmosDSI], false));
};
```

## Additional Resources

- [Azure Cosmos DB documentation](https://learn.microsoft.com/azure/cosmos-db/)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVAzureCosmosDBDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.AzureCosmosDB.RVAzureCosmosDBDataSource.html) - Represents an Azure Cosmos DB data source
* [RVAzureCosmosDBDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.AzureCosmosDB.RVAzureCosmosDBDataSourceItem.html) - Represents an Azure Cosmos DB data source item

</TabItem>
<TabItem value="node" label="Node.js">

* [RVAzureCosmosDBDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvazurecosmosdbdatasource.html) - Represents an Azure Cosmos DB data source
* [RVAzureCosmosDBDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvazurecosmosdbdatasourceitem.html) - Represents an Azure Cosmos DB data source item

</TabItem>
</Tabs>
