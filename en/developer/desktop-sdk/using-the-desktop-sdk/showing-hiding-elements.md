## Showing/Hiding User Interface Elements

The __RevealView__ component can be used to enable or disable different features and/or UI elements towards the end user. Many of the available properties are of the Boolean type and can be very straightforward to use, but others not so much.

The *revealView* instance created below is assumed by all the code snippets in this topic:

``` csharp
var revealView = new RevealView();
```

All the properties are read by __RevealView__ during initialization time and based on their values Reveal either shows or hides the different features/UI elements from the user.

### CanEdit
This property can be used to disable the user's ability to edit dashboards.

<img src="../../general/images/showing_hiding_elements_edit.png" alt="Editing a dashboard through the UI" width="60%"/>

``` csharp
revealView.CanEdit = false;
```

### ShowEditDataSource
This property can be used to disable the editing of a dashboard datasource.

<img src="../../general/images/showing-hiding-elements-edit-datasource.png" alt="Editing a dashboard datasource through the UI" width="60%"/>

``` csharp
revealView.ShowEditDataSource = false;
```

### ShowExportImage
This property can be used to disable exporting the dashboad to an image.

<img src="../../general/images/showing-hiding-elements-show-export-image.png" alt="Exporting a dashboard to Image" width="60%"/>

``` csharp
revealView.ShowExportImage = false;
```

### ShowExportToPowerpoint
This property can be used to disable exporting the dashboad to PowerPoint.

<img src="../../general/images/showing-hiding-elements-show-export-powerpoint.png" alt="Exporting a dashboard to PowerPoint" width="60%"/>

``` csharp
revealView.ShowExportToPowerpoint = false;
```

### ShowExportToPDF
This property can be used to disable exporting the dashboad to PDF.

<img src="../../general/images/showing-hiding-elements-show-export-pdf.png" alt="Exporting a dashboard to PDF" width="60%"/>

``` csharp
revealView.ShowExportToPDF = false;
```

### ShowExportToExcel
This property can be used to disable exporting the dashboad to Excel.

<img src="../../general/images/showing-hiding-elements-show-export-excel.png" alt="Exporting a dashboard to Excel" width="60%"/>

``` csharp
revealView.ShowExportToExcel = false;
```

### CanCopyVisualization
This property can be used to disable the ability to copy a visualization and later paste it in the current dashboard or a different one.

<img src="../../general/images/showing_hiding_elements_copy.png" alt="Copying an existing visualization through the UI" width="60%"/>

``` csharp
revealView.CanCopyVisualization = false;
```

### CanDuplicateVisualization
This property can be used to disable the ability to duplicate a visualization in the current dashboard.

<img src="../../general/images/showing_hiding_elements_duplicate.png" alt="Duplicating an existing visualization through the UI" width="60%"/>

``` csharp
revealView.CanDuplicateVisualization = false;
```

### CanAddPostCalculatedFields
This property can be used to disable the ability to add a new post-calculated field in the current dashboard.

<img src="../../general/images/showing_hiding_elements_post_calculated.png" alt="Accessing post-calculated fields through the UI" width="60%"/>

Post-calculated fields are new fields in the data set and are created by applying a formula on already summarized values.  
For further details, please refer to the [Reveal Help](https://help.revealbi.io/en/data-visualizations/fields/calculated-fields/overview.html).

``` csharp
revealView.CanAddPostCalculatedFields = false;
```

### CanAddCalculatedFields
This property can be used to disable the ability to add a new pre-calculated field in the current dashboard.

<img src="../../general/images/showing_hiding_elements_pre_calculated.png" alt="Accessing pre-calculated fields through the UI" width="60%"/>

Pre-calculated fields are new fields in the data set and are evaluated before executing data editor aggregations.  
For further details, please refer to the [Reveal Help](https://help.revealbi.io/en/data-visualizations/fields/calculated-fields/overview.html).

``` csharp
revealView.CanAddCalculatedFields = false;
```

### ShowFilters
This property can be used to show or hide the Dashboard Filters UI to the user.

<img src="../../general/images/showing_hiding_elements_filters.png" alt="Showing Dashboard Filters in the UI" width="60%"/>

Dashboard filters allow you to slice the contents of the visualizations in a dashboard, all at once.

``` csharp
revealView.ShowFilters = false;
```

### CanAddDashboardFilter
This property can be used to show or hide the Add Dashboard Filter menu item.

<img src="../../general/images/showing-hiding-elements-can-add-dashboard-filter.png" alt="Showing Add Dashboard Filter in the UI" width="60%"/>

``` csharp
revealView.CanAddDashboardFilter = false;
```

### CanAddDateFilter
This property can be used to show or hide the Add Date Filter menu item.

<img src="../../general/images/showing-hiding-elements-can-add-date-filter.png" alt="Showing Add Date Filter in the UI" width="60%"/>

``` csharp
revealView.CanAddDateFilter = false;
```

### Preselected Filters
You can specify which values are initially selected among existing Dashboard Filters when loading a dashboard.

<img src="../../general/images/showing_hiding_elements_filters_preselected.png" alt="Showing a Dashboard Filter preselected in the UI" width="60%"/>

The following code snippet shows how to load a dashboard and set the “Territory” selected value to be “Americas”, thus the dashboard will be showing data filtered by “Americas”

``` csharp
var dashboard = new RVDashboard(path);
dashboard.filters.GetByTitle("Territory").selectedValues = new List<object>() { "Americas" };
revealView.Dashboard = dashboard;
```


### AvailableChartTypes
This property can be used to filter the visualization types available to the user.

<img src="../../general/images/showing_hiding_elements_charts.png" alt="Switching visualizations through the UI" width="60%"/>

You can, for example, add or remove visualizations as shown below:

``` csharp
revealView.AvailableChartTypes.Add(RVChartType.BulletGraph);
revealView.AvailableChartTypes.Remove(RVChartType.Choropleth);
```

In addition, you can create a brand new List that includes only the visualizations you want to be available:

``` csharp
revealView.AvailableChartTypes = new List<RVChartType>() { RVChartType.BulletGraph, RVChartType.Choropleth };
```
