# Replacing MS Sql Server Data Source

**Step 1** - In the Java Web API server application, create a class that implements `IRVDataSourceProvider`. This class will perform the actual replacement of the MS SQL Server settings. 

```java
public class LocalSampleDataSourceProvider implements IRVDataSourceProvider {

	public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

		return null;
	}

	public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

		return null;
	}
}
```

The `changeDataSourceItem` method of this class returns the `RVDataSourceItem` that the visualization will use to get its data. By modifying the `RVDataSourceItem` item that is provided as an argument in the `changeDataSourceItem` method, you can change which server or table to get your data from.

**Step 2** - Update the `contextInitialized` function in the `WebAppListener.java` file to add the `IRVDataSourceProvider` you just created to the `RevealEngineInitializer` using the `setDataSourceProvider(new LocalSampleDataSourceProvider()).` method.

```java
	public void contextInitialized(ServletContextEvent ctx) {
		RevealEngineInitializer.initialize(new InitializeParameterBuilder().
				setDataSourceProvider(new LocalSampleDataSourceProvider()).
				.build());

		ctx.getServletContext().setAttribute("revealSdkVersion", RevealEngineInitializer.getRevealSdkVersion());
	}
```

## Example: Replace Host, Database, and Table

You can change the MS SQL Server host, database, and table name of every MS SQL Server data source item in your dashboard by casting each `RVDataSourceItem` as a `RVSqlServerDataSourceItem` and modifying it's properties as follows:

```java
public class LocalSampleDataSourceProvider implements IRVDataSourceProvider {

	public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

		return null;
	}

	public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

		if (dataSourceItem instanceof RVSqlServerDataSourceItem)
		{
			RVSqlServerDataSourceItem sqlServerDsi = (RVSqlServerDataSourceItem)dataSourceItem;
			// Change SQL Server host and database
			RVSqlServerDataSource sqlServerDS = (RVSqlServerDataSource)sqlServerDsi.getDataSource();
			sqlServerDS.setHost("10.0.0.20");
			sqlServerDS.setDatabase("Adventure Works");

			// Change SQL Server table/view
			sqlServerDsi.setTable("Employees");

			return (RVDataSourceItem)sqlServerDsi;
		}
		return null;
	}
}
```
