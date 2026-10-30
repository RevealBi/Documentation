---
sidebar_label: Observability
---

# Observability

Reveal records every AI call it makes: chat, insights, and background metadata work, on every provider. Without any setup, each call is written to the developer's logs and counted in OpenTelemetry metrics, so the developer can see where tokens go per intent, profile, and model before going live. Clients also receive the profile and token usage of each response.

The log and metrics belong to the ASP.NET server. To receive the same records in the developer's own store, or in a Node.js or Java application, register a [usage sink](usage-tracking.md).

## Usage log

Each AI call is logged as one structured line under the `Reveal.Sdk.AI.Usage` category: at `Information` for user calls, and at `Debug` for background calls Reveal makes on its own. The line includes the user, intent, profile, provider, model, token counts, duration, and outcome, and the IDs that group the calls of one operation. It never includes prompt or response text.

Silence or redirect it with standard log filtering:

```json title="appsettings.json"
{
  "Logging": {
    "LogLevel": {
      "Reveal.Sdk.AI.Usage": "Warning"
    }
  }
}
```

## Metrics

Reveal publishes these instruments on the `reveal.sdk.ai` meter:

| Instrument | Type | Description |
|---|---|---|
| `ai.calls` | Counter | AI provider calls. |
| `ai.tokens.input` | Counter | Input tokens. |
| `ai.tokens.output` | Counter | Output tokens. |
| `ai.tokens.reasoning` | Counter | Tokens spent on internal reasoning. |
| `ai.tokens.input.cached` | Counter | Input tokens served from the provider's prompt cache. |
| `ai.call.duration` | Histogram | Call duration, in milliseconds. |

Each measurement is tagged with:

| Tag | Value |
|---|---|
| `gen_ai.operation.name` | The intent, such as `generation-build-report`. |
| `reveal.ai.profile` | The profile that served the call. |
| `gen_ai.provider.name` | The provider registration name. |
| `gen_ai.request.model` | The model. |
| `reveal.ai.succeeded` | Whether the call succeeded. |
| `reveal.ai.stage` | The dashboard generation step, for calls made by the multi-step dashboard generator (`UseDashboardGeneratorV2`). |

To export them, add the meter to the OpenTelemetry configuration:

```csharp title="Program.cs"
builder.Services.AddOpenTelemetry()
    .WithMetrics(metrics => metrics
        .AddMeter("reveal.sdk.ai")
        .AddOtlpExporter());
```

## Usage in responses

Chat and insights responses tell the client which profile served the request and how many tokens it used, summed across all the AI calls the request made:

```typescript
const response = await client.ai.chat.sendMessage({
  message: 'Show me sales by region',
  datasourceId: 'sales',
});

console.log(response.profile);              // for example, "default"
console.log(response.usage?.totalTokens);   // undefined when the provider reported no usage
console.log(response.finishReason);         // of the last AI call: "Stop", "Length", "ContentFilter", or "Other"
```
