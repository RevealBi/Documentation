---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Google BigQuery データ ソースの追加

:::danger breaking changes

Currently, the Reveal SDK is in the process of decoupling the data sources from the Reveal SDK core package. In order to ensure the project's continued functionality, you might be required to install additional packages into your project. Please see the [Supported Data Sources](web/datasources.md#supported-data-sources) topic for more information.

:::

**手順 1** - `RevealView.onDataSourcesRequested` イベントのイベント ハンドラーを追加します。

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    //add code here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**手順 2** - `RevealView.onDataSourcesRequested` イベント ハンドラーで、[RVBigQueryDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvbigquerydatasource.html) オブジェクトの新しいインスタンスを作成します。`Title`、`Subtitle`、および `ProjectId` プロパティを設定します。`RVBigQueryDataSource` オブジェクトを作成したら、それをデータ ソース項目コレクションに追加します。

```js
revealView.onDataSourcesRequested = (callback) => {
    var bigQuery = new $.ig.RVBigQueryDataSource();
    bigQuery.title = "My Big Query";
    bigQuery.subtitle = "My Big Query Subtitle";
    bigQuery.projectId = "bigquery-public-data";

    callback(new $.ig.RevealDataSources([bigQuery], [], false));
};
```
アプリケーションを実行し、新しい可視化を作成すると、新しく作成された Big Query データ ソースが [データ ソースの選択] ダイアログに 表示されます。

![](images/big-query-data-source.jpg)

:::note

`RVBigQueryDataSource` は、Reveal SDK に登録された認証プロバイダーに基づいてテーブルを読み込みます。Google Big Query は `RVBearerTokenDataSourceCredential` を使用して認証します。詳細については、[認証](../authentication#ベアラー-トークン認証)トピックを参照してください。

:::

**手順 3** - [RVBigQueryDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvbigquerydatasourceitem.html) オブジェクトの新しいインスタンスを作成して、新しい Big Query データ ソース項目を作成します。`Title`、`Subtitle`、`ProjectId`、`DatasetId`、および `Table` プロパティの値を指定します。`RVBigQueryDataSourceItem` オブジェクトを作成したら、それをデータ ソース項目コレクションに追加します。

```js
revealView.onDataSourcesRequested = (callback) => {
    var bigQuery = new $.ig.RVBigQueryDataSource();
    bigQuery.title = "My Big Query";
    bigQuery.subtitle = "My Big Query Subtitle";
    bigQuery.projectId = "bigquery-public-data";

    var bigQueryItem = new $.ig.RVBigQueryDataSourceItem(bigQuery);
    bigQueryItem.title = "My Big Query Item";
    bigQueryItem.subtitle = "My Big Query Item Subtitle";         
    bigQueryItem.projectId = "bigquery-public-data";
    bigQueryItem.datasetId = "austin_311";
    bigQueryItem.table = "311_service_requests";

    callback(new $.ig.RevealDataSources([bigQuery], [bigQueryItem], false));
};
```

アプリケーションが実行されたら、新しい可視化を作成すると、新しく作成された Big Query データ ソース項目が [データ ソースの選択] ダイアログに表示されます。

![](images/big-query-data-source-item.jpg)


:::info コードの取得

このサンプルのソース コードは、[GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/BigQuery-ServiceAccount) にあります。

:::