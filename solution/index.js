'use strict';

module.exports = function (Homework) {
  const getPromise = (asyncArray, i) => new Promise((resolve) => asyncArray.get(i, resolve));
  const lengthPromise = (asyncArray) => new Promise((resolve) => asyncArray.length(resolve));
  const addPromise = (a, b) => new Promise((resolve) => Homework.add(a, b, resolve));
  const lessPromise = (a, b) => new Promise((resolve) => Homework.less(a, b, resolve));

  const reducerPromise = (acc, curr, i, src, reducer) => {
    return new Promise((resolve) => reducer(acc, curr, i, src, resolve));
  };

  return async (array, fn, initialValue, cb) => {
    try {
      const length = await lengthPromise(array);
      let result = initialValue;
      let i = 0;

      if (result === undefined) {
        result = await getPromise(array, 0);
        i = 1;
      }

      while (await lessPromise(i, length)) {
        [result, i] = await Promise.all([
          reducerPromise(result, await getPromise(array, i), i, array, fn),
          addPromise(i, 1)
        ]);
      }

      cb(result);
    } catch (e) {
      console.log(e);
    }
  };
};
