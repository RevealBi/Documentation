# Release Notes

## 1.2.0 (Aug-2022)
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
- Added support for custom empty state image for dashboards.
Added the possibility of changing the placeholder images present at new dashboard creation.	
<code><pre>
revealView.assets.dashboardEmptyState = new RevealApi.RVImageAsset(
    new RevealApi.RVImage("/images/dashboard_empty.png", "Empty Dashboard State Image"), 
    "Add your First Visualization", 
    "Visualize all your data in perfect harmony");	
</pre></code>	

- Added a way to change the default visualization.
In this snippet we change the Default Visualization to Pivot Grid:
<code><pre>
revealView.defaultChartType = RevealApi.RVChartType.PivotGrid;	
</pre></code>			

- Add schema attribute to SQL Server data sources.
The schema property on the data source allows SDK users to restrict the displayed list tables/views/procedures to the provided schema.
<code><pre>
var msSqlAdventureDS = new RevealApi.RVSqlServerDataSource();
msSqlAdventureDS.host = "server.domain";
msSqlAdventureDS.host = "msSqlAdventureId";
msSqlAdventureDS.database = "AdventureWorks";
msSqlAdventureDS.port = 1433;
msSqlAdventureDS.title = "SQLServer Adventure DS";
msSqlAdventureDS.schema = "HumanResources";
</pre></code>	
- Added a way to change the category grouping separator used in legends for a chart visualization.
In the following snippet we change the separator from the default slash "/" to hyphen "-".
<code><pre>revealView.categoryGroupingSeparator = "-";
</pre></code> 		
- Added support for TrustServerCertificate setting for SQL Server data sources.
Two new boolean properties were added to implement this feature to RVSqlServerDataSource:
	- Encrypt
	- TrustServerCertificate
Both are used to set flags with the same exact name in the connection string.		
<code><pre>
	revealView.onDataSourcesRequested = function (callback) {
	   var msSqlAdventureDS = new RevealApi.RVSqlServerDataSource();
                msSqlAdventureDS.host = "server.domain";
		msSqlAdventureDS.id = "msSqlAdventureId";
		msSqlAdventureDS.database = "AdventureWorks";
		msSqlAdventureDS.port = 1433;
		msSqlAdventureDS.title = "SQLServer Adventure DS";
		msSqlAdventureDS.schema = "HumanResources";
                msSqlAdventureDS.encrypt = true;
                msSqlAdventureDS.trustServerCertificate = true;
       callback(new RevealApi.RevealDataSources([msSqlAdventureDS],null, true));
</pre></code>	
- [Public Bug Fix] Fixed ApplyTimeZone error when joining Data sources in Postgres/Redshift.
- [Public Bug Fix] Fixed Dashboard filters not refreshing when dashboard is refreshed.
- [Public Bug Fix] Fixed number formatting in link name in tooltips.
- [Public Bug Fix] Fixed Fiscal Year not working in Postgres/Redshift.
- [Public Bug Fix] Fixed currentTimeZone caching issues.
- [Public Bug Fix] Fixed Google Sheets not visible in Google Drive popup.
All eligible datasources (spreadsheets, excel, csv and json) are displayed within the connector correctly.			
- [Public Bug Fix] Fixed Time Series not setting min value properly for negative values.
The minimum and maximum values of the y-axis in the time series charts adjust themselves automatically.		
