import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 2.0.0 へのアップグレード

このガイドでは、Reveal SDK 2.0 で導入された破壊的変更と、既存の 1.x アプリケーションを 2.0 にアップグレードするために必要な手順について説明します。

:::note 1.8.4 より前のバージョンをお使いですか?
まず [1.x アップグレード ガイド (1.8.4 ドキュメント)](/1.8.4/web/upgrade-guide-v1.6.0/) に従ってプロジェクトを 1.8.4 にアップグレードしてから、このページに戻って 2.0 への移行を完了してください。
:::

## 破壊的変更の概要

- **jQuery と Day.js の削除** — SDK は jQuery と Day.js に依存しなくなりました。
- **NPM 配信** — クライアント SDK は npm パッケージとして配信されるようになりました。レガシーなスクリプトタグによる配信は推奨されなくなりました。
- **`$.ig` と `RevealApi` 名前空間の削除** — グローバル名前空間は `Reveal` のみになりました。`$.ig.ClassName` および `RevealApi.ClassName` を `Reveal.ClassName` に置き換えてください。
- **API の名前変更と削除** 
    - `DateFilter` - _削除_ `RevealView`、`RVDashboard`、`ExportOptionsBase` から非推奨プロパティを削除
    - `Reveal.Sdk.Dashboard.ToJsonStringAsync` - _名前変更_ `ToJsonString` に変更。
- **非推奨の型** — `RVDashboardThumbnailView` は非推奨になりました。`RVThumbnail` を使用してください。

## アップグレード手順

### 1. jQuery を削除する

Reveal SDK は jQuery を必要としなくなりました。SDK のためにロードしていた jQuery のスクリプトタグを削除してください:

```html
<!-- この行を削除 -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```

:::info
アプリケーション自体のコードが jQuery に依存している場合はそのまま使用できます — Reveal SDK が jQuery を必要としなくなっただけです。
:::

また、古いバージョンから残っている **Day.js**、**Quill.js**、**Spectrum.js** も削除してください:

```html
<!-- これらがある場合は削除 -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css" rel="stylesheet" type="text/css" >
<script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css" >
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

### 2. クライアント SDK を NPM に切り替える

レガシーなスクリプトタグによるインストールを npm パッケージに置き換えます。

<Tabs groupId="delivery">
  <TabItem value="before" label="1.x (スクリプトタグ)">

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
<script src="https://dl.revealbi.io/reveal/libs/1.8.4/infragistics.reveal.js"></script>
```

  </TabItem>
  <TabItem value="after" label="2.0 (npm)">

```bash
npm install reveal-sdk
```

```typescript
import "reveal-sdk";
```

  </TabItem>
</Tabs>

:::tip スクリプトタグが必要ですか?
バンドラーを使用しない環境向けに SDK 配布 zip は引き続き利用可能ですが、jQuery と Day.js は不要になりました:

```html
<script src="./assets/reveal/reveal-sdk.js"></script>
```
:::

:::info インストール ガイド
CDN + ES Modules、Angular での npm、React での npm など、クライアント SDK のインストール方法を詳しく確認する場合は、[インストール ガイド](installation/installation.md) を参照してください。
:::

### 3. サーバー SDK パッケージを更新する

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

`Reveal.Sdk.*` NuGet パッケージをバージョン **2.0.0** 以降に更新します。

```xml
<PackageReference Include="Reveal.Sdk.AspNetCore" Version="2.0.0" />
```

  </TabItem>
  <TabItem value="java" label="Java">

Maven/Gradle の依存関係をバージョン **2.0.0** 以降に更新します。

```xml
<dependency>
    <groupId>com.infragistics.reveal.sdk</groupId>
    <artifactId>reveal-sdk</artifactId>
    <version>2.0.0</version>
</dependency>
```

  </TabItem>
  <TabItem value="node" label="Node.js">

```bash
npm install reveal-sdk-node@2.0.0
```

  </TabItem>
</Tabs>

### 4. API の使用方法を更新する

#### `$.ig` / `RevealApi` → `Reveal`

