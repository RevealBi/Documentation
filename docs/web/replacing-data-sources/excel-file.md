import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Replacing an Excel File DataSource

Sometimes dashboards are created using Excel files stored in the cloud as a data source for its visualizations. When embedding the Reveal SDK in your application, you can replace these cloud-based files with files stored in a local directory located on the server at runtime.

In this example, we are replacing a data source item that is using a cloud-based Excel file named "Sales Cloud Excel File" with a local Excel file named "SalesLocalExcelFile.xlsx".

First, we check the incoming `RVDataSourceItem` to see if it is a `RVExcelDataSourceItem`. If it is, then we get the existing `RVDataSourceItem.ResourceItem` and check its `Title` property. If the title is "Sales Cloud Excel File" then we will create a new `RVLocalFileDataSourceItem` and set the `Uri` to the location of the new local Excel file. After we set the title of the local Excel file data source item, we replace the `RVExcelDataSourceItem.ResourceItem` with our newly created `RVLocalFileDataSourceItem`.

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
