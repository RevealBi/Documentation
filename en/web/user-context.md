# User Context

Used to identify the user, related to a particular call to the methods of `Reveal.Sdk.IRVDashboardProvider`, `IRVAuthenticationProvider`, `IRVDataProvider` and other providers. You 
can store some user specific data in the Properties like user's permission that you want to use in some of the providers listed above. You can use `RVUserContext` as a default 
implementation.
<br>
This way, you can perform user specific interactions within Reveal SDK.

## Sample User Context Provider

`SampleUserContextProvider` implements `IRVUserContextProvider` interface and defines the `GetUserContext` method that returns a `RVUserContext` object, which contains both the 
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
                new Dictionary<string, object>() { {"someKey", aspnetContext.Current.Request.Cookies["someCookieName"].Value } });
        }
    }
```

You can find an implementation in [**Web sample application using RevealBI AspNetCore SDK**]
(https://github.com/RevealBi/sdk-samples-aspnetcore/blob/590f79ce822755002bf2ccbbdb6e455ab7f1f3c3/Cookies-Auth/README.md)


### API Reference Links

[**IRVUserContextProvider**](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.IRVUserContextProvider.html) <br>
[**IRVUserContext**](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.IRVUserContext.html) <br>
[**RVUserContext**](https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.RVUserContext.html)
