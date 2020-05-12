## String Calculated Fields

String calculated fields, except for `sortinterval`, allow you to edit
texts to get different results.

**Remember to always include strings between quotation marks (" ").**

The functions included in the String category are:


<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
.tg .tg-yla0{font-weight:bold;text-align:left;vertical-align:middle}
.tg .tg-0lax{text-align:left;vertical-align:top}
.gray-snippet-cstm{color: #666;background-color: #ddd;}
</style>
<table class="tg">
  <tr>
    <th class="tg-cly1"><span style="font-weight:bold">Function Name</span></th>
    <th class="tg-cly1"><span style="font-weight:bold">Syntax and Sample</span></th>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">concatenate</span>: <span class="gray-snippet-cstm">concatenate</span> allows you to join multiple strings of <span class="gray-snippet-cstm">text</span> to form a phrase. Spaces are not automatically included, so make sure you include them in your text arguments if necessary.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">concatenate()</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">concatenate("Getting started"," with"," the"," Reveal"," application")</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><a href="#calc-fields-find">find</a>: <span class="gray-snippet-cstm">find</span> returns the starting position (<span class="gray-snippet-cstm">number</span>) of a first string of <span class="gray-snippet-cstm">text</span> in a second string if <span class="gray-snippet-cstm">text</span> as specified in your arguments.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">find({find text},{within text},{start number})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">find("with","Getting Started with Reveal visualizations",3)</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">len</span>: <span class="gray-snippet-cstm">len</span> returns the number of characters in the string of <span class="gray-snippet-cstm">text</span> you enter.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">len({text})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">len("Getting Started with Reveal")</span></td>
  </tr>
  <tr>
    <td class="tg-yla0" rowspan="2">lower: <span style="font-weight:normal"><span class="gray-snippet-cstm">lower</span> converts all upper case characters in a given <span class="gray-snippet-cstm">text</span> string to lower case</span>.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">lower({text})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">lower("Getting Started with Reveal")</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><a href="#calc-fields-mid">mid</a>: <span class="gray-snippet-cstm">mid</span> returns a substring (<span class="gray-snippet-cstm">length</span>) of the specified string of <span class="gray-snippet-cstm">text</span> according to what you configure in your arguments.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">mid({text},{start},{length})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">mid("Getting Started with Reveal",9,12)</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><a href="#calc-fields-replace">replace</a>: <span class="gray-snippet-cstm">replace</span> replaces a given string of <span class="gray-snippet-cstm">text</span> with a different <span class="gray-snippet-cstm">text</span> as specified in your arguments.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">replace({text},{old text},{new text})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">replace("Getting Started with Reveal","Getting Started","Creating Visualizations with")</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="4"><a href="#calc-fields-sortinterval">sortinterval</a>: <span class="gray-snippet-cstm">sortinterval</span> returns a value in a(n) interval(s) according to what is configured in the arguments. The string is returned with format <span class="gray-snippet-cstm">NN [from,to]</span></td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">sortinterval()</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample 1</span>: <span class="gray-snippet-cstm">sortinterval(33,140)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample 2</span>: <span class="gray-snippet-cstm">sortinterval([Wage],150000)</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample 3:</span> <span class="gray-snippet-cstm">sortinterval([Wage],50000,80000,110000,140000)</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">trim</span>: <span class="gray-snippet-cstm">trim</span> returns the same string of <span class="gray-snippet-cstm">text</span> you enter; however, it will remove any leading or trailing whitespaces, and will only keep the spaces between words.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">trim({text})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">trim(" Getting Started with Reveal ")</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">upper</span>: <span class="gray-snippet-cstm">upper</span> converts all lower case characters in a given <span class="gray-snippet-cstm">text</span> string to upper case.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">upper({text})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">upper("Caution: Hot. Do not touch")</span></td>
  </tr>
</table>


<a name='calc-fields-find'></a>
### Find

The find function returns the starting position of a first string in a
second string as specified in your arguments.

#### Syntax

There are three arguments you need to configure:

  - `text`: the text you want to find.

  - `within text`: the text in which you want to carry out the search.

  - `start number`: the character from which you want to start looking.

#### Sample

Let's take a look at the sample included in the table above:

| Function Name | Find Text | Within Text                                    | Start Number | Output |
| ------------- | --------- | ---------------------------------------------- | ------------ | ------ |
| find(…​)      | `"with"`  | `"Getting Started with Reveal visualizations"` | `3`          | 15     |

The search will start in the first `t` of `Getting`. The resulting 15 is
the character number where the `w` in `with` is located.

| C. 1  | C. 2 | C. 3 | C. 4 | C. 5 | C. 6 | C. 7 | C. 8 | C. 9 | C. 10 | C. 11 | C. 12 | C. 13 | C. 14 | C. 15 |
| ----- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- | ----- | ----- | ----- | ----- | ----- |
| **t** | t    | i    | n    | g    |      | S    | t    | a    | r     | t     | e     | d     |       | **w** |

If `with` were repeated more than once in the phrase, the calculated
field will return the character of the **first occurrence of the word**.

<a name='calc-fields-mid'></a>
### Mid

The mid calculated field returns a substring of the specified string
according to what you configure in your arguments.

#### Syntax

There are three parameters for you to configure:

  - `text`: the text you want to select the string from.

  - `start`: the character where you want to start your new substring.

  - `length`: the length of your substring.

#### Sample

Let's take a look at the sample included in the table above:

| Function Name | Text                            | Start | Length | Output       |
| ------------- | ------------------------------- | ----- | ------ | ------------ |
| mid(…​)       | `"Getting Started with Reveal"` | `9`   | `12`   | Started with |

The output is `Started with` because of what is in the text string
starting at character 9 and lasting 12 characters:

| C. 9  | C. 10 | C. 11 | C. 12 | C. 13 | C. 14 | C. 15 | C. 16 | C. 17 | C. 18 | C. 19 | C. 20 |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **S** | **t** | **a** | **r** | **t** | **e** | **d** |       | **w** | **i** | **t** | **h** |

<a name='calc-fields-replace'></a>
### Replace

The replace function replaces a given string with a different one as
specified in your arguments.

#### Syntax

There are three arguments for you to configure:

  - `text`: the original, complete, string of text.

  - `old text`: the string you want to replace.

  - `new text`: the text you want to replace your old string with.

#### Sample

Let's look at the following sample:

| Function Name | Text                                                                                                                         | Old Text   | New Text        | Output                                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| replace(…​)   | `"Using Reveal for iOS can be fast and easy. First, open the AppStore and look for Reveal. Then, install it. You're ready!"`  | `"Reveal"` | `"our BI tool"` | Using **our BI tool** for iOS can be fast and easy. First, open the AppStore and look for **our BI tool**. Then, install it. You're ready\! |

Note that the old text got replaced both times; **make sure you consider
that the term will be changed every time it appears before you change
it**.

<a name='calc-fields-sortinterval'></a>
### Sortinterval

The sortinterval function returns a value in a(n) interval(s) according
to what is configured in the arguments.

#### Syntax

The format for the returned string will be `NN [from, to]`.

#### Samples

Let's look at one of the samples in the table above:

| Function Name    | Number   | Interval |
| ---------------- | -------- | -------- |
| sortinterval(…​)  | `[Wage]` | `150000` |

In this case, the `Wage` is being compared against one value, and
classified in two different categories: higher than 150K and lower than
150K.

In the following example, however, `Wage` is compared against four
different values, and is classified into five different categories:
lower than 50K, between 50K and 80K, between 80K and 110K, between 110K
and 140K, and higher than 140K.

| Function Name    | Number   | Interval 1 | Interval 2 | Interval 3 | Interval 4 |
| ---------------- | -------- | ---------- | ---------- | ---------- | ---------- |
| sortinterval(…​)  | `[Wage]` | `50000`    | `80000`    | `110000`   | `140000`   |
