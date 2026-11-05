---
sidebar_label: Overview
---

# AI Providers and Profiles

Reveal SDK AI separates **provider connections** from **profiles**. A provider holds credentials and endpoint details for an LLM service. A profile is the configuration clients select: it references a provider and specifies a model plus generation settings. This lets several profiles share one provider connection without exposing credentials or model identifiers to clients.

## Providers

Register each LLM connection under a unique name. Built-in extensions register common connections; custom connections use `AddProvider`.

| Provider | ASP.NET NuGet | Registration name | Extension method |
|---|---|---|---|
| [OpenAI](providers-openai.md) | `Reveal.Sdk.AI.OpenAI` | `openai` | `.AddOpenAI()` |
| [Azure OpenAI](providers-azure-openai.md) | `Reveal.Sdk.AI.AzureOpenAI` | `azure-openai` | `.AddAzureOpenAI()` |
| [Anthropic](providers-anthropic.md) | `Reveal.Sdk.AI.Anthropic` | `anthropic` | `.AddAnthropic()` |
| [Google Gemini](providers-google-gemini.md) | `Reveal.Sdk.AI.Google` | `google` | `.AddGoogle()` |

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddAnthropic();
```

Use configuration or a secrets manager for connection settings:

```json title="appsettings.json"
{
  "RevealAI": {
    "Providers": {
      "openai": { "ApiKey": "<openai-api-key>" },
      "anthropic": { "ApiKey": "<anthropic-api-key>" }
    }
  }
}
```

## Profiles

Profiles name the models and settings available to clients. Define them in `RevealAI:Profiles` or with `AddProfile`; a profile defined in code overrides a configuration profile with the same name.

```json title="appsettings.json"
{
  "RevealAI": {
    "DefaultProfile": "fast",
    "Profiles": {
      "fast": {
        "Provider": "openai",
        "Model": "gpt-4.1-mini",
        "DisplayName": "Fast",
        "Description": "Fast answers for everyday analysis",
        "Temperature": 0.2,
        "MaxOutputTokens": 2048
      },
      "premium": {
        "Provider": "anthropic",
        "Model": "claude-sonnet-4-5",
        "DisplayName": "Premium"
      }
    }
  }
}
```

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddAnthropic()
    .AddProfile("fast", p =>
    {
        p.Provider = "openai";
        p.Model = "gpt-4.1-mini";
        p.DisplayName = "Fast";
        p.Temperature = 0.2;
    })
    .AddProfile("premium", p =>
    {
        p.Provider = "anthropic";
        p.Model = "claude-sonnet-4-5";
        p.DisplayName = "Premium";
    })
    .SetDefaultProfile("fast");
```

| Property | Required | Description |
|---|---|---|
| `Provider` | Yes | Registered provider connection name. |
| `Model` | Yes | Model ID or Azure OpenAI deployment name. |
| `DisplayName`, `Description` | No | Client-facing text for a model picker. |
| `Temperature`, `MaxOutputTokens`, `TopP`, `ReasoningEffort`, `Seed` | No | Generation settings. |
| `AdditionalProperties` | No | Provider-specific call settings. |

### Default profile and intent routing

`DefaultProfile` is used when no profile is requested and the intent is unmapped. If exactly one profile exists, Reveal uses it by default. Pin a workflow to a profile with `MapIntent`; intent mappings take precedence over a client-requested profile.

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddAnthropic()
    .AddProfile("default", p => { p.Provider = "openai"; p.Model = "gpt-4.1-mini"; })
    .AddProfile("dashboard-generation", p => { p.Provider = "anthropic"; p.Model = "claude-sonnet-4-5"; })
    .SetDefaultProfile("default")
    .MapIntent(AIIntents.GenerationBuildReport, "dashboard-generation");
```

The server exposes profiles allowed for the current user at `GET /api/reveal/ai/profiles`. The response includes profile names, display information, and default status—not the provider connection or model ID.

### Compatibility

`DefaultProvider` and provider-level model settings are retained for compatibility but are deprecated. Existing applications that register only a built-in provider keep working: Reveal creates a profile named after that provider registration (for example, `openai`). For new applications, use `DefaultProfile` and explicit profiles.

## Custom providers

To integrate with an unsupported service, [build a custom provider](providers-building-custom.md), register the connection, then add a profile that references it.
