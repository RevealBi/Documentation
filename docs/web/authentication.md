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
- OData Services
- Oracle
- PostgreSQL
- REST Services
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
- Dropbox
- Google Analytics
- Google Big Query
- Google Drive
- OData Services
- OneDrive
- REST Services
- SharePoint Online
- Web Resources

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