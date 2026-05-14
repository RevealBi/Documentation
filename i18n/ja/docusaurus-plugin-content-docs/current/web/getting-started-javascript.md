# Reveal SDK for HTML/JavaScript で作業を開始

このウォークスルーでは、Reveal ダッシュボードを表示するシンプルな HTML ページを作成します。npm CDN プロバイダーから Reveal SDK の ESM バンドルを読み込むため、ビルド手順、バンドラー、フレームワークは必要ありません。

## 前提条件

開始する前に、Reveal SDK サーバーが実行されており、そのサーバーで `Sales` という名前のダッシュボードを使用できることを確認してください。このトピックの例では、サーバー URL として `http://localhost:5111/` を使用します。この値はアプリケーションに合わせて変更してください。

## 手順 1 - HTML ページを作成する

`index.html` という名前のファイルを作成し、次の HTML を追加します。`revealView` 要素は、Reveal ダッシュボードが描画されるコンテナーです。

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
</body>
</html>
```

`RevealView` には表示可能な高さが必要です。この例では、ページと `#revealView` 要素がブラウザー ウィンドウ全体を埋めるように設定しています。

## 手順 2 - Reveal SDK をインポートする

終了 `</body>` タグの前に `<script type="module">` ブロックを追加し、ESM バンドルから必要な SDK メンバーをインポートします。

```html
<script type="module">
    import { RevealView, RevealSdkSettings, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";
</script>
```

この例では jsDelivr を使用していますが、別の npm CDN プロバイダーを使用することも、SDK ファイルを自分でホストすることもできます。

## 手順 3 - サーバー URL を構成する

モジュール スクリプト内で、ダッシュボードを読み込む前に `RevealSdkSettings.setBaseUrl` を呼び出します。これにより、Reveal SDK サーバー要求の送信先をクライアントに指定します。

```js
RevealSdkSettings.setBaseUrl("http://localhost:5111/");
```

クライアント アプリケーションと Reveal SDK サーバーが同じオリジンでホストされている場合、`setBaseUrl` を呼び出す必要はありません。

## 手順 4 - RevealView を作成する

サーバーからダッシュボードを読み込み、`RevealView` を作成して、そのダッシュボードを割り当てます。

```js
RVDashboard.loadDashboard("Sales").then(dashboard => {
    const revealView = new RevealView("#revealView");
    revealView.dashboard = dashboard;
});
```

`RevealView` に渡すセレクターは、ページに追加したホスト要素と一致している必要があります。

## 完全な例

完成した `index.html` は次のようになります。

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

## 手順 5 - アプリケーションを実行する

`index.html` を含むフォルダーを任意のローカル静的 Web サーバーで配信し、ブラウザーでページを開きます。ブラウザーが ES モジュールを読み込み、Reveal SDK サーバーへ要求を送信するため、ファイルを直接開くよりも `localhost` から実行する方が安定します。

ページが読み込まれると、Reveal SDK クライアントは Reveal SDK サーバーから `Sales` ダッシュボードを要求し、`RevealView` 内に描画します。

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/client/html) にあります。

:::
