# ライセンス キーを追加

Reveal SDK をインストールするときは、ライセンス キーを指定する必要があります。指定しない場合、SDK は機能しません。ライセンス キーは 2 種類あります:
- トライアル - [Reveal SDK Web サイト](https://www.revealbi.io/ja/download-sdk)からトライアルをリクエストすると取得されます。
- ライセンス済み - Reveal SDK の購入時に取得されます。

## キー ファイル
デフォルトでは、Reveal SDK は、ユーザーの「ホーム」ディレクトリの下で `.revealbi-sdk` という名前のフォルダー内の `license.key` というファイルで有効なライセンスを検索します。「ホーム」ディレクトリは、お使いの OS によって異なります。

ライセンス キーを受け取ったら、「ホーム」ディレクトリにある `.reveabi-sdk` という名前のディレクトリ内に `license.key` という名前のテキスト ファイルを作成してください。このファイルにライセンス キーをコンテンツとして記載します。

ライセンス ファイルの場所は `C:/Users/your-user-name/.revealbi-sdk/license.key` になります。

## コードで設定

ライセンス キーはアプリケーション コードで指定することもできます。

```cs
RevealSdkSettings.License = "LICENSE_KEY";
```