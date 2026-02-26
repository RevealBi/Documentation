---
sidebar_label: チャットインターフェースの構築
---


# チャットインターフェースの構築

このガイドでは、Reveal SDK AI Chat API を使用して、メッセージ履歴とストリーミングレスポンスを備えた完全なチャット UI を構築する方法を説明します。

## 完全なチャット実装

```typescript
const client = RevealSdkClient.getInstance();
const messages: Array<{role: 'user' | 'assistant', content: string}> = [];

async function sendChatMessage(userInput: string) {
  // Add user message to UI
  messages.push({ role: 'user', content: userInput });
  renderMessages();

  let currentMessage = '';

  const stream = await client.ai.chat.sendMessage({
    message: userInput,
    datasourceId: 'my-datasource',
    stream: true,
  });

  stream.on('progress', (message) => {
    showProgressIndicator(message);
  });

  stream.on('text', (content) => {
    currentMessage += content;
    // Update streaming message in UI
    updateStreamingMessage(currentMessage);
    scrollToBottom();
  });

  stream.on('error', (error) => {
    showError(error);
  });

  const result = await stream.finalResponse();

  // Finalize message
  messages.push({ role: 'assistant', content: currentMessage });
  renderMessages();

  if (result.dashboard) {
    loadDashboard(result.dashboard);
  }

  hideProgressIndicator();
}

// Clear conversation
async function resetConversation() {
  await client.ai.chat.resetContext();
  messages.length = 0;
  renderMessages();
}
```

## 主要コンセプト

### メッセージ履歴

`messages` 配列はローカルの UI 状態を追跡します。サーバーは独自の会話履歴を自動的に保持するため、各リクエストで以前のメッセージを送信する必要はありません。

### ダッシュボードの処理

チャットレスポンスには、生成または修正されたダッシュボード JSON を含む `dashboard` フィールドが含まれる場合があります。各レスポンスの後にこのフィールドを確認し、RevealView に読み込みます：

```typescript
const result = await stream.finalResponse();

if (result.dashboard) {
  // Load the new or modified dashboard
  revealView.dashboard = await RVDashboard.loadFromJson(result.dashboard);
}
```

### 既存ダッシュボードの編集

チャットを通じてユーザーが既存のダッシュボードを編集できるようにするには、リクエストにダッシュボードを含めます：

```typescript
const stream = await client.ai.chat.sendMessage({
  message: 'Add a date filter to this dashboard',
  datasourceId: 'my-datasource',
  dashboard: revealView.dashboard,  // Pass the current dashboard
  stream: true,
});
```

### コンテキストのリセット

新しいトピックを開始する場合やデータソースを切り替える場合は、`resetContext()` を呼び出します。これにより、サーバー側の会話履歴がクリアされ、以前のメッセージが新しいレスポンスに影響を与えなくなります。
