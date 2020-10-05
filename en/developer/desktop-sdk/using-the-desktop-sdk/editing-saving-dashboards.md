## Editing & Saving Dashboards

### Overview

As described in [**Configuring the RevealView Object**](configuring-revealview.md), you need to provide the __RevealView__ component with the stream containing the dashboard file. In addition, you also might want to handle the modified dashboard file, once the user made changes to the dashboard.

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
_revealView.CanEdit = false;
```

This might be useful, for example, when your users are not supposed to make changes.
