import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# MS SQL Server データ ソースの置き換え

**手順** 1 - ASP.NET Web API サーバー アプリケーションで、`IRVDataSourceProvider` を実装するクラスを作成します。このクラスは、MS SQL Server 設定の実際の置換を実行します。 

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

  <TabItem value="node" label="Node.js">    

```ts
const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	return null;
}

const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
	return null;
}
```

  </TabItem>

</Tabs>

このクラスの `ChangeDataSourceItemAsync` メソッドは、表示形式がデータを取得するために使用する `RVDataSourceItem` を返します。`ChangeDataSourceItemAsync` メソッドで引数として提供される `RVDataSourceItem` 項目を変更することにより、データを取得するサーバーまたはテーブルを変更できます。

**手順 2** - `Program.cs` ファイルの `AddReveal` メソッドを更新して、`RevealSetupBuilder.AddDataSourceProvider` メソッドを使用して作成した `IRVDataSourceProvider` を `RevealSetupBuilder` に追加します。

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

  <TabItem value="node" label="Node.js">    

```ts
const revealOptions: RevealOptions = {
	dataSourceProvider: dataSourceProvider,
	dataSourceItemProvider: dataSourceItemProvider,
}
app.use('/', reveal(revealOptions));
```

  </TabItem>

</Tabs>

## 例: ホスト、データベース、およびテーブルの置き換え

各 `RVDataSourceItem` を `RVSqlServerDataSourceItem` としてキャストし、そのプロパティを次のように変更することで、ダッシュボード内のすべての MS SQL Server データ ソース項目の MS SQL Server ホスト、データベース、およびテーブル名を変更できます。

<Tabs groupId="code">
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class DataSourceProvider: IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
        if (dataSourceItem is RVSqlServerDataSourceItem sqlServerDsi)
        {
            // Optionally change SQL Server host here too - overrides the values set in ChangeDataSourceAsync
            var sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.DataSource;
            sqlServerDS.Host = "10.0.0.50";

            // Change SQL Server database and table/view
            sqlServerDsi.Database = "Adventure Works 2";
            sqlServerDsi.Table = "Employees";
        }

        return Task.FromResult(dataSourceItem);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVSqlServerDataSource sqlDatasource)
        {
            // Change SQL Server host and database
            sqlDatasource.Host = "10.0.0.20";
            sqlDatasource.Database = "Adventure Works";
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
            // Optionally change SQL Server host here too - overrides the values set in changeDataSource
            RVSqlServerDataSource sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.getDataSource();
            sqlServerDS.setHost("10.0.0.50");            

            // Change SQL Server database and table/view
            sqlServerDsi.setDatabase("Adventure Works 2");
            sqlServerDsi.setTable("Employees");
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        if (dataSource instanceof RVSqlServerDataSource sqlDatasource)
        {
            sqlDatasource.setHost("10.0.0.20");
            sqlDatasource.setDatabase("Adventure Works");
        }
        return dataSource;
    }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```ts
const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVSqlServerDataSource) {
		//Change SQL Server host and database
		dataSource.host = "10.0.0.20";
		dataSource.database = "Adventure Works";
	}
	return dataSource;
}

const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
	if (dataSourceItem instanceof RVSqlServerDataSourceItem) {

		// Optionally change SQL Server host here too - overrides the values set in dataSourceProvider
		const sqlServerDS = <RVSqlServerDataSource> dataSourceItem.dataSource;
		sqlServerDS.host = "10.0.0.50";

		// Change SQL Server database and table/view
		dataSourceItem.database = "Adventure Works 2";
		dataSourceItem.table = "Employees";
	}
	return dataSourceItem;
}
```

  </TabItem>

</Tabs>

:::caution

データベース **Host** は、`RVSqlServerDataSource` オブジェクトでのみ変更できます。他のすべてのプロパティには、`RVSqlServerDataSourceItem` を使用します。

:::

:::info Get the Code

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/ReplacingDataSources/MsSqlServer) にあります。

:::
