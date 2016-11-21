# 📏 Metrick
[![npm](https://img.shields.io/npm/v/metrick.svg?maxAge=2592000)](https://www.npmjs.com/package/metrick) ![metrick](https://img.shields.io/npm/l/metrick.svg?maxAge=2592000)  [![Build Status](https://travis-ci.org/ticky/metrick.svg?branch=master)](https://travis-ci.org/ticky/metrick) [![codecov](https://codecov.io/gh/ticky/metrick/branch/master/graph/badge.svg)](https://codecov.io/gh/ticky/metrick)

Babel-powered unit magick

## Introduction

Metrick is a library which allows you to convert units and avoid using magic numbers! In combination with a JavaScript syntax extension included with Babel, it allows for a new, clean and human-like syntax for doing so.

For example;

```javascript
import { seconds, minute, milliseconds } from 'metrick/duration';

// Explicit syntax
setTimeout(
  () => console.log('1 minute has passed!'),
  1::minute.in(milliseconds)
);

// Implicit syntax
setTimeout(
  () => console.log('30 seconds have passed!'),
  30::seconds
);
```

Here, two syntaxes are demonstrated; explicit and implicit!

### Explicit syntax

```javascript
import { gibibyte, megabytes } from 'metrick/data';
import { years, days } from 'metrick/duration';

console.log(1::gibibyte.in(megabytes)); // => 1073.741824
console.log(25::years.in(days));        // => 9132.5
```

The explicit syntax makes use of an `in` function to convert the original unit into another supplied unit. Passing a valid Unit object of the same type to `in` will return the result as a `number`.

### Implicit syntax

```javascript
import { megabits } from 'metrick/data';
import { hours } from 'metrick/duration';

console.log(50::megabits); // => 50000000
console.log(24::hours);    // => 86400000
```

Implicit syntax will convert the number to the _default_ unit of the type of unit you're using. For instance, Data units implicitly convert to bits, and Duration units implicitly convert to milliseconds.

In general, the implicit unit is the applicable [SI base unit](https://en.wikipedia.org/wiki/SI_base_unit), however, in the case of Duration the implicit unit is milliseconds, for compatibility with standard JavaScript methods which deal with time.

_Shoutout to Glen Maddern for the idea behind implicit syntax_

## Usage

_**Note**: This presumes you already use Babel to transpile your project's JavaScript. If you don't, instructions are available [on Babel's website](https://babeljs.io/docs/setup/)_

Configure Babel to transform function bind syntax by installing `babel-plugin-transform-function-bind` with your favourite Node package management tool, and then adding the plugin to your `.babelrc`;

```json
{
  "plugins": [
    "transform-function-bind"
  ]
}
```

### Custom unit types

A base Unit constructor exists, which you can extend to create your own classes of unit. All you need to do is extend it!

For instance, here's an implementation of an [Illuminance](https://en.wikipedia.org/wiki/Conversion_of_units#Illuminance) unit type (a unit unlikely to be included with Metrick 😜);

```javascript
import Unit from 'metrick/unit';

export default class Illuminance extends Unit {
  // No overrides are necessary; we're using classes to check for conversion compatibility!
}

// SI base unit, implicit unit
export default const lux = new Illuminance();

export default const footcandle = new Illuminance(10.763910417::lux);
// pluralise for better readability
export default const footcandles = footcandle;

export default const lumenPerSquareInch = new Illuminance(1550.0031::lux);

export default const phot = new Illuminance(10000::lux);
```

### Custom units

Each type of unit exposes a constructor to create a compatible unit type.
The constructors accept two forms of defining the relationship between units;

* One `Number` argument, indicating the multiplier between the unit and the base unit
* Two `Function`s, each accepting one numeric argument and transform to and from the base unit

For instance, here's an implementation of [.beats](https://en.wikipedia.org/wiki/Swatch_Internet_Time) as a Duration unit, using the multiplier argument;

```javascript
import Duration, { days, seconds, minutes } from 'metrick/duration';

// each .beat is 1/1000th of a day, Durations are measured in seconds
const dotBeat = new Duration((1 / 1000)::days.in(seconds));

// pluralise for better readability
const dotBeats = dotBeat;

console.log(1::dotBeat.in(minutes));   // => 1.4400000000000002
console.log(12::dotBeats.in(minutes)); // => 17.280000000000005
```

As an example of providing Functions, here's an implementation of a Gas Mark temperature conversion;

```javascript
import Temperature, { celsius } from 'metrick/temperature';

const gasMark = new Temperature(
  (temperature) => (
    temperature * 14 + 394.15
  ),

  (temperature) => (
    (temperature - 394.15) / 14
  )
);

console.log(1::gasMark.in(celsius)); // => 135
console.log(5::gasMark.in(celsius)); // => 191
```

### Included units

Currently, Metrick includes units for Data and Duration.

_**Note**: All built-in units are exported with their singular and plural names - here we only list plural for brevity._

#### Data

* `bits` (SI base unit, implicit unit)
* `bytes`
* `exabits`
* `exabytes`
* `exbibits`
* `exbibytes`
* `gibibits`
* `gibibytes`
* `gigabits`
* `gigabytes`
* `kibibits`
* `kibibytes`
* `kilobits`
* `kilobytes`
* `mebibits`
* `mebibytes`
* `megabits`
* `megabytes`
* `nibbles`
* `pebibits`
* `pebibytes`
* `petabits`
* `petabytes`
* `tebibits`
* `tebibytes`
* `terabits`
* `terabytes`

#### Duration

* `days`
* `hours`
* `milliseconds` (implicit unit)
* `minutes`
* `months`
* `seconds` (SI base unit)
* `weeks`
* `years`

#### Length

##### Metric

* `centimetres`
* `kilometres`
* `metres` (SI base unit, implicit unit)
* `millimetres`

##### Imperial

* `chains`
* `feet` (singular is `foot`)
* `inches` (singular is `inch`)
* `miles`
* `paces`
* `yards`

##### Weird

* `spats`
* `twips`
* `astronomicalUnits`

#### Temperature

_**Note**: Built-in temperature units are exported both with and without `degrees` prefix - here we only list without for brevity._

* `celsius`
* `fahrenheit`
* `kelvin` (SI base unit, implicit unit)

### Full-library export

The library also includes a main entry point at `index.js`, which exposes all the available parts of the library. This is not recommended as if, for example, you Webpack the whole library, you'll include conversions you may not be using!

```javascript
import { Duration as DurationConstructor, duration } from 'metrick';
import Duration, { minute } from 'metrick/duration';

console.log(DurationConstructor === Duration) // => true
console.log(duration.minute === minute);      // => true
```

## Wait, how does this work?

This is making use of the [function bind](https://babeljs.io/docs/plugins/transform-function-bind/) syntax extension. This extension adds a `::` operator to JavaScript, which binds functions following to objects immediately before.

### Caveats

This syntax extension is experimental - it's not even in any specification, merely a proposal which happens to have a transform available in Babel.

Likewise, this is _technically_ a bit of an abuse of this; implicit syntax takes advantage of the fact that the bind operator implicitly makes a call to the `bind` method of what is supposed to be a supplied function, and instead returns the implicit unit conversion in these cases.

Also, technically, the function bind proposal suggests that the syntax check that the function passed is callable, but Babel's transform does not test this. Metrick instead uses an object which happens to have a `bind` method, so this particular approach _may_ break in more strict, future versions of the transformation - but hopefully not!
