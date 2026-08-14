---
sidebar_label: Overview
---


# Using the SDK

The Reveal SDK AI Client is a TypeScript/JavaScript library that provides AI capabilities for your web applications. It exposes two main APIs — **Insights** for generating data analysis, and **Chat** for conversational analytics — both accessible through a single client instance.

## Initialization

Before using any AI features, initialize the client with your server URL:

```typescript
import { RevealSdkClient } from '@revealbi/api';

RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com'
});
```

For UMD/CDN usage:

```typescript
rv.RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com'
});
```

:::info

The client SDK requires the [AI Server SDK](/ai/install-server-sdk) to be installed and running. All AI requests are processed server-side by the configured LLM provider.

:::

## Request Configuration

Configure requests only when your application needs authentication or additional request headers.

### Bearer-Token Authentication

Use `getBearerToken` when your AI server requires bearer-token authentication. The callback supports synchronous or asynchronous token providers. It is called before each HTTP request, so your authentication provider can return or refresh the current token before the request is sent. The client adds the returned value as an `Authorization: Bearer <token>` header.

```typescript
RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com',
  getBearerToken: async () => {
    return await authService.getValidAccessToken();
  }
});
```

`getBearerToken` is also applied to streaming requests.

### Custom Request Headers

Use `onRequest` when you need to add or modify headers other than the bearer token. The interceptor can be asynchronous and is called before each HTTP request.

```typescript
RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com',
  onRequest: async (request) => ({
    ...request,
    headers: {
      ...request.headers,
      'X-Tenant-Id': await tenantService.getCurrentTenantId()
    }
  })
});
```

Use `getBearerToken` for standard bearer-token authentication. Use `onRequest` for other dynamic headers, or when you need to customize the outgoing request.

## Getting the Client Instance

Once initialized, get the shared client instance anywhere in your application:

```typescript
const client = RevealSdkClient.getInstance();
```

## API Surface

The client exposes AI features through the `client.ai` namespace:

### Insights

Generate summaries, analyses, and forecasts from your dashboards and visualizations:

```typescript
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
});

console.log(insight.explanation);
```

Learn more in [Insights](./sdk-insights.md).

### Chat

Build conversational interfaces where users interact with data using natural language:

```typescript
const response = await client.ai.chat.sendMessage({
  message: 'Show me sales by region for Q4',
  datasourceId: 'my-datasource',
});

console.log(response.explanation);
```

Learn more in [Chat](./sdk-chat.md).

## Streaming vs Non-Streaming

Both APIs support two response modes:

- **Non-streaming** (default): Wait for the complete response. Simple and straightforward.
- **Streaming**: Receive text in real-time as it's generated, providing a ChatGPT-like experience.

Add `stream: true` to any request to enable streaming:

```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

stream.on('text', (content) => {
  console.log(content); // Text arrives in chunks
});

const result = await stream.finalResponse();
```

When bearer-token authentication is configured with `getBearerToken`, the token provider is called when the Server-Sent Events (SSE) HTTP connection is opened, not for each streamed event.

Learn more in [Streaming Responses](./sdk-streaming.md).
