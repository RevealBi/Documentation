---
title: Java のヘルス チェック
description: Java SDK の Reveal サーバーが動作を停止したときにアプリケーションのヘルス チェックで報告し、プラットフォームがアプリケーションを再起動できるようにします。
---

# Java のヘルス チェック

Java SDK は Reveal エンジンを別のプロセスとして実行します。たとえばメモリ不足のためにオペレーティング システムがこのプロセスを終了するなど、プロセスが停止すると Reveal サーバーは失敗します。すべてのリクエストに 503 を返し、エクスポートは失敗し、自動的には回復しません。アプリケーションを再起動すると新しいエンジンが起動するため、アプリケーションのヘルス チェックで障害を報告し、プラットフォームにアプリケーションを再起動させてください。

`IRevealServer.getStatus()` はサーバーの状態 (`RUNNING`、`FAILED`、または `SHUT_DOWN`) を返し、`FAILED` の場合は理由を示すメッセージも返します。`IRevealServer.getTermination()` は、サーバーの実行が停止すると `FAILED` または `SHUT_DOWN` のステータスで完了する `CompletionStage` を返します。

## Spring Boot

1 - **pom.xml** ファイルに Spring Boot Actuator を追加します。

```xml title="pom.xml"
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

2 - サーブレットとヘルス チェックが同じインスタンスを使用するように Reveal サーバーを Bean として宣言し、サーバーの実行が停止したときにログを出力します。Reveal は `/reveal-api/*` などの専用のパスにマップしてください。`/*` にマップすると `/actuator/health` へのリクエストも Reveal が受け取るため、ヘルス チェックが実行されません。

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

コールバックはサーバーを停止したスレッドで実行されます。時間のかかる処理には独自のエグゼキューターを指定して `thenAcceptAsync` を使用し、コールバックがスローする例外を処理してください。処理しない場合、例外は失われます。失敗したサーバーは、その後アプリケーションがシャットダウンしても `FAILED` のままです。

3 - サーバーの実行が停止したときに Reveal サーバーをダウンとして報告するヘルス インジケーターを追加します。

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

Reveal サーバーが失敗すると、`/actuator/health` は 503 を返します。プラットフォームのヘルス チェックがこのエンドポイントを使用するように設定すると、プラットフォームがアプリケーションを再起動します。

## サーブレット コンテナー

Tomcat などのサーブレット コンテナーでは、Reveal サーバーを `ServletContextListener` で保持して `RevealEngineServlet` とヘルス チェック用のサーブレットに渡し、アプリケーションの停止時にシャットダウンします。`RevealEngineServlet` がシャットダウンするのは、自身で構築したサーバーだけです。

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

Reveal サーバーが失敗すると、`/health` は 503 を返します。
