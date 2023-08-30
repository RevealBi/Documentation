import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ライセンス キーを追加

When you install the Reveal SDK, a license key must be provided or the SDK will not function. There are two types of license keys
- Trial - obtained when requesting a trial from the [Reveal SDK Website](https://www.revealbi.io/download-sdk)
- Licensed - obtained when the Reveal SDK is purchased and is available in the [customer portal](https://account.infragistics.com/subscriptions)

## キー ファイル
デフォルトでは、Reveal SDK は、ユーザーの「ホーム」ディレクトリの下で `.revealbi-sdk` という名前のフォルダー内の `license.key` というファイルで有効なライセンスを検索します。

「ホーム」ディレクトリは、お使いの OS によって異なります。
- Windows: `C:/Users/your-user-name/`
- Mac: `/Users/your-user-name/`
- Linux: `/home/your-user-name/`

ライセンス キーを受け取ったら、「ホーム」ディレクトリにある `.reveabi-sdk` という名前のディレクトリ内に `license.key` という名前のテキスト ファイルを作成してください。このファイルにライセンス キーをコンテンツとして記載します。

例えば、Windows を使用している場合、ライセンス ファイルの場所は `C:/Users/ユーザー名/.revealbi-sdk/license.key` になります。

## コードで設定

ライセンス キーはアプリケーション コードで指定することもできます。

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