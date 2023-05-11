---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding an Amazon S3 Data Source

**Step 1** - Add an event handler for the `RevealView.onDataSourcesRequested` event.

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    //add code here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the [RVS3DataSource](https://help.revealbi.io/api/javascript/latest/classes/rvgoogledrivedatasource.html) object. Set the `Title`, `Subtitle`, and `Region` properties. After you have created the `RVS3DataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    var s3 = new $.ig.RVS3DataSource();
    s3.title = "My S3 Server";
    s3.subtitle = "Amazon S3";
    s3.region = "region";

    callback(new $.ig.RevealDataSources([s3], [], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Amazon S3 data source listed in the "Select a Data Source" dialog.

![](images/amazon-s3-data-source.jpg)

:::note

The `RVS3DataSource` loads folders and files based on the authentication provider registered with the Reveal SDK. Amazon S3 authenticates using a `RVAmazonWebServicesCredentials`. See the [Authentication](../authentication#amazon-web-services) topic for more information.

:::

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/Amazon-S3)

:::