# System Requirements

## ASP.NET
- ASP.NET Core 8.0 or higher
- The NuGet packages include a .NET 8 and a .NET 10 build. A project that targets .NET 10 or later uses the .NET 10 build; .NET 8 and .NET 9 projects use the .NET 8 build.

## Java
- Java SDK 17 and higher
- Jakarta EE 9 compliant server
- Maven 3.6.3 and higher
- On Linux, glibc 2.27 or later (Ubuntu 18.04 or later, for example)

:::note

Some platforms are no longer supported by the Java SDK because they cannot run the native .NET components used by Reveal SDK. For example, AIX is not supported.

If you use Jetty as your server, its version might conflict with the Jetty version used internally by Reveal SDK, which is currently 12.0.12.

:::

## Node
- NodeJS 16.3 and higher
- On Linux, glibc 2.27 or later (Ubuntu 18.04 or later, for example)

:::note

The Java and Node.js SDKs include their own .NET 10 runtime, so you don't need to install .NET.

:::
