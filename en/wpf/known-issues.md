# Known Issues

**1** - After updating the Reveal SDK to a newer version in a project using package.config, uninstalling the old NuGet version or updating it to the new one will fail.

As a workaround, prior to updating the Reveal SDK you can uninstall the NuGet package from your project. Then, update the Reveal SDK using the installer and finally you can reinstall the updated NuGet package.

As an alternative workaround, prior to updating the Reveal SDK, you can back up the existing NuGet packages. To do that, go to "%public%\Documents\Infragistics\Nuget" (the location of the local NuGet package store created by the installer). Back up the existing packages to another folder, run the updated installer, and then copy the backed up packages back to the same location. Finally, you can now upgrade the NuGet version used in your project.