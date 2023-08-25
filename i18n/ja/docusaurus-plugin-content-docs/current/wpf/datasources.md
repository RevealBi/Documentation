import DataSourcesTable from '@site/src/components/DataSourcesTable';

# Data Sources

The Reveal SDK supports over 30 data sources, including analytics tools, content managers, cloud services, CRMs, databases, spreadsheets, and public data sources, with more shipping every month.  Data sources define where the data comes from in a dashboard, with each data source having unique properties, like connection strings, user id, password, and more that you set in code to connect to and retrieve data.

The Reveal SDK has two concepts regarding data sources.
1. A data source - this is the primary source of the data. For example, SQL Server could be a data source
2. A data source item - this is the specific item that is available from a data source. For example; a specific Table from SQL Server.

Data Sources (Data Stores) and Data Source Items (Data Items) are categorized separately in the Reveal View **Select a Data Source** dialog.

![](adding-data-sources/images/ms-sql-server-data-source-item.jpg)

## Installing Data Sources

Before creating data sources for use in the Reveal SDK, you must install the correct package for each data source you wish to use in your Reveal SDK application.

**Step 1** - Install the package for the data source you would like to use. To learn which data sources are supported and which packages you must install, refer to the [Supported Data Sources](#supported-data-sources) section.

**Step 2** - After you have installed the data source package, register the data source with the Reveal SDK.

```cs
using Reveal.Sdk;
using Reveal.Sdk.Data;

//all data sources use the RegisterXXX naming convention
RevealSdkSettings.DataSources.RegisterMicrosoftSqlServer();
```

## Supported Data Sources

Use the table below to see which data sources are supported and which packages you must install.

<DataSourcesTable isWpf={true}></DataSourcesTable>

_**Included in SDK** - there is not a separate package to install for this data source. The data source ships with the Reveal SDK._
