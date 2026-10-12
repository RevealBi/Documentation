---
sidebar_label: Metadata Generation Endpoint
sidebar_custom_props:
  status: preview
---

# Metadata Generation Endpoint

Reveal SDK AI generates metadata for the datasources in your [metadata catalog](metadata-catalog.md): their databases, tables, fields, cached filter values and field statistics. The [Metadata Service](metadata-catalog.md#metadata-service-options) can generate it at startup or on a schedule. The metadata generation endpoint lets you trigger it on demand, for every datasource or only for the datasources, databases and tables you name.

Generating only what changed is useful when:

- a table gained or lost columns, and only that table needs new metadata;
- a new database or table was added to a datasource that already has metadata;
- a stored table document is missing or damaged, and you want to repair it without regenerating the whole datasource.

The endpoint is available on ASP.NET Core, Node.js and Java, at the same path as the other AI endpoints.

---

## Endpoint

```
POST /api/reveal/ai/metadata/generate
```

Generation runs in the background. The endpoint answers right away with `202 Accepted` and what will be generated, and the work continues after the response is sent.

## Request Format

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

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `targets` | array | No | The datasources, databases and tables to generate metadata for. When omitted, every datasource in the catalog is generated. When present, it must not be empty. |
| `forceRegeneration` | boolean | No | When `true`, regenerates metadata even if it already exists. See [How targets are generated](#how-targets-are-generated). Defaults to `false`. |
| `forceReload` | boolean | No | When `true`, reloads the datasources before generating. Defaults to `false`. |
| `datasourceIds` | string[] | No | **Deprecated.** Use `targets` instead: `{ "datasourceId": "Sales" }` behaves exactly like `"datasourceIds": ["Sales"]`. Can't be combined with `targets`. |

### Target Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `datasourceId` | string | Yes | The datasource `Id` from the metadata catalog. |
| `database` | string | No | The database name (the catalog, for XMLA datasources). When omitted, the target applies to any database. |
| `tables` | string[] | No | The table names (cubes, for XMLA datasources), schema-qualified where the datasource has schemas (for example, `dbo.Orders`). When omitted, the target covers every table. |

Omitting `database` or `tables` is the only way to say "any" or "every":

| Target | Generates |
|--------|-----------|
| `{ "datasourceId": "HR" }` | The whole datasource |
| `{ "datasourceId": "Sales", "database": "Northwind" }` | Every table of the `Northwind` database |
| `{ "datasourceId": "Sales", "database": "Northwind", "tables": ["dbo.Orders"] }` | `dbo.Orders` in `Northwind` |
| `{ "datasourceId": "Sales", "tables": ["dbo.Orders"] }` | `dbo.Orders` in every database that has it |
| `{ "datasourceId": "SalesExcel", "tables": ["Sheet1"] }` | `Sheet1`, for sources without databases such as Excel files |

### Example Request

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
<summary>Requests that are rejected</summary>

The request is validated strictly, so that a mistake can't silently turn into "generate everything". These return `400 Bad Request` and generate nothing:

- an empty `targets` list, or an empty `tables` list;
- a `"*"` entry in `tables` (omit `tables` instead);
- an empty or blank `datasourceId`, `database` or table name, or one with leading or trailing spaces;
- both `targets` and `datasourceIds`;
- an unknown JSON property, on the request or on a target. For example, a misspelled `"target"` would otherwise be ignored and generate every datasource.

</details>

---

## How Targets Are Generated

### Whole datasource

A target with only a `datasourceId` covers the whole datasource. It behaves exactly like the deprecated `datasourceIds`:

- **With `forceRegeneration`**, the datasource's metadata is deleted and rebuilt, so tables the source no longer has are removed.
- **Without it**, a datasource that already has metadata is skipped.

When a datasource has both a whole-datasource target and other targets, the whole datasource wins, since it covers them.

### Databases and tables

Any other target generates only the tables it names, and merges them into the datasource's existing metadata:

- Nothing outside the targets is regenerated or deleted. The rest of the datasource keeps its metadata, including descriptions you edited.
- Targeted tables are never deleted either, even when the source no longer has them, because a dropped table can't be told apart from a typo or a temporary empty result. To remove tables, regenerate the whole datasource with `forceRegeneration`.
- **Without `forceRegeneration`**, a targeted table is skipped when its metadata is complete and its schema hasn't changed. A table that gained or lost a column is regenerated.
- **With `forceRegeneration`**, every targeted table is regenerated.
- A stored table document that can't be read (for example, after an interrupted write) counts as missing, so targeting that table repairs it.

The datasource must already have metadata. To generate databases or tables of a datasource that has none, or whose last generation failed, generate the whole datasource first.

### Catalog restrictions

Targets are checked against the datasource's catalog definition. When the catalog lists the datasource's `Databases`, only those databases can be targeted, and for a database with `"DiscoveryMode": "Restricted"`, only its listed tables. A target the catalog doesn't allow is rejected rather than silently skipped.

A target without a `database` applies to each database the catalog allows. A target without `tables`, on a restricted database, covers the database's listed tables.

### Interrupted generation

If a targeted generation is cancelled, fails, or the application restarts while it runs, send the same request again. Tables whose metadata didn't complete are regenerated, even without `forceRegeneration`.

The [Metadata Service](metadata-catalog.md#metadata-service-options) also completes the tables the generation already rewrote (their field statistics and enrichment) the next time it runs: at startup, which is on by default, or on its `CronSchedule`. It processes only those tables, not the whole datasource.

---

## Response Format

### 202 Accepted

The generation started. Without `targets`, the response only confirms it:

```json
{
  "message": "Metadata generation started",
  "forceRegeneration": false
}
```

With `targets`, the response also lists what each datasource gets:

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

| Property | Type | Description |
|----------|------|-------------|
| `datasourceId` | string | The datasource, as requested. |
| `mode` | string | `"full"`: the whole datasource is generated. `"targeted"`: only `targets` are generated and merged into the existing metadata. `"skipped"`: nothing is generated, because the whole datasource already has metadata and `forceRegeneration` is `false`. |
| `reason` | string | Why the datasource is skipped. `null` otherwise. |
| `targets` | array | For `"targeted"`: what the targets resolved to after the [catalog restrictions](#catalog-restrictions), grouped by database. `tables` is omitted when the whole database is covered. `null` otherwise. |

Table names are only checked against the source once generation runs, after the response is sent. A table the source doesn't have generates nothing and is logged as a warning.

### 400 Bad Request

The request is invalid, or can't be done exactly as given. Nothing is generated.

For an invalid request (see [Requests that are rejected](#request-format)), `error` describes the problem:

```json
{
  "error": "The tables of the 'NorthwindDB' target are empty. Omit tables to target every table."
}
```

When the request is valid but can't be done as given, `errors` lists every problem, each naming its datasource:

```json
{
  "error": "The request can't be done as given; nothing was generated.",
  "errors": [
    "Datasource 'NorthwindDB': not allowed by its catalog whitelist: table 'dbo.Secrets' (any database).",
    "Unknown datasource 'NoSuchDS'."
  ]
}
```

This happens when a request names:

- a datasource that isn't in the catalog;
- a database or table the [catalog restrictions](#catalog-restrictions) don't allow, even when a whole-datasource target of the same datasource covers it;
- databases or tables of a datasource with no usable metadata (none, failed, or empty). Generate the whole datasource first;
- databases or tables of a datasource whose stored metadata index can't be read. Regenerate the whole datasource with `forceRegeneration`, which rebuilds it.

### 409 Conflict

A metadata generation is already running on this server instance. Wait for it to finish, or cancel it, and try again.

```json
{
  "error": "Metadata generation is already in progress. Please wait for the current operation to complete or cancel it before starting a new one."
}
```

:::note

Only one generation runs at a time on each server instance. When your application runs several instances, each one checks only its own generations.

:::

---

## Checking and Cancelling a Generation

Get the overall metadata status across all datasources:

```
GET /api/reveal/ai/metadata/status
```

```json
{
  "status": "Completed",
  "isInitialized": true
}
```

`status` is one of `"NotStarted"`, `"Queued"`, `"Generating"`, `"Enriching"`, `"Completed"` or `"Failed"`. It reflects the metadata that is currently stored, not one particular request, so a generation that had nothing to do also reads `"Completed"`.

Cancel the running generation:

```
DELETE /api/reveal/ai/metadata/generate
```

To finish a cancelled targeted generation, see [Interrupted generation](#interrupted-generation).

---

## Examples

### Refresh one table after a schema change

```bash
curl -X POST https://your-server.com/api/reveal/ai/metadata/generate \
  -H "Content-Type: application/json" \
  -d '{ "targets": [ { "datasourceId": "NorthwindDB", "database": "Northwind", "tables": ["dbo.Orders"] } ] }'
```

Without `forceRegeneration`, `dbo.Orders` is regenerated only if its schema changed or its metadata is incomplete. Add `"forceRegeneration": true` to regenerate it regardless.

### Rebuild a whole datasource

```json
{
  "targets": [ { "datasourceId": "NorthwindDB" } ],
  "forceRegeneration": true
}
```

The datasource's metadata is deleted and rebuilt, and tables the source no longer has are removed.

### Generate every datasource

Omit `targets`:

```json
{}
```
