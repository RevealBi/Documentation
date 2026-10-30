---
sidebar_label: 動的プロファイル (BYOK)
sidebar_custom_props:
  status: preview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 動的プロファイル (BYOK)

動的プロファイルを使用すると、各ユーザーが独自のキーを持ち込み (BYOK)、自分のプロバイダー アカウントで、自分の API キーとモデルを使って AI 機能を実行できます。

Reveal はユーザーのキーを保存しません。動的プロファイルを提供するには、開発者が次のものを用意する必要があります。

1. ユーザーがプロバイダーとモデルを選択し、API キーを入力する画面。
2. それらの接続情報を保存するストレージ。Reveal 自体はこれらを保存しません。
3. Reveal から要求されたときに、ユーザーの接続情報を取得して返すリゾルバー。

これにより、動的プロファイルは、ほかのプロファイルと同様にクライアントがリクエストできる[プロファイル](providers-overview.md)になり、その接続情報はリゾルバーから取得されます。接続を持つユーザーのプロファイル一覧にのみ表示されるため、モデル ピッカーに「自分のキーを使用」のような選択肢として自然に組み込めます。

## プロファイルとリゾルバーの宣言

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

`IAIConnectionResolver` を実装します。リクエストされたプロファイルに対するユーザーの接続を返し、ユーザーが接続を設定していない場合は `null` を返します。

```csharp title="UserConnectionResolver.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

public sealed class UserConnectionResolver : IAIConnectionResolver
{
    private readonly IUserSettingsStore _settings;

    public UserConnectionResolver(IUserSettingsStore settings) => _settings = settings;

    public async ValueTask<AIConnectionDescriptor?> ResolveAsync(
        string profileName, IRVUserContext user, CancellationToken cancellationToken)
    {
        // Retrieve details from custom storage
        var connection = await _settings.GetAIConnectionAsync(user.UserId, profileName, cancellationToken);
        if (connection is null)
        {
            return null;
        }

        return new AIConnectionDescriptor
        {
            ProviderType = connection.ProviderType,   // for example, "openai"
            Model = connection.Model,
            ApiKey = connection.DecryptedApiKey,
        };
    }
}
```

1 回の呼び出しで動的プロファイルを宣言し、リゾルバーを登録します。

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddProfile("default", p => { p.Provider = "openai"; p.Model = "gpt-4.1"; })
    .AddDynamicProfile<UserConnectionResolver>("my-ai", displayName: "Use my own key");
```

`displayName` と `description` は省略可能で、モデル ピッカーに表示される内容です。プロファイル名はクライアントが送信する識別子です。

動的プロファイルは既定のプロファイルにできないため、上の `default` プロファイルのように、少なくとも 1 つの静的プロファイルを宣言してください。ユーザーが接続できるのは、[サーバーで利用可能なプロバイダーの種類](#available-provider-types)だけです。

  </TabItem>

  <TabItem value="node" label="Node.js">

`dynamicProfiles` に動的プロファイルの名前を列挙し、`connectionResolver` コールバックを追加します。リクエストされたプロファイルに対するユーザーの接続を返し、ユーザーが接続を設定していない場合は `null` を返します。

```javascript title="server.js"
revealAI.withOptions({
    providers: {
        openai: { type: 'OpenAI', apiKey: process.env.OPENAI_API_KEY }
    },
    profiles: {
        default: { provider: 'openai', model: 'gpt-4.1' }
    },
    dynamicProfiles: ['my-ai'],
    callbacks: {
        connectionResolver: async ({ profileName, user }) => {
            // Retrieve details from custom storage
            const connection = await userSettings.getAIConnection(user?.userId, profileName);
            if (!connection) return null;
            return {
                providerType: connection.providerType,    // for example, 'openai'
                model: connection.model,
                apiKey: connection.decryptedApiKey
            };
        }
    }
});
```

動的プロファイルには、ここで示した `providers` と `profiles` オプションが必要です。`dynamicProfiles` を使用すると、[AI サーバー SDK のインストール](install-server-sdk.md)で示している `defaultProvider` と `settings` オプションは無視されます。Node.js では動的プロファイルに表示名や説明を設定できないため、モデル ピッカーにはプロファイル名が表示されます。

  </TabItem>

  <TabItem value="java" label="Java">

`addDynamicProfile` で動的プロファイルを宣言し、`"connectionResolver"` コールバックを登録します。`{ profileName, user }` を JSON で受け取り、そのプロファイルに対するユーザーの接続を返し、ユーザーが接続を設定していない場合は `null` を返します。

```java title="Application.java"
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.ai.RevealAIPluginOptions;
import io.revealbi.core.IRevealServer;
import io.revealbi.core.RevealPluginCallback;
import io.revealbi.core.RevealServerBuilder;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

ObjectMapper json = new ObjectMapper();

