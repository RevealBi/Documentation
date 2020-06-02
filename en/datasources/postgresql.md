## PostgreSQL

To configure a PostgreSQL server data source, you will need to enter the
following information:

![Configure PostgreSQL Server details](images/enter-postgreSQL-server-details.png)

1.  **Default name** of the data source: Your data source name will be displayed in the list of accounts in the previous dialog. By default, Reveal names it *PostgreSQL*. You can change it to your preference.


2.  [**Server**](#how-to-find-server): the computer name or IP address
    assigned to the computer on which the server is running.

3.  **Port**: if applicable, the server port details. If no information
    is entered, Reveal will connect to the port in the hint text (5432)
    by default.

4.  **Credentials**: after selecting *Credentials*, you will be able to
    enter the credentials for your PostgreSQL server or select existing
    ones if applicable.

      - **Name**: the name for your data source account. It will be
        displayed in the list of accounts in the previous dialog.

      - *(Optional)* **Domain**: the name of the domain, if applicable.

      - **Username**: the user account for the PostgreSQL server.

      - **Password**: the password to access the PostgreSQL server.

        Once ready, select **Create Account**. You can verify whether
        the account is reaching the data source or not by selecting
        **Test Connection**.

<a name='how-to-find-server'></a>
### How to find your Server Information

You can find your server by following the steps below. Please note that
the commands should be executed on the server.

| WINDOWS                                                                                                         | LINUX                                                                                                         | MAC                                                                  |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1\. Open the File Explorer.                                                                                     | 1\. Open a Terminal.                                                                                          | 1\. Open System Preferences.                                         |
| 2\. Right Click on My Computer \> Properties.                                                                   | 2\. Type in **$hostname**                                                                                     | 2\. Navigate to the Sharing Section.                                 |
| Your Hostname will appear as "Computer Name" under the *Computer name, domain and workgroups settings* section. | Your Hostname will appear along with your DNS domain name. Make sure you only include **Hostname** in Reveal. | Your Hostname will be listed under the "Computer Name" field on top. |

You can find your *IP address* by following the steps below. Please note
that the commands should be executed on the server.

| WINDOWS                              | LINUX                             | MAC                                                           |
| ------------------------------------ | --------------------------------- | ------------------------------------------------------------- |
| 1\. Open a Command Prompt.           | 1\. Open a Terminal.              | 1\. Launch your Network app.                                  |
| 2\. Type in **ipconfig**             | 2\. Type in **$ /bin/ifconfig**   | 2\. Select your connection.                                   |
| **IPv4 Address** is your IP address. | **Inet addr** is your IP address. | The **IP Address** field will have the necessary information. |

### Working with Views

With Reveal, you can retrieve PostgreSQL data from entire tables, but
you can also select a particular
[view](https://www.postgresql.org/docs/10/views.html) that
returns a subset of data from a table or a set of tables instead.

![PostgreSQL views dialog](images/postgre-SQL-views.png)

In the sample above, the **invoices** view contains a modified version
of the data in the **Products** table in the PostgreSQL server.

![Sample dashboard using PostgreSQL invoices view data](images/invoices-postgre-sql-view-sample.png)

For more information on views and PostgreSQL, visit [this documentation website](https://www.postgresql.org/docs/10/tutorial-views.html).
