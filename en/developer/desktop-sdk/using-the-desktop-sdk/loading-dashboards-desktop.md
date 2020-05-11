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

As shown above, dashboard’s contents are loaded using an async method, __RevealUtility.LoadDashboard__.
Alternatively, you can also use __RevealUtility.LoadDashboardSync__ if you prefer to use a synchronous method.

> [!NOTE]
> In this example, we initialized our component in the *Loaded* event and assumed that the content of the window is a Grid component. You might need to introduce changes when integrating the code into your own application.
