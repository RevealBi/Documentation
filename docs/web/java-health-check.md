---
title: Java Health Checks
description: Report in your application's health check when the Reveal server of the Java SDK stops working, so your platform restarts the application.
---

# Java Health Checks

The Java SDK runs the Reveal engine as a separate process. If that process stops, for example because the operating system ends it when memory runs low, the Reveal server fails: it answers every request with 503, exports fail, and it doesn't recover on its own. Restarting the application starts a new engine, so report the failure in the application's health check and let your platform restart the application. If nothing restarts your application automatically, set up an alert on the health check, so that someone restarts it.

`IRevealServer.getStatus()` returns the state of the server, `RUNNING`, `FAILED` or `SHUT_DOWN`, and for `FAILED` a message with the reason. `IRevealServer.getTermination()` returns a `CompletionStage` that completes with the `FAILED` or `SHUT_DOWN` status once the server stops running. `RevealEngineServlet.getRevealServer()` returns the server that the servlet uses.

## Spring Boot

1 - Add Spring Boot Actuator to the **pom.xml** file.

```xml title="pom.xml"
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

2 - Run Actuator on a port of its own. [Getting Started](getting-started-spring-boot.md) maps Reveal on `/*`, so on the application's port Reveal also receives `/actuator/health`, and the health check never runs.

```properties title="application.properties"
management.server.port=8081
```

Spring Boot opens a separate port only when it runs the application on its embedded server. If you deploy the application as a WAR file to a servlet container, map Reveal on a path of its own instead, such as `/reveal-api/*`, and add `reveal-api/` to the URL you pass to `RevealSdkSettings.setBaseUrl` in the client.

3 - Pass `RevealEngineServlet` a function that builds the Reveal server, so the servlet shuts the server down when the application stops, and set the servlet to load on startup, so the server starts with the application. To log when the server stops running, add a callback to `getTermination()`.

```java title="RevealApplication.java"
private static final Logger log = LoggerFactory.getLogger(RevealApplication.class);

@Bean
ServletRegistrationBean<RevealEngineServlet> revealServlet() {
    RevealEngineServlet revealEngineServlet = new RevealEngineServlet(() -> {
        IRevealServer server = new RevealServerBuilder()
            // ...
            .build();
        server.getTermination().thenAccept(status -> log.warn("Reveal server is {}: {}", status.getState(), status.getMessage()));
        return server;
    });

    ServletRegistrationBean<RevealEngineServlet> registration = new ServletRegistrationBean<>(revealEngineServlet, "/*");
    registration.setAsyncSupported(true);
    registration.setLoadOnStartup(1);
    return registration;
}
```

The callback runs on the thread that stops the server, so use `thenAcceptAsync` with your own executor for slow work, and handle the exceptions it throws, which are otherwise lost. A failed server stays `FAILED` even if the application shuts down afterwards.

4 - Add a health indicator that reads the server from the servlet and reports it as down once it stops running.

```java title="RevealServerHealthIndicator.java"
@Component
public class RevealServerHealthIndicator implements HealthIndicator {

    private final RevealEngineServlet revealServlet;

    public RevealServerHealthIndicator(ServletRegistrationBean<RevealEngineServlet> revealServlet) {
        this.revealServlet = revealServlet.getServlet();
    }

    @Override
    public Health health() {
        RevealServerStatus status = revealServlet.getRevealServer().getStatus();
        if (status.getState() == RevealServerState.RUNNING) {
            return Health.up().build();
        }
        Health.Builder health = Health.down().withDetail("state", status.getState());
        if (status.getMessage() != null) {
            health.withDetail("reason", status.getMessage());
        }
        return health.build();
    }
}
```

Once the Reveal server fails, `/actuator/health` on port 8081 answers 503. Point your platform's health check at it so the platform restarts the application.

## Servlet Containers

In Tomcat or another servlet container, pass `RevealEngineServlet` a function that builds the Reveal server and set the servlet to load on startup, so the server starts with the application and the servlet shuts it down when the application stops. Then register a health servlet that reads the server from `RevealEngineServlet`.

```java title="AppInitializer.java"
@WebListener
public class AppInitializer implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        RevealEngineServlet revealEngineServlet = new RevealEngineServlet(() -> new RevealServerBuilder()
            // ...
            .build(), request -> new RVUserContext("whatever", null));

        ServletRegistration.Dynamic reg = sce.getServletContext().addServlet("myServlet", revealEngineServlet);
        reg.setAsyncSupported(true);
        reg.setLoadOnStartup(1);
        reg.addMapping("/reveal-api/*");

        sce.getServletContext().addServlet("revealHealth", new RevealServerHealthServlet(revealEngineServlet)).addMapping("/health");
    }
}
```

```java title="RevealServerHealthServlet.java"
public class RevealServerHealthServlet extends HttpServlet {

    private final RevealEngineServlet revealServlet;

    public RevealServerHealthServlet(RevealEngineServlet revealServlet) {
        this.revealServlet = revealServlet;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        RevealServerStatus status = revealServlet.getRevealServer().getStatus();
        response.setStatus(status.getState() == RevealServerState.RUNNING ? 200 : 503);
        response.setContentType("text/plain;charset=UTF-8");
        response.getWriter().write(status.getMessage() == null ? status.getState().toString() : status.getState() + ": " + status.getMessage());
    }
}
```

Once the Reveal server fails, `/health` answers 503.
