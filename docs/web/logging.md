# Logging

## ASP.NET
To enable logging for the Reveal SDK, add a `"Reveal.Sdk": "Debug"` entry into the appsettings.json file.
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