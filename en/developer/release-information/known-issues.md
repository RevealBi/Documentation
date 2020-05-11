## Known Issues

  - [Web, Desktop](#web-desktop)

  - [Only Desktop](#desktop)

### Web, Desktop

  - When using the NuGet package, the watermark is still    displayed after
    licensing the Reveal SDK (entering a valid key in the SDK
    installer).

    As a **workaround**, you can uninstall the NuGet package from the project, clear the NuGet’s cache, and install the package again. In the case that you don’t want to clear all NuGet’s cache, you can lookup the location of that cache and clear only the Infragistics Reveal items. The location depends on the NuGet version and whether *packages.config* or *PackageReferece* is used.

### Desktop

  - After updating Reveal SDK to the new version in a project using package.config, uninstalling the old NuGet version or updating it to the new one will fail.

    As a **workaround**, prior to updating the Reveal SDK you can
    uninstall the NuGet package from your project. Then, update the Reveal SDK using the installer and finally you can reinstall the updated NuGet package.

    As an **alternative workaround**, prior to updating the Reveal SDK, you can back up the existing NuGet packages. To do that, go to *"%public%\\Documents\\Infragistics\\Nuget"* (the location of the local NuGet package store created by the installer). Back up the existing packages to another folder, run the updated installer, and then copy the backed up packages back to the same location. Finally, you can now upgrade the NuGet version used in your project.
