'use strict';

/**
 * Constants
 */
const TYPE = '[object Number]';

/**
 * toString reference
 */
const { toString } = Object.prototype;

/**
 * Check if a value is a number and not NaN
 *
 * @param   {Number}    value     Value to validate
 * @returns {Boolean}   true if a valid number
 */
module.exports = (value) => {
  if (toString.call(value) === TYPE && value === +value) {
    return true;
  }
  return false;
};
