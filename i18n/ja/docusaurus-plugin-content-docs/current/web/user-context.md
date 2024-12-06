import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ユーザー コンテキスト

最新の Web アプリケーションを構築する場合、Web クライアントからサーバー アプリケーションにデータを送信することが必要です。1 つのアプローチは HTTP ヘッダーを使用することです。これは、認証トークン (JWT トークンなど)、またはサーバー側コードの実行に必要なユーザー コンテキスト固有の情報を渡すときに非常に役立ちます。リクエスト ヘッダーを使用すると、機密情報を安全な方法で送信できるため、URL やリクエストの本文に機密情報を埋め込む必要がなくなります。

Reveal では、ユーザー コンテキストは、アプリケーションの認証されたユーザーの ID と、特定のユーザーのコンテキストでサーバー リクエストを実行するために必要なその他の重要な情報を含めることができるオブジェクトです。ユーザー コンテキストは、`IRVDashboardProvider`、`IRVAuthenticationProvider`、`IRVDataSourceProvider` などの Reveal SDK プロバイダーで使用して、ユーザーが持つアクセス許可を制限または定義できます。

Reveal SDK 内のユーザー コンテキストは、`IRVUserContextProvider` インターフェイスと `RVUserContext` オブジェクトによって表されます。`RVUserContext` は `IRVUserContext` のデフォルト実装であり、現在のユーザーのユーザー ID を保存する機能と、Reveal SDK の他の領域 (前述の `IRVObjectFilter`、`IRVDashboardProvider`、`IRVDataSourceProvider` など) で使用できるリクエストに関連する追加のプロパティを取得して保存する機能を提供します。

`UserContextProvider` を実装するには、次の手順に従います:

**手順 1** - ユーザー コンテキスト プロバイダーを作成します。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

  ```cs
  internal class UserContextProvider : IRVUserContextProvider
  {
      public IRVUserContext GetUserContext(HttpContext aspnetContext)       
      {
          //when using standard auth mechanisms, the userId can be obtained using aspnetContext.User.Identity.Name.
          var userIdentityName = aspnetContext.User.Identity.Name;
          var userId = (userIdentityName != null) ? userIdentityName : "guest";
          
          var props = new Dictionary<string, object>() { { "some-property", aspnetContext.Current.Request.Cookies["some-cookie-name"].Value } };

          return new RVUserContext(userId, props);
      }    
  }
  ```

  </TabItem>

  <TabItem value="java" label="Java">

  ```java
  public class UserContextProvider extends RVContainerRequestAwareUserContextProvider {
    @Override
    protected IRVUserContext getUserContext(ContainerRequestContext requestContext) {
          // this can be used to store values coming from the request.
      var props = new HashMap<String, Object>();
      props.put("some-property", "some-value");

      return new RVUserContext("user identifier", props);
    }
  }
  ```

  </TabItem>

  <TabItem value="node" label="Node.js">    

  ```js
  const userContextProvider = (request) => {
    // this can be used to store values coming from the request.
    var props = new Map();
    props.set("some-property", "some-value"); 
    
    return new reveal.RVUserContext("user identifier", props);
  };
  ```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

  ```ts
  const userContextProvider = (request:IncomingMessage) => {
    // this can be used to store values coming from the request.
    var props = new Map<string, Object>();
    props.set("some-property", "some-value"); 
    
    return new RVUserContext("user identifier", props);
  };
  ```

  </TabItem>
</Tabs>

**手順 2** - ユーザー コンテキスト プロバイダーを Reveal SDK に登録します。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

  ```cs
  builder.Services.AddControllers().AddReveal( builder =>
  {
      builder.AddUserContextProvider<UserContextProvider>();
  });
  ```

  </TabItem>

  <TabItem value="java" label="Java">

  ```java
  RevealEngineInitializer.initialize(new InitializeParameterBuilder().
      setUserContextProvider(new UserContextProvider()).
      build());
  ```

  </TabItem>

  <TabItem value="node" label="Node.js">    

  ```js
  const revealOptions = {
    userContextProvider: userContextProvider
  };
  app.use('/reveal-api/', reveal(revealOptions));
  ```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

  ```ts
  const revealOptions: RevealOptions = {
    userContextProvider: userContextProvider
  };
  app.use('/reveal-api/', reveal(revealOptions));
  ```

  </TabItem>
