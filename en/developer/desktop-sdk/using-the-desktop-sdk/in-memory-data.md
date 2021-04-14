## In-Memory Data Support

### Overview

In some cases you need to use data already in memory as part of your application state. Using, for example, the result of a report requested by the user, or information from a data source not yet supported by Reveal (like a custom database or a specific file format).

In-Memory is a special type of data source that can be used only with the SDK and not in the Reveal application out of the box. Because of this, you cannot use an "in-memory data source" directly, you need to to take a different approach as explained below.

### Using In-Memory Data Source

The recommended approach is to **define a data file with a schema, matching your in-memory data**. Data files can be, for example, CSV or Excel files, and a schema is basically a list of fields and the data type for each field.

In the example below you find details about how to create a data file with a given schema, and then use data in memory instead of getting information from a database.

### Code Example

In the following example, you want to use in-memory data with the list of Employees in the company, in order to embed a dashboard showing HR metrics in your HR system. And instead of getting the list of employees from your database, you want to use data in memory.

To achieve all that, you will need to create and export a dashboard in the Reveal application using dummy data.

#### About the Reveal Application
The Reveal Application is a self-service business intelligence tool that enables you to create, view and share dashboards with your teams. For further details about the Reveal app, you can access an [**online demo**](https://app.revealbi.io/) or browse the [**Help Documentation**](https://www.revealbi.io/help/).

#### Getting the Data File and Sample Dashboard Ready

As simplified Employee has only the following properties:

  - *EmployeeID*: string
  - *Fullname*: string
  - *Wage*: numeric

#### Steps

1.  Create The CSV file with the same schema:

    ``` xml
    EmployeeID,Fullname,Wage
    23,John Smith,345.67
    45,Emma Thompson,432.23
    ```

2.  Upload the file to your preferred File Sharing System, like Dropbox or Google Drive.

3.  Create a dashboard within the Reveal app using the dummy data. Please note that you are going to provide the real production data later in your application.

4.  Export the dashboard from the Reveal app (Dashboard Menu → Export → Dashboard) and save a .rdash file.

#### Visualizing the Dashboard and Returning the Actual Data

Now you need to visualize the dashboard using your own data instead of the dummy one.

1.  Implement
    __IRVDataSourceProvider__ and set it to the __DataSourceProvider__ property in __RevealSdkSettings__,
    as described in [**Replacing Data Sources**](replacing-data-sources/replacing-data-sources-mssql.md).

    Then, in the implementation for the method __ChangeVisualizationDataSourceItemAsync__, you need to add a code similar to this one:

    ``` csharp
    public Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync(RVVisualization visualization, RVDataSourceItem dataSourceItem)
    {
        var csvDsi = dataSourceItem as RVCsvDataSourceItem;
        if (csvDsi != null)
        {
            var inMemDsi = new RVInMemoryDataSourceItem("employees");
            return Task.FromResult((RVDataSourceItem)inMemDsi);
        }
        return Task.FromResult((RVDataSourceItem)null);
    }
    ```

    This way you basically replace all references to CSV files in the dashboard with the in-memory data source identified by “employees”. This identification will be used later when returning the data.

2.  Implement the method that will return the actual data, to do that implement __IRVDataProvider__ as shown below:

    ``` csharp
    public class EmbedDataProvider : IRVDataProvider
    {
        public Task<IRVInMemoryData> GetData(RVInMemoryDataSourceItem dataSourceItem)
        {
            var datasetId = dataSourceItem.DatasetId;
            if (datasetId == "employees")
            {
                var data = new List<Employee>()
                    {
                        new Employee(){ EmployeeID = "1", Fullname="John Doe", Wage = 80325.61 },
                        new Employee(){ EmployeeID = "2", Fullname="Doe John", Wage = 10325.61 },
                    };
                return Task.FromResult<IRVInMemoryData>(new RVInMemoryData<Employee>(data));
            }
            else
            {
                throw new Exception("Invalid data requested");
            }
        }
    ```

    Please note that the properties in the Employee class are named exactly as the columns in the CSV file, and the data type is also the same. In case you want to alter the field name, field label and/or data type of any of the properties you can use the following attributes in the class declaration:

      - RVSchemaColumn attribute can be used to alter the field name and/or data type
      - DisplayName attribute can be used to alter the field label

        ``` csharp
        public class Employee
        {
          [RVSchemaColumn("EmployeeID", RVSchemaColumnType.Number)]
          public string EmployeeID { get; set; }

          [DisplayName("EmployeeFullName")]
          public string Fullname { get; set; }

          [RVSchemaColumn("MonthlyWage")]
          public double Wage { get; set; }
        }
        ```

        Finally, remember to set your implementation of
        __IRVDataProvider__ to __RevealView.DataProvider__
        property:

        ``` csharp
        revealView.DataProvider = new SampleDataProvider();
        ```
