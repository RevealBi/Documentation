# Replacing Data Sources (MS SQL Server)

## Overview

Before loading and processing the data for a dashboard (by Reveal Server
SDK), you can override the configuration or data to be used for each
visualization of the dashboard.

A class implementing the interface
__IRVDataSourceProvider__
may replace or modify the data source used by a given visualization or
dashboard filter.

## Use Cases

Below you can find a list of common use cases:

  - You can change the name of the database being used, depending on the
    current user, or any other attributes your app might get like
    userId, division, company, customer, etc. By doing this, you can
    have a single dashboard getting data from a multi-tenant database.

  - You can change the name of the table being used, the path of the
    file to load, etc. The use case is similar to the one described
    above.

  - You can replace a data source with an in-memory data source. As the
    Reveal App doesn’t support in-memory data sources, you can design a
    dashboard using a CSV file and then use this callback to replace the
    CSV data source with an in-memory one. In this scenario, data is
    actually loaded from memory (or with your custom data loader). For
    further details about how to use in-memory data sources, refer to
    [**In-Memory Data Support**](~/en/developer/web-sdk/using-the-server-sdk/in-memory-data.md).


## Code

The following code snippet shows an example of how to replace the data
source item.

``` csharp
public class SampleDataSourceProvider : IRVDataSourceProvider
{
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(
            IRVUserContext userContext, string dashboardId,
            RVDataSourceItem dataSourceItem)
        {
            var sqlServerDsi = dataSourceItem as RVSqlServerDataSourceItem;
            if (sqlServerDsi != null)
            {
                // Change SQL Server host and database
                var sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.DataSource;
                sqlServerDS.Host = "10.0.0.20";
                sqlServerDS.Database = "Adventure Works";

                // Change SQL Server table/view
                sqlServerDsi.Table = "Employees";
                return Task.FromResult((RVDataSourceItem)sqlServerDsi);
            }

            return Task.FromResult(dataSourceItem);
        }
}
```

In the example above, the following  replacement will be performed:

  - All data sources using a MS SQL Server database will be changed to
    use the hardcoded server “10.0.0.20”, the “Adventure Works”
    database, and the “Employees” table.

Please note that in addition to implement
__IRVDataSourceProvider__
you need to register your implementation when adding Reveal to your IMvcBuilder in COnfigureServices!
```csharp
services
    .AddMvc()
        .AddReveal(builder =>
        {
            builder
              ...
              .AddDataSourceProvider<MyDataSourceProvider>()
              ...
        });
```