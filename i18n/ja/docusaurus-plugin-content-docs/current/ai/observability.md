---
sidebar_label: オブザーバビリティ
---

# オブザーバビリティ

Reveal は、チャット、インサイト、バックグラウンドのメタデータ処理など、すべてのプロバイダーで実行するすべての AI 呼び出しを記録します。

設定なしで、各呼び出しは開発者のログに書き込まれ、OpenTelemetry メトリクスで集計されます。そのため開発者は、本番稼働前にインテント、プロファイル、モデルごとのトークンの使われ方を確認できます。クライアントも、各応答のプロファイルとトークン使用量を受け取ります。

ログとメトリクスは ASP.NET サーバーのものです。同じレコードを開発者独自のストアや、Node.js または Java アプリケーションで受け取るには、[使用量シンク](usage-tracking.md)を登録します。

## 使用量ログ

各 AI 呼び出しは、`Reveal.Sdk.AI.Usage` カテゴリに構造化された 1 行として記録されます。ユーザーの呼び出しは `Information`、Reveal が独自に行うバックグラウンドの呼び出しは `Debug` レベルです。この行には、ユーザー、インテント、プロファイル、プロバイダー、モデル、トークン数、所要時間、結果、および 1 つの操作の呼び出しをまとめる ID が含まれます。プロンプトや応答のテキストは含まれません。

標準のログ フィルターで、出力を抑制またはリダイレクトできます。

```json title="appsettings.json"
{
  "Logging": {
    "LogLevel": {
      "Reveal.Sdk.AI.Usage": "Warning"
    }
  }
}
```

## メトリクス

Reveal は、`reveal.sdk.ai` メーターで次のインストルメントを公開します。

| インストルメント | 種類 | 説明 |
|---|---|---|
| `ai.calls` | Counter | AI プロバイダーの呼び出し。 |
| `ai.tokens.input` | Counter | 入力トークン。 |
| `ai.tokens.output` | Counter | 出力トークン。 |
| `ai.tokens.reasoning` | Counter | 内部の推論に使われたトークン。 |
| `ai.tokens.input.cached` | Counter | プロバイダーのプロンプト キャッシュから提供された入力トークン。 |
| `ai.call.duration` | Histogram | 呼び出しの所要時間 (ミリ秒)。 |

各測定値には次のタグが付きます。

| タグ | 値 |
|---|---|
| `gen_ai.operation.name` | インテント (例: `generation-build-report`)。 |
| `reveal.ai.profile` | 呼び出しを処理したプロファイル。 |
| `gen_ai.provider.name` | プロバイダーの登録名。 |
| `gen_ai.request.model` | モデル。 |
| `reveal.ai.succeeded` | 呼び出しが成功したかどうか。 |
| `reveal.ai.stage` | ダッシュボード生成のステップ (マルチステップのダッシュボード ジェネレーター (`UseDashboardGeneratorV2`) による呼び出しの場合)。 |

メトリクスをエクスポートするには、OpenTelemetry の構成にメーターを追加します。

```csharp title="Program.cs"
builder.Services.AddOpenTelemetry()
    .WithMetrics(metrics => metrics
        .AddMeter("reveal.sdk.ai")
        .AddOtlpExporter());
```

## 応答に含まれる使用量

チャットとインサイトの応答は、リクエストを処理したプロファイルと使用したトークン数をクライアントに伝えます。`profile` は、リクエストの `default` インテントを処理したプロファイルです。他のインテントが別のプロファイルにマップされている場合、それらの呼び出しは別のプロファイルで実行された可能性があります。`usage` はリクエストの AI 呼び出しの合計ですが、ダッシュボード生成中のデータソースのランク付けはバックグラウンド処理として実行されるため含まれません。

```typescript
const response = await client.ai.chat.sendMessage({
  message: 'Show me sales by region',
  datasourceId: 'sales',
});

console.log(response.profile);              // for example, "default"
console.log(response.usage?.totalTokens);   // undefined when the provider reported no usage
console.log(response.finishReason);         // of the last AI call: "Stop", "Length", "ContentFilter", or "Other"
```
