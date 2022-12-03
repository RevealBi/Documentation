# Obfuscate Connection Data

Obfuscating the connection data is used to mask information exchanged with the server, like DB name and host, which can be considered sensitive.
The encoding of information in DataSource or DataSourceItems, happens server-side before returning the objects to the client. 
DataSource and DataSourceItems information is typically sent from the server to the client when editing a dashboard. 
Alongside with the IRVObjectEncoder implementation, decoding must be done using an IRVDataSourceProvider implementation.
Only supported for Database and REST providers.


# Obfuscate MS Sql Server Data Source

**Step 1** - In the ASP.NET Web API server application, create a class that implements `IRVObjectEncoder`. 
This class will perform the actual replacement of the MS SQL Server information with the encoded values. 

```csharp
    internal class SampleEncoder : IRVObjectEncoder
    {
        public Task<RVDashboardDataSource> Encode(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            var sqlDs = dataSource as RVSqlServerDataSource;
            if (sqlDs != null)
            {
                sqlDs = (RVSqlServerDataSource)dataSource;
                EncodeDatasource(sqlDs);
                return Task.FromResult((RVDashboardDataSource)sqlDs);
            }
            return Task.FromResult<RVDashboardDataSource>(null);
        }

        public Task<RVDataSourceItem> Encode(IRVUserContext userContext, RVDataSourceItem dataSourceItem)
        {
            var sqlServerDsi = dataSourceItem as RVSqlServerDataSourceItem;
            if (sqlServerDsi!= null)            
            {   
                var sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.DataSource;
                EncodeDatasource(sqlServerDS);
                EncodeDataSourceItem(sqlServerDsi);
                return Task.FromResult((RVDataSourceItem)sqlServerDsi);
            }
            return Task.FromResult((RVDataSourceItem)null);
        }

        private static void EncodeDatasource(RVSqlServerDataSource sqlServerDS)
        {
            sqlServerDS.Host = EncodeHost(sqlServerDS.Host);
            sqlServerDS.Database = EncodeDatabase(sqlServerDS.Database);
            sqlServerDS.Schema = EncodeSchema(sqlServerDS.Schema);

        }

        private static void EncodeDataSourceItem(RVSqlServerDataSourceItem sqlServerDsi)
        {
            sqlServerDsi.Database = EncodeDatabase(sqlServerDsi.Database);
            sqlServerDsi.Table = EncodeTableName(sqlServerDsi.Table);
            sqlServerDsi.Schema = EncodeSchema(sqlServerDsi.Schema);
            sqlServerDsi.Id = sqlServerDsi.Database + "__" + sqlServerDsi.Schema + "__" + sqlServerDsi.Table;
        }

        private static string EncodeTableName(string name)
        {
            if (name == "real_table_name_1")
            {
                name = "Table_1";
            }
            else if (name == "real_table_name_2")
            {
                name = "Table_2"   
            } 
            // else etc.
            return name;
        }
		
        private static string EncodeHost(string host)
        {
            if (host == "real_host_name")
            {
                host = "Host";
            }
            // else etc.
            return host;
        }
	
        private static string EncodeDatabase(string database)
        {
            if (database == "real_database_name")
            {
                database = "Database";
            }
            // else etc.
            return database;
        }

        private static string EncodeSchema(string schema)
        {
            if (schema == "real_schema")
            {
                schema = "Schema";
            }
            // else etc.
            return schema;
        }
    }
```

The `Encode` method of this class returns the `RVDataSourceItem` that the visualization will use to get its data.
By modifying the `RVDataSourceItem` item that is provided as an argument in the `Encode` method, you can change sensitive information of the Datasource/DatasourceItem.

**Step 2** - Update the `AddReveal` method in the `Program.cs` file to add the `IRVObjectEncoder` you just created to the `RevealSetupBuilder` using the `RevealSetupBuilder.AddObjectEncoder` method.

