import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# キャッシュ

Reveal SDK のキャッシュは、クエリされたすべてのデータを、キャッシュと呼ばれる高速な組み込みデータベースに保存することでパフォーマンスを最適化するように設計されたデフォルトの仕組みです。このプロセスにより、頻繁にアクセスされるデータがすぐに利用できるようになり、クエリの開始時に、要求されたデータがすでにキャッシュに存在するかどうかが SDK によって自動的にチェックされます。キャッシュ ヒットの場合、SDK は元のソースへの追加リクエストを必要とせずに、情報を迅速に取得します。

## キャッシュの仕組み
データを要求すると、Reveal は、該当するデータ ソース、資格情報、クエリの情報が一致し、設定された更新頻度の条件を満たす場合に、キャッシュされた結果を再利用できます。結果を再利用できるかどうかの判断に使用される情報は、データ ソースと資格情報の種類によって異なります。ユーザー固有のデータに関するガイダンスについては、[よくある質問](#よくある質問)を参照してください。

フィルターや並べ替え順序などのクエリ オプションを変更すると、その操作には新しい結果が必要になる場合がありますが、他のキャッシュされた結果は再利用できる場合があります。たとえば、Excel ファイルのデータの並べ替え順序を変更しても、必ずしもファイルを再度ダウンロードする必要はありません。

### 処理パイプライン
処理パイプラインは、データがシステムで処理される一連のステージを示します。処理パイプラインを理解することは、キャッシュがどこでどのように動作するかを識別するために重要であり、データ取得の最適化と全体的な処理効率の向上に重要な役割を果たします。

```mermaid
graph LR;
    A[Download Resource]-->B[Create Dataset]-->C[Calculate Fields]-->D[Filter]-->E[Pivot Table Build]-->F[Post Pivot - Calculate Fields]-->G[Post Pivot - Filter];
```

<br/>

- `[Download Resource]` ステージは、通常、CSV/Json/Excel ファイルをダウンロードするリソースベースのデータ ソースを使用する場合にのみ適用されます。
- 要求されたデータによっては、一部のステージがスキップされたり、変更が加えられなかったりする場合があります。たとえば、処理するピボット後の計算フィールドがないか、データ ソースに送信されるクエリにすべてのフィルターが含まれている場合は、`[Filter]` ステップが不要になる可能性があります。
- SSAS データ ソースは別の処理パイプラインを使用するため、これらのステージは SSAS データ ソースには適用されません。

### キャッシュ ファイル
デフォルトでは、キャッシュ ファイルは現在のユーザーの一時ディレクトリ内の `RevealCache_XXXX` という名前のフォルダーに保存されます。`XXXX` はインスタンスを識別する番号です。`CachePath` と `DataCachePath` という 2 つの構成プロパティを使用して、このデフォルトの動作をオーバーライドできます。

```cs
builder.Services
    .AddControllers()
    .AddReveal(revealSetupBuilder =>
    {
        revealSetupBuilder.AddSettings(settings =>
        {
            settings.CachePath = "your-cache-path";
            settings.DataCachePath = "your-data-cache-path";
        });
    });
```

- `CachePath` は、残りのキャッシュ ファイル (ダウンロード ファイルなど) が保存されるディレクトリを指します。デフォルトでは、システムの一時ディレクトリにある `RevealCache_XXXX` という名前のディレクトリになります。
- `DataCachePath` は、ファイル キャッシュ データが保存されるディレクトリを指します。デフォルトは `CachePath` です。

追加のプロパティを構成して、キャッシュ サイズを制御できます。

```cs
builder.Services.AddControllers().AddReveal(revealSetupBuilder =>
{
    revealSetupBuilder.AddSettings(settings =>
    {
        settings.MaxStorageCells = 10000000;
        settings.MaxDownloadSize = 209715200;
        settings.MaxStringCellSize = 256;
        settings.MaxTotalStringsSize = 64000000;
    });
});
```

- `MaxStorageCells` は、任意のデータ ソースから処理されるセルの予想される最大サイズを指します。エンジンは、キャッシュにディスク領域を使いすぎないようにします。この設定は、キャッシュ管理のヒントを提供します。デフォルトは 1000 万セルです。
- `MaxDownloadSize` は、1 回のダウンロード (CSV ファイルなど) の最大サイズをバイト単位で表します。デフォルトは 200 MB です。
- `MaxStringCellSize` は、データセット列の文字列が持つことができる文字数の制限を指します。デフォルトは 256 です。
- `MaxTotalStringsSize` は、すべてのセルの文字の総数として指定された、ピボット テーブルまたはグリッドの予想される最大サイズを指します。この設定によりメモリ管理のヒントを提供し、エンジンによるメモリの過多な使用を避けます。デフォルトは 6400 万です。

### キャッシュの種類
**Download (ダウンロード)** - `[Download Resource]` ステージで使用されるこのキャッシュは、CSV/Excel/Json ファイルからデータを読み取るときに、ダウンロードされたリソースを保存します。ファイルシステム キャッシュは `[RevealCache]/download` に保存され、関連するメタデータは `[RevealCache]/download.sqlite` に保存されます。

個々のダウンロードは、`MaxDownloadSize` 設定で指定されたバイト数によって制限されます。ダウンロード キャッシュの全体的なサイズは 5GB に固定されています。現時点ではこの制限を変更するための API が存在しないことに注意してください。

**Dataset (データセット)** - `[Create Dataset]` ステージと `[Calculate Fields]` ステージで使用されます。

Sqlite ファイルは `[RevealCache]/dataset` に保存され、メタデータは `dataset.sqlite` に存在します。

一部のデータセットはメモリ内に生成され、メモリ内のデータセット キャッシュにも保存されます。

個々のデータセットのサイズは、一連のパラメーターによって間接的に制限されます: `MaxStorageCells` および `MaxTotalStringsSize`。データセット キャッシュの合計サイズは 5 GB に固定されています。現時点では、この制限を変更するために使用できる API はありません。

**Tabular Data (表形式のデータ)** - このキャッシュは、すべてのステージを実行した後の結果を保持します。

データは JSON としてシリアル化され、メモリ内キャッシュに一時的に保存されます。

## キャッシュの更新
キャッシュの更新には、精度を維持し、最新の情報を反映するために、キャッシュ内に保存されているデータを更新することが含まれます。デフォルトでは、キャッシュは `1 日に 1 回`更新されるように設定されています。キャッシュ更新の動作は視覚化 UI から変更でき、ユーザーは特定の要件に基づいて更新期間を変更したり、手動更新をトリガーしたりできます。

メニューの更新オプション (3 つの点で示されている) をクリックするだけで、手動更新をトリガーできます。

![](images/cache-refresh.jpg)

データの更新頻度コンボ ボックスから別の値を選択することで、更新頻度を変更できます。このオプションは、データ ソース構成ダイアログで使用できます。

使用できるオプションは以下のとおりです。
- 常に
- 1 時間に 1 回
- 1 日に 1 回
- 週に １ 回

![](images/cache-frequency.jpg)

## キャッシュの無効化
Reveal には、すべてのキャッシュを無効にする単一の設定はありません。視覚化のデータ クエリで最新のデータを要求するには、データ ソースのデータ更新頻度を `[常に]` に設定します。

処理された結果は、引き続きキャッシュに保存される場合があります。更新頻度を高くすると、データ ソースへの負荷が増え、パフォーマンスに影響する可能性があります。

更新頻度はデータの鮮度を制御するものです。[よくある質問](#よくある質問)で説明するサーバー側の認可や資格情報の構成に代わるものではありません。

![](images/cache-disable.jpg)

## Redis Cache

Reveal SDK は、分散キャッシュ プロバイダーとして Redis を使用することをサポートしており、複数のサーバー インスタンス間でのキャッシュ共有を可能にします。これは、アプリケーションの複数のインスタンスが同じキャッシュされたデータにアクセスする必要がある負荷分散環境で特に役立ちます。

:::note

Redis Cache 機能は、表形式のデータに使用されるメモリ内キャッシュを置き換えます。ローカル処理操作では引き続き SQLite キャッシュが使用されます。ローカル処理は、直接クエリできないソースからのデータを取得してローカルで処理する必要がある場合に発生します。これには以下の設定が含まれます。
- ストアド プロシージャ
- REST API
- クロス データ ソース結合を含むデータ ソース項目
- クエリ実行のために元のソースからデータを取得して一時的に保存する必要があるその他のソース

:::

### インストール

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

ASP.NET アプリケーションの場合、Redis Cache のサポートを有効にするには、別の NuGet パッケージをインストールする必要があります。

```bash
dotnet add package Reveal.Sdk.Cache.Redis
```

  </TabItem>
  <TabItem value="node" label="Node.js">

Node.js アプリケーションの場合、Redis Cache はメインの Reveal SDK パッケージに既に含まれています。標準の Reveal SDK セットアップ以外に追加のインストールは必要ありません。

  </TabItem>
  <TabItem value="java" label="Java">

Java アプリケーションの場合、Redis Cache はメインの Reveal SDK パッケージに既に含まれています。標準の Reveal SDK セットアップ以外に追加のインストールは必要ありません。

  </TabItem>
</Tabs>

### 構成

Redis Cache を有効にするには、アプリケーションの初期化時に接続を構成します。

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
builder.AddRedisCache((options) => {
    options.ConnectionString = "localhost:6379";
});
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const revealOptions = {
    ...
    redisOptions: { connectionString: "localhost:6379" }
};
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const revealOptions: RevealOptions = {
    ...
    redisOptions: { connectionString: "localhost:6379" }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
initializeParameterBuilder.enableRedisCache((options) -> {
    options.setConnectionString("localhost:6379");
});
```

  </TabItem>
</Tabs>

### Redis 構成オプション

Redis Cache プロバイダーは、接続と動作をカスタマイズするためのさまざまな構成オプションをサポートしています。

- **ConnectionString** - Redis サーバー接続文字列またはエンドポイント (例: "localhost:6379")。デフォルトは空の文字列です。
- **EndPoints** - Redis クラスターまたは複数の Redis インスタンスに接続するために使用されるエンドポイント URL のリスト。デフォルトは null です。
- **User** - Redis 認証のユーザー名。デフォルトは null です。
- **Password** - Redis 認証のパスワード。デフォルトは null です。
- **UseSsl** - SSL/TLS 暗号化が有効かどうかを示します。デフォルトは false です。
- **DefaultDatabase** - 使用するデフォルトのデータベース番号。デフォルトは 0 です。
- **ClientName** - 識別用のクライアント名。デフォルトは null です。
- **ConnectTimeoutMs** - 接続タイムアウト (ミリ秒単位)。デフォルトは 5000 です。
- **SyncTimeoutMs** - 同期操作のタイムアウト (ミリ秒単位)。デフォルトは 5000 です。
- **AsyncTimeoutMs** - 非同期操作のタイムアウト (ミリ秒単位)。デフォルトは 5000 です。
- **ConnectRetry** - 接続再試行回数。デフォルトは 3 です。
- **KeepAliveSeconds** - キープアライブ間隔 (秒単位)、無効にするには -1。デフォルトは 60 です。
- **AbortOnConnectFail** - 接続失敗時に中止するかどうかを示します。デフォルトは false です。
- **AllowAdmin** - 管理コマンド (FLUSHDB、CONFIG など) が許可されるかどうかを示します。デフォルトは false です。
- **ReconnectRetryPolicy** - 再接続再試行ポリシー: Linear または Exponential。デフォルトは Linear です。
- **RetryDelayMs** - 再試行ポリシーの基本遅延 (ミリ秒単位)。デフォルトは 1000 です。

追加の構成オプションの例:

<Tabs groupId="code" queryString>
  <TabItem value="aspnet" label="ASP.NET" default>

```cs
builder.AddRedisCache((options) => {
    options.ConnectionString = "localhost:6379";
    options.Password = "your-password";
    options.UseSsl = true;
    options.DefaultDatabase = 1;
    options.ConnectTimeoutMs = 10000;
});
```

  </TabItem>

  <TabItem value="node" label="Node.js">    

```js
const revealOptions = {
    ...
    redisOptions: { 
        connectionString: "localhost:6379",
        password: "your-password",
        useSsl: true,
        defaultDatabase: 1,
        connectTimeoutMs: 10000
    }
};
```

  </TabItem>

  <TabItem value="node-ts" label="Node.js - TS">    

```ts
const revealOptions: RevealOptions = {
    ...
    redisOptions: { 
        connectionString: "localhost:6379",
        password: "your-password",
        useSsl: true,
        defaultDatabase: 1,
        connectTimeoutMs: 10000
    }
};
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
initializeParameterBuilder.enableRedisCache((options) -> {
    options.setConnectionString("localhost:6379");
    options.setPassword("your-password");
    options.setUseSsl(true);
    options.setDefaultDatabase(1);
    options.setConnectTimeoutMs(10000);
});
```

  </TabItem>
</Tabs>

## よくある質問

**質問: キャッシュは多くのディスク領域を消費しますか?**

**答:** キャッシュは約 20 GB を使用するように設計されており、必要に応じて古いエントリが自動的に削除されます。現在、このサイズを調整するための公開設定はありません。

**質問: ディスクがいっぱいになってきていますが、Reveal が原因だと思います。** 

**答え:** バグを報告する前に、OS の一時ディレクトリがクリアされていないか確認してください。Reveal やその他のプロセスは、OS が再起動するまで削除されない可能性がある一時ファイルを生成する場合があります。このディレクトリを定期的に管理するために、クリーンアップ処理をスケジュールすることを考慮してください。Reveal は自動的に削除される一時ファイルをいくつか作成します。そのため、最近作成されたファイルは Reveal で進行中の操作の一部である可能性があるため、クリーンアップ処理によって削除されないようにしてください。さらに、Reveal のキャッシュ フォルダーが OS の一時ディレクトリ内に存在する場合、クリーンアップ処理によって削除されることはありません。

**質問: 異なるユーザーのキャッシュ エントリを分離するにはどうすればよいですか?** 

**答え:** Reveal は、パフォーマンスを向上させるために、キャッシュされた結果を共有する場合があります。データがキャッシュから返されるか、データ ソースから取得されるかにかかわらず、アプリケーションは各リクエストで返されるデータへのアクセスを認可する必要があります。サーバー側で以下のプロバイダーを構成してください。

- `IRVUserContextProvider` では、サーバーで検証したユーザーの ID に基づく `UserId` を設定し、現在のユーザーのコンテキストを返します。
- `IRVDataSourceProvider` では、ユーザーのデータ ソースとクエリへのアクセスを制限します。該当する場合は、`Database`、`Table`、`CustomQuery` などのプロパティをユーザーの権限に応じて設定します。アクセス制限をクライアント側のフィルタリングに依存させないでください。
- `IRVAuthenticationProvider` では、現在のユーザーがアクセスを許可されているデータに適した資格情報を返します。

プロバイダーの構成については、[ユーザー コンテキスト](user-context.md)と[認証](authentication.md)を参照してください。

キャッシュの共有は、データ ソース、クエリ、資格情報の種類によって異なります。`IRVUserContext.UserId` の値が異なっていても、すべてのデータ ソースや SDK 機能でキャッシュ エントリが分離されるとは限りません。厳密な分離が必要な環境では、異なるテナントや権限範囲のユーザーを使用して、有効にするデータ ソース機能と編集機能の動作を検証してください。

**質問: `IRVUserContext.UserId` はキャッシュエントリにどのような影響を与えますか?**

**答え:** `IRVUserContext.UserId` は、SDK プロバイダーに対して現在のユーザーを識別します。キャッシュの再利用への影響は、資格情報の種類によって異なります。

`RVHeadersDataSourceCredentials` を使用する場合は、認証されたユーザーと、該当するテナントおよび権限範囲を識別する、一貫した空でない値を `IRVUserContext.UserId` に設定してください。結果を共有してよいリクエスト間では同じ値を維持し、共有してはいけないユーザーや権限範囲には異なる値を使用します。たとえば、異なるテナントのユーザーに対して、各テナント内のユーザー名が同じという理由だけで同じ識別子を使用しないでください。

これらの資格情報を使用する視覚化のデータ クエリでは、ヘッダー、トークン、Cookie の値が異なるだけでは、キャッシュされた結果は分離されません。`UserId` と、該当するデータ ソースおよびクエリの情報が一致すると、これらの資格情報の値が異なっていても、キャッシュされた結果が再利用される場合があります。そのため、アクセス権の異なるユーザー間で識別子を再利用すると、別のユーザー向けのキャッシュされた結果が返される可能性があります。

権限の異なるユーザーに対して、`UserId` を未設定や空の値にしたり、`guest` などの共通の仮の値を使用したりしないでください。アクセス制限をトークンや Cookie の変更に依存させないでください。ユーザーのテナントや権限が変更された場合は、サーバー側の認可を更新し、ヘッダー資格情報に使用する識別子が新しいアクセス範囲を反映していることを確認してください。

**質問: `RVBearerTokenDataSourceCredential.UserId` プロパティはキャッシュ エントリにどのような影響を与えますか?**

**答え:** `RVBearerTokenDataSourceCredential.UserId` は、アクセス トークンに関連付けられたユーザーを識別します。トークンの更新後もキャッシュされた結果を再利用できるように、そのユーザーと権限範囲に対して一貫した空でない値を設定してください。このプロパティは `IRVUserContext.UserId` とは別のものであり、2 つの値は異なる場合があります。

異なるユーザー、テナント、権限範囲を表すトークンに、同じ資格情報の `UserId` を割り当てないでください。この資格情報の `UserId` と、該当するデータ ソースおよびクエリの情報が一致する場合、トークンを変更するだけでは、キャッシュされた結果は分離されません。

`RVHeadersDataSourceCredentials` を使用して認証ヘッダーに Bearer トークンを渡す場合は、上記のヘッダー資格情報に関するガイダンスに従ってください。

**質問: 導入では、Reveal サーバーのインスタンスが複数存在します。どうすればキャッシュを共有できるのでしょうか?**

**答え:** Reveal SDK は、複数のサーバー インスタンス間でキャッシュを共有できる Redis Cache をサポートするようになりました。[Redis Cache](#redis-cache) セクションで説明されているように Redis Cacheを構成すると、すべてのサーバー インスタンスが同じ分散キャッシュにアクセスできるようになります。これは、負荷分散された展開に推奨される方法です。

代替手段として、Redis が利用できない場合、ロード バランサーを設定し、同一グループのユーザーを同じ Reveal サーバー インスタンスにルーティングすることができます。これにより、キャッシュ エントリが特定のインスタンス内に作成され、それらのユーザーからの後続のリクエストは同じインスタンスにヒットし、キャッシュされたデータを効率的に利用できるようになります。
