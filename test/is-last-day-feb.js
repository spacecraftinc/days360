'use strict';

/**
 * Imports
 */
const assert = require('assert');
const isLastDay = require('../lib/is-last-day-feb');

describe('isLastDay(value)', () => {
  it('should return false if the date is not the last day in February', () => {
    const values = [
      '2016-01-31',
      '2016-02-01',
      '2016-02-28',
      '2016-03-31',
      '2016-04-30',
    ];
    values.forEach((value) => {
      assert.strictEqual(isLastDay(new Date(value)), false);
    });
  });

  it('should return true if the date is the last day in February', () => {
    const values = [
      '2015-02-28',
      '2016-02-29',
    ];
    values.forEach((value) => {
      assert.strictEqual(isLastDay(new Date(value)), true);
    });
  });
});
