import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ライセンス キーの追加

デフォルトでは、Reveal SDK をインストールすると、**trial** 製品のみが使用されます。**licensed** 製品を解除するには、アプリケーションにライセンス キーを追加する必要があります。

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