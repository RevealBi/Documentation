# ダッシュボード リンク

Reveal SDK は、ダッシュボード間を行き来することのできるダッシュボード リンクをサポートしています。ダッシュボードからダッシュボードに移動することで、業務上のハイレベルな概要からより詳細なビューに進むことができます。

Reveal SDK の観点からは、ダッシュボード リンクは、別のダッシュボードをロードする表示形式内のリンクをエンドユーザーがクリックしたときに呼び出されます。

![](images/linking-open-campaigns.jpg)

:::info

現在、ダッシュボード リンクは Reveal SDK で作成できません。[Slingshot](https://my.slingshotapp.io/) などのネイティブ Reveal アプリケーションを使用する必要があります。

:::

## ダッシュボード リンクへの応答

ダッシュボード内の **ダッシュボード リンク** がクリックされたときに応答するには、プロパティ `RevealView.onLinkedDashboardProvider ` に、ダッシュボードをロードする Promise を返す `RVDashboard.loadDashboardAsync` メソッドを設定する必要があります。

ダッシュボード ID を使用する方法:
```javascript
revealView.onLinkedDashboardProviderAsync = (dashboardId, title) => {
    return $.ig.RVDashboard.loadDashboard(dashboardId);
};
```

ダッシュボードが [Reveal アプリ](https://app.revealbi.io/)で作成された場合、ダッシュボードの ID は自動生成されます。しかしダッシュボードの ID はシナリオによっては使用しない場合があります。その場合、代わりにダッシュボードのタイトルを使用できます。

ダッシュボード タイトルを使用する方法:
```javascript
revealView.onLinkedDashboardProviderAsync = (dashboardId, title) => {
    return $.ig.RVDashboard.loadDashboard(title);
};
```

ダッシュボードのタイトルは、サーバーでホストされているダッシュボードの .rdash ファイルのファイル名です。

:::info Get the Code

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/master/LinkingDashboards) にあります。

:::