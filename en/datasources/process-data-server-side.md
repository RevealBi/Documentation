## Processing Data on Server

Basically, when connecting to a data source, all your data on the server is loaded and downloaded locally.  In this way, you have your data set, ready to be directly processed in Reveal - sorted, filtered, aggregated, and used for visualizations. 

For some data sources, with much larger data sets, sometimes involving million of records, downloading the data to work with locally isn't a feasible solution. That's why an alternative approach is available in Reveal: processing the data directly on the server. 

### Supported Data Sources

For some of the available data sources in Reveal, processing data directly on the server is the **only** approach used. These are: 

* Amazon Redshift
* Google BigQuery
* MS Azure Synapse Analytics  

Processing data on server is an option you can **enable** for the following data sources: 

* [MS SQL Server](microsoft-sql-server.md)
* [MySQL](mysql.md)
* [PostgreSQL](postgresql.md)

### How to Enable Process Data on Server?

You can enable the _Process Data on Server_ function while connecting to one of the data sources (see above) supporting it. 

If you need more information on how to do the initial configuration of the data source, select one of the three data sources in the bullet list above and read the article on how to set it up. 

After configuring the connection, you will 
