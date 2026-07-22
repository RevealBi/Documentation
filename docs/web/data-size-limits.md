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
|  MaxStringCellSize |  Sets a limit on the number of characters any string in a dataset column may have. Default is 256. |
|  MaxTotalStringsSize | Set this property to the expected maximum size of pivot tables or grids, given as the total number of characters in all of its cells. The engine avoids using too much memory and this setting provides a hint for its memory management. Default is 64 million. |

## Client-side visualization limit

`RevealSdkSettings.maxCellsRestriction` controls the maximum number of cells (rows * columns) that can be requested from the data source for a single visualization. It defaults to 100,000. Set it before creating the `RevealView`:

```ts
import { RevealSdkSettings } from "reveal-sdk";

RevealSdkSettings.maxCellsRestriction = 200000;
```

Increasing this value allows visualizations to render more data, but can increase memory usage and reduce performance.
