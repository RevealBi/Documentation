# Angular に Reveal SDK Web Components をインストールする

Reveal SDK Web Components を Angular アプリケーションに統合するのは簡単でシームレスです。開始するには以下の手順に従ってください:

## インストール

Reveal SDK Web Components を Angular アプリに追加するには、npm から必要なパッケージをインストールします:

```bash npm2yarn
npm install @revealbi/ui
```

## 構成

`RevealSdkSettings.serverUrl` プロパティを Reveal API サーバーを指すように設定します。この構成の一般的な場所は `main.ts` ファイルです。

```ts
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

## モジュールのセットアップ

Angular では、カスタム要素を認識するために `CUSTOM_ELEMENTS_SCHEMA` が必要です。以下のスキーマをアプリケーションのモジュールに追加します:

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

## Reveal SDK Web Components の使用

これで、Angular アプリケーションで Reveal SDK Web Components を使用する準備が整いました。以下は、ダイアログ コンポーネントを統合する方法の例です。

### HTML

Reveal SDK Web コンポーネントをテンプレートに追加します:

```html
<rv-dialog title="Example Dialog" [open]="isOpen">
  <h1>Dialog Content</h1>
</rv-dialog>
```

### TypeScript

ダイアログの状態をコンポーネント クラスから制御します:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpen: boolean = true;
}
```

これらの手順により、Reveal SDK Web Components が Angular アプリケーションに正常に統合されました。プロジェクトで Reveal の強力なデータ表示形式機能を最大限に活用できるようになりました。その他のコンポーネントと機能を調べて、豊かでインタラクティブなユーザー エクスペリエンスを作成します。