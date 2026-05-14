import BetaWarning from './_beta-message.md'

# React に Reveal SDK Web Component ラッパーをインストールする

<BetaWarning />

Reveal SDK Web Component ラッパーは、React 開発者にとって自然な体験を保証するため、各コンポーネントの React 対応バージョンを提供しています。ドキュメント全体を通して HTML と React の例を簡単に切り替えることができます。

## インストール

React アプリに Reveal SDK Web Component ラッパーを追加するには、npm から必要なパッケージをインストールします:

```bash npm2yarn
npm install reveal-sdk-wrappers-react
```

## Reveal SDK Web Components の使用

すべてのセットアップが完了したら、React アプリケーション内で Reveal SDK Web Component ラッパーを使用できるようになります。以下は、RvRevealView コンポーネントを統合する例です。

```tsx
import React from 'react';
import { RvRevealView } from 'reveal-sdk-wrappers-react';

function App() {
  return (
    <div>
      <RvRevealView dashboard="Sales"></RvRevealView>
    </div>
  );
}

export default App;
```

これらの手順により、Reveal SDK Web Component ラッパーを React アプリケーションに正常に統合できました。これで、Reveal の強力なデータ表示形式機能を活用してプロジェクトを強化できるようになりました。その他のコンポーネントと機能を調べて、豊かでインタラクティブなユーザー エクスペリエンスを作成します。