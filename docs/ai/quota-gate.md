---
sidebar_label: Quotas and Billing
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quotas and Billing

Every AI call Reveal makes spends tokens on the user's provider account. The quota gate lets the user decide, per call and per end user, whether that spend is allowed, and records what it actually cost. Use it to enforce plan entitlements, token budgets, and rate limits, and to debit actual usage against a balance. To only observe usage, without controlling it, use [usage tracking](usage-tracking.md) instead.

The gate has two halves that receive the same call context:

- **Check** runs before tokens are spent. Verify that the end user's plan includes the feature or [profile](providers-overview.md#profiles) and that budget remains. A denied call never reaches the provider.
- **Settle** runs after the call completes or fails, with the token counts the provider reported. Debit them against the balance here, or release a reservation made during the check.

Both halves receive the full end-user context, so per-request claims the user's `IRVUserContextProvider` stores in `Properties` (tenant ID, plan, cost center) are available at check time and at billing time.

## Implement the gate

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Implement `IAIQuotaGate`:

```csharp
using Reveal.Sdk.AI;

public interface IAIQuotaGate
{
    ValueTask<AIGateDecision> CheckAsync(AICallContext context, CancellationToken cancellationToken);

    // Optional: the default implementation does nothing.
    ValueTask SettleAsync(AICallContext context, AIUsageRecord actual, CancellationToken cancellationToken);
}
```

The following gate restricts profiles by plan, enforces a token budget per tenant, and debits actual usage:

```csharp title="PlanBillingGate.cs"
using Reveal.Sdk.AI;

public sealed class PlanBillingGate : IAIQuotaGate
{
    private readonly IPlanStore _plans;
    private readonly IUsageStore _usage;

    public PlanBillingGate(IPlanStore plans, IUsageStore usage)
    {
        _plans = plans;
        _usage = usage;
    }

    public async ValueTask<AIGateDecision> CheckAsync(AICallContext context, CancellationToken cancellationToken)
    {
        var tenant = GetClaim(context, "TenantId");
        var plan = await _plans.GetAsync(tenant, context.User.UserId, cancellationToken);

        if (!plan.AllowsProfile(context.Profile))
        {
            return AIGateDecision.Deny(AIDenialReason.NotEntitled,
                "This model isn't included in your plan.");
        }

        if (await _usage.RemainingTokensAsync(tenant, cancellationToken) <= 0)
        {
            return AIGateDecision.Deny(AIDenialReason.QuotaExceeded,
                "You've reached today's AI limit. Upgrade your plan or try again tomorrow.",
                retryAfter: TimeSpan.FromHours(1));
        }

        return AIGateDecision.Allow();
    }

    public ValueTask SettleAsync(AICallContext context, AIUsageRecord actual, CancellationToken cancellationToken)
        => _usage.DebitAsync(
            tenant: GetClaim(context, "TenantId"),
            callId: context.CallId,               // idempotency key
            tokens: actual.TotalTokens ?? 0,      // null when the provider reported no usage
            cancellationToken);

    private static string? GetClaim(AICallContext context, string key)
        => context.User.Properties?.TryGetValue(key, out var value) == true ? value?.ToString() : null;
}
```

`IPlanStore` and `IUsageStore` stand for the user's own plan and balance storage.

  </TabItem>

  <TabItem value="node" label="Node.js">

Add `quotaGate` and, optionally, `quotaSettle` to the plugin's `callbacks`. Per-request claims are on `context.user.properties`.

```javascript title="server.js"
revealAI.withOptions({
    // providers, profiles, ...
    callbacks: {
        quotaGate: async (context) => {
            const tenant = context.user?.properties?.TenantId;
            const plan = await plans.get(tenant, context.user?.userId);

            if (!plan.allowsProfile(context.profile)) {
                return { allow: false, reason: 'notEntitled', message: "This model isn't included in your plan." };
            }
            if (await usage.remainingTokens(tenant) <= 0) {
                return {
                    allow: false,
                    reason: 'quotaExceeded',
                    message: "You've reached today's AI limit. Upgrade your plan or try again tomorrow.",
                    retryAfterSeconds: 3600
                };
            }
            return { allow: true };
        },

        quotaSettle: async ({ context, usage: actual }) => {
            await usage.debit(context.user?.properties?.TenantId, context.callId, actual.totalTokens ?? 0);
        }
    }
});
```

