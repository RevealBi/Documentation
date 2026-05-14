import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Reveal SDK のインストール

Reveal SDK をプロジェクトに追加する方法は複数あります。セットアップに最適なアプローチを選択してください。

## CDN (スクリプトタグ)

Reveal SDK を HTML に直接含めるのが最も簡単な方法です:

```html
<script src="https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.js"></script>
```

## CDN (ESM)

バンドラーなしで ESM (ES モジュール) 構文を使用したい場合は、SDK をブラウザーでモジュールとして直接インポートできます:

```html
<script type="module">
    import { RevealView, RevealSdkSettings, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";

    RevealSdkSettings.setBaseUrl("http://localhost:5111/");

    RVDashboard.loadDashboard("Sales").then(dashboard => {
        const revealView = new RevealView("#revealView");
        revealView.dashboard = dashboard;
    });
</script>
```

このアプローチにより、ツリーシェイク可能な名前付きインポートが得られ、グローバル名前空間を汚染しません。

## NPM

ビルドパイプラインを備えた本番アプリケーションの場合は、Reveal SDK を npm パッケージとしてインストールします:

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

次に、必要なクラスをインポートします:

```js
import { RevealView, RevealSdkSettings, RVDashboard } from "reveal-sdk";
```

### フレームワーク固有のガイド

フレームワーク固有のセットアップ手順については、以下を参照してください:

- [Angular](installation-angular.md)
- [React](installation-react.md)

## クイック例 (HTML)

CDN を使用した Reveal SDK の完全な HTML ページの例を以下に示します:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal SDK</title>
</head>

<body>
    <div id="revealView" style="height: 100vh; width: 100%;"></div>

    <script src="https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.js"></script>

    <script type="text/javascript">
        Reveal.RevealSdkSettings.setBaseUrl("http://localhost:5111/");

        Reveal.RVDashboard.loadDashboard("Sales").then(dashboard => {
            const revealView = new Reveal.RevealView("#revealView");
            revealView.dashboard = dashboard;
        });
    </script>
</body>

</html>
```
