---
sidebar_label: モデルの選択
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# モデルの選択

Reveal SDK AI は、[サポートされているプロバイダー](providers-overview.md)とそれぞれが提供するモデルで動作します。モデルの選択は、ユーザーに提供する AI 機能の品質、速度、コストを左右する最も大きな要因です。このページでは、Reveal が継続的に実施しているベンチマークに基づいて、フラッグシップのクラウドモデルとセルフホスト型のローカルモデルという具体的な推奨事項を示します。

## モデルに求められる処理

Reveal はモデルに対して、性質が大きく異なる 2 種類の処理を求めます。一方が得意なモデルが、もう一方も得意であるとは限りません。

- **ダッシュボード生成** — [Chat](sdk-chat.md) エンドポイントは、自然言語のリクエスト（「2023 年の地域別売上を見せて」など）をダッシュボードに変換します。これはより難しいタスクです。モデルは、実在するテーブルやフィールドを参照し、適切なチャートタイプを適用し、フィルターやルールを守った、厳密に構造化された JSON を出力する必要があります。わずかな書式の誤りでも結果全体が失敗します。
- **データインサイト** — [Insights](sdk-insights.md) エンドポイントは、ビジュアライゼーションの背後にあるデータを分析し、要約、統計分析（相関、傾向、平均・標準偏差）、予測を生成します。出力形式はより単純ですが、推論はより自由度が高くなります。

## 推奨フラッグシップモデル

