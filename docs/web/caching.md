import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Caching

In Reveal SDK, caching is a default mechanism designed to optimize performance by storing all queried data in a faster and embedded database, referred to as a cache. This process ensures that frequently accessed data is readily available, and upon initiating a query, the SDK automatically checks if the requested data is already present in the cache. In the event of a cache hit, the SDK swiftly retrieves the information without the need for an additional request to the original source.

## How caching works
When you request data, Reveal can reuse cached results when the applicable data source, credential, and query information matches and the results meet the configured refresh frequency. The information used to determine whether results can be reused depends on the data source and credential type. See the [FAQ](#faq) for guidance on user-specific data.

Changing a query option, such as a filter or sort order, may require new results for that operation while allowing other cached results to be reused. For example, changing the sort order of data from an Excel file does not necessarily require downloading the file again.

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

The data is serialized as JSON and temporarily stored in an in-memory cache.

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
Reveal does not provide a single setting to disable all caching. To request fresh data for visualization data queries, set the data source refresh data frequency to `Always`.

Processed results can still be stored in the cache. More frequent refreshes can increase load on the data source and affect performance.

Refresh frequency controls data freshness. It does not replace server-side authorization or the credential configuration described in the [FAQ](#faq).

![](images/cache-disable.jpg)

## Redis Cache

The Reveal SDK supports using Redis as a distributed cache provider, enabling cache sharing across multiple server instances. This is particularly useful in load-balanced environments where multiple instances of your application need to access the same cached data.

:::note

The Redis cache feature replaces the in-memory cache used for tabular data. Local processing operations still use the SQLite cache. Local processing occurs when data from sources that cannot be directly queried must be retrieved and processed locally. This includes:
- Stored procedures
- REST APIs
- Data source items with cross data source joins
- Other sources requiring data to be pulled from the original source and stored temporarily for query execution

:::

### Installation

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

For ASP.NET applications, you need to install a separate NuGet package to enable Redis cache support:

```bash
dotnet add package Reveal.Sdk.Cache.Redis
```

  </TabItem>
  <TabItem value="node" label="Node.js">

For Node.js applications, the Redis cache is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
  <TabItem value="java" label="Java">

For Java applications, the Redis cache is already included in the main Reveal SDK package. No additional installation is required beyond the standard Reveal SDK setup.

  </TabItem>
</Tabs>

### Configuration

To enable Redis cache, configure the connection in your application initialization:

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
builder.AddRedisCache((options) => {
    options.ConnectionString = "localhost:6379";
});
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const revealOptions = {
    ...
    redisOptions: { connectionString: "localhost:6379" }
};
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const revealOptions: RevealOptions = {
    ...
    redisOptions: { connectionString: "localhost:6379" }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
initializeParameterBuilder.enableRedisCache((options) -> {
    options.setConnectionString("localhost:6379");
});
```

  </TabItem>
</Tabs>

### Redis Configuration Options

The Redis cache provider supports various configuration options to customize the connection and behavior:

- **ConnectionString** - The Redis server connection string or endpoint (e.g., "localhost:6379"). Default: empty string.
- **EndPoints** - A list of endpoint URLs used for connecting to Redis cluster or multiple Redis instances. Default: null.
- **User** - The username for Redis authentication. Default: null.
- **Password** - The password for Redis authentication. Default: null.
- **UseSsl** - Indicates whether SSL/TLS encryption is enabled. Default: false.
- **DefaultDatabase** - The default database number to use. Default: 0.
- **ClientName** - The client name for identification. Default: null.
- **ConnectTimeoutMs** - The connection timeout in milliseconds. Default: 5000.
- **SyncTimeoutMs** - The synchronous operation timeout in milliseconds. Default: 5000.
- **AsyncTimeoutMs** - The asynchronous operation timeout in milliseconds. Default: 5000.
- **ConnectRetry** - The number of connection retry attempts. Default: 3.
- **KeepAliveSeconds** - The keep-alive interval in seconds (-1 to disable). Default: 60.
- **AbortOnConnectFail** - Indicates whether to abort on connection failure. Default: false.
- **AllowAdmin** - Indicates whether admin commands (FLUSHDB, CONFIG, etc.) are allowed. Default: false.
- **ReconnectRetryPolicy** - The reconnection retry policy: "Linear" or "Exponential". Default: "Linear".
- **RetryDelayMs** - The base delay in milliseconds for the retry policy. Default: 1000.

Example with additional configuration options:

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
builder.AddRedisCache((options) => {
    options.ConnectionString = "localhost:6379";
    options.Password = "your-password";
    options.UseSsl = true;
    options.DefaultDatabase = 1;
    options.ConnectTimeoutMs = 10000;
});
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const revealOptions = {
    ...
    redisOptions: { 
        connectionString: "localhost:6379",
        password: "your-password",
        useSsl: true,
        defaultDatabase: 1,
        connectTimeoutMs: 10000
    }
};
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const revealOptions: RevealOptions = {
    ...
    redisOptions: { 
        connectionString: "localhost:6379",
        password: "your-password",
        useSsl: true,
        defaultDatabase: 1,
        connectTimeoutMs: 10000
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
initializeParameterBuilder.enableRedisCache((options) -> {
    options.setConnectionString("localhost:6379");
    options.setPassword("your-password");
    options.setUseSsl(true);
    options.setDefaultDatabase(1);
    options.setConnectTimeoutMs(10000);
});
```

  </TabItem>
</Tabs>

## FAQ

**Q: Does the cache consume a lot of disk space?**

**A:** The cache is engineered to utilize approximately 20GB, automatically removing older entries if necessary. Currently, there is no public setting to adjust this size.

**Q: My disk is filling up, and I think Reveal is to blame**

**A:** Before reporting a bug, check if the OS temporary directory is not being cleared. Reveal and other processes can generate temporary files that the OS might not remove until it restarts. Consider scheduling a cleanup process to manage this directory periodically. Reveal does create some temporary files that are automatically deleted, so ensure that your cleanup process does not delete recently created files, as they may be part of ongoing operations in Reveal. Additionally, if Reveal's cache folder resides within the OS temporary directory, it should not be deleted by the cleanup process.

**Q: How can I segregate cache entries for different users?**

**A:** Reveal can share cached results to improve performance. Your application must authorize each request for the data it can return, whether that data is cached or retrieved from the data source. Configure the following providers on the server:

- In `IRVUserContextProvider`, return the current user's context with a `UserId` derived from an identity verified by your server.
- In `IRVDataSourceProvider`, enforce the user's access to data sources and queries. Set properties such as `Database`, `Table`, and `CustomQuery` according to the user's permissions where applicable. Do not rely on client-side filtering to enforce access restrictions.
- In `IRVAuthenticationProvider`, return credentials appropriate for the data the current user is permitted to access.

See [User Context](user-context.md) and [Authentication](authentication.md) for provider configuration.

Cache sharing depends on the data source, query, and credential type. Different `IRVUserContext.UserId` values do not guarantee separate cache entries for every data source or SDK feature. For deployments that require strict separation, validate the data-source and editing features you enable with users from different tenants and permission scopes.

**Q: How does `IRVUserContext.UserId` impact cache entries?**

**A:** `IRVUserContext.UserId` identifies the current user to your SDK providers. Its effect on cache reuse depends on the credential type.

When using `RVHeadersDataSourceCredentials`, set `IRVUserContext.UserId` to a consistent, nonempty identifier for the authenticated user and the applicable tenant and permission scope. Keep the value stable across requests that should share results, and use different values for users or scopes that must not share them. For example, users in different tenants must not share an identifier simply because their local usernames match.

For visualization data queries using these credentials, different header, token, or cookie values alone do not separate cached results. If `UserId` and the applicable data source and query information match, cached results may be reused even when those credential values differ. Reusing an identifier for users with different access rights can therefore cause a user to receive cached results intended for another user.

Do not use a missing or empty `UserId`, or a shared placeholder such as `guest`, for users with different permissions. Do not rely on token or cookie changes to enforce access restrictions. When a user's tenant or permissions change, update the server-side authorization and ensure that the identity used for headers credentials reflects the new access scope.

**Q: How does the `RVBearerTokenDataSourceCredential.UserId` property impact cache entries?**

**A:** `RVBearerTokenDataSourceCredential.UserId` identifies the user associated with the access token. Set a consistent, nonempty value for that user and permission scope to allow cached results to be reused across token refreshes. This property is separate from `IRVUserContext.UserId`, and the two values may differ.

Do not assign the same credential `UserId` to tokens that represent different users, tenants, or permission scopes. A changed token alone does not separate cached results when this credential `UserId` and the applicable data source and query information match.

If you pass a bearer token in an authorization header through `RVHeadersDataSourceCredentials`, follow the guidance for headers credentials above.

**Q: In my deployment, there will be several instances of the Reveal server. How can they share the cache?**

**A:** The Reveal SDK now supports Redis cache, which enables cache sharing across multiple server instances. By configuring Redis cache as described in the [Redis Cache](#redis-cache) section, all your server instances can access the same distributed cache. This is the recommended approach for load-balanced deployments.

Alternatively, if Redis is not available, you can configure your load balancer to direct the same group of users to the same Reveal server instance. This will ensure that cache entries are created within a specific instance, and subsequent requests from those users will hit the same instance, utilizing the cached data efficiently.
