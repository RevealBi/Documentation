---
title: How to Use Information Calculated Fields in Reveal 
_description: Learn how to utilize and test the value of a selected field through Information Calculated Fields.
---

# Information Calculated Fields

Information calculated fields are meant to be used to test the value of
a selected field. They are particularly useful with large spreadsheets because you can check what type of information you are working with before performing a second calculation.

The functions included in the information category are:

| **Function Name**                                                                                                                    | **Syntax and Sample**                                               |
|--------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| **empty**: `empty` can be used to insert a column with empty cells. There are no arguments to configure.                             | **Syntax**: `empty()`<br/>**Sample**: `empty()`                     |
| [**isempty**](#isempty): `isempty` evaluates the specified `expression`, and checks if any row in your data source has empty values. | **Syntax**: `isempty({value})`<br/>**Sample**:`isempty([ResignedDate])` |



<a name='isempty'></a>
## isempty

Unlike empty, isempty will check the field you select and check every
row in your datasheet. If there are no values in a row, the output will
be 1; if there are values, you will see 0.

### Sample

| Function Name | Syntax             | Sample                    |
| ------------- | ------------------ | ------------------------- |
| isempty       | `isempty({value})` | `isempty([ResignedDate])` |

Let's look at four lines in the [HR Dataset 2016](http://download.infragistics.com/reportplus/help/samples/HR%20Dataset_2016.xlsx) spreadsheet.

| EmployeeID | FullName          | …​ | Resigned Date   | …​ | Calculated Field |
| ---------- | ----------------- | -- | --------------- | -- | ---------------- |
| 1.00       | Joan Baez         | …​ |                 | …​ | 1.00             |
| 4.00       | Zurcher Reid      | …​ | **28-Dec-2016** | …​ | 0.00             |
| 22.00      | Zornes Hall       | …​ |                 | …​ | 1.00             |
| 35.00      | Zdiarski Campbell | …​ | **09-Apr-2016** | …​ | 0.00             |
