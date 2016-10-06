'use strict';

/**
 * Imports
 */
const assert = require('assert');
const isNumber = require('../lib/is-number');

describe('isNumber(value)', () => {
  it('should return false if the value is not a number or is NaN', () => {
    const values = [
      true,
      false,
      '',
      'test',
      new Date(),
      [],
      {},
      null,
      undefined,
      /test/i,
      assert.ok,
      1 / 'a',
    ];
    values.forEach((value) => {
      assert.strictEqual(isNumber(value), false);
    });
  });
  it('should return true if the value is a valid number', () => {
    const values = [
      -10,
      0,
      100,
      Infinity,
      -Infinity,
    ];
    values.forEach((value) => {
      assert.strictEqual(isNumber(value), true);
    });
  });
});
