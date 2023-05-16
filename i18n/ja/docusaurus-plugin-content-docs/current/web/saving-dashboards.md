# ダッシュボードの保存

ダッシュボードの保存は、アプリケーションの `RevealView` コントロール内の保存ボタンを使用してエンドユーザーによって呼び出されます。

`RevealView` でサポートされている保存操作には次の 2 種類があります:
- **保存** - 現在のダッシュボードを保存し、ディスク上の現在の **.rdash** ファイルを上書きします。
- **名前を付けて保存** - 現在のダッシュボードを新しい **.rdash** ファイルとしてディスクに保存します。元の **.rdash** ファイルはそのままにしておきます。

エンドユーザーが編集モードのときに、`RevealView` の右上隅にある**チェック ボタン**をクリックすると、**保存**操作が呼び出されます。

![](images/saving-save-button.jpg)

エンドユーザーが `RevealView` の右上隅にある**ケバブ メニュー**を開き、**[名前を付けて保存]** メニュー項目を選択すると、**名前を付けて保存**操作が呼び出されます。

![](images/saving-saveas-button.jpg)

## 保存の実装
サーバーの **Dashboards** フォルダーにダッシュボードを保存するという規約に従う場合、Reveal SDK はデフォルトの**保存**機能を提供します。ただし、ダッシュボードをサーバーの **Dashboards** フォルダーに保存せず、カスタムの `IRVDashboardProvider` を作成している場合は、独自のカスタム保存ロジックを実装する必要があります。[ダッシュボードの読み込み](loading-dashboards.md#load-from-custom-file-path)トピックでは、カスタムの保存場所からダッシュボードを読み込む方法について説明します。

まず、既存の `IRVDashboardProvider` クラスを変更して、`IRVDashboardProvider.SaveDashboardAsync` メソッドを実装します。この例では、ダッシュボード ファイルを **MyDashboards** という名前のフォルダーに保存しています。

```cs
public class DashboardProvider : IRVDashboardProvider
{
    public Task<Dashboard> GetDashboardAsync(IRVUserContext userContext, string dashboardId)
    {
        var filePath = Path.Combine(Environment.CurrentDirectory, $"MyDashboards/{dashboardId}.rdash");
        var dashboard = new Dashboard(filePath);
        return Task.FromResult(dashboard);
    }

    public async Task SaveDashboardAsync(IRVUserContext userContext, string dashboardId, Dashboard dashboard)
    {
        var filePath = Path.Combine(Environment.CurrentDirectory, $"MyDashboards/{dashboardId}.rdash");
        await dashboard.SaveToFileAsync(filePath);
    }
}
```

## 名前を付けて保存の実装
Reveal SDK は、デフォルトで**保存**機能を提供します。ただし、Reveal SDK は、エンドユーザーからダッシュボードの新しいファイル名をキャプチャする必要があるため、**名前を付けて保存**の実装を提供しません。つまり、開発者は、クライアント アプリケーション内で **名前を付けて保存**の操作を実行するために必要なすべてのコードを記述する必要があります。

Reveal SDK で**名前を付けて保存**を実行するには、次の 2 つの方法があります:
- 新しいファイル名をキャプチャしてから、`IRVDashboardProvider` 実装を使用してサーバーに保存を実行します。
- 新しいファイル名をキャプチャし、カスタム保存ロジックを使用してダッシュボードを手動でシリアル化します。

カスタム保存ロジックを実装する場合、つまりダッシュボードを手動でシリアル化し、結果をカスタム REST サービスエンドポイントに POST/PUT する場合は、`RevealView.serverSideSave` プロパティを `false` に設定する必要があります。これにより、すべての保存操作がクライアント アプリケーションによって制御され、サーバーに存在する可能性のある `IRVDashboardProvider` 実装を使用しないことが Reveal SDK に指示されます。

```js
revealView.serverSideSave = false;
```

クライアントで保存操作を実行するには、`RevealView.onSave` イベントにイベント ハンドラーを追加する必要があります。

```js
revealView.onSave = (rv, args) => {
    //handle save
};
```

`RevealView.onSave` イベントは、`RevealView` と `DashboardSaveEventArgs` の 2 つのパラメーターを提供します。

`DashboardSaveEventArgs` オブジェクトは、ダッシュボードの保存に役立つ次のプロパティとメソッドを提供します:
- **name** - これは現在のダッシュボードのタイトル (`RevealView` のダッシュボードの上部に表示されるテキスト) です。**.rdash** の名前がダッシュボードのタイトルと一致することが重要です。
- **dashboardId** - 保存されているダッシュボードの Id。既存のダッシュボードの場合、これは読み込み時に使用される ID です。新しいダッシュボードまたは名前を付けて保存の操作の場合、値は null になります。このプロパティの値は、既存のダッシュボードを「名前を付けて保存」するとき、または新規ダッシュボードを保存するときに、saveFinished を呼び出す前に設定する必要があります。設定しないと、ダッシュボード名と一致すると見なされます。
- **isNew** - このイベントが新しく作成されたダッシュボードを保存することによって発生したかどうかを示すフラグ。既存のダッシュボードを保存または名前を付けて保存する場合は false になります。
- **saveAs** - これが**名前を付けて保存**操作であるかどうかを判別します。
- **serialize(bytes => { })** - 現在のダッシュボードをカスタム保存ロジックで使用できる `byte[]` に​​シリアル化します。**保存**操作で使用されます。
- **serializeWithNewName(name, bytes => { })** - `name` と `dashboardId` を変更し、ダッシュボードをカスタム保存ロジックで使用できる `byte []` に​​シリアル化します。現在読み込まれているダッシュボードの `name` または `dashboardId` は変更しません。保存操作中にこれを手動で行う必要があります。**名前を付けて保存**操作で使用されます。
- **savedFinished() - REQUIRED** - このメソッドは、`RevealView` を編集モードから表示モードにし、保存が完了したことを示します。

## 保存を無効にする
編集を無効にするか、**[名前を付けて保存]** UI 要素を非表示にすることで、エンドユーザーが**保存**または**名前を付けて保存**の操作を呼び出さないようにすることができます。

**保存**操作を無効にするには、`RevealView.canEdit` プロパティを `false` に設定して、編集を完全に無効にする必要があります。

```js
revealView.canEdit="false";
```

**名前を付けて保存**の操作を無効にするには、`RevealView.canSaveAs` プロパティを `false` に設定する必要があります。

```js
revealView.canSaveAs="false";
```

## 例: IRVDashboardProvider を使用した保存の実装
この例では、クライアント アプリケーションに**保存**と**名前を付けて保存**の両方を実装しますが、実際の保存を実行するには、サーバーの `IRVDashboardProvider` 実装に依存します。

ASP.NET Core Web API サーバー アプリケーションで、`IRVDashboardProvider` インターフェイスを実装する新しいクラスを作成します。`GetDashboardAsync` メソッドで、カスタム ファイル ディレクトリからダッシュボードを読み込むおよび保存するロジックを追加します。この例では、ASP.NET Core Web API サーバー アプリケーションは **MyDashboards** という名前のフォルダーを使用してすべてのダッシュボードを格納します。

```cs
public class DashboardProvider : IRVDashboardProvider
{
    public Task<Dashboard> GetDashboardAsync(IRVUserContext userContext, string dashboardId)
    {
        var filePath = Path.Combine(Environment.CurrentDirectory, $"MyDashboards/{dashboardId}.rdash");
        var dashboard = new Dashboard(filePath);
        return Task.FromResult(dashboard);
    }

    public async Task SaveDashboardAsync(IRVUserContext userContext, string dashboardId, Dashboard dashboard)
    {
        var filePath = Path.Combine(Environment.CurrentDirectory, $"MyDashboards/{dashboardId}.rdash");
        await dashboard.SaveToFileAsync(filePath);
    }
}
```

`RevealSetupBuilder.AddDashboardProvider` メソッドを使用して、作成した `IRVDashboardProvider` を `RevealSetupBuilder` に追加するよう、`Program.cs` ファイルの `AddReveal` メソッドを更新します。

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddDashboardProvider<DashboardProvider>();
});
```

次に、クライアント アプリケーションを開き、`RevealView.onSave` イベントのイベント ハンドラーを追加し、`DashboardSaveEventArgs.saveAs` プロパティをチェックして、**保存**または**名前を付けて保存**の操作を処理しているかどうかを確認します。

```js
revealView.onSave = (rv, args) => {
    if (args.saveAs) {

    }
    else {
        
    }
};
```

まず、**保存**機能を実装することから始めましょう。これは、`DashboardSaveEventArgs.saveFinished` を呼び出すだけで実行できます。これにより、`IRVDashboardProvider` で提供されるサーバー側の保存コードが呼び出され、編集モードが終了します。

```js
revealView.onSave = (rv, args) => {
    if (args.saveAs) {
        //todo
    }
    else {
        args.saveFinished();
    }
};
```

それでは、**名前を付けて保存**機能を実装しましょう。**名前を付けて保存**を実装する最初の手順は、一意のファイル名を処理していることを確認することです。ダッシュボード名がすでに存在するかどうかをクライアント アプリケーションに通知する REST エンドポイントを ASP.NET Core Web API サーバーに追加しましょう。`Program.cs` ファイルを開き、次のコードを追加します:

```cs
app.Map("/isduplicatename/{name}", (string name) =>
{
    var filePath = Path.Combine(Environment.CurrentDirectory, "MyDashboards");
    return File.Exists($"{filePath}/{name}.rdash");
});
```

また、新しい API を呼び出す関数をクライアント アプリケーションに追加する必要があります。

```js
function isDuplicateName(name) {
    return fetch(`https://localhost:7111/isduplicatename/${name}`).then(resp => resp.text());
}
```

それでは、**名前を付けて保存**の操作の実装を始めましょう。まず、エンドユーザーから新しい名前を取得しましょう。次に、ユーザーが指定した名前が重複していないかどうかを確認します。重複している場合は、既存のファイルを上書きするようにユーザーにプロンプトを出します。エンドユーザーが既存のダッシュボード ファイルを上書きしたくない場合は、`return` ステートメントを呼び出して保存プロセスをキャンセルします。

```js
if (args.saveAs) {
    var newName = prompt("Please enter the dashboard name");
    isDuplicateName(newName).then(isDuplicate => {
        if (isDuplicate === "true") {
            if (!window.confirm("A dashboard with name: " + newName + " already exists. Do you want to override it?")) {
                return;
            }
        }

        //todo - perform save
    }
}
```

**名前を付けて保存**の操作を完了するには、`DashboardSaveEventArgs.dashboardId` と `DashboardSaveEventArgs.name` をダッシュボードの新しい名前に設定しましょう。これにより、現在 `RevealView` に読み込まれているダッシュボードが更新され、サーバーに保存されているファイルと一致します。次に、`DashboardSaveEventArgs.saveFinished` メソッドを呼び出します。このメソッドは、`IRVDashboardProvider` で提供されるサーバー側の保存コードを呼び出し、編集モードを終了します。

```js
args.dashboardId = args.name = newName;
args.saveFinished();
}
```

`RevealView.onSave` イベントの最終的なコードは次のようになります。

```js
revealView.onSave = (rv, args) => {
    if (args.saveAs) {
        var newName = prompt("Please enter the dashboard name");
        isDuplicateName(newName).then(isDuplicate => {
            if (isDuplicate === "true") {
                if (!window.confirm("A dashboard with name: " + newName + " already exists. Do you want to override it?")) {
                    return;
                }
            }

            args.dashboardId = args.name = newName;
            args.saveFinished();
        });

    }
    else {
        args.saveFinished();
    }
}
```

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/SavingDashboards-Server) にあります。

:::


## 例: カスタム保存の実装
この例では、クライアント アプリケーションに**保存**と**名前を付けて保存**の両方を実装しますが、実際の保存を実行する処理はカスタム実装にします。

カスタム保存機能を実装するための最初の手順は、`revealView.serverSideSave` を `false` に設定することです。これは、クライアントが保存操作を処理することを Reveal SDK に通知します。

```js
revealView.serverSideSave = false;
```

次に、保存イベントのイベント ハンドラーを追加し、`DashboardSaveEventArgs.saveAs` プロパティを確認して、**保存**または**名前を付けて保存**の操作を処理しているかどうかを確認します。

```js
revealView.onSave = (rv, args) => {
    if (args.saveAs) {

    }
    else {
        
    }
};
```

まず、**保存**機能を実装することから始めましょう。まず、ダッシュボードのサーバーへの保存を処理する REST サービス エンドポイントを ASP.NET Core Web API サーバー アプリケーションに追加する必要があります。`Program.cs` ファイルを変更し、既存のダッシュボード ファイルの更新を処理する **PUT** ルート エンドポイントをマップします。

このサンプル コードでは、最初にファイルが存在することを確認し、存在しない場合はメソッドを終了します。存在する場合は、リクエストの本文からダッシュボードの `byte[]` 配列を取得する必要があります。`request.Body` からストリームを読み取り、`byte []` に格納し、既存のファイルを上書きして変更をディスクに書き込みます。

```cs
app.MapPut("/dashboards/{name}", async (HttpRequest request, string name) =>
{
    var filePath = Path.Combine(Environment.CurrentDirectory, $"Dashboards/{name}.rdash");
    if (!File.Exists(filePath))
        return;

    byte[] bytes;
    using (var ms = new MemoryStream())
    {
        await request.Body.CopyToAsync(ms);
        bytes = ms.ToArray();
    }

    using (var stream = File.Open(filePath, FileMode.Open))
    {
        stream.Write(bytes, 0, bytes.Length);
    }
});
```

次に、保存を実行する関数をクライアント アプリケーションに追加しましょう。この関数は、**保存**操作と**名前を付けて保存**の操作の両方を処理します。この関数には、ダッシュボードの `name`、ダッシュボードの内容を表す `byte[]`、およびこれが**保存**または**名前を付けて保存**の操作であるかどうかを判別する `isSaveAs` のパラメーターがあります。**名前を付けて保存**の操作の場合、リクエストの`メソッド`を **POST** に設定します。これは、新しいファイルが作成されることを示します。

```js
function saveDashboard(name, bytes, isSaveAs = false) {

    let url = `https://localhost:7111/dashboards/${name}`;
    let params = {
        body: bytes,
        method: "PUT"
    }

    if (isSaveAs) {
        params.method = "POST"
    }

    return fetch(url, params);
}
```

`RevealView.onSave` イベントに**保存**ロジックを実装しましょう。まず、`DashboardSaveEventArgs.serialize` メソッドを呼び出して現在のダッシュボードを `byte[]` に​​シリアル化して、REST サービス エンドポイントに送信できるようにする必要があります。`DashboardSaveEventArgs.serialize` メソッドのコールバックで、前に作成した `saveDashboard` 関数を呼び出し、`DashboardSaveEventArgs.name` と `byte[]` を引数として渡します。`saveDashboard` が完了すると、`DashboardSaveEventArgs.saveFinished` メソッドを呼び出します。このメソッドは、保存が完了したことを Reveal SDK に通知し、`RevealView` を編集モードから外します。

```js
revealView.onSave = (rv, args) => {
    if (args.saveAs) {
        //todo
    }
    else {
        args.serialize(bytes => {
            this.saveDashboard(args.name, bytes).then(() => {
                args.saveFinished();
            });
        });
    }
};
```

それでは、**名前を付けて保存**機能を実装しましょう。**名前を付けて保存**を実装する最初の手順は、一意のファイル名を処理していることを確認することです。ダッシュボード名がすでに存在するかどうかをクライアント アプリケーションに通知する REST エンドポイントを ASP.NET Core Web API サーバーに追加しましょう。`Program.cs` ファイルを開き、次のコードを追加します:

```cs
app.Map("/isduplicatename/{name}", (string name) =>
{
    var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards");
    return File.Exists($"{filePath}/{name}.rdash");
});
```

また、新しい API を呼び出す関数をクライアント アプリケーションに追加します。

```js
function isDuplicateName(name) {
    return fetch(`https://localhost:7111/isduplicatename/${name}`).then(resp => resp.text());
}
```

それでは、**名前を付けて保存**の操作の実装を始めましょう。まず、エンドユーザーから新しい名前を取得しましょう。次に、ユーザーが指定した名前が重複していないかどうかを確認します。重複している場合は、既存のファイルを上書きするようにユーザーにプロンプトを出します。エンドユーザーが既存のダッシュボード ファイルを上書きしたくない場合は、保存プロセスをキャンセルします。まず、`DashboardSaveEventArgs.saveFinished` メソッドを呼び出して、`RevealView` を強制的に編集モードを終了させてから、`return` を実行して、保存操作を実行せずに保存イベントを終了します。

```js
if (args.saveAs) {
    var newName = prompt("Please enter the dashboard name");
    isDuplicateName(newName).then(isDuplicate => {
        if (isDuplicate === "true") {
            if (!window.confirm("A dashboard with name: " + newName + " already exists. Do you want to override it?")) {
                args.saveFinished();
                return;
            }
        }

        //todo - perform save
    });
}
```

**名前を付けて保存**の操作を完了するには、別の REST サービス エンドポイントを ASP.NET Core Web API サーバーに追加して **POST** を処理する必要があります。`Program.cs` ファイルを変更し、新しいダッシュボード ファイルの保存を処理する **POST** ルート エンドポイントをマップします。

このサンプル コードでは、リクエストの本文からダッシュボード `byte[]` を取得することを想定しています。`request.Body` からストリームを読み取り、`byte[]` に格納し新しいダッシュボード ファイルを保存します。

```cs
app.MapPost("/dashboards/{name}", async (HttpRequest request, string name) =>
{
    var ms = new MemoryStream();
    await request.Body.CopyToAsync(ms);
    var bytes = ms.ToArray();

    var filePath = Path.Combine(Environment.CurrentDirectory, $"Dashboards/{name}.rdash");
    using (var stream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
    {
        await stream.WriteAsync(bytes, 0, bytes.Length);
    }
});
```

クライアント コードを更新して、**名前を付けて保存**操作を完了しましょう。保存を実行する前に、`DashboardSaveEventArgs.dashboardId` と `DashboardSaveEventArgs.name` をダッシュボードの新しい名前に設定しましょう。これにより、現在 `RevealView` に読み込まれているダッシュボードが更新され、サーバーに保存されているファイルと一致します。次に、`DashboardSaveEventArgs.serializeWithNewName` を呼び出して、現在のダッシュボードを `byte[]` にシリアル化する必要があります。このメソッドは、新しい `name` を使用してダッシュボードを `byte[]` にシリアライズし、新しくシリアライズされたダッシュボードのタイトルと ID を更新します。`DashboardSaveEventArgs.serializeWithNewName` メソッドのコールバックで、前に作成した `saveDashboard` 関数を呼び出し、`DashboardSaveEventArgs.name`、`byte[]`、および `true` (名前を付けて保存を示す) を引数として渡します。`saveDashboard` が完了すると、`DashboardSaveEventArgs.saveFinished` メソッドを呼び出します。このメソッドは、保存が完了したことを Reveal SDK に通知し、`RevealView` を編集モードから外します。

```js
args.dashboardId = args.name = newName;
args.serializeWithNewName(newName, bytes => {
    this.saveDashboard(newName, bytes, true).then(() => {
        args.saveFinished();
    });
});
```

`RevealView.onSave` イベントの最終的なコードは次のようになります。

```js
revealView.onSave = (rv, args) => {
    if (args.saveAs) {
        var newName = prompt("Please enter the dashboard name");
        isDuplicateName(newName).then(isDuplicate => {
            if (isDuplicate === "true") {
                if (!window.confirm("A dashboard with name: " + newName + " already exists. Do you want to override it?")) {
                    args.saveFinished();
                    return;
                }
            }

            args.dashboardId = args.name = newName;
            args.serializeWithNewName(newName, bytes => {
                this.saveDashboard(newName, bytes, true).then(() => {
                    args.saveFinished();
                });
            });
        });
    }
    else {
        args.serialize(bytes => {
            this.saveDashboard(args.name, bytes).then(() => {
                args.saveFinished();
            });
        });
    }
};
```

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/SavingDashboards-Client) にあります。

:::
