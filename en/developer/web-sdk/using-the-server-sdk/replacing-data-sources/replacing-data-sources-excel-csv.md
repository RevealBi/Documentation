## Replacing Excel and CSV file DataSources

### Overview

When we create a dashboard in **Reveal Application** we often use Excel or CSV files stored in the cloud to populate it with data.   
After exporting the dashboard and embedding it in custom application, we can move these files in a local directory and then use the **Reveal SDK** to access and set them as a local datasource. 
  > [!NOTE] The *CloudToLocalDatasourceProvider* replaces automatically only Excel and CSV files. They need to be the same as the files used for creating the dashboard. You may change the content of the Excel and CSV datasource files, but the file **schema** has to be the **same**. Calls to any other file types or datasources will remain unchanged.

### Steps
To populate the exported dashboard using local Excel and CSV files, you need to follow these steps:
1. **Export the dashboard** file as explained in [**Getting Dashboards for the SDK**](~/en/developer/general/get-dashboards.md) 
2. **Load the dashboard** in your application as described in 
[**Creating Your First App**](~/en/developer/web-sdk/create-first-app.md)
3. **Download the files** you used to create the dashboard from your cloud storage and copy them to a local folder.  
4. **Set the local folder name** as a value of the *LocalStoragePath*. Details about this you can find here: [**Setup and Configuration(Server) - Initializing the Server SDK**](~/en/developer/web-sdk/setup-configuration.md#3-initializing-the-server-sdk)  
5. **Add a new *CloudToLocalDatasourceProvider* class** in the project.  
6. **Copy the implementation code** from the relevant snippet in **Code** section below.
7. **Set the *DataSourceProvider* property** of the *RevealSdkContext* class to *CloudToLocalDatasourceProvider*:  

``` csharp
  public override IRVDataSourceProvider DataSourceProvider => new CloudToLocalDatasourceProvider();        
```

### Code

``` csharp
    public class CloudToLocalDatasourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDashboardFilterDataSourceItemAsync(string userId, string dashboardId, 
                        RVDashboardFilter filter, RVDataSourceItem dataSourceItem)
        {
            return ProcessDataSourceItem(dataSourceItem);
        }

        public Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync(string userId, string dashboardId, 
                        RVVisualization visualization, RVDataSourceItem dataSourceItem)
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
            // The SDK replaces the "local:/" string with the local folder name you have set as LocalStoragePath
            localItem.Uri = @"local:/" + title;
            // The Title will be displayed as a datasource name in "Dashboard Edit" mode.
            localItem.Title = title;
            resourceBased.ResourceItem = localItem;

            return Task.FromResult(dataSourceItem);
        }
    }
```  

