import Unit from './unit';

export default class Temperature extends Unit {}

// Base temperature unit is kelvin
export const kelvin = new Temperature();
export const degreesKelvin = kelvin;

const CELSIUS_OFFSET = 273.15;
export const celsius = new Temperature({
  convertToBase(value) {
    return value + CELSIUS_OFFSET;
  },

  convertFromBase(value) {
    return value - CELSIUS_OFFSET;
  }
});
export const degreesCelsius = celsius;

const FAHRENHEIT_OFFSET = 459.67;
const FAHRENHEIT_DIVISOR = (5 / 9);
export const fahrenheit = new Temperature({
  convertToBase(value) {
    return (value + FAHRENHEIT_OFFSET) * FAHRENHEIT_DIVISOR;
  },

  convertFromBase(value) {
    return value / FAHRENHEIT_DIVISOR - FAHRENHEIT_OFFSET;
  }
});
export const degreesFahrenheit = fahrenheit;
