---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon Athena Data Source

## Introduction

Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. This topic explains how to connect to Amazon Athena data sources in your Reveal application to visualize and analyze your data.

## Server Configuration

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

For ASP.NET applications, you need to install a separate NuGet package to enable Amazon Athena support:

```bash
dotnet add package Reveal.Sdk.Data.Amazon.Athena
```

Then register the Amazon Athena provider in your application:

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterAmazonAthena();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the Amazon Athena data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="java" label="Java">

For Java applications, the Amazon Athena data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
</Tabs>

### Connection Configuration

All connection properties for Amazon Athena are configured on the server side through a data source provider implementation.

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

        if (dataSourceItem is RVAthenaDataSourceItem athenaItem)
        {            
            // Configure specific item properties as needed
            if (athenaItem.Id == "my-data-source-item")
            {
                athenaItem.Table = "your_table_name";
            }
        }
        
        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVAthenaDataSource athenaDS)
        {
            // Configure connection properties
            athenaDS.Region = "your_region";
            athenaDS.Database = "your_database_name";
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
    
    if (dataSourceItem instanceof reveal.RVAthenaDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "my-data-source-item") {
            dataSourceItem.table = "your_table_name";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVAthenaDataSource) {
        // Configure connection properties
        dataSource.region = "your_region";
        dataSource.database = "your_database_name";
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

    if (dataSourceItem instanceof RVAthenaDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "my-data-source-item") {
            dataSourceItem.table = "your_table_name";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVAthenaDataSource) {
        // Configure connection properties
        dataSource.region = "your_region";
        dataSource.database = "your_database_name";
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
        changeDataSource(userContext, athenaItem.getDataSource());

        if (dataSourceItem instanceof RVAthenaDataSourceItem athenaItem) {            
            // Configure specific item properties if needed
            if ("my-data-source-item".equals(athenaItem.getId())) {
                athenaItem.setTable("your_table_name");
            }
        }
        
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVAthenaDataSource athenaDS) {
            // Configure connection properties
            athenaDS.setRegion("your_region");
            athenaDS.setDatabase("your_database_name");
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

Authentication for Amazon Athena is handled on the server side using AWS credentials. For detailed information on authentication options, see the [Authentication](../authentication.md#amazon-web-services) topic.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVS3DataSource)
        {
            userCredential = new RVAmazonWebServicesCredentials("key", "secret");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVS3DataSource) {
        return new reveal.RVAmazonWebServicesCredentials("key", "secret");
    }
    return null;
}
```

  </TabItem>
    <TabItem value="node-ts" label="Node.js - TS">

```ts
const authenticationProvider = async (userContext:IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVS3DataSource) {
        return new RVAmazonWebServicesCredentials("key", "secret");
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
        if (dataSource instanceof RVS3DataSource) {
            return new RVAmazonWebServicesCredentials("key", "secret");
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

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVAthenaDataSource` object. Set the `title` and `subtitle` properties. After you have created the `RVAthenaDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const athenaDS = new $.ig.RVAthenaDataSource();
    athenaDS.title = "My Athena Data Source";
    athenaDS.subtitle = "Amazon Athena";

    callback(new $.ig.RevealDataSources([athenaDS], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Amazon Athena data source listed in the "Select a Data Source" dialog.

![](images/amazon-athena-data-source.jpg)

### Creating Data Source Items

Data source items represent specific datasets within your Athena data source that users can select for visualization. On the client side, you only need to specify ID, title, and subtitle.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const athenaDS = new $.ig.RVAthenaDataSource();
    athenaDS.title = "My Athena Data Source";
    athenaDS.subtitle = "Amazon Athena";
    
    // Create a data source item
    const athenaDSI = new $.ig.RVAthenaDataSourceItem(athenaDS);
    athenaDSI.id = "my-data-source-item";
    athenaDSI.title = "My Athena Data Source Item";
    athenaDSI.subtitle = "Amazon Athena";

    callback(new $.ig.RevealDataSources([athenaDS], [athenaDSI], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Amazon Athena data source item listed in the "Select a Data Source" dialog.

![](images/amazon-athena-data-source-item.jpg)

## Additional Resources

- [Amazon Athena Documentation](https://docs.aws.amazon.com/athena/)
- [Sample Source Code on GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/Amazon-Athena)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVAthenaDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Amazon.Athena.RVAthenaDataSource.html) - Represents an Amazon Athena data source
* [RVAthenaDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Amazon.Athena.RVAthenaDataSourceItem.html) - Represents an Amazon Athena data source item

</TabItem>
<TabItem value="node" label="Node.js">

* [RVAthenaDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvathenadatasource.html) - Represents an Amazon Athena data source
* [RVAthenaDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvathenadatasourceitem.html) - Represents an Amazon Athena data source item

</TabItem>
<TabItem value="java" label="Java">

* [RVAthenaDataSource](https://help.revealbi.io/api/java/latest/com/infragistics/reveal/sdk/api/model/RVAthenaDataSource.html) - Represents an Amazon Athena data source
* [RVAthenaDataSourceItem](https://help.revealbi.io/api/java/latest/com/infragistics/reveal/sdk/api/model/RVAthenaDataSourceItem.html) - Represents an Amazon Athena data source item

</TabItem>
</Tabs>
