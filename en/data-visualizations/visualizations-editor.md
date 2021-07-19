## Visualizations Editor

The _Visualizations Editor_ is where you create and edit your visualizations in Reveal. Here you will find the data from your dataset aggregated and prepared for use as well as great variety of visualizations to build with it.

### How Do You Create a Visualization?

Visualizations are the building blocks of your dashboard. So, when you start creating a visualization you can choose between two alternative starting points.

* Start with **creating a new dashboard** where the new visualization will be your first and/or only visualization. To do this, go to _My Stuff_ or a workspace and click/tap the _+ New_ blue button.
* Start by **adding a new visualization** to an already existing dashboard. To do this, open a dashboard in [_Dashboard Edit_](~/en/dashboards/dashboards-interactions.html#view-edit-mode) mode and click/tap the _+ Visualization_ blue split button.

After that, you will be prompted
to add a new or select an existing [data source](~/en/datasources/overview.md).

<img src="images/creating-new-visualization.png" alt="Creating a new visualization dialog" class="responsive-img"/>

With the data source selected and configured, you will be navigated to the [Visualizations Editor](visualizations-editor.md), where you can start creating your visualization.

The *Visualization editor* will help you get the most desired view using your data.

### Accessing the Visualizations Editor

You can access the Visualization editor in two ways:

***1. In the visualization creation process***

Once you have selected and configured your data source, the *Visualization editor* will open automatically.

***2. In the dashboard editing process***

After opening a chosen dashboard and entering _Dashboard Edit mode_, you will be able to **access the Visualizations editor** by selecting *Edit* from a visualization's overflow button.

### Visualizations Editor Overview

Below, you will find a list of all sections of the _Editor_ with their capabilities.

<img src="images/visualization-editor-panes.png" alt="Panes of the Visualization editor" class="responsive-img"/>

1. **Data Section** - this section contains two panels:

  a. **Fields** - All of the available fields within your data source will appear on the left panel. Each field has an indicator that informs the users what field type each field is: *Date*, *Value*, *Text*. A search bar appears when the available fields are more than ten.
       The *plus* icon in this panel allows you to either [blend data sources](~/en/datasources/data-blending.md) or [calculate a field](fields/calculated-fields/overview.html#precalculated-fields). The *brain* icon allows you to use fields from a [BigQuery](~/en/datasources/ml-integration/bigquery-machine-learning-models.md) or [Azure](~/en/datasources/ml-integration/azure-machine-learning-models.md) *machine learning model* for your visualization.

  b. **Visualization Fields** - Here is where you will drag and drop, or click the *+* mark to see the available fields and select those you want to use for the visualization you are creating.

2. **Settings Section** - this section allows you to customize what you want to show. Each visualization comes with its own settings.

  At the bottom of the *Settings* section you will see the option for links. This is a powerful feature that takes drill down to a whole new level. Read more in the [Dashboard Linking](~/en/dashboards/dashboard-linking.md) topic.

3. **Visualization Picker**, where you can choose your desired visualization and preview the final result. As you switch between the different chart types in the dropdown you will notice the visualization fields section change. The fields building each visualization are different, but they change automatically so you only need to fill them in.

4. **Visualization Workspace** - Here is where you will be able to see the visualization you are creating or editing as you drag and drop fields. The visualization won't populate until you have all the necessary fields needed to create that chart type.

5. **Data Source** - The data source that you are currently working with will be displayed here. With a click you can change between the different sheets, tables or views within your source or change your connection to a new source entirely without having to leave the editor. See more in [Changing the Data Source for a Visualization](~/en/datasources/changing-data-source-visualization.md) topic.

Among other things, you will be able to:

  - [**Sort**](~/en/data-visualizations/fields/sort-by-field.md) & [**filter**](~/en/filters/visualization-filters.md) data.

  - [**Aggregate data**](~/en/data-visualizations/fields/field-settings.md) in the data editor.

  - **Search**, **Visualize** & [**format**](~/en/data-visualizations/fields/conditional-formatting.md) data.

After you're done building the visualization, select the *check* icon to return to the
*Dashboard Editor*. In the Dashboard Editor, you can control the layout,
size, and location of the visualizations in a dashboard by simply dragging
visualizations and their borders. When you are ready formatting and styling your dashboard, click/tap the *check* icon again to save your dashboard.  
