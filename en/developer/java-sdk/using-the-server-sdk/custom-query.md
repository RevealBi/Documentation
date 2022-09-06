# Custom SQL Queries

As the name suggests, CustomQuery Propery of an`RVSqlBasedDataSourceItem` allows you to perform a "Custom SQL query to use when getting data" from the server.

### Source 
[**RVSqlBasedDataSourceItem**](https://help.revealbi.io/api/java/latest/com/infragistics/reveal/sdk/api/model/RVSqlBasedDataSourceItem.html#setCustomQuery(java.lang.String))


## Example: Define a Custom MS SQL Server Query in JAVA SDK

In the `LocalSampleDataSourceProvider` implementation as described in [**Replacing Data Sources-MS SQL SERVER**](https://help.revealbi.io/en/developer/java-sdk/using-the-server-sdk/ms-sql-server.html) input the following line `sqlServerDsi.setCustomQuery("SELECT TOP 5 CustomerID,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax FROM Customers");`.

```java
public class LocalSampleDataSourceProvider implements IRVDataSourceProvider {

	public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

		return null;
	}

	public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

		if (dataSourceItem instanceof RVSqlServerDataSourceItem)
		{
			RVSqlServerDataSourceItem sqlServerDsi = (RVSqlServerDataSourceItem)dataSourceItem;
			// Change SQL Server host and database
			RVSqlServerDataSource sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.getDataSource();
			sqlServerDS.setHost("10.0.0.20");
			sqlServerDS.setDatabase("Adventure Works");

			// Change SQL Server table/view
			sqlServerDsi.setCustomQuery("SELECT TOP 5 CustomerID,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax FROM Customers");

			return (RVDataSourceItem)sqlServerDsi;
		}
		return null;
	}
}
```
      
### Result:


![](images/custom-query-web.jpg)