`plans` and `usage` stand for the user's own plan and balance storage.

  </TabItem>

  <TabItem value="java" label="Java">

Register a `QuotaGateCallback` under `"quotaGate"` and, optionally, a callback under `"quotaSettle"`. Both receive JSON; per-request claims are on `user.properties`.

```java title="Application.java"
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.revealbi.ai.QuotaGateCallback;
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.core.RevealPluginCallback;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

ObjectMapper json = new ObjectMapper();

QuotaGateCallback quotaGate = context -> {
    String tenant = context.path("user").path("properties").path("TenantId").asText(null);
    Plan plan = plans.get(tenant, context.path("user").path("userId").asText(null));

    if (!plan.allowsProfile(context.path("profile").asText())) {
        return json.valueToTree(Map.of(
                "allow", false,
                "reason", "notEntitled",
                "message", "This model isn't included in your plan."));
    }
    if (usage.remainingTokens(tenant) <= 0) {
        return json.valueToTree(Map.of(
                "allow", false,
                "reason", "quotaExceeded",
                "message", "You've reached today's AI limit. Upgrade your plan or try again tomorrow.",
                "retryAfterSeconds", 3600));
    }
    return json.valueToTree(Map.of("allow", true));
};

RevealPluginCallback quotaSettle = (userContext, message) -> {
    try {
        JsonNode settlement = json.readTree(message);
        JsonNode context = settlement.path("context");
        usage.debit(
                context.path("user").path("properties").path("TenantId").asText(null),
                context.path("callId").asText(),
                settlement.path("usage").path("totalTokens").asInt(0));
        return CompletableFuture.completedFuture("");
    } catch (Exception ex) {
        return CompletableFuture.failedFuture(ex);
    }
};

IRevealServer revealServer = new RevealServerBuilder()
        .addPlugin(RevealAIPlugin.withOptions(aiPluginOptions, Map.of(
                "quotaGate", quotaGate,
                "quotaSettle", quotaSettle)))
        .build();
```

`plans` and `usage` stand for the user's own plan and balance storage.

  </TabItem>
</Tabs>

## Register the gate

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddQuotaGate<PlanBillingGate>();
```

The gate is registered as a singleton. Ensure the implementation is thread-safe and inject only singleton-safe dependencies. Only one gate is supported; registering a second replaces the first.

  </TabItem>

  <TabItem value="node" label="Node.js">

The callbacks are registered when they are passed to `revealAI.withOptions(...)`. `quotaSettle` is only invoked when `quotaGate` is also registered.

  </TabItem>

  <TabItem value="java" label="Java">

The callbacks are registered when they are passed to `RevealAIPlugin.withOptions(...)`. `quotaSettle` is only invoked when `quotaGate` is also registered.

  </TabItem>
</Tabs>

## Call context

The check and the settle receive the same context. In Node.js and Java the property names are camel-cased (`operationId`, `callId`, ...), and the end user is a `{ userId, properties }` object.

| Property | Description |
|---|---|
| `OperationId` | Groups the calls of one top-level operation, such as a chat turn or an insight. Stable across the operation, so a per-operation decision can be cached. |
| `CallId` | Unique ID of this provider call. The settle receives the same ID; use it as the idempotency key when debiting. |
| `User` | The end-user context, including `UserId` and the claims in `Properties`. |
| `Intent` | The workflow the call belongs to, such as `generation-build-report` or `widget-analysis`. |
| `Profile` | The [profile](providers-overview.md#profiles) that serves the call, after intent routing. |
| `Provider` | The provider registration name, or the provider type for a connection the end user supplied. |
| `Model` | The model the call will use, when known. |
| `IsSystemCall` | `true` for background work Reveal performs under the system user, such as metadata enrichment. |
| `IsUserConnection` | `true` when the call uses a connection the end user supplied instead of one the user configured. |

Because the gate sees the routed profile and the intent of every call, the user can price or restrict specific profiles and features, not just total usage. Gating one intent means gating its related intents too. For example, a dashboard analysis runs under `dashboard-analysis`, not `widget-analysis`, so a free tier that blocks `widget-analysis` should also block `dashboard-analysis`.

## Decisions and client errors

Return `AIGateDecision.Allow()` to let the call proceed, or `AIGateDecision.Deny(reason, message, retryAfter)` to block it. In Node.js and Java, return `{ allow: true }` or `{ allow: false, reason, message, retryAfterSeconds }`.

A denial fails the request. The client receives a [ProblemDetails](https://www.rfc-editor.org/rfc/rfc9457) response with a stable `code`, and `message` as its `detail`, so the message must be safe to show end users. Messages longer than 500 characters are truncated.

| Reason | Node.js / Java value | HTTP status | `code` | Retry information |
|---|---|---|---|---|
| `QuotaExceeded` | `quotaExceeded` | 429 | `ai.quota_exceeded` | `retryAfterSeconds` in the response body |
| `RateLimited` | `rateLimited` | 429 | `ai.rate_limited` | `Retry-After` response header |
| `NotEntitled` | `notEntitled` | 403 | `ai.not_entitled` | — |
| `Other` | `other` | 403 | `ai.denied` | — |

Retry times are rounded up to whole seconds, with a minimum of one. If a streaming response has already started when a call is denied, the stream ends with an `error` event that carries the same `code` and `retryAfterSeconds`.

The client SDK surfaces these responses as a `RevealAIError` with `code`, `status`, and `retryAfterSeconds` properties:

```typescript
import { RevealAIError, AIErrorCodes } from '@revealbi/api';

