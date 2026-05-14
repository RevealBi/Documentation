---
sidebar_label: Getting Started - HTML/JavaScript
---


# Getting Started with Reveal SDK AI - HTML/JavaScript

This guide will walk you through creating your first AI-powered analytics application using vanilla HTML and JavaScript. You'll build a simple application that generates AI insights from dashboard data.

**Time to complete**: 15-20 minutes

## What You'll Build

A web application that:
- Displays a Reveal dashboard
- Adds AI-powered context menu items to the dashboard
- Generates AI insights (Summary, Analysis, and Forecast)

## Prerequisites

Before you begin, ensure you meet the [System Requirements](system-requirements.md) and have:

1. [Reveal SDK Server](/web/install-server-sdk) installed and configured
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
using RevealAiServer.Reveal;

var builder = WebApplication.CreateBuilder(args);

// Add CORS for local development
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
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
        options.ModelId = "gpt-4.1";
    });

var app = builder.Build();

app.UseCors("AllowAll");
app.MapControllers();

app.Run();
```

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
        body { margin: 0; font-family: Arial, sans-serif; }
        .container { display: flex; height: 100vh; gap: 10px; padding: 10px; box-sizing: border-box; }
        #revealView { flex: 1; }
        #output { flex: 0 0 400px; padding: 20px; overflow-y: auto; border: 1px solid #ddd;
                  border-radius: 4px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; }
    </style>
</head>
<body>
    <div class="container">
        <div id="revealView"></div>
        <div id="output">Use the dashboard overflow menu and select an AI insight option.</div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <script src="https://dl.revealbi.io/reveal/libs/1.8.3/infragistics.reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@revealbi/api@0.0.1-preview.2/dist/index.umd.min.js"></script>

    <script>
        const SERVER_URL = 'https://localhost:5111/';

        // Initialize Reveal SDK and AI Client
        $.ig.RevealSdkSettings.setBaseUrl(SERVER_URL);
        rv.RevealSdkClient.initialize({ hostUrl: SERVER_URL });
        const client = rv.RevealSdkClient.getInstance();

        // Load dashboard
        $.ig.RVDashboard.loadDashboard("Accounts", (dashboard) => {
            const revealView = new $.ig.RevealView("#revealView");
            revealView.dashboard = dashboard;

            // Add AI insight options to the dashboard context menu
            revealView.onMenuOpening = function (visualization, args) {
                if (args.menuLocation === $.ig.RVMenuLocation.Dashboard) {
                    args.menuItems.push(new $.ig.RVMenuItem("Summary", null, async () => {
                        document.getElementById('output').textContent = 'Generating summary...';
                        const result = await client.ai.insights.get({
                            dashboard: dashboard,
                            insightType: rv.InsightType.Summary,
                        });
                        document.getElementById('output').textContent = result.explanation;
                    }));

                    args.menuItems.push(new $.ig.RVMenuItem("Analysis", null, async () => {
                        document.getElementById('output').textContent = 'Generating analysis...';
                        const result = await client.ai.insights.get({
                            dashboard: dashboard,
                            insightType: rv.InsightType.Analysis,
                        });
                        document.getElementById('output').textContent = result.explanation;
                    }));

                    args.menuItems.push(new $.ig.RVMenuItem("Forecast", null, async () => {
                        document.getElementById('output').textContent = 'Generating forecast...';
                        const result = await client.ai.insights.get({
                            dashboard: dashboard,
                            insightType: rv.InsightType.Forecast,
                        });
                        document.getElementById('output').textContent = result.explanation;
                    }));
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
2. Click the dashboard overflow menu (kebab icon)
3. Select **Summary**, **Analysis**, or **Forecast**
4. The AI-generated insight appears in the right panel

From here, explore the [Using the SDK](./sdk-overview.md) section to learn about streaming responses, visualization-level insights, chat, and more.
