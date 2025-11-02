---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# MongoDB Data Source

## Introduction

MongoDB is a source-available cross-platform document-oriented database program. This topic explains how to connect to MongoDB data sources in your Reveal application to visualize and analyze your data.

## Server Configuration

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

For ASP.NET applications, you need to install a separate NuGet package to enable MongoDB support:

```bash
dotnet add package Reveal.Sdk.Data.MongoDb
```

Then register the MongoDB provider in your application:

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterMongoDb();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the MongoDB data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="java" label="Java">

For Java applications, the MongoDB data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

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

        if (dataSourceItem is RVMongoDBDataSourceItem mongoDsi)
        {            
            // Configure specific item properties as needed
            if (mongoDsi.Id == "MyMongoDatasourceItem")
            {
                mongoDsi.Collection = "orders";
            }
        }
        
        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVMongoDBDataSource mongoDatasource)
        {
            // Configure connection properties
            mongoDatasource.ConnectionString = "mongodb+srv://cluster0.ta2xrrt.mongodb.net/";
            mongoDatasource.Database = "test";
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

    if (dataSourceItem instanceof reveal.RVMongoDBDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MyMongoDBDatasourceItem") {
            dataSourceItem.collection = "orders";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVMongoDBDataSource) {
        // Configure connection properties
        dataSource.connectionString = "mongodb+srv://cluster0.ta2xrrt.mongodb.net/";
        dataSource.database = "test";
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

    if (dataSourceItem instanceof RVMongoDBDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MyMongoDBDatasourceItem") {
            dataSourceItem.collection = "orders";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVMongoDBDataSource) {
        // Configure connection properties
        dataSource.connectionString = "mongodb+srv://cluster0.ta2xrrt.mongodb.net/";
        dataSource.database = "test";
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

        if (dataSourceItem instanceof RVMongoDBDataSourceItem mongoDsi) {            
            // Configure specific item properties if needed
            if ("MyMongoDBDatasourceItem".equals(dataSourceItem.getId())) {
                mongoDsi.setCollection("orders");
            }
        }
        
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVMongoDBDataSource mongoDatasource) {
            // Configure connection properties
            mongoDatasource.setConnectionString("mongodb+srv://cluster0.ta2xrrt.mongodb.net/");
            mongoDatasource.setDatabase("test");
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

Authentication for MongoDB is typically handled through the connection string. For detailed information on authentication options, see the [Authentication](../authentication.md) topic.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVMongoDBDataSource)
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
    if (dataSource instanceof reveal.RVMongoDBDataSource) {
        return new reveal.RVUsernamePasswordDataSourceCredential("username", "password");
    }
    return null;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```typescript
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVMongoDBDataSource) {
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
        if (dataSource instanceof RVMongoDBDataSource) {
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

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVMongoDBDataSource` object. Set the `title` and `subtitle` properties. After you have created the `RVMongoDBDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const mongoDS = new $.ig.RVMongoDBDataSource();
    mongoDS.title = "My MongoDB";
    mongoDS.subtitle = "Data Source";
    
    callback(new $.ig.RevealDataSources([mongoDS], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created MongoDB data source listed in the "Select a Data Source" dialog.

![](images/mongodb-data-source.jpg)

### Creating Data Source Items

Data source items represent specific datasets within your MongoDB data source that users can select for visualization. On the client side, you only need to specify ID, title, and subtitle.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const mongoDS = new $.ig.RVMongoDBDataSource();
    mongoDS.title = "My MongoDB";
    mongoDS.subtitle = "MongoDB";
    
    // Create a data source item
    const mongoDSI = new $.ig.RVMongoDBDataSourceItem(mongoDS);
    mongoDSI.id = "MyMongoDatasourceItem";
    mongoDSI.title = "My MongoDB Item";
    mongoDSI.subtitle = "MongoDB";

    callback(new $.ig.RevealDataSources([mongoDS], [mongoDSI], false));
};
```

When the application runs, create a new Visualization and you will see the newly created MongoDB data source item listed in the "Select a Data Source" dialog.

![](images/mongodb-data-source-item.jpg)

## Additional Resources

- [Sample Source Code on GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/MongoDB)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVMongoDBDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.RVMongoDBDataSource.html) - Represents a MongoDB data source
* [RVMongoDBDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.RVMongoDBDataSourceItem.html) - Represents a MongoDB data source item

</TabItem>
<TabItem value="node" label="Node.js">

* [RVMongoDBDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvmongodbdatasource.html) - Represents a MongoDB data source
* [RVMongoDBDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvmongodbdatasourceitem.html) - Represents a MongoDB data source item

</TabItem>
</Tabs>
