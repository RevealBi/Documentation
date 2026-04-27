---
sidebar_label: チャット
---


# チャット

`client.ai.chat.sendMessage()` メソッドは、会話型アナリティクスを実現します。ユーザーが見たいものや理解したいことを自然言語で記述すると、AI がインサイト、説明、またはダッシュボードの生成・変更で応答します。

## 基本的な使い方

```typescript
import { RevealSdkClient } from '@revealbi/api';

const client = RevealSdkClient.getInstance();

// Send a message and get the complete response
const response = await client.ai.chat.sendMessage({
  message: 'Show me sales trends for the last quarter',
  datasourceId: 'my-datasource',
});

console.log(response.explanation);
// "I've analyzed your sales data for Q4 2024..."

if (response.dashboard) {
  // Load the generated dashboard
  loadDashboard(response.dashboard);
}
```

## 会話の管理

AI はサーバー側で会話履歴を保持しており、文脈に沿ったフォローアップの質問が可能です。履歴をクリアして最初からやり直すことができます。

```typescript
// Reset the conversation context
await client.ai.chat.resetContext();

console.log('Conversation history cleared');
```

以下の場合に使用します:
- 新しいトピックを開始するとき
- データソースを切り替えるとき
- ユーザーが明示的に「最初からやり直す」ことをリクエストしたとき

## ダッシュボードコンテキスト

編集や分析のために既存のダッシュボードを提供します。

```typescript
// Edit an existing dashboard
const response = await client.ai.chat.sendMessage({
  message: 'Add a date filter to this dashboard',
  datasourceId: 'my-datasource',
  dashboard: existingDashboardJson,  // Provide current dashboard JSON
});

if (response.dashboard) {
  // Load the modified dashboard
  loadDashboard(response.dashboard);
}
```

**RVDashboard オブジェクトの使用:**

```typescript
// From RevealView
const currentDashboard = revealView.dashboard;

const response = await client.ai.chat.sendMessage({
  message: 'Explain what this dashboard shows',
  datasourceId: 'my-datasource',
  dashboard: currentDashboard,  // Accepts RVDashboard object
});

console.log(response.explanation);
```

## ストリーミング

任意のリクエストに `stream: true` を追加すると、レスポンスをリアルタイムで受信できます。利用パターンと例については、[ストリーミングレスポンス](./sdk-streaming.md) を参照してください。

---

## リクエストパラメーター

すべてのパラメーターは単一のリクエストオブジェクトで渡します。

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|----------|-------------|
| `message` | `string` | はい | ユーザーの自然言語メッセージまたはリクエスト |
| `datasourceId` | `string` | いいえ | コンテキスト用のデータソース識別子 |
| `dashboard` | `string \| RVDashboard` | いいえ | 編集・分析用のダッシュボード JSON または RVDashboard オブジェクト |
| `visualizationId` | `string` | いいえ | ビジュアライゼーション固有のコンテキスト用のビジュアライゼーション ID |
| `intent` | `string` | いいえ | 自由形式の LLM クエリ用のインテント |
| `updateChatState` | `boolean` | いいえ | このクエリの後にチャットの状態を更新するかどうか |
| `model` | `string` | いいえ | 使用する特定の LLM モデルの名前 |
| `signal` | `AbortSignal` | いいえ | リクエストをキャンセルするための AbortSignal |
| `stream` | `boolean` | いいえ | ストリーミングモードを有効にする（デフォルト: `false`） |

## レスポンスの型

```typescript
interface ChatResponse {
  explanation?: string;   // AI-generated explanation
  dashboard?: string;     // Generated/modified dashboard JSON
  error?: string;         // Error message if request failed
}
```

`explanation` フィールドには AI の自然言語レスポンスが含まれます。`dashboard` フィールドはダッシュボードが生成または変更された場合に値が設定されます。
