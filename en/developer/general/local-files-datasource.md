## Populating exported dashboard with data from local excel and csv files

### Overview

When we create a dashboard in **Reveal Application** we often use Excel or CSV files stored in the cloud to populate it with data.   
After exporting the dashboard and embedding it in custom application, we can move these files in a local directory and then use the **Reveal SDK** to access and set them as a local datasource. 

### Steps
To populate the exported dashboard using local Excel and CSV files, you need to follow these steps:
1. **Export the dashboard** file as explained in [**Getting Dashboards for the SDK**](~/en/developer/general/get-dashboards.md) 
2. **Load the dashboard** in your application as described in: 
[**Loading Dashboard Files**](~/en/developer/desktop-sdk/using-the-desktop-sdk/loading-dashboards.md) (for WPF), or 
[**Creating Your First App**](~/en/developer/web-sdk/create-first-app.md) (for Web)
3. **Download the files** you used to create the dashboard from your cloud storage and copy them to a local folder.   
We suggest you use the same folders as in our UpMedia sample application:  
 - In a WPF application use the *DataSources* folder  
 - In a Web application use *wwwroot/App_data/RvLocalFiles* folder  
4. **Add a new *CloudToLocalDatasourceProvider* class** in the project.  
5. **Copy the implementation code** from the relevant snippet in **Code** section below.
6. **Set the *DataSourceProvider* property** of the *RevealSdkContext* class to *CloudToLocalDatasourceProvider*:  

``` csharp
  public override IRVDataSourceProvider DataSourceProvider => new CloudToLocalDatasourceProvider();        
```

### Code
CloudToLocalDatasourceProvider for WPF:
``` csharp
    public class CloudToLocalDatasourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDashboardFilterDataSourceItemAsync(RVDashboardFilter filter, RVDataSourceItem dataSourceItem)
        {
            return ProcessDataSourceItem(dataSourceItem);
        }
        public Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync(RVVisualization visualization, RVDataSourceItem dataSourceItem)
        {
            return ProcessDataSourceItem(dataSourceItem);
        }
        protected Task<RVDataSourceItem> ProcessDataSourceItem(RVDataSourceItem dataSourceItem)
        {
            // Check if the data source item is excel or csv file. Return the original data source item unchanged if it is not.
            if (dataSourceItem is RVExcelDataSourceItem == false &&
                dataSourceItem is RVCsvDataSourceItem == false)
            {
                return Task.FromResult(dataSourceItem);
            }

            var resourceBased = dataSourceItem as RVResourceBasedDataSourceItem;
            var resourceItem = resourceBased?.ResourceItem as RVDataSourceItem;
            var title = resourceItem?.Title;

            if (string.IsNullOrEmpty(title))
            {
                return Task.FromResult(dataSourceItem);
            }

            var localItem = new RVLocalFileDataSourceItem();
            // add comment what the local folder can be
            localItem.Uri = @"local:/" + title;
            // add comment about the title
            localItem.Title = title;
            resourceBased.ResourceItem = localItem;

            return Task.FromResult(dataSourceItem);
        }

    }
```

CloudToLocalDatasourceProvider for WEB(.Net server side):
``` csharp
    public class CloudToLocalDatasourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDashboardFilterDataSourceItemAsync(string userId, string dashboardId, RVDashboardFilter filter, RVDataSourceItem dataSourceItem)
        {
            return ProcessDataSourceItem(dataSourceItem);
        }

        public Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync(string userId, string dashboardId, RVVisualization visualization, RVDataSourceItem dataSourceItem)
        {
            return ProcessDataSourceItem(dataSourceItem);
        }

        protected Task<RVDataSourceItem> ProcessDataSourceItem(RVDataSourceItem dataSourceItem)
        {
            // Check if the data source item is excel or csv file. Return the original data source item if not.
            if (dataSourceItem is RVExcelDataSourceItem == false &&
                dataSourceItem is RVCsvDataSourceItem == false)
            {
                return Task.FromResult(dataSourceItem);
            }

            var resourceBased = dataSourceItem as RVResourceBasedDataSourceItem;
            var resourceItem = resourceBased?.ResourceItem as RVDataSourceItem;
            var title = resourceItem?.Title;

            if (string.IsNullOrEmpty(title))
            {
                return Task.FromResult(dataSourceItem);
            }

            var localItem = new RVLocalFileDataSourceItem();
            localItem.Uri = @"local:/" + title;
            localItem.Title = title;
            resourceBased.ResourceItem = localItem;

            return Task.FromResult(dataSourceItem);
        }
    }
```  

  > [!NOTE] The *CloudToLocalDatasourceProvider* replaces automatically only Excel and CSV files. Files need to be the same as used for creating the dashboard. Calls to any other file types or datasources will remain unchanged. Optionally you may change the content of the excel and csv datasource files, but the file **schema** has to remain the **same**.  In case you use MSSQL database for some visualization, the credentials need to be configured???