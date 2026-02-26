---
sidebar_label: チャットエンドポイント
---


# チャットエンドポイント

AI チャットはデータ分析を会話に変換します。ダッシュボードを手動で作成したりクエリを記述したりする代わりに、ユーザーは見たいものや理解したいことを説明するだけです。AI がリクエストを解釈し、データを処理し、インサイトや説明を返したり、ダッシュボードを自動的に生成・修正したりします（現在のユーザーメッセージと会話履歴の両方に基づきます）。

### 主な機能

**自然言語によるダッシュボード生成**
必要なものを説明してダッシュボードを作成します：「Q4の地域別売上を表示して」や「カテゴリ別の収益を比較するチャートを作成して」など。

**ダッシュボードの編集**
既存のダッシュボードを会話形式で修正します：「日付範囲のフィルターを追加して」や「円グラフを棒グラフに変更して」など。

**データ分析**
データについて質問します：「収益上位5社の顧客は？」や「顧客満足度スコアのトレンドを表示して」など。

**会話コンテキスト**
AI は会話履歴を保持し、フォローアップの質問や改善を可能にします：「それを月別に分解して」や「テクノロジーカテゴリだけにフィルターして」など。

---

## エンドポイント

**メッセージ送信**
```
POST /api/reveal/ai/chat
```

**セッションクリア**
```
DELETE /api/reveal/ai/chat
```

## リクエスト形式

```typescript
{
  // Required
  datasourceId: string,          // Datasource identifier for context

  // Message (one required)
  message?: string,               // Natural language message/request

  // Optional context
  dashboard?: string,             // Dashboard JSON for editing/analysis
  visualizationId?: string,       // Visualization ID for visualization-specific operations

  // Optional configuration
  model?: string,                 // LLM model override
  stream?: boolean                // Return SSE stream instead of JSON (default: false)
}
```

### リクエストパラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|----------|-------------|
| `datasourceId` | string | はい | クエリ対象のデータソースの識別子 |
| `message` | string | 条件付き* | ユーザーの自然言語メッセージまたはリクエスト |
| `dashboard` | string | いいえ | 編集または分析コンテキスト用のダッシュボード JSON（RDash 形式） |
| `visualizationId` | string | いいえ | ビジュアライゼーション固有の操作のためのビジュアライゼーション識別子 |
| `model` | string | いいえ | このリクエストに使用する特定の LLM モデル名 |
| `stream` | boolean | いいえ | `true` の場合、プログレスイベント、テキストチャンク、最終完了イベントを含む `text/event-stream`（SSE）レスポンスを返します。`false`（デフォルト）の場合、プレーンな `application/json` レスポンスを返します。 |

\* `message` または `intent` のいずれかを指定する必要があります

**パラメーターの詳細:**

- **`datasourceId`**: すべてのリクエストで必須です。利用可能なデータ構造に関するコンテキストを提供します。
- **`dashboard`**: 既存のダッシュボードを編集する場合やダッシュボードの内容を分析する場合に指定します。

## レスポンス形式

### 非ストリーミング（デフォルト）

`stream` が `false` または省略された場合、エンドポイントはプレーンな JSON レスポンスを返します：

```json
{
  "explanation": "Based on your data, I've created a dashboard showing sales by region...",
  "dashboard": "{...rdash JSON...}"
}
```

エラー時は、適切な HTTP ステータスコード（400 または 500）とともにエラーメッセージを含むレスポンスが返されます：

```json
{
  "error": "Error message"
}
```

### ストリーミング

`stream` が `true` の場合、エンドポイントは以下のイベントタイプを持つ Server-Sent Events（SSE）を返します：

#### progress イベント
処理中に現在のステータスを示すために送信されます。

```json
event: progress
data: {"message": "Creating a new dashboard"}
```

一般的なプログレスメッセージ：
- "Creating a new dashboard"
- "Analyzing the current dashboard"
- "Adding filters to visualizations"
- "Modifying visualization"

#### text イベント
生成された説明テキストのフラグメントを含みます。

```json
event: text
data: {"content": "Based on your data, I've created"}
```

テキストチャンクは約8語のセグメントで、20ms の遅延で配信され、ChatGPT のような自然なストリーミングを実現します。

#### complete イベント
処理が正常に完了したときに送信されます。常に完全な結果を含みます。

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
- `explanation`: 実行された内容の自然言語による説明
- `dashboard`: 生成または修正されたダッシュボード JSON（該当する場合）

#### error イベント
処理が失敗した場合に送信されます。

```json
event: error
data: {"error": "Datasource not found"}
```

## 会話履歴

チャットはユーザーおよびデータソースごとにサーバー側の会話履歴を保持します。これにより、コンテキストに基づいたフォローアップの質問や反復的な改善が可能になります。

**履歴の仕組み:**

1. **ユーザーごとのセッション**: 各ユーザーはデータソースごとに個別の会話セッションを取得します
2. **自動コンテキスト**: 以前の質問と回答は、新しいリクエストのコンテキストとして自動的に含まれます
3. **永続的な状態**: 履歴は明示的にクリアされるまで複数のリクエストにわたって保持されます
4. **プロンプト内のコンテキスト**: 完全な会話履歴が LLM に提供されます：
   ```
   Conversation history:
   - User: Show me sales by region
   - Agent: I've created a dashboard with a map visualization...
   - User: Now filter to Q4 only
   ```

**履歴の管理:**

- **履歴のクリア**: `DELETE /api/reveal/ai/chat` を送信してセッションをリセットします

## サーバー側の実装

チャットエンドポイントは、ASP.NET Core アプリケーションで Reveal AI を構成すると自動的に登録されます：

```csharp title="Program.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

// Add Reveal SDK
builder.Services.AddControllers().AddReveal(revealBuilder =>
{
    // Configure datasource provider
    revealBuilder.AddDataSourceProvider<DataSourceProvider>();
});

// Add Reveal AI - automatically registers /api/reveal/ai/chat endpoint
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

追加のコントローラーやルーティング構成は不要です。`AddRevealAI()` を呼び出すだけで、POST と DELETE の両方のエンドポイントが使用可能になります。

## メタデータ構成

チャットにはデータソースの構造を理解するための**メタデータカタログ**が必要です。チャットリクエストの `datasourceId` パラメーターは、カタログで定義された `Id` と一致する必要があります。

:::info

完全なカタログスキーマ、構成オプション、および例については、[メタデータカタログ](./metadata-catalog.md) トピックを参照してください。

:::
