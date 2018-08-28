'use strict';

/**
 * Imports
 */
const isNumber = require('./is-number');

/**
 * Constants
 */
const TYPE = '[object Date]';

/**
 * toString reference
 */
const { toString } = Object.prototype;

/**
 * Check if a value is a valid date
 *
 * @param   {Date}      value     Value to validate
 * @returns {Boolean}   true if a valid date
 */
module.exports = (value) => {
  if (toString.call(value) === TYPE) {
    return isNumber(value.valueOf());
  }
  return false;
};

