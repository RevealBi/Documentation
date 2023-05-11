---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding a REST Data Source

**Step 1** - Add an event handler for the `RevealView.onDataSourcesRequested` event.

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    //add code here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the [RVRESTDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvrestdatasource.html) object. Set the `URL` property to the url of the REST endpoint, and set the `useAnonymousAuthentication` property to false if there is no authentication required to access the REST endpoint. After you have created the `RVRESTDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const restDataSource = new $.ig.RVRESTDataSource();
    restDataSource.title = "Sales by Category";
    restDataSource.subtitle = "Excel2Json";
    restDataSource.url = "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9";
    restDataSource.useAnonymousAuthentication = true;

    callback(new $.ig.RevealDataSources([restDataSource], [], true));
};
```

When the application runs, create a new Visualization and you will see the newly created REST data source listed in the "Select a Data Source" dialog.

![](images/rest-data-source.jpg)


:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/RestService)

:::