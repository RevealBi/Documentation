# Release Notes

## 1.2.0 (Aug-2022)
### New Features
- _Reduced the size of the main Javascript file_
  The main Javascript file was optimized and reduced in size by 30%.

- _Added support for custom menu items._
This snippet shows the creation of a custom "My Menu Item":
```javascript
revealView.onMenuOpening = function(visualization, args) {
	if (args.isInEditMode && visualization == null) { //dashboard edit mode
		args.menuItems.push(new RevealApi.RVMenuItem(
			"My Menu Item",
			new RevealApi.RVImage("/images/save-24.png", "My Save"),
			function() {
				alert('my action');
			}
		));
	}
};
```

- _Added support for custom empty state image for dashboards._
Added the possibility of changing the placeholder images present at new dashboard creation.	
```javascript
revealView.assets.dashboardEmptyState = new RevealApi.RVImageAsset(
    new RevealApi.RVImage("/images/dashboard_empty.png", "Empty Dashboard State Image"), 
    "Add your First Visualization", 
    "Visualize all your data in perfect harmony");	
```

- _Added a way to change the default visualization._
In this snippet we change the Default Visualization to Pivot Grid:
```javascript
revealView.defaultChartType = RevealApi.RVChartType.PivotGrid;	
```

- _Add schema attribute to SQL Server data sources._
The schema property on the data source allows SDK users to restrict the displayed list tables/views/procedures to the provided schema.
```javascript
var msSqlAdventureDS = new RevealApi.RVSqlServerDataSource();
msSqlAdventureDS.host = "server.domain";
msSqlAdventureDS.host = "msSqlAdventureId";
msSqlAdventureDS.database = "AdventureWorks";
msSqlAdventureDS.port = 1433;
msSqlAdventureDS.title = "SQLServer Adventure DS";
msSqlAdventureDS.schema = "HumanResources";
```

- _Added a way to change the category grouping separator used in legends for a chart visualization._
In the following snippet we change the separator from the default separator (slash) to hyphen.
```javascript
revealView.categoryGroupingSeparator = "-";
```

- _Added support for TrustServerCertificate setting for SQL Server data sources._
Two new boolean properties were added to implement this feature to RVSqlServerDataSource:
	- Encrypt
	- TrustServerCertificate

Both are used to set flags with the same exact name in the connection string.		
```javascript
var msSqlAdventureDS = new RevealApi.RVSqlServerDataSource();
msSqlAdventureDS.host = "server.domain";
msSqlAdventureDS.id = "msSqlAdventureId";
msSqlAdventureDS.database = "AdventureWorks";
msSqlAdventureDS.port = 1433;
msSqlAdventureDS.title = "SQLServer Adventure DS";
msSqlAdventureDS.schema = "HumanResources";
msSqlAdventureDS.encrypt = true;
msSqlAdventureDS.trustServerCertificate = true;
```


### Bug Fixes
- Fixed ApplyTimeZone error when joining Data sources in Postgres/Redshift.
- Fixed Dashboard filters not refreshing when dashboard is refreshed.
- Fixed number formatting in link name in tooltips.
- Fixed Fiscal Year not working in Postgres/Redshift.
- Fixed currentTimeZone caching issues.
- Fixed Google Sheets not visible in Google Drive popup.
All eligible datasources (spreadsheets, excel, csv and json) are displayed within the connector correctly.			
- Fixed Time Series not setting min value properly for negative values.
The minimum and maximum values of the y-axis in the time series charts adjust themselves automatically.		
