/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
  return a + " + " + b + " = " + (a + b);
}

/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
  let endArray = [];
  for (let i = startNumber; i <= endNumber; i++) {
    endArray.push(i);
  }
  return endArray;
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
  let min = numbers[0];
  let max = numbers[0];
  let count = 0;
  while (numbers.length > count) {
    if (numbers[count] < min) {
      min = numbers[count];
    } else if (numbers[count] > max) {
      max = numbers[count];
    }
    count++;
  }
  return { min, max };
}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
  let obj = {};
  array.forEach((element) => {
    if (!obj.hasOwnProperty(element)) {
      obj[element] = 1;
    } else {
      obj[element]++;
    }
  });
  return obj;
}
