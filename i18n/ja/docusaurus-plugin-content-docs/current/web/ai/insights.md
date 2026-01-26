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

Insights エンドポイントは、ダッシュボードまたは個々の表示形式の AI インサイトを生成します。

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
  streamExplanation?: boolean,  // 説明をテキスト チャンクとしてストリーミングするかどうか (デフォルト: false)
  llmClientName?: string        // オプションの LLM プロバイダー オーバーライド
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
| `streamExplanation` | boolean | いいえ | リアルタイム表示のために説明をテキスト チャンクとしてストリーミングするかどうか (デフォルト: false)。 |
| `llmClientName` | string | いいえ | このリクエストに使用する特定の LLM プロバイダーの名前。 |

\* `dashboardJson` または `dashboardId` のいずれかを指定する必要があります

### レスポンス形式

エンドポイントは、次のイベント タイプを持つ Server-Sent Events (SSE) を返します:

#### progress イベント
インサイト生成中に現在のステータスを示すために送信されます。

```json
event: progress
data: {"message": "Analyzing dashboard data..."}
```

#### textchunk イベント
`streamExplanation: true` の場合に送信されます。生成される説明テキストのフラグメントを含みます。

```json
event: textchunk
data: {"content": "Sales revenue reached $2.4M in Q4 2024"}
```

#### complete イベント
インサイト生成が正常に完了したときに送信されます。ストリーミングに関係なく、常に完全な説明を含みます。

```json
event: complete
data: {
  "message": "Insights generated successfully",
  "result": {
    "explanation": "Sales revenue reached $2.4M in Q4 2024, up 18% from Q3..."
  }
}
```

#### error イベント
インサイト生成が失敗した場合に送信されます。

```json
event: error
data: {"error": "Error message"}
```

## クライアント API

Reveal SDK AI クライアントは、Web アプリケーションからインサイトをリクエストするためのシンプルな TypeScript API を提供します。

### インサイトの取得

`client.ai.insights.get()` メソッドを使用してインサイトをリクエストします。このメソッドは、同じ API 呼び出しを使用して **await** と **streaming** の両方のパターンをサポートします。

### 基本的な使用方法 (Await パターン)

表示する前に完全な結果を待ちます:

```typescript
import { RevealSdkClient, InsightType } from '@revealbi/api';

const client = RevealSdkClient.getInstance();

// ダッシュボード全体の要約を取得
const result = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  insightType: InsightType.Summary
});

console.log(result.explanation);
// "Sales revenue reached $2.4M in Q4 2024..."
```

### Streaming パターン

ChatGPT のような体験を実現するために、説明テキストをリアルタイムでストリーミングします:

```typescript
const result = await client.ai.insights.get(
  {
    dashboardId: 'sales-dashboard',
    insightType: InsightType.Summary
  },
  {
    onProgress: (message) => {
      console.log('Status:', message);
    },
    onTextChunk: (text) => {
      // 到着したテキストを表示
      process.stdout.write(text);
    },
    onComplete: (message, result) => {
      console.log('\nComplete:', message);
    },
    onError: (error, details) => {
      console.error('Error:', error, details);
    }
  },
  {
    streamExplanation: true  // ストリーミングを有効にするかどうか
  }
);
```

### ダッシュボード オブジェクトの使用

ダッシュボード ID の代わりに、ダッシュボード オブジェクトを直接渡すことができます:

```typescript
// RevealView の RVDashboard オブジェクトを使用
const result = await client.ai.insights.get({
  dashboard: revealView.dashboard,  // RVDashboard オブジェクト
  insightType: InsightType.Analysis
});
```

### 表示形式レベルのインサイト

ウィジェット ID を指定して特定のウィジェットを分析します:

```typescript
const result = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  visualizationId: 'sales-by-region-chart',  // 特定のウィジェット
  insightType: InsightType.Summary
});
```

### 予測インサイト

カスタム期間で予測を生成します:

```typescript
const result = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  visualizationId: 'sales-trend',
  insightType: InsightType.Forecast,
  forecastPeriods: 12  // 12 期間先を予測
});
```

### リクエスト パラメーター

```typescript
interface InsightRequest {
  // ダッシュボード ソース (以下のいずれか 1 つを使用)
  dashboard?: string | RVDashboard;  // ダッシュボード オブジェクトまたは JSON 文字列
  dashboardId?: string;               // ダッシュボード ID

  // オプションのパラメーター
  visualizationId?: string;           // 表示形式レベルのインサイト用のウィジェット ID
  insightType?: InsightType;          // Summary | Analysis | Forecast
  forecastPeriods?: number;           // 予測期間 (デフォルト: 6)
}
```

