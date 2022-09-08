# User Context

The User Context represents the identity of the authenticated user of the application. The User Context can be used by Reveal SDK providers such as the `IRVDashboardProvider`, `IRVAuthenticationProvider`, `IRVDataProvider` and others to restrict what permissions the user has. To provide User Context to the Reveal SDK, you must create a class that implements the [**IRVUserContextProvider**](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.IRVUserContextProvider.html) interface.

## Sample User Context Provider

**Step 1** - `SampleUserContextProvider` implements [**IRVUserContextProvider**](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.IRVUserContextProvider.html) interface and defines the `GetUserContext` method that returns a [**RVUserContext**](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.RVUserContext.html) object, which contains both the 
`userId` and a set of properties. We're using this list of properties to store the `someCookieName` value, this way we can retrieve it later when credentials for a data source are 
requested.

```csharp
    internal class SampleUserContextProvider : IRVUserContextProvider
    {
        public IRVUserContext GetUserContext(HttpContext aspnetContext)       
            {
                //when using standard auth mechanisms, the userId can be obtained using aspnetContext.User.Identity.Name.

                string userIdentityName = aspnetContext.User.Identity.Name;
                string userId = (userIdentityName != null) ? userIdentityName : "guest";

                //RVUserContext is a default implementation of IRVUserContext, which allows to store properties in addition to the userId, these properties can be used later
                //for example in the authentication provider. You could store data related to the current request this way. In this case, we are storing the value of "someCookieName".

                return new RVUserContext(
                    userId,
                    new Dictionary<string, object>() { { "someKey", aspnetContext.Current.Request.Cookies["someCookieName"].Value } });
			}       
    }
```

**Step 2** - Update the `AddReveal` method in the `Program.cs` file to add the `IRVUserContextProvider` you just created to the `RevealSetupBuilder` using the `RevealSetupBuilder.AddUserContextProvider` method.

```csharp
builder.Services.AddControllers().AddReveal( builder =>
{
    builder..AddUserContextProvider<SampleUserContextProvider>();
});
```

You can find an implementation in [**Web sample application using RevealBI AspNetCore SDK**](https://github.com/RevealBi/sdk-samples-aspnetcore/blob/590f79ce822755002bf2ccbbdb6e455ab7f1f3c3/Cookies-Auth/README.md)
