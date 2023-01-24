# ASP.NET Core Server の構成

## エクスポート

ダッシュボードを**画像**、**PDF**、または **PowerPoint** に (プログラムで、またはユーザーの操作を通じて) エクスポートするために、RevealSDK は内部で [Playwright](https://playwright.dev/dotnet/) を使用します。

デフォルトでは、ユーザーがダッシュボードを画像、PDF、または PowerPoint に初めてエクスポートしようとすると、Playwright は Chromium ブラウザーを現在のプラットフォームのデフォルトの場所にダウンロードしようとします。Windows の場合、デフォルトのパスは **%userprofile%/AppData/Local/ms-playwright** です。

このダウンロードには時間がかかり、ダッシュボードをエクスポートしようとする最初のエンドユーザーユーザーに遅延が発生する可能性があります。これは開発中は問題ありませんが、プロダクション環境では望ましくない場合があります。これらのシナリオでは、以下の設定を使用して、エクスポートの動作を微調整できます。

これらの設定は `RevealEmbedSettings.Export` のプロパティで公開されます。
- <a href="https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_ExportConfiguration_CreateChromiumInstancesOnDemand" target="_blank" rel="noopener\">CreateChromiumInstancesOnDemand</a> - これを false に設定すると、アプリの起動時に Playwright の初期化が強制的に行われます。
- <a href="https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_ChromiumDownloadFolder" target="_blank" rel="noopener\">ChromiumDownloadFolder</a> - Chromium 実行可能ファイルがダウンロードされるパス。
- <a href="https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_ChromiumExecutablePath" target="_blank" rel="noopener\">ChromiumExecutablePath</a> - Chromium 実行可能ファイルがサーバーに予めインストールされているパス。
- <a href="https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_MaxConcurrentExportingThreads" target="_blank" rel="noopener\">MaxConcurrentExportingThreads</a> - エクスポートに使用される最大同時スレッド数。
- <a href="https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.ExportConfiguration.html#Reveal_Sdk_RevealEmbedSettings_ExportingTimeout" target="_blank" rel="noopener\">ExportingTimeout</a> - エクスポート操作のタイムアウト期間 (ミリ秒単位)。デフォルト値は 30000 ms。指定されたタイムアウト期間内にエクスポート操作が終了しない場合、エクスポート操作は失敗します。

Playwright と Chromium をサーバーに手動でインストールするには、[Playwright CLI](https://playwright.dev/dotnet/docs/cli) を使用します。

```bash
dotnet tool install --global Microsoft.Playwright.CLI
playwright install chromium
```

## ログ
Reveal SDK のログを有効にするには、`"Reveal.Sdk": "Debug"` エントリを appsettings.json ファイルに追加します。
```json title="appsettings.json"
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information",
      "Reveal.Sdk": "Debug"
    }
  },
}
```
