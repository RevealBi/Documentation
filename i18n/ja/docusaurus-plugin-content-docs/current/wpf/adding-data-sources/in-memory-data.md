# インメモリ データ ソースの追加

Reveal SDK を使用すると、アプリケーションの実行時に生成されたデータを使用してダッシュボードを作成できます。このデータは通常、アプリケーション内で使用されるビジネス オブジェクト (POCO クラス) によってサポートされます。このタイプのデータは、**インメモリ データ**と呼ばれます。

アプリケーションのインメモリ データを Reveal SDK のデータ ソース項目として追加するには、主に 3 つの手順があります。

**手順 1** - `IRVDataProvider` を実装するクラスを作成します。このクラスは、Reveal SDK に返される実際のインメモリ データを提供します。`RVInMemoryDataSourceItem.DatasetId` プロパティをチェックして、返すデータを確認する必要があります。

```cs
class MyInMemoryDataProvider : IRVDataProvider
{
    public Task<IRVInMemoryData> GetData(RVInMemoryDataSourceItem dataSourceItem)
    {
        if (dataSourceItem.DatasetId == "MyDataSetId")
        {
            return Task.FromResult<IRVInMemoryData>(new RVInMemoryData(data));
        }
        else
        {
            throw new Exception("Invalid datasetId");
        }
    }
}
```

`GetData` メソッドは、`Task<IRVInMemoryData>` を返します。つまり、使用するインメモリ データはすべて `RVInMemoryData` オブジェクトでラップする必要があります。  `RVInMemoryData` オブジェクトの新しいインスタンスを作成し、インメモリ データをパラメーターとしてオブジェクト コンストラクターに渡すだけです。

**手順 2** - `RevealSdkSettings.DataProvider` を `IRVDataProvider` を実装するクラスのインスタンスに設定します。

```cs
RevealSdkSettings.DataProvider = new MyInMemoryDataProvider();
```

**手順 3** - `RevealView.DataSourcesRequested` イベントに `RVInMemoryDataSourceItem` を作成します。

```html
<rv:RevealView x:Name="_revealView" DataSourcesRequested="RevealView_DataSourcesRequested" />
```

イベント ハンドラーで、`RVInMemoryDataSourceItem` オブジェクトの新しいインスタンスを作成し、パラメーターとして一意の名前/  ID を指定します。この ID は、`IRVDataProvider` で、どのデータ ソースがデータを要求しているかを示すために使用されます。

```cs
private void RevealView_DataSourcesRequested(object sender, DataSourcesRequestedEventArgs e)
{
    List<RVDashboardDataSource> datasources = new List<RVDashboardDataSource>();
    List<RVDataSourceItem> datasourceItems = new List<RVDataSourceItem>();

    var inMemoryDataSourceItem = new RVInMemoryDataSourceItem("MyDataSetId")
    {
        Title = "My Data"                
    };

    datasourceItems.Add(inMemoryDataSourceItem);

    e.Callback(new RevealDataSources(datasources, datasourceItems, true));
}

```

## 例: インメモリ データ ソースの実装

### ビジネス オブジェクトの作成

この例では、3 つのビジネス オブジェクト `Product`、`Seller`、および `Sale` を作成する必要があります。これらのオブジェクトは、ダッシュボードに表示されるデータを保持するために使用されます。

```cs
public class Product
{
    public string Name { get; set; }
    public double UnitPrice { get; set; }
}

public class Seller
{
    public string Name { get; set; }
    public string City { get; set; }
}

public class Sale
{
    internal Product Product { get; set; } = new Product();

    internal Seller Seller { get; set; } = new Seller();

    public string SalesPerson
    {
        get { return Seller.Name; }
        set { Seller.Name = value; }
    }

    public DateTime Date { get; set; }

    public string City
    {
        get { return Seller.City; }
        set { Seller.City = value; }
    }

    public string ProductName
    {
        get { return Product.Name; }
        set { Product.Name = value; }
    }

    internal double Value { get; set; }

    internal string Quarter { get; set; }

    public int NumberOfUnits { get; set; }

    public double UnitPrice
    {
        get { return Product.UnitPrice; }
        set { Product.UnitPrice = value; }
    }

    public int AmountOfSale
    {
        get { return (int)UnitPrice * NumberOfUnits; }
        set { Product.UnitPrice = value / NumberOfUnits; }
    }
}
```

### インメモリ データの生成

次に、Reveal ダッシュボードの構築に使用されるデータを生成する必要があります。このために、ダッシュボードで使用するランダム データを生成する `SalesDataGenerator` というヘルパー クラスを作成します。

