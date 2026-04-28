---
sidebar_label: インサイト
---


# インサイト

`client.ai.insights.get()` メソッドは、ダッシュボードやビジュアライゼーションから AI を活用したサマリー、分析、予測を生成します。

## 基本的な使い方

```typescript
import { RevealSdkClient } from '@revealbi/api';

const client = RevealSdkClient.getInstance();

// Get a summary for an entire dashboard
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
});

console.log(insight.explanation);
// "Sales revenue reached $2.4M in Q4 2024..."
```

## インサイトタイプ

`type` パラメーターを指定して、分析の種類を制御します:

```typescript
// Summary - concise overview of key metrics
const summary = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
});

// Analysis - detailed interpretation of trends and patterns
const analysis = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'analysis',
});

// Forecast - predictions based on historical data
const forecast = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'forecast',
  forecastPeriods: 12,  // Forecast 12 periods ahead (default: 6)
});
```

## ダッシュボードオブジェクトの使用

ダッシュボード ID の代わりに、ダッシュボードオブジェクトを直接渡すこともできます:

```typescript
// Using RVDashboard object from RevealView
const insight = await client.ai.insights.get({
  dashboard: revealView.dashboard,  // RVDashboard object
  type: 'analysis',
});
```

## ビジュアライゼーションレベルのインサイト

ビジュアライゼーション ID を指定して、特定のビジュアライゼーションを分析します:

```typescript
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  visualizationId: 'sales-by-region-chart',  // Specific visualization
  type: 'summary',
});
```

## ストリーミング

任意のリクエストに `stream: true` を追加すると、リアルタイムでレスポンスを受信できます。利用パターンと例については、[ストリーミングレスポンス](./sdk-streaming.md)を参照してください。

---

## リクエストパラメーター

すべてのパラメーターは単一のリクエストオブジェクトで渡します:

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|----------|-------------|
| `dashboard` | `string \| RVDashboard` | * | RevealView からのダッシュボードオブジェクトまたは JSON 文字列 |
| `dashboardId` | `string` | * | ダッシュボード識別子 |
| `visualizationId` | `string` | いいえ | 分析対象のビジュアライゼーション ID |
| `type` | `InsightType` | はい | タイプ: `'summary'`、`'analysis'`、`'forecast'` |
| `forecastPeriods` | `number` | いいえ | 予測する期間数（デフォルト: 6） |
| `model` | `string` | いいえ | 使用する特定の LLM モデルの名前 |
| `signal` | `AbortSignal` | いいえ | リクエストをキャンセルするための AbortSignal |
| `stream` | `boolean` | いいえ | ストリーミングモードを有効にする（デフォルト: `false`） |

\* `dashboard` または `dashboardId` のいずれかを指定する必要があります

## レスポンスタイプ

```typescript
interface InsightResponse {
  explanation: string;  // Complete AI-generated explanation
}
```

`explanation` フィールドには、非ストリーミングモードでもストリーミングモードでも、完全なインサイトテキストが含まれます。
