## Client API Reference

### Classes

  - [$.ig.RevealView](#RevealView)  
    The main class used to render a dashboard in your application, it
    also allows the edition of existing dashboards or the creation from
    scratch.

  - [$.ig.RevealSettings](#RevealSettings)  
    The class used to configure a new $.ig.RevealView instance,
    including the dashboard to render and properties to control the
    different features of the product (like canEdit, canSaveAs, etc.)

  - [$.ig.RVDateDashboardFilter](#RVDateDashboardFilter)  
    Class representing the optional date filter defined in a dashboard
    model.

  - [$.ig.RVDateRange](#RVDateRange)  
    Class used to represent a date range for filtering.

  - [$.ig.RVDashboardFilter](#RVDashboardFilter)  
    Class used to represent a dashboard filter.

  - [$.ig.RevealUtility](#RevealUtility)  
    Utility class used to load dashboards.

  - [$.ig.RVDashboard](#RVDashboard)  
    The class representing a Dashboard model. To get an instance of this
    class, use [loadDashboard](#RevealUtility.loadDashboard) method.

  - [$.ig.RVVisualization](#RVVisualization)  
    The class representing a visualization (widget) in the dashboard
    model.

  - [$.ig.RVCell](#RVCell)  
    Class representing a cell in the visualization data, includes column
    name, value and formatted value.

  - [$.ig.RVFilterValue](#RVFilterValue)  
    Class representing a possible value for a dashboard filter,
    retrieved from [getFilterValues](#RevealUtility.getFilterValues)

  - [$.ig.RVDataSourcesRequestedTriggerType](#RVDataSourcesRequestedTriggerType)

    Class providing information about where data sources are being requested for. They can be requested for a visualization, dashboard filter or data blending.

  - [$.ig.DashboardSaveEventArgs](#DashboardSaveEventArgs)  
    The class used as the argument to the onSave event.

<a name='RevealView'></a>
### $.ig.RevealView

The main class used to render a dashboard in your application, it also allows the edition of existing dashboards or the creation from scratch.

**Kind**: global class  
**See**: $.ig.RevealSettings

  - [$.ig.RevealView](#RevealView)

      - [new $.ig.RevealView(selector,
        dashboardSettings)](#new_RevealView_new)

      - *instance*

          - [.onDataSourcesRequested](#RevealView+onDataSourcesRequested)
            :
            [`onDataSourcesRequested`](#RevealView..onDataSourcesRequested)

          - [.onVisualizationDataPointClicked](#RevealView+onVisualizationDataPointClicked)
            :
            [`onVisualizationDataPointClicked`](#RevealView..onVisualizationDataPointClicked)

          - [.onVisualizationLinkingDashboard](#RevealView+onVisualizationLinkingDashboard)
            :
            [`onVisualizationLinkingDashboard`](#RevealView..onVisualizationLinkingDashboard)

          - [.onImageExported](#RevealView+onImageExported) :
            [`onImageExported`](#RevealView..onImageExported)

          - [.onMaximizedVisualizationChanged](#RevealView+onMaximizedVisualizationChanged)

          - [.onSave](#RevealView+onSave) :
            [`onSave`](#RevealView..onSave)

          - [.updateSize()](#RevealView+updateSize)

          - [.maximizeVisualization(visualization)](#RevealView+maximizeVisualization)
            ⇒ `boolean`

          - [.minimizeVisualization()](#RevealView+minimizeVisualization)
            ⇒ `boolean`

          - [.getMaximizedVisualization()](#RevealView+getMaximizedVisualization)
            ⇒ [`$.ig.RVVisualization`](#RVVisualization)

          - [.setFilterSelectedValues(filter,
            selectedValues)](#RevealView+setFilterSelectedValues)

          - [.setDateFilter(filter)](#RevealView+setDateFilter)

          - [.refreshDashboardData()](#RevealView+refreshDashboardData)

          - [.setAccentColor(r, g, b)](#RevealView+setAccentColor)

      - *inner*

          - [\~onDataSourcesRequested](#RevealView..onDataSourcesRequested)
            : `function`

          - [\~dataSourcesResultCallback](#RevealView..dataSourcesResultCallback)
            : `function`

          - [\~onVisualizationDataPointClicked](#RevealView..onVisualizationDataPointClicked)
            : `function`

          - [\~onVisualizationLinkingDashboard](#RevealView..onVisualizationLinkingDashboard)
            : `function`

          - [\~linkingDashboardCallback](#RevealView..linkingDashboardCallback)
            : `function`

          - [\~onImageExported](#RevealView..onImageExported) :
            `function`

          - [\~onSave](#RevealView..onSave) : `function`

<a name='new_RevealView_new'></a>
#### new $.ig.RevealView(selector, dashboardSettings)

Used to create a new instance of $.ig.RevealView class.

| Param             | Type                                     | Description                                                         |
| ----------------- | ---------------------------------------- | ------------------------------------------------------------------- |
| selector          | `string`                                 | that references the HTML element to attach the view to, like a div. |
| dashboardSettings | [`$.ig.RevealSettings`](#RevealSettings) | used to configure the view.                                         |

<a name='RevealView+onDataSourcesRequested'></a>
#### $.ig.RevealView.onDataSourcesRequested : [`onDataSourcesRequested`](#RevealView..onDataSourcesRequested)

This event is triggered whenever the end user clicks on the 'Add
visualization' button. You can create custom datasources to replace the
default/existing ones. The argument is a callback function you’re
supposed to call and pass your custom collection of datasources which
the end user will see.

**Kind**: instance property of [`$.ig.RevealView`](#RevealView)  
**Example**

``` js
revealView.onDataSourcesRequested = function (callback) {
  if(trigger == $.ig.RVDataSourcesRequestedTriggerType.Visualization) {
    var inMemoryDSI = new $.ig.RVInMemoryDataSourceItem("employees");
    inMemoryDSI.title("My InMemory Title");
    inMemoryDSI.description("My InMemory Description");

    var sqlDs = new $.ig.RVSqlServerDataSource();
    sqlDs.title("Clients");
    sqlDs.id("SqlDataSource1");
    sqlDs.host("db.mycompany.local");
    sqlDs.port(1433);
    sqlDs.database("Invoices");

    callback(new $.ig.RevealDataSources([sqlDs], [inMemoryDSI], true));
  }
};
```

<a name='RevealView+onVisualizationDataPointClicked'></a>
#### $.ig.RevealView.onVisualizationDataPointClicked : [`onVisualizationDataPointClicked`](#RevealView..onVisualizationDataPointClicked)

This event is triggered whenever the end user clicks on a data point
over a maximized visualization and not in edit mode. You get the
visualization object($.ig.RVVisualization), actual cell of the click
($.ig.RVCell), and an array of cells($.ig.RVCell) representing the row
of the click.

**Kind**: instance property of [`$.ig.RevealView`](#RevealView)  
**Example**

``` js
revealView.onVisualizationDataPointClicked = function (widget, cell, row) {
  console.log("Widget Data Point Clicked");
  console.log(widget.title());
  console.log(cell.columnLabel);
  console.log(cell.value);
  console.log(cell.formattedValue);
  console.log("First cell in the row has label:" + row[0].columnLabel)
}
```
<a name='RevealView+onVisualizationLinkingDashboard'></a>
#### $.ig.RevealView.onVisualizationLinkingDashboard : [`onVisualizationLinkingDashboard`](#RevealView..onVisualizationLinkingDashboard)

This event is triggered by the $.ig.RevealView object whenever the
end-user tries to follow a link to dashboard (only if the link was link
to dashboard).

**Kind**: instance property of [`$.ig.RevealView`](#RevealView)  
**Example**

``` js
revealView.onVisualizationLinkingDashboard = function (title, url, callback) {
    console.log("Link followed - " + title);
    console.log("Url - " + url);

    var dashboardId = "Environment"
    callback(dashboardId);
};
```

<a name='RevealView+onImageExported'></a>
#### $.ig.RevealView.onImageExported : [`onImageExported`](#RevealView..onImageExported)

This event is triggered whenever the end user clicks the 'Export Image'
button in the 'Export Image' popup after annotating the screenshot
(optional). Note: By default, exporting of an image is not active in the
web version of the SDK. If you want to use this feature you’re supposed
to install Nuget package 'CefSharp.OffScreen' (\>= 63.0.3).

**Kind**: instance property of [`$.ig.RevealView`](#RevealView)  
**Example**

``` js
revealView.onImageExported = function (img) {
  console.log(img);
};
```

<a name='RevealView+onMaximizedVisualizationChanged'></a>
#### $.ig.RevealView.onMaximizedVisualizationChanged

This event is triggered whenever the end user maximizes or minimizes a
visualization. If the action is to maximize the visualization the title
of the maximized visualization can be retrieved via the
maximizedVisualization property of the $.ig.RevealView object.

**Kind**: instance property of [`$.ig.RevealView`](#RevealView)  
**Example**

``` js
revealView.onMaximizedVisualizationChanged = function () {
    maximizedVisualization = revealView.maximizedVisualization();
    msg = "";
    if (maximizedVisualization != null) {
        msg = maximizedVisualization.title();
    } else {
         msg = "no current maximized widget";
    }
    console.log("Maximized widget changed! " + msg);
};
```

<a name='RevealView+onSave'></a>
#### $.ig.RevealView.onSave : [`onSave`](#RevealView..onSave)

This event is triggered whenever the end user clicks 'Save' or 'Save
As', if this event is set in $.ig.RevealView then the callback server
side (IRevealSdkContext.SaveDashboardAsync) will not be called, and the
application is supposed to handle how the dashboard is saved, for
example by implementing its own controller server side.

**Kind**: instance property of [`$.ig.RevealView`](#RevealView)  
**Example**

``` js
revealView.onSave = function (rv, saveEvent) {
   if (saveEvent.saveAs) {
       var newName = prompt("Save as", dashboardId);
          if (!newName) return;
           saveEvent.serializeWithNewName(newName,
               function (b) {
                   saveDashboard(newName, b, saveEvent);
           });
       } else {
           saveEvent.serialize(
               function (b) {
                   saveDashboard(dashboardId, b, saveEvent);
               });
       }
};
```

<a name='RevealView+updateSize'></a>
#### $.ig.RevealView.updateSize()

This method is used to indicate the size of the container has changed
and $.ig.RevealView must re-layout its contents.

**Kind**: instance method of [`$.ig.RevealView`](#RevealView)  

<a name='RevealView+maximizeVisualization'></a>
#### $.ig.RevealView.maximizeVisualization(visualization) ⇒ `boolean`

Used to maximize a visualization once the Reveal View was initialized
and rendered. It might be used to sync the currently displayed
visualization with a feature in the containing app, like displaying
'Sales by Country' along a Sales report.

**Kind**: instance method of [`$.ig.RevealView`](#RevealView)  
**Returns**: `boolean` - true if the given visualization was found in
the dashboard and maximized properly, false otherwise.  
**See**

  - $.ig.RVDashboard\#getVisualizationByTitle

  - $.ig.RVDashboard\#visualizations

| Param         | Type                                       | Description                                                                                                                                             |
| ------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visualization | [`$.ig.RVVisualization`](#RVVisualization) | the visualization to be maximized, an object obtained from the dashboard with methods like visualizations()\[index\] or getVisualizationByTitle(title). |

<a name='RevealView+minimizeVisualization'></a>
#### $.ig.RevealView.minimizeVisualization() ⇒ `boolean`

Used to restore the currently maximized visualization to the original
state, so the whole dashboard is visible.

**Kind**: instance method of [`$.ig.RevealView`](#RevealView)  
**Returns**: `boolean` - true if there was a maximized visualization,
false otherwise.  

<a name='RevealView+getMaximizedVisualization'></a>
#### $.ig.RevealView.getMaximizedVisualization() ⇒ [`$.ig.RVVisualization`](#RVVisualization)

**Kind**: instance method of [`$.ig.RevealView`](#RevealView)  
**Returns**: [`$.ig.RVVisualization`](#RVVisualization) - the maximized
visualization object if any, null if no visualization is maximized  

<a name='RevealView+setFilterSelectedValues'></a>
#### $.ig.RevealView.setFilterSelectedValues(filter, selectedValues)

Sets the selected values for the given filter

**Kind**: instance method of [`$.ig.RevealView`](#RevealView)  
**See**

  - $.ig.RVDashboard\#filters

  - $.ig.RVDashboard\#getFilterByTitle

| Param          | Type                                           | Description                                                                                                                     |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| filter         | [`$.ig.RVDashboardFilter`](#RVDashboardFilter) | The filter to set the selection to. It might be obtained from dashboard.filters()\[index\] or dashboard.getFilterByTitle(title) |
| selectedValues | `Array.<object>`                               | The array of selected values containing the new selection for the filter, like \['United States', 'France'\].                   |

<a name='RevealView+setDateFilter'></a>
#### $.ig.RevealView.setDateFilter(filter)

Sets the date filter in the current dashboard, please note the dashboard
must be defined with a date filter, if not this method will be ignored.

**Kind**: instance method of [`$.ig.RevealView`](#RevealView)  
**See**: $.ig.RVDashboard\#dateFilter

| Param  | Type                                                   | Description                                        |
| ------ | ------------------------------------------------------ | -------------------------------------------------- |
| filter | [`$.ig.RVDateDashboardFilter`](#RVDateDashboardFilter) | the new date filter to set in the dashboard model. |

<a name='RevealView+refreshDashboardData'></a>
#### $.ig.RevealView.refreshDashboardData()

Method used to programmatically refresh the dashboard data, equivalent
to execute the 'Refresh' action in the dashboard menu.

**Kind**: instance method of [`$.ig.RevealView`](#RevealView)  

<a name='RevealView+setAccentColor'></a>
#### $.ig.RevealView.setAccentColor(r, g, b)

Static method which overrides the default accent color used by reveal view. It needs to be set prior of rendering of the RevielView component so the new accent color would be honored.

**Kind**: instance property of [`$.ig.RevealView`](#RevealView)

**Example**

``` js
$.ig.RevealView.setAccentColor = function (r, g, b) {
  $.ig.CPLightThemeSdk.prototype.setAccentColor(new $.ig.CPThemeColorSet(2, r, g, b));
};
```

<a name='RevealView..onDataSourcesRequested'></a>
#### $.ig.RevealView\~onDataSourcesRequested : `function`

This event is triggered whenever the end user clicks on the 'Add
visualization' button. You can create custom datasources to replace the
default/existing ones.

**Kind**: inner typedef of [`$.ig.RevealView`](#RevealView)

| Param    | Type                                                                  | Description                                                                                            |
| -------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| callback | [`dataSourcesResultCallback`](#RevealView..dataSourcesResultCallback) | A function that must be called with your custom collection of datasources which the end user will see. |
| trigger | [`$.ig.RVDataSourcesRequestedTriggerType`](#RVDataSourcesRequestedTriggerType) | An enum indicating whether the data sources are requested for: visualization, dashboard filter or data blending.

<a name='RevealView..dataSourcesResultCallback'></a>
#### $.ig.RevealView\~dataSourcesResultCallback : `function`

The callback used to return the list of data sources from
[onDataSourcesRequested](#RevealView..onDataSourcesRequested)

**Kind**: inner typedef of [`$.ig.RevealView`](#RevealView)

| Param       | Type                     | Description                                                                                                                                                                                                                                                       |
| ----------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dataSources | `$.ig.RevealDataSources` | the list of data sources to display to the user, the first parameter contains a list of data sources, the second one is a list of data source items and the third one is a boolean indicating if data sources already in the dashboard should be included or not. |

<a name='RevealView..onVisualizationDataPointClicked'></a>
#### $.ig.RevealView\~onVisualizationDataPointClicked : `function`

This callback is called whenever the end user clicks on a data point
over a maximized visualization and not in edit mode.

**Kind**: inner typedef of [`$.ig.RevealView`](#RevealView)

| Param         | Type                                       | Description                   |
| ------------- | ------------------------------------------ | ----------------------------- |
| visualization | [`$.ig.RVVisualization`](#RVVisualization) | the visualization clicked     |
| cell          | [`$.ig.RVCell`](#RVCell)                   | the cell clicked              |
| cells         | [`Array.<RVCell>`](#RVCell)                | all cells in the clicked row. |

<a name='RevealView..onVisualizationLinkingDashboard'></a>
#### $.ig.RevealView\~onVisualizationLinkingDashboard : `function`

This callback is called by the $.ig.RevealView object whenever the
end-user tries to follow a link to dashboard (only if the link was link
to dashboard).

**Kind**: inner typedef of [`$.ig.RevealView`](#RevealView)

| Param    | Type                                                                | Description                                                                                                                                                                                  |
| -------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title    | `string`                                                            | The title of the followed link.                                                                                                                                                              |
| url      | `string`                                                            | The url of the followed of the link.                                                                                                                                                         |
| callback | [`linkingDashboardCallback`](#RevealView..linkingDashboardCallback) | A callback function you’re supposed to call and pass a dashboard id indicating the id of the dashboard to navigate to. If the callback method is not invoked the navigation does not happen. |

<a name='RevealView..linkingDashboardCallback'></a>
#### $.ig.RevealView\~linkingDashboardCallback : `function`

This is the callback function used to return the id of the dashboard to
navigate to.

**Kind**: inner typedef of [`$.ig.RevealView`](#RevealView)

| Param       | Type     | Description                                                     |
| ----------- | -------- | --------------------------------------------------------------- |
| dashboardId | `string` | The ID of the target dashboard where Reveal should navigate to. |

<a name='RevealView..onImageExported'></a>
#### $.ig.RevealView\~onImageExported : `function`

This callback is called whenever the end user clicks the 'Export Image'
button in the 'Export Image' popup after annotating the screenshot
(optional).

**Kind**: inner typedef of [`$.ig.RevealView`](#RevealView)

| Param | Type    | Description                                                                           |
| ----- | ------- | ------------------------------------------------------------------------------------- |
| img   | `image` | Contains an 'img' HTML tag containing the base64 encoded representation of the image. |

<a name='RevealView..onSave'></a>
#### $.ig.RevealView\~onSave : `function`

This event is triggered whenever the end user clicks 'Save' or 'Save As'

**Kind**: inner typedef of [`$.ig.RevealView`](#RevealView)

| Param           | Type                                                     | Description                                                                                                                                          |
| --------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| $.ig.RevealView | [`$.ig.RevealView`](#RevealView)                         | The $.ig.RevealView object that triggered the event.                                                                                                 |
| args            | [`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs) | An instance of $.ig.DashboardSaveEventArgs that can be used to get information about the dashboard being saved and to get the binary contents of it. |

<a name='RevealSettings'></a>
### $.ig.RevealSettings

The class used to configure a new $.ig.RevealView instance, including
the dashboard to render and properties to control the different features
of the product (like canEdit, canSaveAs, etc.)

**Kind**: global class  
**See**: $.ig.RevealView

  - [$.ig.RevealSettings](#RevealSettings)

      - [new $.ig.RevealSettings(\[dashId\])](#new_RevealSettings_new)

      - [.startInEditMode](#RevealSettings+startInEditMode) : `boolean`

      - [.canEdit](#RevealSettings+canEdit) : `boolean`

      - [.canSaveAs](#RevealSettings+canSaveAs) : `boolean`

      - [.singleVisualizationMode](#RevealSettings+singleVisualizationMode)
        : `boolean`

      - [.startWithNewVisualization](RevealSettings+startWithNewVisualization)
        : `boolean`

      - [.showChangeVisualization](#RevealSettings+showChangeVisualization)
        : `boolean`

      - [.showFilters](#RevealSettings+showFilters) : `boolean`

      - [.showMenu](#RevealSettings+showMenu) : `boolean`

      - [.showRefresh](#RevealSettings+showRefresh) : `boolean`

      - [.showChangeDataSource](#RevealSettings+showChangeDataSource) :
        `boolean`

      - [.showChangeTheme](#RevealSettings+showChangeTheme) : `boolean`

      - [.canAddVisualization](#RevealSettings+canAddVisualization) :
        `boolean`

      - [.showStatisticalFunctions](#RevealSettings+showStatisticalFunctions) :
        `boolean`
		
      - [.showExportImage](#RevealSettings+showExportImage) :
        `boolean`

      - [.showExportToExcel](#RevealSettings+showExportToExcel) :
        `boolean`

      - [.showExportToPowerpoint](#RevealSettings+showExportToPowerpoint) :
        `boolean`

      - [.showExportToPDF](#RevealSettings+showExportToPDF) :
        `boolean`

      - [.showDataBlending](#RevealSettings+showDataBlending) :
        `boolean`

      - [.showMachineLearningModelsIntegration](#RevealSettings+showMachineLearningModelsIntegration) :
        `boolean`

      - [.initialThemeName](#RevealSettings+initialThemeName) :
        `string`

      - [.dateFilter](#RevealSettings+dateFilter) :
        [`$.ig.RVDateDashboardFilter`](#RVDateDashboardFilter)

      - [.dashboard](#RevealSettings+dashboard) :
        [`$.ig.RVDashboard`](#RVDashboard)

      - [.maximizedVisualization](#RevealSettings+maximizedVisualization)
        : [`$.ig.RVVisualization`](#RVVisualization)

      - [.setFilterSelectedValues(filter,
        selectedValues)](#RevealSettings+setFilterSelectedValues)

      - [.setDateFilter()](#RevealSettings+setDateFilter)

      - [.setAllFiltersSelectedValues(filtersValues)](#RevealSettings+setAllFiltersSelectedValues)

<a name='new_RevealSettings_new'></a>
#### new $.ig.RevealSettings(\[dashId\])

Used to create a new instance of $.ig.RevealSettings, the class used to
configure a $.ig.RevealView object.

| Param      | Type     | Description                                           |
| ---------- | -------- | ----------------------------------------------------- |
| \[dashId\] | `string` | a string that identifies the dashboard to be rendered |

<a name='RevealSettings+startInEditMode'></a>
#### $.ig.RevealSettings.startInEditMode : `boolean`

A flag indicating the view should start in edit mode instead of the
default view mode, defaults to false.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `false`  

<a name='RevealSettings+canEdit'></a>
#### $.ig.RevealSettings.canEdit : `boolean`

A flag indicating if the user can switch to edit mode or not, defaults
to true.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`  

<a name='RevealSettings+canSaveAs'></a>
#### $.ig.RevealSettings.canSaveAs : `boolean`

A flag indicating if the user can 'save as' the dashboard.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`  

<a name='RevealSettings+singleVisualizationMode'></a>
#### $.ig.RevealSettings.singleVisualizationMode : `boolean`

Single visualization mode is used to show a single widget at a time. You
can control the initial visualization to maximize using the
maximizedVisualization property of $.ig.RevealSettings. If no initial
visualization is configured to be maximized the first one will be
maximized initially. You can use $.ig.RevealView.maximizedVisualization
to change the maximized one once the dashboard is visible.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `false`  
**See**

  - $.ig.RevealView\#maximizeVisualization

  - $.ig.RevealSettings\#maximizedVisualization

<a name='RevealSettings+startWithNewVisualization'></a>
#### $.ig.RevealSettings.startWithNewVisualization : `boolean`

A flag indicating the new visualization dialog should be displayed automatically when this view is presented, defaults to false.
This setting requires [startInEditMode](#RevealSettings+startInEditMode) set to true.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `false`

<a name='RevealSettings+showChangeVisualization'></a>
#### $.ig.RevealSettings.showChangeVisualization : `boolean`

A flag indicating if the button to change visualization should be
available or not, , this button is used to switch to another
visualization type (for example from Bar to Column chart) without
entering the edit mode.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`  

<a name='RevealSettings+showFilters'></a>
#### $.ig.RevealSettings.showFilters : `boolean`

A flag that allows the dashboard filters panel to be hidden. This is
useful if you want to limit the selected values for the filters to the
initial selection specified in $.ig.RevealSettings. Once the
$.ig.RevealView object is created and rendered you can use
$.ig.RevealView.setFilterSelectedValues to change the selection for a
given filter, so you can keep the selected values synced with your app.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`  
**See**

  - $.ig.RevealSettings\#setFilterSelectedValues

  - $.ig.RevealView\#setFilterSelectedValues

<a name='RevealSettings+showMenu'></a>
#### $.ig.RevealSettings.showMenu : `boolean`

A flag that indicates if the menu (containing Refresh, Export, etc)
should be displayed or not.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`  

<a name='RevealSettings+showRefresh'></a>
#### $.ig.RevealSettings.showRefresh : `boolean`

A flag that indicates if the Refresh action should be displayed or not.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`  

|*Change the widget’s data source*  
You can now enable or disable the possibility to change a widget’s data
source to end users. When opening the Visualization Data screen in edit
mode, Reveal will either show or hide the change data source button in
the UI. |*Change the dashboard’s theme*  
You can now enable or disable the possibility to change the dashboard’s
theme to end users. When entering edit mode for a dashboard, Reveal will
either show or hide the button used to display the available themes.

<a name='RevealSettings+showChangeDataSource'></a>
#### $.ig.RevealSettings.showChangeDataSource : `boolean`

A flag that indicates if the change data source button is displayed or
not when editing a widget.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`  

<a name='RevealSettings+showChangeTheme'></a>
#### $.ig.RevealSettings.showChangeTheme : `boolean`

A flag that indicates if the button used to change the dashboard’s theme
is displayed or not.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`  

<a name='RevealSettings+canAddVisualization'></a>
#### $.ig.RevealSettings.canAddVisualization : `boolean`

A flag that indicates if new visualizations can be added when the
dashboard is edited.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`  

<a name='RevealSettings+showStatisticalFunctions'></a>
#### $.ig.RevealSettings.showStatisticalFunctions : `boolean`

A flag indicating if the button to turn on statistical functions should be available or not, this button is used to show statistical functions such as Forecast, Linear Regression or Outliers for a visualization.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`  

<a name='RevealSettings+showExportImage'></a>
#### $.ig.RevealSettings.showExportImage : `boolean`

A flag indicating if the export image action is available or not.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`  

<a name='RevealSettings+showExportToExcel'></a>
#### $.ig.RevealSettings.showExportToExcel : `boolean`

A flag indicating if the export to Excel action is available or not.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`

<a name='RevealSettings+showExportToPowerpoint'></a>
#### $.ig.RevealSettings.showExportToPowerpoint : `boolean`

A flag indicating if the export to Powerpoint action is available or not.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`

<a name='RevealSettings+showExportToPDF'></a>
#### $.ig.RevealSettings.showExportToPDF : `boolean`

A flag indicating if the export to Powerpoint action is available or not.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `true`

<a name='RevealSettings+showDataBlending'></a>
#### $.ig.RevealSettings.showDataBlending : `boolean`

A flag indicating if the action to add fields from another data source is available or not in the visualization editor.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `false`

<a name='RevealSettings+showMachineLearningModelsIntegration'></a>
#### $.ig.RevealSettings.showMachineLearningModelsIntegration : `boolean`

A flag indicating if the action to add fields from ML models is available or not in the visualization editor.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**Default**: `false`

<a name='RevealSettings+initialThemeName'></a>
#### $.ig.RevealSettings.initialThemeName

The name of the theme to use initially, this overrides the theme set in the dashboard.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  

<a name='RevealSettings+dateFilter'></a>
#### $.ig.RevealSettings.dateFilter : [`$.ig.RVDateDashboardFilter`](#RVDateDashboardFilter)

The initial date filter to use when rendering the dashboard for the
first time. Please note the dashboard needs to be defined with a date
filter, if not this attribute will be ignored. After the $.ig.RevealView
object is created the date filter might be updated using
$.ig.RevealView.setDateFilter

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**See**: $.ig.RevealView\#setDateFilter  

<a name='RevealSettings+dashboard'></a>
#### $.ig.RevealSettings.dashboard : [`$.ig.RVDashboard`](#RVDashboard)

The dashboard to render in the $.ig.RevealView object where these
settings will be applied. To get a dashboard object you can use the
'loadDashboard' methods available in $.ig.RevealUtility.

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**See**: $.ig.RevealUtility  

<a name='RevealSettings+maximizedVisualization'></a>
#### $.ig.RevealSettings.maximizedVisualization : [`$.ig.RVVisualization`](#RVVisualization)

The visualization to use as the initially maximized visualization. You
can get a visualization from the $.ig.RVDashboard object using
dashboard.visualizations()\[index\] or
dashboard.getVisualizationByTitle()

**Kind**: instance property of
[`$.ig.RevealSettings`](#RevealSettings)  
**See**

  - $.ig.RVDashboard\#visualizations

  - $.ig.RVDashboard\#getVisualizationByTitle

<a name='RevealSettings+setFilterSelectedValues'></a>
#### $.ig.RevealSettings.setFilterSelectedValues(filter, selectedValues)

Sets the initial selected values for the given filter.

**Kind**: instance method of [`$.ig.RevealSettings`](#RevealSettings)  
**See**

  - $.ig.RVDashboard\#filters

  - $.ig.RVDashboard\#getFilterByTitle

| Param          | Type                                           | Description                                                                                                                     |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| filter         | [`$.ig.RVDashboardFilter`](#RVDashboardFilter) | The filter to set the selection to. It might be obtained from dashboard.filters()\[index\] or dashboard.getFilterByTitle(title) |
| selectedValues | `Array.<object>`                               | The array of selected values containing the new selection for the filter, like \['United States', 'France'\].                   |

<a name='RevealSettings+setDateFilter'></a>
#### $.ig.RevealSettings.setDateFilter()

The initial date filter to use when rendering the dashboard for the
first time. Please note the dashboard needs to be defined with a date
filter, if not this value will be ignored. After the $.ig.RevealView
object is created the date filter might be updated using
$.ig.RevealView.setDateFilter

**Kind**: instance method of [`$.ig.RevealSettings`](#RevealSettings)  
**See**: $.ig.RevealView\#setDateFilter  

<a name='RevealSettings+setAllFiltersSelectedValues'></a>
#### $.ig.RevealSettings.setAllFiltersSelectedValues(filtersValues)

Sets all filters values in one call.

**Kind**: instance method of [`$.ig.RevealSettings`](#RevealSettings)

| Param         | Type  | Description                                                                                                                                                                                                                                |
| ------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| filtersValues | `any` | is an object working as a Map. Keys are filter identifiers, values are arrays of selected values (see 'setFilterSelectedValues'). The only filters set after a call to this method are these. If the param is null, it clears all filters. |

<a name='RVDateDashboardFilter'></a>
### $.ig.RVDateDashboardFilter

Class representing the optional date filter defined in a dashboard
model.

**Kind**: global class

  - [$.ig.RVDateDashboardFilter](#RVDateDashboardFilter)

      - [.dateFilterType](#RVDateDashboardFilter+dateFilterType) :
        [`$.ig.RVDateFilterType`](#RVDateFilterType)

      - [.range](#RVDateDashboardFilter+range) :
        [`$.ig.RVDateRange`](#RVDateRange)

<a name='RVDateDashboardFilter+dateFilterType'></a>
#### $.ig.RVDateDashboardFilter.dateFilterType : [`$.ig.RVDateFilterType`](#RVDateFilterType)

The type of date filter, like YearToDate, MonthToDate, CustomRange, etc.

**Kind**: instance property of
[`$.ig.RVDateDashboardFilter`](#RVDateDashboardFilter)  

<a name='RVDateDashboardFilter+range'></a>
#### $.ig.RVDateDashboardFilter.range : [`$.ig.RVDateRange`](#RVDateRange)

The custom date range used for filtering, only valid when filterType is
CustomRange

**Kind**: instance property of
[`$.ig.RVDateDashboardFilter`](#RVDateDashboardFilter)  

<a name='RVDateRange'></a>
### $.ig.RVDateRange

Class used to represent a date range for filtering.

**Kind**: global class

  - [$.ig.RVDateRange](#RVDateRange)

      - [.from](#RVDateRange+from) : `Date`

      - [.to](#RVDateRange+to) : `Date`

<a name='RVDateRange+from'></a>
#### $.ig.RVDateRange.from : `Date`

The beginning of the range.

**Kind**: instance property of [`$.ig.RVDateRange`](#RVDateRange)  

<a name='RVDateRange+to'></a>
#### $.ig.RVDateRange.to : `Date`

The end of the range.

**Kind**: instance property of [`$.ig.RVDateRange`](#RVDateRange)  

<a name='RVDashboardFilter'></a>
### $.ig.RVDashboardFilter

Class used to represent a dashboard filter.

**Kind**: global class

  - [$.ig.RVDashboardFilter](#RVDashboardFilter)

      - [.id()](#RVDashboardFilter+id) ⇒ `string`

      - [.title()](#RVDashboardFilter+title) ⇒ `string`

<a name='RVDashboardFilter+id'></a>
#### $.ig.RVDashboardFilter.id() ⇒ `string`

The ID of the filter.

**Kind**: instance method of
[`$.ig.RVDashboardFilter`](#RVDashboardFilter)  
**Returns**: `string` - the ID of the date filter  

<a name='RVDashboardFilter+title'></a>
#### $.ig.RVDashboardFilter.title() ⇒ `string`

The title of the filter.

**Kind**: instance method of
[`$.ig.RVDashboardFilter`](#RVDashboardFilter)  
**Returns**: `string` - the title of the filter.  

<a name='RevealUtility'></a>
### $.ig.RevealUtility

Utility class used to load dashboards.

**Kind**: global class

  - [$.ig.RevealUtility](#RevealUtility)

      - [.loadDashboard(dashboardId, onSuccess,
        onError)](#RevealUtility.loadDashboard)

      - [.loadDashboardFromContainer(blob, onSuccess,
        onError)](#RevealUtility.loadDashboardFromContainer)

      - [.getFilterValues(dashboard, filter, callback,
        errorCallback)](#RevealUtility.getFilterValues)

<a name='RevealUtility.loadDashboard'></a>
#### $.ig.RevealUtility.loadDashboard(dashboardId, onSuccess, onError)

Loads the dashboard with the given ID from the standard endpoint in the
server.

**Kind**: static method of [`$.ig.RevealUtility`](#RevealUtility)

| Param       | Type       | Description                                                                                                  |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| dashboardId | `string`   | The ID of the dashboard to open, this ID will be received in the server: IRevealSdkContext.GetDashboardAsync |
| onSuccess   | `function` | A callback that will receive an instance of $.ig.RVDashboard class if the loading was successful.            |
| onError     | `function` | A callback with the error message if the loading operation failed.                                           |

<a name='RevealUtility.loadDashboardFromContainer'></a>
#### $.ig.RevealUtility.loadDashboardFromContainer(blob, onSuccess, onError)

Loads a dashboard from the Blob object with the contents of a .rdash
file.

**Kind**: static method of [`$.ig.RevealUtility`](#RevealUtility)

| Param     | Type       | Description                                                                                       |
| --------- | ---------- | ------------------------------------------------------------------------------------------------- |
| blob      | `Blob`     | The Blob object containing the binary contents of the dashboard in rdash file format.             |
| onSuccess | `function` | A callback that will receive an instance of $.ig.RVDashboard class if the loading was successful. |
| onError   | `function` | A callback with the error message if the loading operation failed.                                |

<a name='RevealUtility.getFilterValues'></a>
#### $.ig.RevealUtility.getFilterValues(dashboard, filter, callback, errorCallback)

Method used to get the possible values for a given filter. For a Country
filter, this will return the list of all countries, not only the
selected ones. You can use this method to create your own UI to select
filter values.

**Kind**: static method of [`$.ig.RevealUtility`](#RevealUtility)

| Param         | Type                                           | Description                                                                                                                                                                                                                    |
| ------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| dashboard     | [`$.ig.RVDashboard`](#RVDashboard)             | The dashboard object obtained with [loadDashboard](#RevealUtility.loadDashboard)                                                                                                                                               |
| filter        | [`$.ig.RVDashboardFilter`](#RVDashboardFilter) | The filter to return the values for, a member of the collection [filters](#RVDashboard+filters), might be obtained also using [getFilterByTitle](#RVDashboard+getFilterByTitle) or [getFilterById](#RVDashboard+getFilterById) |
| callback      | `function`                                     | Callback function that will be invoked with a list of [$.ig.RVFilterValue](#RVFilterValue) objects representing the list of available values for the given filter.                                                             |
| errorCallback | `function`                                     | Callback function with the errorMessage if the request failed.                                                                                                                                                                 |
<a name='RVDashboard'></a>
### $.ig.RVDashboard

The class representing a Dashboard model. To get an instance of this
class, use [loadDashboard](#RevealUtility.loadDashboard) method.

**Kind**: global class

  - [$.ig.RVDashboard](#RVDashboard)

      - [.visualizations()](#RVDashboard+visualizations) ⇒
        [`Array.<RVVisualization>`](#RVVisualization)

      - [.filters()](#RVDashboard+filters) ⇒
        [`Array.<RVDashboardFilter>`](#RVDashboardFilter)

      - [.getVisualizationByTitle(title)](#RVDashboard+getVisualizationByTitle)
        ⇒ [`$.ig.RVVisualization`](#RVVisualization)

      - [.getVisualizationById(id)](#RVDashboard+getVisualizationById) ⇒
        [`$.ig.RVVisualization`](#RVVisualization)

      - [.getFilterByTitle(title)](#RVDashboard+getFilterByTitle) ⇒
        [`$.ig.RVDashboardFilter`](#RVDashboardFilter)

      - [.getFilterById(id)](#RVDashboard+getFilterById) ⇒
        [`$.ig.RVDashboardFilter`](#RVDashboardFilter)

      - [.getName()](#RVDashboard+getName) ⇒ `string`

<a name='RVDashboard+visualizations'></a>
#### $.ig.RVDashboard.visualizations() ⇒ [`Array.<RVVisualization>`](#RVVisualization)

The list of visualizations in the dashboard.

**Kind**: instance method of [`$.ig.RVDashboard`](#RVDashboard)  
**Returns**: [`Array.<RVVisualization>`](#RVVisualization) - the list of
visualizations in the dashboard.  

<a name='RVDashboard+filters'></a>
#### $.ig.RVDashboard.filters() ⇒ [`Array.<RVDashboardFilter>`](#RVDashboardFilter)

The list of filters in the dashboard. Dashboard filters can be used to
apply filters to multiple widgets at the same time.

**Kind**: instance method of [`$.ig.RVDashboard`](#RVDashboard)  
**Returns**: [`Array.<RVDashboardFilter>`](#RVDashboardFilter) - the
list of filters in the dashboard.  

<a name='RVDashboard+getVisualizationByTitle'></a>
#### $.ig.RVDashboard.getVisualizationByTitle(title) ⇒ [`$.ig.RVVisualization`](#RVVisualization)

Gets the first visualization with the given title.

**Kind**: instance method of [`$.ig.RVDashboard`](#RVDashboard)  
**Returns**: [`$.ig.RVVisualization`](#RVVisualization) - The first
visualization with the given title (case sensitive), null if there’s no
visualization with that title.

| Param | Type     | Description                            |
| ----- | -------- | -------------------------------------- |
| title | `string` | The title of the widget to search for. |

<a name='RVDashboard+getVisualizationById'></a>
#### $.ig.RVDashboard.getVisualizationById(id) ⇒ [`$.ig.RVVisualization`](#RVVisualization)

Gets the visualization with the given ID.

**Kind**: instance method of [`$.ig.RVDashboard`](#RVDashboard)  
**Returns**: [`$.ig.RVVisualization`](#RVVisualization) - The
visualization with the given ID (case sensitive), null if there’s no
visualization with that ID.

| Param | Type     | Description                         |
| ----- | -------- | ----------------------------------- |
| id    | `string` | The ID of the widget to search for. |

<a name='RVDashboard+getFilterByTitle'></a>
#### $.ig.RVDashboard.getFilterByTitle(title) ⇒ [`$.ig.RVDashboardFilter`](#RVDashboardFilter)

Gets the first filter with the given title.

**Kind**: instance method of [`$.ig.RVDashboard`](#RVDashboard)  
**Returns**: [`$.ig.RVDashboardFilter`](#RVDashboardFilter) - The first
filter with the given title (case sensitive), null if there’s no filter
with that title.

| Param | Type     | Description                            |
| ----- | -------- | -------------------------------------- |
| title | `string` | The title of the filter to search for. |

<a name='RVDashboard+getFilterById'></a>
#### $.ig.RVDashboard.getFilterById(id) ⇒ [`$.ig.RVDashboardFilter`](#RVDashboardFilter)

Gets the filter with the given ID.

**Kind**: instance method of [`$.ig.RVDashboard`](#RVDashboard)  
**Returns**: [`$.ig.RVDashboardFilter`](#RVDashboardFilter) - The filter
with the given ID (case sensitive), null if there’s no filter with that
ID.

| Param | Type     | Description                         |
| ----- | -------- | ----------------------------------- |
| id    | `string` | The ID of the filter to search for. |

<a name='RVDashboard+getName'></a>
#### $.ig.RVDashboard.getName() ⇒ `string`

The name or title of the dashboard

**Kind**: instance method of [`$.ig.RVDashboard`](#RVDashboard)  
**Returns**: `string` - the name or title of the dashboard  

<a name='RVVisualization'></a>
### $.ig.RVVisualization

The class representing a visualization (widget) in the dashboard model.

**Kind**: global class

  - [$.ig.RVVisualization](#RVVisualization)

      - [.id()](#RVVisualization+id) ⇒ `string`

      - [.title()](#RVVisualization+title) ⇒ `string`

<a name='RVVisualization+id'></a>
#### $.ig.RVVisualization.id() ⇒ `string`

The ID of the visualization

**Kind**: instance method of
[`$.ig.RVVisualization`](#RVVisualization)  
**Returns**: `string` - The ID of the visualization  

<a name='RVVisualization+title'></a>
#### $.ig.RVVisualization.title() ⇒ `string`

The title of the visualization

**Kind**: instance method of
[`$.ig.RVVisualization`](#RVVisualization)  
**Returns**: `string` - The title of the visualization  

<a name='RVCell'></a>
### $.ig.RVCell

Class representing a cell in the visualization data, includes column
name, value and formatted value.

**Kind**: global class  
**See**: $.ig.RevealView\~onVisualizationDataPointClicked

  - [$.ig.RVCell](#RVCell)

      - [.columnName](#RVCell+columnName) : `string`

      - [.columnLabel](#RVCell+columnLabel) : `string`

      - [.value](#RVCell+value) : `object`

      - [.formattedValue](#RVCell+formattedValue) : `string`

<a name='RVCell+columnName'></a>
#### $.ig.RVCell.columnName : `string`

The name of the column this cell belongs to.

**Kind**: instance property of [`$.ig.RVCell`](#RVCell)  

<a name='RVCell+columnLabel'></a>
#### $.ig.RVCell.columnLabel : `string`

The label of the column this cell belongs to.

**Kind**: instance property of [`$.ig.RVCell`](#RVCell)  

<a name='RVCell+value'></a>
#### $.ig.RVCell.value : `object`

The value of the cell.

**Kind**: instance property of [`$.ig.RVCell`](#RVCell)  

<a name='RVCell+formattedValue'></a>
#### $.ig.RVCell.formattedValue : `string`

The formatted value of the cell.

**Kind**: instance property of [`$.ig.RVCell`](#RVCell)  

<a name='RVFilterValue'></a>
### $.ig.RVFilterValue

Class representing a possible value for a dashboard filter, retrieved
from [getFilterValues](#RevealUtility.getFilterValues)

**Kind**: global class  
**See**: $.ig.RevealUtility\#getFilterValues

  - [$.ig.RVFilterValue](#RVFilterValue)

      - [.values](#RVFilterValue+values) : `object`

      - [.label](#RVFilterValue+label) : `string`

<a name='RVFilterValue+values'></a>
#### $.ig.RVFilterValue.values : `object`

The dictionary with all values associated to this filter value, this
object needs to be used when setting selected values for the filter.

**Kind**: instance property of [`$.ig.RVFilterValue`](#RVFilterValue)  

<a name='RVFilterValue+label'></a>
#### $.ig.RVFilterValue.label : `string`

The label used to show this value to the user.

**Kind**: instance property of [`$.ig.RVFilterValue`](#RVFilterValue)  

<a name='RVDataSourcesRequestedTriggerType'></a>
### $.ig.RVDataSourcesRequestedTriggerType

Class providing information about where data sources are being requested for. They can be requested for a visualization, dashboard filter or data blending.

**Kind**: global enum

**Properties**

| **Name**        | **Default** |
|-----------------|---------|
| Visualization   | visualization |
| DashboardFilter | dashboardFilter |
| DataBlending    | dataBlending |

<a name='DashboardSaveEventArgs'></a>
### $.ig.DashboardSaveEventArgs

The class used as the argument to the onSave event.

**Kind**: global class

  - [$.ig.DashboardSaveEventArgs](#DashboardSaveEventArgs)

      - [.saveAs](#DashboardSaveEventArgs+saveAs) : `boolean`

      - [.name](#DashboardSaveEventArgs+name) : `string`

      - [.serialize(callback,
        errorCallback)](#DashboardSaveEventArgs+serialize) ⇒ `Blob`

      - [.serializeWithNewName(newName, callback,
        errorCallback)](#DashboardSaveEventArgs+serializeWithNewName) ⇒
        `Blob`

      - [.saveFinished()](#DashboardSaveEventArgs+saveFinished)

<a name='DashboardSaveEventArgs+saveAs'></a>
#### $.ig.DashboardSaveEventArgs.saveAs : `boolean`

A flag indicating if this event was originated by a 'save' (false) or
'save as' (true) operation.

**Kind**: instance property of
[`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs)  

<a name='DashboardSaveEventArgs+name'></a>
#### $.ig.DashboardSaveEventArgs.name : `string`

The name of the dashboard being saved.

**Kind**: instance property of
[`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs)  

<a name='DashboardSaveEventArgs+serialize'></a>
#### $.ig.DashboardSaveEventArgs.serialize(callback, errorCallback) ⇒ `Blob`

Serializes the current dashboard to the '.rdash' file format, using the
current name.

**Kind**: instance method of
[`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs)  
**Returns**: `Blob` - A Blob object with the contents of the dashboard
in '.rdash' file format.

| Param         | Type  |
| ------------- | ----- |
| callback      | `any` |
| errorCallback | `any` |

<a name='DashboardSaveEventArgs+serializeWithNewName'></a>
#### $.ig.DashboardSaveEventArgs.serializeWithNewName(newName, callback, errorCallback) ⇒ `Blob`

Serializes the current dashboard to the '.rdash' file format with the
name provided.

**Kind**: instance method of
[`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs)  
**Returns**: `Blob` - A Blob object with the contents of the dashboard
in '.rdash' file format.

| Param         | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| newName       | `string` | The new name for the dashboard. |
| callback      | `any`    |                                 |
| errorCallback | `any`    |                                 |

<a name='DashboardSaveEventArgs+saveFinished'></a>
#### $.ig.DashboardSaveEventArgs.saveFinished()

Notifies the Reveal SDK the save operation has finished and it should
switch to view mode.

**Kind**: instance method of
[`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs)  

<a name='RVDateFilterType'></a>
### $.ig.RVDateFilterType

**Kind**: global enum  
**Properties**

| Name                 | Default                | Description                                                                       |
| -------------------- | ---------------------- | --------------------------------------------------------------------------------- |
| AllTime              | `allTime`              | No filter defined, all time is included                                           |
| CustomRange          | `customRange`          | Custom range, an instance of $.ig.RVDateRange must be set in the range property.  |
| LastWeek             | `lastWeek`             | Last 7 days                                                                       |
| LastMonth            | `lastMonth`            | Last 30 days                                                                      |
| LastYear             | `lastYear`             | Last 365 days                                                                     |
| YearToDate           | `yearToDate`           | From Jan 1st this year to today                                                   |
| QuarterToDate        | `quarterToDate`        | From the first day of the current quarter                                         |
| MonthToDate          | `monthToDate`          | From the first day of the current month                                           |
| Yesterday            | `yesterday`            | Yesterday                                                                         |
| Today                | `today`                | Today                                                                             |
| ThisMonth            | `thisMonth`            | This month, including the rest of it                                              |
| ThisQuarter          | `thisQuarter`          | This quarter, including the rest of it                                            |
| ThisYear             | `thisYear`             | This year, including the rest of it. From Jan 1st to Dec 31st of the current year |
| PreviousMonth        | `previousMonth`        | The previous month                                                                |
| PreviousQuarter      | `previousQuarter`      | The previous quarter                                                              |
| PreviousYear         | `previousYear`         | The previous year                                                                 |
| NextMonth            | `nextMonth`            | The next month                                                                    |
| NextQuarter          | `nextQuarter`          | The next quarter                                                                  |
| NextYear             | `nextYear`             | The next year                                                                     |
| TrailingTwelveMonths | `trailingTwelveMonths` | The last 12 complete months                                                       |
