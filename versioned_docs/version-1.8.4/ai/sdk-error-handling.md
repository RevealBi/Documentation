---
sidebar_label: Error Handling
---


# Error Handling

This topic covers how to handle errors when using the Reveal SDK AI Client.

## Error Handling

### Non-Streaming

Wrap your request in a try/catch block:

```typescript
try {
  const insight = await client.ai.insights.get({
    dashboardId: 'sales-dashboard',
    type: 'summary',
  });
  displayInsight(insight.explanation);
} catch (error) {
  console.error('Request failed:', error);
  showErrorMessage(error.message);
}
```

The same pattern applies to chat:

```typescript
try {
  const response = await client.ai.chat.sendMessage({
    message: 'Show me sales trends',
    datasourceId: 'my-datasource',
  });
  displayResponse(response.explanation);

  if (response.dashboard) {
    loadDashboard(response.dashboard);
  }
} catch (error) {
  console.error('Chat request failed:', error);
  showErrorMessage(error.message);
}
```

### Streaming

Listen for `error` events on the stream:

```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

stream.on('text', (content) => appendToUI(content));
stream.on('error', (error, details) => {
  console.error('Stream error:', error);
  showErrorMessage(error);
});

await stream.finalResponse();
```

You can also handle errors in the `for-await` pattern:

```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

for await (const event of stream) {
  switch (event.type) {
    case 'text':  appendToUI(event.content); break;
    case 'error': showErrorMessage(event.error); break;
  }
}
```
