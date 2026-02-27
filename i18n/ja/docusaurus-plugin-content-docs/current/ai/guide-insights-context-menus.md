---
sidebar_label: コンテキストメニューによるインサイト
---


# コンテキストメニューによるインサイト

このガイドでは、RevealView ダッシュボードのコンテキストメニューに AI を活用したインサイトオプションを追加する方法を説明します。ユーザーはダッシュボードや個々のビジュアライゼーションを右クリックして、要約、分析、予測を生成できるようになります。

## インサイトメニュー項目の追加

`onMenuOpening` イベントを使用して、AI インサイトをトリガーするカスタムメニュー項目を追加します：

```typescript
const client = RevealSdkClient.getInstance();

revealView.onMenuOpening = function (visualization, args) {
  // Dashboard-level insights (right-click on dashboard background)
  if (args.menuLocation === $.ig.RVMenuLocation.Dashboard) {
    args.menuItems.push(new $.ig.RVMenuItem("Summary", null, async () => {
      const insight = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        type: 'summary',
      });
      displayInsight(insight.explanation);
    }));

    args.menuItems.push(new $.ig.RVMenuItem("Analysis", null, async () => {
      const insight = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        type: 'analysis',
      });
      displayInsight(insight.explanation);
    }));

    args.menuItems.push(new $.ig.RVMenuItem("Forecast", null, async () => {
      const insight = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        type: 'forecast',
      });
      displayInsight(insight.explanation);
    }));
  }

  // Visualization-level insights (right-click on a specific visualization)
  if (args.menuLocation === $.ig.RVMenuLocation.Visualization) {
    args.menuItems.push(new $.ig.RVMenuItem("Analyze This", null, async () => {
      const insight = await client.ai.insights.get({
        dashboard: revealView.dashboard,
        visualizationId: visualization.id,
        type: 'analysis',
      });
      displayInsight(insight.explanation);
    }));
  }
};
```

## ストリーミングサポートの追加

よりインタラクティブな体験のために、ストリーミングを使用してインサイトを生成しながら表示します：

```typescript
function createInsightMenuItem(label, dashboard, insightType, visualizationId = null) {
  return new $.ig.RVMenuItem(label, null, async () => {
    const options = {
      dashboard: dashboard,
      type: insightType,
      stream: true,
    };

    if (visualizationId) {
      options.visualizationId = visualizationId;
    }

    let buffer = '';
    const stream = await client.ai.insights.get(options);

    stream.on('progress', (message) => {
      showProgressIndicator(message);
    });

    stream.on('text', (content) => {
      buffer += content;
      displayInsight(buffer);
    });

    stream.on('error', (error) => {
      showError(error);
    });

    await stream.finalResponse();
    hideProgressIndicator();
  });
}

// Use the helper in onMenuOpening
revealView.onMenuOpening = function (visualization, args) {
  if (args.menuLocation === $.ig.RVMenuLocation.Dashboard) {
    args.menuItems.push(createInsightMenuItem("Summary", revealView.dashboard, 'summary'));
    args.menuItems.push(createInsightMenuItem("Analysis", revealView.dashboard, 'analysis'));
    args.menuItems.push(createInsightMenuItem("Forecast", revealView.dashboard, 'forecast'));
  }

  if (args.menuLocation === $.ig.RVMenuLocation.Visualization) {
    args.menuItems.push(createInsightMenuItem("Summary", revealView.dashboard, 'summary', visualization.id));
    args.menuItems.push(createInsightMenuItem("Analysis", revealView.dashboard, 'analysis', visualization.id));
  }
};
```
