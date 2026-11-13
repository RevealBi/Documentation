---
sidebar_label: Request Configuration
sidebar_custom_props:
  status: preview
---

# Request Configuration

:::info Preview

Request configuration is a preview feature. It works as described below, but the option names and shapes may still change.

:::

`RevealSdkClient.initialize()` accepts options that control the HTTP requests the client sends to the AI server. Configure them only when the application needs authentication, additional request headers, or a time zone other than the browser's.

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

Use `getBearerToken` instead when the token must be resolved per request. The callback can be synchronous or asynchronous, and it is called before each request is sent, so the authentication provider can return or refresh the current token.

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

Use `onRequest` when the application needs to add or modify headers other than the bearer token. The interceptor receives the outgoing request, can be asynchronous, and is called before each request is sent.

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

The chat and insights requests carry a time zone, and the server passes it on when the AI requests dashboard data. It applies to zone-aware calculated fields, such as `applytimezone([OrderDate], currenttimezone())`, to date fields set to convert to the user's zone, and to relative date filters; other date values aren't shifted. Chat and insights then describe the same values the user sees in the viewer, as long as both use the same zone. The AI also takes today's date from this zone, so a request for "this month" or "yesterday" means the user's month or day.

By default the client sends the browser's zone, which is also the Reveal viewer's default. Set `timeZone` (an IANA name) when the application shows dashboards in a different zone. The client doesn't read `RevealSdkSettings.timeZone`, so when the application overrides the viewer's zone, it should set the same zone here:

```typescript
RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com',
  timeZone: 'Asia/Tokyo'
});
```

Requests without a time zone, for example from callers that use the HTTP endpoints directly, are read in UTC. The server also uses UTC, and logs a warning, when the zone isn't an IANA name the server recognizes (for example a Windows id such as `"Pacific Standard Time"`).

## Streaming Requests

Bearer tokens and `onRequest` also apply to [streaming](/ai/sdk-streaming) requests. They are resolved once, when the Server-Sent Events (SSE) connection is opened, and not for each streamed event.

## Response and Error Interceptors

`initialize()` also accepts an `onResponse` interceptor, called with the raw `Response` of each completed request, and an `onError` interceptor, called with the error of each failed request. Both can be asynchronous, and both return the value the client continues with, so `onError` can enrich an error but cannot suppress it.

For handling AI errors in application code, see [Error Handling](/ai/sdk-error-handling).
