---
sidebar_label: Building a Custom Provider
---


# Building a Custom Provider

If you need to integrate with an LLM service that isn't supported out of the box, you can create a custom provider and register it with the SDK.

:::info Platform support

The approach depends on your server platform:

- **ASP.NET Core** - implement the `IAIProvider` interface and register it with `AddProvider` (covered below).
- **Java** - register a callback with the `RevealAIPlugin` (see [Java: Custom Providers via Callbacks](#java-custom-providers-via-callbacks)).
- **Node.js** - register a callback with the AI plugin options (see [Node.js: Custom Providers via Callbacks](#nodejs-custom-providers-via-callbacks)).

If your target service exposes an OpenAI-compatible API, you can also use the [Custom Endpoints](providers-custom-endpoints.md) approach with the OpenAI provider on any platform.

:::

## Step 1: Create the Provider Class

Implement the `IAIProvider` interface:

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

        // Call your LLM service here
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
        // Your LLM integration logic here
        throw new NotImplementedException();
    }
}
```

### IAIProvider Interface

The `IAIProvider` interface defines a single method:

```csharp
public interface IAIProvider
{
    Task<ProviderResponse> SendPromptAsync(
        ProviderRequest request,
        CancellationToken cancellationToken = default);
}
```

### ProviderRequest

The request object contains:

| Property | Type | Description |
|----------|------|-------------|
| `Prompt` | `string` | The prompt to send to the LLM. |
| `Intent` | `string` | The intent of the request (e.g., `"default"`). |
| `Model` | `string?` | Optional model override. If `null`, use the provider's default model. |

### ProviderResponse

Your provider must return a `ProviderResponse`:

| Property | Type | Description |
|----------|------|-------------|
| `Content` | `string` | The generated text content. |
| `FinishReason` | `FinishReason` | Why the generation stopped: `Stop`, `Length`, or `ContentFilter`. |
| `Usage` | `TokenUsage?` | Optional token usage information. |
| `Model` | `string?` | The model that was actually used. |

## Step 2: Register the Provider

Use the `AddProvider` method on `IRevealAIBuilder` to register your custom provider:

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

The first parameter is the **provider key** - a unique string identifier used to resolve the provider. The second parameter is a factory function that receives the `IServiceProvider` for dependency injection.

## Step 3: Set as Default (Optional)

To make your custom provider the default:

```json title="appsettings.json"
{
  "RevealAI": {
    "DefaultProvider": "my-custom"
  }
}
```

## Complete Example

Here's a complete example with configuration binding:

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

        // Your LLM integration logic
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
        // Implement your LLM service call
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

## Using with Built-in Providers

Custom providers can be registered alongside built-in providers:

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddProvider<MyCustomProvider>("my-custom", sp =>
    {
        return new MyCustomProvider(/* ... */);
    });
```

## Java: Custom Providers via Callbacks

In Java, custom providers are not implemented as `IAIProvider` classes. Instead, you register a **callback** with the `RevealAIPlugin` that receives the prompt request as JSON and returns the response as JSON. The plugin bridges the callback to the underlying AI engine.

### Registration Conventions

Callbacks are registered by key in the `Map<String, RevealPluginCallback>` you pass to `RevealAIPlugin.withOptions(options, callbacks)`:

| Key | Behavior |
|-----|----------|
| `aiProvider` | Registers a single custom provider. It is selectable under the reserved name `CustomAIProvider`. |
| `aiProvider:<key>` | Registers a **named** provider. `<key>` (e.g. `my-custom-provider`) becomes a selectable provider/model name. You can register multiple named providers. |

:::warning Reserved name

`CustomAIProvider` is reserved. Passing `aiProvider:CustomAIProvider` throws an `IllegalArgumentException`.

:::

### Callback Signature

A provider callback implements `RevealPluginCallback`:

```java
@FunctionalInterface
public interface RevealPluginCallback {
    CompletableFuture<String> invoke(IRVUserContext userContext, String message);
}
```

- **`message`** - a JSON-serialized request with the following fields:

  | Field | Type | Description |
  |-------|------|-------------|
  | `prompt` | string | The prompt to send to the LLM. |
  | `intent` | string | The intent of the request (e.g. `"default"`). |
  | `model` | string \| null | Optional model override. If `null`, use your provider's default. |

- **Return value** - a JSON-serialized response with the following fields:

  | Field | Type | Description |
  |-------|------|-------------|
  | `content` | string | The generated text content. |
  | `finishReason` | string | Why generation stopped: `Stop`, `Length`, or `ContentFilter`. |
  | `usage` | object \| null | Optional token usage: `{ "inputTokens": <int>, "outputTokens": <int> }`. |
  | `model` | string \| null | The model that actually served the request. |

The response JSON uses **camelCase** keys and `finishReason` is a string value such as `"Stop"`.

### Example

```java title="Application.java"
Map<String, RevealPluginCallback> callbacks = new LinkedHashMap<>();

callbacks.put("aiProvider:my-custom-provider", (userContext, message) -> {
    // 'message' is a JSON ProviderRequest: { "prompt": "...", "intent": "default", "model": null }
    // Call your LLM service here, then return a JSON ProviderResponse.
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

To make your custom provider the default, set its key as the default provider:

```java
RevealAIPluginOptions aiPluginOptions = new RevealAIPluginOptions(
        "my-custom-provider",   // defaultProvider
        metadataCatalogPath,
        null, null,
        Map.of("settings", aiSettings));
```

:::tip Production callbacks

Real callbacks should parse the incoming JSON (for example with Jackson) to read the `prompt`/`model`, call your LLM asynchronously, and serialize the response back. Returning `null` or an empty string causes the request to fail.

:::

## Node.js: Custom Providers via Callbacks

Node.js uses the same callback-based mechanism as Java. You supply a callback (or a map of named callbacks) to the AI plugin options; each callback receives the request as a JSON string and returns the response as a JSON string.

### Registration Conventions

| Registration | Behavior |
|--------------|----------|
| A single `aiProvider` function | Registers one custom provider, selectable under the reserved name `Node`. |
| A map of `{ "<key>": function }` | Registers **named** providers. Each `<key>` becomes a selectable provider/model name. |

### Request and Response Contract

The request and response payloads are identical to the [Java contract](#callback-signature):

- **Input** - a JSON-serialized request: `{ "prompt": "...", "intent": "default", "model": null }`.
- **Return value** - a JSON-serialized response with camelCase keys: `content`, `finishReason` (`Stop` \| `Length` \| `ContentFilter`), optional `usage` (`{ "inputTokens", "outputTokens" }`), and optional `model`.

### Example

```javascript title="index.js"
const aiProviders = {
    "my-custom-provider": async (userContext, message) => {
        // 'message' is a JSON ProviderRequest.
        // Call your LLM service here, then return a JSON ProviderResponse string.
        return JSON.stringify({
            content: "Hello from my custom Node.js AI provider",
            finishReason: "Stop",
            usage: { inputTokens: 1, outputTokens: 1 },
            model: "my-custom-provider"
        });
    }
};

// Pass aiProviders when configuring the Reveal AI plugin options.
```
