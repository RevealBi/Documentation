# Custom SQL Queries

As the name suggests, CustomQuery Propery of an `RVSqlBasedDataSourceItem` allows you to perform a "Custom SQL query to use when getting data" from the server.

### Source 
[**RVSqlBasedDataSourceItem**](https://help.revealbi.io/api/java/latest/com/infragistics/reveal/sdk/api/model/RVSqlBasedDataSourceItem.html#setCustomQuery(java.lang.String))

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

      
### Result:


![](images/custom-query-web.jpg)
