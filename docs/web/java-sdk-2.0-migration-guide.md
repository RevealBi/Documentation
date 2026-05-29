import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Migrating Java Projects to Reveal SDK 2.0

This guide covers migrating a Spring Boot + Jersey project that uses `com.infragistics.reveal.sdk:reveal-sdk` 1.x to the servlet-based `io.revealbi:reveal-sdk-servlet` 2.0 package. The SDK changes are the same for plain servlet containers; only the application bootstrap differs.

:::info
Reveal SDK 2.0 for Java requires **Java 17 or later** and a Jakarta EE 9 compliant server.
:::

## What Changed

| Reveal SDK 1.x | Reveal SDK 2.0 |
|-----|-----|
| `com.infragistics.reveal.sdk:reveal-sdk` Java-only engine | `io.revealbi:reveal-sdk-servlet` Java proxy with a native `RevealEnginePrg` sidecar |
| Jersey JAX-RS registration with `RevealEngineInitializer.getClassesToRegister()` | A single `RevealEngineServlet` registered like any other servlet |
| `com.infragistics.reveal.sdk.api.*` packages | `io.revealbi.core.*` and `io.revealbi.core.data.*` packages |
| `RVContainerRequestAwareUserContextProvider` for Jersey request context | `IRVServletUserContextProvider` for servlet request context |
| Java 11 or later | Java 17 or later |
| In-process Java engine | Java proxy starts the native Reveal engine as a child process |

:::note Architecture change
In 2.0, your Java application is no longer the Reveal engine. The Java SDK starts the bundled `RevealEnginePrg` binary as a child process, forwards Reveal HTTP requests to it, and receives callback requests from it to invoke your Java providers, such as `IRVAuthenticationProvider` and `IRVDataSourceProvider`.
:::

## Migration Steps

1. Update Maven dependencies and Java version.
2. Replace Jersey registration with `RevealEngineServlet`.
3. Replace the Jersey user context provider with `IRVServletUserContextProvider`.
4. Convert JAX-RS CORS filters and custom resources to servlet filters or Spring MVC.
5. Update provider imports and remove dropped API overloads.
6. Build the application and test through a real Reveal JavaScript client.

## Step 1 - Update Maven Dependencies

Replace the 1.x SDK dependency with the 2.0 servlet package.

<Tabs groupId="java-maven-dependency">
  <TabItem value="before" label="1.x">

```xml title="pom.xml"
<dependency>
    <groupId>com.infragistics.reveal.sdk</groupId>
    <artifactId>reveal-sdk</artifactId>
    <version>1.8.0</version>
</dependency>
```

  </TabItem>
  <TabItem value="after" label="2.0">

```xml title="pom.xml"
<dependency>
    <groupId>io.revealbi</groupId>
    <artifactId>reveal-sdk-servlet</artifactId>
    <version>2.0.0</version>
</dependency>
```

  </TabItem>
</Tabs>

Drop `spring-boot-starter-jersey` and the `provided`-scoped `spring-boot-starter-tomcat` dependency unless your application still has non-Reveal Jersey code. Keep `spring-boot-starter-web`.

Add the Reveal Maven repositories:

```xml title="pom.xml"
<repositories>
    <repository>
        <id>reveal.public</id>
        <url>https://maven.revealbi.io/repository/public</url>
    </repository>
    <repository>
        <id>reveal.release-stage</id>
        <url>https://maven.revealbi.io/repository/release-stage</url>
        <releases><enabled>true</enabled></releases>
    </repository>
</repositories>
```

Update your Maven Java version to `17` or later:

```xml title="pom.xml"
<properties>
    <java.version>17</java.version>
</properties>
```

## Step 2 - Replace Jersey Bootstrap with `RevealEngineServlet`

Delete the Jersey `ResourceConfig` that initialized Reveal and registered the Reveal JAX-RS classes. Register `RevealEngineServlet` from your Spring Boot application instead.

<Tabs groupId="java-bootstrap">
  <TabItem value="before" label="1.x Jersey">

