## ダッシュボードの編集と保存

### 概要

[**サーバーサイドのダッシュボード ファイルの読み込み**](~/jp/developer/web-sdk/using-the-server-sdk/loading-dashboards-server-we.md)でダッシュ​​ボードに変更を保存する方法が 2 つ紹介されています。

  - **クライアント サイド**: このメソッドを使用するには __revealView__ オブジェクトの __onSave__ 属性に関数を設定する必要があります。この方法は、操作 (保存と名前を付けて保存) がどのように実行されるかについて、包含アプリケーションの柔軟性が高まるため、推奨される方法です。

    コード サンプル:

    ``` js
    revealView.onSave = function(rv, saveEvent) {
        saveEvent.serialize(function(blobValue) {
            //TODO: XMLHttpRequest オブジェクトを使用してサーバーに POST するなど、
            //BLOB 値を保存します。
        });
    };
    ```

    保存操作を処理したくない場合は、次の設定でダッシュボードを編集するオプションをオフにすることができます。

    ``` js
    revealSettings.canSaveAs = false;
    ```

    この方法は、ユーザーが変更を加えることを想定していない場合などに便利です。

  - **サーバー側**: __onSave__ イベントが __$.ig.RevealView__ オブジェクトに設定されていない場合、デフォルトのサーバー側の保存方法が使用されます。エンドユーザーが変更されたダッシュボードを保存した後、HTTP POST リクエストが呼び出されます。その結果、現在定義されている SDK コンテキストの __SaveDashboardAsync__ メソッドが呼び出されます。次に \_dashboardId を文字列として取得し、**dashboardStream** にダッシュボードの Stream 表現を取得します。

  サーバー側のアプローチでは、コードをクライアント サイドに実装するだけで済みますが、クライアントサイドの柔軟性は失われます。これは、たとえば、ダッシュボードを保存する最終的な場所をユーザーが選択できないことを意味します。SDK コンテキストの詳細については、[**サーバーコンテキストの定義**](~/jp/developer/general/setup-configuration-web.html#defining-server-context)を参照してください。
