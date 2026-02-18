---
sidebar_label: チャット
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# AI チャット

AI チャットは、データ分析を会話に変換します。ダッシュボードを手動で構築したり、クエリを記述したりする代わりに、ユーザーは見たいものや理解したいものを簡単に説明するだけです。AI はリクエストを解釈し、データを処理し、インサイト、説明で応答するか、ダッシュボードを自動的に生成/変更します (現在のユーザー メッセージと会話履歴の両方に基づいて)。

### 主要機能

**自然言語によるダッシュボードの生成**
必要なものを説明してダッシュボードを作成します: 「第 4 四半期の地域別売上を表示して」または「収益別に製品カテゴリを比較するチャートを作成して」

**ダッシュボードの編集**
既存のダッシュボードを会話で変更します: 「日付範囲のフィルターを追加して」または「円チャートを棒チャートに変更して」

**データ分析**
データに関する質問をします: 「収益別のトップ 5 顧客は誰ですか?」または「顧客満足度スコアのトレンドを表示して」

**会話コンテキスト**
AI は会話履歴を維持し、追加の質問と改善を可能にします: 「それを月ごとに分類して」または「テクノロジー カテゴリのみにフィルターして」

---

## サーバー API

Chat API は、メッセージを送信し、会話セッションを管理するためのエンドポイントを提供します。シンプルなリクエスト/レスポンス ワークフロー用のプレーン JSON レスポンスと、リアルタイムの進行状況とテキスト更新用のストリーミング SSE レスポンスの 2 つのレスポンス モードをサポートします。

### エンドポイント

**メッセージの送信**
```
POST /api/reveal/ai/chat
```

**セッションのクリア**
```
DELETE /api/reveal/ai/chat
```

### リクエスト形式

```typescript
{
  // 必須
  datasourceId: string,          // コンテキスト用のデータ ソース識別子

  // メッセージ (1 つ必須)
  message?: string,               // 自然言語のメッセージ/リクエスト

  // オプションのコンテキスト
  dashboard?: string,             // 編集/分析用のダッシュボード JSON
  visualizationId?: string,       // 表示形式固有の操作用の表示形式 ID

  // オプションの構成
  clientName?: string,            // LLM プロバイダーのオーバーライド
  stream?: boolean                // JSON の代わりに SSE ストリームを返す (デフォルト: false)
}
```

#### リクエスト パラメーター

| パラメーター | タイプ | 必須 | 説明 |
|-----------|------|----------|-------------|
| `datasourceId` | string | はい | クエリするデータ ソースの識別子。 |
| `message` | string | 条件付き* | ユーザーの自然言語のメッセージまたはリクエスト。 |
| `dashboard` | string | いいえ | 編集または分析コンテキスト用のダッシュボード JSON (RDash 形式)。 |
| `visualizationId` | string | いいえ | 表示形式固有の操作用の表示形式識別子。 |
| `clientName` | string | いいえ | このリクエストに使用する特定の LLM プロバイダーの名前。 |
| `stream` | boolean | いいえ | `true` の場合、進行状況イベント、テキスト チャンク、および最終完了イベントを含む `text/event-stream` (SSE) レスポンスを返します。`false` (デフォルト) の場合、プレーン `application/json` レスポンスを返します。 |

\* `message` または `intent` のいずれかを指定する必要があります。

**パラメーターの詳細:**

- **`datasourceId`**: すべてのリクエストに必須。使用可能なデータ構造に関するコンテキストを提供します。
- **`dashboard`**: 既存のダッシュボードを編集する場合、またはダッシュボード コンテンツを分析する場合に指定します。

### レスポンス形式

#### 非ストリーミング (デフォルト)

`stream` が `false` または省略された場合、エンドポイントはプレーン JSON レスポンスを返します:

```json
{
  "explanation": "Based on your data, I've created a dashboard showing sales by region...",
  "dashboard": "{...rdash JSON...}"
}
```

エラーの場合、レスポンスには適切な HTTP ステータス コード (400 または 500) とエラー メッセージが含まれます:

```json
{
  "error": "Error message"
}
```

#### ストリーミング

`stream` が `true` の場合、エンドポイントは次のイベント タイプを持つ Server-Sent Events (SSE) を返します:

##### progress イベント
処理中に送信され、現在のステータスを示します。

```json
event: progress
data: {"message": "Creating a new dashboard"}
```

一般的な進行状況メッセージ:
- 「新しいダッシュボードを作成しています」
- 「現在のダッシュボードを分析しています」
- 「ウィジェットにフィルターを追加しています」
- 「表示形式を変更しています」

##### textchunk イベント
生成される説明テキストのフラグメントを含みます。

