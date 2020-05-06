## Editing & Saving Dashboards

### Overview

As described in [**Loading Dashboard Files**](~/en-us/developer/web-sdk/using-the-server-sdk/loading-dashboards-server-we.md), there are two ways to handle how you save changes to dashboards:
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
    revealSettings.canSaveAs = false;
    ```

    This might be useful, for example, when your users are not supposed to make changes.

  - **Server-side**: When the __onSave__ event is not set in the __$.ig.RevealView__ object, the default server-side saving method is used. After the end user saves a modified dashboard, a HTTP POST request is invoked. As a result, the __SaveDashboardAsync__ method of the currently defined SDK context is invoked. And you get the \_dashboardId as string and a Stream representation of the dashboard in **dashboardStream**.

  With the server-side approach, you only need to implement the code
  client-side but you lose flexibility client-side. This means, for
  example, that the user cannot select the final location where the
  dashboard will be stored. For further details about the SDK context, please refer to
  [**Defining the Server Context.**](~/en-us/developer/general/setup-configuration-web.html#defining-server-context).
