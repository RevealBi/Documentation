---
sidebar_label: Usage Tracking
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Usage Tracking

Reveal produces a usage record for every AI call it makes: chat, insights, and background metadata work, on every provider. Each record carries the token counts the provider reported, plus the user, intent, profile, and model involved. Out of the box, records are [logged and counted in metrics](observability.md). Register a usage sink to also send them to the developer's own store, for analytics, dashboards, or cost reporting.

Usage records are for observability. To enforce budgets and debit tokens against a balance, use the [quota gate](quota-gate.md).

## Send usage records to an external store

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Implement `IAIUsageSink`:

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

Register it after `AddRevealAI()`:

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddUsageSink<UsageExportSink>();
```

For a simple sink, register a delegate instead:

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddUsageSink((record, cancellationToken) =>
    {
        usageQueue.Enqueue(record);
        return ValueTask.CompletedTask;
    });
```

The developer can register several sinks; each receives every record, and a failing sink does not affect the others. Sinks are singletons, so ensure the implementation is thread-safe and inject only singleton-safe dependencies.

  </TabItem>

  <TabItem value="node" label="Node.js">

Add a `usageSink` callback to the plugin's `callbacks`. It receives one record per call; its return value is ignored.

```javascript title="server.js"
revealAI.withOptions({
    // providers, profiles, ...
    callbacks: {
        usageSink: (record) => {
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

Register a `UsageSinkCallback` under `"usageSink"`. It receives one record per call as JSON.

```java title="Application.java"
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.ai.UsageSinkCallback;

import java.util.Map;

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

`usageQueue`, `IUsageQueue`, and `UsageRow` stand for the developer's own buffering and storage.

## Usage record

In Node.js and Java the property names are camel-cased, and `Duration` is `durationMs`, in milliseconds.

| Property | Description |
|---|---|
| `OperationId` | Groups the calls of one top-level operation, such as a chat turn or an insight. Sum by it for per-interaction reporting. |
| `CallId` | Unique ID of this provider call. |
| `ParentOperationId` | The operation a call ran under when it was made on that operation's behalf with its own `OperationId`, such as datasource ranking during a dashboard generation. `null` otherwise. |
| `Timestamp` | When the call started, in UTC. |
| `UserId` | The user the call was made for, or `anonymous` when the user has no ID. |
| `IsSystemCall` | `true` for background work Reveal performs on its own, such as metadata enrichment and datasource ranking during a dashboard generation. `UserId` is then the system user's; for ranking, `ParentOperationId` links the call to the user's operation. |
| `IsUserConnection` | `true` when the call used a connection the user supplied instead of one the developer configured. |
| `Intent` | The workflow the call belongs to, such as `generation-build-report` or `widget-analysis`. |
| `Profile` | The [profile](providers-overview.md#profiles) that served the call. |
| `Provider` | The provider registration name, or the provider type for a connection the user supplied. |
| `Model` | The model the call ran on, when known. |
| `InputTokens`, `OutputTokens`, `TotalTokens` | Token counts. `null` when the provider reported no usage, which is distinct from `0`. |
| `ReasoningTokens` | Tokens spent on internal reasoning. `null` when the provider doesn't report them. OpenAI and Azure OpenAI include them in `OutputTokens`; Google Gemini counts them separately; Anthropic doesn't report them. |
| `CachedInputTokens` | Input tokens served from the provider's prompt cache. `null` when the provider doesn't report them. Every built-in provider also includes them in `InputTokens`. |
| `Stage`, `Attempt` | Set only by the multi-step dashboard generator (`UseDashboardGeneratorV2`): the step the call belongs to (for example, `DefineFields`), and `1` for a prompt's first call or `2` and up for calls that repair an invalid answer. `null` otherwise. |
| `Duration` | How long the provider call took. |
| `FinishReason` | Why the model stopped, when the call succeeded: `Stop`, `Length`, `ContentFilter`, or `Other`. |
| `Succeeded` | Whether the call completed successfully. |
| `ErrorCode` | When `Succeeded` is `false`: `provider_error`, `timeout`, `cancelled`, or `denied` (blocked by the quota gate). |

Records never contain prompt or response text, so users' data doesn't flow into the developer's analytics pipeline. Failed calls produce records too, which lets the developer compute the cost per successful answer and alert on provider errors.

## Delivery

- **Sinks run outside the request.** Records are handed to the sinks on background tasks, so a slow or failing sink never slows down or fails an AI call.
- **Delivery is best effort.** At most 8 records are delivered at a time. When all 8 slots are busy, further records skip the sinks and a warning is logged; they are still logged and counted in metrics. Return quickly: when writing to a remote store, enqueue the record internally and write in batches on a separate schedule.
- **Failures are logged and isolated.** An exception from a sink is logged and never reaches the AI call or the other sinks.

Because delivery is best effort, don't bill from a usage sink. The [quota gate](quota-gate.md) settles every call inside the request, with the full user context.
