# Excel ファイル データ ソースの置き換え

ダッシュボードは、クラウドに保存されている Excel ファイルを視覚化のデータ ソースとして使用して作成される場合があります。

アプリケーションに Reveal SDK を埋め込む場合、これらのクラウドベースのファイルを、実行時にローカル ディレクトリに保存されているファイルに置き換えることができます。

**手順 1** - `IRVDataSourceProvider` を実装するクラスを作成します。このクラスは、Excel ファイルの実際の置換を実行します。

```cs
public class MyDataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync(RVDashboardFilter filter, RVDataSourceItem dataSourceItem)
    {
        throw new NotImplementedException();
    }

    public Task<RVDataSourceItem> ChangeDashboardFilterDataSourceItemAsync(RVDashboardFilter filter, RVDataSourceItem dataSourceItem)
    {
        throw new NotImplementedException();
    }
}
```

このクラスの `ChangeVisualizationDataSourceItemAsync` メソッドは、表示形式がデータを取得するために使用する `RVDataSourceItem` を返します。`ChangeVisualizationDataSourceItemAsync` メソッドで引数として提供される `RVDataSourceItem` 項目を変更することにより、データを取得する Excel ファイルを変更できます。

**手順 2** - `RevealSdkSettings.DataSourceProvider` を `IRVDataSourceProvider` を実装するクラスのインスタンスに設定します。

```cs
RevealSdkSettings.DataSourceProvider = new MyDataSourceProvider();
```

## 例: Excel ファイル データ ソースの置き換え

この例では、「Sales CloudExcelFile」という名前のクラウドベースの Excel ファイルを使用しているデータ ソース項目を「SalesLocalExcelFile.xlsx」という名前のローカル Excel ファイルに置き換えています。

まず、受信 `RVDataSourceItem` をチェックして、それが `RVExcelDataSourceItem` であるかどうかを確認します。そうである場合は、既存の `RVDataSourceItem.ResourceItem` を取得し、その `Title` プロパティを確認します。タイトルが「SalesCloudExcel File」の場合、新しい `RVLocalFileDataSourceItem` を作成し、`Uri` を新しいローカル Excel ファイルの場所に設定します。ローカル Excel ファイル データ ソース項目のタイトルを設定した後、`RVExcelDataSourceItem.ResourceItem` を新しく作成した `RVLocalFileDataSourceItem` に置き換えます。

```cs
public Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync(RVVisualization visualization, RVDataSourceItem dataSourceItem)
{
    if (dataSourceItem is RVExcelDataSourceItem excelDataSourceItem)
    {
        var resourceItem = excelDataSourceItem.ResourceItem as RVDataSourceItem;
        if (resourceItem.Title == "Sales Cloud Excel File")
        {
            var localItem = new RVLocalFileDataSourceItem();
            localItem.Uri = "local:/SalesLocalExcelFile.xlsx";
            localItem.Title = resourceItem.Title;

            excelDataSourceItem.ResourceItem = localItem;
        }
    }

    return Task.FromResult(dataSourceItem);
}
```
