import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrading to 1.6.0

The Reveal SDK v1.6.0 release introduced a number a breaking changes. Use this guide to learn what steps are neccessary to update your application.

## Licensing

There are major changes to how the Reveal SDK is licensed. Customers need to open their [customer portal](https://account.infragistics.com/subscriptions) and obtain their new license key.

By default, the Reveal SDK will look for a valid license in a file called `license.key` within a folder named `.revealbi-sdk` in the user's "Home" directory.

The "Home" directory differs depending on the OS you are using.
- Windows: `C:/Users/your-user-name/`
- Mac: `/Users/your-user-name/`
- Linux: `/home/your-user-name/`

When you receive your license key, create a text file named `license.key` within a directory named `.reveabi-sdk` located in your "Home" directory. Populate this file with your license key as its content.

For example; if using Windows the license file location should be located at `C:/Users/your-user-name/.revealbi-sdk/license.key`.

The license key can also be provide in the application code.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
services.AddMvc().AddReveal(builder => 
{
    builder.AddSettings(settings =>
    {
        settings.License = "LICENSE_KEY";
    });
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
RevealEngineInitializer.initialize(new InitializeParameterBuilder().
    setLicense("LICENSE_KEY").
    build());
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```ts
const revealOptions: RevealOptions = {
	license: "LICENSE_KEY",
};
app.use("/", reveal(revealOptions));
```

  </TabItem>
</Tabs>

## Upgrade to ASP.NET 6.0 (ASP.NET Only)
The Reveal SDK v1.6.0 now **requires** ASP.NET 6.0 (also known as ASP.NET Core 6.0) or greater. If you are using a version older than ASP.NET 6.0, you will need to upgrade your ASP.NET project.


## Data Sources (ASP.NET Only)
Data Sources have been moved into different NuGet packages. This means all code using any data sources will now be broken. Not only have the data sources been moved into separate packages, all the namespaces related to data have been moved into a new `Reveal.Sdk.Data` namespace.

The following steps will guide you through fixing your data sources

**Step 1**: Install the data source package from NuGet. Review this list of [supported data sources](/web/datasources#supported-data-sources) and install your required data sources from NuGet.

**Step 2** - Register the data sources with the Reveal SDK. Each data source will require you to call the `builder.DataSources.RegisterXXX` method to register the data source with the SDK. For example:

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
using Reveal.Sdk;
using Reveal.Sdk.Data;

builder.Services.AddControllers().AddReveal( builder =>
{
    //all data sources use the RegisterXXX naming convention
    builder.DataSources.RegisterMicrosoftSqlServer();
    builder.DataSources.RegisterAmazonAthena();
    builder.DataSources.RegisterGoogleDrive();
});
```

  </TabItem>

</Tabs>

**Step 3** - Add the `using Reveal.Sdk.Data;` namespace to the **AuthenticationProvider** and the **DataSourceProvider** classes. Objects such as the `IRVAuthenticationProvider`, `IRVUserContext`, and `RVDashboardDataSource` have been moved into the `Reveal.Sdk.Data` namespace.

```cs
using Reveal.Sdk.Data;
```

**Step 4** - Add new data source namespaces to the **AuthenticationProvider** and the **DataSourceProvider** classes

The namespaces for each data source has been changed to match the NuGet package name. For example; if using `RVSqlServerDataSourceItem`, `RVAthenaDataSource`, and `RVGoogleDriveDataSource`, you'll need to add the following namespaces:

```cs
using Reveal.Sdk.Data.Microsoft.SqlServer;
using Reveal.Sdk.Data.Amazon.Athena;
using Reveal.Sdk.Data.Google.Drive;
```

## Remove Quill.js
The Reveal SDK no longer depends on Quill.js. Find and remove all references to Quill.js.

If using the Quill.js CDN links, do the folowing:

- Find the following css link and remove it.
```
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css" >
```

- Find the following javascript link and remove it:
```
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js" ></script>
```

## Remove availableChartTypes

The `revealView.availableChartTypes` property has been removed in favor of the new `revealView.chartTypes` property.

The new `chartTypes` property is now an array of items that provides more flexibility around controlling the items in the chart type drop down. To learn more about this new feature, visit the [Chart Types](/web/chart-types) topic.