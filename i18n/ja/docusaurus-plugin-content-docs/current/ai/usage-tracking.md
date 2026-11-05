---
sidebar_label: 使用量の追跡
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 使用量の追跡

Reveal は、チャット、インサイト、バックグラウンドのメタデータ処理など、すべてのプロバイダーで実行するすべての AI 呼び出しについて使用量レコードを生成します。各レコードには、プロバイダーが報告したトークン数と、関係するユーザー、インテント、プロファイル、モデルが含まれます。既定では、レコードは[ログに記録され、メトリクスで集計されます](observability.md)。分析、ダッシュボード、コスト レポートのために開発者独自のストアにも送るには、使用量シンクを登録します。

使用量レコードはオブザーバビリティのためのものです。予算を適用し、トークンを残高から差し引くには、[クォータゲート](quota-gate.md)を使用します。

## 使用量レコードを外部ストアに送る

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

`IAIUsageSink` を実装します。

```csharp
using Reveal.Sdk.AI;

public interface IAIUsageSink
{
    ValueTask RecordAsync(AIUsageRecord record, CancellationToken cancellationToken);
}
```

```csharp title="UsageExportSink.cs"
using Reveal.Sdk.AI;

public sealed class UsageExportSink : IAIUsageSink
{
    private readonly IUsageQueue _queue;

    public UsageExportSink(IUsageQueue queue) => _queue = queue;

    public ValueTask RecordAsync(AIUsageRecord record, CancellationToken cancellationToken)
    {
        // Enqueue and return; a separate worker writes to the analytics store.
        _queue.Enqueue(new UsageRow(
            record.UserId,
            record.Intent,
            record.Profile,
            record.Model,
            record.InputTokens ?? 0,
            record.OutputTokens ?? 0,
            record.Succeeded));
        return ValueTask.CompletedTask;
    }
}
```

`AddRevealAI()` の後に登録します。

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddUsageSink<UsageExportSink>();
```

シンプルなシンクの場合は、代わりにデリゲートを登録します。

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddUsageSink((record, cancellationToken) =>
    {
        // Queue the record for custom storage
        usageQueue.Enqueue(record);
        return ValueTask.CompletedTask;
    });
```

開発者は複数のシンクを登録できます。各シンクはすべてのレコードを受け取り、失敗したシンクは他のシンクに影響しません。シンクはシングルトンのため、実装をスレッド セーフにし、シングルトンとして安全な依存関係のみを挿入してください。

  </TabItem>

  <TabItem value="node" label="Node.js">

プラグインの `callbacks` に `usageSink` コールバックを追加します。呼び出しごとに 1 件のレコードを受け取り、戻り値は無視されます。

```javascript title="server.js"
revealAI.withOptions({
    // providers, profiles, ...
    callbacks: {
        usageSink: (record) => {
            // Queue the record for custom storage
            usageQueue.push({
                userId: record.userId,
                intent: record.intent,
                profile: record.profile,
                model: record.model,
                inputTokens: record.inputTokens ?? 0,
                outputTokens: record.outputTokens ?? 0,
                succeeded: record.succeeded
            });
        }
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

`"usageSink"` に `UsageSinkCallback` を登録します。呼び出しごとに 1 件のレコードを JSON で受け取ります。

```java title="Application.java"
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.ai.UsageSinkCallback;
import io.revealbi.core.IRevealServer;
import io.revealbi.core.RevealServerBuilder;

import java.util.Map;

// Queue the record for custom storage
UsageSinkCallback usageSink = record -> usageQueue.add(new UsageRow(
        record.path("userId").asText(),
        record.path("intent").asText(),
        record.path("profile").asText(),
        record.path("model").asText(null),
        record.path("inputTokens").asInt(0),
        record.path("outputTokens").asInt(0),
        record.path("succeeded").asBoolean()));

IRevealServer revealServer = new RevealServerBuilder()
        .addPlugin(RevealAIPlugin.withOptions(aiPluginOptions, Map.of(
                "usageSink", usageSink)))
        .build();
