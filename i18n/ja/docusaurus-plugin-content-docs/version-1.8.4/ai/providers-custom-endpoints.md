---
sidebar_label: カスタムエンドポイント
---


# カスタムエンドポイント

OpenAI プロバイダーを使用して、任意の OpenAI 互換 API エンドポイントに接続できます。これは、ローカルモデルサーバー、サードパーティプロバイダー、または OpenAI 互換のチャット補完 API を公開するセルフホスト型モデルに接続する場合に便利です。

## 設定

OpenAI プロバイダーの `Endpoint` オプションを設定して、カスタム API を指定します：

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "your-api-key";
        options.Endpoint = "https://your-custom-endpoint.com/v1";
        options.Model = "your-model-name";
    });
```

または `appsettings.json` を使用する場合：

```json title="appsettings.json"
{
  "RevealAI": {
    "OpenAI": {
      "ApiKey": "your-api-key",
      "Endpoint": "https://your-custom-endpoint.com/v1",
      "Model": "your-model-name"
    }
  }
}
```

## 一般的なユースケース

### ローカルモデルサーバー

[Ollama](https://ollama.ai)、[LM Studio](https://lmstudio.ai)、[vLLM](https://github.com/vllm-project/vllm) などのツールは、直接使用できる OpenAI 互換 API を提供しています：

```csharp
// Ollama の例
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "ollama";  // Ollama は実際のキーを必要としません
        options.Endpoint = "http://localhost:11434/v1";
        options.Model = "llama3";
    });
```

### サードパーティプロバイダー

多くの AI プロバイダーが OpenAI 互換エンドポイントを提供しています：

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "your-provider-api-key";
        options.Endpoint = "https://api.provider.com/v1";
        options.Model = "provider-model-name";
    });
```

## 制限事項

カスタムエンドポイントを使用する場合、以下の点にご注意ください：

- エンドポイントは OpenAI Chat Completions API 形式をサポートしている必要があります
- トークン使用量の報告はエンドポイントの互換性に依存します
- 推論モデルの検出はモデル名のパターン（o1、o3、o4、gpt-5）に基づいており、カスタムモデルには適用されない場合があります
- 一部の高度な機能はすべてのカスタムエンドポイントでサポートされるとは限りません

## カスタムプロバイダー

エンドポイントが OpenAI 互換 API 形式に従っていない場合は、代わりに[カスタムプロバイダーの構築](providers-building-custom.md)を検討してください。
