---
sidebar_label: Profile Selection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Profile Selection

[Profiles](providers-overview.md#profiles) name the models and settings the developer's server offers.

By default, every user can request every profile. Calls for intents the developer has mapped use the mapped profile; other calls use the requested profile, or the default profile when none is requested.

Two hooks let the developer make those decisions per user, typically from the user's plan:

- A **profile authorizer** decides which profiles a user may request. It filters the profile list clients see, and rejects requests for any other profile.
- A **profile selector** decides which profiles serve a user, without the client asking. Use it to route, for example, dashboard generation to a premium model for users on an enterprise plan.

## Restrict which profiles a user may use

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Implement `IAIProfileAuthorizer` and return the candidate profiles the user may use:

```csharp title="PlanProfileAuthorizer.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

public sealed class PlanProfileAuthorizer : IAIProfileAuthorizer
{
    private readonly IPlanStore _plans;

    public PlanProfileAuthorizer(IPlanStore plans) => _plans = plans;

    public async ValueTask<IReadOnlyCollection<string>> FilterProfilesAsync(
        IRVUserContext user, IReadOnlyCollection<string> candidateProfiles, CancellationToken cancellationToken)
    {
        var plan = await _plans.GetPlanAsync(user.UserId, cancellationToken);
        return plan switch
        {
            "enterprise" => candidateProfiles,
            "pro" => candidateProfiles.Where(p => p != "premium").ToList(),
            _ => candidateProfiles.Where(p => p == "default").ToList(),
        };
    }
}
```

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    // providers and profiles
    .AddProfileAuthorizer<PlanProfileAuthorizer>();
```

The authorizer is registered as a singleton. Only one authorizer is supported; registering a second one replaces the first.

  </TabItem>

  <TabItem value="node" label="Node.js">

Add a `profileAuthorizer` callback and return the names the user may use:

```javascript title="server.js"
revealAI.withOptions({
    // providers, profiles, ...
    callbacks: {
        profileAuthorizer: async ({ user, candidateProfiles }) => {
            const plan = await plans.get(user?.userId);
            if (plan === 'enterprise') return candidateProfiles;
            if (plan === 'pro') return candidateProfiles.filter(p => p !== 'premium');
            return candidateProfiles.filter(p => p === 'default');
        }
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

Register a `"profileAuthorizer"` callback. It receives `{ user, candidateProfiles }` as JSON and returns a JSON array of the names the user may use:

```java title="Application.java"
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.core.IRevealServer;
import io.revealbi.core.RevealPluginCallback;
import io.revealbi.core.RevealServerBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

ObjectMapper json = new ObjectMapper();

RevealPluginCallback profileAuthorizer = (userContext, message) -> {
    try {
        JsonNode request = json.readTree(message);
        String plan = plans.get(request.path("user").path("userId").asText(null));
        List<String> allowed = new ArrayList<>();
        for (JsonNode profile : request.path("candidateProfiles")) {
            String name = profile.asText();
            if ("enterprise".equals(plan)
                    || ("pro".equals(plan) && !name.equals("premium"))
                    || name.equals("default")) {
                allowed.add(name);
            }
        }
        return CompletableFuture.completedFuture(json.writeValueAsString(allowed));
    } catch (Exception ex) {
        return CompletableFuture.failedFuture(ex);
    }
};

IRevealServer revealServer = new RevealServerBuilder()
        .addPlugin(RevealAIPlugin.withOptions(aiPluginOptions, Map.of(
                "profileAuthorizer", profileAuthorizer)))
        .build();
```

  </TabItem>
</Tabs>

`plans` and `IPlanStore` stand for the developer's own plan storage.

The authorizer drives both the profile list and request validation:

- `GET /api/reveal/ai/profiles`, and `client.ai.profiles.list()` in the client SDK, return only the profiles the user may use, so a model picker shows only those.
- A request for any other profile fails with HTTP 403 and the code `ai.profile_not_allowed`. A request for a profile that doesn't exist fails with HTTP 400 and `ai.profile_not_found`. Reveal never falls back to another profile silently.
- The candidates include [dynamic (BYOK) profiles](byok.md). An authorizer that keeps only specific names, like the free-plan branch above, hides them too.
- The developer's intent mappings and default profile are the developer's own decisions, so the authorizer doesn't filter them. It only governs what clients may request.
- In Node.js and Java, a callback that throws or returns a malformed result denies every profile, and names that weren't among the candidates are ignored.

## Route profiles per user

:::info Preview

The profile selector (`IAIProfileSelector`) is a preview feature. It works as described below, but its API may still change.

:::

The selector is available on ASP.NET. Implement `IAIProfileSelector` and return an `AIProfileSelection`, or `null` to keep the normal routing:

```csharp title="PlanProfileSelector.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

public sealed class PlanProfileSelector : IAIProfileSelector
{
    private readonly IPlanStore _plans;

    public PlanProfileSelector(IPlanStore plans) => _plans = plans;

    public async ValueTask<AIProfileSelection?> SelectProfilesAsync(
        IRVUserContext user, CancellationToken cancellationToken)
    {
        var plan = await _plans.GetPlanAsync(user.UserId, cancellationToken);
        return plan switch
        {
            "enterprise" => new AIProfileSelection
            {
                IntentProfiles = new Dictionary<string, string>
                {
                    [Intents.GenerationBuildReport] = "premium",
                    [Intents.WidgetAnalysis] = "premium",
                    [Intents.DashboardAnalysis] = "premium",
                },
            },
            "free" => new AIProfileSelection { DefaultProfile = "mini" },
            _ => null,
        };
    }
}
```

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    // providers, profiles, and intent mappings
    .UseProfileSelector<PlanProfileSelector>();
```

For a simple selector, pass a delegate instead: `UseProfileSelector((user, cancellationToken) => ...)`. Only one selector is supported; registering a second one replaces the first.

| Property | Description |
|---|---|
| `IntentProfiles` | Profiles for specific intents. They take precedence over the developer's intent mappings and over the profile the client requested. Intent names are matched case-insensitively. |
| `DefaultProfile` | The profile for this user's calls that have no other assignment. A profile the client requested takes precedence. |

For each AI call, Reveal uses the first profile that applies, in this order:

1. The selector's `IntentProfiles` entry for the call's intent.
2. The developer's intent mapping (`MapIntent` or `RevealAI:Intents`).
3. The profile the client requested.
4. The selector's `DefaultProfile`.
5. The developer's default profile.

How the selector behaves:

- **It runs once per user operation**, such as a chat message or an insight, not once per AI call, so one plan lookup covers every call in the operation. It doesn't run for background work Reveal performs on its own, such as metadata enrichment and datasource ranking during a dashboard generation.
- **A user's explicit choice is never overridden by `DefaultProfile`.** If some users shouldn't be able to pick a profile at all, remove it with the authorizer: the user then gets a clear error instead of being silently rerouted.
- **`DefaultProfile` doesn't change the default reported by `GET /api/reveal/ai/profiles`.** If a model picker preselects that reported default and sends it with every request, it counts as an explicit choice, and the selector's `DefaultProfile` never applies.
- **Selected profiles must be profiles the developer defined.** The authorizer doesn't filter them, and naming an unknown profile, or a [dynamic (BYOK) profile](byok.md), fails the operation.
- **Errors fail the operation.** If the developer's plan store is unavailable, requests fail rather than run on the wrong tier.
- **Keep it consistent with the quota gate.** The [quota gate](quota-gate.md) sees the profile each call actually used, including profiles the selector chose, so both should read the same plan data.

A dashboard analysis uses two intents: `dashboard-analysis` for its plan and final report, and `widget-analysis` for each widget's analysis and the summary of them. Wherever the developer routes `widget-analysis`, route `dashboard-analysis` too, as the example does.
