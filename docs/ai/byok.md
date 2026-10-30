---
sidebar_label: Dynamic Profiles (BYOK)
sidebar_custom_props:
  status: preview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dynamic Profiles (BYOK)

A dynamic profile lets each end user bring their own key (BYOK): run AI features on their own provider account, with their own API key and model. You store each user's connection (in your database, with your encryption, set up through your own settings screen), and Reveal asks for it when the user needs it.

A dynamic profile is a [profile](providers-overview.md#profiles) clients can request like any other, but its connection comes from a resolver you implement, per user. It appears in the profile list only for users who have a connection, so it fits naturally into a model picker as an option like "Use my own key".

## Declare the profile and resolver

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Implement `IAIConnectionResolver`. Return the user's connection, or `null` when the user hasn't set one up:

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
        var connection = await _settings.GetAIConnectionAsync(user.UserId, cancellationToken);
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
    .AddAnthropic()
    .AddProfile("default", p => { p.Provider = "openai"; p.Model = "gpt-4.1"; })
    .AddDynamicProfile<UserConnectionResolver>("my-ai", displayName: "Use my own key");
```

`displayName` and `description` are optional, and are what a model picker shows. The profile name is the identifier clients send.

  </TabItem>

  <TabItem value="node" label="Node.js">

List the dynamic profile names in `dynamicProfiles`, and add a `connectionResolver` callback. Return the user's connection, or `null` when the user hasn't set one up:

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
            const connection = await userSettings.getAIConnection(user?.userId);
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

  </TabItem>

  <TabItem value="java" label="Java">

Declare the dynamic profile with `addDynamicProfile`, and register a `"connectionResolver"` callback. It receives `{ profileName, user }` as JSON and returns the user's connection, or `null` when the user hasn't set one up:

```java title="Application.java"
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
        UserConnection connection = userSettings.getAIConnection(
                request.path("user").path("userId").asText(null));
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

  </TabItem>
</Tabs>

`IUserSettingsStore`, `userSettings`, and `UserConnection` stand for your own storage of user connections.

## Connection

| Property | Required | Description |
|---|---|---|
| `ProviderType` | Yes | The provider to connect to: `openai`, `azure-openai`, `anthropic`, `google`, or `openai-compatible`. Your server must register that provider, for example with `AddOpenAI()`. |
| `Model` | Yes | The model ID, or the deployment name for Azure OpenAI. |
| `ApiKey` | No | The user's API key, when the provider needs one. |
| `Endpoint` | No | A custom endpoint URL. Rejected unless you allow custom endpoints. |
| `Settings` | No | Generation settings for this user's calls, such as `Temperature` or `MaxOutputTokens`. |

Reveal creates the provider client from the connection and reuses it for up to 15 minutes. A connection with any different value, such as a new API key, gets a new client immediately.

## Security

Connections come from your users, so Reveal constrains them:

- **Custom endpoints are rejected by default.** This prevents users from making your server send requests to arbitrary URLs. To allow them, for example for self-hosted models, set `RevealAI:DynamicProfiles:AllowCustomEndpoints` to `true`.
- **You can restrict the provider types** users may connect to with `RevealAI:DynamicProfiles:AllowedProviderTypes`. By default, every provider type your server registers is allowed.

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

API keys are never logged or used directly as cache keys.

## How dynamic profiles behave

- **Users without a connection don't see the profile.** The resolver runs when the profile list is requested and when a request uses the profile. When it returns `null`, the profile is hidden from that user, and requests for it fail with HTTP 403 and the code `ai.profile_not_allowed`.
- **An invalid connection fails the request.** A missing model, a provider type that isn't allowed or registered, a custom endpoint you didn't allow, or a resolver that throws fails the user's request with HTTP 400 and the code `ai.connection_invalid`. When listing profiles, a resolver that throws hides the profile instead.
- **Reveal never falls back to your own keys.** If the provider rejects the user's key, for example because it was revoked, the call fails like any other provider error.
- **Your intent mappings still apply.** Intents you pin with `MapIntent`, or with a [profile selector](profile-selection.md), keep running on your models, and the rest run on the user's connection.
- **Your other hooks still apply.** The [profile authorizer](profile-selection.md) can still hide the profile, and calls on a user's connection reach the [quota gate](quota-gate.md) and [usage tracking](usage-tracking.md) with `IsUserConnection` set to `true`. Use it, for example, to skip token billing for users spending their own key.
- **A profile selector can't choose a dynamic profile.** Running on a user's own key is always the user's explicit choice.
- In Node.js and Java, a resolver callback that throws or returns a malformed result is treated as `null`, and a warning is logged.

## Several dynamic profiles

Each dynamic profile is a choice the user can make, so most applications need only one.

- **If the model depends on the user's plan**, use one dynamic profile and return a different `Model` from the resolver.
- **If users choose between several of their own connections**, such as a fast one and a premium one, declare one dynamic profile per choice. A single resolver serves them all and receives the profile name; return `null` for profiles the user's plan doesn't include.

On ASP.NET, register the resolver with the first profile, and declare the others without it:

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddDynamicProfile<UserConnectionResolver>("my-fast", "My key (fast)")
    .AddDynamicProfile("my-premium", "My key (premium)");
```

In Node.js and Java, list every name in `dynamicProfiles`, or call `addDynamicProfile` once per name.
