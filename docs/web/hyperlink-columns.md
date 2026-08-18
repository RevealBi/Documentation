import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Hyperlink Columns

Hyperlink columns turn the values of a Grid, Pivot, Sparkline, or Data Grid column into clickable links. Because both the destination and the displayed text can include field tokens, every row gets its own destination built from that row's data — for example, an **Order Id** column where each cell opens the detail page for that specific order.

## Configuring a Hyperlink Column

Hyperlinks are configured by the end-user in the visualization editor and stored in the dashboard file. Open the visualization editor, select a field, and open the **Hyperlink** section of the field settings. Any field works — text, number, and date fields alike.

| Setting | Description |
|---|---|
| **Link type** | **URL** navigates to a web address; **Dashboard** opens another dashboard and can pass filter values to it. |
| **Open Target** | Where the link opens — a new window or tab, or the current one. |
| **Display Text** | Optional template. When empty, the cell keeps showing the underlying value; when set, the resolved text is shown instead while the cell still navigates to the configured destination. |

Clearing the hyperlink configuration in the field settings removes the link and returns the column to a plain value column.

:::info

Hyperlink columns are supported in the **Grid**, **Pivot**, **Sparkline**, and **Data Grid** visualizations.

Sorting always uses the cell's underlying value, never the resolved **Display Text**. A `View Invoice [InvoiceId]` label on a date column still sorts chronologically.

:::

## Field Tokens

A token is a field name in square brackets — `[FieldName]` — replaced at runtime with that field's value for the clicked row. Tokens work in both the destination URL and the display text.

```
https://www.example.com/orders/[OrderId]        →  https://www.example.com/orders/10248
https://www.example.com/search?customer=[CompanyName]
```

Values placed in the query string are URL-encoded automatically. A **Display Text** template of `Order [OrderId] — [CompanyName]` renders as `Order 10248 — Alfreds Futterkiste`. To output a literal bracket, double it: `[[` produces `[` and `]]` produces `]`.

Tokens referring to a field that is not part of the visualization — or whose value is missing for that row — resolve to an empty string.

## Relative URLs

Destination URLs do not have to be absolute. Relative URLs let a hyperlink column point at a route inside the application hosting the Reveal view. When the URL field loses focus in the editor, the entered value is normalized:

| Entered URL | Normalized URL |
|---|---|
| `contact/[ContactId]` | `./contact/[ContactId]` |
| `/contact/[ContactId]` | `/contact/[ContactId]` |
| `../contact/[ContactId]` | `../contact/[ContactId]` |
| `example.com/contact` | `http://example.com/contact` |

Values beginning with `/`, `./`, `../`, `?`, or `#` are explicit relative URLs and are preserved as-is. A value that looks like a host name without a scheme gets one matching the protocol of the hosting page, so an HTTPS page produces `https://`.

Only the `http`, `https`, `mailto`, and `tel` schemes are allowed. URLs containing backslashes, carriage returns, line feeds, or tabs are rejected.

:::caution

Relative URLs are supported on **Web** only, where the browser supplies a base URL. The WPF, iOS, and Android clients require absolute URLs.

:::

## Handling URL Links in Code

The `onUrlLinkRequested` callback runs before navigation. Use it to inspect or rewrite the destination, or to cancel navigation by returning a null or empty value — which is also how a single-page application routes internally without a full page reload.

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

## Handling Dashboard Links in Code

When a hyperlink column opens a dashboard, the `onLinkedDashboardProviderAsync` callback receives an extra argument object carrying the click context, so the application can return a different dashboard — or one loaded with different data — depending on the row that was clicked.

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

| Member | Description |
|---|---|
| `dashboardId` | The identifier of the linked dashboard. |
| `title` | The title assigned to the dashboard link. |
| `visualization` | The visualization from which the link was requested. |
| `cell` | The cell the link was requested from, or `null` when there is no cell context. |
| `row` | The complete row the link was requested from, or `null` when there is no row context. |

`args` is populated when the link originates from a visualization the end-user clicked, and is `null` otherwise — for example while the end-user is creating a dashboard link in the visualization editor. Always check for `null` before reading `cell` or `row`.

### Upgrading Existing Code

:::warning Breaking Change

The WPF `LinkedDashboardProvider` callback now takes a third parameter; existing handlers will not compile until it is added to their signature. In JavaScript the third parameter is optional, so existing handlers keep working unchanged — add it only when the cell or row context is needed.

:::

```cs
// Before
_revealView.LinkedDashboardProvider = (dashboardId, linkTitle) => new RVDashboard(dashboardId);

// After
_revealView.LinkedDashboardProvider = (dashboardId, linkTitle, args) => new RVDashboard(dashboardId);
```

## Interactive Filtering and Hyperlink Cells

In the Data Grid, clicking a cell displays the standard interactive filtering actions, letting the end-user filter the dashboard by the clicked value — the same behavior charts and gauges already have. Cells that render a hyperlink or an action are excluded, so clicking a link follows the link rather than applying a filter.

## Limitations

- Hyperlink configuration is a client-side feature. There is no equivalent API in the Java or Node.js server SDKs.
- Relative URLs resolve only on the Web client. WPF, iOS, and Android require absolute URLs.
- Only the `http`, `https`, `mailto`, and `tel` schemes are permitted.
- Tokens referring to fields outside the visualization resolve to an empty string.
- A column supports a single link action; multiple actions on one cell are not available.

## See Also

- [Linking Dashboards](linking-dashboards.md) — creating dashboard links and supplying a custom dashboard selector UI.
