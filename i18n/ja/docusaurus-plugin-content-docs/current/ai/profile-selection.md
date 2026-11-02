---
sidebar_label: プロファイルの選択
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# プロファイルの選択

[プロファイル](providers-overview.md)は、開発者のサーバーが提供するモデルと設定に名前を付けたものです。

既定では、すべてのユーザーがすべてのプロファイルをリクエストできます。開発者がマップしたインテントの呼び出しはマップされたプロファイルを使用し、それ以外の呼び出しはリクエストされたプロファイルを使用します。プロファイルがリクエストされていない場合は既定のプロファイルを使用します。

**プロファイル オーソライザー** を使用すると、開発者は各ユーザーがリクエストできるプロファイルを、通常はユーザーのプランに基づいて決定できます。クライアントに表示されるプロファイルの一覧をフィルターし、それ以外のプロファイルへのリクエストを拒否します。

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

    public async ValueTask<IReadOnlyCollection<string>> GetAuthorizedProfilesAsync(
        IRVUserContext user, IReadOnlyCollection<string> candidateProfiles, CancellationToken cancellationToken)
    {
        // Retrieve the plan from custom storage
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
            // Retrieve the plan from custom storage
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
        // Retrieve the plan from custom storage
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

オーソライザーは、プロファイルの一覧とリクエストの検証の両方を制御します。

- `GET /api/reveal/ai/profiles` と、クライアント SDK の `client.ai.profiles.list()` は、ユーザーが使用できるプロファイルのみを返します。そのため、モデル ピッカーにはそれらだけが表示されます。
- それ以外のプロファイルへのリクエストは、HTTP 403 とコード `ai.profile_not_allowed` で失敗します。存在しないプロファイルへのリクエストは、HTTP 400 と `ai.profile_not_found` で失敗します。Reveal が別のプロファイルに暗黙的にフォールバックすることはありません。
- 候補には[動的 (BYOK) プロファイル](byok.md)も含まれます。上の無料プランの分岐のように特定の名前だけを残すオーソライザーは、動的プロファイルも非表示にします。
- 開発者のインテント マッピングと既定のプロファイルは開発者自身の判断であるため、オーソライザーはそれらをフィルターしません。オーソライザーが制御するのは、クライアントがリクエストできるものだけです。
- Node.js と Java では、コールバックが例外をスローするか不正な形式の結果を返すと、すべてのプロファイルが拒否されます。候補に含まれていなかった名前は無視されます。
