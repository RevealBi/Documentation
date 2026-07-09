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

すべてのプロバイダーは `IAIProvider` インターフェースを実装し、`IRevealAIBuilder` のフルーエント API を通じて登録されます。1 つのプロバイダーを設定すると、AI ランタイムはすべてのリクエストでそれを使用します。

### プロバイダーの登録

プロバイダーは `AddRevealAI()` の後に拡張メソッドを追加して登録します：

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "your-api-key";
    });
```

### デフォルトプロバイダー

`DefaultProvider` 設定で、SDK が使用するプロバイダーを指定します。`appsettings.json` で設定できます：

```json title="appsettings.json"
{
  "RevealAI": {
    "DefaultProvider": "openai"
  }
}
```

利用可能なプロバイダーキー: `openai`、`azure-openai`、`anthropic`、`google`。

### 設定のバインディング

プロバイダーは `appsettings.json` の `RevealAI` セクションからの設定バインディングをサポートしています。コードで設定したオプションは設定ファイルの値よりも優先されます：

```json title="appsettings.json"
{
  "RevealAI": {
    "DefaultProvider": "openai",
    "OpenAI": {
      "ApiKey": "sk-...",
      "Model": "gpt-4.1"
    }
  }
}
```

## カスタムプロバイダー

標準でサポートされていない LLM サービスと統合する必要がある場合は、[カスタムプロバイダーを構築](providers-building-custom.md)できます。カスタムプロバイダーは **ASP.NET Core**（`IAIProvider` インターフェース経由）、**Java**（プラグインに登録したコールバック経由）、および **Node.js**（プラグインオプションのコールバック経由）でサポートされています。
