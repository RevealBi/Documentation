## Editing & Saving Dashboards

### Overview

To load a dashboard, you need to provide the __RevealView__ component with the stream containing the dashboard file. Later, you might want to handle the modified dashboard file, once the user made changes to the dashboard.

### Editing dashboards

The **Dashboard** property (type RVDashboard) of __RevealView__ is updated when the end user starts editing the dashboard. For example, when adding or removing visualizations or filters, RVDashboard's collections get automatically updated.

In addition, the __RVDashboard__ class includes a **HasPendingChanges** property that is very useful to check if there are unsaved changes in the dashboard.

**--ADDCODE??--**

After a user finishes editing a visualization, upon closing the Visualization Editor, the Revealview's __VisualizationEditorClosed__ event is fired.

**--ADDCODE??--**

In the case that you need to control how to add new visualizations please refer to [**Creating New Visualizations and Dashboards**](~/en/developer/desktop-sdk/using-the-desktop-sdk/creating-visualizations-dashboards.md).


### Saving dashboards

You can attach to the __SaveDashboard__ event with the following code:

``` csharp
_revealView.SaveDashboard += RevealView_SaveDashboard;
```

And then implement the event handler:

``` csharp
private async void RevealView_SaveDashboard(object sender, DashboardSaveEventArgs args)
{
    var data = await args.Serialize();
    using (var output = File.OpenWrite($"{args.Name}.rdash"))
    {
        output.Write(data, 0, data.Length);
    }
    args.SaveFinished();
}
```

The example above shows a simplified implementation for handling the “Save” event. In a real-world scenario you might want to display a custom UI to the user, where he/she can select the location and final name of the dashboard.

In the case that the user changed the name of the dashboard, you can use the method __SerializeWithNewName__, to get the name reflected properly in the Title attribute for the dashboard.

In case you don’t want to handle the save action, you can turn off the option to edit dashboards by setting:

``` csharp
revealView.CanEdit = false;
```

This might be useful, for example, when your users are not supposed to make changes.
