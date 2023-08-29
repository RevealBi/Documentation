# Upgrading to 1.6.0

The Reveal SDK v1.6.0 release introduced a number a breaking changes. Use this guide to learn what steps are neccessary to update your application.

## Licensing

There are major changes to how the Reveal SDK is licensed. Customers need to open their [customer portal](https://account.infragistics.com/subscriptions) and obtain their new license key.

By default, the Reveal SDK will look for a valid license in a file called `license.key` within a folder named `.revealbi-sdk` in the user's "Home" directory.

When you receive your license key, create a text file named `license.key` within a directory named `.reveabi-sdk` located in your "Home" directory. Populate this file with your license key as its content.

The license file location should be located at `C:/Users/your-user-name/.revealbi-sdk/license.key`.

The license key can also be provide in the application code.

```cs
RevealSdkSettings.License = "LICENSE_KEY";
```

## Data Sources
Data Sources have been moved into different NuGet packages. This means all code using any data sources will now be broken. Not only have the data sources been moved into separate packages, all the namespaces related to data have been moved into a new `Reveal.Sdk.Data` namespace.

The following steps will guide you through fixing your data sources

**Step 1**: Install the data source package from NuGet. Review this list of [supported data sources](/wpf/datasources#supported-data-sources) and install your required data sources from NuGet.

**Step 2** - Register the data sources with the Reveal SDK. Each data source will require you to call the `RevealSdkSettings.DataSources.RegisterXXX` method to register the data source with the SDK. For example:

```cs
using Reveal.Sdk;
using Reveal.Sdk.Data;

//all data sources use the RegisterXXX naming convention
RevealSdkSettings.DataSources.RegisterMicrosoftSqlServer();
RevealSdkSettings.DataSources.RegisterAmazonAthena();
RevealSdkSettings.DataSources.RegisterGoogleDrive();
```

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

## Remove AvailableChartTypes

The `RevealView.AvailableChartTypes` property has been removed in favor of the new `RevealView.ChartTypes` property.

The new `ChartTypes` property is now an collection of items that provides more flexibility around controlling the items in the chart type drop down. To learn more about this new feature, visit the [Chart Types](/wpf/chart-types) topic.