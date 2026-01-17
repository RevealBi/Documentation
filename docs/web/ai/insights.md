---
sidebar_label: Insights
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# AI Insights

AI Insights automatically analyze your dashboards and visualizations to generate natural language explanations, identify trends and patterns, and forecast future values. Insights help users understand their data without requiring deep analytics expertise.

## What are Insights?

Insights are AI-generated text explanations that describe what your data shows. The Reveal SDK AI can generate three types of insights:

### Summary
A concise overview of what the data shows. Summaries highlight key metrics, top performers, and overall trends.

**Example:** "Sales revenue reached $2.4M in Q4 2024, up 18% from Q3. The Technology category led growth with $890K in sales, while the West region showed the strongest performance at $1.1M."

### Analysis
A detailed interpretation that identifies patterns, anomalies, trends, and correlations in the data.

**Example:** "Analysis reveals a strong seasonal pattern with peaks in Q4 driven by holiday shopping. The Technology category shows consistent month-over-month growth averaging 12%, while Office Supplies demonstrate more volatility. A notable spike in October coincides with the new product launch campaign."

### Forecast
Predictions of future values based on historical data trends. You can specify how many periods ahead to forecast.

**Example:** "Based on historical trends, Q1 2025 sales are forecasted at $2.1M, with continued growth expected through mid-year. The model predicts Technology category sales will reach $950K by March 2025, representing 15% growth from the current period."

## Insight Scope

Insights can be generated at two levels:

- **Dashboard-level**: Analyzes the entire dashboard, considering all visualizations together to provide holistic insights
- **Visualization-level**: Focuses on a single widget, providing detailed analysis specific to that visualization's data

---

## Server API

The Insights endpoint generates AI insights for dashboards or individual visualizations.

### Endpoint

```
POST /api/reveal/ai/insights
```

### Request Format

```typescript
{
  // Dashboard source (use ONE of these)
  dashboardJson?: string,      // Dashboard as JSON string (RDash format)
  dashboardId?: string,         // Dashboard ID (when using IRVDashboardProvider)

  // Optional parameters
  visualizationId?: string,     // Widget ID for visualization-level insights
  insightType?: string,         // "Summary" | "Analysis" | "Forecast" (default: "Summary")
  forecastPeriods?: number,     // Number of periods to forecast (default: 6, only for Forecast type)
  streamExplanation?: boolean,  // Stream the explanation as text chunks (default: false)
  llmClientName?: string        // Optional LLM provider override
}
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dashboardJson` | string | * | Dashboard as JSON string. Use this OR `dashboardId` |
| `dashboardId` | string | * | Dashboard identifier. Use this OR `dashboardJson` |
| `visualizationId` | string | No | Widget ID to analyze. If omitted, analyzes entire dashboard |
| `insightType` | string | No | Type of insight: `"Summary"`, `"Analysis"`, or `"Forecast"` (default: `"Summary"`) |
| `forecastPeriods` | number | No | Number of periods to forecast (default: 6). Only used when `insightType` is `"Forecast"` |
| `streamExplanation` | boolean | No | Whether to stream explanation as text chunks for real-time display (default: false) |
| `llmClientName` | string | No | Name of specific LLM provider to use for this request |

\* Either `dashboardJson` or `dashboardId` must be provided

### Response Format

The endpoint returns Server-Sent Events (SSE) with the following event types:

#### progress Event
Sent during insight generation to indicate current status.

```json
event: progress
data: {"message": "Analyzing dashboard data..."}
```

#### textchunk Event
Sent when `streamExplanation: true`. Contains fragments of the explanation text as it's generated.

```json
event: textchunk
data: {"content": "Sales revenue reached $2.4M in Q4 2024"}
```

#### complete Event
Sent when insight generation finishes successfully. Always contains the full explanation regardless of streaming.

```json
event: complete
data: {
  "message": "Insights generated successfully",
  "result": {
    "explanation": "Sales revenue reached $2.4M in Q4 2024, up 18% from Q3..."
  }
}
```

#### error Event
Sent if insight generation fails.

```json
event: error
data: {"error": "Error message"}
```

## Client API

The Reveal SDK AI Client provides a simple TypeScript API for requesting insights from your web application.

### Getting Insights

Use the `client.ai.insights.get()` method to request insights. The method supports both **await** and **streaming** patterns using the same API call.

### Basic Usage (Await Pattern)

Wait for the complete result before displaying:

```typescript
import { RevealSdkClient, InsightType } from '@revealbi/api';

const client = RevealSdkClient.getInstance();

// Get summary for entire dashboard
const result = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  insightType: InsightType.Summary
});

console.log(result.explanation);
// "Sales revenue reached $2.4M in Q4 2024..."
```

### Streaming Pattern

Stream the explanation text in real-time for a ChatGPT-like experience:

