---
sidebar_label: ストリーミングレスポンス
---


# ストリーミングレスポンス

[インサイト](./sdk-insights.md) と [チャット](./sdk-chat.md) の両方の API はストリーミングモードをサポートしており、生成されたレスポンスをリアルタイムで配信します。これにより、ユーザーは完全なレスポンスを待つのではなく、テキストが徐々に表示される ChatGPT のような体験が得られます。

任意のリクエストに `stream: true` を追加することでストリーミングを有効にできます。ストリーミングが有効な場合、メソッドは直接のレスポンスの代わりに `AIStream` オブジェクトを返します。

## 利用パターン

`AIStream` はイベントを利用する 3 つの方法をサポートしています。ユースケースに合ったパターンを選択してください。

### パターン 1: for-await（フルコントロール）

すべてのイベントを反復処理して、各イベントタイプを最大限に制御します。

```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

for await (const event of stream) {
  switch (event.type) {
    case 'progress': console.log('Status:', event.message); break;
    case 'text':     document.getElementById('output').textContent += event.content; break;
    case 'error':    console.error('Error:', event.error); break;
  }
}
```

### パターン 2: イベントリスナー（シンプルな UI 連携）

特定のイベントタイプのハンドラーを登録します。

```typescript
const stream = await client.ai.chat.sendMessage({
  message: 'Show me sales by region',
  datasourceId: 'my-datasource',
  stream: true,
});

stream.on('progress', (message) => console.log('Status:', message));
stream.on('text', (content) => {
  document.getElementById('output').textContent += content;
});
stream.on('error', (error) => console.error('Error:', error));

const result = await stream.finalResponse();
console.log('Complete:', result.explanation);
```

### パターン 3: ストリームからの集約結果

通信上はストリーミングを使用しつつ、完全なレスポンスを待ちます。

```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

// Wait for completion, returns InsightResponse
const result = await stream.finalResponse();
console.log(result.explanation);
```

これは、個々のイベントを処理せずに、サーバー側のストリーミングのメリット（長時間実行リクエストのタイムアウト回避など）を活用したい場合に便利です。

---

## AIStream リファレンス

`stream: true` の場合、戻り値の型は `AIStream<T>` になります。ここで `T` はレスポンスの型（`InsightResponse` または `ChatResponse`）です。

| メソッド / パターン | 説明 |
|---------|-------------|
| `for await (const event of stream)` | イベントが到着するたびに反復処理する |
| `.on(event, handler)` | イベント固有のリスナーを登録する |
| `.finalResponse()` | 完全なレスポンスで解決される Promise を返す |
| `.abort()` | ストリームをキャンセルする |

## ストリームイベント

```typescript
type AIStreamEvent =
  | { type: 'progress'; message: string }
  | { type: 'text'; content: string }
  | { type: 'error'; error: string; details?: unknown };
```

| イベントタイプ | 説明 |
|------------|-------------|
| `progress` | 生成中のステータスメッセージ（例: "Analyzing dashboard data..."、"Creating a new dashboard"） |
| `text` | 生成されたレスポンスのテキストフラグメント |
| `error` | 生成が失敗した場合のエラー情報 |
