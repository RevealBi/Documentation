## Editing & Saving Dashboards

### Overview

As described in [**Loading Dashboard Files**](loading-dashboards-server-web.md), there are two ways to handle how you save changes to dashboards:

  - **Client-side**: To use this method you need to set a function in the [**onSave**](api-reference-client-web.html#RevealView+onSave)
  attribute of the [**revealView**](api-reference-client-web.html#revealview.md) object. This is the recommended approach as it gives more flexibility to the containing app on how operations (save and save as) are performed.

    *Code Sample*:

    ``` js
    revealView.onSave = function(rv, saveEvent) {
        saveEvent.serialize(function(blobValue) {
            //TODO: save the blob value, for example using a XMLHttpRequest object
            //to POST to the server
        });
    };
    ```

    In case you don’t want to handle the save action, you can turn off the option to edit dashboards by setting:

    ``` js
    revealSettings.canSaveAs = false;
    ```

    This might be useful, for example, when your users are not supposed to make changes.

  - **Server-side**: When the [**onSave**](api-reference-client-web.html#RevealView+onSave) event is not set in the [**$.ig.RevealView**](api-reference-client-web.html#<em>revealview.md) object, the default server-side saving method is used. After the end user saves a modified dashboard, a HTTP POST request is invoked. As a result, the [**SaveDashboardAsync**](infragistics.reveal.sdk.webapi~infragistics.sdk.irevealsdkcontext~savedashboardasync) method of the currently defined SDK context is invoked. And you get the \_dashboardId as string and a Stream representation of the dashboard in **dashboardStream**.

  With the server-side approach, you only need to implement the code
  client-side but you lose flexibility client-side. This means, for
  example, that the user cannot select the final location where the
  dashboard will be stored. For further details about the SDK context, please refer to
  [**Defining the Server Context.**](setup-configuration-web.html#defining-server-context).


### Related content

  - [Configuring the RevealView Object](configuring-revealview-client-web.md)
  - [Editing and Saving Dashboards (Desktop)](../../desktop-sdk/using-the-desktop-sdk/editing-saving-dashboards-desktop.md)
  - [Exporting a Dashboard or a Visualization](exporting-dashboard-visualization-web.md)
  - [Setting Up Initial Filter Selections](setting-initial-filters-client-web.md)
  - [Maximizing Visualizations and Single Visualization Mode](maximizing-visualizations-client-web.md)
  - [Setting Up Dynamic Filter Selections](setting-dynamic-filters-client-web.md)
  - [Dashboard Linking](dashboard-linking-client-web.md)
  - [Handling User Click Events](handling-click-events-client-web.md)
  - [Creating New Visualizations and Dashboards](creating-visualizations-dashboards-client-web.md)
