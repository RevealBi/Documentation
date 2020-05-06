## Setting up Dynamic Filter Selections

### Overview

Sometimes your application will integrate a custom UI, to present the
user with a list of values to select. And you might want that user
selection to be synchronized with a filter in the dashboard.

For example, you can have a Sales dashboard that changes figures based
on the current Territory and a custom UI to select the Territory. After
the user selection changes, you’d want the Sales dashboard to reflect
that change. Most of the times, you would hide the filter selection
normally displayed in the dashboard. This way the user won’t be confused
with two different ways to change the Territory in the screen.

![Displaying filter selections](images/territory_filter_selections.png)

In the following code snippet, you’ll find details about how to achieve
the described scenario:

``` csharp
private void Americas_Click(object sender, RoutedEventArgs e)
{
    revealView.SetFilterSelectedValues(
        revealView.Dashboard.GetFilterByTitle("Territory"),
        new List<object>() { "Americas" });
}
private void APAC_Click(object sender, RoutedEventArgs e)
{
    revealView.SetFilterSelectedValues(
        revealView.Dashboard.GetFilterByTitle("Territory"),
        new List<object>() { "APAC" });
}
```

As shown above, two buttons were added to change the Territory selected
between Americas and APAC. The code includes only the click handlers.

You can do the same when the selection is changed on your selector, just
setting the new territory name using
__SetFilterSelectedValues__.

### Working with Dynamic Lists

Territories like Americas, APAC, India, etc. do not change over time,
but other lists of values might change. In this case, if a new Territory
is added to the list, a new button will not be automatically added.

You can use
__RevealUtility.GetFilterValues__
to get the list of values for a given filter. In this case the following
call will leave an array with
__RVFilterValue__ objects in
the *territories* variable, then loading the list of items in a ComboBox
with all territories:

``` csharp
using (var stream = File.OpenRead(@"..\..\Sales.rdash"))
{
    var dashboard = await RevealUtility.LoadDashboard(stream);
    var settings = new RevealSettings(dashboard);

    revealView.Settings = settings;

    var filterValues = await RevealUtility.GetFilterValues(
        dashboard,
        dashboard.GetFilterByTitle("Territory"));
    var territories = filterValues.ToList();

    foreach (var t in territories)
    {
        cmbTerritories.Items.Add(t);
    }
    cmbTerritories.SelectionChanged += CmbTerritories_SelectionChanged;

}
```

You can then use the *label* attribute from
__RVFilterValue__ to display
the name of the territory and the *Value* attribute to set the selection
in the filter.

The following code snippet shows how to handle the *selection changed*
event for the ComboBox to update the filter in the dashboard:

``` csharp
private void CmbTerritories_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    var selectedItems = new List<object>();
    var filterValue = cmbTerritories.SelectedItem as RVFilterValue;
    if (filterValue != null)
    {
        selectedItems.Add(filterValue.Value);
    }
    revealView.SetFilterSelectedValues(
         revealView.Dashboard.GetFilterByTitle("Territory"),
         selectedItems);
}
```

### Working with Date Filters

Date filters are a special kind of filter as they have no data
associated. There’s not a list of values to select from, instead you
actually select a time interval (from date A to date B). You can select
from a list of predefined filters like “Year To Date”, “Previous Month”,
etc., or specify your own range (from 2019-Jan-12 to 2019-Jan-30).

#### Working with Predefined Filters

To set one of the predefined filters you can use a similar code to the
following:

``` csharp
revealView.SetDateFilter(new RVDateDashboardFilter(RVDateFilterType.YearToDate));
```

If you want a list of all predefined date filters, please refer to
__RVDateFilterType__ in
the API Reference.

#### Working with a Custom Range

To set a custom range, for example for the last 15 days, you can use a
code similar to the following:

``` csharp
revealView.SetDateFilter(
    new RVDateDashboardFilter(
        RVDateFilterType.CustomRange,
        new RVDateRange(DateTime.UtcNow.AddDays(-15), DateTime.UtcNow)
));
```

There is a working example in the **Sales.xaml.cs** view, in the
*UpMedia* WPF application distributed with the SDK. That sample view
contains two custom filtering components: a date range selector and the
territories displayed as a list of toggle buttons.
