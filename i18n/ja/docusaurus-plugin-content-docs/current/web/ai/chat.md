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

Chat API は、メッセージを送信し、会話セッションを管理するためのエンドポイントを提供します。

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
  question?: string,              // 自然言語の質問/リクエスト

  // オプションのコンテキスト
  dashboard?: string,             // 編集/分析用のダッシュボード JSON
  widgetId?: string,              // ウィジェット固有の操作用のウィジェット ID

  // オプションの構成
  clientName?: string,            // LLM プロバイダーのオーバーライド
  streamExplanation?: boolean     // レスポンス テキスト チャンクをストリーミング (デフォルト: false)
}
```

#### リクエスト パラメーター

| パラメーター | タイプ | 必須 | 説明 |
|-----------|------|----------|-------------|
| `datasourceId` | string | はい | クエリするデータ ソースの識別子。 |
| `question` | string | 条件付き* | ユーザーの自然言語の質問またはリクエスト。 |
| `dashboard` | string | いいえ | 編集または分析コンテキスト用のダッシュボード JSON (RDash 形式)。 |
| `widgetId` | string | いいえ | ウィジェット固有の操作用のウィジェット識別子。 |
| `clientName` | string | いいえ | このリクエストに使用する特定の LLM プロバイダーの名前。 |
| `streamExplanation` | boolean | いいえ | 説明テキストのリアルタイム ストリーミングを有効にするかどうか (デフォルト: false)。 |

\* `question` または `intent` のいずれかを指定する必要があります。

**パラメーターの詳細:**

- **`datasourceId`**: すべてのリクエストに必須。使用可能なデータ構造に関するコンテキストを提供します。
- **`dashboard`**: 既存のダッシュボードを編集する場合、またはダッシュボード コンテンツを分析する場合に指定します。

### レスポンス形式

エンドポイントは、次のイベント タイプを持つ Server-Sent Events (SSE) を返します:

#### progress イベント
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

#### textchunk イベント
`streamExplanation: true` の場合に送信されます。生成される説明テキストのフラグメントを含みます。

```json
event: textchunk
data: {"content": "Based on your data, I've created"}
```

テキスト チャンクは、自然な ChatGPT のようなストリーミングのため、約 8 単語のセグメントで 20ms の遅延で配信されます。

#### complete イベント
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

#### error イベント
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
    .ConfigureOpenAI(options =>
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
- `CSV`
- `Excel`
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
// Response: 200 OK
```

---

## クライアント API

Reveal SDK AI クライアントは、Web アプリケーションでの会話型インタラクション用のシンプルな TypeScript API を提供します。

### 作業の開始

メッセージを送信するには、`client.ai.chat.sendMessage()` メソッドを使用します。このメソッドは、**await** と **streaming** の両方のパターンをサポートします。

#### 基本的な使用方法 (Await パターン)

表示する前に完全な結果を待ちます:

```typescript
import { RevealSdkClient } from '@revealbi/api';

const client = RevealSdkClient.getInstance();

// 質問して完全なレスポンスを取得
const response = await client.ai.chat.sendMessage({
  question: 'Show me sales trends for the last quarter',
  datasourceId: 'my-datasource'
});

console.log(response.explanation);
// "I've analyzed your sales data for Q4 2024..."

if (response.dashboard) {
  // 生成されたダッシュボードを読み込む
  loadDashboard(response.dashboard);
}
```

### レスポンスのストリーミング

ChatGPT のような体験を実現するために、説明テキストをリアルタイムでストリーミングします:

```typescript
let explanation = '';

const response = await client.ai.chat.sendMessage(
  {
    question: 'Create a dashboard showing customer distribution by region',
    datasourceId: 'my-datasource',
    streamExplanation: true
  },
  {
    onProgress: (message) => {
      console.log('Status:', message);
      // 「新しいダッシュボードを作成しています」
    },
    onTextChunk: (chunk) => {
      explanation += chunk;
      // 到着したテキストを表示
      document.getElementById('chat-message').textContent = explanation;
    },
    onComplete: (message, result) => {
      console.log('Complete:', message);
      if (result?.dashboard) {
        loadDashboard(result.dashboard);
      }
    },
    onError: (error, details) => {
      console.error('Error:', error, details);
    }
  }
);
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
  question: 'Add a date filter to this dashboard',
  datasourceId: 'my-datasource',
  dashboard: existingDashboardJson  // 現在のダッシュボード JSON を提供
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
  question: 'Explain what this dashboard shows',
  datasourceId: 'my-datasource',
  dashboard: currentDashboard  // RVDashboard オブジェクトを受け入れる
});

console.log(response.explanation);
```

### リクエスト パラメーター

```typescript
interface ChatMessageRequest {
  question: string;              // ユーザーの自然言語入力 (必須)
  datasourceId?: string;         // データ ソース識別子
  dashboard?: string;            // ダッシュボード JSON または RVDashboard オブジェクト
  clientName?: string;           // LLM プロバイダーのオーバーライド
  streamExplanation?: boolean;   // ストリーミングを有効にするかどうか (デフォルト: false)
}
```

