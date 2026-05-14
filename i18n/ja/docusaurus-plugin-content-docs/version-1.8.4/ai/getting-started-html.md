---
sidebar_label: はじめに - HTML/JavaScript
---


# Reveal SDK AI をはじめよう - HTML/JavaScript

このガイドでは、バニラ HTML と JavaScript を使用して、初めての AI 搭載アナリティクスアプリケーションを作成する手順を説明します。ダッシュボードデータから AI インサイトを生成するシンプルなアプリケーションを構築します。

**所要時間**: 15〜20分

## 構築するもの

以下の機能を備えた Web アプリケーションを構築します:
- Reveal ダッシュボードの表示
- ダッシュボードへの AI 搭載コンテキストメニュー項目の追加
- AI インサイト（サマリー、分析、予測）の生成

## 前提条件

始める前に、[システム要件](system-requirements.md)を満たしていることを確認し、以下を準備してください:

1. [Reveal SDK サーバー](/web/install-server-sdk)のインストールと設定が完了していること
2. [Reveal SDK AI サーバー](install-server-sdk.md)がインストールされていること
3. **LLM プロバイダー API キー** - [OpenAI](https://platform.openai.com/api-keys)、[Anthropic](https://platform.anthropic.com/account/keys)、または [Google Cloud](https://cloud.google.com/vertex-ai) から取得

## ステップ 1: ASP.NET Core サーバーの作成

### 1.1 新しい ASP.NET Core Web API プロジェクトの作成

ターミナルを開き、以下を実行します:

```bash
dotnet new webapi -n RevealAiServer
cd RevealAiServer
```

### 1.2 AI NuGet パッケージのインストール

Reveal AI パッケージをインストールします（Reveal.Sdk.AspNetCore が自動的に含まれます）:

```bash
dotnet add package Reveal.Sdk.AI.AspNetCore
```

### 1.3 サーバーの設定

`Program.cs` を開き、内容を以下に置き換えます:

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

### 1.4 API キーの設定

**オプション A: appsettings.json を使用する方法**（本番環境には非推奨）

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

**オプション B: User Secrets を使用する方法**（開発時に推奨）

```bash
dotnet user-secrets init
dotnet user-secrets set "RevealAI:OpenAI:ApiKey" "sk-your-openai-api-key-here"
```

:::danger API キーをコミットしないでください

API キーをソース管理にコミットしないでください。常に User Secrets、環境変数、またはセキュアなキー管理サービスを使用してください。

:::

### 1.5 DataSource プロバイダーの作成

Reveal SDK にはデータソースプロバイダーが必要です。このサンプルでは、データソースをそのまま返すだけの最小限のプロバイダーを作成します。

新しいフォルダ `Reveal` を作成し、`DataSourceProvider.cs` を追加します:

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

### 1.6 サンプルダッシュボードとデータの追加

プロジェクトルートに必要なフォルダを作成します:

```bash
mkdir Dashboards
mkdir Data
```

必要なファイルをダウンロードし、正しいフォルダに配置します:

**1. ダッシュボードファイル** → `Dashboards/` フォルダに保存:
- ダウンロード: [Accounts.rdash](https://github.com/RevealBi/sdk-samples-ai/raw/ad93b8eae04f32778e4eaf2b0168cf26dda10888/insights/server/aspnet/RevealSdkServer/Dashboards/Accounts.rdash)
- 配置場所: `Dashboards/Accounts.rdash`

**2. データファイル** → `Data/` フォルダに保存:
- ダウンロード: [NorthwindInvoices.xlsx](https://github.com/RevealBi/sdk-samples-ai/raw/refs/heads/main/insights/server/aspnet/RevealSdkServer/Data/NorthwindInvoices.xlsx)
- 配置場所: `Data/NorthwindInvoices.xlsx`

プロジェクト構成は以下のようになります:
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

### 1.7 サーバーの起動

```bash
dotnet run
```

サーバーが `https://localhost:5111`（または類似の URL）で起動します。この URL はクライアントで使用するため、メモしておいてください。

## ステップ 2: HTML クライアントの作成

### 2.1 index.html の作成

プロジェクトルート（または別の `client` フォルダ）に新しいファイル `index.html` を作成します:

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

## ステップ 3: アプリケーションの実行

### 3.1 サーバーの起動

まだ起動していない場合:

```bash
dotnet run
```

### 3.2 クライアントを開く

`index.html` を Web ブラウザで開きます。以下の方法があります:

- VS Code の Live Server 拡張機能を使用する
- ファイルをダブルクリックする

### 3.3 AI インサイトのテスト

1. ダッシュボードが読み込まれるまで待ちます
2. ダッシュボードのオーバーフローメニュー（ケバブアイコン）をクリックします
3. **Summary**、**Analysis**、または **Forecast** を選択します
4. AI が生成したインサイトが右パネルに表示されます

ここから、[SDK の使い方](./sdk-overview.md)セクションを参照して、ストリーミングレスポンス、ビジュアライゼーションレベルのインサイト、チャットなどについて学びましょう。
