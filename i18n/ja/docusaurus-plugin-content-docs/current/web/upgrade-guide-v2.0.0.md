import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 2.0.0 へのアップグレード

このガイドでは、Reveal SDK 2.0 で導入された破壊的変更と、既存の 1.x アプリケーションを 2.0 にアップグレードするために必要な手順について説明します。

:::note 1.8.4 より前のバージョンをお使いですか?
まず [1.x アップグレード ガイド (1.8.4 ドキュメント)](/1.8.4/web/upgrade-guide-v1.6.0/) に従ってプロジェクトを 1.8.4 にアップグレードしてから、このページに戻って 2.0 への移行を完了してください。
:::

## 破壊的変更の概要

- **jQuery の削除** — SDK は jQuery に依存しなくなりました。
- **NPM 配信** — クライアント SDK は npm パッケージとして配信されるようになりました。レガシーなスクリプトタグによる配信は推奨されなくなりました。
- **レガシー Java エンジンおよび WPF バックエンドの削除** — これらは完全に削除されました。
- **レガシー チャート タイプの削除** — 以前に非推奨となっていたチャート タイプは利用できなくなりました。
- **API の名前変更と削除** — `DateFilter`、フィルター プロパティ名、`RVDashboardThumbnailView`、`ToJsonStringAsync` は名前変更または削除されました。

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

また、古いバージョンから残っている **Quill.js** と **Spectrum.js** も削除してください:

```html
<!-- これらがある場合は削除 -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css" rel="stylesheet" type="text/css" >
<script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css" >
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
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
npm install reveal-sdk dayjs
```

```typescript
import "reveal-sdk";
```

  </TabItem>
</Tabs>

:::tip スクリプトタグが必要ですか?
バンドラーを使用しない環境向けに SDK 配布 zip は引き続き利用可能ですが、jQuery は不要になりました:

```html
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
<script src="./assets/reveal/infragistics.reveal.js"></script>
```
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

#### `DateFilter` → `filters` + `RVDateRule`

非推奨の `DateFilter` プロパティは削除されました。代わりに `filters` コレクションを使用してください。

<Tabs groupId="api-datefilter">
  <TabItem value="before" label="1.x">

```javascript
visualization.dateFilter = new RVDateDashboardFilter();
```

  </TabItem>
  <TabItem value="after" label="2.0">

```javascript
const dateRule = new RVDateRule();
visualization.filters = [dateRule];
```

  </TabItem>
</Tabs>

#### フィルター プロパティの名前変更

| 旧名称 (1.x) | 新名称 (2.0) |
|---|---|
| `NumberOfItemsInGrid` | `FilterCount` |
| `FilterRangeText` | `FilterSelectionText` |
| `UpdateFilterRangeText` | `UpdateFilterSelectionText` |

すべての参照を更新してください — 旧名称は利用できなくなりました。

#### `RVDashboardThumbnailView` → `RVThumbnail`

<Tabs groupId="api-thumbnail">
  <TabItem value="before" label="1.x">

```javascript
const thumbnailView = new RVDashboardThumbnailView();
```

  </TabItem>
  <TabItem value="after" label="2.0">

```javascript
const thumbnail = new RVThumbnail();
```

  </TabItem>
</Tabs>

新しい `RVThumbnail` API はランタイムでのテーマ変更もサポートしています。

#### `ToJsonStringAsync` → `ToJsonString`

<Tabs groupId="api-json">
  <TabItem value="before" label="1.x">

```csharp
var json = await dashboard.ToJsonStringAsync();
```

  </TabItem>
  <TabItem value="after" label="2.0">

```csharp
var json = dashboard.ToJsonString();
```

  </TabItem>
</Tabs>

## 削除された API

| API | 代替 |
|---|---|
| `DateFilter` プロパティ | `filters` コレクションと `RVDateRule` |
| `RVDashboardThumbnailView` | `RVThumbnail` |
| `ToJsonStringAsync` | `ToJsonString` |
| `NumberOfItemsInGrid` | `FilterCount` |
| `FilterRangeText` | `FilterSelectionText` |
| `UpdateFilterRangeText` | `UpdateFilterSelectionText` |
| レガシー チャート タイプ (以前に非推奨) | 現在の[チャート タイプ](/web/chart-types)を使用 |
| レガシー Java エンジン | Java SDK (Spring Boot) |
| WPF バックエンド | ASP.NET、Node.js、または Java サーバー SDK |

## チェックリスト

- [ ] jQuery の `<script>` タグを削除
- [ ] Quill.js と Spectrum.js の参照がある場合は削除
- [ ] クライアント SDK を npm パッケージに切り替え (またはスクリプトタグ構成から jQuery を削除)
- [ ] サーバー SDK パッケージを 2.0.0 に更新
- [ ] `DateFilter` の使用を `filters` と `RVDateRule` に置き換え
- [ ] `NumberOfItemsInGrid` → `FilterCount` に名前変更
- [ ] `FilterRangeText` → `FilterSelectionText` に名前変更
- [ ] `UpdateFilterRangeText` → `UpdateFilterSelectionText` に名前変更
- [ ] `RVDashboardThumbnailView` を `RVThumbnail` に置き換え
- [ ] `ToJsonStringAsync` を `ToJsonString` に置き換え
- [ ] 削除されたレガシー チャート タイプを使用しているダッシュボードがないことを確認
- [ ] レガシー Java エンジンまたは WPF バックエンドを使用している場合は、サポートされているサーバー SDK に移行

## お困りですか?

アップグレード中に問題が発生した場合は、[Issue を作成する](https://github.com/RevealBi/Reveal.Sdk/issues)か、アプリ内チャットからお問い合わせください。
