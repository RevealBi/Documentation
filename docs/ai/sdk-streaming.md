---
sidebar_label: Streaming Responses
---


# Streaming Responses

Both the [Insights](./sdk-insights.md) and [Chat](./sdk-chat.md) APIs support streaming mode, which delivers responses in real-time as they are generated. This provides a ChatGPT-like experience where users see text appear progressively instead of waiting for the complete response.

Enable streaming by adding `stream: true` to any request. When streaming is enabled, the method returns an `AIStream` object instead of a direct response.

## Consumption Patterns

The `AIStream` supports three ways to consume events. Choose the pattern that fits your use case.

### Pattern 1: for-await (Full Control)

Iterate over every event for maximum control over each event type:

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

### Pattern 2: Event Listeners (Simple UI Wiring)

Register handlers for specific event types:

```typescript
const stream = await client.ai.chat.sendMessage({
  message: 'Show me sales by region',
  datasourceId: 'my-datasource',
  stream: true,
});

stream.on('progress', (message) => console.log('Status:', message));
stream.on('text', (content) => {
  document.getElementById('output').textContent += content;
});
stream.on('error', (error) => console.error('Error:', error));

const result = await stream.finalResponse();
console.log('Complete:', result.explanation);
```

### Pattern 3: Aggregated Result from Stream

Use streaming on the wire but wait for the full response:

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

This is useful when you want the server-side benefits of streaming (e.g., timeout avoidance for long-running requests) without handling individual events.

---

## AIStream Reference

When `stream: true`, the return type is `AIStream<T>` where `T` is the response type (`InsightResponse` or `ChatResponse`).

| Method / Pattern | Description |
|---------|-------------|
| `for await (const event of stream)` | Iterate over events as they arrive |
| `.on(event, handler)` | Register event-specific listeners |
| `.finalResponse()` | Returns a promise that resolves with the complete response |
| `.abort()` | Cancel the stream |

## Stream Events

```typescript
type AIStreamEvent =
  | { type: 'progress'; message: string }
  | { type: 'text'; content: string }
  | { type: 'error'; error: string; details?: unknown };
```

| Event Type | Description |
|------------|-------------|
| `progress` | Status messages during generation (e.g., "Analyzing dashboard data...", "Creating a new dashboard") |
| `text` | Text fragments of the response as they are generated |
| `error` | Error information if generation fails |
