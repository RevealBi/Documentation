# ダッシュボード リンク

Reveal SDK はダッシュボードのリンクをサポートしているため、ユーザーはダッシュボードをナビゲートできます。ダッシュボードからダッシュボードに移動することで、業務上のハイレベルな概要からより詳細なビューに進むことができます。

Reveal SDK の観点からは、ダッシュボードのリンクは、エンドユーザーがビジュアル化されたリンクをクリックして別のダッシュボードをロードするときに呼び出されます。

![](images/linking-open-campaigns.jpg)

:::info

現在、ダッシュボードのリンクは Reveal SDK で作成できません。[Slingshot](https://my.slingshotapp.io/) などのネイティブ Reveal アプリケーションを使用する必要があります。

:::

## ダッシュボード リンクへの応答

ダッシュボード内で**ダッシュボード リンク**がクリックされたときに応答するには、`RevealView.VisualizationLinkingDashboard` イベントに対してイベント ハンドラーを追加します。

```xml
<rv:RevealView x:Name="_revealView" 
                VisualizationLinkingDashboard="RevealView_VisualizationLinkingDashboard" />
```

```cs
private void RevealView_VisualizationLinkingDashboard(object sender, VisualizationLinkingDashboardEventArgs e)
{

}
```
`VisualizationLinkingDashboardEventArgs` には次のプロパティがあります:
- **DashboardId** - 要求されたダッシュボードの ID。
- **Title** - リクエストされたダッシュボードのタイトル。
- **Url** - リクエストされたダッシュボードの URL (該当する場合)。
- **Callback** - このデリゲートは、読み込むために `RevealView` に `RVDashboard` ストリームを提供するために使用されます。

## 例: ダッシュボードへのリンク

この例では、エンドユーザーが **Marketing** ダッシュボードの表示形式をクリックすると、`RevealView.VisualizationLinkingDashboard` イベントが処理されます。このリンクは、クリックされると **Campaigns** ダッシュボードに移動します。

これを行うには、**Dashboards** ディレクトリから **Campaigns.rdash** ファイルへのファイル パスを取得します。ファイル パスを取得したら、そのパスを使用して新しい `FileStream` を作成し、そのストリームを `e.Callback` に提供します。

```cs
private void RevealView_VisualizationLinkingDashboard(object sender, VisualizationLinkingDashboardEventArgs e)
{
    var path = Path.Combine(Environment.CurrentDirectory, "Dashboards/Campaigns.rdash");
    using (var stream = File.OpenRead(path))
    {
        e.Callback(e.DashboardId, stream);
    }
}
```

:::info Get the Code

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-wpf/tree/master/LinkingDashboards) にあります。

:::