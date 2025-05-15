---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Amazon Athena データ ソース

## 概要

Amazon Athena は、標準 SQL を使用して Amazon S3 内のデータを簡単に分析できるインタラクティブなクエリ サービスです。このトピックでは、Reveal アプリケーションで Amazon Athena データ ソースに接続して、データを視覚化および分析する方法について説明します。

## サーバーの構成

### インストール

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

ASP.NET アプリケーションの場合、Amazon Athena サポートを有効にするには、別の NuGet パッケージをインストールする必要があります。

```bash
dotnet add package Reveal.Sdk.Data.Amazon.Athena
```

次に、アプリケーションに Amazon Athena プロバイダーを登録します。

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterAmazonAthena();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

Node.js アプリケーションの場合、Amazon Athena データ ソースはメインの Reveal SDK パッケージにすでに含まれています。標準の Reveal SDK セットアップ以外に追加のインストールは必要ありません。

  </TabItem>
  <TabItem value="java" label="Java">

Java アプリケーションの場合、Amazon Athena データ ソースはメインの Reveal SDK パッケージにすでに含まれています。標準の Reveal SDK セットアップ以外に追加のインストールは必要ありません。

  </TabItem>
</Tabs>

### 接続の構成

Amazon Athena のすべての接続プロパティは、データ ソース プロバイダーの実装を通じてサーバー側で構成されます。

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

        if (dataSourceItem is RVAthenaDataSourceItem athenaItem)
        {            
            // Configure specific item properties as needed
            if (athenaItem.Id == "my-data-source-item")
            {
                athenaItem.Table = "your_table_name";
            }
        }
        
        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVAthenaDataSource athenaDS)
        {
            // Configure connection properties
            athenaDS.Region = "your_region";
            athenaDS.Database = "your_database_name";
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
    
    if (dataSourceItem instanceof reveal.RVAthenaDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "my-data-source-item") {
            dataSourceItem.table = "your_table_name";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVAthenaDataSource) {
        // Configure connection properties
        dataSource.region = "your_region";
        dataSource.database = "your_database_name";
    }
    
    return dataSource;
}

```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```typescript
// Create data source providers
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    // Required: Update the underlying data source
    await dataSourceProvider(userContext, dataSourceItem.dataSource);

    if (dataSourceItem instanceof RVAthenaDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "my-data-source-item") {
            dataSourceItem.table = "your_table_name";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVAthenaDataSource) {
        // Configure connection properties
        dataSource.region = "your_region";
        dataSource.database = "your_database_name";
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
        changeDataSource(userContext, athenaItem.getDataSource());

        if (dataSourceItem instanceof RVAthenaDataSourceItem athenaItem) {            
            // Configure specific item properties if needed
            if ("my-data-source-item".equals(athenaItem.getId())) {
                athenaItem.setTable("your_table_name");
            }
        }
        
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVAthenaDataSource athenaDS) {
            // Configure connection properties
            athenaDS.setRegion("your_region");
            athenaDS.setDatabase("your_database_name");
        }
        
        return dataSource;
    }
}
```

  </TabItem>
</Tabs>

:::danger Important
`ChangeDataSourceAsync` メソッドでデータ ソースに加えられた変更は、`ChangeDataSourceItemAsync` メソッドには引き継がれません。どちらの方法でも、データ ソース プロパティを**更新する必要があります**。上記の例に示すように、`ChangeDataSourceItemAsync` メソッド内で `ChangeDataSourceAsync` メソッドを呼び出し、データ ソース項目の基になるデータ ソースをパラメーターとして渡すことをお勧めします。
:::

### 認証

Amazon Athena の認証は、AWS 認証情報を使用してサーバー側で処理されます。認証オプションの詳細については、「[認証](../authentication.md#amazon-web-services)」トピックを参照してください。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVS3DataSource)
        {
            userCredential = new RVAmazonWebServicesCredentials("key", "secret");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVS3DataSource) {
        return new reveal.RVAmazonWebServicesCredentials("key", "secret");
    }
    return null;
}
```

  </TabItem>
    <TabItem value="node-ts" label="Node.js - TS">

