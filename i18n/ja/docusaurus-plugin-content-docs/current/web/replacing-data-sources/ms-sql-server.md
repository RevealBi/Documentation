import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# MS SQL Server データ ソースの置き換え

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