RevealAIPluginOptions aiPluginOptions = RevealAIPluginOptions.builder()
        .metadataCatalogFile("config/catalog.json")
        .addProvider("openai", Map.of("type", "OpenAI", "apiKey", System.getenv("OPENAI_API_KEY")))
        .addProfile("default", Map.of("provider", "openai", "model", "gpt-4.1"))
        .addDynamicProfile("my-ai")
        .build();

RevealPluginCallback connectionResolver = (userContext, message) -> {
    try {
        JsonNode request = json.readTree(message);
        // Retrieve details from custom storage
        UserConnection connection = userSettings.getAIConnection(
                request.path("user").path("userId").asText(null),
                request.path("profileName").asText());
        if (connection == null) {
            return CompletableFuture.completedFuture("null");
        }
        return CompletableFuture.completedFuture(json.writeValueAsString(Map.of(
                "providerType", connection.providerType(),    // for example, "openai"
                "model", connection.model(),
                "apiKey", connection.decryptedApiKey())));
    } catch (Exception ex) {
        return CompletableFuture.failedFuture(ex);
    }
};

IRevealServer revealServer = new RevealServerBuilder()
        .addPlugin(RevealAIPlugin.withOptions(aiPluginOptions, Map.of(
                "connectionResolver", connectionResolver)))
        .build();
