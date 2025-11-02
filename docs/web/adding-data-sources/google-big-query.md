---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Google BigQuery Data Source

## Introduction

Google BigQuery is a serverless, highly scalable, and cost-effective multi-cloud data warehouse designed for business agility. This topic explains how to connect to Google BigQuery data sources in your Reveal application to visualize and analyze your data.

## Server Configuration

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

For ASP.NET applications, you need to install a separate NuGet package to enable Google BigQuery support:

```bash
dotnet add package Reveal.Sdk.Data.Google.BigQuery
```

Then register the Google BigQuery provider in your application:

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterGoogleBigQuery();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the Google BigQuery data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="java" label="Java">

For Java applications, the Google BigQuery data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

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

        if (dataSourceItem is RVBigQueryDataSourceItem bigQueryItem)
        {            
            // Configure specific item properties as needed
            if (bigQueryItem.Id == "MyBigQueryItem")
            {
                bigQueryItem.Table = "your_table_name";
            }
        }
        
        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVBigQueryDataSource bigQueryDS)
        {
            // Configure connection properties
            bigQueryDS.ProjectId = "your_project_id";
            bigQueryDS.DatasetId = "your_dataset_id";
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

    if (dataSourceItem instanceof reveal.RVBigQueryDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MyBigQueryItem") {
            dataSourceItem.table = "your_table_name";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVBigQueryDataSource) {
        // Configure connection properties
        dataSource.projectId = "your_project_id";
        dataSource.datasetId = "your_dataset_id";
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

    if (dataSourceItem instanceof RVBigQueryDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MyBigQueryItem") {
            dataSourceItem.table = "your_table_name";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVBigQueryDataSource) {
        // Configure connection properties
        dataSource.projectId = "your_project_id";
        dataSource.datasetId = "your_dataset_id";
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

        if (dataSourceItem instanceof RVBigQueryDataSourceItem bigQueryItem) {            
            // Configure specific item properties if needed
            if ("MyBigQueryItem".equals(dataSourceItem.getId())) {
                bigQueryItem.setTable("your_table_name");
            }
        }
        
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVBigQueryDataSource bigQueryDS) {
            // Configure connection properties
            bigQueryDS.setProjectId("your_project_id");
            bigQueryDS.setDatasetId("your_dataset_id");
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

Authentication for Google BigQuery is handled on the server side using service account credentials. For detailed information on authentication options, see the [Authentication](../authentication.md#bearer-token-authentication) topic.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVBigQueryDataSource)
        {
            userCredential = new RVBearerTokenDataSourceCredential("your_token", "your_userid");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVBigQueryDataSource) {
        return new reveal.RVBearerTokenDataSourceCredential("your_token", "your_userid");
    }
    return null;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```typescript
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVBigQueryDataSource) {
        return new RVBearerTokenDataSourceCredential("your_token", "your_userid");
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
        if (dataSource instanceof RVBigQueryDataSource) {
            return new RVBearerTokenDataSourceCredential("your_token", "your_userid");
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

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVBigQueryDataSource` object. Set the `title` and `subtitle` properties. After you have created the `RVBigQueryDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const bigQueryDS = new $.ig.RVBigQueryDataSource();
    bigQueryDS.title = "My Big Query";
    bigQueryDS.subtitle = "Google BigQuery";
    
    callback(new $.ig.RevealDataSources([bigQueryDS], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Google BigQuery data source listed in the "Select a Data Source" dialog.

![](images/big-query-data-source.jpg)

### Creating Data Source Items

Data source items represent specific datasets within your BigQuery data source that users can select for visualization. On the client side, you only need to specify ID, title, and subtitle.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const bigQueryDS = new $.ig.RVBigQueryDataSource();
    bigQueryDS.title = "My Big Query";
    bigQueryDS.subtitle = "Google BigQuery";
    
    // Create a data source item
    const bigQueryDSI = new $.ig.RVBigQueryDataSourceItem(bigQueryDS);
    bigQueryDSI.id = "MyBigQueryItem";
    bigQueryDSI.title = "My Big Query Item";
    bigQueryDSI.subtitle = "Google BigQuery";

    callback(new $.ig.RevealDataSources([bigQueryDS], [bigQueryDSI], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Google BigQuery data source item listed in the "Select a Data Source" dialog.

![](images/big-query-data-source-item.jpg)

## Additional Resources

- [Sample Source Code on GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/BigQuery-ServiceAccount)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVBigQueryDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Google.BigQuery.RVBigQueryDataSource.html) - Represents a Google BigQuery data source
* [RVBigQueryDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Google.BigQuery.RVBigQueryDataSourceItem.html) - Represents a Google BigQuery data source item

</TabItem>
<TabItem value="node" label="Node.js">

* [RVBigQueryDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvbigquerydatasource.html) - Represents a Google BigQuery data source
* [RVBigQueryDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvbigquerydatasourceitem.html) - Represents a Google BigQuery data source item

</TabItem>
</Tabs>
