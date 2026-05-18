---
sidebar_label: Anthropic
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Anthropic Provider

The Anthropic provider integrates Reveal SDK AI with Anthropic's Claude models, providing access to the Claude family of AI assistants.

## Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Install the Anthropic provider NuGet package:

```bash
dotnet add package Reveal.Sdk.AI.Anthropic
```

  </TabItem>

  <TabItem value="node" label="Node.js">

The Anthropic provider is bundled with `reveal-sdk-node-ai` — no extra package is required:

```bash npm2yarn
npm install reveal-sdk-node-ai
```

  </TabItem>

  <TabItem value="java" label="Java">

The Anthropic provider is bundled with `reveal-sdk-ai` — no extra dependency is required beyond the base AI artifact:

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

Add the Anthropic provider in your `Program.cs`:

```csharp title="Program.cs"
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

  </TabItem>

  <TabItem value="node" label="Node.js">

Pass Anthropic settings under the `anthropic` key in the `settings` object:

```javascript title="server.js"
const reveal = require('reveal-sdk-node');
const revealAI = require('reveal-sdk-node-ai');
const express = require('express');

const aiSettings = {
    anthropic: {
        ApiKey: process.env.ANTHROPIC_API_KEY,
        Model: 'claude-sonnet-4-5'
    }
};

const revealOptions = {
    plugins: [
        revealAI.withOptions({
            defaultProvider: 'anthropic',
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

Pass Anthropic settings under the `anthropic` key in the `settings` map and register the plugin:

```java title="Application.java"
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.ai.RevealAIPluginOptions;
import io.revealbi.core.IRevealServer;
import io.revealbi.core.RevealServerBuilder;

import java.util.Map;

Map<String, Object> aiSettings = Map.of(
        "anthropic", Map.of(
                "ApiKey", System.getenv("ANTHROPIC_API_KEY"),
                "Model", "claude-sonnet-4-5"));

RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "anthropic",
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

  </TabItem>

  <TabItem value="node" label="Node.js">

Node.js does not bind to `appsettings.json`. Load your settings from environment variables, a secrets manager, or a local config file and pass them inline:

```javascript title="server.js"
const aiSettings = {
    anthropic: {
        ApiKey: process.env.ANTHROPIC_API_KEY,
        Model: 'claude-opus-4-1',
        MaxTokens: 4096
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

Java does not bind to `appsettings.json`. Load your settings from environment variables, a secrets manager, or a local config file and pass them inline:

```java title="Application.java"
Map<String, Object> aiSettings = Map.of(
        "anthropic", Map.of(
                "ApiKey", System.getenv("ANTHROPIC_API_KEY"),
                "Model", "claude-opus-4-1",
                "MaxTokens", 4096));
```

  </TabItem>
</Tabs>

## Options

The same option names are used across all server platforms — ASP.NET sets them on the strongly-typed `options` object, Node.js and Java set them as keys in the `anthropic` settings map.

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

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
builder.Services.AddRevealAI()
    .AddAnthropic(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:Anthropic:ApiKey"];
        options.Model = "claude-sonnet-4-5";
        options.MaxTokens = 8192;
    });
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript
const aiSettings = {
    anthropic: {
        ApiKey: process.env.ANTHROPIC_API_KEY,
        Model: 'claude-sonnet-4-5',
        MaxTokens: 8192
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
Map<String, Object> aiSettings = Map.of(
        "anthropic", Map.of(
                "ApiKey", System.getenv("ANTHROPIC_API_KEY"),
                "Model", "claude-sonnet-4-5",
                "MaxTokens", 8192));
```

  </TabItem>
</Tabs>

## Getting an API Key

1. Create an account at [console.anthropic.com](https://console.anthropic.com)
2. Navigate to **API Keys** in the console
3. Create a new API key
4. Store it securely using User Secrets or environment variables

:::danger Never Commit API Keys

Never commit API keys to source control. Always use environment variables, User Secrets, or a secure key management service.

:::
