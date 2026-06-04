---
sidebar_label: Install Server SDK
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installing the AI Server SDK

The Reveal SDK AI Server provides the backend services needed to power AI features in your applications. It integrates with LLM providers and manages AI operations like insight generation, dashboard creation, and conversational analytics.

The AI Server SDK ships for **ASP.NET Core**, **Node.js**, and **Java**. The setup steps map one-to-one across platforms — install the AI package, configure an LLM provider, point at a metadata catalog, and run.

## Prerequisites

Before installing the AI Server SDK, ensure you have:

1. The base [Reveal SDK Server](/web/install-server-sdk) installed and configured
2. The platform runtime for your project:
   - **ASP.NET Core**: .NET 8.0 or higher
   - **Node.js**: Node.js 16 or higher
   - **Java**: Java 17 or higher and Maven 3.6 or higher
3. Access to at least one LLM provider (OpenAI, Anthropic, Google, etc.)
4. LLM provider API keys configured

## Step 1: Install the AI Package

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

The AI Server SDK for ASP.NET Core is distributed as a NuGet package. Right-click your Solution or Project and select **Manage NuGet Packages**, then install **Reveal.Sdk.AI.AspNetCore**.

Or using the .NET CLI:

```bash
dotnet add package Reveal.Sdk.AI.AspNetCore
```

Or using the Package Manager Console:

```bash
Install-Package Reveal.Sdk.AI.AspNetCore
```

  </TabItem>

  <TabItem value="node" label="Node.js">

Install the **reveal-sdk-node-ai** npm package:

```bash npm2yarn
npm install reveal-sdk-node-ai
```

  </TabItem>

  <TabItem value="java" label="Java">

Add the Reveal Maven repositories and the **reveal-sdk-ai** dependency to your `pom.xml`:

```xml title="pom.xml"
<repositories>
  <repository>
    <id>reveal.public</id>
    <url>https://maven.revealbi.io/repository/public</url>
  </repository>
  <repository>
    <id>reveal.snapshots</id>
    <url>https://maven.revealbi.io/repository/snapshots</url>
  </repository>
</repositories>

<dependencies>
  <dependency>
    <groupId>io.revealbi</groupId>
    <artifactId>reveal-sdk-ai</artifactId>
    <version>1.0.6-SNAPSHOT</version>
  </dependency>
</dependencies>
```

Then run:

```bash
mvn install
```

  </TabItem>
</Tabs>

## Step 2: Register the AI Services

The AI SDK extends the base Reveal SDK, so you need both configured. Register the AI services where you wire up Reveal in your application.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

// Add Reveal SDK (required)
builder.Services.AddControllers().AddReveal();

// Add Reveal AI services
builder.Services.AddRevealAI();

var app = builder.Build();
app.MapControllers();
app.Run();
```

  </TabItem>

  <TabItem value="node" label="Node.js">

Add `revealAI.withOptions(...)` to the `plugins` array of your Reveal options:

```javascript title="server.js"
const reveal = require('reveal-sdk-node');
const revealAI = require('reveal-sdk-node-ai');
const express = require('express');

const revealOptions = {
    plugins: [
        revealAI.withOptions({
            defaultProvider: 'openai',
            settings: { /* configured in the next step */ }
        })
    ]
};

const app = express();
app.use('/', reveal(revealOptions));
app.listen(5111);
```

  </TabItem>

  <TabItem value="java" label="Java">

Build a `RevealAIPluginOptions` and add `RevealAIPlugin.withOptions(...)` via `RevealServerBuilder.addPlugin(...)`:

```java title="Application.java"
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.ai.RevealAIPluginOptions;
import io.revealbi.core.IRevealServer;
import io.revealbi.core.RevealServerBuilder;

import java.util.Map;

RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "openai",
        /* metadataCatalogFile  */ "config/catalog.json",
        /* metadataManager      */ null,
        /* contextManager       */ null,
        /* additionalOptions    */ Map.of("settings", /* configured in the next step */ Map.of()));

IRevealServer revealServer = new RevealServerBuilder()
        .addPlugin(RevealAIPlugin.withOptions(aiPluginOptions))
        .build();
```

  </TabItem>
</Tabs>

## Step 3: Install and Configure an LLM Provider

Configure the LLM provider you want to use. Each provider topic ([OpenAI](providers-openai.md), [Azure OpenAI](providers-azure-openai.md), [Anthropic](providers-anthropic.md), [Google Gemini](providers-google-gemini.md)) has full setup details — what follows is the OpenAI quickstart.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Install the provider NuGet package and chain `.AddOpenAI(...)` after `AddRevealAI()`:

```bash
dotnet add package Reveal.Sdk.AI.OpenAI
```

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
    });
```

  </TabItem>

  <TabItem value="node" label="Node.js">

For Node.js, the provider packages are bundled with `reveal-sdk-node-ai` — no extra install is needed. Pass provider settings via the `settings` option using lowercase provider keys:

```javascript title="server.js"
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
```

  </TabItem>

  <TabItem value="java" label="Java">

For Java, the provider implementations are bundled with `reveal-sdk-ai` — no extra dependency is needed. Pass provider settings via the `additionalOptions` map using lowercase provider keys:

```java title="Application.java"
Map<String, Object> aiSettings = Map.of(
        "openai", Map.of(
                "ApiKey", System.getenv("OPENAI_API_KEY"),
                "Model", "gpt-4.1"));

RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "openai",
        "src/main/resources/Reveal/Metadata/catalog.json",
        null,
        null,
        Map.of("settings", aiSettings));
```

  </TabItem>
