---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Google Sheets Data Source

## Introduction

Google Sheets is a web-based spreadsheet program that is part of Google's free, web-based Google Docs Editors suite. This topic explains how to connect to Google Sheets data sources in your Reveal application to visualize and analyze your data.

## Server Configuration

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

For ASP.NET applications, you need to install a separate NuGet package to enable Google Sheets support:

```bash
dotnet add package Reveal.Sdk.Data.Google.Drive
```

Then register the Google Drive provider in your application:

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.DataSources.RegisterGoogleDrive();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the Google Sheets data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="java" label="Java">

For Java applications, the Google Sheets data source is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
</Tabs>

### Connection Configuration

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
// Create a data source provider
public class DataSourceProvider : IRVDataSourceProvider
{
    public async Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
    {
        // Required: Update the underlying data source
        await ChangeDataSourceAsync(userContext, dataSourceItem.DataSource);

        if (dataSourceItem is RVGoogleSheetDataSourceItem googleSheetItem)
        {            
            // Configure specific item properties as needed
            if (googleSheetItem.Id == "MyGoogleSheetItem")
            {
                googleSheetItem.Sheet = "Sheet1";
            }
        }
        
        return dataSourceItem;
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        if (dataSource is RVGoogleDriveDataSourceItem googleDriveItem)
        {
            // Configure connection properties
            googleDriveItem.Identifier = "file_identifier";
        }
        
        return Task.FromResult(dataSource);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
// Create data source providers
const dataSourceItemProvider = async (userContext, dataSourceItem) => {
    // Required: Update the underlying data source
    await dataSourceProvider(userContext, dataSourceItem.dataSource);

    if (dataSourceItem instanceof reveal.RVGoogleSheetDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MyGoogleSheetItem") {
            dataSourceItem.sheet = "Sheet1";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVGoogleDriveDataSourceItem) {
        // Configure connection properties
        dataSource.identifier = "file_identifier";
    }
    
    return dataSource;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```typescript
// Create data source providers
const dataSourceItemProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVDataSourceItem) => {
    // Required: Update the underlying data source
    await dataSourceProvider(userContext, dataSourceItem.dataSource);

    if (dataSourceItem instanceof RVGoogleSheetDataSourceItem) {        
        // Configure specific item properties if needed
        if (dataSourceItem.id === "MyGoogleSheetItem") {
            dataSourceItem.sheet = "Sheet1";
        }
    }
    
    return dataSourceItem;
}

const dataSourceProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVGoogleDriveDataSourceItem) {
        // Configure connection properties
        dataSource.identifier = "file_identifier";
    }
    
    return dataSource;
}
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
// Create a data source provider
public class DataSourceProvider implements IRVDataSourceProvider {

    public RVDataSourceItem changeDataSourceItem(IRVUserContext userContext, String dashboardId, RVDataSourceItem dataSourceItem) {
        // Required: Update the underlying data source
        changeDataSource(userContext, dataSourceItem.getDataSource());

        if (dataSourceItem instanceof RVGoogleSheetDataSourceItem googleSheetItem) {            
            // Configure specific item properties if needed
            if ("MyGoogleSheetItem".equals(dataSourceItem.getId())) {
                googleSheetItem.setSheet("Sheet1");
            }
        }
        
        return dataSourceItem;
    }

    public RVDashboardDataSource changeDataSource(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVGoogleDriveDataSourceItem googleDriveItem) {
            // Configure connection properties
            googleDriveItem.setIdentifier("file_identifier");
        }
        
        return dataSource;
    }
}
```

  </TabItem>
</Tabs>

:::danger Important
Any changes made to the data source in the `ChangeDataSourceAsync` method are not carried over into the `ChangeDataSourceItemAsync` method. You **must** update the data source properties in both methods. We recommend calling the `ChangeDataSourceAsync` method within the `ChangeDataSourceItemAsync` method passing the data source item's underlying data source as the parameter as shown in the examples above.
:::

### Authentication

Authentication for Google Sheets is handled on the server side using service account credentials. For detailed information on authentication options, see the [Authentication](../authentication.md) topic.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVGoogleDriveDataSource)
        {
            userCredential = new RVBearerTokenDataSourceCredential("your_token", "your_userid");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```javascript
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVGoogleDriveDataSource) {
        return new reveal.RVBearerTokenDataSourceCredential("your_token", "your_userid");
    }
    return null;
}
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

```typescript
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVGoogleDriveDataSource) {
        return new RVBearerTokenDataSourceCredential("your_token", "your_userid");
    }
    return null;
}
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
public class AuthenticationProvider implements IRVAuthenticationProvider {
    @Override
    public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVGoogleDriveDataSource) {
            return new RVBearerTokenDataSourceCredential("your_token", "your_userid");
        }
        return null;
    }
}
```

  </TabItem>
</Tabs>

## Client-Side Implementation

On the client side, you only need to specify basic properties like ID, title, and subtitle for the data source. The actual connection configuration happens on the server.

### Creating Data Sources

The Google Spreadsheet ID, also known as the `Identifier`, is a unique identifier for each spreadsheet you create in Google Sheets. The easiest way to find the `Identifier` is to look at the URL of the spreadsheet. In the URL, the spreadsheet ID is the string of letters and numbers that comes after the "/d/" portion of the URL.

![](images/google-sheets-url-identifier.jpg)

In this example, the `Identifier` is **1Tv8z8ya_qTfaiRSYv0U_z21nubgzE_-ZskuPbP1VDxA**

### Creating Data Source Items

Data source items represent specific sheets within your Google Spreadsheet that users can select for visualization. On the client side, you only need to specify ID, title, and subtitle.

**Step 1** - Add an event handler for the `RevealView.onDataSourcesRequested` event.

```js
const revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    // Add data source here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVGoogleDriveDataSourceItem` object and set the `Identifier` property. Then create a new instance of the `RVGoogleSheetDataSourceItem` object to specify which sheet to use.

```js
revealView.onDataSourcesRequested = (callback) => {
    // Get file from Google Drive
    const googleDriveDSI = new $.ig.RVGoogleDriveDataSourceItem();
    googleDriveDSI.identifier = "file_identifier";

    // Indicate the file is a Google Sheet and set the sheet name
    const googleSheetDSI = new $.ig.RVGoogleSheetDataSourceItem(googleDriveDSI);
    googleSheetDSI.id = "MyGoogleSheetItem";
    googleSheetDSI.title = "My Google Sheet";
    googleSheetDSI.subtitle = "Google Drive";

    callback(new $.ig.RevealDataSources([], [googleSheetDSI], false));
};
```

When the application runs, create a new Visualization and you will see the newly created Google Sheet data source item listed in the "Select a Data Source" dialog.

![](images/google-sheets-data-source.jpg)

## Additional Resources

- [Sample Source Code on GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/GoogleSheets-ServiceAccount)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVGoogleDriveDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Google.Drive.RVGoogleDriveDataSourceItem.html) - Represents a Google Drive data source item
* [RVGoogleSheetDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.Google.Drive.RVGoogleSheetDataSourceItem.html) - Represents a Google Sheet data source item

</TabItem>
<TabItem value="node" label="Node.js">

* [RVGoogleDriveDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvgoogledrivedatasourceitem.html) - Represents a Google Drive data source item
* [RVGoogleSheetDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvgooglesheetdatasourceitem.html) - Represents a Google Sheet data source item

</TabItem>
</Tabs>
