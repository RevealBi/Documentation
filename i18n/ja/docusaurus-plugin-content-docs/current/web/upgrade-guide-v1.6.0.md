import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 1.6.0 へのアップグレード

Reveal SDK v1.6.0 リリースでは、多数の重大な変更が導入されました。このガイドを使用して、アプリケーションを更新するために必要な手順を参照してください。

## ライセンス

Reveal SDK のライセンス付与方法に大きな変更があります。カスタマーは、[カスタマー ポータル](https://account.infragistics.com/subscriptions)を開いて、新しいライセンス キーを取得する必要があります。

デフォルトでは、Reveal SDK は、ユーザーの「ホーム」ディレクトリの下で `.revealbi-sdk` という名前のフォルダー内の `license.key` というファイルで有効なライセンスを検索します。

「ホーム」ディレクトリは、お使いの OS によって異なります。
- Windows: `C:/Users/your-user-name/`
- Mac: `/Users/your-user-name/`
- Linux: `/home/your-user-name/`

ライセンス キーを受け取ったら、「ホーム」ディレクトリにある `.reveabi-sdk` という名前のディレクトリ内に `license.key` という名前のテキスト ファイルを作成してください。このファイルにライセンス キーをコンテンツとして記載します。

例えば、Windows を使用している場合、ライセンス ファイルの場所は `C:/Users/ユーザー名/.revealbi-sdk/license.key` になります。

ライセンス キーはアプリケーション コードで指定することもできます。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
services.AddMvc().AddReveal(builder => 
{
    builder.AddSettings(settings =>
    {
        settings.License = "LICENSE_KEY";
    });
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
RevealEngineInitializer.initialize(new InitializeParameterBuilder().
    setLicense("LICENSE_KEY").
    build());
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```ts
const revealOptions: RevealOptions = {
	license: "LICENSE_KEY",
};
app.use("/", reveal(revealOptions));
```

  </TabItem>
</Tabs>

## ASP.NET 6.0 へのアップグレード (ASP.NET のみ)
Reveal SDK v1.6.0 には、ASP.NET 6.0 (ASP.NET Core 6.0 とも呼ばれる) 以降が**必要**になりました。ASP.NET 6.0 よりも古いバージョンを使用している場合は、ASP.NET プロジェクトをアップグレードする必要があります。


## データ ソース (ASP.NET のみ)
データ ソースは別の NuGet パッケージに移動されました。これは、データ ソースを使用するすべてのコードが壊れることを意味します。データ ソースが個別のパッケージに移動されただけでなく、データに関連するすべての名前空間が新しい `Reveal.Sdk.Data` 名前空間に移動されました。

次の手順では、データ ソースを修正する手順を説明します。

**手順 1**: NuGet からデータ ソース パッケージをインストールします。この[サポートされているデータ ソース](/web/datasources#サポートされているデータ-ソース)のリストを確認し、NuGet から必要なデータ ソースをインストールします。

**手順 2** - データ ソースを Reveal SDK に登録します。各データ ソースでは、`builder.DataSources.RegisterXXX` メソッドを呼び出してデータ ソースを SDK に登録する必要があります。例:

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
using Reveal.Sdk;
using Reveal.Sdk.Data;

builder.Services.AddControllers().AddReveal( builder =>
{
    //all data sources use the RegisterXXX naming convention
    builder.DataSources.RegisterMicrosoftSqlServer();
    builder.DataSources.RegisterAmazonAthena();
    builder.DataSources.RegisterGoogleDrive();
});
```

  </TabItem>

</Tabs>

**手順 3** - `using Reveal.Sdk.Data;` 名前空間を **AuthenticationProvider** クラスと **DataSourceProvider** クラスに追加します。`IRVAuthenticationProvider`、`IRVUserContext`、`RVDashboardDataSource` などのオブジェクトは、`Reveal.Sdk.Data` 名前空間に移動されました。

```cs
using Reveal.Sdk.Data;
```

**手順 4** - 新しいデータ ソースの名前空間を **AuthenticationProvider** クラスと **DataSourceProvider** クラスに追加します。

各データ ソースの名前空間は、NuGet パッケージ名と一致するように変更されました。例えば、`RVSqlServerDataSourceItem`、`RVAthenaDataSource`、`RVGoogleDriveDataSource` を使用する場合は、次の名前空間を追加する必要があります。

```cs
using Reveal.Sdk.Data.Microsoft.SqlServer;
using Reveal.Sdk.Data.Amazon.Athena;
using Reveal.Sdk.Data.Google.Drive;
```

## Quill.js を削除する
Reveal SDK は Quill.js に依存しなくなりました。Quill.js へのすべての参照を見つけて削除します。

Quill.js CDN リンクを使用する場合は、次の手順を実行します。

- 次の CSS リンクを見つけて削除します。
```
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css" >
```

- 次の JavaScript リンクを見つけて削除します。
```
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js" ></script>
```

## availableChartTypes を削除する

`revealView.availableChartTypes` プロパティは削除され、新しい `revealView.chartTypes` プロパティが使用されます。

新しい `chartTypes` プロパティは項目の配列となり、チャート タイプ ドロップダウンの項目をより柔軟に制御できるようになりました。この新機能の詳細については、[チャート タイプ](/web/chart-types)トピックを参照してください。