import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DataSourcesTable from '@site/src/components/DataSourcesTable';

# Data Sources

:::danger breaking changes

Currently, the Reveal SDK is in the process of decoupling the data sources from the Reveal SDK core package. In order to ensure the project's continued functionality, you might be required to install additional packages into your project. Please see the [Supported Data Sources](web/datasources.md#supported-data-sources) topic for more information.

:::

The Reveal SDK supports over 30 data sources, including analytics tools, content managers, cloud services, CRMs, databases, spreadsheets, and public data sources, with more shipping every month.  Data sources define where the data comes from in a dashboard, with each data source having unique properties, like connection strings, user id, password, and more that you set in code to connect to and retrieve data.

The Reveal SDK has two concepts regarding data sources.
1. A data source - this is the primary source of the data. For example, SQL Server could be a data source
2. A data source item - this is the specific item that is available from a data source. For example; a specific Table from SQL Server.

Data Sources (Data Stores) and Data Source Items (Data Items) are categorized separately in the Reveal View **Select a Data Source** dialog.

![](adding-data-sources/images/ms-sql-server-data-source-item.jpg)

There are two approaches to creating data sources in the Reveal SDK.
1. On the client
2. On the server

## Installing Data Sources

Before creating data sources for use in the Reveal SDK, you must install the correct package for each data source you wish to use in your Reveal SDK application.

