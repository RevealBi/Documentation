import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ハイパーリンク列

ハイパーリンク列は、グリッド、ピボット、スパークライン、データ グリッドの列の値をクリック可能なリンクに変換します。リンク先と表示テキストの両方にフィールド トークンを含めることができるため、各行のデータに基づいて行ごとに固有のリンク先が生成されます。たとえば、**注文 ID** 列では、各セルがその注文の詳細ページを開きます。

## ハイパーリンク列の構成

ハイパーリンクはエンドユーザーが表示形式エディターで構成し、ダッシュボード ファイルに保存されます。表示形式エディターを開き、フィールドを選択して、フィールド設定の **[ハイパーリンク]** セクションを開きます。テキスト、数値、日付のいずれのフィールドでも使用できます。

| 設定 | 説明 |
|---|---|
| **リンクの種類** | **URL** は Web アドレスに移動します。**ダッシュボード** は別のダッシュボードを開き、フィルター値を渡すことができます。 |
| **開くターゲット** | リンクを開く場所 (新しいウィンドウまたはタブ、あるいは現在のウィンドウ)。 |
| **表示テキスト** | 任意のテンプレート。空の場合、セルは基になる値を表示し続けます。設定した場合は、解決されたテキストが代わりに表示され、セルは構成されたリンク先に移動します。 |

フィールド設定でハイパーリンクの構成をクリアすると、リンクが削除され、列は通常の値の列に戻ります。

:::info

ハイパーリンク列は、**グリッド**、**ピボット**、**スパークライン**、**データ グリッド** の表示形式でサポートされています。

並べ替えでは常にセルの基になる値が使用され、解決された **表示テキスト** は使用されません。日付列に `View Invoice [InvoiceId]` というラベルを設定した場合でも、時系列で並べ替えられます。

:::

## フィールド トークン

トークンは角かっこで囲まれたフィールド名 (`[FieldName]`) で、実行時にクリックされた行のそのフィールドの値に置き換えられます。トークンは、リンク先の URL と表示テキストの両方で使用できます。

```
https://www.example.com/orders/[OrderId]        →  https://www.example.com/orders/10248
https://www.example.com/search?customer=[CompanyName]
```

クエリ文字列に配置された値は自動的に URL エンコードされます。**表示テキスト** テンプレートに `Order [OrderId] — [CompanyName]` を指定すると、`Order 10248 — Alfreds Futterkiste` としてレンダリングされます。角かっこをリテラルとして出力するには、`[[` は `[` に、`]]` は `]` になるように 2 つ重ねます。

表示形式に含まれていないフィールドを参照するトークン、またはその行に値が存在しないトークンは、空の文字列に解決されます。

## 相対 URL

リンク先の URL は絶対 URL である必要はありません。相対 URL を使用すると、ハイパーリンク列から、Reveal ビューをホストしているアプリケーション内のルートを参照できます。エディターで URL 項目のフォーカスが外れると、入力された値は正規化されます。

| 入力された URL | 正規化された URL |
|---|---|
| `contact/[ContactId]` | `./contact/[ContactId]` |
| `/contact/[ContactId]` | `/contact/[ContactId]` |
| `../contact/[ContactId]` | `../contact/[ContactId]` |
| `example.com/contact` | `http://example.com/contact` |

`/`、`./`、`../`、`?`、`#` で始まる値は明示的な相対 URL として扱われ、そのまま保持されます。スキームのないホスト名のように見える値には、ホスト ページのプロトコルに一致するスキームが追加されるため、HTTPS のページでは `https://` になります。

ナビゲーションに使用できるスキームは `http`、`https`、`mailto`、`tel` のみです。円記号、復帰、改行、タブ文字を含む URL は拒否されます。

:::caution

相対 URL は、ブラウザーが解決用のベース URL を提供する **Web** でのみサポートされています。WPF、iOS、Android のクライアントでは絶対 URL が必要です。

:::

## コードでの URL リンクの処理

`onUrlLinkRequested` コールバックは、ナビゲーションの前に実行されます。これを使用して、リンク先を検査または書き換えることができます。また、null または空の値を返すとナビゲーションをキャンセルできます。これは、シングル ページ アプリケーションがページ全体を再読み込みせずに内部でルーティングする方法でもあります。

<Tabs groupId="code" queryString>
  <TabItem value="javascript" label="JavaScript" default>

```js
revealView.onUrlLinkRequested = (args) => {
    console.log(args.url);           // the resolved destination
    console.log(args.target);        // where the browser should open it
    console.log(args.visualization); // the visualization that was clicked
    console.log(args.cell);          // the clicked cell
    console.log(args.row);           // the entire clicked row

    // route app-relative links through the client-side router
    if (args.url.startsWith("./") || args.url.startsWith("/")) {
        router.navigate(args.url);
        return null; // cancels the default navigation
    }

    return args.url + "&source=reveal";
};
```

  </TabItem>

  <TabItem value="wpf" label="WPF">

