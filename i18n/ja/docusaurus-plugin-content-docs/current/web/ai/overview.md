---
sidebar_label: 概要
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# Reveal SDK AI の概要

Reveal SDK AI は、Reveal BI アプリケーションに強力な人工知能機能を追加し、ユーザーがインサイトを取得し、ダッシュボードを生成し、自然言語を通じてデータとやり取りできるようにします。

## Reveal SDK AI とは?

Reveal SDK AI は、大規模言語モデル (LLM) を統合して以下の機能を提供する Reveal SDK の拡張機能です:

- **AI 生成インサイト**: ダッシュボードと表示形式の要約、分析、予測を自動的に生成します
- **自然言語によるダッシュボードの生成**: プレーン言語で必要なものを説明してダッシュボードを作成します
- **会話分析**: データに基づき、チャットで情報を探索、分析、視覚化します
- **スマート データ ディスカバリー**: AI を活用したデータ ソースの探索とメタデータの理解

## 主要機能

### AI インサイト

3 つのタイプの分析でデータからインテリジェントなインサイトを生成します:

- **要約**: データが示す内容を簡潔に説明します
- **解析**: トレンド、パターン、異常の詳細な解釈を受け取ります
- **予測**: 履歴データに基づいて将来の値を予測します

すべてのインサイトは、ChatGPT のようなユーザー エクスペリエンスのためにリアルタイムでストリーミングできます。

### ダッシュボードの生成

ユーザーは、見たいものを説明するだけで完全なダッシュボードを生成できます:

```typescript
const response = await client.ai.dashboards.generate({
  userPrompt: 'Show me sales by region with a trend over time',
  datasourceId: 'my-datasource'
});
```

AI はデータ ソース スキーマを分析し、適切な表示形式を自動的に作成します。

### ダッシュボードの編集

自然言語を使用して既存のダッシュボードを変更します:

- **コンテンツの編集**: 表示形式を追加、削除、または変更します
- **フィルターの編集**: 表示形式レベルまたはグローバル フィルターを調整します
- **ダッシュボードの説明**: AI によって生成されたダッシュボード コンテンツの説明を取得します

### 会話型 AI チャット

ユーザーによる以下の操作を実行できるチャット インターフェイスを構築します:

- 自然言語でデータに関する質問をします
- 即座にダッシュボードと表示形式の結果を取得します
- フォローアップ質問のために会話コンテキストを維持します
- リアルタイムでレスポンスをストリーミングします

### 柔軟な API パターン

ユースケースに適したパターンを選択します:

**Await パターン** - シンプルで分かりやすい:
```typescript
const result = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  insightType: InsightType.Summary
});
console.log(result.explanation);
```

**Streaming パターン** - リアルタイム更新:
```typescript
const result = await client.ai.insights.get(
  {
    dashboardId: 'sales-dashboard',
    insightType: InsightType.Summary
  },
  {
    onTextChunk: (chunk) => {
      // Display text as it arrives
      console.log(chunk);
    },
    onComplete: (message, result) => {
      console.log('Complete!');
    }
  },
  { streamExplanation: true }
);
```

## アーキテクチャー

Reveal SDK AI は 2 つの主要コンポーネントで構成されています:

### クライアント SDK (TypeScript/JavaScript)

クライアント SDK は Web アプリケーションで実行され、以下を提供します:

- シンプルな初期化と構成
- すべての AI 操作に対する型安全な API
- Server-Sent Events (SSE) による組み込みストリーミング サポート
- リクエストのキャンセルとエラー処理

### サーバー SDK (ASP.NET Core)

サーバー SDK は以下を処理します:

- LLM プロバイダーとの統合 (OpenAI、Anthropic、Google など)
- データ ソース メタデータの生成とキャッシュ
- インテント ベースの LLM ルーティング
- 会話型 AI のコンテキスト管理
- セキュリティと認証

## ベータ版のステータス

Reveal SDK AI は現在ベータ版です。コア機能は安定しており開発の準備ができていますが、ユーザーのフィードバックに基づいて API が進化する可能性があります。ぜひお試しいただき、体験を共有してください。

インテリジェントな分析エクスペリエンスを一緒に構築しましょう!