```typescript
const result = await client.ai.insights.get(
  {
    dashboardId: 'sales-dashboard',
    insightType: InsightType.Summary
  },
  {
    onProgress: (message) => {
      console.log('Status:', message);
    },
    onTextChunk: (text) => {
      // Display text as it arrives
      process.stdout.write(text);
    },
    onComplete: (message, result) => {
      console.log('\nComplete:', message);
    },
    onError: (error, details) => {
      console.error('Error:', error, details);
    }
  },
  {
    streamExplanation: true  // Enable streaming
  }
);
```

### Using Dashboard Objects

You can pass a dashboard object directly instead of a dashboard ID:

```typescript
// Using RVDashboard object from RevealView
const result = await client.ai.insights.get({
  dashboard: revealView.dashboard,  // RVDashboard object
  insightType: InsightType.Analysis
});
```

### Visualization-Level Insights

Analyze a specific widget by providing its ID:

```typescript
const result = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  visualizationId: 'sales-by-region-chart',  // Specific widget
  insightType: InsightType.Summary
});
```

### Forecast Insights

Generate forecasts with custom periods:

```typescript
const result = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  visualizationId: 'sales-trend',
  insightType: InsightType.Forecast,
  forecastPeriods: 12  // Forecast 12 periods ahead
});
```

### Request Parameters

```typescript
interface InsightRequest {
  // Dashboard source (use ONE of these)
  dashboard?: string | RVDashboard;  // Dashboard object or JSON string
  dashboardId?: string;               // Dashboard ID

  // Optional parameters
  visualizationId?: string;           // Widget ID for visualization-level insights
  insightType?: InsightType;          // Summary | Analysis | Forecast
  forecastPeriods?: number;           // Forecast periods (default: 6)
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dashboard` | `string \| RVDashboard` | * | Dashboard object from RevealView or JSON string |
| `dashboardId` | `string` | * | Dashboard identifier |
| `visualizationId` | `string` | No | Widget ID to analyze |
| `insightType` | `InsightType` | No | Type: `Summary`, `Analysis`, `Forecast` (default: `Summary`) |
| `forecastPeriods` | `number` | No | Periods to forecast (default: 6) |

\* Either `dashboard` or `dashboardId` must be provided

### Event Handlers

```typescript
interface InsightEventHandlers {
  onProgress?: (message: string) => void;
  onTextChunk?: (content: string) => void;
  onResult?: (result: unknown) => void;
  onError?: (error: string, details?: unknown) => void;
  onComplete?: (message: string, result?: InsightResult) => void;
}
```

| Handler | Description |
|---------|-------------|
| `onProgress` | Called with status messages during generation |
| `onTextChunk` | Called with text fragments when streaming is enabled |
| `onResult` | Called when intermediate results are available |
| `onError` | Called if an error occurs |
| `onComplete` | Called when generation finishes, includes full result |

### Options

```typescript
interface InsightOptions {
  signal?: AbortSignal;           // For request cancellation
  llmClientName?: string;         // Override LLM provider
  streamExplanation?: boolean;    // Enable streaming (default: false)
}
```

| Option | Type | Description |
|--------|------|-------------|
| `signal` | `AbortSignal` | AbortSignal for cancelling the request |
| `llmClientName` | `string` | Name of specific LLM provider to use |
| `streamExplanation` | `boolean` | Enable real-time streaming (default: false) |

### Result

```typescript
interface InsightResult {
  explanation: string;  // Complete AI-generated explanation
}
```

The `explanation` field contains the full insight text, whether you use await or streaming patterns.

---

## Common Patterns

### Context Menu Integration

Add insights to your dashboard's context menu:

```typescript
revealView.onMenuOpening = function (visualization, args) {
  // Dashboard-level insights
  if (args.menuLocation === $.ig.RVMenuLocation.Dashboard) {
    args.menuItems.push(new $.ig.RVMenuItem("Summary", null, async () => {
      const result = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        insightType: InsightType.Summary
      });
      displayInsight(result.explanation);
    }));
  }

  // Visualization-level insights
  if (args.menuLocation === $.ig.RVMenuLocation.Visualization) {
    args.menuItems.push(new $.ig.RVMenuItem("Analyze This", null, async () => {
      const result = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        visualizationId: visualization.id,
        insightType: InsightType.Analysis
      });
      displayInsight(result.explanation);
    }));
  }
};
```

### Streaming Display

Display streaming text with markdown rendering:

```typescript
let buffer = '';

const result = await client.ai.insights.get(
  {
    dashboardId: 'sales-dashboard',
    insightType: InsightType.Summary
  },
  {
    onTextChunk: (text) => {
      buffer += text;
      // Render markdown as text arrives
      document.getElementById('output').innerHTML = marked.parse(buffer);
    },
    onComplete: () => {
      console.log('Streaming complete');
    }
  },
  { streamExplanation: true }
);
```

### Error Handling

Handle errors gracefully:

```typescript
const result = await client.ai.insights.get(
  {
    dashboardId: 'sales-dashboard',
    insightType: InsightType.Summary
  },
  {
    onError: (error, details) => {
      console.error('Insight generation failed:', error);
      console.error('Details:', details);
      showErrorMessage(error);
    },
    onComplete: (message, result) => {
      if (result) {
        displayInsight(result.explanation);
      }
    }
  }
);
```
