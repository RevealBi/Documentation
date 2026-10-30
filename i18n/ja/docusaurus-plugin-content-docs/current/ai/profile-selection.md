---
sidebar_label: プロファイルの選択
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# プロファイルの選択

[プロファイル](providers-overview.md)は、開発者のサーバーが提供するモデルと設定に名前を付けたものです。

既定では、すべてのユーザーがすべてのプロファイルをリクエストできます。開発者がマップしたインテントの呼び出しはマップされたプロファイルを使用し、それ以外の呼び出しはリクエストされたプロファイルを使用します。プロファイルがリクエストされていない場合は既定のプロファイルを使用します。

2 つのフックを使用すると、開発者はこれらの判断をユーザーごとに、通常はユーザーのプランに基づいて行えます。

- **プロファイル オーソライザー** は、ユーザーがリクエストできるプロファイルを決定します。クライアントに表示されるプロファイルの一覧をフィルターし、それ以外のプロファイルへのリクエストを拒否します。
- **プロファイル セレクター** は、クライアントからの指定なしに、ユーザーを処理するプロファイルを決定します。たとえば、エンタープライズ プランのユーザーのダッシュボード生成をプレミアム モデルにルーティングするために使用します。

## ユーザーが使用できるプロファイルを制限する

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

`IAIProfileAuthorizer` を実装し、候補のうちユーザーが使用できるプロファイルを返します。

```csharp title="PlanProfileAuthorizer.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

public sealed class PlanProfileAuthorizer : IAIProfileAuthorizer
{
    private readonly IPlanStore _plans;

    public PlanProfileAuthorizer(IPlanStore plans) => _plans = plans;

    public async ValueTask<IReadOnlyCollection<string>> FilterProfilesAsync(
        IRVUserContext user, IReadOnlyCollection<string> candidateProfiles, CancellationToken cancellationToken)
    {
        var plan = await _plans.GetPlanAsync(user.UserId, cancellationToken);
        return plan switch
        {
            "enterprise" => candidateProfiles,
            "pro" => candidateProfiles.Where(p => p != "premium").ToList(),
            _ => candidateProfiles.Where(p => p == "default").ToList(),
        };
    }
}
```

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    // providers and profiles
    .AddProfileAuthorizer<PlanProfileAuthorizer>();
