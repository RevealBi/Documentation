---
sidebar_label: インサイト
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# AI インサイト

AI インサイトは、ダッシュボードと表示形式を自動的に分析して、自然言語による説明を生成し、トレンドとパターンを特定し、将来の値を予測します。Reveal SDK AI は、ユーザーが深い分析の専門知識を必要とせずにデータを理解するのに役立つ 3 つのタイプのインサイトを生成します。

**Summary (要約)** - 主要なメトリック、トップ パフォーマー、全体的なトレンドを強調する簡潔な概要。

> *2024 年第 4 四半期の売上収益は 240 万ドルに達し、第 3 四半期から 18% 増加しました。テクノロジー カテゴリが 89 万ドルの売上で成長をリードし、西部地域が 110 万ドルで最も強いパフォーマンスを示しました。*

**Analysis (分析)** - データのパターン、異常、トレンド、相関関係を特定する詳細な解釈。

> *分析により、ホリデー ショッピングによって第 4 四半期にピークを迎える強い季節パターンが明らかになりました。テクノロジー カテゴリは平均 12% の一貫した月次成長を示し、オフィス用品はより多くのボラティリティを示しています。10 月の顕著なスパイクは、新製品発売キャンペーンと一致しています。*

**Forecast (予測)** - 履歴データのトレンドに基づく将来の値の予測。何期間先まで予測するかを指定できます。

> *履歴トレンドに基づくと、2025 年第 1 四半期の売上は 210 万ドルと予測され、年半ばまで継続的な成長が期待されます。モデルは、テクノロジー カテゴリの売上が 2025 年 3 月までに 95 万ドルに達し、現在の期間から 15% の成長を表すと予測しています。*

インサイトは 2 つのレベルで生成できます:

- **ダッシュボード レベル**: ダッシュボード全体を分析し、すべての表示形式を一緒に考慮して総合的なインサイトを提供します。
- **表示形式レベル**: 単一のウィジェットに焦点を当て、その表示形式のデータに固有の詳細な分析を提供します。

---

## サーバー API

Insights エンドポイントは、ダッシュボードまたは個々の表示形式の AI インサイトを生成します。シンプルなリクエスト/レスポンス ワークフロー向けのプレーン JSON レスポンスと、リアルタイムの進行状況およびテキスト更新のためのストリーミング SSE レスポンスの 2 つのレスポンス モードをサポートしています。

### エンドポイント

```
POST /api/reveal/ai/insights
```

### リクエスト形式

```typescript
{
  // ダッシュボード ソース (以下のいずれか 1 つを使用)
  dashboardJson?: string,      // JSON 文字列としてのダッシュボード (RDash 形式)
  dashboardId?: string,         // ダッシュボード ID (IRVDashboardProvider を使用する場合)

  // オプションのパラメーター
  visualizationId?: string,     // 表示形式レベルのインサイト用のウィジェット ID
  insightType?: string,         // "Summary" | "Analysis" | "Forecast" (デフォルト: "Summary")
  forecastPeriods?: number,     // 予測する期間の数 (デフォルト: 6、Forecast タイプの場合のみ)
  stream?: boolean,             // JSON の代わりに SSE ストリームを返す (デフォルト: false)
  model?: string                  // オプションの LLM モデル オーバーライド
}
```

#### リクエスト パラメータ

| パラメータ | タイプ | 必須 | 説明 |
|-----------|------|----------|-------------|
| `dashboardJson` | string | * | JSON 文字列としてのダッシュボード。こちらまたは `dashboardId` を使用します。 |
| `dashboardId` | string | * | ダッシュボード識別子。こちらまたは `dashboardJson` を使用します。 |
| `visualizationId` | string | いいえ | 分析するウィジェット ID。省略するとダッシュボード全体を分析します。 |
| `insightType` | string | いいえ | インサイトのタイプ: `"Summary"`、`"Analysis"`、または `"Forecast"` (デフォルト: `"Summary"`)。 |
| `forecastPeriods` | number | いいえ | 予測する期間の数 (デフォルト: 6)。`insightType` が `"Forecast"` の場合のみ使用されます。 |
| `stream` | boolean | いいえ | `true` の場合、進行状況イベント、テキスト チャンク、最終完了イベントを含む `text/event-stream` (SSE) レスポンスを返します。`false` (デフォルト) の場合、プレーン `application/json` レスポンスを返します。 |
| `model` | string | いいえ | このリクエストに使用する特定の LLM モデルの名前。 |

\* `dashboardJson` または `dashboardId` のいずれかを指定する必要があります

### レスポンス形式

#### 非ストリーミング (デフォルト)

