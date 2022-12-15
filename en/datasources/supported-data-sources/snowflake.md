# Snowflake

## Connecting with Snowflake

To configure a Snowflake data source, you first need to connect to the server by entering the following information:

<img src="images/add-snowflake-server.png" alt="Configure Snowflake Server details" class="responsive-img" width="55%"/>

1.  **Account**: Your snowflake account without the region or cloud provider information. For example, it should be similar to \<account_name\> instead of _\<account_name\>.us-east-1.snowflakecomputing.com_.

2.  **Host**: Although not required, if no value is specified _\<account_name\>.snowflakecomputing.com_ will be assumed. If you are not in the US West region or want to use a global url, you need to specify a HOST with the format:  _\<account_name\>.\<region_id\>.snowflakecomputing.com_.

3.  **Credentials**: after selecting *Credentials*, you will be able to
    enter the credentials for your *Snowflake* server or select existing
    ones if applicable.

     <img src="images/add-snowflake-credentials.png" alt="A dialog where you can add your credentials" class="responsive-img" width="50%"/>

    - **Username**: the user account for the *Snowflake* server or the name of the domain.

    - **Password**: the password to access the *Snowflake* server.

    - **Alias**: the name for your data source account. It will be
        displayed in the list of accounts in the previous dialog.

## Configuring a Snowflake Data Source

1.  **Select a database** by marking the empty circle next to it:

  <img src="images/snowflake-database-dialog.png" alt="Select a database dialog" class="responsive-img" width="55%"/>

2.  **Select a table** from the database. Use the icon on the right, next to the empty circles, to preview the data.

  <img src="images/snowflake-data-source-details.png.png" alt="Select a table dialog" class="responsive-img" width="55%"/>

You are now directed to the *Visualization editor* where you can start building your visualizations with the data retrieved from Snowflake.
