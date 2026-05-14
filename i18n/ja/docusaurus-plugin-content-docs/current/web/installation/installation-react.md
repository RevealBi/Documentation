import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# React での Reveal SDK のインストール

## ステップ 1: パッケージをインストールする

<Tabs groupId="package-manager">
  <TabItem value="npm" label="npm" default>

```bash
npm install reveal-sdk
```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

```bash
yarn add reveal-sdk
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add reveal-sdk
```

  </TabItem>
  <TabItem value="bun" label="Bun">

```bash
bun add reveal-sdk
```

  </TabItem>
</Tabs>

## ステップ 2: Reveal View を使用する

Reveal SDK をインポートし、サーバー URL を構成して、`useEffect` フック内で `RevealView` インスタンスを作成します:

```tsx title="src/App.tsx"
import React, { useEffect } from 'react';
import { RevealView, RevealSdkSettings } from 'reveal-sdk';

RevealSdkSettings.setBaseUrl("http://localhost:5111/");

function App() {

  useEffect(() => {
    new RevealView("#revealView");
  }, [])

  return (
    <div id="revealView" style={{height: "100vh", width: "100%"}}></div>
  );
}

export default App;
```

:::tip

`RevealView` は、空の依存配列を持つ `useEffect` 内で初期化され、コンポーネントがマウントされ、DOM 要素が利用可能になった後に 1 回実行されます。`RevealView` コンストラクターは、CSS セレクター文字列またはネイティブ DOM 要素を受け入れます。

:::
