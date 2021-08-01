const assert = require('assert');
const { forEach, map } = require('./index');

it('The forEach function', () => {
  let sum = 0;
  forEach([1,2,3], value => {
    sum += value;
  });

  assert.strictEqual(sum, 6, 'Expected forEach to sum the array');
  
  if (sum !== 6) {
    throw new Error('Expected summing array to equal to 6');
  }
});

it('The map function', () => {
  const result = map([1,2,3], value => {
    return value * 2;
  });

  assert.deepStrictEqual(result, [2, 4, 6]);
  
  // assert.strictEqual(result[0], 2);
  // assert.strictEqual(result[0], 4);
  // assert.strictEqual(result[0], 6);

  if (result[0] != 2) {
    throw new Error(`Expected to find 2, but found ${result[0]}`);
  }
});

