---
sidebar_label: Request Configuration
sidebar_custom_props:
  status: preview
---

# Request Configuration

:::info Preview

Request configuration is a preview feature. It works as described below, but the option names and shapes may still change.

:::

`RevealSdkClient.initialize()` accepts options that control the HTTP requests the client sends to your AI server. Configure them only when your application needs authentication, additional request headers, or a time zone other than the browser's.

## Bearer-Token Authentication

Use `bearerToken` when the token is already available at startup. The client sends it as an `Authorization: Bearer <token>` header on every request.

```typescript
RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com',
  bearerToken: 'your-token'
});
```

To replace that token later, for example after a refresh, call `setBearerToken()` on the client instance:

```typescript
RevealSdkClient.getInstance().setBearerToken(newToken);
```

Use `getBearerToken` instead when the token must be resolved per request. The callback can be synchronous or asynchronous, and it is called before each request is sent, so your authentication provider can return or refresh the current token.

```typescript
RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com',
  getBearerToken: async () => {
    return await authService.getValidAccessToken();
  }
});
```

Use either the static token or the callback, not both.

## Custom Request Headers

Use `onRequest` when you need to add or modify headers other than the bearer token. The interceptor receives the outgoing request, can be asynchronous, and is called before each request is sent.

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

## Time Zone

The chat and insights requests carry a time zone, and the server reads the dashboard data in that zone. It matters for calculated fields that convert dates to the user's zone, such as `applytimezone([OrderDate], currenttimezone())`. Insights then describe the same values the user sees in the viewer.

By default the client sends the browser's zone, the same one the Reveal viewer uses. Set `timeZone` (an IANA name) when your application shows dashboards in a different zone:

```typescript
RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com',
  timeZone: 'Asia/Tokyo'
});
```

Requests without a time zone, for example from callers that use the HTTP endpoints directly, are read in UTC. The server also uses UTC, and logs a warning, when the zone isn't a known IANA name (for example a Windows id such as `"Pacific Standard Time"`).

## Streaming Requests

Bearer tokens and `onRequest` also apply to [streaming](/ai/sdk-streaming) requests. They are resolved once, when the Server-Sent Events (SSE) connection is opened, and not for each streamed event.

## Response and Error Interceptors

`initialize()` also accepts an `onResponse` interceptor, called with the raw `Response` of each completed request, and an `onError` interceptor, called with the error of each failed request. Both can be asynchronous, and both return the value the client continues with, so `onError` can enrich an error but cannot suppress it.

For handling AI errors in application code, see [Error Handling](/ai/sdk-error-handling).
