## Loading Dashboard Files

### Overview & Code

In order to display a dashboard, you must supply its .rdash file as a stream to the SDK.

The code snippet below shows how to load a rdash file from a relative path (..\\..\\Sales.rdash):

``` csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        this.Loaded += MainWindow_Loaded;
    }

    private async void MainWindow_Loaded(object sender, RoutedEventArgs e)
    {
        var path = @"..\..\Sales.rdash";

        var revealView = new RevealView();
        using (var fileStream = File.OpenRead(path))
        {
            var dashboard = await RevealUtility.LoadDashboard(fileStream);
            var settings = new RevealSettings(dashboard);
            revealView.Settings = settings;
        }

        Grid grid = this.Content as Grid;
        grid.Children.Add(revealView);
    }
}
```

As shown above, dashboard’s contents are loaded using an async method, [**RevealUtility.LoadDashboard**](rvui.wpf~infragistics.sdk.revealutility~loaddashboard).
Alternatively, you can also use [**RevealUtility.LoadDashboardSync**](rvui.wpf~infragistics.sdk.revealutility~loaddashboardsync) if you prefer to use a synchronous method.

> [!NOTE]
> In this example, we initialized our component in the *Loaded* event and assumed that the content of the window is a Grid component. You might need to introduce changes when integrating the code into your own application.

### Related content

  - [Loading Dashboards Files (Web)](../../web-sdk/using-the-server-sdk/loading-dashboards-server-web.md)
  - [Configuring the RevealView Object](configuring-revealview-desktop.md)
  - [Editing and Saving Dashboards](editing-saving-dashboards-desktop.md)
  - [Working with the Localization Service](localization-service-desktop.md)
  - [Working with the Formatting Service](formatting-service-desktop.md)
  - [Exporting a Dashboard or a Visualization](exporting-dashboard-visualization-desktop.md)
  - [Replacing Data Sources](replacing-data-sources-desktop.md)
  - [In-Memory Data Support](in-memory-data-desktop.md)
  - [Providing Credentials to Data Sources](providing-credentials-datasources-desktop.md)
  - [Setting Up Initial Filter Selections](setting-initial-filters-desktop.md)
  - [Maximizing Visualizations and Single Visualization Mode](maximizing-visualizations-desktop.md)
  - [Setting Up Dynamic Filter Selections](setting-dynamic-filters-desktop.md)
  - [Dashboard Linking](dashboard-linking-desktop.md)
  - [Handling User Click Events](handling-click-events-desktop.md)
  - [Creating New Visualizations and Dashboards](creating-visualizations-dashboards-desktop.md)
