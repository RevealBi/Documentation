import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Authentication

The Reveal SDK allows you to provide various methods of authentication such as Username/Password and Bearer Token authentication credentials to your data sources by using an authentication provider and registering that provider with the Reveal SDK.

The authentication provider is used to check which data source is requesting authentication credentials, and then return the correct authentication credentials for that specific data source.

**Step 1** - Create the authentication provider.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        ...
    }
}
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
public class AuthenticationProvider implements IRVAuthenticationProvider {
	@Override
	public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        ...	
	}
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const authenticationProvider = async (userContext, dataSource) => {
    ...
}
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    ...
}
```

  </TabItem>
</Tabs>

**Step 2** - Register the authentication provider with the Reveal SDK.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder.AddAuthenticationProvider<AuthenticationProvider>();
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
RevealEngineInitializer.initialize(new InitializeParameterBuilder().
    setAuthProvider(new AuthenticationProvider()).
    build());
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const revealOptions = {
	authenticationProvider: authenticationProvider
};

app.use('/', reveal(revealOptions));
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const revealOptions: RevealOptions = {
	authenticationProvider: authenticationProvider
};

app.use('/', reveal(revealOptions));
```

  </TabItem>
</Tabs>

## Username/Password Authentication

If your data source requires the use of a username and password, then you must return an instance of the `RVUsernamePasswordDataSourceCredential` class. The `RVUsernamePasswordDataSourceCredential` class provides constructor overloads to define the **username**, the **password**, and optionally the **domain**.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

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

  </TabItem>

  <TabItem value="java" label="Java">

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

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const authenticationProvider = async (userContext, dataSource) => {
	if (dataSource instanceof reveal.RVPostgresDataSource) {
		return new reveal.RVUsernamePasswordDataSourceCredential("username", "password");
	} else if (dataSource instanceof reveal.RVSqlServerDataSource) {
		return new reveal.RVUsernamePasswordDataSourceCredential("username", "password", "domain");
	}
	return null;
}
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const authenticationProvider = async (userContext:IRVUserContext | null, dataSource: RVDashboardDataSource) => {
	if (dataSource instanceof RVPostgresDataSource) {
		return new RVUsernamePasswordDataSourceCredential("username", "password");
	} else if (dataSource instanceof RVSqlServerDataSource) {
		return new RVUsernamePasswordDataSourceCredential("username", "password", "domain");
	}
	return null;
}
```

  </TabItem>
</Tabs>

If your data source is using an anonymous login, without authentication, you can use the `RVUsernamePasswordDataSourceCredential` with its empty constructor.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
if (dataSource is RVSqlServerDataSource)
{
    userCredential = new RVUsernamePasswordDataSourceCredential();
}
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
if (dataSource instanceof RVSqlServerDataSource) {
    return new RVUsernamePasswordDataSourceCredential();
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
if (dataSource instanceof reveal.RVSqlServerDataSource) {
    return new reveal.RVUsernamePasswordDataSourceCredential();
}
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
if (dataSource instanceof RVSqlServerDataSource) {
    return new RVUsernamePasswordDataSourceCredential();
}
```

  </TabItem>
</Tabs>

The `RVUsernamePasswordDataSourceCredential` is supported for the following data sources:
- Amazon Redshift
- Microsoft Analysis Services Server
- Microsoft Dynamics CRM (On-Premises and Online)
- Microsoft SQL Server
- MySQL
- MariaDB
- OData Services
- Oracle
- PostgreSQL
- REST Services
- Snowflake
- Sybase
- Web Resources

## Bearer Token Authentication

