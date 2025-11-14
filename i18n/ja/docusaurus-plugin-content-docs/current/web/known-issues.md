# 既知の問題

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