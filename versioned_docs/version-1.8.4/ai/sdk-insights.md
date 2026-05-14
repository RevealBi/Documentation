---
sidebar_label: Insights
---


# Insights

The `client.ai.insights.get()` method generates AI-powered summaries, analyses, and forecasts from your dashboards and visualizations.

## Basic Usage

```typescript
import { RevealSdkClient } from '@revealbi/api';

const client = RevealSdkClient.getInstance();

// Get a summary for an entire dashboard
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
});

console.log(insight.explanation);
// "Sales revenue reached $2.4M in Q4 2024..."
```

## Insight Types

Specify the `type` parameter to control the kind of analysis:

```typescript
// Summary - concise overview of key metrics
const summary = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
});

// Analysis - detailed interpretation of trends and patterns
const analysis = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'analysis',
});

// Forecast - predictions based on historical data
const forecast = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'forecast',
  forecastPeriods: 12,  // Forecast 12 periods ahead (default: 6)
});
```

## Using Dashboard Objects

You can pass a dashboard object directly instead of a dashboard ID:

```typescript
// Using RVDashboard object from RevealView
const insight = await client.ai.insights.get({
  dashboard: revealView.dashboard,  // RVDashboard object
  type: 'analysis',
});
```

## Visualization-Level Insights

Analyze a specific visualization by providing its ID:

```typescript
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  visualizationId: 'sales-by-region-chart',  // Specific visualization
  type: 'summary',
});
```

## Streaming

Add `stream: true` to any request to receive responses in real-time. See [Streaming Responses](./sdk-streaming.md) for consumption patterns and examples.

---

## Request Parameters

All parameters are passed in a single request object:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dashboard` | `string \| RVDashboard` | * | Dashboard object from RevealView or JSON string |
| `dashboardId` | `string` | * | Dashboard identifier |
| `visualizationId` | `string` | No | Visualization ID to analyze |
| `type` | `InsightType` | Yes | Type: `'summary'`, `'analysis'`, `'forecast'` |
| `forecastPeriods` | `number` | No | Periods to forecast (default: 6) |
| `model` | `string` | No | Name of specific LLM model to use |
| `signal` | `AbortSignal` | No | AbortSignal for cancelling the request |
| `stream` | `boolean` | No | Enable streaming mode (default: `false`) |

\* Either `dashboard` or `dashboardId` must be provided

## Response Type

```typescript
interface InsightResponse {
  explanation: string;  // Complete AI-generated explanation
}
```

The `explanation` field contains the full insight text, whether you use non-streaming or streaming mode.