```csharp
.AddReveal(builder =>
        {
            builder
            .AddObjectEncoder<SampleEncoder>()
			.AddSettings(settings =>
            {
                settings.LocalFileStoragePath = "Data";
                settings.DataCachePath = cacheFilePath;
                settings.CachePath = cacheFilePath;
            });
        });
```

**Step 3** - In the ASP.NET Web API server application, create a class that implements `IRVDataSourceProvider`. This class will perform the actual replacement of the Database/REST settings. The `ChangeDataSourceItemAsync` method of this class returns the `RVDataSourceItem` that the visualization will use to get its data. By modifying the `RVDataSourceItem` item that is provided as an argument in the `ChangeDataSourceItemAsync` method, you can change which server or table to get your data from. You can change the MS SQL Server host, database,id and table name of every MS SQL Server data source item in your dashboard by casting each `RVDataSource` as a `RVSqlServerDataSource` and every `RVDataSourceItem` as a `RVSqlServerDataSourceItem`, modifying it's properties as follows:

```csharp
    internal class LocalSamplesDataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            var sqlDs = dataSource as RVSqlServerDataSource;
            if (sqlDs != null)
            {
                sqlDs = (RVSqlServerDataSource)dataSource;
                DecodeDataSource(sqlDs);
                return Task.FromResult((RVDashboardDataSource)dataSource);
            }
            return Task.FromResult<RVDashboardDataSource>(null);
        }

        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
        {
            var sqlServerDsi = dataSourceItem as RVSqlServerDataSourceItem;
            if (sqlServerDsi != null)
            {
                var sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.DataSource;
                DecodeDataSource(sqlServerDS);
                DecodeDataSourceItem(sqlServerDsi);
                return Task.FromResult((RVDataSourceItem)sqlServerDsi);
            }
            return Task.FromResult<RVDataSourceItem>(null);
        }

        private static void DecodeDataSource(RVSqlServerDataSource sqlServerDS)
        {
            sqlServerDS.Host = DecodeHost(sqlServerDS.Host);
            sqlServerDS.Database = DecodeDatabase(sqlServerDS.Database);
            sqlServerDS.Schema = DecodeSchema(sqlServerDS.Schema);
        }

        private static void DecodeDataSourceItem(RVSqlServerDataSourceItem sqlServerDsi)
        {
            sqlServerDsi.Database = DecodeDatabase(sqlServerDsi.Database);
            sqlServerDsi.Schema = DecodeSchema(sqlServerDsi.Schema);
            sqlServerDsi.Table = DecodeTableName(sqlServerDsi.Table);
        }

        private static string DecodeTableName(string name)
        {
            if (name == "Table_1")
            {
                name = "real_table_name_1";
            }
            else if (name == "Table_2")
            {
                name = "real_table_name_2"
            } 
            // else etc.

            return name;
        }
		
        private static string DecodeHost(string host)
        {
            if (host == "Host")
            {
                host = "real_host_name";
            }
            // else etc.
            return host;
        }
		
        private static string DecodeSchema(string schema)
        {
            if (schema == "Schema")
            {
                schema = "real_schema";
            }
            // else etc.
            return schema;
        }
    
        private static string DecodeDatabase(string database)
        {
            if (database == "Database")
            {
                database = "real_database_name";
            }
            // else etc.
            return database;
        }
    }
```


**Step 4** - Update the `AddReveal` method in the `Program.cs` file to add the `IRVDataSourceProvider` you just created to the `RevealSetupBuilder` using the `RevealSetupBuilder.AddDataSourceProvider` method.

```cs
.AddReveal(builder =>
    {
        builder
        // Registers LocalSamplesDataSourceProvider, which in step 3 decodes the previously encoded values.
        .AddDataSourceProvider<LocalSamplesDataSourceProvider>()
        .AddObjectEncoder<SamplesDataSource>()
		.AddSettings(settings =>
            {
                settings.LocalFileStoragePath = "Data";
                settings.DataCachePath = cacheFilePath;
                settings.CachePath = cacheFilePath;
            });
    });
```


