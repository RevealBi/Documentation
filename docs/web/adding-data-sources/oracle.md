---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding an Oracle Data Source

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

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVOracleSIDDataSource` or `RVOracleServiceDataSource` object (depending on your setup). Set the `Host`, `Database`, `Port`, `Title` and `SID` or `Service` (depending on if you are using SID or Service Name) properties to values that correspond to your Oracle server. After you have created the `RVOracleXXXXDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    //if you are using SID
    const oracleSIDDataSource = new $.ig.RVOracleSIDDataSource();
    oracleSIDDataSource.id = "MyOracleSIDDataSource";
    oracleSIDDataSource.title = "My Oracle SID";
    oracleSIDDataSource.host = "your-host";
    oracleSIDDataSource.port = "your-port";
    oracleSIDDataSource.database = "your-database";

    //if you are using Service Name
    const oracleServiceDataSource = new $.ig.RVOracleServiceDataSource();
    oracleServiceDataSource.id = "MyOracleServiceDataSource";
    oracleServiceDataSource.title = "My Oracle Service";
    oracleServiceDataSource.host = "your-host";
    oracleServiceDataSource.port = "your-port";
    oracleServiceDataSource.database = "your-database";

    callback(new $.ig.RevealDataSources([oracleSIDDataSource, oracleServiceDataSource], [], true));
};
```

When the application runs, create a new Visualization and you will see the newly created Oracle data source listed in the "Select a Data Source" dialog.

![](images/oracle-data-source.jpg)

**Step 3** - Add a new Data Source Item by creating a new instance of the `RVOracleDataSourceItem` object. Set the `Id`,`Title`, and `Table` properties that correspond to your database table. After you have created the `RVOracleDataSourceItem` object, add it to the data source items collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    //if you are using SID
    const oracleSIDDataSource = new $.ig.RVOracleSIDDataSource();
    oracleSIDDataSource.id = "MyOracleSIDDataSource";
    oracleSIDDataSource.title = "My Oracle SID";
    oracleSIDDataSource.host = "your-host";
    oracleSIDDataSource.port = "your-port";
    oracleSIDDataSource.database = "your-database";

    //if you are using Service Name
    const oracleServiceDataSource = new $.ig.RVOracleServiceDataSource();
    oracleServiceDataSource.id = "MyOracleServiceDataSource";
    oracleServiceDataSource.title = "My Oracle Service";
    oracleServiceDataSource.host = "your-host";
    oracleServiceDataSource.port = "your-port";
    oracleServiceDataSource.database = "your-database";

    const oracleSIDDataSourceItem = new $.ig.RVOracleDataSourceItem(oracleSIDDataSource);
    oracleSIDDataSourceItem.id = "MyOracleSIDDataSourceItem";
    oracleSIDDataSourceItem.title = "My Oracle SID Item";

    const oracleServiceDataSourceItem = new $.ig.RVOracleDataSourceItem(oracleServiceDataSource);
    oracleServiceDataSourceItem.id = "MyOracleServiceDataSourceItem";
    oracleServiceDataSourceItem.title = "My Oracle Service Item";

    callback(new $.ig.RevealDataSources([oracleSIDDataSource, oracleServiceDataSource], [oracleSIDDataSourceItem, oracleServiceDataSourceItem], true));
};
```
 
When the application runs, create a new Visualization and you will see the newly created Oracle data source item listed in the "Select a Data Source" dialog.

![](images/oracle-data-source-item.jpg)

## On the Server

**Step 1** - Create the data source and data source item on the client, but do not provide any connection information. Only provie an `id`, `title`, and/or `subtitle`.

```js
revealView.onDataSourcesRequested = (callback) => {
    //if you are using SID
    const oracleSIDDataSource = new $.ig.RVOracleSIDDataSource();
    oracleSIDDataSource.id = "MyOracleSIDDataSource";
    oracleSIDDataSource.title = "My Oracle SID";

    //if you are using Service Name
    const oracleServiceDataSource = new $.ig.RVOracleServiceDataSource();
    oracleServiceDataSource.id = "MyOracleServiceDataSource";
    oracleServiceDataSource.title = "My Oracle Service";

    const oracleSIDDataSourceItem = new $.ig.RVOracleDataSourceItem(oracleSIDDataSource);
    oracleSIDDataSourceItem.id = "MyOracleSIDDataSourceItem";
    oracleSIDDataSourceItem.title = "My Oracle SID Item";

    const oracleServiceDataSourceItem = new $.ig.RVOracleDataSourceItem(oracleServiceDataSource);
    oracleServiceDataSourceItem.id = "MyOracleServiceDataSourceItem";
    oracleServiceDataSourceItem.title = "My Oracle Service Item";

    callback(new $.ig.RevealDataSources([oracleSIDDataSource, oracleServiceDataSource], [oracleSIDDataSourceItem, oracleServiceDataSourceItem], true));
};
``` 

