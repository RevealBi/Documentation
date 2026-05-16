import BetaWarning from './_beta-message.md'

# Angular に Reveal SDK Web Component ラッパーをインストールする

<BetaWarning />

Reveal SDK Web Web Component ラッパーを Angular アプリケーションに統合するのは簡単でシームレスです。開始するには以下の手順に従ってください:

## インストール

Reveal SDK Web Components を Angular アプリに追加するには、npm から必要なパッケージをインストールします:

```bash npm2yarn
npm install reveal-sdk-wrappers-angular
```

## モジュールのセットアップ

`RevealViewComponent` をインポートして、アプリケーション内のスタンドアロン コンポーネントとして使用します。以下のインポートをアプリケーションのモジュールに追加します:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
//highlight-next-line
import { RevealViewComponent } from 'reveal-sdk-wrappers-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    //highlight-next-line
    RevealViewComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Reveal SDK Web Components の使用

これで、Angular アプリケーションで Reveal SDK Web Component ラッパーを使用する準備が整いました。

:::note
Reveal SDK Angular Web Component ラッパー内のすべてのコンポーネントは、`rva` プレフィックスを使用します。テンプレートにコンポーネントを追加するときは、必ずこのプレフィックスを使用してください。
:::

### HTML

Reveal SDK Web コンポーネントをテンプレートに追加します:

```html
<rva-reveal-view [dashboard]="dashboard"></<rva-reveal-view>
```

### TypeScript

コンポーネント クラスから読み込むダッシュボードを制御します。

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dashboard: string = "Sales";
}
```

これらの手順により、Reveal SDK Web Component ラッパーが Angular アプリケーションに正常に統合されました。プロジェクトで Reveal の強力なデータ表示形式機能を最大限に活用できるようになりました。その他のコンポーネントと機能を調べて、豊かでインタラクティブなユーザー エクスペリエンスを作成します。