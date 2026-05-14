---
sidebar_label: カスタムプロバイダーの構築
---


# カスタムプロバイダーの構築

標準でサポートされていない LLM サービスと統合する必要がある場合、`IAIProvider` インターフェースを実装し、SDK に登録することでカスタムプロバイダーを作成できます。

## ステップ 1: プロバイダークラスの作成

`IAIProvider` インターフェースを実装します：

```csharp
using Reveal.Sdk.AI;

public class MyCustomProvider : IAIProvider
{
    private readonly string _apiKey;
    private readonly string _model;

    public MyCustomProvider(string apiKey, string model)
    {
        _apiKey = apiKey;
        _model = model;
    }

    public async Task<ProviderResponse> SendPromptAsync(
        ProviderRequest request,
        CancellationToken cancellationToken = default)
    {
        var model = request.Model ?? _model;

        // ここで LLM サービスを呼び出します
        var result = await CallMyLLMService(request.Prompt, model, cancellationToken);

        return new ProviderResponse
        {
            Content = result.Text,
            FinishReason = FinishReason.Stop,
            Usage = new TokenUsage
            {
                InputTokens = result.InputTokens,
                OutputTokens = result.OutputTokens
            },
            Model = model
        };
    }

    private async Task<MyLLMResult> CallMyLLMService(
        string prompt, string model, CancellationToken cancellationToken)
    {
        // LLM 統合ロジックをここに実装します
        throw new NotImplementedException();
    }
}
```

### IAIProvider インターフェース

`IAIProvider` インターフェースは単一のメソッドを定義します：

```csharp
public interface IAIProvider
{
    Task<ProviderResponse> SendPromptAsync(
        ProviderRequest request,
        CancellationToken cancellationToken = default);
}
```

### ProviderRequest

リクエストオブジェクトには以下が含まれます：

| プロパティ | 型 | 説明 |
|----------|------|-------------|
| `Prompt` | `string` | LLM に送信するプロンプト。 |
| `Intent` | `string` | リクエストのインテント（例: `"default"`）。 |
| `Model` | `string?` | オプションのモデルオーバーライド。`null` の場合、プロバイダーのデフォルトモデルを使用します。 |

### ProviderResponse

プロバイダーは `ProviderResponse` を返す必要があります：

| プロパティ | 型 | 説明 |
|----------|------|-------------|
| `Content` | `string` | 生成されたテキストコンテンツ。 |
| `FinishReason` | `FinishReason` | 生成が停止した理由: `Stop`、`Length`、または `ContentFilter`。 |
| `Usage` | `TokenUsage?` | オプションのトークン使用量情報。 |
| `Model` | `string?` | 実際に使用されたモデル。 |

## ステップ 2: プロバイダーの登録

`IRevealAIBuilder` の `AddProvider` メソッドを使用してカスタムプロバイダーを登録します：

```csharp
builder.Services.AddRevealAI()
    .AddProvider<MyCustomProvider>("my-custom", sp =>
    {
        var config = sp.GetRequiredService<IConfiguration>();
        return new MyCustomProvider(
            apiKey: config["RevealAI:MyCustom:ApiKey"],
            model: config["RevealAI:MyCustom:Model"] ?? "default-model"
        );
    });
```

最初のパラメータは **プロバイダーキー** — プロバイダーを解決するために使用される一意の文字列識別子です。2番目のパラメータは、依存性注入用の `IServiceProvider` を受け取るファクトリ関数です。

## ステップ 3: デフォルトとして設定（オプション）

カスタムプロバイダーをデフォルトにするには：

```json title="appsettings.json"
{
  "RevealAI": {
    "DefaultProvider": "my-custom"
  }
}
```

## 完全な例

設定バインディングを使用した完全な例を以下に示します：

```csharp title="MyCustomProvider.cs"
using Reveal.Sdk.AI;

public class MyCustomOptions
{
    public string ApiKey { get; set; } = string.Empty;
    public string Model { get; set; } = "default-model";
    public int MaxTokens { get; set; } = 4096;
}

public class MyCustomProvider : IAIProvider
{
    private readonly MyCustomOptions _options;

    public MyCustomProvider(MyCustomOptions options)
    {
        _options = options ?? throw new ArgumentNullException(nameof(options));
    }

    public async Task<ProviderResponse> SendPromptAsync(
        ProviderRequest request,
        CancellationToken cancellationToken = default)
    {
        var model = request.Model ?? _options.Model;

        // LLM 統合ロジック
        var responseText = await CallYourService(request.Prompt, model, cancellationToken);

        return new ProviderResponse
        {
            Content = responseText,
            FinishReason = FinishReason.Stop,
            Model = model
        };
    }

    private Task<string> CallYourService(
        string prompt, string model, CancellationToken cancellationToken)
    {
        // LLM サービス呼び出しを実装します
        throw new NotImplementedException();
    }
}
```

```csharp title="Program.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddReveal();

builder.Services.AddRevealAI()
    .AddProvider<MyCustomProvider>("my-custom", sp =>
    {
        var config = sp.GetRequiredService<IConfiguration>();
        var options = new MyCustomOptions
        {
            ApiKey = config["RevealAI:MyCustom:ApiKey"] ?? "",
            Model = config["RevealAI:MyCustom:Model"] ?? "default-model",
            MaxTokens = int.Parse(config["RevealAI:MyCustom:MaxTokens"] ?? "4096")
        };
        return new MyCustomProvider(options);
    });

var app = builder.Build();
app.MapControllers();
app.Run();
```

## ビルトインプロバイダーとの併用

カスタムプロバイダーはビルトインプロバイダーと一緒に登録できます：

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddProvider<MyCustomProvider>("my-custom", sp =>
    {
        return new MyCustomProvider(/* ... */);
    });
```
