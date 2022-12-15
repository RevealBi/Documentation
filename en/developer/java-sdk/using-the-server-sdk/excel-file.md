# Replacing an Excel File DataSource

Sometimes dashboards are created using Excel files stored in the cloud as a data source for its visualizations.

When embedding the Reveal SDK in your application, you can replace these cloud-based files with files stored in a local directory located on the server at runtime.

**Step 1** - In the Java Web API server application, create a class that implements `IRVDataSourceProvider`. This class will perform the actual replacement of the Excel files.

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

The `changeDataSourceItem` method of this class returns the `RVDataSourceItem` that the visualization will use to get its data. By modifying the `RVDataSourceItem` item that is provided as an argument in the `changeDataSourceItem` method, you can change which Excel file get your data from.

**Step 2** - Update the `contextInitialized` function in the `WebAppListener.java` file to add the `IRVDataSourceProvider` you just created to the `RevealEngineInitializer` using the `setDataSourceProvider(new LocalSampleDataSourceProvider()).` method. You should also specify a Local Sorage Data Path within `RevealEngineInitializer` to specify the root directory to be used for URI's like "local:/SalesLocalExcelFile.xlsx" which is actually a relative location, with `setLocalFilesStoragePath("your_root_directory")`.

```java
	public void contextInitialized(ServletContextEvent ctx) {
		RevealEngineInitializer.initialize(new InitializeParameterBuilder().
				setDataSourceProvider(new LocalSampleDataSourceProvider()).
				.build());

		ctx.getServletContext().setAttribute("revealSdkVersion", RevealEngineInitializer.getRevealSdkVersion());
	}
```

## Example: Replacing an Excel File Data Source

In this example, we are replacing a data source item that is using a cloud-based Excel file named "Sales Cloud Excel File" with a local Excel file named "SalesLocalExcelFile.xlsx".

First, we check the incoming `RVDataSourceItem` to see if it is a `RVExcelDataSourceItem`. If it is, then we get the existing `RVDataSourceItem.ResourceItem` and check its `Title` property. If the title is "Sales Cloud Excel File" then we will create a new `RVLocalFileDataSourceItem` and set the `Uri` to the location of the new local Excel file. After we set the title of the local Excel file data source item, we replace the `RVExcelDataSourceItem.ResourceItem` with our newly created `RVLocalFileDataSourceItem`.

```java
public class LocalSampleDataSourceProvider implements IRVDataSourceProvider {

	public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {

		return null;
	}

	public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardsID, RVDataSourceItem dataSourceItem) {

		if (dataSourceItem instanceof RVExcelDataSourceItem)
		{
			RVExcelDataSourceItem excelDataSourceItem = (RVExcelDataSourceItem)dataSourceItem;
			RVDataSourceItem resourceItem = (RVDataSourceItem)excelDataSourceItem.getResourceItem();

			if (resourceItem.getTitle() == "Sales Cloud Excel File")
			{
				RVLocalFileDataSourceItem localItem = new RVLocalFileDataSourceItem();
				localItem.setUri("local:/SalesLocalExcelFile.xlsx");
				localItem.setTitle(resourceItem.getTitle());
				excelDataSourceItem.setResourceItem(localItem);
				
				return (RVDataSourceItem)excelDataSourceItem;
			}
		}
		return null;
	}
}
```
