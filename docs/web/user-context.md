import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# User Context

The User Context represents the identity of the authenticated user of the application. The User Context can be used by Reveal SDK providers such as the `IRVDashboardProvider`, `IRVAuthenticationProvider`, `IRVDataProvider` and others to restrict what permissions the user has.

The user context within the Reveal SDK is represented by the `IRVUserContext` interface and the `RVUserContext` object. The `RVUserContext` is a default implementation of `IRVUserContext`, which provides the ability to store the user id of the current user. The `RVUserContext` object also provides the ability to store additional properties related to a request to be used in other areas of the Reveal SDK such as the authentication provider.

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
