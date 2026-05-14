# Reveal SDK for React で作業を開始

このウォークスルーでは、React アプリケーションに Reveal ダッシュボードを表示する方法を示します。React アプリケーションにはすでにビルド パイプラインがあるため、Reveal SDK クライアントを npm からインストールし、SDK メンバーをコンポーネントで直接インポートする方法を推奨します。

## 前提条件

開始する前に、次のものが用意されていることを確認してください。

- Node.js と npm がインストールされていること。
- `Sales` という名前のダッシュボードを含む Reveal SDK サーバーが実行されていること。

このトピックの例では、Reveal SDK サーバー URL として `http://localhost:5111/` を使用します。この値はアプリケーションに合わせて変更してください。

## 手順 1 - React アプリを作成する

Vite を使用して新しい React アプリケーションを作成します。

```bash
npm create vite@latest getting-started -- --template react-ts
```

新しいアプリケーション フォルダーに移動し、依存関係をインストールします。

```bash
cd getting-started
npm install
```

既存の React アプリケーションに Reveal SDK を追加する場合は、この手順をスキップできます。

## 手順 2 - Reveal SDK クライアントをインストールする

`reveal-sdk` パッケージをインストールします。

```bash npm2yarn
npm install reveal-sdk
```

`index.html` に Reveal SDK の script タグを追加する必要はありません。また、jQuery、Day.js、Spectrum も必要ありません。

## 手順 3 - RevealView コンポーネントを追加する

`src/App.tsx` を開き、生成されたコードを次のコンポーネントに置き換えます。

```tsx title="src/App.tsx"
import { useEffect, useRef } from "react";
import { RevealSdkSettings, RevealView, RVDashboard } from "reveal-sdk";
import "./App.css";

function App() {
    const revealViewElement = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (!revealViewElement.current || initialized.current) {
            return;
        }

        initialized.current = true;

        RevealSdkSettings.setBaseUrl("http://localhost:5111/");

        RVDashboard.loadDashboard("Sales").then(dashboard => {
            if (!revealViewElement.current) {
                return;
            }

            const revealView = new RevealView(revealViewElement.current);
            revealView.dashboard = dashboard;
        });
    }, []);

    return <div ref={revealViewElement} className="reveal-view" />;
}

export default App;
```

`useRef` フックにより、Reveal SDK はダッシュボードが描画される DOM 要素にアクセスできます。`useEffect` フックは React が要素を描画した後に実行されるため、このタイミングで安全に `RevealView` を作成できます。

`initialized` ref は、React の開発時レンダリングでダッシュボードが複数回初期化されることを防ぎます。これは、アプリケーションが `React.StrictMode` 内で実行されている場合に便利です。

Reveal SDK サーバーが React アプリケーションとは異なる URL でホストされている場合は、`RevealSdkSettings.setBaseUrl` を呼び出します。クライアントとサーバーが同じオリジンでホストされている場合は、この呼び出しを省略できます。

## 手順 4 - RevealView のサイズを設定する

`src/App.css` を開き、生成されたスタイルを次の CSS に置き換えます。

```css title="src/App.css"
html,
body,
#root {
    width: 100%;
    height: 100%;
    margin: 0;
}

body {
    display: block;
}

.reveal-view {
    width: 100%;
    height: 100%;
}
```

Reveal ダッシュボードには高さを持つコンテナーが必要です。この例では、React アプリケーションと Reveal ビューがブラウザー ウィンドウ全体を埋めます。

## 手順 5 - アプリケーションを実行する

Vite 開発サーバーを起動します。

```bash npm2yarn
npm run dev
```

ターミナルに表示されるローカル URL を開きます。通常は `http://localhost:5173` です。アプリケーションが読み込まれると、React コンポーネントは `RevealView` を作成し、Reveal SDK サーバーから `Sales` ダッシュボードを読み込み、ホスト要素内に描画します。

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/client/react) にあります。

:::
