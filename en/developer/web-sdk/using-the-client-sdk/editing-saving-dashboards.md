# Editing & Saving Dashboards


## Editing dashboards

The **dashboard** property (type $.ig.RVDashboard) of __revealView__ is updated when the end user starts editing the dashboard. For example, when adding or removing visualizations or filters, $.ig.RVDashboard's collections get automatically updated.

In addition, the __$.ig.RVDashboard__ class includes the **onHasChangesChanged** property that is very useful to check if there are unsaved changes in the dashboard.

*Code Sample*:

``` js
dashboard.onHasChangesChanged = function (hasChanges) {
    console.log("Has Changes: " + hasChanges);
};
```

After a user finishes editing a visualization, upon closing the Visualization Editor, the $.ig.RevealView's __visualizationEditorClosed__ event is fired:

``` js
revealView.onVisualizationEditorClosed = function (args) {
     if (args.isCancelled) {
         console.log("Visualization editor cancelled " + (args.isNewVisualization ? "creating a new visualization " : "editing " + args.visualization.title));
         return;
     }
     if (args.isNewVisualization) {
         console.log("New Visualization created: " + args.visualization.title);
     } else {
         console.log("Visualization modified: " + args.visualization.title);
     }
 };
```

In the case that you need to control how to add new visualizations please refer to [**Creating New Visualizations and Dashboards**](~/en/developer/desktop-sdk/using-the-desktop-sdk/creating-visualizations-dashboards.md).

## Saving Dashboards

As described in [**Loading Dashboard Files**](~/en/developer/web-sdk/using-the-server-sdk/loading-dashboards.md), there are two ways to handle how you save changes to dashboards:
  - **Client-side**: To use this method you need to set a function in the __onSave__
  attribute of the __revealView__ object. This is the recommended approach as it gives more flexibility to the containing app on how operations (save and save as) are performed.

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
    revealView.canSaveAs = false;
    ```

    This might be useful, for example, when your users are not supposed to make changes.

  - **Server-side**: When the __onSave__ event is not set in the __$.ig.RevealView__ object, the default server-side saving method is used. After the end user saves a modified dashboard, a HTTP POST request is invoked. As a result, the __SaveDashboardAsync__ method of the currently defined SDK context is invoked. And you get the \_dashboardId as string and a Stream representation of the dashboard in **dashboardStream**.

  With the server-side approach, you only need to implement the code
  client-side but you lose flexibility client-side. This means, for
  example, that the user cannot select the final location where the
  dashboard will be stored. For further details about the SDK context, please refer to
  [**Defining the Server Context.**](~/en/developer/setup-configuration/setup-configuration-web.html#defining-server-context).
