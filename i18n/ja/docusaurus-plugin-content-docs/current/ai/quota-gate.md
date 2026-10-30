---
sidebar_label: クォータと課金
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# クォータと課金

Reveal が行うすべての AI 呼び出しは、開発者のプロバイダー アカウントのトークンを消費します。クォータゲートを使用すると、開発者は呼び出しごと、ユーザーごとにその消費を許可するかどうかを判断し、実際にかかったコストを記録できます。プランの利用権、トークン予算、レート制限を適用し、実際の使用量を残高から差し引くために使用します。使用量を制御せずに観測だけしたい場合は、代わりに[使用量の追跡](usage-tracking.md)を使用します。

ゲートは、同じ呼び出しコンテキストを受け取る 2 つの部分で構成されます。

- **チェック** は、トークンが消費される前に実行されます。ユーザーのプランにその機能または[プロファイル](providers-overview.md)が含まれていること、予算が残っていることを確認します。拒否された呼び出しはプロバイダーに届きません。
- **精算** は、呼び出しが完了または失敗した後に、プロバイダーが報告したトークン数とともに実行されます。ここでトークンを残高から差し引くか、チェック時に行った予約を解放します。

どちらの部分も完全なユーザー コンテキストを受け取るため、開発者の `IRVUserContextProvider` が `Properties` に格納したリクエストごとのクレーム (テナント ID、プラン、コスト センター) を、チェック時と課金時に利用できます。

## ゲートの実装

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

`IAIQuotaGate` を実装します。

```csharp
using Reveal.Sdk.AI;

public interface IAIQuotaGate
{
    ValueTask<AIGateDecision> CheckAsync(AICallContext context, CancellationToken cancellationToken);

    // Optional: the default implementation does nothing.
    ValueTask SettleAsync(AICallContext context, AIUsageRecord actual, CancellationToken cancellationToken);
}
```

次のゲートは、プランによってプロファイルを制限し、テナントごとのトークン予算を適用し、実際の使用量を差し引きます。

```csharp title="PlanBillingGate.cs"
using Reveal.Sdk.AI;

public sealed class PlanBillingGate : IAIQuotaGate
{
    private readonly IPlanStore _plans;
    private readonly IUsageStore _usage;

    public PlanBillingGate(IPlanStore plans, IUsageStore usage)
    {
        _plans = plans;
        _usage = usage;
    }

    public async ValueTask<AIGateDecision> CheckAsync(AICallContext context, CancellationToken cancellationToken)
    {
        var tenant = GetClaim(context, "TenantId");
        var plan = await _plans.GetAsync(tenant, context.User.UserId, cancellationToken);

        if (!plan.AllowsProfile(context.Profile))
        {
            return AIGateDecision.Deny(AIDenialReason.NotEntitled,
                "This model isn't included in your plan.");
        }

        if (await _usage.RemainingTokensAsync(tenant, cancellationToken) <= 0)
        {
            return AIGateDecision.Deny(AIDenialReason.QuotaExceeded,
                "You've reached today's AI limit. Upgrade your plan or try again tomorrow.",
                retryAfter: TimeSpan.FromHours(1));
        }

        return AIGateDecision.Allow();
    }

    public ValueTask SettleAsync(AICallContext context, AIUsageRecord actual, CancellationToken cancellationToken)
        => _usage.DebitAsync(
            tenant: GetClaim(context, "TenantId"),
            callId: context.CallId,               // idempotency key
            tokens: actual.TotalTokens ?? 0,      // null when the provider reported no usage
            cancellationToken);

    private static string? GetClaim(AICallContext context, string key)
        => context.User.Properties?.TryGetValue(key, out var value) == true ? value?.ToString() : null;
}
```

`IPlanStore` と `IUsageStore` は、開発者独自のプランと残高のストレージを表します。

  </TabItem>

  <TabItem value="node" label="Node.js">

