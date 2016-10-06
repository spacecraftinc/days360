'use strict';

/**
 * Imports
 */
const assert = require('assert');
const days360 = require('../');

describe('days360(startDate, endDate, [method])', () => {
  it('should return undefined if the start date is not a valid date', () => {
    const values = [
      true,
      false,
      '',
      'test',
      -10,
      [],
      {},
      null,
      undefined,
      /test/i,
      assert.ok,
      new Date('test'),
    ];
    values.forEach((value) => {
      assert.strictEqual(days360(value, new Date()), undefined);
    });
  });

  it('should return undefined if the end date is not a valid date', () => {
    const values = [
      true,
      false,
      '',
      'test',
      -10,
      [],
      {},
      null,
      undefined,
      /test/i,
      assert.ok,
      new Date('test'),
    ];
    values.forEach((value) => {
      assert.strictEqual(days360(new Date(), value), undefined);
    });
  });

  it('should calculate the number of days between two dates using the US_NASD formula', () => {
    const values = [
      { start: '2016-01-15', end: '2016-12-31', expected: 346 },
      { start: '2016-03-31', end: '2016-12-31', expected: 270 },
      { start: '2016-01-01', end: '2016-12-31', expected: 360 },
      { start: '2016-02-29', end: '2016-02-29', expected: 0 },
      { start: '2015-02-28', end: '2015-02-28', expected: 0 },
    ];
    values.forEach((value) => {
      const start = new Date(`${value.start} 00:00:00 GMT`);
      const end = new Date(`${value.end} 00:00:00 GMT`);
      assert.strictEqual(days360(start, end, days360.US_NASD), value.expected);
    });
  });

  it('should calculate the number of days between two dates using the US formula', () => {
    const values = [
      { start: '2016-01-15', end: '2016-12-31', expected: 346 },
      { start: '2016-03-31', end: '2016-12-31', expected: 270 },
      { start: '2016-01-01', end: '2016-12-31', expected: 360 },
      { start: '2016-02-29', end: '2016-02-29', expected: -1 },
      { start: '2015-02-28', end: '2015-02-28', expected: -2 },
    ];
    values.forEach((value) => {
      const start = new Date(`${value.start} 00:00:00 GMT`);
      const end = new Date(`${value.end} 00:00:00 GMT`);
      assert.strictEqual(days360(start, end), value.expected);
      assert.strictEqual(days360(start, end, days360.US), value.expected);
    });
  });

  it('should calculate the number of days between two dates using the EU formula', () => {
    const values = [
      { start: '2016-01-15', end: '2016-12-31', expected: 345 },
      { start: '2016-03-31', end: '2016-12-31', expected: 270 },
      { start: '2016-01-01', end: '2016-12-31', expected: 359 },
      { start: '2016-02-29', end: '2016-02-29', expected: 0 },
      { start: '2015-02-28', end: '2015-02-28', expected: 0 },
    ];
    values.forEach((value) => {
      const start = new Date(`${value.start} 00:00:00 UTC`);
      const end = new Date(`${value.end} 00:00:00 UTC`);
      assert.strictEqual(days360(start, end, days360.EU), value.expected);
    });
  });

  it('should accept the dates as ticks', () => {
    const values = [
      { start: '2016-01-15', end: '2016-12-31', expected: 346 },
      { start: '2016-03-31', end: '2016-12-31', expected: 270 },
      { start: '2016-01-01', end: '2016-12-31', expected: 360 },
      { start: '2016-02-29', end: '2016-02-29', expected: -1 },
      { start: '2015-02-28', end: '2015-02-28', expected: -2 },
    ];
    values.forEach((value) => {
      const start = new Date(`${value.start} 00:00:00 UTC`);
      const end = new Date(`${value.end} 00:00:00 UTC`);
      assert.strictEqual(days360(start.valueOf(), end), value.expected);
      assert.strictEqual(days360(start, end.valueOf()), value.expected);
      assert.strictEqual(days360(start.valueOf(), end.valueOf()), value.expected);
    });
  });
});
