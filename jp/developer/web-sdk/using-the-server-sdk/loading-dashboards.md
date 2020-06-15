## ダッシュボード ファイルの読み込み

### 概要

SDK でダッシュボードを開く/保存するには 2 つの方法があります

  - **サーバー側**: はじめにクライアント ページでダッシュボード ID を指定します。次に、サーバー上で以下に詳述するコールバック メソッドを使用して、指定された ID を持つダッシュボードのコンテンツと共にストリームを返します。
    
  この方法が最も簡単な方法で、SDK をはじめて評価するときに推奨される方法です。

  - **クライアント側**: 完全な制御と高い柔軟性が提供されます。カスタム サーバーからコンテンツを取得しながら、クライアント ページでダッシュボードのコンテンツをストリームに提供します。

  この方法を使用すると、たとえばユーザーのアクセス許可を確認したり、カスタムなユーザーインターフェイスを表示してダッシュボードを選択したり、ユーザーが使用する .rdash ファイルをアップロードしたりすることができます。 クライアント側での方法の詳細については、[**RevealViewオブジェクトの設定**](~/jp/developer/web-sdk/using-the-client-sdk/configuring-revealview.md) を参照してください。

### サーバー側の作業

ダッシュボードを可視化するには、SDK に Rdash ファイルをストリームとして提供する必要があります。

以下のコードスニペットは、プロジェクトに組み込みリソースとして追加された Rdash ファイルを読み込む方法を示しています。このメソッドは、__IRevealSdkContext.GetDashboardAsync__ のための実装です。

### コード

``` csharp
public Task<Stream> GetDashboardAsync(string dashboardId)
{
    var resourceName = $"Reveal.Sdk.Samples.Web.UpMedia.Dashboards.{dashboardId}";
    var assembly = Assembly.GetExecutingAssembly();
    return Task.FromResult(assembly.GetManifestResourceStream(resourceName));
 }
```

__IRevealSdkContext.GetDashboardAsync__ のこのコードは、クライアントで **RevealUtility.loadDashboard** 関数を使用するとサーバー上で呼び出されます。そして最初のパラメーターとしてクライアント側で指定された dashboardId を取得します。

