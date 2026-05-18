---
sidebar_label: OpenAI
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OpenAI Provider

The OpenAI provider integrates Reveal SDK AI with OpenAI's chat completion API, enabling access to models like GPT-4.1, GPT-4o, and reasoning models like o3 and o4.

## Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Install the OpenAI provider NuGet package:

```bash
dotnet add package Reveal.Sdk.AI.OpenAI
```

  </TabItem>

  <TabItem value="node" label="Node.js">

The OpenAI provider is bundled with `reveal-sdk-node-ai` — no extra package is required:

```bash npm2yarn
npm install reveal-sdk-node-ai
```

  </TabItem>

  <TabItem value="java" label="Java">

The OpenAI provider is bundled with `reveal-sdk-ai` — no extra dependency is required beyond the base AI artifact:

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

Add the OpenAI provider in your `Program.cs`:

```csharp title="Program.cs"
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

  </TabItem>

  <TabItem value="node" label="Node.js">

Pass OpenAI settings under the `openai` key in the `settings` object:

```javascript title="server.js"
const reveal = require('reveal-sdk-node');
const revealAI = require('reveal-sdk-node-ai');
const express = require('express');

const aiSettings = {
    openai: {
        ApiKey: process.env.OPENAI_API_KEY,
        Model: 'gpt-4.1'
    }
};

const revealOptions = {
    plugins: [
        revealAI.withOptions({
            defaultProvider: 'openai',
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

Pass OpenAI settings under the `openai` key in the `settings` map and register the plugin:

```java title="Application.java"
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.ai.RevealAIPluginOptions;
import io.revealbi.core.IRevealServer;
import io.revealbi.core.RevealServerBuilder;

import java.util.Map;

Map<String, Object> aiSettings = Map.of(
        "openai", Map.of(
                "ApiKey", System.getenv("OPENAI_API_KEY"),
                "Model", "gpt-4.1"));

RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "openai",
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

  </TabItem>

  <TabItem value="node" label="Node.js">

Node.js does not bind to `appsettings.json`. Load your settings from environment variables, a secrets manager, or a local config file and pass them inline:

```javascript title="server.js"
const aiSettings = {
    openai: {
        ApiKey: process.env.OPENAI_API_KEY,
        Model: 'gpt-4.1',
        Temperature: 0.0,
        MaxTokens: 4096
    }
};

revealAI.withOptions({
    defaultProvider: 'openai',
    settings: aiSettings
});
```

  </TabItem>

  <TabItem value="java" label="Java">

Java does not bind to `appsettings.json`. Load your settings from environment variables, a secrets manager, or a local config file and pass them inline:

```java title="Application.java"
Map<String, Object> aiSettings = Map.of(
        "openai", Map.of(
                "ApiKey", System.getenv("OPENAI_API_KEY"),
                "Model", "gpt-4.1",
                "Temperature", 0.0,
                "MaxTokens", 4096));
```

  </TabItem>
</Tabs>

## Options

The same option names are used across all server platforms — ASP.NET sets them on the strongly-typed `options` object, Node.js and Java set them as keys in the `openai` settings map.

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

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
        options.Model = "o3";
        options.ReasoningEffort = "Medium";
    });
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript
const aiSettings = {
    openai: {
        ApiKey: process.env.OPENAI_API_KEY,
        Model: 'o3',
        ReasoningEffort: 'Medium'
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
Map<String, Object> aiSettings = Map.of(
        "openai", Map.of(
                "ApiKey", System.getenv("OPENAI_API_KEY"),
                "Model", "o3",
                "ReasoningEffort", "Medium"));
```

  </TabItem>
</Tabs>

## Custom Endpoints

If you are using an OpenAI-compatible API (such as a local model server), specify a custom endpoint:

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "your-api-key";
        options.Endpoint = "https://your-custom-endpoint.com/v1";
        options.Model = "your-model-name";
    });
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript
const aiSettings = {
    openai: {
        ApiKey: 'your-api-key',
        Endpoint: 'https://your-custom-endpoint.com/v1',
        Model: 'your-model-name'
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
Map<String, Object> aiSettings = Map.of(
        "openai", Map.of(
                "ApiKey", "your-api-key",
                "Endpoint", "https://your-custom-endpoint.com/v1",
                "Model", "your-model-name"));
```

  </TabItem>
</Tabs>

:::danger Never Commit API Keys

Never commit API keys to source control. Always use environment variables, User Secrets, or a secure key management service.

:::
