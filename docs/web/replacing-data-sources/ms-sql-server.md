import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Replacing MS Sql Server Data Source

When embedding the Reveal SDK in your application, you can replace the connection details of a SQL Server database connection at runtime. This allows you to change the table, port, database, schema, and host based on the logged in user. You can also provide custom queries and stored procedures.

***Step 1** - Create the data source provider.

<Tabs groupId="code">
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
      throw new NotImplementedException();
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
      throw new NotImplementedException();
    }
}
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
public class DataSourceProvider implements IRVDataSourceProvider {

	public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
		return null;
	}

	public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {
		return null;
	}
}
```

  </TabItem>

</Tabs>

**Step 2** - Register the data source provider with the Reveal SDK.

<Tabs groupId="code">
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

</Tabs>

## Example: Replace Host, Database, and Table

You can change the MS SQL Server host, database, and table name of every MS SQL Server data source item in your dashboard by casting each `RVDataSourceItem` as a `RVSqlServerDataSourceItem` and modifying it's properties as follows:

<Tabs groupId="code">
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
        if (dataSourceItem is RVSqlServerDataSourceItem sqlServerDsi)
        {
            // Change SQL Server host
            var sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.DataSource;
            sqlServerDS.Host = "10.0.0.20";

            // Change SQL Server database and table/view
            sqlServerDsi.Database = "Adventure Works";
            sqlServerDsi.Table = "Employees";
        }

        return Task.FromResult(dataSourceItem);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVSqlServerDataSource sqlDatasource)
        {
            sqlDatasource.Host = "10.0.0.20";
            sqlDatasource.Database = "Adventure Works";
            sqlDatasource.Table = "Employees";
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

        if (dataSourceItem instanceof RVSqlServerDataSourceItem sqlServerDsi)
        {
            // Change SQL Server host
            RVSqlServerDataSource sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.getDataSource();
            sqlServerDS.setHost("10.0.0.20");            

            // Change SQL Server database and table/view
            sqlServerDsi.setDatabase("Adventure Works");
            sqlServerDsi.setTable("Employees");

            return (RVDataSourceItem)sqlServerDsi;
        }
        return null;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        if (dataSource instanceof RVSqlServerDataSource sqlDatasource)
        {
            sqlDatasource.setHost("10.0.0.20");
            sqlDatasource.setDatabase("Adventure Works");
            sqlDatasource.setTable("Employees");
        }
        return dataSource;
    }
}
```

  </TabItem>

</Tabs>

:::info

The database **Host** can only be changed on the `RVSqlServerDataSource` object. For all other properties use the `RVSqlServerDataSourceItem`.

:::
