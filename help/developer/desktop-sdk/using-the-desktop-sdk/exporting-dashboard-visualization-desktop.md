## Exporting a Dashboard or a Visualization

### Overview

If you want to export a dashboard or a particular visualization, you can choose between the following export options:

- as an **image**;
- as a **PDF** document;
- as a **PowerPoint** presentation;
- into **Excel** data format.  

To enable a dashboard or a visualization export, you can:

  - use the export setting [in the
    RevealView](#enable-export-revealview), or

  - initiate export programmatically [outside of the
    RevealView](#programmatically-initiated-export), when exporting **as an image**.

### Prerequisites for Export as an Image Option

To use the Export as an image feature you will need to add a reference to [CefSharp.Wpf NuGet package (\>= 57.0.0)](setup-configuration-desktop.md) to your project.

<a name='enable-export-revealview'></a>

### Using the Export Setting

To enable your end users to generate an image, document or a presentation out of a dashboard you simply need to set the relevant property to true when loading the dashboard:

- [RevealSettings.ShowExportImage](api-reference-) - for export as an **image**;

- [RevealSettings.ShowExportToPDF](api-reference-) - for export as a **PDF** document;

- [RevealSettings.ShowExportToPowerpoint](api-reference-) - for export as a **PowerPoint** presentation;

- [RevealSettings.ShowExportToExcel](api-reference-) - for export in **Excel** data format.

This will make the *Export* button available in the overflow menu when a dashboard is opened or a particular visualization is maximized.

![Export button for dashboards enabled SDK](images/export-button-dashboard-SDK.png)

When the user clicks the *Export* button, they can choose one of the enabled export options.

#### Specifics when using the image export option

If the user chooses the _Export Image_ from the export options, the _Export image_ dialog will open. Here, the user can choose between two options: *Copy to clipboard* and *Export Image*.

If they click the *Export Image* button on the bottom right, the RevealView raises the [ImageExported](rvui.wpf~infragistics.sdk.revealview~imageexported_ev) event. To access the image via the [Image
Property](rvui.wpf~infragistics.sdk.imageexportedeventargs~image)
of the [ImageExportedEventArgs](rvui.wpf~infragistics.sdk.imageexportedeventargs~image), you need to have already subscribed to this event through the event handler.

Here’s a sample implementation of the *ImageExported* event handler:

``` csharp
private void RevealView_ImageExported(object sender, ImageExportedEventArgs e)
{
  var image = e.Image;
  if (image == null) return;
  // save to disk just to open it with some app
  var imageFile = Path.GetTempFileName() + ".png";
  using (var fileStream = new FileStream(imageFile, FileMode.Create))

  {
    BitmapEncoder encoder = new PngBitmapEncoder();
    encoder.Frames.Add(BitmapFrame.Create(image));
    encoder.Save(fileStream);
  }

  System.Diagnostics.Process.Start(imageFile);
}
```

The other property of the *ImageExported* event arguments is the
[CloseExportDialog](rvui.wpf~infragistics.sdk.imageexportedeventargs~closeexportdialog). Its default value is set to true. If you set it to false, the *Export Image* dialog won’t be closed after finishing of the event handler invocation.

It might be useful to set the *CloseExportDialog* to false in a
scenario, in which you show a save dialog to the end user so they can choose where to save the image. If the user does not pick a location and filename and closes the save dialog, you might want to keep the ExportImage dialog opened.

<a name='programmatically-initiated-export'></a>

### Programmatically Initiated Image Export

To get an image of the RevealView programmatically, you will need to invoke the [ToImage](rvui.wpf~infragistics.sdk.revealview~toimage) method. Calling this method will not result in showing the *Export Image* dialog. This way, you can get a screenshot when the user clicks a button, which is outside of the RevealView. This method will create a screenshot of the RevealView component as it is displayed on the screen.

Keep in mind that if the end user has any dialog opened at the time of the *ToImage* method call, the dialog will appear in be screenshot together with the dashboard.

### Related content

  - [Loading Dashboards Files](loading-dashboards-desktop.md)
  - [Configuring the RevealView Object](configuring-revealview-desktop.md)
  - [Editing and Saving Dashboards](editing-saving-dashboards-desktop.md)
  - [Working with the Localization Service](localization-service-desktop.md)
  - [Working with the Formatting Service](formatting-service-desktop.md)
  - [Exporting a Dashboard or a Visualization (Web)](../../web-sdk/using-the-client-sdk/exporting-dashboard-visualization-web.md)
  - [Replacing Data Sources](replacing-data-sources-desktop.md)
  - [In-Memory Data Support](in-memory-data-desktop.md)
  - [Providing Credentials to Data Sources](providing-credentials-datasources-desktop.md)
  - [Setting Up Initial Filter Selections](setting-initial-filters-desktop.md)
  - [Maximizing Visualizations and Single Visualization Mode](maximizing-visualizations-desktop.md)
  - [Setting Up Dynamic Filter Selections](setting-dynamic-filters-desktop.md)
  - [Dashboard Linking](dashboard-linking-desktop.md)
  - [Handling User Click Events](handling-click-events-desktop.md)
  - [Creating New Visualizations and Dashboards](creating-visualizations-dashboards-desktop.md)
