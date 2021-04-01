## Server-side Export Configuration

The Java SDK uses some native components for exporting dashboards to different formats: Image, PDF, PPT and Excel.

- For **exporting images** we use [Playwright for Java](https://github.com/microsoft/playwright-java).

- For **exporting PDF, PPT and Excel documents** we use ExportTool (our own native application).

#### Getting ready to export

The first time a Dashboard is opened, **both Playwright and ExportTool trigger the required downloads automatically**. But for some platforms there are some dependencies that need to be installed in advance, and also your server environment might restrict external downloads and you might need to setup these tools manually.

### Playwright configuration
Playwright automatically downloads the required binaries. But if manual configuration is required or you want to understand better how it works (or how to tweak it), you can check Playwright documentation [here](https://playwright.dev/java/docs/installation).

### macOS Dependencies

The only required library for macOS is **libgdiplus**, you can check installation information [here](https://docs.microsoft.com/th-th/dotnet/core/install/macos#libgdiplus).

### Linux Dependencies

There are dependencies to multiple native libraries in Linux. The exact list of dependencies you need to install depends on the distribution used, the version, and list of packages previously installed.

Below there's a list of libraries needed for a basic Ubuntu 18.0.4 distribution:

```shell
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

If needed, you can get more information about the missing libraries from errors included in the log file.

For other environments, you might also have to install:

```shell
sudo apt-get install -y --allow-unauthenticated libc6-dev

sudo apt-get install -y --allow-unauthenticated libx11-dev
```

### ExportTool Manual Setup

The instructions below are required only in the following scenarios:
- You're having issues with the automatic download mechanism
- You want to have everything pre-installed in advance.

#### Steps

1. Download the required binaries for your platform: [Windows](https://download.infragistics.com/reveal/builds/sdk/java/ExportTool/1.0.0/win-x64.zip), [Linux](https://download.infragistics.com/reveal/builds/sdk/java/ExportTool/1.0.0/linux-x64.zip) or [macOS](https://download.infragistics.com/reveal/builds/sdk/java/ExportTool/1.0.0/osx-x64.zip).
2. Unzip the file to a directory in your server, where your Web Application is running (your user should be able to access that directory).
3. After extracting the zip file, you can get the **ExportTool** at this location: \<*dir*>/\<*version*>/\<*arch*>/ExportTool, for example:
   ```shell
   <dir>/1.0.0/linux-x64/ExportTool.
   ```


4. While initializing Reveal, set the directory where you extracted the zip file. Should be similar to the following code snippet:

```java
String exportToolDir = "<dir>";
RevealEngineInitializer.initialize(
  new InitializeParameterBuilder()
    .setAuthProvider(new UpmediaAuthenticationProvider())
    .setUserContextProvider(new UpmediaUserContextProvider())
    .setDashboardProvider(new UpmediaDashboardProvider())
    .setLicense("SERIAL_KEY_TO_BE_USED")
    .setExportToolContainerPath(exportToolDir)
    .build());
```

Alternatively, you can specify the directory through the system property **reveal.exportToolContainerPath**, as shown below:

```java
java -Dreveal.exportToolContainerPath=<dir> -jar target/upmedia-backend-spring.war
```
