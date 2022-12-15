In order to export dashboards to an **Image** (either programmatically or through user interaction) the Reveal SDK uses [Playwright](https://playwright.dev/java/). For exporting dashboards to **Excel**, **PDF** or **PowerPoint** the Reveal SDK uses an internal application called **ExportTool**.

デフォルトでは、エンドユーザーがダッシュボードを画像、PDF、PowerPoint に初めてエクスポートしようとすると、Playwright と ExportTool の両方が必要なダウンロードを自動的に開始します。ただし、プラットフォームによっては、事前にインストールが必要な依存関係があったり、サーバー環境が外部ダウンロードを制限している場合があり、これらのツールを手動で設定する必要がある場合があります。

### Playwright Configuration

Playwright will try to download the required binaries, but if manual configuration is required you can check Playwright [documentation](https://playwright.dev/java/docs/intro).

#### macOS Dependencies

The only required library for macOS is `libgdiplus`. [Installation Instructions](https://learn.microsoft.com/th-th/dotnet/core/install/macos#libgdiplus)

#### Linux Dependencies

There are dependencies to multiple native libraries in Linux. The exact list of dependencies you need to install depends on the distribution used, the version, and list of packages previously installed.

Below there's a list of libraries needed for a basic Ubuntu 18.0.4 distribution:

```bash
sudo apt-get update

sudo apt-get install -y libgdiplus\
        libatk1.0-0\
        libatk-bridge2.0-0\
        libxkbcommon0\
        libxcomposite1\
        libxdamage1\
        libxfixes3\
        libxrandr2\
        libgbm1\
        libgtk-3-0\
        libpango-1.0-0\
        libcairo2\
        libgdk-pixbuf2.0-0\
        libatspi2.0-0    

sudo apt-get install -y --no-install-recommends xvfb 
```

:::note

If needed, you can get more information about missing libraries from errors included in the log file.

:::

If using Ubuntu, you must install the Chromium dependencies using [Maven](https://maven.apache.org/install.html).

```bash
mvn exec:java -e -Dexec.mainClass=com.microsoft.playwright.CLI -Dexec.args="install-deps chromium"
```

For other environments, the following dependencies may be required:

```bash
sudo apt-get install -y --allow-unauthenticated libc6-dev
sudo apt-get install -y --allow-unauthenticated libx11-dev
```

### ExportTool Manual Setup

The instructions below are required only in the following scenarios:
- You're having issues with the automatic download mechanism
- You want to have everything pre-installed in advance.

Step 1 -Download the required binaries for your platform: [Windows](https://download.infragistics.com/reveal/builds/sdk/java/ExportTool/1.0.0/win-x64.zip?gasource=(direct)&gamedium=(none)&gacampaign=(not%20set)&gaterm=&gagclid=&_ga=2.151744764.435154113.1670459953-590137784.1670459953), [Linux](https://download.infragistics.com/reveal/builds/sdk/java/ExportTool/1.0.0/linux-x64.zip?_ga=2.151744764.435154113.1670459953-590137784.1670459953), or [macOS](https://download.infragistics.com/reveal/builds/sdk/java/ExportTool/1.0.0/osx-x64.zip?_ga=2.151744764.435154113.1670459953-590137784.1670459953).

Step 2 - Unzip the file to a directory in your server, where your Web Application is running (your user should be able to access that directory).

Step 3 - After extracting the zip file, you can get the ExportTool at this location: `<dir>/<version>/<arch>/ExportTool`, for example:

`<dir>/1.0.0/linux-x64/ExportTool.`

Step 4 - While initializing Reveal, set the directory where you extracted the zip file. Should be similar to the following code snippet:

```java
String exportToolDir = "<dir>";
RevealEngineInitializer.initialize(new InitializeParameterBuilder().
    setExportToolContainerPath(exportToolDir).
    build());
```

Alternatively, you can specify the directory through the system property **reveal.exportToolContainerPath**, as shown below:

```bash
java -Dreveal.exportToolContainerPath=<dir> -jar target/upmedia-backend-spring.war
```