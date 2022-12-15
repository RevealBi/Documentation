# データ ソース

Reveal SDK は、分析ツール、コンテンツ マネージャー、クラウド サービス、CRM、データベース、スプレッドシート、公開データ ソースなど、30 を超えるデータ ソースをサポートしており、毎月さらに多くのデータ ソースが出荷されています。  データ ソースは、ダッシュボードのどこからデータが取得されるかを定義します。各データ ソースには、接続文字列、ユーザー ID、パスワードなど、データに接続してデータを取得するためにコードで設定した固有のプロパティがあります。

Reveal SDK には、データ ソースに関して 2 つの概念があります。
1. データ ソース - これはデータの主要なソースです。たとえば、SQL Server をデータ ソースにすることができます。
2. データ ソース項目 - これは、データ ソースから利用できる特定の項目です。例えば、SQL Server の特定のテーブル。

データ ソース (データ ストア) とデータ ソース項目 (データ項目) は、Reveal View の **[データ ソースの選択]** ダイアログで別々に分類されます。

![](adding-data-sources/images/ms-sql-server-data-source-item.jpg)

Reveal SDK を使用してデータ ソースまたはデータ ソース項目を追加するには、`RevealView.onDataSourcesRequested` イベントにイベント ハンドラーを追加します。イベント ハンドラーでは、ダッシュボードで使用されるさまざまなタイプのデータ ソースまたはデータ ソース項目のインスタンスを作成するコードを記述します。次に、それらのインスタンスをイベント `コールバック`に渡して、使用できるようにします。

```javascript
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    //create data sources and data source items
    var sqlDataSource = new $.ig.RVSqlServerDataSource();
    ...
    var sqlServerDsi = new $.ig.RVSqlServerDataSourceItem(sqlDataSource);
    ...

    //provider data sources and data source items in callback
    callback(new $.ig.RevealDataSources([sqlDataSource], [sqlServerDsi], true));
};
```

- データ ソースは、コールバックの最初のパラメーターに配列として提供されます。
- データ ソース項目は、コールバックの 2 番目のパラメーターに配列として提供されます。
- 3 番目のパラメーターは、**[データ ソースの選択]** ダイアログのデータ ソースとデータ ソース システムの表示を制御します。

## サポートされるデータ ソース

次のデータ ソースが Reveal SDK でサポートされています:

- Amazon Athena
- Amazon Redshift
- Amazon S3
- Box
- CSV (カンマで区切られた値)
- Dropbox
- [Excel / Microsoft Excel](adding-data-sources/excel-file.md)
- Google Analytics 4
- Google アナリティクス
- Google BigQuery
- Google ドライブ
- Google スプレッドシート
- Hubspot
- [インメモリ データ](adding-data-sources/in-memory-data.md)
- Marketo
- Microsoft Analysis サービス
- Microsoft Azure Analysis Services
- Microsoft Azure SQL Database
- Microsoft Azure Synapse Analytics
- Microsoft Dynamics CRM
- Microsoft Reporting Services (SSRS)
- [Microsoft SQL Server](adding-data-sources/ms-sql-server.md)
- MySQL
- OData Feed
- OneDrive
- Oracle
- PostgreSQL
- Quickbooks
- REST API
- Salesforce
- スプレッドシート (XLSX、XLS)
- SharePoint
- Sybase
- TSV (タブで区切られた値)