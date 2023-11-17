import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Adding a License Key

When you install the Reveal SDK, a license key must be provided or the SDK will not function. There are two types of license keys
- Trial - obtained when requesting a trial from the [Reveal SDK Website](https://www.revealbi.io/download-sdk)
- Licensed - obtained when the Reveal SDK is purchased and is available in the [customer portal](https://account.infragistics.com/subscriptions)

## Key File
By default, the Reveal SDK will look for a valid license in a file called `license.key` within a folder named `.revealbi-sdk` in the user's "Home" directory.

The "Home" directory differs depending on the OS you are using.
- Windows: `C:/Users/your-user-name/`
- Mac: `/Users/your-user-name/`
- Linux: `/home/your-user-name/`

When you receive your license key, create a text file named `license.key` within a directory named `.reveabi-sdk` located in your "Home" directory. Populate this file with your license key as its content.

For example; if using Windows the license file location should be located at `C:/Users/your-user-name/.revealbi-sdk/license.key`.

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

```js
const revealOptions = {
	license: "LICENSE_KEY",
};
app.use("/", reveal(revealOptions));
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const revealOptions: RevealOptions = {
	license: "LICENSE_KEY",
};
app.use("/", reveal(revealOptions));
```

  </TabItem>
</Tabs>