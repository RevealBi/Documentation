---
sidebar_label: Google Gemini
---


# Google Gemini Provider

The Google Gemini provider integrates Reveal SDK AI with Google Cloud's Vertex AI platform, enabling access to Google's Gemini family of models.

## Installation

Install the Google provider NuGet package:

```bash
dotnet add package Reveal.Sdk.AI.Google
```

## Configuration

### Basic Setup

Add the Google Gemini provider in your `Program.cs`:

```csharp
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

### Using appsettings.json

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

## Options

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