**Step 1** - Install the package for the data source you would like to use. To learn which data sources are supported and which packages you must install, refer to the [Supported Data Sources](#supported-data-sources) section.

**Step 2** - After you have installed the data source package, register the data source with the Reveal SDK.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
using Reveal.Sdk;
using Reveal.Sdk.Data;

builder.Services.AddControllers().AddReveal( builder =>
{
    //all data sources use the RegisterXXX naming convention
    builder.DataSources.RegisterMicrosoftSqlServer();
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
Coming Soon...
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
Coming Soon...
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
Coming Soon...
```

  </TabItem>

</Tabs>

## Creating Data Sources on the Client

To add a data source or data source item on the client, add an event handler to the `RevealView.onDataSourcesRequested` event. In the event handler, you will write code to create instances of various types of data sources, or data source items, that will be used in the dashboard. You then pass those instances to the `callback` to make them available in the **Select a Data Source** dialog.

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {

    //provide all data sources and data source items in callback
    callback(new $.ig.RevealDataSources([], [], false));
};
```
- Data Sources are provided as an array in the first parameter in the callback
- Data Source Items are provided as an array in the second parameter in the callback
- The third parameter will determine whether the data sources stored in the dashboard will be visible in the **Select a Data Source** dialog. If `false`, only the data sources created in the `onDataSourcesRequested` event will be visible.

When creating data sources on the client, it is important that all connection information for a data source, or data source item, be provided. For example; if you were creating a data source for **MS SQL Server**, you would need to provide the connection information such as the `host` and `database`. For the data source item, you would need to provide the `table`.

```js
revealView.onDataSourcesRequested = (callback) => {

    var sqlServerDS = new $.ig.RVSqlServerDataSource();
    sqlServerDS.host = "your-db-host";
    sqlServerDS.database = "your-db-name";
    sqlServerDS.title = "My SQL Server";

    var sqlServerDSI = new $.ig.RVSqlServerDataSourceItem(sqlServerDS);
    sqlServerDSI.title = "My SQL Server Item";
    sqlServerDSI.table = "TableName";    

    callback(new $.ig.RevealDataSources([sqlServerDS], [sqlServerDSI], false));
};
```

To learn which properties for a data source or data source item are available, please read the data source's corresponding help topic or refer to the [API Docs](https://help.revealbi.io/api/javascript/latest/)

:::warning

When you create data sources and data source items using JavaScript on the client, all your connection information, such as server names, host names, IP addresses, port numbers, end-points, and more are exposed in the browser. This not only allows users to view these values but also provides them with the ability to modify them. It is crucial to be careful about the information you are exposing and consider any potential security risks associated with using the client-side approach for creating data sources.

:::

## Creating Data Sources on the Server

Creating a data source or data source item on the server is similar to creating them on the client. The main difference being that no connection information is provided on the client. All the connection information is provided on the server by implementing the `IRVDataSourceProvider`.

Start by adding an event handler to the `RevealView.onDataSourcesRequested` event, and create a data source and data source item. In this example, we are using **MS SQL Server**. Notice that we are only setting an `id` which we can use to identify the data source, and the `title` which will be displayed in the **Select a Data Source** dialog.

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    
    var sqlServerDS = new $.ig.RVSqlServerDataSource();
    sqlServerDS.id = "MySqlServerDataSource";
    sqlServerDS.title = "My Sql Server";

    var sqlServerDSI = new $.ig.RVSqlServerDataSourceItem(sqlServerDS);
    sqlServerDSI.id = "MySqlServerDataSourceItem";
    sqlServerDSI.title = "My Sql Server Item";

    callback(new $.ig.RevealDataSources([sqlDataSource], [sqlServerDSI], false));
};
```

Next, in our server application, we need create a data source provider. The data source provider is used to modify the various properties of data sources and data source items which instruct the Reveal SDK how to connect to them.

A data source provider can be created with two steps:

**Step 1** - Create the data source provider. In this example, we are providing connection information to connect to our **MS SQL Server** database that was defined on the client. To achieve this, we determine the type of the data source/item we are working with, and set the available properties on the object.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
        if (dataSourceItem is RVSqlServerDataSourceItem sqlServerDsi)
        {
            //required: update underlying data source
            ChangeDataSourceAsync(userContext, sqlServerDsi.DataSource);

            //only change the table if we have selected our data source item
            if (sqlServerDsi.Id == "MySqlServerDatasourceItem")
            {
                //set the table/view
                sqlServerDsi.Table = "Orders";
            }
        }
        return Task.FromResult(dataSourceItem);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVSqlServerDataSource sqlDatasource)
        {
            sqlDatasource.Host = "10.0.0.20";
            sqlDatasource.Database = "Northwind";
            sqlDatasource.Schema = "dbo";
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

        if (dataSourceItem instanceof RVSqlServerDataSourceItem sqlServerDsi) {            
            //required: update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (dataSourceItem.getId() == "MySqlServerDatasourceItem") {
                sqlServerDsi.setTable("Orders");
            }            
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVSqlServerDataSource sqlDatasource) {
            sqlDatasource.setHost("10.0.0.20");
            sqlDatasource.setDatabase("Northwind");
            sqlDatasource.setSchema("dbo");
        }
        return dataSource;
    }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const dataSourceItemProvider = async (userContext, dataSourceItem) => {
	if (dataSourceItem instanceof reveal.RVSqlServerDataSourceItem) {

		//required: update underlying data source
		dataSourceProvider(userContext, dataSourceItem.dataSource);

		//only change the table if we have selected our data source item
		if (dataSourceItem.id === "MySqlServerDatasourceItem") {
			dataSourceItem.table = "Orders";
		}		
	}
	return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVSqlServerDataSource) {
		dataSource.host = "10.0.0.20";
		dataSource.database = "Northwind";
		dataSource.schema = "dbo";
	}
	return dataSource;
}
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
	if (dataSourceItem instanceof RVSqlServerDataSourceItem) {

		//required: update underlying data source
		dataSourceProvider(userContext, dataSourceItem.dataSource);

		//only change the table if we have selected our data source item
		if (dataSourceItem.id === "MySqlServerDatasourceItem") {
			dataSourceItem.table = "Orders";
		}		
	}
	return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVSqlServerDataSource) {
		dataSource.host = "10.0.0.20";
		dataSource.database = "Northwind";
		dataSource.schema = "dbo";
	}
	return dataSource;
}
```

  </TabItem>

</Tabs>

**Step 2** - Register the data source provider with the Reveal SDK.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddDataSourceProvider<DataSourceProvider>();
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
RevealEngineInitializer.initialize(new InitializeParameterBuilder().
    setDataSourceProvider(new DataSourceProvider()).
    build());
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const revealOptions = {
	dataSourceProvider: dataSourceProvider,
	dataSourceItemProvider: dataSourceItemProvider,
}
app.use('/', reveal(revealOptions));
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const revealOptions: RevealOptions = {
	dataSourceProvider: dataSourceProvider,
	dataSourceItemProvider: dataSourceItemProvider,
}
app.use('/', reveal(revealOptions));
```

  </TabItem>

</Tabs>

:::danger Important

Any changes made to the data source in the `ChangeDataSourceAsync` method are not carried over into the `ChangeDataSourceItemAsync` method. You **must** update the data source properties in both methods. We recommend calling the `ChangeDataSourceAsync` method within the `ChangeDataSourceItemAsync` method passing the data source item's underlying data source as the parameter as shown in the example above.

:::

## Supported Data Sources

:::tip Enhancments Coming

Currently, the Reveal SDK is in the process of decoupling the data sources from the Reveal SDK core package. Not only will this reduce the size of your application, it will also make releasing new data sources and updating existing data sources easier. We appreciate your patience as we work towards this next evolution of the Reveal SDK.

:::

Use the table below to see which data sources are supported and which packages you must install for your target framework.

<DataSourcesTable></DataSourcesTable>

_**Included in SDK** - there is not a separate package to install for this data source. The data source ships with the Reveal SDK._
