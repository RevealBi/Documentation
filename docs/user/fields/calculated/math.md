---
title: How to use Math Calculated Fields
_description: Learn how to use Math Calculated Fields to perfection your dashboards.
---

# Math Calculated Fields


All functions in the Math category will be useful for you to perform
calculations on the fly. Certain functions, like the `rand` and the
`randbetween` functions, are particularly useful to randomize the order
of the rows in your data source.

The functions in this category are:

   | **Function Name** | **Syntax and Sample** |
|-------------------|-----------------------|
| **abs**: `abs` returns the absolute value (the number without the sign) for a number you enter. | **Syntax**: `abs({number})`**Sample**: `abs(-3)` |
| **exp**: `exp` returns e (Euler's Number) raised to a value you enter. | **Syntax**: `exp({number})`**Sample**: `exp(8)` |
| **log**: `log` returns the logarithm of a number to the base that you specify in the arguments. If no base is entered, the base is assumed to be "10". | **Syntax**: `log({number},{logbase})`**Sample**: `log(10,4)` |
| **log10**: `log10` returns the logarithm of a number to the base 10. | **Syntax**: `log10({number})`**Sample**: `log10(1500)` |
| **mod**: `mod` returns the remainder, or fractional part, of a division between two numbers. | **Syntax**: `mod({number},{divisor})`**Sample**: `mod(5,3)` |
| **rand**: `rand` returns Real numbers larger than 0 and smaller than 1. The function takes no arguments but can be used with mathematical operators for further modifications. | **Syntax**: `rand()`**Sample**: `rand()` |
| **randbetween**: `randbetween` returns integer numbers within a specified range. | **Syntax**: `randbetween({bottom},{top})`**Sample**: `randbetween(0,9878654)` |
| **sign**: `sign` determines and returns the sign of a number. | **Syntax**: `sign({number})`**Sample**: `sign(-1564)` |
| **sqrt**: `sqrt` returns the square root of a specified number. | **Syntax**: `sqrt({number})`**Sample**: `sqrt(427716)` |
| **trunc**: `trunc` returns the integer part of a number, excluding any decimals. | **Syntax**: `trunc({number})`**Sample**: `trunc(65787.24657)` |
                                                                                                                                                                                               
