---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Snowflake Data Source

## Introduction

Snowflake is a cloud-based data warehousing platform that provides scalable storage and compute resources for data analytics, data sharing, and business intelligence workloads. This topic explains how to connect to Snowflake data sources in your Reveal application to visualize and analyze your data.

## Server Configuration

### Connection Configuration

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
        RVDataSourceItem dataSourceItem)
    {
        if (dataSourceItem is RVSnowflakeDataSourceItem snowflakeDataSourceItem)
        {
            //update underlying data source
            ChangeDataSourceAsync(userContext, snowflakeDataSourceItem.DataSource);

            //only change the table if we have selected our custom data source item
            if (snowflakeDataSourceItem.Id == "MySnowflakeDataSourceItem")
            {
                snowflakeDataSourceItem.Schema = "TPCDS_SF100TCL";
                snowflakeDataSourceItem.Table = "CUSTOMER";
            }
        }

        return Task.FromResult(dataSourceItem);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
        RVDashboardDataSource dataSource)
    {
        if (dataSource is RVSnowflakeDataSource snowflakeDataSource)
        {
            snowflakeDataSource.Account = "your-account";
            snowflakeDataSource.Host = "your-account-host";
            snowflakeDataSource.Database = "SNOWFLAKE_SAMPLE_DATA";
        }

        return Task.FromResult(dataSource);
    }
}
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
public class DataSourceProvider implements IRVDataSourceProvider {
    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

        if (dataSourceItem instanceof RVSnowflakeDataSourceItem snowflakeDataSourceItem) {

            //update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (Objects.equals(dataSourceItem.getId(), "MySnowflakeDataSourceItem")) {
                snowflakeDataSourceItem.setSchema("TPCDS_SF100TCL");
                snowflakeDataSourceItem.setTable("CUSTOMER");
            }
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        if (dataSource instanceof RVSnowflakeDataSource snowflakeDataSource) {
            snowflakeDataSource.setAccount("your-account");
            snowflakeDataSource.setHost("your-account-host");
            snowflakeDataSource.setDatabase("SNOWFLAKE_SAMPLE_DATA");
        }
        return dataSource;
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const dataSourceItemProvider = async (userContext, dataSourceItem) => {
    if (dataSourceItem instanceof reveal.RVSnowflakeDataSourceItem) {

        //update underlying data source
        dataSourceProvider(userContext, dataSourceItem.dataSource);

        //only change the table if we have selected our data source item
        if (dataSourceItem.id === "MySnowflakeDataSourceItem") {
            dataSourceItem.schema = "TPCDS_SF100TCL";
            dataSourceItem.table = "CUSTOMER";
        }
    }
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVSnowflakeDataSource) {
        dataSource.account = "your-account";
        dataSource.host = "your-account-host";
        dataSource.database = "SNOWFLAKE_SAMPLE_DATA";
    }
    return dataSource;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```ts
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    if (dataSourceItem instanceof RVSnowflakeDataSourceItem) {

        //update underlying data source
        dataSourceProvider(userContext, dataSourceItem.dataSource);

        //only change the table if we have selected our data source item
        if (dataSourceItem.id === "MySnowflakeDataSourceItem") {
            dataSourceItem.schema = "TPCDS_SF100TCL";
            dataSourceItem.table = "CUSTOMER";
        }
    }
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVSnowflakeDataSource) {
        dataSource.account = "your-account";
        dataSource.host = "your-account-host";
        dataSource.database = "SNOWFLAKE_SAMPLE_DATA";
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

Authentication for Snowflake is handled on the server side using username and password credentials. For detailed information on all authentication options, see the [Authentication](../authentication.md) topic.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVSnowflakeDataSource)
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
    if (dataSource instanceof reveal.RVSnowflakeDataSource) {
        return new reveal.RVUsernamePasswordDataSourceCredential("username", "password");
    }
    return null;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```ts
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVSnowflakeDataSource) {
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
        if (dataSource instanceof RVSnowflakeDataSource) {
            return new RVUsernamePasswordDataSourceCredential("username", "password");
        }
        return null;
    }
}
```

  </TabItem>
</Tabs>

## Client-Side Implementation

### Creating Data Sources

**Step 1** - Add an event handler for the `RevealView.onDataSourcesRequested` event.

```js
const revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    // Add data source here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVSnowflakeDataSource` object. Set the `title` and `subtitle` properties. After you have created the `RVSnowflakeDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const snowflakeDS = new $.ig.RVSnowflakeDataSource();
    snowflakeDS.title = "Snowflake";
    snowflakeDS.subtitle = "Data Source";

    callback(new $.ig.RevealDataSources([snowflakeDS], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Snowflake data source listed in the "Select a Data Source" dialog.

![](images/snowflake-data-source.jpg)

### Creating Data Source Items

Data source items represent specific datasets within your Snowflake data source that users can select for visualization. On the client side, you only need to specify ID, title, and subtitle.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const snowflakeDS = new $.ig.RVSnowflakeDataSource();
    snowflakeDS.title = "My Snowflake Datasource";
    snowflakeDS.subtitle = "Snowflake";

    // Create a data source item
    const snowflakeDSI = new $.ig.RVSnowflakeDataSourceItem(snowflakeDS);
    snowflakeDSI.id = "MySnowflakeDataSourceItem";
    snowflakeDSI.title = "My Snowflake Datasource Item";
    snowflakeDSI.subtitle = "Snowflake";

    callback(new $.ig.RevealDataSources([snowflakeDS], [snowflakeDSI], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Snowflake data source item listed in the "Select a Data Source" dialog.

![](images/snowflake-data-source-item.jpg)

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/Snowflake)

:::
