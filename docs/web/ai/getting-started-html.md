---
sidebar_label: Getting Started - HTML/JavaScript
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# Getting Started with Reveal SDK AI - HTML/JavaScript

This guide will walk you through creating your first AI-powered analytics application using vanilla HTML and JavaScript. You'll build a simple application that generates AI insights from dashboard data.

**Time to complete**: 15-20 minutes

## What You'll Build

A web application that:
- Displays a Reveal dashboard
- Adds AI-powered context menu items to the dashboard
- Generates three types of insights: Summary, Analysis, and Forecast
- Shows AI responses with optional streaming (ChatGPT-like experience)

## Prerequisites

Before you begin, ensure you meet the [System Requirements](system-requirements.md) and have:

1. [Reveal SDK Server](../install-server-sdk.md) installed and configured
2. [Reveal SDK AI Server](install-server-sdk.md) installed
3. **LLM Provider API Key** from [OpenAI](https://platform.openai.com/api-keys), [Anthropic](https://platform.anthropic.com/account/keys), or [Google Cloud](https://cloud.google.com/vertex-ai)

## Step 1: Create the ASP.NET Core Server

### 1.1 Create a New ASP.NET Core Web API Project

Open a terminal and run:

```bash
dotnet new webapi -n RevealAiServer
cd RevealAiServer
```

### 1.2 Install the AI NuGet Package

Install the Reveal AI package (this automatically includes Reveal.Sdk.AspNetCore):

```bash
dotnet add package Reveal.Sdk.AI.AspNetCore
```

### 1.3 Configure the Server

Open `Program.cs` and replace its contents with:

```csharp title="Program.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

// Add CORS for local development
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod());
});

// Add Reveal SDK
builder.Services.AddControllers().AddReveal();

// Add Reveal AI with OpenAI provider
builder.Services.AddRevealAI()
    .ConfigureOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
        options.ModelId = "gpt-4.1";
    });

var app = builder.Build();

app.UseCors("AllowAll");
app.MapControllers();

app.Run();
```

That's it! Just three main steps:
1. Add CORS for local development
2. Add Reveal SDK with `AddReveal()`
3. Add AI services with `AddRevealAI()` and configure your LLM provider

### 1.4 Configure Your API Key

**Option A: Using appsettings.json** (not recommended for production)

Create or modify `appsettings.json`:

```json title="appsettings.json"
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "RevealAI": {
    "OpenAI": {
      "ApiKey": "sk-your-openai-api-key-here"
    }
  }
}
```

**Option B: Using User Secrets** (recommended for development)

```bash
dotnet user-secrets init
dotnet user-secrets set "RevealAI:OpenAI:ApiKey" "sk-your-openai-api-key-here"
```

:::danger Never Commit API Keys

Never commit API keys to source control. Always use User Secrets, environment variables, or a secure key management service.

:::

### 1.5 Create a DataSource Provider

The Reveal SDK requires a data source provider. For this sample, we'll create a minimal one that simply returns data sources unchanged.

Create a new folder `Reveal` and add `DataSourceProvider.cs`:

```csharp title="Reveal/DataSourceProvider.cs"
using Reveal.Sdk.Data;

namespace RevealAiServer.Reveal;

public class DataSourceProvider : IRVDataSourceProvider
{
    public Task<RVDataSourceItem> ChangeDataSourceItemAsync(
        IRVUserContext userContext,
        string dashboardId,
        RVDataSourceItem dataSourceItem)
    {
        return Task.FromResult(dataSourceItem);
    }

    public Task<RVDashboardDataSource> ChangeDataSourceAsync(
        IRVUserContext userContext,
        RVDashboardDataSource dataSource)
    {
        return Task.FromResult(dataSource);
    }
}
```

Update `Program.cs` to register the provider:

```csharp title="Program.cs" {16-19}
using Reveal.Sdk;
using Reveal.Sdk.AI;
using RevealAiServer.Reveal;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod());
});

// Add Reveal SDK with data source provider
builder.Services.AddControllers().AddReveal(builder =>
{
    builder.AddDataSourceProvider<DataSourceProvider>();
});

// Add Reveal AI with OpenAI provider
builder.Services.AddRevealAI()
    .ConfigureOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
        options.ModelId = "gpt-4.1";
    });

var app = builder.Build();

app.UseCors("AllowAll");
app.MapControllers();

app.Run();
```

:::info

While AI insights don't directly require datasource configuration, the Reveal SDK itself needs a data source provider registered. In a real application, you'd already have this configured for your dashboards.

:::

### 1.6 Add the Sample Dashboard and Data

Create the necessary folders in your project root:

```bash
mkdir Dashboards
mkdir Data
```

Download the required files and place them in the correct folders:

**1. Dashboard file** → Save to `Dashboards/` folder:
- Download: [Accounts.rdash](https://github.com/RevealBi/sdk-samples-ai/raw/ad93b8eae04f32778e4eaf2b0168cf26dda10888/insights/server/aspnet/RevealSdkServer/Dashboards/Accounts.rdash)
- Location: `Dashboards/Accounts.rdash`

**2. Data file** → Save to `Data/` folder:
- Download: [NorthwindInvoices.xlsx](https://github.com/RevealBi/sdk-samples-ai/raw/refs/heads/main/insights/server/aspnet/RevealSdkServer/Data/NorthwindInvoices.xlsx)
- Location: `Data/NorthwindInvoices.xlsx`

Your project structure should look like:
```
RevealAiServer/
├── Dashboards/
│   └── Accounts.rdash
├── Data/
│   └── NorthwindInvoices.xlsx
├── Reveal/
│   └── DataSourceProvider.cs
└── Program.cs
```

### 1.7 Run the Server

```bash
dotnet run
```

Your server should start at `https://localhost:5111` (or similar). Note the URL - you'll need it for the client.

## Step 2: Create the HTML Client

### 2.1 Create index.html

Create a new file `index.html` in your project root (or a separate `client` folder):

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal AI - Insights Demo</title>

    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        .container {
            display: flex;
            height: 100vh;
            gap: 10px;
            padding: 10px;
            box-sizing: border-box;
        }

        #revealView {
            flex: 1;
            height: 100%;
        }

        .insights-panel {
            flex: 0 0 500px;
            display: flex;
            flex-direction: column;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #f9f9f9;
        }

        .insights-header {
            padding: 15px;
            background: #2c3e50;
            color: white;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .streaming-toggle {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: normal;
        }

        .insights-content {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background: white;
        }

        .insights-content h1,
        .insights-content h2,
        .insights-content h3 {
            margin-top: 0.5em;
            margin-bottom: 0.5em;
        }

        .insights-content p {
            margin: 0.5em 0;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Dashboard on the left -->
        <div id="revealView"></div>

        <!-- Insights panel on the right -->
        <div class="insights-panel">
            <div class="insights-header">
                <span>AI Insights</span>
                <label class="streaming-toggle">
                    <input type="checkbox" id="streamingToggle" checked>
                    <span>Stream Responses</span>
                </label>
            </div>
            <div class="insights-content" id="insightsOutput">
                <p style="color: #666;">
                    Right-click on the dashboard or a visualization to generate AI insights.
                    Try "Summary", "Analysis", or "Forecast".
                </p>
            </div>
        </div>
    </div>

    <!-- Dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>

    <!-- Reveal SDK -->
    <script src="https://dl.revealbi.io/reveal/libs/1.8.3/infragistics.reveal.js"></script>

    <!-- Reveal AI Client SDK -->
    <script src="https://cdn.jsdelivr.net/npm/@revealbi/api@0.0.1-preview.2/dist/index.umd.min.js"></script>

    <script type="text/javascript">
        // Configure your server URL
        const SERVER_URL = 'https://localhost:5111/';

        // Initialize Reveal SDK
        $.ig.RevealSdkSettings.setBaseUrl(SERVER_URL);

        // Initialize Reveal AI Client
        rv.RevealSdkClient.initialize({
            hostUrl: SERVER_URL
        });

        const client = rv.RevealSdkClient.getInstance();
        let revealView;
        let streamingBuffer = '';

        // Display insights in the panel
        function displayInsight(markdownText, isStreaming = false) {
            const output = document.getElementById('insightsOutput');

            if (isStreaming) {
                // Accumulate streaming text
                streamingBuffer += markdownText;
                output.innerHTML = marked.parse(streamingBuffer);
            } else {
                // Display complete response
                output.innerHTML = marked.parse(markdownText);
            }

            // Auto-scroll to bottom
            output.scrollTop = output.scrollHeight;
        }

        // Clear insights panel
        function clearInsights() {
            document.getElementById('insightsOutput').innerHTML = '';
            streamingBuffer = '';
        }

        // Create insight menu item
        function createInsightMenuItem(label, dashboard, insightType, visualizationId = null) {
            return new $.ig.RVMenuItem(label, null, async () => {
                clearInsights();
                const streamingEnabled = document.getElementById('streamingToggle').checked;

                // Build request options
                const options = {
                    dashboard: dashboard,
                    insightType: insightType
                };

                if (visualizationId) {
                    options.visualizationId = visualizationId;
                }

                try {
                    if (streamingEnabled) {
                        // Streaming mode - responses arrive in real-time
                        const result = await client.ai.insights.get(
                            options,
                            {
                                onProgress: (message) => {
                                    console.log('Progress:', message);
                                    displayInsight(`*${message}*\n\n`, true);
                                },
                                onTextChunk: (text) => {
                                    console.log('Text chunk:', text);
                                    displayInsight(text, true);
                                },
                                onComplete: () => {
                                    console.log('Insight complete');
                                },
                                onError: (error, details) => {
                                    console.error('Error:', error, details);
                                    displayInsight(`**Error:** ${error}`);
                                }
                            },
                            {
                                streamExplanation: true
                            }
                        );
                    } else {
                        // Await mode - wait for complete response
                        const result = await client.ai.insights.get(options);
                        displayInsight(result.explanation);
                    }
                } catch (error) {
                    console.error('Error getting insight:', error);
                    displayInsight(`**Error:** ${error.message || error}`);
                }
            });
        }

        // Load dashboard and configure menu items
        $.ig.RVDashboard.loadDashboard("Accounts", (dashboard) => {
            revealView = new $.ig.RevealView("#revealView");
            revealView.canEdit = false;
            revealView.canSaveAs = false;
            revealView.dashboard = dashboard;

            // Add AI insights to context menus
            revealView.onMenuOpening = function (visualization, args) {
                // Dashboard-level insights
                if (args.menuLocation === $.ig.RVMenuLocation.Dashboard) {
                    args.menuItems.push(createInsightMenuItem(
                        "Dashboard Summary", dashboard, rv.InsightType.Summary));
                    args.menuItems.push(createInsightMenuItem(
                        "Dashboard Analysis", dashboard, rv.InsightType.Analysis));
                    args.menuItems.push(createInsightMenuItem(
                        "Dashboard Forecast", dashboard, rv.InsightType.Forecast));
                }

                // Visualization-level insights
                if (args.menuLocation === $.ig.RVMenuLocation.Visualization) {
                    args.menuItems.push(createInsightMenuItem(
                        "Visualization Summary", dashboard, rv.InsightType.Summary, visualization.id));
                    args.menuItems.push(createInsightMenuItem(
                        "Visualization Analysis", dashboard, rv.InsightType.Analysis, visualization.id));
                    args.menuItems.push(createInsightMenuItem(
                        "Visualization Forecast", dashboard, rv.InsightType.Forecast, visualization.id));
                }
            };
        });
    </script>
</body>
</html>
```

## Step 3: Run the Application

### 3.1 Start the Server

If not already running:

```bash
dotnet run
```

### 3.2 Open the Client

Open `index.html` in your web browser. You can:

- Use VS Code Live Server extension
- Simply double-click the file

### 3.3 Test the AI Insights

1. Wait for the dashboard to load
2. Click on the RevealView's dashboard, or a visualization's, overflow menu
3. CLick on the "Summary", "Analysis", or "Forecast" menu item
4. Watch the AI-generated insight appear in the right panel
5. Try right-clicking on individual visualizations for visualization-level insights

## Understanding the Code

### Server-Side: How AI Works

The server setup has three key parts:

**1. Data Source Provider** (required by Reveal SDK):
```csharp
builder.Services.AddControllers().AddReveal(builder =>
{
    builder.AddDataSourceProvider<DataSourceProvider>();
});
```

**2. AI Configuration** (the magic):
```csharp
builder.Services.AddRevealAI()
    .ConfigureOpenAI(options => {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
    });
```

This:
- Registers all AI services
- Configures OpenAI as the LLM provider
- Automatically creates API endpoints at `/api/reveal/ai/insights`

### Client-Side: Two Ways to Call the API

**Await Mode** - Simple and straightforward:

```javascript
const result = await client.ai.insights.get({
    dashboard: dashboard,
    insightType: rv.InsightType.Summary
});
console.log(result.explanation);
```

**Streaming Mode** - Real-time, ChatGPT-like experience:

```javascript
const result = await client.ai.insights.get(
    {
        dashboard: dashboard,
        insightType: rv.InsightType.Summary
    },
    {
        onTextChunk: (text) => {
            // Append each chunk as it arrives
            displayInsight(text, true);
        },
        onComplete: () => {
            console.log('Done!');
        }
    },
    { streamExplanation: true }
);
```

**Key difference**: Same API call, different handling. Streaming provides callbacks for progressive updates, while await waits for the complete response.

### Dashboard vs Visualization Insights

- **Dashboard-level**: Analyzes the entire dashboard
- **Visualization-level**: Focuses on a single visualization by passing `visualizationId`

The complete working example is available in the [sdk-samples-ai repository](https://github.com/RevealBi/sdk-samples-ai/tree/main/insights).
