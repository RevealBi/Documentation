---
sidebar_label: Custom Endpoints
---


# Custom Endpoints

You can use the OpenAI provider with any OpenAI-compatible API endpoint. This is useful for connecting to local model servers, third-party providers, or self-hosted models that expose an OpenAI-compatible chat completions API.

## Configuration

Set the `Endpoint` option on the OpenAI provider to point to your custom API:

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "your-api-key";
        options.Endpoint = "https://your-custom-endpoint.com/v1";
        options.Model = "your-model-name";
    });
```

Or using `appsettings.json`:

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

## Common Use Cases

### Local Model Servers

Tools like [Ollama](https://ollama.ai), [LM Studio](https://lmstudio.ai), and [vLLM](https://github.com/vllm-project/vllm) expose OpenAI-compatible APIs that can be used directly:

```csharp
// Ollama example
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "ollama";  // Ollama doesn't require a real key
        options.Endpoint = "http://localhost:11434/v1";
        options.Model = "llama3";
    });
```

### Third-Party Providers

Many AI providers offer OpenAI-compatible endpoints:

```csharp
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "your-provider-api-key";
        options.Endpoint = "https://api.provider.com/v1";
        options.Model = "provider-model-name";
    });
```

## Limitations

When using custom endpoints, be aware of:

- The endpoint must support the OpenAI Chat Completions API format
- Token usage reporting depends on the endpoint's compatibility
- Reasoning model detection is based on model name patterns (o1, o3, o4, gpt-5) and may not apply to custom models
- Some advanced features may not be supported by all custom endpoints

## Custom Providers

If your endpoint doesn't follow the OpenAI-compatible API format, consider [building a custom provider](providers-building-custom) instead.
