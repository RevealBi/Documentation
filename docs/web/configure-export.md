# Configure Export

## ASP.NET

In order to export dashboards to **Image**, **PDF** or **PowerPoint** (either programmatically or through user interaction) the Reveal SDK uses [Playwright](https://playwright.dev/dotnet/) internally.

By default, the first time an end-user tries to export a dashboard to an image, PDF or PowerPoint, Playwright will try to download the Chromium browser to the server in the default location for the current platform. For Windows, the default path is **%userprofile%/AppData/Local/ms-playwright**.

This download may take some time to complete and cause a delay for the first end-user that tries to export a dashboard. This is ok during development, but may not be desirable in a production environment. For these scenarios you can use the settings below to fine tune the Export behavior.

These settings are exposed through the `RevealEmbedSettings.Export` property.
- CreateChromiumInstancesOnDemand - set this to false to force Playwright initialization to happen on app startup
- ChromiumDownloadFolder - the path where the Chromium executables will be downloaded
- ChromiumExecutablePath - the path where the Chromium executables have been preinstalled on the server.
- MaxConcurrentExportingThreads - the number of max concurrent threads used for exporting
- ExportingTimeout - the timeout period, in milliseconds, for an export operation. Default value is 30000 ms. If an export operation does not finish within the specified timeout period, the export operation will fail.

To manually install Playwright and Chromium on the server, use the [Playwright CLI](https://playwright.dev/dotnet/docs/cli):

```bash
dotnet tool install --global Microsoft.Playwright.CLI
playwright install chromium
```

## Java

In order to export dashboards to an **Image** (either programmatically or through user interaction) the Reveal SDK uses [Playwright](https://playwright.dev/java/). For exporting dashboards to **Excel**, **PDF** or **PowerPoint** the Reveal SDK uses an internal application called **ExportTool**.

By default, the first time an end-user tries to export a dashboard to an image, PDF or PowerPoint, both Playwright and ExportTool trigger the required downloads automatically.  However, for some platforms there are some dependencies that need to be installed in advance, and also your server environment might restrict external downloads and you might need to setup these tools manually.

### Playwright Configuration

Playwright will try to download the required binaries, but if manual configuration is required you can check Playwright [documentation](https://playwright.dev/java/docs/intro).

#### Linux Dependencies

There are dependencies to multiple native libraries in Linux. The exact list of dependencies you need to install depends on the distribution used, the version, and list of packages previously installed.

Below there's a list of libraries needed for a basic Ubuntu 18.0.4 distribution:

```bash
sudo apt-get update

sudo apt-get install -y libatk1.0-0\
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
