## データソースの置き換え

### 概要

ダッシュボードのデータを (Reveal SDKによって) ロードして処理する前に、ダッシュボードの各視覚化に使用される構成またはデータをオーバーライドできます。

以下は
__RevealView__ で実装するプロパティの 1 つです。

``` csharp
public IRVDataSourceProvider DataSourceProvider { get; set; }
```

インターフェイス
__IRVDataSourceProvider__
を実装するクラスは、特定の可視化またはダッシュボード フィルターによって使用されるデータソースを置換または変更することができます。

### 使用事例

以下に、一般的なユースケースのリストがあります。

  - 現在のユーザー、またはアプリが userId、division、company、customer などのその他の属性に応じて、使用するデータベースの名前を変更できます。これにより、マルチテナント データベースからデータを取得する単一のダッシュボードを持つことができます。

  - 使用されているテーブルの名前、ロードするファイルのパスなどを変更することができます。ユースケースは上記のものと似ています。

  - データソースをメモリ内のデータソースに置き換えることができます。Reveal App はインメモリ データソースをサポートしていないため、CSV ファイルを使用してダッシュボードを設計し、このコールバックを使用して CSV データソースをインメモリデータソースに置き換えることができます。このシナリオでは、データは実際にメモリからロードされます (またはカスタムデータローダを使用して)。インメモリ データソースの使用方法の詳細については、[**インメモリ データのサポート**](in-memory-data.md) を参照してください。

### コード

次のコードスニペットは、ダッシュボードの可視化のためにデータソースを置き換える方法の例を示しています。メソッド __ChangeVisualizationDataSourceItemAsync__
は、開かれているすべてのダッシュボードで、すべての可視化に対して呼び出されます。

``` csharp
public class SampleDataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDashboardFilterDataSourceItemAsync(
             RVDashboardFilter globalFilter, RVDataSourceItem dataSourceItem)
        {
            return Task.FromResult<RVDataSourceItem>(null);
        }

   public Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync(
        RVVisualization visualization, RVDataSourceItem dataSourceItem)
   {
      var sqlServerDsi = dataSourceItem as RVSqlServerDataSourceItem;
      if (sqlServerDsi != null)
      {
          // Change SQL Server host and database
          var sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.DataSource;
          sqlServerDS.Host = "10.0.0.20";
          sqlServerDS.Database = "Adventure Works";

          // Change SQL Server table/view
          sqlServerDsi.Table = "Employees";
                return Task.FromResult((RVDataSourceItem)sqlServerDsi);
      }

      // Fully replace a data source item with a new one
      if (visualization.Title == "Top Customers")
      {
          var sqlDs = new RVSqlServerDataSource();
          sqlDs.Host = "salesdb.local";
          sqlDs.Database = "Sales";

          var sqlDsi = new RVSqlServerDataSourceItem(sqlDs);
          sqlServerDsi.Table = "Customers";

          return Task.FromResult((RVDataSourceItem)sqlServerDsi);
      }
   }
}
```

上記の例では、次の 2 つの置換が実行されます。

  - MS SQL Server データベースを使用するすべてのデータソースは、ハードコードされたサーバー 10.0.0.20、Adventure Works データベース、および Employees テーブルを使用するように変更されます。

    > [!NOTE]
    > これは単純化されたシナリオで、同じテーブルからデータを取得するためにすべての可視化を置き換えても、現実のシナリオとしては意味がありません。実際のアプリケーションでは、userId、dashboardId、データソース自体の値 (サーバー、データベースなど) などの追加情報を使用して新しい値を推測します。

  - Top Customers というタイトルのすべてのウィジェットは、Customers テーブルを使用して salesdb.local サーバーの Sales データベースからデータを取得する新しい SQL Server データソースに設定されます。

__IRVDataSourceProvider__ の実装に加え、__RevealView__ の __DataSourceProvider__ プロパティに実装を設定します。

``` csharp
revealView.DataSourceProvider = new SampleDataSourceProvider();
```
