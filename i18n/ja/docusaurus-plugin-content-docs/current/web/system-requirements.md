# System Requirements

## ASP.NET
- ASP.NET Core 3.1 or higher

## Java
- Java SDK 11.0.10 and higher
- Maven 3.6.3 and higher

## Node
- Nodejs 16.3 and higher

:::info ARM Unsupported

Currently ARM devices are not supported. However, if running a Mac M1 (ARM) with Rosetta installed you can use the following workaround:
1. Make sure you install reveal-sdk-node with the --ignore-scripts parameters, like this:  `npm i -P reveal-sdk-node --ignore-scripts`
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