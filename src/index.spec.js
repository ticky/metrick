/* global describe, it, expect */
import * as index from './index';
const { ...modules } = index;

// extract exposed constructors and units
const { constructors: CONSTRUCTORS, units: UNIT_TYPES } = (() => { // eslint-disable-line no-unused-vars
  const constructors = [];
  const units = [];

  Object.keys(modules).forEach((moduleName) => {
    if (moduleName === moduleName.toLowerCase()) {
      units.push(moduleName);
    } else {
      constructors.push(moduleName);
    }
  });

  constructors.sort();
  units.sort();

  return { constructors, units };
})();

describe('unit type constructors', () => {
  // CONSTRUCTORS.forEach((constructorName) => {
  //   describe(`\`${constructorName}\``, () => {
  //
  //   });
  // });
});

UNIT_TYPES.forEach((unitTypeName) => {
  const UNIT_NAMES = Object.keys(modules[unitTypeName]).sort();

  describe(`\`${unitTypeName}\` type units`, () => {
    it('are exported as expected', () => {
      expect(UNIT_NAMES).toMatchSnapshot();
    });

    UNIT_NAMES.forEach((unitType) => {
      describe(`\`${unitType}\` unit`, () => {
        it('exposes an `in` function', () => {
          expect(modules[unitTypeName][unitType].in).toBeInstanceOf(Function);
        });

        it('exposes a custom `bind` function', () => {
          expect(modules[unitTypeName][unitType].bind).toBeInstanceOf(Function);
          expect(modules[unitTypeName][unitType].bind).not.toBe(Function.prototype.bind);
        });

        it('converts to an implicit quantity when simply bound', () => {
          const unit = modules[unitTypeName][unitType];

          expect({
            '0': 0::unit,
            '1': 1::unit,
            '10': 10::unit,
            '-1': (-1)::unit
          }).toMatchSnapshot();
        });

        UNIT_NAMES.forEach((dataTypeTo) => {
          const unit = modules[unitTypeName][unitType];
          const toUnit = modules[unitTypeName][dataTypeTo];

          if (unit === toUnit) {
            return;
          }

          it(`converts correctly into \`${dataTypeTo}\``, () => {
            expect({
              '0': 0::unit.in(toUnit),
              '1': 1::unit.in(toUnit),
              '10': 10::unit.in(toUnit),
              '-1': (-1)::unit.in(toUnit)
            }).toMatchSnapshot();
          });
        });
      });
    });
  });
});
