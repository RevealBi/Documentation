---
title: How to Use Choropleth maps for Visualization
_description: Find out how to use Choropleth maps to depict statistical data in geographical areas.
---

# Choropleth Maps

Choropleth maps are widespread thematic maps meant to depict statistical data in divided geographical areas or regions. Each area on the map is filled with a uniform color in relation to a data variable.
Further in this topic, areas on the map are also called *regions* or *shapes*.

![A choropleth map showing 2016 general elections in the US](images/presidential-election-2016-map-example.png)
In Reveal, the map type displayed for the choropleth is a standard political map, i.e. the individual shapes in the map can be continents, countries, states, counties, political unions, etc.

The map supports the three different coloring schemes listed below.

  * The *Single color* scheme styles all shapes containing data with the same color. Shapes with no data are greyed out.

  * The *Range of values* scheme styles the shapes using one of seven colors, where colors progressing light to dark represent data values from low to high.

  * The *Map Color* scheme assigns a theme color to each unique identifier in the *Map Color* field. With this scheme, the shape ends up being styled based on the identifier with the highest/lowest value for that shape - see [this example](#using-the-map-color-to-create-a-multi-color-choropleth-map).

Find how to set the color of your map in the [Choropleth Map Settings](settings-choropleth-map) topic.

The choropleth map in Reveal also allows you to [drill down](#drilling-up-and-down-hierarchy-levels) through your hierarchical data.

## Using the Choropleth Map Visualization

Typically, choropleth maps are used to present in a digestible manner public reporting, statistical analysis, and any other information, for which boundaries are important. The choropleths are great for displaying densities (ratios) of quantities, making comparisons of regions, examining trends, discovering patterns and anomalies. For example, you can use the choropleth to find regions on the US map with higher obesity rates, or show how homicide percentage vary across Europe.

Be careful how you use your data with a choropleth map. Sometimes you will want to compare regions that are too different in terms of magnitude. Then, it's best to present your data as *rates/ratio* (percentage) and not in raw counts (numbers) to make the insight realistic.

If, for example, you compare traffic deaths in different countries only by raw counts, you will receive misleading results due to the population factor. More densely populated countries like China would always be colored in darker colors because of bigger raw counts.

Below, you can see a map, showing traffic deaths per 100 000 population in Eastern Asia. Here, you can make realistic conclusions about the driving culture of Asian countries, avoiding the chance to be deluded by the population of bigger countries.

![A choropleth map of Eastern Asia showing traffic deaths per 100 000](images/road-traffic-deaths-eastern-asia-example.png)

Your choice of data for the choropleth map visualization highly depends on the insight you want to provide. If you aim to present the spread of a contagious disease through a region, then the use of raw counts may be more appropriate.


## Data Requirements for Location Data

Reveal has a great variety of predefined maps available for your choropleth visualizations. The minimum information required to provide in your data set is:

  - Quantitative data (values) for a given location.

  - Location names.

*Location names* column in your data set has to match the actual geographic units on the selected map. For example, if you choose the USA map, you need to provide a column in your data set containing state names.

To have your location column recognized by Reveal, provide the locations' full names or official 2- or 3-letter abbreviations. Be consistent with the format you provide and don't mix full names and abbreviations.

Find more specific information about the Location format and requirements in [How to prepare Your Data for a Choropleth Map](location-data-requirements).

## Creating a Choropleth Map

In the example below, we will use a choropleth map to analyse the results of the last presidential elections (2016) in the United States.

To follow this walkthrough, download the <a href="/data/2016_November_General_Election.xlsx" download>2016 November General Election</a> spreadsheet, upload it to a cloud provider and follow the steps below.

1. Connect to the cloud provider where you uploaded the spreadsheet.

2. In the visualization editor, select the *Choropleth Map* visualization:
![Select choropleth map visualization from the list of chart types](images/chart-types-choropleth.png)
3. In the *Choropleth Data* section, select the US States map from the *Map* dropdown menu. An outline of the United States map will be displayed on the screen.
![List of available maps](images/list-available-maps.png)
4. In the *Location* placeholder, drop the *State* or *State Abv* filed. Both of them contain a list of the US states' names.

5. For *Values*, select the field containing the quantitative data you want to map. For this example, we will use the *Total Votes (%)*, containing the voting rates in every state.

6. Format the *Value* field to show percentage. Select the *Total Votes (%)* under *Value* ⇒ *Formatting* ⇒ *Type* ⇒ *Percent*.

7. You can add a filter when you choose a field in the *Data Filters* placeholder. *(Optional)*

As a result, you can see the USA map, divided into states. The larger the percent of voters in a state, the more intensive the blue color of the state is.

![Choropleth map visualization](images/choropleth-visualization-example.png)

## Using the Map Color to Create a Multi-Color Choropleth Map

You can alternatively set the *Map Color* property to control the color of each area on the map. This is useful to reflect things like which candidate or party had the most/least votes in an area.

![A choropleth map using the color category](images/color-choropleth-map-example.png)
In the example above, Donald Trump, Hilary Clinton, and "Other" are compared by votes in the 2016 elections. States are colored differently, depending on who won the most votes in the elections.

To change the coloring condition, go to:

*Settings* ⇒ *Color based on* ⇒ *Lowest Value*.


## Drilling Up and Down Hierarchy Levels

You can drill up and down your choropleth map areas to dynamically uncover hierarchy levels of your location data.

To enable the drill down option, you need to add more than one data field in the *Location* placeholder to create subordinate levels. Adding counties under the US states as a new hierarchy level, for example, will allow you to see the big picture at state level and also explore finer details at county level.

Hovering over a shape on the map will highlight it, and a tooltip will appear (see below). Click on the *Drill down* option to reveal the map for the next location hierarchy level.  
![Drill down to tooltip shown for a state](images/drill-down-option-choropleth-map.png)

:::note
**Available Maps:** You can drill down into maps only if the map for the subordinate level is available. Find the available maps under *Map* in the *Choropleth Data* section.
:::