If your data source requires the use of security tokens, then you must return an instance of the `RVBearerTokenDataSourceCredential` class. The `RVBearerTokenDataSourceCredential` class provides constructor overloads to define the **token**, and the **user id**.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

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

  </TabItem>

  <TabItem value="java" label="Java">

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

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVGoogleDriveDataSource) {
        return new reveal.RVBearerTokenDataSourceCredential("token", "userid");
    }
    return null;
}
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const authenticationProvider = async (userContext:IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVGoogleDriveDataSource) {
        return new RVBearerTokenDataSourceCredential("token", "userid");
    }
    return null;
}
```

  </TabItem>
</Tabs>

The `RVBearerTokenDataSourceCredential` is supported for the following data sources:
- Box
- Databricks
- Dropbox
- Google Analytics
- Google Big Query
- Google Drive
- Microsoft SQL Server
- OData Services
- OneDrive
- REST Services
- SharePoint Online
- Snowflake
- Web Resources

## Microsoft Entra ID Authentication

Microsoft Entra ID (formerly Azure Active Directory) can be used to obtain bearer tokens for data sources that support Entra ID authentication, such as Microsoft SQL Server. The acquired token is passed to the Reveal SDK using the `RVBearerTokenDataSourceCredential`.

:::info

This example uses the [Microsoft Authentication Library (MSAL)](https://learn.microsoft.com/en-us/entra/msal/overview) for .NET. You must register an application in [Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) and grant it the appropriate database permissions before using this approach.

:::

**Step 1** - Install the `Microsoft.Identity.Client` NuGet package.

```bash
dotnet add package Microsoft.Identity.Client
```

**Step 2** - Create the authentication provider that acquires a token from Entra ID and returns it as a `RVBearerTokenDataSourceCredential`.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class AuthenticationProvider : IRVAuthenticationProvider
{
    public async Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext,
        RVDashboardDataSource dataSource)
    {
        if (dataSource is RVSqlServerDataSource)
        {
            var token = await GetEntraTokenAsync("https://database.windows.net/.default");
            return new RVBearerTokenDataSourceCredential(token, "myaccount@mydomain.com");
        }

        return new RVUsernamePasswordDataSourceCredential();
    }

    private static readonly string ClientId = "your-client-id";
    private static readonly string ClientSecret = "your-client-secret";
    private static readonly string TenantId = "your-tenant-id";

    private static async Task<string> GetEntraTokenAsync(string scope)
    {
        var app = ConfidentialClientApplicationBuilder
            .Create(ClientId)
            .WithClientSecret(ClientSecret)
            .WithAuthority(AzureCloudInstance.AzurePublic, TenantId)
            .Build();

        var result = await app
            .AcquireTokenForClient(new[] { scope })
            .ExecuteAsync();

        return result.AccessToken;
    }
}
```

  </TabItem>
</Tabs>

:::note

Replace `your-client-id`, `your-client-secret`, and `your-tenant-id` with the values from your Entra ID app registration. The `scope` value `https://database.windows.net/.default` is specific to Azure SQL Server. Other data sources may require a different scope.

:::

Microsoft Entra ID authentication is supported for the following data sources:
- Microsoft SQL Server
- [Snowflake](https://docs.snowflake.com/en/user-guide/oauth-azure)

## Key-Pair Authentication

If your data source requires key-pair authentication, then you must return an instance of the `RVKeyPairDataSourceCredential` class. The `RVKeyPairDataSourceCredential` class provides constructor overloads to define the **user** and the **unencrypted RSA private key**.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
public class AuthenticationProvider: IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        IRVDataSourceCredential userCredential = null;
        if (dataSource is RVSnowflakeDataSource)
        {
            userCredential = new RVKeyPairDataSourceCredential("user", "unencrypted rsa-key");
        }
        return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
public class AuthenticationProvider implements IRVAuthenticationProvider {
    @Override
    public IRVDataSourceCredential resolveCredentials(IRVUserContext userContext, RVDashboardDataSource dataSource) {
        if (dataSource instanceof RVSnowflakeDataSource) {
            return new RVKeyPairDataSourceCredential("user", "unencrypted rsa-key");
        }
        return null;
    }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVSnowflakeDataSource) {
        return new reveal.RVKeyPairDataSourceCredential("user", "unencrypted rsa-key");
    }
    return null;
}
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const authenticationProvider = async (userContext:IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVSnowflakeDataSource) {
        return new RVKeyPairDataSourceCredential("user", "unencrypted rsa-key");
    }
    return null;
}
```

  </TabItem>
</Tabs>

The `RVKeyPairDataSourceCredential` is supported for the following data sources:
- Snowflake

## Amazon Web Services

If your data source uses Amazon Web Services (AWS), then you must return an instance of the `RVAmazonWebServicesCredentials` class. The `RVAmazonWebServicesCredentials` class provides constructor overloads to define the **key**, and the **secret**.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

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

  </TabItem>

  <TabItem value="java" label="Java">

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

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVS3DataSource) {
        return new reveal.RVAmazonWebServicesCredentials("key", "secret");
    }
    return null;
}
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const authenticationProvider = async (userContext:IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    if (dataSource instanceof RVS3DataSource) {
        return new RVAmazonWebServicesCredentials("key", "secret");
    }
    return null;
}
```

  </TabItem>
</Tabs>

The `RVAmazonWebServicesCredentials` is supported for the following data sources:
- Amazon Athena
- Amazon S3