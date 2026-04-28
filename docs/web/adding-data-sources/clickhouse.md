---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ClickHouse Data Source

## Introduction

ClickHouse is a high-performance column-oriented database management system designed for real-time analytics and large-scale data processing. This topic explains how to connect to ClickHouse data sources in your Reveal application to browse tables or visualize data from custom SQL queries.

## Server Configuration

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

**Step 1** - Install the Reveal ClickHouse connector package

For ASP.NET applications, you need to install a separate NuGet package to enable ClickHouse support:

```bash
dotnet add package Reveal.Sdk.Data.ClickHouse
```

**Step 2** - Register the ClickHouse data source in your application:

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterClickHouse();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the ClickHouse data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="java" label="Java">

For Java applications, the ClickHouse data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
</Tabs>

### Connection Configuration

ClickHouse is typically configured on the server side. This is the recommended approach because it keeps connection settings and credentials out of the client.

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

        if (dataSourceItem is RVClickHouseDataSourceItem clickHouseItem)
        {
            // Configure table-based access
            if (clickHouseItem.Id == "clickhouse_orders_table")
            {
                clickHouseItem.Database = "analytics";
                clickHouseItem.Table = "orders";
                clickHouseItem.ProcessDataOnServer = true;
            }

            // Or configure custom-query-based access
            if (clickHouseItem.Id == "clickhouse_orders_query")
            {
                clickHouseItem.Database = "analytics";
                clickHouseItem.CustomQuery = "SELECT order_date, region, total_amount FROM orders";
                clickHouseItem.ProcessDataOnServer = true;
            }
        }

        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVClickHouseDataSource clickHouseDS)
        {
            // Configure connection properties
            clickHouseDS.Host = "your-clickhouse-host";
            clickHouseDS.Port = 8443;
            clickHouseDS.Database = "analytics";

            // Optional properties
            clickHouseDS.Protocol = "https";
            clickHouseDS.Path = "/";
            clickHouseDS.Timeout = 30;
            clickHouseDS.SkipServerCertificateValidation = false;
            clickHouseDS.ProcessDataOnServerDefaultValue = true;
            clickHouseDS.ProcessDataOnServerReadOnly = false;
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

    if (dataSourceItem instanceof reveal.RVClickHouseDataSourceItem) {
        // Configure table-based access
        if (dataSourceItem.id === "clickhouse_orders_table") {
            dataSourceItem.database = "analytics";
            dataSourceItem.table = "orders";
            dataSourceItem.processDataOnServer = true;
        }

        // Or configure custom-query-based access
        if (dataSourceItem.id === "clickhouse_orders_query") {
            dataSourceItem.database = "analytics";
            dataSourceItem.customQuery = "SELECT order_date, region, total_amount FROM orders";
            dataSourceItem.processDataOnServer = true;
        }
    }

    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVClickHouseDataSource) {
        // Configure connection properties
        dataSource.host = "your-clickhouse-host";
        dataSource.port = 8443;
        dataSource.database = "analytics";

        // Optional properties
        dataSource.protocol = "https";
        dataSource.path = "/";
        dataSource.timeout = 30;
        dataSource.skipServerCertificateValidation = false;
        dataSource.processDataOnServerDefaultValue = true;
        dataSource.processDataOnServerReadOnly = false;
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

    if (dataSourceItem instanceof RVClickHouseDataSourceItem) {
        // Configure table-based access
        if (dataSourceItem.id === "clickhouse_orders_table") {
            dataSourceItem.database = "analytics";
            dataSourceItem.table = "orders";
            dataSourceItem.processDataOnServer = true;
        }

        // Or configure custom-query-based access
        if (dataSourceItem.id === "clickhouse_orders_query") {
            dataSourceItem.database = "analytics";
            dataSourceItem.customQuery = "SELECT order_date, region, total_amount FROM orders";
            dataSourceItem.processDataOnServer = true;
        }
    }

    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVClickHouseDataSource) {
        // Configure connection properties
        dataSource.host = "your-clickhouse-host";
        dataSource.port = 8443;
        dataSource.database = "analytics";

        // Optional properties
        dataSource.protocol = "https";
        dataSource.path = "/";
        dataSource.timeout = 30;
        dataSource.skipServerCertificateValidation = false;
        dataSource.processDataOnServerDefaultValue = true;
        dataSource.processDataOnServerReadOnly = false;
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

        if (dataSourceItem instanceof RVClickHouseDataSourceItem clickHouseItem) {
            // Configure table-based access
            if ("clickhouse_orders_table".equals(clickHouseItem.getId())) {
                clickHouseItem.setDatabase("analytics");
                clickHouseItem.setTable("orders");
                clickHouseItem.setProcessDataOnServer(true);
            }

            // Or configure custom-query-based access
            if ("clickhouse_orders_query".equals(clickHouseItem.getId())) {
                clickHouseItem.setDatabase("analytics");
                clickHouseItem.setCustomQuery("SELECT order_date, region, total_amount FROM orders");
                clickHouseItem.setProcessDataOnServer(true);
            }
        }

        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVClickHouseDataSource clickHouseDS) {
            // Configure connection properties
            clickHouseDS.setHost("your-clickhouse-host");
            clickHouseDS.setPort(8443);
            clickHouseDS.setDatabase("analytics");

            // Optional properties
            clickHouseDS.setProtocol("https");
            clickHouseDS.setPath("/");
            clickHouseDS.setTimeout(30);
            clickHouseDS.setSkipServerCertificateValidation(false);
            clickHouseDS.setProcessDataOnServerDefaultValue(true);
            clickHouseDS.setProcessDataOnServerReadOnly(false);
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

ClickHouse supports both table-based access and custom-query-based access. The `database` property defines the Reveal schema boundary. If both `Table` and `CustomQuery` are set on an `RVClickHouseDataSourceItem`, `CustomQuery` takes precedence.

### Authentication

Authentication for ClickHouse is handled on the server side using username and password credentials. For general authentication details, see the [Authentication](/web/authentication#usernamepassword-authentication) topic.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVClickHouseDataSource)
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
    if (dataSource instanceof reveal.RVClickHouseDataSource) {
        return new reveal.RVUsernamePasswordDataSourceCredential("username", "password");
    }
    return null;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```ts
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVClickHouseDataSource) {
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
        if (dataSource instanceof RVClickHouseDataSource) {
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

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVClickHouseDataSource` object. Set the `id`, `title`, and `subtitle` properties. After you have created the `RVClickHouseDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const clickHouseDS = new $.ig.RVClickHouseDataSource();
    clickHouseDS.id = "clickhouse";
    clickHouseDS.title = "ClickHouse";
    clickHouseDS.subtitle = "Data Source";

    callback(new $.ig.RevealDataSources([clickHouseDS], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created ClickHouse data source listed in the "Select a Data Source" dialog.

### Creating Data Source Items

Data source items represent specific datasets within your ClickHouse data source that users can select for visualization. On the client side, you only need to specify ID, title, and subtitle.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const clickHouseDS = new $.ig.RVClickHouseDataSource();
    clickHouseDS.id = "clickhouse";
    clickHouseDS.title = "My ClickHouse Datasource";
    clickHouseDS.subtitle = "ClickHouse";

    // Create a table-based data source item
    const clickHouseTableItem = new $.ig.RVClickHouseDataSourceItem(clickHouseDS);
    clickHouseTableItem.id = "clickhouse_orders_table";
    clickHouseTableItem.title = "Orders Table";
    clickHouseTableItem.subtitle = "ClickHouse";

    // Create a custom-query-based data source item
    const clickHouseQueryItem = new $.ig.RVClickHouseDataSourceItem(clickHouseDS);
    clickHouseQueryItem.id = "clickhouse_orders_query";
    clickHouseQueryItem.title = "Orders Query";
    clickHouseQueryItem.subtitle = "ClickHouse";

    callback(new $.ig.RevealDataSources([clickHouseDS], [clickHouseTableItem, clickHouseQueryItem], false));
};
```

When the application runs, create a new Visualization and you will see the newly created ClickHouse data source items listed in the "Select a Data Source" dialog.

## Additional Resources

- [ClickHouse Documentation](https://clickhouse.com/docs)
- [ClickHouse SQL Reference](https://clickhouse.com/docs/sql-reference)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVClickHouseDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.ClickHouse.RVClickHouseDataSource.html) - Represents a ClickHouse data source
* [RVClickHouseDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.ClickHouse.RVClickHouseDataSourceItem.html) - Represents a ClickHouse data source item

</TabItem>
<TabItem value="node" label="Node.js">

* [RVClickHouseDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvclickhousedatasource.html) - Represents a ClickHouse data source
* [RVClickHouseDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvclickhousedatasourceitem.html) - Represents a ClickHouse data source item

</TabItem>
</Tabs>
