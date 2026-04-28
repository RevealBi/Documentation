---
sidebar_label: システム要件
---


# システム要件

Reveal SDK AI 機能を使用するには、以下の前提条件が必要です：

## クライアント SDK の要件

### ウェブブラウザー

Reveal SDK AI クライアントは、以下をサポートするモダンなウェブブラウザーで動作します：

- ES2020 JavaScript 機能
- Async/Await
- Fetch API
- Server-Sent Events (SSE)

**サポートされているブラウザー：**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### JavaScript フレームワーク（オプション）

クライアント SDK はバニラ JavaScript でも動作しますが、以下のフレームワークとシームレスに統合できます：

- Angular 15+
- React 18+
- Vue 3+
- またはその他のモダンな JavaScript フレームワーク

## サーバー SDK の要件

### ASP.NET Core

- ASP.NET 8.0 以上

## Reveal SDK の基本要件

Reveal SDK AI はベースの Reveal SDK を拡張するものであるため、標準的な Reveal SDK の要件も満たす必要があります：

- 有効な Reveal SDK ライセンス
- Reveal SDK Web (JavaScript) パッケージ
- Reveal.Sdk.AspNetCore パッケージ（互換性のあるバージョン）

### TypeScript サポート

- TypeScript 5.0+（完全な型安全性を実現するため）
- SDK は TypeScript で記述されており、完全な型定義を提供します

## 次のステップ

お使いの環境がこれらの要件を満たしていることを確認したら：

1. [サーバー SDK のインストール](install-server-sdk.md) - バックエンドコンポーネントをセットアップします
2. [クライアント SDK のインストール](install-client-sdk.md) - JavaScript パッケージをアプリケーションに追加します
