export default class Unit {
  constructor(multiplierOrMethods) {
    const fromUnit = this;

    fromUnit.multiplier = (typeof multiplierOrMethods === 'number')
      ? multiplierOrMethods
      : 1;

    fromUnit.in = function(toUnit) {
      const value = this;

      return (::fromUnit.convertTo(value, toUnit));
    };

    if (multiplierOrMethods instanceof Object) {
      Object.keys(multiplierOrMethods).forEach((overrideMethodName) => {
        if (ALLOWED_OVERRIDES.indexOf(overrideMethodName) === -1) {
          throw new Error(
            `${fromUnit.constructor.name}: Overriding \`${overrideMethodName}\` is not supported!`
          );
        }

        fromUnit[overrideMethodName] = multiplierOrMethods[overrideMethodName];
      });
    }
  }

  bind(value) {
    // this is a bit of a syntactic hack - since bind is actually just a
    // function call, we can return something other than a function here

    const fromUnit = this;
    const toUnit = fromUnit.constructor.implicitUnit || new (fromUnit.constructor)();

    return (::fromUnit.convertTo(value, toUnit));
  }

  convertToBase(value) {
    return value * this.multiplier;
  }

  convertFromBase(value) {
    return value / this.multiplier;
  }

  convertTo(value, toUnit) {
    const fromUnit = this;

    if (typeof value !== 'number') {
      throw new TypeError(
        `${fromUnit.constructor.name}.in: Cannot be used on a non-number! We were given a \`${typeof value}\`.`
      );
    }

    if (!(toUnit instanceof fromUnit.constructor)) {
      throw new TypeError(
        `${fromUnit.constructor.name}.in: Passed unit must be the same type! Passed unit was a \`${toUnit.constructor.name}\`.`
      );
    }

    // convert to base unit using `fromUnit`
    const valueInBase = (::fromUnit.convertToBase(value));

    // convert to `toUnit`
    const valueInToUnit = (::toUnit.convertFromBase(valueInBase));

    return valueInToUnit;
  }
}

const ALLOWED_OVERRIDES = [
  'multiplier',
  // these reference the real function so they throw if renamed
  Unit.prototype.convertToBase.name,
  Unit.prototype.convertFromBase.name
];
