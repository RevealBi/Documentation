## クライアント API リファレンス

### クラス

  - [$.ig.RevealView](#RevealView)  
    アプリケーションでダッシュボードを描画するために使用されるメイン クラス。既存のダッシュボードの編集または最初からの作成も可能です。

  - [$.ig.RevealSettings](#RevealSettings)  
    レンダリングするダッシュボードや製品のさまざまな機能を制御するプロパティ (canEdit、canSaveAsなど) を含む、新しい
    RevealView インスタンスの設定に使用されるクラス。

  - [$.ig.RVDateDashboardFilter](#RVDateDashboardFilter)  
    ダッシュボード モデルで定義されているオプションの日付フィルターを表すクラス。

  - [$.ig.RVDateRange](#RVDateRange)  
    フィルタリングの日付範囲を表すために使用されるクラス。

  - [$.ig.RVDashboardFilter](#RVDashboardFilter)  
    ダッシュボード フィルターを表すために使用されるクラス。

  - [$.ig.RevealUtility](#RevealUtility)  
    ダッシュボードをロードするために使用されるユーティリティ クラス。

  - [$.ig.RVDashboard](#RVDashboard)  
    Dashboard モデルを表すクラス。このクラスのインスタンスを取得するには、[loadDashboard](#RevealUtility.loadDashboard) メソッドを使用します。

  - [$.ig.RVVisualization](#RVVisualization)  
    ダッシュボード モデルの視覚化 (ウィジェット) を表すクラス。

  - [$.ig.RVCell](#RVCell)  
    可視化データ内のセルを表すクラスには、列名、値、および書式設定された値が含まれます。

  - [$.ig.RVFilterValue](#RVFilterValue)  
    [getFilterValues](#RevealUtility.getFilterValues) から取得された、ダッシュボード
    フィルターに有効な値を表すクラス。

  - [$.ig.RVDataSourcesRequestedTriggerType](#RVDataSourcesRequestedTriggerType)

    データソースが要求されている場所の情報を提供するクラス。可視化、ダッシュボード フィルター、またはデータブレンドを要求できます。

  - [$.ig.DashboardSaveEventArgs](#DashboardSaveEventArgs)  
    onSave イベントへの引数として使用されるクラス。

<a name='RevealView'></a>
### $.ig.RevealView

アプリケーションでダッシュボードをレンダリングするために使用されるメインクラスです。既存のダッシュボードの編集または最初からの作成も可能です。

**種類**: グローバル クラス  
**参照**: $.ig.RevealSettings

  - [$.ig.RevealView](#RevealView)

      - [new $.ig.RevealView(selector,
        dashboardSettings)](#new_RevealView_new)

      - *instance*

          - [.onDataSourcesRequested](#RevealView+onDataSourcesRequested)
            :
            [`onDataSourcesRequested`](#RevealView..onDataSourcesRequested)

          - [.onVisualizationDataPointClicked](#RevealView+onVisualizationDataPointClicked)
            :
            [`onVisualizationDataPointClicked`](#RevealView..onVisualizationDataPointClicked)

          - [.onVisualizationLinkingDashboard](#RevealView+onVisualizationLinkingDashboard)
            :
            [`onVisualizationLinkingDashboard`](#RevealView..onVisualizationLinkingDashboard)

          - [.onImageExported](#RevealView+onImageExported) :
            [`onImageExported`](#RevealView..onImageExported)

          - [.onMaximizedVisualizationChanged](#RevealView+onMaximizedVisualizationChanged)

          - [.onSave](#RevealView+onSave) :
            [`onSave`](#RevealView..onSave)

          - [.updateSize()](#RevealView+updateSize)

          - [.maximizeVisualization(visualization)](#RevealView+maximizeVisualization)
            ⇒ `boolean`

          - [.minimizeVisualization()](#RevealView+minimizeVisualization)
            ⇒ `boolean`

          - [.getMaximizedVisualization()](#RevealView+getMaximizedVisualization)
            ⇒ [`$.ig.RVVisualization`](#RVVisualization)

          - [.setFilterSelectedValues(filter,
            selectedValues)](#RevealView+setFilterSelectedValues)

          - [.setDateFilter(filter)](#RevealView+setDateFilter)

          - [.refreshDashboardData()](#RevealView+refreshDashboardData)

          - [.setAccentColor(r, g, b)](#RevealView+setAccentColor)

      - *inner*

          - [\~onDataSourcesRequested](#RevealView..onDataSourcesRequested)
            : `function`

          - [\~dataSourcesResultCallback](#RevealView..dataSourcesResultCallback)
            : `function`

          - [\~onVisualizationDataPointClicked](#RevealView..onVisualizationDataPointClicked)
            : `function`

          - [\~onVisualizationLinkingDashboard](#RevealView..onVisualizationLinkingDashboard)
            : `function`

          - [\~linkingDashboardCallback](#RevealView..linkingDashboardCallback)
            : `function`

          - [\~onImageExported](#RevealView..onImageExported) :
            `function`

          - [\~onSave](#RevealView..onSave) : `function`

<a name='new_RevealView_new'></a>
#### new $.ig.RevealView(selector, dashboardSettings)

$.ig.RevealView クラスの新しいインスタンスを作成するために使用されます。

| パラメーター             | 型                                     | 説明                                                         |
| ----------------- | ---------------------------------------- | ------------------------------------------------------------------- |
| selector          | `string`                                 | div など、ビューを添付する HTML 要素を参照します。 |
| dashboardSettings | [`$.ig.RevealSettings`](#RevealSettings) | ビューを設定するために使用されます                                         |

<a name='RevealView+onDataSourcesRequested'></a>
#### $.ig.RevealView.onDataSourcesRequested : [`onDataSourcesRequested`](#RevealView..onDataSourcesRequested)

このイベントは、エンド ユーザーが \[可視設定の追加\] ボタンをクリックするたびに発生します。
デフォルト/既存のものを置き換えるためにカスタム
データソースを作成することができます。 引数は、エンドユーザーに表示されるデータソースのカスタム
コレクションを呼び出して渡すコールバック関数です。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス プロパティ  
**例**

``` js
revealView.onDataSourcesRequested = function (callback) {
  if(trigger == $.ig.RVDataSourcesRequestedTriggerType.Visualization) {
    var inMemoryDSI = new $.ig.RVInMemoryDataSourceItem("employees");
    inMemoryDSI.title("My InMemory Title");
    inMemoryDSI.説明("My InMemory 説明");

    var sqlDs = new $.ig.RVSqlServerDataSource();
    sqlDs.title("Clients");
    sqlDs.id("SqlDataSource1");
    sqlDs.host("db.mycompany.local");
    sqlDs.port(1433);
    sqlDs.database("Invoices");

    callback(new $.ig.RevealDataSources([sqlDs], [inMemoryDSI], true));
  }
};
```

<a name='RevealView+onVisualizationDataPointClicked'></a>
#### $.ig.RevealView.onVisualizationDataPointClicked : [`onVisualizationDataPointClicked`](#RevealView..onVisualizationDataPointClicked)

このイベントは、エンドユーザーが最大化された可視化表示でデータ ポイントをクリックしたときに、編集モードではない場合に発生します。
可視化オブジェクト ($.ig.RVVisualization)、クリックの実際のセル
($.ig.RVCell)、クリックの行を表すセルの配列 ($.ig.RVCell) を取得します。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス プロパティ  
**例**

``` js
revealView.onVisualizationDataPointClicked = function (widget, cell, row) {
  console.log("Widget Data Point Clicked");
  console.log(widget.title());
  console.log(cell.columnLabel);
  console.log(cell.value);
  console.log(cell.formattedValue);
  console.log("First cell in the row has label:" + row[0].columnLabel)
}
```
<a name='RevealView+onVisualizationLinkingDashboard'></a>
#### $.ig.RevealView.onVisualizationLinkingDashboard : [`onVisualizationLinkingDashboard`](#RevealView..onVisualizationLinkingDashboard)

このイベントは、エンドユーザーがダッシュボードへのリンクをたどろうとするたびに $.ig.RevealView オブジェクトによってトリガーされます (リンクがダッシュボードへのリンクである場合のみ)。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス プロパティ  
**例**

``` js
revealView.onVisualizationLinkingDashboard = function (title, url, callback) {
    console.log("Link followed - " + title);
    console.log("Url - " + url);

    var dashboardId = "Environment"
    callback(dashboardId);
};
```

<a name='RevealView+onImageExported'></a>
#### $.ig.RevealView.onImageExported : [`onImageExported`](#RevealView..onImageExported)

スクリーンショットに注釈を付けた後、エンドユーザーが `[画像のエクスポート]` ポップアップの `[画像のエクスポート]` ボタンをクリックするたびにこのイベントがトリガーされます (オプション)。注: デフォルトでは、画像のエクスポートは Web バージョンの SDK ではアクティブになっていません。この機能を使用する場合は、Nuget パッケージ
'CefSharp.OffScreen'(\> = 63.0.3) をインストールしてください。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス プロパティ  
**例**

``` js
revealView.onImageExported = function (img) {
  console.log(img);
};
```

<a name='RevealView+onMaximizedVisualizationChanged'></a>
#### $.ig.RevealView.onMaximizedVisualizationChanged

このイベントは、エンドユーザーが視覚表示を最大化または最小化するたびに発生します。操作が可視表示の最大化である場合は、最大化された可視表示のタイトルを revealView オブジェクトの maximizedVisualization プロパティを介して取得できます。
$.ig.RevealView オブジェクトのプロパティ。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス プロパティ  
**例**

``` js
revealView.onMaximizedVisualizationChanged = function () {
    maximizedVisualization = revealView.maximizedVisualization();
    msg = "";
    if (maximizedVisualization != null) {
        msg = maximizedVisualization.title();
    } else {
         msg = "no current maximized widget";
    }
    console.log("Maximized widget changed! " + msg);
};
```

<a name='RevealView+onSave'></a>
#### $.ig.RevealView.onSave : [`onSave`](#RevealView..onSave)

このイベントは、エンドユーザーが `[保存]` または `[名前を付けて保存]` をクリックするたびにトリガーされます。このイベントが $.ig.RevealView で設定されている場合、コールバックサーバー側（IRevealSdkContext.SaveDashboardAsync）は呼び出されず、アプリケーションは、独自のコントローラー サーバー側を実装することなどにより、ダッシュボードの保存方法を処理することになります。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス プロパティ  
**例**

``` js
revealView.onSave = function (rv, saveEvent) {
   if (saveEvent.saveAs) {
       var newName = prompt("Save as", dashboardId);
          if (!newName) return;
           saveEvent.serializeWithNewName(newName,
               function (b) {
                   saveDashboard(newName, b, saveEvent);
           });
       } else {
           saveEvent.serialize(
               function (b) {
                   saveDashboard(dashboardId, b, saveEvent);
               });
       }
};
```

<a name='RevealView+updateSize'></a>
#### $.ig.RevealView.updateSize()

このメソッドは、コンテナのサイズが変更されたことを示すために使用され、$.ig.RevealView はそのコンテンツを再レイアウトする必要があります。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス メソッド

<a name='RevealView+maximizeVisualization'></a>
#### $.ig.RevealView.maximizeVisualization(visualization) ⇒ `boolean`

表示ビューが初期化されてレンダリングされた後に可視表示を最大化するために使用します。Sales レポートに沿って 'Sales by Country' を表示するなど、現在表示されている可視化タイプとそれを含むアプリケーションの機能を同期させるために使用できます。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス メソッド 
**戻り値**:`boolean` - 指定した可視化表示がダッシュボードで見つかり、正しく最大化された場合は true、そうでない場合は false。+
**参照**:

  - $.ig.RVDashboard\#getVisualizationByTitle

  - $.ig.RVDashboard\#visualizations

| パラメーター         | 型                                       | 説明                                                                                                                                             |
| ------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visualization | [`$.ig.RVVisualization`](#RVVisualization) | 最大化される可視化表示、`visualizations()[index]` または `getVisualizationByTitle(title)` などのメソッドを使用してダッシュボードから取得されたオブジェクト。 |

<a name='RevealView+minimizeVisualization'></a>
#### $.ig.RevealView.minimizeVisualization() ⇒ `boolean`

現在最大化されている可視化表示を元の状態に復元するために使用されるため、ダッシュボード全体が表示されます。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス メソッド 
**戻り値**: `boolean` - 最大化された可視化があった場合は true、そうでない場合は false。

<a name='RevealView+getMaximizedVisualization'></a>
#### $.ig.RevealView.getMaximizedVisualization() ⇒ [`$.ig.RVVisualization`](#RVVisualization)

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス メソッド 
**戻り値**: [`$.ig.RVVisualization`](#RVVisualization) - 最大化された可視化｀オブジェクト（存在する場合）、最大化された可視化オブジェクトがない場合はnull  


<a name='RevealView+setFilterSelectedValues'></a>
#### $.ig.RevealView.setFilterSelectedValues(filter, selectedValues)

与えられたフィルターに選択された値を設定します。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス メソッド 
**参照**

  - $.ig.RVDashboard\#filters

  - $.ig.RVDashboard\#getFilterByTitle

| パラメーター          | 型                                           | 説明                                                                                                                     |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| フィルター         | [`$.ig.RVDashboardFilter`](#RVDashboardFilter) | 選択を設定するフィルター。dashboard.filters()\[index\] または dashboard.getFilterByTitle(title) から取得できます。 |
| selectedValues | `Array.<object>`                               | \['United States', 'France'\] のように、フィルターの新しい選択を含む選択された値の配列。                   |

<a name='RevealView+setDateFilter'></a>
#### $.ig.RevealView.setDateFilter(filter)

現在のダッシュボードで日付フィルターを設定します。ダッシュボードは日付フィルターで定義する必要があります。この方法を無視しない場合は注意してください。


**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス メソッド
**参照**: $.ig.RVDashboard\#dateFilter

| パラメーター  | 型                                                   | 説明                                        |
| ------ | ------------------------------------------------------ | -------------------------------------------------- |
| フィルター | [`$.ig.RVDateDashboardFilter`](#RVDateDashboardFilter) | ダッシュボード モデルに設定する新しい日付フィルター。 |

<a name='RevealView+refreshDashboardData'></a>
#### $.ig.RevealView.refreshDashboardData()

ダッシュボード データをプログラム的に更新するために使用されるメソッド。ダッシュボード メニューの \[更新\]
アクションを実行するのと同じです。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス メソッド

<a name='RevealView+setAccentColor'></a>
#### $.ig.RevealView.setAccentColor(r, g, b)

新しいアクセント色が使用されるために、RevielView コンポーネントをレンダリングする前に設定する必要があります。

**種類**: [`$.ig.RevealView`](#RevealView) のインスタンス メソッド

**Example**

``` js
$.ig.RevealView.setAccentColor = function (r, g, b) {
  $.ig.CPLightThemeSdk.prototype.setAccentColor(new $.ig.CPThemeColorSet(2, r, g, b));
};
```

<a name='RevealView..onDataSourcesRequested'></a>
#### $.ig.RevealView\~onDataSourcesRequested : `function`

このイベントは、エンド ユーザーが \[可視設定の追加\] ボタンをクリックするたびに発生します。デフォルト/既存のものを置き換えるためにカスタム データソースを作成することができます。

**種類**: [`$.ig.RevealView`](#RevealView) の内部 typedef

| パラメーター    | 型                                                                  | 説明                                                                                            |
| -------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| callback | [`dataSourcesResultCallback`](#RevealView..dataSourcesResultCallback) | エンドユーザーに表示されるデータソースのカスタム コレクションと共に呼び出す必要がある関数。 |
| trigger | [`$.ig.RVDataSourcesRequestedTriggerType`](#RVDataSourcesRequestedTriggerType) | 可視化、ダッシュボード フィルター、またはデータブレンドにデータソースが要求されているかどうかを示す列挙体。

<a name='RevealView..dataSourcesResultCallback'></a>
#### $.ig.RevealView\~dataSourcesResultCallback : `function`

[onDataSourcesRequested](#RevealView..onDataSourcesRequested) からデータソースのリストを返すために使用する callback。

**種類**: [`$.ig.RevealView`](#RevealView) の内部 typedef

| パラメーター       | 型                     | 説明                                                                                                                                                                                                                                                       |
| ----------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dataSources | `$.ig.RevealDataSources` | 最初のパラメーターはデータソースのリスト、2 番目のパラメーターはデータソース アイテムのリスト、3 番目のパラメーターはすでにダッシュボードにあるデータソースを含めるかどうかを示すブール値です。 |

<a name='RevealView..onVisualizationDataPointClicked'></a>
#### $.ig.RevealView\~onVisualizationDataPointClicked : `function`

このコールバックは、編集モードではなく、最大化された可視化表示でエンドユーザーがデータポイントをクリックするたびに呼び出されます。

**種類**: [`$.ig.RevealView`](#RevealView) の内部 typedef

| パラメーター         | 型                                       | 説明                   |
| ------------- | ------------------------------------------ | ----------------------------- |
| visualization | [`$.ig.RVVisualization`](#RVVisualization) | クリックされた可視化。     |
| cell          | [`$.ig.RVCell`](#RVCell)                   | クリックされたセル。              |
| cells         | [`Array.<RVCell>`](#RVCell)                | クリックされた行のすべてのセル。 |

<a name='RevealView..onVisualizationLinkingDashboard'></a>
#### $.ig.RevealView\~onVisualizationLinkingDashboard : `function`

このコールバックは、エンドユーザーがダッシュボードへのリンクをクリックするたびに $.ig.RevealView オブジェクトによって呼び出されます (リンクがダッシュボードへのリンクである場合のみ)。

**種類**: [`$.ig.RevealView`](#RevealView) の内部 typedef

| パラメーター    | 型                                                                | 説明                                                                                                                                                                                  |
| -------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title    | `string`                                                            | フォローしているリンクのタイトル。                                                                                                                                                             |
| url      | `string`                                                            | フォローしているリンクの URL。                                                                                                                                                        |
| callback | [`linkingDashboardCallback`](#RevealView..linkingDashboardCallback) | ナビゲートするダッシュボードの ID を示すダッシュボード ID を呼び出して渡すことになっているコールバック関数。コールバック メソッドが呼び出されない場合は、ナビゲーションは行われません。 |

<a name='RevealView..linkingDashboardCallback'></a>
#### $.ig.RevealView\~linkingDashboardCallback : `function`

これはナビゲーションするダッシュボードの ID を返すために使用されるコールバック関数です。

**種類**: [`$.ig.RevealView`](#RevealView) の内部 typedef

| パラメーター       | 型     | 説明                                                     |
| ----------- | -------- | --------------------------------------------------------------- |
| dashboardId | `string` | Reveal が移動する必要があるターゲット ダッシュボードの ID。 |

<a name='RevealView..onImageExported'></a>
#### $.ig.RevealView\~onImageExported : `function`

スクリーンショットに注釈を付けた後、エンドユーザーが \[画像のエクスポート\] ポップアップの \[画像のエクスポート\] ボタンをクリックするたびにこのコールバックが呼び出されます (オプション)。

**種類**: [`$.ig.RevealView`](#RevealView) の内部 typedef

| パラメーター | 型    | 説明                                                                           |
| ----- | ------- | ------------------------------------------------------------------------------------- |
| img   | `image` | 画像の base64 エンコード表現を含む 'img' HTMLタグを含みます。 |

<a name='RevealView..onSave'></a>
#### $.ig.RevealView\~onSave : `function`

このイベントは、エンドユーザーが ‘保存' または ‘名前を付けて保存’ をクリックするたびにトリガーされます。

**種類**: [`$.ig.RevealView`](#RevealView) の内部 typedef

| パラメーター           | 型                                                     | 説明                                                                                                                                          |
| --------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| $.ig.RevealView | [`$.ig.RevealView`](#RevealView)                         | イベントをトリガーした $.ig.RevealView オブジェクト。                                                                          |
| args            | [`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs) | 保存されているダッシュボードに関する情報を取得し、そのバイナリ コンテンツを取得するために使用できる $.ig.DashboardSaveEventArgs のインスタンス。 |

<a name='RevealSettings'></a>
### $.ig.RevealSettings

製品のさまざまな機能 (canEdit、canSaveAsなど) を制御するレンダリングおよびプロパティを含むダッシュボードを含む、新しい $.ig.RevealView インスタンスの構成に使用されるクラス。

**種類**: グローバル クラス 
**参照**: $.ig.RevealView

  - [$.ig.RevealSettings](#RevealSettings)

      - [new $.ig.RevealSettings(\[dashId\])](#new_RevealSettings_new)

      - [.startInEditMode](#RevealSettings+startInEditMode) : `boolean`

      - [.canEdit](#RevealSettings+canEdit) : `boolean`

      - [.canSaveAs](#RevealSettings+canSaveAs) : `boolean`

      - [.singleVisualizationMode](#RevealSettings+singleVisualizationMode)
        : `boolean`

      - [.startWithNewVisualization](RevealSettings+startWithNewVisualization)
        : `boolean`

      - [.showChangeVisualization](#RevealSettings+showChangeVisualization)
        : `boolean`

      - [.showFilters](#RevealSettings+showFilters) : `boolean`

      - [.showMenu](#RevealSettings+showMenu) : `boolean`

      - [.showRefresh](#RevealSettings+showRefresh) : `boolean`

      - [.showChangeDataSource](#RevealSettings+showChangeDataSource) :
        `boolean`

      - [.showChangeTheme](#RevealSettings+showChangeTheme) : `boolean`

      - [.canAddVisualization](#RevealSettings+canAddVisualization) :
        `boolean`

      - [.showStatisticalFunctions](#RevealSettings+showStatisticalFunctions) :
        `boolean`
		
      - [.showExportImage](#RevealSettings+showExportImage) :
        `boolean`

      - [.showExportToExcel](#RevealSettings+showExportToExcel) :
        `boolean`

      - [.showExportToPowerpoint](#RevealSettings+showExportToPowerpoint) :
        `boolean`

      - [.showExportToPDF](#RevealSettings+showExportToPDF) :
        `boolean`

      - [.showDataBlending](#RevealSettings+showDataBlending) :
        `boolean`

      - [.showMachineLearningModelsIntegration](#RevealSettings+showMachineLearningModelsIntegration) :
        `boolean`

      - [.initialThemeName](#RevealSettings+initialThemeName) :
        `string`

      - [.dateFilter](#RevealSettings+dateFilter) :
        [`$.ig.RVDateDashboardFilter`](#RVDateDashboardFilter)

      - [.dashboard](#RevealSettings+dashboard) :
        [`$.ig.RVDashboard`](#RVDashboard)

      - [.maximizedVisualization](#RevealSettings+maximizedVisualization)
        : [`$.ig.RVVisualization`](#RVVisualization)

      - [.setFilterSelectedValues(filter,
        selectedValues)](#RevealSettings+setFilterSelectedValues)

      - [.setDateFilter()](#RevealSettings+setDateFilter)

      - [.setAllFiltersSelectedValues(filtersValues)](#RevealSettings+setAllFiltersSelectedValues)

<a name='new_RevealSettings_new'></a>
#### new $.ig.RevealSettings(\[dashId\])

$.ig.RevealView オブジェクトの構成に使用されるクラスである $.ig.RevealSettings の新しいインスタンスを作成するために使用されます。

| パラメーター      | 型     | 説明                                           |
| ---------- | -------- | ----------------------------------------------------- |
| \[dashId\] | `string` | レンダリングされるダッシュボードを識別する文字列。 |

<a name='RevealSettings+startInEditMode'></a>
#### $.ig.RevealSettings.startInEditMode : `boolean`

ビューがデフォルトのビューモードではなく編集モードで開始することを示すフラグ。デフォルトは false です。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**デフォルト**: `false`  

<a name='RevealSettings+canEdit'></a>
#### $.ig.RevealSettings.canEdit : `boolean`

ユーザーが編集モードに切り替えることができるかどうかを示すフラグ。デフォルトは true です。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**デフォルト**: `true`  

<a name='RevealSettings+canSaveAs'></a>
#### $.ig.RevealSettings.canSaveAs : `boolean`

ユーザーがダッシュボードを \[名前を付けて保存\] できるかどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**デフォルト**: `true`  

<a name='RevealSettings+singleVisualizationMode'></a>
#### $.ig.RevealSettings.singleVisualizationMode : `boolean`

シングル可視化モードは、一度に 1 つのウィジェットを表示するために使用されます。$.ig.RevealSettings の maximizedVisualization プロパティを使用して、初期の視覚化を最大化するように制御できます。
最大化するように初期の視覚化表示が設定されていない場合、最初の視覚化表示が最初に最大化されます。ダッシュボードの表示後、$.ig.RevealView.maximizedVisualization を使用して最大化されたものを変更できます。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**デフォルト**: `false`  
**参照**

  - $.ig.RevealView\#maximizeVisualization

  - $.ig.RevealSettings\#maximizedVisualization

<a name='RevealSettings+startWithNewVisualization'></a>
#### $.ig.RevealSettings.startWithNewVisualization : `boolean`

このビューが表示されるときに、新しい可視化のダイアログを自動的に表示する必要があることを示すフラグ。デフォルトは false です。この設定では、[startInEditMode](#RevealSettings+startInEditMode) を true に設定する必要があります。


**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**デフォルト**: `false`

<a name='RevealSettings+showChangeVisualization'></a>
#### $.ig.RevealSettings.showChangeVisualization : `boolean`

視覚化を変更するボタンを使用可能にするかどうかを示すフラグ。このボタンは、編集モードに入ることなく、別の視覚化タイプ (棒グラフから縦棒グラフなど) に切り替えます。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**デフォルト**: `true`  

<a name='RevealSettings+showFilters'></a>
#### $.ig.RevealSettings.showFilters : `boolean`

ダッシュボードのフィルター パネルを非表示にできるようにするためのフラグ。フィルターの選択値を $.ig.RevealSettings で指定された初期選択に制限したい場合に便利です。
$.ig.RevealView オブジェクトを作成してレンダリングしたら、$.ig.RevealView.setFilterSelectedValues を使用して特定のフィルタの選択を変更できるため、選択した値をアプリケーションと同期させることができます。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**デフォルト**: `true`  
**参照**

  - $.ig.RevealSettings\#setFilterSelectedValues

  - $.ig.RevealView\#setFilterSelectedValues

<a name='RevealSettings+showMenu'></a>
#### $.ig.RevealSettings.showMenu : `boolean`

メニュー (更新、エクスポートなどを含む) を表示するかどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ 
**デフォルト**: `true`  

<a name='RevealSettings+showRefresh'></a>
#### $.ig.RevealSettings.showRefresh : `boolean`

更新操作を表示するかどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**デフォルト**: `true`  

|*ウィジェットのデータソースを変更する*  
エンドユーザーがウィジェットのデータソースを変更する機能を有効または無効にできるようになりました。編集モードで \[視覚化データ\] 画面を開くと、Reveal は UI の \[データソースの変更\] ボタンを表示または非表示にします。 |*ダッシュボード テーマの変更*  
エンドユーザーがダッシュボードのテーマを変更する機能を有効または無効にできるようになりました。ダッシュボードの編集モードに入る際に、使用可能なテーマを表示するためのボタンを表示または非表示にします。

<a name='RevealSettings+showChangeDataSource'></a>
#### $.ig.RevealSettings.showChangeDataSource : `boolean`

ウィジェットの編集時に \[データソースの変更\] ボタンが表示されるかどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**デフォルト**: `true`  

<a name='RevealSettings+showChangeTheme'></a>
#### $.ig.RevealSettings.showChangeTheme : `boolean`

ダッシュボードのテーマを変更するためのボタンが表示されるかどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ 
**デフォルト**: `true`  

<a name='RevealSettings+canAddVisualization'></a>
#### $.ig.RevealSettings.canAddVisualization : `boolean`

ダッシュボードの編集時に新しい視覚化を追加できるかどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ 
**デフォルト**: `true`  

<a name='RevealSettings+showStatisticalFunctions'></a>
#### $.ig.RevealSettings.showStatisticalFunctions : `boolean`

統計機能をオンにするボタンを使用可能にするかどうかを示すフラグ。このボタンは、可視化の予測、線形回帰、外れ値などの統計機能を表示するために使用されます。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ 
**デフォルト**: `true`  

<a name='RevealSettings+showExportImage'></a>
#### $.ig.RevealSettings.showExportImage : `boolean`

画像のエクスポート操作が使用可能かどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ 
**デフォルト**: `true`  

<a name='RevealSettings+showExportToExcel'></a>
#### $.ig.RevealSettings.showExportToExcel : `boolean`

Excel エクスポート操作が使用可能かどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**デフォルト**: `true`

<a name='RevealSettings+showExportToPowerpoint'></a>
#### $.ig.RevealSettings.showExportToPowerpoint : `boolean`

Powerpoint エクスポート操作が使用可能かどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ 
**デフォルト**: `true`

<a name='RevealSettings+showExportToPDF'></a>
#### $.ig.RevealSettings.showExportToPDF : `boolean`

PDF エクスポート操作が使用可能かどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ 
**デフォルト**: `true`

<a name='RevealSettings+showDataBlending'></a>
#### $.ig.RevealSettings.showDataBlending : `boolean`

別のデータソースからフィールドを追加する操作がビジュアライゼーション エディターで使用可能かどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ 
**デフォルト**: `false`

<a name='RevealSettings+showMachineLearningModelsIntegration'></a>
#### $.ig.RevealSettings.showMachineLearningModelsIntegration : `boolean`

ML モデルからフィールドを追加する操作がビジュアライゼーション エディターで使用可能かどうかを示すフラグ。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ 
**デフォルト**: `false`

<a name='RevealSettings+initialThemeName'></a>
#### $.ig.RevealSettings.initialThemeName

最初に使用するテーマの名前。ダッシュボードで設定されたテーマをオーバーライドします。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ 

<a name='RevealSettings+dateFilter'></a>
#### $.ig.RevealSettings.dateFilter : [`$.ig.RVDateDashboardFilter`](#RVDateDashboardFilter)

ダッシュボードを初めてレンダリングするときに使用する初期日付フィルター。この値が無視されない場合、ダッシュボードは日付フィルターで定義される必要があることに注意してください。
RevealView オブジェクトが作成された後に、$.ig.RevealView.setDateFilter を使用して日付フィルターが更新される場合があります。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ 
**参照**: $.ig.RevealView\#setDateFilter  

<a name='RevealSettings+dashboard'></a>
#### $.ig.RevealSettings.dashboard : [`$.ig.RVDashboard`](#RVDashboard)

これらの設定が適用される $.ig.RevealView オブジェクトにレンダリングするダッシュボード。ダッシュボードオブジェクトを取得するには、$.ig.RevealUtility で利用可能な 'loadDashboard' メソッドを使用できます。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**参照**: $.ig.RevealUtility  

<a name='RevealSettings+maximizedVisualization'></a>
#### $.ig.RevealSettings.maximizedVisualization : [`$.ig.RVVisualization`](#RVVisualization)

最初に最大化された可視化として使用する可視化。 dashboard.visualizations()\[index\] または dashboard.getVisualizationByTitle() を使用して、$.ig.RVDashboard オブジェクトから可視化を取得できます。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス プロパティ
**参照**

  - $.ig.RVDashboard\#visualizations

  - $.ig.RVDashboard\#getVisualizationByTitle

<a name='RevealSettings+setFilterSelectedValues'></a>
#### $.ig.RevealSettings.setFilterSelectedValues(filter, selectedValues)

指定したフィルターの初期選択値を設定します。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス メソッド  
**参照**

  - $.ig.RVDashboard\#filters

  - $.ig.RVDashboard\#getFilterByTitle

| パラメーター          | 型                                           | 説明                                                                                                                     |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| フィルター         | [`$.ig.RVDashboardFilter`](#RVDashboardFilter) | 選択を設定するフィルター。dashboard.filters()\[index\] または dashboard.getFilterByTitle(title) から取得できます。 |
| selectedValues | `Array.<object>`                               | \['United States', 'France'\] のように、フィルターの新しい選択を含む選択された値の配列。                   |

<a name='RevealSettings+setDateFilter'></a>
#### $.ig.RevealSettings.setDateFilter()

ダッシュボードを初めてレンダリングするときに使用する初期日付フィルター。この値が無視されない場合、ダッシュボードは日付フィルターで定義される必要があることに注意してください。RevealView オブジェクトが作成された後に、$.ig.RevealView.setDateFilter を使用して日付フィルターが更新される場合があります。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス メソッド   
**参照**: $.ig.RevealView\#setDateFilter  

<a name='RevealSettings+setAllFiltersSelectedValues'></a>
#### $.ig.RevealSettings.setAllFiltersSelectedValues(filtersValues)

1 回の呼び出しですべてのフィルター値を設定します。

**種類**: [`$.ig.RevealSettings`](#RevealSettings) のインスタンス メソッド 

| パラメーター         | 型  | 説明                                                                                                                                                                                                                                |
| ------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| filtersValues | `any` | Map として機能するオブジェクトです。キーはフィルター識別子、値は選択された値の配列です ('setFilterSelectedValues’ を参照)。このメソッドの呼び出し後に設定される唯一のフィルター。パラメーターが null の場合は、すべてのフィルターをクリアします。 |

<a name='RVDateDashboardFilter'></a>
### $.ig.RVDateDashboardFilter

ダッシュボード モデルで定義されているオプションの日付フィルターを表すクラス。

**種類**: グローバル クラス

  - [$.ig.RVDateDashboardFilter](#RVDateDashboardFilter)

      - [.dateFilterType](#RVDateDashboardFilter+dateFilterType) :
        [`$.ig.RVDateFilterType`](#RVDateFilterType)

      - [.range](#RVDateDashboardFilter+range) :
        [`$.ig.RVDateRange`](#RVDateRange)

<a name='RVDateDashboardFilter+dateFilterType'></a>
#### $.ig.RVDateDashboardFilter.dateFilterType : [`$.ig.RVDateFilterType`](#RVDateFilterType)

YearToDate、MonthToDate、CustomRange などの日付フィルターの種類。

**種類**: [`$.ig.RVDateDashboardFilter`](#RVDateDashboardFilter) のインスタンス プロパティ 

<a name='RVDateDashboardFilter+range'></a>
#### $.ig.RVDateDashboardFilter.range : [`$.ig.RVDateRange`](#RVDateRange)

フィルタリングに使用されるカスタム日付範囲。filterType が CustomRange の場合にのみ有効です。

**種類**: [`$.ig.RVDateDashboardFilter`](#RVDateDashboardFilter) のインスタンス プロパティ 

<a name='RVDateRange'></a>
### $.ig.RVDateRange

フィルタリングの日付範囲を表すために使用されるクラス。

**種類**: グローバル クラス

  - [$.ig.RVDateRange](#RVDateRange)

      - [.from](#RVDateRange+from) : `Date`

      - [.to](#RVDateRange+to) : `Date`

<a name='RVDateRange+from'></a>
#### $.ig.RVDateRange.from : `Date`

範囲の開始。

**種類**: [`$.ig.RVDateRange`](#RVDateRange) のインスタンス プロパティ 

<a name='RVDateRange+to'></a>
#### $.ig.RVDateRange.to : `Date`

範囲の終わり。

**種類**: [`$.ig.RVDateRange`](#RVDateRange) のインスタンス プロパティ 

<a name='RVDashboardFilter'></a>
### $.ig.RVDashboardFilter

ダッシュボード フィルターを表すために使用されるクラス。

**種類**: グローバル クラス

  - [$.ig.RVDashboardFilter](#RVDashboardFilter)

      - [.id()](#RVDashboardFilter+id) ⇒ `string`

      - [.title()](#RVDashboardFilter+title) ⇒ `string`

<a name='RVDashboardFilter+id'></a>
#### $.ig.RVDashboardFilter.id() ⇒ `string`

The ID of the filter.

**種類**: [`$.ig.RVDashboardFilter`](#RVDashboardFilter) のインスタンス メソッド  
**戻り値**: `string` - 日付フィルターの ID。  

<a name='RVDashboardFilter+title'></a>
#### $.ig.RVDashboardFilter.title() ⇒ `string`

フィルターのタイトル。

**種類**: [`$.ig.RVDashboardFilter`](#RVDashboardFilter) のインスタンス メソッド  
**戻り値**: `string` - フィルターのタイトル。  

<a name='RevealUtility'></a>
### $.ig.RevealUtility

ダッシュボードをロードするために使用されるユーティリティ クラス。

**種類**: グローバル クラス

  - [$.ig.RevealUtility](#RevealUtility)

      - [.loadDashboard(dashboardId, onSuccess,
        onError)](#RevealUtility.loadDashboard)

      - [.loadDashboardFromContainer(blob, onSuccess,
        onError)](#RevealUtility.loadDashboardFromContainer)

      - [.getFilterValues(dashboard, filter, callback,
        errorCallback)](#RevealUtility.getFilterValues)

<a name='RevealUtility.loadDashboard'></a>
#### $.ig.RevealUtility.loadDashboard(dashboardId, onSuccess, onError)

Loads the dashboard with the given ID from the standard endpoint in the
server.

**種類**: [`$.ig.RevealUtility`](#RevealUtility) の静的メソッド

| パラメーター       | 型       | 説明                                                                                                  |
| ----------- | ---------- | ----------------------------------------------------------------------- |
| dashboardId | `string`   | 開くダッシュボードの Id。この ID はサーバーに受信されます (IRevealSdkContext.GetDashboardAsync)。 |
| onSuccess   | `function` | ロードが成功した場合に $.ig.RVDashboard クラスのインスタンスを受け取るコールバック。                     |
| onError     | `function` | ロード操作が失敗した場合はエラー メッセージ付きのコールバック。                                        |

<a name='RevealUtility.loadDashboardFromContainer'></a>
#### $.ig.RevealUtility.loadDashboardFromContainer(blob, onSuccess, onError)

Blob オブジェクトから .rdash ファイルの内容を含むダッシュボードをロードします。

**種類**: [`$.ig.RevealUtility`](#RevealUtility) の静的メソッド

| パラメーター     | 型       | 説明                                                                                       |
| --------- | ---------- | --------------------------------------------------- |
| blob      | `Blob`     | ダッシュボードのバイナリコンテンツを rdash ファイル形式で含む Blob オブジェクト。     |
| onSuccess | `function` | ロードが成功した場合に $.ig.RVDashboard クラスのインスタンスを受け取るコールバック。 |
| onError   | `function` | ロード操作が失敗した場合はエラー メッセージ付きのコールバック。                    |

<a name='RevealUtility.getFilterValues'></a>
#### $.ig.RevealUtility.getFilterValues(dashboard, filter, callback, errorCallback)

指定されたフィルターに対して可能な値を取得するために使用されるメソッド。
国フィルターの場合は、選択した国だけでなく、すべての国のリストが返されます。
このメソッドを使用して、フィルター値を選択するための独自の UI を作成できます。

**種類**: [`$.ig.RevealUtility`](#RevealUtility) の静的メソッド

| パラメーター         | 型                                           | 説明                                                                                                                                                                                                                    |
| ------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ダッシュボード       | [`$.ig.RVDashboard`](#RVDashboard)             | [loadDashboard](#RevealUtility.loadDashboard) で取得されるダッシュボード オブジェクト                                                                                                            |
| filter        | [`$.ig.RVDashboardFilter`](#RVDashboardFilter) | コレクション [filters](#RVDashboard+filters) のメンバーである値を返すフィルターは、[getFilterByTitle](#RVDashboard+getFilterByTitle) または [getFilterById](#RVDashboard+getFilterById) を使用して取得することもできます。 |
| callback      | `function`                                     | 与えられたフィルターで利用可能な値のリストを表す [$.ig.RVFilterValue](#RVFilterValue) オブジェクトのリストで呼び出されるコールバック関数。                                                                                      |
| errorCallback | `function`                                     | リクエストが失敗した場合に errorMessage を指定したコールバック関数                                                                                                                                      |
<a name='RVDashboard'></a>
### $.ig.RVDashboard

Dashboard モデルを表すクラス。このクラスのインスタンスを取得するには、[loadDashboard](#RevealUtility.loadDashboard)
メソッドを使用します。

**種類**: グローバル クラス

  - [$.ig.RVDashboard](#RVDashboard)

      - [.visualizations()](#RVDashboard+visualizations) ⇒
        [`Array.<RVVisualization>`](#RVVisualization)

      - [.filters()](#RVDashboard+filters) ⇒
        [`Array.<RVDashboardFilter>`](#RVDashboardFilter)

      - [.getVisualizationByTitle(title)](#RVDashboard+getVisualizationByTitle)
        ⇒ [`$.ig.RVVisualization`](#RVVisualization)

      - [.getVisualizationById(id)](#RVDashboard+getVisualizationById) ⇒
        [`$.ig.RVVisualization`](#RVVisualization)

      - [.getFilterByTitle(title)](#RVDashboard+getFilterByTitle) ⇒
        [`$.ig.RVDashboardFilter`](#RVDashboardFilter)

      - [.getFilterById(id)](#RVDashboard+getFilterById) ⇒
        [`$.ig.RVDashboardFilter`](#RVDashboardFilter)

      - [.getName()](#RVDashboard+getName) ⇒ `string`

<a name='RVDashboard+visualizations'></a>
#### $.ig.RVDashboard.visualizations() ⇒ [`Array.<RVVisualization>`](#RVVisualization)

ダッシュボードの可視化のリスト。

**種類**: [`$.ig.RVDashboard`](#RVDashboard) のインスタンス メソッド  
**戻り値**: [`Array.<RVVisualization>`](#RVVisualization) - ダッシュボードの可視化のリスト

<a name='RVDashboard+filters'></a>
#### $.ig.RVDashboard.filters() ⇒ [`Array.<RVDashboardFilter>`](#RVDashboardFilter)

ダッシュボードのフィルターのリスト。ダッシュボード フィルターを使用して、複数のウィジェットに同時にフィルターを適用できます。


**種類**: [`$.ig.RVDashboard`](#RVDashboard) のインスタンス メソッド  
**戻り値**: [`Array.<RVDashboardFilter>`](#RVDashboardFilter) - ダッシュボードの可視化のリスト。

<a name='RVDashboard+getVisualizationByTitle'></a>
#### $.ig.RVDashboard.getVisualizationByTitle(title) ⇒ [`$.ig.RVVisualization`](#RVVisualization)

指定したタイトルで最初の可視化を取得します。

**種類**: [`$.ig.RVDashboard`](#RVDashboard) のインスタンス メソッド  
**戻り値**: [`$.ig.RVVisualization`](#RVVisualization) - 指定されたタイトルの最初の可視化
(大文字と小文字を区別)、そのタイトルの可視化がない場合は null。

| パラメーター | 型     | 説明                            |
| ----- | -------- | -------------------------------------- |
| title | `string` | 検索するウィジェットのタイトル。 |

<a name='RVDashboard+getVisualizationById'></a>
#### $.ig.RVDashboard.getVisualizationById(id) ⇒ [`$.ig.RVVisualization`](#RVVisualization)

指定した ID で可視化を取得します。

**種類**: [`$.ig.RVDashboard`](#RVDashboard) のインスタンス メソッド  
**戻り値**: [`$.ig.RVVisualization`](#RVVisualization) - 指定された ID を使用した可視化
(大文字と小文字を区別)、その ID を使用した可視化がない場合は null。

| パラメーター | 型     | 説明                         |
| ----- | -------- | ----------------------------------- |
| id    | `string` | 検索するウィジェットの ID。 |

<a name='RVDashboard+getFilterByTitle'></a>
#### $.ig.RVDashboard.getFilterByTitle(title) ⇒ [`$.ig.RVDashboardFilter`](#RVDashboardFilter)

指定したタイトルで最初のフィルターを取得します。

**種類**: [`$.ig.RVDashboard`](#RVDashboard) のインスタンス メソッド  
**戻り値**: [`$.ig.RVDashboardFilter`](#RVDashboardFilter) - 指定されたタイトルの最初の可視化 (大文字と小文字を区別)、そのタイトルの可視化がない場合は null。

| パラメーター | 型     | 説明                            |
| ----- | -------- | -------------------------------------- |
| title | `string` | 検索するフィルターのタイトル。 |

<a name='RVDashboard+getFilterById'></a>
#### $.ig.RVDashboard.getFilterById(id) ⇒ [`$.ig.RVDashboardFilter`](#RVDashboardFilter)

指定した ID でフィルターを取得します。

**種類**: [`$.ig.RVDashboard`](#RVDashboard) のインスタンス メソッド  
**戻り値**: [`$.ig.RVDashboardFilter`](#RVDashboardFilter) - 指定された ID のフィルター (大文字と小文字を区別)、その ID のフィルターがない場合は null。

| パラメーター | 型     | 説明                         |
| ----- | -------- | ----------------------------------- |
| id    | `string` | 検索するフィルターの ID。 |

<a name='RVDashboard+getName'></a>
#### $.ig.RVDashboard.getName() ⇒ `string`

The name or title of the dashboard

**種類**: [`$.ig.RVDashboard`](#RVDashboard) のインスタンス メソッド  
**戻り値**: `string` - ダッシュボードの名前またはタイトル  

<a name='RVVisualization'></a>
### $.ig.RVVisualization

ダッシュボード モデルの視覚化 (ウィジェット) を表すクラス。

**種類**: グローバル クラス

  - [$.ig.RVVisualization](#RVVisualization)

      - [.id()](#RVVisualization+id) ⇒ `string`

      - [.title()](#RVVisualization+title) ⇒ `string`

<a name='RVVisualization+id'></a>
#### $.ig.RVVisualization.id() ⇒ `string`

The ID of the visualization

**種類**: [`$.ig.RVVisualization`](#RVVisualization) のインスタンス メソッド  
**戻り値**: `string` - The ID of the visualization  

<a name='RVVisualization+title'></a>
#### $.ig.RVVisualization.title() ⇒ `string`

可視化のタイトル。

**種類**: [`$.ig.RVVisualization`](#RVVisualization) のインスタンス メソッド  
**戻り値**: `string` - 可視化のタイトル。  

<a name='RVCell'></a>
### $.ig.RVCell

可視化データ内のセルを表すクラスには、列名、値、および書式設定された値が含まれます。

**種類**: グローバル クラス  
**参照**: $.ig.RevealView\~onVisualizationDataPointClicked

  - [$.ig.RVCell](#RVCell)

      - [.columnName](#RVCell+columnName) : `string`

      - [.columnLabel](#RVCell+columnLabel) : `string`

      - [.value](#RVCell+value) : `object`

      - [.formattedValue](#RVCell+formattedValue) : `string`

<a name='RVCell+columnName'></a>
#### $.ig.RVCell.columnName : `string`

このセルが属する列名。

**種類**: [`$.ig.RVCell`](#RVCell) のインスタンス プロパティ 

<a name='RVCell+columnLabel'></a>
#### $.ig.RVCell.columnLabel : `string`

このセルが属する列のラベル。

**種類**: [`$.ig.RVCell`](#RVCell) のインスタンス プロパティ 

<a name='RVCell+value'></a>
#### $.ig.RVCell.value : `object`

セルの値。

**種類**: [`$.ig.RVCell`](#RVCell) のインスタンス プロパティ 

<a name='RVCell+formattedValue'></a>
#### $.ig.RVCell.formattedValue : `string`

セルの書式設定された値。

**種類**: [`$.ig.RVCell`](#RVCell) のインスタンス プロパティ 

<a name='RVFilterValue'></a>
### $.ig.RVFilterValue

[getFilterValues](#RevealUtility.getFilterValues) から取得された、ダッシュボード フィルターに有効な値を表すクラス。

**種類**: グローバル クラス  
**参照**: $.ig.RevealUtility\#getFilterValues

  - [$.ig.RVFilterValue](#RVFilterValue)

      - [.values](#RVFilterValue+values) : `object`

      - [.label](#RVFilterValue+label) : `string`

<a name='RVFilterValue+values'></a>
#### $.ig.RVFilterValue.values : `object`

このフィルター値に関連付けられたすべての値を持つ辞書です。このオブジェクトは、フィルターの選択値を設定するときに使用する必要があります。

**種類**: [`$.ig.RVFilterValue`](#RVFilterValue) のインスタンス プロパティ  

<a name='RVFilterValue+label'></a>
#### $.ig.RVFilterValue.label : `string`

この値をユーザーに表示するために使用されるラベル。

**種類**: [`$.ig.RVFilterValue`](#RVFilterValue) のインスタンス プロパティ  

<a name='RVDataSourcesRequestedTriggerType'></a>
### $.ig.RVDataSourcesRequestedTriggerType

データソースが要求されている場所の情報を提供するクラス。可視化、ダッシュボード フィルター、またはデータブレンドを要求できます。

**種類**: グローバル列挙型

**プロパティ**

| **プロパティ名**        | **デフォルト** |
|-----------------|---------|
| Visualization   | visualization |
| DashboardFilter | dashboardFilter |
| DataBlending    | dataBlending |

<a name='DashboardSaveEventArgs'></a>
### $.ig.DashboardSaveEventArgs

onSave イベントへの引数として使用されるクラス。

**種類**: グローバル クラス

  - [$.ig.DashboardSaveEventArgs](#DashboardSaveEventArgs)

      - [.saveAs](#DashboardSaveEventArgs+saveAs) : `boolean`

      - [.name](#DashboardSaveEventArgs+name) : `string`

      - [.serialize(callback,
        errorCallback)](#DashboardSaveEventArgs+serialize) ⇒ `Blob`

      - [.serializeWithNewName(newName, callback,
        errorCallback)](#DashboardSaveEventArgs+serializeWithNewName) ⇒
        `Blob`

      - [.saveFinished()](#DashboardSaveEventArgs+saveFinished)

<a name='DashboardSaveEventArgs+saveAs'></a>
#### $.ig.DashboardSaveEventArgs.saveAs : `boolean`

このイベントが 'save’ (false) または 'save as (true) のどちらの操作によるものかを示すフラグ。


**種類**: [`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs) のインスタンス プロパティ   

<a name='DashboardSaveEventArgs+name'></a>
#### $.ig.DashboardSaveEventArgs.name : `string`

保存されているダッシュボード名。

**種類**: [`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs) のインスタンス プロパティ   

<a name='DashboardSaveEventArgs+serialize'></a>
#### $.ig.DashboardSaveEventArgs.serialize(callback, errorCallback) ⇒ `Blob`

現在の名前を使用して、現在のダッシュボードを '.rdash’ ファイル形式にシリアル化します。

**種類**: [`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs) のインスタンス メソッド 
**戻り値**: `Blob` - ダッシュボードの内容が '.rdash’　ファイル形式の Blob オブジェクト。

| パラメーター         | 型  |
| ------------- | ----- |
| callback      | `any` |
| errorCallback | `any` |

<a name='DashboardSaveEventArgs+serializeWithNewName'></a>
#### $.ig.DashboardSaveEventArgs.serializeWithNewName(newName, callback, errorCallback) ⇒ `Blob`

指定した名前で現在のダッシュボードを '.rdash’ ファイル形式にシリアル化します。

**種類**: [`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs) のインスタンス メソッド 
**戻り値**: `Blob` - `Blob` - ダッシュボードの内容が '.rdash’　ファイル形式の Blob オブジェクト。

| パラメーター         | 型     | 説明                     |
| ------------- | -------- | ------------------------------- |
| newName       | `string` | ダッシュボードの新しい名前。 |
| callback      | `any`    |                                 |
| errorCallback | `any`    |                                 |

<a name='DashboardSaveEventArgs+saveFinished'></a>
#### $.ig.DashboardSaveEventArgs.saveFinished()

Reveal SDK に保存操作が完了したことを通知し、表示モードに切り替えます。

**種類**: [`$.ig.DashboardSaveEventArgs`](#DashboardSaveEventArgs) のインスタンス メソッド 

<a name='RVDateFilterType'></a>
### $.ig.RVDateFilterType

**種類**: グローバル列挙型  
**プロパティ**

| 名前                   | デフォルト                  | 説明                                                        |
| -------------------- | ---------------------- | --------------------------------------------------------- |
| AllTime              | `allTime`              | フィルターは定義されていません。すべての時間が含まれています。                           |
| CustomRange          | `customRange`          | カスタム範囲、$.ig.RVDateRange のインスタンスは、range プロパティに設定する必要があります。 |
| LastWeek             | `lastWeek`             | 過去 7 日                                                    |
| LastMonth            | `lastMonth`            | 過去 30 日                                                   |
| LastYear             | `lastYear`             | 過去 365 日                                                  |
| YearToDate           | `yearToDate`           | 今年 1 月 1 日から今日まで                                          |
| QuarterToDate        | `quarterToDate`        | 今四半期の初日から                                                 |
| MonthToDate          | `monthToDate`          | 今月の初日から                                                   |
| Yesterday            | `yesterday`            | 昨日                                                        |
| Today                | `today`                | 今日                                                        |
| ThisMonth            | `thisMonth`            | 今月 (残りを含む)                                                |
| ThisQuarter          | `thisQuarter`          | 今四半期 (残りを含む)                                              |
| ThisYear             | `thisYear`             | 今年 (残りを含む)。今年 1 月 1 日から 12 月 31 日まで                       |
| PreviousMonth        | `previousMonth`        | 前月                                                        |
| PreviousQuarter      | `previousQuarter`      | 前四半期                                                      |
| PreviousYear         | `previousYear`         | 前年                                                        |
| NextMonth            | `nextMonth`            | 来月                                                        |
| NextQuarter          | `nextQuarter`          | 次の四半期                                                     |
| NextYear             | `nextYear`             | 来年                                                        |
| TrailingTwelveMonths | `trailingTwelveMonths` | 過去 12 か月                                                       |
