# Adding an MS SQL Server Data Source

**Step 1** - Add an event handler for the `RevealView.DataSourcesRequested` event.

```html
<rv:RevealView x:Name="_revealView" DataSourcesRequested="RevealView_DataSourcesRequested" />
```

In the event handler, define two collections; one for the data sources, and one for the data source items. These two collections are used a parameters to the RevealDataSources object which is provided in the event handler callback.

```cs
private void RevealView_DataSourcesRequested(object sender, Reveal.Sdk.DataSourcesRequestedEventArgs e)
{
    var dataSources = new List<RVDashboardDataSource>();
    var items = new List<RVDataSourceItem>();

    ...

    e.Callback(new RevealDataSources(dataSources, items, true));
}
```

**Step 2** - In the `RevealView.DataSourcesRequested` event handler, create a new instance of the `RVSqlServerDataSource` object. Set the `Host`, `Database`, `Port`, and `Title` properties to values that correspond to your MS SQL Server. After you have created the `RVSqlServerDataSource` object, add it to the data sources collection.

```cs
private void RevealView_DataSourcesRequested(object sender, Reveal.Sdk.DataSourcesRequestedEventArgs e)
{
    var dataSources = new List<RVDashboardDataSource>();
    var items = new List<RVDataSourceItem>();

    var sqlDataSource = new RVSqlServerDataSource()
    {
        Host = "your-db-host",
        Database = "your-db-name",
        Port = 1234,
        Title = "My SQL Server",
    };
    dataSources.Add(sqlDataSource);

    e.Callback(new RevealDataSources(dataSources, items, true));
}
```

When the application runs, create a new Visualization and you will see the newly created MS SQL Server data source listed in the "Select a Data Source" dialog.

![](images/ms-sql-server-data-source.jpg)

**Step 3** - Add a new Data Source Item by creating a new instance of the `RVSqlServerDataSourceItem` object. Set the `Id`,`Title`, and `Table` properties that correspond to your database table. After you have created the `RVSqlServerDataSourceItem` object, add it to the data source items collection.

```cs
private void RevealView_DataSourcesRequested(object sender, Reveal.Sdk.DataSourcesRequestedEventArgs e)
{
    var dataSources = new List<RVDashboardDataSource>();
    var items = new List<RVDataSourceItem>();

    var sqlDataSource = new RVSqlServerDataSource()
    {
        Host = "your-db-host",
        Database = "your-db-name",
        Port = 1234,
        Title = "My SQL Server",
    };
    dataSources.Add(sqlDataSource);

    var sqlServerDsi = new  RVSqlServerDataSourceItem(sqlDataSource);
    sqlServerDsi.Id = "MyCustomId";
    sqlServerDsi.Title = "My SQL Server Item";
    sqlServerDsi.Table = "TableName";    
    items.Add(sqlServerDsi);

    e.Callback(new RevealDataSources(dataSources, items, true));
}
```

When the application runs, create a new Visualization and you will see the newly created MS SQL Server data source item listed in the "Select a Data Source" dialog.

![](images/ms-sql-server-data-source-item.jpg)