# インメモリ データ ソースの追加

Reveal SDK を使用すると、実行時に生成されたデータを使用してダッシュボードを作成できます。このデータは通常、ASP.NET Web API サーバー アプリケーション内で使用されるビジネス オブジェクト (POCO クラス) によってサポートされます。このタイプのデータは、**インメモリ データ**と呼ばれます。

アプリケーションのインメモリ データを Reveal SDK のデータ ソース項目として追加するには、主に 3 つの手順があります。

**手順 1** - ASP.NET Web API サーバー アプリケーションで、`IRVDataProvider` を実装するクラスを作成します。このクラスは、Reveal SDK に返される実際のインメモリ データを提供します。`RVInMemoryDataSourceItem.DatasetId` プロパティをチェックして、返すデータを確認する必要があります。

```cs
public class MyInMemoryDataProvider: IRVDataProvider
{
    public Task<IRVInMemoryData> GetData(IRVUserContext userContext, RVInMemoryDataSourceItem dataSourceItem)
    {
        if (dataSourceItem.DatasetId == "MyDataSetId")
        {
            return Task.FromResult<IRVInMemoryData>(new RVInMemoryData(your-data));
        }
        else
        {
            throw new Exception("Invalid datasetId");
        }
    }
}
```

`GetData` メソッドは、`Task<IRVInMemoryData>` を返します。つまり、使用するインメモリ データはすべて `RVInMemoryData` オブジェクトでラップする必要があります。インメモリ データをコンストラクター引数に指定して `RVInMemoryData` オブジェクトの新しいインスタンスを作成するだけです。

**手順 2** - `RevealSetupBuilder.AddDataProvider` メソッドを使用して、作成した `IRVDataProvider` を `RevealSetupBuilder` に追加するよう、`Program.cs` ファイル の `AddReveal` メソッドを更新します。

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddDataProvider<MyInMemoryDataProvider>();
});
```

**手順 3** - `RevealView.onDataSourcesRequested` イベント内で `$.ig.RVInMemoryDataSourceItem` を作成します。

`RevealView.onDataSourcesRequested` にイベント ハンドラーを追加します。

まず、`id` を `revealView` に設定した `<div>` タグを定義します。

```html
<div id="revealView" style="height: 920px; width: 100%;"></div>
```

次に、イベント ハンドラーで、`$.ig.RVInMemoryDataSourceItem` オブジェクトの新しいインスタンスを作成し、パラメーターとして一意の名前 / ID を指定します。この ID は、`IRVDataProvider` で、要求しているデータはどのデータ ソースかを示すために使用されます。

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {

    var inMemoryDataSourceItem = new $.ig.RVInMemoryDataSourceItem("MyDataSetId");
    inMemoryDataSourceItem.title = "My Data";

    callback(new $.ig.RevealDataSources([], [inMemoryDataSourceItem], true));
};
```

:::caution

サーバーがクライアント アプリケーションとは異なる URL で実行されている場合は、`$.ig.RevealSdkSettings.setBaseUrl` を呼び出す必要があります。サーバー アプリケーションとクライアント アプリケーションの両方が同じ URL で実行されている場合、このメソッドは必要ありません。このメソッドを呼び出す必要があるのは 1 回だけです。

:::

## 例: インメモリ データ ソースの実装

### ビジネス オブジェクトの作成

ASP.NET Web API サーバー アプリケーションで、`Product`、`Seller`、および `Sale` の 3 つのビジネス オブジェクトを作成します。これらのオブジェクトは、ダッシュボードに表示されるデータを保持するために使用されます。

```cs
public class Product
{
    public string Name { get; set; } = string.Empty;
    public double UnitPrice { get; set; }
}

public class Seller
{
    public string Name { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
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

    internal string Quarter { get; set; } = string.Empty;

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
    private static string[] _products = new string[4] { "Apple", "Grape", "Orage", "Banana" };
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

### データ プロバイダーの作成

ダッシュボードで使用するデータを作成したので、次の手順は、そのデータを Reveal SDK で利用できるようにすることです。これを行うには、`IRVDataProvider` を実装する新しいクラスを作成する必要があります。このインターフェイスは、Reveal SDK 内のインメモリ データの実装に特に使用されます。

`MyInMemoryDataProvider` という新しいクラスを作成し、`IRVDataProvider` インターフェイスを実装しましょう。`_salesInMemoryData` という名前の変数を定義し、`SalesDataGenerator` を使用して生成した 10,000 個のデータ レコードを参照していることに注意してください。

```cs
public class MyInMemoryDataProvider: IRVDataProvider
{
    RVInMemoryData<Sale> _salesInMemoryData = new RVInMemoryData<Sale>(SalesDataGenerator.GenerateSales(10000));

    public Task<IRVInMemoryData> GetData(IRVUserContext userContext, RVInMemoryDataSourceItem dataSourceItem)
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

ご覧のとおり、`GetData` メソッドでは、`DatasetId` で特定の値をチェックしています。この ID が `SalesRecords` データ ソース項目と一致する場合、ダッシュボードのデータ ソースとして `_salesInMemoryData` 変数に格納されているインメモリ ビジネス オブジェクト コレクションを使用します。

データとデータ プロバイダーができたので、`RevealSetupBuilder.AddDataProvider` メソッドを使用して、作成した `IRVDataProvider` を `RevealSetupBuilder` に追加するよう、`Program.cs` ファイルの `AddReveal` メソッドを更新する必要があります。

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddDataProvider<MyInMemoryDataProvider>();
});
```

ここで、`DataSetId` 値について疑問に思われるかもしれません。これは、次の手順でデータ ソース項目を作成するときに発生します。

### onDataSourcesRequested イベントの処理

次の手順は、`RevealView.onDataSourcesRequested` イベントにイベント ハンドラーを追加することです。

まず、`id` を `revealView` に設定した `<div>` タグを定義します。

```html
<div id="revealView" style="height: 920px; width: 100%;"></div>
```

ここで、`revealView` を初期化し、`RevealView.onDataSourcesRequested` イベントを処理します。この例では、**SalesRecords** の `id` と **SalesRecords** に設定された `title` で新しい `$.ig.RVInMemoryDataSourceItem` を作成しています。

```js
var revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {

    var inMemoryDSI = new $.ig.RVInMemoryDataSourceItem("SalesRecords");
    inMemoryDSI.title = "Sales Records";

    callback(new $.ig.RevealDataSources([], [inMemoryDSI], true));
};
```

:::info Get the Code

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/InMemory) にあります。

:::