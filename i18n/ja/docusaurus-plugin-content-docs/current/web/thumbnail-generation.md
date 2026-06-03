# サムネイル生成

`RVThumbnail` クラスを使用すると、アプリケーション内でダッシュボードおよびビジュアライゼーションのサムネイルをレンダリングできます。サムネイルは、カスタム ダッシュボード セレクター、ギャラリー ビュー、または `RevealView` の外部でのプレビューを構築する際に役立ちます。

## ダッシュボード サムネイルのレンダリング

サムネイル用の HTML 要素を作成し、そのセレクターをダッシュボード ID とともに `RVThumbnail.fromDashboard` に渡します。

```html
<div id="thumbnail" style="width: 240px; height: 160px;"></div>
```

サムネイルに表示領域を確保するため、コンテナーには明示的な幅と高さを設定してください。

```typescript
import { RVThumbnail } from "reveal-sdk";

async function renderThumbnail() {
  await RVThumbnail.fromDashboard("#thumbnail", "Sales");
}

renderThumbnail();
```

2 番目の引数が文字列の場合、Reveal SDK はそのダッシュボード ID を使用してサーバーからダッシュボード情報を読み込みます。既存の `RVDashboard` インスタンスを渡すこともできます。

```typescript
import { RVDashboard, RVThumbnail } from "reveal-sdk";

async function renderThumbnail() {
  const dashboard = await RVDashboard.loadDashboard("Sales");
  await RVThumbnail.fromDashboard("#thumbnail", dashboard);
}

renderThumbnail();
```

## ビジュアライゼーション サムネイルのレンダリング

ダッシュボード内の特定のビジュアライゼーションのサムネイルをレンダリングするには、3 番目の引数としてビジュアライゼーションを渡します。ビジュアライゼーションは、ゼロベースのインデックス、タイトル、または `RVVisualization` インスタンスで識別できます。

```typescript
import { RVThumbnail } from "reveal-sdk";

async function renderThumbnail() {
  await RVThumbnail.fromDashboard("#thumbnail", "Sales", "Sales by Territory");
}

renderThumbnail();
```

```typescript
import { RVThumbnail } from "reveal-sdk";

async function renderThumbnail() {
  await RVThumbnail.fromDashboard("#thumbnail", "Sales", 0);
}

renderThumbnail();
```

## チャート タイプ サムネイルのレンダリング

ダッシュボードを読み込まずにチャート タイプのサムネイルが必要な場合は、`RVThumbnail.fromChartType` を使用します。

```typescript
import { RVChartType, RVThumbnail } from "reveal-sdk";

RVThumbnail.fromChartType("#thumbnail", RVChartType.ColumnChart);
```

## ダッシュボード JSON からのレンダリング

ダッシュボードの JSON 文字列が既にある場合は、`RVThumbnail.fromDashboardJson` を使用します。

```typescript
import { RVThumbnail } from "reveal-sdk";

RVThumbnail.fromDashboardJson("#thumbnail", dashboardJson);
```

## ランタイム テーマの変更

`RVThumbnail` は現在の `RevealSdkSettings.theme` を使用します。ランタイムでテーマが変更されると、アクティブなサムネイルは自動的に更新されます。

```typescript
import { MountainDarkTheme, RevealSdkSettings } from "reveal-sdk";

RevealSdkSettings.theme = new MountainDarkTheme();
```

## サムネイルの破棄

サムネイルのリソースは、コンテナー要素が DOM から削除されると自動的に解放されます。フレームワークのライフサイクル フックからサムネイルを明示的に破棄することもできます。

```typescript
async function renderThumbnail() {
  const thumbnail = await RVThumbnail.fromDashboard("#thumbnail", "Sales");
  thumbnail?.dispose();
}

renderThumbnail();
```