```json
event: textchunk
data: {"content": "Based on your data, I've created"}
```

テキスト チャンクは、自然な ChatGPT のようなストリーミングのため、約 8 単語のセグメントで 20ms の遅延で配信されます。

##### complete イベント
処理が正常に終了したときに送信されます。常に完全な結果が含まれます。

```json
event: complete
data: {
  "message": "Chat processed successfully",
  "result": {
    "explanation": "Based on your data, I've created a dashboard showing sales by region...",
    "dashboard": "{...rdash JSON...}"
  }
}
```

**結果の構造:**
- `explanation`: 実行された内容の自然言語による説明。
- `dashboard`: 生成または変更されたダッシュボード JSON (該当する場合)。

##### error イベント
処理が失敗した場合に送信されます。

```json
event: error
data: {"error": "Datasource not found"}
```

### 会話履歴

チャットは、ユーザーとデータ ソースごとにサーバー側の会話履歴を維持します。これにより、コンテキストに基づく追加の質問と反復的な改善が可能になります。

**履歴の仕組み:**

1. **ユーザーごとのセッション:**: 各ユーザーは、データ ソースごとに個別の会話セッションを取得します。
2. **自動コンテキスト:**: 以前の質問と回答は、新しいリクエストのコンテキストに自動的に含まれます。
3. **永続的な状態:**: 履歴は、明示的にクリアされるまで複数のリクエストにわたって保持されます。
4. **プロンプトのコンテキスト:**: 完全な会話履歴が LLM に提供されます:

   ```
   会話履歴:
   - ユーザー: 地域別の売上を表示して
   - エージェント: マップの表示形式を含むダッシュボードを作成しました…
   - ユーザー: 第 4 四半期 (Q4) のみに絞り込んで
   ```

**履歴の管理:**

- **履歴のクリア**: `DELETE /api/reveal/ai/chat` を送信してセッションをリセットします。

### サーバー側の実装

Chat エンドポイントは、ASP.NET Core アプリケーションで Reveal AI を構成すると自動的に登録されます:

```csharp title="Program.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

// Reveal SDK を追加
builder.Services.AddControllers().AddReveal(revealBuilder =>
{
    // データ ソース プロバイダーを構成
    revealBuilder.AddDataSourceProvider<DataSourceProvider>();
});

// Reveal AI を追加 - /api/reveal/ai/chat エンドポイントを自動的に登録
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["OpenAI:ApiKey"];
        options.ModelId = "gpt-4.1";
    });

var app = builder.Build();

app.MapControllers();
app.Run();
```

追加のコントローラーまたはルーティング構成は必要ありません。`AddRevealAI()` を呼び出すと、POST と DELETE の両方のエンドポイントがすぐに使用できます。

### メタデータの構成

チャットは、データ ソース構造を理解するためにメタデータ構成が必要です。`appsettings.json` でデータ ソースを構成します:

```json title="appsettings.json"
{
  "RevealAI": {
    "OpenAI": {
      "ApiKey": "sk-your-api-key-here"
    },
    "MetadataManager": {
      "Datasources": [
        {
          "Id": "SampleExcel",
          "Provider": "WebService"
        },
        {
          "Id": "SqlServerData",
          "Provider": "SqlServer"
        }
      ]
    }
  }
}
```

**MetadataManager 構成:**

| プロパティ | タイプ | 説明 |
|----------|------|-------------|
| `Datasources` | array | AI が使用可能なデータ ソース定義のリスト。 |
| `Datasources[].Id` | string | データ ソースの一意の識別子 (`datasourceId` パラメーターで使用)。 |
| `Datasources[].Provider` | string | プロバイダー タイプ: `WebService`、`SQLServer`、`PostgreSQL`、`MySQL` など。 |

**プロバイダー タイプ:**

一般的なプロバイダー値:
- `AmazonAthena`
- `MySQL`
- `Oracle`
- `OracleSID`
- `PostgreSQL`
- `SSAS`
- `SSASHTTP`
- `Snowflake`
- `SQLServer`
- `WebService`

AI は、このメタデータを使用して、使用可能なデータを理解し、適切なクエリまたは表示形式を生成します。

**セッションのクリアの例:**

```csharp
// クライアントは会話をクリアするために DELETE リクエストを実行
// DELETE /api/reveal/ai/chat
// Response: 204 No Content
```

---

## クライアント API

Reveal SDK AI クライアントは、Web アプリケーションでの会話型インタラクション用の TypeScript API を提供します。`client.ai.chat.sendMessage()` メソッドは、すべてのパラメーターに単一のリクエスト オブジェクトを使用し、非ストリーミングとストリーミングの両方のモードをサポートします。

