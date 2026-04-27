---
sidebar_label: Anthropic
---


# Anthropic プロバイダー

Anthropic プロバイダーは、Reveal SDK AI を Anthropic の Claude モデルと統合し、Claude ファミリーの AI アシスタントへのアクセスを提供します。

## インストール

Anthropic プロバイダーの NuGet パッケージをインストールします：

```bash
dotnet add package Reveal.Sdk.AI.Anthropic
```

## 設定

### 基本セットアップ

`Program.cs` で Anthropic プロバイダーを追加します：

```csharp
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddReveal();

builder.Services.AddRevealAI()
    .AddAnthropic(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:Anthropic:ApiKey"];
    });

var app = builder.Build();
app.MapControllers();
app.Run();
```

### appsettings.json の使用

プロバイダーは `RevealAI:Anthropic` 設定セクションに自動的にバインドされます：

```json title="appsettings.json"
{
  "RevealAI": {
    "Anthropic": {
      "ApiKey": "sk-ant-your-api-key-here",
      "Model": "claude-opus-4-1",
      "MaxTokens": 4096
    }
  }
}
```

設定バインディングを使用する場合、コードでのオプション設定は不要です：

```csharp
builder.Services.AddRevealAI()
    .AddAnthropic();
```

## オプション

| プロパティ | 型 | デフォルト | 説明 |
|----------|------|---------|-------------|
| `ApiKey` | `string` | `""` | **必須。** Anthropic API キー。 |
| `Model` | `string` | `"claude-opus-4-1"` | 使用する Claude モデル。 |
| `MaxTokens` | `int` | `4096` | レスポンスで生成するトークンの最大数。 |

## 利用可能なモデル

Anthropic はいくつかの Claude モデルを提供しています。一般的に使用されるモデルは以下の通りです：

| モデル | 説明 |
|-------|-------------|
| `claude-opus-4-1` | 複雑なタスクに最も高い能力を持つモデル（デフォルト） |
| `claude-sonnet-4-5` | パフォーマンスと速度のバランスが取れたモデル |
| `claude-haiku-3-5` | 最も高速でコスト効率の良いモデル |

```csharp
builder.Services.AddRevealAI()
    .AddAnthropic(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:Anthropic:ApiKey"];
        options.Model = "claude-sonnet-4-5";
        options.MaxTokens = 8192;
    });
```

## API キーの取得

1. [console.anthropic.com](https://console.anthropic.com) でアカウントを作成します
2. コンソールで **API Keys** に移動します
3. 新しい API キーを作成します
4. User Secrets または環境変数を使用して安全に保管します

:::danger API キーをコミットしないでください

API キーをソースコントロールにコミットしないでください。常に環境変数、User Secrets、または安全なキー管理サービスを使用してください。

:::
