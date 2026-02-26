---
sidebar_label: Insights
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# AI Insights

AI Insights automatically analyze your dashboards and visualizations to generate natural language explanations, identify trends and patterns, and forecast future values. The Reveal SDK AI generates three types of insights to help users understand their data without requiring deep analytics expertise.

**Summary** - A concise overview highlighting key metrics, top performers, and overall trends.

> *"Sales revenue reached $2.4M in Q4 2024, up 18% from Q3. The Technology category led growth with $890K in sales, while the West region showed the strongest performance at $1.1M."*

**Analysis** - Detailed interpretation identifying patterns, anomalies, trends, and correlations in the data.

> *"Analysis reveals a strong seasonal pattern with peaks in Q4 driven by holiday shopping. The Technology category shows consistent month-over-month growth averaging 12%, while Office Supplies demonstrate more volatility. A notable spike in October coincides with the new product launch campaign."*

**Forecast** - Predictions of future values based on historical data trends. You can specify how many periods ahead to forecast.

> *"Based on historical trends, Q1 2025 sales are forecasted at $2.1M, with continued growth expected through mid-year. The model predicts Technology category sales will reach $950K by March 2025, representing 15% growth from the current period."*

Insights can be generated at two levels:

- **Dashboard-level**: Analyzes the entire dashboard, considering all visualizations together to provide holistic insights
- **Visualization-level**: Focuses on a single visualization, providing detailed analysis specific to that visualization's data

---

## Server API

The Insights endpoint generates AI insights for dashboards or individual visualizations. It supports two response modes: a plain JSON response for simple request/response workflows, and a streaming SSE response for real-time progress and text updates.

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
  visualizationId?: string,     // Visualization ID for visualization-level insights
  insightType?: string,         // "Summary" | "Analysis" | "Forecast" (default: "Summary")
  forecastPeriods?: number,     // Number of periods to forecast (default: 6, only for Forecast type)
  stream?: boolean,             // Return SSE stream instead of JSON (default: false)
  model?: string                  // Optional LLM model override
}
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dashboardJson` | string | * | Dashboard as JSON string. Use this OR `dashboardId` |
| `dashboardId` | string | * | Dashboard identifier. Use this OR `dashboardJson` |
| `visualizationId` | string | No | Visualization ID to analyze. If omitted, analyzes entire dashboard |
| `insightType` | string | No | Type of insight: `"Summary"`, `"Analysis"`, or `"Forecast"` (default: `"Summary"`) |
| `forecastPeriods` | number | No | Number of periods to forecast (default: 6). Only used when `insightType` is `"Forecast"` |
| `stream` | boolean | No | When `true`, returns a `text/event-stream` (SSE) response with progress events, text chunks, and a final complete event. When `false` (default), returns a plain `application/json` response. |
| `model` | string | No | Name of specific LLM model to use for this request |

\* Either `dashboardJson` or `dashboardId` must be provided

### Response Format

#### Non-Streaming (default)

When `stream` is `false` or omitted, the endpoint returns a plain JSON response:

```json
{
  "explanation": "Sales revenue reached $2.4M in Q4 2024, up 18% from Q3..."
}
```

On error, the response includes an error message with the appropriate HTTP status code (400 or 500):

```json
{
  "error": "Error message"
}
```

#### Streaming

When `stream` is `true`, the endpoint returns Server-Sent Events (SSE) with the following event types:

##### progress Event
Sent during insight generation to indicate current status.

```json
event: progress
data: {"message": "Analyzing dashboard data..."}
```

##### text Event
Contains fragments of the explanation text as it's generated.

```json
event: text
data: {"content": "Sales revenue reached $2.4M in Q4 2024"}
```

##### complete Event
Sent when insight generation finishes successfully. Always contains the full explanation.

```json
event: complete
data: {
  "message": "Insights generated successfully",
  "result": {
    "explanation": "Sales revenue reached $2.4M in Q4 2024, up 18% from Q3..."
  }
}
```

##### error Event
Sent if insight generation fails.

```json
event: error
data: {"error": "Error message"}
```

## Client API

The Reveal SDK AI Client provides a TypeScript API for requesting insights from your web application. The `client.ai.insights.get()` method uses a single request object for all parameters and supports both non-streaming and streaming modes.

### Non-Streaming (Default)

Wait for the complete result before displaying. Returns `Promise<InsightResponse>`.

```typescript
import { RevealSdkClient } from '@revealbi/api';

const client = RevealSdkClient.getInstance();

// Get summary for entire dashboard
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
});

console.log(insight.explanation);
// "Sales revenue reached $2.4M in Q4 2024..."
```

### Streaming

Add `stream: true` to the request to get an `AIStream` that yields events as they arrive. The stream supports three consumption patterns.

#### Pattern 1: for-await (Full Control)

```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

for await (const event of stream) {
  switch (event.type) {
    case 'progress': console.log('Status:', event.message); break;
    case 'text':     document.getElementById('output').textContent += event.content; break;
    case 'error':    console.error('Error:', event.error); break;
  }
}
```

#### Pattern 2: Event Listeners (Simple UI Wiring)

```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