try {
  await client.ai.chat.sendMessage({ message, datasourceId: 'sales' });
} catch (error) {
  if (error instanceof RevealAIError) {
    switch (error.code) {
      case AIErrorCodes.QuotaExceeded:
      case AIErrorCodes.RateLimited:
        showLimitReached(error.message, error.retryAfterSeconds);
        break;
      case AIErrorCodes.NotEntitled:
        showUpgradePrompt(error.message);
        break;
      default:
        showErrorMessage(error.message);
    }
  }
}
```

## Settling usage

The settle receives the same context the check saw and an `AIUsageRecord` with the actual usage: `InputTokens`, `OutputTokens`, `TotalTokens`, `ReasoningTokens`, `CachedInputTokens`, `Model`, `Duration`, `Succeeded`, and `ErrorCode`. Token counts are `null` when the provider reported no usage, which is distinct from `0`. The record contains no prompt or response text.

- **It runs for every call that passed the check**, including calls that failed, timed out, or were canceled. Reservation-based accounting therefore never leaks a reservation. It is not called for denied calls, or when the check itself fails.
- **It runs in the request.** Keep it fast: a quick write to the user's store, or an internal queue flushed separately.
- **Its failures are logged, not propagated.** Reveal won't fail a call it has already served because billing failed. If billing writes need guaranteed delivery, make the write durable, for example with a local outbox.
- **Each server settles its own calls**, so in a multi-server deployment only the user's shared balance store needs to be consistent.

## Behavior to know

- **Every provider call is gated.** One end-user action can make several AI calls; for example, a chat message classifies the request before generating a dashboard. The check runs once per call, and a denial at any step fails the whole operation.
- **Background work bypasses the gate by default.** Calls Reveal makes on its own, such as metadata enrichment, are the user's spend rather than an end user's, so they are not checked or settled. To budget them as well, set `RevealAI:Gate:IncludeSystemCalls` to `true`; those calls arrive with `IsSystemCall` set to `true`.

  ```json title="appsettings.json"
  {
    "RevealAI": {
      "Gate": {
        "IncludeSystemCalls": true
      }
    }
  }
  ```

- **A failing gate fails the call.** On ASP.NET, an exception thrown by `CheckAsync` fails the request. In Node.js and Java, a `quotaGate` callback that throws or returns a missing or malformed decision denies the call with `ai.denied`: a broken gate is never an open gate.
