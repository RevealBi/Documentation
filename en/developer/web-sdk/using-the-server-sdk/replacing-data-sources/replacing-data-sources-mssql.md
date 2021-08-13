# Replacing Data Sources (MS SQL Server)

## Overview

Before loading and processing the data for a dashboard (by Reveal Server
SDK), you can override the configuration or data to be used for each
visualization of the dashboard.

One of the properties to implement in
__RevealSdkContextBase__
is:

``` csharp
IRVDataSourceProvider DataSourceProvider { get;  }
```

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
source for visualizations in the dashboard. The method
__ChangeVisualizationDataSourceItemAsync__
will be invoked for every visualization, on every single dashboard being
opened.

``` csharp
public class SampleDataSourceProvider : IRVDataSourceProvider
{
        public Task<RVDataSourceItem> ChangeDashboardFilterDataSourceItemAsync(string userId, string dashboardId, RVDashboardFilter globalFilter, RVDataSourceItem dataSourceItem)
        {
            return Task.FromResult<RVDataSourceItem>(null);
        }

        public Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync(
            string userId, string dashboardId, RVVisualization visualization,
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

            // Fully replace a data source item with a new one
            if (visualization.Title == "Top Customers")
            {
                var sqlDs = new RVSqlServerDataSource();
                sqlDs.Host = "salesdb.local";
                sqlDs.Database = "Sales";

                var sqlDsi = new RVSqlServerDataSourceItem(sqlDs);
                sqlServerDsi.Table = "Customers";

                return Task.FromResult((RVDataSourceItem)sqlServerDsi);
            }

            return Task.FromResult(dataSourceItem);
        }
}
```

In the example above, the following two replacements will be performed:

  - All data sources using a MS SQL Server database will be changed to
    use the hardcoded server “10.0.0.20”, the “Adventure Works”
    database, and the “Employees” table.

    **Note:** This is a simplified scenario, replacing all
    visualizations to get data from the same table, which makes no sense
    as a real world scenario. In real-world applications, you’re
    probably going to use additional information like userId,
    dashboardId, or the values in the data source itself (server,
    database, etc.) to infer the new values to be used.

  - All widgets with the title “Top Customers” will have their data
    source set to a new SQL Server data source, getting data from the
    “Sales” database in the “salesdb.local” server, using the table
    “Customers”.

Please note that in addition to implement
__IRVDataSourceProvider__
you need to modify your implementation of __RevealSdkContextBase.DataSourceProvider__
to return it:

``` csharp
IRVDataSourceProvider DataSourceProvider => new SampleDataSourceProvider();
```
