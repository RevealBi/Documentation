## ダッシュボードまたは画像として可視化データをエクスポート

### 概要

ダッシュボードまたは特定の可視化の画像を生成してそれをエクスポートする場合、以下の オプションがあります。

- **画像**として;
- **PDF** として;
- **PowerPoint** プレゼンテーションとして;
- **Excel** データ形式として  

ダッシュボードまたは視覚化を有効するには、次のことをします。

  - [$.ig.RevealView](#enable-export-revealview) でエクスポート設定を有効にする、あるいは

  - [$.ig.RevealView](#programmatically-initiated-export) 以外でコードによるエクスポートを開始

### 前提条件

サーバー側で**画像エクスポート**機能を有効にする必要があります。これを行うには、[サーバー側のスクリーンショット生成を有効にする](~/jp/developer/general/setup-configuration-web.html#server-side-image-export) を参照してください。

<a name='enable-export-revealview'></a>
### エクスポートの設定の使用

ユーザー側でダッシュボードから特定の可視化画像やドキュメントなどを生成可能にするには、ダッシュボードを読み込むときに関連するプロパティを true に設定するだけでできるようになります。

- __$.ig.RevealSettings.showExportImage__ - **画像**としてエクスポートする場合;

- __$.ig.RevealSettings.showExportToPDF__ - **PDF** としてエクスポートする場合;

- __$.ig.RevealSettings.showExportToPowerpoint__ - **PowerPoint** プレゼンテーションとしてエクスポートする場合;

- __$.ig.RevealSettings.showExportToExcel__ - **Excel** データ形式としてエクスポートする場合.

これにより、ダッシュボードが開かれたとき、または特定の可視化が最大化されたときに、オーバーフロー メニューで**エクスポート** ボタンが使用可能になります。

![Export button for dashboards enabled
SDK](images/export-button-dashboard-SDK.png)

ユーザーが**エクスポート** ボタンをクリックすると、有効なエクスポート  オプションの 1 つを選択できます。

#### 画像エクスポート オプションを使用する場合の詳細

ユーザーがエクスポート オプションから\[画像のエクスポート\]を選択すると、\[画像のエクスポート\] ダイアログが開きます。ここでに、ユーザーは **クリップボードへコピー**と**画像としてエクスポート**の 2 つのオプションから選択することができます。右下の\[画像のエクスポート\] ボタンをクリックすると、画像がエンドユーザーに送信されます。

含まれているアプリがエクスポートされた画像を別の方法で処理する必要がある場合、出力画像にアクセスできる __onImageExported__ コールバックを提供できます。
以下は onImageExported コールバックのサンプル実装です。

``` js
  revealView.onImageExported = function (img) {
  var body = window.open("about:blank").document.body;
  body.appendChild(img);
}
```

<a name='programmatically-initiated-export'></a>
### コードによって開始されたエクスポート

コードで RevealView の画像を取得するには、ToImage メソッドを呼び出す必要があります。このメソッドを呼び出しても \[画像としてエクスポート\] ダイアログは表示されません。これにより、ユーザーが RevealView の外側にあるボタンをクリックしたときにスクリーンショットを取得できます。このメソッドは、RevealView コンポーネントが画面に表示されていると同じスクリーンショットを作成します。

``` js
  var image = revealView.toImage();
```

ToImage メソッドの呼び出し時にユーザーがダイアログを開いている場合、ダッシュボードと一緒にそのダイアログのスクリーンショットが取得されます。

これは、Reveal アプリ側では Reveal ビューのエクスポート ボタンを非表示にしておき、Reveal ビューの外部で発生する別の操作から画像へのエクスポートを起動するシナリオで役立ちます。
