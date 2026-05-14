---
sidebar_label: メタデータカタログ
---


# メタデータカタログ

**メタデータカタログ**は、Reveal SDK AI で利用可能なデータソースの中心的な定義です。AI に対して、どのようなデータ接続が存在し、各接続がどのプロバイダーを使用し、オプションでそのデータベース、テーブル、フィールドを記述します。**チャット**と**メタデータサービス**の両機能は、データの全体像を理解するためにカタログに依存しています。

## 仕組み

メタデータシステムには、3つの異なる責務があります:

| 関心事 | 目的 |
|---------|---------|
| **メタデータカタログ** | どのデータソースが存在し、どのような構造になっているか |
| **メタデータマネージャー** | 生成されたメタデータファイルがディスク上のどこに書き込まれるか |
| **メタデータサービス** | メタデータ生成がいつ実行されるか（起動時、スケジュール） |

設定が必要なのは**カタログ**のみです。マネージャーとサービスには適切なデフォルト値があり、設定は任意です。

---

## カタログスキーマ

カタログは `Datasources` 配列を持つ JSON オブジェクトです。各エントリは、プロバイダーとオプションのスキーマ詳細を含むデータソースを定義します。

### 最小限の例

最低限、各データソースには `Id` と `Provider` が必要です:

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

### スキーマリファレンス

#### データソース

| プロパティ | 型 | 必須 | 説明 |
|----------|------|----------|-------------|
| `Id` | string | はい | データソースの一意の識別子。API リクエストで `datasourceId` として使用されます。 |
| `Provider` | string | はい | データプロバイダーの種類（以下の[プロバイダータイプ](#provider-types)を参照） |
| `Databases` | array | いいえ | このデータソースで利用可能なデータベーススキーマのリスト |

#### データベース

| プロパティ | 型 | 必須 | 説明 |
|----------|------|----------|-------------|
| `Name` | string | はい | データベースの名前 |
| `DiscoveryMode` | string | いいえ | `"Default"`（すべてのテーブルを検出）または `"Restricted"`（リストされたテーブルのみ）。デフォルトは `"Default"` です。 |
| `Tables` | array | いいえ | このデータベース内のテーブルスキーマのリスト |

#### テーブル

| プロパティ | 型 | 必須 | 説明 |
|----------|------|----------|-------------|
| `Name` | string | はい | 完全修飾テーブル名（例: `"dbo.Orders"`） |
| `Description` | string | いいえ | 人間が読める説明。テーブルの内容を AI が理解するのに役立ちます。 |
| `Fields` | array | いいえ | このテーブル内のフィールドスキーマのリスト |

#### フィールド

| プロパティ | 型 | 必須 | 説明 |
|----------|------|----------|-------------|
| `Name` | string | はい | データベース内の実際のカラム名 |
| `Alias` | string | いいえ | フィールドの表示エイリアス（例: `"OrderDate"` に対して `"Order Date"`） |
| `Description` | string | いいえ | 人間が読める説明。フィールドが何を表しているかを AI が理解するのに役立ちます。 |

### プロバイダータイプ {#provider-types}

一般的なプロバイダー値:

| プロバイダー | 説明 |
|----------|-------------|
| `SQLServer` | Microsoft SQL Server |
| `PostgreSQL` | PostgreSQL |
| `MySQL` | MySQL |
| `Oracle` | Oracle（サービス名） |
| `OracleSID` | Oracle（SID） |
| `SSAS` | SQL Server Analysis Services |
| `SSASHTTP` | SQL Server Analysis Services（HTTP） |
| `Snowflake` | Snowflake |
| `BigQuery` | Google BigQuery |
| `AmazonAthena` | Amazon Athena |
| `AmazonRedshift` | Amazon Redshift |
| `MongoDB` | MongoDB |
| `WebService` | Web サービス / REST API / Excel ファイル |

---

## カタログソース

カタログは、ディスク上の JSON ファイルから読み込むか、完全なカスタムプロバイダー（例: データベースバックエンド）から読み込むことができます。

### オプション 1: ディスク上の JSON ファイル

カタログを独立した JSON ファイルに保存します。これは最もシンプルなアプローチで、データソース定義をアプリケーション設定とは別に管理したい場合、環境間で共有したい場合、または CI/CD パイプラインから生成したい場合に便利です。

**1. カタログファイルの作成:**

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

絶対パスと相対パスの両方がサポートされています。相対パスはアプリケーションの現在の作業ディレクトリを基準に解決されます。

### オプション 2: カスタムプロバイダー

`IMetadataCatalogProvider` を実装して、任意のソース（データベース、API、キー保管庫など）からデータソース定義を読み込みます。

**1. インターフェースの実装:**

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

**2. プロバイダーの登録:**

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .UseMetadataCatalogProvider<DatabaseCatalogProvider>()
    .AddOpenAI();
```

プロバイダークラスは依存性注入を通じて解決されるため、コンストラクタで必要なサービスを注入できます。

---

## メタデータマネージャーオプション

**メタデータマネージャー**は、生成されたメタデータファイルがディスク上のどこに書き込まれるかを制御します。これらのファイルは一時的なものであり、自動的に生成され、いつでも再生成できます。

```json title="appsettings.json"
{
  "RevealAI": {
    "MetadataManager": {
      "OutputPath": "D:\\metadata\\output"
    }
  }
}
```

| プロパティ | 型 | 必須 | 説明 |
|----------|------|----------|-------------|
| `OutputPath` | string | いいえ | 生成されたメタデータファイルが保存されるディレクトリ。デフォルトは `{user-home}/reveal/ai/metadata` です。 |

---

## メタデータサービスオプション

**メタデータサービス**は、メタデータがいつ生成されるかを制御します。アプリケーション起動時、定期的なスケジュール、またはその両方で生成をトリガーできます。

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

| プロパティ | 型 | 必須 | 説明 |
|----------|------|----------|-------------|
| `GenerateOnStartup` | boolean | いいえ | `true` の場合、アプリケーション起動時にメタデータを生成します。デフォルトは `false` です。 |
| `CronSchedule` | string | いいえ | 定期的なメタデータ生成のための Cron 式（例: 毎日深夜に実行する場合は `"0 0 * * *"`）。 |

---

## 完全な設定例

カタログファイル、マネージャーとサービスオプション用の `appsettings.json`、および `Program.cs` のセットアップを示す完全な例を以下に示します:

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
