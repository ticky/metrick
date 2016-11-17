/* global describe, it, expect */
import * as index from './index';
const { Unit, ...modules } = index;

// extract exposed constructors and units
const { constructors: CONSTRUCTORS, units: UNIT_TYPES } = (() => {
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
  CONSTRUCTORS.forEach((constructorName) => {
    // TODO: describe(`\`${constructorName}\``, () => {});
  });
});

UNIT_TYPES.forEach((unitTypeName) => {
  const UNIT_NAMES = Object.keys(modules[unitTypeName]).sort();

  describe(`\`${unitTypeName}\` type units`, () => {
    it('are exported as expected', () => {
      expect(UNIT_NAMES).toMatchSnapshot();
    });

    UNIT_NAMES.forEach((unitType) => {
      describe(`\`${unitType}\` unit`, () => {
        it('has the correct multiplier', () => {
          expect(modules[unitTypeName][unitType].multiplier).toMatchSnapshot();
        });

        it('exposes an `in` function', () => {
          expect(modules[unitTypeName][unitType].in).toBeInstanceOf(Function);
        });

        it('exposes a custom `bind` function', () => {
          expect(modules[unitTypeName][unitType].bind).toBeInstanceOf(Function);
          expect(modules[unitTypeName][unitType].bind).not.toBe(Function.prototype.bind);
        });

        it('converts to an implicit quantity when simply bound', () => {
          expect(1::modules[unitTypeName][unitType]).toMatchSnapshot();
          expect(50::modules[unitTypeName][unitType]).toMatchSnapshot();
          expect((-12)::modules[unitTypeName][unitType]).toMatchSnapshot();
        });

        UNIT_NAMES.forEach((dataTypeTo) => {
          it(`converts correctly into \`${dataTypeTo}\``, () => {
            expect(0::modules[unitTypeName][unitType].in(modules[unitTypeName][dataTypeTo])).toMatchSnapshot();
            expect(1::modules[unitTypeName][unitType].in(modules[unitTypeName][dataTypeTo])).toMatchSnapshot();
            expect(50::modules[unitTypeName][unitType].in(modules[unitTypeName][dataTypeTo])).toMatchSnapshot();
            expect((-12)::modules[unitTypeName][unitType].in(modules[unitTypeName][dataTypeTo])).toMatchSnapshot();
          });
        });
      });
    });
  });
});
