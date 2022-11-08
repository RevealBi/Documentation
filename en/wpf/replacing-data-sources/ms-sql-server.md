# Replacing MS Sql Server Data Source

**Step 1** - Create a class that implements `IRVDataSourceProvider`. This class will perform the actual replacement of the MS SQL Server settings. 

```cs
public class MyDataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync(RVDashboardFilter filter, RVDataSourceItem dataSourceItem)
    {
        throw new NotImplementedException();
    }

    public Task<RVDataSourceItem> ChangeDashboardFilterDataSourceItemAsync(RVDashboardFilter filter, RVDataSourceItem dataSourceItem)
    {
        throw new NotImplementedException();
    }
}
```

The `ChangeVisualizationDataSourceItemAsync` method of this class returns the `RVDataSourceItem` that the visualization will use to get its data. By modifying the `RVDataSourceItem` item that is provided as an argument in the `ChangeVisualizationDataSourceItemAsync` method, you can change where to get your data from.

**Step 2** - Set the `RevealSdkSettings.DataSourceProvider` to an instance of the class that implements `IRVDataSourceProvider`

```cs
RevealSdkSettings.DataSourceProvider = new MyDataSourceProvider();
```

## Example: Replace Host, Database, and Table

You can change the MS SQL Server host, database, and table name of every MS SQL Server data source item in your dashboard by casting each `RVDataSourceItem` as a `RVSqlServerDataSourceItem` and modifying it's properties as follows:

```cs
public Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync(RVVisualization visualization, RVDataSourceItem dataSourceItem)
{
    var sqlServerDsi = dataSourceItem as RVSqlServerDataSourceItem;
    if (sqlServerDsi != null)
    {
        // Change SQL Server host
        var sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.DataSource;
        sqlServerDS.Host = "10.0.0.20";        
        

        // Change SQL Server database and table/view
        sqlServerDsi.Database = "Adventure Works";
        sqlServerDsi.Table = "Employees";
        return Task.FromResult((RVDataSourceItem)sqlServerDsi);
    }

    return Task.FromResult(dataSourceItem);
}
```

> [!NOTE]
> The database **Host** can only be changed on the `RVSqlServerDataSource` object. For all other properties use the `RVSqlServerDataSourceItem`.
