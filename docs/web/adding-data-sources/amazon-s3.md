---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon S3 Data Source

## Introduction

Amazon Simple Storage Service (Amazon S3) is an object storage service offering industry-leading scalability, data availability, security, and performance. This topic explains how to connect to Amazon S3 data sources in your Reveal application to visualize and analyze your data.

## Server Configuration

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

For ASP.NET applications, you need to install a separate NuGet package to enable Amazon S3 support:

```bash
dotnet add package Reveal.Sdk.Data.Amazon.S3
```

Then register the Amazon S3 provider in your application:

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterAmazonS3();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the Amazon S3 data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="java" label="Java">

For Java applications, the Amazon S3 data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

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

        if (dataSourceItem is RVS3DataSourceItem s3Item)
        {            
            // Configure specific item properties as needed
            if (s3Item.Id == "MyS3Item")
            {
                s3Item.Key = "path/to/your/file.csv";
            }
        }
        
        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVS3DataSource s3DS)
        {
            // Configure connection properties
            s3DS.Region = "us-east-1";
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

    if (dataSourceItem instanceof reveal.RVS3DataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MyS3Item") {
            dataSourceItem.key = "path/to/your/file.csv";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVS3DataSource) {
        // Configure connection properties
        dataSource.region = "us-east-1";
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

    if (dataSourceItem instanceof RVS3DataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MyS3Item") {
            dataSourceItem.key = "path/to/your/file.csv";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVS3DataSource) {
        // Configure connection properties
        dataSource.region = "us-east-1";
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

        if (dataSourceItem instanceof RVS3DataSourceItem s3Item) {            
            // Configure specific item properties if needed
            if ("MyS3Item".equals(dataSourceItem.getId())) {
                s3Item.setKey("path/to/your/file.csv");
            }
        }
        
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVS3DataSource s3DS) {
            // Configure connection properties
            s3DS.setRegion("us-east-1");
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

Authentication for Amazon S3 is handled on the server side using AWS credentials. For detailed information on authentication options, see the [Authentication](../authentication.md#amazon-web-services) topic.

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

```typescript
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
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

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVS3DataSource` object. Set the `title` and `subtitle` properties. After you have created the `RVS3DataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const s3DS = new $.ig.RVS3DataSource();
    s3DS.title = "My S3 Server";
    s3DS.subtitle = "Amazon S3";
    
    callback(new $.ig.RevealDataSources([s3DS], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Amazon S3 data source listed in the "Select a Data Source" dialog.

![](images/amazon-s3-data-source.jpg)

### Creating Data Source Items

Data source items represent specific files or objects within your S3 bucket that users can select for visualization. On the client side, you only need to specify ID, title, and subtitle.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const s3DS = new $.ig.RVS3DataSource();
    s3DS.title = "My S3 Server";
    s3DS.subtitle = "Amazon S3";
    
    // Create a data source item
    const s3DSI = new $.ig.RVS3DataSourceItem(s3DS);
    s3DSI.id = "MyS3Item";
    s3DSI.title = "My S3 Item";
    s3DSI.subtitle = "Amazon S3";

    callback(new $.ig.RevealDataSources([s3DS], [s3DSI], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Amazon S3 data source item listed in the "Select a Data Source" dialog.

## Additional Resources

- [Sample Source Code on GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/Amazon-S3)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVS3DataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Amazon.S3.RVS3DataSource.html) - Represents an Amazon S3 data source
* [RVS3DataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Amazon.S3.RVS3DataSourceItem.html) - Represents an Amazon S3 data source item

</TabItem>
<TabItem value="node" label="Node.js">

* [RVS3DataSource](https://help.revealbi.io/api/javascript/latest/classes/rvs3datasource.html) - Represents an Amazon S3 data source
* [RVS3DataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvs3datasourceitem.html) - Represents an Amazon S3 data source item

</TabItem>
</Tabs>
