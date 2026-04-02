import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 認証

Reveal SDK を使用すると、認証プロバイダーを使用し、そのプロバイダーを Reveal SDK に登録することで、ユーザー名 / パスワードおよびベアラー トークン認証資格情報などのさまざまな認証方法をデータ ソースに提供できます。

認証プロバイダーは、認証資格情報を要求しているデータ ソースを確認し、その特定のデータ ソースの正しい認証資格情報を返すために使用されます。

**手順 1** - 認証プロバイダーを作成します。

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

**手順 2** - 認証プロバイダーを Reveal SDK に登録します。

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

```js
const revealOptions: RevealOptions = {
	authenticationProvider: authenticationProvider
};

app.use('/', reveal(revealOptions));
```

  </TabItem>
</Tabs>

## ユーザー名/パスワード認証

データ ソースがユーザー名とパスワードの使用を要求する場合、`RVUsernamePasswordDataSourceCredential` クラスのインスタンスを返す必要があります。`RVUsernamePasswordDataSourceCredential` クラスは、**ユーザー名**、**パスワード**、およびオプションで**ドメイン**を定義するコンストラクターのオーバーロードを提供します。

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

データ ソースが認証なしで匿名ログインを使用している場合、空のコンストラクターで `RVUsernamePasswordDataSourceCredential` を使用できます。

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

`RVUsernamePasswordDataSourceCredential` は、以下のデータ ソースでサポートされます。
- Amazon Redshift
- Microsoft Analysis Services サーバー
- Microsoft Dynamics CRM (オンプレミスおよびオンライン)
- Microsoft SQL Server
- MySQL
- OData サービス
- Oracle
- PostgreSQL
- REST サービス
- Snowflake
- Sybase
- ウェブ リソース

## ベアラー トークン認証

データ ソースがセキュリティ トークンの使用を要求する場合、`RVBearerTokenDataSourceCredential` クラスのインスタンスを返す必要があります。`RVBearerTokenDataSourceCredential` クラスは、**トークン**と**ユーザー ID** を定義するコンストラクターのオーバーロードを提供します。

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

`RVBearerTokenDataSourceCredential` は、以下のデータ ソースでサポートされます。
- Box
- Databricks
- Dropbox
- Google アナリティクス
- Google Big Query
- Google Drive
- Microsoft SQL Server
- OData サービス
- OneDrive
- REST サービス
- SharePoint オンライン
- Snowflake
- ウェブ リソース

## Microsoft Entra ID 認証

Microsoft Entra ID (旧 Azure Active Directory) を使用して、Entra ID 認証をサポートするデータ ソース (Microsoft SQL Server など) のベアラー トークンを取得できます。取得したトークンは、`RVBearerTokenDataSourceCredential` を使用して Reveal SDK に渡されます。

:::info

この例では、.NET 用の [Microsoft Authentication Library (MSAL)](https://learn.microsoft.com/ja-jp/entra/msal/overview) を使用しています。この方法を使用する前に、[Microsoft Entra ID](https://learn.microsoft.com/ja-jp/entra/identity-platform/quickstart-register-app) でアプリケーションを登録し、適切なデータベース権限を付与する必要があります。

:::

**手順 1** - `Microsoft.Identity.Client` NuGet パッケージをインストールします。

```bash
dotnet add package Microsoft.Identity.Client
```

**手順 2** - Entra ID からトークンを取得し、`RVBearerTokenDataSourceCredential` として返す認証プロバイダーを作成します。

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

`your-client-id`、`your-client-secret`、`your-tenant-id` を Entra ID アプリ登録の値に置き換えてください。スコープ値 `https://database.windows.net/.default` は Azure SQL Server に固有です。他のデータ ソースでは異なるスコープが必要になる場合があります。

:::

Microsoft Entra ID 認証は、以下のデータ ソースでサポートされます。
- Microsoft SQL Server

## キーペア認証

データ ソースがキーペア認証を必要とする場合、`RVKeyPairDataSourceCredential` クラスのインスタンスを返す必要があります。`RVKeyPairDataSourceCredential` クラスは、**ユーザー**と**暗号化されていない RSA 秘密キー**を定義するコンストラクターのオーバーロードを提供します。

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

`RVKeyPairDataSourceCredential` は、以下のデータ ソースでサポートされます。
- Snowflake

## Amazon Web Services

データ ソースが Amazon Web Services (AWS) を使用している場合は、`RVAmazonWebServicesCredentials` クラスのインスタンスを返す必要があります。`RVAmazonWebServicesCredentials` クラスは、**key** と **secret** を定義するためのコンストラクターのオーバーロードを提供します。

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

`RVAmazonWebServicesCredentials` は、次のデータ ソースでサポートされています。
- Amazon Athena
- Amazon S3