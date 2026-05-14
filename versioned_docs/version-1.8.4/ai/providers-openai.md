---
sidebar_label: OpenAI
---


# OpenAI Provider

The OpenAI provider integrates Reveal SDK AI with OpenAI's chat completion API, enabling access to models like GPT-4.1, GPT-4o, and reasoning models like o3 and o4.

## Installation

Install the OpenAI provider NuGet package:

```bash
dotnet add package Reveal.Sdk.AI.OpenAI
```

## Configuration

### Basic Setup

Add the OpenAI provider in your `Program.cs`:

```csharp
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddReveal();

builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
    });

var app = builder.Build();
app.MapControllers();
app.Run();
```

### Using appsettings.json

The provider automatically binds to the `RevealAI:OpenAI` configuration section:

```json title="appsettings.json"
{
  "RevealAI": {
    "OpenAI": {
      "ApiKey": "sk-your-api-key-here",
      "Model": "gpt-4.1",
      "Temperature": 0.0,
      "MaxTokens": 4096
    }
  }
}
```

With configuration binding, no code options are needed:

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI();
```

## Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ApiKey` | `string` | `""` | **Required.** Your OpenAI API key. |
| `Model` | `string` | `"gpt-4.1"` | The model to use for chat completions. |
| `Temperature` | `float?` | `0.0` | Controls randomness (0.0 to 2.0). Lower values are more deterministic. |
| `MaxTokens` | `int?` | `4096` | Maximum number of tokens to generate in the response. |
| `TopP` | `float?` | `1.0` | Nucleus sampling parameter. |
| `Endpoint` | `string` | `""` | Custom endpoint URL. Use this for OpenAI-compatible APIs. |
| `ReasoningEffort` | `string?` | `null` | Reasoning effort level for reasoning models (e.g., o3, o4). |

## Reasoning Models

The provider automatically detects reasoning models (o1, o3, o4, gpt-5) and adjusts behavior accordingly:

- Temperature is disabled for reasoning models
- Reasoning effort can be configured via the `ReasoningEffort` option

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
        options.Model = "o3";
        options.ReasoningEffort = "Medium";
    });
```

## Custom Endpoints

If you are using an OpenAI-compatible API (such as a local model server), you can specify a custom endpoint:

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "your-api-key";
        options.Endpoint = "https://your-custom-endpoint.com/v1";
        options.Model = "your-model-name";
    });
```

:::danger Never Commit API Keys

Never commit API keys to source control. Always use environment variables, User Secrets, or a secure key management service.

:::