### 非ストリーミング (デフォルト)

表示する前に完全な結果を待ちます。`Promise<ChatResponse>` を返します。

```typescript
import { RevealSdkClient } from '@revealbi/api';

const client = RevealSdkClient.getInstance();

// メッセージを送信して完全なレスポンスを取得
const response = await client.ai.chat.sendMessage({
  message: 'Show me sales trends for the last quarter',
  datasourceId: 'my-datasource',
});

console.log(response.explanation);
// "I've analyzed your sales data for Q4 2024..."

if (response.dashboard) {
  // 生成されたダッシュボードを読み込む
  loadDashboard(response.dashboard);
}
```

### ストリーミング

リクエストに `stream: true` を追加すると、イベントが到着するたびにイベントを生成する `AIStream` を取得します。ストリームは 3 つの消費パターンをサポートします。

#### パターン 1: for-await (フル コントロール)

```typescript
const stream = await client.ai.chat.sendMessage({
  message: 'Create a dashboard showing customer distribution by region',
  datasourceId: 'my-datasource',
  stream: true,
});

for await (const event of stream) {
  switch (event.type) {
    case 'progress': console.log('Status:', event.message); break;
    case 'text':     document.getElementById('chat-message').textContent += event.content; break;
    case 'error':    console.error('Error:', event.error); break;
  }
}
```

#### パターン 2: イベント リスナー (シンプルな UI 接続)

```typescript
const stream = await client.ai.chat.sendMessage({
  message: 'Create a dashboard showing customer distribution by region',
  datasourceId: 'my-datasource',
  stream: true,
});

stream.on('progress', (message) => console.log('Status:', message));
stream.on('text', (content) => {
  document.getElementById('chat-message').textContent += content;
});
stream.on('error', (error) => console.error('Error:', error));

const result = await stream.finalResponse();
console.log('Complete:', result.explanation);

if (result.dashboard) {
  loadDashboard(result.dashboard);
}
```

#### パターン 3: ストリームからの集約結果

```typescript
const stream = await client.ai.chat.sendMessage({
  message: 'Create a dashboard showing customer distribution by region',
  datasourceId: 'my-datasource',
  stream: true,
});

// 完了を待機し、ChatResponse を返す
const result = await stream.finalResponse();
console.log(result.explanation);

if (result.dashboard) {
  loadDashboard(result.dashboard);
}
```

### 会話の管理

会話履歴をクリアして新しく開始:

```typescript
// 会話コンテキストをリセット
await client.ai.chat.resetContext();

console.log('Conversation history cleared');
```

次の場合に使用:
- 新しいトピックを開始する場合
- データ ソースを切り替える場合
- ユーザーが明示的に「やり直し」をリクエストした場合

### ダッシュボード コンテキスト

編集または分析のために既存のダッシュボードを提供します:

```typescript
// 既存のダッシュボードを編集
const response = await client.ai.chat.sendMessage({
  message: 'Add a date filter to this dashboard',
  datasourceId: 'my-datasource',
  dashboard: existingDashboardJson,  // 現在のダッシュボード JSON を提供
});

if (response.dashboard) {
  // 変更されたダッシュボードを読み込む
  loadDashboard(response.dashboard);
}
```

**RVDashboard オブジェクトの使用:**

```typescript
// RevealView から
const currentDashboard = revealView.dashboard;

const response = await client.ai.chat.sendMessage({
  message: 'Explain what this dashboard shows',
  datasourceId: 'my-datasource',
  dashboard: currentDashboard,  // RVDashboard オブジェクトを受け入れる
});

console.log(response.explanation);
```

### リクエスト パラメーター

すべてのパラメーターは単一のリクエスト オブジェクトで渡されます:

```typescript
// 非ストリーミング リクエスト
interface ChatRequest {
  message: string;                    // ユーザーの自然言語入力 (必須)
  datasourceId?: string;              // データ ソース識別子
  dashboard?: string | RVDashboard;   // ダッシュボード JSON または RVDashboard オブジェクト
  visualizationId?: string;           // ウィジェット固有のコンテキスト用のウィジェット ID
  intent?: string;                    // フリーフォーム LLM クエリ用のインテント
  updateChatState?: boolean;          // チャット状態を更新するかどうか
  clientName?: string;                 // LLM プロバイダーのオーバーライド
  signal?: AbortSignal;               // リクエストのキャンセル用
  stream?: false;                      // 非ストリーミング (デフォルト)
}

// ストリーミング リクエスト
interface ChatStreamRequest {
  // ...上記と同じフィールド、さらに:
  stream: true;                        // ストリーミングを有効化
}
```

