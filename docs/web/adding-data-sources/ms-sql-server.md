---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Microsoft SQL Server Data Source

## Introduction

Microsoft SQL Server is a relational database management system developed by Microsoft. This topic explains how to connect to Microsoft SQL Server data sources in your Reveal application to visualize and analyze your data.

## Server Configuration

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

For ASP.NET applications, you need to install a separate NuGet package to enable Microsoft SQL Server support:

```bash
dotnet add package Reveal.Sdk.Data.Microsoft.SqlServer
```

Then register the Microsoft SQL Server provider in your application:

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterMicrosoftSqlServer();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the Microsoft SQL Server data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="java" label="Java">

For Java applications, the Microsoft SQL Server data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

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

        if (dataSourceItem is RVSqlServerDataSourceItem sqlServerDsi)
        {            
            // Configure specific item properties as needed
            if (sqlServerDsi.Id == "MySqlServerDatasourceItem")
            {
                sqlServerDsi.Table = "Orders";
            }
        }
        
        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVSqlServerDataSource sqlDatasource)
        {
            // Configure connection properties
            sqlDatasource.Host = "10.0.0.20";
            sqlDatasource.Database = "Northwind";
            sqlDatasource.Schema = "dbo";
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

    if (dataSourceItem instanceof reveal.RVSqlServerDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MySqlServerDatasourceItem") {
            dataSourceItem.table = "Orders";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVSqlServerDataSource) {
        // Configure connection properties
        dataSource.host = "10.0.0.20";
        dataSource.database = "Northwind";
        dataSource.schema = "dbo";
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

    if (dataSourceItem instanceof RVSqlServerDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MySqlServerDatasourceItem") {
            dataSourceItem.table = "Orders";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVSqlServerDataSource) {
        // Configure connection properties
        dataSource.host = "10.0.0.20";
        dataSource.database = "Northwind";
        dataSource.schema = "dbo";
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

        if (dataSourceItem instanceof RVSqlServerDataSourceItem sqlServerDsi) {            
            // Configure specific item properties if needed
            if ("MySqlServerDatasourceItem".equals(dataSourceItem.getId())) {
                sqlServerDsi.setTable("Orders");
            }
        }
        
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVSqlServerDataSource sqlDatasource) {
            // Configure connection properties
            sqlDatasource.setHost("10.0.0.20");
            sqlDatasource.setDatabase("Northwind");
            sqlDatasource.setSchema("dbo");
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

Authentication for Microsoft SQL Server is handled on the server side. For detailed information on authentication options, see the [Authentication](../authentication.md) topic.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVSqlServerDataSource)
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
    if (dataSource instanceof reveal.RVSqlServerDataSource) {
        return new reveal.RVUsernamePasswordDataSourceCredential("username", "password");
    }
    return null;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```typescript
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVSqlServerDataSource) {
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
        if (dataSource instanceof RVSqlServerDataSource) {
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

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVSqlServerDataSource` object. Set the `title` and `subtitle` properties. After you have created the `RVSqlServerDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const sqlServerDS = new $.ig.RVSqlServerDataSource();
    sqlServerDS.title = "My SQL Server";
    sqlServerDS.subtitle = "Data Source";
    
    callback(new $.ig.RevealDataSources([sqlServerDS], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Microsoft SQL Server data source listed in the "Select a Data Source" dialog.

![](images/ms-sql-server-data-source.jpg)

### Creating Data Source Items

Data source items represent specific datasets within your SQL Server data source that users can select for visualization. On the client side, you only need to specify ID, title, and subtitle.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const sqlServerDS = new $.ig.RVSqlServerDataSource();
    sqlServerDS.title = "My SQL Server";
    sqlServerDS.subtitle = "Microsoft SQL Server";
    
    // Create a data source item
    const sqlServerDSI = new $.ig.RVSqlServerDataSourceItem(sqlServerDS);
    sqlServerDSI.id = "MySqlServerDatasourceItem";
    sqlServerDSI.title = "My SQL Server Item";
    sqlServerDSI.subtitle = "Microsoft SQL Server";

    callback(new $.ig.RevealDataSources([sqlServerDS], [sqlServerDSI], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Microsoft SQL Server data source item listed in the "Select a Data Source" dialog.

![](images/ms-sql-server-data-source-item.jpg)

## Additional Resources

- [Sample Source Code on GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/MsSqlServer)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVSqlServerDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.RVSqlServerDataSource.html) - Represents a Microsoft SQL Server data source
* [RVSqlServerDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.RVSqlServerDataSourceItem.html) - Represents a Microsoft SQL Server data source item

</TabItem>
<TabItem value="node" label="Node.js">

* [RVSqlServerDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvsqlserverdatasource.html) - Represents a Microsoft SQL Server data source
* [RVSqlServerDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvsqlserverdatasourceitem.html) - Represents a Microsoft SQL Server data source item

</TabItem>
</Tabs>
