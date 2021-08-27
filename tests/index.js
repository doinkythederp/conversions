const Conversions = require('..');
const assert = require('assert/strict');



// basic conversions
const basic = new Conversions('A', {
  A: 1,
  B: 2,
  C: 3
});

// basic convert syntax
assert.equal(basic.convert(1, { from: 'A', to: 'B' }), 2);

// convert from non-base to non-base
assert.equal(basic.convert(2, { from: 'B', to: 'C' }), 3);

// array convert syntax
assert.deepEqual(basic.convert([1, 2, 3], { from: 'B', to: 'A' }), [0.5, 1, 1.5]);

// chain syntax
assert.equal(basic.chain(6).from('C').to('A'), 2);

// decimals
assert.equal(basic.convert(1.5, { from: 'B', to: 'C' }), 2.25);

console.log('✓ All tests passed');