```

オーソライザーはシングルトンとして登録されます。サポートされるオーソライザーは 1 つだけで、2 つ目を登録すると最初のオーソライザーが置き換えられます。

  </TabItem>

  <TabItem value="node" label="Node.js">

`profileAuthorizer` コールバックを追加し、ユーザーが使用できる名前を返します。

```javascript title="server.js"
revealAI.withOptions({
    // providers, profiles, ...
    callbacks: {
        profileAuthorizer: async ({ user, candidateProfiles }) => {
            const plan = await plans.get(user?.userId);
            if (plan === 'enterprise') return candidateProfiles;
            if (plan === 'pro') return candidateProfiles.filter(p => p !== 'premium');
            return candidateProfiles.filter(p => p === 'default');
        }
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

`"profileAuthorizer"` コールバックを登録します。`{ user, candidateProfiles }` を JSON で受け取り、ユーザーが使用できる名前の JSON 配列を返します。

```java title="Application.java"
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.core.IRevealServer;
import io.revealbi.core.RevealPluginCallback;
import io.revealbi.core.RevealServerBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

ObjectMapper json = new ObjectMapper();

RevealPluginCallback profileAuthorizer = (userContext, message) -> {
    try {
        JsonNode request = json.readTree(message);
        String plan = plans.get(request.path("user").path("userId").asText(null));
        List<String> allowed = new ArrayList<>();
        for (JsonNode profile : request.path("candidateProfiles")) {
            String name = profile.asText();
            if ("enterprise".equals(plan)
                    || ("pro".equals(plan) && !name.equals("premium"))
                    || name.equals("default")) {
                allowed.add(name);
            }
        }
        return CompletableFuture.completedFuture(json.writeValueAsString(allowed));
    } catch (Exception ex) {
        return CompletableFuture.failedFuture(ex);
    }
};

IRevealServer revealServer = new RevealServerBuilder()
        .addPlugin(RevealAIPlugin.withOptions(aiPluginOptions, Map.of(
                "profileAuthorizer", profileAuthorizer)))
        .build();
```

  </TabItem>
</Tabs>

`plans` と `IPlanStore` は、開発者独自のプランのストレージを表します。

オーソライザーは、プロファイルの一覧とリクエストの検証の両方を制御します。

- `GET /api/reveal/ai/profiles` と、クライアント SDK の `client.ai.profiles.list()` は、ユーザーが使用できるプロファイルのみを返します。そのため、モデル ピッカーにはそれらだけが表示されます。
- それ以外のプロファイルへのリクエストは、HTTP 403 とコード `ai.profile_not_allowed` で失敗します。存在しないプロファイルへのリクエストは、HTTP 400 と `ai.profile_not_found` で失敗します。Reveal が別のプロファイルに暗黙的にフォールバックすることはありません。
- 候補には[動的 (BYOK) プロファイル](byok.md)も含まれます。上の無料プランの分岐のように特定の名前だけを残すオーソライザーは、動的プロファイルも非表示にします。
- 開発者のインテント マッピングと既定のプロファイルは開発者自身の判断であるため、オーソライザーはそれらをフィルターしません。オーソライザーが制御するのは、クライアントがリクエストできるものだけです。
- Node.js と Java では、コールバックが例外をスローするか不正な形式の結果を返すと、すべてのプロファイルが拒否されます。候補に含まれていなかった名前は無視されます。

## ユーザーごとにプロファイルをルーティングする

セレクターは ASP.NET で使用できます。`IAIProfileSelector` を実装し、`AIProfileSelection` を返します。通常のルーティングを維持する場合は `null` を返します。

```csharp title="PlanProfileSelector.cs"
using Reveal.Sdk;
using Reveal.Sdk.AI;

public sealed class PlanProfileSelector : IAIProfileSelector
{
    private readonly IPlanStore _plans;

    public PlanProfileSelector(IPlanStore plans) => _plans = plans;

    public async ValueTask<AIProfileSelection?> SelectProfilesAsync(
        IRVUserContext user, CancellationToken cancellationToken)
    {
        var plan = await _plans.GetPlanAsync(user.UserId, cancellationToken);
        return plan switch
        {
            "enterprise" => new AIProfileSelection
            {
                IntentProfiles = new Dictionary<string, string>
                {
                    [Intents.GenerationBuildReport] = "premium",
                    [Intents.WidgetAnalysis] = "premium",
                    [Intents.DashboardAnalysis] = "premium",
                },
            },
            "free" => new AIProfileSelection { DefaultProfile = "mini" },
            _ => null,
        };
    }
}
```

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    // providers, profiles, and intent mappings
    .UseProfileSelector<PlanProfileSelector>();
```

シンプルなセレクターの場合は、代わりにデリゲートを渡します: `UseProfileSelector((user, cancellationToken) => ...)`。サポートされるセレクターは 1 つだけで、2 つ目を登録すると最初のセレクターが置き換えられます。

| プロパティ | 説明 |
|---|---|
| `IntentProfiles` | 特定のインテントのプロファイル。開発者のインテント マッピングや、クライアントがリクエストしたプロファイルよりも優先されます。インテント名は大文字と小文字を区別せずに照合されます。 |
| `DefaultProfile` | ほかに割り当てのない、このユーザーの呼び出しのプロファイル。クライアントがリクエストしたプロファイルが優先されます。 |

Reveal は、各 AI 呼び出しについて、次の順序で最初に該当するプロファイルを使用します。

1. 呼び出しのインテントに対するセレクターの `IntentProfiles` のエントリ。
2. 開発者のインテント マッピング (`MapIntent` または `RevealAI:Intents`)。
3. クライアントがリクエストしたプロファイル。
4. セレクターの `DefaultProfile`。
5. 開発者の既定のプロファイル。

セレクターの動作:

- **ユーザー操作ごとに 1 回実行されます。** チャット メッセージやインサイトなどの操作ごとに実行され、AI 呼び出しごとではないため、1 回のプランの検索で操作内のすべての呼び出しをカバーできます。メタデータの拡充やダッシュボード生成中のデータソースのランク付けなど、Reveal が独自に行うバックグラウンド処理では実行されません。
- **ユーザーの明示的な選択が `DefaultProfile` で上書きされることはありません。** 一部のユーザーにプロファイルをまったく選択させたくない場合は、オーソライザーで除外してください。そうすれば、ユーザーは暗黙的に別のプロファイルにルーティングされるのではなく、明確なエラーを受け取ります。
- **`DefaultProfile` は、`GET /api/reveal/ai/profiles` が報告する既定値を変更しません。** モデル ピッカーが報告された既定値をあらかじめ選択し、すべてのリクエストで送信する場合、それは明示的な選択と見なされ、セレクターの `DefaultProfile` は適用されません。
- **選択するプロファイルは、開発者が定義したプロファイルである必要があります。** オーソライザーはそれらをフィルターしません。不明なプロファイルや[動的 (BYOK) プロファイル](byok.md)を指定すると、操作は失敗します。
- **エラーが発生すると操作は失敗します。** 開発者のプラン ストアが利用できない場合、リクエストは誤ったプランで実行されるのではなく失敗します。
- **クォータゲートと整合させてください。** [クォータゲート](quota-gate.md)は、セレクターが選択したものを含め、各呼び出しが実際に使用したプロファイルを確認します。そのため、両者は同じプラン データを参照する必要があります。

ダッシュボード分析は 2 つのインテントを使用します。計画と最終レポートには `dashboard-analysis` を、各ウィジェットの分析とその要約には `widget-analysis` を使用します。開発者が `widget-analysis` をルーティングする場合は、例のように `dashboard-analysis` も同じようにルーティングしてください。
