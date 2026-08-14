---
sidebar_label: Building a Custom Provider
---

# Building a Custom Provider

Implement `IAIProvider` to connect Reveal SDK AI to an LLM service that does not have a built-in provider. A provider is a connection adapter; register it by name and expose it through one or more [profiles](providers-overview.md#profiles). Clients select profiles, never providers directly.

## Implement the provider

Implement `GetResponseAsync`. Reveal resolves the selected profile before calling the provider, so `request.Settings` includes the model and call settings.

```csharp title="MyCustomProvider.cs"
using Reveal.Sdk.AI;

public sealed class MyCustomProvider : IAIProvider
{
    public async Task<AIResponse> GetResponseAsync(
        AIRequest request,
        CancellationToken cancellationToken = default)
    {
        // Send request.Messages and request.Settings to your LLM service.
        var result = await _client.GetResponseAsync(
            request.Messages,
            request.Settings,
            cancellationToken);

        return new AIResponse
        {
            Text = result.Text,
            FinishReason = AIFinishReason.Stop,
            Model = request.Settings.Model
        };
    }
}
```

| `AIRequest` property | Description |
|---|---|
| `Messages` | Conversation messages with their roles. |
| `Settings` | Fully resolved profile settings, including the model. |
| `Intent` | The SDK workflow that initiated the request. |
| `ResponseFormat` | Whether text or JSON output is requested. |
| `UserContext` | Calling user, or the system user for background work. |

Return `AIResponse` with the generated `Text`; include `FinishReason`, `Model`, and `AITokenUsage` whenever the service reports them.

## Register the connection and profile

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddProvider<MyCustomProvider>("my-service")
    .AddProfile("my-service-default", profile =>
    {
        profile.Provider = "my-service";
        profile.Model = "my-model";
        profile.DisplayName = "My service";
        profile.Temperature = 0.2;
    })
    .SetDefaultProfile("my-service-default");
```

:::tip

Do not keep a model name inside the provider implementation. One provider can serve multiple profiles; read the resolved model and generation settings from `request.Settings`.

:::

## Migrating existing providers

`SendPromptAsync(ProviderRequest)` remains temporarily for compatibility. Implement `GetResponseAsync(AIRequest)` for new providers: it preserves message roles and receives profile-resolved settings. The legacy `Name` property is no longer used for selection; the name passed to `AddProvider` identifies the connection.
