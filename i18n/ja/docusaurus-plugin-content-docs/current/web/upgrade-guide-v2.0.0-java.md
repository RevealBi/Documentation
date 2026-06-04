import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Java プロジェクトを Reveal SDK 2.0 へ移行する

このガイドでは、`com.infragistics.reveal.sdk:reveal-sdk` 1.x を使用している Spring Boot + Jersey プロジェクトを、サーブレット ベースの `io.revealbi:reveal-sdk-servlet` 2.0 パッケージへ移行する方法を説明します。プレーンなサーブレット コンテナーでも SDK の変更点は同じで、異なるのはアプリケーションの起動方法だけです。

:::info
Java 向け Reveal SDK 2.0 には **Java 17 以降** と Jakarta EE 9 準拠サーバーが必要です。
:::

## 変更点

| Reveal SDK 1.x | Reveal SDK 2.0 |
|-----|-----|
| `com.infragistics.reveal.sdk:reveal-sdk` Java 専用エンジン | `io.revealbi:reveal-sdk-servlet` ネイティブ `RevealEnginePrg` サイドカーを使う Java プロキシ |
| `RevealEngineInitializer.getClassesToRegister()` を使う Jersey JAX-RS 登録 | 通常のサーブレットと同様に `RevealEngineServlet` を 1 つ登録 |
| `com.infragistics.reveal.sdk.api.*` パッケージ | `io.revealbi.core.*` および `io.revealbi.core.data.*` パッケージ |
| Jersey リクエスト コンテキスト向け `RVContainerRequestAwareUserContextProvider` | サーブレット リクエスト コンテキスト向け `IRVServletUserContextProvider` |
| Java 11 以降 | Java 17 以降 |
| Java プロセス内エンジン | Java プロキシがネイティブ Reveal エンジンを子プロセスとして起動 |

## 移行手順

1. Maven 依存関係と Java バージョンを更新します。
2. Jersey 登録を `RevealEngineServlet` に置き換えます。
3. Jersey のユーザー コンテキスト プロバイダーを `IRVServletUserContextProvider` に置き換えます。
4. JAX-RS の CORS フィルターとカスタム リソースをサーブレット フィルターまたは Spring MVC に変換します。
5. プロバイダーの import を更新し、削除された API オーバーロードを取り除きます。
6. アプリケーションをビルドし、実際の Reveal JavaScript クライアント経由でテストします。

## ステップ 1 - Maven 依存関係を更新する

1.x の SDK 依存関係を 2.0 のサーブレット パッケージに置き換えます。

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

アプリケーションに Reveal 以外の Jersey コードが残っていない限り、`spring-boot-starter-jersey` と `provided` スコープの `spring-boot-starter-tomcat` 依存関係は削除してください。`spring-boot-starter-web` は維持します。

Reveal Maven リポジトリを追加します。

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

Maven の Java バージョンを `17` 以降に更新します。

```xml title="pom.xml"
<properties>
    <java.version>17</java.version>
</properties>
```

## ステップ 2 - Jersey ブートストラップを `RevealEngineServlet` に置き換える

Reveal を初期化して Reveal の JAX-RS クラスを登録していた Jersey `ResourceConfig` を削除し、代わりに Spring Boot アプリケーションから `RevealEngineServlet` を登録します。

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
`setAsyncSupported(true)` は必須です。サーブレットは `RevealEnginePrg` へリクエストを転送する際に `request.startAsync()` を使用します。
:::

### サーブレットのマウント パスを選ぶ

| パターン | 使用する場面 | クライアント base URL |
|---|---|---|
| Reveal を `/*` にマウント | サーバーが Reveal SDK エンドポイントのみを提供する | `http://host:port/` |
| Reveal を `/reveal-api/*` のようなサブパスにマウント | サーバーがルートで Spring MVC コントローラーや静的ファイルも提供する | `http://host:port/reveal-api/` |
| Reveal を内部パスでマウントし、ルートの未一致リクエストをそこへルーティング | クライアントの base URL をルートのままにしたいが、サーバーは Reveal 以外のエンドポイントも公開する | `http://host:port/` |

サーブレット仕様では、リクエスト パスは 1 つのサーブレットにのみルーティングされます。Reveal を `/*` にマウントすると、`/` にマップされた Spring MVC コントローラーと静的リソース ハンドラーはそのリクエストを受け取れません。

内部ルーティング パターンでは、Reveal を `/__reveal__/*` のようなプライベート パスにマウントし、未一致リクエストを内部 Reveal パスへ転送する Spring `OncePerRequestFilter` を追加します。

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

ルーティング フィルターの登録時にも async サポートを有効にします。`GET /` で `index.html` を返す場合は、Spring のビュー コントローラーを追加します。

```java
registry.addViewController("/").setViewName("forward:/index.html");
```

## ステップ 3 - ユーザー コンテキストを更新する

`RVContainerRequestAwareUserContextProvider` は Jersey 専用であり、現在は使用できません。生の `HttpServletRequest` を受け取る `io.revealbi.servlet.IRVServletUserContextProvider` を使用します。

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

ユーザー コンテキスト プロバイダーは `RevealEngineServlet` コンストラクターの第 2 引数として渡します。ラムダを渡すこともできます。

```java
new RevealEngineServlet(server, request -> new RVUserContext("anonymous", propertiesFor(request)));
```

## ステップ 4 - CORS をサーブレット フィルターに変換する