**Step 2** - Create the data source provider. In this example, we are providing connection information to connect to our **Oracle** database that was defined on the client. To achieve this, we determine the type of the data source/item we are working with, and set the available properties on the object.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
        RVDataSourceItem dataSourceItem)
    {
        if (dataSourceItem is RVOracleDataSourceItem oracleDataSourceItem)
        {
            //update underlying data source
            ChangeDataSourceAsync(userContext, oracleDataSourceItem.DataSource);

            //only change the table if we have selected our custom data source item
            if (oracleDataSourceItem.Id == "MyOracleSIDDataSourceItem")
            {
                oracleDataSourceItem.Table = "your-table";
            }
            
            if (oracleDataSourceItem.Id == "MyOracleServiceDataSourceItem")
            {
                oracleDataSourceItem.Table = "your-table";
            }
        }

        return Task.FromResult(dataSourceItem);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
        RVDashboardDataSource dataSource)
    {
        //using SID
        if (dataSource is RVOracleSIDDataSource oracleSidDataSource)
        {
            oracleSidDataSource.Host = "your-host";
            oracleSidDataSource.Database = "your-database";
            oracleSidDataSource.SID = "your-service-sid";
        }

        //using service name
        if (dataSource is RVOracleServiceDataSource oracleServiceDataSource)
        {
            oracleServiceDataSource.Host = "your-host";
            oracleServiceDataSource.Database = "your-database";
            oracleServiceDataSource.Service = "your-service-name";
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

        if (dataSourceItem instanceof RVOracleDataSourceItem oracleDataSourceItem) {

            //update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (Objects.equals(dataSourceItem.getId(), "MyOracleSIDDataSourceItem")) {
                oracleDataSourceItem.setTable("your-table");
            }

            if (Objects.equals(dataSourceItem.getId(), "MyOracleServiceDataSourceItem")) {
                oracleDataSourceItem.setTable("your-table");
            }
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        //using SID
        if (dataSource instanceof RVOracleSIDDataSource oracleSIDDataSource) {
            oracleSIDDataSource.setHost("your-host");
            oracleSIDDataSource.setDatabase("your-database");
            oracleSIDDataSource.setSID("your-sid");
        }

        //using service name
        if (dataSource instanceof RVOracleServiceDataSource oracleServiceDataSource) {
            oracleServiceDataSource.setHost("your-host");
            oracleServiceDataSource.setDatabase("your-database");
            oracleServiceDataSource.setService("your-service-name");
        }

        return dataSource;
    }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```js
const dataSourceItemProvider = async (userContext, dataSourceItem) => {
    if (dataSourceItem instanceof reveal.RVOracleDataSourceItem) {

        //update underlying data source
        dataSourceProvider(userContext, dataSourceItem.dataSource);

        //only change the table if we have selected our data source item
        if (dataSourceItem.id === "MyOracleSIDDataSourceItem") {
            dataSourceItem.table = "your-table";
        }

        if (dataSourceItem.id === "MyOracleServiceDataSourceItem") {
            dataSourceItem.table = "your-table";
        }
    }
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    //using SID
    if (dataSource instanceof reveal.RVOracleSIDDataSource) {
        dataSource.host = "your-host";
        dataSource.database = "your-database";
        dataSource.sID = "your-sid";
    }

    //using service name
    if (dataSource instanceof reveal.RVOracleServiceDataSource) {
        dataSource.host = "your-host";
        dataSource.database = "your-database";
        dataSource.service = "your-service-name";
    }
    return dataSource;
}
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">

```ts
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    if (dataSourceItem instanceof RVOracleDataSourceItem) {

        //update underlying data source
        dataSourceProvider(userContext, dataSourceItem.dataSource);

        //only change the table if we have selected our data source item
        if (dataSourceItem.id === "MyOracleSIDDataSourceItem") {
            dataSourceItem.table = "your-table";
        }

        if (dataSourceItem.id === "MyOracleServiceDataSourceItem") {
            dataSourceItem.table = "your-table";
        }
    }
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    //using SID
    if (dataSource instanceof RVOracleSIDDataSource) {
        dataSource.host = "your-host";
        dataSource.database = "your-database";
        dataSource.sID = "your-sid";
    }

    //using service name
    if (dataSource instanceof RVOracleServiceDataSource) {
        dataSource.host = "your-host";
        dataSource.database = "your-database";
        dataSource.service = "your-service-name";
    }
    return dataSource;
}
```

  </TabItem>

</Tabs>

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/Oracle)

:::