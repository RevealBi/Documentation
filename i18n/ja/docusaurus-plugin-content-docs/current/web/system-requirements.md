# システム要件

## ASP.NET
- ASP.NET 6.0 またはそれ以降

## Java
- Java SDK 17 およびそれ以降
- Jakarta EE 9 準拠サーバー
- Maven 3.6.3 およびそれ以降

:::note

Jetty をサーバーとして使用する場合、そのバージョンが Reveal SDK で内部的に使用される Jetty バージョン (現在は 12.0.12) と競合する可能性があります。

:::

## Node
- NodeJS 16.3 およびそれ以降

:::info

Mac M1/M2/M3/M4 で開発する場合は、Rosetta をインストールする必要があります。

Rosetta を手動でインストールするには、ターミナルで次のコマンドを実行します:
```bash
/usr/sbin/softwareupdate --install-rosetta --agree-to-license
```

:::
