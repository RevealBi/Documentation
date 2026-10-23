---
sidebar_label: Chat
---


# Chat

The `client.ai.chat.sendMessage()` method enables conversational analytics — users describe what they want to see or understand, and the AI responds with insights, explanations, or generates and modifies dashboards.

## Basic Usage

```typescript
import { RevealSdkClient } from '@revealbi/api';
import { RevealUtility } from 'reveal-sdk';

const client = RevealSdkClient.getInstance();

// Send a message and get the complete response
const response = await client.ai.chat.sendMessage({
  message: 'Show me sales trends for the last quarter',
  datasourceId: 'my-datasource',
});

console.log(response.explanation);
// "I've analyzed your sales data for Q4 2024..."

console.log(response.finishReason);
console.log(response.usage?.inputTokens, response.usage?.outputTokens);

if (response.dashboard) {
  // Load the generated dashboard
  const json = JSON.parse(response.dashboard);
  const dashboard = RevealUtility.createDashboardFromJsonObject(json);
  revealView.dashboard = dashboard;
}
```

## Managing Conversation

The AI maintains server-side conversation history, enabling contextual follow-up questions. Clear the history to start fresh:

```typescript
// Reset the conversation context
await client.ai.chat.resetContext();

console.log('Conversation history cleared');
```

Use this when:
- Starting a new topic
- Switching datasources
- The user explicitly requests to "start over"

## Dashboard Context

Provide an existing dashboard for editing or analysis:

```typescript
// Edit an existing dashboard
const response = await client.ai.chat.sendMessage({
  message: 'Add a date filter to this dashboard',
  datasourceId: 'my-datasource',
  dashboard: existingDashboardJson,  // Provide current dashboard JSON
});

if (response.dashboard) {
  // Load the modified dashboard
  loadDashboard(response.dashboard);
}
```

**Using RVDashboard Objects:**

```typescript
// From RevealView
const currentDashboard = revealView.dashboard;

const response = await client.ai.chat.sendMessage({
  message: 'Explain what this dashboard shows',
  datasourceId: 'my-datasource',
  dashboard: currentDashboard,  // Accepts RVDashboard object
});

console.log(response.explanation);
```

## Streaming

Add `stream: true` to any request to receive responses in real-time. See [Streaming Responses](./sdk-streaming.md) for consumption patterns and examples.

---

## Request Parameters

All parameters are passed in a single request object:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | `string` | Yes | User's natural language message or request |
| `datasourceId` | `string` | No | Datasource identifier for context |
| `dashboard` | `string \| RVDashboard` | No | Dashboard JSON or RVDashboard object for editing/analysis |
| `visualizationId` | `string` | No | Visualization ID for visualization-specific context |
| `intent` | `string` | No | Operation to run instead of letting the AI classify the message, such as `generation-edit-existing-report` or `dashboard-analysis`. See [Intent values](chat.md#intent-values) |
| `updateChatState` | `boolean` | No | Whether to update the chat state after this query |
| `signal` | `AbortSignal` | No | AbortSignal for cancelling the request |
| `stream` | `boolean` | No | Enable streaming mode (default: `false`) |

## Response Type

```typescript
interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
}

interface ChatResponse {
  explanation?: string;             // AI-generated explanation
  dashboard?: string;               // Generated/modified dashboard JSON
  intent?: string;                  // The operation that ran, e.g. "generation-edit-existing-report"
  finishReason?: string;            // Stop reason returned by the LLM
  usage?: TokenUsage;               // Provider token usage, when available
  error?: string;                   // Error message if request failed
}
```

The `explanation` field contains the AI's natural language response. The `dashboard` field is populated when dashboards are generated or modified. `intent` names the operation that ran (for example, whether the message edited the dashboard or built a new one); see [Response intent](chat.md#response-intent) for the values. It can be passed back as the next request's `intent`; for `widget-analysis` and `widget-adjustment-global-filters`, send the same `visualizationId` too, since the response doesn't include it. `finishReason` reports why generation stopped, and `usage` exposes provider token counts when available.
