---
sidebar_label: Overview
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# Reveal SDK AI Overview

The Reveal SDK AI adds powerful artificial intelligence capabilities to your Reveal BI applications, enabling users to gain insights, generate dashboards, and interact with data through natural language.

## What is Reveal SDK AI?

Reveal SDK AI is an extension of the Reveal SDK that integrates large language models (LLMs) to provide:

- **AI-Generated Insights**: Automatically generate summaries, analyses, and forecasts for your dashboards and visualizations
- **Natural Language Dashboard Generation**: Create dashboards by describing what you want in plain language
- **Conversational Analytics**: Chat with your data to explore, analyze, and visualize information
- **Smart Data Discovery**: AI-powered datasource exploration and metadata understanding

## Key Features

### AI Insights

Generate intelligent insights from your data with three types of analysis:

- **Summary**: Get concise explanations of what your data shows
- **Analysis**: Receive detailed interpretations of trends, patterns, and anomalies
- **Forecast**: Predict future values based on historical data

All insights can be streamed in real-time for a ChatGPT-like user experience.

### Dashboard Generation

Users can generate complete dashboards by simply describing what they want to see:

```typescript
const response = await client.ai.dashboards.generate({
  userPrompt: 'Show me sales by region with a trend over time',
  datasourceId: 'my-datasource'
});
```

The AI analyzes your datasource schema and creates appropriate visualizations automatically.

### Dashboard Editing

Modify existing dashboards using natural language:

- **Edit Content**: Add, remove, or modify visualizations
- **Edit Filters**: Adjust visualization-level or global filters
- **Describe Dashboards**: Get AI-generated descriptions of dashboard content

### Conversational AI Chat

Build chat interfaces where users can:

- Ask questions about their data in natural language
- Get instant dashboard and visualization results
- Maintain conversation context for follow-up questions
- Stream responses in real-time

### Flexible API Patterns

Choose the pattern that fits your use case:

**Await Pattern** - Simple and straightforward:
```typescript
const result = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  insightType: InsightType.Summary
});
console.log(result.explanation);
```

**Streaming Pattern** - Real-time updates:
```typescript
const result = await client.ai.insights.get(
  {
    dashboardId: 'sales-dashboard',
    insightType: InsightType.Summary
  },
  {
    onTextChunk: (chunk) => {
      // Display text as it arrives
      console.log(chunk);
    },
    onComplete: (message, result) => {
      console.log('Complete!');
    }
  },
  { streamExplanation: true }
);
```

## Architecture

The Reveal SDK AI consists of two main components:

### Client SDK (TypeScript/JavaScript)

The client SDK runs in your web application and provides:

- Simple initialization and configuration
- Type-safe API for all AI operations
- Built-in streaming support via Server-Sent Events (SSE)
- Request cancellation and error handling

### Server SDK (ASP.NET Core)

The server SDK handles:

- LLM provider integration (OpenAI, Anthropic, Google, etc.)
- Datasource metadata generation and caching
- Intent-based LLM routing
- Context management for conversational AI
- Security and authentication

## Beta Status

Reveal SDK AI is currently in beta. While the core features are stable and ready for development, the API may evolve based on user feedback. We encourage you to try it out and share your experience with us.

Let's build intelligent analytics experiences together!
