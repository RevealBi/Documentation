---
sidebar_label: Insights with Context Menus
---


# Insights with Context Menus

This guide shows how to add AI-powered insight options to your RevealView dashboard context menus. Users will be able to right-click on the dashboard or individual visualizations and generate summaries, analyses, and forecasts.

## Adding Insight Menu Items

Use the `onMenuOpening` event to add custom menu items that trigger AI insights:

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

## Adding Streaming Support

For a more interactive experience, use streaming to display insights as they are generated:

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
