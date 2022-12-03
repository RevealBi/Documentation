# Replacing MS Sql Server Data Source

**Step 1** - In the ASP.NET Web API server application, create a class that implements `IRVDataSourceProvider`. This class will perform the actual replacement of the MS SQL Server settings. 

```cs
public class MyDataSourceProvider : IRVDataSourceProvider
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

The `ChangeDataSourceItemAsync` method of this class returns the `RVDataSourceItem` that the visualization will use to get its data. By modifying the `RVDataSourceItem` item that is provided as an argument in the `ChangeDataSourceItemAsync` method, you can change which server or table to get your data from.

**Step 2** - Update the `AddReveal` method in the `Program.cs` file to add the `IRVDataSourceProvider` you just created to the `RevealSetupBuilder` using the `RevealSetupBuilder.AddDataSourceProvider` method.

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddDataSourceProvider<MyDataSourceProvider>();
});
```

## Example: Replace Host, Database, and Table

You can change the MS SQL Server host, database, and table name of every MS SQL Server data source item in your dashboard by casting each `RVDataSourceItem` as a `RVSqlServerDataSourceItem` and modifying it's properties as follows:

```cs
public class MyDataSourceProvider : IRVDataSourceProvider
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

> [!NOTE]
> The database **Host** can only be changed on the `RVSqlServerDataSource` object. For all other properties use the `RVSqlServerDataSourceItem`.
