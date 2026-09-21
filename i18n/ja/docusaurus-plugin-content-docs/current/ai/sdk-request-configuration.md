---
sidebar_label: リクエスト構成
sidebar_custom_props:
  status: preview
---

# リクエスト構成

:::info プレビュー

リクエスト構成はプレビュー機能です。以下で説明するとおりに動作しますが、オプションの名前や形式は今後変更される可能性があります。

:::

`RevealSdkClient.initialize()` では、クライアントが AI サーバーに送信する HTTP リクエストを制御するオプションを指定できます。これらは、アプリケーションで認証や追加のリクエストヘッダーが必要な場合にのみ構成してください。

## ベアラートークン認証

トークンが起動時にすでに利用可能な場合は `bearerToken` を使用します。クライアントは、すべてのリクエストで `Authorization: Bearer <token>` ヘッダーとしてトークンを送信します。

```typescript
RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com',
  bearerToken: 'your-token'
});
```

トークンの更新後など、後からトークンを置き換えるには、クライアントインスタンスで `setBearerToken()` を呼び出します:

```typescript
RevealSdkClient.getInstance().setBearerToken(newToken);
```

リクエストごとにトークンを解決する必要がある場合は、代わりに `getBearerToken` を使用します。このコールバックは同期・非同期のどちらでも指定でき、各リクエストの送信前に呼び出されるため、認証プロバイダーが現在のトークンを返すか、更新することができます。

```typescript
RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com',
  getBearerToken: async () => {
    return await authService.getValidAccessToken();
  }
});
```

静的なトークンとコールバックは、どちらか一方のみを使用してください。

## カスタムリクエストヘッダー

ベアラートークン以外のヘッダーを追加または変更する必要がある場合は、`onRequest` を使用します。このインターセプターは送信されるリクエストを受け取り、非同期にすることができ、各リクエストの送信前に呼び出されます。

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

## ストリーミングリクエスト

ベアラートークンと `onRequest` は[ストリーミング](/ai/sdk-streaming)リクエストにも適用されます。これらは Server-Sent Events (SSE) 接続が開かれるときに一度だけ解決され、ストリーミングされるイベントごとには解決されません。

## レスポンスとエラーのインターセプター

`initialize()` では、完了した各リクエストの生の `Response` を受け取る `onResponse` インターセプターと、失敗した各リクエストのエラーを受け取る `onError` インターセプターも指定できます。どちらも非同期にすることができ、いずれもクライアントが処理を継続する際に使用する値を返します。そのため、`onError` はエラーに情報を追加できますが、エラーを抑制することはできません。

アプリケーションコードでの AI エラーの処理については、[エラーハンドリング](/ai/sdk-error-handling)をご覧ください。
