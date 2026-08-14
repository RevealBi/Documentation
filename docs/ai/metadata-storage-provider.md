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
| `CreateAsync` / `UpdateAsync` | Saves a new or existing item. Implementations may throw if its existence expectation is not met. |
| `DeleteAsync` | Removes an item by its logical ID. |
| `ListAsync` | Lists IDs matching a case-insensitive wildcard pattern. `*` returns all IDs. |

## Scope metadata to the user

Every operation receives `IRVUserContext`. Use it to partition records by tenant or user and apply permission rules. In a multi-tenant store, never use only the metadata ID as the storage key.

For example, compose the storage key from the user context before retrieving metadata:

```csharp
public Task<T?> GetByIdAsync<T>(string id, IRVUserContext userContext)
{
    var storageKey = $"{userContext.UserId}:{id}";
    return _storage.GetAsync<T>(storageKey);
}
```

Apply the same scope when listing metadata so a user cannot discover another user's IDs:

```csharp
public Task<IEnumerable<string>> ListAsync(
    IRVUserContext userContext,
    string searchPattern = "*")
{
    var prefix = $"{userContext.UserId}:";
    return _storage.ListAsync(prefix, searchPattern);
}
```

`_storage` represents your database, blob store, or other persistence mechanism. Apply the same user or tenant scope consistently to create, update, delete, list, and read operations. A complete implementation belongs in an application sample rather than in this page.

## Register the provider

Register a custom provider after `AddRevealAI()`. It replaces the default JSON storage provider for all metadata operations.

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .UseMetadataCatalogFile("config/catalog.json")
    .UseMetadataStorageProvider<TenantMetadataStorageProvider>()
    .AddOpenAI();
```

Custom metadata storage providers are singletons. Ensure the implementation is thread-safe and inject only singleton-safe dependencies.
