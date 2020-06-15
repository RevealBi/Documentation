## ダッシュボード ファイルの読み込み

### 概要とコード

ダッシュボードを表示するには、その rdash ファイルを SDK へのストリームとして指定する必要があります。

以下のコードスニペットは、相対パス (..\\..\\Sales.rdash): から rdash ファイルを読み込む方法を示しています。

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

上記のように、ダッシュボードのコンテンツは非同期メソッド __RevealUtility.LoadDashboard__ を使用してロードされます。
同期メソッドを使用したい場合は、代わりに __RevealUtility.LoadDashboardSync__ を使用することもできます。

> [!NOTE]
> この例では、Loaded イベントでコンポーネントを初期化し、ウィンドウ コンテンツが Grid コンポーネントであると仮定しました。コードをアプリケーションに統合する場合、変更を加える必要がある場合があります。
