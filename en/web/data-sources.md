# Data Sources

Reveal supports over 30 data sources, with more shipping every month.  Data sources define where the data comes from in a dashboard, with each data source having unique properties, like connection strings, user id, password, and more that you set in code to connect to and retrieve data.

For example, to connect to a REST data source, your code would look similar to this:

```typescript
       revealView.onDataSourcesRequested = (callback) => {
           
           const restDataSource = new $.ig.RVRESTDataSource();
           restDataSource.id = "RestDataSource"
           restDataSource.url = "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9";
           restDataSource.title = "Sales by Category";
           restDataSource.subtitle = "Excel2Json";
           restDataSource.useAnonymousAuthentication = true;

           callback(new $.ig.RevealDataSources([restDataSource], [], true));
       };
```



You can choose from analytics tools, content managers, cloud services, CRMs, databases, spreadsheets, and public data sources.

The following data sources are supported in the Reveal SDK:

- Amazon Athena
- Amazon Redshift
- Box
- CSV (Comma Separated Values)
- Dropbox
- Excel / Microsoft Excel
- Google Analytics
- Google BigQuery
- Google Drive
- Google Sheets
- Hubspot
- Marketo
- Microsoft Analysis Services
- Microsoft Azure Analysis Services
- Microsoft Azure SQL Database
- Microsoft Azure Synapse Analytics
- Microsoft Dynamics CRM
- Microsoft Reporting Services (SSRS)
- Microsoft SQL Server
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
