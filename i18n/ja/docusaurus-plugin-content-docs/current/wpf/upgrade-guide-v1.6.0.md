# 1.6.0 へのアップグレード

Reveal SDK v1.6.0 リリースでは、多数の重大な変更が導入されました。このガイドを使用して、アプリケーションを更新するために必要な手順を参照してください。

## ライセンス

Reveal SDK のライセンス付与方法に大きな変更があります。カスタマーは、[カスタマー ポータル](https://account.infragistics.com/subscriptions)を開いて、新しいライセンス キーを取得する必要があります。

デフォルトでは、Reveal SDK は、ユーザーの「ホーム」ディレクトリの下で `.revealbi-sdk` という名前のフォルダー内の `license.key` というファイルで有効なライセンスを検索します。

ライセンス キーを受け取ったら、「ホーム」ディレクトリにある `.revealbi-sdk` という名前のディレクトリ内に `license.key` という名前のテキスト ファイルを作成してください。このファイルにライセンス キーをコンテンツとして記載します。

ライセンス ファイルの場所は `C:/Users/your-user-name/.revealbi-sdk/license.key` になります。

ライセンス キーはアプリケーション コードで指定することもできます。

```cs
RevealSdkSettings.License = "LICENSE_KEY";
```

## データ ソース
データ ソースは別の NuGet パッケージに移動されました。これは、データ ソースを使用するすべてのコードが壊れることを意味します。データ ソースが個別のパッケージに移動されただけでなく、データに関連するすべての名前空間が新しい `Reveal.Sdk.Data` 名前空間に移動されました。

次の手順では、データ ソースを修正する手順を説明します。

**手順 1**: NuGet からデータ ソース パッケージをインストールします。この[サポートされているデータ ソース](/wpf/datasources.md#サポートされるデータ-ソース)のリストを確認し、NuGet から必要なデータ ソースをインストールします。

**手順 2** - データ ソースを Reveal SDK に登録します。各データ ソースでは、`RevealSdkSettings.DataSources.RegisterXXX` メソッドを呼び出してデータ ソースを SDK に登録する必要があります。例:

```cs
using Reveal.Sdk;
using Reveal.Sdk.Data;

//all data sources use the RegisterXXX naming convention
RevealSdkSettings.DataSources.RegisterMicrosoftSqlServer();
RevealSdkSettings.DataSources.RegisterAmazonAthena();
RevealSdkSettings.DataSources.RegisterGoogleDrive();
```

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

## AvailableChartTypes を削除する

`RevealView.AvailableChartTypes` プロパティは削除され、新しい `RevealView.ChartTypes` プロパティが使用されます。

新しい `ChartTypes` プロパティは項目の配列となり、チャート タイプ ドロップダウンの項目をより柔軟に制御できるようになりました。この新機能の詳細については、[チャート タイプ](/wpf/chart-types)トピックを参照してください。