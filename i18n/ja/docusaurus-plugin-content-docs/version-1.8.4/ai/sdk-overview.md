---
sidebar_label: 概要
---


# SDK の使い方

Reveal SDK AI クライアントは、Web アプリケーションに AI 機能を提供する TypeScript/JavaScript ライブラリです。**インサイト**（データ分析の生成）と**チャット**（対話型アナリティクス）の2つの主要な API を公開しており、どちらも単一のクライアントインスタンスからアクセスできます。

## 初期化

AI 機能を使用する前に、サーバー URL を指定してクライアントを初期化します:

```typescript
import { RevealSdkClient } from '@revealbi/api';

RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com'
});
```

UMD/CDN を使用する場合:

```typescript
rv.RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com'
});
```

:::info

クライアント SDK を使用するには、[AI サーバー SDK](/ai/install-server-sdk) がインストールされ、実行されている必要があります。すべての AI リクエストは、設定された LLM プロバイダーによってサーバーサイドで処理されます。

:::

## クライアントインスタンスの取得

初期化後、アプリケーション内のどこからでも共有クライアントインスタンスを取得できます:

```typescript
const client = RevealSdkClient.getInstance();
```

## API サーフェス

クライアントは `client.ai` 名前空間を通じて AI 機能を公開します:

### インサイト

ダッシュボードやビジュアライゼーションからサマリー、分析、予測を生成します:

```typescript
const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
});

console.log(insight.explanation);
```

詳しくは[インサイト](./sdk-insights.md)をご覧ください。

### チャット

ユーザーが自然言語でデータと対話できる会話型インターフェースを構築します:

```typescript
const response = await client.ai.chat.sendMessage({
  message: 'Show me sales by region for Q4',
  datasourceId: 'my-datasource',
});

console.log(response.explanation);
```

詳しくは[チャット](./sdk-chat.md)をご覧ください。

## ストリーミングと非ストリーミング

両方の API で2つのレスポンスモードがサポートされています:

- **非ストリーミング**（デフォルト）: 完全なレスポンスを待ちます。シンプルで分かりやすい方式です。
- **ストリーミング**: テキストが生成されるとリアルタイムで受信し、ChatGPT のような体験を提供します。

ストリーミングを有効にするには、任意のリクエストに `stream: true` を追加します:

```typescript
const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

stream.on('text', (content) => {
  console.log(content); // Text arrives in chunks
});

const result = await stream.finalResponse();
```

詳しくは[ストリーミングレスポンス](./sdk-streaming.md)をご覧ください。
