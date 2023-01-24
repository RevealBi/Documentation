# ログ

## ASP.NET
Reveal SDK のログを有効にするには、`"Reveal.Sdk": "Debug"` エントリを appsettings.json ファイルに追加します。
```json title="appsettings.json"
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information",
      // highlight-next-line
      "Reveal.Sdk": "Debug"
    }
  },
}
```