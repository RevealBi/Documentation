# Reveal SDK for ASP.NET Core Web App で作業を開始

このウォークスルーでは、ASP.NET Core Razor Pages アプリケーションに Reveal ダッシュボードを表示する方法を示します。ASP.NET Core アプリは Reveal SDK サーバー エンドポイントをホストし、Razor ページは ESM バンドルを使用して npm CDN プロバイダーから Reveal SDK クライアントを読み込みます。

## 前提条件

開始する前に、次のものが用意されていることを確認してください。

- .NET SDK がインストールされていること。
- `Sales.rdash` という名前の Reveal ダッシュボード ファイル。

このトピックの例では、Razor ページと Reveal SDK サーバー エンドポイントの両方に 1 つの ASP.NET Core Web App を使用します。

## 手順 1 - ASP.NET Core Web App を作成する

新しい Razor Pages アプリケーションを作成します。

```bash
dotnet new webapp -n GettingStarted
```

新しいアプリケーション フォルダーに移動します。

```bash
cd GettingStarted
```

既存の ASP.NET Core Web App に Reveal SDK を追加する場合は、この手順をスキップできます。

## 手順 2 - Reveal SDK サーバー パッケージを追加する

`Reveal.Sdk.AspNetCore` NuGet パッケージをインストールします。

```bash
dotnet add package Reveal.Sdk.AspNetCore
```

`Program.cs` を開き、`Reveal.Sdk` 名前空間を追加して、Razor Pages ビルダーで `AddReveal` を呼び出します。

```cs title="Program.cs"
using Reveal.Sdk;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages().AddReveal();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapRazorPages();
app.Run();
```

`AddReveal` は、クライアント側の `RevealView` が使用する Reveal SDK サーバー機能を登録します。

## 手順 3 - ダッシュボードを追加する

プロジェクト ルートに `Dashboards` という名前のフォルダーを作成し、`Sales.rdash` をコピーします。

```text
GettingStarted/
|-- Dashboards/
|   |-- Sales.rdash
|-- Pages/
|-- Program.cs
```

既定では、Reveal SDK は `Dashboards` フォルダーからダッシュボードを読み込みます。クライアントで使用するダッシュボード ID は、`.rdash` 拡張子を除いたファイル名です。そのため、`Sales.rdash` は `Sales` として読み込まれます。

## 手順 4 - Razor ページに RevealView を追加する

`Pages/Index.cshtml` を開き、生成されたページ コンテンツを次のマークアップに置き換えます。

```html title="Pages/Index.cshtml"
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<div id="revealView" style="height: 800px; width: 100%;"></div>

@section Scripts
{
    <script type="module">
        import { RevealView, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";

        RVDashboard.loadDashboard("Sales").then(dashboard => {
            const revealView = new RevealView("#revealView");
            revealView.dashboard = dashboard;
        });
    </script>
}
```

`#revealView` 要素は、ダッシュボードが描画されるコンテナーです。モジュール スクリプトは Reveal SDK クライアントをインポートし、ASP.NET Core アプリから `Sales` ダッシュボードを読み込み、`RevealView` を作成して読み込んだダッシュボードを割り当てます。

Razor ページと Reveal SDK サーバー エンドポイントは同じ ASP.NET Core アプリでホストされているため、`RevealSdkSettings.setBaseUrl` を呼び出す必要はありません。

Reveal SDK サーバーが別のアプリケーションまたは URL でホストされている場合は、`RevealSdkSettings` をインポートし、ダッシュボードを読み込む前にサーバー URL を設定します。

```js
import { RevealView, RevealSdkSettings, RVDashboard } from "https://cdn.jsdelivr.net/npm/reveal-sdk/dist/reveal-sdk.esm.js";

RevealSdkSettings.setBaseUrl("http://localhost:5111/");
```

## 手順 5 - アプリケーションを実行する

ASP.NET Core アプリケーションを実行します。

```bash
dotnet run
```

ターミナルに表示されるローカル URL を開きます。ページが読み込まれると、Reveal SDK クライアントは ASP.NET Core アプリから `Sales` ダッシュボードを要求し、`RevealView` 内に描画します。

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/client/aspnet-webapp) にあります。

:::
