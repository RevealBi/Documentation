import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Custom Queries

Custom queries are specially crafted instructions for retrieving or manipulating data in a database according to
specific requirements. Unlike predefined queries in database management systems, custom queries are tailored to meet
unique or complex data retrieval and manipulation needs.

Custom Queries are supported for the following data sources:

- [Amazon Athena](adding-data-sources/amazon-athena)
- Amazon Redshift
- Microsoft Azure SQL Database
- Microsoft Azure Synapse Analytics
- Microsoft Dynamics CRM
- [Microsoft SQL Server](adding-data-sources/ms-sql-server)
- [MySQL](adding-data-sources/mysql)
- [Oracle](adding-data-sources/oracle)
- [PostgreSQL](adding-data-sources/postgres)
- [Snowflake](adding-data-sources/snowflake)
- Sybase

## Step 1 - Define the data source items on the client

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

## Step 2 - Override the data source items on the server

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

## Example - Building a custom query using client provided values
### Step 1 - Define the data source items on the client and set the additional headers provider

Use the method `$.ig.RevealSdkSettings.setAdditionalHeadersProvider()` to set the additional headers to send to the server. In this example we are using a header named `x-sales-person-id`.

```js
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");
$.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url) {
    const headers = {};
    //set the x-sales-person-id header that identifies the sales person
    headers["x-sales-person-id"] = "279";
    return headers;
});

var revealView = new $.ig.RevealView("#revealView");
revealView.startInEditMode = true;

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

### Step 2 - Get the headers on the server and extract the needed property

Define and register a `RVUserContextProvider` to handle the headers on the server. You need to extract the headers and register the appropriate property.

```cs
public class UserContextProvider : IRVUserContextProvider
{
    public IRVUserContext GetUserContext(HttpContext httpContext)
    {
        //when using standard auth mechanisms, the userId can be obtained using aspnetContext.User.Identity.Name.
        var userIdentityName = httpContext.User.Identity?.Name;
        var userId = userIdentityName ?? "guest";

        //get the sales-person-id header set on the client
        var salesPersonId = httpContext.Request.Headers["x-sales-person-id"]; 
        
        //add the sales-person-id property 
        var props = new Dictionary<string, object> { { "sales-person-id", salesPersonId } };

        return new RVUserContext(userId, props);
    }
}
```

### Step 3 - Build your custom query based on the previously registered property

```cs
if (dataSourceItem is RVSqlServerDataSourceItem sqlDataSourceItem)
{
    var sqlDataSource = (RVSqlServerDataSource)sqlDataSourceItem.DataSource;
    UpdateDataSource(sqlDataSource);

    if (sqlDataSourceItem.Id == "MySqlServerDataSourceItem")
    {
        //get the sales-person-id from the userContext
        var salesPersonId = userContext.Properties["sales-person-id"];

        //parametrize your custom query with the property obtained before
        sqlDataSourceItem.CustomQuery =
            $"SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = {salesPersonId}";
    }
}
```

:::info Get the Code

The source code to this sample can be found
on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/CustomQueries)

:::
