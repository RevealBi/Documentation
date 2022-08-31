# Encode/Decode information of Database Providers

The Encode/Decode method can be used to mask information exchanged with the server, like DB name and host, which can be considered sensitive.
The encoding of information in DataSource or DataSourceItems, happens server-side before returning the objects to the client. 
DataSource and DataSourceItems information is typically sent from the server to the client when editing a dashboard. 
Alongside with the IRVObjectEncoder implementation, decoding must be done using an IRVDataSourceProvider implementation.
Only supported for Database and REST providers.


### Source 
[**IRVObjectEncoder**](https://help.revealbi.io/api/java/latest/com/infragistics/reveal/sdk/api/IRVObjectEncoder.html)


# Encoding MS Sql Server Data Source

**Step 1** - In the Java Web API server application, create a class that implements `IRVObjectEncoder`. 
This class will perform the actual replacement of the MS SQL Server information with the encoded values. 

```java
public class SampleEncoder implements IRVObjectEncoder {

	@Override
	public RVDashboardDataSource encode(IRVUserContext userContext, RVDashboardDataSource dataSource) {

		if (dataSource instanceof RVSqlServerDataSource)
		{
			RVSqlServerDataSource sqlDs = (RVSqlServerDataSource)dataSource;
			encodeDatasource(sqlDs);

			return (RVDashboardDataSource)sqlDs;

		}
		return null;
	}


	@Override
	public RVDataSourceItem encode(IRVUserContext userContext, RVDataSourceItem dataSourceItem) {

		if (dataSourceItem instanceof RVSqlServerDataSourceItem)
		{
			RVSqlServerDataSourceItem sqlDsi = (RVSqlServerDataSourceItem)dataSourceItem;
			RVSqlServerDataSource sqlDs = (RVSqlServerDataSource)dataSourceItem.getDataSource();
			encodeDatasource(sqlDs);
			encodeDataSourceItem(sqlDsi);

			return (RVDataSourceItem)sqlDsi;

		}
		return null;

	}

	private static void encodeDatasource(RVSqlServerDataSource sqlServerDS)
	{

		String host = encodeHost(sqlServerDS.getHost());
		sqlServerDS.setHost(host); 
		String db = encodeDatabase(sqlServerDS.getDatabase());
		sqlServerDS.setDatabase(db);

	}
	private static void encodeDataSourceItem(RVSqlServerDataSourceItem sqlServerDsi)
	{
		String db = encodeDatabase(sqlServerDsi.getDatabase());
		sqlServerDsi.setDatabase(db);
		String schema = encodeSchema(sqlServerDsi.getSchema());
		sqlServerDsi.setSchema(schema);
		String table = encodeTableName(sqlServerDsi.getTable());
		sqlServerDsi.setTable(table);
		sqlServerDsi.setId(db + "__" + schema + "__" + table);
	}

	private static String encodeTableName(String name)
	{
		if (name == "real_table_name_1")
		{
			name = "Table_1";
		}
		else if (name == "real_table_name_2")
		{
			name = "Table_2"; 
		} 
		// else etc.
		return name;
	}

	private static String encodeHost(String host)
	{
		if (host == "real_host_name")
		{
			host = "Host";
		}
		// else etc.
		return host;
	}
	private static String encodeDatabase(String database)
	{
		if (database == "real_database_name")
		{
			database = "Database";
		}
		// else etc.
		return database;
	}

	private static String encodeSchema(String schema)
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

The `encode` method of this class returns the `RVDataSourceItem` that the visualization will use to get its data.
By modifying the `RVDataSourceItem` item that is provided as an argument in the `encode` method, you can change sensitive information of the Datasource/DatasourceItem.

**Step 2** - Update the `contextInitialized` function in the `WebAppListener.java` file to add the `IRVObjectEncoder` you just created to the `RevealEngineInitializer` using the `setObjectEncoder(new SampleEncoder()).` method.

```java
public void contextInitialized(ServletContextEvent ctx) {
		RevealEngineInitializer.initialize(new InitializeParameterBuilder().
				setAuthProvider(new UpmediaAuthenticationProvider()).
				setUserContextProvider(new UpmediaUserContextProvider()).
				setObjectEncoder(new SampleEncoder()).
				setDashboardProvider(new UpmediaDashboardProvider()).
				setLicense("LICENSE_KEY_HERE")
			.build());
		
		ctx.getServletContext().setAttribute("revealSdkVersion", RevealEngineInitializer.getRevealSdkVersion());
	}
```

# Replacing Database/REST Data Source


In the Java Web API server application, create a class that implements `IRVDataSourceProvider`. This class will perform the actual replacement of the Database/REST settings.
The `changeDataSourceItem` method of this class returns the `RVDataSourceItem` that the visualization will use to get its data. By modifying the `RVDataSourceItem` item that is provided as an argument in the `changeDataSourceItem` method, you can change which server or table to get your data from.


## Example: Replace Host, Database,Schema, id and Table of an MS SQL Server


**Step 3** You can change the MS SQL Server host, database, schema, id and table name of every MS SQL Server data source item in your dashboard by casting each `RVDashboardDataSource` as a `RVSqlServerDataSource` and every `RVDataSourceItem` as a `RVSqlServerDataSourceItem`, modifying it's properties as follows:

```java
public class LocalSampleDataSourceProvider implements IRVDataSourceProvider {

	public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

		if (dataSource instanceof RVSqlServerDataSource)
		{
			RVSqlServerDataSource sqlDs = (RVSqlServerDataSource)dataSource;
			decodeDataSource(sqlDs);

			return (RVDashboardDataSource)dataSource;

		}
		return null;
	}

	public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

		if (dataSourceItem instanceof RVSqlServerDataSourceItem)
		{
			RVSqlServerDataSourceItem sqlServerDsi = (RVSqlServerDataSourceItem)dataSourceItem;
			RVSqlServerDataSource sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.getDataSource();
			decodeDataSource(sqlServerDS);
			decodeDataSourceItem(sqlServerDsi);

			return (RVDataSourceItem)sqlServerDsi;
		}

		return null;
	}

	private static void decodeDataSource(RVSqlServerDataSource sqlServerDS)
	{
		String host = decodeHost(sqlServerDS.getHost());
		sqlServerDS.setHost(host);
		String db = decodeDatabase(sqlServerDS.getDatabase());
		sqlServerDS.setDatabase(db);
	}

	private static void decodeDataSourceItem(RVSqlServerDataSourceItem sqlServerDsi)
	{
		String db = decodeDatabase(sqlServerDsi.getDatabase());
		sqlServerDsi.setDatabase(db);
		String schema = decodeSchema(sqlServerDsi.getSchema());
		sqlServerDsi.setSchema(schema);
		String table = decodeTableName(sqlServerDsi.getTable());
		sqlServerDsi.setTable(table);

	}

	private static String decodeTableName(String name)
	{
		if (name == "Table_1")
		{
			name = "real_table_name_1";
		}
		else if (name == "Table_2")
		{
			name = "real_table_name_2";
		} 
		// else etc.

		return name;
	}

	private static String decodeHost(String host)
	{
		if (host == "Host")
		{
			host = "real_host_name";
		}
		// else etc.
		return host;
	}

	private static String decodeSchema(String schema)
	{
		if (schema == "Schema")
		{
			schema = "real_schema";
		}
		// else etc.
		return schema;
	}

	private static String decodeDatabase(String database)
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

**Step 4** - Update the `contextInitialized` function in the `WebAppListener.java` file to add the `IRVObjectEncoder` you just created to the `RevealEngineInitializer` using the `setDataSourceProvider(new LocalSampleDataSourceProvider()).` method.

```cs
public void contextInitialized(ServletContextEvent ctx) {
		RevealEngineInitializer.initialize(new InitializeParameterBuilder().
				setAuthProvider(new UpmediaAuthenticationProvider()).
				setUserContextProvider(new UpmediaUserContextProvider()).
				setDataSourceProvider(new LocalSampleDataSourceProvider()).
				setObjectEncoder(new SampleEncoder()).
				setDashboardProvider(new UpmediaDashboardProvider()).
				setLicense("LICENSE_KEY_HERE")
			.build());
		
		ctx.getServletContext().setAttribute("revealSdkVersion", RevealEngineInitializer.getRevealSdkVersion());
	}
```


