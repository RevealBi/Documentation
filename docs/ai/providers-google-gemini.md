---
sidebar_label: Google Gemini
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Google Gemini Provider

The Google Gemini provider integrates Reveal SDK AI with Google Cloud's Vertex AI platform, enabling access to Google's Gemini family of models.

## Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Install the Google provider NuGet package:

```bash
dotnet add package Reveal.Sdk.AI.Google
```

  </TabItem>

  <TabItem value="node" label="Node.js">

The Google provider is bundled with `reveal-sdk-node-ai` — no extra package is required:

```bash npm2yarn
npm install reveal-sdk-node-ai
```

  </TabItem>

  <TabItem value="java" label="Java">

The Google provider is bundled with `reveal-sdk-ai` — no extra dependency is required beyond the base AI artifact:

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

Add the Google Gemini provider in your `Program.cs`:

```csharp title="Program.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddReveal();

builder.Services.AddRevealAI()
    .AddGoogle(options =>
    {
        options.ProjectId = "your-gcp-project-id";
        options.CredentialsPath = "/path/to/credentials.json";
    });

var app = builder.Build();
app.MapControllers();
app.Run();
```

  </TabItem>

  <TabItem value="node" label="Node.js">

Pass Google settings under the `google` key in the `settings` object:

```javascript title="server.js"
const reveal = require('reveal-sdk-node');
const revealAI = require('reveal-sdk-node-ai');
const express = require('express');

const aiSettings = {
    google: {
        ProjectId: process.env.GCP_PROJECT_ID,
        CredentialsPath: '/path/to/credentials.json'
    }
};

const revealOptions = {
    plugins: [
        revealAI.withOptions({
            defaultProvider: 'google',
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

Pass Google settings under the `google` key in the `settings` map and register the plugin:

```java title="Application.java"
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.ai.RevealAIPluginOptions;
import io.revealbi.core.IRevealServer;
import io.revealbi.core.RevealServerBuilder;

import java.util.Map;

Map<String, Object> aiSettings = Map.of(
        "google", Map.of(
                "ProjectId", System.getenv("GCP_PROJECT_ID"),
                "CredentialsPath", "/path/to/credentials.json"));

RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "google",
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

The provider automatically binds to the `RevealAI:Google` configuration section:

```json title="appsettings.json"
{
  "RevealAI": {
    "Google": {
      "ProjectId": "your-gcp-project-id",
      "CredentialsPath": "/path/to/credentials.json",
      "Location": "us-central1",
      "Model": "gemini-2.5-pro"
    }
  }
}
```

With configuration binding, no code options are needed:

```csharp
builder.Services.AddRevealAI()
    .AddGoogle();
```

  </TabItem>

  <TabItem value="node" label="Node.js">

Node.js does not bind to `appsettings.json`. Load your settings from environment variables, a secrets manager, or a local config file and pass them inline:

```javascript title="server.js"
const aiSettings = {
    google: {
        ProjectId: process.env.GCP_PROJECT_ID,
        CredentialsPath: '/path/to/credentials.json',
        Location: 'us-central1',
        Model: 'gemini-2.5-pro'
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

Java does not bind to `appsettings.json`. Load your settings from environment variables, a secrets manager, or a local config file and pass them inline:

```java title="Application.java"
Map<String, Object> aiSettings = Map.of(
        "google", Map.of(
                "ProjectId", System.getenv("GCP_PROJECT_ID"),
                "CredentialsPath", "/path/to/credentials.json",
                "Location", "us-central1",
                "Model", "gemini-2.5-pro"));
```

  </TabItem>
</Tabs>

## Options

The same option names are used across all server platforms — ASP.NET sets them on the strongly-typed `options` object, Node.js and Java set them as keys in the `google` settings map.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ProjectId` | `string` | `""` | **Required.** Your Google Cloud project ID. |
| `CredentialsPath` | `string` | `""` | Path to the Google Cloud credentials JSON file. |
| `Location` | `string` | `"us-central1"` | The Google Cloud region for the model. |
| `Publisher` | `string` | `"google"` | The model publisher. |
| `Model` | `string` | `"gemini-2.5-pro"` | The Gemini model to use. |
| `Temperature` | `float` | `0` | Controls randomness (0.0 to 2.0). Lower values are more deterministic. |
| `MaxTokens` | `int` | `32768` | Maximum number of tokens to generate in the response. |
| `TopP` | `float` | `1` | Nucleus sampling parameter (0.0 to 1.0). |
| `TopK` | `float` | `32` | Top-K sampling parameter. Controls the number of top tokens considered. |

## Google Cloud Prerequisites

Before using the Google Gemini provider, you need:

1. A **Google Cloud project** with billing enabled
2. The **Vertex AI API** enabled in your project
3. A **service account** with the Vertex AI User role
4. A **credentials JSON file** for the service account

### Setting Up Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **IAM & Admin** > **Service Accounts**
3. Create a new service account or select an existing one
4. Grant the **Vertex AI User** role
5. Create a key in JSON format and download it
6. Set the `CredentialsPath` option to the path of the downloaded JSON file

The provider sets the `GOOGLE_APPLICATION_CREDENTIALS` environment variable automatically based on the `CredentialsPath` option.

## Available Models

| Model | Description |
|-------|-------------|
| `gemini-2.5-pro` | Most capable Gemini model (default) |
| `gemini-2.5-flash` | Fast and efficient for most tasks |
| `gemini-2.0-flash` | Previous generation fast model |

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp
builder.Services.AddRevealAI()
    .AddGoogle(options =>
    {
        options.ProjectId = "your-project-id";
        options.CredentialsPath = "/path/to/credentials.json";
        options.Model = "gemini-2.5-flash";
        options.Location = "us-east1";
    });
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript
const aiSettings = {
    google: {
        ProjectId: 'your-project-id',
        CredentialsPath: '/path/to/credentials.json',
        Model: 'gemini-2.5-flash',
        Location: 'us-east1'
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
Map<String, Object> aiSettings = Map.of(
        "google", Map.of(
                "ProjectId", "your-project-id",
                "CredentialsPath", "/path/to/credentials.json",
                "Model", "gemini-2.5-flash",
                "Location", "us-east1"));
```

  </TabItem>
</Tabs>

## Regions

The `Location` option determines which Google Cloud region processes your requests. Common options include:

- `us-central1` (default)
- `us-east1`
- `europe-west1`
- `asia-northeast1`
- `global`

Choose a region close to your application for lower latency.

:::danger Never Commit Credentials

Never commit Google Cloud credentials JSON files to source control. Store them securely and reference the path through environment variables or User Secrets.

:::
