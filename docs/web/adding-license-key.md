import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding a License Key

When you install the Reveal SDK, a license key must be provided or the SDK will not function. There are two types of license keys
- Trial - obtained when requesting a trial from the [Reveal SDK Website](https://www.revealbi.io/download-sdk)
- Licensed - obtained when the Reveal SDK is purchased

## Key File
By default, the Reveal SDK will look for a valid license in a file called `license.key` in the user's "Home" directory.

The "Home" directory differs depending on the OS you are using.
- Windows: `C:/Users/user-name/.revealbi-sdk`
- Mac: `/Users/user-name/.revealbi-sdk`
- Linux: `/home/user-name/.revealbi-sdk`

When you receive your license key, create a text file called `license.key` in your "Home" directory and set your key as the contents of this file.

## Set In Code

The license key can also be provide in the application code.

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