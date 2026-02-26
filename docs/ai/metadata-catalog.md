---
sidebar_label: Metadata Catalog
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

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

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .UseMetadataCatalogFile("config/catalog.json")
    .AddOpenAI();
```

Both absolute and relative paths are supported. Relative paths are resolved against the application's current working directory.

### Option 2: Custom Provider

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

```json title="appsettings.json"
{
  "RevealAI": {
    "MetadataManager": {
      "OutputPath": "D:\\metadata\\output"
    }
  }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `OutputPath` | string | No | Directory where generated metadata files are stored. Defaults to `{user-home}/reveal/ai/metadata`. |

---

## Metadata Service Options

The **Metadata Service** controls *when* metadata is generated. You can trigger generation at application startup, on a recurring schedule, or both.

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

Here is a complete example showing a catalog file, `appsettings.json` for the manager and service options, and the `Program.cs` setup:

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
