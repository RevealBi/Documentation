import Export from './_configuring-server-java-export.md';

# Configuring a Tomcat Server

## Install

The steps below describe how to install the Reveal SDK into an existing Tomcat application.

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
    <groupId>com.infragistics.reveal.sdk</groupId>
    <artifactId>reveal-sdk</artifactId>
    <version>1.3.0</version>
</dependency>
```

2 - Add a JAX-RS Dependency

Add a dependency to a Jakarta RESTful Web Services (JAX-RS) implementation. You can choose between multiple options like Jersey, RESTeasy, Apache CXF, etc. Please follow the steps described by the provider of your preference.

As an example, here the dependencies you need to add for Jersey:

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

3 - Create a ServletContextListener class and initialize the Reveal SDK by calling the `RevealEngineInitializer.initialize` method.

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

## Export

<Export />