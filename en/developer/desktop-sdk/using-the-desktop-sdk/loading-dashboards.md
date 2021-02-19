## Loading Dashboard Files

### Overview & Code

If you want to display a dashboard, you can choose between loading a __rdash__ file or loading a __json__ file. In both cases the _Build Action_ property of the file has to be set to _Embedded resource_ in Visual Studio.

When you load the dashboard from a __rdash__ file, you have to pass it as stream or path to the _RVDashboard_ constructor.   
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
        
        // using a path within the file system
        RVDashboard dashboard = new RVDashboard(path);

        // using a stream to create an RVDashboard object
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
When you load a __json__ file, you need to pass the file content as a _string_ parameter to the _RVDashboard.LoadFromJsonAsync_ static method.   
The code snippet below shows how to load a json file from a relative path (..\\..\\Sales.json):
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
        var path = @"..\..\Sales.json";
        var revealView = new RevealView();

        // reading the json file contents
        string jsonContent = File.ReadAllText(path);
        RVDashboard dashboard = await RVDashboard.LoadFromJsonAsync(jsonContent);
        revealView.Dashboard = dashboard;

        Grid grid = this.Content as Grid;
        grid.Children.Add(revealView);
    }
}
```
> [!NOTE]
> In this example, we initialized our component in the *Loaded* event and assumed that the content of the window is a Grid component. You might need to introduce changes when integrating the code into your own application.
