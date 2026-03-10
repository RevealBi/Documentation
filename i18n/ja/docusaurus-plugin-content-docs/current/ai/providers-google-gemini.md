---
sidebar_label: Google Gemini
---


# Google Gemini プロバイダー

Google Gemini プロバイダーは、Reveal SDK AI を Google Cloud の Vertex AI プラットフォームと統合し、Google の Gemini ファミリーのモデルへのアクセスを可能にします。

## インストール

Google プロバイダーの NuGet パッケージをインストールします：

```bash
dotnet add package Reveal.Sdk.AI.Google
```

## 設定

### 基本セットアップ

`Program.cs` で Google Gemini プロバイダーを追加します：

```csharp
using Reveal.Sdk;
using Reveal.Sdk.AI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddReveal();

builder.Services.AddRevealAI()
    .AddGoogle(options =>
    {
        options.ProjectId = "your-gcp-project-id";
        options.CredentialsPath = "/path/to/credentials.json";
    });

var app = builder.Build();
app.MapControllers();
app.Run();
```

### appsettings.json の使用

プロバイダーは `RevealAI:Google` 設定セクションに自動的にバインドされます：

```json title="appsettings.json"
{
  "RevealAI": {
    "Google": {
      "ProjectId": "your-gcp-project-id",
      "CredentialsPath": "/path/to/credentials.json",
      "Location": "us-central1",
      "Model": "gemini-2.5-pro"
    }
  }
}
```

設定バインディングを使用する場合、コードでのオプション設定は不要です：

```csharp
builder.Services.AddRevealAI()
    .AddGoogle();
```

## オプション

| プロパティ | 型 | デフォルト | 説明 |
|----------|------|---------|-------------|
| `ProjectId` | `string` | `""` | **必須。** Google Cloud プロジェクト ID。 |
| `CredentialsPath` | `string` | `""` | Google Cloud 認証情報 JSON ファイルのパス。 |
| `Location` | `string` | `"us-central1"` | モデルの Google Cloud リージョン。 |
| `Publisher` | `string` | `"google"` | モデルのパブリッシャー。 |
| `Model` | `string` | `"gemini-2.5-pro"` | 使用する Gemini モデル。 |
| `Temperature` | `float` | `0` | ランダム性を制御（0.0 〜 2.0）。低い値ほど決定論的です。 |
| `MaxTokens` | `int` | `32768` | レスポンスで生成するトークンの最大数。 |
| `TopP` | `float` | `1` | Nucleus サンプリングパラメータ（0.0 〜 1.0）。 |
| `TopK` | `float` | `32` | Top-K サンプリングパラメータ。考慮するトップトークン数を制御します。 |

## Google Cloud の前提条件

Google Gemini プロバイダーを使用する前に、以下が必要です：

1. 課金が有効な **Google Cloud プロジェクト**
2. プロジェクトで **Vertex AI API** が有効化されていること
3. Vertex AI ユーザーロールを持つ **サービスアカウント**
4. サービスアカウントの **認証情報 JSON ファイル**

### 認証情報のセットアップ

1. [Google Cloud Console](https://console.cloud.google.com) にアクセスします
2. **IAM と管理** > **サービスアカウント** に移動します
3. 新しいサービスアカウントを作成するか、既存のものを選択します
4. **Vertex AI ユーザー** ロールを付与します
5. JSON 形式でキーを作成し、ダウンロードします
6. `CredentialsPath` オプションをダウンロードした JSON ファイルのパスに設定します

プロバイダーは `CredentialsPath` オプションに基づいて、`GOOGLE_APPLICATION_CREDENTIALS` 環境変数を自動的に設定します。

## 利用可能なモデル

| モデル | 説明 |
|-------|-------------|
| `gemini-2.5-pro` | 最も高性能な Gemini モデル（デフォルト） |
| `gemini-2.5-flash` | ほとんどのタスクに高速で効率的 |
| `gemini-2.0-flash` | 前世代の高速モデル |

```csharp
builder.Services.AddRevealAI()
    .AddGoogle(options =>
    {
        options.ProjectId = "your-project-id";
        options.CredentialsPath = "/path/to/credentials.json";
        options.Model = "gemini-2.5-flash";
        options.Location = "us-east1";
    });
```

## リージョン

`Location` オプションは、リクエストを処理する Google Cloud リージョンを決定します。一般的なオプションは以下の通りです：

- `us-central1`（デフォルト）
- `us-east1`
- `europe-west1`
- `asia-northeast1`
- `global`

レイテンシーを低減するために、アプリケーションに近いリージョンを選択してください。

:::danger 認証情報をコミットしないでください

Google Cloud 認証情報 JSON ファイルをソースコントロールにコミットしないでください。安全に保管し、環境変数または User Secrets を通じてパスを参照してください。

:::
