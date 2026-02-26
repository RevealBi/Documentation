---
sidebar_label: Insights Endpoint
---


# Insights Endpoint

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

## Endpoint

```
POST /api/reveal/ai/insights
```

## Request Format

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

### Request Parameters

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

## Response Format

### Non-Streaming (default)

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

### Streaming

When `stream` is `true`, the endpoint returns Server-Sent Events (SSE) with the following event types:

#### progress Event
Sent during insight generation to indicate current status.

```json
event: progress
data: {"message": "Analyzing dashboard data..."}
```

#### text Event
Contains fragments of the explanation text as it's generated.

```json
event: text
data: {"content": "Sales revenue reached $2.4M in Q4 2024"}
```

#### complete Event
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

#### error Event
Sent if insight generation fails.

```json
event: error
data: {"error": "Error message"}
```
