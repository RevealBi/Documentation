---
sidebar_label: Metadata Catalog
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Metadata Catalog

The **metadata catalog** is the central definition of datasources available to Reveal SDK AI. It tells the AI what data connections exist, what provider each one uses, and optionally describes their databases, tables, and fields. Both the **Chat** and **Metadata Service** features rely on the catalog to understand your data landscape.

## How It Works

The metadata system has three distinct responsibilities:

| Concern | Purpose |
|---------|---------|
| **Metadata Catalog** | *What* datasources exist and how they are structured |
| **Metadata Manager** | *Where* generated metadata files are written on disk |
| **Metadata Service** | *When* metadata generation runs (startup, schedule) |

The **catalog** is the only piece you must configure. The manager and service have sensible defaults and are optional.

---

## Catalog Schema

The catalog is a JSON object with a `Datasources` array. Each entry defines a datasource with its provider and optional schema details.

### Minimal Example

At minimum, each datasource needs an `Id` and a `Provider`:

```json
{
  "Datasources": [
    {
      "Id": "MyDatabase",
      "Provider": "SQLServer"
    }
  ]
}
```

### Full Schema

```json
{
  "Datasources": [
    {
      "Id": "MyDatabase",
      "Provider": "SQLServer",
      "Databases": [
        {
          "Name": "Northwind",
          "DiscoveryMode": "Default",
          "Tables": [
            {
              "Name": "dbo.Orders",
              "Description": "Customer purchase orders",
              "Fields": [
                {
                  "Name": "OrderDate",
                  "Alias": "Order Date",
                  "Description": "Date the order was placed"
                },
                {
                  "Name": "FreightTax",
                  "Description": "Calculated tax on freight charges",
                  "Expression": "[Freight] * 1.1",
                  "ExpressionType": "CalculatedField",
                  "DataType": "Number"
                },
                {
                  "Name": "FreightAvg",
                  "Description": "Average freight",
                  "Expression": "average([Freight])",
                  "ExpressionType": "PostCalculatedField",
                  "DataType": "Number"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Schema Reference

#### Datasource

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Id` | string | Yes | Unique identifier for the datasource. Used as the `datasourceId` in API requests. |
| `Provider` | string | Yes | The data provider type (see [Provider Types](#provider-types) below) |
| `Databases` | array | No | List of database schemas available in this datasource |

#### Database

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Name` | string | Yes | The name of the database |
| `DiscoveryMode` | string | No | `"Default"` (discover all tables) or `"Restricted"` (only listed tables). Defaults to `"Default"`. |
| `Tables` | array | No | List of table schemas in this database |

#### Table

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Name` | string | Yes | The fully qualified table name (e.g., `"dbo.Orders"`) |
| `Description` | string | No | Human-readable description. Helps the AI understand what the table contains. |
| `Fields` | array | No | List of field schemas in this table |

#### Field

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Name` | string | Yes | The actual column name in the database |
| `Alias` | string | No | Display alias for the field (e.g., `"Order Date"` for `"OrderDate"`) |
| `Description` | string | No | Human-readable description. Helps the AI understand what the field represents. |
| `Expression` | string | No | Calculation to perform when using this field in a dashboard. Can refer to existing fields in the table. If this value is set, it transforms this field into a predefined calculated field the AI can pick. It's important that `"Name"` is unique (not an existing field in the table). |
| `ExpressionType` | string | Yes if `"Expression` is set | Type of calculated field that will be created for this expression: `"CalculatedField"` (for pre-calculated values) or `"PostCalculatedField"` (for post-calculated values). |
| `DataType` | string | Yes if `"Expression"` is set | The return datatype of the `Expression` defined for this field. Possibe values are: `"String"`, `"Number"`, `"Percentage"`, `"Currency"`, `"Date"`, `"DateTime"`, `"Time"`. |

### Provider Types

Common provider values:

| Provider | Description |
|----------|-------------|
| `SQLServer` | Microsoft SQL Server |
| `PostgreSQL` | PostgreSQL |
| `MySQL` | MySQL |
| `Oracle` | Oracle (Service Name) |
| `OracleSID` | Oracle (SID) |
| `SSAS` | SQL Server Analysis Services |
| `SSASHTTP` | SQL Server Analysis Services (HTTP) |
| `Snowflake` | Snowflake |
| `BigQuery` | Google BigQuery |
| `AmazonAthena` | Amazon Athena |
| `AmazonRedshift` | Amazon Redshift |
| `MongoDB` | MongoDB |
| `WebService` | Web Service / REST API / Excel files |

---

## Catalog Sources

The catalog can be loaded from a JSON file on disk or from a completely custom provider (e.g., database-backed).

### Option 1: JSON File on Disk

Store the catalog in a standalone JSON file. This is the simplest approach and is useful when you want to manage datasource definitions separately from application settings, share them across environments, or generate them from a CI/CD pipeline.

**1. Create a catalog file:**

```json title="config/catalog.json"
{
  "Datasources": [
    {
      "Id": "NorthwindDB",
      "Provider": "SQLServer",
      "Databases": [
        {
          "Name": "Northwind",
          "DiscoveryMode": "Restricted",
          "Tables": [
            { "Name": "dbo.Orders", "Description": "Customer purchase orders" },
            { "Name": "dbo.Customers", "Description": "Customer contact information" },
            { "Name": "dbo.Products", "Description": "Product catalog" }
          ]
        }
      ]
    }
  ]
}
```

**2. Point the builder at the file:**

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .UseMetadataCatalogFile("config/catalog.json")
    .AddOpenAI();
```

  </TabItem>

  <TabItem value="node" label="Node.js">

Pass the catalog path via the `metadataCatalogFile` option of the AI plugin:

```javascript title="server.js"
const path = require('path');

revealAI.withOptions({
    defaultProvider: 'openai',
    settings: aiSettings,
    metadataCatalogFile: path.resolve(__dirname, 'config', 'catalog.json')
});
```

  </TabItem>

  <TabItem value="java" label="Java">

Pass the catalog path as the second argument to `RevealAIPluginOptions`:

```java title="Application.java"
RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "openai",
        Path.of("src", "main", "resources", "Reveal", "Metadata", "catalog.json")
                .toAbsolutePath().normalize().toString(),
        null,
        null,
        Map.of("settings", aiSettings));
```

  </TabItem>
</Tabs>

Both absolute and relative paths are supported. Relative paths are resolved against the application's current working directory.

### Option 2: Custom Provider

:::info ASP.NET Core only

The `IMetadataCatalogProvider` extension point is currently available on **ASP.NET Core** only. Node.js and Java applications must use the JSON file approach described above.

:::

Implement `IMetadataCatalogProvider` to load datasource definitions from any source — a database, an API, a key vault, or anything else.

**1. Implement the interface:**

```csharp title="DatabaseCatalogProvider.cs"
using Reveal.Sdk.AI.Metadata.Catalog;

public class DatabaseCatalogProvider : IMetadataCatalogProvider
{
    private readonly IMyDatasourceRepository _repository;

    public DatabaseCatalogProvider(IMyDatasourceRepository repository)
    {
        _repository = repository;
    }

    public async Task<MetadataCatalog> GetCatalogAsync()
    {
        var datasources = await _repository.GetAllDatasourcesAsync();

        return new MetadataCatalog
        {
            Datasources = datasources.Select(ds => new DatasourceSchema
            {
                Id = ds.Id,
                Provider = Enum.Parse<Provider>(ds.ProviderType)
            }).ToList()
        };
    }
}
```

**2. Register the provider:**

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .UseMetadataCatalogProvider<DatabaseCatalogProvider>()
    .AddOpenAI();
```

Your provider class is resolved through dependency injection, so you can inject any services you need in the constructor.

---

## Metadata Manager Options

The **Metadata Manager** controls where generated metadata files are written on disk. These files are ephemeral — they are generated automatically and can be regenerated at any time.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```json title="appsettings.json"
{
  "RevealAI": {
    "MetadataManager": {
      "OutputPath": "D:\\metadata\\output"
    }
  }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript title="server.js"
const path = require('path');
const os = require('os');

revealAI.withOptions({
    defaultProvider: 'openai',
    settings: aiSettings,
    metadataCatalogFile: 'config/catalog.json',
    metadataManager: {
        outputPath: path.resolve(os.homedir(), 'AImetadata')
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java title="Application.java"
RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "openai",
        "config/catalog.json",
        new RevealAIPluginOptions.MetadataManagerOptions(
                Path.of(System.getProperty("user.home"), "AImetadata").toString()),
        null,
        Map.of("settings", aiSettings));
```

  </TabItem>
</Tabs>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `OutputPath` | string | No | Directory where generated metadata files are stored. Defaults to `{user-home}/reveal/ai/metadata`. |

---

## Metadata Service Options

The **Metadata Service** controls *when* metadata is generated. You can trigger generation at application startup, on a recurring schedule, or both.

:::info ASP.NET Core only

Scheduled metadata generation via `MetadataService` is currently available on **ASP.NET Core** only. On Node.js and Java, metadata is generated on demand when the AI plugin needs it.

:::

```json title="appsettings.json"
{
  "RevealAI": {
    "MetadataService": {
      "GenerateOnStartup": true,
      "CronSchedule": "0 0 * * *"
    }
  }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `GenerateOnStartup` | boolean | No | When `true`, generates metadata when the application starts. Defaults to `false`. |
| `CronSchedule` | string | No | Cron expression for recurring metadata generation (e.g., `"0 0 * * *"` for daily at midnight). |

---

## Complete Configuration Example

Here is a complete example showing the catalog file, configuration, and server registration for each platform:

```json title="config/catalog.json"
{
  "Datasources": [
    {
      "Id": "NorthwindDB",
      "Provider": "SQLServer",
      "Databases": [
        {
          "Name": "Northwind",
          "DiscoveryMode": "Restricted",
          "Tables": [
            {
              "Name": "dbo.Orders",
              "Description": "Customer purchase orders",
              "Fields": [
                { "Name": "OrderDate", "Alias": "Order Date", "Description": "Date the order was placed" },
                { "Name": "ShipCountry", "Alias": "Ship Country" }
              ]
            },
            {
              "Name": "dbo.Customers",
              "Description": "Customer contact information"
            }
          ]
        }
      ]
    },
    {
      "Id": "SalesExcel",
      "Provider": "WebService"
    }
  ]
}
```

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```json title="appsettings.json"
{
  "RevealAI": {
    "OpenAI": {
      "ApiKey": "sk-your-api-key-here"
    },
    "MetadataManager": {
      "OutputPath": "D:\\metadata\\output"
    },
    "MetadataService": {
      "GenerateOnStartup": true,
      "CronSchedule": "0 0 * * *"
    }
  }
}
```

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .UseMetadataCatalogFile("config/catalog.json")
    .AddOpenAI();
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript title="server.js"
const reveal = require('reveal-sdk-node');
const revealAI = require('reveal-sdk-node-ai');
const express = require('express');
const path = require('path');

const aiSettings = {
    openai: {
        ApiKey: process.env.OPENAI_API_KEY,
        Model: 'gpt-4.1'
    }
};

const revealOptions = {
    plugins: [
        revealAI.withOptions({
            defaultProvider: 'openai',
            settings: aiSettings,
            metadataCatalogFile: path.resolve(__dirname, 'config', 'catalog.json'),
            metadataManager: {
                outputPath: path.resolve('D:', 'metadata', 'output')
            }
        })
    ]
};

const app = express();
app.use('/', reveal(revealOptions));
app.listen(5111);
```

  </TabItem>

  <TabItem value="java" label="Java">

```java title="Application.java"
Map<String, Object> aiSettings = Map.of(
        "openai", Map.of(
                "ApiKey", System.getenv("OPENAI_API_KEY"),
                "Model", "gpt-4.1"));

RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "openai",
        Path.of("config", "catalog.json").toAbsolutePath().normalize().toString(),
        new RevealAIPluginOptions.MetadataManagerOptions(
                Path.of("D:", "metadata", "output").toString()),
        null,
        Map.of("settings", aiSettings));

IRevealServer revealServer = new RevealServerBuilder()
        .addPlugin(RevealAIPlugin.withOptions(aiPluginOptions))
        .build();
```

  </TabItem>
</Tabs>