`stream` が `false` または省略されている場合、エンドポイントはプレーン JSON レスポンスを返します:

```json
{
  "explanation": "Sales revenue reached $2.4M in Q4 2024, up 18% from Q3..."
}
```

エラーの場合、レスポンスには適切な HTTP ステータス コード (400 または 500) とともにエラー メッセージが含まれます:

```json
{
  "error": "Error message"
}
```

#### ストリーミング

`stream` が `true` の場合、エンドポイントは次のイベント タイプを持つ Server-Sent Events (SSE) を返します:

##### progress イベント
インサイト生成中に現在のステータスを示すために送信されます。

```json
event: progress
data: {"message": "Analyzing dashboard data..."}
```

##### textchunk イベント
生成される説明テキストのフラグメントを含みます。

```json
event: textchunk
data: {"content": "Sales revenue reached $2.4M in Q4 2024"}
```

##### complete イベント
インサイト生成が正常に完了したときに送信されます。常に完全な説明を含みます。

```json
event: complete
data: {
  "message": "Insights generated successfully",
  "result": {
    "explanation": "Sales revenue reached $2.4M in Q4 2024, up 18% from Q3..."
  }
}
```

##### error イベント
インサイト生成が失敗した場合に送信されます。

```json
event: error
data: {"error": "Error message"}
```

## クライアント API

Reveal SDK AI クライアントは、Web アプリケーションからインサイトをリクエストするための TypeScript API を提供します。`client.ai.insights.get()` メソッドは、すべてのパラメーターに単一のリクエスト オブジェクトを使用し、非ストリーミングとストリーミングの両方のモードをサポートします。

### 非ストリーミング (デフォルト)

表示する前に完全な結果を待ちます。`Promise<InsightResponse>` を返します。

```typescript
import { RevealSdkClient } from '@revealbi/api';

const client = RevealSdkClient.getInstance();

// ダッシュボード全体の要約を取得
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
});

console.log(insight.explanation);
// "Sales revenue reached $2.4M in Q4 2024..."
```

### ストリーミング

リクエストに `stream: true` を追加すると、イベントが到着するたびにイベントを返す `AIStream` を取得します。ストリームは 3 つの消費パターンをサポートしています。

#### パターン 1: for-await (フル コントロール)

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

#### パターン 2: イベント リスナー (シンプルな UI 連携)

```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

stream.on('progress', (message) => console.log('Status:', message));
stream.on('text', (content) => document.getElementById('output').textContent += content);
stream.on('error', (error) => console.error('Error:', error));

const result = await stream.finalResponse();
console.log('Complete:', result.explanation);
```

#### パターン 3: ストリームからの集約結果

```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

// 完了を待ち、InsightResponse を返します
const result = await stream.finalResponse();
console.log(result.explanation);
```

### ダッシュボード オブジェクトの使用

ダッシュボード ID の代わりに、ダッシュボード オブジェクトを直接渡すことができます:

```typescript
// RevealView の RVDashboard オブジェクトを使用
const insight = await client.ai.insights.get({
  dashboard: revealView.dashboard,  // RVDashboard オブジェクト
  type: 'analysis',
});
```

### 表示形式レベルのインサイト

ウィジェット ID を指定して特定のウィジェットを分析します:

```typescript
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  visualizationId: 'sales-by-region-chart',  // 特定のウィジェット
  type: 'summary',
});
```

### 予測インサイト

カスタム期間で予測を生成します:

```typescript
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  visualizationId: 'sales-trend',
  type: 'forecast',
  forecastPeriods: 12,  // 12 期間先を予測
});
```

### リクエスト パラメーター

すべてのパラメーターは単一のリクエスト オブジェクトで渡されます:

```typescript
// 非ストリーミング リクエスト
interface InsightRequest {
  dashboard?: string | RVDashboard;  // ダッシュボード オブジェクトまたは JSON 文字列
  dashboardId?: string;               // ダッシュボード ID
  visualizationId?: string;           // 表示形式レベルのインサイト用のウィジェット ID
  type: InsightType;                   // 'summary' | 'analysis' | 'forecast'
  forecastPeriods?: number;           // 予測期間 (デフォルト: 6)
  model?: string;                      // LLM モデルのオーバーライド
  signal?: AbortSignal;               // リクエストのキャンセル用
  stream?: false;                      // 非ストリーミング (デフォルト)
}

// ストリーミング リクエスト
interface InsightStreamRequest {
  // ...上記と同じフィールド、さらに:
  stream: true;                        // ストリーミングを有効にする
}
```

