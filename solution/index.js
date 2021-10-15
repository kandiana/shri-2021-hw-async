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
      let currentValue;

      for (let i = 0; await lessPromise(i, length); i = await addPromise(i, 1)) {
        currentValue = await getPromise(array, i);
        result = await reducerPromise(result, currentValue, i, array, fn);
      }

      cb(result);
    } catch (e) {
      console.log(e);
    }
  };
};
