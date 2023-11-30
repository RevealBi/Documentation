# Caching

In Reveal SDK, caching is a default mechanism designed to optimize performance by storing all queried data in a faster and embedded database, referred to as a cache. This process ensures that frequently accessed data is readily available, and upon initiating a query, the SDK automatically checks if the requested data is already present in the cache. In the event of a cache hit, the SDK swiftly retrieves the information without the need for an additional request to the original source.

## How caching works
When you query data through the SDK, a new *key* is created, encompassing all the options used to obtain that data, for each pipeline step. This *key* is stored alongside the resultant data from the pipeline step. Upon repeating the same operation, the key specific to each pipeline step will be recognized, and the corresponding data will be retrieved from the cache. However, if you alter any aspect of the data query for a particular step, such as ordering or filtering, the *key* won't match, and only the affected step and subsequent steps will perform the process. This new query will be saved alongside its results. For instance, changing the order of data obtained from an Excel file won't trigger the file to be downloaded again; only the specific step requiring modification, like the filter and the steps after it, will perform the process.

### Processing pipeline
The processing pipeline outlines the sequential stages through which data is systematically processed. Understanding the processing pipeline is important to discern where and how the cache comes into action, playing a significant role in optimizing data retrieval and enhancing overall processing efficiency.

```mermaid
graph LR;
    A[Download Resource]-->B[Create Dataset]-->C[Calculate Fields]-->D[Filter]-->E[Pivot Table Build]-->F[Post Pivot - Calculate Fields]-->G[Post Pivot - Filter];
```

<br/>

- The `[Download Resource]` stage only applies when using resource-based data sources, from which we typically download CSV/Json/Excel files.
- Some stages may be skipped or end up not making any changes, depending on the requested data. For instance, there might be no post-pivot calculated fields to process, or perhaps all filters are included in a query sent to the data source, making the `[Filter]` step unnecessary.
- These stages do not apply to the SSAS datasource, as it uses a different processing pipeline.

### Cache files
By default, cache files are stored in a folder inside the current user's temporary directory named `RevealCache_XXXX`, where `XXXX` is a number that identifies our instance. Two configuration properties, `CachePath` and `DataCachePath`, can be used to override this default behavior.

```cs
builder.Services
    .AddControllers()
    .AddReveal(revealSetupBuilder =>
    {
        revealSetupBuilder.AddSettings(settings =>
        {
            settings.CachePath = "your-cache-path";
            settings.DataCachePath = "your-data-cache-path";
        });
    });
```

- `CachePath` refers to the directory where the rest of cache files (like downloaded files) will be stored, it defaults to a directory named `RevealCache_XXXX` in the temporary directory in the system.
- `DataCachePath` refers to Directory where files caching data will be stored, it defaults to `CachePath`.

You can configure additional properties to exert control over the cache size:

```cs
builder.Services.AddControllers().AddReveal(revealSetupBuilder =>
{
    revealSetupBuilder.AddSettings(settings =>
    {
        settings.MaxStorageCells = 10000000;
        settings.MaxDownloadSize = 209715200;
        settings.MaxStringCellSize = 256;
        settings.MaxTotalStringsSize = 64000000;
    });
});
```

- `MaxStorageCells` refers to the expected maximum size of cells to be processed from any data source. The engine avoids using too much disk space for its cache, and this setting provides a hint for its caching management. The default is 10 million cells.
- `MaxDownloadSize` refers to the maximum size of a single download (e.g., a CSV file), expressed in bytes. The default is 200 MB.
- `MaxStringCellSize` refers to the limit on the number of characters any string in a dataset column may have. The default is 256.
- `MaxTotalStringsSize` refers to the expected maximum size of pivot tables or grids, given as the total number of characters in all of its cells. The engine avoids using too much memory, and this setting provides a hint for its memory management. The default is 64 million.

### Cache types
**Download** - Utilized by the `[Download Resource]` stage, this cache stores the downloaded resource when reading data from CSV/Excel/Json files. The filesystem cache is saved in `[RevealCache]/download`, with associated metadata stored in `[RevealCache]/download.sqlite`.

Individual downloads are constrained by the number of bytes specified in the `MaxDownloadSize` setting. Please note that the overall size of the downloads cache is fixed at 5GB, and as of now, there is no available API to modify this limit.

**Dataset** - Utilized by the `[Create Dataset]` and `[Calculate Fields]` stages.

Sqlite files are stored in `[RevealCache]/dataset`, with metadata residing in `dataset.sqlite`.

Some datasets are generated in memory and are also saved in an in-memory dataset cache.

The size of individual datasets is indirectly restricted by a set of parameters: `MaxStorageCells` and `MaxTotalStringsSize`. The total size of the dataset cache is fixed at 5GB, and as of now, there is no available API to modify this limit.

**Tabular Data** - This cache holds the result after executing all stages.

The data is serialized as JSON and stored in the `[RevealCache]/tabulardata.sqlite` file.

It is also linked to an in-memory cache. In case of a cache miss, the system resorts to the SQLite storage.

The size of the `tabulardata.sqlite` file is unrestricted.

## Refreshing the cache
Refreshing the cache involves updating or renewing the stored data within the cache to maintain accuracy and reflect the most recent information. By default, the cache is set to update `Once a day`. The behavior of cache refreshing can be modified from the visualization UI, allowing users to change the update period or trigger a manual update based on their specific requirements.

You can trigger a manual update just by clicking the refresh option in the menu (indicated by three dots).

![](images/cache-refresh.jpg)

You can change the update frequency by selecting another value from the refresh data frequency combo box. This option is available in the data source configuration dialog.

The available options are the following:
- Always
- Once an hour
- Once a day
- Once a week

![](images/cache-frequency.jpg)

## Disabling caching
Disabling caching is not an available option; however, you can achieve a similar result by setting the data source refresh data frequency to `Always`. This configuration ensures that the application consistently retrieves fresh data, bypassing the cache. It's essential to note that even if the cache is not consulted during queries, the processed data will still be saved. While this approach guarantees access to the most up-to-date information, it's important to be mindful of potential performance impacts due to the increased load on the data source when utilizing real-time access. Developers may opt for this configuration temporarily for debugging purposes or when working with dynamic data that frequently changes.

To bypass caching, set the data source refresh data frequency to `Always`.

![](images/cache-disable.jpg)

## Clearing the cache

Clearing the cache is as simple as deleting the contents of the folder where the cache is stored. This process helps free up storage space and ensures that the cache is reset. Additionally, it allows the application to retrieve the latest data from the original source upon the next query, providing a refreshed and up-to-date experience.