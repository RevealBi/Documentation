---
sidebar_label: Choosing a Model
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Choosing a Model

Reveal SDK AI works with any [supported provider](providers-overview.md) and the models each one offers. Your choice of model is the single biggest factor in the quality, speed, and cost of the AI features you expose to users. This page gives concrete recommendations — a flagship cloud model and a self-hosted local model — backed by Reveal's ongoing benchmarking.

## What the model has to do

Reveal asks the model to handle two very different kinds of work, and a model that excels at one is not guaranteed to excel at the other:

- **Dashboard generation** — the [Chat](sdk-chat.md) endpoint turns a natural-language request ("show me sales by region for 2023") into a dashboard. This is the harder task: the model must emit strictly structured JSON that references real tables and fields, applies the correct chart types, and respects filters and rules. Small formatting mistakes cause the whole result to fail.
- **Data insights** — the [Insights](sdk-insights.md) endpoint analyzes the data behind a visualization to produce summaries, statistical analysis (correlation, trend, mean/standard deviation), and forecasts. The output format is simpler, but the reasoning is more open-ended.

## Recommended flagship model

**Use GPT-4.1 (OpenAI).** It is the most balanced performer across both workloads — reliably handling dashboard generation while staying fast — and it is already the SDK's default model, so no extra configuration is required to adopt it.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
        options.Model = "gpt-4.1";
    });
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript title="server.js"
revealAI.withOptions({
    defaultProvider: 'openai',
    settings: {
        openai: {
            ApiKey: process.env.OPENAI_API_KEY,
            Model: 'gpt-4.1'
        }
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java title="Application.java"
Map<String, Object> aiSettings = Map.of(
        "openai", Map.of(
                "ApiKey", System.getenv("OPENAI_API_KEY"),
                "Model", "gpt-4.1"));
```

  </TabItem>
</Tabs>

See the [OpenAI provider](providers-openai.md) for full configuration options.

### Strong alternatives

If you prefer a different provider, or want to compare quality and cost against your own workloads, these models also perform at or near flagship level:

- **Claude Sonnet 4.5 / Claude Opus** ([Anthropic](providers-anthropic.md)) — match GPT-4.1 on quality, with Sonnet 4.5 offering a strong quality-to-cost balance. Expect somewhat higher latency on data insights.
- **Gemini 2.5 Pro / Gemini 3 Pro** ([Google Gemini](providers-google-gemini.md)) — capable across both workloads and a good fit if you are already on Google Cloud.

:::tip Reasoning models are not always better
For these structured tasks, dedicated "reasoning" models tend to be **slower and less reliable** than GPT-4.1, not more capable — they take much longer to answer and are more prone to timeouts, especially on data insights. Reach for a fast, non-reasoning flagship model first.
:::

## Recommended local model

If you need to keep data on your own infrastructure or avoid per-token API costs, you can run a model locally and point the OpenAI provider at it through a [custom endpoint](providers-custom-endpoints.md).

**Use Gemma 4 26B (`gemma-4-26b-a4b-it`).** Among locally hosted models it delivers the best overall accuracy on both workloads, and it is small enough to run on a capable workstation (validated on a 64 GB Apple Silicon machine).

If you want faster responses and a smaller memory footprint, **GPT-OSS 20B** is a strong runner-up — noticeably quicker, though a step behind Gemma 4 26B on data insights.

Run either model with a server that exposes an OpenAI-compatible API — such as [Ollama](https://ollama.ai), [LM Studio](https://lmstudio.ai), or [vLLM](https://github.com/vllm-project/vllm) — and set the `Endpoint` and `Model` options:

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "ollama";                        // local servers ignore the key
        options.Endpoint = "http://localhost:11434/v1";
        options.Model = "gemma-4-26b-a4b-it";
    });
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript title="server.js"
revealAI.withOptions({
    defaultProvider: 'openai',
    settings: {
        openai: {
            ApiKey: 'ollama',                             // local servers ignore the key
            Endpoint: 'http://localhost:11434/v1',
            Model: 'gemma-4-26b-a4b-it'
        }
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java title="Application.java"
Map<String, Object> aiSettings = Map.of(
        "openai", Map.of(
                "ApiKey", "ollama",                       // local servers ignore the key
                "Endpoint", "http://localhost:11434/v1",
                "Model", "gemma-4-26b-a4b-it"));
```

  </TabItem>
</Tabs>

:::note Local models and dashboard generation
Local models are a good fit for data insights and for straightforward dashboard generation. For complex, multi-widget dashboards, the strongest cloud models are still meaningfully more reliable — validate against your own prompts before committing to a fully local setup. Avoid "thinking"/reasoning local models: they struggle to stay within the required JSON schema and are slow on modest hardware.
:::

## Benchmark summary

The recommendations above come from Reveal's ongoing benchmarking. Each model runs two 10-task suites built on the Northwind sample database — one for dashboard generation, one for data insights — with tasks of increasing difficulty graded by an independent LLM judge. The score is how many of the 10 tasks the model handled **reliably** (a correct result on the majority of attempts), out of 10. **DNF** means the suite did not complete — the model failed the early tasks and the run was stopped.

The full results for every model tested are below. Find your current model to see how it compares — if it scores poorly on the workload you care about, the models recommended above are drop-in replacements.

### Cloud models

| Model | Provider | Dashboard generation | Data insights |
|-------|----------|:--------------------:|:-------------:|
| **GPT-4.1** *(recommended)* | OpenAI | 10 | 9 |
| GPT-5.4 | OpenAI | 6 | 10 |
| GPT-5.4 mini | OpenAI | 6 | 9 |
| GPT-5.4 nano | OpenAI | 6 | 6 |
| GPT-5.3 Codex | OpenAI | 7 | 9 |
| GPT-5.2 | OpenAI | 8 | 9 |
| GPT-5.1 | OpenAI | 8 | 8 |
| GPT-5 | OpenAI | 6 | 6 |
| Claude Opus 4.6 | Anthropic | 9 | 10 |
| Claude Opus 4.5 | Anthropic | 8 | 8 |
| Claude Opus 4.1 | Anthropic | 10 | 4 |
| Claude Sonnet 4.6 | Anthropic | 6 | 10 |
| Claude Sonnet 4.5 | Anthropic | 9 | 9 |
| Gemini 3.1 Pro | Google | 8 | 9 |
| Gemini 3 Pro | Google | 7 | 9 |
| Gemini 3 Flash | Google | 6 | 7 |
| Gemini 3.1 Flash Lite | Google | 4 | 7 |
| Gemini 2.5 Pro | Google | 6 | 8 |
| Gemini 2.5 Flash | Google | 5 | 6 |
| Mercury 2 | Inception Labs | 4 | 5 |

Newer and preview model versions were sometimes captured under early-access conditions and their scores may not reflect current generally-available behavior. Latency varies widely too: reasoning-oriented models (several of the GPT-5.x variants, and Claude Opus/Sonnet when thinking is engaged) answer much more slowly — especially on data insights — without a matching gain in reliability.

### Open-weight models

These models can be self-hosted or accessed through a hosted-inference provider, using the [custom endpoint](providers-custom-endpoints.md) configuration.

| Model | Dashboard generation | Data insights | Notes |
|-------|:--------------------:|:-------------:|-------|
| **Gemma 4 26B** *(recommended)* | 7 | 8 | Best open-weight accuracy overall |
| GPT-OSS 20B | 6 | 6 | Fastest; light memory footprint |
| GPT-OSS 120B | 5 | 8 | Larger; strong on data insights |
| Kimi K2 Instruct | 1 | 9 | Excellent insights, weak generation |
| Qwen3 32B | 6 | 2 | Decent generation, weak insights |
| Llama 4 Maverick 17B | 3 | 6 | |
| Llama 3.3 70B | 1 | 6 | |
| Gemma 3 12B | 2 | 4 | Smallest; limited on harder tasks |
| Qwen3.5 35B-A3B | 3 | DNF | Insights suite did not complete |
| Nemotron 3 Nano 30B | 0 | 3 | Reasoning model; poor schema adherence |
| Gemma 3 27B | DNF | — | Generation suite did not complete |
| Llama 3 70B | DNF | — | Generation suite did not complete |

Open-weight scores depend heavily on quantization, host, and sampling settings — treat them as indicative of a well-configured run rather than fixed numbers. The results above use 4-bit to 8-bit quantizations on workstation-class hardware or a hosted-inference provider.

:::info A moving target
Model quality shifts every time a provider ships a new version, so treat these figures as a snapshot rather than a permanent ranking. The best way to choose is to test the top candidates against your own data and prompts before you commit.
:::
