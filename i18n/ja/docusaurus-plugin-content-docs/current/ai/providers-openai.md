---
sidebar_label: OpenAI
---


# OpenAI プロバイダー

OpenAI プロバイダーは、Reveal SDK AI を OpenAI のチャット補完 API と統合し、GPT-4.1、GPT-4o、および o3 や o4 などの推論モデルへのアクセスを可能にします。

## インストール

OpenAI プロバイダーの NuGet パッケージをインストールします：

```bash
dotnet add package Reveal.Sdk.AI.OpenAI
```

## 設定

### 基本セットアップ

`Program.cs` で OpenAI プロバイダーを追加します：

```csharp
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddReveal();

builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
    });

var app = builder.Build();
app.MapControllers();
app.Run();
```

### appsettings.json の使用

プロバイダーは `RevealAI:OpenAI` 設定セクションに自動的にバインドされます：

```json title="appsettings.json"
{
  "RevealAI": {
    "OpenAI": {
      "ApiKey": "sk-your-api-key-here",
      "Model": "gpt-4.1",
      "Temperature": 0.0,
      "MaxTokens": 4096
    }
  }
}
```

設定バインディングを使用する場合、コードでのオプション設定は不要です：

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI();
```

## オプション

| プロパティ | 型 | デフォルト | 説明 |
|----------|------|---------|-------------|
| `ApiKey` | `string` | `""` | **必須。** OpenAI API キー。 |
| `Model` | `string` | `"gpt-4.1"` | チャット補完に使用するモデル。 |
| `Temperature` | `float?` | `0.0` | ランダム性を制御（0.0 〜 2.0）。低い値ほど決定論的です。 |
| `MaxTokens` | `int?` | `4096` | レスポンスで生成するトークンの最大数。 |
| `TopP` | `float?` | `1.0` | Nucleus サンプリングパラメータ。 |
| `Endpoint` | `string` | `""` | カスタムエンドポイント URL。OpenAI 互換 API に使用します。 |
| `ReasoningEffort` | `string?` | `null` | 推論モデル（o3、o4 など）の推論努力レベル。 |

## 推論モデル

プロバイダーは推論モデル（o1、o3、o4、gpt-5）を自動的に検出し、動作を調整します：

- 推論モデルでは Temperature が無効化されます
- `ReasoningEffort` オプションで推論努力を設定できます

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
        options.Model = "o3";
        options.ReasoningEffort = "Medium";
    });
```

## カスタムエンドポイント

OpenAI 互換 API（ローカルモデルサーバーなど）を使用している場合、カスタムエンドポイントを指定できます：

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "your-api-key";
        options.Endpoint = "https://your-custom-endpoint.com/v1";
        options.Model = "your-model-name";
    });
```

:::danger API キーをコミットしないでください

API キーをソースコントロールにコミットしないでください。常に環境変数、User Secrets、または安全なキー管理サービスを使用してください。

:::