</Tabs>

これで、HTTP ヘッダー経由で渡されるコンテキスト固有の情報を取得して保存するようにサーバーが設定されました。サーバー実装を追加したら、クライアント側のコールバック `setAdditionalHeadersProvider` を使用します。


#### クライアント側ヘッダーの受け渡し

`UserContextProvider` に値を渡すには、`setAdditionalHeadersProvider` クライアント側コールバック関数を使用します。`setAdditionalHeadersProvider` コールバックは、Reveal サーバーにリクエストが行われる前にオプションで呼び出されるため、サーバー リクエストで追加のヘッダーを返すことができます。

`setAdditionalHeadersProvider` コールバック関数は、次のようにヘッダーを含むオブジェクト配列を返すことが期待されます: `{ 'SessionId': sessionId }`、`{ 'UserId': userId }`、またはカスタム クエリ、ストアド プロシージャー、関数を実行するためのパラメーター。サーバー上で必要な値は、`setAdditionalHeadersProvider` と `UserContextProvider` を組み合わせて使用して送信できます。

<Tabs groupId="code" queryString>
  <TabItem value="javascript" label="JavaScript" default>

```js
RevealSdkSettings.setAdditionalHeadersProvider(function (url) {
  var headers = {};
  headers["x-header-one"] = "single_value";
  headers["x-header-two"] = ["value_1", "value_2"];
  return headers;
});
```
  </TabItem>
  
  <TabItem value="typescript" label="TypeScript" default>

```ts
RevealSdkSettings.setAdditionalHeadersProvider((url: string) => {
  var headers: Record<string, any> = {};
  headers["x-header-one"] = "single_value";
  headers["x-header-two"] = ["value_1", "value_2"];
  return headers;
});
```
  </TabItem>
</Tabs>

## 例: ユーザー コンテキストの実装 

Reveal BI の `IRVUserContextProvider` インターフェイスを使用すると、クライアント側の情報をサーバーに渡すことができます。この情報は、カスタム クエリで、ストアド プロシージャーや関数のパラメーターなどとして使用できます。このドキュメントでは、`IRVUserContextProvider` の使用方法と、クライアントからサーバーにパラメーターを渡す方法について説明します。

このステップバイステップを説明するエンドツーエンドのウェビナーをこちらで視聴できます:

https://youtu.be/q9mbN2kIXFs

### クライアント側の例

以下は、クライアントからサーバーにいくつかのプロパティ値を渡す方法の例です。この場合、orderId、employeeId、customerId の値を持つ 3 つの HTML 選択があります。これらの値は、`setAdditionalHeadersProvider` コールバックでサーバーに渡されます。

```` js 
$.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url) {
    return headers;
});
````

`onDataSourcesRequested` に対してリクエストが行われると、各 HTML 選択の選択された値が `headers` 配列に設定されます。

```` js 
var selectedCustomerId = $('#customerId').val();
headers["x-header-customerId"] = selectedCustomerId;

var selectedOrderId = $('#orderId').val();
headers["x-header-orderId"] = selectedOrderId;

var selectedEmployeeId = $('#employeeId').val();
headers["x-header-employeeId"] = selectedEmployeeId;
````

これはクライアント側の完全な HTML です。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal - Parameters and Stored Procs</title>
</head>

