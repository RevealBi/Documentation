---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DuckDB データ ソース

## はじめに

DuckDB は、高速なローカル分析向けに設計されたインプロセスの分析データベースです。Reveal は DuckDB データベース ファイルと MotherDuck データベースの両方をサポートしているため、同じデータ ソース タイプから埋め込みデータ セット、ローカル ファイル、クラウドでホストされる DuckDB ワークロードを視覚化および分析できます。

## サーバー構成

### インストール

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

**手順 1** - Reveal DuckDB コネクタ パッケージをインストールします。

ASP.NET アプリケーションの場合、DuckDB サポートを有効にするには、別の NuGet パッケージをインストールする必要があります。

```bash
dotnet add package Reveal.Sdk.Data.DuckDB
```

**手順 2** - アプリケーションに DuckDB データ ソースを登録します。

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterDuckDB();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

Node.js アプリケーションの場合、DuckDB データ ソースはメインの Reveal SDK パッケージに含まれています。標準の Reveal SDK セットアップ以外に追加のインストールは必要ありません。

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

Node.js TypeScript アプリケーションの場合、DuckDB データ ソースはメインの Reveal SDK パッケージに含まれています。標準の Reveal SDK セットアップ以外に追加のインストールは必要ありません。

  </TabItem>
  <TabItem value="java" label="Java">

Java アプリケーションの場合、DuckDB データ ソースはメインの Reveal SDK パッケージに含まれています。標準の Reveal SDK セットアップ以外に追加のインストールは必要ありません。

  </TabItem>
</Tabs>

### 接続構成

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
// Create a data source provider
public class DataSourceProvider : IRVDataSourceProvider
{
    public async Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
        // Required: Update the underlying data source
        await ChangeDataSourceAsync(userContext, dataSourceItem.DataSource);

        if (dataSourceItem is RVDuckDBDataSourceItem duckDBItem)
        {
            // Configure specific item properties if needed
            if (duckDBItem.Id == "duckdb_orders")
            {
                duckDBItem.Table = "orders";
                duckDBItem.Schema = "main";

                // Optional: use a custom query instead of a table
                // duckDBItem.CustomQuery = "SELECT * FROM orders WHERE ship_country = 'USA'";

                // Optional: call a DuckDB table macro
                // duckDBItem.Procedure = "top_customers";
                // duckDBItem.ProcedureParameters = new Dictionary<string, object>
                // {
                //     ["min_total"] = 1000
                // };
            }
        }

        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVDuckDBDataSource duckDBDS)
        {
            // Configure connection properties
            duckDBDS.Database = "data\\northwind.duckdb";
            duckDBDS.Schema = "main";

            // For MotherDuck use:
            // duckDBDS.Database = "md:your_database_name";
        }

        return Task.FromResult(dataSource);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
// Create data source providers
const dataSourceItemProvider = async (userContext, dataSourceItem) => {
    // Required: Update the underlying data source
    await dataSourceProvider(userContext, dataSourceItem.dataSource);

    if (dataSourceItem instanceof reveal.RVDuckDBDataSourceItem) {
        // Configure specific item properties if needed
        if (dataSourceItem.id === "duckdb_orders") {
            dataSourceItem.table = "orders";
            dataSourceItem.schema = "main";

            // Optional: call a DuckDB table macro
            // dataSourceItem.procedure = "top_customers";
            // dataSourceItem.procedureParameters = {
            //     min_total: 1000
            // };
        }
    }

    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVDuckDBDataSource) {
        // Configure connection properties
        dataSource.database = "data\\northwind.duckdb";
        dataSource.schema = "main";

        // For MotherDuck use:
        // dataSource.database = "md:your_database_name";
    }

    return dataSource;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```ts
// Create data source providers
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    // Required: Update the underlying data source
    await dataSourceProvider(userContext, dataSourceItem.dataSource);

    if (dataSourceItem instanceof RVDuckDBDataSourceItem) {
        // Configure specific item properties if needed
        if (dataSourceItem.id === "duckdb_orders") {
            dataSourceItem.table = "orders";
            dataSourceItem.schema = "main";

            // Optional: call a DuckDB table macro
            // dataSourceItem.procedure = "top_customers";
            // dataSourceItem.procedureParameters = {
            //     min_total: 1000
            // };
        }
    }

    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVDuckDBDataSource) {
        // Configure connection properties
        dataSource.database = "data\\northwind.duckdb";
        dataSource.schema = "main";

        // For MotherDuck use:
        // dataSource.database = "md:your_database_name";
    }

    return dataSource;
}
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
// Create a data source provider
public class DataSourceProvider implements IRVDataSourceProvider {
    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardId, RVDataSourceItem dataSourceItem) {
        // Required: Update the underlying data source
        changeDataSource(userContext, dataSourceItem.getDataSource());

        if (dataSourceItem instanceof RVDuckDBDataSourceItem duckDBItem) {
            // Configure specific item properties if needed
            if ("duckdb_orders".equals(duckDBItem.getId())) {
                duckDBItem.setTable("orders");
                duckDBItem.setSchema("main");

                // Optional: call a DuckDB table macro
                // duckDBItem.setProcedure("top_customers");
            }
        }

        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVDuckDBDataSource duckDBDS) {
            // Configure connection properties
            duckDBDS.setDatabase("data\\northwind.duckdb");
            duckDBDS.setSchema("main");

            // For MotherDuck use:
            // duckDBDS.setDatabase("md:your_database_name");
        }

        return dataSource;
    }
}
```

  </TabItem>