プラグインの `callbacks` に `quotaGate` と、必要に応じて `quotaSettle` を追加します。リクエストごとのクレームは `context.user.properties` にあります。

```javascript title="server.js"
revealAI.withOptions({
    // providers, profiles, ...
    callbacks: {
        quotaGate: async (context) => {
            const tenant = context.user?.properties?.TenantId;
            const plan = await plans.get(tenant, context.user?.userId);

            if (!plan.allowsProfile(context.profile)) {
                return { allow: false, reason: 'notEntitled', message: "This model isn't included in your plan." };
            }
            if (await usage.remainingTokens(tenant) <= 0) {
                return {
                    allow: false,
                    reason: 'quotaExceeded',
                    message: "You've reached today's AI limit. Upgrade your plan or try again tomorrow.",
                    retryAfterSeconds: 3600
                };
            }
            return { allow: true };
        },

        quotaSettle: async ({ context, usage: actual }) => {
            await usage.debit(context.user?.properties?.TenantId, context.callId, actual.totalTokens ?? 0);
        }
    }
});
```

`plans` と `usage` は、開発者独自のプランと残高のストレージを表します。

  </TabItem>

  <TabItem value="java" label="Java">

`"quotaGate"` に `QuotaGateCallback` を登録し、必要に応じて `"quotaSettle"` にコールバックを登録します。どちらも JSON を受け取り、リクエストごとのクレームは `user.properties` にあります。

```java title="Application.java"
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.revealbi.ai.QuotaGateCallback;
import io.revealbi.ai.RevealAIPlugin;
import io.revealbi.core.IRevealServer;
import io.revealbi.core.RevealPluginCallback;
import io.revealbi.core.RevealServerBuilder;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

ObjectMapper json = new ObjectMapper();

QuotaGateCallback quotaGate = context -> {
    String tenant = context.path("user").path("properties").path("TenantId").asText(null);
    Plan plan = plans.get(tenant, context.path("user").path("userId").asText(null));

    if (!plan.allowsProfile(context.path("profile").asText())) {
        return json.valueToTree(Map.of(
                "allow", false,
                "reason", "notEntitled",
                "message", "This model isn't included in your plan."));
    }
    if (usage.remainingTokens(tenant) <= 0) {
        return json.valueToTree(Map.of(
                "allow", false,
                "reason", "quotaExceeded",
                "message", "You've reached today's AI limit. Upgrade your plan or try again tomorrow.",
                "retryAfterSeconds", 3600));
    }
    return json.valueToTree(Map.of("allow", true));
};

RevealPluginCallback quotaSettle = (userContext, message) -> {
    try {
        JsonNode settlement = json.readTree(message);
        JsonNode context = settlement.path("context");
        usage.debit(
                context.path("user").path("properties").path("TenantId").asText(null),
                context.path("callId").asText(),
                settlement.path("usage").path("totalTokens").asInt(0));
        return CompletableFuture.completedFuture("");
    } catch (Exception ex) {
        return CompletableFuture.failedFuture(ex);
    }
};

IRevealServer revealServer = new RevealServerBuilder()
        .addPlugin(RevealAIPlugin.withOptions(aiPluginOptions, Map.of(
                "quotaGate", quotaGate,
                "quotaSettle", quotaSettle)))
        .build();
```

`plans` と `usage` は、開発者独自のプランと残高のストレージを表します。

  </TabItem>
</Tabs>

