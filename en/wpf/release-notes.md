# Release Notes

## 1.2.0 (Aug-2022)
### NEW FEATURES

- _Added support for custom menu items._
This snippet shows the creation of a custom "My Menu Item":
```cs
revealView.MenuOpening += RevealView_MenuOpening;
private void RevealView_MenuOpening(RVVisualization visualization, MenuOpeningEventArgs args)
{
	if (args.IsInEditMode && visualization == null) //dashboard edit mode
	{
		args.MenuItems.Add(new RVMenuItem()
		{
			Icon = new RVImage(new BitmapImage(new Uri("pack://application:,,,/Images/save-24.png"))),
			Title = "My Menu Item",
			Action = () =>
			{
				MyCustomAction();
			}
		});
	}
}
```
- _Added support for custom empty state image for dashboards._
Added the possibility of changing the placeholder images present at new dashboard creation.	
```cs
revealView.Assets.DashboardEmptyState = new RVImageAsset()
{
  Image = new RVImage(new BitmapImage(new Uri("pack://application:,,,/Images/dashboard_empty.png"))),
  Title = "Add your First Visualization",
  Subtitle = "Visualize all your data in perfect harmony"
};	
```

- _Added a way to change the default visualization._
In this snippet we change the Default Visualization to Pivot Grid:
```cs
revealView.DefaultChartType = RVChartType.PivotGrid;
```

- _Add schema attribute to SQL Server data sources._
The schema property on the data source allows SDK users to restrict the displayed list tables/views/procedures to the provided schema.
```cs
var msSqlAdventureDS = new RVSqlServerDataSource()
{
	Id = "msSqlAdventureId",
	Title = "SQLServer Adventure DS",
	Host = "server.domain",
	Database = "AdventureWorks",
	Schema = "HumanResources",
	Port = 1433
};
datasources.Add(msSqlAdventureDS);
```
- _Added a way to change the category grouping separator used in legends for a chart visualization._
In the following snippet we change the separator from the default slash "/" to hyphen "-".
```cs
revealView.CategoryGroupingSeparator = "-";
```
- _Added support for TrustServerCertificate setting for SQL Server data sources._
Two new boolean properties were added to implement this feature to RVSqlServerDataSource:
	- Encrypt
	- TrustServerCertificate
Both are used to set flags with the same exact name in the connection string.		
```cs
var msSqlAdventureDS = new RVSqlServerDataSource()
{
	Id = "msSqlAdventureId",
	Title = "SQLServer Adventure DS",
	Host = "server.domain",
	Database = "AdventureWorks",
	Schema = "HumanResources",
	Port = 1433,
	Encrypt = true,
	TrustServerCertificate = true
};
            datasources.Add(msSqlAdventureDS);
```

### BUG FIXES
- Fixed ApplyTimeZone error when joining Data sources in Postgres/Redshift.
- Fixed Dashboard filters not refreshing when dashboard is refreshed.
- Fixed number formatting in link name in tooltips.
- Fixed Fiscal Year not working in Postgres/Redshift.
- Fixed currentTimeZone caching issues.
- Fixed Google Sheets not visible in Google Drive popup.
All eligible datasources (spreadsheets, excel, csv and json) are displayed within the connector correctly.			
- Fixed Time Series not setting min value properly for negative values.
The minimum and maximum values of the y-axis in the time series charts adjust themselves automatically.		
