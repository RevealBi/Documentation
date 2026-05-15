# Setting up the Reveal SDK Server with Spring Boot

## Step 1 - Create a Spring Boot Project

The steps below describe how to create a new Java Spring Boot project. If you want to add the Reveal SDK to an existing application, go to Step 2.

To develop a Spring Boot application in Visual Studio Code, you need to install the following:
- [Development Kit (JDK)](https://www.microsoft.com/openjdk)
- [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
- [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=pivotal.vscode-boot-dev-pack)

More information about how to get started with Visual Studio Code and Java can be found at the [Getting Started with Java](https://code.visualstudio.com/docs/java/java-tutorial) tutorial.

1 - Start Visual Studio Code, open the Command Palette and type **>Spring Initializr: Create a Maven Project** and press **Enter**.

![](images/getting-started-spring-boot-project.jpg)

2 - Select the Spring Boot version **3.3.2**.

![](images/getting-started-spring-boot-version.jpg)

:::caution
Version 2.x is not supported since Reveal 1.7.x
:::

3 - Select **Java** as the language.

![](images/getting-started-spring-boot-language.jpg)

4 - Provide the Group Id. In this example, we are using **com.server**.

![](images/getting-started-spring-boot-group-id.jpg)

5 - Provide the Artifact Id. In this example, we are using **reveal**.

![](images/getting-started-spring-boot-artifact-id.jpg)

If prompted for the package name, use **com.server.reveal**.

6 - Select the **War** package type.

![](images/getting-started-spring-boot-package-type.jpg)

7 - Select the Java version. For Spring Boot 3.x, we need to use at least **17**.

![](images/getting-started-spring-boot-java-version.jpg)

8 - Choose the **Spring Web** dependency.

9 - Save and open the newly created project.

![](images/getting-started-spring-boot-explorer.jpg)

## Step 2 - Add Reveal SDK

The Java SDK requires Java 17 or higher and a Jakarta EE 9 compliant server. The supported platforms are Linux, Windows, and macOS, with both x64 and arm64 architectures. Also, if you use Jetty as your server, its version might conflict with the Jetty version used internally by Reveal SDK, which is currently 12.0.12.

1 - Update the **pom.xml** file.

First, add the Reveal Maven repository.

```xml title="pom.xml"
<repositories>
    <repository>
        <id>reveal.public</id>
        <url>https://maven.revealbi.io/repository/public</url>
    </repository>	
</repositories>
```

Next, add the Reveal SDK as a dependency.

```xml title="pom.xml"
<dependency>
    <groupId>io.revealbi</groupId>
    <artifactId>reveal-sdk-servlet</artifactId>
    <version>[var:sdkVersion]</version>
</dependency>
```

2 - Register `RevealEngineServlet` as a Spring Boot servlet. The sample maps Reveal at the root path (`/*`) so the Getting Started client applications can connect without changing `RevealSdkSettings.setBaseUrl`.

```java title="RevealApplication.java"
package com.server.reveal;

import io.revealbi.core.RevealServerBuilder;
import io.revealbi.core.RVDashboardProvider;
import io.revealbi.servlet.RevealEngineServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import java.nio.file.Paths;

@SpringBootApplication
public class RevealApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(RevealApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(RevealApplication.class);
    }

    @Bean
    ServletRegistrationBean<RevealEngineServlet> revealServlet() {
        RevealEngineServlet revealEngineServlet = new RevealEngineServlet(
            new RevealServerBuilder()
                .setDashboardProvider(new RVDashboardProvider(Paths.get("Dashboards").toAbsolutePath().toString()))
                .build()
        );

        ServletRegistrationBean<RevealEngineServlet> registration =
            new ServletRegistrationBean<>(revealEngineServlet, "/*");
        registration.setAsyncSupported(true);
        registration.setLoadOnStartup(1);
        return registration;
    }
}
```

## Step 3 - Register Dashboard Provider

The dashboard provider tells the Reveal SDK where to load and save dashboard files. The built-in `RVDashboardProvider` uses the path you provide to its constructor.

1 - Create the `Dashboards` folder in the server project root.

2 - Configure `RVDashboardProvider` with the folder that contains your dashboards.

```java title="RevealApplication.java"
new RevealServerBuilder()
    .setDashboardProvider(new RVDashboardProvider(Paths.get("Dashboards").toAbsolutePath().toString()))
    .build();
```

## Step 4 - Setup CORS Policy (Debugging)

While developing and debugging your application, it is common to host the server and client app on different URLs. For example, this sample server runs on `http://localhost:5111`, while your Angular app may be running on `http://localhost:4200`. If you try to load a dashboard from the client application, it will fail because of a Cross-Origin Resource Sharing (CORS) policy. To enable this scenario for local development, add a permissive CORS filter:

```java title="PermissiveCorsFilter.java"
@Component
public class PermissiveCorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String origin = httpRequest.getHeader("Origin");
        String requestedMethod = httpRequest.getHeader("Access-Control-Request-Method");
        String requestedHeaders = httpRequest.getHeader("Access-Control-Request-Headers");

        httpResponse.setHeader("Access-Control-Allow-Origin", origin == null ? "*" : origin);
        httpResponse.setHeader("Vary", "Origin");
        httpResponse.setHeader("Access-Control-Allow-Methods", requestedMethod == null ? "GET, POST, PUT, DELETE, OPTIONS, HEAD" : requestedMethod);
        httpResponse.setHeader("Access-Control-Allow-Headers", requestedHeaders == null ? "X-Requested-With, Authorization, Accept-Version, Content-MD5, CSRF-Token, Content-Type, Cache-Control, Pragma" : requestedHeaders);
        httpResponse.setHeader("Access-Control-Expose-Headers", "*");
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpResponse.setHeader("Access-Control-Max-Age", "3600");

        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
            httpResponse.setStatus(HttpServletResponse.SC_NO_CONTENT);
            return;
        }

        chain.doFilter(request, response);
    }
}
```

## Step 5 - Run the Server

Run the Spring Boot application from the server project folder and pass the server port as a Spring Boot argument.

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.arguments=--server.port=5111"
```

On macOS or Linux:

```bash
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=5111
```

The server listens on `http://localhost:5111`.

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/server/spring-boot).

:::
