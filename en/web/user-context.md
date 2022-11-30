# User Context

The User Context represents the identity of the authenticated user of the application. The User Context can be used by Reveal SDK providers such as the `IRVDashboardProvider`, `IRVAuthenticationProvider`, `IRVDataProvider` and others to restrict what permissions the user has.

The user context within the Reveal SDK is represented by the `IRVUserContext` interface and the `RVUserContext` object. The `RVUserContext` is a default implementation of `IRVUserContext`, which provides the ability to store the user id of the current user. The `RVUserContext` object also provides the ability to store additional properties related to a request to be used in other areas of the Reveal SDK such as the authentication provider.

**Step 1** - Create the user context provider

# [ASP.NET](#tab/aspnet)

```cs
internal class UserContextProvider : IRVUserContextProvider
{
    public IRVUserContext GetUserContext(HttpContext aspnetContext)       
    {
        //when using standard auth mechanisms, the userId can be obtained using aspnetContext.User.Identity.Name.
        string userIdentityName = aspnetContext.User.Identity.Name;
        string userId = (userIdentityName != null) ? userIdentityName : "guest";

        return new RVUserContext(
            userId,
            new Dictionary<string, object>() { { "some-property", aspnetContext.Current.Request.Cookies["some-cookie-name"].Value } });
    }    
}
```

# [Java](#tab/java)

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

# [Node.js](#tab/node)

```javascript
const userContextProvider = (request:IncomingMessage) => {
	// this can be used to store values coming from the request.
    var props = new Map<string, Object>();
	props.set("some-property", "some-value"); 
	
	return new RVUserContext("user identifier", props);
};
```
***

**Step 2** - Register the user context provider with the Reveal SDK.

# [ASP.NET](#tab/aspnet)

```cs
builder.Services.AddControllers().AddReveal( builder =>
{
    builder..AddUserContextProvider<UserContextProvider>();
});
```

# [Java](#tab/java)

```java
RevealEngineInitializer.initialize(new InitializeParameterBuilder().
    setUserContextProvider(new UserContextProvider()).
    build());
```

# [Node.js](#tab/node)

```javascript
const revealOptions: RevealOptions {
	userContextProvider: userContextProvider
};
app.use('/reveal-api/', reveal(revealOptions));
```
***
