# Reveal SDK for React で作業を開始

## 手順 1 - React アプリの作成

1 - お気に入りのターミナルを開きます。

![](images/getting-started-angular-terminal.jpg)

2 - 「create-react-app」コマンドを使用して新しい React アプリケーションを作成します。

```bash
npx create-react-app getting-started --template typescript
```

3 - ディレクトリを新しく作成した app ディレクトリに移動し、お気に入りのエディターでプロジェクトを開きます。この例では、Visual Studio Code を使用しています。

```bash
cd getting-started
code .
```

## 手順 2 - Reveal JavaScript API の追加

1 - `public/index.html` ファイルを開いて変更し、ページの下部に (`</body>` 終了タグの直前) `infragistics.reveal.js` スクリプトを含めます。

```html
<script src="https://dl.revealbi.io/reveal/libs/[var:sdkVersion]/infragistics.reveal.js"></script>
```

2 - 残りの Reveal JavaScript API 依存関係をインストールします。

- Day.js 1.8.15 またはそれ以降

```html
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

最終の `index.html` ファイルは以下のようになります。

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
    //highlight-start
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
    <script src="https://dl.revealbi.io/reveal/libs/[var:sdkVersion]/infragistics.reveal.js"></script>
    //highlight-end
  </body>
</html>
```

## 手順 3 - Reveal ビューの初期化

1 - `src/app.tsx` ファイルを開いて変更します。`return` ステートメント内のすべてのコンテンツを削除し、新しい `<div>` タグを追加し、`id` を `revealView` に設定します。

```ts title="src/app.tsx"
function App() {
  return (
    //highlight-next-line
    <div id="revealView" style={{height: "100vh", width: "100%"}}></div>
  );
}
```

2 - 最初に、import ステートメントの下のファイルの先頭で、タイプ `any` の `$` という名前の新しい変数を宣言することによって、jQuery を使用できることを確認する必要があります。これにより、TypeScript が JavaScript をコンパイルします。

```ts
declare let $: any;
```

3 - `App()` 関数コンポーネント内で、`revealView` を初期化します。

```ts
useEffect(() => {
  //highlight-next-line
  var revealView = new $.ig.RevealView("#revealView");
}, [])
```

この JavaScript コードは、`useEffect` フックを使用して、コードが一度だけ呼び出されるようにします。次に、新しい `$.ig.RevealView` を作成し、`#revealView` セレクターを渡すことで、`RevealView` の新しいインスタンスを作成します。

最終の `app.tsx` ファイルは以下のようになります。

```ts title="src/app.tsx"
import React, { useEffect } from 'react';
import './App.css';

//highlight-next-line
declare let $: any;

function App() {
  
  useEffect(() => {
    //highlight-next-line
    var revealView = new $.ig.RevealView("#revealView");
  }, [])

  return (
    //highlight-next-line
    <div id="revealView" style={{height: "100vh", width: "100%"}}></div>
  );
}

export default App;
```

:::caution

クライアント アプリは、クライアントが別の URL でホストしている場合、`$.ig.RevealSdkSettings.setBaseUrl("url-to-server");` をダッシュボードをホストしているサーバー アドレスに設定する必要があります。

:::

## 手順 4 - アプリケーションの実行

Visual Studio Code ターミナルで、`npm start` コマンドを入力します。

```bash npm2yarn
npm start
```

![](images/angular-app-running.jpg)

完了しました! 最初の Reveal SDK React アプリケーションを作成しました。

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/client/react) にあります。

:::
