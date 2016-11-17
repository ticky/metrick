export default class Unit {
  constructor(multiplier = 1) {
    this.multiplier = multiplier;

    const fromUnit = this;

    fromUnit.in = function(toUnit) {
      const value = this;

      return (::fromUnit.convertTo(value, toUnit));
    };
  }

  bind(value) {
    // this is a bit of a syntactic hack - since bind is actually just a
    // function call, we can return something other than a function here

    const fromUnit = this;
    const toUnit = fromUnit.constructor.implicitUnit || new (fromUnit.constructor)();

    return (::fromUnit.convertTo(value, toUnit));
  }

  convertTo(value, toUnit) {
    if (typeof value !== 'number') {
      throw new TypeError(
        `${this.constructor.name}.in: Cannot be used on a non-number! We were given a \`${typeof value}\`.`
      );
    }

    if (!(toUnit instanceof this.constructor)) {
      throw new TypeError(
        `${this.constructor.name}.in: Passed unit must be the same type! Passed unit was a \`${toUnit.constructor.name}\`.`
      );
    }

    return value * this.multiplier / toUnit.multiplier;
  }
}
