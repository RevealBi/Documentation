---
title: How to use String Calculated Fields
_description: Learn how to use String Calculated Fields to create a more precise data visualization.
---

# String Calculated Fields

String calculated fields, except for `sortinterval`, allow you to edit
texts to get different results.

:::note
**Remember to always include strings between quotation marks (" ").**
:::

## String functions

| **Function Name** | **Syntax and Sample**                                                                                                                                                     |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **concatenate**: `concatenate` allows you to join multiple strings of `text` to form a phrase. Spaces are not automatically included, so make sure you include them in your text arguments if necessary. | **Syntax**: `concatenate()`<br/>**Sample**: `concatenate("Getting started", " with", " the", " Reveal", " application")`                                                  |
| **find**: `find` returns the starting position (`number`) of a first string of `text` in a second string if `text` as specified in your arguments. | **Syntax**: `find({find text},{within text},{start number})`<br/>**Sample**: `find("with","Getting Started with Reveal visualizations",3)`                                     |
| **len**: `len` returns the number of characters in the string of `text` you enter. | **Syntax**: `len({text})`<br/>**Sample**: `len("Getting Started with Reveal")`                                                                                                 |
| **lower**: `lower` converts all upper case characters in a given `text` string to lower case. | **Syntax**: `lower({text})`<br/>**Sample**: `lower("Getting Started with Reveal")`                                                                                             |
| **mid**: `mid` returns a substring (`length`) of the specified string of `text` according to what you configure in your arguments. | **Syntax**: `mid({text},{start},{length})`<br/>**Sample**: `mid("Getting Started with Reveal",9,12)`                                                                           |
| **replace**: `replace` replaces a given string of `text` with a different `text` as specified in your arguments. | **Syntax**: `replace({text},{old text},{new text})`<br/>**Sample**: `replace("Getting Started with Reveal","Getting Started","Creating Visualizations with")`                  |
| **sortinterval**: `sortinterval` returns a value in a(n) interval(s) according to what is configured in the arguments. The string is returned with format `NN [from,to]` | **Syntax**: `sortinterval()`<br/>**Sample 1**: `sortinterval(33,140)`**Sample 2**: `sortinterval([Wage],150000)`**Sample 3**: `sortinterval([Wage],50000,80000,110000,140000)` |
| **trim**: `trim` returns the same string of `text` you enter; however, it will remove any leading or trailing whitespaces, and will only keep the spaces between words. | **Syntax**: `trim({text})`<br/>**Sample**: `trim(" Getting Started with Reveal ")`                                                                                             |
| **upper**: `upper` converts all lower case characters in a given `text` string to upper case. | **Syntax**: `upper({text})`<br/>**Sample**: `upper("Caution: Hot. Do not touch")`                                                                                              |



## Find

The find function returns the starting position of a first string in a
second string as specified in your arguments.

### Syntax

There are three arguments you need to configure:

  - `text`: the text you want to find.

  - `within text`: the text in which you want to carry out the search.

  - `start number`: the character from which you want to start looking.

### Sample

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


## Mid

The mid calculated field returns a substring of the specified string
according to what you configure in your arguments.

### Syntax

There are three parameters for you to configure:

  - `text`: the text you want to select the string from.

  - `start`: the character where you want to start your new substring.

  - `length`: the length of your substring.

### Sample

Let's take a look at the sample included in the table above:

| Function Name | Text                            | Start | Length | Output       |
| ------------- | ------------------------------- | ----- | ------ | ------------ |
| mid(…​)       | `"Getting Started with Reveal"` | `9`   | `12`   | Started with |

The output is `Started with` because of what is in the text string
starting at character 9 and lasting 12 characters:

| C. 9  | C. 10 | C. 11 | C. 12 | C. 13 | C. 14 | C. 15 | C. 16 | C. 17 | C. 18 | C. 19 | C. 20 |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **S** | **t** | **a** | **r** | **t** | **e** | **d** |       | **w** | **i** | **t** | **h** |


## Replace

The replace function replaces a given string with a different one as
specified in your arguments.

### Syntax

There are three arguments for you to configure:

  - `text`: the original, complete, string of text.

  - `old text`: the string you want to replace.

  - `new text`: the text you want to replace your old string with.

### Sample

Let's look at the following sample:

<table style={{ width: '100%' }}>
    <tr>
        <th style={{ width: '15%' }}>Function Name</th>
        <th style={{ width: '32%' }}>Text</th>
        <th style={{ width: '10%' }}>Old Text</th>
        <th style={{ width: '13%' }}>New Text</th>
        <th style={{ width: '30%' }}>Output</th>
    </tr>
    <tr>
        <td><code>replace(…​)</code></td>
        <td><code>"Using Reveal for iOS can be fast and easy. First, open the AppStore and look for Reveal. Then, install it. You're ready!"</code></td>
        <td><code>"Reveal"</code></td>
        <td><code>"our BI tool"</code></td>
        <td>Using <strong><code>our BI tool</code></strong> for iOS can be fast and easy. First, open the AppStore and look for <strong><code>our BI tool</code></strong>. Then, install it. You're ready!</td>
    </tr>
</table>


Note that the old text got replaced both times; **make sure you consider
that the term will be changed every time it appears before you change
it**.


## Sortinterval

The sortinterval function returns a value in a(n) interval(s) according
to what is configured in the arguments.

### Syntax

The format for the returned string will be `NN [from, to]`.

### Samples

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
