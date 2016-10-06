'use strict';

/**
 * Imports
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const csv = require('csv');
const days360 = require('../');

/**
 * Constants
 */
const DATA_DIR = path.join(__dirname, 'data');
const READ_OPTIONS = { encoding: 'utf8' };
const TOTAL = 36 * 36;
const DATASETS = [
  { name: 'Google Sheets (EU)', filename: 'google-sheets-eu.csv', method: days360.EU },
  { name: 'Google Sheets (US/NASD)', filename: 'google-sheets-us.csv', method: days360.US },
  { name: 'LibreOffice Calc (EU)', filename: 'libreoffice-calc-eu.csv', method: days360.EU },
  { name: 'LibreOffice Calc (US/NASD)', filename: 'libreoffice-calc-us.csv', method: days360.US },
  { name: 'Microsoft Excel (EU)', filename: 'microsoft-excel-eu.csv', method: days360.EU },
  { name: 'Microsoft Excel (US/NASD)', filename: 'microsoft-excel-us.csv', method: days360.US },
  { name: 'US/NASD (US/NASD)', filename: 'nasd.csv', method: days360.US_NASD },
  { name: 'OpenOffice Calc (EU)', filename: 'openoffice-calc-eu.csv', method: days360.EU },
  { name: 'OpenOffice Calc (US/NASD)', filename: 'openoffice-calc-us.csv', method: days360.US },
];

/**
 * Read and parse a dataset CSV
 *
 * @param   {String}    filename      Filename
 * @param   {Function}  cb            Callback function
 */
function readDataset(filename, cb) {
  fs.readFile(path.join(DATA_DIR, filename), READ_OPTIONS, (readError, data) => {
    if (readError) {
      cb(readError);
      return;
    }
    csv.parse(data, (parseError, rows) => {
      if (Array.isArray(rows) && rows.length) {
        cb(null, rows);
        return;
      }
      cb(parseError || new Error('Failed to read dataset'));
    });
  });
}

describe('Compatibility', () => {
  DATASETS.forEach((dataset) => {
    it(`should generate the same results as ${dataset.name}`, (done) => {
      readDataset(dataset.filename, (err, rows) => {
        assert.strictEqual(err, null);
        assert.strictEqual(Array.isArray(rows), true);
        assert.strictEqual(rows.length > 0, true);
        const columnDates = rows[0].map(value => (value ? new Date(value) : value));
        const rowDates = rows.map((values) => {
          const value = values[0];
          return value ? new Date(value) : value;
        });
        let total = 0;
        columnDates.forEach((columnDate, columnIndex) => {
          if (columnIndex > 0) {
            rowDates.forEach((rowDate, rowIndex) => {
              if (rowIndex > 0) {
                const result = days360(rowDate, columnDate, dataset.method);
                const rawValue = rows[rowIndex][columnIndex];
                const expected = rawValue ? parseInt(rawValue, 10) : 0;
                assert.strictEqual(result, expected, `Row ${rowIndex} (${rowDate.toISOString()}), Column ${columnIndex} (${columnDate.toISOString()}) does not match`);
                total += 1;
              }
            });
          }
        });
        assert.strictEqual(total, TOTAL);
        done();
      });
    });
  });
});
