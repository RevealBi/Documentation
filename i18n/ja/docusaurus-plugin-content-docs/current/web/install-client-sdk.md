# Client SDK のインストール

Reveal SDK クライアントは、npm パッケージおよびブラウザーで直接使用できる JavaScript ファイルとして提供されています。JavaScript ツールチェーンを使用するアプリケーションでは npm を使用します。ブラウザーからすばやく読み込む場合は npm CDN プロバイダーを使用します。SDK を自分のアプリケーションから配信したい場合は、JavaScript ファイルをダウンロードしてホストします。

## npm からインストールする

Vite、Webpack、Angular、React、Vue などのバンドラーまたはフレームワークを使用してアプリケーションをビルドする場合は、`reveal-sdk` パッケージをインストールします。

```bash npm2yarn
npm install reveal-sdk
```

`reveal-sdk` から必要な SDK メンバーをインポートします。

```ts
import { RevealView, RevealSdkSettings, RVDashboard } from "reveal-sdk";

RevealSdkSettings.setBaseUrl("http://localhost:5111/");

RVDashboard.loadDashboard("Sales").then(dashboard => {
    const revealView = new RevealView("#revealView");
    revealView.dashboard = dashboard;
});
```

ページまたはコンポーネント テンプレートに Reveal ビューのホスト要素を追加します。

```html
<div id="revealView" style="height: 600px;"></div>
```

## CDN を使用する

Reveal SDK クライアントは npm に公開されているため、jsDelivr、unpkg、esm.sh、JSPM などの npm CDN プロバイダーからブラウザー用バンドルを読み込むことができます。このトピックの例では jsDelivr を使用していますが、URL 形式やキャッシュ動作に応じて別のプロバイダーから同じパッケージを読み込むこともできます。

:::tip バージョン指定 URL

次の例では、jsDelivr から公開済みの最新 `reveal-sdk` パッケージを読み込みます。本番アプリケーションでは、`https://cdn.jsdelivr.net/npm/reveal-sdk@2.0.0/dist/reveal-sdk.esm.js` のように特定のバージョンを指定するか、使用する npm CDN プロバイダーの同等のバージョン指定 URL を使用するか、ファイルを自分でホストしてください。

:::

### IIFE

JavaScript モジュールではなく標準の script タグを使用するページでは、IIFE バンドルを使用します。

```html
<div id="revealView" style="height: 600px;"></div>

<script src="https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.js"></script>
<script>
    Reveal.RevealSdkSettings.setBaseUrl("http://localhost:5111/");

    Reveal.RVDashboard.loadDashboard("Sales").then(dashboard => {
        const revealView = new Reveal.RevealView("#revealView");
        revealView.dashboard = dashboard;
    });
</script>
```

IIFE バンドルでは、グローバル `Reveal` オブジェクトから SDK が公開されます。

### ESM

ブラウザーのネイティブ モジュールを使用し、明示的にインポートしたいページでは、ESM バンドルを使用します。

```html
<div id="revealView" style="height: 600px;"></div>

<script type="module">
    import { RevealView, RevealSdkSettings, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";

    RevealSdkSettings.setBaseUrl("http://localhost:5111/");

    RVDashboard.loadDashboard("Sales").then(dashboard => {
        const revealView = new RevealView("#revealView");
        revealView.dashboard = dashboard;
    });
</script>
```

## JavaScript ファイルを自分でホストする

npm または CDN を使用できない場合は、Reveal SDK JavaScript ディストリビューションをダウンロードし、自分のアプリケーションからファイルを配信します。

https://dl.revealbi.io/reveal/libs/[var:sdkVersion]/reveal-sdk-distribution-js.zip

1. クライアント アプリケーションに Reveal アセット用のフォルダーを作成します。たとえば、`assets/reveal` を作成します。

2. ダウンロードしたディストリビューションから JavaScript ファイルを `assets/reveal` フォルダーにコピーします。

3. `RevealView` を作成するコードの前に SDK スクリプトをページへ追加します。

```html
<script src="./assets/reveal/reveal-sdk.js"></script>
```

ESM ビルドを自分でホストする場合は、コピーしたファイルのパスからインポートします。

```html
<script type="module">
    import { RevealView, RevealSdkSettings, RVDashboard } from "./assets/reveal/reveal-sdk.esm.js";

    RevealSdkSettings.setBaseUrl("http://localhost:5111/");

    RVDashboard.loadDashboard("Sales").then(dashboard => {
        const revealView = new RevealView("#revealView");
        revealView.dashboard = dashboard;
    });
</script>
```

## サーバー URL を構成する

Reveal SDK サーバーがクライアント アプリケーションとは異なる URL でホストされている場合は、`RevealSdkSettings.setBaseUrl` を呼び出します。この設定は、ダッシュボードを読み込む前、またはサーバー要求を行う SDK リソースを作成する前に 1 回だけ行う必要があります。

```ts
RevealSdkSettings.setBaseUrl("http://localhost:5111/");
```

## ESM を使用した完全な HTML の例

次の例は、jsDelivr から Reveal SDK クライアントを読み込み、Reveal SDK サーバー URL を構成し、`Sales` ダッシュボードを表示する完全な HTML ページです。

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal SDK - HTML/JavaScript</title>
    <style>
        html,
        body,
        #revealView {
            width: 100%;
            height: 100%;
            margin: 0;
        }
    </style>
</head>
<body>
    <div id="revealView"></div>

    <script type="module">
        import { RevealView, RevealSdkSettings, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";

        RevealSdkSettings.setBaseUrl("http://localhost:5111/");

        RVDashboard.loadDashboard("Sales").then(dashboard => {
            const revealView = new RevealView("#revealView");
            revealView.dashboard = dashboard;
        });
    </script>
</body>
</html>
```