```

  </TabItem>
</Tabs>

## 使用量レコード

Node.js と Java では、プロパティ名はキャメルケースになり、`Duration` はミリ秒単位の `durationMs` になります。

| プロパティ | 説明 |
|---|---|
| `OperationId` | チャットのターンやインサイトなど、1 つの最上位操作の呼び出しをまとめます。これで集計すると、操作ごとのレポートを作成できます。 |
| `CallId` | このプロバイダー呼び出しの一意の ID。 |
| `ParentOperationId` | 呼び出しがある操作のために独自の `OperationId` で実行された場合の、その操作 (例: ダッシュボード生成中のデータソースのランク付け)。それ以外の場合は `null`。 |
| `Timestamp` | 呼び出しの開始時刻 (UTC)。 |
| `UserId` | 呼び出しの対象ユーザー。ユーザーに ID がない場合は `anonymous`。 |
| `IsSystemCall` | メタデータの拡充やダッシュボード生成中のデータソースのランク付けなど、Reveal が独自に行うバックグラウンド処理の場合は `true`。この場合 `UserId` はシステム ユーザーのものになり、ランク付けでは `ParentOperationId` が呼び出しをユーザーの操作に関連付けます。 |
| `IsUserConnection` | 開発者が構成した接続ではなく、ユーザーが提供した接続を呼び出しが使用した場合は `true`。 |
| `Intent` | 呼び出しが属するワークフロー (例: `generation-build-report`、`widget-analysis`)。 |
| `Profile` | 呼び出しを処理した[プロファイル](providers-overview.md)。 |
| `Provider` | プロバイダーの登録名。ユーザーが提供した接続の場合はプロバイダーの種類。 |
| `Model` | 呼び出しが実行されたモデル (判明している場合)。 |
| `InputTokens`、`OutputTokens`、`TotalTokens` | トークン数。プロバイダーが使用量を報告しなかった場合は `null` で、`0` とは区別されます。 |
| `ReasoningTokens` | 内部の推論に使われたトークン。プロバイダーが報告しない場合は `null`。OpenAI と Azure OpenAI は `OutputTokens` に含め、Google Gemini は別に数え、Anthropic は報告しません。 |
| `CachedInputTokens` | プロバイダーのプロンプト キャッシュから提供された入力トークン。プロバイダーが報告しない場合は `null`。すべての組み込みプロバイダーは、これを `InputTokens` にも含めます。 |
| `Stage`、`Attempt` | マルチステップのダッシュボード ジェネレーター (`UseDashboardGeneratorV2`) のみが設定します。呼び出しが属するステップ (例: `DefineFields`) と、プロンプトの最初の呼び出しなら `1`、無効な回答を修正する呼び出しなら `2` 以上。それ以外の場合は `null`。 |
| `Duration` | プロバイダー呼び出しの所要時間。 |
| `FinishReason` | 呼び出しが成功した場合の、モデルが停止した理由: `Stop`、`Length`、`ContentFilter`、`Other`。 |
| `Succeeded` | 呼び出しが正常に完了したかどうか。 |
| `ErrorCode` | `Succeeded` が `false` の場合: `provider_error`、`timeout`、`cancelled`、`denied` (クォータゲートによるブロック)。 |

レコードにはプロンプトや応答のテキストが含まれないため、ユーザーのデータが開発者の分析パイプラインに流れることはありません。失敗した呼び出しもレコードを生成するため、開発者は成功した回答あたりのコストを算出したり、プロバイダーのエラーを通知したりできます。

## 配信

- **シンクはリクエストの外で実行されます。** レコードはバックグラウンド タスクでシンクに渡されるため、遅いシンクや失敗したシンクが AI 呼び出しを遅らせたり失敗させたりすることはありません。
- **配信はベストエフォートです。** 同時に配信されるレコードは最大 8 件です。8 つの枠がすべて使用中の場合、それ以降のレコードはシンクをスキップし、警告がログに記録されます。それらのレコードもログへの記録とメトリクスでの集計は行われます。すばやく処理を返してください。リモート ストアに書き込む場合は、レコードを内部でキューに入れ、別のスケジュールでまとめて書き込みます。
- **失敗はログに記録され、分離されます。** シンクの例外はログに記録され、AI 呼び出しや他のシンクには影響しません。
- **シンクは各レコードを順番に受け取ります。** 遅いシンクは、その後に登録されたシンクへのレコードの配信を遅らせ、8 つの配信枠の 1 つを使用し続けます。

配信はベストエフォートのため、使用量シンクから課金しないでください。[クォータゲート](quota-gate.md)は、完全なユーザー コンテキストを使って、リクエスト内ですべての呼び出しを精算します。
