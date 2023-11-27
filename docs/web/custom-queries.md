import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Custom Queries

Custom queries are specially crafted instructions for retrieving or manipulating data in a database according to specific requirements. Unlike predefined queries in database management systems, custom queries are tailored to meet unique or complex data retrieval and manipulation needs.

## On the Client

Add an event handler for the `RevealView.onDataSourcesRequested` event. Create in this step the data sources you want to override with custom queries. In this example, we are using `RVSqlServerDataSource` to connect to our SQL Server.

```js
revealView.onDataSourcesRequested = (callback) => {
    const sqlServerDataSource = new $.ig.RVSqlServerDataSource();
    sqlServerDataSource.id = "MySqlServerDataSource";
    sqlServerDataSource.title = "My SQL Server";

    const sqlServerDataSourceItem1 = new $.ig.RVSqlServerDataSourceItem(sqlServerDataSource);
    sqlServerDataSourceItem1.id = "MySqlServerDataSourceItem1";
    sqlServerDataSourceItem1.title = "John Orders";

    const sqlServerDataSourceItem2 = new $.ig.RVSqlServerDataSourceItem(sqlServerDataSource);
    sqlServerDataSourceItem2.id = "MySqlServerDataSourceItem2";
    sqlServerDataSourceItem2.title = "Jane Orders";

    callback(new $.ig.RevealDataSources([sqlServerDataSource], [sqlServerDataSourceItem1, sqlServerDataSourceItem2], true));
};
```

## On the server

Override the data source items on the server.

```cs
//John Orders
if (sqlDataSourceItem.Id == "MySqlServerDataSourceItem1")
{
    sqlDataSourceItem.CustomQuery = "SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = 279";
}
             
//Jane Orders   
if (sqlDataSourceItem.Id == "MySqlServerDataSourceItem2")
{
    sqlDataSourceItem.CustomQuery = "SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = 282";
}
```

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/CustomQueries)

:::
