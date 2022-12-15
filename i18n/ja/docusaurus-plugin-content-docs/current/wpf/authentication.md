# 認証

Reveal SDK では、ユーザー名またはパスワードとベアラー トークンの両方の認証資格情報をデータ ソースに提供できます。

**手順 1** - 認証情報をデータ ソースに提供するには、最初に `IRVAuthenticationProvider` インターフェイスを実装するクラスを作成し、`ResolveCredentialsAsync` メソッドを実装する必要があります。

```cs
public class AuthenticationProvider : IRVAuthenticationProvider
{
    public Task<IRVDataSourceCredential> ResolveCredentialsAsync(RVDashboardDataSource dataSource)
    {
        ...
    }
}
```

**手順 2** - ResolveCredentialsAsync メソッドは、`RVDashboardDataSource` をパラメーターとして提供します。これにより、資格情報を要求しているデータ ソースを特定できます。この例では、`RVSqlServerDataSource` オブジェクトを使用して、`RVDashboardDataSource` が SQL Server データ ソースかどうかを確認しています。

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

**手順 3** - 最後に、`RevealSdkSettings.AuthenticationProvider` プロパティを認証プロバイダーのインスタンスに設定する必要があります。

```cs
RevealSdkSettings.AuthenticationProvider = new AuthenticationProvider();
```

## ユーザー名/パスワード認証

データ ソースがユーザー名とパスワードの使用を要求する場合、`RVUsernamePasswordDataSourceCredential` クラスのインスタンスを返す必要があります。`RVUsernamePasswordDataSourceCredential` クラスは、**ユーザー名**、**パスワード**、およびオプションで**ドメイン**を定義するコンストラクターのオーバーロードを提供します。

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

データ ソースが認証なしで匿名ログインを使用している場合、空のコンストラクターで `RVUsernamePasswordDataSourceCredential` を使用できます。

```cs
if (dataSource is RVRESTDataSource)
{
    userCredential = new RVUsernamePasswordDataSourceCredential();
}
```

`RVUsernamePasswordDataSourceCredential` は、以下のデータ ソースでサポートされます。
- Microsoft Analysis Services サーバー
- Microsoft Dynamics CRM (オンプレミスおよびオンライン)
- Microsoft SQL サーバー
- MySQL
- OData サービス
- Oracle
- PostgreSQL
- REST サービス
- Sybase
- ウェブ リソース

## ベアラー トークン認証

データ ソースがユーザー名とパスワードの使用を要求する場合、`RVBearerTokenDataSourceCredential` クラスのインスタンスを返す必要があります。`RVBearerTokenDataSourceCredential` クラスは、**トークン**と**ユーザー ID** を定義するコンストラクターのオーバーロードを提供します。

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