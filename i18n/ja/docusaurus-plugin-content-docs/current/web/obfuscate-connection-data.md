# 接続データの難読化

接続データの難読化は、DB 名やホストなど、機密と見なされる可能性のある、サーバーと交換される情報をマスクするために使用されます。DataSource または DataSourceItems の情報のエンコードは、オブジェクトをクライアントに返す前にサーバー側で行われます。DataSource および DataSourceItems 情報は通常、ダッシュボードの編集時にサーバーからクライアントに送信されます。IRVObjectEncoder の実装に加えて、IRVDataSourceProvider の実装を使用してデコードを行う必要があります。データベースおよび REST プロバイダーでのみサポートされます。


# MS SQL Server データ ソースの難読化

**手順 1** - ASP.NET Web API サーバー アプリケーションで、`IRVObjectEncoder` を実装するクラスを作成します。 
このクラスは、MS SQL Server 情報をエンコードされた値で実際に置換します。

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

このクラスの `Encode` メソッドは、表示形式がデータを取得するために使用する `RVDataSourceItem` を返します。
`Encode` メソッドで引数として提供される `RVDataSourceItem` 項目を変更することにより、Datasource/DatasourceItem の機密情報を変更できます。

**手順 2** - `Program.cs` ファイルの `AddReveal` メソッドを更新して、`RevealSetupBuilder.AddDataSourceProvider` メソッドを使用して作成した `IRVObjectEncoder` を `RevealSetupBuilder` に追加します。

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

**手順 3** - ASP.NET Web API サーバー アプリケーションで、`IRVDataSourceProvider` を実装するクラスを作成します。このクラスは、データベース/REST 設定の実際の置換を実行します。このクラスの `ChangeDataSourceItemAsync` メソッドは、可視化がデータを取得するために使用する `RVDataSourceItem` を返します。`ChangeDataSourceItemAsync` メソッドで引数として提供される `RVDataSourceItem` 項目を変更することにより、データを取得するサーバーまたはテーブルを変更できます。各 `RVDataSource` を `RVSqlServerDataSource` としてキャストし、すべての `RVDataSourceItem` を `RVSqlServerDataSourceItem` としてキャストし、そのプロパティを次のように変更することにより、ダッシュボード内のすべての MS SQL Server データ ソース項目の MS SQL Server ホスト、データベース、ID、およびテーブル名を変更できます。

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


**手順 4** - `Program.cs` ファイルの `AddReveal` メソッドを更新して、`RevealSetupBuilder.AddDataSourceProvider` メソッドを使用して作成した `IRVDataSourceProvider` を `RevealSetupBuilder` に追加します。

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


