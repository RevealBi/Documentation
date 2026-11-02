---
sidebar_label: メタデータ生成エンドポイント
sidebar_custom_props:
  status: preview
---

# メタデータ生成エンドポイント

Reveal SDK AI は、[メタデータカタログ](metadata-catalog.md)内のデータソースのメタデータ (データベース、テーブル、フィールド、キャッシュされたフィルター値、フィールドの統計情報) を生成します。[メタデータサービス](metadata-catalog.md#metadata-service-options)は、起動時またはスケジュールに従ってメタデータを生成できます。メタデータ生成エンドポイントを使用すると、すべてのデータソース、または指定したデータソース、データベース、テーブルのみを対象に、必要なときに生成を実行できます。

変更された部分のみを生成すると、次のような場合に便利です:

- テーブルの列が追加または削除され、そのテーブルのメタデータのみを更新する必要がある場合。
- メタデータがすでにあるデータソースに、新しいデータベースまたはテーブルが追加された場合。
- 保存されているテーブルのドキュメントが欠落または破損しており、データソース全体を再生成せずに修復したい場合。

このエンドポイントは ASP.NET Core、Node.js、Java で使用でき、パスは他の AI エンドポイントと同じです。

---

## エンドポイント

```
POST /api/reveal/ai/metadata/generate
```

生成はバックグラウンドで実行されます。エンドポイントは `202 Accepted` と生成される内容をすぐに返し、処理はレスポンスの送信後も続行されます。

## リクエスト形式 {#request-format}

```typescript
{
  // What to generate. Omit it to generate every datasource.
  targets?: [
    {
      datasourceId: string,    // Catalog datasource Id
      database?: string,       // Omit for any database
      tables?: string[]        // Omit for every table
    }
  ],

  forceRegeneration?: boolean, // Regenerate even when metadata already exists (default: false)
  forceReload?: boolean        // Reload the datasources before generating (default: false)
}
```

### リクエストパラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|----------|-------------|
| `targets` | array | いいえ | メタデータを生成するデータソース、データベース、テーブル。省略した場合は、カタログ内のすべてのデータソースが生成されます。指定する場合は、空にできません。 |
| `forceRegeneration` | boolean | いいえ | `true` の場合、メタデータがすでにあっても再生成します。[ターゲットの生成方法](#how-targets-are-generated)を参照してください。既定値は `false` です。 |
| `forceReload` | boolean | いいえ | `true` の場合、生成の前にデータソースを再読み込みします。既定値は `false` です。 |
| `datasourceIds` | string[] | いいえ | **非推奨。** 代わりに `targets` を使用してください。`{ "datasourceId": "Sales" }` は `"datasourceIds": ["Sales"]` とまったく同じように動作します。`targets` と同時には指定できません。 |

### ターゲットのプロパティ

| プロパティ | 型 | 必須 | 説明 |
|----------|------|----------|-------------|
| `datasourceId` | string | はい | メタデータカタログ内のデータソースの `Id`。 |
| `database` | string | いいえ | データベース名 (XMLA データソースの場合はカタログ)。省略した場合、ターゲットは任意のデータベースに適用されます。 |
| `tables` | string[] | いいえ | テーブル名 (XMLA データソースの場合はキューブ)。データソースにスキーマがある場合はスキーマ修飾名で指定します (例: `dbo.Orders`)。省略した場合、ターゲットはすべてのテーブルを対象とします。 |

「任意の」または「すべての」を指定する方法は、`database` または `tables` を省略することだけです:

| ターゲット | 生成される内容 |
|--------|-----------|
| `{ "datasourceId": "HR" }` | データソース全体 |
| `{ "datasourceId": "Sales", "database": "Northwind" }` | `Northwind` データベースのすべてのテーブル |
| `{ "datasourceId": "Sales", "database": "Northwind", "tables": ["dbo.Orders"] }` | `Northwind` 内の `dbo.Orders` |
| `{ "datasourceId": "Sales", "tables": ["dbo.Orders"] }` | `dbo.Orders` を含むすべてのデータベース内の `dbo.Orders` |
| `{ "datasourceId": "SalesExcel", "tables": ["Sheet1"] }` | `Sheet1` (Excel ファイルなど、データベースを持たないソースの場合) |

### リクエストの例

```json
{
  "targets": [
    { "datasourceId": "NorthwindDB", "database": "Northwind", "tables": ["dbo.Orders", "dbo.Customers"] },
    { "datasourceId": "SalesDB", "database": "Sales" },
    { "datasourceId": "HR" }
  ],
  "forceRegeneration": false
}
```

<details>
<summary>拒否されるリクエスト</summary>

指定の誤りが知らないうちに「すべてを生成」にならないよう、リクエストは厳密に検証されます。次の場合は `400 Bad Request` が返され、何も生成されません:

- `targets` リストまたは `tables` リストが空の場合。
- `tables` に `"*"` のエントリがある場合 (代わりに `tables` を省略してください)。
- `datasourceId`、`database`、またはテーブル名が空または空白の場合、または先頭や末尾に空白がある場合。
- `targets` と `datasourceIds` の両方を指定した場合。
- リクエストまたはターゲットに不明な JSON プロパティがある場合。たとえば、`"target"` のようなスペルミスは、検証しなければ無視され、すべてのデータソースが生成されてしまいます。

</details>

---

## ターゲットの生成方法 {#how-targets-are-generated}

### データソース全体

`datasourceId` のみを指定したターゲットは、データソース全体を対象とします。非推奨の `datasourceIds` とまったく同じように動作します:

- **`forceRegeneration` を指定した場合**、データソースのメタデータは削除されてから再構築されるため、ソースに存在しなくなったテーブルは削除されます。
- **指定しない場合**、メタデータがすでにあるデータソースはスキップされます。

1 つのデータソースにデータソース全体のターゲットと他のターゲットの両方がある場合は、他のターゲットを含むデータソース全体のターゲットが優先されます。

### データベースとテーブル

その他のターゲットは、指定したテーブルのみを生成し、データソースの既存のメタデータにマージします:

- ターゲット以外は再生成も削除もされません。データソースの残りの部分は、編集した説明を含め、メタデータをそのまま保持します。
- ターゲットのテーブルは、ソースに存在しなくなった場合でも削除されません。削除されたテーブルは、スペルミスや一時的な空の結果と区別できないためです。テーブルを削除するには、`forceRegeneration` を指定してデータソース全体を再生成します。
- **`forceRegeneration` を指定しない場合**、ターゲットのテーブルのメタデータが完全で、スキーマが変更されていなければ、そのテーブルはスキップされます。列が追加または削除されたテーブルは再生成されます。
- **`forceRegeneration` を指定した場合**、ターゲットのすべてのテーブルが再生成されます。
- 読み取れない保存済みのテーブルのドキュメント (書き込みが中断された後など) は欠落として扱われるため、そのテーブルをターゲットにすると修復されます。

データソースには、すでにメタデータがある必要があります。メタデータがない、または前回の生成が失敗したデータソースのデータベースやテーブルを生成するには、まずデータソース全体を生成してください。

### カタログによる制限 {#catalog-restrictions}

ターゲットは、データソースのカタログ定義と照合されます。カタログにデータソースの `Databases` が記載されている場合は、それらのデータベースのみをターゲットにでき、`"DiscoveryMode": "Restricted"` のデータベースでは、記載されているテーブルのみをターゲットにできます。カタログで許可されていないターゲットは、黙ってスキップされるのではなく拒否されます。

`database` を指定しないターゲットは、カタログで許可されている各データベースに適用されます。制限されたデータベースで `tables` を指定しないターゲットは、そのデータベースに記載されているテーブルを対象とします。

### 中断された生成 {#interrupted-generation}

ターゲットを指定した生成が、実行中にキャンセルされた場合、失敗した場合、またはアプリケーションが再起動した場合は、同じリクエストをもう一度送信してください。メタデータが完了していないテーブルは、`forceRegeneration` を指定しなくても再生成されます。

また、[メタデータサービス](metadata-catalog.md#metadata-service-options)は、生成ですでに書き換えられたテーブルの処理 (フィールドの統計情報とエンリッチメント) を、次回の実行時に完了します。次回の実行とは、既定で有効になっている起動時の実行、または `CronSchedule` に従った実行です。処理されるのはそれらのテーブルのみで、データソース全体ではありません。

---

## レスポンス形式

### 202 Accepted

生成が開始されました。`targets` を指定しない場合、レスポンスは開始を確認するだけです:

```json
{
  "message": "Metadata generation started",
  "forceRegeneration": false
}
```

`targets` を指定した場合、レスポンスには各データソースで実行される内容も含まれます:

```json
{
  "message": "Metadata generation started",
  "forceRegeneration": false,
  "datasources": [
    {
      "datasourceId": "NorthwindDB",
      "mode": "targeted",
      "reason": null,
      "targets": [
        { "database": "Northwind", "tables": ["dbo.Orders", "dbo.Customers"] }
      ]
    },
    {
      "datasourceId": "SalesDB",
      "mode": "targeted",
      "reason": null,
      "targets": [
        { "database": "Sales" }
      ]
    },
    {
      "datasourceId": "HR",
      "mode": "skipped",
      "reason": "The datasource already has metadata; set forceRegeneration to regenerate it.",
      "targets": null
    }
  ]
}
```

| プロパティ | 型 | 説明 |
|----------|------|-------------|
| `datasourceId` | string | リクエストで指定されたデータソース。 |
| `mode` | string | `"full"`: データソース全体が生成されます。`"targeted"`: `targets` のみが生成され、既存のメタデータにマージされます。`"skipped"`: データソース全体にすでにメタデータがあり、`forceRegeneration` が `false` のため、何も生成されません。 |
| `reason` | string | データソースがスキップされる理由。それ以外の場合は `null`。 |
| `targets` | array | `"targeted"` の場合: [カタログによる制限](#catalog-restrictions)を適用した後のターゲットの解決結果を、データベースごとにグループ化したもの。データベース全体が対象の場合、`tables` は省略されます。それ以外の場合は `null`。 |

テーブル名がソースと照合されるのは、レスポンスの送信後、生成の実行時です。ソースに存在しないテーブルは何も生成せず、警告としてログに記録されます。

### 400 Bad Request

リクエストが無効であるか、指定どおりに実行できません。何も生成されません。

無効なリクエストの場合 ([拒否されるリクエスト](#request-format)を参照)、`error` に問題が示されます:

```json
{
  "error": "The tables of the 'NorthwindDB' target are empty. Omit tables to target every table."
}
```

リクエストは有効でも指定どおりに実行できない場合は、`errors` にすべての問題が、それぞれのデータソース名とともに示されます:

```json
{
  "error": "The request can't be done as given; nothing was generated.",
  "errors": [
    "Datasource 'NorthwindDB': not allowed by its catalog whitelist: table 'dbo.Secrets' (any database).",
    "Unknown datasource 'NoSuchDS'."
  ]
}
```

これは、リクエストで次のものを指定した場合に発生します:

- カタログにないデータソース。
- [カタログによる制限](#catalog-restrictions)で許可されていないデータベースまたはテーブル。同じデータソースのデータソース全体のターゲットがそれを含む場合も該当します。
- 使用可能なメタデータがない (メタデータがない、失敗した、または空の) データソースのデータベースまたはテーブル。まずデータソース全体を生成してください。
- 保存されているメタデータのインデックスを読み取れないデータソースのデータベースまたはテーブル。`forceRegeneration` を指定してデータソース全体を再生成すると、再構築されます。

### 409 Conflict

このサーバーインスタンスで、メタデータの生成がすでに実行中です。完了するまで待つか、キャンセルしてから、もう一度実行してください。

```json
{
  "error": "Metadata generation is already in progress. Please wait for the current operation to complete or cancel it before starting a new one."
}
```

:::note

各サーバーインスタンスで同時に実行される生成は 1 つだけです。アプリケーションを複数のインスタンスで実行している場合、各インスタンスが確認するのは自身の生成のみです。

:::

---

## 生成の確認とキャンセル

すべてのデータソースにわたるメタデータの全体的なステータスを取得します:

```
GET /api/reveal/ai/metadata/status
```

```json
{
  "status": "Completed",
  "isInitialized": true
}
```

`status` は `"NotStarted"`、`"Queued"`、`"Generating"`、`"Enriching"`、`"Completed"`、`"Failed"` のいずれかです。特定のリクエストではなく、現在保存されているメタデータの状態を反映するため、何も処理しなかった生成でも `"Completed"` になります。

実行中の生成をキャンセルします:

```
DELETE /api/reveal/ai/metadata/generate
```

キャンセルしたターゲット指定の生成を完了させるには、[中断された生成](#interrupted-generation)を参照してください。

---

## 例

### スキーマの変更後に 1 つのテーブルを更新する

```bash
curl -X POST https://your-server.com/api/reveal/ai/metadata/generate \
  -H "Content-Type: application/json" \
  -d '{ "targets": [ { "datasourceId": "NorthwindDB", "database": "Northwind", "tables": ["dbo.Orders"] } ] }'
```

`forceRegeneration` を指定しない場合、`dbo.Orders` は、スキーマが変更されたかメタデータが不完全な場合にのみ再生成されます。常に再生成するには、`"forceRegeneration": true` を追加します。

### データソース全体を再構築する

```json
{
  "targets": [ { "datasourceId": "NorthwindDB" } ],
  "forceRegeneration": true
}
```

データソースのメタデータは削除されてから再構築され、ソースに存在しなくなったテーブルは削除されます。

### すべてのデータソースを生成する

`targets` を省略します:

```json
{}
```
