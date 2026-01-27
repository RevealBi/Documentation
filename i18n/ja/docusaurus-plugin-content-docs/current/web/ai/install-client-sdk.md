---
sidebar_label: クライアント SDK のインストール
---

import BetaWarning from './_beta-message.md'

<BetaWarning />

# AI クライアント SDK のインストール

Reveal SDK AI クライアントは、Web アプリケーションに AI 機能を提供する TypeScript/JavaScript ライブラリです。基本の Reveal SDK と連携して、インサイト、ダッシュボード生成、会話型 AI などのインテリジェントな機能を追加します。

## 前提条件

AI クライアント SDK をインストールする前に、以下を確認してください:

1. 基本の [Reveal SDK サーバー](../install-server-sdk.md)がインストールされ、設定されていること
2. [Reveal SDK AI サーバー](install-server-sdk.md)がインストールされ、設定されていること
3. Node.js 18+ および npm 9+ がインストールされていること (パッケージベースのインストールの場合)

## インストール方法

### npm を使用してインストール (推奨)

AI クライアント SDK をインストールする推奨方法は npm を使用することです:

```bash npm2yarn
npm install @revealbi/api
```

### CDN を使用してインストール

迅速なプロトタイピングとデモのために、unpkg CDN を使用できます:

```html
<script src="https://unpkg.com/@revealbi/api/dist/index.umd.js"></script>
```

または jsDelivr を使用:

```html
<script src="https://cdn.jsdelivr.net/npm/@revealbi/api/dist/index.umd.js"></script>
```

## TypeScript サポート

AI クライアント SDK は TypeScript で記述されており、完全な型定義が含まれています。追加の `@types` パッケージは必要ありません。

## フレームワーク固有のセットアップ

### 素の JavaScript

#### ES モジュールの使用

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

#### UMD バンドルの使用

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

`main.ts` ファイルで、アプリケーションをブートストラップする前に初期化します:

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

`index.tsx` または `main.tsx` ファイルで、レンダリングする前に初期化します:

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

`main.ts` ファイルで、アプリケーションをマウントする前に初期化します:

```typescript
import { createApp } from 'vue';
import { RevealSdkClient } from '@revealbi/api';
import App from './App.vue';

RevealSdkClient.initialize({
  hostUrl: 'https://your-server.com'
});

createApp(App).mount('#app');
```
