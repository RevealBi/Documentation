---
sidebar_label: Azure OpenAI
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Azure OpenAI Provider

The Azure OpenAI provider integrates Reveal SDK AI with Azure's OpenAI Service, allowing you to use OpenAI models deployed in your own Azure subscription with enterprise-grade security and compliance.

## Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Install the Azure OpenAI provider NuGet package:

```bash
dotnet add package Reveal.Sdk.AI.AzureOpenAI
```

  </TabItem>

  <TabItem value="node" label="Node.js">

The Azure OpenAI provider is bundled with `reveal-sdk-node-ai` — no extra package is required:

```bash npm2yarn
npm install reveal-sdk-node-ai
```

  </TabItem>

  <TabItem value="java" label="Java">

The Azure OpenAI provider is bundled with `reveal-sdk-ai` — no extra dependency is required beyond the base AI artifact:

```xml title="pom.xml"
<dependency>
  <groupId>io.revealbi</groupId>
  <artifactId>reveal-sdk-ai</artifactId>
  <version>1.0.6-SNAPSHOT</version>
</dependency>
```

  </TabItem>
</Tabs>

## Configuration

### Basic Setup

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Add the Azure OpenAI provider in your `Program.cs`:

```csharp title="Program.cs"
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

  </TabItem>

  <TabItem value="node" label="Node.js">

Pass Azure OpenAI settings under the `azure-openai` key in the `settings` object:

```javascript title="server.js"
const reveal = require('reveal-sdk-node');
const revealAI = require('reveal-sdk-node-ai');
const express = require('express');

const aiSettings = {
    'azure-openai': {
        ApiKey: process.env.AZURE_OPENAI_API_KEY,
        Endpoint: 'https://your-resource-name.openai.azure.com/',
        DeploymentName: 'gpt-4o'
    }
};

const revealOptions = {
    plugins: [
        revealAI.withOptions({
            defaultProvider: 'azure-openai',
            settings: aiSettings
        })
    ]
};

const app = express();
app.use('/', reveal(revealOptions));
app.listen(5111);
```

  </TabItem>

  <TabItem value="java" label="Java">

Pass Azure OpenAI settings under the `azure-openai` key in the `settings` map and register the plugin:

```java title="Application.java"
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.ai.RevealAIPluginOptions;
import io.revealbi.core.IRevealServer;
import io.revealbi.core.RevealServerBuilder;

import java.util.Map;

Map<String, Object> aiSettings = Map.of(
        "azure-openai", Map.of(
                "ApiKey", System.getenv("AZURE_OPENAI_API_KEY"),
                "Endpoint", "https://your-resource-name.openai.azure.com/",
                "DeploymentName", "gpt-4o"));

RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "azure-openai",
        "config/catalog.json",
        null,
        null,
        Map.of("settings", aiSettings));

IRevealServer revealServer = new RevealServerBuilder()
        .addPlugin(RevealAIPlugin.withOptions(aiPluginOptions))
        .build();
```

  </TabItem>
</Tabs>

### Using a Configuration File

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

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

  </TabItem>

  <TabItem value="node" label="Node.js">

Node.js does not bind to `appsettings.json`. Load your settings from environment variables, a secrets manager, or a local config file and pass them inline:

```javascript title="server.js"
const aiSettings = {
    'azure-openai': {
        ApiKey: process.env.AZURE_OPENAI_API_KEY,
        Endpoint: 'https://your-resource-name.openai.azure.com/',
        DeploymentName: 'gpt-4o',
        Temperature: 0.0,
        MaxTokens: 4096
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

Java does not bind to `appsettings.json`. Load your settings from environment variables, a secrets manager, or a local config file and pass them inline:

```java title="Application.java"
Map<String, Object> aiSettings = Map.of(
        "azure-openai", Map.of(
                "ApiKey", System.getenv("AZURE_OPENAI_API_KEY"),
                "Endpoint", "https://your-resource-name.openai.azure.com/",
                "DeploymentName", "gpt-4o",
                "Temperature", 0.0,
                "MaxTokens", 4096));
```

  </TabItem>
</Tabs>

## Options

The same option names are used across all server platforms — ASP.NET sets them on the strongly-typed `options` object, Node.js and Java set them as keys in the `azure-openai` settings map.

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

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

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

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript
const aiSettings = {
    'azure-openai': {
        ApiKey: process.env.AZURE_OPENAI_API_KEY,
        Endpoint: 'https://your-resource.openai.azure.com/',
        DeploymentName: 'o3',
        ReasoningEffort: 'Medium'
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
Map<String, Object> aiSettings = Map.of(
        "azure-openai", Map.of(
                "ApiKey", System.getenv("AZURE_OPENAI_API_KEY"),
                "Endpoint", "https://your-resource.openai.azure.com/",
                "DeploymentName", "o3",
                "ReasoningEffort", "Medium"));
```

  </TabItem>
</Tabs>

:::danger Never Commit API Keys

Never commit API keys to source control. Always use environment variables, User Secrets, or a secure key management service.

:::
