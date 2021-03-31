## Tomcat Server Setup and Configuration

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

To set up the Reveal with an existing Tomcat application or any other JEE container, you need to:

1.  Add a dependency to JAX-RS implementation.
2.  Add a dependency to Reveal SDK.
3.  Initialize Reveal.
4.  Enable server-side export.

#### Step 1 - Adding a dependency to JAX-RS implementation

Add a dependency to a Jakarta RESTful Web Services (JAX-RS) implementation. You can choose between multiple options like Jersey, RESTeasy, Apache CXF, etc. Please follow the steps described by the provider of your preference.

As an example, here the dependencies you need to add for Jersey:

``` java
<dependency>
    <groupId>org.glassfish.jersey.containers</groupId>
    <artifactId>jersey-container-servlet</artifactId>
    <version>2.32</version>
</dependency>
<dependency>
    <groupId>org.glassfish.jersey.inject</groupId>
    <artifactId>jersey-cdi2-se</artifactId>
    <version>2.32</version>
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

Add a **ServletContextListener** class to initialize Reveal.
To do this, you can copy the class **WebAppListener** from *upmedia-backend-tomcat* source code, located inside the package *com.pany.analytics.upmedia.reveal*).

The parameters passed to RevealEngineInitializer.initialize are:
- IRVAuthenticationProvider
- IRVUserContextProvider
- IRVDashboardProvider
- IRVDataSourceProvider
- IRVDataProvider
 
Those are the **providers** that can be used to customize Reveal, you’ll need to create your own providers when integrating Reveal into your application.

For further details about how implement your own Dashboards provider, please refer to **????????** 
**(use a link to docs or redirect to samples)**

#### Step 4 - Enabling server-side export

The Java SDK uses some native components for exporting dashboards to different formats: Image, PDF, PPT and Excel.

If you are interested in exporting server-side to one or more of those formats, please refer to [Server-side Export Configuration](export-server-side.md)