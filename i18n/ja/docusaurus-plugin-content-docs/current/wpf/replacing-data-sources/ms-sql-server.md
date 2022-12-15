# MS SQL Server データ ソースの置き換え

**手順 1** - `IRVDataSourceProvider` を実装するクラスを作成します。このクラスは、MS SQL Server 設定の実際の置換を実行します。 

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

このクラスの `ChangeVisualizationDataSourceItemAsync` メソッドは、表示形式がデータを取得するために使用する `RVDataSourceItem` を返します。`ChangeVisualizationDataSourceItemAsync` メソッドで引数として提供される `RVDataSourceItem` 項目を変更することにより、データを取得するサーバーまたはテーブルを変更できます。

**手順 2** - `RevealSdkSettings.DataSourceProvider` を `IRVDataSourceProvider` を実装するクラスのインスタンスに設定します。

```cs
RevealSdkSettings.DataSourceProvider = new MyDataSourceProvider();
```

## 例: ホスト、データベース、およびテーブルの置き換え

各 `RVDataSourceItem` を `RVSqlServerDataSourceItem` としてキャストし、そのプロパティを次のように変更することで、ダッシュボード内のすべての MS SQL Server データ ソース項目の MS SQL Server ホスト、データベース、およびテーブル名を変更できます。

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

:::info

データベース **Host** は、`RVSqlServerDataSource` オブジェクトでのみ変更できます。他のすべてのプロパティには、`RVSqlServerDataSourceItem` を使用します。

:::
