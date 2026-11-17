---
title: Java Health Checks
description: Report in your application's health check when the Reveal server of the Java SDK stops working, so your platform restarts the application.
---

# Java Health Checks

The Java SDK runs the Reveal engine as a separate process. If that process stops, for example because the operating system ends it when memory runs low, the Reveal server fails: it answers every request with 503, exports fail, and it doesn't recover on its own. Restarting the application starts a new engine, so report the failure in the application's health check and let your platform, such as Kubernetes, restart the application.

`IRevealServer.getStatus()` returns the state of the server, `RUNNING`, `FAILED` or `SHUT_DOWN`, and for `FAILED` a message with the reason. `IRevealServer.getTermination()` returns a `CompletionStage` that completes with the `FAILED` or `SHUT_DOWN` status once the server stops running.

## Spring Boot

1 - Add Spring Boot Actuator to the **pom.xml** file.

```xml title="pom.xml"
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

2 - Declare the Reveal server as a bean, so the servlet and the health check use the same instance, and log when the server stops running. Map Reveal on a path of its own, such as `/reveal-api/*`: mapped on `/*`, it also receives `/actuator/health`, and the health check never runs. If you followed [Getting Started](getting-started-spring-boot.md), which maps Reveal on `/*`, change the mapping and add `reveal-api/` to the URL you pass to `RevealSdkSettings.setBaseUrl` in the client.

```java title="Application.java"
private static final Logger log = LoggerFactory.getLogger(Application.class);

@Bean
IRevealServer revealServer() {
    IRevealServer server = new RevealServerBuilder()
        // ...
        .build();
    server.getTermination().thenAccept(status -> log.warn("Reveal server is {}: {}", status.getState(), status.getMessage()));
    return server;
}

@Bean
ServletRegistrationBean<RevealEngineServlet> revealServlet(IRevealServer revealServer) {
    return new ServletRegistrationBean<>(new RevealEngineServlet(revealServer, request -> new RVUserContext("whatever", null)), "/reveal-api/*");
}
```

The callback runs on the thread that stops the server, so use `thenAcceptAsync` with your own executor for slow work, and handle the exceptions it throws, which are otherwise lost. A failed server stays `FAILED` even if the application shuts down afterwards.

3 - Add a health indicator that reports the Reveal server as down once it stops running.

```java title="RevealServerHealthIndicator.java"
@Component
public class RevealServerHealthIndicator implements HealthIndicator {

    private final IRevealServer revealServer;

    public RevealServerHealthIndicator(IRevealServer revealServer) {
        this.revealServer = revealServer;
    }

    @Override
    public Health health() {
        RevealServerStatus status = revealServer.getStatus();
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

Once the Reveal server fails, `/actuator/health` answers 503. Point your platform's health check at it so the platform restarts the application.

If your platform uses the Spring Boot probes, `/actuator/health/liveness` and `/actuator/health/readiness`, enable them and add the health indicator, named `revealServer`, to their groups. The probes don't include other health indicators by default. Your platform restarts the application when the liveness probe fails, and stops sending it traffic when the readiness probe fails.

```properties title="application.properties"
management.endpoint.health.probes.enabled=true
management.endpoint.health.group.liveness.include=livenessState,revealServer
management.endpoint.health.group.readiness.include=readinessState,revealServer
```

## Without Spring Boot

In Tomcat or another servlet container, keep the Reveal server in the `ServletContextListener`, pass it to `RevealEngineServlet` and to a health servlet, and shut it down when the application stops: `RevealEngineServlet` only shuts down a server that it builds itself.

```java title="AppInitializer.java"
@WebListener
public class AppInitializer implements ServletContextListener {

    private IRevealServer revealServer;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        revealServer = new RevealServerBuilder()
            // ...
            .build();

        ServletRegistration.Dynamic reg = sce.getServletContext().addServlet("myServlet", new RevealEngineServlet(revealServer, request -> new RVUserContext("whatever", null)));
        reg.setAsyncSupported(true);
        reg.addMapping("/reveal-api/*");

        sce.getServletContext().addServlet("revealHealth", new RevealServerHealthServlet(revealServer)).addMapping("/health");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        try {
            revealServer.shutdown();
        } catch (Exception e) {
            sce.getServletContext().log("Could not shut down the Reveal server", e);
        }
    }
}
```

```java title="RevealServerHealthServlet.java"
public class RevealServerHealthServlet extends HttpServlet {

    private final IRevealServer revealServer;

    public RevealServerHealthServlet(IRevealServer revealServer) {
        this.revealServer = revealServer;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        RevealServerStatus status = revealServer.getStatus();
        response.setStatus(status.getState() == RevealServerState.RUNNING ? 200 : 503);
        response.setContentType("text/plain;charset=UTF-8");
        response.getWriter().write(status.getMessage() == null ? status.getState().toString() : status.getState() + ": " + status.getMessage());
    }
}
```

Once the Reveal server fails, `/health` answers 503.
