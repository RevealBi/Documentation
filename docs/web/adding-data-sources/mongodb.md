---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding a MongoDB Data Source

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

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVMongoDBDataSource` object. Set the `connectionString`, `database` and `Title` properties to values that correspond to your MongoDB Server. After you have created the `RVMongoDBDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    var mongoDataSource = new $.ig.RVMongoDataSource();
    mongoDataSource.connectionString = "your-db-connectionString";
    mongoDataSource.database = "your-db-name";
    mongoDataSource.title = "My MongoDB";

    callback(new $.ig.RevealDataSources([sqlDataSource], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created MongoDB data source listed in the "Select a Data Source" dialog.

![](images/mongodb-data-source.jpg)

**Step 3** - Add a new Data Source Item by creating a new instance of the `RVMongoDBDataSourceItem` object. Set the `id`,`title`, and `collection` properties that correspond to your database table. After you have created the `RVMongoDBDataSourceItem` object, add it to the data source items collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    var mongoDataSource = new $.ig.RVMongoDBDataSource();
    mongoDataSource.connectionString = "your-db-connectionString";
    mongoDataSource.database = "your-db-name";
    mongoDataSource.title = "My MongoDB";

    var mongoDsi = new $.ig.RVMongoDBDataSourceItem(mongoDataSource);
    mongoDsi.id = "MyMongoDatasourceItem";
    mongoDsi.title = "My MongoDB Item";
    mongoDsi.collection = "CollectionName";    

    callback(new $.ig.RevealDataSources([mongoDataSource], [mongoDsi], false));
};
```

When the application runs, create a new Visualization and you will see the newly created MongoDB data source item listed in the "Select a Data Source" dialog.

![](images/mongodb-data-source-item.jpg)

## On the Server

**Step 1** - Create the data source and data source item on the client, but do not provide any connection information. Only provide an `id`, `title`, and/or `subtitle`.

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    
    var mongoDS = new $.ig.RVMongoDBDataSource();
    mongoDS.id = "MyMongoDBDataSource";
    mongoDS.title = "My MongoDB";

    var mongoDSI = new $.ig.RVMongoDBDataSourceItem(mongoDS);
    mongoDSI.id = "MyMongoDBDataSourceItem";
    mongoDSI.title = "My MongoDB Item";

    callback(new $.ig.RevealDataSources([mongoDS], [mongoDSI], false));
};
```

**Step 2** - Create the data source provider. In this example, we are providing connection information to connect to our **MongoDB** database that was defined on the client. To achieve this, we determine the type of the data source/item we are working with, and set the available properties on the object.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
        if (dataSourceItem is RVMongoDBDataSourceItem mongoDsi)
        {
            //required: update underlying data source
            ChangeDataSourceAsync(userContext, mongoDsi.DataSource);

            //only change the table if we have selected our data source item
            if (mongoDsi.Id == "MyMongoDatasourceItem")
            {
                //set the collection
                mongoDsi.collection = "orders";
            }
        }
        return Task.FromResult(dataSourceItem);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVMongoDBDataSource mongoDatasource)
        {
            mongoDatasource.connectionString = "mongodb+srv://cluster0.ta2xrrt.mongodb.net/";
            mongoDatasource.database = "test";
        }
        return Task.FromResult(dataSource);
    }
}
```

  </TabItem>

  <TabItem value="java" label="Java">



  </TabItem>

  <TabItem value="node" label="Node.js">    

```ts
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
	if (dataSourceItem instanceof RVMongoDBDataSourceItem) {

		//required: update underlying data source
		dataSourceProvider(userContext, dataSourceItem.dataSource);

		//only change the collection if we have selected our data source item
		if (dataSourceItem.id === "MyMongoDBDatasourceItem") {
			dataSourceItem.collection = "orders";
		}		
	}
	return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVSqlServerDataSource) {
		dataSource.connectionString = "mongodb+srv://cluster0.ta2xrrt.mongodb.net/";
		dataSource.database = "test";
	}
	return dataSource;
}
```

  </TabItem>

</Tabs>

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/MongoDB)

:::