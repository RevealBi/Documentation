---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding a PostgreSQL Data Source

:::danger breaking changes

Currently, the Reveal SDK is in the process of decoupling the data sources from the Reveal SDK core package. In order to ensure the project's continued functionality, you might be required to install additional packages into your project. Please see the [Supported Data Sources](web/datasources.md#supported-data-sources) topic for more information.

:::

## On the Client

**Step 1** - Add an event handler for the `RevealView.onDataSourcesRequested` event.

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    //add code here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVPostgresDataSource` object. Set the `Host`, `Database`, `Port`, and `Title` properties to values that correspond to your PostgreSQL server. After you have created the `RVPostgresDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    var postgresDataSource = new $.ig.RVPostgresDataSource();
    postgresDataSource.host = "your-db-host";
    postgresDataSource.database = "your-db-name";
    postgresDataSource.port = 1234;
    postgresDataSource.title = "My PostgreSQL";

    callback(new $.ig.RevealDataSources([postgresDataSource], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created PostgreSQL data source listed in the "Select a Data Source" dialog.

![](images/postgres-data-source.jpg)

**Step 3** - Add a new Data Source Item by creating a new instance of the `RVPostgresDataSourceItem` object. Set the `Id`,`Title`, and `Table` properties that correspond to your database table. After you have created the `RVPostgresDataSourceItem` object, add it to the data source items collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    var postgresDataSource = new $.ig.RVPostgresDataSource();
    postgresDataSource.host = "your-db-host";
    postgresDataSource.database = "your-db-name";
    postgresDataSource.port = 1234;
    postgresDataSource.title = "My PostgreSQL";

    var postgresDsi = new $.ig.RVPostgresDataSourceItem(postgresDataSource);
    postgresDsi.id = "MyPostgresDataSourceItem";
    postgresDsi.title = "My PostgreSQL Item";
    postgresDsi.table = "TableName";    

    callback(new $.ig.RevealDataSources([postgresDataSource], [postgresDsi], false));
};
```

When the application runs, create a new Visualization and you will see the newly created PostgreSQL data source item listed in the "Select a Data Source" dialog.

![](images/postgres-data-source-item.jpg)

## On the Server

**Step 1** - Create the data source and data source item on the client, but do not provide any connection information. Only provie an `id`, `title`, and/or `subtitle`.

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    
    var postgresDataSource = new $.ig.RVPostgresDataSource();
    postgresDataSource.id = "MyPostgresDataSource";
    postgresDataSource.title = "My PostgreSQL";

    var postgresDsi = new $.ig.RVPostgresDataSourceItem(postgresDataSource);
    postgresDsi.id = "MyPostgresDataSourceItem";
    postgresDsi.title = "My PostgreSQL Item";

    callback(new $.ig.RevealDataSources([postgresDataSource], [postgresDsi], false));
};
```

**Step 2** - Create the data source provider. In this example, we are providing connection information to connect to our **PostgreSQL** database that was defined on the client. To achieve this, we determine the type of the data source/item we are working with, and set the available properties on the object.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
        RVDataSourceItem dataSourceItem)
    {
        if (dataSourceItem is RVPostgresDataSourceItem postgresDataSourceItem)
        {
            //update underlying data source
            ChangeDataSourceAsync(userContext, postgresDataSourceItem.DataSource);

            //only change the table if we have selected our custom data source item
            if (postgresDataSourceItem.Id == "MyPostgresDataSourceItem")
            {
                postgresDataSourceItem.Table = "orders";
            }
        }

        return Task.FromResult(dataSourceItem);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
        RVDashboardDataSource dataSource)
    {
        if (dataSource is RVPostgresDataSource postgresDataSource)
        {
            postgresDataSource.Host = "localhost";
            postgresDataSource.Database = "database";
            postgresDataSource.Schema = "public";
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

        if (dataSourceItem instanceof RVPostgresDataSourceItem postgresDataSourceItem) {

            //update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (dataSourceItem.getId() == "MyPostgresDataSourceItem") {
                postgresDataSourceItem.setTable("orders");
            }
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        if (dataSource instanceof RVPostgresDataSource postgresDataSource) {
            postgresDataSource.setHost("localhost");
            postgresDataSource.setDatabase("database");
            postgresDataSource.setSchema("public");
        }
        return dataSource;
    }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```js
const dataSourceItemProvider = async (userContext, dataSourceItem) => {
    if (dataSourceItem instanceof reveal.RVPostgresDataSourceItem) {

        //update underlying data source
        dataSourceProvider(userContext, dataSourceItem.dataSource);

        //only change the table if we have selected our data source item
        if (dataSourceItem.id === "MyPostgresDataSourceItem") {
            dataSourceItem.table = "orders";
        }
    }
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVPostgresDataSource) {
        dataSource.host = "localhost";
        dataSource.database = "database";
        dataSource.schema = "public";
    }
    return dataSource;
}
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    if (dataSourceItem instanceof RVPostgresDataSourceItem) {

        //update underlying data source
        dataSourceProvider(userContext, dataSourceItem.dataSource);

        //only change the table if we have selected our data source item
        if (dataSourceItem.id === "MyPostgresDataSourceItem") {
            dataSourceItem.table = "orders";
        }
    }
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVPostgresDataSource) {
        dataSource.host = "localhost";
        dataSource.database = "database";
        dataSource.schema = "public";
    }
    return dataSource;
}
```

  </TabItem>

</Tabs>

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/PostgreSQL)

:::