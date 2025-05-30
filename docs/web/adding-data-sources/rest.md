---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding a REST Data Source

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

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the [RVRESTDataSource](https://help.revealbi.io/api/javascript/latest/classes/rvrestdatasource.html) object.  After you have created the `RVRESTDataSource` object, add it to the data sources collection.

```js
revealView.onDataSourcesRequested = (callback) => {
    const restDataSource = new $.ig.RVRESTDataSource();
    restDataSource.id = "restDataSource1";
    restDataSource.title = "Sales by Category";

    callback(new $.ig.RevealDataSources([restDataSource], [], true));
};
```

**Step 3** - In the DataSourceProvider's `ChangeDataSourceAsync` method, load up the rest of the data source's properties.
Set the `URL` property to the URL of the REST endpoint, and set the `useAnonymousAuthentication` property to false if there is no authentication required to access the REST endpoint.

```csharp
if(dataSource is RVRESTDataSource)
{
    var restNoAuthWebDS = new RVRESTDataSource()
    {
        Subtitle = "Excel2Json",
        Url = "http://EM-MACBUILD2.infragistics.local:8081/RPTestServices/rest/mysql/loadtable/employees/employees100?from={$dateFilterFrom}&to={$dateFilterTo}",
        UseAnonymousAuthentication = true
    };
}
return Task.FromResult(dataSource);
```

When the application runs, create a new Visualization and you will see the newly created REST data source listed in the "Select a Data Source" dialog.

![](images/rest-data-source.jpg)


:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/RestService)

:::
