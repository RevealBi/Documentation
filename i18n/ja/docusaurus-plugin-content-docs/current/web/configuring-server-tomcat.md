import Export from './_configuring-server-java-export.md';

# Tomcat サーバーの構成

## インストール

以下の手順では既存の Tomcat アプリケーションに Reveal SDK をインストールする方法を説明します。

1 - **pom.xml** ファイルを更新してください。

まず Reveal Maven リポジトリを追加します。

```xml title="pom.xml"
<repositories>
    <repository>
        <id>reveal.public</id>
        <url>https://maven.revealbi.io/repository/public</url>
    </repository>	
</repositories>
```

次に Reveal SDK を依存関係として追加します。

```xml title="pom.xml"
<dependency>
    <groupId>com.infragistics.reveal.sdk</groupId>
    <artifactId>reveal-sdk</artifactId>
    <version>1.3.0</version>
</dependency>
```

2 - JAX-RS の依存関係を追加する

Jakarta RESTful Web Services（JAX-RS）実装への依存関係を追加します。Jersey、RESTeasy、Apache CXF など複数の選択肢の中から選ぶことができます。お好みのプロバイダー提供元が説明する手順に従ってください。

例として Jersey 用に追加する必要がある依存関係を以下に示します:

```xml
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

3 - ServletContextListener クラスを作成し `RevealEngineInitializer.initialize` メソッドを呼び出して Reveal SDKを初期化します。

```java
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import com.infragistics.reveal.engine.init.RevealEngineInitializer;

@WebListener
public class RevealServletContextListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent ctx) {
		
	}

	@Override
	public void contextInitialized(ServletContextEvent ctx) {
		
		//initialize Reveal
		RevealEngineInitializer.initialize();
	}
}
```

## エクスポート

<Export />