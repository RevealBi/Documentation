# System Requirements

## ASP.NET
- ASP.NET 6.0 or higher

## Java
- Java SDK 17 and higher
- Jakarta EE 9 compliant server
- Maven 3.6.3 and higher

:::note

If you use Jetty as your server, its version might conflict with the Jetty version used internally by Reveal SDK, which is currently 12.0.12.

:::

:::note

Some platforms are no longer supported by the Java SDK because they cannot run the native .NET components used by Reveal SDK. For example, AIX is not supported.

:::
## Node
- NodeJS 16.3 and higher

:::info

If developing on a Mac M1/M2/M3/M4, Rosetta must be installed.

To manually install Rosetta run the following command in the terminal:
```bash
/usr/sbin/softwareupdate --install-rosetta --agree-to-license
```

:::
