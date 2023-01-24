# システム要件

## ASP.NET
- ASP.NET Core 3.1 またはそれ以降

## Java
- Java SDK 11.0.10 およびそれ以降
- Maven 3.6.3 およびそれ以降

## Node
- Nodejs 16.3 およびそれ以降

:::info ARM Unsupported

現在、ARM デバイスはサポートされていません。ただし、Rosetta がインストールされた Mac M1 (ARM) を実行している場合は、次の回避策を使用できます。
1. 次のように、必ず --ignore-scripts パラメーターを指定して reveal-sdk-node をインストールしてください: `npm i -P reveal-sdk-node --ignore-scripts`
2. [RevealEngine バイナリ](https://dl.infragistics.com/reveal/Builds/sdk/node-binaries/v0.6.0/osx-x64/RevealEnginePrg.gz)をダウンロードします。
3. ダウンロードしたファイルからバイナリを解凍し、開発フォルダー内のいずれかの場所に配置します。
4. `_internal_revealEnginePrgPath` パラメーターと共に Reveal を起動します。`RevealEnginePrg` へ正しいパスを必ず指定してください。 
```ts
const revealOptions: RevealOptions = {
    _internal_revealEnginePrgPath: './RevealEnginePrg'
};
app.use('/', reveal(revealOptions));
```

Mac でバイナリのダウンロードが制限されている場合は、**[設定] -> [プライバシー]** に移動し、バイナリを許可します。

:::