---
sidebar_label: Intents
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Intents

Reveal tags every AI call it makes with an **intent**. An intent names the workflow the call belongs to, such as generating a dashboard, analyzing a visualization, or ranking datasources. The developer can map an intent to a [profile](/ai/providers-overview#profiles) to run that workflow on a specific model. For example, dashboard generation can run on a larger model, and quick background steps can run on a fast, inexpensive one.

Intents are fixed by Reveal. The developer can't define new ones, but can map any of them to a profile.

## Intent values

The constants are on the `Intents` class in the `Reveal.Sdk.AI` namespace. In Node.js and Java, use the string values.

| Intent | Constant | What runs under it |
|---|---|---|
| `default` | `Intents.Default` | Conversational answers and clarifications: a chat message that doesn't ask to build, edit or analyze a dashboard. |
| `intent-classifier` | `Intents.IntentClassifier` | Deciding what a chat message asks for. It runs for each chat message that doesn't set an [`intent`](#the-chat-intent-field). |
| `generation-build-report` | `Intents.GenerationBuildReport` | Generating a new dashboard. Every step of the generation runs under this intent, except datasource ranking. |
| `generation-edit-existing-report` | `Intents.GenerationEditExistingReport` | Editing an existing dashboard. |
| `generation-add-widget-filters` | `Intents.GenerationAddWidgetFilters` | Adding filters to a dashboard's visualizations. |
| `generation-add-global-filters` | `Intents.GenerationAddGlobalFilters` | Adding dashboard filters. |
| `widget-adjustment-global-filters` | `Intents.WidgetAdjustmentGlobalFilters` | Adjusting the dashboard filters a visualization uses. |
| `widget-analysis` | `Intents.WidgetAnalysis` | Analyzing a visualization, from chat or from [Insights](/ai/insights). A dashboard analysis also runs each visualization's analysis, and the summary of their results, under this intent. |
| `dashboard-analysis` | `Intents.DashboardAnalysis` | Analyzing a whole dashboard, from chat or from Insights without a visualization: planning which visualizations to analyze and writing the final report. |
| `datasource-ranker` | `Intents.DatasourceRanker` | Ranking the datasources that could answer a request for a new dashboard. It runs as background work. See [Ranking datasources on a fast profile](#ranking-datasources-on-a-fast-profile). |
| `datasource-evaluate` | `Intents.DatasourceEvaluate` | Checking whether a single datasource can answer a request. The chat and insights endpoints don't make this call. |
| `metadata-semantic-enrichment` | `Intents.MetadataSemanticEnrichment` | Describing datasource metadata in the background, when semantic enrichment is enabled (see [Data Handling](/ai/data-handling#optional-metadata-enrichment)). |

:::note `default` intent vs. default profile
The `default` intent is the workflow for conversational answers. It isn't the [default profile](/ai/providers-overview#default-profile-and-intent-routing), which serves every intent that isn't mapped when the client doesn't request a profile. Mapping the `default` intent to a profile moves only conversational answers to it.
:::

:::caution `widget-analysis` and `dashboard-analysis`
Earlier versions ran a dashboard analysis's plan and final report under `widget-analysis`. An application that maps `widget-analysis` should map `dashboard-analysis` too, or these calls use the requested or default profile. The ASP.NET server logs a warning at startup when `widget-analysis` is mapped and `dashboard-analysis` isn't.
:::

## Mapping intents to profiles

Map an intent to a profile the developer has defined. Each AI call picks its profile in this order:

1. The profile mapped to the call's intent.
2. The profile the client requested.
3. The [default profile](/ai/providers-overview#default-profile-and-intent-routing).

An intent that isn't mapped follows the requested profile, or the default profile when the client requests none. Background work, such as datasource ranking and metadata enrichment, never has a requested profile, so it runs on the default profile unless its intent is mapped.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

Use `MapIntent`:

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddAnthropic()
    .AddProfile("default", p => { p.Provider = "openai"; p.Model = "gpt-4.1-mini"; })
    .AddProfile("dashboard-generation", p => { p.Provider = "anthropic"; p.Model = "claude-sonnet-4-5"; })
    .SetDefaultProfile("default")
    .MapIntent(Intents.GenerationBuildReport, "dashboard-generation")
    .MapIntent(Intents.GenerationEditExistingReport, "dashboard-generation");
```

Or the `RevealAI:Intents` configuration section, keyed by intent value:

```json title="appsettings.json"
{
  "RevealAI": {
    "Intents": {
      "generation-build-report": "dashboard-generation",
      "generation-edit-existing-report": "dashboard-generation"
    }
  }
}
```

When code and configuration map the same intent, the `MapIntent` call wins.

  </TabItem>

  <TabItem value="node" label="Node.js">

Use the `intents` option, keyed by intent value:

```javascript title="server.js"
revealAI.withOptions({
    providers: {
        openai: { type: 'OpenAI', apiKey: process.env.OPENAI_API_KEY },
        anthropic: { type: 'Anthropic', apiKey: process.env.ANTHROPIC_API_KEY }
    },
    profiles: {
        default: { provider: 'openai', model: 'gpt-4.1-mini' },
        'dashboard-generation': { provider: 'anthropic', model: 'claude-sonnet-4-5' }
    },
    defaultProfile: 'default',
    intents: {
        'generation-build-report': 'dashboard-generation',
        'generation-edit-existing-report': 'dashboard-generation'
    }
});
```

Intent mappings require the `providers` and `profiles` options: once `intents` is used, the `defaultProvider` and `settings` options shown in [Install Server SDK](/ai/install-server-sdk) are ignored.

  </TabItem>

  <TabItem value="java" label="Java">

Use `mapIntent` on the options builder:

```java title="Application.java"
RevealAIPluginOptions aiPluginOptions = RevealAIPluginOptions.builder()
        .addProvider("openai", Map.of("type", "OpenAI", "apiKey", System.getenv("OPENAI_API_KEY")))
        .addProvider("anthropic", Map.of("type", "Anthropic", "apiKey", System.getenv("ANTHROPIC_API_KEY")))
        .addProfile("default", Map.of("provider", "openai", "model", "gpt-4.1-mini"))
        .addProfile("dashboard-generation", Map.of("provider", "anthropic", "model", "claude-sonnet-4-5"))
        .defaultProfile("default")
        .mapIntent("generation-build-report", "dashboard-generation")
        .mapIntent("generation-edit-existing-report", "dashboard-generation")
        .build();
```

Intent mappings require the `addProvider` and `addProfile` options: once `mapIntent` is used, the `defaultProvider` and `settings` options shown in [Install Server SDK](/ai/install-server-sdk) are ignored.

  </TabItem>
</Tabs>

The server checks the mappings at startup:

- A mapping to a profile that isn't defined fails at startup, and the error lists the defined profiles.
- An intent can't be mapped to a [dynamic (BYOK) profile](/ai/byok). Those resolve per user and can only be requested by the client.
- A mapping whose key isn't one of the intents above logs a warning: it never matches a call.

Intent mappings are the developer's decisions. A [profile authorizer](/ai/profile-selection) doesn't filter them, and they still apply to users on their own connection: mapped intents keep running on the developer's models.

## Where else the intent appears

Every AI call carries its intent, so the developer can tell workflows apart beyond routing:

- **[Usage tracking](/ai/usage-tracking)** and **[observability](/ai/observability)**: each usage record has an `Intent`, and the logs and metrics report it, so token use can be broken down per workflow.
- **[Quota gate](/ai/quota-gate)**: the gate receives the intent of every call, so a plan can allow or restrict specific workflows.
- **[Custom providers](/ai/providers-building-custom)**: `AIRequest.Intent` tells the provider which workflow sent the call. Routing has already happened by then. A provider that still implements the legacy `SendPromptAsync` receives the earlier spelling of the value, such as `generationbuildreport`.

An application that checks `widget-analysis` in any of these places should check `dashboard-analysis` as well.

## The chat `intent` field

The [Chat endpoint](/ai/chat) also uses intent names. A chat request can set `intent` to run a specific operation instead of letting the AI classify the message, and the response's `intent` reports the operation that ran. The accepted values, and how the response reports them, are described in [Chat Endpoint](/ai/chat).

## Ranking datasources on a fast profile

When a dashboard request doesn't name a datasource and more than one datasource is available to the user, Reveal ranks the datasources that could answer it before it generates the dashboard. Ranking is its own intent, `Intents.DatasourceRanker` (`datasource-ranker`), and runs on the default profile, not on the profile the client requested. With many datasources it takes up to three model calls in a row, and it's often the slowest part of the request.

To speed it up, map the intent to a fast, low-latency profile:

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    // ...
    .AddProfile("fast", p => { p.Provider = "openai"; p.Model = "gpt-4.1-mini"; })
    .MapIntent(Intents.DatasourceRanker, "fast");
```

Or in configuration:

```json title="appsettings.json"
{
  "RevealAI": {
    "Intents": {
      "datasource-ranker": "fast"
    }
  }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript title="server.js"
revealAI.withOptions({
    // providers, ...
    profiles: {
        // ...
        fast: { provider: 'openai', model: 'gpt-4.1-mini' }
    },
    intents: {
        'datasource-ranker': 'fast'
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java title="Application.java"
RevealAIPluginOptions aiPluginOptions = RevealAIPluginOptions.builder()
        // ...
        .addProfile("fast", Map.of("provider", "openai", "model", "gpt-4.1-mini"))
        .mapIntent("datasource-ranker", "fast")
        .build();
```

  </TabItem>
</Tabs>

The ranker's model influences which datasource a dashboard reads, and a decisive ranking selects the datasource directly. A small model is faster, but it ranks less reliably than a larger one. The developer should test it with the questions users actually ask before switching.

## Compatibility

`Intents` was previously named `AIIntents`. `AIIntents` still works, with the same values, but is obsolete: the compiler warns (CS0618) and points to `Intents`.
