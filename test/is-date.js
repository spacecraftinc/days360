'use strict';

/**
 * Imports
 */
const assert = require('assert');
const isDate = require('../lib/is-date');

describe('isNumber(value)', () => {
  it('should return false if the value is not a valid date', () => {
    const values = [
      true,
      false,
      '',
      'test',
      -10,
      0,
      100,
      [],
      {},
      null,
      undefined,
      /test/i,
      assert.ok,
      new Date('test'),
    ];
    values.forEach((value) => {
      assert.strictEqual(isDate(value), false);
    });
  });
  it('should return true if the value is a valid date', () => {
    const values = [
      new Date(),
      new Date('2016'),
    ];
    values.forEach((value) => {
      assert.strictEqual(isDate(value), true);
    });
  });
});

