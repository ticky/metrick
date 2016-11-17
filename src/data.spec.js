/* global describe, it, expect */
import * as data from './data';

const DATA_NAMES = Object.keys(data)
  .filter((dataType) => dataType !== 'default')
  .sort();

// TODO: describe('Data', () => {});

describe('data', () => {
  it('are exported as expected', () => {
    expect(DATA_NAMES).toMatchSnapshot();
  });

  DATA_NAMES.forEach((dataType) => {
    describe(`\`${dataType}\``, () => {
      it('has the correct multiplier', () => {
        expect(data[dataType].multiplier).toBeGreaterThan(0);
        expect(data[dataType].multiplier).toMatchSnapshot();
      });

      it('exposes an `in` function', () => {
        expect(data[dataType].in).toBeInstanceOf(Function);
      });

      it('exposes a custom `bind` function', () => {
        expect(data[dataType].bind).toBeInstanceOf(Function);
        expect(data[dataType].bind).not.toBe(Function.prototype.bind);
      });

      it('converts to an implicit quantity when simply bound', () => {
        expect(1::data[dataType]).toBeGreaterThan(0);
        expect(1::data[dataType]).toMatchSnapshot();
      });

      DATA_NAMES.forEach((dataTypeTo) => {
        it(`converts correctly into \`${dataTypeTo}\``, () => {
          expect(1::data[dataType].in(data[dataTypeTo])).toMatchSnapshot();
        });
      });
    });
  });
});