<body>
    <select name="orders" id="orderId">
        <option value="10248">10248</option>
        <option value="10249">10249</option>
    </select>

      <select name="employee" id="employeeId">
        <option value="1">Nancy Davolio</option>
        <option value="2">Andrew Fuller</option>
      </select>

    <select name="customers" id="customerId">
        <option value="ALFKI">ALFKI</option>
        <option value="ANATR">ANATR</option>
      </select>
      
    <div id="revealView" style="height: calc(100vh - 25px); width: 100%;></div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
    <script src="https://dl.revealbi.io/reveal/libs/1.6.4/infragistics.reveal.js"></script>

    <script type="text/javascript">
        $.ig.RevealSdkSettings.setBaseUrl("https://localhost:7006/");

        $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url) {
            return headers;
        });

        const headers = {};

        var revealView = new $.ig.RevealView("#revealView");
        revealView.interactiveFilteringEnabled = true;
        revealView.startInEditMode = true;  

        revealView.onDataSourcesRequested = (callback) => {    

            var selectedCustomerId = $('#customerId').val();
            headers["x-header-customerId"] = selectedCustomerId;

            var selectedOrderId = $('#orderId').val();
            headers["x-header-orderId"] = selectedOrderId;

            var selectedEmployeeId = $('#employeeId').val();
            headers["x-header-employeeId"] = selectedEmployeeId;

            var ds = new $.ig.RVAzureSqlDataSource();
            ds.id="sqlServer";
            ds.title = "SQL Server Data Source";
            ds.subtitle = "Full Northwind Database";

            callback(new $.ig.RevealDataSources([ds], [ ], false));        
        };     
    </script>
</body>
</html>
```

### サーバー側の例

サーバー側では、これらの値がキーと値のペアのプロパティとして取得され、このトピックで前述したように他の関数で使用できるように保存されます。要求された各ヘッダーは、デフォルトの `UserId` プロパティに追加されるか、Dictionary オブジェクトのキーと値のペアとして追加されることに注意してください。

```csharp
public class UserContextProvider : IRVUserContextProvider
{
    IRVUserContext IRVUserContextProvider.GetUserContext(HttpContext aspnetContext)
    {
        var userId = aspnetContext.Request.Headers["x-header-customerId"];
        var orderId = aspnetContext.Request.Headers["x-header-orderId"];
        var employeeId = aspnetContext.Request.Headers["x-header-employeeId"];


        string role = "User";
        if (userId == "AROUT" || userId == "BLONP")
        {
            role = "Admin";
        }

        var props = new Dictionary<string, object>() {
                { "OrderId", orderId },
                { "EmployeeId", employeeId },
                { "Role", role } };

        Console.WriteLine("UserContextProvider: " + userId + " " + orderId + " " + employeeId);

        return new RVUserContext(userId, props);
    }
}
```

この例では、`UserContextProvider` クラスは `IRVUserContextProvider` インターフェイスを実装します。`GetUserContext` メソッドは、クライアントから送信されたヘッダーを取得し、ディクショナリに保存します。このディクショナリは他の関数で使用できます。

## ObjectFilterProvider でのユーザー コンテキストの使用

ユーザー コンテキストを `ObjectFilterProvider` で使用すると、`UserContext` プロパティで `role` として設定されたユーザーの role プロパティに基づいてデータをフィルターできます。

```csharp
public class ObjectFilterProvider : IRVObjectFilter
{
    public Task<bool> Filter(IRVUserContext userContext, RVDashboardDataSource dataSource)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Filter(IRVUserContext userContext, RVDataSourceItem dataSourceItem)
    {
        if (userContext?.Properties != null && dataSourceItem is RVSqlServerDataSourceItem dataSQLItem)
        {
            if (userContext.Properties.TryGetValue("Role", out var roleObj) &&
                roleObj?.ToString()?.ToLower() == "user")
            {
                var allowedItems = new HashSet<string> { "Customers", "Orders", "Order Details" };

                if ((dataSQLItem.Table != null && !allowedItems.Contains(dataSQLItem.Table)) ||
                    (dataSQLItem.Procedure != null && !allowedItems.Contains(dataSQLItem.Procedure)))
                {
                    return Task.FromResult(false);
                }
            }
        }
        return Task.FromResult(true);
    }

}
```

この例では、`Filter` メソッドはユーザーのロールが 「user」 であるかどうかを確認します。有効な場合は、特定の項目へのアクセスのみが許可されます。

## DataSourceProvider でのユーザー コンテキストの使用

ユーザー コンテキストは、`DataSourceProvider` で `ChangeDataSourceAsync` または `ChangeDataSourceItemAsync` で使用することもできます。

`ChangeDataSourceAsync` で使用すると、データ ソースまたはテナントにアクセスするユーザーのアクセス許可をチェックしたり、トークンから渡されたサーバーまたはホストのプロパティとしてアクセスしたりすることができます。

`ChangeDataSourceItemAsync` で使用される場合、UserContext プロパティは通常、カスタム クエリ、ストアド プロシージャー、または関数呼び出しのパラメーターとして使用されます。

次の例は、その方法を示しています。

```csharp
using Reveal.Sdk;
using Reveal.Sdk.Data;
using Reveal.Sdk.Data.Microsoft.SqlServer;

