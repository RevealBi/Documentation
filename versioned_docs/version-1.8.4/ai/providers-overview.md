---
sidebar_label: Overview
---


# AI Providers Overview

Reveal SDK AI uses a provider-based architecture that lets you integrate with different large language model (LLM) services. Each provider is distributed as a separate NuGet package, so you only install what you need.

## Available Providers

| Provider | NuGet Package | Extension Method |
|----------|--------------|-----------------|
| [OpenAI](providers-openai.md) | `Reveal.Sdk.AI.OpenAI` | `.AddOpenAI()` |
| [Azure OpenAI](providers-azure-openai.md) | `Reveal.Sdk.AI.AzureOpenAI` | `.AddAzureOpenAI()` |
| [Anthropic](providers-anthropic.md) | `Reveal.Sdk.AI.Anthropic` | `.AddAnthropic()` |
| [Google Gemini](providers-google-gemini.md) | `Reveal.Sdk.AI.Google` | `.AddGoogle()` |

## How Providers Work

All providers implement the `IAIProvider` interface and are registered through the `IRevealAIBuilder` fluent API. The SDK uses dependency injection with keyed services, allowing you to register multiple providers simultaneously.

### Registering Providers

Providers are added by chaining extension methods after `AddRevealAI()`:

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "your-api-key";
    })
    .AddAnthropic(options =>
    {
        options.ApiKey = "your-api-key";
    });
```

### Default Provider

The SDK uses a default provider when no specific provider is requested. You can configure this in `appsettings.json`:

```json title="appsettings.json"
{
  "RevealAI": {
    "DefaultProvider": "openai"
  }
}
```

Available provider keys: `openai`, `azure-openai`, `anthropic`, `google`.

### Configuration Binding

All providers support configuration binding from `appsettings.json` under the `RevealAI` section. Options set in code take precedence over configuration file values:

```json title="appsettings.json"
{
  "RevealAI": {
    "DefaultProvider": "openai",
    "OpenAI": {
      "ApiKey": "sk-...",
      "Model": "gpt-4.1"
    },
    "Anthropic": {
      "ApiKey": "sk-ant-..."
    }
  }
}
```

### Multiple Providers

You can register multiple providers and the SDK will resolve the appropriate one based on the request. This is useful for scenarios such as:

- Using different models for different types of analysis
- Providing fallback options
- Cost optimization by routing simpler tasks to less expensive models

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI()        // Registered as "openai"
    .AddAnthropic()     // Registered as "anthropic"
    .AddGoogle();       // Registered as "google"
```

## Custom Providers

If you need to integrate with an LLM service that isn't supported out of the box, you can [build a custom provider](providers-building-custom.md).
