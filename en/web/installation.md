# Installation

## System Requirements

- Windows 10 or higher
- Visual Studio 2019 or higher
- .NET Framework 4.6.2 or higher- 

## Installing the Reveal SDK

To install the Reveal SDK, you need to download and execute the Reveal SDK Installer. To achieve this, use the following steps:
1. Download the Reveal SDK Installer from the [Reveal website](https://www.revealbi.io/download-sdk)
2. Fill out the "Try the Reveal SDK" form on the webpage
3. Save the Reveal SDK installer to a known location on your disk

Before extracting the saved Reveal SDK Installer zip file, you should unblock it. Right-click the zip file and select **Properties**. The properties dialog will appear with a checkbox option to unblock the file. Check the **Unblock** option and press **Apply**.

![](images/install-unblock-zip.jpg)

After unblocking the platform installer zip file, follow these steps:
1. Extract the zip to the current location.
2. Find the extracted Reveal SDK Installer EXE file and double click to start it.
3. Select the install location
4. Accept the terms of the license agreement and continue the installation process. (By clicking install you agree)

![](images/install-start.png)

Once the installation is completed, you will be presented the Reveal SDK installer’s finish screen. At this point, feel free to explore the Reveal SDK samples by clicking the "Open SDK Sample" button, read our [documentation](https://help.revealbi.io/), visit our community [blogs](https://www.revealbi.io/blog), or learn a few tips and tricks by watching our [videos](https://www.youtube.com/revealbi).

![](images/install-finish.png)

## What Gets Installed

Once the installation is complete, you should have the following items installed in the local folder **"%public%\Documents\Infragistics\Reveal\SDK\"**:

- The Reveal SDK Binaries (for manual use)
- The Reveal SDK NuGet Packages
- The Reveal SDK Samples

There is also a local NuGet package source automatically added to Visual Studio that points to the Reveal SDK NuGet packages.

![](images/nuget-package-source-local-vs.jpg)

> [!NOTE]
> You can also use the NuGet feeds covered in the Infragistics NuGet Feed topic.

## Adding Your License Key

By default, when you install the Reveal SDK for the first time using the Reveal SDK Installer only the **trial** product is installed. In order to unlock the **licensed** product, you must provide a license key in the installer.

Providing a license key to the installer can be done in two ways:
1. Find the extracted Reveal SDK Installer EXE file and double click to start it.
2. In Windows, go to **Setting -> Apps** and modify the Reveal SDK installation

![](images/install-modify-app.jpg)

Once you have either modified the existing install, or re-run the Reveal SDK Installer, you will be prompted with a screen to either "Repair", "Remove", or "Enter License".  Choose **Enter License**

![](images/install-modify-installer.jpg)

After you choose **Enter License**, you will be taken to a screen in which you can now enter your license key.

![](images/install-enter-license-key.jpg)

> [!NOTE]
> After successfully adding your license you will need to uninstall the **Reveal.Sdk.Web.AspNetCore.Trial** and install **Reveal.Sdk.Web.AspNetCore** nuget package.