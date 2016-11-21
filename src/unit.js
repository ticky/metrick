export default class Unit {
  constructor(unitToBaseOrMultiplier = 1, unitFromBase) {
    const fromUnit = this;

    fromUnit.in = function(toUnit) {
      const value = this;

      return (::fromUnit.convertTo(value, toUnit));
    };

    if (typeof unitToBaseOrMultiplier === 'number') {
      fromUnit.multiplier = unitToBaseOrMultiplier;

      return fromUnit;
    } else if (typeof unitToBaseOrMultiplier === 'function') {
      if (typeof unitFromBase !== 'function') {
        throw new TypeError(
          `${fromUnit.constructor.name}: If a \`convertToBase\` function is supplied, a \`convertFromBase\` function must also be supplied!`
        );
      }

      fromUnit.convertToBase = unitToBaseOrMultiplier;
      fromUnit.convertFromBase = unitFromBase;

      return fromUnit;
    }

    throw new TypeError(
      `${fromUnit.constructor.name}: Unsupported arguments! Got ${typeof unitToBaseOrMultiplier} and ${typeof unitFromBase}!`
    );
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