| パラメーター | タイプ | 必須 | 説明 |
|-----------|------|----------|-------------|
| `question` | `string` | はい | ユーザーの自然言語の質問またはリクエスト。 |
| `datasourceId` | `string` | いいえ | コンテキスト用のデータ ソース識別子。 |
| `dashboard` | `string` | いいえ | 編集/分析用のダッシュボード JSON または RVDashboard オブジェクト。 |
| `clientName` | `string` | いいえ | 使用する特定の LLM プロバイダーの名前。 |
| `streamExplanation` | `boolean` | いいえ | リアルタイム テキスト ストリーミングを有効化 (デフォルト: false)。 |

### イベント ハンドラー

```typescript
interface ChatEventHandlers {
  onProgress?: (message: string) => void;
  onTextChunk?: (content: string) => void;
  onResult?: (result: unknown) => void;
  onError?: (error: string, details?: unknown) => void;
  onComplete?: (message: string, result?: ChatMessageResponse) => void;
}
```

| ハンドラー | 説明 |
|---------|-------------|
| `onProgress` | 処理中にステータス メッセージで呼び出されます (例: 「新しいダッシュボードを作成しています」)。 |
| `onTextChunk` | ストリーミングが有効な場合にテキスト フラグメントで呼び出されます。 |
| `onResult` | 中間結果が利用可能な場合に呼び出されます。 |
| `onError` | 処理中にエラーが発生した場合に呼び出されます。 |
| `onComplete` | 処理が完了したときに呼び出され、完全な結果を含みます。 |

### オプション

```typescript
interface ChatOptions {
  signal?: AbortSignal;  // リクエストをキャンセルするための AbortSignal
}
```

| オプション | タイプ | 説明 |
|--------|------|-------------|
| `signal` | `AbortSignal` | リクエストをキャンセルするための AbortSignal。 |

### 結果

```typescript
interface ChatMessageResponse {
  explanation?: string;   // AI 生成の説明
  detail?: string;        // 追加の詳細
  debugInfo?: string;     // デバッグ情報
  rawResponse?: string;   // 生の LLM レスポンス
  dashboard?: string;     // 生成/変更されたダッシュボード JSON
  error?: string;         // リクエストが失敗した場合のエラー メッセージ
}
```

レスポンスには常に、AI の自然言語レスポンスを含む `explanation` フィールドが含まれます。`dashboard` フィールドは、ダッシュボードが生成または変更されたときに設定されます。

---

## 一般的なパターン

### チャット インターフェイスの構築

メッセージ履歴を含む完全なチャット UI を作成:

```typescript
const messages: Array<{role: 'user' | 'assistant', content: string}> = [];
let currentMessage = '';

async function sendChatMessage(userInput: string) {
  // ユーザー メッセージを UI に追加
  messages.push({ role: 'user', content: userInput });
  renderMessages();

  currentMessage = '';

  const response = await client.ai.chat.sendMessage(
    {
      question: userInput,
      datasourceId: 'my-datasource',
      streamExplanation: true
    },
    {
      onProgress: (message) => {
        showProgressIndicator(message);
      },
      onTextChunk: (chunk) => {
        currentMessage += chunk;
        // UI でストリーミング メッセージを更新
        updateStreamingMessage(currentMessage);
        scrollToBottom();
      },
      onComplete: (message, result) => {
        // メッセージを確定
        messages.push({ role: 'assistant', content: currentMessage });
        renderMessages();

        if (result?.dashboard) {
          loadDashboard(result.dashboard);
        }

        hideProgressIndicator();
      },
      onError: (error) => {
        showError(error);
      }
    }
  );
}

// 会話をクリア
async function resetConversation() {
  await client.ai.chat.resetContext();
  messages.length = 0;
  renderMessages();
}
```

### エラー処理

適切なユーザー フィードバックでエラーを適切に処理:

```typescript
async function safeChat(question: string) {
  try {
    const response = await client.ai.chat.sendMessage(
      {
        question,
        datasourceId: 'my-datasource'
      },
      {
        onError: (error, details) => {
          // ストリーミング エラーを処理
          console.error('Streaming error:', error);
          console.error('Details:', details);

          // ユーザー フレンドリーなメッセージを表示
          showNotification('An error occurred. Please try again.', 'error');
        },
        onComplete: (message, result) => {
          if (result?.error) {
            // エラーで完了を処理
            showNotification(result.error, 'error');
          } else if (result) {
            // 成功
            displayResponse(result.explanation);

            if (result.dashboard) {
              loadDashboard(result.dashboard);
            }
          }
        }
      }
    );
  } catch (error) {
    // リクエスト レベルのエラーを処理
    console.error('Request failed:', error);

    if (error.message.includes('datasource')) {
      showNotification('Datasource not found. Please check your configuration.', 'error');
    } else if (error.message.includes('network')) {
      showNotification('Network error. Please check your connection.', 'error');
    } else {
      showNotification('An unexpected error occurred.', 'error');
    }
  }
}
```
