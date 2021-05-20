export = days360;

/**
Calculates the nubmer of days between two dates based on a 360-day year, using the US/NASD method (30US/360) or European method (30E/360).

Reference:
- https://en.wikipedia.org/wiki/360-day_calendar
- https://wiki.openoffice.org/wiki/Documentation/How_Tos/Calc:_Date_&_Time_functions#Financial_date_systems

@param   {Date|Number}    startDate Start date, as a Date or milliseconds since Unix epoch
@parma   {Date|Number}    endDate   End date, as a Date or milliseconds since Unix epoch
@param   {Boolean|Number} [method]  `0` to calculate using the US/NASD method, with Excel compatibility (default), `1` to calculate using the European method or `2` to calculate using the US/NASD method
@returns {Number}         number of days
*/
declare function days360(startDate: Date | number, endDate: Date | number, method?: boolean | 0 | 1 | 2): number;

declare namespace days360 {
  /** calculate using the US/NASD method, with Excel compatibility */
  export const US: 0;
  /** calculate using the European method */
  export const EU: 1;
  /** calculate using the US/NASD method */
  export const US_NASD: 2;
}
