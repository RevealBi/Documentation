---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Elasticsearch Data Source

## Introduction

Elasticsearch is a distributed, RESTful search and analytics engine capable of addressing a growing number of use cases. As the heart of the Elastic Stack, it centrally stores your data for lightning fast search, fine‑tuned relevancy, and powerful analytics that scale with ease. Elasticsearch SQL enables you to execute SQL queries over Elasticsearch indices, making it easier to work with your data using familiar SQL syntax. This topic explains how to connect to Elasticsearch data sources in your Reveal application to visualize and analyze your data.

## Server Configuration

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

For ASP.NET applications, you need to install a separate NuGet package to enable Elasticsearch support:

```bash
dotnet add package Reveal.Sdk.Data.Elasticsearch
```

Then register the Elasticsearch provider in your application:

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterElasticsearch();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the Elasticsearch data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
</Tabs>

### Connection Configuration

All connection properties for Elasticsearch are configured on the server side through a data source provider implementation.

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

        if (dataSourceItem is RVElasticsearchDataSourceItem elasticsearchDataSourceItem)
        {
            // Configure using a specific index
            if (dataSourceItem.Id == "elasticsearchDataSourceItemId")
            {
                elasticsearchDataSourceItem.Index = "kibana_sample_data_ecommerce";
            }

            // Or configure using a custom SQL query
            if (dataSourceItem.Id == "elasticsearchDataSourceItemCustomQueryId")
            {
                elasticsearchDataSourceItem.CustomQuery = "SELECT * FROM \"kibana_sample_data_ecommerce\" WHERE \"customer_first_name\" = 'Eddie'";
            }

            // Configure field multi-value handling
            elasticsearchDataSourceItem.FieldMultiValueLeniency = true;
        }

        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVElasticsearchDataSource elasticsearchDataSource)
        {
            // Configure connection properties
            elasticsearchDataSource.Nodes = new List<string> { "http://localhost:9200" };
            
            // Optional: Configure SSL/TLS certificate fingerprint
            elasticsearchDataSource.CertificateFingerprint = "your_certificate_fingerprint";
            
            // Optional: Configure field multi-value handling at data source level
            elasticsearchDataSource.FieldMultiValueLeniency = true;
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
    
    if (dataSourceItem instanceof reveal.RVElasticsearchDataSourceItem) {        
        // Configure using a specific index
        if (dataSourceItem.id === "elasticsearchDataSourceItemId") {
            dataSourceItem.index = "kibana_sample_data_ecommerce";
        }

        // Or configure using a custom SQL query
        if (dataSourceItem.id === "elasticsearchDataSourceItemCustomQueryId") {
            dataSourceItem.customQuery = "SELECT * FROM \"kibana_sample_data_ecommerce\" WHERE \"customer_first_name\" = 'Eddie'";
        }

        // Configure field multi-value handling
        dataSourceItem.fieldMultiValueLeniency = true;
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVElasticsearchDataSource) {
        // Configure connection properties
        dataSource.nodes = ["http://localhost:9200"];
        
        // Optional: Configure SSL/TLS certificate fingerprint
        dataSource.certificateFingerprint = "your_certificate_fingerprint";
        
        // Optional: Configure field multi-value handling at data source level
        dataSource.fieldMultiValueLeniency = true;
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

    if (dataSourceItem instanceof RVElasticsearchDataSourceItem) {        
        // Configure using a specific index
        if (dataSourceItem.id === "elasticsearchDataSourceItemId") {
            dataSourceItem.index = "kibana_sample_data_ecommerce";
        }

        // Or configure using a custom SQL query
        if (dataSourceItem.id === "elasticsearchDataSourceItemCustomQueryId") {
            dataSourceItem.customQuery = "SELECT * FROM \"kibana_sample_data_ecommerce\" WHERE \"customer_first_name\" = 'Eddie'";
        }

        // Configure field multi-value handling
        dataSourceItem.fieldMultiValueLeniency = true;
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVElasticsearchDataSource) {
        // Configure connection properties
        dataSource.nodes = ["http://localhost:9200"];
        
        // Optional: Configure SSL/TLS certificate fingerprint
        dataSource.certificateFingerprint = "your_certificate_fingerprint";
        
        // Optional: Configure field multi-value handling at data source level
        dataSource.fieldMultiValueLeniency = true;
    }
    
    return dataSource;
}
```

  </TabItem>
</Tabs>

:::danger Important
Any changes made to the data source in the `ChangeDataSourceAsync` method are not carried over into the `ChangeDataSourceItemAsync` method. You **must** update the data source properties in both methods. We recommend calling the `ChangeDataSourceAsync` method within the `ChangeDataSourceItemAsync` method passing the data source item's underlying data source as the parameter as shown in the examples above.
:::

### Authentication

Authentication for Elasticsearch is handled on the server side using username and password credentials. For detailed information on authentication options, see the [Authentication](../authentication.md#usernamepassword-authentication) topic.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        
        if (dataSource is RVElasticsearchDataSource)
        {
            userCredential = new RVUsernamePasswordDataSourceCredential("elastic", "your_password");
        }
        
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVElasticsearchDataSource) {
        return new reveal.RVUsernamePasswordDataSourceCredential("elastic", "your_password");
    }
    return null;
}
```

  </TabItem>
    <TabItem value="node-ts" label="Node.js - TS">

```ts
const authenticationProvider = async (userContext:IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVElasticsearchDataSource) {
        return new RVUsernamePasswordDataSourceCredential("elastic", "your_password");
    }
    return null;
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

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVElasticsearchDataSource` object. Set the `title` and `subtitle` properties. After you have created the `RVElasticsearchDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const elasticsearchDS = new $.ig.RVElasticsearchDataSource();
    elasticsearchDS.title = "My Elasticsearch Data Source";
    elasticsearchDS.subtitle = "Elasticsearch";

    callback(new $.ig.RevealDataSources([elasticsearchDS], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Elasticsearch data source listed in the "Select a Data Source" dialog.

### Creating Data Source Items

Data source items represent specific datasets within your Elasticsearch data source that users can select for visualization. On the client side, you only need to specify ID, title, and subtitle.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const elasticsearchDS = new $.ig.RVElasticsearchDataSource();
    elasticsearchDS.title = "My Elasticsearch Data Source";
    elasticsearchDS.subtitle = "Elasticsearch";
    
    // Create a data source item
    const elasticsearchDSI = new $.ig.RVElasticsearchDataSourceItem(elasticsearchDS);
    elasticsearchDSI.id = "my-data-source-item";
    elasticsearchDSI.title = "My Elasticsearch Data Source Item";
    elasticsearchDSI.subtitle = "Elasticsearch";

    callback(new $.ig.RevealDataSources([elasticsearchDS], [elasticsearchDSI], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Elasticsearch data source item listed in the "Select a Data Source" dialog.

## Additional Resources

- [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Elasticsearch SQL Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/xpack-sql.html)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVElasticsearchDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Elasticsearch.RVElasticsearchDataSource.html) - Represents an Elasticsearch data source
* [RVElasticsearchDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Elasticsearch.RVElasticsearchDataSourceItem.html) - Represents an Elasticsearch data source item

</TabItem>
<TabItem value="node" label="Node.js">

* [RVElasticsearchDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvelasticsearchdatasource.html) - Represents an Elasticsearch data source
* [RVElasticsearchDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvelasticsearchdatasourceitem.html) - Represents an Elasticsearch data source item

</TabItem>
</Tabs>
