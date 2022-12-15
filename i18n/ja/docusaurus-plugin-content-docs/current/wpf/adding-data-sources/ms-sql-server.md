# MS SQL Server データ ソースの追加

**手順 1** - `RevealView.DataSourcesRequested` イベントのイベント ハンドラーを追加します。

```html
<rv:RevealView x:Name="_revealView" DataSourcesRequested="RevealView_DataSourcesRequested" />
```

イベント ハンドラーで、2 つのコレクションを定義します。1 つはデータ ソース用で、もう 1 つはデータ ソース項目用です。これらの 2 つのコレクションは、イベント ハンドラー コールバックで提供される RevealDataSources オブジェクトへのパラメーターとして使用されます。

```cs
private void RevealView_DataSourcesRequested(object sender, Reveal.Sdk.DataSourcesRequestedEventArgs e)
{
    var dataSources = new List<RVDashboardDataSource>();
    var items = new List<RVDataSourceItem>();

    ...

    e.Callback(new RevealDataSources(dataSources, items, true));
}
```

**手順 2** - `RevealView.DataSourcesRequested` イベント ハンドラーで、`RVSqlServerDataSource` オブジェクトの新しいインスタンスを作成します。`Host`、`Database`、`Port`、および `Title` プロパティを、MS SQL Server に対応する値に設定します。`RVSqlServerDataSource` オブジェクトを作成したら、それをデータ ソース コレクションに追加します。

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

アプリケーションが実行されたら、新しい表示形式を作成すると、[データ ソースの選択] ダイアログに新しく作成された  MS SQL Server データ ソースが表示されます。

![](images/ms-sql-server-data-source.jpg)

**手順 3** - `RVSqlServerDataSourceItem` オブジェクトの新しいインスタンスを作成して、新しいデータ ソース項目を追加します。データベース テーブルに対応する `Id`、および `Table` プロパティを設定します。`RVSqlServerDataSourceItem` オブジェクトを作成したら、それをデータ ソース コレクションに追加します。

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

アプリケーションが実行されたら、新しい可否化を作成すると、[データ ソースの選択] ダイアログに新しく作成された MS SQL Server データ ソース項目が表示されます。

![](images/ms-sql-server-data-source-item.jpg)