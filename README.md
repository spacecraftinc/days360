# days360

[![CircleCI](https://circleci.com/gh/spacecraftinc/days360/tree/master.svg?style=shield&circle-token=542bc32ce6082e51fb3541f586b8c713b3e112c4)](https://circleci.com/gh/spacecraftinc/days360/tree/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e974cd36a8814f95b01fbd00ed06eca6)](https://www.codacy.com/app/SpaceCraft/days360?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=spacecraftinc/days360&amp;utm_campaign=Badge_Grade)

Calculate the difference between two dates based on the [360 day financial year](https://en.wikipedia.org/wiki/360-day_calendar), using the US/NASD method (30US/360) or European method (30E/360).

Excel's implementation of the US/NASD method has an [incorrect implementation](https://wiki.openoffice.org/wiki/Documentation/How_Tos/Calc:_Date_&_Time_functions#Financial_date_systems). This library provides an Excel compatible US/NASD method.

## Usage

```
const days360 = require('days360');

days360(new Date('2016-01-01'), new Date('2016-12-31')); // returns 360
```

### Arguments

* `startDate`: Start date, as a date or milliseconds since Unix epoch
* `endDate`: End date, as a Date or milliseconds since Unix epoch
* `method`: An optional argument to specify the calculation
    * `days360.US` (`0`): calculate using the US/NASD method, with [Excel compatibility](https://wiki.openoffice.org/wiki/Documentation/How_Tos/Calc:_Date_&_Time_functions#Financial_date_systems)
    * `days360.EU` (`1`): calculate using the European method
    * `days360.US_NASD` (`2`): calculate using the US/NASD method

## Testing

Tests require [Mocha](http://visionmedia.github.com/mocha) and can be run with `npm test` (or `yarn test`).  You can specify Mocha options, such as the reporter, by adding a [mocha.opts](http://visionmedia.github.com/mocha/#mocha.opts) file to the `test` directory.

Running `npm run test:coverage` will generate code coverage reports with [Istanbul](https://github.com/gotwarlost/istanbul). The code coverage reports will be located in the `coverage` directory, which is excluded from the repository.
