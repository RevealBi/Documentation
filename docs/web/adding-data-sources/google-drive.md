---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding a Google Drive Data Source

:::danger breaking changes

Currently, the Reveal SDK is in the process of decoupling the data sources from the Reveal SDK core package. In order to ensure the project's continued functionality, you might be required to install additional packages into your project. Please see the [Supported Data Sources](web/datasources.md#supported-data-sources) topic for more information.

:::

**Step 1** - Add an event handler for the `RevealView.onDataSourcesRequested` event.

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    //add code here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the [RVGoogleDriveDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvgoogledrivedatasource.html) object. Set the `Title` and `Subtitle` properties to values that correspond to your Google Drive. After you have created the `RVGoogleDriveDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    var googleDrive = new $.ig.RVGoogleDriveDataSource();
    googleDrive.title = "My Google Drive";
    googleDrive.subtitle = "Google Drive";

    callback(new $.ig.RevealDataSources([googleDrive], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Google Drive data source listed in the "Select a Data Source" dialog.

![](images/google-drive-data-source.jpg)

:::note

The `RVGoogleDriveDataSource` loads folders and files based on the authentication provider registered with the Reveal SDK. Google Drive authenticates using a `RVBearerTokenDataSourceCredential`. See the [Authentication](../authentication#bearer-token-authentication) topic for more information.

:::

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/GoogleDrive-ServiceAccount)

:::