---
sidebar_label: メタデータ カタログ
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# メタデータ カタログ

**メタデータ カタログ**は、Reveal SDK AI で使用可能なデータ ソースの中央定義です。各データ接続の存在、使用するプロバイダー、およびオプションのデータベース、テーブル、フィールドの説明を AI に伝えます。**チャット**と**メタデータ サービス**の両方の機能が、データの全体像を理解するためにカタログに依存しています。

## 仕組み

メタデータ システムには 3 つの異なる責務があります:

| 対象 | 構成セクション | 目的 |
|---------|---------------|---------|
| **メタデータ カタログ** | `RevealAI:MetadataCatalog` | どのデータ ソースが存在し、どのように構成されているか |
| **メタデータ マネージャー** | `RevealAI:MetadataManager` | 生成されたメタデータ ファイルがディスクに書き込まれる場所 |
| **メタデータ サービス** | `RevealAI:MetadataService` | メタデータ生成がいつ実行されるか (起動時、スケジュール) |

**カタログ**は、構成が必要な唯一の要素です。マネージャーとサービスには適切なデフォルト値があり、オプションです。

---

## カタログ スキーマ

カタログは、`Datasources` 配列を持つ JSON オブジェクトです。各エントリは、プロバイダーとオプションのスキーマ詳細を含むデータ ソースを定義します。

### 最小限のサンプル

最低限、各データ ソースには `Id` と `Provider` が必要です:

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

### 完全なスキーマ

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

### スキーマ リファレンス

#### データ ソース

