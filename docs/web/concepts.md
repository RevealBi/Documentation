# Concepts

A short mental model for how the Reveal SDK fits together. Read this once; the rest of the docs assume this vocabulary.

## Two pieces: client and server

The Reveal SDK is split between a **client SDK** that runs in the browser and a **server SDK** that runs in your backend.

| Piece | Runs in | Job |
|---|---|---|
| Client SDK | The browser, inside your web app | Renders the `RevealView` component, handles user interactions, sends data and dashboard requests to the server |
| Server SDK | Your backend (ASP.NET, Node.js, NestJS, Spring Boot) | Stores and serves dashboards, answers data queries, holds connection credentials |

The client never talks to your data sources directly. It always goes through the server SDK, which is where credentials and connection strings live. This is what makes embedded analytics secure — sensitive details never reach the browser.

## Dashboards as files

A Reveal dashboard is a **`.rdash` file**. It's a binary container that holds the dashboard's layout, visualizations, filters, and references to data sources. Dashboards are typically saved on the server and loaded into the `RevealView` on demand.

By convention, the server SDK looks for `.rdash` files in a folder named `Dashboards` in the working directory. You can override that convention by implementing a custom dashboard provider (see below).

## The provider pattern

The server SDK is configured by implementing a small set of **provider interfaces**. Each provider gives you a hook into one part of the SDK's behavior:

| Provider | What it controls |
|---|---|
| **`IRVDashboardProvider`** | Where dashboards are loaded from and saved to (file system, database, blob storage, etc.) |
| **`IRVDataSourceProvider`** | The connection details for each data source (host, database, table, schema) — mutated per request based on user context |
| **`IRVAuthenticationProvider`** | The credentials used when connecting to a data source (username/password, token, key pair) |
| **`IRVUserContextProvider`** | The current user's identity and metadata, available to the other providers |

Most embedded scenarios involve customizing one or more of these. For example: serving different dashboards to different tenants combines a custom `IRVDashboardProvider` (to scope dashboards by tenant) with a custom `IRVUserContextProvider` (to identify the tenant from the request). End-to-end multi-provider patterns will live under the upcoming **Solutions & Advanced Guides** section.

## How a request flows

A typical request from the moment a user opens a dashboard:

1. **Client** — your app instantiates a `RevealView`, calls `RVDashboard.loadDashboard("Sales")`.
2. **Network** — the client sends an HTTP request to the server SDK.
3. **Server** — `IRVUserContextProvider.GetUserContext` runs to identify the user.
4. **Server** — `IRVDashboardProvider.GetDashboardAsync` runs to retrieve the `.rdash` file (from disk, database, wherever you've configured).
5. **Server** — the dashboard is sent back to the client.
6. **Client** — `RevealView` renders the dashboard.

When a visualization needs data:

7. **Client** — sends a query request to the server.
8. **Server** — `IRVDataSourceProvider.ChangeDataSourceAsync` runs to mutate connection details (e.g., swap in the tenant-specific database).
9. **Server** — `IRVAuthenticationProvider.ResolveCredentialsAsync` runs to attach credentials.
10. **Server** — query executes against the data source; results return to the client.

Most of the SDK's customization surface boils down to overriding behavior in one of these provider methods.

## Dashboard editing

Dashboards can be **viewed**, **edited**, and **created** by end-users — not just embedded as static reports. The `RevealView` includes a built-in editor that supports adding visualizations, configuring filters, and reorganizing layout. Whether your end-users see the editor (and what they can do in it) is controlled by properties on the `RevealView`. See [Common Patterns](scenarios/index.md) for typical configurations.

## Where to go next

- Install: [Installation](install-server-sdk.md)
- See it work: [Embed a Dashboard](embedding/dashboard.md)
- Show one chart inline: [Embed a Single Visualization](embedding/single-visualization.md)
- Wire it to your data: [Connect Data](datasources.md)
