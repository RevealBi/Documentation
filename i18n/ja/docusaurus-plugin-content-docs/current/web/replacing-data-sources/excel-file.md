import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Excel ファイル データ ソースの置き換え

ダッシュボードは、クラウドに保存されている Excel ファイルを表示形式のデータ ソースとして作成される場合があります。

アプリケーションに Reveal SDK を埋め込む場合、これらのクラウドベースのファイルを、実行時にサーバー上にあるローカル ディレクトリに保存されているファイルに置き換えることができます。

この例では、「Sales CloudExcelFile」という名前のクラウドベースの Excel ファイルを使用しているデータ ソース項目を「SalesLocalExcelFile.xlsx」という名前のローカル Excel ファイルに置き換えています。

まず、引数に渡された `RVDataSourceItem` をチェックして、それが `RVExcelDataSourceItem` であるかどうかを確認します。そうである場合は、既存の `RVDataSourceItem.ResourceItem` を取得し、その `Title` プロパティを確認します。タイトルが「SalesCloudExcel File」の場合、新しい `RVLocalFileDataSourceItem` を作成し、`Uri` を新しいローカル Excel ファイルの場所に設定します。ローカル Excel ファイル データ ソース項目のタイトルを設定した後、`RVExcelDataSourceItem.ResourceItem` を新しく作成した `RVLocalFileDataSourceItem` に置き換えます。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
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
}
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
public class DataSourceProvider implements IRVDataSourceProvider {

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

        return null;
    }

    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

        if (dataSourceItem instanceof RVExcelDataSourceItem)
        {
            RVExcelDataSourceItem excelDataSourceItem = (RVExcelDataSourceItem)dataSourceItem;
            RVDataSourceItem resourceItem = (RVDataSourceItem)excelDataSourceItem.getResourceItem();

            if (resourceItem.getTitle() == "Sales Cloud Excel File")
            {
                RVLocalFileDataSourceItem localItem = new RVLocalFileDataSourceItem();
                localItem.setUri("local:/SalesLocalExcelFile.xlsx");
                localItem.setTitle(resourceItem.getTitle());
                excelDataSourceItem.setResourceItem(localItem);

                return (RVDataSourceItem)excelDataSourceItem;
            }
        }
        return null;
    }
}
```

  </TabItem>

</Tabs>