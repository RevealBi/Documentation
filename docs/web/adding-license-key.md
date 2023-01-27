import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding a License Key

By default, when you install the Reveal SDK only the **trial** product is used. In order to unlock the **licensed** product, you must provide a license key in the application.

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
services.AddMvc().AddReveal(builder => 
{
    builder.AddSettings(settings =>
    {
        settings.License = "LICENSE_KEY";
    });
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
RevealEngineInitializer.initialize(new InitializeParameterBuilder().
    setLicense("LICENSE_KEY").
    build());
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```ts
const revealOptions: RevealOptions = {
	license: "LICENSE_KEY",
};
app.use("/", reveal(revealOptions));
```

  </TabItem>
</Tabs>