---
title: How to configure Microsoft SQL Server in Slingshot
_description: Steps to configuring Microsoft SQL Server and using it to your advantage.
---

# Microsoft SQL Server

>[!NOTE] **Limitations in Web**. In the *Reveal Web* app, you can connect only to publicly accessible Microsoft SQL addresses. If your MS SQL address is restricted for the general public (private or hosted in the company's intranet, for example), you can use *Reveal Desktop*, *iOS* or *Android* to connect to it. The device where you're running Reveal needs to have access to the SQL Server address. This limitation does not apply to *Reveal Embedded*.

## Connecting to MS SQL Server 

To configure a Microsoft SQL Server data source, you can set the following information:

<img src="images/enter-microsoft-sql-credentials.png" alt="Enter SQL Server Details" class="responsive-img" width="50%"/>

1.  [**Server**](#how-to-find-server): the computer name or IP address
    assigned to the computer on which the server is running.

2.  **Port**: if applicable, the server port details. If no information
    is entered, Reveal will connect to the port in the hint text (1433)
    by default.

3.  **Credentials**: after selecting *Credentials*, you will be able to enter the credentials for your Microsoft SQL Server or choose existing ones if applicable.

      - **Username**: the user account for the SQL Server or the name of the domain.

      - **Password**: the password to access the SQL Server.

      - **Alias**: Your data source name will be displayed in the list of accounts in the previous dialog. By default, Analytics names it Microsoft SQL Server. You can change it to your preference.

    Once ready, select **Add** and then **Add Server**.

<a name='how-to-find-server'></a>
## How to find your Server Information

You can find your server by following the steps below. Please note that
the commands should be executed on the server.

| WINDOWS                                                                                                         | LINUX                                                                                                         | MAC                                                                  |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1\. Open the File Explorer.                                                                                     | 1\. Open a Terminal.                                                                                          | 1\. Open System Preferences.                                         |
| 2\. Right Click on My Computer \> Properties.                                                                   | 2\. Type in **$hostname**                                                                                     | 2\. Navigate to the Sharing Section.                                 |
| Your Hostname will appear as "Computer Name" under the *Computer name, domain and workgroups settings* section. | Your Hostname will appear along with your DNS domain name. Make sure you only include the **Hostname** in Reveal. | Your Hostname will be listed under the "Computer Name" field on top. |

You can find your *IP address* by following the steps below. Please note
that the commands should be executed on the server.

| WINDOWS                              | LINUX                             | MAC                                                           |
| ------------------------------------ | --------------------------------- | ------------------------------------------------------------- |
| 1\. Open a Command Prompt.           | 1\. Open a Terminal.              | 1\. Launch your Network app.                                  |
| 2\. Type in **ipconfig**             | 2\. Type in **$ /bin/ifconfig**   | 2\. Select your connection.                                   |
| **IPv4 Address** is your IP address. | **Inet addr** is your IP address. | The **IP Address** field will have the necessary information. |

<a name='working-with-views'></a>
## Setting Up Your Data

### Working with Views

With Reveal, you can retrieve SQL Server data from entire tables, but
you can also select a particular
[view](https://docs.microsoft.com/en-us/sql/relational-databases/views/views?view=sql-server-2017)
that returns a subset of data from a table or a set of tables instead.

<img src="images/microsoft-sql-views.png" alt="SQLServerViews\_All" class="responsive-img" width="60%"/>

In the sample below, the **Invoices** view contains
part of the data in the **Alphabetical list of products** table in the SQL Server.

<img src="images/sample-microsoft-sql.png" alt="AlphabeticalListProductsSQLServer\_All" class="responsive-img" width="85%"/>

For more information on views and MS SQL Server, visit [this documentation website](https://docs.microsoft.com/en-us/sql/relational-databases/views/views?view=sql-server-2017).

### Working with Stored Procedures

In MS SQL, stored procedures allow users to run a set of query
statements in a relational database with specific parameters. The
following are just a set of sample stored procedures running in a test
server with
[Northwind](https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/sql/linq/downloading-sample-databases)
data:

<img src="images/stored-procedures-microsoft-sql.png" alt="SQLStoredProcedures\_All" class="responsive-img" width="55%"/>

This stored procedure, for example, returns the products in the
**Products** table ordered by their **Unit Price**. The **ProductName**
has been renamed to **TenMostExpensiveProducts**.

<img src="images/stored-procedures-sample-result.png" alt="StoredProcedureSampleResults\_All" class="responsive-img" width="85%"/>

In this case, the stored procedure requires users to configure the start and end date to display the **Sales by Year** information.

<img src="images/stored-procedures-parameters-sample.png" alt="StoredProcedureSampleDates\_All" class="responsive-img" width="65%"/>

For more information on Stored Procedures and MS SQL Server, visit [this documentation website](https://docs.microsoft.com/en-us/sql/relational-databases/stored-procedures/stored-procedures-database-engine?view=sql-server-2017).

### Limitations for Stored Procedures in Reveal


  - For stored procedures that return more than one result set, Reveal
    displays only the first one.

  - [Output parameters](https://docs.microsoft.com/en-us/sql/connect/jdbc/using-a-stored-procedure-with-output-parameters?view=sql-server-2017)
    in stored procedures are ignored.

  - Stored procedures that return no result sets will be listed in the Data Sources list but will fail.