```cs
_revealView.UrlLinkRequested = (args) =>
{
    Debug.WriteLine(args.Url);
    Debug.WriteLine(args.Target);
    Debug.WriteLine(args.Visualization.Title);
    Debug.WriteLine(args.Cell?.FormattedValue);

    return args.Url + "&source=reveal";
};
```

  </TabItem>
</Tabs>

## コードでのダッシュボード リンクの処理

ハイパーリンク列がダッシュボードを開く場合、`onLinkedDashboardProviderAsync` コールバックはクリックのコンテキストを持つ追加の引数オブジェクトを受け取ります。これにより、アプリケーションはクリックされた行に応じて、異なるダッシュボード、または異なるデータが読み込まれたダッシュボードを返すことができます。

<Tabs groupId="code" queryString>
  <TabItem value="javascript" label="JavaScript" default>

```js
revealView.onLinkedDashboardProviderAsync = (dashboardId, linkTitle, args) => {
    console.log(args?.dashboardId);    // id of the linked dashboard
    console.log(args?.title);          // title assigned to the link
    console.log(args?.visualization);  // originating visualization
    console.log(args?.cell);           // clicked cell, or null
    console.log(args?.row);            // entire clicked row, or null

    return RVDashboard.loadDashboard(dashboardId);
};
```

  </TabItem>

  <TabItem value="wpf" label="WPF">

```cs
_revealView.LinkedDashboardProvider = (dashboardId, linkTitle, args) =>
{
    if (args != null)
    {
        Debug.WriteLine(args.DashboardId);
        Debug.WriteLine(args.Title);
        Debug.WriteLine(args.Visualization.Title);
        Debug.WriteLine(args.Cell?.FormattedValue);
    }

    return new RVDashboard(dashboardId);
};
```

  </TabItem>
</Tabs>

| メンバー | 説明 |
|---|---|
| `dashboardId` | リンクされたダッシュボードの識別子。 |
| `title` | ダッシュボード リンクに割り当てられたタイトル。 |
| `visualization` | リンクが要求された表示形式。 |
| `cell` | リンクが要求されたセル。セルのコンテキストがない場合は `null`。 |
| `row` | リンクが要求された行全体。行のコンテキストがない場合は `null`。 |

`args` は、エンドユーザーがクリックした表示形式からリンクが発生した場合に設定され、それ以外の場合は `null` になります。たとえば、エンドユーザーが表示形式エディターでダッシュボード リンクを作成している場合などです。`cell` や `row` を読み取る前に、必ず `null` かどうかを確認してください。

### 既存コードのアップグレード

:::warning 重大な変更

WPF の `LinkedDashboardProvider` コールバックは 3 番目のパラメーターを受け取るようになりました。既存のハンドラーは、シグネチャにこのパラメーターを追加するまでコンパイルできません。JavaScript では 3 番目のパラメーターは任意であるため、既存のハンドラーは変更なしで動作し続けます。セルまたは行のコンテキストが必要な場合にのみ追加してください。

:::

```cs
// Before
_revealView.LinkedDashboardProvider = (dashboardId, linkTitle) => new RVDashboard(dashboardId);

// After
_revealView.LinkedDashboardProvider = (dashboardId, linkTitle, args) => new RVDashboard(dashboardId);
```

## インタラクティブなフィルタリングとハイパーリンク セル

データ グリッドでは、セルをクリックすると標準のインタラクティブなフィルタリング アクションが表示され、エンドユーザーはクリックした値でダッシュボードをフィルターできます。これは、チャートやゲージにすでに備わっている動作と同じです。ハイパーリンクまたはアクションをレンダリングするセルは対象外となるため、リンクをクリックするとフィルターが適用されるのではなく、リンクが開かれます。

## 制限事項

- ハイパーリンクの構成はクライアント側の機能です。Java および Node.js のサーバー SDK には同等の API はありません。
- 相対 URL は Web クライアントでのみ解決されます。WPF、iOS、Android では絶対 URL が必要です。
- 使用できるスキームは `http`、`https`、`mailto`、`tel` のみです。
- 表示形式に含まれていないフィールドを参照するトークンは、空の文字列に解決されます。
- 1 つの列でサポートされるリンク アクションは 1 つのみです。1 つのセルに複数のアクションを設定することはできません。

## 関連項目

- [ダッシュボード リンク](linking-dashboards.md) - ダッシュボード リンクの作成と、カスタム ダッシュボード セレクター UI の提供。
