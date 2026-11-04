---
title: Engine2
description: Reveal のサーバー側データ エンジンである Engine2 がサポートするデータ ソースと操作、およびリクエストが代わりにレガシー エンジンで実行される場合について説明します。
---

# Engine2

Engine2 は Reveal のサーバー側データ エンジンです。ASP.NET、Java、Node.js のサーバー SDK ではデフォルトで有効になっており、表示形式とダッシュボード フィルターのデータを処理します。Engine2 で実行できないリクエストは、代わりにレガシー エンジンで実行され、表示形式はこれまでどおりデータを表示します。

一部の機能は Engine2 でのみ動作し、レガシー エンジンで実行されるリクエストでは失敗します。

- [タイムゾーンの変換](time-zones.md): DateTime フィールドを含む表示形式に「Converting to the current time zone requires Engine2…」というエラーが表示されます。

## リクエストがレガシー エンジンで実行される場合 {#when-a-request-runs-on-the-legacy-engine}

次の場合、リクエストはレガシー エンジンで実行されます。

- **データ ソースがサポートされていない場合。** [サポートされるデータ ソース](#supported-data-sources)を参照してください。
- **サポートされていないデータ ソースをブレンドしている場合。** メインのデータ ソースがサポートされている場合も同様です。
- **データが入れ替えられている場合。** データ ソースのプレビューでデータを入れ替えると行と列が入れ替わり、入れ替えたデータは常にレガシー エンジンで実行されます。
- **Engine2 が無効になっている場合。** ASP.NET では `Engine2Enabled`、Java では `setEngine2Enabled`、Node.js では `engine2Enabled` オプションで無効にできます。この場合、すべてのリクエストがレガシー エンジンで実行されます。サーバーで無効にする場合は、クライアントでも `RevealSdkSettings.betaFeatures.disable("engine2Enabled")` で無効にしてください。

## サポートされるデータ ソース {#supported-data-sources}

Engine2 は次のデータ ソースをサポートしています。

- Amazon Athena、Amazon Redshift、Azure SQL、Azure Synapse、ClickHouse、Cosmos DB、Databricks、DuckDB、Elasticsearch、Google BigQuery、MariaDB、MongoDB、MS SQL Server、MySQL、Oracle、PostgreSQL、Snowflake、SQLite
- CSV、Excel、JSON データ (REST、Amazon S3、SharePoint、OneDrive、Google Drive、Dropbox、Box、またはローカル ストレージから読み取るファイルを含む)
- Google スプレッドシートおよびインメモリ データ

Cube、OData、Salesforce、Dynamics 365、HubSpot、Marketo、QuickBooks、Google Analytics 4、Microsoft Analysis Services、Reporting Services、Sybase など、その他のデータ ソースはレガシー エンジンで実行されます。
