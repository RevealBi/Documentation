import Export from './_configuring-server-java-export.md';

# Spring Boot と Jersey サーバーの構成

## インストール

以下の手順では、既存の Spring Boot と Jersey プロジェクトに Reveal SDKをインストールする方法を説明します。

1 - **pom.xml** ファイルを更新します。

まず、Reveal Maven リポジトリを追加します。

```xml title="pom.xml"
<repositories>
    <repository>
        <id>reveal.public</id>
        <url>https://maven.revealbi.io/repository/public</url>
    </repository>	
</repositories>
```

次に、Reveal SDK を依存関係として追加します。

```xml title="pom.xml"
<dependency>
    <groupId>com.infragistics.reveal.sdk</groupId>
    <artifactId>reveal-sdk</artifactId>
    <version>1.3.0</version>
</dependency>
```

2 - Jersey Config クラスを作成し、`RevealEngineInitializer.initialize` メソッドを呼び出して Reveal SDK を初期化します。Reveal SDK を Jersey で正しく動作させるためには、Reveal SDK の全クラスを Jersey に登録する必要があります。Reveal SDK のクラスを登録するには、`RevealEngineInitializer.getClassesToRegister` メソッドによって返されるクラスをループして、Jersey Config にそれらを登録します。

```java title="RevealJerseyConfig.java"
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

import com.infragistics.reveal.engine.init.RevealEngineInitializer;

import javax.ws.rs.ApplicationPath;

@Component
@ApplicationPath("/")
public class RevealJerseyConfig extends ResourceConfig 
{
    public RevealJerseyConfig()
    {
        RevealEngineInitializer.initialize();
        
        //register all Reveal classes in JAX-RS context
        for (Class<?> clazz : RevealEngineInitializer.getClassesToRegister()) {
        	register(clazz);
        }
    }
}
```

## エクスポート

<Export />