---
sidebar_label: カスタムプロバイダーの構築
---


# カスタムプロバイダーの構築

標準でサポートされていない LLM サービスと統合する必要がある場合、カスタムプロバイダーを作成し、SDK に登録することができます。

:::info プラットフォームサポート

アプローチはサーバープラットフォームによって異なります：

- **ASP.NET Core** - `IAIProvider` インターフェースを実装し、`AddProvider` で登録します（以下で説明）。
- **Java** - `RevealAIPlugin` にコールバックを登録します（[Java: コールバックによるカスタムプロバイダー](#java-コールバックによるカスタムプロバイダー)を参照）。
- **Node.js** - AI プラグインオプションにコールバックを登録します（[Node.js: コールバックによるカスタムプロバイダー](#nodejs-コールバックによるカスタムプロバイダー)を参照）。

対象サービスが OpenAI 互換の API を公開している場合は、任意のプラットフォームで OpenAI プロバイダーの[カスタムエンドポイント](providers-custom-endpoints.md)アプローチを使用することもできます。

:::

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

最初のパラメータは **プロバイダーキー** - プロバイダーを解決するために使用される一意の文字列識別子です。2番目のパラメータは、依存性注入用の `IServiceProvider` を受け取るファクトリ関数です。

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

## Java: コールバックによるカスタムプロバイダー

カスタムプロバイダーを実装するには、プロンプトリクエストを JSON として受け取り、レスポンスを JSON として返す**コールバック**を `RevealAIPlugin` に登録します。プラグインはコールバックを基盤となる AI エンジンにブリッジします。

### 登録規則

コールバックは、`RevealAIPlugin.withOptions(options, callbacks)` に渡す `Map<String, RevealPluginCallback>` のキーで登録されます：

| キー | 動作 |
|-----|----------|
| `aiProvider` | 単一のカスタムプロバイダーを登録します。予約名 `CustomAIProvider` で選択可能になります。 |
| `aiProvider:<key>` | **名前付き**プロバイダーを登録します。`<key>`（例: `my-custom-provider`）が選択可能なプロバイダー/モデル名になります。複数の名前付きプロバイダーを登録できます。 |

:::warning 予約名

`CustomAIProvider` は予約済みです。`aiProvider:CustomAIProvider` を渡すと `IllegalArgumentException` がスローされます。

:::

### コールバックシグネチャ

プロバイダーコールバックは `RevealPluginCallback` を実装します：

```java
@FunctionalInterface
public interface RevealPluginCallback {
    CompletableFuture<String> invoke(IRVUserContext userContext, String message);
}
```

- **`message`** - 以下のフィールドを含む JSON シリアライズされたリクエスト：

  | フィールド | 型 | 説明 |
  |-------|------|-------------|
  | `prompt` | string | LLM に送信するプロンプト。 |
  | `intent` | string | リクエストのインテント（例: `"default"`）。 |
  | `model` | string \| null | オプションのモデルオーバーライド。`null` の場合、プロバイダーのデフォルトを使用します。 |

- **戻り値** - 以下のフィールドを含む JSON シリアライズされたレスポンス：

  | フィールド | 型 | 説明 |
  |-------|------|-------------|
  | `content` | string | 生成されたテキストコンテンツ。 |
  | `finishReason` | string | 生成が停止した理由: `Stop`、`Length`、または `ContentFilter`。 |
  | `usage` | object \| null | オプションのトークン使用量: `{ "inputTokens": <int>, "outputTokens": <int> }`。 |
  | `model` | string \| null | リクエストを実際に処理したモデル。 |

レスポンス JSON は **camelCase** キーを使用し、`finishReason` は `"Stop"` のような文字列値です。

### 例

```java title="Application.java"
Map<String, RevealPluginCallback> callbacks = new LinkedHashMap<>();

callbacks.put("aiProvider:my-custom-provider", (userContext, message) -> {
    // 'message' は JSON ProviderRequest: { "prompt": "...", "intent": "default", "model": null }
    // ここで LLM サービスを呼び出し、JSON ProviderResponse を返します。
    return CompletableFuture.completedFuture(
            "{\"content\":\"Hello from my custom Java AI provider\","
            + "\"finishReason\":\"Stop\","
            + "\"usage\":{\"inputTokens\":1,\"outputTokens\":1},"
            + "\"model\":\"my-custom-provider\"}");
});

RevealPlugin aiPlugin = RevealAIPlugin.withOptions(aiPluginOptions, callbacks);

IRevealServer server = new RevealServerBuilder()
        .addPlugin(aiPlugin)
        // ...
        .build();
```

カスタムプロバイダーをデフォルトにするには、そのキーをデフォルトプロバイダーとして設定します：

```java
RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "my-custom-provider",   // defaultProvider
        metadataCatalogPath,
        null, null,
        Map.of("settings", aiSettings));
```

:::tip 本番環境のコールバック

実際のコールバックは、受信した JSON を解析し（例: Jackson を使用）、`prompt`/`model` を読み取り、LLM を非同期で呼び出し、レスポンスをシリアライズして返す必要があります。`null` または空文字列を返すとリクエストが失敗します。

:::

## Node.js: コールバックによるカスタムプロバイダー

AI プラグインオプションにコールバック（または名前付きコールバックのマップ）を渡します。各コールバックはリクエストを JSON 文字列として受け取り、レスポンスを JSON 文字列として返します。

### 登録規則

| 登録方法 | 動作 |
|--------------|----------|
| 単一の `aiProvider` 関数 | 1 つのカスタムプロバイダーを登録します。予約名 `Node` で選択可能になります。 |
| `{ "<key>": function }` のマップ | **名前付き**プロバイダーを登録します。各 `<key>` が選択可能なプロバイダー/モデル名になります。 |

### リクエストとレスポンスの仕様

リクエストとレスポンスのペイロードは [Java の仕様](#コールバックシグネチャ)と同一です：

- **入力** - JSON シリアライズされたリクエスト: `{ "prompt": "...", "intent": "default", "model": null }`。
- **戻り値** - camelCase キーを使用した JSON シリアライズされたレスポンス: `content`、`finishReason`（`Stop` \| `Length` \| `ContentFilter`）、オプションの `usage`（`{ "inputTokens", "outputTokens" }`）、オプションの `model`。

### 例

```javascript title="index.js"
const aiProviders = {
    "my-custom-provider": async (userContext, message) => {
        // 'message' は JSON ProviderRequest。
        // ここで LLM サービスを呼び出し、JSON ProviderResponse 文字列を返します。
        return JSON.stringify({
            content: "Hello from my custom Node.js AI provider",
            finishReason: "Stop",
            usage: { inputTokens: 1, outputTokens: 1 },
            model: "my-custom-provider"
        });
    }
};

// Reveal AI プラグインオプションを設定する際に aiProviders を渡します。
```
