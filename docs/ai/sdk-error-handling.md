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

## Error Codes

Errors from the server are thrown as a `RevealAIError`. Besides `message`, it carries the HTTP `status`, a stable `code` when the server supplies one, and `retryAfterSeconds` for quota and rate-limit errors. Compare `code` with the `AIErrorCodes` constants to handle specific failures:

| Constant | `code` | HTTP status | Cause |
|---|---|---|---|
| `ProfileNotFound` | `ai.profile_not_found` | 400 | The requested [profile](providers-overview.md#profiles) doesn't exist. |
| `ProfileNotAllowed` | `ai.profile_not_allowed` | 403 | The end user may not use the requested profile. See [Profile Selection](profile-selection.md). |
| `ConnectionInvalid` | `ai.connection_invalid` | 400 | The end user's own connection can't be used. See [Dynamic Profiles](byok.md). |
| `NotEntitled` | `ai.not_entitled` | 403 | The end user's plan doesn't include this feature or profile. |
| `QuotaExceeded` | `ai.quota_exceeded` | 429 | The end user's budget is exhausted. |
| `RateLimited` | `ai.rate_limited` | 429 | Too many requests. |
| `Denied` | `ai.denied` | 403 | The call was denied for another reason. |

The last four come from the [quota gate](quota-gate.md).

```typescript
import { RevealAIError, AIErrorCodes } from '@revealbi/api';

try {
  const response = await client.ai.chat.sendMessage({
    message: 'Show me sales trends',
    datasourceId: 'my-datasource',
  });
  displayResponse(response.explanation);
} catch (error) {
  if (error instanceof RevealAIError) {
    switch (error.code) {
      case AIErrorCodes.QuotaExceeded:
      case AIErrorCodes.RateLimited:
        showLimitReached(error.message, error.retryAfterSeconds);
        break;
      case AIErrorCodes.NotEntitled:
      case AIErrorCodes.ProfileNotAllowed:
        showUpgradePrompt(error.message);
        break;
      case AIErrorCodes.ConnectionInvalid:
        showConnectionSettings();
        break;
      default:
        showErrorMessage(error.message);
    }
  }
}
```

When streaming, an error that occurs before the stream opens is thrown the same way. An error after the stream has opened arrives as an `error` event, whose `code` and `retryAfterSeconds` are available in the `for-await` pattern; `finalResponse()` then rejects with a `RevealAIError` whose `status` is `0`.
