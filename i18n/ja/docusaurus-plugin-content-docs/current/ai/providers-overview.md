---
sidebar_label: 概要
---


# AI プロバイダーの概要

Reveal SDK AI は、さまざまな大規模言語モデル（LLM）サービスと統合できるプロバイダーベースのアーキテクチャを採用しています。各プロバイダーは個別の NuGet パッケージとして配布されるため、必要なものだけをインストールできます。

## 利用可能なプロバイダー

| プロバイダー | NuGet パッケージ | 拡張メソッド |
|----------|--------------|-----------------|
| [OpenAI](providers-openai.md) | `Reveal.Sdk.AI.OpenAI` | `.AddOpenAI()` |
| [Azure OpenAI](providers-azure-openai.md) | `Reveal.Sdk.AI.AzureOpenAI` | `.AddAzureOpenAI()` |
| [Anthropic](providers-anthropic.md) | `Reveal.Sdk.AI.Anthropic` | `.AddAnthropic()` |
| [Google Gemini](providers-google-gemini.md) | `Reveal.Sdk.AI.Google` | `.AddGoogle()` |

## プロバイダーの仕組み

すべてのプロバイダーは `IAIProvider` インターフェースを実装し、`IRevealAIBuilder` のフルーエント API を通じて登録されます。SDK はキー付きサービスを使用した依存性注入を採用しており、複数のプロバイダーを同時に登録できます。

### プロバイダーの登録

プロバイダーは `AddRevealAI()` の後に拡張メソッドをチェーンして追加します：

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "your-api-key";
    })
    .AddAnthropic(options =>
    {
        options.ApiKey = "your-api-key";
    });
```

### デフォルトプロバイダー

特定のプロバイダーが指定されていない場合、SDK はデフォルトプロバイダーを使用します。`appsettings.json` で設定できます：

```json title="appsettings.json"
{
  "RevealAI": {
    "DefaultProvider": "openai"
  }
}
```

利用可能なプロバイダーキー: `openai`、`azure-openai`、`anthropic`、`google`。

### 設定のバインディング

すべてのプロバイダーは `appsettings.json` の `RevealAI` セクションからの設定バインディングをサポートしています。コードで設定したオプションは設定ファイルの値よりも優先されます：

```json title="appsettings.json"
{
  "RevealAI": {
    "DefaultProvider": "openai",
    "OpenAI": {
      "ApiKey": "sk-...",
      "Model": "gpt-4.1"
    },
    "Anthropic": {
      "ApiKey": "sk-ant-..."
    }
  }
}
```

### 複数プロバイダーの使用

複数のプロバイダーを登録でき、SDK はリクエストに基づいて適切なプロバイダーを解決します。以下のようなシナリオで便利です：

- 異なる種類の分析に異なるモデルを使用する
- フォールバックオプションを提供する
- 簡単なタスクをより安価なモデルにルーティングしてコストを最適化する

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI()        // "openai" として登録
    .AddAnthropic()     // "anthropic" として登録
    .AddGoogle();       // "google" として登録
```

## カスタムプロバイダー

標準でサポートされていない LLM サービスと統合する必要がある場合は、[カスタムプロバイダーを構築](providers-building-custom.md)できます。
