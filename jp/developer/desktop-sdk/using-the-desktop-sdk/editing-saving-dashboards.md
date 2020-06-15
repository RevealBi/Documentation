## ダッシュボードの編集と保存

### 概要

[**RevealView オブジェクトの構成**](configuring-revealview.md)では、__RevealView__ コンポーネントにダッシュボード ファイルを含むストリームを提供する必要があることを説明しました。さらに、ユーザーがダッシュボードを変更した後に、変更したダッシュボード ファイルをどのように処理するかを設定します。

### ダッシュボードの保存

次のコードを使用して __SaveDashboard__ イベントにアタッチできます。

``` csharp
_revealView.SaveDashboard += RevealView_SaveDashboard;
```

次にイベント ハンドラーを実装します。

``` csharp
private async void RevealView_SaveDashboard(object sender, DashboardSaveEventArgs args)
{
    var data = await args.Serialize();
    using (var output = File.OpenWrite($"{args.Name}.rdash"))
    {
        output.Write(data, 0, data.Length);
    }
    args.SaveFinished();
}
```

上記の例は、Save イベントを処理するための単純化された実装を示しています。実際のシナリオでは、カスタム UI をユーザーに表示し、ユーザーがダッシュボードの場所と姓を選択できます。

ユーザーがダッシュボードの名前を変更した場合は、メソッド __SerializeWithNewName__ を使用して、ダッシュボードの Title 属性に正しく反映された名前を取得できます。

保存操作を処理したくない場合は、次の設定でダッシュボードを編集するオプションをオフにすることができます。

``` csharp
revealSettings.CanEdit = false;
```

この方法は、たとえば、ユーザーが変更を加えることを想定していない場合に便利です。
