---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# PostgreSQL Data Source

## Introduction

PostgreSQL is a powerful, open-source object-relational database system. This topic explains how to connect to PostgreSQL data sources in your Reveal application to visualize and analyze your data.

## Server Configuration

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

For ASP.NET applications, you need to install a separate NuGet package to enable PostgreSQL support:

```bash
dotnet add package Reveal.Sdk.Data.PostgreSQL
```

Then register the PostgreSQL provider in your application:

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterPostgreSQL();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the PostgreSQL data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="java" label="Java">

For Java applications, the PostgreSQL data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

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

        if (dataSourceItem is RVPostgresDataSourceItem postgresDataSourceItem)
        {            
            // Configure specific item properties as needed
            if (postgresDataSourceItem.Id == "MyPostgresDataSourceItem")
            {
                postgresDataSourceItem.Table = "orders";
            }
        }
        
        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVPostgresDataSource postgresDataSource)
        {
            // Configure connection properties
            postgresDataSource.Host = "localhost";
            postgresDataSource.Database = "database";
            postgresDataSource.Schema = "public";
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

    if (dataSourceItem instanceof reveal.RVPostgresDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MyPostgresDataSourceItem") {
            dataSourceItem.table = "orders";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVPostgresDataSource) {
        // Configure connection properties
        dataSource.host = "localhost";
        dataSource.database = "database";
        dataSource.schema = "public";
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

    if (dataSourceItem instanceof RVPostgresDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MyPostgresDataSourceItem") {
            dataSourceItem.table = "orders";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVPostgresDataSource) {
        // Configure connection properties
        dataSource.host = "localhost";
        dataSource.database = "database";
        dataSource.schema = "public";
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

        if (dataSourceItem instanceof RVPostgresDataSourceItem postgresDataSourceItem) {            
            // Configure specific item properties if needed
            if ("MyPostgresDataSourceItem".equals(dataSourceItem.getId())) {
                postgresDataSourceItem.setTable("orders");
            }
        }
        
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVPostgresDataSource postgresDataSource) {
            // Configure connection properties
            postgresDataSource.setHost("localhost");
            postgresDataSource.setDatabase("database");
            postgresDataSource.setSchema("public");
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

Authentication for PostgreSQL is handled on the server side. For detailed information on authentication options, see the [Authentication](../authentication.md) topic.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVPostgresDataSource)
        {
            userCredential = new RVUsernamePasswordDataSourceCredential("username", "password");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVPostgresDataSource) {
        return new reveal.RVUsernamePasswordDataSourceCredential("username", "password");
    }
    return null;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```typescript
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVPostgresDataSource) {
        return new RVUsernamePasswordDataSourceCredential("username", "password");
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
        if (dataSource instanceof RVPostgresDataSource) {
            return new RVUsernamePasswordDataSourceCredential("username", "password");
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
const revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    // Add data source here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVPostgresDataSource` object. Set the `title` and `subtitle` properties. After you have created the `RVPostgresDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const postgresDS = new $.ig.RVPostgresDataSource();
    postgresDS.title = "My PostgreSQL";
    postgresDS.subtitle = "Data Source";
    
    callback(new $.ig.RevealDataSources([postgresDS], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created PostgreSQL data source listed in the "Select a Data Source" dialog.

![](images/postgres-data-source.jpg)

### Creating Data Source Items

Data source items represent specific datasets within your PostgreSQL data source that users can select for visualization. On the client side, you only need to specify ID, title, and subtitle.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const postgresDS = new $.ig.RVPostgresDataSource();
    postgresDS.title = "My PostgreSQL";
    postgresDS.subtitle = "PostgreSQL";
    
    // Create a data source item
    const postgresDSI = new $.ig.RVPostgresDataSourceItem(postgresDS);
    postgresDSI.id = "MyPostgresDataSourceItem";
    postgresDSI.title = "My PostgreSQL Item";
    postgresDSI.subtitle = "PostgreSQL";

    callback(new $.ig.RevealDataSources([postgresDS], [postgresDSI], false));
};
```

When the application runs, create a new Visualization and you will see the newly created PostgreSQL data source item listed in the "Select a Data Source" dialog.

![](images/postgres-data-source-item.jpg)

## Additional Resources

- [Sample Source Code on GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/PostgreSQL)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVPostgresDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.RVPostgresDataSource.html) - Represents a PostgreSQL data source
* [RVPostgresDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.RVPostgresDataSourceItem.html) - Represents a PostgreSQL data source item

</TabItem>
<TabItem value="node" label="Node.js">

* [RVPostgresDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvpostgresdatasource.html) - Represents a PostgreSQL data source
* [RVPostgresDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvpostgresdatasourceitem.html) - Represents a PostgreSQL data source item

</TabItem>
</Tabs>
