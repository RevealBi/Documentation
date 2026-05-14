import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Angular での Reveal SDK のインストール

## ステップ 1: パッケージをインストールする

<Tabs groupId="package-manager">
  <TabItem value="npm" label="npm" default>

```bash
npm install reveal-sdk
```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

```bash
yarn add reveal-sdk
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add reveal-sdk
```

  </TabItem>
  <TabItem value="bun" label="Bun">

```bash
bun add reveal-sdk
```

  </TabItem>
</Tabs>

## ステップ 2: モジュール セットアップ

特別な Angular モジュールは必要ありません。コンポーネント内で Reveal SDK クラスを直接インポートするだけです。

Angular の厳密なテンプレート チェックを使用している場合は、モジュールに `CUSTOM_ELEMENTS_SCHEMA` を追加する必要があります:

```ts title="src/app/app.module.ts"
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## ステップ 3: Reveal View を使用する

### HTML

コンポーネント テンプレートに Reveal View のコンテナー要素を追加します:

```html title="src/app/app.component.html"
<div #revealView style="height: 100vh; width: 100%; position:relative;"></div>
```

### TypeScript

Reveal SDK をインポートし、サーバー URL を設定し、`ngAfterViewInit` ライフサイクル フックで `RevealView` インスタンスを作成します:

```ts title="src/app/app.component.ts"
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RevealView, RevealSdkSettings } from 'reveal-sdk';

RevealSdkSettings.setBaseUrl('http://localhost:5111');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('revealView') el!: ElementRef;

  ngAfterViewInit(): void {
    new RevealView(this.el.nativeElement);
  }

}
```

:::tip

`RevealView` コンストラクターはネイティブ DOM 要素または CSS セレクター文字列を受け入れます。Angular では、`@ViewChild` と `ElementRef` を使用してコンテナー要素への参照を取得することが推奨されます。

:::

## ステップ 4: ローカライズ (オプション)

Reveal SDK は組み込みのロケール バンドルをサポートしています。UI 言語をオーバーライドするには、ロケール バンドルを登録し、`RevealView` を作成する前に `overrideLocale` を呼び出します。

以下の例は、スタンドアロン コンポーネント アプローチを使用して日本語ロケールをロードします:

```ts title="src/app/app.component.ts"
import { AfterViewInit, Component } from '@angular/core';
import { BuiltInLocales, RevealSdkSettings, RevealView } from 'reveal-sdk';
import jaLocale from 'reveal-sdk/locales/RevealResourcesJa.json';

RevealSdkSettings.setBaseUrl('http://localhost:5111');

RevealSdkSettings.registerLocaleBundle(
  BuiltInLocales.Ja,
  () => Promise.resolve(jaLocale as any),
);

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<div id="revealView" style="height: 100vh; width: 100%; position: relative;"></div>`,
})
export class AppComponent implements AfterViewInit {
  async ngAfterViewInit(): Promise<void> {
    await RevealSdkSettings.overrideLocale(BuiltInLocales.Ja);
    new RevealView('#revealView');
  }
}
```

:::note

`registerLocaleBundle` は `overrideLocale` の **前に** 呼び出す必要があります。クラスの外部 (モジュール レベル) で呼び出し、コンポーネントが初期化される前に実行されるようにします。

:::
