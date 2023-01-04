# ダッシュボードを保存

ダッシュボードの保存は、アプリケーションの `RevealView` コントロール内の保存ボタンを使用してエンドユーザーによって呼び出されます。

`RevealView` でサポートされている保存操作には次の 2 種類があります:
- **[保存]** - 現在のダッシュボードを保存し、ディスク上の現在の **.rdash** ファイルを上書きします。
- **[名前を付けて保存]** - 現在のダッシュボードを新しい **.rdash** ファイルとしてディスクに保存します。元の **.rdash** ファイルはそのままにしておきます。

**保存**操作は、エンドユーザーが編集モードのときに呼び出され、`RevealView` の右上隅にある**チェック ボタン**をクリックします。

![](images/saving-save-button.jpg)

エンドユーザーが `RevealView` の右上隅にある**ケバブ メニュー**を開き、**[名前を付けて保存]** メニュー項目を選択すると、**名前を付けて保存**操作が呼び出されます。

![](images/saving-saveas-button.jpg)

## ダッシュボードの保存イベント

デフォルトでは、`RevealView` は組み込みの**保存**または**名前を付けて保存**機能を提供しません。つまり、開発者は、アプリケーション内で**保存**と**名前を付けて保存**の両方の操作を実行するために必要なすべてのコードを記述する必要があります。

ダッシュボードの保存を処理するには、`RevealView.SaveDashboard` イベントにイベント ハンドラー を追加する必要があります。

```xml
<rv:RevealView x:Name="_revealView"
               SaveDashboard="RevealView_SaveDashboard"/>
```

```cs
private void RevealView_SaveDashboard(object sender, Reveal.Sdk.DashboardSaveEventArgs e)
{
    // your save code here       
}
```

`DashboardSaveEventArgs` オブジェクトは、ダッシュボードの保存に役立つ次のプロパティとメソッドを提供します:
- **Name** - これは現在のダッシュボードのタイトル (`RevealView` のダッシュボードの上部に表示されるテキスト) です。**.rdash** の名前がダッシュボードのタイトルと一致することが重要です。
- **saveAs** - これが**保存**操作か**名前を付けて保存**操作かを判別します。
- **Serialize()** - 保存に使用する現在のダッシュボードの `byte[]` を返します。これは主に**保存**操作に使用されます。
- **Serialize()** - 保存に使用できる JSON `文字列`を返します。これは主に**保存**操作に使用されます。
- **SerializeWithNewName()** - ダッシュボードのタイトルを変更し、保存に使用する現在のダッシュボードの `byte[]` を返します。これは主に **Save As** 操作に使用されます。
- **SerializeWithNewNameAsJson()** - ダッシュボードのタイトルを変更し、保存に使用できる JSON `文字列`を返します。これは主に **Save As** 操作に使用されます。
- **SavedFinished() - REQUIRED** は、保存操作が完了したことを示します。これは、保存の非同期性による要件です。

:::info

エンドユーザーが編集モードで、`RevealView.SaveDashboard` イベントを実装していない場合、**チェック ボタン**をクリックしても編集モードは終了しません。これは、`RevealView.SaveDashboard` イベントを実装する必要があることを示すインジケーターです。

:::

## 保存を無効にする

編集を無効にするか、**[名前を付けて保存]** UI 要素を非表示にすることで、エンドユーザーが**保存**または**名前を付けて保存**操作を呼び出さないようにすることができます。

