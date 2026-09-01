# 既知の問題

## Chrome/Edge DevTools が Angular で reveal-sdk を使用するとフリーズする

### 問題

`reveal-sdk` をインポートしている Angular アプリケーションで Chrome または Edge の DevTools を開くと、DevTools のフロントエンドが応答しなくなる場合があります。

Angular の Vite ベースの開発サーバーは、Reveal モノリシック ESM バンドルから `reveal-sdk.js.map` ファイルを生成します。DevTools がこのソース マップを検出して処理しようとしますが、ファイルが非常に大きいためフリーズが発生します。

### 回避策

**オプション 1 – Angular キャッシュを `node_modules` 配下にリダイレクトする (推奨)**

依存関係 URL が DevTools の組み込み無視ルールに一致するよう、`angular.json` で Angular CLI のキャッシュ パスをカスタマイズします。

```json
"cli": {
  "cache": {
    "path": "node_modules/.cache/angular"
  }
}
```

**オプション 2 – DevTools にカスタム無視ルールを追加する**

**DevTools → 設定 → 無視リスト → カスタム除外ルール** に以下のルールを追加します。

```
.*\/\.angular\/cache\/.*\/vite\/deps\/reveal-sdk\.js.*
```

> **注意:** この方法は有効ですが、開発者ごと、ブラウザー プロファイルごとに個別に設定する必要があります。

## Windows Azure App Service でのエクスポート非対応

### 問題

**Azure App Service (Windows)** 上でホストしている場合、エクスポート機能は**サポートされていません**。これは、ブラウザー ベースのエクスポートに必要な **Playwright** が、Azure App Service 内の **Windows ディストリビューションではサポートされていない**ためです。

### 回避策

次の 2 つの方法で解決できます。

1. **Linux App Service プランを使用する**
   アプリを Windows ではなく **Azure App Service (Linux)** 上でホストします。
   ASP.NET Core の起動時に、`Program.cs` 内で Web アプリケーションを実行する**前**に Playwright インストーラーを呼び出します。

   ```csharp
   var builder = WebApplication.CreateBuilder(args);
   //...
   
   Microsoft.Playwright.Program.Main(new string[] { "install", "chromium", "--with-deps" });

   app.UseAuthorization();
   app.MapControllers();
   app.Run();
   ```

   これにより、Chromium および必要な依存関係がランタイムで利用可能になります。

2. **Windows コンテナーを使用する**
   Windows 環境を維持する必要がある場合は、アプリケーションを **Windows コンテナー**内でホストします。
   これにより、コンテナー イメージ内で Playwright をインストールおよび構成でき、Windows App Service の制限を回避できます。

## Create React App 5 の本番ビルド {#create-react-app-5-production-builds}

### 問題

`react-scripts@5.0.1` を使用している既存の Create React App 5 アプリケーションでは、Reveal SDK を npm から使用する際に、本番ビルドに非常に長い時間がかかる、またはビルドが停止したように見える場合があります。

### 原因と背景

これは、Create React App/Webpack の本番ビルド パイプラインが Reveal の ESM バンドルを処理する際に発生します。Create React App は React チームによって非推奨とされています。新しいアプリケーションの場合、または移行が現実的な場合は、メンテナンスされている React フレームワークや、Vite などの最新のビルド ツールを使用してください。

### 回避策

まだ移行できない既存の Create React App アプリケーションでは、実行時に `reveal-sdk` がブラウザー (IIFE) バンドルに解決されるように Webpack を構成します。**Webpack の external と IIFE バンドルの両方が必要です**。external のみの場合、実行時にインポートの実装が存在しません。また、IIFE のみの場合、ESM パッケージが Webpack の本番パイプラインに残ります。

