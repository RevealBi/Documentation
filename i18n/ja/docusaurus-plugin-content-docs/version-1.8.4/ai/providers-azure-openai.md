---
sidebar_label: Azure OpenAI
---


# Azure OpenAI プロバイダー

Azure OpenAI プロバイダーは、Reveal SDK AI を Azure の OpenAI Service と統合し、エンタープライズグレードのセキュリティとコンプライアンスを備えた独自の Azure サブスクリプションにデプロイされた OpenAI モデルを使用できます。

## インストール

Azure OpenAI プロバイダーの NuGet パッケージをインストールします：

```bash
dotnet add package Reveal.Sdk.AI.AzureOpenAI
```

## 設定

### 基本セットアップ

`Program.cs` で Azure OpenAI プロバイダーを追加します：

```csharp
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddReveal();

builder.Services.AddRevealAI()
    .AddAzureOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:AzureOpenAI:ApiKey"];
        options.Endpoint = "https://your-resource-name.openai.azure.com/";
        options.DeploymentName = "gpt-4o";
    });

var app = builder.Build();
app.MapControllers();
app.Run();
```

### appsettings.json の使用

プロバイダーは `RevealAI:AzureOpenAI` 設定セクションに自動的にバインドされます：

```json title="appsettings.json"
{
  "RevealAI": {
    "AzureOpenAI": {
      "ApiKey": "your-azure-api-key",
      "Endpoint": "https://your-resource-name.openai.azure.com/",
      "DeploymentName": "gpt-4o",
      "Temperature": 0.0,
      "MaxTokens": 4096
    }
  }
}
```

設定バインディングを使用する場合、コードでのオプション設定は不要です：

```csharp
builder.Services.AddRevealAI()
    .AddAzureOpenAI();
```

## オプション

| プロパティ | 型 | デフォルト | 説明 |
|----------|------|---------|-------------|
| `ApiKey` | `string` | `""` | **必須。** Azure OpenAI API キー。 |
| `Endpoint` | `string` | `""` | **必須。** Azure OpenAI エンドポイント URL（例: `https://your-resource-name.openai.azure.com/`）。 |
| `DeploymentName` | `string` | `""` | **必須。** Azure でのモデルデプロイメント名。 |
| `Temperature` | `float?` | `0.0` | ランダム性を制御（0.0 〜 2.0）。低い値ほど決定論的です。 |
| `MaxTokens` | `int?` | `4096` | レスポンスで生成するトークンの最大数。 |
| `TopP` | `float?` | `1.0` | Nucleus サンプリングパラメータ。 |
| `ReasoningEffort` | `string?` | `null` | 推論モデル（o3、o4 など）の推論努力レベル。 |

## Azure セットアップの前提条件

Azure OpenAI プロバイダーを使用する前に、以下が必要です：

1. Azure OpenAI Service にアクセスできる **Azure サブスクリプション**
2. Azure ポータルで作成された **Azure OpenAI リソース**
3. そのリソース内の **モデルデプロイメント**（例: GPT-4o、GPT-4.1）
4. Azure ポータルからの **API キー** と **エンドポイント**

API キーとエンドポイントは、Azure ポータルの Azure OpenAI リソースの **Keys and Endpoint** セクションで確認できます。

## 推論モデル

OpenAI プロバイダーと同様に、Azure OpenAI プロバイダーも推論モデルのデプロイメント（o1、o3、o4、gpt-5）を自動的に検出し、動作を調整します：

- 推論モデルでは Temperature が無効化されます
- 推論努力を設定できます

```csharp
builder.Services.AddRevealAI()
    .AddAzureOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:AzureOpenAI:ApiKey"];
        options.Endpoint = "https://your-resource.openai.azure.com/";
        options.DeploymentName = "o3";
        options.ReasoningEffort = "Medium";
    });
```

:::danger API キーをコミットしないでください

API キーをソースコントロールにコミットしないでください。常に環境変数、User Secrets、または安全なキー管理サービスを使用してください。

:::