</Tabs>

Available built-in providers:

| Provider | ASP.NET NuGet | Node.js / Java key | Guide |
|----------|--------------|--------------------|-------|
| OpenAI | `Reveal.Sdk.AI.OpenAI` | `openai` | [Setup guide](/ai/providers-openai) |
| Azure OpenAI | `Reveal.Sdk.AI.AzureOpenAI` | `azure-openai` | [Setup guide](/ai/providers-azure-openai) |
| Anthropic | `Reveal.Sdk.AI.Anthropic` | `anthropic` | [Setup guide](/ai/providers-anthropic) |
| Google Gemini | `Reveal.Sdk.AI.Google` | `google` | [Setup guide](/ai/providers-google-gemini) |

:::danger Never Commit API Keys

Never commit API keys to source control. Always use environment variables, User Secrets, or a secure key management service.

:::

## Step 4: Install and Configure a Metadata Provider

The metadata catalog tells the AI which datasources exist. It can be loaded from a JSON file on disk or from a custom provider (e.g., database-backed). For the built-in file provider, point the AI builder at a JSON catalog.

**1. Create a catalog file:**

```json title="config/catalog.json"
{
  "Datasources": [
    {
      "Id": "NorthwindDB",
      "Provider": "SQLServer"
    }
  ]
}
```

**2. Point the builder at the file:**

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .UseMetadataCatalogFile("config/catalog.json");
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript title="server.js"
const path = require('path');

revealAI.withOptions({
    defaultProvider: 'openai',
    settings: aiSettings,
    metadataCatalogFile: path.resolve(__dirname, 'config', 'catalog.json')
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java title="Application.java"
RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "openai",
        Path.of("src", "main", "resources", "Reveal", "Metadata", "catalog.json")
                .toAbsolutePath().normalize().toString(),
        null,
        null,
        Map.of("settings", aiSettings));
```

  </TabItem>
</Tabs>

Both absolute and relative paths are supported. Relative paths are resolved against the application's current working directory.

## Complete Example

Here's a complete server with the AI features configured end-to-end.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

// Add CORS for cross-origin requests
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add base Reveal SDK
builder.Services.AddControllers().AddReveal(revealBuilder =>
{
    revealBuilder.AddSettings(settings =>
    {
        settings.LocalFileStoragePath = "Data";
    });
});

// Add Reveal AI with OpenAI provider
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
        options.Model = "gpt-4.1";
    })
    .UseMetadataCatalogFile("config/catalog.json");

var app = builder.Build();

app.UseCors();
app.MapControllers();

app.Run();
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript title="server.js"
const reveal = require('reveal-sdk-node');
const revealAI = require('reveal-sdk-node-ai');
const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');

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
            settings: aiSettings,
            metadataCatalogFile: path.resolve(__dirname, 'Reveal', 'Metadata', 'catalog.json'),
            metadataManager: {
                outputPath: path.resolve(os.homedir(), 'AImetadata'),
            }
        })
    ]
};

const app = express();
app.use(cors());
app.use('/', reveal(revealOptions));

const PORT = parseInt(process.env.PORT || '5111', 10);
app.listen(PORT, () => {
    console.log(`Reveal AI server running on http://localhost:${PORT}`);
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java title="Application.java"
package com.example;

import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.ai.RevealAIPluginOptions;
import io.revealbi.core.IRevealServer;
import io.revealbi.core.RevealServerBuilder;
import io.revealbi.servlet.RevealEngineServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

import java.nio.file.Path;
import java.util.Map;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public IRevealServer revealServer() {
        Map<String, Object> aiSettings = Map.of(
                "openai", Map.of(
                        "ApiKey", System.getenv("OPENAI_API_KEY"),
                        "Model", "gpt-4.1"));

        RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
                "openai",
                Path.of("src", "main", "resources", "Reveal", "Metadata", "catalog.json")
                        .toAbsolutePath().normalize().toString(),
                new RevealAIPluginOptions.MetadataManagerOptions(
                        Path.of(System.getProperty("user.home"), "AImetadata").toString()),
                null,
                Map.of("settings", aiSettings));

        return new RevealServerBuilder()
                .addPlugin(RevealAIPlugin.withOptions(aiPluginOptions))
                .build();
    }

    @Bean
    ServletRegistrationBean<RevealEngineServlet> revealServlet(IRevealServer revealServer) {
        ServletRegistrationBean<RevealEngineServlet> registration =
                new ServletRegistrationBean<>(new RevealEngineServlet(revealServer), "/*");
        registration.setAsyncSupported(true);
        registration.setLoadOnStartup(1);
        return registration;
    }
}
```

  </TabItem>
</Tabs>

## Verify Installation

After installation, verify the AI SDK is properly configured.

### Step 1: Run Your Application

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```bash
dotnet run
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```bash
node server.js
```

  </TabItem>

  <TabItem value="java" label="Java">

```bash
mvn spring-boot:run
```

  </TabItem>
</Tabs>

### Step 2: Check AI Endpoints

The AI SDK adds endpoints under `/api/reveal/ai/`. Test the metadata status endpoint:

```bash
curl http://localhost:5111/api/reveal/ai/metadata/status
```

Expected response once the system is ready:

```json
{
  "status": "Completed",
  "isInitialized": true
}
```

:::info Get the Code

A complete multi-platform sample is available on [GitHub](https://github.com/RevealBi/sdk-samples-ai), with `aspnet/`, `node/`, and `java/` sub-folders for each server platform.

:::
