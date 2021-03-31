## Spring Server Setup and Configuration

<a name='maven-dependency'></a>

### Prerequisites (Maven)

Reveal Java SDK is distributed as a set of [Maven](https://maven.apache.org/what-is-maven.html) modules. To work with the SDK libraries, you need to add a reference to Reveal's Maven Repository and also a dependency in your Maven pom.xml file.

Add the following repository:

```xml
<repositories>
  <repository>
    <id>reveal.public</id>
    <url>http://revealpackages.eastus.cloudapp.azure.com/repository/public</url>
  </repository>	
</repositories>
```

And the following dependency:

```xml
<dependency>
  <groupId>com.infragistics.reveal.sdk</groupId>
  <artifactId>reveal-sdk</artifactId>
  <version>version_number</version>
</dependency>
```

Replace version_number with a number similar to **0.9.6**.

If you are not familiar with Maven, please refer to the following [link](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html).

### Setup and Configuration

To set up the Reveal with an existing Spring Boot application, you need to:

1.  Add a dependency to spring-starter-jersey implementation.
2.  Add a dependency to Reveal SDK.
3.  Initialize Reveal.
4.  Enable server-side export.

#### Step 1 - Adding a dependency to spring-starter-jersey implementation

Add a dependency to *spring-starter-jersey*, if not added yet:

``` java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jersey</artifactId>
</dependency>
```

#### Step 2 - Adding a dependency to Reveal SDK

Add a dependency to *reveal-sdk* and specify your SDK version.

``` java
<dependency>
    <groupId>com.infragistics.reveal.sdk</groupId>
    <artifactId>reveal-sdk</artifactId>
    <version>version_number</version>
</dependency>
```

Replace version_number with a number similar to **1.0.1821**.

#### Step 3 - Initializing Reveal

Add a **JerseyConfig** component that will initialize a Jakarta RESTful Web Services (JAX-RS) application with Reveal resources.
To do this, you can copy the class **RevealJerseyConfig** from *upmedia-backend-spring* source code, located inside the package *com.pany.analytics.upmedia.reveal*).

The *@ApplicationPath* annotation configures the path where Reveal services will be available, if you modify it then you’ll also need to modify the client-side path too. For the React application this is configured in index.html:

``` js
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:8080/upmedia-backend/reveal-api/");
```

The parameters passed to RevealEngineInitializer.initialize are:
- IRVAuthenticationProvider
- IRVUserContextProvider
- IRVDashboardProvider
- IRVDataSourceProvider
- IRVDataProvider

Those are the **providers** used to customize Reveal, you’ll need to create your own providers when integrating Reveal into your application.

For further details about how implement your own Dashboards provider, please refer to **????????** 
**(use a link to docs or redirect to samples)**

#### Step 4 - Enabling server-side export

The Java SDK uses some native components for exporting dashboards to different formats: Image, PDF, PPT and Excel.

If you are interested in exporting server-side to one or more of those formats, please refer to [Server-side Export Configuration](export-server-side.md)