```java title="RevealJerseyConfig.java"
@Component
@ApplicationPath("/")
public class RevealJerseyConfig extends ResourceConfig {
    @Autowired
    public void configureReveal(AuthenticationProvider authProvider, ...) {
        RevealEngineInitializer.initialize(new InitializeParameterBuilder()
            .setAuthProvider(authProvider)
            .setDashboardProvider(dashboardProvider)
            .setDataSourceProvider(dsProvider)
            .setUserContextProvider(userContextProvider)
            .setObjectFilter(objectFilter)
            .build());

        for (Class<?> clazz : RevealEngineInitializer.getClassesToRegister()) {
            register(clazz);
        }
        register(CorsFilter.class);
    }
}
```

  </TabItem>
  <TabItem value="after" label="2.0 Servlet">

```java title="RevealApplication.java"
@Bean
ServletRegistrationBean<RevealEngineServlet> revealServlet(
        AuthenticationProvider authenticationProvider,
        DataSourceProvider dataSourceProvider,
        DashboardProvider dashboardProvider,
        ObjectFilter objectFilter,
        UserContextProvider userContextProvider) {
    RevealEngineServlet servlet = new RevealEngineServlet(
        new RevealServerBuilder()
            .setAuthenticationProvider(authenticationProvider)
            .setDataSourceProvider(dataSourceProvider)
            .setDashboardProvider(dashboardProvider)
            .setObjectFilter(objectFilter)
            // .addSettings(settings -> settings.setLicense("..."))
            .build(),
        userContextProvider);

    ServletRegistrationBean<RevealEngineServlet> registration =
        new ServletRegistrationBean<>(servlet, "/reveal-api/*");
    registration.setAsyncSupported(true);
    registration.setLoadOnStartup(1);
    return registration;
}
```

  </TabItem>
</Tabs>

:::caution
`setAsyncSupported(true)` is required. The servlet uses `request.startAsync()` when it forwards requests to `RevealEnginePrg`.
:::

### Choose a Servlet Mount Path

| Pattern | When to use it | Client base URL |
|---|---|---|
| Mount Reveal at `/*` | The server only hosts Reveal SDK endpoints | `http://host:port/` |
| Mount Reveal under a sub-path, such as `/reveal-api/*` | The server also hosts Spring MVC controllers or static files at the root | `http://host:port/reveal-api/` |
| Mount Reveal internally and route unmatched root requests to it | The client base URL must stay at the root and the server also exposes non-Reveal endpoints | `http://host:port/` |

The servlet specification routes a request path to a single servlet. If Reveal is mounted at `/*`, Spring MVC controllers and static resource handlers mapped at `/` will not receive those requests.

For the internal routing pattern, mount Reveal at a private path such as `/__reveal__/*`, then add a Spring `OncePerRequestFilter` that forwards unmatched requests to the internal Reveal path:

```java title="RevealRoutingFilter.java"
public class RevealRoutingFilter extends OncePerRequestFilter {
    static final String REVEAL_INTERNAL_PREFIX = "/__reveal__";
    private final RequestMappingHandlerMapping handlerMapping;
    private final Path clientFolder;

    public RevealRoutingFilter(RequestMappingHandlerMapping handlerMapping, Path clientFolder) {
        this.handlerMapping = handlerMapping;
        this.clientFolder = clientFolder;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        if (path.startsWith(REVEAL_INTERNAL_PREFIX)
                || controllerCanHandle(request)
                || clientFileExists(path)) {
            chain.doFilter(request, response);
        } else {
            request.getRequestDispatcher(REVEAL_INTERNAL_PREFIX + path).forward(request, response);
        }
    }

    @Override
    protected boolean shouldNotFilterAsyncDispatch() {
        return false;
    }

    private boolean controllerCanHandle(HttpServletRequest request) {
        try {
            return handlerMapping.getHandler(request) != null;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean clientFileExists(String path) {
        String relativePath = path.equals("/") ? "index.html" : path.substring(1);
        Path candidate = clientFolder.resolve(relativePath).normalize();
        return candidate.startsWith(clientFolder)
            && Files.exists(candidate)
            && Files.isRegularFile(candidate);
    }
}
```

Register the routing filter with async support enabled. If `GET /` should serve `index.html`, add a Spring view controller:

```java
registry.addViewController("/").setViewName("forward:/index.html");
```

