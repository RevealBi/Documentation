# Custom SQL Queries

As the name suggests, CustomQuery Propery of an `RVSqlBasedDataSourceItem` allows you to perform a "Custom SQL query to use when getting data" from the server.

### Source 
[**RVSqlBasedDataSourceItem**](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.RVSqlBasedDataSourceItem.html#properties)

## Example: Define a Custom MS SQL Server Query in Javascript

In JavaScript, create an `RVSqlServerDataSource` and `RVSqlServerDataSourceItem` instance within the `RevealApi.RevealView.onDataSourcesRequested` method and add the line `your_DS_Item.customQuery = "SELECT TOP 5 CustomerID,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax FROM [TABLE]";`.
<br>
Then, include the newly created `RVSqlServerDataSourceItem` in the callback `callback(new RevealApi.RevealDataSources([], [your_DS_Item], true));`:

```javascript
            var revealView = new RevealApi.RevealView("#revealView");
            revealView.dashboard = new RevealApi.RVDashboard();

            //...

            revealView.onDataSourcesRequested = function(callback) {

                var sqlDs = new RevealApi.RVSqlServerDataSource();
                sqlDs.title = "Title";
                sqlDs.id = "SqlDataSource1";
                sqlDs.host = "your_host_name";
                sqlDs.port = "sql_port_number";
                sqlDs.database = "your_db_name";

                var sqlDsi = new RevealApi.RVSqlServerDataSourceItem(sqlDs);
                sqlDsi.title = "Clients";
                sqlDsi.id = "SQLDatsaourceItem1";
                sqlDsi.customQuery = "SELECT TOP 5 CustomerID,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax FROM [TABLE]";

                callback(new RevealApi.RevealDataSources([], [sqlDsi], true));
            };
        }
```

## Example: Define a Custom MS SQL Server Query in ASP.NET SDK

In the `MyDatasourceProvider` implementation as described in [**Replacing Data Sources-MS SQL SERVER**](https://help.revealbi.io/en/web/replacing-data-sources/ms-sql-server.html) input the following line `sqlServerDsi.CustomQuery = "SELECT TOP 5 CustomerID,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax FROM [TABLE]";`.

```csharp
public class MyDataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
        var sqlServerDsi = dataSourceItem as RVSqlServerDataSourceItem;
        if (sqlServerDsi != null)
        {
            // Change SQL Server host and database
            var sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.DataSource;
            sqlServerDS.Host = "10.0.0.20";
            sqlServerDS.Database = "Adventure Works";

            // Set Custom Query
            sqlServerDsi.CustomQuery = "SELECT TOP 5 CustomerID,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax FROM [TABLE]";
            return Task.FromResult((RVDataSourceItem)sqlServerDsi);
        }

        return Task.FromResult(dataSourceItem);
    }
}
```
      
### Result:


![](images/custom-query-web.jpg)



