# Reveal Overview

Reveal is a business intelligence solution that is purpose-built for embedded analytics. With Reveal, you can:

- Deliver full-featured self-service dashboards and modern reporting.

- Use in any JavaScript framework (like React, Angular, Vue JS, Web Components or Blazor), Windows Forms or WPF application.
- Customize the UX to match your brand experience.
- Connect to almost any data source to populate your dashboards.
- Deploy to any cloud – public or private – or your own on-prem servers, in a Java, ASP.NET or Node.js backend.

## Reveal Architecture

Reveal has 2 core components that enable the delivery of dashboards to your client application.

- **Reveal Client SDK**: a set of JavaScript libraries and CSS files that need to be integrated into your web application. The Reveal Client SDK is shipped as a Web Component, which can be used in any client app (Angular, React, Blazor, Vue, etc.).
- **Reveal Server SDK**: a server-side component that you integrate into your server application. This currently ships in ASP.NET (.NET 4.6.2+), Java and Node.js.

This diagram describes the SDK components.  

![reveal-high-level-architecture](images/overview-high-level-architecture.png)

The Reveal client has a baseUrl property which is the endpoint of your server that the client will send/receive the requests and responses from.

The client app creates a RevealView object, which is used to render a dashboard in your application. It also allows the editing of existing dashboards or the creation of new dashboards from scratch. The RevealView has [properties and events](https://help.revealbi.io/api/javascript/latest/classes/revealview.html) that are at the heart of the dashboard experience for your users. You can set properties that hide and show menus, enable or disable tooltips on charts, add or remove dashboard filters and more. 

The RevealView object does not handle the storage of dashboards or credentials. The binary contents (.rdash file, which is a ZIP file format) that contains the definition of the dashboard is  provided by the server app in an http request. The server app is where you use the default Save / Load experience in the Reveal SDK, or you override how dashboards are loaded and saved.

## Data Sources Support in Reveal

The Reveal SDK supports over 30 data sources, including analytics tools, content managers, cloud services, CRMs, databases, spreadsheets, and public data sources. Data sources define where the data comes from in a dashboard, with each data source having unique properties, like connection strings, user id, password, and more that you set in code to connect to and retrieve data.

The Reveal SDK has two concepts regarding data sources.

- A data source - this is the primary source of the data. For example, SQL Server could be a data source
  A data source item - this is the specific item that is available from a data source. For example; a specific Table from SQL Server.
- You can review the list of supported data sources in this [help topic](https://help.revealbi.io/en/web/datasources.html).


## Credentials & Security

Reveal does not store your data, and it does not store credentials. When requesting data from databases or other data sources requiring authentication, your application code handles credential management by loading them from configuration files or storing them in a secure storage. Reveal delegates the storage and handling of these credentials to you.

For example, to set credentials to access data from a SQL Server database, you would use code similar to this to set connection details. Where those details are stored, and how they are retrieved, is up to your server code.

```typescript
revealView.onDataSourcesRequested = (callback) => {
   var sqlDataSource = new $.ig.RVSqlServerDataSource();
   sqlDataSource.host = "your-db-host";
   sqlDataSource.database = "your-db-name";
   sqlDataSource.port = 1234;
   sqlDataSource.title = "My SQL Server";
   callback(new $.ig.RevealDataSources(\[sqlDataSource\], \[\], true));
};
```

To see the full code to set SQL Server data connections, review this [help topic](https://help.revealbi.io/en/web/replacing-data-sources/ms-sql-server.html).

## Deployment

There is no deployment restriction in applications that include the Reveal SDK. As the Reveal SDK server-side component is a set of libraries (supporting both .NET Framework, Java and Node.js on either Windows, Mac OS and Linux) that you embed into your existing application or a new application. As the Reveal server-side component is integrated into the context of your own application, deployment can be a cloud provider like AWS, Microsoft Azure, or Google Cloud, or to your own on-premises servers.

Reveal SDK can also be deployed into multi-tenant applications where multiple instances of the SDK component might be running at the same time, each of them configured with its own resources such as cache storage, credentials management, and dashboard processing.
