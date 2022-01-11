# Authentication

The Reveal SDK allows you to provide both Username/Password and Bearer Token authentication credentials to your data sources.

**Step 1** - To provide authentication credentials to your data source, you must first create a class that implements the `IRVAuthenticationProvider` interface and implement the `ResolveCredentialsAsync` method.

```cs
public class AuthenticationProvider : IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(RVDashboardDataSource dataSource)
    {
        ...
    }
}
```

**Step 2** - The `ResolveCredentialsAsync` method provides the `RVDashboardDataSource` as a parameter which allows you to determine which data source is requesting the credentials. In this example, we are checking if the `RVDashboardDataSource` is a SQL Server data source by using the `RVSqlServerDataSource` object.

```cs
public class AuthenticationProvider : IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVSqlServerDataSource)
        {
            userCredential = new RVUsernamePasswordDataSourceCredential("sqlserveruser", "password");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

**Step 3** - Finally, you need to set the `RevealSdkSettings.AuthenticationProvider` property to an instance of your authentication provider.

```cs
RevealSdkSettings.AuthenticationProvider = new AuthenticationProvider();
```

## Username/Password Authentication

If your data source requires the use of a username and password, then you must return an instance of the `RVUsernamePasswordDataSourceCredential` class. The `RVUsernamePasswordDataSourceCredential` class provides constructor overloads to define the **username**, the **password**, and optionally the **domain**.

```cs
public Task<IRVDataSourceCredential> ResolveCredentialsAsync(RVDashboardDataSource dataSource)
{
    IRVDataSourceCredential userCredential = null;
    if (dataSource is RVPostgresDataSource)
    {
        userCredential = new RVUsernamePasswordDataSourceCredential("postgresuser", "password");
    }
    else if (dataSource is RVSqlServerDataSource)
    {
        userCredential = new RVUsernamePasswordDataSourceCredential("sqlserveruser", "password", "domain");
    }
    return Task.FromResult<IRVDataSourceCredential>(userCredential);
}
```

If your data source is using an anonymous login, without authentication, you can use the `RVUsernamePasswordDataSourceCredential` with its empty constructor.

```cs
if (dataSource is RVRESTDataSource)
{
    userCredential = new RVUsernamePasswordDataSourceCredential();
}
```

The `RVUsernamePasswordDataSourceCredential` is supported for the following data sources:
- Microsoft Analysis Services Server
- Microsoft Dynamics CRM (On-Premises and Online)
- Microsoft SQL Server
- MySQL
- OData Services
- Oracle
- PostgreSQL
- REST Services
- Sybase
- Web Resources

## Bearer Token Authentication

If your data source requires the use of a username and password, then you must return an instance of the `RVBearerTokenDataSourceCredential` class. The `RVBearerTokenDataSourceCredential` class provides constructor overloads to define the **token**, and the **user id**.

```cs
public Task<IRVDataSourceCredential> ResolveCredentialsAsync(RVDashboardDataSource dataSource)
{
    IRVDataSourceCredential userCredential = null;
    if (dataSource is RVGoogleDriveDataSource)
    {
        userCredential = new RVBearerTokenDataSourceCredential("fhJhbUci0mJSUzi1nIiSint....", "user@company.com");
    }
    return Task.FromResult<IRVDataSourceCredential>(userCredential);
}
```

The `RVBearerTokenDataSourceCredential` is supported for the following data sources:
- Box
- Dropbox
- Google Analytics
- Google Drive
- OData Services
- OneDrive
- REST Services
- SharePoint Online
- Web Resources