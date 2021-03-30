## Setup and Configuration

<a name='maven-dependency'></a>

### Prerequisites (Maven)

RevealBI Java SDK is distributed as a set of [Maven](https://maven.apache.org/what-is-maven.html) modules. To work with the SDK libraries, you need to add a reference to Reveal's Maven Repository and also a dependency in your Maven pom.xml file.

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


### Setup and Configuration (Generic Server)

To integrate Reveal with any existing application, you need to follow these three generic steps:

1.  Add a dependency to the existing app implementation
2.  Add a dependency to Reveal SDK
3.  Initialize Reveal

In the sections below, you'll find a few specific samples for Tomcat and Spring.

### Setup and Configuration (Tomcat Server)

To set up the Reveal with an existing Tomcat application or any other JEE container, you need to:

1.  Add a dependency to JAX-RS implementation
2.  Add a dependency to Reveal SDK and specify your SDK version
3.  Initialize Reveal

#### Step 1 - Adding a dependency to JAX-RS implementation

Add a dependency to a Jakarta RESTful Web Services (JAX-RS) implementation. You can choose between multiple options like Jersey, RESTeasy, Apache CXF, etc. Please follow the steps described by the provider of your preference.

As an example, here the dependencies you need to add for Jersey:

``` csharp
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

``` csharp
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

### Setup and Configuration (Spring Server)

To set up the Reveal with an existing Spring Boot application, you need to:

1.  Add a dependency to spring-starter-jersey implementation
2.  Add a dependency to Reveal SDK
3.  Initialize Reveal


#### Step 1 - Adding a dependency to spring-starter-jersey implementation

Add a dependency to *spring-starter-jersey*, if not added yet:

``` csharp
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jersey</artifactId>
</dependency>
```

#### Step 2 - Adding a dependency to Reveal SDK

Add a dependency to *reveal-sdk* and specify your SDK version.

``` csharp
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

### Setup and Configuration (Client)

To set up the Reveal Web Client SDK you need to:

1.  [**Check Dependencies**](#check-dependencies).

2.  [**Reference the Web Client SDK**](#reference-web-client-sdk).

3.  [**Instantiate the Web Client SDK**](#instantiate-web-client-sdk).


<a name='check-dependencies'></a>

#### 1\. Checking Dependencies

The Reveal Web Client SDK has the following 3rd party references:

- [jQuery](https://jquery.com) 2.2 or greater
- [Day.js](https://day.js.org) 1.8.15 or greater
- [Quill RTE](https://quilljs.com/) 1.3.6 or greater

<a name='reference-web-client-sdk'></a>

#### 2\. Referencing the Web Client SDK

Enabling **\$.ig.RevealView** component in a web page requires several scripts to be included. These
scripts will be provided as part of Reveal Web Client SDK.

```html
<script src="~/Reveal/infragistics.reveal.js"></script>
```

JavaScript files can be found in
"\<InstallationDirectory\>\\SDK\\Web\\JS\\Client".

<a name='instantiate-web-client-sdk'></a>

#### 3\. Instantiating the Web Client SDK

Reveal’s Dashboard presentation is handled natively through the Web
Client SDK.

To get started follow these steps:

1.  Define a \<div /\> element with “id” and invoke the
    **\$.ig.RevealView** constructor.

    > [!NOTE] > **Hosting Client-Side and Server-Side Parts Separately**
    > If you want to host client-side and server-side parts on different servers, please read [here](~/en/developer/web-sdk/overview.html#host-client-server-separate) **before** you continue to next step.

2.  Call
    **\$.ig.RVDashboard.loadDashboard**
    providing the _dashboardId_ and success and error handlers.

3.  In the success handler instantiate the
    **\$.ig.RevealView** component
    by passing a selector for the DOM element
    where the dashboard should be rendered into. Finally
    you should use the retrieved dashboard and set it to the dashboard property of the
    **\$.ig.RevealView**

#### Sample Code

```html
<!DOCTYPE html>
<html>
  <head>
    ⋮
    <script type="text/javascript">
      var dashboardId = "dashboardId";

      $.ig.RVDashboard.loadDashboard(
        dashboardId,
        function (dashboard) {
          var revealView = new $.ig.RevealView("#revealView");
          revealView.dashboard = dashboard;
        },
        function (error) {
          //Process any error that might occur here
        }
      );
    </script>
  </head>
  <body>
    <div id="revealView" style="height:500px;" />
  </body>
</html>
```
