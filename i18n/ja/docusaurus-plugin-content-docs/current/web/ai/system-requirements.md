---
sidebar_label: システム要件
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# システム要件

Reveal SDK AI 機能を使用するには、次の前提条件が必要です:

## クライアント SDK の要件

### Web ブラウザー

Reveal SDK AI クライアントは、以下をサポートする最新の Web ブラウザーで動作します:

- ES2020 JavaScript 機能
- Async/Await
- Fetch API
- Server-Sent Events (SSE)

**サポートされているブラウザー:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### JavaScript フレームワーク (オプション)

クライアント SDK は素の JavaScript で動作しますが、以下とシームレスに統合されます:

- Angular 15+
- React 18+
- Vue 3+
- または任意の最新の JavaScript フレームワーク

## サーバー SDK の要件

### ASP.NET Core

- ASP.NET 8.0 またはそれ以降

## Reveal SDK 基本の要件

Reveal SDK AI は基本の Reveal SDK を拡張するため、標準の Reveal SDK 要件も満たす必要があります:

- 有効な Reveal SDK ライセンス
- Reveal SDK Web (JavaScript) パッケージ
- Reveal.Sdk.AspNetCore パッケージ (互換性のあるバージョン)

### TypeScript サポート

- TypeScript 5.0+ (完全な型安全性のため)
- SDK は TypeScript で記述されており、完全な型定義を提供します

## 次の手順

環境がこれらの要件を満たしていることを確認したら:

1. [サーバー SDK のインストール](install-server-sdk.md) - バックエンド コンポーネントをセットアップします
2. [クライアント SDK のインストール](install-client-sdk.md) - アプリケーションに JavaScript パッケージを追加します

