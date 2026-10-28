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
| `PromptCaching` | `bool` | `true` | Caches the static part of each prompt so later requests read it at a fraction of the input price. See [Prompt caching](#prompt-caching). |

## Prompt caching

Every prompt the AI SDK sends starts with a static part: its instructions, the schema of the tables in use, and the date rules. With `PromptCaching` on (the default), the provider marks where that part ends as an Anthropic cache point. The same step of a later request reads it back from Anthropic's cache: on a chat's next turns, and in other users' chats over the same tables, for as long as Anthropic keeps it (5 minutes after its last use).

**Cost.** Anthropic bills a cache write at 1.25 times its input price and a cache read at 0.1 times it, so a static part that's read back once within 5 minutes has already paid for its write. On a benchmark of repeated dashboard requests and three-turn chats with `claude-sonnet-5-5`, three quarters of the requests read from the cache, and input cost 21% less than with caching off.

**When to turn it off.** When the same kind of request rarely comes again within 5 minutes (few, scattered users, or tables that differ on every request), most static parts are written and never read, which costs up to about 10% more input than with caching off.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
builder.Services.AddRevealAI()
    .AddAnthropic(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:Anthropic:ApiKey"];
        options.PromptCaching = false;
    });
```

Or in configuration: `RevealAI:Providers:<name>:PromptCaching` set to `false`.

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript
const aiSettings = {
    anthropic: {
        ApiKey: process.env.ANTHROPIC_API_KEY,
        PromptCaching: false
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
Map.of(
    "ApiKey", System.getenv("ANTHROPIC_API_KEY"),
    "PromptCaching", false)
```

  </TabItem>
</Tabs>

Token usage records count the cache's writes and reads within `InputTokens`; `CachedInputTokens` holds the reads.

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
