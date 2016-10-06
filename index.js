'use strict';

/**
 * Imports
 */
const isNumber = require('./lib/is-number');
const isDate = require('./lib/is-date');
const isLastDay = require('./lib/is-last-day-feb');

/**
 * Constants
 */
const US = 0;
const EU = 1;
const US_NASD = 2;

/**
 * Calculates the nubmer of days between two dates based on a 360-day year, using the US/NASD
 * method (30US/360) or European method (30E/360).
 *
 * Reference:
 * https://en.wikipedia.org/wiki/360-day_calendar
 * https://wiki.openoffice.org/wiki/Documentation/How_Tos/Calc:_Date_&_Time_functions#Financial_date_systems
 *
 * @param   {Date|Number}     startDate     Start date, as a Date or milliseconds since Unix epoch
 * @parma   {Date|Number}     endDate       End date, as a Date or milliseconds since Unix epoch
 * @param   {Boolean|Number}  [method]      0 to calculate using the US/NASD method, with Excel
 *                                          compatibility (default)
 *                                          1 to calculate using the European method
 *                                          2 to calculate using the US/NASD method
 * @returns {Number}          number of days
 */
module.exports = (startDate, endDate, method) => {
  const start = isNumber(startDate) && startDate >= 0 ? new Date(startDate) : startDate;
  if (!isDate(start)) {
    return undefined;
  }
  const end = isNumber(endDate) && endDate >= 0 ? new Date(endDate) : endDate;
  if (!isDate(end)) {
    return undefined;
  }
  let startDay = start.getUTCDate();
  let endDay = end.getUTCDate();
  if (method === EU) {
    // If either date A or B falls on the 31st of the month, that date will be changed to the 30th.
    startDay = Math.min(startDay, 30);
    endDay = Math.min(endDay, 30);
  } else {
    /**
     * If both date A and B fall on the last day of February, then date B will be changed to
     * the 30th (unless preserving Excel compatibility)
     */
    const isStartLast = isLastDay(start);
    if (method === US_NASD && isStartLast && isLastDay(end)) {
      endDay = 30;
    }
    /**
     * If date A falls on the 31st of a month or last day of February, then date A will be changed
     * to the 30th.
     */
    if (isStartLast || startDay === 31) {
      startDay = 30;
    }
    /**
     * If date A falls on the 30th of a month after applying (2) above and date B falls on the
     * 31st of a month, then date B will be changed to the 30th.
     */
    if (startDay === 30 && endDay === 31) {
      endDay = 30;
    }
  }
  return ((end.getUTCFullYear() - start.getUTCFullYear()) * 360)
    + ((end.getUTCMonth() - start.getUTCMonth()) * 30)
    + (endDay - startDay);
};

Object.defineProperties(module.exports, {
  US_NASD: { value: US_NASD, writable: false, enumerable: true },
  US: { value: US, writable: false, enumerable: true },
  EU: { value: EU, writable: false, enumerable: true },
});