```

動的プロファイルには、ここで示した `addProvider` と `addProfile` オプションが必要です。`addDynamicProfile` を使用すると、[AI サーバー SDK のインストール](install-server-sdk.md)で示している `defaultProvider` と `settings` オプションは無視されます。Java では動的プロファイルに表示名や説明を設定できないため、モデル ピッカーにはプロファイル名が表示されます。

  </TabItem>
</Tabs>

`IUserSettingsStore`、`userSettings`、`UserConnection` は、開発者独自のユーザー接続のストレージを表します。

## 接続

| プロパティ | 必須 | 説明 |
|---|---|---|
| `ProviderType` | はい | 接続先のプロバイダー: `openai`、`azure-openai`、`anthropic`、`openai-compatible`。Google Gemini は動的プロファイルでは使用できません。プロバイダーの種類は[サーバーで利用可能](#available-provider-types)である必要があります。 |
| `Model` | はい | モデル ID。Azure OpenAI の場合はデプロイ名。 |
| `ApiKey` | はい (`openai-compatible` を除く) | ユーザーの API キー。指定しない場合、リクエストは `ai.connection_invalid` で失敗します。 |
| `Endpoint` | いいえ | カスタム エンドポイントの URL。`azure-openai` と `openai-compatible` では必須です。開発者がカスタム エンドポイントを許可しない限り拒否されます。 |
| `Settings` | いいえ | このユーザーの呼び出しの生成設定 (`Temperature`、`MaxOutputTokens` など)。 |

Reveal は接続からプロバイダー クライアントを作成し、最大 15 分間再利用します。新しい API キーなど、いずれかの値が異なる接続には、すぐに新しいクライアントが作成されます。

## 利用可能なプロバイダーの種類 {#available-provider-types}

ユーザーが接続できるのは、開発者のサーバーが登録したプロバイダーの種類だけです。また、プロバイダーの種類を登録するには、そのプロバイダーに対する開発者自身の完全な接続が必要です。Reveal は起動時に登録済みのすべてのプロバイダーを作成し、API キーなど必須の値が接続に欠けていると起動に失敗します。たとえば、ユーザーに Anthropic のキーを持ち込ませるには、サーバー自体にも Anthropic の接続が必要です。

| プロバイダーの種類 | ASP.NET | Node.js と Java |
|---|---|---|
| `openai` | `AddOpenAI()` | `type: 'OpenAI'` の `providers` エントリ |
| `azure-openai` | `AddAzureOpenAI()` | `type: 'AzureOpenAI'` の `providers` エントリ |
| `anthropic` | `AddAnthropic()` | `type: 'Anthropic'` の `providers` エントリ |
| `openai-compatible` | `BaseUrl` を指定した `AddOpenAICompatible("<name>")` | `type: 'OpenAICompatible'` の `providers` エントリ |

Java では `addProvider` でエントリを追加します。各登録は、API キーなどの接続情報を構成 (ASP.NET では `RevealAI:Providers:<name>`) または `providers` エントリのオプションから読み取ります。

## セキュリティ

接続はユーザーから提供されるため、Reveal は次の制約を適用します。

- **カスタム エンドポイントは既定で拒否されます。** これにより、ユーザーが開発者のサーバーから任意の URL にリクエストを送信させることを防ぎます。Azure OpenAI と OpenAI 互換の接続には常にエンドポイントが必要なため、カスタム エンドポイントが許可されるまでユーザーはこれらに接続できません。許可するには、`RevealAI:DynamicProfiles:AllowCustomEndpoints` を `true` に設定します。この設定はすべてのプロバイダーの種類に適用されます。有効にすると、Azure OpenAI や OpenAI 互換の接続だけでなく、すべての接続でユーザーが任意のエンドポイントを設定できるようになります。
- **開発者は、ユーザーが接続できるプロバイダーの種類を制限できます。** `RevealAI:DynamicProfiles:AllowedProviderTypes` を使用します。既定では、開発者のサーバーが登録したすべてのプロバイダーの種類が許可されます。

```json title="appsettings.json"
{
  "RevealAI": {
    "DynamicProfiles": {
      "AllowedProviderTypes": [ "openai", "anthropic" ],
      "AllowCustomEndpoints": false,
      "CacheTtl": "00:15:00"
    }
  }
}
```

`CacheTtl` は、ユーザーの接続から作成したプロバイダー クライアントを再利用する期間を設定します。

これらの設定は ASP.NET でのみ使用できます。Node.js と Java では既定値が適用されます。カスタム エンドポイントは常に拒否されるため `azure-openai` と `openai-compatible` の接続は使用できず、開発者のサーバーが登録したすべてのプロバイダーの種類が許可され、プロバイダー クライアントは 15 分間再利用されます。

API キーがログに記録されたり、そのままキャッシュ キーとして使用されたりすることはありません。

## 動的プロファイルの動作

- **接続を持たないユーザーにはプロファイルが表示されません。** リゾルバーは、プロファイル一覧が要求されたときと、リクエストがそのプロファイルを使用するときに実行されます。`null` を返した場合、そのユーザーにはプロファイルが表示されず、そのプロファイルへのリクエストは HTTP 403 とコード `ai.profile_not_allowed` で失敗します。
- **無効な接続はリクエストを失敗させます。** モデルの欠落、許可または登録されていないプロバイダーの種類、開発者が許可していないカスタム エンドポイント、または ASP.NET でのリゾルバーの例外は、ユーザーのリクエストを HTTP 400 とコード `ai.connection_invalid` で失敗させます。プロファイル一覧の取得時にリゾルバーが例外をスローした場合は、代わりにプロファイルが非表示になります。
- **Reveal が開発者自身のキーにフォールバックすることはありません。** 失効などの理由でプロバイダーがユーザーのキーを拒否した場合、呼び出しはほかのプロバイダー エラーと同様に失敗します。
- **開発者のインテント マッピングは引き続き適用されます。** 開発者が `MapIntent` または[プロファイル セレクター](profile-selection.md)で固定したインテントは開発者のモデルで実行され、それ以外はユーザーの接続で実行されます。
- **開発者のほかのフックも引き続き適用されます。** [プロファイル オーソライザー](profile-selection.md)は候補として動的プロファイルを受け取り、非表示にできます。また、ユーザーの接続での呼び出しは、`IsUserConnection` が `true` に設定された状態で[クォータゲート](quota-gate.md)と[使用量の追跡](usage-tracking.md)に届きます。たとえば、自分のキーを使うユーザーへのトークン課金をスキップするために使用します。
- **プロファイル セレクターは動的プロファイルを選択できません。** ユーザー自身のキーで実行するかどうかは、常にユーザーの明示的な選択です。
- **データソースのランク付けは開発者のモデルで実行されます。** ダッシュボード生成中、Reveal はデータソースのランク付けをバックグラウンド処理として、開発者の既定のプロファイル、または `datasource-ranker` インテントにマップされたプロファイルで実行します。これは自分のキーを使うユーザーの場合も同様です。
- Node.js と Java では、リゾルバー コールバックが例外をスローするか不正な形式の結果を返すと `null` として扱われ、警告がログに記録されます。この場合プロファイルは非表示になり、そのプロファイルへのリクエストは HTTP 403 と `ai.profile_not_allowed` で失敗します。

## 複数の動的プロファイル

各動的プロファイルはユーザーが選択できる選択肢であるため、ほとんどのアプリケーションに必要なのは 1 つだけです。

- **モデルがユーザーのプランによって異なる場合** は、動的プロファイルを 1 つ使用し、リゾルバーから異なる `Model` を返します。
- **ユーザーが自分の複数の接続から選択する場合** (高速な接続とプレミアムな接続など) は、選択肢ごとに動的プロファイルを 1 つ宣言します。1 つのリゾルバーがすべてを処理し、プロファイル名を受け取ります。ユーザーのプランに含まれないプロファイルには `null` を返します。

ASP.NET では、最初のプロファイルでリゾルバーを登録し、残りはリゾルバーなしで宣言します。静的な既定のプロファイルは引き続き必要です。

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddProfile("default", p => { p.Provider = "openai"; p.Model = "gpt-4.1"; })
    .AddDynamicProfile<UserConnectionResolver>("my-fast", "My key (fast)")
    .AddDynamicProfile("my-premium", "My key (premium)");
```

Node.js と Java では、`dynamicProfiles` にすべての名前を列挙するか、名前ごとに `addDynamicProfile` を呼び出します。
