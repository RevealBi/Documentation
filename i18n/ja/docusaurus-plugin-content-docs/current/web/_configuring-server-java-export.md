 (プログラム上またはユーザー インタラクションによって) ダッシュボードを**画像**にエクスポートするには、Reveal SDK は [Playwright](https://playwright.dev/java/) を使用します。ダッシュボードを **Excel**、**PDF**、または **PowerPoint** にエクスポートするには、Reveal SDK は **ExportTool** と呼ばれる内部アプリケーションを使用します。

デフォルトでは、エンドユーザーがダッシュボードを画像、PDF、PowerPoint に初めてエクスポートしようとすると、Playwright と ExportTool の両方が必要なダウンロードを自動的に開始します。ただし、プラットフォームによっては、事前にインストールが必要な依存関係があったり、サーバー環境が外部ダウンロードを制限している場合があり、これらのツールを手動で設定する必要がある場合があります。

### Playwright の構成

Playwright は必要なバイナリをダウンロードしようとしますが、手動での構成が必要な場合は、Playwright [documentation](https://playwright.dev/java/docs/intro) を確認してください。

#### macOS 依存性

macOS で必要なライブラリは `libgdiplus` のみです。[インストール方法](https://learn.microsoft.com/th-th/dotnet/core/install/macos#libgdiplus)

#### Linux 依存性

Linux では、複数のネイティブ・ライブラリに依存します。インストールする必要のある依存関係の正確なリストは、使用するディストリビューション、バージョン、および以前にインストールしたパッケージのリストに依存します。

以下に、基本的な Ubuntu 18.0.4 ディストリビューションに必要なライブラリの一覧を示します。


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

必要であれば、ログファイルに含まれるエラーから、不足しているライブラリに関する詳細な情報を得ることができます。

:::

Ubuntu を使用する場合は、[Maven](https://maven.apache.org/install.html) を使用して Chromium の依存関係をインストールする必要があります。

```bash
mvn exec:java -e -Dexec.mainClass=com.microsoft.playwright.CLI -Dexec.args="install-deps chromium"
```

その他の環境では、以下の依存関係が必要な場合があります:

```bash
sudo apt-get install -y --allow-unauthenticated libc6-dev
sudo apt-get install -y --allow-unauthenticated libx11-dev
```

### ExportTool の手動セットアップ

ここからの手順は、以下のシナリオの場合のみ必要です。
- 自動ダウンロードの仕組みに問題がある場合
- 事前にすべてをインストールしておきたい場合。

ステップ 1 - お使いのプラットフォームに必要なバイナリをダウンロードします: [Windows](https://download.infragistics.com/reveal/builds/sdk/java/ExportTool/1.0.0/win-x64.zip?gasource=(direct)&gamedium=(none)&gacampaign=(not%20set)&gaterm=&gagclid=&_ga=2.151744764.435154113.1670459953-590137784.1670459953)、[Linux](https://download.infragistics.com/reveal/builds/sdk/java/ExportTool/1.0.0/linux-x64.zip?_ga=2.151744764.435154113.1670459953-590137784.1670459953)、[macOS](https://download.infragistics.com/reveal/builds/sdk/java/ExportTool/1.0.0/osx-x64.zip?_ga=2.151744764.435154113.1670459953-590137784.1670459953)

ステップ 2 - Web アプリケーションが動作しているサーバーのディレクトリにファイルを解凍します (ユーザーはそのディレクトリにアクセスできる必要があります)。

ステップ 3 - ZIP ファイルを解凍した後、次の場所で ExportTool を入手できます: `<dir>/<version>/<arch>/ExportTool`。例:

`<dir>/1.0.0/linux-x64/ExportTool.`

ステップ 4 - Revealの初期化中に、ZIPファイルを解凍したディレクトリを設定します。以下のようなコードになるはずです:

```java
String exportToolDir = "<dir>";
RevealEngineInitializer.initialize(new InitializeParameterBuilder().
    setExportToolContainerPath(exportToolDir).
    build());
```

また、以下のようにシステムプロパティ **reveal.exportToolContainerPath** を通じてディレクトリを指定することもできます:

```bash
java -Dreveal.exportToolContainerPath=<dir> -jar target/upmedia-backend-spring.war
```