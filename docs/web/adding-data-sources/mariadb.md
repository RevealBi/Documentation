---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding a MariaDB Data Source

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

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVMariaDBDataSource` object. Set the `Host`, `Database`, `Port`, and `Title` properties to values that correspond to your MariaDB server. After you have created the `RVMariaDBDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    var mariadbDataSource = new $.ig.RVMariaDBDataSource();
    mariadbDataSource.host = "your-db-host";
    mariadbDataSource.database = "your-db-name";
    mariadbDataSource.port = 1234;
    mariadbDataSource.title = "MariaDB DS";

    callback(new $.ig.RevealDataSources([mariadbDataSource], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created MariaDB data source listed in the "Select a Data Source" dialog.

![](images/mariadb-data-source.jpg)

**Step 3** - Add a new Data Source Item by creating a new instance of the `RVMariaDBDataSourceItem` object. Set the `Id`,`Title`, and `Table` properties that correspond to your database table. After you have created the `RVMariaDBDataSourceItem` object, add it to the data source items collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    var mariadbDataSource = new $.ig.RVMariaDBDataSource();
    mariadbDataSource.host = "your-db-host";
    mariadbDataSource.database = "your-db-name";
    mariadbDataSource.port = 1234;
    mariadbDataSource.title = "MariaDB DS";

    var mariadbDsi = new $.ig.RVMariaDBDataSourceItem(mariadbDataSource);
    mariadbDsi.id = "MyMariaDBDataSourceItem";
    mariadbDsi.title = "MariaDB DSItem";
    mariadbDsi.table = "TableName";    

    callback(new $.ig.RevealDataSources([mariadbDataSource], [mariadbDsi], false));
};
```

When the application runs, create a new Visualization and you will see the newly created MariaDB data source item listed in the "Select a Data Source" dialog.

![](images/mariadb-data-source-item.jpg)

## On the Server

**Step 1** - Create the data source and data source item on the client, but do not provide any connection information. Only provide an `id`, `title`, and/or `subtitle`.

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {

    var mariadbDataSource = new $.ig.RVMariaDBDataSource();
    mariadbDataSource.id = "MyMariaDBDataSource";
    mariadbDataSource.title = "MariaDB DS";

    var mariadbDataSourceItem = new $.ig.RVMariaDBDataSourceItem(mariadbDataSource);
    mariadbDataSourceItem.id = "MyMariaDBDataSourceItem";
    mariadbDataSourceItem.title = "MariaDB DSItem";

    callback(new $.ig.RevealDataSources([mariadbDataSource], [mariadbDataSourceItem], true));
};
```

**Step 2** - Create the data source provider. In this example, we are providing connection information to connect to our **MariaDB** database that was defined on the client. To achieve this, we determine the type of the data source/item we are working with, and set the available properties on the object.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
        RVDataSourceItem dataSourceItem)
    {
        if (dataSourceItem is RVMariaDBDataSourceItem mariadbDataSourceItem)
        {
            //update underlying data source
            ChangeDataSourceAsync(userContext, mariadbDataSourceItem.DataSource);

            //only change the table if we have selected our custom data source item
            if (mariadbDataSourceItem.Id == "MyMariaDBDataSourceItem")
            {
                mariadbDataSourceItem.Table = "orders";
            }
        }

        return Task.FromResult(dataSourceItem);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
        RVDashboardDataSource dataSource)
    {
        if (dataSource is RVMariaDBDataSource mariadbDataSource)
        {
            mariadbDataSource.Host = "localhost";
            mariadbDataSource.Database = "database";
        }

        return Task.FromResult(dataSource);
    }
}
```

  </TabItem>



  <TabItem value="node" label="Node.js">

```js
const dataSourceItemProvider = async (userContext, dataSourceItem) => {
    if (dataSourceItem instanceof reveal.RVMariaDBDataSourceItem) {

        //update underlying data source
        dataSourceProvider(userContext, dataSourceItem.dataSource);

        //only change the table if we have selected our data source item
        if (dataSourceItem.id === "MyMariaDBDataSourceItem") {
            dataSourceItem.table = "orders";
        }
    }
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVMariaDBDataSource) {
        dataSource.host = "localhost";
        dataSource.database = "database";
    }
    return dataSource;
}
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    if (dataSourceItem instanceof RVMariaDBDataSourceItem) {

        //update underlying data source
        dataSourceProvider(userContext, dataSourceItem.dataSource);

        //only change the table if we have selected our data source item
        if (dataSourceItem.id === "MyMariaDBDataSourceItem") {
            dataSourceItem.table = "orders";
        }
    }
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVMariaDBDataSource) {
        dataSource.host = "localhost";
        dataSource.database = "database";
    }
    return dataSource;
}
```

  </TabItem>

</Tabs>

:::warning Error Messages

MariaDB is a MySQL based datasource, and it's common for drivers and error messages to reference MySQL even when connected to MariaDB.

:::

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/MariaDB).

:::
