# conversions
Library for converting values between measurements, designed to have a similar syntax to money.js

## Installation
```terminal
$ pnpm add doinkythederp/conversions
$ # or
$ npm i doinkythederp/conversions
```

## Usage
To start using `conversions`, you'll need to create a `Conversions` instance, which holds data about the difference between each measurement system:

```js
const Conversions = require('conversions');
// or, in TypeScript:
import Conversions = require('conversions');

const myConvertionSystem =
  new Conversions({
    BaseType: 1, // Other measurements are compared to this one
    ComparedType2: 3, // 3x more than BaseType
    ComparedType3: 1.5 // 1.5x more than BaseType
  });
```

The `data` object compares other measurements to the base (1:1 measurement) and sets their conversion rate. Although it might be helpful to have it, the base doesn't need to be included in `data`:

```js
// The base can be inferred:
new Conversions({
  ComparedType2: 3, // 2x more than ComparedType3
  ComparedType3: 1.5 // 0.5x as much as ComparedType2
});
```

One you've created your `Conversions` instance, use the `convert` method to convert from one measurement to another:

```js
// converts from "ComparedType2" to "ComparedType3"
myConvertionSystem.convert(12, {
  from: 'ComparedType2',
  to: 'ComparedType3'
}); // -> 6
```

You can also use chaining to convert:

```js
// converts from "ComparedType3" to "ComparedType2"
myConvertionSystem
  .chain(6)
  .from('ComparedType3')
  .to('ComparedType2'); // -> 12
```

And, you can omit the `from` if you are converting from the base measurement:

```js
// converts from "BaseType" to "ComparedType3"
myConvertionSystem.convert(12, {
  to: 'ComparedType3'
}); // -> 18

// converts from "BaseType" to "ComparedType2"
myConvertionSystem
  .chain(12)
  .to('ComparedType3'); // -> 36
```
