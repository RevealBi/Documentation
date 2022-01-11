# Localizing Dashboards

The Localization service allows you to localize different dashboard elements based on your custom logic. It also provides you with the ability to set custom formatting settings for fields.

### Supported Elements for Localization

Dashboard elements you can localize:

  - Dashboard Title
  - Filter Title
  - Visualization Title
  - Field Label
  - Summarization Field Label

### Using the Localization service

Below you will find two examples of how to [**localize the dashboard title**](#localize-dashboard-title) and how to [**localize a field label**](#localize-field-label) in the same dashboard by adding custom logic. You will also find examples of how to **change the formatting settings of a [numeric field](#format-numeric-field) and of a [non-aggregated date field](#format-date-field)**. The dashboard used
for the example is the *Marketing* sample dashboard.

<a name='localize-dashboard-title'></a>
#### Localizing a dashboard title - example

The initial state of the *Marketing* sample:

<img src="images/localize-dashboard-title-initial-state.png" alt="Initial state of the Marketing Sample" width="100%"/>

Follow the steps below to localize the *Marketing* dashboard title to *Localized Marketing*.

1.  To be allowed to localize the dashboard, you should set the
    **LocalizationProvider** property to your custom implementation:

    ``` csharp
    RevealSdkSettings.LocalizationProvider = new UpMediaLocalizationProvider()
    ```

2.  Implement the **IRVLocalizationProvider**:

    ``` csharp
    public class UpMediaLocalizationProvider : IRVLocalizationProvider
    {
        public IRVLocalizationService GetLocalizationService()
        {
          return new UpMediaLocalizationService();
        }
    }
    ```

3.  Implement the **GetLocalizedString** method in the
    **IRVLocalizationService** as shown below to localize the dashboard
    title:

    ``` csharp
    public class UpMediaLocalizationService : IRVLocalizationService
    {
        public RVFormattingSpec GetFormattingSettingsForField(string fieldName, RVDashboardDataType dataType, RVFormattingSpec currentSettings, bool isAggregated)
        {
            return null;
        }

        public string GetLocalizedString(string originalValue, RVLocalizationElementType type)
        {
            if (type == RVLocalizationElementType.DashboardTitle && originalValue == "Marketing")
            {
                return "Localized Marketing";
            }

            return originalValue;
        }
    }
    ```

When running the app again you can see the localized dashboard title - *Localized Marketing*:

<img src="images/localize-dashboard-title-localized.png" alt="Localized Marketing Sample Title" width="100%"/>

<a name='localize-field-label'></a>
#### Localizing a field label - example

Below you will see an example of how to localize more than one element of the same dashboard.

Here is the initial state of one of the *Marketing*'s sample
visualizations - *Actual Spend vs Budget*:

<img src="images/localize-field-label-initial-state.png" alt="initial state of the Actual Spend vs Budget visualization" width="100%"/>

To localize the *Date* field label, you need to add some logic to the **UpMediaLocalizationService** that will handle the localization of the *Date* field:

``` csharp
public class UpMediaLocalizationService : IRVLocalizationService
{
    public RVFormattingSpec GetFormattingSettingsForField(string fieldName, RVDashboardDataType dataType, RVFormattingSpec currentSettings, bool isAggregated)
    {
        return null;
    }

    public string GetLocalizedString(string originalValue, RVLocalizationElementType type)
    {
        if (type == RVLocalizationElementType.DashboardTitle && originalValue == "Marketing")
        {
            return "Localized Marketing";
        }
        else if (type == RVLocalizationElementType.FieldLabel && originalValue == "Date")
        {
            return "Localized Date";
        }

        return originalValue;
    }
}
```

The *Date* field label in *Actual Spend vs Budget* is now changed to *Localized Date*:

<img src="images/localize-dashboard-field-label-localized.png" alt="localized date field label" width="100%"/>

You can use the steps in the examples to localize any other dashboard element.

### Using the Localization Service to Change Formatting Settings

Currently you can use the Localization service to change the formatting settings of numeric fields and non-aggregated date fields.

<a name='format-numeric-field'></a>
#### Changing the formatting settings of a numeric field - example

The initial state of the *Spend vs Budget* visualization below shows the numeric field formatted in the US Dollars ($) currency:

<img src="images/localize-numeric-field-us-dollars-currency.png" alt="Original numeric field in US Dollars currency format" width="100%"/>

To change the currency format, you will need to create new formatting settings and return them in the **GetFormattingSettingsForField** method in the implementation of **IRVLocalizationService**.

The code snippet illustrates how to change the number formatting to the Japanese Yen (¥) and display it with no decimal digits:

``` csharp
public class UpMediaLocalizationService : IRVLocalizationService
{
    public RVFormattingSpec GetFormattingSettingsForField(string fieldName, RVDashboardDataType dataType, RVFormattingSpec currentSettings, bool isAggregated)
    {
        if (fieldName == "Spend" && dataType == RVDashboardDataType.Number && isAggregated == true)
        {
            var newSettings = new RVNumberFormattingSpec()
            {
                ApplyMkFormat = false,
                CurrencySymbol = "¥",
                DecimalDigits = 0,
                FormatType = RVDashboardNumberFormattingType.Currency,
                NegativeFormat = RVDashboardNegativeFormatType.MinusSign,
                ShowGroupingSeparator = true
            };

            return newSettings;
        }

        return null;
    }

    public string GetLocalizedString(string originalValue, RVLocalizationElementType type)
    {
       ...
    }
}
```

Now, the amount is displayed in a different currency:

<img src="images/localize-numeric-field-changed-currency-yen.png" alt="Changed numeric field in Japanese Yen currency format" width="100%"/>

<a name='format-date-field'></a>
#### Changing the formatting settings of a date field - example

Currently changing the formatting settings for an aggregated date field cannot be configured with the Localization service and won’t affect the values in pivot. In order to achieve this you have to use the [Formatting service](formatting-service.md).

The Localization service allows you to change the formatting settings of **non-aggregated date fields**.

First, change the *Actual Spend vs Budget* visualization to **Grid**, in order to exclude any aggregated data:

<img src="images/localize-visualization-grid-format-original-date.png" alt="Visualization in Grid format" width="100%"/>

To change the formatting settings of the *Date* field, you need to add your preferences to the logic of the **GetFormattingSettingsForField** method. The code snippet below shows how to change the date format to display the full name of the month, like: "January 01, 2001".

``` csharp
public RVFormattingSpec GetFormattingSettingsForField(string fieldName, RVDashboardDataType dataType, RVFormattingSpec currentSettings, bool isAggregated)
{
    if (fieldName == "Spend" && dataType == RVDashboardDataType.Number && isAggregated == true)
    {
        var newSettings = new RVNumberFormattingSpec()
        {
            ApplyMkFormat = false,
            CurrencySymbol = "¥",
            DecimalDigits = 0,
            FormatType = RVDashboardNumberFormattingType.Currency,
            NegativeFormat = RVDashboardNegativeFormatType.MinusSign,
            ShowGroupingSeparator = true
        };

        return newSettings;
    }
    else if (fieldName == "Date" && dataType == RVDashboardDataType.Date && isAggregated == false)
    {
        var newSettings = new RVDateFormattingSpec()
        {
            DateFormat = "MMMM dd,yyyy"
        };

        return newSettings;
    }

    return null;
}
```

> [!NOTE]
> Note that you need to check if the field name is *Date*, not *Localized Date*. The reason is the formatting settings are applied based on the name of the field. In this case, *Date* is the name of the field and *Localized Date* is just the label displayed. When editing a dashboard, you can modify the field labels, but the field names keep their original names.

After you run the app again and change the visualization to Grid, you will see the updated date format:

<img src="images/localize-visualization-grid-format-changed-date.png" alt="Visualization in grid format with changed date format" width="100%"/>
