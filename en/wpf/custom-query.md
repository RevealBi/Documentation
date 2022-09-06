# Custom SQL Queries

As the name suggests, CustomQuery Propery of an`RVSqlBasedDataSourceItem` allows you to perform a "Custom SQL query to use when getting data" from the server.

### Source 
[**RVSqlBasedDataSourceItem**](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.RVSqlBasedDataSourceItem.html#properties)

## Example: Define a Custom MS SQL Server Query in Data Source Definition

In WPF, create an `RVSqlServerDataSource` and `RVSqlServerDataSourceItem` instance within the `RevealApi.RevealView.DataSourcesRequested` method in this case `revealView.DashboardSelectorRequested += RevealView_DashboardSelectorRequested;` and add the line `your_DS_Item.customQuery = "SELECT TOP 5 CustomerID,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax FROM [TABLE]";`.
<br>
Then, include the newly created `RVSqlServerDataSourceItem` in the callback ` e.Callback(new RevealDataSources(datasources, datasourceItems, true));`:

```csharp
         private void RevealView_DataSourcesRequested(object sender, DataSourcesRequestedEventArgs e)
        {
            var datasources = new List<RVDashboardDataSource>();
            var datasourceItems = new List<RVDataSourceItem>();


            var sqlDs = new RVSqlServerDataSource();
            sqlDs.Title = "Title";
            sqlDs.Id = "SqlDataSource1";
            sqlDs.Host = "your_host_name";
            sqlDs.Port = sql_port_number;
            sqlDs.Database = "your_database_name";

            var sqlDsi = new RVSqlServerDataSourceItem(sqlDs);
            sqlDsi.Title = "Title";
            sqlDsi.Id = "SQLDatsaource11";
            sqlDsi.CustomQuery = "SELECT TOP 5 CustomerID,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax FROM Customers";
			datasourcItems.Add(sqlDSi);
          
            e.Callback(new RevealDataSources(datasources, datasourceItems, true));
        }
```

## Example: Define a Custom MS SQL Server Query in Data Source Replacement

In the `MyDatasourceProvider` implementation as described in [**Replacing Data Sources-MS SQL SERVER**](https://help.revealbi.io/en/wpf/replacing-data-sources/ms-sql-server.html) input the following line `sqlServerDsi.CustomQuery = "SELECT TOP 5 CustomerID,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax FROM [TABLE]";`.

```csharp
public class MyDataSourceProvider : IRVDataSourceProvider
{
public Task<RVDataSourceItem> ChangeDataSourceItemAsync(RVDashboardFilter filter, RVDataSourceItem dataSourceItem)
{
    var sqlServerDsi = dataSourceItem as RVSqlServerDataSourceItem;
    if (sqlServerDsi != null)
    {
        // Change SQL Server host and database
        var sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.DataSource;
        sqlServerDS.Host = "10.0.0.20";
        sqlServerDS.Database = "Adventure Works";

        // Change SQL Server table/view
		sqlServerDsi.CustomQuery = "SELECT TOP 5 CustomerID,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax FROM [TABLE]";
        return Task.FromResult((RVDataSourceItem)sqlServerDsi);
    }

    return Task.FromResult(dataSourceItem);
}
```
      
### Result:

![](images/custom-query-web.jpg)
