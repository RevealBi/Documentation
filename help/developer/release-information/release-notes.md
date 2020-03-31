## Release Notes

All future updates and new features added to Reveal SDK will be included
here.

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 80%" />
</colgroup>
    <thead>
        <tr>
            <th>SDK version</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>???</td>
            <td><i>New Custom Theming</i><br>
            Now you can create your own theme in Reveal by configuring some or all of the customizable settings in the new RevealTheme (Desktop) / $.ig.RevealTheme (Web) class.</td>
        </tr>
        <tr>
            <td rowspan="3">1.0.981</td>
            <td><i>New Properties in RevealSettings</i><br>We added multiple new properties to $.ig.RevealSettings to control different features, including: ShowExportToPDF, ShowExportToPowerpoint, ShowExportToExcel, ShowStatisticalFunctions, ShowDataBlending, ShowMachineLearningModelsIntegration, StartWithNewVisualization, InitialThemeName.</td>
        </tr>
        <tr>
            <td><i>Accent Color is Now Available</i><br>You can now find the SetAccentColor method added to $.ig.RevealView.</td>
        </tr>
        <tr>
            <td><i>A Trigger Property Added to DataSourceRequested Event</i><br>We added a Trigger (of type DataSourcesRequestedTriggerType) property to the DataSourcesRequested event arguments. The users of this event will now gain more context about the DataSourcesRequested purposes.</td>
        </tr>
            <td>1.0.825</td>
            <td><i>Export to Image Functionality is Now Working</i><br>Exporting images server-side (both programmatically and through user interaction) was enabled again. For further details about the fix, please refer to: <a href="setup-configuration-server-web#server-side-image-export">Enabling server-side screenshot generation</a></td>
        <tr>
        </tr>
            <td rowspan="4">1.0.80x</td>
            <td><i>Localization Service for Reveal Desktop SDK</i><br>You can now localize titles and labels of a variety of dashboard elements. The Localization service also enables you to change the formatting settings of numeric and non-aggregated date fields.</td>
        <tr>
        <tr>
            <td><i>Formatting Service for Reveal Desktop SDK</i><br>You can now format numeric data, aggregated and non-aggregated date fields to your own preferences. Ignore the default formatting and format your dashboard data the way you like it.</td>
        </tr>
        <tr>
            <td><i>Changes in Setup and Configuration (Server SDK)</i><br>Reveal Server SDK now supports .NET Core 2.2+ as well as .NET Framework 4.6.1+ ASP MVC application projects. In addition, you will now use exclusively the NuGet package manager to reference assemblies and install dependency packages.</td>
        </tr>        
        </tr>
            <td rowspan="4">1.0.70x</td>
            <td><i>Step by Step Guide</i><br>With this detailed guide, you will start with prerequisites and go through every step needed to setup and configure Reveal’s SDK.</td>
        <tr>
        <tr>
            <td><i>Change the Widget’s Data Source</i><br>You can now enable or disable the possibility to change a widget’s data source to end users. When opening the Visualization Data screen in edit mode, Reveal will either show or hide the change data source button in the UI.</td>
        </tr>
        <tr>
            <td><i>Formatting Service for Reveal Desktop SDK</i><br>You can now enable or disable the possibility to change the dashboard’s theme to end users. When entering edit mode for a dashboard, Reveal will either show or hide the button used to display the available themes.</td>
        </tr>        
    </tbody>
</table>

### Related content
  - [Known Issues](known-issues.md)
  - [Third-Party Software Used by Reveal](third-party-software.md)
