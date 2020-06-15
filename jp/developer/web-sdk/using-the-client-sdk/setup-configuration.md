### セットアップと構成

以下は、Reveal Web Client SDK を設定するための手順です。

1.  [**依存関係の確認**](#依存関係の確認).

2.  [**Web Client SDK の参照**](#Web-Client-SDK-の参照).

3.  [**Web Client SDK のインスタンス化**](#Web-Client-SDK-のインスタンス化).

4.  [**React / Angular のサポートを設定**](#web-component-support) (オプション)

### 1\. 依存関係の確認

Reveal Web Client SDK には、サードパーティーの参照が 1 つあります。

  - jQuery 2.2 またはそれ以上

  - Day.js 1.8.15 またはそれ以上

### 2\. Web Client SDK の参照

Web ページで __$.ig.RevealView__ コンポーネントを有効にするには、いくつかのスクリプトを含める必要があります。これらのスクリプトは Reveal Web Client SDK の一部として提供されます。

``` html
<script src="~/Reveal/infragistics.reveal.js"></script>
```

JavaScript ファイル は "\<InstallationDirectory\>\\SDK\\Web\\JS\\Client" にあります。

### 7. Web Client SDK のインスタンス化

ダッシュボードのプレゼンテーションは、Web Client SDK を介してネイティブに処理されます。

以下の手順に従って作業を開始します。

1.  id を指定して \<div /\> 要素を定義し、__$.ig.RevealView__ コンストラクターを呼び出します。

2.  コンストラクタで \_dashboardId\</emphasis\> を指定して __$.ig.RevealSettings__ のインスタンスを作成します。

3.  __$.ig.RevealUtility.loadDashboard__ を呼び出して*dashboardId* と成功およびエラーハンドラを指定します。
    

    a.  成功ハンドラーでは、取得したダッシュボードを使用し、__$.ig.RevealSettings__ オブジェクトの dashboard プロパティに設定する必要があります。

4.  最後に、2つのパラメータを渡して [$.ig.RevealView\*](api-reference-client-web.html#_revealview) コンポーネントをインスタンス化します。1 つはダッシュボードをレンダリングする DOM 要素のセレクター、もう 1 つは設定オブジェクトです。

#### サンプル コード

``` html
<!DOCTYPE html>
<html>
<head>
    ⋮
    <script type="text/javascript">
        var dashboardId = "dashboardId";
        var revealSettings = new $.ig.RevealSettings(dashboardId);

        $.ig.RevealUtility.loadDashboard(dashboardId, function (dashboard) {
            revealSettings.dashboard = dashboard;
            var revealView = new $.ig.RevealView("#revealView", revealSettings);
        }, function (error) {
        //Process any error that might occur here
        });
    </script>
</head>
<body>
    <div id="revealView" style="height:500px;" />
</body>
</html>
```

### 4\. React / Angular のサポートを設定 (オプション)

フロントエンドでは、Reveal は Angular と React との互換性を提供する Web コンポーネントを提供します。

次のスニペットは、クライアント側で追加する必要があるものを示しています。

``` html
<script src="~/Reveal/reveal-webComponent.js"></script>
<section>
    <reveal-view dashboard-name="Sales" can-edit="" editing="" show-menu="" can-add-visualization=""</reveal-view>
</section>
```

Web コンポーネントには他の依存関係も含める必要があることに注意してください (jQuery 2.2 以降および Infragistics.reveal.js)。

次の 2 つの JS ファイルが

次の 2 つの JS ファイルが "\<InstallationDirectory\>\\Web\\JS" にあります。

  - **reveal-webComponent.js**

  - **reveal-WebComponent-ie11.js**

#### IE11 サポート

IE11 ユーザーをサポートする場合について説明します。以下のスニペットでほとんどのブラウザーで問題なく動作します。

``` html
@section Scripts {
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.4.4/polyfill.min.js"></script>
    <script src="https://unpkg.com/@@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <script src="~/Reveal/reveal-webComponent-ie11.js"></script>
}
<section>
    <reveal-view dashboard-name="Sales"></reveal-view>
```

ただし、フロントエンドのパフォーマンスを向上させたい場合や、IE11 を考慮しない場合は、上記の他のスニペットを確認し、代わりに **reveal-webComponent.js** を使用してください。
