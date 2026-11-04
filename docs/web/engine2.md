---
title: Engine2
description: Learn which data sources and operations Engine2, Reveal's server-side data engine, supports, and when a request runs on the legacy engine instead.
---

# Engine2

Engine2 is Reveal's server-side data engine. It's enabled by default in the ASP.NET, Java and Node.js server SDKs, and it processes the data for visualizations and dashboard filters. When a request can't run on Engine2, Reveal runs it on the legacy engine instead, and the visualization shows its data as before.

Some features work only on Engine2, and fail on requests that run on the legacy engine:

- [Time zone conversion](time-zones.md): visualizations with DateTime fields show the error "Converting to the current time zone requires Engine2…".

## When a Request Runs on the Legacy Engine

A request runs on the legacy engine when:

- **Its data source isn't supported.** See [Supported Data Sources](#supported-data-sources).
- **It blends an unsupported data source**, even when its main data source is supported.
- **Its data is transposed.** Transposing the data in the data source preview swaps its rows and columns, and transposed data always runs on the legacy engine.
- **Engine2 is disabled** with `Engine2Enabled` in ASP.NET, `setEngine2Enabled` in Java or the `engine2Enabled` option in Node.js. Every request then runs on the legacy engine. When you disable it on the server, also disable it on the client with `RevealSdkSettings.betaFeatures.disable("engine2Enabled")`.

## Supported Data Sources

Engine2 supports:

- Amazon Athena, Amazon Redshift, Azure SQL, Azure Synapse, ClickHouse, Cosmos DB, Databricks, DuckDB, Elasticsearch, Google BigQuery, MariaDB, MongoDB, MS SQL Server, MySQL, Oracle, PostgreSQL, Snowflake and SQLite
- CSV, Excel and JSON data, including files read from REST, Amazon S3, SharePoint, OneDrive, Google Drive, Dropbox, Box or local storage
- Google Sheets and in-memory data

Other data sources, such as Cube, OData, Salesforce, Dynamics 365, HubSpot, Marketo, QuickBooks, Google Analytics 4, Microsoft Analysis Services, Reporting Services and Sybase, run on the legacy engine.
