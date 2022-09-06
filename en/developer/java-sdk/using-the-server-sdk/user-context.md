# User Context

Used to identify the user, related to a particular call to the methods of `IRVDashboardProvider`, `IRVAuthenticationProvider`, `IRVDataProvider` and other providers. You can store some user specific data in the Properties like user's permission that you want to use in some of the providers listed above. You can use `RVUserContext` as a default implementation.

### Sources

[**IRVUserContextProvider**](https://help.revealbi.io/api/java/latest/com/infragistics/reveal/sdk/api/IRVUserContextProvider.html) <br>
[**RVUserContext**](https://help.revealbi.io/api/java/latest/com/infragistics/reveal/sdk/base/RVUserContext.html) 


## Sample User Context Provider

`SampleUserContextProvider` extends `RVContainerRequestAwareUserContextProvider` class and defines the `getUserContext` method that returns a `RVUserContext` object, which contains both the `userId` and a set of properties. We're using this list of properties to store the sessionId, this way we can retrieve it later when credentials for a data source are requested.

```java
public class SampleUserContextProvider extends RVContainerRequestAwareUserContextProvider {

	@Override
	protected RVUserContext getUserContext(ContainerRequestContext context) {
		//look for the session id cookie, this cookie should be automatically added by Tomcat, so it should be always present
		Cookie sessionCookie = context.getCookies().get("JSESSIONID");		

		//when using standard auth mechanisms, the userId can be obtained using: context.getSecurityContext().getUserPrincipal().getName()
		String userPrincipalName = context.getSecurityContext().getUserPrincipal().getName();
		String userId = (userPrincipalName != null) ? userPrincipalName : "guest";

		//RVUserContext allows to store properties in addition to the userId, these properties can be used later
		//for example in the authentication provider, in this case we're including the session id cookie so we 
		//can forward it to the REST data source, see SampleAuthenticationProvider.
		Map<String, Object> properties = new HashMap<String, Object>();
		if (sessionCookie != null) {
			properties.put(sessionCookie.getName(), sessionCookie.getValue());
		}
		return new RVUserContext(userId,properties);
	}
}
```

You can find an implementation in [**Tomcat sample application using RevealBI Java SDK**](https://github.com/RevealBi/sdk-samples-java/tree/f76481b3578ee95b3949d87e693e2228809daa3e/cookies-auth)
