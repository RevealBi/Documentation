## Known Issues

  - [Only Web](#web)

  - [Issues Affecting All Platforms](#issues-all-platforms)

<a name='web'></a>
### Web

  - When working with the JSON advanced editor in the Web platform,
    Date/Time fields are recognized as String fields instead.

  - When exporting a dashboard in the Web platform, there is one
    particular case in which you will get a blank image in place of a
    visualization. The issue happens when the dashboard includes a
    visualization that shows either an image or PDF document from a
    cloud provider. As a workaround, you can do the export from any
    other platform (Android, iOS, or Desktop).

  - Combining data sources in one visualization (data blending) is not
    supported for transposed data. Please note that you get transposed
    data by switching columns from rows in a spreadsheet.

<a name='issues-all-platforms'></a>
### Issues Affecting All Platforms

  - The original data is not displayed after a Grid sorting has been
    removed.

  - CSV and JSON data providers don't detect numeric columns when values
    have a thousands separator.
