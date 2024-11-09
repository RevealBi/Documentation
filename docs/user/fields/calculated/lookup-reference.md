---
title: How to use Lookup & Reference Calculated Fields
_description: Learn how to use Lookup & Reference Calculated Fields to get more details for your dashboards.
---

# Lookup & Reference Calculated Fields


Lookup and reference fields will allow you to work with your current
spreadsheet and dashboard, returning text references to cells, rows and
dashboard variables.

:::note
All samples included in the table below were created with the **[HR Dataset 2016](../../../../static/data/HR%20Dataset_2016.xlsx)** spreadsheet.
:::

## Lookup and Reference functions

| **Function Name** | **Syntax and Sample**                                                                   |
|-------------------|-----------------------------------------------------------------------------------------|
| [**previous**](#previous): `previous` allows you to get a result with the value of the field you choose as your `expression`. | **Syntax**: `previous({expression},{first value})`<br/>**Sample**: `previous([Wage],1)` |
| **row**: `row` returns the number of the current row for every row in your data source. | **Syntax**: `row()`<br/>**Sample**: `row()`                                                  |



## Previous

The previous calculated field allows you to get a result with the value
of the field you choose as your `expression`. There are two arguments
for you to configure:

  - `expression`: one of the fields in your data source.

  - `first value`: the value for your first row, which will be empty by
    default.

### Sample

The following is an extract of the [HR Dataset 2016](../../../../static/data/HR%20Dataset_2016.xlsx) "Employees"
sheet.

| EMPLOYEEID | FULLNAME          | DEPARTMENT  | OFFICE                    | WAGE     |
| ---------- | ----------------- | ----------- | ------------------------- | -------- |
| 1.00       | Joan Baez         | Development | Montevideo, Uruguay       | 36542.00 |
| 2.00       | Zurbuch Thompson  | Development | Cranbury, New Jersey, USA | 76865.00 |
| 3.00       | Zimmermann Miller | Development | Cranbury, New Jersey, USA | 73768.00 |
| 4.00       | Zurcher Reid      | Development | Sofia, Bulgaria           | 36018.00 |

Let's add the following calculated field:

`previous([Wage],1)`

The results of the calculated field will be:

| EMPLOYEEID | FULLNAME          | DEPARTMENT  | OFFICE                    | WAGE         | previous Field |
| ---------- | ----------------- | ----------- | ------------------------- | ------------ | -------------- |
| 1.00       | Joan Baez         | Development | Montevideo, Uruguay       | **36542.00** | **1.00**       |
| 2.00       | Zurbuch Thompson  | Development | Cranbury, New Jersey, USA | **76865.00** | **36542.00**   |
| 3.00       | Zimmermann Miller | Development | Cranbury, New Jersey, USA | **73768.00** | **76865.00**   |
| 4.00       | Zurcher Reid      | Development | Sofia, Bulgaria           | 36018.00     | **73768.00**   |

As seen in the table, the second row returns the `[WAGE]` value for the
second row, and fills the first cell of the column with `1`, as set in
your formula.
