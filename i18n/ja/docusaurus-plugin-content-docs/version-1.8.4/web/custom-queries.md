import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# カスタム クエリ

カスタム クエリは、特定の要件に従ってデータベース内のデータを取得または操作するために特別に作成された命令です。
データベース管理システムの事前定義クエリとは異なり、カスタム クエリは、独自のまたは複雑なデータの取得と操作のニーズを満たすように調整されています。

カスタム クエリは、次のデータ ソースでサポートされています。

- [Amazon Athena](adding-data-sources/amazon-athena.md)
- Amazon Redshift
- [Google BigQuery](adding-data-sources/google-big-query.md)
- Microsoft Azure SQL Database
- Microsoft Azure Synapse Analytics
- [Microsoft SQL Server](adding-data-sources/ms-sql-server.md)
- [MySQL](adding-data-sources/mysql.md)
- [Oracle](adding-data-sources/oracle.md)
- [PostgreSQL](adding-data-sources/postgres.md)
- [Snowflake](adding-data-sources/snowflake.md)

**手順 1** - クライアント上のデータ ソース項目を定義します。

`RevealView.onDataSourcesRequested` イベントのイベント ハンドラーを追加します。この手順では、カスタム クエリでオーバーライドするデータ ソースを作成します。
この例では、`RVSqlServerDataSource` を使用して SQL Server に接続しています。

```js
revealView.onDataSourcesRequested = (callback) => {
    const sqlServerDataSource = new $.ig.RVSqlServerDataSource();
    sqlServerDataSource.id = "MySqlServerDataSource";
    sqlServerDataSource.title = "My SQL Server";

    const sqlServerDataSourceItem = new $.ig.RVSqlServerDataSourceItem(sqlServerDataSource);
    sqlServerDataSourceItem.id = "MySqlServerDataSourceItem";
    sqlServerDataSourceItem.title = "John Orders";

    callback(new $.ig.RevealDataSources([sqlServerDataSource], [sqlServerDataSourceItem], true));
};
```

**手順 2** - サーバー上のデータ ソース項目をオーバーライドします。

```cs
if (sqlDataSourceItem.Id == "MySqlServerDataSourceItem")
{
    //get the sales-person-id from the userContext
    var salesPersonId = userContext.Properties["sales-person-id"];

    //parametrize your custom query with the property obtained before
    sqlDataSourceItem.CustomQuery =
        $"SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = {salesPersonId}";
}
```

## 例 - クライアントが提供する値を使用したカスタム クエリの作成

1 - クライアント上のデータ ソース項目を定義します。

```js
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");

var revealView = new $.ig.RevealView("#revealView");
revealView.startInEditMode = true;

revealView.onDataSourcesRequested = (callback) => {
    const sqlServerDataSource = new $.ig.RVSqlServerDataSource();
    sqlServerDataSource.id = "MySqlServerDataSource";
    sqlServerDataSource.title = "My SQL Server";

    const sqlServerDataSourceItem = new $.ig.RVSqlServerDataSourceItem(sqlServerDataSource);
    sqlServerDataSourceItem.id = "MySqlServerDataSourceItem";
    sqlServerDataSourceItem.title = "John Orders";

    callback(new $.ig.RevealDataSources([sqlServerDataSource], [sqlServerDataSourceItem], true));
};
```

2 - クライアントでは、`$.ig.RevealSdkSettings.setAdditionalHeadersProvider()` メソッドを使用して、サーバーに送信する追加ヘッダーを設定します。この例では、`x-sales-person-id` という名前のヘッダーを使用しています。

```js
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/");
$.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url) {
    const headers = {};
    //set the x-sales-person-id header that identifies the sales person
    headers["x-sales-person-id"] = "279";
    return headers;
});

var revealView = new $.ig.RevealView("#revealView");
revealView.startInEditMode = true;

revealView.onDataSourcesRequested = (callback) => {
    const sqlServerDataSource = new $.ig.RVSqlServerDataSource();
    sqlServerDataSource.id = "MySqlServerDataSource";
    sqlServerDataSource.title = "My SQL Server";

    const sqlServerDataSourceItem = new $.ig.RVSqlServerDataSourceItem(sqlServerDataSource);
    sqlServerDataSourceItem.id = "MySqlServerDataSourceItem";
    sqlServerDataSourceItem.title = "John Orders";

    callback(new $.ig.RevealDataSources([sqlServerDataSource], [sqlServerDataSourceItem], true));
};
```

3 - サーバー上のヘッダーを処理するための `RVUserContextProvider` を定義して登録します。ヘッダーを抽出し、適切なプロパティを登録する必要があります。

```cs
public class UserContextProvider : IRVUserContextProvider
{
    public IRVUserContext GetUserContext(HttpContext httpContext)
    {
        //when using standard auth mechanisms, the userId can be obtained using aspnetContext.User.Identity.Name.
        var userIdentityName = httpContext.User.Identity?.Name;
        var userId = userIdentityName ?? "guest";

        //get the sales-person-id header set on the client
        var salesPersonId = httpContext.Request.Headers["x-sales-person-id"]; 
        
        //add the sales-person-id property 
        var props = new Dictionary<string, object> { { "sales-person-id", salesPersonId } };

        return new RVUserContext(userId, props);
    }
}
```

4 - データ ソース プロバイダーで、データ ソース項目をオーバーライドしてカスタム クエリを定義します。

```cs
public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId,
        RVDataSourceItem dataSourceItem)
    {
        if (dataSourceItem is RVSqlServerDataSourceItem sqlDataSourceItem)
        {
            //update underlying data source
            ChangeDataSourceAsync(userContext, sqlDataSourceItem.DataSource);

            if (sqlDataSourceItem.Id == "MySqlServerDataSourceItem")
            {
                //get the sales-person-id from the userContext
                var salesPersonId = userContext.Properties["sales-person-id"];

                //parametrize your custom query with the property obtained before
                sqlDataSourceItem.CustomQuery =
                    $"SELECT * FROM [Sales].[SalesOrderHeader] WHERE [SalesPersonId] = {salesPersonId}";
            }
        } 

        return Task.FromResult(dataSourceItem);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext,
        RVDashboardDataSource dataSource)
    {
        if (dataSource is RVSqlServerDataSource sqlDataSource)
        {
            sqlDataSource.Host = "your-host";
            sqlDataSource.Database = "your-database";
        }

        return Task.FromResult(dataSource);
    }
}
```

:::caution

Java で `MySqlDataSourceItem` を使用する場合は、必ずテーブルの完全修飾名を使用してください。そうしないと機能しません。完全修飾テーブル名は、データベース識別子とテーブル識別子で構成されます (例: `database.table`)。クエリにこの構造が反映されていることを確認してください (`SELECT * FROM database.table` など)。

:::

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/CustomQueries) にあります。

:::
