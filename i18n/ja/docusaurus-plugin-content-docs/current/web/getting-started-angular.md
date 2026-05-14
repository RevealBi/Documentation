# Reveal SDK for Angular で作業を開始

このウォークスルーでは、Angular アプリケーションに Reveal ダッシュボードを表示する方法を示します。Angular アプリケーションにはすでにビルド パイプラインがあるため、Reveal SDK クライアントを npm からインストールし、SDK メンバーをコンポーネントで直接インポートする方法を推奨します。

## 前提条件

開始する前に、次のものが用意されていることを確認してください。

- Node.js と npm がインストールされていること。
- Angular CLI がインストールされていること。
- `Sales` という名前のダッシュボードを含む Reveal SDK サーバーが実行されていること。

このトピックの例では、Reveal SDK サーバー URL として `http://localhost:5111/` を使用します。この値はアプリケーションに合わせて変更してください。

## 手順 1 - Angular アプリを作成する

Angular CLI を使用して新しい Angular アプリケーションを作成します。

```bash
ng new getting-started --routing=false --style=css
```

新しいアプリケーション フォルダーに移動します。

```bash
cd getting-started
```

既存の Angular アプリケーションに Reveal SDK を追加する場合は、この手順をスキップできます。

## 手順 2 - Reveal SDK クライアントをインストールする

`reveal-sdk` パッケージをインストールします。

```bash npm2yarn
npm install reveal-sdk
```

`index.html` に Reveal SDK の script タグを追加する必要はありません。また、jQuery、Day.js、Spectrum も必要ありません。

## 手順 3 - RevealView のホスト要素を追加する

`src/app/app.component.html` を開き、生成されたプレースホルダー マークアップを削除して、Reveal ビュー用の要素を追加します。

```html title="src/app/app.component.html"
<div #revealView class="reveal-view"></div>
```

`#revealView` テンプレート参照により、Angular コンポーネントはダッシュボードが描画される DOM 要素にアクセスできます。

次に、`src/app/app.component.css` を開き、ホスト要素に表示可能なサイズを設定します。

```css title="src/app/app.component.css"
:host {
    display: block;
    height: 100vh;
}

.reveal-view {
    width: 100%;
    height: 100%;
}
```

Reveal ダッシュボードには高さを持つコンテナーが必要です。この例では、コンポーネントがブラウザーのビューポート全体を埋めます。

## 手順 4 - RevealView を作成する

`src/app/app.component.ts` を開き、Angular のライフサイクル メンバーと Reveal SDK メンバーをインポートします。

`ViewChild` を使用して、Angular がビューを作成した後にホスト要素を取得します。次に、`ngAfterViewInit` で Reveal SDK サーバー URL を構成し、`Sales` ダッシュボードを読み込み、`RevealView` を作成してダッシュボードを割り当てます。

```ts title="src/app/app.component.ts"
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RevealSdkSettings, RevealView, RVDashboard } from 'reveal-sdk';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('revealView') revealViewElement!: ElementRef<HTMLElement>;

    private revealView?: RevealView;

    async ngAfterViewInit(): Promise<void> {
        RevealSdkSettings.setBaseUrl("http://localhost:5111/");

        const dashboard = await RVDashboard.loadDashboard("Sales");
        this.revealView = new RevealView(this.revealViewElement.nativeElement);
        this.revealView.dashboard = dashboard;
    }
}
```

Angular のバージョンによっては、生成されたコンポーネントが `styleUrls` ではなく `styleUrl` を使用している場合があります。プロジェクトで生成されたスタイル メタデータはそのまま使用できます。重要なのは、Reveal SDK のインポート、`ViewChild`、および `ngAfterViewInit` のコードです。

Reveal SDK サーバーが Angular アプリケーションとは異なる URL でホストされている場合は、`RevealSdkSettings.setBaseUrl` を呼び出します。クライアントとサーバーが同じオリジンでホストされている場合は、この呼び出しを省略できます。

## 手順 5 - アプリケーションを実行する

Angular 開発サーバーを起動します。

```bash npm2yarn
npm start
```

ブラウザーで `http://localhost:4200` を開きます。アプリケーションが読み込まれると、Angular コンポーネントは `RevealView` を作成し、Reveal SDK サーバーから `Sales` ダッシュボードを読み込み、ホスト要素内に描画します。

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/client/angular) にあります。

:::
