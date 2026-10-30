---
sidebar_label: Dynamic Profiles (BYOK)
sidebar_custom_props:
  status: preview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dynamic Profiles (BYOK)

A dynamic profile lets each user bring their own key (BYOK): run AI features on their own provider account, with their own API key and model.

Reveal doesn't store users' keys. To offer dynamic profiles, the developer needs to provide:

1. A screen where users choose a provider and model and enter their API key.
2. Storage for those connection details. Reveal never stores them itself.
3. A resolver that retrieves and returns a user's connection details when Reveal asks for them.

A dynamic profile is then a [profile](providers-overview.md#profiles) clients can request like any other, whose connection details come from that resolver. It appears in the profile list only for users who have a connection, so it fits naturally into a model picker as an option like "Use my own key".

## Declare the profile and resolver

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Implement `IAIConnectionResolver`. Return the user's connection for the requested profile, or `null` when the user hasn't set one up:

```csharp title="UserConnectionResolver.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

public sealed class UserConnectionResolver : IAIConnectionResolver
{
    private readonly IUserSettingsStore _settings;

    public UserConnectionResolver(IUserSettingsStore settings) => _settings = settings;

    public async ValueTask<AIConnectionDescriptor?> ResolveAsync(
        string profileName, IRVUserContext user, CancellationToken cancellationToken)
    {
        // Retrieve details from custom storage
        var connection = await _settings.GetAIConnectionAsync(user.UserId, profileName, cancellationToken);
        if (connection is null)
        {
            return null;
        }

        return new AIConnectionDescriptor
        {
            ProviderType = connection.ProviderType,   // for example, "openai"
            Model = connection.Model,
            ApiKey = connection.DecryptedApiKey,
        };
    }
}
```

Declare the dynamic profile and register the resolver in one call:

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddProfile("default", p => { p.Provider = "openai"; p.Model = "gpt-4.1"; })
    .AddDynamicProfile<UserConnectionResolver>("my-ai", displayName: "Use my own key");
```

`displayName` and `description` are optional, and are what a model picker shows. The profile name is the identifier clients send.

A dynamic profile can't be the default profile, so declare at least one static profile, as the `default` profile above. Users can only connect to [provider types the server makes available](#available-provider-types).

  </TabItem>

  <TabItem value="node" label="Node.js">

List the dynamic profile names in `dynamicProfiles`, and add a `connectionResolver` callback. Return the user's connection for the requested profile, or `null` when the user hasn't set one up:

```javascript title="server.js"
revealAI.withOptions({
    providers: {
        openai: { type: 'OpenAI', apiKey: process.env.OPENAI_API_KEY }
    },
    profiles: {
        default: { provider: 'openai', model: 'gpt-4.1' }
    },
    dynamicProfiles: ['my-ai'],
    callbacks: {
        connectionResolver: async ({ profileName, user }) => {
            // Retrieve details from custom storage
            const connection = await userSettings.getAIConnection(user?.userId, profileName);
            if (!connection) return null;
            return {
                providerType: connection.providerType,    // for example, 'openai'
                model: connection.model,
                apiKey: connection.decryptedApiKey
            };
        }
    }
});
```

Dynamic profiles require the `providers` and `profiles` options shown here: once `dynamicProfiles` is used, the `defaultProvider` and `settings` options shown in [Install Server SDK](install-server-sdk.md) are ignored. Dynamic profiles can't have a display name or description in Node.js, so a model picker shows the profile name.

  </TabItem>

  <TabItem value="java" label="Java">

Declare the dynamic profile with `addDynamicProfile`, and register a `"connectionResolver"` callback. It receives `{ profileName, user }` as JSON and returns the user's connection for that profile, or `null` when the user hasn't set one up:

```java title="Application.java"
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.ai.RevealAIPluginOptions;
import io.revealbi.core.RevealPluginCallback;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

ObjectMapper json = new ObjectMapper();

RevealAIPluginOptions aiPluginOptions = RevealAIPluginOptions.builder()
        .metadataCatalogFile("config/catalog.json")
        .addProvider("openai", Map.of("type", "OpenAI", "apiKey", System.getenv("OPENAI_API_KEY")))
        .addProfile("default", Map.of("provider", "openai", "model", "gpt-4.1"))
        .addDynamicProfile("my-ai")
        .build();

RevealPluginCallback connectionResolver = (userContext, message) -> {
    try {
        JsonNode request = json.readTree(message);
        // Retrieve details from custom storage
        UserConnection connection = userSettings.getAIConnection(
                request.path("user").path("userId").asText(null),
                request.path("profileName").asText());
        if (connection == null) {
            return CompletableFuture.completedFuture("null");
        }
        return CompletableFuture.completedFuture(json.writeValueAsString(Map.of(
                "providerType", connection.providerType(),    // for example, "openai"
                "model", connection.model(),
                "apiKey", connection.decryptedApiKey())));
    } catch (Exception ex) {
        return CompletableFuture.failedFuture(ex);
    }
};

IRevealServer revealServer = new RevealServerBuilder()
        .addPlugin(RevealAIPlugin.withOptions(aiPluginOptions, Map.of(
                "connectionResolver", connectionResolver)))
        .build();
```

Dynamic profiles require the `addProvider` and `addProfile` options shown here: once `addDynamicProfile` is used, the `defaultProvider` and `settings` options shown in [Install Server SDK](install-server-sdk.md) are ignored. Dynamic profiles can't have a display name or description in Java, so a model picker shows the profile name.

  </TabItem>
</Tabs>

`IUserSettingsStore`, `userSettings`, and `UserConnection` stand for the developer's own storage of user connections.

## Connection

| Property | Required | Description |
|---|---|---|
| `ProviderType` | Yes | The provider to connect to: `openai`, `azure-openai`, `anthropic`, or `openai-compatible`. Google Gemini isn't available for dynamic profiles. The provider type must be [available on the server](#available-provider-types). |
| `Model` | Yes | The model ID, or the deployment name for Azure OpenAI. |
| `ApiKey` | Yes, except for `openai-compatible` | The user's API key. Without it, the request fails with `ai.connection_invalid`. |
| `Endpoint` | No | A custom endpoint URL. Required for `azure-openai` and `openai-compatible`. Rejected unless the developer allows custom endpoints. |
| `Settings` | No | Generation settings for this user's calls, such as `Temperature` or `MaxOutputTokens`. |

Reveal creates the provider client from the connection and reuses it for up to 15 minutes. A connection with any different value, such as a new API key, gets a new client immediately.

## Available provider types

Users can only connect to provider types the developer's server registers, and registering a provider type requires a complete connection of the developer's own for that provider: Reveal creates every registered provider at startup, and fails to start if its connection is missing a required value such as the API key. For example, to let users bring Anthropic keys, the server also needs its own Anthropic connection.

| Provider type | ASP.NET | Node.js and Java |
|---|---|---|
| `openai` | `AddOpenAI()` | A `providers` entry with `type: 'OpenAI'` |
| `azure-openai` | `AddAzureOpenAI()` | A `providers` entry with `type: 'AzureOpenAI'` |
| `anthropic` | `AddAnthropic()` | A `providers` entry with `type: 'Anthropic'` |
| `openai-compatible` | `AddOpenAICompatible("<name>")`, with a `BaseUrl` | A `providers` entry with `type: 'OpenAICompatible'` |

In Java, add the entry with `addProvider`. Each registration reads its connection, such as the API key, from configuration (`RevealAI:Providers:<name>` on ASP.NET) or from the options of its `providers` entry.

## Security

Connections come from users, so Reveal constrains them:

- **Custom endpoints are rejected by default.** This prevents users from making the developer's server send requests to arbitrary URLs. Azure OpenAI and OpenAI-compatible connections always need an endpoint, so users can't connect to them until custom endpoints are allowed. To allow them, set `RevealAI:DynamicProfiles:AllowCustomEndpoints` to `true`.
- **The developer can restrict the provider types** users may connect to with `RevealAI:DynamicProfiles:AllowedProviderTypes`. By default, every provider type the developer's server registers is allowed.

```json title="appsettings.json"
{
  "RevealAI": {
    "DynamicProfiles": {
      "AllowedProviderTypes": [ "openai", "anthropic" ],
      "AllowCustomEndpoints": false,
      "CacheTtl": "00:15:00"
    }
  }
}
```

`CacheTtl` sets how long a provider client created from a user's connection is reused.

These settings are available on ASP.NET only. On Node.js and Java the defaults apply: custom endpoints are always rejected, so `azure-openai` and `openai-compatible` connections can't be used; every provider type the developer's server registers is allowed; and provider clients are reused for 15 minutes.

API keys are never logged or used directly as cache keys.

## How dynamic profiles behave

- **Users without a connection don't see the profile.** The resolver runs when the profile list is requested and when a request uses the profile. When it returns `null`, the profile is hidden from that user, and requests for it fail with HTTP 403 and the code `ai.profile_not_allowed`.
- **An invalid connection fails the request.** A missing model, a provider type that isn't allowed or registered, a custom endpoint the developer didn't allow, or a resolver that throws fails the user's request with HTTP 400 and the code `ai.connection_invalid`. When listing profiles, a resolver that throws hides the profile instead.
- **Reveal never falls back to the developer's own keys.** If the provider rejects the user's key, for example because it was revoked, the call fails like any other provider error.
- **The developer's intent mappings still apply.** Intents the developer pins with `MapIntent`, or with a [profile selector](profile-selection.md), keep running on the developer's models, and the rest run on the user's connection.
- **The developer's other hooks still apply.** The [profile authorizer](profile-selection.md) receives dynamic profiles among its candidates and can hide them, and calls on a user's connection reach the [quota gate](quota-gate.md) and [usage tracking](usage-tracking.md) with `IsUserConnection` set to `true`. Use it, for example, to skip token billing for users spending their own key.
- **A profile selector can't choose a dynamic profile.** Running on a user's own key is always the user's explicit choice.
- In Node.js and Java, a resolver callback that throws or returns a malformed result is treated as `null`, and a warning is logged.

## Several dynamic profiles

Each dynamic profile is a choice the user can make, so most applications need only one.

- **If the model depends on the user's plan**, use one dynamic profile and return a different `Model` from the resolver.
- **If users choose between several of their own connections**, such as a fast one and a premium one, declare one dynamic profile per choice. A single resolver serves them all and receives the profile name; return `null` for profiles the user's plan doesn't include.

On ASP.NET, register the resolver with the first profile, and declare the others without it. A static default profile is still required:

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddProfile("default", p => { p.Provider = "openai"; p.Model = "gpt-4.1"; })
    .AddDynamicProfile<UserConnectionResolver>("my-fast", "My key (fast)")
    .AddDynamicProfile("my-premium", "My key (premium)");
```

In Node.js and Java, list every name in `dynamicProfiles`, or call `addDynamicProfile` once per name.