| パラメータ | タイプ | 必須 | 説明 |
|-----------|------|----------|-------------|
| `dashboard` | `string \| RVDashboard` | * | RevealView からのダッシュボード オブジェクトまたは JSON 文字列。 |
| `dashboardId` | `string` | * | ダッシュボード識別子。 |
| `visualizationId` | `string` | いいえ | 分析するウィジェット ID。 |
| `insightType` | `InsightType` | いいえ | タイプ: `Summary`、`Analysis`、`Forecast` (デフォルト: `Summary`)。 |
| `forecastPeriods` | `number` | いいえ | 予測する期間 (デフォルト: 6)。 |

\* `dashboard` または `dashboardId` のいずれかを指定する必要があります。

### イベント ハンドラー

```typescript
interface InsightEventHandlers {
  onProgress?: (message: string) => void;
  onTextChunk?: (content: string) => void;
  onResult?: (result: unknown) => void;
  onError?: (error: string, details?: unknown) => void;
  onComplete?: (message: string, result?: InsightResult) => void;
}
```

| ハンドラー | 説明 |
|---------|-------------|
| `onProgress` | 生成中にステータス メッセージで呼び出されます。 |
| `onTextChunk` | ストリーミングが有効な場合にテキスト フラグメントで呼び出されます。 |
| `onResult` | 中間結果が利用可能な場合に呼び出されます。 |
| `onError` | エラーが発生した場合に呼び出されます。 |
| `onComplete` | 生成が完了したときに呼び出され、完全な結果を含みます。 |

### オプション

```typescript
interface InsightOptions {
  signal?: AbortSignal;           // リクエストのキャンセル用
  llmClientName?: string;         // LLM プロバイダーのオーバーライド
  streamExplanation?: boolean;    // ストリーミングを有効にするかどうか (デフォルト: false)
}
```

| オプション | タイプ | 説明 |
|--------|------|-------------|
| `signal` | `AbortSignal` | リクエストをキャンセルするための AbortSignal。 |
| `llmClientName` | `string` | 使用する特定の LLM プロバイダーの名前。 |
| `streamExplanation` | `boolean` | リアルタイム ストリーミングを有効にする (デフォルト: false)。 |

### 結果

```typescript
interface InsightResult {
  explanation: string;  // AI によって生成された説明を完了
}
```

`explanation` フィールドには、await パターンまたは streaming パターンのどちらを使用するかに関係なく、完全なインサイト テキストが含まれます。

---

## 一般的なパターン

### コンテキスト メニューの統合

ダッシュボードのコンテキスト メニューにインサイトを追加します:

```typescript
revealView.onMenuOpening = function (visualization, args) {
  // ダッシュボードレベルのインサイト
  if (args.menuLocation === $.ig.RVMenuLocation.Dashboard) {
    args.menuItems.push(new $.ig.RVMenuItem("Summary", null, async () => {
      const result = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        insightType: InsightType.Summary
      });
      displayInsight(result.explanation);
    }));
  }

  // 表示形式レベルのインサイト
  if (args.menuLocation === $.ig.RVMenuLocation.Visualization) {
    args.menuItems.push(new $.ig.RVMenuItem("Analyze This", null, async () => {
      const result = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        visualizationId: visualization.id,
        insightType: InsightType.Analysis
      });
      displayInsight(result.explanation);
    }));
  }
};
```

### ストリーミング表示

マークダウン レンダリングでストリーミング テキストを表示します:

```typescript
let buffer = '';

const result = await client.ai.insights.get(
  {
    dashboardId: 'sales-dashboard',
    insightType: InsightType.Summary
  },
  {
    onTextChunk: (text) => {
      buffer += text;
      // Markdown を、テキストが到着するたびにレンダリングする
      document.getElementById('output').innerHTML = marked.parse(buffer);
    },
    onComplete: () => {
      console.log('Streaming complete');
    }
  },
  { streamExplanation: true }
);
```

### エラー処理

エラーを適切に処理します:

```typescript
const result = await client.ai.insights.get(
  {
    dashboardId: 'sales-dashboard',
    insightType: InsightType.Summary
  },
  {
    onError: (error, details) => {
      console.error('Insight generation failed:', error);
      console.error('Details:', details);
      showErrorMessage(error);
    },
    onComplete: (message, result) => {
      if (result) {
        displayInsight(result.explanation);
      }
    }
  }
);
```
