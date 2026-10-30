---
sidebar_label: Profile Selection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Profile Selection

[Profiles](providers-overview.md#profiles) name the models and settings your server offers. By default, every user can request every profile, and calls that request none use your intent mappings and default profile. Two hooks let you make those decisions per user, typically from the user's plan:

- A **profile authorizer** decides which profiles a user may request. It filters the profile list clients see, and rejects requests for any other profile.
- A **profile selector** decides which profiles serve a user, without the client asking. Use it to route, for example, dashboard generation to a premium model for enterprise users.

## Restrict which profiles a user may use

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Implement `IAIProfileAuthorizer` and return the subset of the candidate profiles the user may use:

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

The authorizer is registered as a singleton. Only one authorizer is supported; registering a second replaces the first.

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
ObjectMapper json = new ObjectMapper();

RevealPluginCallback profileAuthorizer = (userContext, message) -> {
    try {
        JsonNode request = json.readTree(message);
        String plan = plans.get(request.path("user").path("userId").asText(null));
        List<String> allowed = new ArrayList<>();
        for (JsonNode profile : request.path("candidateProfiles")) {
            String name = profile.asText();
            if (plan.equals("enterprise")
                    || (plan.equals("pro") && !name.equals("premium"))
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

`plans` and `IPlanStore` stand for your own plan storage.

The authorizer drives both the profile list and request validation:

- `GET /api/reveal/ai/profiles`, and `client.ai.profiles.list()` in the client SDK, return only the profiles the user may use, so your model picker shows only those.
- A request for any other profile fails with HTTP 403 and the code `ai.profile_not_allowed`. A request for a profile that doesn't exist fails with HTTP 400 and `ai.profile_not_found`. Reveal never falls back to another profile silently.
- Your intent mappings and default profile are your own decisions, so the authorizer doesn't filter them. It only governs what clients may request.
- In Node.js and Java, a callback that throws or returns a malformed result denies every profile, and names that weren't among the candidates are ignored.

## Route profiles per user

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

| Property | Description |
|---|---|
| `IntentProfiles` | Profiles for specific intents. They take precedence over your intent mappings and over the profile the client requested. Intent names are matched case-insensitively. |
| `DefaultProfile` | The profile for this user's calls that have no other assignment. A profile the client requested takes precedence. |

For each AI call, Reveal uses the first profile that applies, in this order:

1. The selector's `IntentProfiles` entry for the call's intent.
2. Your intent mapping (`MapIntent` or `RevealAI:Intents`).
3. The profile the client requested.
4. The selector's `DefaultProfile`.
5. Your default profile.

How the selector behaves:

- **It runs once per user operation**, such as a chat message or an insight, not once per AI call, so one plan lookup covers every call in the operation. It doesn't run for background work Reveal performs on its own, such as metadata enrichment.
- **A user's explicit choice is never overridden by `DefaultProfile`.** If some users shouldn't be able to pick a profile at all, remove it with the authorizer: the user then gets a clear error instead of being silently rerouted.
- **Selected profiles must be profiles you defined.** The authorizer doesn't filter them, and naming an unknown profile, or a [dynamic (BYOK) profile](byok.md), fails the operation with a server error.
- **Errors fail the operation.** If your plan store is unavailable, requests fail rather than run on the wrong tier.
- **Keep it consistent with your quota gate.** The [quota gate](quota-gate.md) sees the profile each call actually used, including profiles the selector chose, so both should read the same plan data.

A dashboard analysis runs under its own intent, `dashboard-analysis`, not under `widget-analysis`. Wherever you route `widget-analysis`, route `dashboard-analysis` too, as the example does.