Jersey の `ContainerRequestFilter` と `ContainerResponseFilter` は Reveal SDK リクエストには適用されません。CORS の処理は `jakarta.servlet.Filter` に変換してください。

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

Spring Boot では、`@Component` のサーブレット フィルターはすべての URL に自動登録されます。

## ステップ 5 - プロバイダーの import を更新する

`com.infragistics.reveal.sdk.api.*` の import はすべて `io.revealbi.core.*` または `io.revealbi.core.data.*` に移動します。クラス名の多くはそのままです。

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

同梱のファイルシステム ダッシュボード プロバイダーは `io.revealbi.core.RVDashboardProvider` になりました。コンストラクターには **絶対パス** が必要です。相対パスを渡すと `IllegalArgumentException` が発生します。

```java
new RVDashboardProvider(Paths.get("Dashboards").toAbsolutePath().toString())
```

## ステップ 6 - 削除された API を取り除く

以下の API は Reveal SDK 2.0 では利用できません。

- `IRVRestUrlResolver`
- `IRVDashboardAuthorizationProvider`
- `IRVAuthenticationResolver`
- `IRVObjectEncoder`
- `RVContainerRequestAwareUserContextProvider`
- `IRVObjectFilter.filter(IRVUserContext, RVDashboardDataSource)` オーバーロード

`IRVObjectFilter` は、データ ソース アイテム向けオーバーロードのみ残します。

```java title="ObjectFilter.java"
@Component
public class ObjectFilter implements IRVObjectFilter {
    @Override
    public boolean filter(IRVUserContext userContext, RVDataSourceItem item) {
        ...
    }
}
```

## ステップ 7 - JAX-RS コントローラーを Spring MVC に変換する

Jersey 構成で Reveal と一緒にカスタム リソースを登録していた場合、それらを Spring MVC コントローラーへ変換します。

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

JAX-RS の `ContainerRequestContext.getHeaderString()` は `HttpServletRequest.getHeader()` に置き換えます。JAX-RS インターセプターはサーブレット フィルターまたは Spring の `HandlerInterceptor` 実装へ変換してください。

## ステップ 8 - 移行を確認する

アプリケーション起動後、ログにはコールバック サーバーと Spring Boot アプリケーションが表示されるはずです。

```text
... org.eclipse.jetty.server.Server : Started oejs.Server@...{...0.0.0.0:<callback-port>}
... TomcatWebServer : Tomcat started on port <your-port>
... Started <YourApp> in N seconds
```

`RevealEnginePrg.exe`（macOS/Linux ではネイティブ バイナリ）は最初の Reveal リクエスト時に遅延起動されます。Windows では `%TEMP%/revealbi-logs/reveal-engine.log` にエンジン ログを書き込みます。

最初のアクセス成功時、エンジン ログには次のような内容が出力されます。

```text
INFO|Reveal.Sdk.Global|License read from file.
INFO|Microsoft.AspNetCore.Hosting.Diagnostics|Request starting HTTP/1.1 GET http://127.0.0.1:<engine-port>/dashboards/...
```

JavaScript クライアントで `RevealSdkSettings.setBaseUrl` をサーブレットのマウント先に向け、ダッシュボードをロードして配線を確認してください。`/dashboards/{id}/exists` のような 1.x の旧 URL を疎通確認に使わないでください。

## よくある落とし穴

| 症状 | 原因と対処 |
|---|---|
| Spring MVC コントローラーや静的ファイルが応答しなくなる | Reveal を `/*` にマウントしているためです。サブパスにマウントするか、Spring MVC をサブパスへ移動するか、内部ルーティング フィルターを追加してください。 |
| ルーティング フィルターで転送後にリクエストがハングする | フィルター、内部 Reveal サーブレット、ディスパッチ タイプのすべてで async サポートが必要です。フィルターとサーブレットで `setAsyncSupported(true)` を設定し、`shouldNotFilterAsyncDispatch()` で `false` を返してください。 |
| 起動時に `AutowiredAnnotationBeanPostProcessor` のトレースで失敗する | 必須の `@Value("${SOMETHING}")` プロパティが不足しています。プロパティを追加するか、`${SOMETHING:fallback}` のような既定値を設定してください。 |
| 初回リクエストで `Connection timed out` が出る | ネイティブ エンジンの起動が完了していません。再試行し、継続する場合はエンジン ログを確認してください。 |
| macOS arm64 で 403 や署名エラーが出る | `codesign -s - <path-to-RevealEnginePrg>` でネイティブ バイナリに一度 ad-hoc 署名してください。 |
| 誤ったネイティブ バイナリがパッケージされる | ビルド環境と異なる OS/アーキテクチャ向けにパッケージする場合、`-P linux-x86_64` のように対象 Maven プロファイルを指定してください。 |
| シャットダウン後も `RevealEnginePrg` が残る | Java 親プロセスが子プロセスを終了するのは、`mvn spring-boot:run` での Ctrl+C や Spring `ContextClosedEvent` のような正常終了時のみです。 |
| ログ出力が変わった | Java SDK は SLF4J を使用します。ネイティブ エンジンは SLF4J 設定ではなく専用ログ ファイルへ出力します。 |

## 参考サンプル

- [Spring Boot getting started sample](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/server/spring-boot)
- [SQL Server Java server sample](https://github.com/RevealBi/sdk-samples-sqlserver/tree/main/server/java)