| プロパティ | タイプ | 必須 | 説明 |
|----------|------|----------|-------------|
| `Id` | string | はい | データ ソースの一意の識別子。API リクエストで `datasourceId` として使用されます。 |
| `Provider` | string | はい | データ プロバイダー タイプ (下記の[プロバイダー タイプ](#プロバイダー-タイプ)を参照) |
| `Databases` | array | いいえ | このデータ ソースで使用可能なデータベース スキーマのリスト |

#### データベース

| プロパティ | タイプ | 必須 | 説明 |
|----------|------|----------|-------------|
| `Name` | string | はい | データベースの名前 |
| `DiscoveryMode` | string | いいえ | `"Default"` (すべてのテーブルを検出) または `"Restricted"` (一覧表示されたテーブルのみ)。デフォルトは `"Default"`。 |
| `Tables` | array | いいえ | このデータベースのテーブル スキーマのリスト |

#### テーブル

| プロパティ | タイプ | 必須 | 説明 |
|----------|------|----------|-------------|
| `Name` | string | はい | 完全修飾テーブル名 (例: `"dbo.Orders"`) |
| `Description` | string | いいえ | テーブルの内容を AI が理解するのに役立つ説明。 |
| `Fields` | array | いいえ | このテーブルのフィールド スキーマのリスト |

#### フィールド

| プロパティ | タイプ | 必須 | 説明 |
|----------|------|----------|-------------|
| `Name` | string | はい | データベースの実際の列名 |
| `Alias` | string | いいえ | フィールドの表示エイリアス (例: `"OrderDate"` に対する `"Order Date"`) |
| `Description` | string | いいえ | フィールドが何を表すかを AI が理解するのに役立つ説明。 |

### プロバイダー タイプ

一般的なプロバイダー値:

| プロバイダー | 説明 |
|----------|-------------|
| `SQLServer` | Microsoft SQL Server |
| `PostgreSQL` | PostgreSQL |
| `MySQL` | MySQL |
| `Oracle` | Oracle (サービス名) |
| `OracleSID` | Oracle (SID) |
| `SSAS` | SQL Server Analysis Services |
| `SSASHTTP` | SQL Server Analysis Services (HTTP) |
| `Snowflake` | Snowflake |
| `BigQuery` | Google BigQuery |
| `AmazonAthena` | Amazon Athena |
| `AmazonRedshift` | Amazon Redshift |
| `MongoDB` | MongoDB |
| `WebService` | Web サービス / REST API / Excel ファイル |

---

## カタログ ソース

デフォルトでは、カタログは `appsettings.json` から読み込まれます。ソースをディスク上の JSON ファイルや完全なカスタム プロバイダー (データベースなど) に変更できます。

### オプション 1: appsettings.json (デフォルト)

`appsettings.json` の `RevealAI:MetadataCatalog` セクションでデータ ソースを直接定義します。最も簡単なオプションで、追加の構成は不要です。

```json title="appsettings.json"
{
  "RevealAI": {
    "OpenAI": {
      "ApiKey": "sk-your-api-key-here"
    },
    "MetadataCatalog": {
      "Datasources": [
        {
          "Id": "NorthwindDB",
          "Provider": "SQLServer"
        },
        {
          "Id": "AnalyticsExcel",
          "Provider": "WebService"
        }
      ]
    }
  }
}
```

```csharp title="Program.cs"
// 追加の構成は不要 — appsettings がデフォルトのソースです
builder.Services.AddRevealAI()
    .AddOpenAI();
```

### オプション 2: ディスク上の JSON ファイル

カタログをスタンドアロンの JSON ファイルに保存します。データ ソース定義をアプリケーション設定とは別に管理したい場合、環境間で共有したい場合、または CI/CD パイプラインから生成したい場合に便利です。

**1. カタログ ファイルを作成:**

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

**2. ビルダーでファイルを指定:**

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .UseMetadataCatalogFile("config/catalog.json")
    .AddOpenAI();
```

絶対パスと相対パスの両方がサポートされています。相対パスは、アプリケーションの現在の作業ディレクトリに対して解決されます。

### オプション 3: カスタム プロバイダー

`IMetadataCatalogProvider` を実装して、データベース、API、キー ボールト、またはその他のソースからデータ ソース定義を読み込みます。

**1. インターフェイスを実装:**

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

**2. プロバイダーを登録:**

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .UseMetadataCatalogProvider<DatabaseCatalogProvider>()
    .AddOpenAI();
```

プロバイダー クラスは依存関係の注入 (DI) を通じて解決されるため、コンストラクターで必要なサービスを注入できます。

---

## メタデータ マネージャー オプション

**メタデータ マネージャー**は、生成されたメタデータ ファイルがディスクに書き込まれる場所を制御します。これらのファイルは一時的なもので、自動的に生成され、いつでも再生成できます。

```json title="appsettings.json"
{
  "RevealAI": {
    "MetadataManager": {
      "OutputPath": "D:\\metadata\\output"
    }
  }
}
```

| プロパティ | タイプ | 必須 | 説明 |
|----------|------|----------|-------------|
| `OutputPath` | string | いいえ | 生成されたメタデータ ファイルが保存されるディレクトリ。デフォルトは `{user-home}/reveal/ai/metadata`。 |

---

## メタデータ サービス オプション

**メタデータ サービス**は、メタデータが生成されるタイミングを制御します。アプリケーションの起動時、定期的なスケジュール、またはその両方で生成をトリガーできます。

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

| プロパティ | タイプ | 必須 | 説明 |
|----------|------|----------|-------------|
| `GenerateOnStartup` | boolean | いいえ | `true` の場合、アプリケーションの起動時にメタデータを生成します。デフォルトは `false`。 |
| `CronSchedule` | string | いいえ | 定期的なメタデータ生成の Cron 式 (例: `"0 0 * * *"` は毎日深夜)。 |

---

## 完全な構成サンプル

3 つのセクションすべてを含む完全な `appsettings.json` を以下に示します:

```json title="appsettings.json"
{
  "RevealAI": {
    "OpenAI": {
      "ApiKey": "sk-your-api-key-here"
    },
    "MetadataCatalog": {
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
    .AddOpenAI();
```

追加のコードは不要です。カタログ、マネージャー、サービスはすべて `appsettings.json` から自動的に構成されます。
