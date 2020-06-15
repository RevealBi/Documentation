## データソースへの資格情報の提供

### 概要

Server SDK では、データソースにアクセスするときに使用される一連の資格情報を渡すことができます。

### コード

最初の手順は、以下に示すように、 **IRVAuthenticationProvider** を実装し、それを __RevealView__ の __AuthenticationProvider__ プロパティに設定します。

``` csharp
public class EmbedAuthenticationProvider : IRVAuthenticationProvider
{
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
            else if (dataSource is RVGoogleDriveDataSource)
            {
                userCredential = new RVBearerTokenDataSourceCredential("fhJhbUci0mJSUzi1nIiSint....", "user@company.com");
            }
            else if (dataSource is RVRestDataSource)
            {
                userCredential = new RVUsernamePasswordDataSourceCredential(); // Anonymous
            }
            return Task.FromResult<IRVDataSourceCredential>(userCredential);
    }
}
```

### 実装するクラスの選択

使用できるクラスは 2 つあり、どちらも __IRVDataSourceCredential__ インターフェイスを実装します。以下に詳述するように、データソースに応じてクラスを選択する必要があります。

  - クラス
    __RVBearerTokenDataSourceCredential__
    は以下と動作します。
      - アナリティクス ツール (Google アナリティクス)
      - コンテンツ マネージャーとクラウド サービス (Box、Dropbox、Google Drive、OneDrive、SharePoint Online)。

  - クラス __RVUsernamePasswordDataSourceCredential__ は以下と動作します。
      - カスタマー リレーションシップ マネージャ- (Microsoft Dynamics CRM オンプレミスおよびオンライン)
      - データベース (Microsoft SQL Server、Microsoft Analysis Services サーバー、MySQL、PostgreSQL、Oracle、Sybase)

  - **両クラス** は以下と動作します。
      - その他のデータソース (OData Feed, Web Resources, REST API)

### 認証なし

認証なしの匿名のリソースで作業する場合は、空のコンストラクタを持つ
__RVUsernamePasswordDataSourceCredential__ を使用できます。これは、そのクラスで機能するすべてのデータソースに対して実行できます。

上記のサンプルで使用するコード スニペット：

``` csharp
else if (dataSource is RVRESTDataSource)
{
     userCredential = new RVUsernamePasswordDataSourceCredential();
}
```
