---
sidebar_label: インサイトエンドポイント
---


# インサイトエンドポイント

AI インサイトは、ダッシュボードやビジュアライゼーションを自動的に分析し、自然言語による説明の生成、トレンドやパターンの特定、将来の値の予測を行います。Reveal SDK AI は、高度なアナリティクスの専門知識がなくてもユーザーがデータを理解できるよう、3 種類のインサイトを生成します。

**サマリー** - 主要な指標、トップパフォーマー、全体的なトレンドを強調した簡潔な概要です。

> *"Sales revenue reached $2.4M in Q4 2024, up 18% from Q3. The Technology category led growth with $890K in sales, while the West region showed the strongest performance at $1.1M."*

**分析** - データ内のパターン、異常値、トレンド、相関関係を特定する詳細な解釈です。

> *"Analysis reveals a strong seasonal pattern with peaks in Q4 driven by holiday shopping. The Technology category shows consistent month-over-month growth averaging 12%, while Office Supplies demonstrate more volatility. A notable spike in October coincides with the new product launch campaign."*

**予測** - 過去のデータのトレンドに基づく将来の値の予測です。何期間先まで予測するかを指定できます。

> *"Based on historical trends, Q1 2025 sales are forecasted at $2.1M, with continued growth expected through mid-year. The model predicts Technology category sales will reach $950K by March 2025, representing 15% growth from the current period."*

インサイトは 2 つのレベルで生成できます:

- **ダッシュボードレベル**: ダッシュボード全体を分析し、すべてのビジュアライゼーションを総合的に考慮して包括的なインサイトを提供します
- **ビジュアライゼーションレベル**: 単一のビジュアライゼーションに焦点を当て、そのビジュアライゼーションのデータに特化した詳細な分析を提供します

---

## エンドポイント

```
POST /api/reveal/ai/insights
```

## リクエストフォーマット

```typescript
{
  // Dashboard source (use ONE of these)
  dashboardJson?: string,      // Dashboard as JSON string (RDash format)
  dashboardId?: string,         // Dashboard ID (when using IRVDashboardProvider)

  // Optional parameters
  visualizationId?: string,     // Visualization ID for visualization-level insights
  insightType?: string,         // "Summary" | "Analysis" | "Forecast" (default: "Summary")
  forecastPeriods?: number,     // Number of periods to forecast (default: 6, only for Forecast type)
  stream?: boolean,             // Return SSE stream instead of JSON (default: false)
  model?: string                  // Optional LLM model override
}
```

### リクエストパラメーター

| パラメーター | 型 | 必須 | 説明 |
|-----------|------|----------|-------------|
| `dashboardJson` | string | * | ダッシュボードの JSON 文字列。これまたは `dashboardId` を使用します |
| `dashboardId` | string | * | ダッシュボード識別子。これまたは `dashboardJson` を使用します |
| `visualizationId` | string | いいえ | 分析するビジュアライゼーション ID。省略した場合、ダッシュボード全体を分析します |
| `insightType` | string | いいえ | インサイトの種類: `"Summary"`、`"Analysis"`、または `"Forecast"`（デフォルト: `"Summary"`） |
| `forecastPeriods` | number | いいえ | 予測する期間数（デフォルト: 6）。`insightType` が `"Forecast"` の場合のみ使用されます |
| `stream` | boolean | いいえ | `true` の場合、プログレスイベント、テキストチャンク、および最終 complete イベントを含む `text/event-stream`（SSE）レスポンスを返します。`false`（デフォルト）の場合、プレーンな `application/json` レスポンスを返します。 |
| `model` | string | いいえ | このリクエストで使用する特定の LLM モデルの名前 |

\* `dashboardJson` または `dashboardId` のいずれかを指定する必要があります

## レスポンスフォーマット

### 非ストリーミング（デフォルト）

`stream` が `false` または省略された場合、エンドポイントはプレーンな JSON レスポンスを返します。

```json
{
  "explanation": "Sales revenue reached $2.4M in Q4 2024, up 18% from Q3..."
}
```

エラーの場合、レスポンスには適切な HTTP ステータスコード（400 または 500）とともにエラーメッセージが含まれます。

```json
{
  "error": "Error message"
}
```

### ストリーミング

`stream` が `true` の場合、エンドポイントは以下のイベントタイプを含む Server-Sent Events（SSE）を返します。

#### progress イベント
インサイト生成中に現在のステータスを示すために送信されます。

```json
event: progress
data: {"message": "Analyzing dashboard data..."}
```

#### text イベント
生成された説明テキストのフラグメントを含みます。

```json
event: text
data: {"content": "Sales revenue reached $2.4M in Q4 2024"}
```

#### complete イベント
インサイトの生成が正常に完了したときに送信されます。常に完全な説明を含みます。

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
インサイトの生成が失敗した場合に送信されます。

```json
event: error
data: {"error": "Error message"}
```
