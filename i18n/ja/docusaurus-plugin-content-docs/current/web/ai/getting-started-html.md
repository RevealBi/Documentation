---
sidebar_label: 作業の開始 - HTML/JavaScript
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# Reveal SDK AI で作業を開始 - HTML/JavaScript

このガイドでは、素の HTML と JavaScript を使用して最初の AI を活用した分析アプリケーションを作成する手順を説明します。ダッシュボード データから AI インサイトを生成するシンプルなアプリケーションを構築します。

**完了までの時間**: 15～20 分

## 構築するもの

以下を行う Web アプリケーション:
- Reveal ダッシュボードを表示します
- ダッシュボードに AI を活用したコンテキスト メニュー項目を追加します
- 要約、分析、予測の 3 つのタイプのインサイトを生成します
- オプションのストリーミング (ChatGPT のようなエクスペリエンス) で AI レスポンスを表示します

## 前提条件

開始する前に、[システム要件](system-requirements.md)を満たし、以下を用意してください:

1. [Reveal SDK サーバー](../install-server-sdk.md)がインストールされ、設定されていること
2. [Reveal SDK AI サーバー](install-server-sdk.md)がインストールされていること
3. **LLM プロバイダーの API キー** ([OpenAI](https://platform.openai.com/api-keys)、[Anthropic](https://platform.anthropic.com/account/keys)、または [Google Cloud](https://cloud.google.com/vertex-ai) から)

## 手順 1: ASP.NET Core サーバーの作成

### 1.1 新しい ASP.NET Core Web API プロジェクトの作成

ターミナルを開いて以下を実行します:

```bash
dotnet new webapi -n RevealAiServer
cd RevealAiServer
```

### 1.2 AI NuGet パッケージのインストール

Reveal AI パッケージをインストールします (これには Reveal.Sdk.AspNetCore が自動的に含まれます):

```bash
dotnet add package Reveal.Sdk.AI.AspNetCore
```

### 1.3 サーバーの構成

`Program.cs` を開いて、その内容を次のように置き換えます:

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

これで完了しました。主な 3 つの手順:
1. ローカル開発用に CORS を追加します。
2. `AddReveal()` で Reveal SDK を追加します。
3. `AddRevealAI()` で AI サービスを追加し、LLM プロバイダーを構成します。

### 1.4 API キーの構成

**方法 A: appsettings.json の使用** (本番環境には推奨されません)

`appsettings.json` を作成または変更します:

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

**方法 B: ユーザー シークレットの使用** (開発時に推奨)

```bash
dotnet user-secrets init
dotnet user-secrets set "RevealAI:OpenAI:ApiKey" "sk-your-openai-api-key-here"
```

:::danger API キーをコミットしないでください

API キーをソース管理にコミットしないでください。常にユーザー シークレット、環境変数、または安全なキー管理サービスを使用してください。

:::

### 1.5 データ ソース プロバイダーの作成

Reveal SDK にはデータ ソース プロバイダーが必要です。このサンプルでは、データ ソースを変更せずに返すだけの最小限のものを作成します。

新しいフォルダー `Reveal` を作成し、`DataSourceProvider.cs` を追加します:

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

`Program.cs` を更新してプロバイダーを登録します:

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

AI インサイトはデータ ソース構成を直接必要としませんが、Reveal SDK 自体にはデータ ソース プロバイダーの登録が必要です。実際のアプリケーションでは、ダッシュボード用にこれが既に構成されています。

:::

### 1.6 サンプル ダッシュボードとデータの追加

プロジェクト ルートに必要なフォルダーを作成します:

```bash
mkdir Dashboards
mkdir Data
```

必要なファイルをダウンロードして、正しいフォルダーに配置します:

**1. ダッシュボード ファイル** → `Dashboards/` フォルダーに保存:
- ダウンロード: [Accounts.rdash](https://github.com/RevealBi/sdk-samples-ai/raw/ad93b8eae04f32778e4eaf2b0168cf26dda10888/insights/server/aspnet/RevealSdkServer/Dashboards/Accounts.rdash)
- 場所: `Dashboards/Accounts.rdash`

**2. データ ファイル** → `Data/` フォルダーに保存:
- ダウンロード: [NorthwindInvoices.xlsx](https://github.com/RevealBi/sdk-samples-ai/raw/refs/heads/main/insights/server/aspnet/RevealSdkServer/Data/NorthwindInvoices.xlsx)
- 場所: `Data/NorthwindInvoices.xlsx`

プロジェクト構造は以下のようになります:
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

### 1.7 サーバーの実行

```bash
dotnet run
```

サーバーは `https://localhost:5111` (またはこれに似た URL) で起動します。URL をメモしてください、クライアントに必要です。

## 手順 2: HTML クライアントの作成

### 2.1 index.html の作成

プロジェクト ルート (または別の `client` フォルダー) に新しいファイル `index.html` を作成します:

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

## 手順 3: アプリケーションの実行

### 3.1 サーバーの起動

まだ実行していない場合:

```bash
dotnet run
```

### 3.2 クライアントを開く

Web ブラウザーで `index.html` を開きます。例えば以下の方法で開けます:

- VS Code Live Server 拡張機能を使用
- ファイルをダブルクリック

### 3.3 AI インサイトのテスト

1. ダッシュボードが読み込まれるのを待ちます
2. RevealView のダッシュボード、または表示形式のオーバーフロー メニューをクリックします
3. [Summary]、[Analysis]、または [Forecast] メニュー項目をクリックします
4. 右側のパネルに表示される AI 生成のインサイトを確認します
5. 個々の表示形式を右クリックして、ウィジェット レベルのインサイトを試します

## コードの理解

### サーバー側: AI の仕組み

サーバーのセットアップには 3 つの重要な部分があります:

**1. データ ソース プロバイダー** (Reveal SDK で必要):
```csharp
builder.Services.AddControllers().AddReveal(builder =>
{
    builder.AddDataSourceProvider<DataSourceProvider>();
});
```

**2. AI 構成**:
```csharp
builder.Services.AddRevealAI()
    .ConfigureOpenAI(options => {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
    });
```

これにより:
- すべての AI サービスを登録します
- OpenAI を LLM プロバイダーとして構成します
- `/api/reveal/ai/insights` に API エンドポイントを自動的に作成します

### クライアント側: API を呼び出す 2 つの方法

**Await モード** - シンプルで分かりやすい:

```javascript
const result = await client.ai.insights.get({
    dashboard: dashboard,
    insightType: rv.InsightType.Summary
});
console.log(result.explanation);
```

**ストリーミング モード** - リアルタイム、ChatGPT のようなエクスペリエンス:

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

**重要な違い**: 同じ API 呼び出しですが、処理が異なります。ストリーミングはプログレッシブ更新のためのコールバックを提供し、await は完全なレスポンスを待ちます。

### ダッシュボード vs 表示形式のインサイト

- **ダッシュボード レベル**: ダッシュボード全体を分析します
- **表示形式レベル**: `visualizationId` を渡して単一のウィジェットに焦点を当てます

完全な動作例は [sdk-samples-ai リポジトリ](https://github.com/RevealBi/sdk-samples-ai/tree/main/insights)で入手できます。