Create React App は Webpack 構成を公開していないため、オーバーライド ツールが必要です。以下の手順では [react-app-rewired](https://github.com/timarney/react-app-rewired) を使用します。アプリケーションですでに [CRACO](https://craco.js.org/) を使用している場合は、同じ `externals` の変更を `craco.config.js` に適用してください。

1. `react-app-rewired` をインストールし、アプリケーションのビルドに使用します。

   ```bash npm2yarn
   npm install react-app-rewired --save-dev
   ```

   ```json title="package.json"
   "scripts": {
       "start": "react-app-rewired start",
       "build": "react-app-rewired build"
   }
   ```

2. プロジェクトのルートに `config-overrides.js` を作成し、Webpack の external を構成します。

   ```js title="config-overrides.js"
   module.exports = function override(config) {
       config.externals = {
           ...(config.externals || {}),
           "reveal-sdk": "Reveal",
       };

       return config;
   };
   ```

3. `node_modules/reveal-sdk/dist/reveal-sdk.js` と `node_modules/reveal-sdk/dist/locales/` を、公開されているレイアウトを維持したまま `public/reveal/` にコピーします。SDK はロケール ファイルを `reveal-sdk.js` からの相対パスで解決するため、追加のロケール構成は必要ありません。

4. IIFE バンドルを `public/index.html` に追加します。

   ```html
   <script src="%PUBLIC_URL%/reveal/reveal-sdk.js"></script>
   ```

5. アプリケーションでは、引き続き npm から Reveal をインポートします。

   ```ts
   import * as Reveal from "reveal-sdk";
   ```

## エクスポート時にカスタム表示形式がサポートされない

### 問題

**カスタム表示形式** (標準の Reveal チャート タイプを拡張する、ユーザー定義の表示形式) は、ダッシュボードをいずれの形式 (PDF、Excel、PowerPoint、画像) でエクスポートしても空白で表示されます。これは、すべてのプラットフォームに共通する既知の制限です。

### 根本原因

Reveal SDK は、カスタム表示形式のレンダリングを完全には制御できません。エクスポート プロセス中のレンダリング タイミングの問題により、エクスポート操作が表示形式の内容をキャプチャする前に、カスタム表示形式が完全に表示またはレンダリングされない場合があります。その結果、エクスポートされたファイルでは空白のプレースホルダーが表示されます。

### 回避策

この制限に対する**プログラム的な回避策はありません**。ただし、次の方法を利用できます。手動でスクリーンショットを**取得**し、エクスポート機能の代替として、Word ドキュメント、PDF、PowerPoint プレゼンテーションなどの任意の形式に配置してください。

## `<Pre>` タグが `<body>` に追加される

### 問題
RevealView コンポーネントは、`<body>` 要素の末尾に非表示の `<pre>` タグを追加します。このタグは、レイアウト計算のためにフォント サイズを測定する用途でビューアーによって内部的に使用されます。アプリケーションに `<pre>` 要素を対象とする CSS (グローバル タイポグラフィや余白のスタイルなど) が定義されている場合、これらのルールが RevealView 測定要素に誤って適用される可能性があります。これにより、UI で予期しない視覚的な乱れやレイアウトのズレが発生する可能性があります。

### 回避策
これらの不要なスタイルが測定要素に影響を与えないようにするには、グローバル スタイルシートに次の CSS ルールを追加してください。

```css
body > pre.rv-multiline-editor {
    height: 0px !important;
}
```

## Linux ARM64 Node でのエクスポート

- Node.js を使用していて、[Linux ARM64 上で実行する場合、Chromium は自動的にインストールできません](https://github.com/puppeteer/puppeteer/issues/7740)。そのため、ダッシュボードをエクスポートする前に、パッケージ マネージャーを使用して、または手動で、Chromium をインストールする必要があります。Reveal は Chromium バイナリを `/usr/bin/chromium` の下で探します。

## Node.js でのリクエストの断続的なタイムアウト

- Node.js 環境において、リクエストの実行中に断続的なタイムアウトの問題が確認されています。この問題は再現が困難であり、根本原因は現在も調査中です。その結果、一部のリクエストが失敗し、再試行すると成功する場合があります。

## グリッド行ページング

- ページングは​​次のプロバイダーでサポートされています:SQL Server、MySQL、BigQuery、MongoDB、PostgreSQL、Snowflake、SyBase、Redshift、Databricks、Cube.dev、Athena、および Oracle。
- ストアド プロシージャーをサポートするプロバイダーでは、テーブルのようにクエリを実行して行の範囲を返すことができないため、ストアド プロシージャーを選択するとグリッド ページングが無効になります。
- サーバー上でのデータ処理が false の場合、ページングは​​使用できません。
- 通常の表示モードでページングを有効にしてグリッドを並べ替えると、列の並べ替えは左から右に適用されます。つまり、最後の列を並べ替えてから最初の列を並べ替えると、その順序ではなく、左から右に適用されます。

## ヘッドレス エクスポート

- Node.js SDK のヘッドレス エクスポートは Linux/MacOSX では使用できません。
- ```DocumentExportOptions``` が使用されている場合、ヘッドレス エクスポートは失敗します。代わりにフォーマット固有のクラス (例: ```PdfExportOptions```) を使用してください。

## ヘッドレス エクスポート - グローバル フィルター

- XMLA フィルターは現在 ASP.NET ではサポートされません。
- Node.js のグローバル フィルターは現在サポートされません。

## ライセンス

- NuGet パッケージを使用する際に、Reveal SDK のライセンス (SDK インストーラーに有効なキーを入力) 後もウォーターマークが表示されてしまうます。回避策: プロジェクトから NuGet パッケージをアンインストールし、NuGet のキャッシュをクリアして、パッケージを再度インストールしてください。NuGet のすべてのキャッシュをクリアしたくない場合、キャッシュした場所を検索し、Infragistics Reveal 項目のみをクリアできます。場所は NuGet のバージョンと、packages.config または PackageReferece のどちらが使用されているかによって異なります。

## MacOS ARM64 のサポート (ベータ版)

- マシンの構成によってはロケールの問題 (例: 9,5 と 9.5) が発生する可能性があります。

## MongoDB コネクター

- `currentTimeZone` 関数を使用した計算フィールドによる結合が失敗する問題。
- `_id` 列を参照する計算フィールドによる結合が失敗する問題。
- `concatenate` 関数はパラメーターを文字列に暗黙的にキャストしないため、非文字列の列参照/関数を評価するときにエラーが発生する可能性があります。
- 行にフィールドがなく、列に 1 つ以上のディメンションがあるピボットに、行が生成されない問題。
- [埋め込み](https://www.mongodb.com/basics/embedded-mongodb)はサポートされていませんが単一値の埋め込みはサポートされています。
- MongoDB バージョン v5.0 以上がサポートされています。
- 名前にドット 「.」 またはドル記号 「$」 が含まれるフィールドは無視されます。ほとんどの場合、特別な処理が必要です: [ドットとドル記号の考慮事項](https://www.mongodb.com/docs/manual/core/dot-dollar-considerations/)。
- ObjectId 型のフィールドによるフィルタリング。
- MongoDB で null を含む合計を実行すると、結果は SQL サーバーのような null ではなく 0 になります。