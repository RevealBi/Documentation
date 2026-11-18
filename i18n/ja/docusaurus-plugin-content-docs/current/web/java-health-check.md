---
title: Java のヘルス チェック
description: Java SDK の Reveal サーバーが動作を停止したときにアプリケーションのヘルス チェックで報告し、プラットフォームがアプリケーションを再起動できるようにします。
---

# Java のヘルス チェック

Java SDK は Reveal エンジンを別のプロセスとして実行します。たとえばメモリ不足のためにオペレーティング システムがこのプロセスを終了するなど、プロセスが停止すると Reveal サーバーは失敗します。すべてのリクエストに 503 を返し、エクスポートは失敗し、自動的には回復しません。アプリケーションを再起動すると新しいエンジンが起動するため、アプリケーションのヘルス チェックで障害を報告し、プラットフォームにアプリケーションを再起動させてください。アプリケーションを自動的に再起動するものがない場合は、ヘルス チェックにアラートを設定し、担当者が再起動できるようにしてください。

`IRevealServer.getStatus()` はサーバーの状態 (`RUNNING`、`FAILED`、または `SHUT_DOWN`) を返し、`FAILED` の場合は理由を示すメッセージも返します。`IRevealServer.getTermination()` は、サーバーの実行が停止すると `FAILED` または `SHUT_DOWN` のステータスで完了する `CompletionStage` を返します。`RevealEngineServlet.getRevealServer()` は、サーブレットが使用するサーバーを返します。

## Spring Boot

1 - **pom.xml** ファイルに Spring Boot Actuator を追加します。

```xml title="pom.xml"
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

2 - Actuator を専用のポートで実行します。Reveal を `/*` にマップすると、アプリケーションのポートでは `/actuator/health` へのリクエストも Reveal が受け取るため、ヘルス チェックが実行されません。

```properties title="application.properties"
management.server.port=8081
```

Spring Boot が別のポートを開くのは、組み込みサーバーでアプリケーションを実行する場合だけです。アプリケーションを WAR ファイルとしてサーブレット コンテナーにデプロイする場合は、代わりに Reveal を `/reveal-api/*` などの専用のパスにマップし、クライアントで `RevealSdkSettings.setBaseUrl` に渡す URL に `reveal-api/` を追加してください。

3 - Reveal サーバーを構築する関数を `RevealEngineServlet` に渡し、アプリケーションの停止時にサーブレットがサーバーをシャットダウンするようにします。また、サーバーがアプリケーションと共に起動するように、サーブレットを起動時に読み込むよう設定します。サーバーの実行が停止したときにログを出力するには、`getTermination()` にコールバックを追加します。

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

コールバックはサーバーを停止したスレッドで実行されます。時間のかかる処理には独自のエグゼキューターを指定して `thenAcceptAsync` を使用し、コールバックがスローする例外を処理してください。処理しない場合、例外は失われます。失敗したサーバーは、その後アプリケーションがシャットダウンしても `FAILED` のままです。

4 - サーブレットからサーバーを取得し、サーバーの実行が停止したときにダウンとして報告するヘルス インジケーターを追加します。

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

Reveal サーバーが失敗すると、ポート 8081 の `/actuator/health` は 503 を返します。プラットフォームのヘルス チェックがこのエンドポイントを使用するように設定すると、プラットフォームがアプリケーションを再起動します。

## サーブレット コンテナー

Tomcat などのサーブレット コンテナーでは、Reveal サーバーを構築する関数を `RevealEngineServlet` に渡し、サーブレットを起動時に読み込むよう設定します。これにより、サーバーはアプリケーションと共に起動し、アプリケーションの停止時にサーブレットがサーバーをシャットダウンします。次に、`RevealEngineServlet` からサーバーを取得するヘルス チェック用のサーブレットを登録します。

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

Reveal サーバーが失敗すると、`/health` は 503 を返します。