## ゲートの登録

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddQuotaGate<PlanBillingGate>();
```

ゲートはシングルトンとして登録されます。実装をスレッド セーフにし、シングルトンとして安全な依存関係のみを挿入してください。サポートされるゲートは 1 つだけで、2 つ目を登録すると最初のゲートが置き換えられます。

  </TabItem>

  <TabItem value="node" label="Node.js">

コールバックは `revealAI.withOptions(...)` に渡したときに登録されます。`quotaSettle` は、`quotaGate` も登録されている場合にのみ呼び出されます。

  </TabItem>

  <TabItem value="java" label="Java">

コールバックは `RevealAIPlugin.withOptions(...)` に渡したときに登録されます。`quotaSettle` は、`quotaGate` も登録されている場合にのみ呼び出されます。

  </TabItem>
</Tabs>

## 呼び出しコンテキスト

チェックと精算は同じコンテキストを受け取ります。Node.js と Java では、プロパティ名はキャメルケース (`operationId`、`callId` など) になり、ユーザーは `{ userId, properties }` オブジェクトになります。

| プロパティ | 説明 |
|---|---|
| `OperationId` | チャットのターンやインサイトなど、1 つの最上位操作の呼び出しをまとめます。操作の間は変わらないため、操作ごとの判断をキャッシュできます。 |
| `CallId` | このプロバイダー呼び出しの一意の ID。精算も同じ ID を受け取るため、差し引き時の冪等キーとして使用します。 |
| `User` | `UserId` と `Properties` のクレームを含むユーザー コンテキスト。 |
| `Intent` | 呼び出しが属するワークフロー (例: `generation-build-report`、`widget-analysis`)。 |
| `Profile` | インテントのルーティング後に呼び出しを処理する[プロファイル](providers-overview.md)。 |
| `Provider` | プロバイダーの登録名。ユーザーが提供した接続の場合はプロバイダーの種類。 |
| `Model` | 呼び出しが使用するモデル (判明している場合)。 |
| `IsSystemCall` | メタデータの拡充やダッシュボード生成中のデータソースのランク付けなど、Reveal がシステム ユーザーとして行うバックグラウンド処理の場合は `true`。 |
| `IsUserConnection` | 開発者が構成した接続ではなく、ユーザーが提供した接続を呼び出しが使用する場合は `true`。 |

ゲートはすべての呼び出しのルーティング後のプロファイルとインテントを確認できるため、開発者は合計使用量だけでなく、特定のプロファイルや機能に価格を付けたり制限したりできます。あるインテントをゲートする場合は、関連するインテントもゲートする必要があります。たとえば、ダッシュボード分析は計画とレポート作成を `dashboard-analysis` で行い、各ウィジェットの分析を `widget-analysis` で行います。そのため、`widget-analysis` をブロックする無料プランは `dashboard-analysis` もブロックする必要があります。

## 判断とクライアント エラー

呼び出しを続行させるには `AIGateDecision.Allow()` を、ブロックするには `AIGateDecision.Deny(reason, message, retryAfter)` を返します。Node.js と Java では、`{ allow: true }` または `{ allow: false, reason, message, retryAfterSeconds }` を返します。

拒否するとリクエストは失敗します。クライアントは、安定した `code` を持ち、`message` を `detail` とする [ProblemDetails](https://www.rfc-editor.org/rfc/rfc9457) 応答を受け取ります。そのため、メッセージはユーザーに表示しても問題のない内容にする必要があります。500 文字を超えるメッセージは切り詰められます。

| 理由 | Node.js / Java の値 | HTTP ステータス | `code` | 再試行の情報 |
|---|---|---|---|---|
| `QuotaExceeded` | `quotaExceeded` | 429 | `ai.quota_exceeded` | 応答本文の `retryAfterSeconds` |
| `RateLimited` | `rateLimited` | 429 | `ai.rate_limited` | `Retry-After` 応答ヘッダー |
| `NotEntitled` | `notEntitled` | 403 | `ai.not_entitled` | — |
| `Other` | `other` | 403 | `ai.denied` | — |

再試行までの時間は秒単位に切り上げられ、最小値は 1 秒です。呼び出しが拒否されたときにストリーミング応答がすでに開始されている場合、ストリームは同じ `code` と `retryAfterSeconds` を持つ `error` イベントで終了します。

クライアント SDK は、これらの応答を `code`、`status`、`retryAfterSeconds` プロパティを持つ `RevealAIError` として公開します。クライアントが受け取る可能性のあるすべてのコードについては、[エラー コード](sdk-error-handling.md#error-codes)を参照してください。

```typescript
import { RevealAIError, AIErrorCodes } from '@revealbi/api';

