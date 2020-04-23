## Math Calculated Fields


All functions in the Math category will be useful for you to perform
calculations on the fly. Certain functions, like the `rand` and the
`randbetween` functions, are particularly useful to randomize the order
of the rows in your data source.

The functions in this category are:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-cly1{text-align:left;vertical-align:middle}
.tg .tg-0lax{text-align:left;vertical-align:top}
.gray-snippet-cstm{color: #666;background-color: #ddd;}
</style>
<table class="tg">
  <tr>
    <th class="tg-cly1"><span style="font-weight:bold">Function Name</span></th>
    <th class="tg-cly1"><span style="font-weight:bold">Syntax and Sample</span></th>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">abs</span>: <span class="gray-snippet-cstm">abs</span> returns the absolute value (the number without the sign) for a number you enter.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">abs({number})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">abs(-3)</span></td>
  </tr>
  <tr>
    <td class="tg-cly1" rowspan="2"><span style="font-weight:bold">exp</span>: <span class="gray-snippet-cstm">exp</span> returns e (<a href="https://www.nde-ed.org/EducationResources/Math/Math-e.php">Euler's Number</a>) raised to a value you enter.</td>
    <td class="tg-cly1"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">exp({number})</span></td>
  </tr>
  <tr>
    <td class="tg-cly1"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">exp(8)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">log</span>: <span class="gray-snippet-cstm">log</span> returns the logarithm of a number to the base that you specify in the arguments. If no base is entered, Reveal assumes that the logarithm base is "10".</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">log({number},{logbase})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">log(10,4)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">log10</span>: <span class="gray-snippet-cstm">log10</span> returns the logarithm of a number. However, the base is always set to 10.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">log10({number})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">log10(1500)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">mod</span>: <span class="gray-snippet-cstm">mod</span> returns the remainder, or fractional part, of a division between two numbers.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">mod({number},{divisor})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">od(5,3)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">rand</span>: <span class="gray-snippet-cstm">rand</span> returns Real numbers larger than 0 and smaller than 1. The function takes no arguments. While you do not need to configure any arguments, you can include mathematical operators to further modify for your random numbers.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">rand()</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">rand()</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">randbetween</span>: <span class="gray-snippet-cstm">randbetween</span> returns integer numbers that fall in the range you specify in the function arguments. You can include mathematical operators to further modify for your random numbers.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">randbetween({bottom},{top}</span>)</td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">randbetween(0,9878654)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">sign</span>: <span class="gray-snippet-cstm">sign</span> determines and returns the sign of a number.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">sign({number})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">sign(-1564)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">sqrt</span>: <span class="gray-snippet-cstm">sqrt</span> returns the square root of a specified number.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">sqrt({number})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">sqrt(427716)</span></td>
  </tr>
  <tr>
    <td class="tg-0lax" rowspan="2"><span style="font-weight:bold">trunc</span>: <span class="gray-snippet-cstm">trunc</span> returns the integer part of a number; that is, not the decimals.</td>
    <td class="tg-0lax"><span style="font-weight:bold">Syntax</span>: <span class="gray-snippet-cstm">trunc({number})</span></td>
  </tr>
  <tr>
    <td class="tg-0lax"><span style="font-weight:bold">Sample</span>: <span class="gray-snippet-cstm">trunc(65787.24657)</span></td>
  </tr>
</table>                                                                                                                                                                                                     
