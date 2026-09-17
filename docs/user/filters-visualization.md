---
title: How to Apply Visualization Quick Filters
_description: Learn how to apply quick visualization filters to dynamically filter your visualization content.
---

# Visualization Quick Filters

At a visualization level, you can also apply "quick" filters, which
allow you to dynamically filter the visualization contents as the quick
filter selection changes. These become part of the dashboard definition
and can't be modified by consumers of the dashboard.

In order to define a quick filter, select the **Add a Visualization Filter** button on top of your visualization in the Visualization
Editor:

![Visualization Quick Filter button in the Visualization Editor](images/visualization-quick-filter-example.png)

The filter options displayed in the Visualization Filters area depend on
the data type of the field. There are three different filter dialogs:
text, numeric and date fields. Once created, the quick filter will be
displayed on top of your visualization in the Visualization Editor.

![List of fields in the visualization editor](images/visualization-filter-visualization-editor.png)

When the visualization is maximized in Dashboard View mode, you will see
it under the visualization's title.

![The location of the visualization filter in dashboard view maximized](images/location-visualization-filter.png)

As with [Dashboard Filters](filters-dashboard.md), this enables a dynamic
filtering of the visualization contents as the quick filter selection
changes.

## Cascading Filters

The list of possible values displayed to select from in Quick Filters
will be filtered based on previous Quick Filter selections. Fields on
the left take precedence and determine the list of possible values on
filters to the right.

For instance, in the example below, the *Office* filter was created
first, and the *Fullname* filter was created after that one. After
selecting all Office, the *County*
list was the following:

![Cascading Filter for the State Population Dashboard showing counties in Colorado](images/cascading-filter.png)

However, if you select Office at **Cranbury, New Jersey, USA** and **Montevideo, Uruguay** instead, the list of
*County* will be a different one.

![Cascading Filter for the State Population Dashboard showing counties in Arkansas](images/cascading-filter-second-filter.png)

:::note
This is a different feature from cascading between *Dashboard Filters*, which additionally requires both filters to be built from the same underlying data item. See [Cascading Filters](filters-dashboard.md#cascading-filters) in Dashboard Filters.
:::

## Hierarchical Filters

If the field you pick for a Quick Filter comes from a multidimensional data source (such as Microsoft Analysis Services), Reveal automatically turns the filter into an expandable, drill-down tree instead of a flat list, since hierarchies for these data sources are already defined on the server side. There is no separate setting to turn this on.

:::note
This automatic behavior is shared with Dashboard Filters. See [Hierarchy](filters-dashboard-properties.md#hierarchy) in Dashboard Filters and Their Properties.
:::