`$.ig` と `RevealApi` のグローバル名前空間は削除されました。名前空間は `Reveal` のみになりました。TypeScript で `infragistics.reveal.d.ts` を使用して IntelliSense を利用していた場合 (例: `new $.ig.RevealView`)、すべての参照を `Reveal` に更新してください。

<Tabs groupId="api-namespace">
  <TabItem value="before" label="1.x">

```javascript
$.ig.RevealSdkSettings.setBaseUrl("https://localhost:5111/");
var revealView = new $.ig.RevealView("#revealView");
```

  </TabItem>
  <TabItem value="after" label="2.0">

```javascript
Reveal.RevealSdkSettings.setBaseUrl("https://localhost:5111/");
var revealView = new Reveal.RevealView("#revealView");
```

  </TabItem>
</Tabs>

#### `DateFilter` → `filters` + `RVDateRule`

非推奨の `DateFilter` プロパティは削除されました。代わりに `filters` コレクションを使用してください。  DateFilter は `RevealView`、`RVDashboard`、`RVDateDashboardFilter`、`IExportOptions`、`RevealSettings`、`ExportOptionsBase` およびその子クラスから削除されました。

<Tabs groupId="api-datefilter">
  <TabItem value="before" label="1.x">

```javascript
var myRule = new $.ig.RVDateRule($.ig.RVPeriodRelation.Last, 3, $.ig.RVPeriodType.Month);
dashboard.dateFilter = new $.ig.RVDateDashboardFilter(myRule);
```

  </TabItem>
  <TabItem value="after" label="2.0">

```javascript
var myRule = new Reveal.RVDateRule(Reveal.RVPeriodRelation.Last, 3, Reveal.RVPeriodType.Month);
var myDateFilter = dashboard.filters.findByTitle("My Date Filter");
myDateFilter.rule = myRule;
```

  </TabItem>
</Tabs>

#### `RVDashboardThumbnailView` → `RVThumbnail`

<Tabs groupId="api-thumbnail">
  <TabItem value="before" label="1.x">

```javascript
var thumbnailView = new $.ig.RevealDashboardThumbnailView("#thumbnail");
$.ig.RevealUtility.getDashboardInfo("Sales", function (info) {
  thumbnailView.dashboardInfo = info.info;
});
```

  </TabItem>
  <TabItem value="after" label="2.0">

```javascript
Reveal.RVThumbnail.fromDashboard("#thumbnail", "Sales");
```

  </TabItem>
</Tabs>

新しい `RVThumbnail` API はランタイムでのテーマ変更もサポートしています。

## 削除された API

| API | 代替 |
|---|---|
| `$.ig` 名前空間 | `Reveal` 名前空間 |
| `RevealApi` 名前空間 | `Reveal` 名前空間 |
| `DateFilter` プロパティ | `filters` コレクション |
| `RVDashboardThumbnailView` | `RVThumbnail` |
| `Reveal.Sdk.Dashboard.ToJsonStringAsync` | `ToJsonString` |
| レガシー チャート タイプ (以前に非推奨) | 現在の[チャート タイプ](/web/chart-types)を使用 |
| レガシー Java エンジン | Java SDK (Spring Boot) |

## チェックリスト

- [ ] jQuery の `<script>` タグを削除
- [ ] Quill.js と Spectrum.js の参照がある場合は削除
- [ ] クライアント SDK を npm パッケージに切り替え (またはスクリプトタグ構成から jQuery を削除)
- [ ] サーバー SDK パッケージを 2.0.0 に更新
- [ ] すべてのクライアントコードで `$.ig.` と `RevealApi.` を `Reveal.` に置き換え
- [ ] `DateFilter` プロパティの使用を `Filters` リストで置き換え
- [ ] `RVDashboardThumbnailView` を `RVThumbnail` に置き換え
- [ ] `Reveal.Sdk.Dashboard.ToJsonStringAsync` を `ToJsonString` に置き換え
- [ ] 削除されたレガシー チャート タイプを使用しているダッシュボードがないことを確認
- [ ] レガシー Java エンジンを使用している場合は、サポートされているサーバー SDK に移行

## お困りですか?

アップグレード中に問題が発生した場合は、[Issue を作成する](https://github.com/RevealBi/Reveal.Sdk/issues)か、アプリ内チャットからお問い合わせください。
