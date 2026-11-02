---
sidebar_label: エラーハンドリング
---


# エラーハンドリング

このトピックでは、Reveal SDK AI クライアントを使用する際のエラー処理方法について説明します。

## エラーハンドリング

### 非ストリーミング

リクエストを try/catch ブロックで囲みます。

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

チャットにも同じパターンが適用されます。

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

### ストリーミング

ストリームの `error` イベントをリッスンします。

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

`for-await` パターンでもエラーを処理できます。

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

## エラー コード {#error-codes}

サーバーからのエラーは `RevealAIError` としてスローされます。`message` に加えて、HTTP の `status`、サーバーが提供する場合は安定した `code`、クォータとレート制限のエラーでは `retryAfterSeconds` を持ちます。特定のエラーを処理するには、`code` を `AIErrorCodes` の定数と比較します。

| 定数 | `code` | HTTP ステータス | 原因 |
|---|---|---|---|
| `ProfileNotFound` | `ai.profile_not_found` | 400 | リクエストされた[プロファイル](providers-overview.md)が存在しません。 |
| `ProfileNotAllowed` | `ai.profile_not_allowed` | 403 | ユーザーはリクエストされたプロファイルを使用できません。[プロファイルの選択](profile-selection.md)を参照してください。 |
| `ConnectionInvalid` | `ai.connection_invalid` | 400 | ユーザー自身の接続を使用できません。[動的プロファイル](byok.md)を参照してください。 |
| `NotEntitled` | `ai.not_entitled` | 403 | ユーザーのプランにこの機能またはプロファイルが含まれていません。 |
| `QuotaExceeded` | `ai.quota_exceeded` | 429 | ユーザーの予算を使い切りました。 |
| `RateLimited` | `ai.rate_limited` | 429 | リクエストが多すぎます。 |
| `Denied` | `ai.denied` | 403 | その他の理由で呼び出しが拒否されました。 |

最後の 4 つは[クォータゲート](quota-gate.md)によるものです。

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

ストリーミングの場合、ストリームが開く前に発生したエラーは同じようにスローされます。ストリームが開いた後に発生したエラーは `error` イベントとして届き、その `code` と `retryAfterSeconds` は `for-await` パターンで取得できます。その後、`finalResponse()` は `status` が `0` の `RevealAIError` で reject されます。
