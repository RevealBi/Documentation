# Reveal SDK のインストール

以下の手順では、Reveal SDK を既存の WPF プロジェクトにインストールする方法について説明します。

1 - ソリューションまたはプロジェクトを右クリックし、**[ソリューションの NuGet パッケージの管理]** を選択します。

![](images/getting-started-nuget-packages-manage.jpg)

2 - パッケージ マネージャー ダイアログで **[Browse] (参照)** タブを開き、**Reveal.Sdk.Wpf** NuGet パッケージをプロジェクトにインストールします。

![](images/getting-started-nuget-packages-install.jpg)

3 - プロジェクトを右クリックし、**[追加] -> [新しいフォルダー]** を選択します。フォルダーの名前は **[Dashboards]** にしてください。

![](images/load-dashboards-dashboard-directory.jpg)

デフォルトで、Reveal SDK は **Dashboards** フォルダーからすべてのダッシュボードを読み込む規則を使用します。この規則を変更でするにはカスタムの `IRVDashboardProvider` を作成します。詳細については、[ダッシュボードの読み込み](loading-dashboards.md)トピックを参照してください。