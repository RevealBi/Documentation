import DataSourcesTable from '@site/src/components/DataSourcesTable';

# データ ソース

Reveal SDK は、分析ツール、コンテンツ マネージャー、クラウド サービス、CRM、データベース、スプレッドシート、公開データ ソースなど、30 を超えるデータ ソースをサポートしており、毎月さらに多くのデータソースが出荷されています。データ ソースは、ダッシュボードのどこからデータが取得されるかを定義します。各データ ソースには、接続文字列、ユーザー ID、パスワードなど、データに接続してデータを取得するためにコードで設定した固有のプロパティがあります。

Reveal SDK には、データ ソースに関して 2 つの概念があります。
1. データ ソース - これはデータの主要なソースです。たとえば、SQL Server をデータ ソースにすることができます。
2. データ ソース項目 - これは、データ ソースから利用できる特定の項目です。例えば、SQL Server の特定のテーブル。

データ ソース (データ ストア) とデータ ソース項目 (データ項目) は、Reveal View の **[データソースの選択]** ダイアログで別々に分類されます。

![](adding-data-sources/images/ms-sql-server-data-source-item.jpg)

## データ ソースのインストール

Reveal SDK で使用するデータ ソースを作成する前に、Reveal SDK アプリケーションで使用するデータ ソースごとに正しいパッケージをインストールする必要があります。

**手順 1** - 使用するデータ ソースのパッケージをインストールします。どのデータ ソースがサポートされているか、およびどのパッケージをインストールする必要があるかについては、[サポートされているデータ ソース](#サポートされているデータ-ソース) セクションを参照してください。

**手順 2** - データ ソース パッケージをインストールした後、データ ソースを Reveal SDK に登録します。

```cs
using Reveal.Sdk;
using Reveal.Sdk.Data;

//all data sources use the RegisterXXX naming convention
RevealSdkSettings.DataSources.RegisterMicrosoftSqlServer();
```

## サポートされるデータ ソース

以下の表を使用して、サポートされているデータ ソースとインストールする必要があるパッケージを確認してください。

<DataSourcesTable isWpf={true}></DataSourcesTable>

**SDK に含まれている** - このデータ ソースにインストールする個別のパッケージはありません。データ ソースは Reveal SDK に含まれています。