try {
  await client.ai.chat.sendMessage({ message, datasourceId: 'sales' });
} catch (error) {
  if (error instanceof RevealAIError) {
    switch (error.code) {
      case AIErrorCodes.QuotaExceeded:
      case AIErrorCodes.RateLimited:
        showLimitReached(error.message, error.retryAfterSeconds);
        break;
      case AIErrorCodes.NotEntitled:
        showUpgradePrompt(error.message);
        break;
      default:
        showErrorMessage(error.message);
    }
  }
}
```

## 使用量の精算

精算は、チェックが受け取ったのと同じコンテキストと、実際の使用量を持つ `AIUsageRecord` を受け取ります: `InputTokens`、`OutputTokens`、`TotalTokens`、`ReasoningTokens`、`CachedInputTokens`、`Model`、`Duration`、`Succeeded`、`ErrorCode`。プロバイダーが使用量を報告しなかった場合、トークン数は `null` になり、`0` とは区別されます。`TotalTokens` は `InputTokens` と `OutputTokens` の合計です。Google Gemini は推論トークンを出力とは別に報告するため、Gemini の呼び出しに課金する場合は `ReasoningTokens` を加算してください。レコードにはプロンプトや応答のテキストは含まれません。

- **チェックを通過したすべての呼び出しで実行されます。** 失敗、タイムアウト、キャンセルされた呼び出しも含まれます。そのため、予約ベースの会計で予約が残ったままになることはありません。拒否された呼び出しや、チェック自体が失敗した場合には呼び出されません。
- **リクエスト内で実行されます。** 開発者のストアへのすばやい書き込みや、別途フラッシュする内部キューなど、短時間で処理を終えてください。
- **失敗はログに記録され、伝播しません。** 課金に失敗したからといって、Reveal がすでに処理した呼び出しを失敗させることはありません。課金の書き込みに確実な配信が必要な場合は、ローカルのアウトボックスなどを使って書き込みを永続化してください。
- **各サーバーは自身の呼び出しを精算します。** そのため、複数サーバー構成では、開発者の共有残高ストアだけが一貫している必要があります。

## 知っておくべき動作

- **ユーザーのために行われるすべてのプロバイダー呼び出しがゲートされます。** 1 つのユーザー操作で複数の AI 呼び出しが行われることがあります。たとえば、チャット メッセージはダッシュボードを生成する前にリクエストを分類します。チェックは呼び出しごとに 1 回実行され、どのステップで拒否されても操作全体が失敗します。ダッシュボード生成中のデータソースのランク付けは例外です。Reveal はこれをバックグラウンド処理として実行するため、次のルールに従います。
- **バックグラウンド処理は既定でゲートをバイパスします。** メタデータの拡充やダッシュボード生成中のデータソースのランク付けなど、Reveal が独自に行う呼び出しは、ユーザーではなく開発者の消費であるため、チェックも精算もされません。ASP.NET でこれらも予算に含めるには、`RevealAI:Gate:IncludeSystemCalls` を `true` に設定します。これらの呼び出しは `IsSystemCall` が `true` に設定された状態で届きます。

  ```json title="appsettings.json"
  {
    "RevealAI": {
      "Gate": {
        "IncludeSystemCalls": true
      }
    }
  }
  ```

- **ゲートが失敗すると呼び出しも失敗します。** ASP.NET では、`CheckAsync` がスローした例外は使用量レコードを生成せずにリクエストを失敗させ、クライアントは例外のメッセージを受け取ります。そのため、機密情報をメッセージに含めないでください。`null` の判断は呼び出しを許可します。Node.js と Java では、`quotaGate` コールバックが例外をスローするか、判断を返さないか、不正な形式の判断を返すと、呼び出しは `ai.denied` で拒否されます。壊れたゲートが開いたままになることはありません。
