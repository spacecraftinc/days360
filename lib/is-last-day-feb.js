'use strict';

/**
 * Format a date as yyyymd
 *
 * @oaram   {Date}    value   Date to format
 * @returns {String}  formatted date
 */
function formatDate(value) {
  return `${value.getUTCFullYear()}${value.getUTCMonth()}${value.getUTCDate()}`;
}
/**
 * Check if a date is the last day of February
 *
 * @param   {Date}      value   Date to validate
 * @returns {Boolean}   true if the last day of February
 */
module.exports = (value) => {
  if (value.getUTCMonth() === 1) {
    return formatDate(new Date(value.getUTCFullYear(), 2, 0)) === formatDate(value);
  }
  return false;
};
