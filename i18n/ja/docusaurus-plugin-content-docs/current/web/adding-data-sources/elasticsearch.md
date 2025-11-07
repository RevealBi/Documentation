---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Elasticsearch データ ソース

## 概要

Elasticsearch は、増え続けるユースケースに対応できる、分散型の RESTful 検索および分析エンジンです。Elastic Stack の中核として、データを一元的に保存し、高速な検索、微調整された関連性、簡単にスケールする強力な分析を実現します。Elasticsearch SQL を使用すると、Elasticsearch インデックスに対して SQL クエリを実行でき、使い慣れた SQL 構文を使用してデータを操作しやすくなります。このトピックでは、Reveal アプリケーションで Elasticsearch データ ソースに接続して、データを視覚化および分析する方法について説明します。

## サーバーの構成

### インストール

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

ASP.NET アプリケーションの場合、Elasticsearch サポートを有効にするには、別の NuGet パッケージをインストールする必要があります。

```bash
dotnet add package Reveal.Sdk.Data.Elasticsearch
```

次に、アプリケーションに Elasticsearch プロバイダーを登録します。

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterElasticsearch();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

Node.js アプリケーションの場合、Elasticsearch データ ソースはメインの Reveal SDK パッケージにすでに含まれています。標準の Reveal SDK セットアップ以外に追加のインストールは必要ありません。

  </TabItem>
</Tabs>

### 接続の構成

Elasticsearch のすべての接続プロパティは、データ ソース プロバイダーの実装を通じてサーバー側で構成されます。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
// データ ソース プロバイダーを作成する
public class DataSourceProvider : IRVDataSourceProvider
{
    public async Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
        // 必須: 基になるデータ ソースを更新する
        await ChangeDataSourceAsync(userContext, dataSourceItem.DataSource);

        if (dataSourceItem is RVElasticsearchDataSourceItem elasticsearchDataSourceItem)
        {
            // 特定のインデックスを使用して構成する
            if (dataSourceItem.Id == "elasticsearchDataSourceItemId")
            {
                elasticsearchDataSourceItem.Index = "kibana_sample_data_ecommerce";
            }

            // またはカスタム SQL クエリを使用して構成する
            if (dataSourceItem.Id == "elasticsearchDataSourceItemCustomQueryId")
            {
                elasticsearchDataSourceItem.CustomQuery = "SELECT * FROM \"kibana_sample_data_ecommerce\" WHERE \"customer_first_name\" = 'Eddie'";
            }

            // フィールドの複数値処理を構成する
            elasticsearchDataSourceItem.FieldMultiValueLeniency = true;
        }

        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVElasticsearchDataSource elasticsearchDataSource)
        {
            // 接続プロパティを構成する
            elasticsearchDataSource.Nodes = new List<string> { "http://localhost:9200" };
            
            // オプション: SSL/TLS 証明書フィンガープリントを構成する
            elasticsearchDataSource.CertificateFingerprint = "your_certificate_fingerprint";
            
            // オプション: データ ソース レベルでフィールドの複数値処理を構成する
            elasticsearchDataSource.FieldMultiValueLeniency = true;
        }

        return Task.FromResult(dataSource);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
// データ ソース プロバイダーを作成する
const dataSourceItemProvider = async (userContext, dataSourceItem) => {
    // 必須: 基になるデータ ソースを更新する
    await dataSourceProvider(userContext, dataSourceItem.dataSource);
    
    if (dataSourceItem instanceof reveal.RVElasticsearchDataSourceItem) {        
        // 特定のインデックスを使用して構成する
        if (dataSourceItem.id === "elasticsearchDataSourceItemId") {
            dataSourceItem.index = "kibana_sample_data_ecommerce";
        }

        // またはカスタム SQL クエリを使用して構成する
        if (dataSourceItem.id === "elasticsearchDataSourceItemCustomQueryId") {
            dataSourceItem.customQuery = "SELECT * FROM \"kibana_sample_data_ecommerce\" WHERE \"customer_first_name\" = 'Eddie'";
        }

        // フィールドの複数値処理を構成する
        dataSourceItem.fieldMultiValueLeniency = true;
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVElasticsearchDataSource) {
        // 接続プロパティを構成する
        dataSource.nodes = ["http://localhost:9200"];
        
        // オプション: SSL/TLS 証明書フィンガープリントを構成する
        dataSource.certificateFingerprint = "your_certificate_fingerprint";
        
        // オプション: データ ソース レベルでフィールドの複数値処理を構成する
        dataSource.fieldMultiValueLeniency = true;
    }
    
    return dataSource;
}

