import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

## System Requirements

### ASP.NET
- ASP.NET Core 3.1 or higher

### Java
- Java SDK 11.0.10 and higher
- Maven 3.6.3 and higher

### Node
- Nodejs 16.3 and higher

:::info ARM Unsupported

Currently ARM devices are not supported. However, if running a Mac M1 (ARM) with Rosetta installed you can use the following workaround:
1. Make sure you install reveal-sdk-node with the --ignore-scripts parameters, like this:  npm i -P reveal-sdk-node --ignore-scripts
2. Download the [RevealEngine binary](https://dl.infragistics.com/reveal/Builds/sdk/node-binaries/v0.6.0/osx-x64/RevealEnginePrg.gz)
3. Extract the binary from the downloaded file, and place it somewhere within the development folder.
4. Start reveal with the `_internal_revealEnginePrgPath` parameter. Be sure to provide the correct path to the `RevealEnginePrg`.  
```ts
const revealOptions: RevealOptions = {
    _internal_revealEnginePrgPath: './RevealEnginePrg'
};
app.use('/', reveal(revealOptions));
```

If Mac restricts downloading the binary, go to **Settings -> Privacy**, and allow the binary.

:::

## Installing the Reveal SDK (Windows)

To install the Reveal SDK, you need to download and execute the Reveal SDK Installer. To achieve this, use the following steps:
1. Download the Reveal SDK Installer from the [Reveal website](https://www.revealbi.io/download-sdk)
2. Fill out the "Try the Reveal SDK" form on the webpage
3. Save the Reveal SDK installer to a known location on your disk

Before extracting the saved Reveal SDK Installer zip file, you should unblock it. Right-click the zip file and select **Properties**. The properties dialog will appear with a checkbox option to unblock the file. Check the **Unblock** option and press **Apply**.

![](images/install-unblock-zip.jpg)

After unblocking the platform installer zip file, follow these steps:
1. Extract the zip to the current location.
2. Find the extracted Reveal SDK Installer EXE file and double click to start it.
3. Select the install location
4. Accept the terms of the license agreement and continue the installation process. (By clicking install you agree)

![](images/install-start.png)

Once the installation is completed, you will be presented the Reveal SDK installer’s finish screen. At this point, feel free to explore the Reveal SDK samples by clicking the "Open SDK Sample" button, read our [documentation](https://help.revealbi.io/), visit our community [blogs](https://www.revealbi.io/blog), or learn a few tips and tricks by watching our [videos](https://www.youtube.com/revealbi).

![](images/install-finish.png)

## What Gets Installed

Once the installation is complete, you should have the following items installed in the local folder **"%public%\Documents\Infragistics\Reveal\SDK\"**:

- The Reveal SDK Binaries (for manual use)
- The Reveal SDK NuGet Packages
- The Reveal SDK Samples

There is also a local NuGet package source automatically added to Visual Studio that points to the Reveal SDK NuGet packages.

![](images/nuget-package-source-local-vs.jpg)

## Adding Your License Key

By default, when you install the Reveal SDK only the **trial** product is used. In order to unlock the **licensed** product, you must provide a license key in the application.

<Tabs groupId="code">
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

