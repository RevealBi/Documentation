---
sidebar_label: Profile Selection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Profile Selection

[Profiles](providers-overview.md#profiles) name the models and settings the developer's server offers.

By default, every user can request every profile. Calls for intents the developer has mapped use the mapped profile; other calls use the requested profile, or the default profile when none is requested.

A **profile authorizer** lets the developer decide which profiles each user may request, typically from the user's plan. It filters the profile list clients see, and rejects requests for any other profile.

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

    public async ValueTask<IReadOnlyCollection<string>> GetAuthorizedProfiles(
        IRVUserContext user, IReadOnlyCollection<string> candidateProfiles, CancellationToken cancellationToken)
    {
        // Retrieve the plan from custom storage
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
            // Retrieve the plan from custom storage
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
        // Retrieve the plan from custom storage
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

The authorizer drives both the profile list and request validation:

- `GET /api/reveal/ai/profiles`, and `client.ai.profiles.list()` in the client SDK, return only the profiles the user may use, so a model picker shows only those.
- A request for any other profile fails with HTTP 403 and the code `ai.profile_not_allowed`. A request for a profile that doesn't exist fails with HTTP 400 and `ai.profile_not_found`. Reveal never falls back to another profile silently.
- The candidates include [dynamic (BYOK) profiles](byok.md). An authorizer that keeps only specific names, like the free-plan branch above, hides them too.
- The developer's intent mappings and default profile are the developer's own decisions, so the authorizer doesn't filter them. It only governs what clients may request.
- In Node.js and Java, a callback that throws or returns a malformed result denies every profile, and names that weren't among the candidates are ignored.