```cs
public class SalesDataGenerator
{
    private static string[] _products = new string[4] { "Apple", "Grape", "Orange", "Banana" };
    private static string[] _sellerNames = new string[8] { "Ellen Adams", "Lisa Andrews", "William Fox", "Walter Harp", "Jessica Oxley", "Misty Shock", "Chris Meyer", "Jay Calvin" };
    private static string[] _cities = new string[6] { "Tokyo", "Shanghai", "Beijing", "Singapore", "New York", "Seoul" };
    private static readonly Random Random = new Random();
    public static List<Sale> GenerateSales(int numberOfSales)
    {
        List<Sale> sales = new List<Sale>();

        for (double i = 0; i < numberOfSales; i++)
        {
            Sale sale = new Sale
            {
                Quarter = "Q " + i,
                Value = GetRandomPrice(),
                Date = GetRandomDate(),
                Product = GerRandomProduct(),
                NumberOfUnits = GetRandomNumUnits(),
                Seller = GetRandomSeller()
            };
            sales.Add(sale);
        }
        return sales;
    }

    private static Seller GetRandomSeller()
    {
        return new Seller
        {
            City = GetRandomCity(),
            Name = GetRandomSellerName()
        };
    }

    private static string GetRandomSellerName()
    {
        Random a = new Random(Random.Next());
        int length = _sellerNames.Length;
        int RandomMaxLength = a.Next(length) % 2 == 0 ? a.Next(length) : length;
        return _sellerNames[a.Next(RandomMaxLength)];
    }

    private static string GetRandomCity()
    {
        Random a = new Random(Random.Next());
        int length = _cities.Length;
        int RandomMaxLength = a.Next(length) % 2 == 0 ? a.Next(length) : length;
        return _cities[a.Next(RandomMaxLength)];
    }

    private static int GetRandomNumUnits()
    {
        Random a = new Random(Random.Next());
        return a.Next(1, 100);
    }

    private static Product GerRandomProduct()
    {
        return new Product
        {
            Name = GetRandomProductName(),
            UnitPrice = GetRandomPrice()
        };
    }

    private static double GetRandomPrice()
    {
        Random a = new Random(Random.Next());
        return a.NextDouble() * 1000;
    }

    private static string GetRandomProductName()
    {
        Random a = new Random(Random.Next());
        int length = _products.Length;
        int RandomMaxLength = a.Next(length) % 2 == 0 ? a.Next(length) : length;
        return _products[a.Next(RandomMaxLength)];
    }

    private static DateTime GetRandomDate()
    {
        Random a = new Random(Random.Next());
        int day = a.Next(1, 28);
        int month = a.Next(1, 13);
        int year = a.Next(2016, 2020);

        return new DateTime(year, month, day);
    }
}
```

アプリケーションの `MainWindow.cs` ファイルのコンストラクターで、販売データの `10000` レコードを作成します。

```cs
public MainWindow()
{
    InitializeComponent();

    var salesData = SalesDataGenerator.GenerateSales(10000);
}
```

### データプロバイダーの作成

ダッシュボードで使用するデータを作成したので、次の手順は、そのデータを Reveal SDK で利用できるようにすることです。これを行うには、`IRVDataProvider` を実装する新しいクラスを作成する必要があります。  このインターフェイスは、Reveal SDK 内のインメモリ データの実装に特に使用されます。

`InMemoryDataProvider` という新しいクラスを作成し、`IRVDataProvider` インターフェイスを実装しましょう。`IEnumerable<Sale>` を受け入れるコンストラクターも定義したことに注意してください。これにより、前の手順で生成された売上データを渡すことができます。

```cs
class InMemoryDataProvider : IRVDataProvider
{
    RVInMemoryData<Sale> _salesInMemoryData;

    public InMemoryDataProvider(IEnumerable<Sale> sales)
    {
        _salesInMemoryData = new RVInMemoryData<Sale>(sales);
    }

    public Task<IRVInMemoryData> GetData(RVInMemoryDataSourceItem dataSourceItem)
    {
        if (dataSourceItem.DatasetId == "SalesRecords")
        {
            return Task.FromResult<IRVInMemoryData>(_salesInMemoryData);
        }
        else
        {
            throw new Exception("Invalid datasetId");
        }
    }
}
```

ご覧のとおり、`GetData` メソッドでは、`DatasetId` で特定の値をチェックしています。この ID が `SalesRecords` データ ソース項目と一致する場合は、クラス コンストラクターで渡したメモリ内のビジネス オブジェクト コレクションをダッシュボードのデータ ソースとして使用します。

データとデータ プロバイダーができたので、`RevealSdkSettings.DataProvider` プロパティを `InMemoryDataProvider` クラスのインスタンスに設定する必要があります。 

```cs
public MainWindow()
{
    InitializeComponent();

    var salesData = SalesDataGenerator.GenerateSales(10000);
    RevealSdkSettings.DataProvider = new InMemoryDataProvider(salesData);
}
```

ここで、`DataSetId` 値について疑問に思われるかもしれません。これは、次の手順でデータ ソース項目を作成するときに発生します。

### Handle the DataSourcesRequested Event

次の手順は、`RevealView.DataSourcesRequested` イベントにイベント ハンドラーを追加することです。

```html
<rv:RevealView x:Name="_revealView" DataSourcesRequested="RevealView_DataSourcesRequested" />
```

```cs
private void RevealView_DataSourcesRequested(object sender, DataSourcesRequestedEventArgs e)
{
    List<RVDashboardDataSource> datasources = new List<RVDashboardDataSource>();
    List<RVDataSourceItem> datasourceItems = new List<RVDataSourceItem>();

    var inMemoryDataSourceItem = new RVInMemoryDataSourceItem("SalesRecords")
    {
        Title = "Sales Records"                
    };

    datasourceItems.Add(inMemoryDataSourceItem);

    e.Callback(new RevealDataSources(datasources, datasourceItems, true));
}
```

:::info Get the Code

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-wpf/tree/master/AddingDataSources/InMemory) にあります。

:::