| パラメータ | タイプ | 必須 | 説明 |
|-----------|------|----------|-------------|
| `dashboard` | `string \| RVDashboard` | * | RevealView からのダッシュボード オブジェクトまたは JSON 文字列。 |
| `dashboardId` | `string` | * | ダッシュボード識別子。 |
| `visualizationId` | `string` | いいえ | 分析するウィジェット ID。 |
| `type` | `InsightType` | はい | タイプ: `'summary'`、`'analysis'`、`'forecast'`。 |
| `forecastPeriods` | `number` | いいえ | 予測する期間 (デフォルト: 6)。 |
| `model` | `string` | いいえ | 使用する特定の LLM モデルの名前。 |
| `signal` | `AbortSignal` | いいえ | リクエストをキャンセルするための AbortSignal。 |
| `stream` | `boolean` | いいえ | ストリーミング モードを有効にする (デフォルト: `false`)。 |

\* `dashboard` または `dashboardId` のいずれかを指定する必要があります。

### レスポンス タイプ

#### InsightResponse

```typescript
interface InsightResponse {
  explanation: string;  // AI によって生成された完全な説明
}
```

`explanation` フィールドには、非ストリーミングまたはストリーミング モードのどちらを使用するかに関係なく、完全なインサイト テキストが含まれます。

#### AIStream (ストリーミング)

`stream: true` の場合、戻り値の型は `AIStream<InsightResponse>` で、以下を提供します:

| メソッド / パターン | 説明 |
|---------|-------------|
| `for await (const event of stream)` | イベントが到着するたびにイベントを反復処理します。 |
| `.on(event, handler)` | イベント固有のリスナーを登録します。 |
| `.finalResponse()` | 完了した `InsightResponse` で解決される Promise を返します。 |
| `.abort()` | ストリームをキャンセルします。 |

#### ストリーム イベント

```typescript
type AIStreamEvent =
  | { type: 'progress'; message: string }
  | { type: 'text'; content: string }
  | { type: 'error'; error: string; details?: unknown };
```

| イベント タイプ | 説明 |
|------------|-------------|
| `progress` | 生成中のステータス メッセージ (例: "Analyzing dashboard data...") |
| `text` | 生成される説明のテキスト フラグメント |
| `error` | 生成が失敗した場合のエラー情報 |

---

## 一般的なパターン

### コンテキスト メニューの統合

ダッシュボードのコンテキスト メニューにインサイトを追加します:

```typescript
revealView.onMenuOpening = function (visualization, args) {
  // ダッシュボード レベルのインサイト
  if (args.menuLocation === $.ig.RVMenuLocation.Dashboard) {
    args.menuItems.push(new $.ig.RVMenuItem("Summary", null, async () => {
      const insight = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        type: 'summary',
      });
      displayInsight(insight.explanation);
    }));
  }

  // 表示形式レベルのインサイト
  if (args.menuLocation === $.ig.RVMenuLocation.Visualization) {
    args.menuItems.push(new $.ig.RVMenuItem("Analyze This", null, async () => {
      const insight = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        visualizationId: visualization.id,
        type: 'analysis',
      });
      displayInsight(insight.explanation);
    }));
  }
};
```

### ストリーミング表示

マークダウン レンダリングでストリーミング テキストを表示します:

```typescript
let buffer = '';

const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

stream.on('text', (content) => {
  buffer += content;
  // Markdown を、テキストが到着するたびにレンダリングする
  document.getElementById('output').innerHTML = marked.parse(buffer);
});

const result = await stream.finalResponse();
console.log('Streaming complete:', result.explanation);
```

### エラー処理

非ストリーミングとストリーミングの両方のモードでエラーを適切に処理します:

```typescript
// 非ストリーミングのエラー処理
try {
  const insight = await client.ai.insights.get({
    dashboardId: 'sales-dashboard',
    type: 'summary',
  });
  displayInsight(insight.explanation);
} catch (error) {
  console.error('Insight generation failed:', error);
  showErrorMessage(error.message);
}

// ストリーミングのエラー処理
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

stream.on('text', (content) => appendToUI(content));
stream.on('error', (error, details) => {
  console.error('Insight generation failed:', error);
  showErrorMessage(error);
});

await stream.finalResponse();
```

### リクエストのキャンセル

`AbortSignal` を使用して進行中のリクエストをキャンセルします:

```typescript
const controller = new AbortController();

// 非ストリーミング
const promise = client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  signal: controller.signal,
});

// 5 秒後にキャンセル
setTimeout(() => controller.abort(), 5000);

// ストリーミング
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
  signal: controller.signal,
});

// またはストリームを直接中止
stream.abort();
```
