# Release Notes

All future updates and new features added to Reveal SDK will be included
here.

<table>
    <colgroup>
        <col style="width: 15%" />
        <col style="width: 10%" />
        <col style="width: 75%" />
    </colgroup>
    <thead>
        <tr>
            <th>Date</th>
            <th>SDK version</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td rowspan="6">Jan-2022</td>
        <td rowspan="6">1.1.2 .NET</td>
        <td><i>[Public Bug Fix] [SDK] LocalizationProvider and DataSourceProvider issue</i><br>
        Setting up a LocalizationProvider was not working in a few cases in which a DataSourceProvider was also set up.
        </td>
    </tr>
    <tr>
        <td><i>[Public Bug Fix] [SDK] Export to Excel with null values in column names issue</i><br>
        When exporting to excel having a null value in a column name, the app was crashing with InvalidCastException.
        </td>
    </tr>
        <tr>
        <td><i>[Public Bug Fix] [SDK] Export to PDF/PPT with custom logo issue</i><br>
        Exporting to PDF or PPT formats and including a custom branding logo was not working as expected.
        </td>
    </tr>
        <tr>
        <td><i>[Public Bug Fix] [SDK] Dashboard filtering issue</i><br>
        When using a large data source with dashboard linking and filtering, the app was not showing filtered data as expected.
        </td>
    </tr>
        <tr>
        <td><i>[Public Bug Fix] [SDK] Dashboard linking and drilled down data issue</i><br>
        When dashboard linking passes information from a visualization, previously drilled down to values were not being included.
        </td>
    </tr>
    <tr>
        <td><i>The .NET Server SDK was enhanced with several changes:</i><br>
        <i>- .NET server logging</i> - You can now enable .NET server logging for Reveal SDK. It’s managed with upsetting.json LogLevel like "Reveal.Sdk.*": "Trace”.<br>
        <i>- Playwright-based Export </i> - Export to image, PDF and PPT are now based on Playwright instead of Puppeteer. For further details, read about how can to adjust your deployment procedures.<br>
        For further details, please read about <a
                href="../web-sdk/setup-configuration.html#4-set-up-server-side-screenshot-generation">how to adjust your deployment</a>.
        </td>
    </tr>
    <tr>
        <td rowspan="8">Dec-2021</td>
        <td rowspan="8">1.1.1 .NET</td>
        <td><i>Localization support for web</i></br>
        <a href="/api/javascript/latest/classes/revealsdksettings.html#localizedstringsprovider">
            $.ig.RevealSdkSettings.localizedStringsProvider</a> extension point enables localization of several dashboard elements: Dashboard title, Widget title, Field labels, Dashboard Filter titles.
        </td>
    </tr>
    <tr>
        <td><i>Formatting support for web</i></br>
            <a  href="/api/javascript/latest/classes/revealsdksettings.html#fieldformattingsettingsprovider">$.ig.RevealSdkSettings.fieldFormattingSettingsProvider</a> extension point allows defining custom formatting for any date time or numeric field.
        </td>
    </tr>
    <tr>
        <td><i>Added option to hide the dashboard header – including the title and the kebab menu.</i><br>
            <a hre="/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_ShowHeader">ShowHeader</a> (WPF) & <a href="/api/javascript/latest/classes/revealview.html#showheader">showHeader</a> (JS).
        </td>
    </tr>
    <tr>
        <td><i>Added an option to enable/disable the end user ability to maximize visualizations</i><br>
            <a hre="/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_CanMaximizeVisualizationProperty">CanMaximizeVisualizationProperty</a> (WPF) & <a href="/api/javascript/latest/classes/revealview.html#canmaximizevisualization">canMaximizeVisualizationProperty</a> (JS). 
        </td>
    </tr>
    <tr>
        <td><i>Made easier to check if fonts are loaded before rendering in the browser</i></br>
        Now you can you can skip the WebFontLoader library and use <a href="/api/javascript/latest/classes/revealsdksettings.html#ensurefontsloadedasync"> $.ig.RevealSdkSettings.ensureFontsLoadedAsync()</a> to make sure all fonts have been loaded. Instantiate RevealView once the promise returned by this method completes to make sure the fonts needed are loaded.
        </td>
    </tr>
    <tr>
        <td><i>Added a new option in the editor to enable/disable the end user ability to change the background color for a given visualization in the visualization editor.</i></br>
           <a href="/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_CanChangeVisualizationBackgroundColorProperty">CanChangeVisualizationBackgroundColorProperty</a> (WPF) & <a href="/api/javascript/latest/classes/revealview.html#canchangevisualizationbackgroundcolor">canChangeVisualizationBackgroundColor</a> (JS).
        </td>
    </tr>
    <tr>
        <td><i>New way to change the background color for a visualization programmatically.</i></br>
            <a href="/api/wpf/latest/Reveal.Sdk.RevealView.html#Reveal_Sdk_RevealView_SetVisualizationBackgroundColor_Reveal_Sdk_RVVisualization_System_Windows_Media_Color_">SetVisualizationBackgroundColor</a> (WPF) & <a href="/api/javascript/latest/classes/revealview.html#setvisualizationbackgroundcolor">setVisualizationBackgroundColor</a> (JS).
        </td>
    </tr>
        <tr>
        <td><i>[Public Bug Fixes]</i><br>
        - Fixed export to Excel when there are null date values in the dataset.<br>
        - Fixed issue exporting to PDF or PPT with custom branding logo.
        </td>
    </tr>
    <tr>
        <td rowspan="2">Dec-2021</td>
        <td rowspan="2">1.1.0 JAVA</td>
        <td><i>The Java Server SDK was greatly improved, for further details please refer to <a href="../release-information/upgrade-to-java-1.1.html">Reveal Java SDK Upgrade to v1.1</a>.
        </td>
    </tr>
    <tr>
        <td><i>[Public Bug Fixes] [SDK] </i><br>
        - Fixed export to Excel when there are null date values in the dataset.<br>
        - Fixed issue exporting to PDF or PPT with custom branding logo.
        </td>
    </tr>
    <tr>
            <td rowspan="3">Nov-2021</td>
            <td rowspan="3">1.0.9 JAVA</td>
            <td><i>[Public Bug Fix] [SDK] RevealView's availableChartTypes had a timing issue</i><br>
            Setting the availableChartTypes property right after initializing the RevealView object was causing issues.
            </td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] RVDateRange Property not returning the expected type</i><br>
            The <i>from</i> property in the RVDateRange class was not returning a JavaScript Date.
            </td>
        </tr>
        <tr>
            <td><i>Search fields in the Data Blending screen</i><br>
            The Data Blending UI was improved by adding the ability to search for fields to be joined/added in the result.
        </td>
        </tr>
        <tr>
    <tr>
        <td rowspan="6">Oct-2021</td>
        <td rowspan="6">1.1.0 .NET</td>
        <td><i>The .NET Server SDK was enhanced with several changes:</i><br>
        <i>- Registering Reveal services is more flexible</i> - You now can inject other services in your implementations of Reveal interfaces. You only register the type of your implementations of your Reveal providers interfaces.<br>
        <i>- RevealSDKContext removed</i> - RVUserContext is now first class citizen across reveal providers. You need to register a UserContextProvider, which will be instantiating that class and it would be passed to the methods of other Reveal services like IRVDashboardProvider.<br>
        <i>- .NET Core 3.1 or newer is now required</i> - Reveal dropped support for .NET Core running on top of .NET Framework v4.6.2 or higher and .NET core 2.2 as it is out of support.<br>
        <i>- Improved setup for default implementations</i> - Greatly improved setup for default implementations - Now it's pretty simple to setup Reveal if you have your dashboards in a "Dashboards" folder and your local data files (csv or excel) are located in your "Data" folder on the project root level. Example:<br>
        <i>services<br>
        &emsp;&emsp;.AddMvc()<br>
        &emsp;&emsp;.AddReveal();</i><br>
        For further details, please refer to <a
                href="../release-information/upgrade-to-net-1.1.html">Reveal .NET SDK Upgrade to v1.1</a>.
        </td>
    </tr>
    <tr>
        <td><i>IRVDataSourceProvider interface changed (Desktop and .NET Server SDK)</i><br>
        The IRVDataSourceProvider interface now has a single ChangeDataSourceItem and it will be called whenever a dashboard need to use a data source item.
        </td>
    </tr>
    <tr>
        <td><i>Dashboard links in the visualization editor (JavaScript Client SDK)</i><br> The JavaScript SDK now supports the creation of dashboard links in the visualization editor. To try this feature, edit one of the ASP UpMedia sample's visualizations and then go to settings to click the plus sign right from Links.
        </td>
    </tr>
    <tr>
        <td><i>[Public Bug Fix] [SDK] onDateFilterChanged JavaScript event not being triggered</i><br>
        In the Web Client SDK, the onDateFilterChanged event (RVDashboard property) was not being triggered when changing or removing a filter.
        </td>
    </tr>
    <tr>
        <td><i>[Public Bug Fix] [SDK] availableChartTypes JavaScript accessor not working as expected</i><br> In the Web Client SDK, you were not able to instantiate RevealView and immediately set the available charts for end users to pick from (availableChartTypes).
        </td>
    </tr>
    </tr>
    <tr>
        <td><i>Search fields in the Data Blending screen</i><br>
            The Data Blending UI was improved by adding the ability to search for fields to be joined/added in the result.
        </td>
    </tr>
    <tr>
            <td rowspan="2">Sep-2021</td>
            <td rowspan="2">1.0.2013</td>
            <td><i>[Public Bug Fix] Calculated field export to excel resulting in empty cells</i><br>
            When exporting to excel a calculated field doing division by zero, the result included empty cells.
            </td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] Data blending with custom queries and server-side processing issues</i><br>
            When turning on “Process Data On Server” in Web .NET and performing a custom query, data blending was not working as expected.
            </td>
        </tr>
        <tr>
            <td rowspan="3">Sep-2021</td>
            <td rowspan="3">1.0.2012</td>
            <td><i>[Public Bug Fix] [SDK] Decimal point hidden when Sparkline chart exceeds 100%</i><br>
            In the Web SDK, the property canSaveAs was not being honored if it was changed after a dashboard is set.
            </td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] Small window sizes render Text chart unreadable</i><br>
            In both Web and Desktop, the Text Chart font becomes unreadable when the window’s size is small.
            </td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] Issues getting the list of date formats</i><br> When getting a list of date formats for a field editor in the Desktop SDK, you can now use <i>RVBaseFormattingService</i> with aggregated dates.
            </td>
        </tr>
        <tr>
            <td>Aug-2021</td>
            <td>1.0.2008</td>
            <td><i>[Public Bug Fix] [SDK] Saving dashboard as a stream has issues</i><br> When saving dashboards as a stream, in some specific cases <i>dashboard.Serialize.Async()</i> was returning null.</td>
        </tr>
       <tr>
            <td rowspan="6">June-2021</td>
            <td rowspan="6">1.0.2005</td>
            <td><i>Scatter Maps now support OpenStreetMap!</i><br>
            You can now configure and use OpenStreet Map image tiles in Desktop (WPF) and Web-client (JS).
            </td>
        </tr>
        <tr>
            <td><i>New Thumbnail component!</i><br>
            You can now render a thumbnail of a dashboard with <i>RevealDashboardThumbnailView</i>.
            </td>
        </tr>
        <tr>
            <td><i>Credentials from Web client to server-side data source</i><br>
            A new type of credentials <i>RVHeadersDataSourceCredentials</i> allow you to send authentication headers and cookies to REST and Web Resource data sources. For further details, check the following <a href="https://github.com/RevealBi/sdk-samples-aspnetcore/tree/main/Cookies-Auth">sample</a> in GitHub.
            </td>
        </tr>
        <tr>
            <td><i>SDK AspNetCore services injection</i><br>
            You can now register the <i>RevealSdkContext</i> and <i>RevealUserContext</i> implementations as a type only (not passing an instance), allowing these classes to get any other AspNetCore services injected through the constructor. For further details check the following <a href="https://github.com/RevealBi/sdk-samples-aspnetcore/tree/main/Reveal.Sdk.Samples.Web.UpMedia.Backend">sample</a> in GitHub.
            </td>
        </tr>
        <tr>
            <td><a name="java-sdk-1.0.7"></a><i>[Public Bug fix] Calculated field filter not working with data process on server</i><br>
            When enabling server-side aggregation of the data, calculated fields used as filters were not filtering data as expected.
            </td>
        </tr>
        <tr>
            <td><i>[Public Bug fix] Google Analytics issues with dashboard filters</i><br>
            When getting data from Google Analytics data sources, you were unable to create dashboard filters.
            </td>
        </tr>
        <tr>
            <td rowspan="4">June-2021</td>
            <td rowspan="4">1.0.7 JAVA</td>
            <td><i>Scatter Maps now support OpenStreetMap!</i><br>
            You can now configure and use OpenStreet Map image tiles in the SDK Web-client (JS).
            </td>
        </tr>    
        <tr>
            <td><i>[Public Bug fix] [SDK] Text Box content not visible after component is remounted</i><br>
            When using React with a dashboard and a Text Box visualization, content was not visible after component remount. A page reload was required.
            </td>
        </tr>
        <tr>
            <td><a name="java-sdk-1.0.6"></a><i>[Public Bug fix] Calculated field filter not working with data process on server</i><br>
            When enabling server-side aggregation of the data, calculated fields used as filters were not filtering data as expected.
            </td>
        </tr>
        <tr>
            <td><i>[Public Bug fix] Google Analytics issues with dashboard filters</i><br>
            When getting data from Google Analytics data sources, you were unable to create dashboard filters.
            </td>
        </tr>
        <tr>
            <td rowspan="2"><a name="java-sdk-1.0.5"></a>June-2021</td>
            <td rowspan="2">1.0.6 JAVA</td>
            <td><i>[Bug Fix] [SDK] Grizzly server throws an exception</i><br>
            When running Reveal in Grizzly, a <i>NoClassDefFoundError</i> exception was being thrown because of a wrong dependency in <i>javax.servlet.ServletContext</i> class (javax.servlet:javaz.servlet-api assembly).
            </td>
        </tr>
        <tr>
            <td><a name="java-sdk-1.0.4"></a><i>New sample for JAVA SDK released!</i><br>
            There is a new <a href="https://github.com/RevealBi/sdk-samples-java/blob/main/upmedia-backend-grizzly">GitHub sample</a> showing how to use Reveal with <a href="https://javaee.github.io/grizzly/">Grizzly</a> server.
            </td>
        </tr>
        <tr>
            <td rowspan="1">June-2021</td>
            <td rowspan="1">1.0.5 JAVA</td>
            <td><i>Credentials from Web client to server-side data source</i><br>
            A new type of credentials <i>RVHeadersDataSourceCredentials</i> allow you to send authentication headers and cookies to REST and Web Resource data sources. For further details, check the following <a href="https://github.com/RevealBi/sdk-samples-java/blob/main/cookies-auth">sample</a> in GitHub.
            </td>
        </tr>
        <tr>
            <td rowspan="6">May-2021</td>
            <td rowspan="6">1.0.1956 (1.0.4 JAVA)</td>
            <td><i>[Public Bug Fix] [SDK] Full list of Data Sources displayed by mistake</i><br>
            When using <i>DataSourcesRequested</i> callback in the Desktop SDK, the whole list of data sources was being displayed instead of the ones explicitly added.
            </td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] Desktop SDK export to Excel not working as expected</i><br>
            When reloading a dashboard and then exporting a single visualization to Excel, the first visualization of the dashboard was always the one exported.
            </td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] Dashboard with SQL data source using a dynamic port not loading</i><br>
            When loading a dashboard with an SQL data source defined using a dynamic port (providing an instance in the host field), the data source connection was not working because of issues with the dynamic port configuration.
            </td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] Calculated field set as Visualization filter were throwing an error</i><br>
            When configuring a Visualization filter based on a calculated field that depends on another calculated field, an error was being shown ("Invalid column name").
            </td>
        </tr>
        <tr>
            <td><a name="java-sdk-1.0.3"></a><i>[Public Bug Fix] Drill down scenario with different "sort by" configurations not working as expected</i><br>
            When the fields in a hierarchy were configured with a combination of "sort by: <any field>" and a descending sorting, the result was the dashboard not loading.
            </td>
        </tr>
        <tr>
            <td><i>Credentials from Web client to server-side in cross-domain applications</i><br>
            When the backend is not in the same domain as the frontend and you need authentication cookies, you can request credentials using the following Web SDK setting: <b>$.ig.RevealSdkSettings.requestWithCredentialsFlag = true;</b>
            </td>
        </tr>
        <tr>
            <td rowspan="2">May-2021</td>
            <td rowspan="2">1.0.3 JAVA</td>
            <td><a name="java-sdk-1.0.0"></a><i>New Snowflake connector!</i><br>
            Reveal Java SDK now supports Snowflake data source connector, also including data blending between tables in the same Snowflake database.
            </td>
        </tr>
        <tr>
            <td><i>Reveal BI Engine for Java was enhanced</i><br>
            Java platform is now as robust as other platforms, helping to avoid server crashes when a visualization sends a big amount of data back to the client. Several new properties in <b>InitializeParameterBuilder</b> control this: <i>maxInMemoryCells</i>, <i>maxStorageCells</i>, <i>maxStringCellSize</i>, and <i>maxTotalStringSize</i>.
            </td>
        </tr>
        <tr>
            <td rowspan="2">Apr-2021</td>
            <td rowspan="2">1.0.0 JAVA</td>
            <td><i>New JAVA SDK released!</i><br>
            Reveal now supports JAVA as another Web Server option besides .NET. The JAVA SDK requires JAVA 11+ and is distributed as a set of Maven modules. For further details, please refer to <a
                href="../java-sdk/setup-configuration.html">Setup and Configuration</a>.
            </td>
        </tr>
        <tr>
            <td><i>JAVA SDK Samples released!</i><br>
            You can get the JAVA SDK UpMedia samples available in <a
                href="https://github.com/RevealBi/sdk-samples-java">Github</a>.
            </td>
        </tr>
        <tr>
            <td rowspan="3">Mar-2021</td>
            <td rowspan="3">1.0.1866</td>
            <td><i>New Properties for Web and Desktop SDK:</i><br>
            <i>showEditDataSource</i> - can be used to disable the Edit button normally available in the data source overflow menu.<br>
            <i>canAddDashboardFilter</i> - this property can hide the "Add Dashboard Filter" option in the Add Filter menu. These options are available in Dashboard Edit Mode.<br>
            <i>canAddDateFilter</i> - this property can hide the "Add Date Filter" option in the Add Filter menu. These options are available in Dashboard Edit Mode.
            </td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] revealView.canSaveAs property not working as expected</i><br>
            In the Web SDK, the property canSaveAs was not being honored if it was changed after a dashboard is set.
            </td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] HttpContextAccessor.HttpContext property not working as expected</i><br> In the Web SDK, HttpContextAccessor.HttpContext was null when saving a dashboard (accessing it from SaveDashboardAsync method).
            </td>
        </tr>
        <tr>
            <td>Mar-2021</td>
            <td>1.0.1821</td>
            <td><i>[Public Bug Fix] [SDK] SDK apps sometimes throw an NRE exception</i><br> When an SDK application was opened for more than 90 minutes without users interacting with it, performing an action was throwing an exception.</td>
        </tr>
            <td>Feb-2021</td>
            <td>1.0.1772</td>
            <td><i>[Bug Fix] [SDK] Installation of WPF NuGet package failing with packages.config</i><br> The installation of WPF NuGet package was failing when the host project used packages.config.
            </td>
        </tr>
        <tr>
            <td rowspan="6">Feb-2021</td>
            <td rowspan="6">1.0.1763</td>
            <td><i>[Public Bug Fix] [SDK] HasPendingChanges property not working as expected</i><br> In Desktop SDK, the
                HasPendingChanges property was not set to false after saving a dashboard with changes.</td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] Custom filtering not working </i><br>In Desktop SDK, custom queries were not
                filtering data as expected.</td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] Hiding SQLServer tables also hides views</i><br>When using
                RVDataSourceItemsFilter to hide all tables and show only views, the Views tab was also hidden.</td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] AzureSQL Data Provider  throwing an error </i><br>When adding an AzureSQL
                connection, an error message was displayed.</td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] Date filters not displayed if LocalizationProvider set</i><br>When a
                LocalizationProvider was set, date filters from/to were not displayed in the visualizations editor.</td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] Word not localized to Japanese</i><br>The word "Others" was not localized to "その他"
                in Japanese.</td>
        </tr>
        <tr>
            <td rowspan="2">Jan-2021</td>
            <td rowspan="2">1.0.1712</td>
            <td><i>[Public Bug Fix] [SDK] The server component relies on Newtonsoft.Json serializer</i><br> The Reveal
                server component was relying on the default JSON serialization settings of the MVC application. Now the
                hosting app can configure JSON serialization settings as needed.</td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] SQL Server filtering not working for NVARCHAR columns</i><br>Filtering for
                Microsoft SQL Server was not working for NVARCHAR columns when the filtered value contained multibyte
                characters.</td>
        </tr>
        <tr>
            <td rowspan="2">Dec-2020</td>
            <td rowspan="2">1.0.1669</td>
            <td><i>[Public Bug Fix] [SDK] Pivot hierarchies filtering not working with "Processing Data on
                    Server"</i><br>If the option "Processing Data on Server" was checked, drill down hierarchies in the
                Pivot Editor were not filtering data.</td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] [SDK] Custom filtering not working with "Processing Data on Server</i><br>If the
                option "Processing Data on Server" was checked, custom queries were not returning the correct number of
                rows.</td>
        </tr>
        <tr>
            <td rowspan="4">Dec-2020</td>
            <td rowspan="4">1.0.1629</td>
            <td><i>Save/Load Dashboards using JSON</i><br>You can now use Reveal SDK to save/load dashboards to/from
                JSON files.</td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] Category field label not being shown</i><br>In Category Charts, tooltips were not
                displaying the field label but the original field name of a category instead.</td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] Dates in drill down breadcrumbs wrongly displayed</i><br>When drilling down on a
                date field, breadcrumbs did not display values properly. Now breadcrumbs give clear information about
                your drill down level.</td>
        </tr>
        <tr>
            <td><i>[Public Bug Fix] Hover Tooltips and Crosshairs not shown by default</i><br>In Dashboard View mode,
                Hover Tooltips and Crosshairs were not displayed until users enable them. Now they are enabled by
                default.</td>
        </tr>
        <tr>
            <td rowspan="5">Sep-2020</td>
            <td rowspan="5">1.0.1422</td>
            <td><i>Amazon Athena connector in BETA</i><br>
                You can now connect to Amazon's serverless, interactive query service Athena.</td>
        </tr>
        <tr>
            <td><i>NEW Pre-built Themes</i><br>We added four pre-built app themes. Set one of them and use the
                customizable settings to additionally personalize the look and feel of the Visualization and Dashboard
                editor. You can choose from one of the following themes:
                MountainLightTheme (Desktop) / $.ig.MountainLightTheme (Web);
                MountainDarkTheme (Desktop) / $.ig.MountainDarkTheme (Web);
                OceanLightTheme (Desktop) / $.ig.OceanLightTheme (Web);
                OceanDarkTheme (Desktop) / $.ig.OceanDarkTheme (Web).
            </td>
        </tr>
        <tr>
            <td><i>Marketo provider is Now Available</i><br>You can now connect to the marketing platform Marketo and
                use your data in Reveal.</td>
        </tr>
        <tr>
            <td><i>Amazon Redshift provider is Now Available</i><br>You can now use and gain new insights from your data
                in the Amazon Redshift cloud data warehouse.</td>
        </tr>
        <tr>
            <td><i>New "Data Process on Server" feature</i><br>You can now have server-side aggregation of the data
                coming from the MS SQL, MySQL and Postgres data sources</td>
        </tr>
        <tr>
            <td rowspan="6">Jul-2020</td>
            <td rowspan="6">1.0.1374</td>
            <td><i> New API to set axis bounds for charts</i><br> You can now programmatically change the axis bounds in
                runtime for a particular visualization.</td>
        </tr>
        <tr>
            <td><i>Salesforce data source enhancements</i><br>Now you can use your Salesforce reports in Reveal.</td>
        </tr>
        <tr>
            <td><i>New QuickBooks data source</i><br>Connect to your Quickbooks account and use your entities to perform
                data analysis in Reveal.</td>
        </tr>
        <tr>
            <td><i>New Hubspot data source</i><br>You can now connect to Hubspot.</td>
        </tr>
        <tr>
            <td><i>Sharepoint lists and document libraries support</i><br>You can now use the metadata (name, type,
                etc.) collected for all files in a SharePoint library as a data source in Reveal.</td>
        </tr>
        <tr>
            <td><i>New Choropleth Map Visualization</i><br>The Choropleth map visualization allows you to create
                beautiful thematic maps. You can now present geospatial data in an incredibly digestible manner. Let
                color guide you and help you quickly discover patterns, trends and anomalies on the map.</td>
        </tr>
        <tr>
            <td rowspan="2">May-2020</td>
            <td rowspan="2">1.0.1255</td>
            <td><i>New Azure Analysis Services data source</i><br>With this new data source, you can create dashboards
                using your data models in Azure Analysis Services.</td>
        </tr>
        <tr>
            <td><i>New icon for Google Sheets files</i><br>The look of the Google Sheets files icon was changed.</td>
        </tr>
        <tr>
            <td rowspan="5">May-2020</td>
            <td rowspan="5">1.0.1222</td>
            <td><i>New Hover Events API</i><br>
                This new event is called *revealView.TooltipShowing* in WPF and .onTooltipShowing in Web and is
                triggered whenever the end-user hovers over a series in a visualization or clicks on the series.</td>
        </tr>
        <tr>
            <td><i>New TreeMap visualization</i><br>You can use this new visualization type to present large hierarchies
                with a set of nested rectangles. Rectangles’ size will show you part-to-whole relationships amongst a
                variety of metrics, helping you identify patterns and relations between similar data.
            </td>
        </tr>
        <tr>
            <td><i>Export to Excel enhancements</i><br>You can include more visualization types in your spreadsheets
                upon export. Scatter, Bubble and Sparkline charts are now available.</td>
        </tr>
        <tr>
            <td><i>Various UI/UX improvements</i><br>Various minor changes were added to improve user experience in the
                Visualization, Dashboard, New Data Source dialog, etc.</td>
        </tr>
        <tr>
            <td><i>Added support for Shared Drives in Google Drive</i><br>If you have a GSuite Business account, you can
                now access your Shared Drives data and use it to build visualizations in Reveal.</td>
        </tr>
        <tr>
            <td>April-2020</td>
            <td>1.0.1136</td>
            <td><i>New Custom Theming</i><br>
                Now you can create your own theme in Reveal by configuring some or all of the customizable settings in
                the new RevealTheme (Desktop) / $.ig.RevealTheme (Web) class.</td>
        </tr>
        <tr>
            <td rowspan="3">Feb-2020</td>
            <td rowspan="3">1.0.981</td>
            <td><i>New Properties in RevealSettings</i><br>We added multiple new properties to $.ig.RevealSettings to
                control different features, including: ShowExportToPDF, ShowExportToPowerpoint, ShowExportToExcel,
                ShowStatisticalFunctions, ShowDataBlending, ShowMachineLearningModelsIntegration,
                StartWithNewVisualization, InitialThemeName.</td>
        </tr>
        <tr>
            <td><i>Accent Color is Now Available</i><br>You can now find the SetAccentColor method added to
                $.ig.RevealView.</td>
        </tr>
        <tr>
            <td><i>A Trigger Property Added to DataSourceRequested Event</i><br>We added a Trigger (of type
                DataSourcesRequestedTriggerType) property to the DataSourcesRequested event arguments. The users of this
                event will now gain more context about the DataSourcesRequested purposes.</td>
        </tr>
        <td>Nov-2019</td>
        <td>1.0.825</td>
        <td><i>Export to Image Functionality is Now Working</i><br>Exporting images server-side (both programmatically
            and through user interaction) was enabled again. For further details about the fix, please refer to: <a
                href="../setup-configuration/setup-configuration-web.html#server-side-image-export">Enabling server-side screenshot
                generation</a></td>
        <tr>
        </tr>
        <td rowspan="4">Sep-2019</td>
        <td rowspan="4">1.0.80x</td>
        <td><i>Localization Service for Reveal Desktop SDK</i><br>You can now localize titles and labels of a variety of
            dashboard elements. The Localization service also enables you to change the formatting settings of numeric
            and non-aggregated date fields.</td>
        <tr>
        <tr>
            <td><i>Formatting Service for Reveal Desktop SDK</i><br>You can now format numeric data, aggregated and
                non-aggregated date fields to your own preferences. Ignore the default formatting and format your
                dashboard data the way you like it.</td>
        </tr>
        <tr>
            <td><i>Changes in Setup and Configuration (Server SDK)</i><br>Reveal Server SDK now supports .NET Core 2.2+
                as well as .NET Framework 4.6.1+ ASP MVC application projects. In addition, you will now use exclusively
                the NuGet package manager to reference assemblies and install dependency packages.</td>
        </tr>
        </tr>
        <td rowspan="4">Sep-2019</td>
        <td rowspan="4">1.0.70x</td>
        <td><i>Step by Step Guide</i><br>With this detailed guide, you will start with prerequisites and go through
            every step needed to setup and configure Reveal’s SDK.</td>
        <tr>
        <tr>
            <td><i>Change the Widget’s Data Source</i><br>You can now enable or disable the possibility to change a
                widget’s data source to end users. When opening the Visualization Data screen in edit mode, Reveal will
                either show or hide the change data source button in the UI.</td>
        </tr>
        <tr>
            <td><i>Formatting Service for Reveal Desktop SDK</i><br>You can now enable or disable the possibility to
                change the dashboard’s theme to end users. When entering edit mode for a dashboard, Reveal will either
                show or hide the button used to display the available themes.</td>
        </tr>
    </tbody>
</table>
