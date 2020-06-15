## 新しい可視化とダッシュボードの作成

### 概要

 [**ダッシュボードの編集と保存**](editing-saving-dashboards.md), では、ダッシュボードの変更を保存する方法を処理する方法を 2 つ **クライアント サイドとサーバー サイド**紹介しています。これらのシナリオは、ユーザーが既存のダッシュボードに以下のような変更を加える際には正しく機能します。

  - フィルターの追加/修正
  - 視覚化のタイプを変更する (チャート、ゲージ、グリッドなど)
  - テーマの変更

ただし、新しい視覚化を追加するには、ユーザーは使用する**データソースを選択**する必要があります。そのためには、含まれているアプリケーションが SDK に情報を提供する必要があるので、新しい可視化に使用できるデータソースのリストを表示できます。

### データソースのリストを表示

データソースのリストを表示するために使用する必要があるコールバックは、__DataSourcesRequested__ です。
このコールバックに独自のメソッドを設定しない場合、新しい可視化が作成されると、Reveal はダッシュボードで使用されているデータソースがある場合はすべて表示します。

#### コード:

以下のコードは、インメモリ項目と SQL Server データソースを表示するようにデータソース選択画面を構成する方法を示しています。

``` csharp
private void RevealView_DataSourcesRequested(object sender, DataSourcesRequestedEventArgs e)
{
    var inMemoryDSI = new RVInMemoryDataSourceItem("employees");
    inMemoryDSI.Title = "Employees";
    inMemoryDSI.Description = "Employees";

    var sqlDs = new RVSqlServerDataSource();
    sqlDs.Title = "Clients";
    sqlDs.Id = "SqlDataSource1";
    sqlDs.Host = "db.mycompany.local";
    sqlDs.Port = 1433;
    sqlDs.Database = "Invoices";

    e.Callback(new RevealDataSources(
            new List<object>() { sqlDs },
            new List<object>() { inMemoryDSI },
            false));
}
```

上記のコードでは、“DataSourcesRequested” イベントを処理するために次のメソッドをアタッチしたと想定しています。

``` csharp
revealView.DataSourcesRequested += RevealView_DataSourcesRequested
```

3 番目のパラメータの “false” 値は、ダッシュボード上の既存のデータソースが表示されないようにします。そのため、[+] ボタンを使用して新しいウィジェットを作成すると、以下の画面が表示されます。

![displayingDataSources\_web](images/displayingDataSources_web.png)

RVInMemoryDataSourceItem コンストラクタに渡される employees パラメーターは[**インメモリ データのサポート**](in-memory-data.md)で使用されているコンストラクタと同じデータセット ID で、返されるデータセットを識別します。

### 新しいダッシュボードの作成

以下の手順でダッシュボードを簡単に作成できます。RevealSettings で指定された null のダッシュボード値を使用し、__RevealUtility.LoadDashboard__ を使用せずに、__RevealView__ と __RevealSettings__ オブジェクトを初期化するだけです。

``` csharp
revealView.Settings = new RevealSettings(null);
revealView.DataSourcesRequested += RevealView_DataSourcesRequested;
```

SDK とともに配布されている UpMedia WPF アプリケーションに、*EmptyDashboard.xaml.cs* の実用的な例があります。
