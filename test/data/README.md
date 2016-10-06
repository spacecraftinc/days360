# Reference Data

The directory contains reference data to validate `days360` calculation compatibility with various office suites. The data consists of a 36x36 matrix, generated from the test vector of dates from [https://bz.apache.org/ooo/show_bug.cgi?id=84934](https://bz.apache.org/ooo/show_bug.cgi?id=84934). This directory also contains the US/NASD dataset from the [days360](https://github.com/tamaloa/days360) gem.

The following office suites were used to generate the data:

* Google Sheets
* Apple Numbers 4.0
* Microsoft Excel 15.18
* LibreOffice Calc 5.5.2
* OpenOffice Calc 4.1.2

Microsoft Excel and Apple Numbers both offer desktop and web-based versions. It was verified that both versions generate the same data.