**保存**操作を無効にするには、編集を完全に無効にする必要があります。編集を無効にする方法の詳細については、[編集](editing-dashboards.md#canedit)のトピックを参照してください。

**[名前を付けて保存]** 操作を無効にするには、`RevealView.CanSaveAs` プロパティを `false` に設定する必要があります。

```xml
<rv:RevealView x:Name="_revealView" CanSaveAs="False" />
```

## 例: 保存の実装

ダッシュボードを保存するデフォルトのディレクトリを保持する変数を作成することから始めましょう。この場合、ダッシュボードをアプリケーション ディレクトリからの相対的な **Dashboards** フォルダーに保存します。

```cs
string _defaultDirectory = Path.Combine(Environment.CurrentDirectory, "Dashboards");
```

次に、**[保存]** 操作と **[名前を付けて保存]** のどちらの操作を行っているかを確認しましょう。

```cs
private async void RevealView_SaveDashboard(object sender, Reveal.Sdk.DashboardSaveEventArgs e)
{
    if (e.IsSaveAs)
    {
                
    }
    else
    {
                      
    }      
}
```

それでは、**保存**操作を実装しましょう。上書きする **.rdash** ファイルのパスを取得することから始めます。**.rdash** ファイルの名前はダッシュボードのタイトルと一致する必要があるため、`e.Name` を使用してパスを作成できます。パスを取得したら、`e.Serialize()` メソッドを使用して、現在のダッシュボードの `byte[]` を取得できます。ダッシュボードの `byte[]` を取得したら、ファイル ストリームを作成してディスクに保存できます。

```cs
private async void RevealView_SaveDashboard(object sender, Reveal.Sdk.DashboardSaveEventArgs e)
{
    if (e.IsSaveAs)
    {
                
    }
    else
    {
        var path = Path.Combine(_defaultDirectory, $"{e.Name}.rdash");
        var data = await e.Serialize();
        using (var output = File.Open(path, FileMode.Open))
        {
            output.Write(data, 0, data.Length);
        }    
    }
}
```

次の手順は、**名前を付けて保存**操作を実装することです。  最初にエンドユーザーによって提供されるダッシュボードの新しいファイル パスをキャプチャしてから、そのファイル パスに基づいて新しいファイルを作成する必要があるため、この手順にはもう少しコードが必要です。  これを行うには、WPF が提供する `SaveFileDialog` を使用します。  エンドユーザーから新しいファイル パスをキャプチャしたら、そのパスを使用して新しい `FileStream` を作成します。次に、**.rdash** ファイルの名前とダッシュボードのタイトルの両方として使用されるパスから新しいファイル名を抽出します。  ファイル名とタイトルが同じであることを確認するために、`e.SerializeWithNewName()` メソッドを使用して、抽出された名前を引数として渡します。`byte[]` を取得したら、それをディスクに書き込みます。

コードは以下のようになります。

```cs
private async void RevealView_SaveDashboard(object sender, Reveal.Sdk.DashboardSaveEventArgs e)
{
    if (e.IsSaveAs)
    {
        var saveDialog = new SaveFileDialog()
        {
            DefaultExt = ".rdash",
            FileName = e.Name + ".rdash",
            Filter = "Reveal Dashboard (*.rdash)|*.rdash",
            InitialDirectory = _defaultDirectory
        };

        if (saveDialog.ShowDialog() == true)
        {
            using (var stream = new FileStream(saveDialog.FileName, FileMode.Create, FileAccess.Write))
            {
                var name = Path.GetFileNameWithoutExtension(saveDialog.FileName);
                var data = await e.SerializeWithNewName(name);
                await stream.WriteAsync(data, 0, data.Length);
            }
        }
    }
    ...
}
```

最後の手順は、保存ロジックが完了したことを `RevealView` に通知することです。これには、`e.SaveFinished();` への最後の呼び出しが必要です。  最終的な保存ロジックは次のとおりです:

```cs
private async void RevealView_SaveDashboard(object sender, Reveal.Sdk.DashboardSaveEventArgs e)
{
    if (e.IsSaveAs)
    {
        var saveDialog = new SaveFileDialog()
        {
            DefaultExt = ".rdash",
            FileName = e.Name + ".rdash",
            Filter = "Reveal Dashboard (*.rdash)|*.rdash",
            InitialDirectory = _defaultDirectory
        };

        if (saveDialog.ShowDialog() == true)
        {
            using (var stream = new FileStream(saveDialog.FileName, FileMode.Create, FileAccess.Write))
            {
                var name = Path.GetFileNameWithoutExtension(saveDialog.FileName);
                var data = await e.SerializeWithNewName(name);
                await stream.WriteAsync(data, 0, data.Length);
            }
        }
    }
    else
    {
        var path = Path.Combine(_defaultDirectory, $"{e.Name}.rdash");
        var data = await e.Serialize();
        using (var output = File.Open(path, FileMode.Open))
        {
            output.Write(data, 0, data.Length);
        }
    }

    e.SaveFinished();
}
```

:::info コードを取得する

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-wpf/tree/master/SavingDashboards) にあります。

:::