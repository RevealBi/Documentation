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
| `DiscoveryMode` | string | No | `"Default"` (discover all tables) or `"Restricted"` (only listed tables). Defaults to `"Default"`. See [Restricting Tables and Fields](#restricting-tables-and-fields). |
| `Tables` | array | No | List of table schemas in this database |

#### Table

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Name` | string | Yes | The fully qualified table name (e.g., `"dbo.Orders"`) |
| `Description` | string | No | Human-readable description. Helps the AI understand what the table contains. |
| `DiscoveryMode` | string | No | `"Default"` (the AI sees every field) or `"Restricted"` (the AI sees only the listed fields). Defaults to `"Default"`. See [Restricting Tables and Fields](#restricting-tables-and-fields). |
| `Fields` | array | No | List of field schemas in this table |

#### Field

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Name` | string | Yes | The actual column name in the database |
| `Alias` | string | No | Display alias for the field (e.g., `"Order Date"` for `"OrderDate"`) |
| `Description` | string | No | Human-readable description. Helps the AI understand what the field represents. |
| `Expression` | string | No | Calculation to perform when using this field in a dashboard. Can refer to existing fields in the table. If this value is set, it transforms this field into a predefined calculated field the AI can pick. It's important that `Name` is unique (not an existing field in the table). |
| `ExpressionType` | string | Yes if `Expression` is set | Type of calculated field that will be created for this expression: `"CalculatedField"` (for pre-calculated values) or `"PostCalculatedField"` (for post-calculated values). |
| `DataType` | string | Yes if `Expression` is set | The return datatype of the `Expression` defined for this field. Possible values are: `"String"`, `"Number"`, `"Percentage"`, `"Currency"`, `"Date"`, `"DateTime"`, `"Time"`. |

### Restricting Tables and Fields

By default, the AI can see every table in a database and every field in a table. Use `DiscoveryMode` to limit what it sees:

- On a **database**, `"Restricted"` limits the AI to the tables listed in `Tables`.
- On a **table**, `"Restricted"` limits the AI to the fields listed in `Fields`.

The two settings are independent. A table can restrict its fields whether its database is `"Restricted"` or `"Default"`.

```json
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
            { "Name": "dbo.Orders" },
            {
              "Name": "dbo.Employees",
              "DiscoveryMode": "Restricted",
              "Fields": [
                { "Name": "EmployeeID" },
                { "Name": "FirstName" },
                { "Name": "LastName" },
                { "Name": "Title", "Description": "Job title" }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

In this example, the AI sees only the `dbo.Orders` and `dbo.Employees` tables. It sees every field of `dbo.Orders`, but only four fields of `dbo.Employees`. Columns such as `BirthDate`, `HomePhone` and `Address` are not described to the AI, and it cannot use them in a dashboard, even if a user asks for them by name.

Keep the following in mind:

- **Listing fields alone doesn't restrict them.** In `"Default"` mode, `Fields` only adds descriptions, aliases and calculated fields; every other field stays visible. Set `"DiscoveryMode": "Restricted"` on the table to hide the fields you don't list.
- **A restricted table needs a `Fields` list.** A `"Restricted"` table without `Fields` restricts nothing, the same as a `"Restricted"` database without `Tables`. An empty list (`"Fields": []`) hides every column.
- **Calculated fields can use hidden columns.** Fields defined with an `Expression` are always available to the AI. A calculated field (`"ExpressionType": "CalculatedField"`) can use a hidden column, such as `[Salary] / 12` with `Salary` left out of the list: generated dashboards still query the hidden column to compute it, but the AI can't use the column itself. The expression text is shown to the AI, so it reveals the hidden column's name. A post-calculated field (`"PostCalculatedField"`) works on a widget's values, so it can only use listed fields.
- **Your own descriptions are used as written.** Table and field descriptions from the catalog are shown to the AI as they are. Don't mention hidden columns in them.
- **Names must match exactly, apart from case.** `"title"` matches the `Title` column, but a table name must include its schema, as in `"dbo.Employees"`. Check the server log after generating a datasource's metadata: a warning names each restricted table that matched no table, whose fields were then left visible, and each listed field that matched no column.
- **It controls what the AI sees, not data access.** People who edit a dashboard in Reveal can still browse the datasource's columns.

#### Cubes

For cube providers (such as `SSAS` and `SSASHTTP`), each entry in `Databases` is a catalog and each entry in `Tables` is a cube. `"Restricted"` on a catalog limits the AI to the listed cubes. `"Restricted"` on a cube limits it to the listed measures, dimensions and hierarchies, using their unique names:

```json
{
  "Datasources": [
    {
      "Id": "AdventureWorksCube",
      "Provider": "SSASHTTP",
      "Databases": [
        {
          "Name": "Adventure Works DW 2008R2",
          "DiscoveryMode": "Restricted",
          "Tables": [
            {
              "Name": "Finance",
              "DiscoveryMode": "Restricted",
              "Fields": [
                { "Name": "[Measures].[Amount]" },
                { "Name": "[Account].[Accounts]" },
                { "Name": "[Date]" }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

Because a hierarchy can't be used partially, a cube is restricted in whole units:

| You list | The AI sees |
|----------|-------------|
| A measure (`[Measures].[Amount]`) | That measure |
| A dimension (`[Date]`) | The dimension, with all its hierarchies, levels and sets |
| A hierarchy (`[Account].[Accounts]`) | The hierarchy, with its levels and sets, inside its dimension |
| A level or a set | Nothing on its own. List its hierarchy or dimension instead. |

In this example, the AI sees the `Amount` measure, the `Accounts` hierarchy of the `Account` dimension, and everything in the `Date` dimension. The cube's other measures and dimensions, such as `Department` and `Scenario`, are hidden.

#### Applying a Change

`DiscoveryMode` is applied when metadata is generated. Metadata that was already generated keeps the old tables and fields until it is generated again. After you change a restriction, remove the datasource's generated metadata (by default, the files in the [metadata output folder](#metadata-manager-options) whose names start with the datasource `Id`). The next time metadata generation runs, for example at startup or on the [schedule](#metadata-service-options), the datasource's metadata is generated again with the new restriction.

### Provider Types

Common provider values:

| Provider | Description |
|----------|-------------|
| `Cube` | Cube |
| `SQLServer` | Microsoft SQL Server |
| `SQLite` | SQLite |
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

Use the exact provider names shown above in your metadata catalog.

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
