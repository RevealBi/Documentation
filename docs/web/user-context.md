import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Understanding User Context

Sending data from a web client to a server application is a necessity when building modern web applications. One approach is using HTTP Headers, which is very useful when passing authentication tokens (e.g., JWT tokens), or any user context specific information needed to execute server-side code. Using request headers, you can transmit sensitive information in a secure manner, eliminating the need to embed it in URLs or the body of requests.

In Reveal, The User Context is an object that can include the identity of the authenticated user of the application, as well as other key information you might need to execute server requests in the context of a specific user. The User Context can be used by Reveal SDK providers such as the `IRVDashboardProvider`, `IRVAuthenticationProvider`, `IRVDataSourceProvider` and others to restrict, or define, what permissions the user has.

The user context within the Reveal SDK is represented by the `IRVUserContextProvider` interface and the `RVUserContext` object. The `RVUserContext` is a default implementation of `IRVUserContext`, which provides the ability to store the user id of the current user, as well as the ability to retrieve and store additional properties related to a request that can be used in other areas of the Reveal SDK like the aformentioned `IRVObjectFilter`, the `IRVDashboardProvider` and the `IRVDataSourceProvider`.

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


#### Passing Client-Side Headers

To pass values to the your `UserContextProvider`, you use the `setAdditionalHeadersProvider` client-side callback function. The   `setAdditionalHeadersProvider` callback is optionally invoked before a request is made to the Reveal server so you can return additional headers with your server request.

The `setAdditionalHeadersProvider` callback function is expected to return an object array with the headers, like: `{ 'SessionId': sessionId }`, `{ 'UserId': userId }`, or simply parameters to execute custom queries, stored procedures or functions. Any value required on the server can be sent using the `setAdditionalHeadersProvider` in conjunction with the `UserContextProvider`.

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

The `IRVUserContextProvider` interface in Reveal BI allows you to pass client-side information to the server. This information can be used in custom queries, as parameters for stored procedures and functions, and more. This document will guide you on how to use the `IRVUserContextProvider` and how to pass parameters from the client to the server.

You can watch and end-to-end webinar explaing this step-by-step here:

https://youtu.be/q9mbN2kIXFs

### Creating the HTML Client

Here is an example of how to pass several property values from the client to the server.  In this case, there are three HTML selects that have orderId, employeeId, and customerId values.  These values are passed to the server in the  `setAdditionalHeadersProvider` callback.

```` js 
$.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url) {
    return headers;
});
````

When the request is made to the `onDataSourcesRequested`, the selected values of each HTML select is set in the `headers` array.

```` js 
var selectedCustomerId = $('#customerId').val();
headers["x-header-customerId"] = selectedCustomerId;

var selectedOrderId = $('#orderId').val();
headers["x-header-orderId"] = selectedOrderId;

var selectedEmployeeId = $('#employeeId').val();
headers["x-header-employeeId"] = selectedEmployeeId;
````

This is the full HTML for the client.

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

### Setting Up the UserContextProvider on the Server

On the server side, these values are picked up and stored as key-value pair properties that can be used in other functions as described earlier in this topic.  Note that each requested header is added to either the default `UserId` property, or as a key-value pair in a Dictionary object.

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

In this example, the `UserContextProvider` class implements the `IRVUserContextProvider` interface. The `GetUserContext` method retrieves the headers sent from the client and stores them in a dictionary. This dictionary can then be used in other functions.

## Using the User Context in the ObjectFilterProvider

The user context can be used in the `ObjectFilterProvider` to filter data based on the user's role property that was set as `role` in the `UserContext` props.

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

In this example, the `Filter` method checks if the user's role is "user". If it is, it only allows access to certain items.

## Using the User Context in the DataSourceProvider

The user context can also be used in the `DataSourceProvider` to in either the `ChangeDataSourceAsync` or `ChangeDataSourceItemAsync`. 

When used in the `ChangeDataSourceAsync`, you might be checking user permissions to access a data source or tenant, or as a server or host property passed from a token.

When used in the  `ChangeDataSourceItemAsync`,  UserContext properties are commonly used as parameters in custom queries, stored procedures or function calls.  

The following example demonstrates that approach.

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

In this example, the `ChangeDataSourceItemAsync` method changes the data source item based on the user's properties. It uses the user's properties to set the parameters for stored procedures and custom queries.

## Security Considerations

When passing parameters from the client to the server, it's important to consider security:

- Validate and sanitize input: Ensure that the input is valid and safe to use.
- Use HTTPS for secure transport: This encrypts the data during transmission, preventing it from being intercepted.
- Server-side authorization should verify the authenticity and authorization of the user context: This ensures that the user is who they claim to be and that they have the necessary permissions.

For more information, refer to the [Reveal BI SDK documentation](https://help.revealbi.io/api/javascript/latest/).