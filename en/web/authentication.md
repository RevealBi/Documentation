# Authentication

The Reveal SDK allows you to provide various methods of authentication such as Username/Password and Bearer Token authentication credentials to your data sources by using an authentication provider and registering that provider with the Reveal SDK.

The authentication provider is used to check which data source is requesting authentication credentials, and then return the correct authentication credentials for that specific data source.

**Step 1** - Create the authentication provider.

# [ASP.NET](#tab/aspnet)

```cs
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        ...
    }
}
```

# [Java](#tab/java)

```java
public class AuthenticationProvider implements IRVAuthenticationProvider {
	@Override
	public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        ...	
	}
}
```

# [Node.js](#tab/node)

```javascript
const authenticationProvider = async (userContext: IRVUserContext, dataSource: RVDashboardDataSource) => {
    ...
}
```

***

**Step 2** - Register the authentication provider with the Reveal SDK.

# [ASP.NET](#tab/aspnet)

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddAuthenticationProvider<AuthenticationProvider>();
});
```

# [Java](#tab/java)

```java
RevealEngineInitializer.initialize(new InitializeParameterBuilder().
    setAuthProvider(new AuthenticationProvider()).
    build());
```

# [Node.js](#tab/node)

```javascript
const revealOptions: RevealOptions {
	authenticationProvider: authenticationProvider
};

app.use('/', reveal(revealOptions));
```

***

## Username/Password Authentication

If your data source requires the use of a username and password, then you must return an instance of the `RVUsernamePasswordDataSourceCredential` class. The `RVUsernamePasswordDataSourceCredential` class provides constructor overloads to define the **username**, the **password**, and optionally the **domain**.

# [ASP.NET](#tab/aspnet)

```cs
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVPostgresDataSource)
        {
            userCredential = new RVUsernamePasswordDataSourceCredential("username", "password");
        }
        else if (dataSource is RVSqlServerDataSource)
        {
            userCredential = new RVUsernamePasswordDataSourceCredential("username", "password", "domain");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

# [Java](#tab/java)

```java
public class AuthenticationProvider implements IRVAuthenticationProvider {
	@Override
	public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
		if (dataSource instanceof RVPostgresDataSource) {
			return new RVUsernamePasswordDataSourceCredential("username", "password");
		} 
        else if (dataSource instanceof RVSqlServerDataSource) {
			return new RVUsernamePasswordDataSourceCredential("username", "password", "domain");
		} 
		return null;
	}
}
```

# [Node.js](#tab/node)

```javascript
const authenticationProvider = async (userContext:IRVUserContext, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVPostgresDataSource) {
		return new RVUsernamePasswordDataSourceCredential("username", "password");
	} else if (dataSource instanceof RVSqlServerDataSource) {
		return new RVUsernamePasswordDataSourceCredential("username", "password", "domain");
	}
	return null;
}
```

***

If your data source is using an anonymous login, without authentication, you can use the `RVUsernamePasswordDataSourceCredential` with its empty constructor.

# [ASP.NET](#tab/aspnet)

```cs
if (dataSource is RVSqlServerDataSource)
{
    userCredential = new RVUsernamePasswordDataSourceCredential();
}
```

# [Java](#tab/java)

```java
if (dataSource instanceof RVSqlServerDataSource) {
    return new RVUsernamePasswordDataSourceCredential();
}
```

# [Node.js](#tab/node)

```javascript
if (dataSource instanceof RVSqlServerDataSource) {
	return new RVUsernamePasswordDataSourceCredential();
}
```

***

The `RVUsernamePasswordDataSourceCredential` is supported for the following data sources:
- Amazon Redshift
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

If your data source requires the use of security tokens, then you must return an instance of the `RVBearerTokenDataSourceCredential` class. The `RVBearerTokenDataSourceCredential` class provides constructor overloads to define the **token**, and the **user id**.

# [ASP.NET](#tab/aspnet)

```cs
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVGoogleDriveDataSource)
        {
            userCredential = new RVBearerTokenDataSourceCredential("token", "userid");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

# [Java](#tab/java)

```java
public class AuthenticationProvider implements IRVAuthenticationProvider {
	@Override
	public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVGoogleDriveDataSource) {
            return new RVBearerTokenDataSourceCredential("token", "userid");
        }
		return null;
	}
}
```

# [Node.js](#tab/node)

```javascript
const authenticationProvider = async (userContext:IRVUserContext, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVGoogleDriveDataSource) {
        return new RVBearerTokenDataSourceCredential("token", "userid");
    }
	return null;
}
```

***

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

## Amazon Web Services

If your data source uses Amazon Web Services (AWS), then you must return an instance of the `RVAmazonWebServicesCredentials` class. The `RVAmazonWebServicesCredentials` class provides constructor overloads to define the **key**, and the **secret**.

# [ASP.NET](#tab/aspnet)

```cs
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVS3DataSource)
        {
            userCredential = new RVAmazonWebServicesCredentials("key", "secret");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

# [Java](#tab/java)

```java
public class AuthenticationProvider implements IRVAuthenticationProvider {
	@Override
	public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVS3DataSource) {
            return new RVAmazonWebServicesCredentials("key", "secret");
        }
		return null;
	}
}
```

# [Node.js](#tab/node)

```javascript
const authenticationProvider = async (userContext:IRVUserContext, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVS3DataSource) {
        return new RVAmazonWebServicesCredentials("key", "secret");
    }
	return null;
}
```
***

The `RVAmazonWebServicesCredentials` is supported for the following data sources:
- Amazon Athena
- Amazon S3