---
pagination_next: web/authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# In-Memory Data Source

## Introduction

The Reveal SDK allows you to create dashboards using data that has been generated at run-time. This data is usually backed by a business object (POCO class) that is used within your server application. This type of data is referred to as in-memory data. This topic explains how to use in-memory data sources in your Reveal application to visualize and analyze your data.

## Server Configuration

### Installation

In-memory data sources are included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup for any platform (ASP.NET, Node.js, or Java).

### Data Provider Implementation

To use in-memory data, you need to implement a data provider that will supply the data to the Reveal SDK.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

**Step 1** - Create a class that implements `IRVDataProvider`. This class will provide the actual in-memory data to be returned to the Reveal SDK.

```csharp
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

**Step 2** - Register the data provider in your application:

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddDataProvider<MyInMemoryDataProvider>();
});
```

  </TabItem>
  <TabItem value="node" label="Node.js">

**Step 1** - Create a data provider function that will supply the in-memory data:

```javascript
const inMemoryDataProvider = async (userContext, dataSourceItem) => {
    if (dataSourceItem.datasetId === "MyDataSetId") {
        return your-data;
    }
    throw new Error("Invalid datasetId");
}
```

**Step 2** - Register the data provider:

```javascript
const revealOptions = {
    dataProvider: inMemoryDataProvider
};
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

**Step 1** - Create a data provider function that will supply the in-memory data:

```typescript
const inMemoryDataProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVInMemoryDataSourceItem) => {
    if (dataSourceItem.datasetId === "MyDataSetId") {
        return your-data;
    }
    throw new Error("Invalid datasetId");
}
```

**Step 2** - Register the data provider:

```typescript
const revealOptions = {
    dataProvider: inMemoryDataProvider
};
```

  </TabItem>
  <TabItem value="java" label="Java">

**Step 1** - Create a class that implements `IRVDataProvider`. This class will provide the actual in-memory data to be returned to the Reveal SDK.

```java
public class MyInMemoryDataProvider implements IRVDataProvider {
    public IRVInMemoryData getData(IRVUserContext userContext, RVInMemoryDataSourceItem dataSourceItem) {
        if ("MyDataSetId".equals(dataSourceItem.getDatasetId())) {
            return new RVInMemoryData(your-data);
        } else {
            throw new RuntimeException("Invalid datasetId");
        }
    }
}
```

**Step 2** - Register the data provider in your application:

```java
RevealEngineInitializer.initialize(new InitializeParameterBuilder()
    .setDataProvider(new MyInMemoryDataProvider())
    .build());
```

  </TabItem>
</Tabs>

## Client-Side Implementation

On the client side, you only need to specify basic properties like ID, title, and subtitle for the data source item. The actual data is provided by the server.

### Creating Data Source Items

**Step 1** - Add an event handler for the `RevealView.onDataSourcesRequested` event.

```js
const revealView = new $.ig.RevealView("#revealView");
revealView.onDataSourcesRequested = (callback) => {
    // Add data source here
    callback(new $.ig.RevealDataSources([], [], false));
};
```

**Step 2** - In the `RevealView.onDataSourcesRequested` event handler, create a new instance of the `RVInMemoryDataSourceItem` object. Set the `id`, `title`, and `subtitle` properties. The `id` parameter is used in the data provider to identify which dataset to return.

```js
revealView.onDataSourcesRequested = (callback) => {
    const inMemoryDSI = new $.ig.RVInMemoryDataSourceItem("MyDataSetId");
    inMemoryDSI.title = "My Data";
    inMemoryDSI.subtitle = "In-Memory Data";

    callback(new $.ig.RevealDataSources([], [inMemoryDSI], false));
};
```

When the application runs, create a new Visualization and you will see the newly created in-memory data source item available for selection.

## Example: Complete Implementation

This example demonstrates how to create a complete in-memory data source implementation with business objects.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

**Step 1** - Create your business objects:

```csharp
public class Sale
{
    public string ProductName { get; set; }
    public string SalesPerson { get; set; }
    public DateTime Date { get; set; }
    public string City { get; set; }
    public int NumberOfUnits { get; set; }
    public double UnitPrice { get; set; }
    public int AmountOfSale { get; set; }
}
```

**Step 2** - Create the data provider:

```csharp
public class MyInMemoryDataProvider: IRVDataProvider
{
    RVInMemoryData<Sale> _salesInMemoryData = new RVInMemoryData<Sale>(GenerateSalesData());

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

    private static List<Sale> GenerateSalesData()
    {
        // Your data generation logic here
        return new List<Sale>();
    }
}
```

**Step 3** - Register the data provider:

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddDataProvider<MyInMemoryDataProvider>();
});
```

**Step 4** - Create the data source item on the client:

```js
revealView.onDataSourcesRequested = (callback) => {
    const inMemoryDSI = new $.ig.RVInMemoryDataSourceItem("SalesRecords");
    inMemoryDSI.title = "Sales Records";
    inMemoryDSI.subtitle = "In-Memory Data";

    callback(new $.ig.RevealDataSources([], [inMemoryDSI], false));
};
```

  </TabItem>
  <TabItem value="node" label="Node.js">

**Step 1** - Create your data:

```javascript
const salesData = [
    {
        productName: "Product A",
        salesPerson: "John Doe",
        date: new Date(),
        city: "New York",
        numberOfUnits: 10,
        unitPrice: 99.99,
        amountOfSale: 999.90
    },
    // ... more records
];
```

**Step 2** - Create the data provider:

```javascript
const inMemoryDataProvider = async (userContext, dataSourceItem) => {
    if (dataSourceItem.datasetId === "SalesRecords") {
        return salesData;
    }
    throw new Error("Invalid datasetId");
}
```

**Step 3** - Create the data source item on the client:

```javascript
revealView.onDataSourcesRequested = (callback) => {
    const inMemoryDSI = new $.ig.RVInMemoryDataSourceItem("SalesRecords");
    inMemoryDSI.title = "Sales Records";
    inMemoryDSI.subtitle = "In-Memory Data";

    callback(new $.ig.RevealDataSources([], [inMemoryDSI], false));
};
```

  </TabItem>
  <TabItem value="node-ts" label="Node.js - TS">

**Step 1** - Create your data interface and data:

```typescript
interface Sale {
    productName: string;
    salesPerson: string;
    date: Date;
    city: string;
    numberOfUnits: number;
    unitPrice: number;
    amountOfSale: number;
}

const salesData: Sale[] = [
    {
        productName: "Product A",
        salesPerson: "John Doe",
        date: new Date(),
        city: "New York",
        numberOfUnits: 10,
        unitPrice: 99.99,
        amountOfSale: 999.90
    },
    // ... more records
];
```

**Step 2** - Create the data provider:

```typescript
const inMemoryDataProvider = async (userContext: IRVUserContext | null, dataSourceItem: RVInMemoryDataSourceItem) => {
    if (dataSourceItem.datasetId === "SalesRecords") {
        return salesData;
    }
    throw new Error("Invalid datasetId");
}
```

**Step 3** - Create the data source item on the client:

```typescript
revealView.onDataSourcesRequested = (callback) => {
    const inMemoryDSI = new $.ig.RVInMemoryDataSourceItem("SalesRecords");
    inMemoryDSI.title = "Sales Records";
    inMemoryDSI.subtitle = "In-Memory Data";

    callback(new $.ig.RevealDataSources([], [inMemoryDSI], false));
};
```

  </TabItem>
  <TabItem value="java" label="Java">

**Step 1** - Create your business objects:

```java
public class Sale {
    private String productName;
    private String salesPerson;
    private Date date;
    private String city;
    private int numberOfUnits;
    private double unitPrice;
    private int amountOfSale;
    
    // Getters and setters
}
```

**Step 2** - Create the data provider:

```java
public class MyInMemoryDataProvider implements IRVDataProvider {
    RVInMemoryData<Sale> salesInMemoryData = new RVInMemoryData<>(generateSalesData());

    public IRVInMemoryData getData(IRVUserContext userContext, RVInMemoryDataSourceItem dataSourceItem) {
        if ("SalesRecords".equals(dataSourceItem.getDatasetId())) {
            return salesInMemoryData;
        } else {
            throw new RuntimeException("Invalid datasetId");
        }
    }

    private List<Sale> generateSalesData() {
        // Your data generation logic here
        return new ArrayList<>();
    }
}
```

**Step 3** - Create the data source item on the client:

```javascript
revealView.onDataSourcesRequested = (callback) => {
    const inMemoryDSI = new $.ig.RVInMemoryDataSourceItem("SalesRecords");
    inMemoryDSI.title = "Sales Records";
    inMemoryDSI.subtitle = "In-Memory Data";

    callback(new $.ig.RevealDataSources([], [inMemoryDSI], false));
};
```

  </TabItem>
</Tabs>

## Additional Resources

- [Sample Source Code on GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/DataSources/InMemory)

## API Reference

<Tabs groupId="code" queryString>
<TabItem value="aspnet" label="ASP.NET" default>

* [RVInMemoryDataSourceItem](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.Data.RVInMemoryDataSourceItem.html) - Represents an in-memory data source item
* [IRVDataProvider](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.IRVDataProvider.html) - Interface for implementing in-memory data providers

</TabItem>
<TabItem value="node" label="Node.js">

* [RVInMemoryDataSourceItem](https://help.revealbi.io/api/javascript/latest/classes/rvinmemorydatasourceitem.html) - Represents an in-memory data source item

</TabItem>
</Tabs>
