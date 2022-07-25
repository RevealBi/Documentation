# Data Sources

The Reveal SDK supports over 30 data sources, including analytics tools, content managers, cloud services, CRMs, databases, spreadsheets, and public data sources, with more shipping every month.  Data sources define where the data comes from in a dashboard, with each data source having unique properties, like connection strings, user id, password, and more that you set in code to connect to and retrieve data.

The Reveal SDK has two concepts regarding data sources.
1. A data source - this is the primary source of the data. For example, SQL Server could be a data source
2. A data source item - this is the specific item that is available from a data source. For example; a specific Table from SQL Server.

Data Sources (Data Stores) and Data Source Items (Data Items) are categorized separately in the Reveal View **Select Data Source** dialog.

![](adding-data-sources/images/ms-sql-server-data-source-item.jpg)

To add a data source or data source item using the Reveal SDK, add an event handler to the `RevealView.onDataSourcesRequested` event. In the event handler, you will write code to create instances of various types of data sources, or data source items, that will be used in the dashboard. You then pass those instances to the event `callback` to make them available.

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

- Data Sources are provided as an array in the first parameter in the callback
- Data Source Items are provided as an array in the second parameter in the callback
- The third parameter will control the visiility of the data sources and data source tems in the **Select Data Source** dialog.

## Supported Data Sources

The following data sources are supported in the Reveal SDK:

- Amazon Athena
- Amazon Redshift
- Box
- CSV (Comma Separated Values)
- Dropbox
- [Excel / Microsoft Excel](adding-data-sources/excel-file.md)
- Google Analytics
- Google BigQuery
- Google Drive
- Google Sheets
- Hubspot
- [In-Memory Data](adding-data-sources/in-memory-data.md)
- Marketo
- Microsoft Analysis Services
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
- Spreadsheets (XLSX, XLS)
- SharePoint
- Sybase
- TSV  (Tab Separated Values)