import Unit from './unit';

export default class Temperature extends Unit {}

// Base temperature unit is kelvin
export const kelvin = new Temperature();
export const degreesKelvin = kelvin;

export const celsius = new Temperature(
  (value) => (
    value + 273.15
  ),
  (value) => (
    value - 273.15
  )
);
export const degreesCelsius = celsius;

export const fahrenheit = new Temperature(
  (value) => (
    (value + 459.67) * 5 / 9
  ),
  (value) => (
    value * 1.8 - 459.67
  )
);
export const degreesFahrenheit = fahrenheit;