| パラメーター | タイプ | 必須 | 説明 |
|-----------|------|----------|-------------|
| `message` | `string` | はい | ユーザーの自然言語のメッセージまたはリクエスト。 |
| `datasourceId` | `string` | いいえ | コンテキスト用のデータ ソース識別子。 |
| `dashboard` | `string \| RVDashboard` | いいえ | 編集/分析用のダッシュボード JSON または RVDashboard オブジェクト。 |
| `visualizationId` | `string` | いいえ | ウィジェット固有のコンテキスト用のウィジェット ID。 |
| `intent` | `string` | いいえ | フリーフォーム LLM クエリ用のインテント。 |
| `updateChatState` | `boolean` | いいえ | このクエリ後にチャット状態を更新するかどうか。 |
| `clientName` | `string` | いいえ | 使用する特定の LLM プロバイダーの名前。 |
| `signal` | `AbortSignal` | いいえ | リクエストをキャンセルするための AbortSignal。 |
| `stream` | `boolean` | いいえ | ストリーミング モードを有効化 (デフォルト: `false`)。 |

### レスポンス タイプ

#### ChatResponse

```typescript
interface ChatResponse {
  explanation?: string;   // AI 生成の説明
  dashboard?: string;     // 生成/変更されたダッシュボード JSON
  error?: string;         // リクエストが失敗した場合のエラー メッセージ
}
```

レスポンスには、AI の自然言語レスポンスを含む `explanation` フィールドが含まれます。`dashboard` フィールドは、ダッシュボードが生成または変更されたときに設定されます。

#### AIStream (ストリーミング)

`stream: true` の場合、戻り値の型は `AIStream<ChatResponse>` で、以下を提供します:

| メソッド / パターン | 説明 |
|---------|-------------|
| `for await (const event of stream)` | イベントが到着するたびに反復処理 |
| `.on(event, handler)` | イベント固有のリスナーを登録 |
| `.finalResponse()` | 完全な `ChatResponse` で解決する Promise を返す |
| `.abort()` | ストリームをキャンセル |

#### ストリーム イベント

```typescript
type AIStreamEvent =
  | { type: 'progress'; message: string }
  | { type: 'text'; content: string }
  | { type: 'error'; error: string; details?: unknown };
```

| イベント タイプ | 説明 |
|------------|-------------|
| `progress` | 処理中のステータス メッセージ (例: 「新しいダッシュボードを作成しています」) |
| `text` | 生成される説明テキストのフラグメント |
| `error` | 処理が失敗した場合のエラー情報 |

---

## 一般的なパターン

### チャット インターフェイスの構築

メッセージ履歴とストリーミングを含む完全なチャット UI を作成:

```typescript
const messages: Array<{role: 'user' | 'assistant', content: string}> = [];

async function sendChatMessage(userInput: string) {
  // ユーザー メッセージを UI に追加
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
    // UI でストリーミング メッセージを更新
    updateStreamingMessage(currentMessage);
    scrollToBottom();
  });

  stream.on('error', (error) => {
    showError(error);
  });

  const result = await stream.finalResponse();

  // メッセージを確定
  messages.push({ role: 'assistant', content: currentMessage });
  renderMessages();

  if (result.dashboard) {
    loadDashboard(result.dashboard);
  }

  hideProgressIndicator();
}

// 会話をクリア
async function resetConversation() {
  await client.ai.chat.resetContext();
  messages.length = 0;
  renderMessages();
}
```

### エラー処理

非ストリーミングとストリーミングの両方のモードでエラーを適切に処理:

```typescript
// 非ストリーミング エラー処理
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

// ストリーミング エラー処理
const stream = await client.ai.chat.sendMessage({
  message: 'Show me sales trends',
  datasourceId: 'my-datasource',
  stream: true,
});

stream.on('text', (content) => appendToUI(content));
stream.on('error', (error, details) => {
  console.error('Chat error:', error);
  showErrorMessage(error);
});

const result = await stream.finalResponse();

if (result.dashboard) {
  loadDashboard(result.dashboard);
}
```

### リクエストのキャンセル

`AbortSignal` を使用して進行中のリクエストをキャンセル:

```typescript
const controller = new AbortController();

// 非ストリーミング
const promise = client.ai.chat.sendMessage({
  message: 'Analyze my data',
  datasourceId: 'my-datasource',
  signal: controller.signal,
});

// 5 秒後にキャンセル
setTimeout(() => controller.abort(), 5000);

// ストリーミング
const stream = await client.ai.chat.sendMessage({
  message: 'Analyze my data',
  datasourceId: 'my-datasource',
  stream: true,
  signal: controller.signal,
});

// またはストリームを直接中止
stream.abort();
```