```ts
const authenticationProvider = async (userContext:IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVS3DataSource) {
        return new RVAmazonWebServicesCredentials("key", "secret");
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
        if (dataSource instanceof RVS3DataSource) {
            return new RVAmazonWebServicesCredentials("key", "secret");
        }
        return null;
    }
}
```

  </TabItem>
</Tabs>

## クライアント側の実装

クライアント側では、データ ソースの ID、タイトル、サブタイトルなどの基本プロパティを指定するだけです。実際の接続構成はサーバー上で行われます。

### データ ソースの作成

**手順 1** - `RevealView.onDataSourcesRequested` イベントのイベント ハンドラーを追加します。

```js
const revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    // Add data source here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**手順 2** - `RevealView.onDataSourcesRequested` イベント ハンドラーで、`RVAthenaDataSource` オブジェクトの新しいインスタンスを作成します。`title` と `subtitle` プロパティを設定します。`RVAthenaDataSource` オブジェクトを作成したら、それをデータ ソース コレクションに追加します。

```js
revealView.onDataSourcesRequested = (callback) => {
    const athenaDS = new $.ig.RVAthenaDataSource();
    athenaDS.title = "My Athena Data Source";
    athenaDS.subtitle = "Amazon Athena";

    callback(new $.ig.RevealDataSources([athenaDS], [], false));
};
```

アプリケーションが実行されたら、新しい可視化を作成すると、新しく作成された Amazon Athena データ ソースが [データ ソースの選択] ダイアログにリストされます。

![](images/amazon-athena-data-source.jpg)

### データ ソース項目の作成

データ ソース項目は、ユーザーが表示形式のために選択できる Athena データ ソース内の特定のデータセットを表します。クライアント側では、ID、タイトル、サブタイトルを指定するだけです。

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const athenaDS = new $.ig.RVAthenaDataSource();
    athenaDS.title = "My Athena Data Source";
    athenaDS.subtitle = "Amazon Athena";
    
    // Create a data source item
    const athenaDSI = new $.ig.RVAthenaDataSourceItem(athenaDS);
    athenaDSI.id = "my-data-source-item";
    athenaDSI.title = "My Athena Data Source Item";
    athenaDSI.subtitle = "Amazon Athena";

    callback(new $.ig.RevealDataSources([athenaDS], [athenaDSI], false));
};
```

アプリケーションが実行されたら、新しい可視化を作成すると、新しく作成された Amazon Athena データ ソース項目が [データ ソースの選択] ダイアログにリストされます。

![](images/amazon-athena-data-source-item.jpg)

## その他のリソース

- [Amazon Athena のドキュメント](https://docs.aws.amazon.com/athena/)
- [GitHub のサンプル ソース コード](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/Amazon-Athena)

## API リファレンス

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVAthenaDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Amazon.Athena.RVAthenaDataSource.html) - Amazon Athena データ ソースを表します
* [RVAthenaDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Amazon.Athena.RVAthenaDataSourceItem.html) - Amazon Athena データ ソース項目を表します

</TabItem>
<TabItem value="node" label="Node.js">

* [RVAthenaDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvathenadatasource.html) - Amazon Athena データ ソースを表します
* [RVAthenaDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvathenadatasourceitem.html) - Amazon Athena データ ソース項目を表します

</TabItem>
<TabItem value="java" label="Java">

* [RVAthenaDataSource](https://help.revealbi.io/api/java/latest/com/infragistics/reveal/sdk/api/model/RVAthenaDataSource.html) - Amazon Athena データ ソースを表します
* [RVAthenaDataSourceItem](https://help.revealbi.io/api/java/latest/com/infragistics/reveal/sdk/api/model/RVAthenaDataSourceItem.html) - Amazon Athena データ ソース項目を表します

</TabItem>
</Tabs>
