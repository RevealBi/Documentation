### Creating Candlestick Visualizations

In this tutorial, you will learn how to create a Candlestick chart visualization using a sample spreadsheet.

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><img src="images/CandlestickChart_All.png" alt="CandlestickChart All" width="265" /><br />
</p>
<p><a href="#create-candlestick-chart">Candlestick Chart</a><br />
</p></td>
<td><p><img src="images/CandlestickChartBounds_All.png" alt="CandlestickChartBounds All" width="265" /><br />
</p>
<p><a href="#changing-axis-configuration">Candlestick Chart with Bounds</a><br />
</p></td>
<td><p><img src="images/CandlestickChartLogarithmicAxis_All.png" alt="CandlestickChartLogarithmicAxis All" width="265" /><br />
</p>
<p><a href="#setting-logarithmic-axis">Candlestick Chart with a Logarithmic Axis</a><br />
</p></td>
</tr>
</tbody>
</table>

Access the links below for the Candlestick chart view walkthroughs:

  - [How to create a Candlestick chart](#creating-candlestick-chart)

  - [How to change your axis configuration](#changing-axis-configuration)

  - [How to set your axis configuration to logarithmic](#setting-logarithmic-axis)

### Key Concepts

Like [OHLC](tutorial-ohlc-chart.md) Charts, Candlestick charts are meant to
show the opening, high, low and closing prices for any financial data.
They are particularly useful for financial scenarios and stock movement
analysis. This chart displays numerical values in vertical axes, with
the two horizontal lines in each vertical axis representing the "Open"
and "Close" values.

Candlestick charts, therefore, require:

  - **One field to be dropped into the "Label"** placeholder of the data
    editor, generally related to dates.

  - **Four different fields** in the "Open", "High", "Low", and "Close"
    categories of the data editor.

<img src="images/candlestick-chart-visualization-settings.png" alt="Candlestick chart visualization settings" width="800"/>

There are also different options to add further information to your
chart:

  - **Axis Configuration**: the axis configuration lets you configure
    the minimum and maximum values for your charts. The minimum value is
    set to 0 by default and the maximum calculated automatically
    depending on your values.

  - **Logarithmic Axis Configuration**: if you check the "Logarithmic"
    checkbox, the scale for your values will be calculated with a
    non-linear scale which takes magnitude into account instead of the
    usual linear scale.

### Sample Data Source

For this tutorial, you will use the "OHLC and Candlestick" sheet in the
[Reveal Tutorials Spreadsheet](http://download.infragistics.com/reportplus/help/samples/Reveal_Visualization_Tutorials.xlsx).


>[!NOTE]
>Excel files as local files are not supported in this release. In order to follow these tutorials, make sure you upload the file to one of the supported [cloud services](data-sources.md) or add it as a [Web Resource](web-resource.md).

<a name='create-candlestick-chart'></a>
### Creating a Candlestick Chart

|                                          |                                                                                                                                           |                                                                                                                                                       |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1\. **Create a Visualization**           | <img src="images/Tutorials-Create-New-Dashboard.png" alt="Creating new visualization" width="300"/>                                       | In the home screen, select the *+ Dashboard* split button.                                                                                            |
| 2\. **Configure your Data Source**       | <img src="images/Tutorials-Select-Data-Source.png" alt="Selecting a data source" width="300"/>                                            | In the *New Visualization* screen, select the *+ Data Source* button and choose your data source from the list.                                       |
| 3\. **Select the Tutorials Spreadsheet** | <img src="images/Tutorials-Select-OHLC-Candlestick-Charts-Spreadsheet.png" alt="Seclect OHLC Candlestick Chart spreadsheet" width="300"/> | Once the data source is configured, select the **Reveal Tutorials Spreadsheet**. Then, choose the "OHLC and Candlestick" sheet.                       |
| 4\. **Open the Visualizations Menu**     | <img src="images/Tutorials-Select-Change-Visualization.png" alt="Seclect Change visualization" width="300"/>                              | Select the **grid icon** in the top bar of the Visualizations Editor.                                                                                 |
| 5\. **Select your Visualization**        | <img src="images/Tutorials-Charts-Select-Candlestick-Chart.png" alt="Seclect Candlestick chart" width="300"/>                             | By default, the visualization type will be set to *Grid*. Select the **Candlestick**.                                                                 |
| 6\. **Organize your Data**               | <img src="images/Tutorials-CandlestickChart-Organizing-Data.png" alt="Organizing data fields" width="300"/>                               | Drag and drop the *Date* field into *Label* and the *Open*, *High*, *Low* and *Close* fields in their corresponding placeholder.                      |
| 7\. **Change the Date Aggregation**      | <img src="images/Tutorials-CandlestickChart-Changing-Aggregation.png" alt="Changing date aggregation" width="300"/>                       | Select the **Date** field in the *Label* placeholder of the data editor, and change the **Date Aggregation** to **Day**. Then, select *Update Field*. |

<a name='changing-axis-configuration'></a>
### Changing your Axis Configuration

Like [gauge bounds](tutorial-gauge-views.html#adding-bounds-gauge), chart axis
configuration allows you to set the lowest and highest values in your
chart. You can use this feature to include or exclude specific data.

In order to access the axis configuration menu:

|                                             |                                                                                               |                                                             |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 1\. **Access the Settings Menu**            | <img src="images/Tutorials-Navigate-Settings.png" alt="Navigating to Settings" width="300"/>  | Go to the **Settings** section in the Visualization Editor. |
| 2\. **Navigate to the Axis Bounds section** | <img src="images/Access-Axis-Configuration.png" alt="Navigating to Axis Bounds" width="300"/> | The settings you will change will be the **Axis Bounds**.   |

Depending on whether you want to set the minimum or maximum value (or
both), you will need to access one of the following options:

#### Changing the Minimum Bound

The default value is set to *Auto*. In order to set a different bound, enter the value you want the chart to start with.

#### Changing the Maximum Bound

For Maximum bounds, the default will be set to "Automatic" so that
Reveal uses your original data. In order to set a different one, enter
the value you want for the chart's top limit.

<a name='setting-logarithmic-axis'></a>
### Setting your Axis Configuration as Logarithmic

|                                        |                                                                                                              |                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1\. **Access the Settings Menu**       | <img src="images/Tutorials-Navigate-Settings.png" alt="Navigating to Settings" width="300"/>                 | Go to the **Settings** section of the Visualization Editor. |
| 2\. **Change the Axis to Logarithmic** | <img src="images/Access-Candlestick-Axis-Configuration.png" alt="Accessing Axis configuration" width="300"/> | Open the **Axis** dropdown and select **Logarithmic**.      |
