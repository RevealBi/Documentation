# Loading Dashboards

If you want to display an existing Reveal Dashboard in the `RevealView` control embedded within your application, you have four options to choose from.
- Load the dashboard from a file path
- Load the dashboard from a file stream
- Load the dashboard from an embedded resource
- Load the dashboard from json

Loading a dashboard into a `RevealView` consists of taking a **.rdash** file (.rdash is the file extension for dashboards created by Reveal), deserializing it as a `RVDashboard` object, and then assigning the `RevealView.Dashboard` property to the RVDashboard object instance.

You can create **.rdash** dashboard files the following ways:
- Export the dashboard as a .rdash file from the [Reveal BI website](https://app.revealbi.io/)
- Export the dashboard as a .rdash file from one of the native Reveal applications
- Save, or Export, a dashboard that was created in an application using the Reveal SDK.
- Download these [sample dashboards](https://github.com/RevealBi/sdk-samples-wpf/raw/master/SampleDashboards.zip)

## Load from File Path
It is very common to ship dashboard files with your application. These files are usually copied to the clients disk drive in a known directory so that the files can be loaded from disk during the execution of the application. In order to load these dashboards using a file path, you must know the file path to the **.rdash** file. 

In this example, we have created a directory in our Visual Studio solution called **Dashboards** which will contain all the .rdash files for our application.

![](images/load-dashboards-dashboard-directory.jpg)

It's important to make sure we set the **Copy to Output Directory** value to **Copy if Newer** in the properties of each .rdash file. This will copy the dashboard files to disk when the project is built.

![](images/load-dashboard-as-file.jpg)

The first step is to get the file location of the .rdash file you wish to load. Once you have the file path to your dashboard, create a new instance of the `RVDashboard` and pass the file path to the constructor of the `RVDashboard` class. 

In our example, we are using `Environment.CurrentDirectory` to get the current executing directory of our application. We then append the location of the **Sales.rdash** dashboard, which is in our **Dashboards** directory, using the `Path.Combine` method. Once we have the correct file path to our **Sales.rdash** dashboard, we set the `RevealView.Dashboard` property to a new instance of an `RVDashboard` object using the file path as a constructor argument.
```cs
var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards/Sales.rdash");
_revealView.Dashboard = new RVDashboard(filePath);
```

You can also load dashboards into the `RevealView` from a file path asynchronously using the `RVDashboard.LoadDashboardAsync` method.
```cs
var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards/Sales.rdash");
_revealView.Dashboard = await RVDashboard.LoadDashboardAsync(filePath);
```

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-wpf/tree/master/LoadingDashboards-FilePath).

## Load from File Stream
Loading Reveal dashboards from a file stream is very similar to loading dashboards from a file path. In this case, once you have the file path of the dashboard file, you load it into a `FileStream` before creating the `RVDashboard` object instance.

In this example, we are using the `File.OpenRead` method to load the Sales.rdash file into a file stream. We then create a new `RVDashboard` object by passing the file stream as a constructor argument and assign the newly created `RVDashboard` instance to the `RevealView.Dashboard` property.

```cs
var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards/Sales.rdash"); 
using (var stream = File.OpenRead(filePath))
{
    _revealView.Dashboard = new RVDashboard(stream);
}
```

You can also load dashboards into the `RevealView` from a file stream asynchronously using the `RVDashboard.LoadDashboardAsync` method.
```cs
var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards/Sales.rdash"); 
using (var stream = File.OpenRead(filePath))
{
    _revealView.Dashboard = await RVDashboard.LoadDashboardAsync(stream);
}
```

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-wpf/tree/master/LoadingDashboards-FileStream).

## Load from Resource
Another option for distributing files in an application is to embed them into your application as a resource. This will not place any files on the client's disk drive, but rather embed the files directly into your application's assembly.

To embed a Reveal dashboard **.rdash** file as a resource in your application, open the Properties for the dashboard file in Visual Studio, and set the **Build Action** of the .rdash file to **EmbeddedResource**.

![](images/load-dashboard-as-resource.jpg)

Once your dashboards have been defined as an **EmbeddedResource**, you can load the dashboard by using the `Assembly.GetManifestResourceStream` method. This method will return a `Stream` object that you can then use to load into the `RevealView`.

It's important to note, that the `name` of the resource you will provide in the `Assembly.GetManifestResourceStream` method must include the `namespace` and file name of the .rdash file.

In this example, the name of the resource starts with the application root namespace "LoadingDashboards", plus "Dashboards" which is the directory that contains the dashboard files, followed by the name of the .rdash file "Sales.rdash".  This gives us the full resource name of `LoadingDashboards.Dashboards.Sales.rdash`

```cs
var resource = Assembly.GetExecutingAssembly().GetManifestResourceStream($"LoadingDashboards.Dashboards.Sales.rdash");
using (resource)
{
    _revealView.Dashboard = new RVDashboard(resource);
}
```

You can also load dashboards as embedded resources into the `RevealView` from a resource stream asynchronously using the `RVDashboard.LoadDashboardAsync` method.
```cs
var resource = Assembly.GetExecutingAssembly().GetManifestResourceStream($"LoadingDashboards.Dashboards.Sales.rdash");
using (resource)
{
    _revealView.Dashboard = await RVDashboard.LoadDashboardAsync(resource);
}
```

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-wpf/tree/master/LoadingDashboards-FromResource).

## Load From JSON
For advanced users, or users that wish to serialize Reveal dashboards into .json files instead of .rdash files, you can load these JSON based files using the `RVDashboard.LoadFromJsonAsync` method.

The first step is to serialize a Reveal dashboard into a json string. Once you have the string you can then save the JSON to disk or another data store.

To serialize a Reveal Dashboard into JSON simply call the `RVDashboard.ExportToJson` method.

```cs
var json = dashboard.ExportToJson();
```

Once the dashboard has been serialized into JSON format, you can now save that JSON file to disk or load it directly into the `RevealView`.

If loading a dashboard JSON file from disk, your code may look something like this:
```cs
var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards/Sales.json");
var json = File.ReadAllText(filePath);
```

Once you have the JSON string, you can load the dashboard by setting the `RevealView.Dashboard` property with the result of the `RVDashboard.LoadFromJsonAsync` method passing the JSON string as a method argument.
```cs
_revealView.Dashboard = await RVDashboard.LoadFromJsonAsync(json);
```

> [!WARNING]
> Manipulating or changing the contents of a Reveal dashboard after it has been serialized to JSON can break the integrity of the dashboard and cause irreversible damage to the contents of the dashboard. This could result in runtime exceptions being thrown in your application due to errors and/or a failure to load the dashboard.

> [!NOTE]
> The source code to this sample can be found on [GitHub](https://github.com/RevealBi/sdk-samples-wpf/tree/master/LoadingDashboards-FromJson).