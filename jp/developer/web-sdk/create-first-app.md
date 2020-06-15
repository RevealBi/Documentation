## Web SDK をはじめて使用する

このページは、Web ページ/アプリケーションにはじめてダッシュボードを表示する際の手順について説明します。

### 手順

1.  プロジェクトを作成する
2.  Reveal SDK のインストール
3.  サーバー構成の設定
4.  クライアント アプリケーションに Reveal を埋め込む
5.  Reveal フォントの使用
6.  クライアント アプリケーションのスタイル設定

### 手順 1 - プロジェクトを作成する

Visual Studio 2017 を開き、*ASP.NET Core Web アプリケーション*の新しいプロジェクトを作成します。

![create new project dialog in Visual Studio
2017](images/create-new-asp-net-project.png)

以下のように *.NET Framework* および *ASP.NET Core 2.2* を選択します。

![select framework and mvc for project dialog in Visual Studio
2017](images/select-framework-project.png)

手順 1 サンプル **[git コミット](https://github.com/Infragistics/reveal-sdk-web-sample/commit/90b5a2952e98e8138751e3c9fd78864acc9c0a4f)**

### Step 2 - Install Reveal SDK

<https://www.revealbi.io/> から Infragistics Reveal SDK をダウンロードし、システムにインストールします。*Visual Studio* で ツール > オプション > Nuget パッケージ マネージャー > パッケージ ソース を選択します。インストールされた SDK の Nuget フォルダーを指す新しいソースを追加します。

![adding a new package source to the available package sources
dialog](images/adding-new-package-source.png)

その後、パッケージ ソースを追加したものに変更して Nuget をインストールできます。

![installing the Nuget dialog](images/install-nuget.png)

![preview changes dialog](images/preview-changes-dialog.png)

手順 2 サンプル **[git コミット](https://github.com/Infragistics/reveal-sdk-web-sample/commit/3308bd229c1b50efd12e553e1e54d5ac4d36b6e3)**.

### 手順 3 - サーバー構成の設定

プロジェクトに新しい Reveal SDK フォルダーを作成し、**IRvealSdkContext** インターフェースを実装する **RevealSdkContext.cs** クラスを追加します。

``` csharp
   using Infragistics.Sdk;
    using System;
    using System.IO;
    using System.Reflection;
    using System.Threading.Tasks;

    namespace Demo1.RevealSDK
    {
        public class RevealSdkContext : IRevealSdkContext
        {
            public IRVDataSourceProvider DataSourceProvider => null;

            public IRVDataProvider DataProvider => null;

            public IRVAuthenticationProvider AuthenticationProvider => null;

            public Task<Stream> GetDashboardAsync(string dashboardId)
            {
                var resourceName = $"Demo1.Dashboards.{dashboardId}";
                var assembly = Assembly.GetExecutingAssembly();
                return Task.FromResult(assembly.GetManifestResourceStream(resourceName));
            }

            public Task SaveDashboardAsync(string userId, string dashboardId, Stream dashboardStream)
            {
                throw new NotImplementedException();
            }
        }
    }
```

上記のコードでは、**Demo1.Dashboards** がダッシュボード ファイルが含まれる場所を示しているため、プロジェクトに新しいダッシュボード フォルダーを作成し、ここでは空のままにします。

これを行うには、**Startup.cs** の **ConfigureServices** メソッドに以下のコードを追加します。

``` csharp
   services.AddRevealServices(new RevealEmbedSettings
    {
        CachePath = @"C:\Temp"
    }, new RevealSdkContext());

    services.AddMvc().AddReveal();
```

And the necessary references in the same file:

``` csharp
   using Demo1.RevealSDK;
    using Infragistics.Sdk;
```

手順 3 サンプル **[git コミット](https://github.com/Infragistics/reveal-sdk-web-sample/commit/44340ad7154f7101f80fce4aea50153ccbd902d7)**.

問題が発生した場合は、サーバー SDK - [**セットアップと構成**](~/jp/developer/general/setup-configuration-web.md) トピックを参照してください。

### 手順 4 - クライアント アプリケーションに Reveal を埋め込む

はじめにダッシュボードを準備します。このデモでは、Reveal の**サンプル** セクションの **Marketing ダッシュボード**を使用できますが、テーマは異なります。
ダッシュボードを開き、編集モードに入ります。

Reveal アプリ (<https://app.revealbi.io>) を開き、**サンプル**に移動します。

![accessing the marketing dashboard from Reveal samples](images/accessing-marketing-dashboard.png)

Marketing ダッシュボードを選択し、**編集モード**に入ります。

![enter edit mode of marketing sample dashboard in Reveal
app](images/reveal-marketing-dashboard-sample.png)

編集モードに入った後に \[テーマ\] ボタンをクリックします。

![edit mode menu of the marketing
dashboard](images/marketing-dashboard-theme-button.png)

Rocky Mountain テーマを選択します。

![rocky mountain theme in the dashboard themes
menu](images/dashboard-themes-rocky-mountain.png)

変更したダッシュボードを保存し、エクスポートします。

> [!NOTE]
> Marketing ダッシュボードは、Reveal アプリの**サンプル**の一部であるため、通常のダッシュボードと同じ方法で保存することはできません。代わりに、**名前を付けて保存**を使用して場所を選択する必要があります。

![export marketing dashboard
menu](images/export-marketing-dashboard-changed-theme.png)

**Marketing.rdash** ダッシュボード ファイルを手順 3 で作成したダッシュボード フォルダーへ移動し、Visual Studio でこのアイテムのビルド アクションを**埋め込みリソース**に設定します。

![setting build action in marketing.rdash file
properties](images/build-action-set.png)

次に、新しいページ *Marketing.cshtml* を追加して、ダウンロードしたダッシュボードを可視化します。

``` csharp
   @{
        ViewData["Title"] = "Marketing";
    }

    @section Scripts
        {
        <script type="text/javascript">
            // Load dashboard in #revealView element
        </script>
    }

    <section>
        <div id="revealView" style="height:800px;"></div>
    </section>
```

次に、**HomeController.cs** に新しいアクション メソッドを追加します。

``` csharp
   public IActionResult Marketing()
    {
        return View();
    }
```

Reveal が使用するサードパーティの参照の 1 つに **Day.js** があります。したがって、含まれる他のスクリプトとともに **\_Layout.cshtml** に参照を追加します。

``` csharp
   <script src="https://unpkg.com/dayjs"></script>
```

続行するには、プロジェクトの wwwroot フォルダーに新しい Reveal フォルダーを作成します。**infragistics.reveal.js** をコピーします。このファイルは、Reveal SDK のインストール フォルダーにあります。

![wwwroot folder hierarchy](images/wwwroot-folder.png)

そして、Day.js のスクリプトの後に **\_Layout.cshtml** でこのライブラリを参照します。

``` csharp
   <script src="~/Reveal/infragistics.reveal.js"></script>
```

同じファイル内のフッター セクションも削除し、新しいページのナビゲーションにリンクを追加します。

``` csharp
   <li class="nav-item">
        <a class="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Marketing">Marketing</a>
    </li>
```

**Marketing.cshtml** のスクリプトを、ダッシュボードをロードするためのロジックで更新しましょう。

``` csharp
   var dashboardId = "Marketing.rdash";
    var revealSettings = new $.ig.RevealSettings(dashboardId);

    $.ig.RevealUtility.loadDashboard(dashboardId, function (dashboard) {
        revealSettings.dashboard = dashboard;
        var revealView = new $.ig.RevealView("#revealView", revealSettings);
    }, function (error) {
        //ここで発生する可能性があるエラーを処理します。
    });
```

最後に、Web ページを実行すると、ダッシュボードが表示されます。

![marketing dashboard result in web
page](images/marketing-dashboard-result.png)

Step 4 sample **[git
commit](https://github.com/Infragistics/reveal-sdk-web-sample/commit/380d369b46437c3913ed3c61de32a7f607b96b47)**.

問題が発生した場合は、クライアント SDK [**セットアップと構成**](~/jp/developer/general/setup-configuration-web.md)トピックを参照してください。

### 手順 5 - Reveal フォントの使用

Reveal アプリは Roboto フォントを使用します。アプリと同じ外観を実現するには、
<https://fonts.google.com/specimen/Roboto> からフォントをダウンロードし、次の TTF ファイルをプロジェクトの **wwwroot/css** フォルダーへコピーします。

  - Roboto-Regular.ttf

  - Roboto-Bold.ttf

  - Roboto-Light.ttf

  - Roboto-Medium.ttf

次に、**site.css**　に以下のように参照を追加します。

``` css
@font-face {
   font-family: "Roboto-Regular";
   src: url("Roboto-Regular.ttf");
}

@font-face {
   font-family: "Roboto-Bold";
   src: url("Roboto-Bold.ttf");
}

@font-face {
   font-family: "Roboto-Light";
   src: url("Roboto-Light.ttf");
}

@font-face {
   font-family: "Roboto-Medium";
   src: url("Roboto-Medium.ttf");
}
```

フォントの読み込みを改善するには、infragistics.reveal.js　参照の横にある ** \_Layout.cshtml** で Google Web Font Loader への参照を追加します。

``` csharp
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"></script>
```

最後に、**Marketing.cshtml** ページのスクリプト セクションを変更して、フォント ローダーを利用します。

``` csharp
   WebFont.load({
        custom: {
            families: ['Roboto-Regular', 'Roboto-Bold', 'Roboto-Light', 'Roboto-Medium'],
            urls: ['/css/site.css']
        },
        active: function () {
            var dashboardId = "Marketing.rdash";
            var revealSettings = new $.ig.RevealSettings(dashboardId);

            $.ig.RevealUtility.loadDashboard(dashboardId, function (dashboard) {
                revealSettings.dashboard = dashboard;
                var revealView = new $.ig.RevealView("#revealView", revealSettings);
            }, function (error) {
                //Process any error that might occur here
            });
        },
    });
```

Voila\!

![marketing dashboard loaded with the new
font](images/marketing-dashboard-new-font.png)

手順 5 サンプル **[git コミット](https://github.com/Infragistics/reveal-sdk-web-sample/commit/9fd40e047bf6aa4c03258112e6d47f577625a63b)**.

### 手順 6 - クライアント アプリケーションのスタイル設定

デフォルトのテンプレートを使用する代わりに、クライアント アプリケーションのスタイルを設定できます。

**HomeController.cs** からプライバシーを削除し、Marketing にリダイレクトするようにインデックスを変更します。

``` csharp
   public IActionResult Index()
    {
        return RedirectToAction("Marketing");
    }
```

また、Index.cshtml および Privacy.cshtml ファイルは使用されないため削除してください。Marketing.cshtml の \<div\> 要素のスタイル設定を削除します。

*wwwroot* に新しい img フォルダーを作成し、そこへ *logo.png* をコピーします。これは、[こちら](https://download.infragistics.com/reveal/help/samples/logo.png?)からダウンロードできます。

**\_Layout.cshtml** で、以下の変更を行います。

  - タイトルを Demo1 から Overview へ変更します。

  - ヘッダーの後の div を削除します。

  - ロゴ、セパレータ、タイトルを追加してヘッダーを変更します。

<!-- end list -->

``` csharp
   <header>
        <div class="header">
            <img class="logo" src="~/img/logo.png" alt="logo" />
            <span class="line" />
            <h1>Overview</h1>
        </div>
    </header>
```

**site.css** で、Roboto フォント用に追加したものを除くすべてのスタイルを削除し、ヘッダーにスタイルを追加します。

``` css
  /* Header
    -------------------------------------------------- */

    header {
        display: flex;
        width: 100%;
        height: 70px;
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
        background-color: #37405a;
    }

    img.logo {
        width: 50px;
        height: 50px;
        margin: 10px;
        float: left;
    }

    span.line {
        float: left;
        width: 1px;
        height: 50px;
        margin-top: 10px;
        border: solid 1px #2b2e40;
    }

    h1 {
        float: left;
        padding-top: 12px;
        padding-left: 20px;
        height: 24px;
        font-family: Roboto-Regular;
        font-size: 20px;
        font-weight: 400;
        color: #ffffff;
    }
```

ボディのスタイル:

``` css
  /* Body
    -------------------------------------------------- */
    body {
        display: flex;
        flex-direction: column;
        background-image: linear-gradient(to bottom, #30365a, #2b2e40);
    }

    html, body {
        width: 100%;
        height: 100%;
    }

        body section {
            display: block;
            width: 100%;
            height: 100%;
            padding: 15px;
        }

    #revealView {
        height: 100%;
    }
```

結果は以下のようになります。

![result after styling the client
application](images/marketing-dashboard-style-client-application-result.png)

手順 6 サンプル **[git コミット](https://github.com/Infragistics/reveal-sdk-web-sample/commit/085fd35db4d07eb9130ff72dd3bb96a157f6d4ed)**.