stream.on('progress', (message) => console.log('Status:', message));
stream.on('text', (content) => document.getElementById('output').textContent += content);
stream.on('error', (error) => console.error('Error:', error));

const result = await stream.finalResponse();
console.log('Complete:', result.explanation);
```

#### Pattern 3: Aggregated Result from Stream

```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

// Wait for completion, returns InsightResponse
const result = await stream.finalResponse();
console.log(result.explanation);
```

### Using Dashboard Objects

You can pass a dashboard object directly instead of a dashboard ID:

```typescript
// Using RVDashboard object from RevealView
const insight = await client.ai.insights.get({
  dashboard: revealView.dashboard,  // RVDashboard object
  type: 'analysis',
});
```

### Visualization-Level Insights

Analyze a specific visualization by providing its ID:

```typescript
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  visualizationId: 'sales-by-region-chart',  // Specific visualization
  type: 'summary',
});
```

### Forecast Insights

Generate forecasts with custom periods:

```typescript
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  visualizationId: 'sales-trend',
  type: 'forecast',
  forecastPeriods: 12,  // Forecast 12 periods ahead
});
```

### Request Parameters

All parameters are passed in a single request object:

```typescript
// Non-streaming request
interface InsightRequest {
  dashboard?: string | RVDashboard;  // Dashboard object or JSON string
  dashboardId?: string;               // Dashboard ID
  visualizationId?: string;           // Visualization ID for visualization-level insights
  type: InsightType;                   // 'summary' | 'analysis' | 'forecast'
  forecastPeriods?: number;           // Forecast periods (default: 6)
  model?: string;                      // Override LLM model
  signal?: AbortSignal;               // For request cancellation
  stream?: false;                      // Non-streaming (default)
}

// Streaming request
interface InsightStreamRequest {
  // ...same fields as above, plus:
  stream: true;                        // Enable streaming
}
```

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

### Response Types

#### InsightResponse

```typescript
interface InsightResponse {
  explanation: string;  // Complete AI-generated explanation
}
```

The `explanation` field contains the full insight text, whether you use non-streaming or streaming mode.

#### AIStream (Streaming)

When `stream: true`, the return type is `AIStream<InsightResponse>`, which provides:

| Method / Pattern | Description |
|---------|-------------|
| `for await (const event of stream)` | Iterate over events as they arrive |
| `.on(event, handler)` | Register event-specific listeners |
| `.finalResponse()` | Returns a promise that resolves with the complete `InsightResponse` |
| `.abort()` | Cancel the stream |

#### Stream Events

```typescript
type AIStreamEvent =
  | { type: 'progress'; message: string }
  | { type: 'text'; content: string }
  | { type: 'error'; error: string; details?: unknown };
```

| Event Type | Description |
|------------|-------------|
| `progress` | Status messages during generation (e.g., "Analyzing dashboard data...") |
| `text` | Text fragments of the explanation as they are generated |
| `error` | Error information if generation fails |

---

## Common Patterns

### Context Menu Integration

Add insights to your dashboard's context menu:

```typescript
revealView.onMenuOpening = function (visualization, args) {
  // Dashboard-level insights
  if (args.menuLocation === $.ig.RVMenuLocation.Dashboard) {
    args.menuItems.push(new $.ig.RVMenuItem("Summary", null, async () => {
      const insight = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        type: 'summary',
      });
      displayInsight(insight.explanation);
    }));
  }

  // Visualization-level insights
  if (args.menuLocation === $.ig.RVMenuLocation.Visualization) {
    args.menuItems.push(new $.ig.RVMenuItem("Analyze This", null, async () => {
      const insight = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        visualizationId: visualization.id,
        type: 'analysis',
      });
      displayInsight(insight.explanation);
    }));
  }
};
```

### Streaming Display

Display streaming text with markdown rendering:

```typescript
let buffer = '';

const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

stream.on('text', (content) => {
  buffer += content;
  // Render markdown as text arrives
  document.getElementById('output').innerHTML = marked.parse(buffer);
});

const result = await stream.finalResponse();
console.log('Streaming complete:', result.explanation);
```

### Error Handling

Handle errors gracefully in both non-streaming and streaming modes:

```typescript
// Non-streaming error handling
try {
  const insight = await client.ai.insights.get({
    dashboardId: 'sales-dashboard',
    type: 'summary',
  });
  displayInsight(insight.explanation);
} catch (error) {
  console.error('Insight generation failed:', error);
  showErrorMessage(error.message);
}

// Streaming error handling
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

stream.on('text', (content) => appendToUI(content));
stream.on('error', (error, details) => {
  console.error('Insight generation failed:', error);
  showErrorMessage(error);
});

await stream.finalResponse();
```

### Request Cancellation

Cancel an in-progress request using `AbortSignal`:

```typescript
const controller = new AbortController();

// Non-streaming
const promise = client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  signal: controller.signal,
});

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);

// Streaming
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
  signal: controller.signal,
});

// Or abort the stream directly
stream.abort();
```
