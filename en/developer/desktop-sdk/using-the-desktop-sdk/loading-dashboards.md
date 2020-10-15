## Loading Dashboard Files

### Overview & Code

In order to display a dashboard, you must supply its .rdash file as a stream or as a path on the local file system to the constructor of the RVDashboard class

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

        // using path on the file system
        RVDashboard dashboard = new RVDashboard(path);

        // using s stream to create an RVDashboard object
        using (var fileStream = File.OpenRead(path))
        {
            dashboard = new RVDashboard(fileStream);
        }

        revealView.Dashboard = dashboard;
        Grid grid = this.Content as Grid;
        grid.Children.Add(revealView);
    }
}
```

> [!NOTE]
> In this example, we initialized our component in the *Loaded* event and assumed that the content of the window is a Grid component. You might need to introduce changes when integrating the code into your own application.
