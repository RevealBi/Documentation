import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 認証

Reveal SDK を使用すると、認証プロバイダーを使用し、そのプロバイダーを Reveal SDK に登録することで、ユーザー名 / パスワードおよびベアラー トークン認証資格情報などのさまざまな認証方法をデータ ソースに提供できます。

認証プロバイダーは、認証資格情報を要求しているデータ ソースを確認し、その特定のデータ ソースの正しい認証資格情報を返すために使用されます。

**手順 1** - 認証プロバイダーを作成します。

<Tabs groupId="code">
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
const authenticationProvider = async (userContext: IRVUserContext | null, dataSource: RVDashboardDataSource) => {
    ...
}
```

  </TabItem>
</Tabs>

**手順 2** - 認証プロバイダーを Reveal SDK に登録します。

<Tabs groupId="code">
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
const revealOptions: RevealOptions = {
	authenticationProvider: authenticationProvider
};

app.use('/', reveal(revealOptions));
```

  </TabItem>
</Tabs>

## ユーザー名/パスワード認証

データ ソースがユーザー名とパスワードの使用を要求する場合、`RVUsernamePasswordDataSourceCredential` クラスのインスタンスを返す必要があります。`RVUsernamePasswordDataSourceCredential` クラスは、**ユーザー名**、**パスワード**、およびオプションで**ドメイン**を定義するコンストラクターのオーバーロードを提供します。

<Tabs groupId="code">
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

<Tabs groupId="code">
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
- Sybase
- ウェブ リソース

## ベアラー トークン認証

データ ソースがセキュリティ トークンの使用を要求する場合、`RVBearerTokenDataSourceCredential` クラスのインスタンスを返す必要があります。`RVBearerTokenDataSourceCredential` クラスは、**トークン**と**ユーザー ID** を定義するコンストラクターのオーバーロードを提供します。

<Tabs groupId="code">
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
- Dropbox
- Google アナリティクス
- Google Drive
- OData サービス
- OneDrive
- REST サービス
- SharePoint オンライン
- ウェブ リソース

## Amazon Web Services

データ ソースが Amazon Web Services (AWS) を使用している場合は、`RVAmazonWebServicesCredentials` クラスのインスタンスを返す必要があります。`RVAmazonWebServicesCredentials` クラスは、**key** と **secret** を定義するためのコンストラクターのオーバーロードを提供します。

<Tabs groupId="code">
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