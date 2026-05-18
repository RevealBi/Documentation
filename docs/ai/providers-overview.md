---
sidebar_label: Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AI Providers Overview

Reveal SDK AI uses a provider-based architecture that lets you integrate with different large language model (LLM) services. The same set of providers is available on **ASP.NET Core**, **Node.js**, and **Java** — only the registration syntax differs.

## Available Providers

| Provider | ASP.NET NuGet | Node.js / Java key | Extension Method (ASP.NET) |
|----------|--------------|--------------------|----------------------------|
| [OpenAI](providers-openai.md) | `Reveal.Sdk.AI.OpenAI` | `openai` | `.AddOpenAI()` |
| [Azure OpenAI](providers-azure-openai.md) | `Reveal.Sdk.AI.AzureOpenAI` | `azure-openai` | `.AddAzureOpenAI()` |
| [Anthropic](providers-anthropic.md) | `Reveal.Sdk.AI.Anthropic` | `anthropic` | `.AddAnthropic()` |
| [Google Gemini](providers-google-gemini.md) | `Reveal.Sdk.AI.Google` | `google` | `.AddGoogle()` |

For ASP.NET Core, each provider is a separate NuGet package — install only the ones you need. For Node.js (`reveal-sdk-node-ai`) and Java (`reveal-sdk-ai`), the provider implementations are bundled in the main AI package.

## How Providers Work

All providers implement a common provider interface and are registered with the AI runtime. The SDK supports registering multiple providers simultaneously and resolves the appropriate one based on the request or a configured default.

### Registering Providers

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Chain extension methods after `AddRevealAI()`:

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

  </TabItem>

  <TabItem value="node" label="Node.js">

Pass each provider's settings under its lowercase key in the `settings` object:

```javascript
revealAI.withOptions({
    defaultProvider: 'openai',
    settings: {
        openai:    { ApiKey: 'your-api-key' },
        anthropic: { ApiKey: 'your-api-key' }
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

Pass each provider's settings under its lowercase key in the `settings` map:

```java
Map<String, Object> aiSettings = Map.of(
        "openai",    Map.of("ApiKey", "your-api-key"),
        "anthropic", Map.of("ApiKey", "your-api-key"));

RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "openai",
        "config/catalog.json",
        null,
        null,
        Map.of("settings", aiSettings));
```

  </TabItem>
</Tabs>

### Default Provider

The SDK uses a default provider when no specific provider is requested. Available provider keys: `openai`, `azure-openai`, `anthropic`, `google`.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```json title="appsettings.json"
{
  "RevealAI": {
    "DefaultProvider": "openai"
  }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript
revealAI.withOptions({
    defaultProvider: 'openai',
    settings: { /* ... */ }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

The default provider is the first argument to the `RevealAIPluginOptions` constructor:

```java
new RevealAIPluginOptions(
        "openai",   // defaultProvider
        /* catalog file */ "config/catalog.json",
        null, null,
        Map.of("settings", aiSettings));
```

  </TabItem>
</Tabs>

### Configuration Binding

For ASP.NET Core, all providers support configuration binding from `appsettings.json` under the `RevealAI` section. Options set in code take precedence over configuration file values:

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

For Node.js and Java, load your settings from environment variables, a secrets manager, or a local config file and pass them inline at startup.

### Multiple Providers

You can register multiple providers and the SDK will resolve the appropriate one based on the request. This is useful for scenarios such as:

- Using different models for different types of analysis
- Providing fallback options
- Cost optimization by routing simpler tasks to less expensive models

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI()        // Registered as "openai"
    .AddAnthropic()     // Registered as "anthropic"
    .AddGoogle();       // Registered as "google"
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript
revealAI.withOptions({
    defaultProvider: 'openai',
    settings: {
        openai:    { ApiKey: process.env.OPENAI_API_KEY },
        anthropic: { ApiKey: process.env.ANTHROPIC_API_KEY },
        google:    { ProjectId: process.env.GCP_PROJECT_ID }
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
Map<String, Object> aiSettings = Map.of(
        "openai",    Map.of("ApiKey", System.getenv("OPENAI_API_KEY")),
        "anthropic", Map.of("ApiKey", System.getenv("ANTHROPIC_API_KEY")),
        "google",    Map.of("ProjectId", System.getenv("GCP_PROJECT_ID")));
```

  </TabItem>
</Tabs>

## Custom Providers

If you need to integrate with an LLM service that isn't supported out of the box, you can [build a custom provider](providers-building-custom.md). Custom providers are currently supported on ASP.NET Core only.
