---
sidebar_label: Azure OpenAI
---


# Azure OpenAI Provider

The Azure OpenAI provider integrates Reveal SDK AI with Azure's OpenAI Service, allowing you to use OpenAI models deployed in your own Azure subscription with enterprise-grade security and compliance.

## Installation

Install the Azure OpenAI provider NuGet package:

```bash
dotnet add package Reveal.Sdk.AI.AzureOpenAI
```

## Configuration

### Basic Setup

Add the Azure OpenAI provider in your `Program.cs`:

```csharp
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddReveal();

builder.Services.AddRevealAI()
    .AddAzureOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:AzureOpenAI:ApiKey"];
        options.Endpoint = "https://your-resource-name.openai.azure.com/";
        options.DeploymentName = "gpt-4o";
    });

var app = builder.Build();
app.MapControllers();
app.Run();
```

### Using appsettings.json

The provider automatically binds to the `RevealAI:AzureOpenAI` configuration section:

```json title="appsettings.json"
{
  "RevealAI": {
    "AzureOpenAI": {
      "ApiKey": "your-azure-api-key",
      "Endpoint": "https://your-resource-name.openai.azure.com/",
      "DeploymentName": "gpt-4o",
      "Temperature": 0.0,
      "MaxTokens": 4096
    }
  }
}
```

With configuration binding, no code options are needed:

```csharp
builder.Services.AddRevealAI()
    .AddAzureOpenAI();
```

## Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ApiKey` | `string` | `""` | **Required.** Your Azure OpenAI API key. |
| `Endpoint` | `string` | `""` | **Required.** The Azure OpenAI endpoint URL (e.g., `https://your-resource-name.openai.azure.com/`). |
| `DeploymentName` | `string` | `""` | **Required.** The name of your model deployment in Azure. |
| `Temperature` | `float?` | `0.0` | Controls randomness (0.0 to 2.0). Lower values are more deterministic. |
| `MaxTokens` | `int?` | `4096` | Maximum number of tokens to generate in the response. |
| `TopP` | `float?` | `1.0` | Nucleus sampling parameter. |
| `ReasoningEffort` | `string?` | `null` | Reasoning effort level for reasoning models (e.g., o3, o4). |

## Azure Setup Prerequisites

Before using the Azure OpenAI provider, you need:

1. An **Azure subscription** with access to Azure OpenAI Service
2. An **Azure OpenAI resource** created in the Azure portal
3. A **model deployment** (e.g., GPT-4o, GPT-4.1) within that resource
4. The **API key** and **endpoint** from the Azure portal

You can find your API key and endpoint in the Azure portal under your Azure OpenAI resource's **Keys and Endpoint** section.

## Reasoning Models

Like the OpenAI provider, the Azure OpenAI provider automatically detects reasoning model deployments (o1, o3, o4, gpt-5) and adjusts behavior accordingly:

- Temperature is disabled for reasoning models
- Reasoning effort can be configured

```csharp
builder.Services.AddRevealAI()
    .AddAzureOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:AzureOpenAI:ApiKey"];
        options.Endpoint = "https://your-resource.openai.azure.com/";
        options.DeploymentName = "o3";
        options.ReasoningEffort = "Medium";
    });
```

:::danger Never Commit API Keys

Never commit API keys to source control. Always use environment variables, User Secrets, or a secure key management service.

:::