## Step 3 - Update User Context

`RVContainerRequestAwareUserContextProvider` was tied to Jersey and is no longer available. Use `io.revealbi.servlet.IRVServletUserContextProvider`, which receives a raw `HttpServletRequest`.

<Tabs groupId="java-user-context">
  <TabItem value="before" label="1.x Jersey">

```java title="UserContextProvider.java"
@Component
public class UserContextProvider extends RVContainerRequestAwareUserContextProvider {
    @Override
    protected IRVUserContext getUserContext(ContainerRequestContext context) {
        String header = context.getHeaderString("x-header-one");
        ...
        return new RVUserContext(userId, properties);
    }
}
```

  </TabItem>
  <TabItem value="after" label="2.0 Servlet">

```java title="UserContextProvider.java"
@Component
public class UserContextProvider implements IRVServletUserContextProvider {
    @Override
    public IRVUserContext getUserContext(HttpServletRequest request) {
        String header = request.getHeader("x-header-one");
        ...
        return new RVUserContext(userId, properties);
    }
}
```

  </TabItem>
</Tabs>

Pass the user context provider as the second argument to the `RevealEngineServlet` constructor. You can also pass a lambda:

```java
new RevealEngineServlet(server, request -> new RVUserContext("anonymous", propertiesFor(request)));
```

## Step 4 - Convert CORS to a Servlet Filter

Jersey `ContainerRequestFilter` and `ContainerResponseFilter` implementations no longer apply to Reveal SDK requests. Convert CORS behavior to a `jakarta.servlet.Filter`.

