# Filtering Dashboards

Filters are located along the top of a Dashboard and can be modified using the Reveal SDK.

![](images/filtering-filter-location.jpg)

There are two kinds of filters:
- The Date Filter
- Dashboard Filters

## Date Filter
The **Date Filter** is a special kind of filter as it does not have any data associated with it. There’s not a list of values to select from, instead you select a date interval or range. You can choose from a list of predefined date intervals such as "Today", “All Time”, “Previous Month”, or specify your own custom range (from Jan 12, 2019 to Jan 12, 2021).

The **Date Filter** is always the first filter and there can be only **one** Date Filter.

![](images/filtering-date-filter.jpg)

### Using a Date Interval
To set the dashboard's **Date Filter** using a predefined set of date intervals, you must set the `Dashboard.dateFilter` property to a new instance of a `RVDateDashboardFilter` object and use the appropriate `RVDateFilterType` value as a parameter.

For example; this code snippet will set the dashboard's date filter to **YearToDate**:
```javascript
revealView.dashboard.dateFilter = new $.ig.RVDateDashboardFilter($.ig.RVDateFilterType.YearToDate);
```
Here you can see the dashboard UI updated it's Date Filter to **Year To Date**

![](images/filtering-date-filter-yeartodate.jpg)

The `RVDateFilterType` has the following values:
- AllTime
- CustomRange
- LastMonth
- LastWeek
- LastYear
- MonthToDate
- NextMonth
- NextQuarter
- NextYear
- PreviousMonth
- PreviousQuarter
- PreviousYear
- QuarterToDate
- ThisMonth
- ThisQuarter
- ThisYear
- Today
- TrailingTwelveMonths
- YearToDate
- Yesterday
  
### Using a Custom Date Range
To set a custom date range, you must set the `Dashboard.dateFilter` property to a new instance of a `RVDateDashboardFilter` object, and use the `RVDateFilterType.CustomRange` value as a parameter and provide a `RVDateRange` (which provides the fromDate and toDate arguments) as the second parameter.

In this example, we set the `DateFilter` to a custom date range spanning the last 75 days:
```javascript
var fromDate = new Date();
fromDate.setDate(fromDate.getDate() - 75);
var toDate = new Date();  
var dateRange = new $.ig.RVDateRange(fromDate, toDate);

revealView.dashboard.dateFilter = new $.ig.RVDateDashboardFilter($.ig.RVDateFilterType.CustomRange, dateRange); 
```

Here you can see the dashboard UI updated it's Date Filter to display the date range

![](images/filtering-date-filter-daterange.jpg)

> [!NOTE]
> You can find a sample demonstrating Date Filters on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/master/FilteringDashboards-Dates).

## Dashboard Filters

**Dashboard Filters** are displayed after the Date Filter, if a Date Filter is defined, and you can have multiple dashboard filters defined for a single dashboard. In this image, there are three dashboard filters defined (Territory, Employee, Product).

![](images/filtering-dashboard-filters.jpg)

When working with dashboard filters, the main object you need to be aware of is the `RVDashboardFilter` object. The `RVDashboardFilter` object represents an individual filter that has been defined for a dashboard. It contains information about the filter such as the filter's title, available values to choose from, as well as what values are currently selected.

The `RVDashboardFilter` object has the following properties and methods:
- **id** - a unique ID of the filter, usually a GUID
- **title (1)** - the name of the filter. It is also used as the header of the filter in the dashboard filters UI
- **selectedValues (3)** - a collection of values that have been selected for the filter. They are represented in the UI by checkboxes within the filter dropdown
- **getFilterValues() (2)** - returns a collection of all filter values that are available for the filter. These act as options in a drop down list to choose which filter values to apply/select

![](images/filtering-filter-legend.jpg)

### Get All Filters

Dashboard filters can be accessed by using the `RVDashboard.filters` property. The `RVDashboard.filters` property will return all filters that have been defined for the dashboard.
```javascript
var allDashboardFilters = revealView.dashboard.filters;
```

The `RVDashboard.filters` property returns a read-only collection of `RVDashboardFilter` objects.

### Get a Specific Filter
The Reveal SDK provides an API to get a specific dashboard filter without having to loop through the `RVDashboard.filters` property. Instead, you can use either the `RVDashboard.filters.getById` or the `RVDashboard.filters.getByTitle` method.

##### Get by Id

```javascript
var territoryFilter = revealView.dashboard.filters.getById("ddf3fa65-6893-4d8b-73ad-0b28fc1af330");
```

##### Get by Title

```javascript
var territoryFilter = revealView.dashboard.filters.getByTitle("Territory");
```

These methods will return a `RVDashboardFilter` object which represents a specific dashboard filter.

### Get Available Filter Values

 To get a collection of all available filter values for a dashboard filter, use the `RVDashboardFilter.getFilterValues()` method.
```javascript
var territoryFilter = revealView.dashboard.filters.getByTitle("Territory");
territoryFilter.GetFilterValues( filterValues => {
    //handle filterValues
});
```
The `RVDashboardFilter.getFilterValues()` method will return a collection of `RVFilter` objects.

The `RVFilter` object has the following properties:
- **label** - the text that is displayed in the filter dropdown UI.
- **value** - the underlying value of the  `RVFilter` object.

### Get Selected Filter Values

To get a collection of the currently selected filter values for a dashboard filter, you can use the `RVDashboardFilter.selectedValues` property.
```javascript
var territoryFilter = revealView.dashboard.filters.getByTitle("Territory");
var selectedFilterValues = territoryFilter.selectedValues;
```

### Set Selected Filter Values

You can programmatically set the selected value(s) for a dashboard filter by using the `RVDashboardFilter.selectedValues` property. Simply set the `RVDashboardFilter.selectedValues` property to a new instance of an `array`. The `array` must contain all the filter values you want to have selected within the dashboard filter.

##### Set a Single Selected Filter Value

```javascript
var territoryFilter = revealView.dashboard.filters.getByTitle("Territory");
territoryFilter.selectedValues = [ "Japan" ];
```

##### Set Multiple Selected Filters

```javascript
var territoryFilter = revealView.dashboard.filters.getByTitle("Territory");
territoryFilter.selectedValues = [ "Japan", "India" ];
```

### Clear Selected Filters

In order to clear any filter values that have been selected for a specific dashboard filter, simply set the `RVDashboardFilter.selectedValues` property to a new empty `array`.

```cs
var territoryFilter = revealView.dashboard.filters.getByTitle("Territory");
territoryFilter.selectedValues = [];
```

> [!NOTE]
> You can find a sample demonstrating Dashboard Filters on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/master/FilteringDashboards).

## Hiding Filters
When using custom filter UI's or other custom filtering interactions, you may want to hide the panel containing the filters in the `RevealView` so the end-user won't get confused filtering the dashboard. You can hide the date and dashboard filters by setting the `RevealView.showFilters` property to `false`.
```cs
revealView.showFilters = false;
```
