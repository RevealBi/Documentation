# import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Understanding User Context

Sending data from a web client to a server application is a necessity when building modern web applications. One approach is using HTTP Headers, which is very useful when passing authentication tokens (e.g., JWT tokens), or any user context specific information needed to execute server-side code. Using request headers, you can transmit sensitive information in a secure manner, eliminating the need to embed it in URLs or the body of requests.

In Reveal, The User Context is an object that can include the identity of the authenticated user of the application, as well as other key information you might need to execute server requests in the context of a specific user. The User Context can be used by Reveal SDK providers such as the `IRVDashboardProvider`, `IRVAuthenticationProvider`, `IRVDataSourceProvider` and others to restrict, or define, what permissions the user has.

User context in the Reveal SDK is represented by the `IRVUserContextProvider` interface and the `RVUserContext` object. The `RVUserContext` is a default implementation of `IRVUserContext`, which provides the ability to store the user id of the current user, as well as the ability to retrieve and store additional properties related to a request that can be used in other areas of the Reveal SDK like the aformentioned `IRVObjectFilter`, the `IRVDashboardProvider` and the `IRVDataSourceProvider`.

Follow these steps to implement the `UserContextProvider`.

**Step 1** - Create the user context provider

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

**Step 2** - Register the user context provider with the Reveal SDK.

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

Your server is now set up to retrieve and store context-specific information passed via HTTP headers.  Once you've added your server implementation, you use the client-side callback `setAdditionalHeadersProvider`.


#### Passing Headers from the Client

To pass values to the `UserContextProvider`, you use the `setAdditionalHeadersProvider` client-side callback function. The  `setAdditionalHeadersProvider` callback is optionally invoked before a request is made to the Reveal server so you can return additional headers with your server request.

The `setAdditionalHeadersProvider` callback function is expected to return an object array with the headers, like: `{ 'SessionId': sessionId }`, `{ 'UserId': userId }`, or parameters to execute custom queries, stored procedures or functions. Any value required on the server can be sent using the `setAdditionalHeadersProvider` in conjunction with the `UserContextProvider`.

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

## Example: Implementing User Context for Row-Level Security

The `IRVUserContextProvider` interface in Reveal BI allows you to pass client-side information to the server. This information can be used in custom queries, as parameters for stored procedures and functions, for your logged-in user information, tenant information, and more. When variables are passed from This document will guide you on how to use the `IRVUserContextProvider` and `IRVUserContextProvider` to pass parameters from the client to the server.

You can watch and end-to-end webinar explaining this step-by-step here:

https://youtu.be/q9mbN2kIXFs

### Creating the HTML Client

The client HTML demonstrates passing two property values from the client to the server.  In this sample, there are two HTML selects that have `orderId` and `customerId` values.  Selected values from these HTML Selects are passed to the server in the `setAdditionalHeadersProvider` callback when the `onDataSourcesRequested` callback is invoked.

The implemenation of the `setAdditionalHeadersProvider` callback looks like this:

```` js 
$.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url) {
    return headers;
});
````

When `onDataSourcesRequested` in invoked, the selected values of each HTML select is set in the `headers` array.

```` js 
var selectedCustomerId = $('#customerId').val();
headers["x-header-customerId"] = selectedCustomerId;

var selectedOrderId = $('#orderId').val();
headers["x-header-orderId"] = selectedOrderId;
````

This is the full HTML for the client, which includes an Azure SQL data source, and two data source items that will use the information passed in the `setAdditionalHeadersProvider` for querying data on the server.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal - UserContext & Parameters in Stored Procs</title>
</head>

