import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BetaWarning from './_beta-message.md'

# インストール

<BetaWarning />

Reveal SDK Web Component ラッパーをプロジェクトに統合するのは簡単です。シンプルなセットアップのために CDN を使用する場合でも、npm 経由でローカルにインストールする場合でも、ニーズに応じた方法をご用意しています。React、Vue、Angular など特定のフレームワークを使用している場合は、それぞれの統合ガイドをご参照ください。

## 前提条件

Reveal SDK Web Component ラッパーが正しく機能するには、Reveal SDK クライアント ライブラリをインストールする必要があります。Reveal SDK Web Component ラッパーは既存の jQuery ベースの RevealView を中心に構築されるため、これらの依存関係は不可欠です。

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1.8.21/dayjs.min.js"></script>
<script src="https://dl.revealbi.io/reveal/libs/[var:sdkVersion]/infragistics.reveal.js"></script>
<script>
    // Change to your Reveal SDK server URL
    $.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
</script>
```

Reveal SDK の設定の詳細については、[インストール ドキュメント](../install-client-sdk.md)を参照してください。

## CDN のインストール

もっとも簡単な導入方法として、CDN を使用することができます。Reveal SDK Web Component ラッパーを HTML に直接読み込むだけで利用可能です。

```html
<script src="https://cdn.jsdelivr.net/npm/reveal-sdk-wrappers/index.umd.min.js"></script>
```

## NPM のインストール

ローカルでのインストールやバージョン管理を行いたい場合は、npm 経由で Reveal SDK Web Component ラッパーを導入できます。

### 手順 1: パッケージのインストール
Web Component ラッパーをインストールするには、プロジェクト ディレクトリで次のコマンドを実行します。
```bash npm2yarn
npm install reveal-sdk-wrappers
```

### 手順 2: コンポーネントの登録
インストール後、Web Components をアプリケーションに登録する必要があります。デフォルトでは、すべての Reveal SDK Web Component ラッパーがグローバルに登録され、個別のインポートなしに使用できます。
```js
import { defineRevealSdkWrappers } from "reveal-sdk-wrappers";
defineRevealSdkWrappers();
```

### 手順 3: バンドル サイズの最適化 (オプション)
特定のコンポーネントのみをインポートしてバンドル サイズを最適化したい場合は、必要に応じて個々のコンポーネントを登録できます。
```js
import { defineRevealSdkWrappers, RvRevealView } from "reveal-sdk-wrappers";
defineRevealSdkWrappers(RvRevealView);
```

## コンポーネントの追加

`rv-reveal-view `コンポーネントの使用を開始するには、これを HTML に含めます。
```html
<rv-reveal-view></rv-reveal-view>
```

以上の手順に従うことで、Reveal SDK Web Component ラッパーをプロジェクトに統合し、強力なデータ可視化やインタラクティブなダッシュボード機能をすぐに利用できるようになります。SDK の豊富なコンポーネントやカスタマイズ オプションを活用して、ユーザーにとって魅力的でシームレスな体験を提供しましょう。
