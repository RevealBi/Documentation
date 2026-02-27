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
