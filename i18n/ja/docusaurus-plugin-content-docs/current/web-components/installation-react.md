# React に Reveal SDK Web Components をインストールする

Reveal SDK は、React 開発者にとって自然な体験を保証するため、各コンポーネントの React 対応バージョンを提供しています。ドキュメント全体を通して HTML と React の例を簡単に切り替えることができます。

## インストール

React アプリに Reveal SDK Web Components を追加するには、npm から必要なパッケージをインストールします:

```bash npm2yarn
npm install @revealbi/ui @revealbi/ui-react
```

## 構成

`RevealSdkSettings.serverUrl` プロパティを Reveal API サーバーを指すように設定します。この構成の一般的な場所は `index.tsx` ファイルです。

```tsx
import { RevealSdkSettings } from '@revealbi/ui';

RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
```

## スタイル設定

アプリケーションのメイン スタイルシートに Reveal SDK テーマをインポートします。これにより、Web コンポーネントに適切なスタイルが設定されます。

```css
@import "@revealbi/ui/themes/light.css";

html, body, #root {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
```

## Reveal SDK Web Components の使用

これで、React アプリケーションで Reveal SDK Web Components を使用する準備が整いました。以下は、ダイアログ コンポーネントを統合する方法の例です。

### コンポーネントのインポートと使用

すべての Reveal SDK Web コンポーネントは React コンポーネントとして利用できます。以下は `RvDialog` コンポーネントの使用例です:

```tsx
import React from 'react';
import { RvDialog } from '@revealbi/ui-react';

function App() {
  return (
    <div>
      <RvDialog title="My Dialog" open={true}>
        <p>Hello!</p>
      </RvDialog>
    </div>
  );
}

export default App;
```

これらの手順により、Reveal SDK Web Components が React アプリケーションに正常に統合されました。これで、Reveal の強力なデータ表示形式機能を活用してプロジェクトを強化できるようになりました。その他のコンポーネントと機能を調べて、豊かでインタラクティブなユーザー エクスペリエンスを作成します。