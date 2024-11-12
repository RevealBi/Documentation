---
title: Tips, Samples and Useful Cases for Calculated Fields
_description: Check out some useful tips and samples, as well as useful cases you can use in Reveal data visualization.
---

# Samples, Tips, and Useful Cases
## Basic Sample Expressions

The following are a set of calculated field sample expressions.


| Function Name              | Sample Dataset to Test Function        | Expression                                                        | Sample Output                          |
| -------------------------- |----------------------------------------| ----------------------------------------------------------------- | -------------------------------------- |
| **Opposite Value**         | <a href="/data/HR%20Dataset_2016.xlsx" download>HR Dataset</a> | \-[Wage]                                                          | \-36,542.00 (for Joan Baez)            |
| **Age**                    | <a href="/data/HR%20Dataset_2016.xlsx" download>HR Dataset</a> | (today()-[BirthDate])/365                                         | 50.13 (for Joan Baez)                  |
| **Name & Department**      | <a href="/data/HR%20Dataset_2016.xlsx" download>HR Dataset</a> | [Fullname]& ", " &[Department]                                    | Joan Baez, Development (for Joan Baez) |
|**Sales Percentage** | <a href="/data/Samples.xlsx" download>Samples</a>                                       | [New Sales]*100/sum([New Sales]) | 9,26% (for Japan)                    |
| **Name starts with J**     | <a href="/data/HR%20Dataset_2016.xlsx" download>HR Dataset</a> | if(find("j",lower([Fullname]),1)=1,"Starts with J",0)             | Starts with J, 0                       |
| **Deviation from Avg**     | <a href="/data/HR%20Dataset_2016.xlsx" download>HR Dataset</a> | [Wage]-average([Wage])                                            | \-50476.71 (for Joan Baez)             |


## Converting Unix TimeStamps to Usable Dates

Unix times, defined in the seconds elapsed since January 1st, 1970
("Epoch" time) are particularly useful because they represent all
timezones at once. You can import data sources with unix timestamps and
convert them into usable dates with the [`date`](date)
formula.

`((([Unix Time Stamp]/60)/60)/24)+DATE(1970,1,1)+([Timezone]/24)`

Where:

  - **Original Field**: [Unix Time Stamp]

  - **Convert to Minutes**: /60

  - **Convert to Hours**: /60

  - **Convert to Day**: /24

  - **Adding Epoch Time**: +DATE(1970,1,1)

  - **Adding Timezone**: +([Timezone]/24)

The timezone can be entered as a number, or you can use one of your
fields with a number. In either case, it must be GMT time.


## YoY Analysis: Comparing Revenue Figures for a 2-Year Period

You can create calculated fields, for example, to carry out a simple YOY
analysis.

Let's take a look at the following dashboard, which has the different
divisions for a company and the revenue they represented during two
different years.

![YoyAnalysisRevenue\_All](images/yoy-analysis-revenue-all.png)
You can compare the two figures by using the following calculated field.
The "-1" is used to subtract the total difference for the year.

`([Revenue 2017]/[Revenue 2016])-1`

You can then either keep the number, or [format it as a percentage](../field-settings.md#numeric-fields).

![Comparing Revenue Figures in yoy analysis while using percentage](images/yoy-analysis-percentage-all.png)