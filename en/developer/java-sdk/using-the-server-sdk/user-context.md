# User Context

The User Context represents the identity of the authenticated user of the application. The User Context can be used by Reveal SDK providers such as the `IRVDashboardProvider` , `IRVAuthenticationProvider`, `IRVDataProvider` and others to restrict what permissions the user has. To provide User Context to the Reveal SDK, you can extend `RVContainerRequestAwareUserContextProvider` and implement the abstract method that receives an instance of ContainerRequestContext from JAX-RS specification.

## Sample User Context Provider

**Step 1** - `SampleUserContextProvider` extends `RVContainerRequestAwareUserContextProvider` class and defines the `getUserContext` method that returns a [**RVUserContext**](https://help.revealbi.io/api/java/latest/com/infragistics/reveal/sdk/base/RVUserContext.html) object, which contains both the `userId` and a set of properties. We're using this list of properties to store the sessionId, this way we can retrieve it later when credentials for a data source are requested.

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
**Step 2** - Update the `contextInitialized` function in the `WebAppListener.java` file to add the `RVContainerRequestAwareUserContextProvider` you just created to the `RevealEngineInitializer` using the `setUserContextProvider(new SampleUserContextProvider())` method.

```java
	public void contextInitialized(ServletContextEvent ctx) {
		RevealEngineInitializer.initialize(new InitializeParameterBuilder().
				setUserContextProvider(new SampleUserContextProvider()).
				.build());

		ctx.getServletContext().setAttribute("revealSdkVersion", RevealEngineInitializer.getRevealSdkVersion());
	}
```

You can find an implementation in [**Tomcat sample application using RevealBI Java SDK**](https://github.com/RevealBi/sdk-samples-java/tree/f76481b3578ee95b3949d87e693e2228809daa3e/cookies-auth)