<body>
    <select name="orders" id="orderId">
        <option value="10248">10248</option>
        <option value="10249">10249</option>
    </select>

    <select name="customers" id="customerId">
        <option value="ALFKI">ALFKI</option>
        <option value="ANATR">ANATR</option>
      </select>
      
    <div id="revealView" style="height: calc(100vh - 25px); width: 100%;"></div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
    <script src="https://dl.revealbi.io/reveal/libs/1.6.4/infragistics.reveal.js"></script>

    <script type="text/javascript">
        $.ig.RevealSdkSettings.setBaseUrl("http://localhost:5082/");

        $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url) {
            return headers;
        });

        const headers = {};

        var revealView = new $.ig.RevealView("#revealView");
        revealView.startInEditMode = true;  

        revealView.onDataSourcesRequested = (callback) => {    

            var selectedCustomerId = $('#customerId').val();
            headers["x-header-customerId"] = selectedCustomerId;

            var selectedOrderId = $('#orderId').val();
            headers["x-header-orderId"] = selectedOrderId;

            console.log(headers);

            var ds = new $.ig.RVAzureSqlDataSource();
            ds.id="sqlServer";
            ds.title = "SQL Server Data Source";
            ds.subtitle = "Full Northwind Database";

            var dsi1 = new $.ig.RVAzureSqlDataSourceItem(ds);
            dsi1.id="CustomerOrders";
            dsi1.title = "Customer Orders";

            var dsi2 = new $.ig.RVAzureSqlDataSourceItem(ds);
            dsi2.id="CustOrderHist";
            dsi2.title = "Customer Orders History";

            callback(new $.ig.RevealDataSources([ds], [ dsi1, dsi2], false));        
        };     
    </script>
</body>
</html>
```

### Setting Up the UserContextProvider on the Server

On the server side, the `customerId` and `orderId` values are picked up and stored as key-value pair properties that can be used in other functions as described earlier in this topic.  Note that each requested header is added to either the default `UserId` property, or as a key-value pair in a Dictionary object. 

```csharp
public class UserContextProvider : IRVUserContextProvider
{
    IRVUserContext IRVUserContextProvider.GetUserContext(HttpContext aspnetContext)
    {
        var userId = aspnetContext.Request.Headers["x-header-customerId"];
        var orderId = aspnetContext.Request.Headers["x-header-orderId"];

        var props = new Dictionary<string, object>() {
                { "OrderId", orderId }, 
			};

        Console.WriteLine("UserContextProvider: " + userId + " " + orderId + " " + employeeId);

        return new RVUserContext(userId, props);
    }
}
```

In this example, the `UserContextProvider` class implements the `IRVUserContextProvider` interface. The `GetUserContext` method retrieves the headers sent from the client and stores them in a dictionary.  

## Using the User Context in the DataSourceProvider

The `UserContext` property values can also be used in various Reveal functions, including the  `DataSourceProvider` , in either the `ChangeDataSourceAsync` or `ChangeDataSourceItemAsync`. When used in the `ChangeDataSourceAsync`, you might be checking user permissions to access a data source or database tenant, or as a server or host property passed from a token.

When used in the  `ChangeDataSourceItemAsync`, `UserContext` property values are commonly used as parameters in custom queries, stored procedures or function calls.   The following example demonstrates how to use values passed from the client that are then picked up by the `UserContextProvider` and used as parameters in queries to the server.

```csharp
public Task<RVDataSourceItem>? ChangeDataSourceItemAsync(IRVUserContext userContext, 
        string dashboardId, RVDataSourceItem dataSourceItem)
{
    if (dataSourceItem is RVSqlServerDataSourceItem sqlDsi)
    {
        ChangeDataSourceAsync(userContext, sqlDsi.DataSource);

        // userId passed to a Stored Proc parameter
        if (sqlDsi.Id == "CustOrderHist")
        {
            sqlDsi.Procedure = "CustOrderHist";
            sqlDsi.ProcedureParameters = 
                new Dictionary<string, object> 
                { { "@CustomerID", userContext.UserId } };
        }

        // orderId passed to a Custom Query
        else if (sqlDsi.Id == "CustomerOrders")
        {
            sqlDsi.CustomQuery = $"Select * from Orders Where OrderId = " +
                $"{userContext.Properties[@"OrderId"]}";
        }
    }
    return Task.FromResult(dataSourceItem);
}
```

In this example, `ChangeDataSourceItemAsync` uses values passed from the client using `setAdditionalHeadersProvider` as parameters for stored procedures and custom queries. 

## Security Considerations

When passing parameters from the client to the server, it's important to consider security:

- Validate and sanitize input: Ensure that the input is valid and safe to use.
- Use HTTPS for secure transport: This encrypts the data during transmission, preventing it from being intercepted.
- Server-side authorization should verify the authenticity and authorization of the user context: This ensures that the user is who they claim to be and that they have the necessary permissions.