```java title="PermissiveCorsFilter.java"
@Component
public class PermissiveCorsFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String origin = httpRequest.getHeader("Origin");

        httpResponse.setHeader("Access-Control-Allow-Origin", origin == null ? "*" : origin);
        httpResponse.setHeader("Vary", "Origin");
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        httpResponse.setHeader("Access-Control-Allow-Headers",
            "X-Requested-With, Authorization, Content-Type, Cache-Control, Pragma");
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

A `@Component` servlet filter is automatically registered for all URLs by Spring Boot.

## Step 5 - Update Provider Imports

Every `com.infragistics.reveal.sdk.api.*` import moves to `io.revealbi.core.*` or `io.revealbi.core.data.*`. The class names are mostly unchanged.

| Reveal SDK 1.x | Reveal SDK 2.0 |
|-----|-----|
| `com.infragistics.reveal.sdk.api.IRVUserContext` | `io.revealbi.core.IRVUserContext` |
| `com.infragistics.reveal.sdk.base.RVUserContext` | `io.revealbi.core.RVUserContext` |
| `com.infragistics.reveal.sdk.api.IRVDashboardProvider` | `io.revealbi.core.IRVDashboardProvider` |
| `com.infragistics.reveal.sdk.api.IRVAuthenticationProvider` | `io.revealbi.core.data.IRVAuthenticationProvider` |
| `com.infragistics.reveal.sdk.api.IRVDataSourceCredential` | `io.revealbi.core.data.IRVDataSourceCredential` |
| `com.infragistics.reveal.sdk.api.RVUsernamePasswordDataSourceCredential` | `io.revealbi.core.data.RVUsernamePasswordDataSourceCredential` |
| `com.infragistics.reveal.sdk.api.IRVDataSourceProvider` | `io.revealbi.core.data.IRVDataSourceProvider` |
| `com.infragistics.reveal.sdk.api.IRVObjectFilter` | `io.revealbi.core.data.IRVObjectFilter` |
| `com.infragistics.reveal.sdk.api.model.RV*DataSource*` | `io.revealbi.core.data.RV*DataSource*` |

The bundled file-system dashboard provider is now `io.revealbi.core.RVDashboardProvider`. Its constructor requires an **absolute** path. Relative paths throw `IllegalArgumentException`.

```java
new RVDashboardProvider(Paths.get("Dashboards").toAbsolutePath().toString())
```

## Step 6 - Remove Dropped APIs

The following APIs are not available in Reveal SDK 2.0:

- `IRVRestUrlResolver`
- `IRVDashboardAuthorizationProvider`
- `IRVAuthenticationResolver`
- `IRVObjectEncoder`
- `RVContainerRequestAwareUserContextProvider`
- The `IRVObjectFilter.filter(IRVUserContext, RVDashboardDataSource)` overload

For `IRVObjectFilter`, keep only the data-source-item overload:

```java title="ObjectFilter.java"
@Component
public class ObjectFilter implements IRVObjectFilter {
    @Override
    public boolean filter(IRVUserContext userContext, RVDataSourceItem item) {
        ...
    }
}
```

## Step 7 - Convert JAX-RS Controllers to Spring MVC

If your Jersey configuration registered custom resources alongside Reveal, convert those resources to Spring MVC controllers.

<Tabs groupId="java-controller">
  <TabItem value="before" label="JAX-RS">

```java
@Path("/dashboards")
public class DomController {
    @GET
    @Path("/names")
    @Produces(MediaType.APPLICATION_JSON)
    public List<DashboardInfo> getNames() {
        ...
    }
}
```

  </TabItem>
  <TabItem value="after" label="Spring MVC">

```java
@RestController
@RequestMapping("/dashboards")
public class DomController {
    @GetMapping("/names")
    public List<DashboardInfo> getNames() {
        ...
    }
}
```

  </TabItem>
</Tabs>

JAX-RS `ContainerRequestContext.getHeaderString()` becomes `HttpServletRequest.getHeader()`. JAX-RS interceptors should become servlet filters or Spring `HandlerInterceptor` implementations.

## Step 8 - Verify the Migration

After the application starts, the log should show the callback server and the Spring Boot application:

```text
... org.eclipse.jetty.server.Server : Started oejs.Server@...{...0.0.0.0:<callback-port>}
... TomcatWebServer : Tomcat started on port <your-port>
... Started <YourApp> in N seconds
```

`RevealEnginePrg.exe`, or the native binary on macOS and Linux, is spawned lazily on the first incoming Reveal request. It writes engine logs to `%TEMP%/revealbi-logs/reveal-engine.log` on Windows.

A successful first hit looks similar to this in the engine log:

```text
INFO|Reveal.Sdk.Global|License read from file.
INFO|Microsoft.AspNetCore.Hosting.Diagnostics|Request starting HTTP/1.1 GET http://127.0.0.1:<engine-port>/dashboards/...
```

Sanity-check the wiring through the JavaScript client by pointing `RevealSdkSettings.setBaseUrl` to your servlet mount and loading a dashboard. Do not rely on legacy 1.x URLs such as `/dashboards/{id}/exists` for probing.

## Common Pitfalls

| Symptom | Cause and fix |
|---|---|
| Spring MVC controllers or static files stop responding | Reveal is mounted at `/*`. Use a sub-path mount, move Spring MVC under a sub-path, or add an internal routing filter. |
| Routing filter forwards but the request hangs | The filter, internal Reveal servlet, and dispatch type must all support async. Set `setAsyncSupported(true)` on the filter and servlet, and return `false` from `shouldNotFilterAsyncDispatch()`. |
| Startup fails with an `AutowiredAnnotationBeanPostProcessor` trace | A required `@Value("${SOMETHING}")` property is missing. Add the property or provide a default such as `${SOMETHING:fallback}`. |
| First request times out with `Connection timed out` | The native engine had not finished starting. Retry the request and check the engine log if it continues. |
| macOS arm64 returns 403 or signature errors | Ad-hoc sign the native binary once with `codesign -s - <path-to-RevealEnginePrg>`. |
| The wrong native binary is packaged | Pass the target Maven profile, such as `-P linux-x86_64`, when packaging for a different OS or architecture than the build host. |
| `RevealEnginePrg` remains running after shutdown | The Java parent kills the child process only on clean shutdown, such as Ctrl+C from `mvn spring-boot:run` or a Spring `ContextClosedEvent`. |
| Logging output changed | The Java SDK now uses SLF4J. The native engine writes to its own log file instead of your SLF4J configuration. |

## Reference Samples

- [Spring Boot getting started sample](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/server/spring-boot)
- [SQL Server Java server sample](https://github.com/RevealBi/sdk-samples-sqlserver/tree/main/server/java)
