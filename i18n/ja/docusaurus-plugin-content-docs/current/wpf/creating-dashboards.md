# ダッシュボードの作成

新しいダッシュボードの作成は本当に簡単です。`RevealView.Dashboard` プロパティを `RVDashboard` オブジェクトの新しいインスタンスに設定する必要があります。

XAML で `RevealView` コントロールを定義することから始め、ファイルの背後にあるコードでコントロールにアクセスできるように `x:Name` を指定します:
```xml
<rv:RevealView x:Name="_revealView"/>
```

次に、xaml ファイルの背後にあるコードで、`RevealView.Dashboard` プロパティを `RVDashboard` オブジェクトの新しいインスタンスに設定します:
```cs
_revealView.Dashboard = new RVDashboard();
```

アプリケーションを実行すると、新しい空のダッシュボードが表示されます。

![](images/getting-started-running-app.jpg)

ご覧のとおり、これにより使用する新しいダッシュボード インスタンスが提供されますが、ダッシュボードで使用するデータ ソースを `RevealView` に提供していない限り、エンドユーザーは新しいダッシュボードで新しい表示形式を作成できません。

次の手順:
- [データ ソースの追加](adding-data-sources/in-memory-data.md)
- [ダッシュボードの読み込み](loading-dashboards.md)