namespace RevealSdk.Server.Reveal

{
    internal class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync
                (IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVSqlServerDataSourceItem sqlDsi)
            {
                ChangeDataSourceAsync(userContext, sqlDsi.DataSource);


                string idPrefix = dataSourceItem.Id.Substring(0, 2).ToLower();
                string storedProcName = dataSourceItem.Id.Substring(2);

                if (idPrefix == "sp")
                {
                    switch (storedProcName)
                    {
                        case "OrdersByCustomer":
                            sqlDsi.Procedure = "OrdersByCustomer";
                            sqlDsi.ProcedureParameters = new Dictionary<string, object>
                                 {
                                     { "@CustomerID", userContext.UserId }
                                 };
                            break;

                        case "OrderDetails":
                            int orderID;
                            if (int.TryParse(userContext.Properties["OrderId"].ToString(), out orderID))
                            {
                                sqlDsi.Procedure = "OrderDetails";
                                sqlDsi.ProcedureParameters = new Dictionary<string, object>
                                     {
                                         { "@OrderID", orderID }
                                     };
                            }
                            break;

                        case "OrdersByEmployee":
                            int employeeID;
                            if (int.TryParse(userContext.Properties["EmployeeId"].ToString(), out employeeID))
                            {
                                sqlDsi.Procedure = "OrdersByEmployee";
                                sqlDsi.ProcedureParameters = new Dictionary<string, object>
                                     {
                                         { "@EmployeeID", employeeID }
                                     };
                            }
                            break;

                        default:
                            // Handle unknown stored procedure
                            break;
                    }

                }
                else if (idPrefix == "cq")
                {
                    int employeeID;
                    if (int.TryParse(userContext.Properties["EmployeeId"].ToString(), out employeeID))
                    {
                        sqlDsi.CustomQuery = "Select * from OrderAnalysis where EmployeeID = " + employeeID;
                    }                    
                }
                else if (idPrefix == "tb")
                {
                    // Handle Tables or Views
                }
                else
                {
                    return null;
                }



            }
            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            if (dataSource is RVAzureSqlDataSource sqlDs)
            {
                sqlDs.Host = "server";
                sqlDs.Database = "database";
            }
            return Task.FromResult(dataSource);
        }
    }
}
```

この例では、`ChangeDataSourceItemAsync` メソッドは、ユーザーのプロパティに基づいてデータ ソース項目を変更します。ユーザーのプロパティを使用して、ストアド プロシージャーとカスタム クエリのパラメーターを設定します。

## セキュリティに関する考慮事項

クライアントからサーバーにパラメーターを渡すときは、セキュリティを考慮することが重要です。

- 入力を検証してサニタイズします。入力が有効で安全に使用できることを確認します。
- 安全な転送には HTTPS を使用します。これにより、送信中にデータが暗号化され、傍受されなくなります。
- サーバー側の承認では、ユーザー コンテキストの信頼性と承認を検証する必要があります。これにより、ユーザーが本人であること、および必要な権限を持っていることが保証されます。
