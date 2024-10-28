# NestJS を使用した Reveal SDK サーバーの設定


# NestJS を使用した Reveal SDK の設定

このガイドでは、Reveal SDK を [**NestJS**](https://nestjs.com/) プロジェクトに統合する手順を説明します。以下の手順に従って、NestJS サーバーに強力なデータ分析機能を追加します。

## 手順 1 - NestJS  プロジェクトの作成

1. まず、まだインストールしていない場合は、NestJS CLI をグローバルにインストールします。

```bash
npm install -g @nestjs/cli
```

2. 以下のコマンドを実行して、新しいプロジェクトを作成します。

```bash
nest new reveal-nest-server
```

3. コマンドライン パスを新しく作成したプロジェクト ディレクトリに変更します。

```bash
cd reveal-nest-server
```

## 手順 2 - Reveal SDK のインストール

1. NestJS プロジェクト ディレクトリ内に、Node.js 用の Reveal SDK をインストールします。

```bash npm2yarn
npm install reveal-sdk-node
```

## 手順 3 - `main.ts` ファイルの変更

Reveal SDK を統合するには、`main.ts` ファイルを直接変更し、CORS を有効にして Reveal SDK ルートを追加します。

1. `src/main.ts` ファイルを開きます。

2. `bootstrap` 関数を更新して、Reveal SDK を構成します。

```ts title="src/main.ts"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// highlight-next-line
import reveal from 'reveal-sdk-node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // highlight-next-line
  app.enableCors(); // DEVELOPMENT only! In production, configure appropriately.

  // highlight-next-line
  app.use("/", reveal());

  // Start the server
  await app.listen(process.env.PORT ?? 5111);
  console.log(`Reveal SDK server running on http://localhost:${process.env.PORT ?? 5111}`);
}
bootstrap();
```

この設定により、Reveal SDK が `/` の下のルートを処理するように構成されます。CORS ポリシーもグローバルに有効化され、他のオリジンからのリクエストを許可します。

:::note

tsconfig.json ファイルで `"esModuleInterop": true,` を設定する必要がある場合があります。

:::

## 手順 4 - ダッシュボード フォルダーの作成

Reveal SDK では、ダッシュボード ファイルが作業ディレクトリ内の **dashboards** という名前のフォルダーに保存されることを想定しています。

1. プロジェクトのルート ディレクトリに、`dashboards` という名前のフォルダーを作成します。

```bash
mkdir dashboards
```

このフォルダーに任意の Reveal ダッシュボードを保存でき、サーバー経由でアクセスできるようになります。この動作を変更する必要がある場合は、カスタム `IRVDashboardProvider` を作成できます。

## 手順 5 - NestJS サーバーの起動

1. 以下のコマンドを実行して NestJS サーバーを起動します。

```bash
npm run start
```

あるいは、開発モードの場合は、ライブリロードを有効にしてサーバーを実行します。

```bash
npm run start:dev
```

これで、NestJS サーバーが実行され、Reveal SDK は `http://localhost:5111/` でリクエストを処理する準備が整いました。

:::info Get The Code

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/server/nest) にあります。

:::
