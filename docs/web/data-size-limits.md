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
|  MaxStringCellSize |  Sets a limit on the number of characters any string in a dataset column may have. Default is 256. Longer values are truncated, in the dashboard and in [PDF exports](https://help.revealbi.io/web/exporting-dashboards/#export-to-pdf) alike. See [MaxStringCellSize and long text values](#maxstringcellsize-and-long-text-values). |
|  MaxTotalStringsSize | Set this property to the expected maximum size of pivot tables or grids, given as the total number of characters in all of its cells. The engine avoids using too much memory and this setting provides a hint for its memory management. Default is 64 million. |

## MaxStringCellSize and long text values

`MaxStringCellSize` determines how many characters of a string value the engine keeps when it loads data. Values longer than the limit are truncated to the limit, and every part of the product works from that same truncated value — the Grid and Pivot visualizations in the dashboard, and the [PDF export](https://help.revealbi.io/web/exporting-dashboards/#export-to-pdf) of those visualizations alike. There is no "unlimited" option.

This means text length in a PDF export always matches what the dashboard itself displays. If you want a PDF to show more characters per cell, raise `MaxStringCellSize`; the dashboard will show the longer text as well.

The setting is applied once, server-wide, when data is loaded — it is not a per-dashboard or per-export option. Raising it affects every dashboard on the server. Keep in mind that Grid and Pivot cells have a fixed width, so longer values wrap onto multiple lines; in a PDF export this increases row heights and page count.

Set the value to the shortest length that keeps your data readable, rather than raising it to accommodate the longest value your data might contain. Reveal is an analytics tool, and its visualizations are designed around aggregated values and short labels; columns holding paragraphs of text are usually better split, shortened in the query, or kept out of the visualization entirely.

```cs
builder.Services.AddControllers().AddReveal(revealSetupBuilder =>
{
    revealSetupBuilder.AddSettings(settings =>
    {
        // Server-wide. Applies to all data loading, for every dashboard.
        settings.MaxStringCellSize = 1024;
    });
});
```
## Client-side visualization limit

`RevealSdkSettings.maxCellsRestriction` controls the maximum number of cells (rows * columns) that can be requested from the data source for a single visualization. It defaults to 100,000. Set it before creating the `RevealView`:

```ts
import { RevealSdkSettings } from "reveal-sdk";

RevealSdkSettings.maxCellsRestriction = 200000;
```

Increasing this value allows visualizations to render more data, but can increase memory usage and reduce performance.
