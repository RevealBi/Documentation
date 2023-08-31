---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# MS SQL Server データ ソースの追加

:::danger 重大な変更

現在、Reveal SDK は、Reveal SDK core パッケージからデータ ソースを分離する過程にあります。プロジェクトの継続的な機能を確保するために、プロジェクトに追加のパッケージをインストールすることが必要になる場合があります。詳細については、[サポートされるデータ ソース](web/datasources.md#サポートされるデータ-ソース) トピックを参照してください。

:::

## クライアント側

**手順 1** - `RevealView.onDataSourcesRequested` イベントのイベント ハンドラーを追加します。

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    //add code here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**手順 2** - `RevealView.onDataSourcesRequested` イベント ハンドラーで、`RVSqlServerDataSource` オブジェクトの新しいインスタンスを作成します。`Host`、`Database`、`Port`、および `Title` プロパティを、MS SQL Server に対応する値に設定します。`RVSqlServerDataSource` オブジェクトを作成したら、それをデータ ソース コレクションに追加します。

```js
revealView.onDataSourcesRequested = (callback) => {
    var sqlDataSource = new $.ig.RVSqlServerDataSource();
    sqlDataSource.host = "your-db-host";
    sqlDataSource.database = "your-db-name";
    sqlDataSource.port = 1234;
    sqlDataSource.title = "My SQL Server";

    callback(new $.ig.RevealDataSources([sqlDataSource], [], false));
};
```

アプリケーションを開始し、新しい表示形式を作成すると、[データ ソースの選択] ダイアログに新しく作成された  MS SQL Server データ ソースが表示されます。

![](images/ms-sql-server-data-source.jpg)

**手順 3** - `RVSqlServerDataSourceItem` オブジェクトの新しいインスタンスを作成して、新しいデータ ソース項目を追加します。データベース テーブルに対応する `Id`、`Title`、および `Table` プロパティを設定します。`RVSqlServerDataSourceItem` オブジェクトを作成したら、それをデータ ソース コレクションに追加します。

```js
revealView.onDataSourcesRequested = (callback) => {
    var sqlDataSource = new $.ig.RVSqlServerDataSource();
    sqlDataSource.host = "your-db-host";
    sqlDataSource.database = "your-db-name";
    sqlDataSource.port = 1234;
    sqlDataSource.title = "My SQL Server";

    var sqlServerDsi = new $.ig.RVSqlServerDataSourceItem(sqlDataSource);
    sqlServerDsi.id = "MySqlServerDatasourceItem";
    sqlServerDsi.title = "My SQL Server Item";
    sqlServerDsi.table = "TableName";    

    callback(new $.ig.RevealDataSources([sqlDataSource], [sqlServerDsi], false));
};
```

アプリケーションを開始し、新しい表示形式を作成すると、[データ ソースの選択] ダイアログに新しく作成された MS SQL Server データ ソース項目が表示されます。

![](images/ms-sql-server-data-source-item.jpg)

## サーバー側

**手順 1** - クライアントでデータ ソースとデータ ソース項目を作成しますが、接続情報は指定しません。`id`、`title`、および/または `subtitle` のみを提供します。

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    
    var sqlServerDS = new $.ig.RVSqlServerDataSource();
    sqlServerDS.id = "MySqlServerDataSource";
    sqlServerDS.title = "My Sql Server";

    var sqlServerDSI = new $.ig.RVSqlServerDataSourceItem(sqlServerDS);
    sqlServerDSI.id = "MySqlServerDataSourceItem";
    sqlServerDSI.title = "My Sql Server Item";

    callback(new $.ig.RevealDataSources([sqlDataSource], [sqlServerDSI], false));
};
```

**手順 2** - データ ソース プロバイダーを作成します。この例では、クライアントで定義された **MS SQL Server** データベースに接続するための接続情報を提供しています。これを実現するために、使用しているデータ ソース/項目のタイプを決定し、オブジェクトで使用可能なプロパティを設定します。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
        if (dataSourceItem is RVSqlServerDataSourceItem sqlServerDsi)
        {
            //required: update underlying data source
            ChangeDataSourceAsync(userContext, sqlServerDsi.DataSource);

            //only change the table if we have selected our data source item
            if (sqlServerDsi.Id == "MySqlServerDatasourceItem")
            {
                //set the table/view
                sqlServerDsi.Table = "Orders";
            }
        }
        return Task.FromResult(dataSourceItem);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVSqlServerDataSource sqlDatasource)
        {
            sqlDatasource.Host = "10.0.0.20";
            sqlDatasource.Database = "Northwind";
            sqlDatasource.Schema = "dbo";
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

        if (dataSourceItem instanceof RVSqlServerDataSourceItem sqlServerDsi) {            
            //required: update underlying data source
            changeDataSource(userContext, dataSourceItem.getDataSource());

            //only change the table if we have selected our custom data source item
            if (dataSourceItem.getId() == "MySqlServerDatasourceItem") {
                sqlServerDsi.setTable("Orders");
            }            
        }
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVSqlServerDataSource sqlDatasource) {
            sqlDatasource.setHost("10.0.0.20");
            sqlDatasource.setDatabase("Northwind");
            sqlDatasource.setSchema("dbo");
        }
        return dataSource;
    }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```ts
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
	if (dataSourceItem instanceof RVSqlServerDataSourceItem) {

		//required: update underlying data source
		dataSourceProvider(userContext, dataSourceItem.dataSource);

		//only change the table if we have selected our data source item
		if (dataSourceItem.id === "MySqlServerDatasourceItem") {
			dataSourceItem.table = "Orders";
		}		
	}
	return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVSqlServerDataSource) {
		dataSource.host = "10.0.0.20";
		dataSource.database = "Northwind";
		dataSource.schema = "dbo";
	}
	return dataSource;
}
```

  </TabItem>

</Tabs>

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/MsSqlServer) にあります。

:::