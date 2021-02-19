## Release Notes

All future updates and new features added to Reveal SDK will be included
here.

<table>
    <colgroup>
        <col style="width: 10%" />
        <col style="width: 10%" />
        <col style="width: 80%" />
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
            <td>2/8/2021</td>
            <td>1.0.1772</td>
            <td><i>[Bug Fix] [SDK] Installation of WPF NuGet package failing with packages.config</i><br> The installation of WPF NuGet package was failing when the host project used packages.config.
            </td>
        </tr>
        <tr>
            <td rowspan="6">2/4/2021</td>
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
            <td rowspan="2">1/20/2020</td>
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
            <td rowspan="2">12/29/2020</td>
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
            <td rowspan="4">12/4/2020</td>
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
            <td rowspan="5"></td>
            <td rowspan="5">1.0.1422</td>
            <td><i>Amazon Athena connector in BETA</i><br>
                You can now connect to Amazon's serverless, interactive query service Athena.</td>
        </tr>
        <tr>
            <td><i>NEW Pre-built Themes</i><br>We added four pre-built app themes. Set one of them and use the
                customizable settings to additionaly personalize the look and feel of the Visualization and Dashboard
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
            <td rowspan="6"></td>
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
            <td rowspan="2"></td>
            <td rowspan="2">1.0.1255</td>
            <td><i>New Azure Analysis Services data source</i><br>With this new data source, you can create dashboards
                using your data models in Azure Analysis Services.</td>
        </tr>
        <tr>
            <td><i>New icon for Google Sheets files</i><br>The look of the Google Sheets files icon was changed.</td>
        </tr>
        <tr>
            <td rowspan="5"></td>
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
            <td></td>
            <td>1.0.1136</td>
            <td><i>New Custom Theming</i><br>
                Now you can create your own theme in Reveal by configuring some or all of the customizable settings in
                the new RevealTheme (Desktop) / $.ig.RevealTheme (Web) class.</td>
        </tr>
        <tr>
            <td rowspan="3"></td>
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
        <td></td>
        <td>1.0.825</td>
        <td><i>Export to Image Functionality is Now Working</i><br>Exporting images server-side (both programmatically
            and through user interaction) was enabled again. For further details about the fix, please refer to: <a
                href="../setup-configuration/setup-configuration-web.html#server-side-image-export">Enabling server-side screenshot
                generation</a></td>
        <tr>
        </tr>
        <td rowspan="4"></td>
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
        <td rowspan="4"></td>
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
