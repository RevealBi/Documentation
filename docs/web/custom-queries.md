import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Custom Queries

Custom queries are specially crafted instructions for retrieving or manipulating data in a database according to
specific requirements. Unlike predefined queries in database management systems, custom queries are tailored to meet
unique or complex data retrieval and manipulation needs.

## Supported Data Sources

| Data Source                                               |
|-----------------------------------------------------------|
| [Amazon Athena](adding-data-sources/amazon-athena)        |
| Amazon Redshift                                           |
| [Google Big Query](adding-data-sources/google-big-query)  |
| Microsoft Azure SQL Database                              |
| Microsoft Azure Synapse Analytics                         |
| Microsoft Dynamics CRM                                    |
| [Microsoft SQL Server](adding-data-sources/ms-sql-server) |
| [MySQL](adding-data-sources/mysql)                        |
| [Oracle](adding-data-sources/oracle)                      |
| [PostgreSQL](adding-data-sources/postgres)                |
| [Snowflake](adding-data-sources/snowflake)                |
| Sybase                                                    |

## On the Client

Add an event handler for the `RevealView.onDataSourcesRequested` event. Create in this step the data sources you want to
override with custom queries. In this example, we are using `RVSqlServerDataSource` to connect to our SQL Server.

```js
revealView.onDataSourcesRequested = (callback) => {
    const sqlServerDataSource = new $.ig.RVSqlServerDataSource();
    sqlServerDataSource.id = "MySqlServerDataSource";
    sqlServerDataSource.title = "My SQL Server";

    const sqlServerDataSourceItem = new $.ig.RVSqlServerDataSourceItem(sqlServerDataSource);
    sqlServerDataSourceItem.id = "MySqlServerDataSourceItem";
    sqlServerDataSourceItem.title = "John Orders";

    callback(new $.ig.RevealDataSources([sqlServerDataSource], [sqlServerDataSourceItem], true));
};
```

## On the server

Override the data source items on the server.

```cs
if (sqlDataSourceItem.Id == "MySqlServerDataSourceItem")
{
    //get the sales-person-id from the userContext
    var salesPersonId = userContext.Properties["sales-person-id"];

    //parametrize your custom query with the property obtained before
    sqlDataSourceItem.CustomQuery =
        $"SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = {salesPersonId}";
}
```

:::info Get the Code

The source code to this sample can be found
on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/CustomQueries)

:::
