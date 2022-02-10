# Saving Dashboards

The saving of a dashboard is invoked by the end-user interacting with the save buttons within the `RevealView` control in your application.

There are two types of save operations supported by the `RevealView`:
- **Save** - saves the current dashboard and overwrites the current **.rdash** file on disk
- **Save As** - saves the current dashboard as a new **.rdash** file on disk. Leaving the original **.rdash** file untouched.

The **Save** operation is invoked when the end-user is in edit mode, and clicks the **Check Button** in the top right corner of the `RevealView`.

![](images/saving-save-button.jpg)

The **Save As** operation is invoked when the end-user opens the **Kebab Menu** located in the top right corner of the `RevealView`, and selects the **Save As** menu item.

![](images/saving-saveas-button.jpg)

## Save Dashboard Event

By default, the `RevealView` does not provide a built-in **Save** or **Save As** functionality. This means that you as the developer will be required to write all necessary code to perform both the **Save** and **Save As** operations within your application.

In order to handle the saving of dashboards, you must add an event handler to the `RevealView.SaveDashboard` event.

```xml
<rv:RevealView x:Name="_revealView"
               SaveDashboard="RevealView_SaveDashboard"/>
```

```cs
private void RevealView_SaveDashboard(object sender, Reveal.Sdk.DashboardSaveEventArgs e)
{
    // your save code here       
}
```

The `DashboardSaveEventArgs` object provide the following properties and methods to help you save dashboards:
- **Name** - this is actually the Title of the current dashboard (the text displayed at the top of the dashboard in the `RevealView`). It's important that the Name of the **.rdash** match the Title of the dashboard.
- **IsSaveAs** - determines if this is a **Save** or **Save As** operation
- **Serialize()** - returns a `byte[]` of the current dashboard to be used for saving. This is primarily used for a **Save** operation
- **SerializeAsJson()**   - returns a JSON `string` that can be used to save. This is primarily used for a **Save** operation
- **SerializeWithNewName()** - changes the dashboard's Title and returns a `byte[]` of the current dashboard to be used for saving. This is primarily used for a **Save As** operation
- **SerializeWithNewNameAsJson()** - changes the dashboard's Title and returns a JSON `string` that can be used to save. This is primarily used for a **Save As** operation
- **SavedFinished() - REQUIRED** - signifies that the save operation has been completed. This is a requirement due to the asynchronous nature of saving.

> [!NOTE]
> If an end-user is in edit mode and you have not implemented the `RevealView.SaveDashboard` event, the **Check Button** will not exit edit mode when clicked. This is an indicator that you need to implement the `RevealView.SaveDashboard` event.

## Disabled Saving

You can prevent the end-user from invoking either the **Save** or **Save As** operations by either disabling editing or hiding the **Save As** UI elements.

To disable the **Save** operation, you must disable editing completely. Please see the [Editing](editing-dashboards.md#canedit) topic for more information on disabling editing.

To disable the **Save As** operation, you must set the `RevealView.CanSaveAs` property to `false`:

```xml
<rv:RevealView x:Name="_revealView" CanSaveAs="False" />
```

## Example: Implement Save

Let's start by creating a variable to hold the default directory in which we will be saving our dashboards. In this case we will be saving our dashboards in a **Dashboards** folder relative to the application directory.

```cs
string _defaultDirectory = Path.Combine(Environment.CurrentDirectory, "Dashboards");
```

Next, let's determine if we are dealing with a **Save** or **Save As** operation.

```cs
private async void RevealView_SaveDashboard(object sender, Reveal.Sdk.DashboardSaveEventArgs e)
{
    if (e.IsSaveAs)
    {
                
    }
    else
    {
                      
    }      
}
```

Now, let's implement the **Save** operation. We start by getting the path of the **.rdash** file we are overwriting. Since the name of the **.rdash** file should match the Title of the dashboard, we can use the `e.Name` to build the path. Once we have the path, we can then use the `e.Serialize()` method to obtain the `byte[]` of the current dashboard. Once we have the `byte[]` of the dashboard, we can create a file stream and save it to disk.

```cs
private async void RevealView_SaveDashboard(object sender, Reveal.Sdk.DashboardSaveEventArgs e)
{
    if (e.IsSaveAs)
    {
                
    }
    else
    {
        var path = Path.Combine(_defaultDirectory, $"{e.Name}.rdash");
        var data = await e.Serialize();
        using (var output = File.Open(path, FileMode.Open))
        {
            output.Write(data, 0, data.Length);
        }    
    }
}
```

The next step is to implement the **Save As** operation.  This step requires a little more code, as we need to first capture the new file path of the dashboard that will be provided by the end-user, and then create a new file based on that file path.  To do this, we will use the `SaveFileDialog` provided by WPF.  Once we capture the new file path from the end-user, we will create a new `FileStream` using that path. We will then extract the new file name from the path which will be used as both the name of the **.rdash** file and the Title of the dashboard.  To make sure the file name and the Title are the same, we use the `e.SerializeWithNewName()` method passing the extracted name as an argument. Once we have the `byte[]` we write it to disk.

The code will look something like this:

```cs
private async void RevealView_SaveDashboard(object sender, Reveal.Sdk.DashboardSaveEventArgs e)
{
    if (e.IsSaveAs)
    {
        var saveDialog = new SaveFileDialog()
        {
            DefaultExt = ".rdash",
            FileName = e.Name + ".rdash",
            Filter = "Reveal Dashboard (*.rdash)|*.rdash",
            InitialDirectory = _defaultDirectory
        };

        if (saveDialog.ShowDialog() == true)
        {
            using (var stream = new FileStream(saveDialog.FileName, FileMode.Create, FileAccess.Write))
            {
                var name = Path.GetFileNameWithoutExtension(saveDialog.FileName);
                var data = await e.SerializeWithNewName(name);
                await stream.WriteAsync(data, 0, data.Length);
            }
        }
    }
    ...
}
```

The final step is to inform the `RevealView` that our saving logic is complete. This requires a final call to `e.SaveFinished();`.  The final save logic is as follows:

```cs
private async void RevealView_SaveDashboard(object sender, Reveal.Sdk.DashboardSaveEventArgs e)
{
    if (e.IsSaveAs)
    {
        var saveDialog = new SaveFileDialog()
        {
            DefaultExt = ".rdash",
            FileName = e.Name + ".rdash",
            Filter = "Reveal Dashboard (*.rdash)|*.rdash",
            InitialDirectory = _defaultDirectory
        };

        if (saveDialog.ShowDialog() == true)
        {
            using (var stream = new FileStream(saveDialog.FileName, FileMode.Create, FileAccess.Write))
            {
                var name = Path.GetFileNameWithoutExtension(saveDialog.FileName);
                var data = await e.SerializeWithNewName(name);
                await stream.WriteAsync(data, 0, data.Length);
            }
        }
    }
    else
    {
        var path = Path.Combine(_defaultDirectory, $"{e.Name}.rdash");
        var data = await e.Serialize();
        using (var output = File.Open(path, FileMode.Open))
        {
            output.Write(data, 0, data.Length);
        }
    }

    e.SaveFinished();
}
```

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-wpf/tree/master/SavingDashboards)