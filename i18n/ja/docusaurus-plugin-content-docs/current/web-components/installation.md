# インストール

CDN を使用する場合でも、ローカルにインストールする場合でも、Reveal SDK Web Components をプロジェクトに簡単に統合できます。React、Vue、Angular などのフレームワークとの統合に関する具体的なガイダンスについては、専用のページを参照してください。

## 依存関係

Reveal SDK Web Components は、既存の jQuery ベースのコンポーネントのラッパーとして構築されています。正しく機能するには、以下の依存関係を含める必要があります:

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1.8.21/dayjs.min.js"></script>
<script src="https://dl.revealbi.io/reveal/libs/[var:sdkVersion]/infragistics.reveal.js"></script>
```

Reveal SDK のインストールの詳細については、[公式ドキュメント](../web/install-client-sdk.md)を参照してください。

## CDN のインストール

CDN を使用して Reveal SDK Web Components をすぐに開始するには、いかの手順に従います:

### スタイルシートの追加

HTML ファイルに Reveal SDK テーマのスタイルシートを含めます:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@revealbi/ui/themes/light.css">
```

### 構成

`serverUrl` プロパティを設定して、Reveal SDK 設定を構成します。これはスクリプト ブロックで実行できます。

```html
<script type="module">
    import { RevealSdkSettings } from "https://cdn.jsdelivr.net/npm/@revealbi/ui";

    // Change to your Reveal SDK server URL
    RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
</script>
```

## NPM のインストール

ローカル インストールを希望する場合は、npm 経由で Reveal SDK Web Components をインストールできます:

```bash npm2yarn
npm install @revealbi/ui
```

### 構成

インストール後、JavaScript または TypeScript ファイルで `RevealSdkSettings.serverUrl` プロパティを構成します:

```ts
import { RevealSdkSettings } from "@revealbi/ui";

// Change to your Reveal SDK server URL
RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
```

### スタイル設定

Reveal SDK テーマの CSS をメイン スタイルシートにインポートします:

```css
@import "@revealbi/ui/themes/light.css";

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
```

以下の手順を実行すると、Reveal SDK Web Components がプロジェクトに正常に統合されます。Reveal SDK の強力なデータ表示形式機能を活用して、アプリケーションを強化しましょう。その他のコンポーネントと機能を調べて、豊かでインタラクティブなユーザー エクスペリエンスを作成します。