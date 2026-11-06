---
sidebar_label: インテント
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# インテント

Reveal は、実行するすべての AI 呼び出しに**インテント**のタグを付けます。インテントは、ダッシュボードの生成、ビジュアライゼーションの分析、データソースのランク付けなど、その呼び出しが属するワークフローを表します。開発者はインテントを[プロファイル](/ai/providers-overview)にマップして、そのワークフローを特定のモデルで実行できます。たとえば、ダッシュボードの生成は大きなモデルで実行し、短いバックグラウンド ステップは高速で安価なモデルで実行できます。

インテントは Reveal によって固定されています。開発者が新しいインテントを定義することはできませんが、各インテントをどのプロファイルで実行するかを指定できます。

## インテントの値 {#intent-values}

定数は `Reveal.Sdk.AI` 名前空間の `Intents` クラスにあります。Node.js と Java では文字列値を使用します。

| インテント | 定数 | 実行される処理 |
|---|---|---|
| `default` | `Intents.Default` | 会話形式の回答と確認の質問: ダッシュボードの作成、編集、分析を求めないチャット メッセージ。 |
| `intent-classifier` | `Intents.IntentClassifier` | チャット メッセージが何を求めているかの判定。[`intent`](#the-chat-intent-field) を設定していない各チャット メッセージで実行されます。 |
| `generation-build-report` | `Intents.GenerationBuildReport` | 新しいダッシュボードの生成。データソースのランク付けを除き、生成のすべてのステップがこのインテントで実行されます。 |
| `generation-edit-existing-report` | `Intents.GenerationEditExistingReport` | 既存のダッシュボードの編集。 |
| `generation-add-widget-filters` | `Intents.GenerationAddWidgetFilters` | ダッシュボードのビジュアライゼーションへのフィルターの追加。 |
| `generation-add-global-filters` | `Intents.GenerationAddGlobalFilters` | ダッシュボード フィルターの追加。 |
| `widget-adjustment-global-filters` | `Intents.WidgetAdjustmentGlobalFilters` | ビジュアライゼーションが使用するダッシュボード フィルターの調整。 |
| `widget-analysis` | `Intents.WidgetAnalysis` | チャットまたは[インサイト](/ai/insights)からのビジュアライゼーションの分析。ダッシュボード分析でも、各ビジュアライゼーションの分析とその結果の要約はこのインテントで実行されます。 |
| `dashboard-analysis` | `Intents.DashboardAnalysis` | チャット、またはビジュアライゼーションを指定しないインサイトからのダッシュボード全体の分析: 分析するビジュアライゼーションの計画と最終レポートの作成。 |
| `datasource-ranker` | `Intents.DatasourceRanker` | 新しいダッシュボードのリクエストに回答できるデータソースのランク付け。バックグラウンド処理として実行されます。[データソースのランク付けを高速なプロファイルに設定する](#setting-datasources-ranking-to-a-fast-profile)を参照してください。 |
| `datasource-evaluate` | `Intents.DatasourceEvaluate` | 単一のデータソースがリクエストに回答できるかどうかの確認。チャット エンドポイントとインサイト エンドポイントはこの呼び出しを行いません。 |
| `metadata-semantic-enrichment` | `Intents.MetadataSemanticEnrichment` | セマンティック拡充が有効な場合に、バックグラウンドで行うデータソース メタデータの説明 ([データの取り扱い](/ai/data-handling#optional-metadata-enrichment)を参照)。 |

:::note `default` インテントと既定のプロファイル
`default` インテントは、会話形式の回答のためのワークフローです。これは[既定のプロファイル](/ai/providers-overview)とは異なります。既定のプロファイルは、クライアントがプロファイルをリクエストしない場合に、マップされていないすべてのインテントを処理します。`default` インテントをプロファイルにマップすると、そのプロファイルに移動するのは会話形式の回答だけです。
:::

:::caution `widget-analysis` と `dashboard-analysis`
以前のバージョンでは、ダッシュボード分析の計画と最終レポートは `widget-analysis` で実行されていました。`widget-analysis` をマップするアプリケーションは `dashboard-analysis` もマップする必要があります。マップしない場合、これらの呼び出しはリクエストされたプロファイルまたは既定のプロファイルを使用します。ASP.NET サーバーは、`widget-analysis` がマップされていて `dashboard-analysis` がマップされていない場合、起動時に警告をログに記録します。
:::

## インテントをプロファイルにマップする {#mapping-intents-to-profiles}

インテントは、開発者が定義したプロファイルにマップします。各 AI 呼び出しは、次の順序でプロファイルを選択します。

1. 呼び出しのインテントにマップされたプロファイル。
2. クライアントがリクエストしたプロファイル。
3. [既定のプロファイル](/ai/providers-overview)。

マップされていないインテントは、リクエストされたプロファイルを使用し、クライアントがプロファイルをリクエストしない場合は既定のプロファイルを使用します。データソースのランク付けやメタデータ拡充などのバックグラウンド処理には、リクエストされたプロファイルがありません。そのため、インテントがマップされていない限り、既定のプロファイルで実行されます。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

`MapIntent` を使用します:

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI()
    .AddAnthropic()
    .AddProfile("default", p => { p.Provider = "openai"; p.Model = "gpt-4.1-mini"; })
    .AddProfile("dashboard-generation", p => { p.Provider = "anthropic"; p.Model = "claude-sonnet-4-5"; })
    .SetDefaultProfile("default")
    .MapIntent(Intents.GenerationBuildReport, "dashboard-generation")
    .MapIntent(Intents.GenerationEditExistingReport, "dashboard-generation");
```

または、インテント値をキーとする `RevealAI:Intents` 構成セクションを使用します:

```json title="appsettings.json"
{
  "RevealAI": {
    "Intents": {
      "generation-build-report": "dashboard-generation",
      "generation-edit-existing-report": "dashboard-generation"
    }
  }
}
```

コードと構成で同じインテントをマップした場合は、`MapIntent` の呼び出しが優先されます。

  </TabItem>

  <TabItem value="node" label="Node.js">

インテント値をキーとする `intents` オプションを使用します:

```javascript title="server.js"
revealAI.withOptions({
    providers: {
        openai: { type: 'OpenAI', apiKey: process.env.OPENAI_API_KEY },
        anthropic: { type: 'Anthropic', apiKey: process.env.ANTHROPIC_API_KEY }
    },
    profiles: {
        default: { provider: 'openai', model: 'gpt-4.1-mini' },
        'dashboard-generation': { provider: 'anthropic', model: 'claude-sonnet-4-5' }
    },
    defaultProfile: 'default',
    intents: {
        'generation-build-report': 'dashboard-generation',
        'generation-edit-existing-report': 'dashboard-generation'
    }
});
```

インテント マッピングには `providers` オプションと `profiles` オプションが必要です。`intents` を使用すると、[サーバー SDK のインストール](/ai/install-server-sdk)で示されている `defaultProvider` オプションと `settings` オプションは無視されます。

  </TabItem>

  <TabItem value="java" label="Java">

オプション ビルダーの `mapIntent` を使用します:

```java title="Application.java"
RevealAIPluginOptions aiPluginOptions = RevealAIPluginOptions.builder()
        .addProvider("openai", Map.of("type", "OpenAI", "apiKey", System.getenv("OPENAI_API_KEY")))
        .addProvider("anthropic", Map.of("type", "Anthropic", "apiKey", System.getenv("ANTHROPIC_API_KEY")))
        .addProfile("default", Map.of("provider", "openai", "model", "gpt-4.1-mini"))
        .addProfile("dashboard-generation", Map.of("provider", "anthropic", "model", "claude-sonnet-4-5"))
        .defaultProfile("default")
        .mapIntent("generation-build-report", "dashboard-generation")
        .mapIntent("generation-edit-existing-report", "dashboard-generation")
        .build();
```

インテント マッピングには `addProvider` オプションと `addProfile` オプションが必要です。`mapIntent` を使用すると、[サーバー SDK のインストール](/ai/install-server-sdk)で示されている `defaultProvider` オプションと `settings` オプションは無視されます。

  </TabItem>
</Tabs>

サーバーは起動時にマッピングを確認します:

- 定義されていないプロファイルへのマッピングは起動時に失敗し、エラーには定義済みのプロファイルが一覧表示されます。
- インテントを[動的 (BYOK) プロファイル](/ai/byok)にマップすることはできません。動的プロファイルはユーザーごとに解決され、クライアントからのみリクエストできます。
- キーが上記のインテントのいずれでもないマッピングは、警告をログに記録します。このマッピングはどの呼び出しにも一致しません。

インテント マッピングは開発者の判断です。[プロファイル オーソライザー](/ai/profile-selection)はマッピングをフィルターしません。また、マッピングは自分の接続を使用するユーザーにも適用されます。マップされたインテントは引き続き開発者のモデルで実行されます。

## インテントが使用されるその他の場所 {#where-else-the-intent-appears}

すべての AI 呼び出しはインテントを保持しているため、開発者はルーティング以外でもワークフローを区別できます:

- **[使用量の追跡](/ai/usage-tracking)** と **[オブザーバビリティ](/ai/observability)**: 各使用量レコードには `Intent` があり、ログとメトリクスでもインテントが報告されます。そのため、トークンの使用量をワークフローごとに分類できます。
- **[クォータ ゲート](/ai/quota-gate)**: ゲートはすべての呼び出しのインテントを受け取るため、プランで特定のワークフローを許可または制限できます。
- **[カスタム プロバイダー](/ai/providers-building-custom)**: `AIRequest.Intent` は、呼び出しを送信したワークフローをプロバイダーに伝えます。この時点でルーティングはすでに完了しています。従来の `SendPromptAsync` を実装しているプロバイダーは、`generationbuildreport` のような以前の表記の値を受け取ります。

これらのいずれかで `widget-analysis` を確認するアプリケーションは、`dashboard-analysis` も確認する必要があります。

## チャットの `intent` フィールド {#the-chat-intent-field}

[チャット エンドポイント](/ai/chat)もインテント名を使用します。チャット リクエストで `intent` を設定すると、AI にメッセージを分類させる代わりに特定の操作を実行できます。応答の `intent` は、実行された操作を報告します。使用できる値と、応答での報告方法については、[チャット エンドポイント](/ai/chat)を参照してください。

## データソースのランク付けを高速なプロファイルに設定する {#setting-datasources-ranking-to-a-fast-profile}

ダッシュボードのリクエストでデータソースが指定されておらず、ユーザーが複数のデータソースを利用できる場合、Reveal はダッシュボードを生成する前に、リクエストに回答できるデータソースをランク付けします。ランク付けには独自のインテント `Intents.DatasourceRanker` (`datasource-ranker`) があり、クライアントがリクエストしたプロファイルではなく既定のプロファイルで実行されます。データソースが多い場合は最大 3 回のモデル呼び出しが連続して行われ、多くの場合、リクエストの中で最も時間のかかる部分になります。

高速化するには、このインテントを高速で低レイテンシのプロファイルにマップします:

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    // ...
    .AddProfile("fast", p => { p.Provider = "openai"; p.Model = "gpt-4.1-mini"; })
    .MapIntent(Intents.DatasourceRanker, "fast");
```

または構成で設定します:

```json title="appsettings.json"
{
  "RevealAI": {
    "Intents": {
      "datasource-ranker": "fast"
    }
  }
}
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript title="server.js"
revealAI.withOptions({
    // providers, ...
    profiles: {
        // ...
        fast: { provider: 'openai', model: 'gpt-4.1-mini' }
    },
    intents: {
        'datasource-ranker': 'fast'
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java title="Application.java"
RevealAIPluginOptions aiPluginOptions = RevealAIPluginOptions.builder()
        // ...
        .addProfile("fast", Map.of("provider", "openai", "model", "gpt-4.1-mini"))
        .mapIntent("datasource-ranker", "fast")
        .build();
```

  </TabItem>
</Tabs>

ランカーのモデルは、ダッシュボードが読み取るデータソースに影響します。また、明確なランク付けの結果はデータソースを直接選択します。小さなモデルは高速ですが、大きなモデルに比べてランク付けの信頼性が低くなります。切り替える前に、ユーザーが実際に尋ねる質問でテストしてください。

## 互換性 {#compatibility}

`Intents` は以前 `AIIntents` という名前でした。`AIIntents` は同じ値で引き続き動作しますが、非推奨です。コンパイラは警告 (CS0618) を出し、`Intents` を使用するよう示します。
