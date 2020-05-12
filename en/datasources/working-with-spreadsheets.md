## Working With Spreadsheets in Reveal

Below are a couple of helpful tips and tricks for working with
spreadsheets within Reveal.

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><img src="images/excel.png" alt="excel" /> <img src="images/csv.png" alt="csv" /><br />
</p>
<p><em>Reveal expects your data to be organized in columns</em> and will name fields after the spreadsheet's first row. If your data is organized in rows instead, you can <a href="#transposing-spreadsheets">transpose</a> the fields in Reveal.</p>
<p><a href="~/en/data-visualizations/visualizations-editor.md">LEARN MORE</a><br />
</p></td>
<td><p><img src="images/csv.png" alt="csv" /><br />
</p>
<p><strong>When working with CSV files, avoid formatting the spreadsheet</strong>. Instead, apply any necessary formatting (1000 comma separators, currency signs, etc.) through Reveal.</p>
<p><a href="~/en/fields/field-settings.md">LEARN MORE</a><br />
</p></td>
<td><p><img src="images/excel.png" alt="excel" /><br />
</p>
<p><strong>For 2 or more series charts, the order in which you drop fields</strong> in "Columns", "Rows" and "Values" <strong>will determine how the chart is plotted</strong>, regardless of the column order in your Excel file.</p></td>
</tr>
<tr class="even">
<td><p><img src="images/excel.png" alt="excel" /> <img src="images/csv.png" alt="csv" /><br />
</p>
<p><strong>If columns have different types of data combined</strong> (strings, numbers, etc.), <strong>Reveal will treat them as a column with strings only</strong>. This will affect, among other things, formatting.</p></td>
<td><p><img src="images/p-lock.png" alt="p lock" /><br />
</p>
<p>Password-protected files and hidden ranges are not supported in Reveal.</p></td>
<td></td>
</tr>
</tbody>
</table>

### Data Ranges

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><img src="images/excel.png" alt="excel" /> <img src="images/csv.png" alt="csv" /><br />
</p>
<p><em>Excel files allow you to select a custom range of data within your spreadsheet</em>, while CSV do not. If you need to select specific data, make sure you always work with an Excel spreadsheet.</p></td>
<td><p><img src="images/excel-columns.png" alt="excel columns" /><br />
</p>
<p>If you have a spreadsheet with a named range, you can <strong>choose that specific Named Range as a data source</strong>.</p></td>
<td><p><img src="images/excel-columns.png" alt="excel columns" /><br />
</p>
<p>If your Excel data is organized in <strong>non-adjacent columns</strong>, Reveal will pick up the <strong>column with most data</strong>.</p></td>
</tr>
</tbody>
</table>

### Dates, Numbers and Percentages

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><img src="images/reveal-logo.png" alt="reveal logo" /><br />
</p>
<p>By default, <strong>numbers will have 2 fraction digits</strong>. To change this, access the <em>Formatting</em> menu for the field.</p>
<p><a href="~/en/fields/field-settings.html#numeric-fields">LEARN MORE</a><br />
</p></td>
<td><p><img src="images/top-1000.png" alt="top 1000" /><br />
</p>
<p>The 1000 separator is disabled by default, even for large numbers. To turn it on, access the <em>Formatting</em> menu.</p>
<p><a href="~/en/fields/field-settings.html#numeric-fields">LEARN MORE</a><br />
</p></td>
<td><p><img src="images/percentage.png" alt="percentage" /><br />
</p>
<p>If you need to show percentages or currencies, you will need to select that option from the Formatting menu.</p>
<p><a href="~/en/fields/field-settings.html#numeric-fields">LEARN MORE</a><br />
</p></td>
</tr>
<tr class="even">
<td><p><img src="images/excel.png" alt="excel" /><br />
</p>
<p>If you want a date as a column header, make sure you include a ' so Excel will respect your format. The default date format for headers is the full-length format (YYYY-MM-DD 00:00:00 +0000).</p></td>
<td><p><img src="images/percentage.png" alt="percentage" /><br />
</p>
<p>Percentages in Excel sheets will be shown in a 0 to 1 scale unless the format is changed to "Percentage". For example, 39% will be displayed as 0.39.</p></td>
<td></td>
</tr>
</tbody>
</table>

<a name='transposing-spreadsheets'></a>
### Transposing Columns to Rows

When working with Microsoft Excel and Google Sheets, you can use the
transpose functionality to switch columns from rows.

>[!NOTE]**Only the first 200 rows in the spreadsheet will be transposed.**
>You can access the transpose menu in the **Visualization Data** menu when expanding the sheet in your data source.

![Spreadsheets Transpose Data Source Menu](images/spreadsheets-transpose-data-source-menu.png)

You will see a transpose icon in the top right-hand corner next to the
cross button. Once you press it, Reveal will switch columns to rows and
vice-versa.

![Transposing Action Spreadsheet](images/transposing-action-spreadsheet.png)

In the example above, the information in the spreadsheet will be
organized in columns expressing the EmployeeID for each employee in the
company.

![Transposing Action Final Spreadsheet](images/transposing-action-final-spreadsheet.png)

Once you are ready, select the tick icon. This will take you back to the
**Visualization Data** menu, where you will now see the name of the
sheet with a new icon to its left indicating that the sheet has been
modified.

![Transposed Spreadsheet Visualization Data](images/transposed-spreadsheet-visualization-data.png)

### See Also

A common use case is building dashboards with spreadsheets located in a
cloud file sharing service. To learn how to successfully share those
dashboards with other users, please read [Sharing Dashboards with Cloud Files as a DataSource](~/en/dashboards/sharing-dashboards/sharing-dashboards-datasource-files-cloud-provider.md).
