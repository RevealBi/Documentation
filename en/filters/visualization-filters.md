---
title: How to Apply Visualization Quick Filters
_description: Learn how to apply quick visualization filters to dynamically filter your visualization content.
---

# Visualization Quick Filters

At a visualization level, you can also apply "quick" filters, which
allow you to dynamically filter the visualization contents as the quick
filter selection changes. These become part of the dashboard definition
and can't be modified by consumers of the dashboard.

In order to define a quick filter, select the **Add a Visualization Filter** button on top of your visualization in the Visualizations
Editor:

<img src="images/visualization-quick-filter-example.png" alt="Visualization Quick Filter button in the Visualization Editor" class="responsive-img" width="85%"/>

The filter options displayed in the Visualization Filters area depend on
the data type of the field. There are three different filter dialogs:
text, numeric and date fields. Once created, the quick filter will be
displayed on top of your visualization in the Visualizations Editor.

<img src="images/visualization-filter-visualization-editor.png" alt="List of fields in the visualization editor" class="responsive-img" width="85%"/>

When the visualization is maximized in Dashboard View mode, you will see
it under the visualization's title.

<img src="images/location-visualization-filter.png" alt="The location of the visualization filter in dashboard view maximized" class="responsive-img" width="85%"/>

As with [Dashboard Filters](dashboard-filters.md), this enables a dynamic
filtering of the visualization contents as the quick filter selection
changes.

## Cascading Filters

The list of possible values displayed to select from in Quick Filters
will be filtered based on previous Quick Filter selections. Fields on
the left take precedence and determine the list of possible values on
filters to the right.

For instance, in the example below, the *State* filter was created
first, and the *County* filter was created after that one. After
selecting **Colorado** as a *State*, the *County*
list was the following:

<img src="images/cascading-filter.png" alt="Cascading Filter for the State Population Dashboard showing counties in Colorado" class="responsive-img" width="85%"/>

However, if you select **Arkansas** instead, the list of
*County* will be a different one.

<img src="images/cascading-filter-second-filter.png" alt="Cascading Filter for the State Population Dashboard showing counties in Arkansas" class="responsive-img" width="85%"/>

