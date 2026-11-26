# システム要件

## ASP.NET
- ASP.NET Core 8.0 またはそれ以降
- NuGet パッケージには .NET 8 ビルドと .NET 10 ビルドが含まれています。.NET 10 以降をターゲットとするプロジェクトは .NET 10 ビルドを使用し、.NET 8 および .NET 9 のプロジェクトは .NET 8 ビルドを使用します。

## Java
- Java SDK 17 およびそれ以降
- Jakarta EE 9 準拠サーバー
- Maven 3.6.3 およびそれ以降
- Linux では glibc 2.27 以降 (たとえば Ubuntu 18.04 以降)

:::note

Jetty をサーバーとして使用する場合、そのバージョンが Reveal SDK で内部的に使用される Jetty バージョン (現在は 12.0.12) と競合する可能性があります。

:::

:::note

Reveal SDK で使用されるネイティブ .NET コンポーネントを実行できない一部のプラットフォームは、Java SDK でサポートされなくなりました。たとえば、AIX はサポートされていません。

:::

## Node
- NodeJS 16.3 およびそれ以降
- Linux では glibc 2.27 以降 (たとえば Ubuntu 18.04 以降)

:::note

Java および Node.js SDK には独自の .NET 10 ランタイムが含まれているため、.NET をインストールする必要はありません。

:::

:::info

Mac M1/M2/M3/M4 で開発する場合は、Rosetta をインストールする必要があります。

Rosetta を手動でインストールするには、ターミナルで次のコマンドを実行します:
```bash
/usr/sbin/softwareupdate --install-rosetta --agree-to-license
```

:::

## Linux

Windows (ドメイン) アカウントを使用して HTTP 経由で Microsoft Analysis Services に接続するには、`gss-ntlmssp` パッケージが必要です。このパッケージがない場合、接続は "Unable to connect" で失敗します。これは ASP.NET、Java、Node.js の各 SDK に適用されます。
