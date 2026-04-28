---
sidebar_label: クライアント SDK のインストール
---


# AI クライアント SDK のインストール

Reveal SDK AI クライアントは、ウェブアプリケーションに AI 機能を提供する TypeScript/JavaScript ライブラリです。ベースの Reveal SDK と連携して、インサイト、ダッシュボード生成、会話型 AI などのインテリジェントな機能を追加します。

## 前提条件

AI クライアント SDK をインストールする前に、以下を確認してください：

1. ベースの [Reveal SDK サーバー](/web/install-server-sdk) がインストールおよび設定済みであること
2. [Reveal SDK AI サーバー](install-server-sdk.md) がインストールおよび設定済みであること
3. Node.js 18+ および npm 9+ がインストール済みであること（パッケージベースのインストールの場合）

## インストール方法

### npm を使用したインストール（推奨）

AI クライアント SDK のインストールには npm の使用を推奨します：

```bash npm2yarn
npm install @revealbi/api
```

### CDN を使用したインストール

クイックプロトタイピングやデモ用には、unpkg CDN を使用できます：

```html
<script src="https://unpkg.com/@revealbi/api/dist/index.umd.js"></script>
```

または jsDelivr を使用する場合：

```html
<script src="https://cdn.jsdelivr.net/npm/@revealbi/api/dist/index.umd.js"></script>
```

## TypeScript サポート

AI クライアント SDK は TypeScript で記述されており、完全な型定義を含んでいます。追加の `@types` パッケージは必要ありません。

## フレームワーク別のセットアップ

### バニラ JavaScript

#### ES Modules を使用する場合

```html
<!DOCTYPE html>
<html>
<head>
  <title>Reveal AI</title>
</head>
<body>
  <div id="app"></div>

  <script type="module">
    import { RevealSdkClient } from 'https://unpkg.com/@revealbi/api/dist/index.js';

    RevealSdkClient.initialize({
      hostUrl: 'https://your-server.com'
    });
  </script>
</body>
</html>
```

#### UMD バンドルを使用する場合

```html
<!DOCTYPE html>
<html>
<head>
  <title>Reveal AI</title>
  <script src="https://cdn.jsdelivr.net/npm/@revealbi/api/dist/index.umd.min.js"></script>
</head>
<body>
  <div id="app"></div>

  <script type="text/javascript">
    rv.RevealSdkClient.initialize({
      hostUrl: 'https://your-server.com'
    });
  </script>
</body>
</html>
```

### Angular

`main.ts` ファイルで、アプリケーションのブートストラップ前に初期化します：

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RevealSdkClient } from '@revealbi/api';
import { AppModule } from './app/app.module';

RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com'
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

### React

`index.tsx` または `main.tsx` ファイルで、レンダリング前に初期化します：

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RevealSdkClient } from '@revealbi/api';
import App from './App';

RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Vue

`main.ts` ファイルで、アプリケーションのマウント前に初期化します：

```typescript
import { createApp } from 'vue';
import { RevealSdkClient } from '@revealbi/api';
import App from './App.vue';

RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com'
});

createApp(App).mount('#app');
```
