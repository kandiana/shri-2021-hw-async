'use strict';

((global) => {
  const _wrap = (fn, cb) => {
    setTimeout(() => {
      cb(fn());
    }, Math.random() * 20);
  };

  const AsyncArray = function (initial) {
    if (initial && !(initial instanceof Array)) {
      throw new Error('initial value is not an array');
    }

    const a = initial ? Array.from(initial) : [];

    this.set = (index, value, cb) =>
      _wrap(() => {
        a[index] = value;
      }, cb);
    this.push = (value, cb) =>
      _wrap(() => {
        a.push(value);
      }, cb);

    this.get = (index, cb) => _wrap(() => a[index], cb);
    this.pop = (cb) => _wrap(() => a.pop(), cb);
    this.length = (cb) => _wrap(() => a.length, cb);

    this.print = () => {
      console.log(a.toString());
    };
  };

  const add = (a, b, cb) => _wrap(() => a + b, cb);
  const subtract = (a, b, cb) => _wrap(() => a - b, cb);
  const multiply = (a, b, cb) => _wrap(() => a * b, cb);
  const divide = (a, b, cb) => _wrap(() => a / b, cb);

  const less = (a, b, cb) => _wrap(() => a < b, cb);
  const equal = (a, b, cb) => _wrap(() => a === b, cb);
  const lessOrEqual = (a, b, cb) => _wrap(() => a <= b, cb);

  global.Homework = {
    AsyncArray,
    add,
    subtract,
    multiply,
    divide,
    less,
    equal,
    lessOrEqual
  };

  Object.freeze(global.Homework);
})(typeof window === 'undefined' ? global : window);

const { AsyncArray, add, subtract, multiply, divide, less, equal, lessOrEqual } = Homework;

/* TEST */
const reduce = require('../solution/index')(Homework);

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const asyncArray = new AsyncArray(array);

const reducerSum = (acc, curr, i, src, cb) => add(acc, curr, cb);
reduce(asyncArray, reducerSum, undefined, (res) => {
  console.log(`\ntest array: ${array}`);
  console.log('\nsum\nresult =', res);
  console.log(`expected: ${array.reduce((res, el) => res + el)}`);
});

const reducerProduct = (acc, curr, i, src, cb) => multiply(acc, curr, cb);
reduce(asyncArray, reducerProduct, undefined, (res) => {
  console.log(`\ntest array: ${array}`);
  console.log('\nproduct\nresult =', res);
  console.log(`expected: ${array.reduce((res, el) => res * el)}`);
});

// nonexistent reducer doesn't block the rest of the program
const reducerNoNExistent = (acc, curr, i, src, cb) => greater(acc, curr, cb);
reduce(asyncArray, reducerNoNExistent, undefined, () => {});

const reducerQuotient = (acc, curr, i, src, cb) => divide(acc, curr, cb);
reduce(asyncArray, reducerQuotient, 3628800, (res) => {
  console.log(`\ntest array: ${array}`);
  console.log('\nquotient\nresult =', res);
  console.log(`expected: ${array.reduce((res, el) => res / el, 3628800)}`);
});

// wanted to somehow timeout reducerPromise, but couldn't find a way to make it work.
