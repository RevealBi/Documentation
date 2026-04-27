# マップ タイルのカスタマイズ

Reveal SDK には、散布マップ (散布図) の表示形式タイプが含まれています。デフォルトでは、この表示形式は追加のコンテキストを提供せずに、データ ポイントをマップ上に直接配置します。ただし、開発者は、ニーズに応じてこの動作を柔軟に調整できます。生データを直接表示するのではなく、マップ タイルを使用することを選択でき、フィードされたデータと一緒にマップ情報を表示することで表示形式を強化できます。このオプションは、地理データのより包括的で視覚的に魅力的な表現を提供します。

現在、以下のタイル マップ プロバイダーがシステムでサポートされています: `Bing`、`Esri`、`MapBox`、および `OpenStreetMap` です。

開始するには、まずデフォルトの散布マップを作成する必要があります。これはプロセスの最初の手順として機能し、散布マップの基本機能を探索できるようになります。

![](images/customizing-map-tiles-default.jpg)

ご覧のとおり、ポイントが正しく生成された場合でも、生成されたマップにはコンテキストが欠けています。この問題を解決するには、マップにタイルを追加する必要があります。タイルを組み込むことで、マップの全体的なコンテキストを強化する必要な背景と視覚的なフレームワークが提供され、マップがより有益でユーザーにとって魅力的なものになります。

タイルを組み込むには、SDK と選択したプロバイダーとの間の接続を確立する必要があります。この場合、選択したプロバイダーとして `OpenStreetMap` を利用しています。

```js
const url = 'https://tile.openstreetmap.org/{Z}/{X}/{Y}.png'
$.ig.RevealSdkSettings.visualizations.scatterMaps = $.ig.ScatterMapVisualizationsConfiguration.createOpenStreetMapConfiguration(url);
```

![](images/customizing-map-tiles-tiles.jpg)

## 他のプロバイダー

### Bing

**手順 1** - [Bing Maps Portal](https://www.bingmapsportal.com/) でアカウントを作成します。

**手順 2** - `[My account]` -> `[My Keys]` で新しいキーを作成します。

**手順 3** - 以前に生成したキーをアプリケーションに追加します。

```js
$.ig.RevealSdkSettings.visualizations.scatterMaps = new $.ig.ScatterMapVisualizationsConfiguration("Bing", "your-key");
```

### Esri

**手順 1** - [ArcGIS](https://www.arcgis.com/) でアカウントを作成します。

**手順 2** - [新しいトークンを生成します](https://developers.arcgis.com/rest/users-groups-and-items/generate-token.htm)。

**手順 3** - 生成されたトークンをアプリケーションに追加します。

```js
$.ig.RevealSdkSettings.visualizations.scatterMaps = new $.ig.ScatterMapVisualizationsConfiguration("Esri", "your-token");
```

### MapBox

**手順 1** - [MapBox](https://www.mapbox.com/) でアカウントを作成します。

**手順 2** - `[Tokens]` -> `[Create a token]` (または公開トークンを使用します)。

**手順 3** - 生成されたトークンをアプリケーションに追加します。

```js
$.ig.RevealSdkSettings.visualizations.scatterMaps = new $.ig.ScatterMapVisualizationsConfiguration("MapBox", "your-token");
```

:::info コードの取得

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/CustomizingMapTiles) にあります。

:::