</Tabs>

`Database` は、絶対パスと相対パスの両方の DuckDB ファイル パスを受け入れます。ASP.NET の場合、相対パスは `AppContext.BaseDirectory` を基準に解決されます。MotherDuck の場合は、値を `md:databaseName` に設定します。

`Schema` は `RVDuckDBDataSource` と `RVDuckDBDataSourceItem` の両方でオプションです。設定しない場合、Reveal は既定の DuckDB スキーマである `main` を使用します。

DuckDB は、サーバー側でカスタム クエリと DuckDB テーブル マクロをサポートします。詳細については、[カスタム クエリ](/web/custom-queries) を参照してください。

:::danger 重要
`ChangeDataSourceAsync` メソッドでデータ ソースに加えた変更は、`ChangeDataSourceItemAsync` メソッドには引き継がれません。両方のメソッドでデータ ソースのプロパティを**更新する必要があります**。上記の例に示すように、`ChangeDataSourceItemAsync` メソッド内で、データ ソース項目の基になるデータ ソースをパラメーターとして渡して `ChangeDataSourceAsync` メソッドを呼び出すことをお勧めします。
:::

### 認証

ローカル DuckDB データベース ファイルでは認証は必要ありません。MotherDuck に接続する場合は、認証プロバイダーを使用してサーバー側で個人用アクセス トークンを提供します。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVDuckDBDataSource duckDBDS && duckDBDS.Database?.StartsWith("md:") == true)
        {
            userCredential = new RVPersonalAccessTokenDataSourceCredential("your_motherduck_access_token");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVDuckDBDataSource && dataSource.database?.startsWith("md:")) {
        return new reveal.RVPersonalAccessTokenDataSourceCredential("your_motherduck_access_token");
    }
    return null;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```ts
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVDuckDBDataSource && dataSource.database?.startsWith("md:")) {
        return new RVPersonalAccessTokenDataSourceCredential("your_motherduck_access_token");
    }
    return null;
}
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
public class AuthenticationProvider implements IRVAuthenticationProvider {
    @Override
    public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVDuckDBDataSource duckDBDS && duckDBDS.getDatabase() != null && duckDBDS.getDatabase().startsWith("md:")) {
            return new RVPersonalAccessTokenDataSourceCredential("your_motherduck_access_token");
        }
        return null;
    }
}
```

  </TabItem>
</Tabs>

## クライアント側の実装

クライアント側では、データ ソースの id、title、subtitle などの基本プロパティだけを指定する必要があります。実際の DuckDB ファイル パス、MotherDuck データベース名、スキーマ、クエリ構成はサーバー上で行われます。

### データ ソースの作成

**手順 1** - `RevealView.onDataSourcesRequested` イベントのイベント ハンドラーを追加します。

```js
const revealView = new RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    // Add data source here
    callback(new RevealDataSources([], [], false));
};
```

**手順 2** - `RevealView.onDataSourcesRequested` イベント ハンドラーで、`RVDuckDBDataSource` オブジェクトの新しいインスタンスを作成します。`title` と `subtitle` プロパティを設定します。`RVDuckDBDataSource` オブジェクトを作成したら、それをデータ ソース コレクションに追加します。

```js
revealView.onDataSourcesRequested = (callback) => {
    const duckDBDS = new RVDuckDBDataSource();
    duckDBDS.id = "duckdb_ds";
    duckDBDS.title = "My DuckDB Datasource";
    duckDBDS.subtitle = "DuckDB";

    callback(new RevealDataSources([duckDBDS], [], false));
};
```

アプリケーションが実行されたら、新しい可視化を作成すると、新しく作成された DuckDB データ ソースが [データ ソースの選択] ダイアログに表示されます。

![](images/duckdb-data-source.jpg)

### データ ソース項目の作成

データ ソース項目は、ユーザーが視覚化のために選択できる DuckDB データ ソース内の特定のテーブル、ビュー、または DuckDB テーブル マクロを表します。クライアント側では、ID、タイトル、サブタイトルのみを指定する必要があります。

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const duckDBDS = new RVDuckDBDataSource();
    duckDBDS.id = "duckdb_ds";
    duckDBDS.title = "My DuckDB Datasource";
    duckDBDS.subtitle = "DuckDB";

    // Create a data source item
    const duckDBDSI = new RVDuckDBDataSourceItem(duckDBDS);
    duckDBDSI.id = "duckdb_orders";
    duckDBDSI.title = "Orders";
    duckDBDSI.subtitle = "DuckDB";

    callback(new RevealDataSources([duckDBDS], [duckDBDSI], false));
};
```

アプリケーションが実行されたら、新しい可視化を作成すると、新しく作成された DuckDB データ ソース項目が [データ ソースの選択] ダイアログに表示されます。

![](images/duckdb-data-source-item.jpg)

## その他のリソース

- [DuckDB ドキュメント](https://duckdb.org/docs/)
- [MotherDuck ドキュメント](https://motherduck.com/docs/)

## API リファレンス

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVDuckDBDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.DuckDB.RVDuckDBDataSource.html) - DuckDB データ ソースを表します
* [RVDuckDBDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.DuckDB.RVDuckDBDataSourceItem.html) - DuckDB データ ソース項目を表します

</TabItem>
<TabItem value="node" label="Node.js">

* [RVDuckDBDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvduckdbdatasource.html) - DuckDB データ ソースを表します
* [RVDuckDBDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvduckdbdatasourceitem.html) - DuckDB データ ソース項目を表します

</TabItem>
</Tabs>
