---
sidebar_label: Metadata Storage Provider
sidebar_custom_props:
  status: preview
---

# Metadata Storage Provider

By default, Reveal SDK AI stores generated metadata as JSON files on disk. `IMetadataStorageProvider` lets you store that metadata elsewhere and control which metadata is available to each user or tenant. Use a custom provider when local files are not appropriate for your production environment, or when metadata visibility depends on the requesting user.

The metadata includes database schema information, cached filter values, and field metrics that Reveal uses to understand your data and improve performance.

## Implement the interface

```csharp
using Reveal.Sdk;
using Reveal.Sdk.AI.Metadata;

public interface IMetadataStorageProvider
{
    Task<T?> GetByIdAsync<T>(string id, IRVUserContext userContext);
    Task CreateAsync<T>(string id, T metadata, IRVUserContext userContext);
    Task UpdateAsync<T>(string id, T metadata, IRVUserContext userContext);
    Task DeleteAsync(string id, IRVUserContext userContext);
    Task<IEnumerable<string>> ListAsync(IRVUserContext userContext, string searchPattern = "*");
}
```

| Method | Purpose |
|---|---|
| `GetByIdAsync` | Returns an item, or `null` if it is not stored. |
| `CreateAsync` | Saves a new item. Implementations may throw when the item already exists. |
| `UpdateAsync` | Replaces an existing item. Implementations may throw when the item does not exist. |
| `DeleteAsync` | Removes an item by its logical ID. |
| `ListAsync` | Lists IDs matching a case-insensitive wildcard pattern. `*` returns all IDs. |

## Scope and filter metadata

Every operation receives `IRVUserContext`, but metadata generation and metadata retrieval use it differently.

When Reveal generates metadata, it runs as the system metadata user, whose ID is `reveal-ai-metadata-user` by default. Use this stage to store the full generated metadata in a scope that fits your application, such as a tenant, datasource, or shared department. A tenant-scoped store is a common approach when a database belongs to a tenant and its metadata can be shared by that tenant's users.

When Reveal retrieves metadata for a request, the context represents the actual user. Use that context together with your authorization rules to return only the metadata that user is allowed to see. For example, a provider can retrieve tenant metadata and filter inaccessible tables before returning it:

```csharp
public async Task<T?> GetByIdAsync<T>(string id, IRVUserContext userContext)
{
    var metadata = await _storage.GetAsync<T>(id);
    return await _permissions.CanReadAsync(userContext, id) ? metadata : default;
}
```

You can isolate metadata per user instead, but then metadata shared by several users must be replicated and all copies must be updated when regeneration occurs. Whichever storage and filtering strategy you choose, apply it consistently to create, update, delete, list, and read operations.

When a provider filters metadata per user, keep these rules:

- **Base each result on the item ID (or the `ListAsync` search pattern) and the user context only.** Reveal may reuse a result within the same request: while it generates or edits a dashboard, it can read an item or a listing once for the requesting user and serve that result for the rest of the request. Nothing is reused across requests or users, so a permission change takes effect on the next request. When a server instance writes metadata, requests already running on that instance read it again. A write from another instance, or a change the application makes to the storage directly, is seen from the next request.
- **Return unfiltered metadata to the system metadata user.** Reveal writes metadata as that user (`reveal-ai-metadata-user` by default), and some writes save back an item it has just read. For example, it adds each table's alias and description to the datasource index the first time table summaries are requested for that datasource. If the provider filtered what that user reads, the filtered copy would be saved for everyone. Keep that user's ID distinct from the IDs of real users.
- **Filter the datasource index like the table items.** The index lists every table of the datasource, with their aliases and descriptions.

`_storage` represents your database, blob store, or other persistence mechanism. A complete implementation belongs in an application sample rather than in this page.

## Register the provider

Register a custom provider after `AddRevealAI()`. It replaces the default JSON storage provider for all metadata operations.

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .UseMetadataCatalogFile("config/catalog.json")
    .UseMetadataStorageProvider<TenantMetadataStorageProvider>()
    .AddOpenAI();
```

Custom metadata storage providers are singletons. Ensure the implementation is thread-safe and inject only singleton-safe dependencies.
