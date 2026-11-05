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
| `PromptCaching` | `bool` | `true` | On gpt-5.6 and later, caches the static part of each prompt so later requests can reuse it at a fraction of the input price. See [Prompt Caching](#prompt-caching). |

## Prompt Caching

Most prompts the AI SDK sends start with a static part: its instructions, the schema of the tables in use, and the date rules. On gpt-5.6 and later models, with `PromptCaching` on (the default), the provider places an OpenAI cache breakpoint where that part ends. The same step of a later request may then reuse it from OpenAI's cache: on a chat's next turns, and in other users' chats over the same tables, for as long as OpenAI keeps it (at least 30 minutes by default). Reuse isn't guaranteed: the static part has to be identical, OpenAI doesn't cache prompts shorter than 1,024 tokens, and a hit also depends on OpenAI's cache availability and routing. Cache entries aren't shared across OpenAI organizations or processing regions, so bring-your-own-key connections that use different OpenAI accounts don't reuse each other's entries. The rest of the prompt is billed as plain input. A one-off prompt with no static part (metadata enrichment, datasource ranking) isn't cached, since it would pay for the write and never be read. Neither is the answer to a clarifying question: its cached part would hold the earlier turns of the conversation, and the next turn's are one exchange longer, so it would never be read either.

**Cost.** OpenAI bills a cache write at 1.25 times its input price. The cache read rate depends on the model: 0.1 times the input price on most gpt-5.6 and later models, so on those a static part that's read back once has already paid for its write. In one benchmark of repeated dashboard requests with `gpt-5.6-luna` and a warm cache, 61 of 71 requests read from the cache, and estimated input cost was about 38% lower than an uncached baseline. Actual savings depend on the workload.

**When to turn it off.** When the same kind of request rarely comes again within 30 minutes (few, scattered users, or tables that differ on every request), most static parts are written and never read, and each of those writes costs a quarter more than plain input for the part written. In the benchmark's workload, where the static part was about 40% of a prompt, that came to about 11% more input than with caching off; the larger the static share of the prompts, the higher the extra cost, up to 25%. With `PromptCaching` off, gpt-5.6 and later requests neither write nor read the cache. The setting applies to the OpenAI connections the developer registers; bring-your-own-key OpenAI connections don't expose it and always use the default.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
        options.PromptCaching = false;
    });
```

Or in configuration: set `PromptCaching` to `false` in the connection's section, `RevealAI:Providers:openai` or the legacy `RevealAI:OpenAI` section shown in [Using a Configuration File](#using-a-configuration-file) (`RevealAI:Providers:<name>` for a connection registered under a custom name).

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript
const aiSettings = {
    openai: {
        ApiKey: process.env.OPENAI_API_KEY,
        PromptCaching: false
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
Map<String, Object> aiSettings = Map.of(
        "openai", Map.of(
                "ApiKey", System.getenv("OPENAI_API_KEY"),
                "PromptCaching", false));
```

  </TabItem>
</Tabs>

Earlier models (gpt-4.1, gpt-5.5 and before) reuse a repeated prompt start on their own at no extra cost, and ignore this setting. If `Endpoint` points at a gateway or deployment that refuses OpenAI's prompt-cache fields with a 400 or 422 error naming them, the provider sends the call again without them, as a best-effort compatibility fallback. Turning `PromptCaching` off doesn't avoid that error, since the provider still sends a cache mode field on gpt-5.6 and later models. After a fallback, the provider stops sending the fields for that model until the connection is recreated, and logs a warning. Those requests then get the endpoint's default caching behavior, which, for an endpoint that forwards them to OpenAI, may still include OpenAI's implicit caching and its write charges. Token usage records count the cache's reads in `CachedInputTokens`.

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
