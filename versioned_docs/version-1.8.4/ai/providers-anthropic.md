---
sidebar_label: Anthropic
---


# Anthropic Provider

The Anthropic provider integrates Reveal SDK AI with Anthropic's Claude models, providing access to the Claude family of AI assistants.

## Installation

Install the Anthropic provider NuGet package:

```bash
dotnet add package Reveal.Sdk.AI.Anthropic
```

## Configuration

### Basic Setup

Add the Anthropic provider in your `Program.cs`:

```csharp
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddReveal();

builder.Services.AddRevealAI()
    .AddAnthropic(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:Anthropic:ApiKey"];
    });

var app = builder.Build();
app.MapControllers();
app.Run();
```

### Using appsettings.json

The provider automatically binds to the `RevealAI:Anthropic` configuration section:

```json title="appsettings.json"
{
  "RevealAI": {
    "Anthropic": {
      "ApiKey": "sk-ant-your-api-key-here",
      "Model": "claude-opus-4-1",
      "MaxTokens": 4096
    }
  }
}
```

With configuration binding, no code options are needed:

```csharp
builder.Services.AddRevealAI()
    .AddAnthropic();
```

## Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ApiKey` | `string` | `""` | **Required.** Your Anthropic API key. |
| `Model` | `string` | `"claude-opus-4-1"` | The Claude model to use. |
| `MaxTokens` | `int` | `4096` | Maximum number of tokens to generate in the response. |

## Available Models

Anthropic offers several Claude models. Here are some commonly used options:

| Model | Description |
|-------|-------------|
| `claude-opus-4-1` | Most capable model for complex tasks (default) |
| `claude-sonnet-4-5` | Balanced performance and speed |
| `claude-haiku-3-5` | Fastest and most cost-effective |

```csharp
builder.Services.AddRevealAI()
    .AddAnthropic(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:Anthropic:ApiKey"];
        options.Model = "claude-sonnet-4-5";
        options.MaxTokens = 8192;
    });
```

## Getting an API Key

1. Create an account at [console.anthropic.com](https://console.anthropic.com)
2. Navigate to **API Keys** in the console
3. Create a new API key
4. Store it securely using User Secrets or environment variables

:::danger Never Commit API Keys

Never commit API keys to source control. Always use environment variables, User Secrets, or a secure key management service.

:::
