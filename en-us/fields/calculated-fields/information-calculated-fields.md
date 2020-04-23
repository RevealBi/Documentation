## Information Calculated Fields

Information calculated fields are meant to be used to test the value of
a selected field. They are particularly useful with large spreadsheets,
because you can check what type of information you are working with
before performing a second calculation.

The functions included in the information category are:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
</style>
<table class="tg">
  <tr>
    <th class="tg-cly1"><span style="font-weight:bold">Function Name</span></th>
    <th class="tg-cly1"><span style="font-weight:bold">Syntax and Sample</span></th>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">empty</span>: empty can be used to insert a column with empty cells. There are no arguments to configure.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: empty()</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: empty()</td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><a href="https://www.revealbi.io/help/information-calculated-fields#calculated-isempty"><span style="font-weight:bold">isempty</span></a>: isempty evaluates the specified expression, and <span style="font-weight:bold">checks if any row in your data source has empty values</span>.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: isempty({value})</td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: isempty([ResignedDate])</td>
  </tr>
</table>

<a name='isempty'></a>
### isempty

Unlike empty, isempty will check the field you select and check every
row in your datasheet. If there are no values in a row, the output will
be 1; if there are values, you will see 0.

#### Sample

| Function Name | Syntax             | Sample                    |
| ------------- | ------------------ | ------------------------- |
| isempty       | `isempty({value})` | `isempty([ResignedDate])` |

Let's look at four lines in the `HR Dataset 2016.xlsx` spreadsheet.

| EmployeeID | FullName          | …​ | Resigned Date   | …​ | Calculated Field |
| ---------- | ----------------- | -- | --------------- | -- | ---------------- |
| 1.00       | Joan Baez         | …​ |                 | …​ | 1.00             |
| 4.00       | Zurcher Reid      | …​ | **28-Dec-2016** | …​ | 0.00             |
| 22.00      | Zornes Hall       | …​ |                 | …​ | 1.00             |
| 35.00      | Zdiarski Campbell | …​ | **09-Apr-2016** | …​ | 0.00             |