**GPT-4.1（OpenAI）を使用してください。** 両方のワークロードで最もバランスの取れた性能を発揮し、ダッシュボード生成を確実に処理しながら高速性を維持します。さらに、これは SDK のデフォルトモデルでもあるため、採用にあたって追加の設定は必要ありません。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = builder.Configuration["RevealAI:OpenAI:ApiKey"];
        options.Model = "gpt-4.1";
    });
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript title="server.js"
revealAI.withOptions({
    defaultProvider: 'openai',
    settings: {
        openai: {
            ApiKey: process.env.OPENAI_API_KEY,
            Model: 'gpt-4.1'
        }
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java title="Application.java"
Map<String, Object> aiSettings = Map.of(
        "openai", Map.of(
                "ApiKey", System.getenv("OPENAI_API_KEY"),
                "Model", "gpt-4.1"));
```

  </TabItem>
</Tabs>

設定オプションの詳細については、[OpenAI プロバイダー](providers-openai.md)を参照してください。

### 有力な代替モデル

別のプロバイダーを希望する場合や、独自のワークロードで品質とコストを比較したい場合は、次のモデルもフラッグシップと同等かそれに近い性能を発揮します。

- **Claude Sonnet 4.5 / Claude Opus**（[Anthropic](providers-anthropic.md)）— 品質面で GPT-4.1 に匹敵します。特に Sonnet 4.5 は品質とコストのバランスに優れています。データインサイトでは、レイテンシーがやや高くなる傾向があります。
- **Gemini 2.5 Pro / Gemini 3 Pro**（[Google Gemini](providers-google-gemini.md)）— 両方のワークロードに対応でき、すでに Google Cloud を利用している場合に適しています。

:::tip 推論モデルが常に優れているとは限りません
これらの構造化されたタスクにおいて、専用の「推論」モデルは GPT-4.1 よりも**低速で信頼性が低い**傾向があり、必ずしも高性能ではありません。回答までに非常に長い時間がかかり、特にデータインサイトではタイムアウトが発生しやすくなります。まずは高速な非推論のフラッグシップモデルを検討してください。
:::

## 推奨ローカルモデル

データを自社のインフラ内に保持する必要がある場合や、トークン単位の API コストを回避したい場合は、モデルをローカルで実行し、[カスタムエンドポイント](providers-custom-endpoints.md)を通じて OpenAI プロバイダーをそこに向けることができます。

**Gemma 4 26B（`gemma-4-26b-a4b-it`）を使用してください。** ローカルホスト型モデルの中で、両方のワークロードにわたって総合的に最も高い精度を発揮し、高性能なワークステーションで実行できる程度に小型です（64 GB の Apple Silicon マシンで検証済み）。

より高速な応答とより少ないメモリ使用量を求める場合は、**GPT-OSS 20B** が有力な次点です。明らかに高速ですが、データインサイトでは Gemma 4 26B に一歩及びません。

いずれのモデルも、[Ollama](https://ollama.ai)、[LM Studio](https://lmstudio.ai)、[vLLM](https://github.com/vllm-project/vllm) など、OpenAI 互換 API を公開するサーバーで実行し、`Endpoint` と `Model` オプションを設定してください。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```csharp title="Program.cs"
builder.Services.AddRevealAI()
    .AddOpenAI(options =>
    {
        options.ApiKey = "ollama";                        // ローカルサーバーはキーを無視します
        options.Endpoint = "http://localhost:11434/v1";
        options.Model = "gemma-4-26b-a4b-it";
    });
```

  </TabItem>

  <TabItem value="node" label="Node.js">

```javascript title="server.js"
revealAI.withOptions({
    defaultProvider: 'openai',
    settings: {
        openai: {
            ApiKey: 'ollama',                             // ローカルサーバーはキーを無視します
            Endpoint: 'http://localhost:11434/v1',
            Model: 'gemma-4-26b-a4b-it'
        }
    }
});
```

  </TabItem>

  <TabItem value="java" label="Java">

```java title="Application.java"
Map<String, Object> aiSettings = Map.of(
        "openai", Map.of(
                "ApiKey", "ollama",                       // ローカルサーバーはキーを無視します
                "Endpoint", "http://localhost:11434/v1",
                "Model", "gemma-4-26b-a4b-it"));
```

  </TabItem>
</Tabs>

:::note ローカルモデルとダッシュボード生成
ローカルモデルは、データインサイトや単純なダッシュボード生成には適しています。ただし、複雑な複数ウィジェットのダッシュボードについては、最も高性能なクラウドモデルの方が依然として明らかに信頼性が高いため、完全なローカル構成に踏み切る前に独自のプロンプトで検証してください。「思考型」／推論型のローカルモデルは避けてください。必要な JSON スキーマを守るのが苦手で、控えめなハードウェアでは低速です。
:::

## ベンチマークの概要

上記の推奨事項は、Reveal が継続的に実施しているベンチマークに基づいています。各モデルは、Northwind サンプルデータベースを用いた 2 つの 10 タスクのスイート（1 つはダッシュボード生成用、もう 1 つはデータインサイト用）を実行します。タスクは難易度が段階的に上がり、独立した LLM ジャッジによって採点されます。スコアは、モデルが 10 タスクのうちいくつを**確実に**処理できたか（大半の試行で正しい結果を返したか）を 10 点満点で示したものです。**DNF** はスイートが完走しなかったこと（モデルが序盤のタスクで失敗し、実行が中止されたこと）を意味します。

テストしたすべてのモデルの全結果を以下に示します。現在お使いのモデルを見つけて、比較してみてください。重視するワークロードでスコアが低い場合、上記で推奨したモデルはそのまま置き換えられます。

### クラウドモデル

| モデル | プロバイダー | ダッシュボード生成 | データインサイト |
|-------|----------|:--------------------:|:-------------:|
| **GPT-4.1**（推奨） | OpenAI | 10 | 9 |
| GPT-5.4 | OpenAI | 6 | 10 |
| GPT-5.4 mini | OpenAI | 6 | 9 |
| GPT-5.4 nano | OpenAI | 6 | 6 |
| GPT-5.3 Codex | OpenAI | 7 | 9 |
| GPT-5.2 | OpenAI | 8 | 9 |
| GPT-5.1 | OpenAI | 8 | 8 |
| GPT-5 | OpenAI | 6 | 6 |
| Claude Opus 4.6 | Anthropic | 9 | 10 |
| Claude Opus 4.5 | Anthropic | 8 | 8 |
| Claude Opus 4.1 | Anthropic | 10 | 4 |
| Claude Sonnet 4.6 | Anthropic | 6 | 10 |
| Claude Sonnet 4.5 | Anthropic | 9 | 9 |
| Gemini 3.1 Pro | Google | 8 | 9 |
| Gemini 3 Pro | Google | 7 | 9 |
| Gemini 3 Flash | Google | 6 | 7 |
| Gemini 3.1 Flash Lite | Google | 4 | 7 |
| Gemini 2.5 Pro | Google | 6 | 8 |
| Gemini 2.5 Flash | Google | 5 | 6 |
| Mercury 2 | Inception Labs | 4 | 5 |

新しいバージョンやプレビュー版のモデルは、早期アクセスの条件下で測定された場合があり、そのスコアは現在の一般提供（GA）版の挙動を反映していない可能性があります。レイテンシーも大きく異なります。推論志向のモデル（GPT-5.x の一部や、思考が有効なときの Claude Opus / Sonnet）は、特にデータインサイトで回答が大幅に遅くなりますが、それに見合った信頼性の向上はありません。

### オープンウェイトモデル

これらのモデルは、[カスタムエンドポイント](providers-custom-endpoints.md)の設定を使用して、セルフホストするか、ホスト型推論プロバイダー経由でアクセスできます。

| モデル | ダッシュボード生成 | データインサイト | メモ |
|-------|:--------------------:|:-------------:|-------|
| **Gemma 4 26B**（推奨） | 7 | 8 | オープンウェイトで総合的に最高精度 |
| GPT-OSS 20B | 6 | 6 | 最速。メモリ使用量が少ない |
| GPT-OSS 120B | 5 | 8 | 大型。データインサイトに強い |
| Kimi K2 Instruct | 1 | 9 | インサイトに優れるが生成は弱い |
| Qwen3 32B | 6 | 2 | 生成はまずまず、インサイトは弱い |
| Llama 4 Maverick 17B | 3 | 6 | |
| Llama 3.3 70B | 1 | 6 | |
| Gemma 3 12B | 2 | 4 | 最小。難しいタスクには不向き |
| Qwen3.5 35B-A3B | 3 | DNF | インサイトスイートが完走せず |
| Nemotron 3 Nano 30B | 0 | 3 | 推論モデル。スキーマ遵守が不十分 |
| Gemma 3 27B | DNF | — | 生成スイートが完走せず |
| Llama 3 70B | DNF | — | 生成スイートが完走せず |

オープンウェイトモデルのスコアは、量子化、ホスト、サンプリング設定に大きく左右されます。固定的な数値ではなく、適切に構成された実行における目安として扱ってください。上記の結果は、ワークステーションクラスのハードウェアまたはホスト型推論プロバイダー上で、4 ビット〜8 ビットの量子化を使用したものです。

:::info 状況は常に変化します
モデルの品質は、プロバイダーが新しいバージョンをリリースするたびに変化します。そのため、これらの数値は恒久的なランキングではなく、あくまで一時点のスナップショットとして扱ってください。最適な選択方法は、決定する前に上位の候補を独自のデータとプロンプトで検証することです。
:::
