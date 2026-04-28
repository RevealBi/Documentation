---
sidebar_label: 概要
---


# Reveal SDK AI の概要

Reveal SDK AI は、Reveal BI アプリケーションに強力な人工知能機能を追加し、ユーザーが自然言語を通じてインサイトを取得しデータと対話できるようにします。

## Reveal SDK AI とは？

Reveal SDK AI は、大規模言語モデル（LLM）を統合して以下の機能を提供する Reveal SDK の拡張機能です：

- **AI 生成インサイト**: ダッシュボードやビジュアライゼーションのサマリー、分析、予測を自動的に生成します
- **会話型アナリティクス**: データとチャットして、情報の探索、分析、可視化を行います

## 主な機能

### AI インサイト

3種類の分析により、データからインテリジェントなインサイトを生成します：

- **サマリー**: データが示す内容の簡潔な説明を取得します
- **分析**: トレンド、パターン、異常値の詳細な解釈を受け取ります
- **予測**: 過去のデータに基づいて将来の値を予測します

すべてのインサイトは、ChatGPT のようなユーザーエクスペリエンスを実現するために、リアルタイムでストリーミングできます。

### 会話型 AI チャット

ユーザーが以下のことを行えるチャットインターフェースを構築します：

- 自然言語でデータに関する質問をする
- 会話を通じてダッシュボードを生成・変更する
- フォローアップの質問のために会話コンテキストを維持する
- レスポンスをリアルタイムでストリーミングする

### 柔軟な API パターン

ユースケースに合ったパターンを選択できます：

**Await パターン** - シンプルで直感的：
```typescript
const result = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  insightType: InsightType.Summary
});
console.log(result.explanation);
```

**ストリーミングパターン** - リアルタイム更新：
```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  insightType: InsightType.Summary,
  stream: true,
});

stream.on('text', (content) => {
  // Display text as it arrives
  console.log(content);
});

const result = await stream.finalResponse();
console.log('Complete!');
```

## アーキテクチャ

Reveal SDK AI は2つの主要コンポーネントで構成されています：

### クライアント SDK (TypeScript/JavaScript)

クライアント SDK はウェブアプリケーション内で動作し、以下を提供します：

- シンプルな初期化と設定
- すべての AI 操作に対する型安全な API
- Server-Sent Events (SSE) による組み込みストリーミングサポート
- リクエストのキャンセルとエラーハンドリング

### サーバー SDK (ASP.NET Core)

サーバー SDK は以下を処理します：

- LLM プロバイダーの統合 (OpenAI、Anthropic、Google など)
- データソースメタデータの生成とキャッシング
- インテントベースの LLM ルーティング
- 会話型 AI のコンテキスト管理
- セキュリティと認証

## ベータ版について

Reveal SDK AI は現在ベータ版です。コア機能は安定しており開発に使用できますが、ユーザーのフィードバックに基づいて API が変更される可能性があります。ぜひお試しいただき、ご感想をお聞かせください。

一緒にインテリジェントなアナリティクス体験を構築しましょう！
