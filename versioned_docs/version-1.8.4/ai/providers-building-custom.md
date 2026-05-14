---
sidebar_label: Building a Custom Provider
---


# Building a Custom Provider

If you need to integrate with an LLM service that isn't supported out of the box, you can create a custom provider by implementing the `IAIProvider` interface and registering it with the SDK.

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

The first parameter is the **provider key** — a unique string identifier used to resolve the provider. The second parameter is a factory function that receives the `IServiceProvider` for dependency injection.

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
