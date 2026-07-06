---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cube データ ソース

## 概要

Cube は、チームがメトリックを一度定義し、ダッシュボードやアプリケーション全体で一貫して提供できるようにする、分析 API とデータ アプリケーション向けのセマンティック レイヤーです。このトピックでは、Reveal アプリケーションで Cube データ ソースに接続して、データを視覚化および分析する方法について説明します。

:::important 前提条件
Reveal で Cube データ ソースを構成する前に、以下を準備してください:
- `https://your-cube-host/cubejs-api/v1` のような、到達可能な Cube REST API エンドポイント
- Reveal ユーザーがクエリできる、少なくとも 1 つの公開済み Cube モデル
- Cube デプロイで認証が必要な場合は、JWT などの Bearer Token 戦略
:::

## サーバーの構成

### インストール

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

**手順 1** - Reveal Cube コネクタ パッケージをインストールします。

ASP.NET アプリケーションの場合、Cube サポートを有効にするには、別の NuGet パッケージをインストールする必要があります。

```bash
dotnet add package Reveal.Sdk.Data.Cube
```

**手順 2** - アプリケーションに Cube データ ソースを登録します。

```csharp
builder.Services.AddControllers().AddReveal(builder =>
{
    builder.DataSources.RegisterCube();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

Node.js アプリケーションの場合、Cube データ ソースはメインの Reveal SDK パッケージに既に含まれています。標準の Reveal SDK セットアップ以外に追加のインストールは必要ありません。

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

Node.js TypeScript アプリケーションの場合、Cube データ ソースはメインの Reveal SDK パッケージに既に含まれています。標準の Reveal SDK セットアップ以外に追加のインストールは必要ありません。

  </TabItem>
  <TabItem value="java" label="Java">

Java アプリケーションの場合、Cube データ ソースはメインの Reveal SDK パッケージに既に含まれています。標準の Reveal SDK セットアップ以外に追加のインストールは必要ありません。

  </TabItem>
</Tabs>

### 接続の構成

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

        if (dataSourceItem is RVCubeDataSourceItem cubeItem)
        {            
            // Configure specific item properties if needed
            if (cubeItem.Id == "cube_orders")
            {
                cubeItem.Cube = "orders";
            }
        }

        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVCubeDataSource cubeDataSource)
        {
            // Configure connection properties
            cubeDataSource.Url = "https://your-cube-host/cubejs-api/v1";
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

    if (dataSourceItem instanceof reveal.RVCubeDataSourceItem) {
        // Configure specific item properties if needed
        if (dataSourceItem.id === "cube_orders") {
            dataSourceItem.cube = "orders";
        }
    }

    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVCubeDataSource) {
        // Configure connection properties
        dataSource.url = "https://your-cube-host/cubejs-api/v1";
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

    if (dataSourceItem instanceof RVCubeDataSourceItem) {
        // Configure specific item properties if needed
        if (dataSourceItem.id === "cube_orders") {
            dataSourceItem.cube = "orders";
        }
    }

    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVCubeDataSource) {
        // Configure connection properties
        dataSource.url = "https://your-cube-host/cubejs-api/v1";
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

        if (dataSourceItem instanceof RVCubeDataSourceItem cubeItem) {            
            // Configure specific item properties if needed
            if ("cube_orders".equals(cubeItem.getId())) {
                cubeItem.setCube("orders");
            }
        }

        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVCubeDataSource cubeDataSource) {
            // Configure connection properties
            cubeDataSource.setUrl("https://your-cube-host/cubejs-api/v1");
        }

        return dataSource;
    }
}
```

  </TabItem>
</Tabs>

:::danger 重要
`ChangeDataSourceAsync` メソッドでデータ ソースに加えた変更は、`ChangeDataSourceItemAsync` メソッドには引き継がれません。両方のメソッドでデータ ソースのプロパティを更新する**必要があります**。上記の例のように、`ChangeDataSourceItemAsync` メソッド内で `ChangeDataSourceAsync` メソッドを呼び出し、データ ソース項目の基になるデータ ソースをパラメーターとして渡すことをお勧めします。
:::

### 認証

Cube の認証は通常、Cube API に対して発行された JWT などの Bearer Token を使用して処理します。詳細については、[認証](../authentication.md#ベアラー-トークン認証) トピックを参照してください。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider : IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;

        if (dataSource is RVCubeDataSource)
        {
            // Use Bearer Token
            userCredential = new RVBearerTokenDataSourceCredential("your_jwt_token", "your_userid");
        }

        return Task.FromResult(userCredential);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVCubeDataSource) {
        // Use Bearer Token
        return new reveal.RVBearerTokenDataSourceCredential("your_jwt_token", "your_userid");
    }

    return null;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```typescript
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVCubeDataSource) {
        // Use Bearer Token
        return new RVBearerTokenDataSourceCredential("your_jwt_token", "your_userid");
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
        if (dataSource instanceof RVCubeDataSource) {
            // Use Bearer Token
            return new RVBearerTokenDataSourceCredential("your_jwt_token", "your_userid");
        }

        return null;
    }
}
```

  </TabItem>
</Tabs>

## クライアント側の実装

クライアント側では、データ ソースに対して ID、title、subtitle などの基本的なプロパティだけを指定します。実際の接続構成はサーバー側で行われます。

### データ ソースの作成

**手順 1** - `RevealView.onDataSourcesRequested` イベントのイベント ハンドラーを追加します。

```js
const revealView = new RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    // Add data source here
    callback(new RevealDataSources([], [], false));
};
```

**手順 2** - `RevealView.onDataSourcesRequested` イベント ハンドラーで、`RVCubeDataSource` オブジェクトの新しいインスタンスを作成します。`title` と `subtitle` プロパティを設定します。`RVCubeDataSource` オブジェクトを作成したら、それをデータ ソース コレクションに追加します。

```js
revealView.onDataSourcesRequested = (callback) => {
    const cubeDS = new RVCubeDataSource();
    cubeDS.title = "Cube";
    cubeDS.subtitle = "Data Source";

    callback(new RevealDataSources([cubeDS], [], false));
};
```

### データ ソース項目の作成

データ ソース項目は、ユーザーが表示形式のために選択できる Cube データ ソース内の特定の Cube モデルを表します。クライアント側では、ID、タイトル、サブタイトルを指定するだけです。

```js
revealView.onDataSourcesRequested = (callback) => {
    // Create the data source
    const cubeDS = new RVCubeDataSource();
    cubeDS.title = "My Cube Datasource";
    cubeDS.subtitle = "Cube";

    // Create a data source item
    const cubeDSI = new RVCubeDataSourceItem(cubeDS);
    cubeDSI.id = "cube_orders";
    cubeDSI.title = "My Cube Datasource Item";
    cubeDSI.subtitle = "Cube";

    callback(new RevealDataSources([cubeDS], [cubeDSI], false));
};
```

## その他のリソース

- [Cube Documentation](https://cube.dev/docs)
- [Cube REST API Reference](https://cube.dev/docs/reference/rest-api)

## API リファレンス

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVCubeDataSource](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Cube.RVCubeDataSource.html) - Cube データ ソースを表します
* [RVCubeDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Cube.RVCubeDataSourceItem.html) - Cube データ ソース項目を表します

</TabItem>
<TabItem value="node" label="Node.js">

* [RVCubeDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvcubedatasource.html) - Cube データ ソースを表します
* [RVCubeDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvcubedatasourceitem.html) - Cube データ ソース項目を表します

</TabItem>
</Tabs>
