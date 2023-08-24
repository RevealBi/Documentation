# Getting Started with Reveal SDK

## Step 1 - Create a New WPF Project
The steps below describe how to create a new WPF project. If you want to add the Reveal SDK to an existing application, go to [Step 2](#step-2---add-reveal-sdk).

1 - Start Visual Studio 2019 and click **Create a new project** on the start page, select the **WPF App (.NET Framework)** template, and click **Next**.

![](images/getting-started-new-wpf-project.jpg)

2 - Provide a project name, select **.NET Framework 4.6.2** or higher, and click **Create**.

![](images/getting-started-new-wpf-project-name.jpg)

## Step 2 - Add Reveal SDK

1 - Right click the Solution, or Project, and select **Manage NuGet Packages** for Solution.

![](images/getting-started-nuget-packages-manage.jpg)

2 - In the package manager dialog, open the **Browse** tab, and install the **Reveal.Sdk.Wpf** NuGet package into the project.

![](images/getting-started-nuget-packages-install.jpg)

## Step 3 - Add RevealView Control

### Using XAML

1 - Open the **MainWindow.xaml** file and add the `xmlns:rv="http://revealbi.io/"` namespace

```xml
xmlns:rv="http://revealbi.io/"
```

2 - Add the RevealView to the content of the MainWindow

```xml
<rv:RevealView />
```

### Using the Toolbox

1 - Open the **MainWindow.xaml** file

2 - Open the Visual Studio Toolbox and find the **RevealView** control under the **Reveal SDK** toolbox tab

![](images/getting-started-toolbox.jpg)

3 - Click and drag the **RevealView** control onto the design surface of the **MainWindow.xaml** file. The Reveal SDK namespace and the RevealView control will both be added to the MainWindow.xaml file.

![](images/getting-started-mainwindow.jpg)

## Step 4 - Run Application

Press F5 to run the application.

![](images/getting-started-running-app.jpg)

**Congratulations!** You have written your first Reveal SDK application.

Next Steps:
- [Create New Dashboards](creating-dashboards.md)
- [Load Existing Dashboards](loading-dashboards.md)

:::info Get the Code

The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-wpf/tree/master/01-GettingStarted).

:::