---
sidebar_label: サーバー SDK のインストール
---


# AI サーバー SDK のインストール

Reveal SDK AI サーバーは、アプリケーションで AI 機能を動作させるために必要なバックエンドサービスを提供します。LLM プロバイダーと統合し、インサイト生成、ダッシュボード作成、会話型アナリティクスなどの AI 操作を管理します。

## 前提条件

AI サーバー SDK をインストールする前に、以下を確認してください：

1. ベースの [Reveal SDK サーバー](/web/install-server-sdk) がインストールおよび設定済みであること
2. .NET 8.0 以上
3. 少なくとも1つの LLM プロバイダー（OpenAI、Anthropic、Google など）へのアクセス
4. LLM プロバイダーの API キーが設定済みであること

## インストール方法

### ASP.NET Core

ASP.NET Core 用の AI サーバー SDK は NuGet パッケージとして配布されています。

#### ステップ 1: NuGet パッケージのインストール

ソリューションまたはプロジェクトを右クリックし、**Manage NuGet Packages** for Solution を選択します。

![](../web/images/getting-started-nuget-packages-manage.jpg)

パッケージマネージャーダイアログで **Browse** タブを開き、**Reveal.Sdk.AI.AspNetCore** NuGet パッケージをプロジェクトにインストールします。

**パッケージ名:** `Reveal.Sdk.AI.AspNetCore`

または Package Manager Console を使用する場合：

```bash
Install-Package Reveal.Sdk.AI.AspNetCore
```

または .NET CLI を使用する場合：

```bash
dotnet add package Reveal.Sdk.AI.AspNetCore
```

#### ステップ 2: サービスの設定

`Program.cs` ファイルを開いて変更し、AI サービスを追加します。AI SDK はベースの Reveal SDK を拡張するため、両方の設定が必要です：

```csharp
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

// Add Reveal SDK (required)
builder.Services.AddControllers().AddReveal();

// Add Reveal AI services
builder.Services.AddRevealAI();

var app = builder.Build();
app.Run();
```

#### ステップ 3: LLM プロバイダーの設定

少なくとも1つの LLM プロバイダーを設定します。`AddRevealAI()` の後にこの設定を追加してください：

**OpenAI の場合：**

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["OpenAI:ApiKey"];
        options.ModelId = "gpt-4.1";
    });
```

**Azure OpenAI の場合：**

```csharp
builder.Services.AddRevealAI()
    .AddAzureOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["AzureOpenAI:ApiKey"];
        options.Endpoint = "https://yoururl.openai.azure.com/";
        options.DeploymentName = "gpt-4o";
    });
```

**Anthropic Claude の場合：**

```csharp
builder.Services.AddRevealAI()
    .AddAnthropic(options =>
    {
        options.ApiKey = builder.Configuration["Anthropic:ApiKey"];
        options.ModelId = "claude-sonnet-4-5";
    });
```

#### ステップ 4: API キーの安全な保管

LLM プロバイダーの API キーを `appsettings.json` または User Secrets に保存します：

```json title="appsettings.json"
{
  "OpenAI": {
    "ApiKey": "sk-your-api-key-here"
  },
  "Anthropic": {
    "ApiKey": "sk-ant-your-api-key-here"
  },
  "AzureOpenAI": {
    "ApiKey": "your-azure-api-key-here"
  }
}
```

:::danger API キーをコミットしないでください

API キーをソースコントロールにコミットしないでください。常に環境変数、User Secrets、または安全なキー管理サービスを使用してください。

:::

#### 完全な例

AI 機能が設定された完全な `Program.cs` の例を以下に示します：

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
        options.ApiKey = builder.Configuration["OpenAI:ApiKey"];
        options.ModelId = "gpt-4.1";
    });

var app = builder.Build();

app.UseCors();
app.MapControllers();

app.Run();
```

### Node.js（近日公開）

AI サーバー SDK の Node.js サポートは現在開発中であり、将来のリリースで提供される予定です。

現時点では、AI 機能には ASP.NET Core が推奨サーバープラットフォームです。

### Java（近日公開）

AI サーバー SDK の Java サポートは現在開発中であり、将来のリリースで提供される予定です。

現時点では、AI 機能には ASP.NET Core が推奨サーバープラットフォームです。

## インストールの確認

インストール後、AI SDK が正しく設定されていることを確認します：

### ステップ 1: アプリケーションの実行

```bash
dotnet run
```

### ステップ 2: AI エンドポイントの確認

AI SDK は `/api/reveal/ai/` 配下にいくつかのエンドポイントを追加します：

プロバイダーエンドポイントをテストします：

```bash
curl http://localhost:5000/api/reveal/ai/providers
```

期待されるレスポンス：
```json
{
  "providers": ["openai", "anthropic"]
}
```