```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```typescript
// データ ソース プロバイダーを作成する
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    // 必須: 基になるデータ ソースを更新する
    await dataSourceProvider(userContext, dataSourceItem.dataSource);

    if (dataSourceItem instanceof RVElasticsearchDataSourceItem) {        
        // 特定のインデックスを使用して構成する
        if (dataSourceItem.id === "elasticsearchDataSourceItemId") {
            dataSourceItem.index = "kibana_sample_data_ecommerce";
        }

        // またはカスタム SQL クエリを使用して構成する
        if (dataSourceItem.id === "elasticsearchDataSourceItemCustomQueryId") {
            dataSourceItem.customQuery = "SELECT * FROM \"kibana_sample_data_ecommerce\" WHERE \"customer_first_name\" = 'Eddie'";
        }

        // フィールドの複数値処理を構成する
        dataSourceItem.fieldMultiValueLeniency = true;
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVElasticsearchDataSource) {
        // 接続プロパティを構成する
        dataSource.nodes = ["http://localhost:9200"];
        
        // オプション: SSL/TLS 証明書フィンガープリントを構成する
        dataSource.certificateFingerprint = "your_certificate_fingerprint";
        
        // オプション: データ ソース レベルでフィールドの複数値処理を構成する
        dataSource.fieldMultiValueLeniency = true;
    }
    
    return dataSource;
}
```

  </TabItem>
</Tabs>

:::danger 重要
`ChangeDataSourceAsync` メソッドでデータ ソースに加えられた変更は、`ChangeDataSourceItemAsync` メソッドに引き継がれません。両方のメソッドでデータ ソース プロパティを更新する**必要があります**。上記の例に示すように、`ChangeDataSourceItemAsync` メソッド内で `ChangeDataSourceAsync` メソッドを呼び出し、データ ソース項目の基になるデータ ソースをパラメーターとして渡すことをお勧めします。
:::

### 認証

Elasticsearch の認証は、個人アクセス トークンを使用してサーバー側で処理されます。認証オプションの詳細については、「[認証](../authentication.md#ユーザー名パスワード認証)」トピックを参照してください。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        
        if (dataSource is RVElasticsearchDataSource)
        {
            userCredential = new RVUsernamePasswordDataSourceCredential("elastic", "your_password");
        }
        
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVElasticsearchDataSource) {
        return new reveal.RVUsernamePasswordDataSourceCredential("elastic", "your_password");
    }
    return null;
}
```

  </TabItem>
    <TabItem value="node-ts" label="Node.js - TS">

```ts
const authenticationProvider = async (userContext:IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVElasticsearchDataSource) {
        return new RVUsernamePasswordDataSourceCredential("elastic", "your_password");
    }
    return null;
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
    // ここにデータ ソースを追加する
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**手順 2** - `RevealView.onDataSourcesRequested` イベント ハンドラーで、`RVElasticsearchDataSource` オブジェクトの新しいインスタンスを作成します。`title` プロパティと `subtitle` プロパティを設定します。`RVElasticsearchDataSource` オブジェクトを作成したら、それをデータ ソース コレクションに追加します。

```js
revealView.onDataSourcesRequested = (callback) => {
    const elasticsearchDS = new $.ig.RVElasticsearchDataSource();
    elasticsearchDS.title = "My Elasticsearch Data Source";
    elasticsearchDS.subtitle = "Elasticsearch";

    callback(new $.ig.RevealDataSources([elasticsearchDS], [], false));
};
```

アプリケーションを実行すると、新しい表示形式を作成すると、新しく作成された Elasticsearch データ ソースが [データ ソースの選択] ダイアログに表示されます。

### データ ソース項目の作成

データ ソース項目は、ユーザーが表示形式のために選択できる Elasticsearch データ ソース内の特定のデータセットを表します。クライアント側では、ID、タイトル、サブタイトルを指定するだけです。

```js
revealView.onDataSourcesRequested = (callback) => {
    // データ ソースを作成する
    const elasticsearchDS = new $.ig.RVElasticsearchDataSource();
    elasticsearchDS.title = "My Elasticsearch Data Source";
    elasticsearchDS.subtitle = "Elasticsearch";
    
    // データ ソース アイテムを作成する
    const elasticsearchDSI = new $.ig.RVElasticsearchDataSourceItem(elasticsearchDS);
    elasticsearchDSI.id = "my-data-source-item";
    elasticsearchDSI.title = "My Elasticsearch Data Source Item";
    elasticsearchDSI.subtitle = "Elasticsearch";

    callback(new $.ig.RevealDataSources([elasticsearchDS], [elasticsearchDSI], false));
};
```

アプリケーションを実行すると、新しい表示形式を作成すると、新しく作成された Elasticsearch データ ソース項目が [データ ソースの選択] ダイアログに表示されます。

## その他のリソース

- [Elasticsearch ドキュメント](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Elasticsearch SQL ドキュメント](https://www.elastic.co/guide/en/elasticsearch/reference/current/xpack-sql.html)

## API リファレンス

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVElasticsearchDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Elasticsearch.RVElasticsearchDataSource.html) - Elasticsearch データ ソースを表します
* [RVElasticsearchDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Elasticsearch.RVElasticsearchDataSourceItem.html) - Elasticsearch データ ソース項目を表します

</TabItem>
<TabItem value="node" label="Node.js">

* [RVElasticsearchDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvelasticsearchdatasource.html) - Elasticsearch データ ソースを表します
* [RVElasticsearchDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvelasticsearchdatasourceitem.html) - Elasticsearch データ ソース項目を表します

</TabItem>
</Tabs>
