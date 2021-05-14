## Providing Credentials to Data Sources

### Overview

The Server SDK allows you to pass in a set of credentials to be used when accessing the data source.

The first step is to implement __IRVAuthenticationProvider__ and then you need to set your custom class when initializing Reveal with the __RevealEngineInitializer.initialize__ method.
For further details, refer to [Initializing Reveal](https://help.revealbi.io/en/developer/java-sdk/setup-configuration.html#step-3---initializing-reveal) in Java Setup and Configuration.
To look to an actual implementation, please refer to the __RevealJerseyConfig__ class in the Spring sample or __WebAppListener__ in Tomcat-based samples in [GitHub](https://github.com/RevealBi/sdk-samples-java).

### Code

If you use __UpmediaAuthenticationProvider__ (upmedia, upmedia-backend-tomcat and upmedia-backend-spring samples) as a reference, there you can find a single method implemented that receives the _userId_ for the current user and the data source for which credentials are being requested: 

``` java
public class UpmediaAuthenticationProvider implements IRVAuthenticationProvider {
    @Override
    public IRVDataSourceCredential resolveCredentials(String userId, RVDashboardDataSource dataSource) {
        // Returning credentials for a SqlServer data source example:
        if (dataSource instanceof RVSqlServerDataSource) {
            String host = ((RVSqlServerDataSource)dataSource).getHost();
            if (host != null && host.equals("10.10.10.10")) {
                return new RVUsernamePasswordDataSourceCredential("someuser", "somesecret", "somedomain");
            }
        }
        return null;
    }
}
```

With a code similar to the example above, you can check if the data source is a MS SQL Server data source and also check for the host name of the server to return the credentials to be used.

Similar code but for a Redshift data source:

```java
if (dataSource instanceof RVRedshiftDataSource) {
    String host = ((RVRedshiftDataSource)dataSource).getHost();
    if (host != null && host.equals("1.2.3.4")) {
        return new RVUsernamePasswordDataSourceCredential("user", "password");
    }
}
```

### Choosing Which Class to Implement

There are three classes that can be used, all implementing the __IRVDataSourceCredential__
interface. You need to choose the class depending on your data source, as detailed below.

| Class | Examples |
|:-|:-|
| __RVBearerTokenDataSourceCredential__ <br> Associated to  OAuth authentication (usually sends the OAuth access token). | Google Analytics, Box, Dropbox, Google Drive, OneDrive, SharePoint Online, OData Feed, Web Resources, REST API. |
| __RVUsernamePasswordDataSourceCredential__ <br> Works with user/password style authentication (with an optional domain). | Microsoft Dynamics CRM On-Premises and Online, Microsoft SQL Server, Microsoft Analysis Services Server, MySQL, PostgreSQL, Oracle, Sybase, OData Feed, Web Resources, REST API.
| __RVAmazonWebServicesCredentials__ <br> Works with AWS (Amazon Web Services). | Athena, S3.

### No Authentication

Sometimes you might work with an anonymous resource, without authentication. In this particular case, you can use __RVUsernamePasswordDataSourceCredential__, which has an empty constructor. You can do this for any data source that works with the class.
