# Data Limits

There are server-side size limits when using Reveal Web regarding the size of downloaded files, the number of cells in a result set (after aggregation), and the size of pivot tables and grids (given as a number of cells). Reveal SDK also limits the number of cells requested for a single visualization on the client.
The objective of these limits is to prevent the server from running out of resources (memory and disk space).

Default limit values:

-	200 MB when downloading CSV/JSON/Excel
-	10 million cells
-	64 million characters (adding all the strings in all cells).
-	100,000 cells requested for a single visualization.

To change the server-side values, use the properties exposed by [`RevealEmbedSettings`](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.RevealEmbedSettings.html):

| Property | Description  |  
|---|---|
|  MaxDownloadSize  | Sets a limit on the size of a single download (e.g. a CSV file). Default is 200 MB. |
|  MaxStorageCells | Set this property to the expected maximum number of cells to be processed from any data source (e.g. from SQL Server table rows or CSV rows). The engine avoids using too much disk space for its cache and this setting provides a hint for its caching management. Default is 10 million cells.  |
|  MaxStringCellSize |  Sets a limit on the number of characters any string in a dataset column may have. Default is 256. This limit also bounds the text shown in Grid and Pivot [PDF exports](https://help.revealbi.io/web/exporting-dashboards/#export-to-pdf). |
|  MaxTotalStringsSize | Set this property to the expected maximum size of pivot tables or grids, given as the total number of characters in all of its cells. The engine avoids using too much memory and this setting provides a hint for its memory management. Default is 64 million. |

## MaxStringCellSize and PDF exports

`MaxStringCellSize` bounds the text shown in Grid and Pivot [PDF exports](https://help.revealbi.io/web/exporting-dashboards/#export-to-pdf). Values longer than the limit are truncated, so an export can never show more characters per cell than this setting allows. There is no "unlimited" option.

It is tempting to raise this value when a report needs longer text, but it is not an export setting. The engine applies it when data is loaded into its cache, before any visualization or export runs, and it is a single server-wide value with no per-dashboard or per-export override. Raising it changes how all data is ingested and cached for every dashboard on the server.

Before changing it, be aware that a higher value:

- increases the size of every cached dataset on disk and in memory, for all dashboards, not only the one being exported;
- consumes the `MaxTotalStringsSize` budget (64 million characters by default) proportionally faster. Datasets that cross that limit **fail to load with a data-size error** rather than degrading gracefully, and the error appears on whichever dashboard happens to cross it — not necessarily the one you were exporting. If you raise `MaxStringCellSize` substantially, review `MaxTotalStringsSize` at the same time;
- increases row heights and page count in exported PDFs, because Grid and Pivot cells have a fixed width and long values wrap onto multiple lines.

Choosing a value that suits your data is up to you. Set it to the shortest length that keeps your exports readable, rather than raising it to accommodate the longest value your data might contain.

```cs
builder.Services.AddControllers().AddReveal(revealSetupBuilder =>
{
    revealSetupBuilder.AddSettings(settings =>
    {
        // Server-wide. Affects all data loading, not only PDF export.
        settings.MaxStringCellSize = 1024;
        settings.MaxTotalStringsSize = 128000000; // review alongside the above
    });
});
```

:::warning Clear the data cache after changing this setting
`MaxStringCellSize` is not part of the dataset cache key, so changing it does not invalidate datasets that are already cached. Cached data was truncated using the previous value and is reused as-is. Until the cache is cleared, dashboards continue to show the old, truncated values and the new setting appears to have no effect.

Clear the cache by deleting the contents of the [cache directories](https://help.revealbi.io/web/caching/#cache-files) (`CachePath` and `DataCachePath`) while the application is stopped. Using the **Refresh** option in the visualization menu is not sufficient — it refreshes a single data source on the existing cache rather than discarding datasets cached under the old limit.
:::

If only one report needs longer text, prefer reshaping the data — splitting the long column, or trimming it in the query — over raising the global limit.

## Client-side visualization limit

`RevealSdkSettings.maxCellsRestriction` controls the maximum number of cells (rows * columns) that can be requested from the data source for a single visualization. It defaults to 100,000. Set it before creating the `RevealView`:

```ts
import { RevealSdkSettings } from "reveal-sdk";

RevealSdkSettings.maxCellsRestriction = 200000;
```

Increasing this value allows visualizations to render more data, but can increase memory usage and reduce performance.
